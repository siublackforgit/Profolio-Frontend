pipeline {
    agent any

    environment {
        IMAGE_NAME = 'profolio-frontend-app'
        NGINX_DEPLOY_PATH = "E:/HostFiles/Profolio/Frontend/build"
    }

    stages {
        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Build React App') {
            steps {
                bat 'npm run build'
            }
        }

        stage('Build Docker Image') {
            steps {
                bat "docker build -t $IMAGE_NAME ."
            }
        }

        stage('Run Docker Container') {
            steps {
                bat "docker rm -f $IMAGE_NAME || true"
                bat "docker run -d --name $IMAGE_NAME -p 80:80 $IMAGE_NAME"
            }
        }

        stage('Copy Build to Nginx') {
            steps {
                script {
                    def containerId = sh(script: "docker ps -qf name=$IMAGE_NAME", returnStdout: true).trim()
                    bat "docker cp ${containerId}:/usr/share/nginx/html $NGINX_DEPLOY_PATH"
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline completed.'
        }
    }
}
