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
Resource          ../../pages/add_segment.robot
Test Teardown    Close All Browsers

*** Test Cases ***
Verify Passive Rail Segments Are Added In The PNR For EN
    [Tags]    us9882    US16562
    Login To Amadeus Sell Connect Acceptance
    Move Single Passenger For EN
    Add Multiple Passive Rail Segment For EN PNR
    Verify Passive Rail Segment And RIR Added In The PNR For EN
    
Verify Passive Rail Segments Are Added In The PNR For FR
    [Tags]    us9882    US16562
    Login To Amadeus Sell Connect Acceptance
    Move Single Passenger For FR
    Add Multiple Passive Rail Segment For FR PNR
    Verify Passive Rail Segment And RIR Added In The PNR For FR
    