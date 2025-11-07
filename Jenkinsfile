pipeline {
    agent any

    environment {
        IMAGE_NAME = 'profolio-frontend-app'
        NGINX_DEPLOY_PATH = "E:/HostFiles/Profolio/Frontend/build"
        TEMP_CONTAINER_NAME = "${IMAGE_NAME}-temp"  
    }

    stages {
        stage('Install Dependencies') {
            steps {
                bat 'npm install'
                bat 'npm -v'
            }
        }

        stage('Build React App') {
            steps {
                bat 'npm run build'
                bat 'dir build'  
            }
        }

        stage('Build Docker Image') {
            steps {
                bat "docker rmi -f $IMAGE_NAME || true" 
                bat "docker build -t $IMAGE_NAME ."     
                bat "docker images | findstr %IMAGE_NAME%"
                }
        }

        stage('Copy Static Files to Nginx') {
            steps {
                script {
                    
                    bat "docker run -d --name $TEMP_CONTAINER_NAME $IMAGE_NAME"
                    
                     
                    bat "if not exist \"$NGINX_DEPLOY_PATH\" mkdir \"$NGINX_DEPLOY_PATH\""
                    
                    bat "del /q /s \"$NGINX_DEPLOY_PATH\\*\""
                    
                    bat "docker cp ${TEMP_CONTAINER_NAME}:/usr/share/nginx/html/. \"$NGINX_DEPLOY_PATH\""
                    
                    
                    bat "dir \"$NGINX_DEPLOY_PATH\""
                    
                    
                    bat "docker rm -f $TEMP_CONTAINER_NAME || true"
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline completed.'
            
        }
        success {
            echo "✅ 静态文件已部署到 Nginx 目录：$NGINX_DEPLOY_PATH"
        }
        failure {
            echo '❌ Pipeline failed! 请检查日志。'
            
            bat "docker rm -f $TEMP_CONTAINER_NAME || true"
        }
    }
}