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
Verify That Ticketing Instruction Remarks Are Written Correctly When Original Ticket Number And New Ticket Number Are Not Provided
    [Tags]    us11134
    Login To Amadeus Sell Connect Acceptance
    Move Single Passenger And Add Passive Segment With Airline Code PD
    Open CA Corporate Test