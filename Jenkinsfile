pipeline {
    agent { docker { image 'node:20.10.0-alpine3.19' } }
    stages {
        stage('Clone source') {
            steps {
                git url: 'https://github.com/Densf2/playright-t2/tree/main/api_requests', branch: 'dpavliuk/jenkins'
            }
        }
        stage('build') {
            steps {
                sh 'node --version'
                sh 'npm ci'
            }
        }
    }
}