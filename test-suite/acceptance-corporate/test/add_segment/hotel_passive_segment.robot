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
Verify Hotel Segment and RIR Remarks Are Written If Hotel Chain Code and Airport Code added in the UI is Valid
    [Tags]  us9881
    Login To Amadeus Sell Connect Acceptance
    Move Single Passenger
    Add Passive Hotel Segment With Values On Optional Fields
    Verify Hotel Segment And RIR Remarks Are Written In The PNR
    
Verify Hotel Segment and RIR Remarks Are Written If Hotel Chain Code and Airport Code added in the UI is Invalid
    [Tags]  us9881
    Login To Amadeus Sell Connect Acceptance
    Move Single Passenger
    Add Passive Hotel Segment With Hotel Details Input
    Verify Hotel Segment And RIR Remarks Are Written In The PNR
    
Verify Hotel Segment and RIR Remarks Are Written When Optional Fields Are Blank
    [Tags]  us9881
    Login To Amadeus Sell Connect Acceptance
    Move Single Passenger
    Add Passive Hotel Segment Without Values On Optional Fields
    Verify Hotel Segment And RIR Remarks Are Written In The PNR