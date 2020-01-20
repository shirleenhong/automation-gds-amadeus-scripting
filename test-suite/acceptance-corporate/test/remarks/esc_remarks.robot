*** Settings ***
Force Tags        corp
Library           String
Library           SeleniumLibrary
Library           Collections
Library           Screenshot
Resource          ../../pages/amadeus.robot
Resource          ../../pages/remarks.robot
Resource          ../../pages/base.robot
Resource          ../../../resources/common/api-utilities.txt
Test Teardown     Close All Browsers

*** Variables ***
${test_file_name}    esc_remarks

*** Test Cases ***
Verify That The ESC Remarks Are Correctly Written In The PNR If Agent Is ESC And Agent Has Read The ESC Remarks
    [Tags]    us9762    sanity_test
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For ESC Remarks
    Select Counselor Identity: ESC
    Select Yes In Verify ESC Remarks Have Been Read
    Verify ESC Remarks Are Written Correctly In The PNR
    
Verify That The ESC Remarks Are Correctly Written In The PNR If Agent Is ESC And Agent Has Not Read The ESC Remarks
    [Tags]    us9762
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For ESC Remarks
    Select Counselor Identity: ESC
    Select No In Verify ESC Remarks Have Been Read
    Verify ESC Remarks Are Written Correctly In The PNR
    
Verify That The ESC Remarks Should Not Be Written In The PNR If Agent Selected is OFC
    [Tags]    us9762
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For ESC Remarks
    Select Counselor Identity: OFC
    Verify That ESC Remarks Tab Is Not Displayed
    Verify ESC Remarks Are Not Written In The PNR
    
Verify That The ESC Remarks Should Not Be Written In The PNR If No Agent Is Selected
    [Tags]    us9762
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For ESC Remarks
    Verify That ESC Remarks Tab Is Not Displayed
    Verify ESC Remarks Are Not Written In The PNR
    