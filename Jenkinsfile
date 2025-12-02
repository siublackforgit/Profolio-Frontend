pipeline {
    agent any
    tools {
        nodejs 'Node20'  
    }
    
    options {
        skipDefaultCheckout(true)
    }

    triggers {
        githubPush()
    }
    environment {
        NODE_ENV = 'production'
        IMAGE_NAME = 'react-portfolio'
    }

    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/siublackforgit/Profolio-Frontend.git', branch: 'master'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build React App') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Dockerize') {
            steps {
                sh '''
                    docker build -t $IMAGE_NAME .
                    docker container rm -f $IMAGE_NAME || true
                    docker run -d --name $IMAGE_NAME -p 3000:80 $IMAGE_NAME
                '''
            }
        }

        // stage('Deploy to CentOS Path') {
        //     steps {
        //         sh '''
        //             rm -rf $DEPLOY_PATH/*
        //             cp -r dist/* $DEPLOY_PATH/
        //         '''
        //     }
        // }
    }

    post {
        success {
            echo '✅ Build and deployment successful!'
        }
        failure {
            echo '❌ Something went wrong during build or deployment.'
        }
    }
}
