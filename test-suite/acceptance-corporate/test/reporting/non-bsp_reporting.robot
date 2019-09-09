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
    # Open CA Corporate Test
    # Click Full Wrap
    # Click Payment Panel
    Add Non-BSP Ticketing Details For Segment 2
    Click Save Button
    Add Client Reporting Values For Non-BSP Segments
    Finish PNR
    Verify That Non-BSP Client Reporting Remarks Are Written In The PNR For Single Segment
   
Verify That Reporting Remarks Are Written For Multiple Non-BSP Segments
    [Tags]    us13617
    Login To Amadeus Sell Connect Acceptance
    Move Single Passenger And Add Multiple Air Passive Segments With Airline Code WS
    # Open CA Corporate Test
    # Click Full Wrap
    # Click Payment Panel
    Add Non-BSP Ticketing Details For Multiple Segments
    Click Save Button
    Add Client Reporting Values For Non-BSP Segments
    Finish PNR
    Verify That Non-BSP Client Reporting Remarks Are Written In The PNR For Multiple Segments
    
Verify That Accounting Remark Is Written Correctly For Non BSP Exchange
    [Tags]    us13616
    Login To Amadeus Sell Connect Acceptance
    Move Single Passenger And Add Passive Segment With Airline Code PD
    Open CA Corporate Test
    Add Non-BSP Exchange Ticketing Details For Single Segment Without Ticket Number
    Verify That Supplier Code Default Value Is Correct For PD
    Click Save Button
    Click Submit To PNR
    Verify Accounting Remark Is Written Correctly For Non BSP Exchange
    
Verify That Accounting Remark Is Written Correctly For Airline Pass Redemption
    [Tags]    us13616
    Login To Amadeus Sell Connect Acceptance
    Move Single Passenger And Add Passive Segment With Airline Code AC
    Open CA Corporate Test
    Add Air Canada Pass Redemption Ticketing Details For Single Segment
    Verify That Supplier Code Default Value Is Correct For AC
    Click Save Button
    Click Submit To PNR
    Verify Accounting Remark Is Written Correctly For Airline Pass Redemption