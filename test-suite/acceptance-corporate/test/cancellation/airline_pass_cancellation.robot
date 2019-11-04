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
Test Teardown    Close All Browsers

*** Test Cases ***
Verify Cancellation For Air Canada Pass And Add Matrix Invoicing Segment And Write RMT TKT And RIR line for Cancellation Fee
    [Tags]    US10986
    Login To Amadeus Sell Connect Acceptance
    Move Single Passenger For EN
    Add Matrix Accounting Remark For Air Canada Pass Purchase
    Finish PNR
    Navigate To Add Accounting Line
    
    