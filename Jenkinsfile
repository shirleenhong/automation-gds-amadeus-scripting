#!/usr/bin/env groovy

import groovy.json.JsonSlurper
import java.time.Instant

pipeline {
  agent any
  environment {
    REGION_NAME = "us-west-2"
    REGISTRY_ID = "061654913004"
    CLUSTER_NAME = "dev-services"
    ECR_HOST = 'dkr.ecr.us-west-2.amazonaws.com'    
    APPLICATION_NAME = "bpg-gds-scripting-amadeus"
  }
  // General Options
  options {
      buildDiscarder(logRotator(daysToKeepStr: '1', numToKeepStr: '5'))
  }

  parameters {
    string(name: 'TAG_VERSION', defaultValue: '1.0.0-SNAPSHOT', description: 'Docker tag version')
    // booleanParam(name: 'RUN_PERF_TEST', defaultValue: false, description: 'Execute Perf Test?')
    booleanParam(name: 'DEPLOY_TO_DEV', defaultValue: false, description: 'Deploy to Dev Environment?')
    booleanParam(name: 'RUN_SANITY_DEV', defaultValue: false, description: 'Run Sanity on Dev Environment?')
    booleanParam(name: 'DEPLOY_TO_TEST', defaultValue: false, description: 'Deploy to Test Environment?')
    booleanParam(name: 'RUN_SANITY_TEST', defaultValue: false, description: 'Run Sanity on Test Environment?')
    booleanParam(name: 'DEPLOY_TO_STAGING', defaultValue: false, description: 'Deploy to Staging Environment?')
    booleanParam(name: 'RUN_SANITY_STAGING', defaultValue: false, description: 'Run Sanity on Staging Environment?')
    booleanParam(name: 'DEPLOY_TO_PROD', defaultValue: false, description: 'Deploy to Production Environment?')
  }

  stages {
    stage('DEV:Deploy') {
      when {
          expression {
              return params.DEPLOY_TO_DEV
          }
      }
      environment {
        ENVIRONMENT = 'dev'
        REGISTRY_ID = '061654913004'
        CLUSTER_NAME = 'dev-services'
        CONTAINER_NAME = 'dev-${APPLICATION_NAME}'
      }
      steps {
        script {
            deployDockerContainer()
        }
      }
    }
    stage('TEST:Deploy') {
      when {
        expression {
          return params.DEPLOY_TO_TEST
        }
      }
      environment {
        ENVIRONMENT = 'test'
        REGISTRY_ID = '061654913004'
        CLUSTER_NAME = 'test-services'
        CONTAINER_NAME = 'test-${APPLICATION_NAME}'
      }
      steps {
        script {
            deployDockerContainer()
        }
      }
    }
    stage('STAGING:Deploy') {
      when {
        expression {
            return params.DEPLOY_TO_STAGING
        }
      }
      environment {
        ENVIRONMENT = 'staging'
        REGISTRY_ID = '319497233673'
        CLUSTER_NAME = 'staging-services'
        CONTAINER_NAME = 'staging-${APPLICATION_NAME}'
        AWS_STAGING_ROLE = credentials('staging-jenkins-role')
      }
      steps {
        script {
            deployDockerContainer()
        }
      }
    }
    stage('PROD:Deploy') {
      when {
        expression {
            return params.DEPLOY_TO_PROD
        }
      }
      environment {
        ENVIRONMENT = 'prod'
        CLUSTER_NAME = 'services'
        REGISTRY_ID = '169046481431'
        CONTAINER_NAME = '${APPLICATION_NAME}'
        AWS_PROD_ROLE = credentials('jenkins-role')
      }
      steps {
        script {
            deployDockerContainer()
        }
      }
    }
  }

// Post Pipeline Job Actions
post {
    always {
        echo "Wipe the workspace!"
        cleanWs()
    }
    success {
        echo "Build success!"
        script {
          runRobotTests()
        }
    }
    failure {
        echo "Build failure!"
    }
  }
}

def runRobotTests() {
    if (params.RUN_SANITY_DEV) {
        echo 'Running Sanity Test in Dev Environment'
        build job: 'Amadeus GDS Scripting - Sanity', parameters: [string(name: 'ENV', value: "Dev")]
    }
    if (params.RUN_SANITY_TEST) {
        echo 'Running Sanity Test in Test Environment'
        build job: 'Amadeus GDS Scripting - Sanity', parameters: [string(name: 'ENV', value: "Test")]
    }
    if (params.RUN_SANITY_STAGING) {
        echo 'Running Sanity Test in Staging Environment'
        build job: 'Amadeus GDS Scripting - Sanity', parameters: [string(name: 'ENV', value: "UAT"), string(name: 'BRANCH', value: "staging")]
    }
}

def deployDockerContainer() {
  echo ' ============== ECS Deployment Start ============== '
  echo 'Deploying to ' + env.ENVIRONMENT
  echo 'Cluster Name : ' + env.CLUSTER_NAME

  if(env.ENVIRONMENT == 'prod') {
    script {
        echo "Configuring Production user"
        def PROD_ROLE = sh(returnStdout: true, script: "aws sts assume-role --role-arn $AWS_PROD_ROLE --role-session-name $ENVIRONMENT-webapp-template-pipeline").trim()
        echo 'PROD_ROLE: ' + PROD_ROLE
        def PROD_ROLE_JSON = convertResponseToJson(PROD_ROLE)
        env.AWS_SECRET_ACCESS_KEY=PROD_ROLE_JSON.Credentials.SecretAccessKey
        env.AWS_ACCESS_KEY_ID=PROD_ROLE_JSON.Credentials.AccessKeyId
        env.AWS_SESSION_TOKEN=PROD_ROLE_JSON.Credentials.SessionToken
    }
  } else if(env.ENVIRONMENT == 'staging') {
    script {
        echo "Configuring Staging user"
        def STAGING_ROLE = sh(returnStdout: true, script: "aws sts assume-role --role-arn $AWS_STAGING_ROLE --role-session-name $ENVIRONMENT-webapp-template-pipeline").trim()
        echo 'STAGING_ROLE: ' + STAGING_ROLE
        def STAGING_ROLE_JSON = convertResponseToJson(STAGING_ROLE)
        env.AWS_SECRET_ACCESS_KEY=STAGING_ROLE_JSON.Credentials.SecretAccessKey
        env.AWS_ACCESS_KEY_ID=STAGING_ROLE_JSON.Credentials.AccessKeyId
        env.AWS_SESSION_TOKEN=STAGING_ROLE_JSON.Credentials.SessionToken
    }
  }
  
  echo ' ============== ECR Push Start ============== '
  echo ' ============== docker build ============== '
  sh 'docker build --build-arg ENV=${ENVIRONMENT} -t ${APPLICATION_NAME}:${TAG_VERSION} .'
  echo ' ============== docker tag ============== '
  sh 'docker tag ${APPLICATION_NAME}:${TAG_VERSION} ${REGISTRY_ID}.${ECR_HOST}/${APPLICATION_NAME}:${TAG_VERSION}'
  echo 'Pushing docker container to ECR triggered by ' + getBuildUserName()
  echo ' ==============  Username is ' + getBuildUserName() + ' ============== '
  echo ' ============== Docker Push ============== '
  sh 'eval $(aws ecr get-login --registry-ids ${REGISTRY_ID} --no-include-email --region ${REGION_NAME} | sed \'s|https://||\')'
  sh 'docker push ${REGISTRY_ID}.${ECR_HOST}/${APPLICATION_NAME}:${TAG_VERSION}'
  echo ' ============== ECR Push Complete ============== '

  echo ' >>>>>>>>>>>>>>>>>> ECS Compose <<<<<<<<<<<<<<<< '  
  def dockerComposeFile = "${ENVIRONMENT}-${APPLICATION_NAME}.json"
  sh 'cat ' + workspace + '/docker_compose_v2.json | ' +
   'sed "s|\\$ENVIRONMENT|' + env.ENVIRONMENT + '|g;' +
   's|\\$APPLICATION_NAME|' + env.CONTAINER_NAME + '|g;' +
   's|\\$REGISTRY_ID|' + env.REGISTRY_ID + '|g;' +
   's|\\$ECR_HOST|' + env.ECR_HOST + '|g;' +
   's|\\$TAG_VERSION|1.0.0-SNAPSHOT|g;' +
   's|\\$AWS_REGION|us-west-2|g;' +
   's|\\$NON_SSL_PORT|8080|g;' +
   's|\\$SSL_PORT|8443|g;' +
   's|\\$MEM_LIMIT|720|g;' +
   's|\\$MEM_RESERVATION|512|g;' +
   's|\\$SERVICE_NAME|' + env.APPLICATION_NAME + '|g;' +
   's|\\$ARTIFACT_NAME|' + env.APPLICATION_NAME + '|g" > ' + dockerComposeFile

  sh '/usr/bin/aws ecs register-task-definition --region ${REGION_NAME} --cpu 256 --memory 720 --cli-input-json file://'+dockerComposeFile
  sh '/usr/bin/aws ecs update-service --service ${APPLICATION_NAME} --cluster ${CLUSTER_NAME} --region ${REGION_NAME} --task-definition '+env.CONTAINER_NAME

  echo ' ============== ECS Deployment End ============== '
}

@NonCPS
def convertResponseToJson(String response) {
    return new JsonSlurper().parseText(response)
}

@NonCPS
def getBuildUserName() {
    //return currentBuild.rawBuild.getCause(Cause.UserIdCause).getUserName()
}

@NonCPS
def getBuildUserId() {
    //return currentBuild.rawBuild.getCause(Cause.UserIdCause).getUserId()
    echo 'User'
}
