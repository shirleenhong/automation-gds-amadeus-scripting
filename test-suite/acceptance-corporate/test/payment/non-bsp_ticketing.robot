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
    Add Non-BSP Ticketing Details For Single Segment
    Verify That Supplier Code Default Value Is Correct For AC
    Click Submit To PNR
    Verify That Ticketing Remarks For Non-BSP With Single Segment Are Written In The PNR
    
Verify That Non-BSP Ticketing Remarks Are Written For Multiple Segments
    [Tags]    us10552
    Login To Amadeus Sell Connect Acceptance
    Move Single Passenger And Add Multiple Air Passive Segments 
    Open CA Corporate Test
    Click Full Wrap
    Add Non-BSP Ticketing Details For Multiple Segments
    Verify That Supplier Code Default Value Is Correct For WS
    Click Submit To PNR
    Verify That Ticketing Remarks For Non-BSP With Multiple Segments Are Written In The PNR