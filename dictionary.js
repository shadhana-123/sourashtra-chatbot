/**
 * Sourashtra Dictionary
 * Sources: sourashtradictionary.com, mylittlewordland.com, saurashtri.org,
 *          UCLA Phonetics Lab Archive, palkarhorat.com, polyglotclub.com
 */

const DICTIONARY = [
  // GREETINGS
  { english: "hello",             sourashtra: "Namaskaar",          script: "नमस्कार",       phonetic: "nah-muss-kaar",       category: "greetings", aliases: ["hi","greetings","namaste"] },
  { english: "how are you",       sourashtra: "Aangu kono se",       script: "आंगु कोनो से",  phonetic: "ahn-gu ko-no seh",    category: "greetings", aliases: ["how do you do","are you fine"] },
  { english: "i am fine",         sourashtra: "Sowriyam",            script: "सौरियम",        phonetic: "sow-ree-yum",         category: "greetings", aliases: ["fine","good","okay"] },
  { english: "come",              sourashtra: "Avo",                 script: "आवो",           phonetic: "ah-vo",               category: "greetings", aliases: ["come here","welcome"] },
  { english: "go",                sourashtra: "JAo",                 script: "जाओ",           phonetic: "jah-oh",              category: "greetings", aliases: ["leave","depart"] },
  { english: "yes",               sourashtra: "haa",                 script: "हाँ",            phonetic: "haan",                category: "greetings", aliases: ["ok","sure"] },
  { english: "no",                sourashtra: "naa",                 script: "ना",             phonetic: "naa",                 category: "greetings", aliases: ["nope","nahi"] },
  { english: "thank you",         sourashtra: "Dhanyavaad",          script: "धन्यवाद",       phonetic: "dhan-yuh-vaad",       category: "greetings", aliases: ["thanks","grateful"] },
  { english: "good morning",      sourashtra: "Solophaar mangal",    script: "सोलोफार मंगल", phonetic: "so-lo-faar mun-gul",  category: "greetings", aliases: ["morning"] },
  { english: "goodbye",           sourashtra: "Phir milange",        script: "फिर मिलांगे",  phonetic: "feer mee-lahn-geh",   category: "greetings", aliases: ["bye","see you"] },
  { english: "what is your name", sourashtra: "Thaaro naav shu che", script: "थारो नाव शू छे", phonetic: "thaa-ro naav shoo cheh", category: "greetings", aliases: ["name","your name"] },
  { english: "my name is",        sourashtra: "Maaro naav che",      script: "मारो नाव छे",  phonetic: "maa-ro naav cheh",   category: "greetings", aliases: ["my name"] },

  // NUMBERS
  { english: "zero",    sourashtra: "suNya",  script: "सुण्य",  phonetic: "soon-ya",  category: "numbers", aliases: ["0","nothing"] },
  { english: "one",     sourashtra: "oNTe",   script: "ओंटे",   phonetic: "on-teh",   category: "numbers", aliases: ["1"] },
  { english: "two",     sourashtra: "dI",     script: "दी",     phonetic: "dee",      category: "numbers", aliases: ["2"] },
  { english: "three",   sourashtra: "thIn",   script: "थीं",    phonetic: "theen",    category: "numbers", aliases: ["3"] },
  { english: "four",    sourashtra: "cAr",    script: "चार",    phonetic: "chaar",    category: "numbers", aliases: ["4"] },
  { english: "five",    sourashtra: "pAnch",  script: "पांच",   phonetic: "paanch",   category: "numbers", aliases: ["5"] },
  { english: "six",     sourashtra: "sO",     script: "सो",     phonetic: "soh",      category: "numbers", aliases: ["6"] },
  { english: "seven",   sourashtra: "sAth",   script: "साथ",    phonetic: "saath",    category: "numbers", aliases: ["7"] },
  { english: "eight",   sourashtra: "AaTH",   script: "आठ",     phonetic: "aaath",    category: "numbers", aliases: ["8"] },
  { english: "nine",    sourashtra: "nO",     script: "नो",     phonetic: "noh",      category: "numbers", aliases: ["9"] },
  { english: "ten",     sourashtra: "dUs",    script: "दुस",    phonetic: "doos",     category: "numbers", aliases: ["10"] },
  { english: "hundred", sourashtra: "so",     script: "सो",     phonetic: "soh",      category: "numbers", aliases: ["100"] },

  // BODY PARTS
  { english: "body",    sourashtra: "aangu",  script: "आंगु",   phonetic: "aan-gu",   category: "body", aliases: ["physique"] },
  { english: "head",    sourashtra: "dosko",  script: "दोस्को", phonetic: "dos-ko",   category: "body", aliases: ["skull"] },
  { english: "eye",     sourashtra: "doLo",   script: "दोळो",   phonetic: "do-lo",    category: "body", aliases: ["eyes","eyeball"] },
  { english: "nose",    sourashtra: "naak",   script: "नाक",    phonetic: "naak",     category: "body", aliases: ["nostrils"] },
  { english: "ear",     sourashtra: "kaan",   script: "कान",    phonetic: "kaan",     category: "body", aliases: ["ears","hearing"] },
  { english: "mouth",   sourashtra: "tON",    script: "तोण",    phonetic: "ton",      category: "body", aliases: ["face","lips"] },
  { english: "tongue",  sourashtra: "jib",    script: "जिब",    phonetic: "jib",      category: "body", aliases: ["taste"] },
  { english: "teeth",   sourashtra: "daat",   script: "दात",    phonetic: "daath",    category: "body", aliases: ["tooth"] },
  { english: "bone",    sourashtra: "hatko",  script: "हत्को",  phonetic: "hat-ko",   category: "body", aliases: ["skeleton"] },
  { english: "blood",   sourashtra: "regat",  script: "रेगत",   phonetic: "reh-gut",  category: "body", aliases: ["vein"] },
  { english: "hand",    sourashtra: "haat",   script: "हात",    phonetic: "haat",     category: "body", aliases: ["arm","wrist"] },
  { english: "leg",     sourashtra: "paav",   script: "पाव",    phonetic: "paav",     category: "body", aliases: ["foot","feet","limb"] },
  { english: "hair",    sourashtra: "kes",    script: "केस",    phonetic: "kays",     category: "body", aliases: ["locks"] },
  { english: "stomach", sourashtra: "peTu",   script: "पेटु",   phonetic: "peh-tu",   category: "body", aliases: ["belly","tummy","abdomen"] },
  { english: "heart",   sourashtra: "dil",    script: "दिल",    phonetic: "dil",      category: "body", aliases: ["cardiac"] },

  // FAMILY
  { english: "father",          sourashtra: "Baap",    script: "बाप",     phonetic: "baap",       category: "family", aliases: ["dad","papa"] },
  { english: "mother",          sourashtra: "Amba",    script: "अम्बा",   phonetic: "um-baa",     category: "family", aliases: ["mom","mama","maa"] },
  { english: "son",             sourashtra: "Beto",    script: "बेटो",    phonetic: "beh-toh",    category: "family", aliases: ["boy child"] },
  { english: "daughter",        sourashtra: "Beti",    script: "बेटी",    phonetic: "beh-tee",    category: "family", aliases: ["girl child"] },
  { english: "elder brother",   sourashtra: "Nhanda",  script: "न्हन्दा", phonetic: "nhan-da",    category: "family", aliases: ["big brother","anna"] },
  { english: "younger brother", sourashtra: "Bhai",    script: "भाई",     phonetic: "bhaa-ee",    category: "family", aliases: ["brother","bro"] },
  { english: "sister",          sourashtra: "Bhain",   script: "भैन",     phonetic: "bhayn",      category: "family", aliases: ["akka","didi"] },
  { english: "husband",         sourashtra: "Ambulo",  script: "अम्बुलो", phonetic: "um-boo-lo",  category: "family", aliases: ["spouse","partner"] },
  { english: "wife",            sourashtra: "Bile",    script: "बिले",    phonetic: "bee-leh",    category: "family", aliases: ["bride"] },
  { english: "grandfather",     sourashtra: "Baapo",   script: "बापो",    phonetic: "baa-po",     category: "family", aliases: ["grandpa","thatha"] },
  { english: "grandmother",     sourashtra: "Baayi",   script: "बायी",    phonetic: "baa-yee",    category: "family", aliases: ["grandma","paati"] },
  { english: "father-in-law",   sourashtra: "Sosuro",  script: "सोसुरो",  phonetic: "so-su-ro",   category: "family", aliases: ["father in law"] },
  { english: "mother-in-law",   sourashtra: "Sasu",    script: "सासु",    phonetic: "saa-su",     category: "family", aliases: ["mother in law"] },
  { english: "child",           sourashtra: "BaaLu",   script: "बाळु",    phonetic: "baa-lu",     category: "family", aliases: ["baby","infant","kid"] },

  // ANIMALS
  { english: "cow",      sourashtra: "Gaay",    script: "गाय",    phonetic: "gaay",       category: "animals", aliases: ["cattle","ox"] },
  { english: "horse",    sourashtra: "GhoDo",   script: "घोडो",   phonetic: "gho-do",     category: "animals", aliases: ["stallion","mare"] },
  { english: "pig",      sourashtra: "Dukkar",  script: "दुक्कर", phonetic: "duk-kar",    category: "animals", aliases: ["hog","swine"] },
  { english: "tiger",    sourashtra: "Vagh",    script: "वाघ",    phonetic: "vaagh",      category: "animals", aliases: ["big cat"] },
  { english: "lion",     sourashtra: "Simhu",   script: "सिम्हु", phonetic: "sim-hoo",    category: "animals", aliases: ["lioness"] },
  { english: "rabbit",   sourashtra: "Saso",    script: "सासो",   phonetic: "saa-so",     category: "animals", aliases: ["hare","bunny"] },
  { english: "fox",      sourashtra: "Kholo",   script: "खोलो",   phonetic: "kho-lo",     category: "animals", aliases: ["jackal"] },
  { english: "squirrel", sourashtra: "UDto",    script: "उडतो",   phonetic: "ood-to",     category: "animals", aliases: [] },
  { english: "dog",      sourashtra: "kuTTo",   script: "कुट्टो", phonetic: "koo-tto",    category: "animals", aliases: ["puppy","hound"] },
  { english: "cat",      sourashtra: "bilADi",  script: "बिलाडी", phonetic: "bee-laa-dee",category: "animals", aliases: ["kitten"] },
  { english: "bird",     sourashtra: "pakshI",  script: "पक्षी",  phonetic: "pak-shee",   category: "animals", aliases: ["parrot","crow","sparrow"] },
  { english: "fish",     sourashtra: "mAcha",   script: "माचा",   phonetic: "maa-cha",    category: "animals", aliases: ["seafood"] },
  { english: "elephant", sourashtra: "hathi",   script: "हाथी",   phonetic: "haa-thee",   category: "animals", aliases: [] },
  { english: "snake",    sourashtra: "sarp",    script: "सर्प",   phonetic: "sarp",       category: "animals", aliases: ["cobra","viper"] },

  // FOOD & FRUITS
  { english: "fruit",       sourashtra: "poLLo",           script: "पोळ्ळो",       phonetic: "pol-lo",           category: "food", aliases: ["fruits"] },
  { english: "apple",       sourashtra: "sevu poLLo",      script: "सेवु पोळ्ळो",  phonetic: "say-voo pol-lo",   category: "food", aliases: ["seb","apples","safarchand"] },
  { english: "mango",       sourashtra: "kaccamba poLLo",  script: "कच्चम्बा पोळ्ळो", phonetic: "kach-am-ba pol-lo", category: "food", aliases: ["aam","mangoes"] },
  { english: "banana",      sourashtra: "nEndira keLo",    script: "नेंदिरा केलो", phonetic: "nen-dee-ra keh-lo",category: "food", aliases: ["plantain","kela","bananas"] },
  { english: "orange",      sourashtra: "naaraangii",      script: "नारंगी",       phonetic: "naa-run-gee",      category: "food", aliases: ["santra","citrus","oranges"] },
  { english: "grapes",      sourashtra: "draakshu",        script: "द्राक्षु",      phonetic: "draak-shoo",       category: "food", aliases: ["grape","angoor"] },
  { english: "jackfruit",   sourashtra: "ponnisu poLLo",   script: "पोन्निसु पोळ्ळो", phonetic: "pon-nee-su pol-lo", category: "food", aliases: ["kathal"] },
  { english: "pomegranate", sourashtra: "daNim poLLo",     script: "दाणिम पोळ्ळो", phonetic: "da-nim pol-lo",    category: "food", aliases: ["anar"] },
  { english: "pineapple",   sourashtra: "jhATu poLLo",     script: "झाटु पोळ्ळो",  phonetic: "jha-tu pol-lo",    category: "food", aliases: ["ananas"] },
  { english: "coconut",     sourashtra: "naralu",          script: "नरालु",        phonetic: "na-ra-loo",        category: "food", aliases: ["nariyal"] },
  { english: "lemon",       sourashtra: "limbo",           script: "लिम्बो",        phonetic: "leem-bo",          category: "food", aliases: ["lime","nimbu"] },
  { english: "potato",      sourashtra: "baTaato",         script: "बटाटो",        phonetic: "buh-taa-to",       category: "food", aliases: ["aloo","potatoes"] },
  { english: "onion",       sourashtra: "kaando",          script: "कांदो",        phonetic: "kaan-do",          category: "food", aliases: ["pyaz","shallot","onions"] },
  { english: "tomato",      sourashtra: "TameTo",          script: "टमेटो",        phonetic: "tuh-may-to",       category: "food", aliases: ["tamatar","tomatoes"] },
  { english: "water",       sourashtra: "paaNi",           script: "पाणी",         phonetic: "paa-nee",          category: "food", aliases: ["jal","drink","drinking water"] },
  { english: "milk",        sourashtra: "doodh",           script: "दूध",          phonetic: "doodh",            category: "food", aliases: ["dairy"] },
  { english: "tea",         sourashtra: "chA",             script: "चा",           phonetic: "chaa",             category: "food", aliases: ["chai"] },
  { english: "coffee",      sourashtra: "kaafi",           script: "काफी",         phonetic: "kaa-fee",          category: "food", aliases: [] },
  { english: "rice",        sourashtra: "bhaatu",          script: "भातु",         phonetic: "bhaa-too",         category: "food", aliases: ["grain"] },
  { english: "bread",       sourashtra: "roti",            script: "रोटी",         phonetic: "roh-tee",          category: "food", aliases: ["chapati","flatbread"] },
  { english: "salt",        sourashtra: "laVaN",           script: "लवण",          phonetic: "luh-van",          category: "food", aliases: ["namak"] },
  { english: "sugar",       sourashtra: "sakkar",          script: "सक्कर",        phonetic: "suk-kar",          category: "food", aliases: ["sweet","shakkar"] },
  { english: "oil",         sourashtra: "tel",             script: "तेल",          phonetic: "tayl",             category: "food", aliases: ["ghee","butter"] },
  { english: "sour",        sourashtra: "aambaaT",         script: "आम्बाट",       phonetic: "aam-baat",         category: "food", aliases: ["tangy","acidic"] },

  // NATURE
  { english: "sun",      sourashtra: "Suraj",   script: "सूरज",  phonetic: "soo-raj",      category: "nature", aliases: ["solar","sunshine"] },
  { english: "moon",     sourashtra: "chand",   script: "चाँद",  phonetic: "chaand",       category: "nature", aliases: ["lunar"] },
  { english: "star",     sourashtra: "tArA",    script: "तारा",  phonetic: "taa-raa",      category: "nature", aliases: ["stars"] },
  { english: "sky",      sourashtra: "akashu",  script: "आकाशु", phonetic: "aa-kaa-shoo",  category: "nature", aliases: ["heaven","atmosphere"] },
  { english: "earth",    sourashtra: "dharti",  script: "धरती", phonetic: "dhar-tee",     category: "nature", aliases: ["ground","soil"] },
  { english: "fire",     sourashtra: "aag",     script: "आग",    phonetic: "aag",          category: "nature", aliases: ["flame","blaze"] },
  { english: "wind",     sourashtra: "paVaN",   script: "पवण",   phonetic: "puh-van",      category: "nature", aliases: ["air","breeze"] },
  { english: "rain",     sourashtra: "varshaad",script: "वर्षाद",phonetic: "var-shaad",    category: "nature", aliases: ["shower","drizzle"] },
  { english: "tree",     sourashtra: "jhaaD",   script: "झाड",   phonetic: "jhaad",        category: "nature", aliases: ["plant","wood"] },
  { english: "flower",   sourashtra: "phool",   script: "फूल",   phonetic: "phool",        category: "nature", aliases: ["blossom","petal","flowers"] },
  { english: "mountain", sourashtra: "pahaaD",  script: "पहाड",  phonetic: "puh-haad",     category: "nature", aliases: ["hill","peak"] },
  { english: "river",    sourashtra: "nadI",    script: "नदी",   phonetic: "nuh-dee",      category: "nature", aliases: ["stream","creek"] },
  { english: "sea",      sourashtra: "samudar", script: "समुद्र",phonetic: "suh-moo-dar",  category: "nature", aliases: ["ocean","lake"] },
  { english: "stone",    sourashtra: "paaNo",   script: "पाणो",  phonetic: "paa-no",       category: "nature", aliases: ["rock","pebble"] },
  { english: "silver",   sourashtra: "ruppo",   script: "रुप्पो",phonetic: "roo-poh",      category: "nature", aliases: ["metal"] },
  { english: "turmeric", sourashtra: "halatu",  script: "हलतु",  phonetic: "huh-luh-too",  category: "nature", aliases: ["haldi","spice"] },

  // COLORS
  { english: "white",  sourashtra: "Kudjal",   script: "कुडजल", phonetic: "kood-jal",   category: "colors", aliases: ["light","pale"] },
  { english: "black",  sourashtra: "kaaLo",    script: "काळो",  phonetic: "kaa-lo",     category: "colors", aliases: ["dark"] },
  { english: "red",    sourashtra: "lAl",      script: "लाल",   phonetic: "laal",       category: "colors", aliases: ["crimson","scarlet"] },
  { english: "blue",   sourashtra: "nIlo",     script: "नीलो",  phonetic: "nee-lo",     category: "colors", aliases: ["azure","sky blue"] },
  { english: "green",  sourashtra: "haRyo",    script: "हरियो", phonetic: "hah-ryo",    category: "colors", aliases: ["emerald","leaf color"] },
  { english: "yellow", sourashtra: "pILo",     script: "पीळो",  phonetic: "pee-lo",     category: "colors", aliases: ["golden"] },
  { english: "orange", sourashtra: "naraNgi",  script: "नारंगी",phonetic: "naa-run-gee",category: "colors", aliases: ["saffron"] },
  { english: "pink",   sourashtra: "gulAbi",   script: "गुलाबी",phonetic: "goo-laa-bee",category: "colors", aliases: ["rose"] },
  { english: "purple", sourashtra: "jaambLi",  script: "जांबळी",phonetic: "jaam-blee",  category: "colors", aliases: ["violet","indigo"] },
  { english: "brown",  sourashtra: "bhooro",   script: "भूरो",  phonetic: "bhoo-ro",    category: "colors", aliases: ["tan","beige"] },

  // ACTIONS (VERBS)
  { english: "eat",    sourashtra: "khAvanu",     script: "खावनु",   phonetic: "khaa-vuh-noo",   category: "actions", aliases: ["eating","food"] },
  { english: "drink",  sourashtra: "pIvanu",      script: "पीवनु",   phonetic: "pee-vuh-noo",    category: "actions", aliases: ["drinking","sip"] },
  { english: "sleep",  sourashtra: "sovanu",      script: "सोवनु",   phonetic: "so-vuh-noo",     category: "actions", aliases: ["sleeping","rest","nap"] },
  { english: "walk",   sourashtra: "chalvanu",    script: "चलवनु",   phonetic: "chal-vuh-noo",   category: "actions", aliases: ["walking","stroll"] },
  { english: "run",    sourashtra: "bhagvanu",    script: "भागवनु",  phonetic: "bhaag-vuh-noo",  category: "actions", aliases: ["running","sprint"] },
  { english: "sit",    sourashtra: "bethvanu",    script: "बेठवनु",  phonetic: "bayth-vuh-noo",  category: "actions", aliases: ["sitting"] },
  { english: "stand",  sourashtra: "ubhAvanu",    script: "उभावनु",  phonetic: "oo-bhaa-vuh-noo",category: "actions", aliases: ["standing","rise"] },
  { english: "speak",  sourashtra: "bolAvanu",    script: "बोलावनु", phonetic: "bo-laa-vuh-noo", category: "actions", aliases: ["talk","say"] },
  { english: "listen", sourashtra: "saNbhAlvanu", script: "सणभालवनु",phonetic: "sun-bhaal-vuh-noo",category: "actions", aliases: ["hear"] },
  { english: "see",    sourashtra: "joEvanu",     script: "जोएवनु",  phonetic: "joh-ay-vuh-noo", category: "actions", aliases: ["look","watch","observe"] },
  { english: "read",   sourashtra: "vaaNchvanu",  script: "वांचवनु", phonetic: "vaanch-vuh-noo", category: "actions", aliases: ["study","books"] },
  { english: "write",  sourashtra: "likhvanu",    script: "लिखवनु",  phonetic: "likh-vuh-noo",   category: "actions", aliases: ["writing","pen"] },
  { english: "give",   sourashtra: "devanu",      script: "देवनु",   phonetic: "deh-vuh-noo",    category: "actions", aliases: ["offer","provide"] },
  { english: "take",   sourashtra: "levanu",      script: "लेवनु",   phonetic: "leh-vuh-noo",    category: "actions", aliases: ["receive","grab"] },

  // TIME
  { english: "morning",   sourashtra: "solophAr", script: "सोलोफार", phonetic: "so-lo-faar",  category: "time", aliases: ["dawn","sunrise"] },
  { english: "evening",   sourashtra: "sAnji",    script: "सांजी",   phonetic: "saan-jee",    category: "time", aliases: ["dusk","sunset"] },
  { english: "night",     sourashtra: "raat",     script: "रात",     phonetic: "raat",        category: "time", aliases: ["dark","midnight"] },
  { english: "today",     sourashtra: "aaj",      script: "आज",      phonetic: "aaj",         category: "time", aliases: ["this day"] },
  { english: "tomorrow",  sourashtra: "kaaL",     script: "काळ",     phonetic: "kaal",        category: "time", aliases: ["next day"] },
  { english: "yesterday", sourashtra: "kaale",    script: "काले",    phonetic: "kaa-leh",     category: "time", aliases: ["past","last day"] },
  { english: "sunday",    sourashtra: "aitAru",   script: "ऐतारु",   phonetic: "ay-taa-roo",  category: "time", aliases: ["week","holiday"] },
  { english: "monday",    sourashtra: "sOmwaaro", script: "सोमवारो", phonetic: "som-waa-ro",  category: "time", aliases: [] },
  { english: "year",      sourashtra: "varash",   script: "वरश",     phonetic: "vuh-rush",    category: "time", aliases: ["annual","month"] },
  { english: "day",       sourashtra: "din",      script: "दिन",     phonetic: "din",         category: "time", aliases: ["date"] },
  { english: "time",      sourashtra: "veLL",     script: "वेळ",      phonetic: "vayl",        category: "time", aliases: ["hour","clock"] },

  // PLACES & THINGS
  { english: "house",    sourashtra: "ghar",       script: "घर",      phonetic: "ghar",         category: "places", aliases: ["home","building"] },
  { english: "door",     sourashtra: "kavaDu",     script: "कवाडु",   phonetic: "kuh-vaa-doo",  category: "places", aliases: ["gate","entrance"] },
  { english: "village",  sourashtra: "gaav",       script: "गाव",     phonetic: "gaav",         category: "places", aliases: ["town"] },
  { english: "city",     sourashtra: "sheher",     script: "शेहेर",   phonetic: "sheh-hayr",    category: "places", aliases: ["urban","metro"] },
  { english: "road",     sourashtra: "raasto",     script: "रास्तो",  phonetic: "raas-to",      category: "places", aliases: ["street","path","way"] },
  { english: "market",   sourashtra: "baajaar",    script: "बाजार",   phonetic: "baa-jaaar",    category: "places", aliases: ["shop","store"] },
  { english: "school",   sourashtra: "shaaLa",     script: "शाळा",    phonetic: "shaa-laa",     category: "places", aliases: ["college","education"] },
  { english: "temple",   sourashtra: "devaLuN",    script: "देवाळुण", phonetic: "deh-vaa-loon", category: "places", aliases: ["mandir","church","mosque"] },
  { english: "hospital", sourashtra: "dawaakhAAno",script: "दवाखानो", phonetic: "duh-waa-khaa-no",category: "places", aliases: ["clinic","doctor"] },
  { english: "well",     sourashtra: "kaavo",      script: "कावो",    phonetic: "kaa-vo",       category: "places", aliases: ["water well"] },
  { english: "book",     sourashtra: "pustak",     script: "पुस्तक",  phonetic: "poos-tuk",     category: "places", aliases: ["notebook","pothi","books"] },
  { english: "pen",      sourashtra: "kalam",      script: "कलम",     phonetic: "kuh-lum",      category: "places", aliases: ["pencil"] },
  { english: "money",    sourashtra: "duddu",      script: "दुद्दु",   phonetic: "dood-doo",     category: "places", aliases: ["cash","rupees","paisa"] },
  { english: "friend",   sourashtra: "mitru",      script: "मित्रु",   phonetic: "mit-roo",      category: "family", aliases: ["dost","pal","buddy"] },
  { english: "man",      sourashtra: "manas",      script: "मानस",    phonetic: "maa-nus",      category: "family", aliases: ["person","guy","men"] },
  { english: "woman",    sourashtra: "baayi",      script: "बायी",    phonetic: "baa-yee",      category: "family", aliases: ["lady","female","women"] }
];

// ─── Helper function to clean text keys ───────────────────────────────────────
function cleanWordKey(str) {
  if (!str) return "";
  return str.toLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
}

// ─── Dictionary map for O(1) lookup ───────────────────────────────────────────
const DICTIONARY_MAP = {};
DICTIONARY.forEach(entry => {
  const key = cleanWordKey(entry.english);
  if (key && !DICTIONARY_MAP[key]) DICTIONARY_MAP[key] = entry;

  // Add plural/singular automatically
  if (!key.endsWith("s")) {
    const pl = key.endsWith("ch") || key.endsWith("sh") || key.endsWith("x") ? key + "es" : key + "s";
    if (!DICTIONARY_MAP[pl]) DICTIONARY_MAP[pl] = entry;
  } else if (key.endsWith("es") && key.length > 3) {
    const sg = key.slice(0, -2);
    if (!DICTIONARY_MAP[sg]) DICTIONARY_MAP[sg] = entry;
  } else if (key.endsWith("s") && key.length > 2) {
    const sg = key.slice(0, -1);
    if (!DICTIONARY_MAP[sg]) DICTIONARY_MAP[sg] = entry;
  }

  (entry.aliases || []).forEach(alias => {
    const ak = cleanWordKey(alias);
    if (ak && !DICTIONARY_MAP[ak]) DICTIONARY_MAP[ak] = entry;
    if (!ak.endsWith("s")) {
      const plAk = ak.endsWith("ch") || ak.endsWith("sh") || ak.endsWith("x") ? ak + "es" : ak + "s";
      if (!DICTIONARY_MAP[plAk]) DICTIONARY_MAP[plAk] = entry;
    }
  });
});

// ─── Category metadata ────────────────────────────────────────────────────────
const CATEGORIES = {
  all:       { label: "All Words",     emoji: "🌐" },
  greetings: { label: "Greetings",     emoji: "👋" },
  numbers:   { label: "Numbers",       emoji: "🔢" },
  body:      { label: "Body Parts",    emoji: "🫀" },
  family:    { label: "Family",        emoji: "👨‍👩‍👧" },
  animals:   { label: "Animals",       emoji: "🐄" },
  food:      { label: "Food & Fruits", emoji: "🍎" },
  nature:    { label: "Nature",        emoji: "🌿" },
  colors:    { label: "Colors",        emoji: "🎨" },
  actions:   { label: "Actions",       emoji: "⚡" },
  time:      { label: "Time",          emoji: "⏰" },
  places:    { label: "Places",        emoji: "📍" },
};

// ─── Fuzzy search (scored) ────────────────────────────────────────────────────
function fuzzySearch(query) {
  const cleanQ = cleanWordKey(query);
  if (!cleanQ) return [];
  const results = [];

  const singular = cleanQ.endsWith("es") && cleanQ.length > 3
    ? cleanQ.slice(0, -2)
    : (cleanQ.endsWith("s") && cleanQ.length > 2 ? cleanQ.slice(0, -1) : cleanQ);

  DICTIONARY.forEach(entry => {
    let score = 0;
    const eng = entry.english.toLowerCase();
    const sou = entry.sourashtra.toLowerCase();

    if (eng === cleanQ || eng === singular) score = 100;
    else if (eng.startsWith(cleanQ) || eng.startsWith(singular)) score = 85;
    else if (cleanQ.includes(eng) || (singular.length > 2 && cleanQ.split(/\s+/).includes(eng))) score = 80;
    else if (eng.includes(cleanQ) || eng.includes(singular)) score = 70;
    else if (sou.startsWith(cleanQ)) score = 60;
    else if (sou.includes(cleanQ)) score = 50;
    else if ((entry.aliases || []).some(a => {
      const al = a.toLowerCase();
      return al === cleanQ || al === singular || cleanQ.includes(al) || al.includes(cleanQ);
    })) score = 40;

    if (score > 0) results.push({ entry, score });
  });

  results.sort((a, b) => b.score - a.score);
  return results.map(r => r.entry);
}

// ─── Levenshtein-based pronunciation score ────────────────────────────────────
function pronunciationScore(spoken, expected) {
  const a = spoken.toLowerCase().replace(/[^a-z\s]/g, "").trim();
  const b = expected.toLowerCase().replace(/[^a-z\s]/g, "").trim();
  if (a === b) return 100;
  const m = a.length, n = b.length;
  if (m === 0 || n === 0) return 0;
  const dp = Array.from({ length: m + 1 }, (_, i) =>
    Array.from({ length: n + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0))
  );
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (a[i - 1] === b[j - 1]) dp[i][j] = dp[i - 1][j - 1];
      else dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  const dist = dp[m][n];
  const maxLen = Math.max(m, n);
  const raw = Math.max(0, 100 - Math.round((dist / maxLen) * 100));
  const sharedStart = [...a].findIndex((c, i) => c !== (b[i] || ""));
  const bonus = sharedStart > 0 ? Math.min(10, sharedStart * 3) : 0;
  return Math.min(100, raw + bonus);
}

// ─── Practice word list ───────────────────────────────────────────────────────
const PRACTICE_WORDS = DICTIONARY.filter(w =>
  ["greetings","numbers","body","family","animals","food","nature","colors"].includes(w.category)
).slice(0, 40);
