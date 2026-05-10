pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo 'Building..'
                node -v
                npx newman -v
                npm install newman-reporter-htmlextra

            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
                npx newman run Manual.postman_collection_19-04-2026.json -d data.csv -r cli,htmlextra --reporter-htmlextra-export ${WORKSPACE}/PostmanAPITest/report.html
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }
    }
}