*** Settings ***
Force Tags        corp
Resource          ../../pages/base.robot
Test Setup        Login To Amadeus Sell Connect Acceptance
Test Teardown     Close All Browsers

*** Variables ***
${test_file_name}    online_pnr

*** Test Cases ***
Verify That EB Remark Is Updated For Online PNR
    [Tags]    us11196
    Create PNR With Active Air Segments For Online PNR
    Complete The PNR With Default Values 
    Verify Online Fields And Update Agent Assisted And Touch Reason Codes
    Verify EB Remark Written In The PNR
    
Verify That EB Remark Is Retained For Online PNR
    [Tags]    us11196
    Create PNR With Active Air Segments For Online PNR With No Changes
    Complete The PNR With Default Values 
    Navigate To Page Reporting Remarks
    Verify EB Remark Written In The PNR
    
Verify That Online Touch Reason Fields Are Not Displayed When PNR Has No EB Remark
    [Tags]    us11196    full_regression
    Create PNR With Active Air Segments For Offline PNR
    Complete The PNR With Default Values 
    Verify That Online Touch Reason Fields Are Not Displayed
    
Verify That Touchless PNR Is Updated
    [Tags]    us11196    de3140
    Create PNR With Active Air Segments For Touchless PNR
    Complete The PNR With Default Values
    Update Agent Assisted And Touch Reason Codes
    Verify EB Remark Written In The PNR