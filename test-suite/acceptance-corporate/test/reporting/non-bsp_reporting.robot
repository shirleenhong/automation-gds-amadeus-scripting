*** Settings ***
Force Tags        corp
Library           String
Library           SeleniumLibrary
Library           Collections
Library           Screenshot
Resource          ../../pages/amadeus.robot
Resource          ../../pages/base.robot
Resource          ../../pages/reporting.robot
Resource          ../../pages/payment.robot

*** Test Cases ***
Verify That Reporting Remarks Are Written For Single Non-BSP Segment
    [Tags]    us13617
    Login To Amadeus Sell Connect Acceptance
    Move Single Passenger And Add Passive Segment With Airline Code AC
    Open CA Corporate Test
    Click Full Wrap
    Add Non-BSP Ticketing Details For Segment 2
    Add Client Reporting Values For Non-BSP Segments
    Click Submit To PNR
   
Verify That Reporting Remarks Are Written For Multiple Non-BSP Segments
    [Tags]    us13617
    Login To Amadeus Sell Connect Acceptance
    Move Single Passenger And Add Multiple Air Passive Segments With Airline Code WS 
    Open CA Corporate Test
    Click Full Wrap
    Add Multiple Non-BSP Ticketing Details
    Add Client Reporting Values For Multiple Non-BSP Segments
 
    