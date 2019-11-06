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
Resource          ../../pages/cancel.robot
Test Teardown    Close All Browsers

*** Test Cases ***
Verify Cancellation For Air Canada Pass And Add Matrix Invoicing Segment And Write RMT TKT And RIR line for Cancellation Fee
    [Tags]    US10986
    Login To Amadeus Sell Connect Acceptance
    Move Single Passenger For EN
    Add Matrix Accounting Remark For Air Canada Pass Purchase
    Finish PNR
    Navigate To Add Accounting Line
    Cancel Existing Airline AC Pass And Select FLEX And Add Fee For All Segment
    Verify Itinerary Remarks For AC Cancellation Fee Of 25.01 And Base Amount Of 890.00
    Verify Cancellation Ticketing Remarks For AC And Segment 2-3 Are Written In The PNR
    Verify RMX Remarks Are Written In The PNR
    
Verify Cancellation For Westjet Pass And Add Matrix Invoicing Segment And Write RMT TKT And RIR line for Cancellation Fee
    [Tags]    US10986
    Login To Amadeus Sell Connect Acceptance
    Move Single Passenger For EN
    Add Matrix Accounting Remark For WestJet Pass Purchase
    Finish PNR
    Navigate To Add Accounting Line
    Cancel Existing Airline WS Pass And Select ${type_of_fare} And Add Fee For All Segment   
    Verify Itinerary Remarks For WS Cancellation Fee Of 25.01 And Base Amount Of 890.00
    Verify Cancellation Ticketing Remarks For AC And Segment 2-3 Are Written In The PNR
    Verify RMX Remarks Are Written In The PNR
    
Verify Cancellation For Porter Pass And Add Matrix Invoicing Segment And Write RMT TKT And RIR line for Cancellation Fee
    [Tags]    US10986
    Login To Amadeus Sell Connect Acceptance
    Move Single Passenger For FR
    Add Matrix Accounting Remark For Porter Pass Purchase
    Finish PNR
    Navigate To Add Accounting Line
    Cancel Existing Airline WS Pass And Select ${type_of_fare} And Add Fee For All Segment   
    Verify Itinerary Remarks For WS Cancellation Fee Of 25.01 And Base Amount Of 890.00
    Verify Cancellation Ticketing Remarks For AC And Segment 2 Are Written In The PNR
    Verify RMX Remarks Are Written In The PNR
    
