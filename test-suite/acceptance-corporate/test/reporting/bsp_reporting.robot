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
    Open CA Corporate Test
    Click Full Wrap
    Add Client Reporting Values For Single BSP Segment
    Click Submit To PNR
    Verify That Client Reporting Remarks Are Written In The PNR For Single TST
    
Verify That Reporting Remark Are Written For Multiple TSTs
    [Tags]    us10551
    Login To Amadeus Sell Connect Acceptance
    Move Single Passenger And Add Multiple BSP Segment With TSTs
    Open CA Corporate Test
    Click Full Wrap
    Add Client Reporting Values For Multiple BSP Segment
    Click Submit To PNR
    Verify That Client Reporting Remarks Are Written In The PNR For Multiple TSTs

Verify That Client Reporting Are Correct For Exchange PNR
    [Tags]    us10551
    Login To Amadeus Sell Connect Acceptance
    Move Single Passenger And Add Single BSP Segment With TST
    Create Exchange PNR In The GDS
    Open CA Corporate Test
    Click Full Wrap
    Click Submit To PNR
    Verify That BSP Client Reporting Remarks Are Written In The PNR For Exchange TST
    Delete Fare and Itinerary