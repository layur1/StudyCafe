pipeline {
    agent any

    environment {
        DOCKERHUB_USERNAME = 'lalvv'

        FRONTEND_IMAGE = 'studycafe-frontend'
        BACKEND_IMAGE  = 'studycafe-backend'

        IMAGE_TAG = "${BUILD_NUMBER}"
    }

    stages {

        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Build Frontend Image') {
            steps {
                sh '''
                    docker build \
                      -t ${DOCKERHUB_USERNAME}/${FRONTEND_IMAGE}:${IMAGE_TAG} \
                      -t ${DOCKERHUB_USERNAME}/${FRONTEND_IMAGE}:latest \
                      -f frontend/Dockerfile frontend
                '''
            }
        }

        stage('Build Backend Image') {
            steps {
                sh '''
                    docker build \
                      -t ${DOCKERHUB_USERNAME}/${BACKEND_IMAGE}:${IMAGE_TAG} \
                      -t ${DOCKERHUB_USERNAME}/${BACKEND_IMAGE}:latest \
                      -f backend/Dockerfile backend
                '''
            }
        }

        stage('Login to Docker Hub') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-credentials',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh '''
                        echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                    '''
                }
            }
        }

        stage('Push Images to Docker Hub') {
            steps {
                sh '''
                    docker push ${DOCKERHUB_USERNAME}/${FRONTEND_IMAGE}:${IMAGE_TAG}
                    docker push ${DOCKERHUB_USERNAME}/${FRONTEND_IMAGE}:latest

                    docker push ${DOCKERHUB_USERNAME}/${BACKEND_IMAGE}:${IMAGE_TAG}
                    docker push ${DOCKERHUB_USERNAME}/${BACKEND_IMAGE}:latest
                '''
            }
        }
    }

    post {
        success {
            echo '✅ CI/CD Pipeline completed successfully'
        }
        failure {
            echo '❌ CI/CD Pipeline failed'
        }
    }
}
