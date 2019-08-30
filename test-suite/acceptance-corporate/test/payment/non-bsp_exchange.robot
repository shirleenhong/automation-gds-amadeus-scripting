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
    Add Non-BSP Exchange Ticketing Details For Single Segment Without Ticket Number
    Verify That Supplier Code Default Value Is Correct For PD
    Click Submit To PNR
    Verify Ticketing Instruction Remarks for NonBSP Air Exchange Without Ticket Number Are Written In The PNR
    
Verify That Ticketing Instruction Remarks Are Written Correctly When Original Ticket Number And New Ticket Number Are Provided
    [Tags]    us11134
    Login To Amadeus Sell Connect Acceptance
    Move Single Passenger And Add Passive Segment With Airline Code WN
    Open CA Corporate Test
    Add Non-BSP Exchange Ticketing Details For Single Segment With Ticket Number
    Verify That Supplier Code Default Value Is Correct For WN
    Click Submit To PNR
    Verify Ticketing Instruction Remarks for NonBSP Air Exchange With Ticket Number Are Written In The PNR
    
Verify That Ticketing Instruction Remarks Are Written Correctly For Specific Supplier Codes And Without Penalty Amount
    [Tags]    us11134
    Login To Amadeus Sell Connect Acceptance
    Move Single Passenger And Add Passive Segment With Airline Code AC
    Open CA Corporate Test
    Add Non-BSP Exchange Ticketing Details For Single Segment With Ticket Number
    Verify That Supplier Code Default Value Is Correct For AC
    Verify Penalty Amount Fields Are Displayed
    Click Submit To PNR
    Verify Ticketing Instruction Remarks for NonBSP Air Exchange With Ticket Number Are Written In The PNR
    Verify Penalty Remarks Are Not Written In The PNR
    
Verify That Ticketing Instruction Remarks Are Written Correctly For Specific Supplier Codes And With Penalty Amount
    [Tags]    us11134
    Login To Amadeus Sell Connect Acceptance
    Move Single Passenger And Add Passive Segment With Airline Code AC
    Open CA Corporate Test
    Add Non-BSP Exchange Ticketing Details For Single Segment With Ticket Number And Penalty
    Verify That Supplier Code Default Value Is Correct For AC
    Verify Penalty Amount Fields Are Displayed
    Click Submit To PNR
    Verify Ticketing Instruction Remarks for NonBSP Air Exchange With Ticket Number Are Written In The PNR
    Verify Penalty Remarks Are Written In The PNR