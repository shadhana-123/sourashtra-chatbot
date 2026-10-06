pipeline {
    agent any

    options {
        skipDefaultCheckout(true)
    }

    stages {

        stage('Checkout') {
            steps {
                echo 'Checking out Sourashtra Chatbot source code...'
                checkout scm
            }
        }

        stage('Build') {
            steps {
                echo 'Validating Sourashtra Chatbot project files...'

                bat 'if not exist index.html exit /b 1'
                bat 'if not exist app.js exit /b 1'
                bat 'if not exist dictionary.js exit /b 1'
                bat 'if not exist style.css exit /b 1'
                bat 'if not exist Dockerfile exit /b 1'
                bat 'if not exist Jenkinsfile exit /b 1'

                echo 'All required project files are present.'
            }
        }

        stage('Test / Validate') {
            steps {
                echo 'Checking Docker availability...'

                bat 'docker --version'
                bat 'docker info'

                echo 'Sourashtra Chatbot validation completed.'
            }
        }

        stage('Docker Build') {
            steps {
                echo 'Building Docker image...'

                bat 'docker build -t sourashtra-chatbot:%BUILD_NUMBER% .'
                bat 'docker tag sourashtra-chatbot:%BUILD_NUMBER% sourashtra-chatbot:latest'
            }
        }
    }

    post {
        success {
            echo 'CI PIPELINE SUCCESS: Sourashtra Chatbot Docker image created successfully.'
        }

        failure {
            echo 'CI PIPELINE FAILED: Check the Jenkins console output for the failed stage.'
        }

        always {
            echo 'CI pipeline execution completed.'
        }
    }
}