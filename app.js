/**
 * Sourashtra Chatbot – Application Logic
 * Handles: Mode switching, Search, TTS, Speech Recognition, Practice scoring
 */

"use strict";

// ─── State ─────────────────────────────────────────────────────────────────
let currentMode        = "type";
let currentCategory    = "all";
let suggestHighlight   = -1;
let currentSuggestions = [];
let speechRecogEn      = null;
let speechRecogPractice= null;
let isListeningEn      = false;
let isListeningPractice= false;
let enHistoryList      = [];
let practiceIdx        = 0;
let hintShown          = false;
let stats = { attempts: 0, correct: 0, totalScore: 0 };
let practiceWordsCopy  = [];

// ─── Init ───────────────────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  spawnParticles();
  renderWordGrid("all");
  initPractice();
  checkSpeechSupport();
});

// ── Particles ────────────────────────────────────────────────────────────────
function spawnParticles() {
  const container = document.getElementById("particles");
  for (let i = 0; i < 40; i++) {
    const p = document.createElement("div");
    p.className = "particle";
    p.style.left = Math.random() * 100 + "%";
    p.style.animationDuration = (6 + Math.random() * 10) + "s";
    p.style.animationDelay    = (Math.random() * 10) + "s";
    p.style.width  = (1 + Math.random() * 2) + "px";
    p.style.height = p.style.width;
    p.style.opacity = 0.2 + Math.random() * 0.5;
    container.appendChild(p);
  }
}

// ── Speech API support check ──────────────────────────────────────────────────
function checkSpeechSupport() {
  if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
    document.querySelectorAll(".mic-btn").forEach(btn => {
      btn.title = "Speech recognition not supported in this browser";
      btn.style.opacity = "0.5";
      btn.disabled = true;
    });
    showToast("⚠️ Use Chrome/Edge for voice features");
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
//  MODE SWITCHING
// ═══════════════════════════════════════════════════════════════════════════════
function switchMode(mode) {
  currentMode = mode;
  document.querySelectorAll(".mode-tab").forEach(t => t.classList.remove("active"));
  document.querySelectorAll(".mode-panel").forEach(p => p.classList.remove("active"));
  document.getElementById("tab-" + (mode === "speak-en" ? "speak-en" : mode)).classList.add("active");
  document.getElementById("panel-" + mode).classList.add("active");

  // Stop any active listening
  if (speechRecogEn && isListeningEn)       stopSpeechEn();
  if (speechRecogPractice && isListeningPractice) stopSpeechPractice();
}

// ═══════════════════════════════════════════════════════════════════════════════
//  TTS – Speak Sourashtra Word
// ═══════════════════════════════════════════════════════════════════════════════
function speakSourashtraWord(word, phonetic, btn) {
  if (!("speechSynthesis" in window)) { showToast("TTS not supported"); return; }
  window.speechSynthesis.cancel();

  // Use phonetic for better pronunciation (hyphen-stripped)
  const toSpeak = phonetic
    ? phonetic.replace(/-/g, " ").replace(/\b(\w)/g, c => c.toUpperCase())
    : word;

  const utter = new SpeechSynthesisUtterance(toSpeak);
  utter.lang = "en-IN";          // Closest available for Indian phonetics
  utter.rate  = 0.72;
  utter.pitch = 1.0;
  utter.volume= 1.0;

  // Try to pick an Indian English or Hindi voice
  const voices = window.speechSynthesis.getVoices();
  const preferred = voices.find(v =>
    v.lang === "hi-IN" || v.lang === "en-IN" || v.name.includes("Google")
  );
  if (preferred) utter.voice = preferred;

  if (btn) {
    btn.classList.add("playing");
    utter.onend = () => btn.classList.remove("playing");
    utter.onerror = () => btn.classList.remove("playing");
  }
  window.speechSynthesis.speak(utter);
}

// ═══════════════════════════════════════════════════════════════════════════════
//  MODE 1 – TYPE TO TRANSLATE
// ═══════════════════════════════════════════════════════════════════════════════

function handleSearch() {
  const input = document.getElementById("search-input").value;
  const clearBtn = document.getElementById("clear-btn");
  clearBtn.classList.toggle("visible", input.length > 0);

  if (!input.trim()) {
    closeSuggestions();
    return;
  }
  const results = fuzzySearch(input);
  renderSuggestions(results, input.trim());
}

function handleKeyDown(e) {
  const dd = document.getElementById("suggestions-dropdown");
  if (!dd.classList.contains("open")) {
    if (e.key === "Enter") submitSearch();
    return;
  }
  const items = dd.querySelectorAll(".suggestion-item");
  if (e.key === "ArrowDown") {
    e.preventDefault();
    suggestHighlight = Math.min(suggestHighlight + 1, items.length - 1);
    highlightSuggestion(items);
  } else if (e.key === "ArrowUp") {
    e.preventDefault();
    suggestHighlight = Math.max(suggestHighlight - 1, -1);
    highlightSuggestion(items);
  } else if (e.key === "Enter") {
    e.preventDefault();
    if (suggestHighlight >= 0 && currentSuggestions[suggestHighlight]) {
      selectSuggestion(currentSuggestions[suggestHighlight]);
    } else {
      submitSearch();
    }
  } else if (e.key === "Escape") {
    closeSuggestions();
  }
}

function highlightSuggestion(items) {
  items.forEach((el, i) => el.classList.toggle("highlighted", i === suggestHighlight));
  if (suggestHighlight >= 0) items[suggestHighlight].scrollIntoView({ block: "nearest" });
}

function renderSuggestions(results, query) {
  const dd = document.getElementById("suggestions-dropdown");
  currentSuggestions = results;
  suggestHighlight = -1;

  if (!results.length) { dd.innerHTML = ""; dd.classList.remove("open"); return; }

  dd.innerHTML = results.slice(0, 8).map((entry, i) => `
    <div class="suggestion-item" onclick="selectSuggestion(DICTIONARY[${DICTIONARY.indexOf(entry)}])" data-idx="${i}">
      <span class="sug-english">${highlightMatch(entry.english, query)}</span>
      <span class="sug-sourashtra">${entry.sourashtra}</span>
      <span class="sug-category">${CATEGORIES[entry.category]?.emoji} ${entry.category}</span>
    </div>
  `).join("");
  dd.classList.add("open");
}

function highlightMatch(text, query) {
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx < 0) return text;
  return text.slice(0, idx) +
    `<strong style="color:var(--clr-accent2)">${text.slice(idx, idx + query.length)}</strong>` +
    text.slice(idx + query.length);
}

function selectSuggestion(entry) {
  if (!entry) return;
  document.getElementById("search-input").value = entry.english;
  closeSuggestions();
  displayResult(entry);
}

function submitSearch() {
  const val = document.getElementById("search-input").value.trim();
  if (!val) return;
  const results = fuzzySearch(val);
  closeSuggestions();
  if (!results.length) {
    displayNoResult(val);
  } else if (results.length === 1) {
    displayResult(results[0]);
  } else {
    displayMultipleResults(val, results);
  }
}

function quickSearch(word) {
  document.getElementById("search-input").value = word;
  document.getElementById("clear-btn").classList.add("visible");
  submitSearch();
}

function clearSearch() {
  document.getElementById("search-input").value = "";
  document.getElementById("clear-btn").classList.remove("visible");
  closeSuggestions();
  document.getElementById("search-input").focus();
}

function closeSuggestions() {
  document.getElementById("suggestions-dropdown").classList.remove("open");
  suggestHighlight = -1;
}

function displayResult(entry) {
  const feed = document.getElementById("chat-feed");
  feed.innerHTML = "";

  const card = document.createElement("div");
  card.className = "result-card";
  card.innerHTML = `
    <div class="rc-user-bubble">
      <span class="rc-user-label">English</span>
      <span class="rc-user-word">${escHtml(entry.english)}</span>
    </div>
    <div class="rc-bot-bubble">
      <div class="rc-bot-header">
        <span class="rc-bot-label">Sourashtra Translation</span>
        <span class="rc-category-tag">${CATEGORIES[entry.category]?.emoji || ""} ${entry.category}</span>
      </div>
      <div class="rc-main-word">${escHtml(entry.sourashtra)}</div>
      <div class="rc-script">${escHtml(entry.script)}</div>
      <div class="rc-phonetic">Pronunciation: /${escHtml(entry.phonetic)}/</div>
      <div class="rc-actions">
        <button class="rc-speak-btn" id="speak-btn-result" onclick="handleSpeakResult(this)">🔊 Hear Pronunciation</button>
        <button class="rc-copy-btn" onclick="copyWord('${escHtml(entry.sourashtra)}')">📋 Copy</button>
      </div>
    </div>
  `;
  // Store entry for the speak button
  card.querySelector("#speak-btn-result").dataset.sourashtra = entry.sourashtra;
  card.querySelector("#speak-btn-result").dataset.phonetic   = entry.phonetic;
  feed.appendChild(card);
  feed.scrollTop = feed.scrollHeight;
}

function handleSpeakResult(btn) {
  const { sourashtra, phonetic } = btn.dataset;
  speakSourashtraWord(sourashtra, phonetic, btn);
}

function displayMultipleResults(query, results) {
  const feed = document.getElementById("chat-feed");
  feed.innerHTML = "";

  const container = document.createElement("div");
  container.innerHTML = `
    <div class="rc-user-bubble" style="align-self:flex-end">
      <span class="rc-user-label">English</span>
      <span class="rc-user-word">${escHtml(query)}</span>
    </div>
    <div class="multi-results-header">Found ${results.length} matches – tap one to translate:</div>
    <div class="multi-pills">${results.slice(0, 12).map(e => `
      <span class="multi-word-pill" onclick="displayResult(DICTIONARY[${DICTIONARY.indexOf(e)}])">
        <span class="mwp-en">${escHtml(e.english)}</span>
        <span style="color:var(--clr-muted)">→</span>
        <span class="mwp-sou">${escHtml(e.sourashtra)}</span>
      </span>
    `).join("")}</div>
  `;
  container.style.display = "flex";
  container.style.flexDirection = "column";
  container.style.gap = "10px";
  feed.appendChild(container);
}

function displayNoResult(query) {
  const feed = document.getElementById("chat-feed");
  feed.innerHTML = `
    <div class="rc-user-bubble" style="align-self:flex-end">
      <span class="rc-user-label">English</span>
      <span class="rc-user-word">${escHtml(query)}</span>
    </div>
    <div class="no-match-box">
      <span>🔍</span>
      <p>"${escHtml(query)}" is not in our dictionary yet.<br>Try a related word or browse by category below.</p>
    </div>
  `;
}

// ── Category browser ──────────────────────────────────────────────────────────
function filterCategory(cat) {
  currentCategory = cat;
  document.querySelectorAll(".cat-btn").forEach(b => {
    b.classList.toggle("active", b.textContent.toLowerCase().includes(cat) || (cat === "all" && b.textContent.includes("All")));
  });
  renderWordGrid(cat);
}

function renderWordGrid(cat) {
  const grid = document.getElementById("word-grid");
  const words = cat === "all"
    ? DICTIONARY
    : DICTIONARY.filter(w => w.category === cat);

  // Deduplicate by sourashtra
  const seen = new Set();
  const unique = words.filter(w => {
    if (seen.has(w.sourashtra)) return false;
    seen.add(w.sourashtra);
    return true;
  });

  grid.innerHTML = unique.map((entry, i) => `
    <div class="word-card" onclick="displayResult(DICTIONARY[${DICTIONARY.indexOf(entry)}])" role="button" tabindex="0">
      <div class="wc-english">${escHtml(entry.english)}</div>
      <div class="wc-sourashtra">${escHtml(entry.sourashtra)}</div>
      <div class="wc-category">${CATEGORIES[entry.category]?.emoji || ""} ${entry.category}</div>
      <button class="wc-speak" onclick="event.stopPropagation(); speakSourashtraWord('${escHtml(entry.sourashtra)}','${escHtml(entry.phonetic)}', this)" title="Hear pronunciation">🔊</button>
    </div>
  `).join("");
}

// ═══════════════════════════════════════════════════════════════════════════════
//  MODE 2 – SPEAK ENGLISH
// ═══════════════════════════════════════════════════════════════════════════════

function toggleSpeechEn() {
  if (isListeningEn) stopSpeechEn();
  else startSpeechEn();
}

function startSpeechEn() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) { showToast("Use Chrome/Edge for voice input"); return; }

  speechRecogEn = new SpeechRecognition();
  speechRecogEn.lang = "en-US";
  speechRecogEn.interimResults = true;
  speechRecogEn.continuous = false;
  speechRecogEn.maxAlternatives = 5;

  let recognizedSoFar = "";
  setListeningStateEn(true);

  speechRecogEn.onresult = (e) => {
    let interim = "";
    let final = "";
    for (let i = 0; i < e.results.length; i++) {
      if (e.results[i].isFinal) {
        final += e.results[i][0].transcript + " ";
      } else {
        interim += e.results[i][0].transcript;
      }
    }
    const combined = (final + interim).trim();
    recognizedSoFar = (final || combined).trim();
    showRecognizedEn(recognizedSoFar, false);
  };

  speechRecogEn.onend = () => {
    setListeningStateEn(false);
    const box = document.getElementById("recognized-en-text");
    const finalText = (recognizedSoFar || (box ? box.textContent : "") || "").trim();
    if (finalText) processEnglishSpeech(finalText);
  };

  speechRecogEn.onerror = (e) => {
    setListeningStateEn(false);
    if (e.error !== "no-speech" && e.error !== "aborted") {
      showToast("Mic error: " + e.error);
    }
  };

  speechRecogEn.start();
}

function stopSpeechEn() {
  if (speechRecogEn) {
    try { speechRecogEn.stop(); } catch(_) {}
  }
  setListeningStateEn(false);
}

function setListeningStateEn(listening) {
  isListeningEn = listening;
  const btn  = document.getElementById("mic-btn-en");
  const ring = document.getElementById("mic-ring");
  const icon = document.getElementById("mic-icon-en");
  const waves= document.getElementById("listening-waves-en");
  const inst = document.getElementById("speak-instruction-en");

  btn.classList.toggle("listening", listening);
  ring.classList.toggle("listening", listening);
  waves.classList.toggle("active", listening);
  icon.textContent = listening ? "⏹️" : "🎙️";
  inst.innerHTML = listening
    ? "🔴 <strong>Listening…</strong> speak clearly in English"
    : "Tap the microphone and <strong>speak in English</strong>";
}

function showRecognizedEn(text, isFinal) {
  const box = document.getElementById("recognized-box-en");
  box.style.display = "block";
  document.getElementById("recognized-en-text").textContent = text;
}

function processEnglishSpeech(text) {
  if (!text) return;

  // Clean the speech text: strip punctuation, normalize spaces
  const clean = text
    .toLowerCase()
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"'!\\]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (!clean) return;

  // Update recognized box with cleanly formatted text if needed
  showRecognizedEn(text, true);

  let found = null;
  let matchedTerm = clean;

  // 1. Direct dictionary map lookup on clean text
  if (DICTIONARY_MAP[clean]) {
    found = DICTIONARY_MAP[clean];
  }

  // 2. Singular form check if plural
  if (!found) {
    const sing = clean.endsWith("es") && clean.length > 3
      ? clean.slice(0, -2)
      : (clean.endsWith("s") && clean.length > 2 ? clean.slice(0, -1) : null);
    if (sing && DICTIONARY_MAP[sing]) {
      found = DICTIONARY_MAP[sing];
      matchedTerm = sing;
    }
  }

  // 3. Strip conversational carrier phrases (e.g. "what is banana", "translate water", "how to say hello")
  if (!found) {
    const stripped = clean
      .replace(/^(what\s+is|what's|how\s+to\s+say|how\s+do\s+you\s+say|translate|tell\s+me|meaning\s+of|say|give\s+me|can\s+you\s+say)\s+/i, "")
      .replace(/\s+(in\s+sourashtra|in\s+saurashtra|in\s+tamil|please)$/i, "")
      .replace(/^(a|an|the)\s+/i, "")
      .trim();

    if (stripped && DICTIONARY_MAP[stripped]) {
      found = DICTIONARY_MAP[stripped];
      matchedTerm = stripped;
    } else if (stripped) {
      const singStrip = stripped.endsWith("es") && stripped.length > 3
        ? stripped.slice(0, -2)
        : (stripped.endsWith("s") && stripped.length > 2 ? stripped.slice(0, -1) : null);
      if (singStrip && DICTIONARY_MAP[singStrip]) {
        found = DICTIONARY_MAP[singStrip];
        matchedTerm = singStrip;
      }
    }
  }

  // 4. Try decreasing subsequences / n-grams of words
  if (!found) {
    const words = clean.split(/\s+/).filter(w => w.length > 0);
    for (let len = words.length; len >= 1 && !found; len--) {
      for (let start = 0; start <= words.length - len && !found; start++) {
        const phrase = words.slice(start, start + len).join(" ");
        if (DICTIONARY_MAP[phrase]) {
          found = DICTIONARY_MAP[phrase];
          matchedTerm = phrase;
          break;
        }
        const singPhrase = phrase.endsWith("es") && phrase.length > 3
          ? phrase.slice(0, -2)
          : (phrase.endsWith("s") && phrase.length > 2 ? phrase.slice(0, -1) : null);
        if (singPhrase && DICTIONARY_MAP[singPhrase]) {
          found = DICTIONARY_MAP[singPhrase];
          matchedTerm = singPhrase;
          break;
        }
      }
    }
  }

  // 5. Fuzzy search with the cleaned text
  if (!found) {
    const results = fuzzySearch(clean);
    if (results.length) {
      found = results[0];
      matchedTerm = found.english;
    }
  }

  // 6. Fuzzy search on individual words (filtering stopwords)
  if (!found) {
    const stopWords = new Set(["a", "an", "the", "is", "are", "in", "to", "for", "of", "what", "how", "you", "me", "do", "say"]);
    const words = clean.split(/\s+/).filter(w => !stopWords.has(w) && w.length > 2);
    for (const w of words) {
      const results = fuzzySearch(w);
      if (results.length) {
        found = results[0];
        matchedTerm = found.english;
        break;
      }
    }
  }

  if (found) {
    showTranslationEn(text, found, matchedTerm);
    addToHistoryEn(text, found);
    hide("no-match-en");
  } else {
    showNoMatchEn(text);
    hide("translation-box-en");
  }
}

function showTranslationEn(english, entry, matchedTerm) {
  const box = document.getElementById("translation-box-en");
  box.style.display = "block";
  document.getElementById("trb-sourashtra-en").textContent = entry.sourashtra;
  document.getElementById("trb-script-en").textContent     = entry.script;

  const cleanEng = english.toLowerCase().replace(/[^a-z0-9]/g, "");
  const cleanMatch = (matchedTerm || entry.english).toLowerCase().replace(/[^a-z0-9]/g, "");
  const note = (cleanMatch && cleanMatch !== cleanEng) ? ` · Matched: "${matchedTerm || entry.english}"` : "";

  document.getElementById("trb-category-en").textContent   =
    `${CATEGORIES[entry.category]?.emoji || ""} ${entry.category} · /${entry.phonetic}/${note}`;

  // Store entry for speak button
  const speakBtn = document.getElementById("speak-result-en");
  speakBtn.dataset.sourashtra = entry.sourashtra;
  speakBtn.dataset.phonetic   = entry.phonetic;

  // Auto-speak after short delay
  setTimeout(() => speakSourashtra("en"), 600);
}

function showNoMatchEn(text) {
  const box = document.getElementById("no-match-en");
  box.innerHTML = `
    <span style="font-size:2.2rem">😕</span>
    <p style="margin:6px 0 10px; font-weight:600; color:var(--clr-text)">"${escHtml(text)}" not found in dictionary</p>
    <p style="font-size:0.85rem; color:var(--clr-muted); margin-bottom:12px">Try speaking or tapping one of these common words:</p>
    <div style="display:flex; flex-wrap:wrap; gap:8px; justify-content:center">
      <button class="chip" onclick="processEnglishSpeech('banana')">🍌 banana</button>
      <button class="chip" onclick="processEnglishSpeech('apple')">🍎 apple</button>
      <button class="chip" onclick="processEnglishSpeech('water')">💧 water</button>
      <button class="chip" onclick="processEnglishSpeech('mother')">👩 mother</button>
      <button class="chip" onclick="processEnglishSpeech('hello')">👋 hello</button>
      <button class="chip" onclick="processEnglishSpeech('milk')">🥛 milk</button>
      <button class="chip" onclick="processEnglishSpeech('sun')">☀️ sun</button>
      <button class="chip" onclick="processEnglishSpeech('one')">1️⃣ one</button>
    </div>
  `;
  show("no-match-en");
}

function speakSourashtra(mode) {
  const suffix = mode === "en" ? "-en" : "-practice";
  const btn    = document.getElementById("speak-result" + suffix);
  if (!btn) return;
  speakSourashtraWord(btn.dataset.sourashtra, btn.dataset.phonetic, btn);
}

function addToHistoryEn(english, entry) {
  enHistoryList.unshift({ english, entry });
  if (enHistoryList.length > 5) enHistoryList.pop();
  renderHistoryEn();
  show("history-en");
}

function renderHistoryEn() {
  const list = document.getElementById("history-list-en");
  list.innerHTML = enHistoryList.map(h => `
    <div class="history-item">
      <div>
        <div class="hi-en">${escHtml(h.english)}</div>
        <div class="hi-sou">${escHtml(h.entry.sourashtra)}</div>
      </div>
      <button class="hi-speak" onclick="speakSourashtraWord('${escHtml(h.entry.sourashtra)}','${escHtml(h.entry.phonetic)}', this)" title="Hear">🔊</button>
    </div>
  `).join("");
}

// ═══════════════════════════════════════════════════════════════════════════════
//  MODE 3 – PRACTICE SOURASHTRA
// ═══════════════════════════════════════════════════════════════════════════════

function initPractice() {
  practiceWordsCopy = [...PRACTICE_WORDS];
  // Shuffle
  for (let i = practiceWordsCopy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [practiceWordsCopy[i], practiceWordsCopy[j]] = [practiceWordsCopy[j], practiceWordsCopy[i]];
  }
  practiceIdx = 0;
  loadPracticeWord();
}

function loadPracticeWord() {
  const word = practiceWordsCopy[practiceIdx];
  if (!word) return;

  document.getElementById("practice-english-word").textContent = word.english;
  document.getElementById("practice-sourashtra-hint").textContent = word.sourashtra + " · " + word.script;
  document.getElementById("practice-sourashtra-hint").classList.add("hidden");
  document.getElementById("hint-toggle").textContent = "👁️ Show Hint";
  hintShown = false;
  hide("score-box");

  const total = practiceWordsCopy.length;
  document.getElementById("practice-counter").textContent = `${practiceIdx + 1} / ${total}`;
}

function toggleHint() {
  hintShown = !hintShown;
  const hint = document.getElementById("practice-sourashtra-hint");
  hint.classList.toggle("hidden", !hintShown);
  document.getElementById("hint-toggle").textContent = hintShown ? "🙈 Hide Hint" : "👁️ Show Hint";
}

function nextPracticeWord() {
  if (practiceIdx < practiceWordsCopy.length - 1) {
    practiceIdx++;
    loadPracticeWord();
    hide("score-box");
    resetListeningPractice();
  } else {
    showToast("🎉 You've completed all words! Restarting…");
    setTimeout(initPractice, 1500);
  }
}

function prevPracticeWord() {
  if (practiceIdx > 0) {
    practiceIdx--;
    loadPracticeWord();
    hide("score-box");
    resetListeningPractice();
  }
}

function retryPractice() {
  hide("score-box");
  resetListeningPractice();
}

function resetListeningPractice() {
  if (speechRecogPractice && isListeningPractice) stopSpeechPractice();
  setListeningStatePractice(false);
}

// ── Practice speech recognition ───────────────────────────────────────────────
function toggleSpeechPractice() {
  if (isListeningPractice) stopSpeechPractice();
  else startSpeechPractice();
}

function startSpeechPractice() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) { showToast("Use Chrome/Edge for voice input"); return; }

  speechRecogPractice = new SpeechRecognition();
  // Try to recognize phonetic English (closest to Sourashtra romanization)
  speechRecogPractice.lang = "en-IN";
  speechRecogPractice.interimResults = false;
  speechRecogPractice.maxAlternatives = 5;

  setListeningStatePractice(true);

  speechRecogPractice.onresult = (e) => {
    // Collect all alternatives
    const alts = Array.from(e.results[0]).map(r => r.transcript.trim());
    evaluatePractice(alts);
  };

  speechRecogPractice.onend = () => setListeningStatePractice(false);

  speechRecogPractice.onerror = (e) => {
    setListeningStatePractice(false);
    if (e.error !== "no-speech" && e.error !== "aborted") showToast("Mic error: " + e.error);
  };

  speechRecogPractice.start();
}

function stopSpeechPractice() {
  if (speechRecogPractice) {
    try { speechRecogPractice.stop(); } catch(_) {}
  }
  setListeningStatePractice(false);
}

function setListeningStatePractice(listening) {
  isListeningPractice = listening;
  const btn   = document.getElementById("mic-btn-practice");
  const ring  = document.getElementById("mic-ring-practice");
  const icon  = document.getElementById("mic-icon-practice");
  const waves = document.getElementById("listening-waves-practice");
  const inst  = document.getElementById("speak-instruction-practice");

  btn.classList.toggle("listening", listening);
  ring.classList.toggle("listening", listening);
  waves.classList.toggle("active", listening);
  icon.textContent = listening ? "⏹️" : "🎙️";
  inst.innerHTML = listening
    ? "🔴 <strong>Listening…</strong> say the Sourashtra word clearly"
    : "Tap to speak the Sourashtra word";
}

function evaluatePractice(alternatives) {
  const word = practiceWordsCopy[practiceIdx];
  if (!word) return;

  // Score against sourashtra and phonetic, take best score
  let bestScore = 0;
  let bestSpoken = alternatives[0] || "";

  alternatives.forEach(alt => {
    // Compare against sourashtra romanized
    const s1 = pronunciationScore(alt, word.sourashtra);
    // Compare against phonetic guide
    const s2 = pronunciationScore(alt, word.phonetic.replace(/-/g, " "));
    // Compare against script (devanagari - this may not help much but acts as fallback)
    const best = Math.max(s1, s2);
    if (best > bestScore) { bestScore = best; bestSpoken = alt; }
  });

  // Update stats
  stats.attempts++;
  if (bestScore >= 60) stats.correct++;
  stats.totalScore += bestScore;

  showScore(bestScore, bestSpoken, word);
  updateStatsDisplay();
}

function showScore(score, spoken, word) {
  show("score-box");

  // Animate the circle
  const circumference = 2 * Math.PI * 54; // r=54
  const offset = circumference - (score / 100) * circumference;
  const fill = document.getElementById("score-fill");
  const numEl= document.getElementById("score-num");
  const msgEl= document.getElementById("score-message");
  const detEl= document.getElementById("score-details");

  // Color by score
  let color, msg, msgCls, advice;
  if      (score >= 85) { color = "#10b981"; msg = "🎉 Excellent!";     msgCls = "excellent"; advice = "Your pronunciation is spot on!"; }
  else if (score >= 65) { color = "#06b6d4"; msg = "👍 Good job!";      msgCls = "good";      advice = "Almost perfect — keep practicing!"; }
  else if (score >= 40) { color = "#f59e0b"; msg = "👌 Keep trying!";   msgCls = "fair";      advice = "Listen to the correct pronunciation and retry."; }
  else                  { color = "#ef4444"; msg = "💪 Don't give up!"; msgCls = "poor";      advice = "Try listening to the word first, then speak."; }

  fill.style.stroke          = color;
  fill.style.strokeDasharray = circumference;
  fill.style.strokeDashoffset= circumference; // reset for animation
  requestAnimationFrame(() => {
    setTimeout(() => { fill.style.strokeDashoffset = offset; }, 50);
  });

  // Animate number
  let current = 0;
  const step = score / 30;
  const interval = setInterval(() => {
    current = Math.min(current + step, score);
    numEl.textContent = Math.round(current) + "%";
    if (current >= score) clearInterval(interval);
  }, 30);

  msgEl.textContent = msg;
  msgEl.className = "score-message " + msgCls;
  detEl.innerHTML = `You said: <em>"${escHtml(spoken)}"</em><br>Expected: <em>"${escHtml(word.sourashtra)}"</em><br>${advice}`;
}

function updateStatsDisplay() {
  document.getElementById("stat-attempts").textContent = stats.attempts;
  document.getElementById("stat-correct").textContent  = stats.correct;
  document.getElementById("stat-avg").textContent      = stats.attempts
    ? Math.round(stats.totalScore / stats.attempts) + "%"
    : "—";
}

// ═══════════════════════════════════════════════════════════════════════════════
//  UTILITIES
// ═══════════════════════════════════════════════════════════════════════════════

function copyWord(text) {
  navigator.clipboard.writeText(text).then(() => {
    showToast("✅ Copied: " + text);
  }).catch(() => showToast("Copy failed"));
}

function showToast(msg) {
  const existing = document.querySelector(".toast");
  if (existing) existing.remove();
  const t = document.createElement("div");
  t.className = "toast";
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2100);
}

function escHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function show(id) {
  const el = document.getElementById(id);
  if (el) el.style.display = "";
}

function hide(id) {
  const el = document.getElementById(id);
  if (el) el.style.display = "none";
}

// Close suggestions when clicking outside
document.addEventListener("click", (e) => {
  if (!e.target.closest(".search-container")) closeSuggestions();
});

// Ensure voices are loaded for TTS
if ("speechSynthesis" in window) {
  window.speechSynthesis.onvoiceschanged = () => {};
  // Trigger voice load
  setTimeout(() => window.speechSynthesis.getVoices(), 500);
}
