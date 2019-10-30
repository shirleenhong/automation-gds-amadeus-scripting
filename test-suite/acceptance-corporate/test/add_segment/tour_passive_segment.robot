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
Verify That Tour Passive Segment And RIR Remarks Are Added In The PNR
    [Tags]  us9881
    Login To Amadeus Sell Connect Acceptance
    Move Single Passenger
    Add Passive Tour Segment With Optional Values
    Verify Passive Tour Segment And RIR Remarks Are Written In The PNR

Verify That Multiple Tour Passive Segment Are Written And Is Passenger Related
    [Tags]  us9881
    Login To Amadeus Sell Connect Acceptance
    Move Multiple Passenger
    Add Multiple Passive Tour Segments
    Verify Multiple Passive Tour Segment And RIR Remarks Are Written In The PNR
    
Verify That Tour Passive Segment And RIR Remarks Without Optional Values Are Added In the PNR
    [Tags]  us9881
    Login To Amadeus Sell Connect Acceptance
    Move Single Passenger
    Add Passive Tour Segment Without Optional Values
    Verify Passive Tour Segment And RIR Remarks Are Written In The PNR