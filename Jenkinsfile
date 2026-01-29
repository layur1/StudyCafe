pipeline {
    agent any

    environment {
        DOCKERHUB_USERNAME = 'lalvv'

        FRONTEND_IMAGE = 'studycafe-frontend'
        BACKEND_IMAGE  = 'studycafe-backend'

        IMAGE_TAG = "${BUILD_NUMBER}"

        EC2_HOST = "51.21.222.31"
        EC2_USER = "ec2-user"
        APP_DIR  = "/home/ec2-user/studycafe/StudyCafe"
    }

    stages {

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

        stage('Deploy to EC2') {
            steps {
                sshagent(credentials: ['ec2-ssh-key']) {
                    sh """
                      ssh -o StrictHostKeyChecking=no ${EC2_USER}@${EC2_HOST} '
                        cd ${APP_DIR} &&
                        docker compose pull &&
                        docker compose down &&
                        docker compose up -d
                      '
                    """
                }
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