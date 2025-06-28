pipeline {
    agent any

    tools {
        nodejs 'Node22'
    }

    environment {
        DOCKER_IMAGE = 'sahandmohammed/react-demo'
    }

    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/SahandMohammed/react-demo.git', branch: 'main'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Build') {
            steps {
                bat 'npm run build'
            }
        }

        stage('Docker Build') {
            steps {
                bat "docker build -t %DOCKER_IMAGE%:latest ."
            }
        }

        stage('Docker Push') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-password', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    bat """
                        echo %DOCKER_PASS% | docker login -u %DOCKER_USER% --password-stdin
                        docker push %DOCKER_IMAGE%:latest
                    """
                }
            }
        }

        stage('Update Jira Issue') {
            steps {
                script {
                    // Get latest commit message
                    def commitMessage = bat(script: 'git log -1 --pretty=%B', returnStdout: true).trim()
                    
                    // Extract Jira issue key using regex
                    def match = commitMessage =~ /([A-Z]+-\d+)/
                    if (match) {
                        def issueKey = match[0][1]
                        echo "Found Jira Issue Key: ${issueKey}"
                        
                        // Post comment to Jira
                        withCredentials([usernamePassword(credentialsId: 'jira-credentials', usernameVariable: 'JIRA_USER', passwordVariable: 'JIRA_TOKEN')]) {
                            jiraComment idOrKey: issueKey, comment: "✅ Jenkins Build #${env.BUILD_NUMBER} completed. Docker image pushed to Docker Hub."
                        }
                    } else {
                        echo "⚠️ No Jira issue key found in the latest commit message."
                    }
                }
            }
        }
    }
}
