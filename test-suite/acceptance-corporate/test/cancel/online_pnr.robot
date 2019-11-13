*** Settings ***
Force Tags        corp
Resource          ../../pages/base.robot
Test Setup        Login To Amadeus Sell Connect Acceptance
# Test Teardown    Close All Browsers

*** Variables ***
${test_file_name}    online_pnr

*** Test Cases ***
Verify That EB Remark Is Updated For Online PNR
    [Tags]    us11196    not_ready
    Create PNR With Active Air Segments For Online PNR
    Complete The PNR With Default Values 
    Fill Up Cancel Segment With Default Values
    # Verify Online Touch Reason Fields Are Populated With Correct Values
    # Update Agent Assisted And Touch Reason Code
    Verify EB Remark Written In The PNR
    
Verify That EB Remark Is Retained For Online PNR
    [Tags]    us11196    not_ready
    Create PNR With Active Air Segments For Online PNR
    Complete The PNR With Default Values 
    Fill Up Cancel Segment With Default Values
    # Verify Online Touch Reason Fields Are Populated With Correct Values
    # Update Agent Assisted And Touch Reason Code
    Verify EB Remark Written In The PNR
    
Verify That Online Touch Reason Fields Are Not Displayed When PNR Has No EB Remark
    [Tags]    us11196    not_ready
    Create PNR With Active Air Segments For Offline PNR
    Complete The PNR With Default Values 
    That Online Touch Reason Fields Are Not Displayed