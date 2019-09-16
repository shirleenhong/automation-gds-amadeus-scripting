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
Resource          ../../pages/fees.robot

*** Test Cases ***
Verify OBT PNR Added Remarks For Supplemental Fees
    Login To Amadeus Sell Connect Acceptance
    Move Single Passenger With Transborder Segments And Single Ticket
    Open CA Corporate Test
    Verify OBT PNR defaults Fee For Tkt And Write No Fee Code In The PNR
    
Verify Non OBT PNR Added Remarks For Supplemental Fees    
    Login To Amadeus Sell Connect Acceptance
    Move Single Passenger With Transborder Segments And Single Ticket
    Open CA Corporate Test
    Verify Non OBT PNR defaults Fee For Tkt And Write No Fee Code In The PNR
    
Verify That Canada Domestic PNR Added Remarks For Schedule Change Fee
    Login To Amadeus Sell Connect Acceptance
    Move Single Passenger With Multiple Segment For Dom Canada With TSTs
    Open CA Corporate Test
