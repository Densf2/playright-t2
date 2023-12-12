pipeline {
    agent { docker { image 'node:20.10.0-alpine3.19' } }
    stages {
        stage('Clone source') {
            steps {
                git url: 'https://github.com/Densf2/playright-t2.git', branch: 'dpavliuk/jenkins'
            }
        }
        stage('build') {
            steps {
                sh '''
                node --version
                #sudo chown -R 113:117 "/.npm"
                #apk add sudo
                #sudo apk add --update nodejs npm
                npm ci
                #npm run api_tests
                '''
            }
        }
        stage('check the source structure') {
            steps {
                sh 'ls -la'
            }
        }
        stage('run parallel process') {
            steps {
                parallel(
                    a: {
                        echo 'process a'
                    },
                    b: {
                        echo 'process b'
                    }
                )
            }
        }
    }
}