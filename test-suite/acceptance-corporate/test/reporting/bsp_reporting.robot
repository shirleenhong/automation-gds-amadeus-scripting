*** Settings ***
Force Tags        corp
Library           String
Library           SeleniumLibrary
Library           Collections
Library           Screenshot
Resource          ../../pages/amadeus.robot
Resource          ../../pages/reporting.robot
Resource          ../../pages/base.robot

*** Test Cases ***
Verify That Reporting Remarks Are Written For Single TST
    [Tags]    us10551
    Login To Amadeus Sell Connect Acceptance
    Move Single Passenger And Add Single BSP Segment With TST
    Add Client Reporting Values For Single BSP Segment
    Verify That Client Reporting Remarks Are Written In The PNR For Single TST
    [Teardown]    Close Browser
    
Verify That Reporting Remark Are Written For Multiple TSTs
    [Tags]    us10551
    Login To Amadeus Sell Connect Acceptance
    Move Single Passenger And Add Multiple BSP Segment With TSTs
    Add Client Reporting Values For Multiple BSP Segment
    Verify That Client Reporting Remarks Are Written In The PNR For Multiple TSTs
    [Teardown]    Close Browser
    
Verify That Client Reporting Are Correct For Exchange PNR
    [Tags]    us10551
    Login To Amadeus Sell Connect Acceptance
    Move Single Passenger And Add Single BSP Segment With TST
    Create Exchange PNR In The GDS
    Select Client Reporting Fields To Be Written
    Verify That BSP Client Reporting Remarks Are Written In The PNR For Exchange TST
    Delete Fare and Itinerary
    Handle Simultaneous Changes To PNR
    # [Teardown]    Close Browser