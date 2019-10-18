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
Test Teardown    Close All Browsers

*** Test Cases ***
Verify That Reporting Remarks Are Written For Single Non-BSP Segment
    [Tags]    us13617
    Login To Amadeus Sell Connect Acceptance
    Move Single Passenger And Add Passive Segment With Airline Code AC
    Add Non-BSP Ticketing Details For Segment 2
    Click Save Button
    Verify Client Reporting Fields For Non-BSP
    Verify That Non-BSP Client Reporting Remarks Are Written In The PNR For Single Segment
    
   
Verify That Reporting Remarks Are Written For Multiple Non-BSP Segments
    [Tags]    us13617
    Login To Amadeus Sell Connect Acceptance
    Move Single Passenger And Add Multiple Air Passive Segments With Airline Code WS
    Add Non-BSP Ticketing Details For Multiple Segments
    Click Save Button
    Verify Client Reporting Fields For Non-BSP
    Verify That Non-BSP Client Reporting Remarks Are Written In The PNR For Multiple Segments
    
    
Verify That Updated Reporting Values Are Written For Multiple Non-BSP Segments
    [Tags]    us13617
    Login To Amadeus Sell Connect Acceptance
    Move Single Passenger And Add Passive Segment With Airline Code AC
    Add Non-BSP Ticketing Details For Segment 2
    Click Save Button
    Update Client Reporting Values For Non-BSP
    Verify That Updated Non-BSP Client Reporting Remarks Are Written In The PNR
    
    
Verify That Accounting Remark Is Written Correctly For Non BSP Exchange
    [Tags]    us13616
    Login To Amadeus Sell Connect Acceptance
    Move Single Passenger And Add Passive Segment With Airline Code PD
    Add Non-BSP Exchange Ticketing Details For Single Segment Without Ticket Number
    Verify That Supplier Code Default Value Is Correct For PD
    Verify Accounting Remark Is Written Correctly For Non BSP Exchange
    