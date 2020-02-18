*** Settings ***
Force Tags        corp
Resource          ../../pages/base.robot
Test Setup       Login To Amadeus Sell Connect Acceptance
Test Teardown    Close All Browsers

*** Variables ***
${test_file_name}    esc_remarks

*** Test Cases ***
Verify That The ESC Remarks Are Correctly Written In The PNR If Agent Is ESC And Agent Has Read The ESC Remarks
    [Tags]    us9762    sanity_test    us17741
    Create PNR With Active Air Segments For ESC Remarks
    Select Counselor Identity: 24H
    Select Yes In Verify ESC Remarks Have Been Read
    Verify ESC Remarks Are Written Correctly In The PNR
    
Verify That The ESC Remarks Are Correctly Written In The PNR If Agent Is ESC And Agent Has Not Read The ESC Remarks
    [Tags]    us9762    us17741
    Create PNR With Active Air Segments For ESC Remarks
    Select Counselor Identity: 24H
    Select No In Verify ESC Remarks Have Been Read
    Verify ESC Remarks Are Written Correctly In The PNR
    
Verify That The ESC Remarks Should Not Be Written In The PNR If Agent Selected is OFC
    [Tags]    us9762    us17741
    Create PNR With Active Air Segments For ESC Remarks
    Select Counselor Identity: OSC
    Verify That ESC Remarks Tab Is Not Displayed
    Verify ESC Remarks Are Not Written In The PNR
    
Verify That The ESC Remarks Should Not Be Written In The PNR If No Agent Is Selected
    [Tags]    us9762    us17741
    Create PNR With Active Air Segments For ESC Remarks
    Verify That ESC Remarks Tab Is Not Displayed
    Verify ESC Remarks Are Not Written In The PNR
    