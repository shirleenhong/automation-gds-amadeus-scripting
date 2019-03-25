#!/usr/bin/env groovy

import groovy.json.JsonSlurper
import java.time.Instant

pipeline {
  agent any
  environment {
    NODE_VERSION = "v8.12.0"
    CLUSTER_NAME = "bpg-gds-scripting-amadeus"
    REGION_NAME = "us-west-2"
    APPLICATION_NAME = "bpg-gds-scripting-amadeus"
    DOCKER_COMPOSE_FILE = "bpg-gds-scripting-amadeus.yml"

    ECR_URL = "379831576876.dkr.ecr.us-west-2.amazonaws.com/bpg-gds-scripting-amadeus"
    // TARGET_GROUP_ARN = 'arn:aws:elasticloadbalancing:us-west-2:379831576876:targetgroup/dev-gds-scripting-amadeus/fdd76e1dc1f3f5d4'
    DEV_TARGET_GROUP_ARN = 'arn:aws:elasticloadbalancing:us-west-2:379831576876:targetgroup/dev-gds-scripting-amadeus-tg/4960397b08f766e7'
    TST_TARGET_GROUP_ARN = 'arn:aws:elasticloadbalancing:us-west-2:379831576876:targetgroup/tst-gds-scripting-amadeus-tg/a7f198ff0a3e11fc'
    STG_TARGET_GROUP_ARN = 'arn:aws:elasticloadbalancing:us-west-2:379831576876:targetgroup/stg-gds-scripting-amadeus-tg/2acfe96b7c098224'
    // PROD_TARGET_GROUP_ARN ='arn:aws:elasticloadbalancing:us-west-2:704608996963:targetgroup/bpg-gds-scripting-amadeus-tg/59e5073548e3d7f6'    
  }
  // General Options
  options {
      buildDiscarder(logRotator(daysToKeepStr: '1', numToKeepStr: '5'))
  }

  parameters {
    string(name: 'TAG_VERSION', defaultValue: '1.0.0-SNAPSHOT', description: 'Docker tag version')

    // booleanParam(name: 'RUN_STATIC_SCAN', defaultValue: false, description: 'Execute Static security Scan?')
    // booleanParam(name: 'RUN_PERF_TEST', defaultValue: false, description: 'Execute Perf Test?')
    booleanParam(name: 'DEPLOY_TO_DEV', defaultValue: false, description: 'Deploy to Dev Environment?')
    // booleanParam(name: 'RUN_REGRESSION_DEV', defaultValue: false, description: 'Run Regression against Dev Environment?')
    booleanParam(name: 'DEPLOY_TO_TEST', defaultValue: false, description: 'Deploy to Test Environment?')
    // booleanParam(name: 'DEPLOY_TO_STAGING', defaultValue: false, description: 'Deploy to Staging Environment?')
    // booleanParam(name: 'DEPLOY_TO_PROD', defaultValue: false, description: 'Deploy to Production Environment?')
    text(name: 'EMAIL_RECIPIENT_LIST', defaultValue: 'JCuenca@carlsonwagonlit.com;', description: 'Regression Test result sent to email recipient list (separated by semi-colon)')
    choice(name: 'DESIRED_NO_OF_TASKS', choices: '1\n2\n3', description: 'Desired number of running tasks to scale with')
  }

  stages {
    stage('Build/Prepare') {
      when {
        expression { 
          return params.DEPLOY_TO_DEV
        }
      }
      steps{
        dir("."){
          echo 'Preparing docker container'
          sh 'docker build -t bpg-gds-scripting-amadeus:${TAG_VERSION} .'
          sh 'docker tag bpg-gds-scripting-amadeus:${TAG_VERSION} ${ECR_URL}:${TAG_VERSION}'

          echo 'Pushing docker container to ECR'
          sh 'eval $(aws ecr get-login --no-include-email --region ${REGION_NAME} | sed \'s|https://||\')'
          sh 'docker push ${ECR_URL}:${TAG_VERSION}'
        }
      }
    }
    stage('SecurityScan'){
      when {
        expression {
          return params.RUN_STATIC_SCAN
        }
      }
      steps{
        dir('.') {
          script {
            echo "APPLICATION_NAME : ${APPLICATION_NAME}"
            echo "WORKSPACE : ${WORKSPACE}"
            def date = new Date().format('yyyy-MM-dd')
            def buildId = params.APPLICATION_NAME
            def report = buildId + "-fortify-report"
            echo 'Security Scanning using HP Fortify (Code Review)...'
            sh "${FORTIFY_BIN}/sourceanalyzer -b ${APPLICATION_NAME} -clean -verbose"
            sh "${FORTIFY_BIN}/sourceanalyzer -b ${APPLICATION_NAME} ${WORKSPACE}"
            sh "${FORTIFY_BIN}/sourceanalyzer -b ${APPLICATION_NAME} -scan -f '${WORKSPACE}/${APPLICATION_NAME}-${BUILD_NUMBER}.fpr'"
            sh "${FORTIFY_BIN}/ReportGenerator -format \"pdf\" -template ${FORTIFY_TEMPLATE_FILE} -f ${APPLICATION_NAME}-${BUILD_NUMBER}.pdf -source ${APPLICATION_NAME}-${BUILD_NUMBER}.fpr -verbose"
            //sh "'BIRTReportGenerator -template 'Developer Workbook' -source ''${WORKSPACE}/Assessment.fpr' -format 'PDF' -output '${WORKSPACE}/Security_Findings.pdf'"
            sh "ls -lrt '${WORKSPACE}' "
            //sh "fortifyclient -url ${fortifyUrl} -authtoken ${fortifyAuthToken} uploadFPR -file ${WORKSPACE}/Assessment.fpr -application ${JOB_NAME} -applicationVersion '1'"
            //archiveArtifacts artifacts: '**/Security_Findings.pdf'
            emailext attachmentsPattern: "**/${APPLICATION_NAME}-${BUILD_NUMBER}.pdf", body: "Attached is the HP Fortity report for ${APPLICATION_NAME}-${BUILD_NUMBER}", subject: "[Jenkins] HP Fortify Report ${APPLICATION_NAME}-${BUILD_NUMBER}", to: 'JCuenca@carlsonwagonlit.com'
          }
        }
      }
    }      
    stage('DEV:Deploy') {
      when {
          expression {
              return params.DEPLOY_TO_DEV
          }
      }
      environment {
        ENVIRONMENT = 'dev'
      }
      steps {
        script {
            echo "env.DEV_TARGET_GROUP_ARN : " + env.DEV_TARGET_GROUP_ARN
            deployDockerContainer(env.DEV_TARGET_GROUP_ARN)
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
      }
      steps {
        script {
            echo "env.TST_TARGET_GROUP_ARN : " + env.TST_TARGET_GROUP_ARN
            deployDockerContainer(env.TST_TARGET_GROUP_ARN)
        }
      }
    }    
    stage('TEST:Sanity') {
      steps {
        echo 'Running Sanity Test'
      }
    }    
    stage('TEST:Run Perf Test') {
      when {
        expression {
          return params.RUN_PERF_TEST
        }
      }
      steps {
        echo 'Running Performance Test'
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
      }
      steps {
        script {
            echo "env.STG_TARGET_GROUP_ARN : " + env.STG_TARGET_GROUP_ARN
            deployDockerContainer(env.STG_TARGET_GROUP_ARN)
        }
      }
    }
    stage('Push Container to ECR PROD') {
      when {
          expression {
              return params.DEPLOY_TO_PROD
          }
      }
      environment {
          ACCOUNT = 'prod'
          AWS_PROD_ROLE = credentials('aws-prod-role')
          ECR_URL = '704608996963.dkr.ecr.us-west-2.amazonaws.com/bpg-csp/bpg-gds-scripting-amadeus'
      }
      steps {
          script {
              echo '=====================Deploying to Prod =============='
              echo "AWS_PROD_ROLE: ${AWS_PROD_ROLE}"

              def prodEcrUrl = '704608996963.dkr.ecr.us-west-2.amazonaws.com/bpg-csp/bpg-gds-scripting-amadeus'
              deployDockerContainerToECR(prodEcrUrl, TAG_VERSION, REGION_NAME)
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
        AWS_PROD_ROLE = credentials('aws-prod-role')
      }
      steps {
        script {
            echo "env.PROD_TARGET_GROUP_ARN : " + env.PROD_TARGET_GROUP_ARN
            deployDockerContainer(env.PROD_TARGET_GROUP_ARN)
        }
      }
    }
    stage('STAGING:Sanity') {
      steps {
        echo 'Running Sanity Test'
      }
    }
    stage('PROD:Sanity') {
      steps {
        echo 'Running Sanity Test'
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
          echo "success!"
      }
      failure {
          echo "failure!"
      }
  }
}

def deployDockerContainer(targetGroupARN) {
    echo ' ============== ECS Deployment Start ============== '
    echo 'Deploying to ' + env.ENVIRONMENT 
    echo 'ARN ' + targetGroupARN

    env.targetGroupARN = targetGroupARN    
    env.CLUSTER_NAME = env.ENVIRONMENT + "-" + env.APPLICATION_NAME
    echo "After Setting Cluster Name :" + env.CLUSTER_NAME

    if( env.ENVIRONMENT == 'prod') {
        script {
            echo "Configuring Production user"
            def PROD_ROLE = sh(returnStdout: true, script: "aws sts assume-role --role-arn $AWS_PROD_ROLE --role-session-name $ENVIRONMENT-webapp-template-pipeline").trim()
            echo 'PROD_ROLE: ' + PROD_ROLE
            def PROD_ROLE_JSON = convertResponseToJson(PROD_ROLE)
            env.AWS_SECRET_ACCESS_KEY=PROD_ROLE_JSON.Credentials.SecretAccessKey
            env.AWS_ACCESS_KEY_ID=PROD_ROLE_JSON.Credentials.AccessKeyId
            env.AWS_SESSION_TOKEN=PROD_ROLE_JSON.Credentials.SessionToken
            env.TEMP_FILE = env.ENVIRONMENT + "_" + params.DOCKER_COMPOSE_FILE
            env.CLUSTER_NAME = env.APPLICATION_NAME
        }
        env.TEMP_FILE = env.ENVIRONMENT + "_" + env.DOCKER_COMPOSE_FILE
        sh 'cat ${DOCKER_COMPOSE_FILE} | sed "s/\\$environment/$ENVIRONMENT/g;s/\\$CONFIG_ENV/$CONFIG_ENV/g;s/\\$tag_version/$TAG_VERSION/g" > ${TEMP_FILE}'
        sh 'cat ${TEMP_FILE}'
    } else {
        env.TEMP_FILE = env.ENVIRONMENT + "_non-prod-" + env.DOCKER_COMPOSE_FILE
        sh 'cat non-prod-${DOCKER_COMPOSE_FILE} | sed "s/\\$environment/$ENVIRONMENT/g;s/\\$CONFIG_ENV/$CONFIG_ENV/g;s/\\$tag_version/$TAG_VERSION/g" > ${TEMP_FILE}'        
        sh 'ls -ltr'
        sh 'cat ${TEMP_FILE}'
    }

    timeout(time: 3, unit: 'MINUTES') {
        script {
            waitUntil {
                script {
                    def describeClustersRS = ""
                    if (env.ENVIRONMENT == 'prod')
                    {
                        describeClustersRS = sh(returnStdout: true, script: "aws ecs describe-clusters --cluster ${APPLICATION_NAME} --region ${REGION_NAME}").trim()
                    } else {
                        describeClustersRS = sh(returnStdout: true, script: "aws ecs describe-clusters --cluster ${ENVIRONMENT}-${APPLICATION_NAME} --region ${REGION_NAME}").trim()
                    }
                    echo 'describeClustersRS: '
                    def describeClustersJSON = new JsonSlurper().parseText(describeClustersRS)
                    def registeredContainerCount = describeClustersJSON.clusters[0].registeredContainerInstancesCount
                    containerCount = registeredContainerCount
                    println("Current container count is " + containerCount)
                    return (containerCount > 0)
                }
            }
        }
    }
    
  echo ' >>>>>>>>>>>>>>>>>> ECS Compose <<<<<<<<<<<<<<<< '
  echo "Cluster Name: ${CLUSTER_NAME}"
  
  sh '/usr/local/bin/ecs-cli compose --file ${TEMP_FILE} --region ${REGION_NAME} --cluster ${ENVIRONMENT}-bpg-gds-scripting-amadeus --project-name ${APPLICATION_NAME} service up --container-name ${APPLICATION_NAME} --container-port 8080 --target-group-arn ${targetGroupARN} --health-check-grace-period 120 --deployment-max-percent 100 --deployment-min-healthy-percent 0 --force-deployment --create-log-groups --timeout 10'
  sh '/usr/local/bin/ecs-cli compose --file ${TEMP_FILE} --region ${REGION_NAME} --cluster ${ENVIRONMENT}-bpg-gds-scripting-amadeus --project-name ${APPLICATION_NAME} service scale ${DESIRED_NO_OF_TASKS} --deployment-max-percent 100 --deployment-min-healthy-percent 0'

  echo ' ============== ECS Deployment End ============== '
}

def deployDockerContainerToECR(String ecrUrl, String tagVersion, String region) {
    echo ' ============== ECR Push Start ============== '

    def registryId = ""
    env.ECR_URL = ecrUrl;
    if( ACCOUNT=='prod') {
        script {
            echo "Configuring Production user"
            def PROD_ROLE = sh(returnStdout: true, script: "aws sts assume-role --role-arn $AWS_PROD_ROLE --role-session-name $ACCOUNT-webapp-template-pipeline").trim()
            def PROD_ROLE_JSON = convertResponseToJson(PROD_ROLE)
            env.AWS_SECRET_ACCESS_KEY=PROD_ROLE_JSON.Credentials.SecretAccessKey
            env.AWS_ACCESS_KEY_ID=PROD_ROLE_JSON.Credentials.AccessKeyId
            env.AWS_SESSION_TOKEN=PROD_ROLE_JSON.Credentials.SessionToken
        }
        registryId = "704608996963"
    } else {
        registryId = "379831576876"
    }
    env.REGISTERY_ID = registryId

    echo ' ============== docker build ============== '
    sh 'docker build -t bpg-csp/bpg-gds-scripting-amadeus:${TAG_VERSION} .'
    echo ' ============== docker tag ============== '
    sh 'docker tag bpg-csp/bpg-gds-scripting-amadeus:${TAG_VERSION} ${ECR_URL}:${TAG_VERSION}'
    echo 'Pushing docker container to ECR triggered by ' + getBuildUserName()
    echo ' ==============  Username is ' + getBuildUserName() + ' ============== '
    echo ' ============== Docker Push ============== '   
    sh 'eval $(aws ecr get-login --registry-ids ${REGISTERY_ID} --no-include-email --region ${REGION_NAME} | sed \'s|https://||\')'
    sh 'docker push ${ECR_URL}:${TAG_VERSION}'

    echo ' ============== ECR Push Complete ============== '
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
