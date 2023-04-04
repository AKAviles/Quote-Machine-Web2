#!/usr/bin/env groovy 

/*
    1. Build Docker Image:
        - Variables
            - Docker file path
            - Service name abv
            - AWS Credentials
            - Aws role and roleArn
            - Aws docker namespace
            - Aws ecr url east
            - Aws ecr tag
        - Methods
            - get aws credentials
            - Build docker image in ecr
    2. Push Docker image to ecr
        - Methods
            - get aws credentials
            - push image to ecr
    3. Deploy Image in EKS

*/

pipeline {
    agent any

    environment {
        AWS_ECR_URL = 'https://014920475271.dkr.ecr.us-east-1.amazonaws.com'
        AWS_ECR_NAME = 'quote-machine/quote-machine-web'
        AWS_ECR_URL_NO_PROTOCOL = '014920475271.dkr.ecr.us-east-1.amazonaws.com'

         // Charts
        CHART_NAME = 'personal-charts'
        CHART_REPO_NAME = 'chart-templates'
        CHART_REPO_URL = 'https://akaviles.github.io/personal-charts/'
        CHART_VERSION = '0.1.0'
        CHART_FILE = './chart/values.yaml'

        // AWS EKS
        AWS_EKS_CLUSTER_NAME ='personal-projects'
        
        PROJECT_NAME='quote-machine-web'
    }

    stages {

        stage('User Input - Environment') {
            steps {
                script {
                PIPELINE_ACTION = input message: 'Choose to build an image, deploy an image, or both.',
                    parameters: [
                        [
                            $class: 'ChoiceParameterDefinition',
                            choices: ['BUILD', 'DEPLOY'],
                            name: "pipeline_action"
                        ]
                    ]
             }
            }
            
        }

        stage('Build Docker Image - tried version') {
            
            when {
                expression {
                    return ("${PIPELINE_ACTION}" == 'BUILD')
                }
            }

            steps {
                script {
                    docker.build("${AWS_ECR_NAME}")
                }
            }
        }

       stage('Deploy Docker Image') {

            when {
                expression {
                    return ("${PIPELINE_ACTION}" == 'BUILD')
                }
            }

            steps {
                script {
                    docker.withRegistry("${AWS_ECR_URL}", 'ecr:us-east-1:aws-resources') {
                        docker.image("${AWS_ECR_NAME}").push('latest')
                    }
                }
            }
       }

       stage('Deploy image to EKS') {

            when {
                expression {
                    return ("${PIPELINE_ACTION}" == 'DEPLOY')
                }
            }
            steps {
                script {
                    withCredentials([[
                    $class: 'AmazonWebServicesCredentialsBinding',
                    credentialsId: 'aws-resources',
                    accessKeyVariable: 'AWS_ACCESS_KEY_ID',
                    secretKeyVariable: 'AWS_SECRET_ACCESS_KEY']]) {
                        bat """
                           helm repo add ${CHART_NAME} ${CHART_REPO_URL}
                           helm repo update
                           helm search repo ${CHART_NAME}
                           aws eks --region us-east-1 update-kubeconfig --name ${AWS_EKS_CLUSTER_NAME}
                           helm upgrade --install ${PROJECT_NAME} ${CHART_NAME}/${CHART_NAME} -f ${CHART_FILE} --version ${CHART_VERSION} --set image.repository=${AWS_ECR_URL_NO_PROTOCOL}/${AWS_ECR_NAME} --set-string image.tag=latest
                        """
                    }
                }
            }
       }
    }
}