pipeline {
    agent any

    environment {
        // Nginx hosted directory (match your existing Nginx configuration)
        NGINX_DEPLOY_PATH = "E:/HostFiles/Profolio/Frontend/build"
        // Local React build directory (default output of `npm run build` in Create React App)
        REACT_BUILD_PATH = "${WORKSPACE}/build"
    }

    stages {
        stage('Install Dependencies') {
            steps {
                // Install npm dependencies for the React project
                bat 'npm install'
                // Verify npm environment is working
                bat 'npm -v'
            }
        }

        stage('Build React App') {
            steps {
                // Build React app for production (outputs to ${REACT_BUILD_PATH})
                bat 'npm run build'
                // Verify local build success: list files in the React build directory
                bat "dir \"${REACT_BUILD_PATH}\""
            }
        }

        stage('Copy React Build to Nginx') {
            steps {
                script {
                    // 1. Create Nginx deploy directory if it doesn't exist
                    bat "if not exist \"${NGINX_DEPLOY_PATH}\" mkdir \"${NGINX_DEPLOY_PATH}\""
                    
                    // 2. Clear old files in Nginx directory (avoid residual files from previous builds)
                    bat "del /q /s \"${NGINX_DEPLOY_PATH}\\*\""
                    
                    // 3. Copy React build files to Nginx (including subdirectories like `static`)
                    // /E: Copy all subdirectories (including empty ones)
                    // /H: Copy hidden and system files
                    // /C: Continue copying even if errors occur
                    // /Y: Suppress "overwrite" prompts
                    bat "xcopy \"${REACT_BUILD_PATH}\\*\" \"${NGINX_DEPLOY_PATH}\" /E /H /C /Y"
                    
                    // 4. Verify copy success: list files in the Nginx deploy directory
                    bat "dir \"${NGINX_DEPLOY_PATH}\""
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline completed.'
        }
        success {
            echo " Deployment successful! React build copied to Nginx directory: ${NGINX_DEPLOY_PATH}"
            echo " Access your app via Nginx's configured port (e.g., http://localhost)"
        }
        failure {
            echo ' Deployment failed! Check logs for errors (e.g., directory permissions, npm dependency issues)'
        }
    }
}