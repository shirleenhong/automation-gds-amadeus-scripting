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
Verify That Non-BSP Ticketing Remarks Are Written For Single Segment
    [Tags]    us10552
    Login To Amadeus Sell Connect Acceptance
    Move Single Passenger And Add Passive Segment With Airline Code AC
    Add Non-BSP Ticketing Details For Segment 2
    Verify That Supplier Code Default Value Is Correct For AC
    Verify That Ticketing Remarks For Non-BSP With Single Segment Are Written In The PNR
    
Verify That Non-BSP Ticketing Remarks Are Written For Multiple Segments
    [Tags]    us10552
    Login To Amadeus Sell Connect Acceptance
    Move Single Passenger And Add Multiple Air Passive Segments With Airline Code WS
    Add Non-BSP Ticketing Details For Multiple Segments
    Verify That Supplier Code Default Value Is Correct For WS
    Verify That Ticketing Remarks For Non-BSP With Multiple Segments Are Written In The PNR
    
Verify That Non-BSP Ticketing Remarks Without Ticket Number Are Written
    [Tags]    us10552
    Login To Amadeus Sell Connect Acceptance
    Move Single Passenger And Add Passive Segment With Airline Code MO
    Add Non-BSP Ticketing Details Without Ticket Number For Segment 2
    Verify That Ticketing Remarks For Non-BSP Without Ticket Number Are Written In The PNR 
      
Verify That Multiple Non-BSP Ticketing Remarks Are Written
    [Tags]    us10552    not_ready
    Login To Amadeus Sell Connect Acceptance
    Move Single Passenger And Add Multiple Air Passive Segments With Airline Code WS
    Add Non-BSP Ticketing Details Per Segment
    Verify That Ticketing Remarks For Multiple Non-BSP Are Written In The PNR
    
Verify That APAY Ticketing Remarks Are Written For Single Segment
    [Tags]    us10552    us10028    not_ready
    Login To Amadeus Sell Connect Acceptance
    Move Single Passenger And Add Passive Segment For APAY With Airline Code WS
    Enter FOP Credit Card Remark
    Enter EB Remark For APAY
    Add APAY Ticketing Details For Single Segment - Other Costs
    Verify That Supplier Code Default Value Is Correct For Other Type Of APAY
    Verify That Ticketing Remarks For APAY With Single Segment Are Written In The PNR
    
Verify That APAY Ticketing Remarks Are Written For Multiple Segments
    [Tags]    us10552    us10028
    Login To Amadeus Sell Connect Acceptance
    Move Single Passenger And Add Multiple Air Passive Segments With Airline Code WN
    Enter FOP Credit Card Remark
    Add APAY Ticketing Details For Multiple Segments
    Verify That Supplier Code Default Value Is Correct For Seat Costs APAY
    Verify That Ticketing Remarks For APAY With Multiple Segments Are Written In The PNR
    
Verify That Non-BSP With APAY Ticketing Remarks Are Written 
    [Tags]    us10552    us10028
    Login To Amadeus Sell Connect Acceptance
    Move Single Passenger And Add Multiple Passive Air With Different Airline Codes
    Enter FOP Credit Card Remark
    Enter EB Remark For APAY
    Add Non-BSP and APAY Ticketing Detals For Multiple Segments
    Update Client Reporting Values For Non-BSP
    Verify That Ticketing Remarks For Non-BSP And APAY With Multiple Segments Are Written In The PNR
