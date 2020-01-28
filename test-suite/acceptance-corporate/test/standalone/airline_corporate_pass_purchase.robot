*** Settings ***
Force Tags        corp
Library           String
Library           SeleniumLibrary
Library           Collections
Library           Screenshot
Resource          ../../pages/amadeus.robot
Resource          ../../pages/base.robot
Resource          ../../pages/payment.robot
Resource          ../../pages/reporting.robot
Resource          ../../pages/ticketing.robot
Test Setup       Login To Amadeus Sell Connect Acceptance 
Test Teardown    Close All Browsers

*** Test Cases ***
Verify That For Air Canada Pass Purchase Correct Fee, Remarks And Queue Are Written For Single Segment In The PNR
    [Tags]    US11387
    