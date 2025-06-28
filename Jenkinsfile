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
                    def commitMessage = bat(script: 'git log -1 --pretty=%%B', returnStdout: true).trim()
                    echo "Commit message: ${commitMessage}"

                    def extractJiraKey = { msg ->
                        def matcher = msg =~ /([A-Z]+-\d+)/
                        return matcher.find() ? matcher.group(1) : ''
                    }

                    def issueKey = extractJiraKey(commitMessage)
                    echo "Found Jira Issue Key: ${issueKey}"

                    if (issueKey) {
                        withCredentials([usernamePassword(credentialsId: 'jira-credentials', usernameVariable: 'JIRA_USER', passwordVariable: 'JIRA_TOKEN')]) {
                            jiraAddComment site: 'JiraCloud', idOrKey: issueKey, comment: "✅ Jenkins Build #${env.BUILD_NUMBER} completed. Docker image pushed to Docker Hub."
                            
                            def transitions = jiraGetIssueTransitions site: 'JiraCloud', idOrKey: issueKey
                            echo "Available transitions: ${transitions}"
                            def doneTransitionId = null
                            transitions.data.transitions.each { transition ->
                                echo "Checking transition: ${transition.name} with ID: ${transition.id}"
                                if (transition.name.toLowerCase().contains('done') || 
                                    transition.name.toLowerCase().contains('close') || 
                                    transition.name.toLowerCase().contains('resolve')) {
                                    doneTransitionId = transition.id
                                    echo "Found matching transition: ${transition.name} with ID: ${transition.id}"
                                }
                            }
                            
                            if (doneTransitionId) {
                                jiraTransitionIssue site: 'JiraCloud', idOrKey: issueKey, input: [
                                    transition: [
                                        id: doneTransitionId
                                    ]
                                ]
                                echo "✅ JIRA issue ${issueKey} has been transitioned to Done status."
                            } else {
                                echo "⚠️ Could not find a suitable transition to Done status. Available transitions logged above."
                            }
                        }
                    } else {
                        echo "⚠️ No Jira issue key found in the commit message."
                    }
                }
            }
        }
    }
}
