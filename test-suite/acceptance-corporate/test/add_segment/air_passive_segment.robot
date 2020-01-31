*** Settings ***
Force Tags        corp
Library           String
Resource          ../../pages/base.robot
Test Setup       Login To Amadeus Sell Connect Acceptance
Test Teardown    Close All Browsers

*** Variables ***
${test_file_name}    add_segment

*** Test Cases ***
Verify Corp Passive Air Segment Is Added In the PNR For Non ZZ Details
    [Tags]    us9883
    Move Single Passenger
    Add Air Segment for Non ZZ Details In The PNR
    Verify Air Segment for Non ZZ Details In The PNR
    
Verify Corp Passive Air Segment Is Added In the PNR For ZZ Details
    [Tags]    us9883
    Move Single Passenger
    Add Air Segment for ZZ In The PNR
    Verify Air Segment for ZZ In The PNR
    