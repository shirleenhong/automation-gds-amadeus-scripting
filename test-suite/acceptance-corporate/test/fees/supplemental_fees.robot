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
    Create Single Ticket For The PNR
    Open CA Corporate Test
    Verify OBT PNR defaults Fee For Tkt And Write No Fee Code In The PNR
    [Teardown]    Close Browser
    
Verify Non OBT PNR Added Remarks For Supplemental Fees    
    Login To Amadeus Sell Connect Acceptance
    Move Single Passenger With Transborder Segments And Single Ticket
    Create Single Ticket For The PNR
    Open CA Corporate Test
    Verify Non OBT PNR defaults Fee For Tkt And Write No Fee Code In The PNR
    [Teardown]    Close Browser
    
Verify That Canada Domestic PNR Added Remarks For Schedule Change Fee
    Login To Amadeus Sell Connect Acceptance
    Move Single Passenger With Multiple Segment For Dom Canada With TSTs
    Verify Selected Schedule Change Fees In The PNR
    [Teardown]    Close Browser
    
Verify That Transborder PNR Added Remarks For Flat Fee
    Login To Amadeus Sell Connect Acceptance
    Move Single Passenger With Multiple Segment For Transborder With TSTs
    Verify Exchange Flat Fee With Supplemental Fee For Exchange Tkt And Write Remarks In The PNR
    [Teardown]    Close Browser
    
Verify That International PNR Added Remarks For Special Fee
    Login To Amadeus Sell Connect Acceptance
    Move Single Passenger With Single Segment For International With Non Exch Ticket
    Verify Special Fee For Air Ticket
    [Teardown]    Close Browser
    