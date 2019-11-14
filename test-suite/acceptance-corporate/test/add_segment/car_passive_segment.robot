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
Test Setup       Login To Amadeus Sell Connect Acceptance     
Test Teardown    Close All Browsers

*** Test Cases ***
Verify That Car Passive Segment With Optional Values Are Added In The PNR
    [Tags]  us15703
    Move Single Passenger
    Add Passive Car Segment With Optional Values
    Verify Passive Car Segment And RIR Remarks Are Written In The PNR

Verify That Car Passive Segment Without Optional Values Are Added In the PNR
    [Tags]  us15703
    Move Single Passenger
    Add Passive Car Segment Without Optional Values
    Verify Passive Car Segment And RIR Remarks Are Written In The PNR
    
Verify That Multiple Car Passive Segments Are Added In the PNR
    [Tags]  us15703
    Move Multiple Passenger
    Add Multiple Passive Car Segment
    Verify Multiple Passive Car Segment And RIR Remarks Are Written In The PNR
    