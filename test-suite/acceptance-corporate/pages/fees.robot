*** Settings ***
Library           String
Library           SeleniumLibrary
Library           Collections
Library           Screenshot
Resource          base.robot

*** Variables ***
${tab_supplemental_fees}    //div[@formarrayname='segments']
${checkbox_schedule_change}    //input[@id='isExchange']
${list_supplementalFee}    //select[@id='supplementalFee']
${list_no_feeCode}    //select[@id='noFeeCode']

*** Keywords ***
