*** Settings ***
Force Tags        corp
Library           String
Library           SeleniumLibrary
Library           Collections
Library           Screenshot
Resource          ../../pages/base.robot
Test Setup        Login To Amadeus Sell Connect Acceptance
# Test Teardown    Close All Browsers

*** Variables ***
${test_file_name}    corporate_receipt

*** Test Cases ***
Verify Warning Is Displayed And Matrix Remarks Are Written When CC In The FOP Is Not Accepted By The Airline For Single TST
    [Tags]    us11859    not_ready
    Create PNR With Active Air Segments For FOP That Is Not Accepted By The Airline For Single TST
    
Verify Warning Is Displayed And Matrix Remarks Are Written When CC In The FOP Is Not Accepted By The Airline For Multiple TST
    [Tags]    us11859    not_ready
    Create PNR With Active Air Segments For FOP That Is Not Accepted By The Airline For Multiple TST
    
Verify Warning Is Displayed And Matrix Remarks Are Written When CC In The FOP Is Not Accepted By 1 Of The Airline For Multiple TST
    [Tags]    us11859    not_ready
    Create PNR With Active Air Segments For FOP That Is Not Accepted By 1 Of The Airline For Mulitple TST