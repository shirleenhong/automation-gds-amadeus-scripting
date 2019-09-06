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
Verify That Non-BSP Ticketing Remarks Are Written For Single Segment
    [Tags]    us10552
    Login To Amadeus Sell Connect Acceptance
    Move Single Passenger And Add Passive Segment With Airline Code AC
    Open CA Corporate Test
    Click Full Wrap
    Click Payment Panel
    Add Non-BSP Ticketing Details For Segment 2
    Verify That Supplier Code Default Value Is Correct For AC
    Click Save Button
    Click Submit To PNR
    Verify That Ticketing Remarks For Non-BSP With Single Segment Are Written In The PNR
    [Teardown]    Logout To Amadeus Sell Connect
    
Verify That Non-BSP Ticketing Remarks Are Written For Multiple Segments
    [Tags]    us10552
    Login To Amadeus Sell Connect Acceptance
    Move Single Passenger And Add Multiple Air Passive Segments With Airline Code WS
    Open CA Corporate Test
    Click Full Wrap
    Click Payment Panel
    Add Non-BSP Ticketing Details For Multiple Segments
    Verify That Supplier Code Default Value Is Correct For WS
    Click Save Button
    Click Submit To PNR
    Verify That Ticketing Remarks For Non-BSP With Multiple Segments Are Written In The PNR
    Switch To Command Page
    [Teardown]    Logout To Amadeus Sell Connect

Verify That Non-BSP Ticketing Remarks Without Ticket Number Are Written
    [Tags]    us10552
    Login To Amadeus Sell Connect Acceptance
    Move Single Passenger And Add Passive Segment With Airline Code MO
    Open CA Corporate Test
    Click Full Wrap
    Click Payment Panel
    Add Non-BSP Ticketing Details Without Ticket Number For Segment 2
    Click Save Button
    Click Submit To PNR
    Verify That Ticketing Remarks For Non-BSP Without Ticket Number Are Written In The PNR 
    Switch To Command Page
    [Teardown]    Logout To Amadeus Sell Connect
   
Verify That Multiple Non-BSP Ticketing Remarks Are Written
    [Tags]    us10552
    Login To Amadeus Sell Connect Acceptance
    Move Single Passenger And Add Multiple Air Passive Segments With Airline Code WS
    Open CA Corporate Test
    Click Full Wrap
    Click Payment Panel
    Add Non-BSP Ticketing Details For Segment 2
    Click Save Button
    Add Non-BSP Ticketing Details For Segment 3
    Click Save Button
    Click Submit To PNR
    Verify That Ticketing Remarks For Mutliple Non-BSP Are Written In The PNR
   
Verify That APAY Ticketing Remarks Are Written For Single Segment
    [Tags]    us10552
    Login To Amadeus Sell Connect Acceptance
    Move Single Passenger And Add Passive Segment With Airline Code WS
    Open CA Corporate Test
    Click Full Wrap
    Click Payment Panel
    Add APAY Ticketing Details For Single Segment
    Verify That Supplier Code Default Value Is Correct For APAY
    Click Save Button
    Click Submit To PNR
    Verify That Ticketing Remarks For APAY With Single Segment Are Written In The PNR
    
Verify That APAY Ticketing Remarks Are Written For Multiple Segments
    [Tags]    us10552
    Login To Amadeus Sell Connect Acceptance
    Move Single Passenger And Add Multiple Air Passive Segments With Airline Code WN
    Open CA Corporate Test
    Click Full Wrap
    Click Payment Panel
    Add APAY Ticketing Details For Multiple Segments
    Verify That Supplier Code Default Value Is Correct For APAY
    Click Save Button
    Click Submit To PNR
    Verify That Ticketing Remarks For APAY With Multiple Segments Are Written In The PNR

Verify That Non-BSP With APAY Ticketing Remarks Are Written 
    [Tags]    us10552
    Login To Amadeus Sell Connect Acceptance
    Move Single Passenger And Add Multiple Passive Air With Different Airline Codes
    Open CA Corporate Test
    Click Full Wrap
    Click Payment Panel
    Add Non-BSP and APAY Ticketing Detals For Multiple Segments
    Click Save Button
    Click Submit To PNR
    Verify That Ticketing Remarks For Non-BSP And APAY With Multiple Segments Are Written In The PNR
    [Teardown]    Close Browser
