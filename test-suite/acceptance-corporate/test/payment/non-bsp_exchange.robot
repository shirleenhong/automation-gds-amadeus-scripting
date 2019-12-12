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
Verify That Ticketing Instruction Remarks Are Written Correctly When Original Ticket Number And New Ticket Number Are Not Provided
    [Tags]    us11134
    Login To Amadeus Sell Connect Acceptance
    Move Single Passenger And Add Passive Segment With Airline Code PD
    Add Non-BSP Exchange Ticketing Details For Single Segment Without Ticket Number
    Verify That Supplier Code Default Value Is Correct For PD
    Verify Ticketing Instruction Remarks for NonBSP Air Exchange Without Ticket Number Are Written In The PNR
    
Verify That Ticketing Instruction Remarks Are Written Correctly When Original Ticket Number And New Ticket Number Are Provided
    [Tags]    us11134
    Login To Amadeus Sell Connect Acceptance
    Move Single Passenger And Add Passive Segment With Airline Code WN
    Add Non-BSP Exchange Ticketing Details For Single Segment With Ticket Number
    Verify That Supplier Code Default Value Is Correct For WN
    Verify Ticketing Instruction Remarks for NonBSP Air Exchange With Ticket Number Are Written In The PNR
    
Verify That Ticketing Instruction Remarks Are Written Correctly For Specific Supplier Codes And Without Penalty Amount
    [Tags]    us11134
    Login To Amadeus Sell Connect Acceptance
    Move Single Passenger And Add Passive Segment With Airline Code AC
    Add Non-BSP Exchange Ticketing Details For Single Segment With Ticket Number
    Verify That Supplier Code Default Value Is Correct For AC
    Verify Ticketing Instruction Remarks for NonBSP Air Exchange With Ticket Number Are Written In The PNR
    Verify Penalty Remarks Are Not Written In The PNR
    
Verify That Ticketing Instruction Remarks Are Written Correctly For Specific Supplier Codes And With Penalty Amount
    [Tags]    us11134
    Login To Amadeus Sell Connect Acceptance
    Move Single Passenger And Add Passive Segment With Airline Code AC
    Add Non-BSP Exchange Ticketing Details For Single Segment With Ticket Number And Penalty
    Verify That Supplier Code Default Value Is Correct For AC
    Verify Ticketing Instruction Remarks for NonBSP Air Exchange With Ticket Number Are Written In The PNR
    Verify Penalty Remarks Are Written In The PNR
    
Verify That Ticketing Instruction Remarks Are Written Correctly For Other Supplier Codes And With Penalty Amount
    [Tags]    us11134
    Login To Amadeus Sell Connect Acceptance
    Move Single Passenger And Add Passive Segment With Airline Code 4N
    Add Non-BSP Exchange Ticketing Details For Single Segment With Ticket Number And Penalty
    Verify That Supplier Code Default Value Is Correct For 4N
    Verify Ticketing Instruction Remarks for NonBSP Air Exchange With Ticket Number And Penalty Amount Are Written In The PNR
    Verify Penalty Remarks Are Not Written In The PNR
    
Verify That Consultant Number Remark Is Updated When Consultant Number Field Is Not Empty
    [Tags]    us11134
    Login To Amadeus Sell Connect Acceptance
    Move Single Passenger And Add Passive Segment With Airline Code PD
    Add Non-BSP Exchange Ticketing Details For Single Segment Without Ticket Number
    Verify That Supplier Code Default Value Is Correct For PD
    Update Consultant Number To CN2
    Verify Consultant Number Remark Is Written With The Correct Value
    
Verify That Consultant Number Remark Is Updated When Consultant Number Field Is Blank
    [Tags]    us11134
    Login To Amadeus Sell Connect Acceptance
    Move Single Passenger And Add Passive Segment With Airline Code PD
    Add Non-BSP Exchange Ticketing Details For Single Segment Without Ticket Number
    Verify That Supplier Code Default Value Is Correct For PD
    Verify Consultant Number Remark Is Written With The Correct Value
    
Verify That G Remark Is Written When RM*U14-[AirlineCode]PASS Is Present In PNR
    [Tags]    us11134
    Login To Amadeus Sell Connect Acceptance
    Move Single Passenger And Add Passive Segment With Airline Code MO
    Add Non-BSP Exchange Ticketing Details For Single Segment Without Ticket Number
    Verify That Supplier Code Default Value Is Correct For MO
    Verify RMG Remark Is Written With Supplier Code MO
    
Verify That RM*U14 Remark Is Updated With Lowest GDS Fare Value For Specific Client
    [Tags]    us11134
    Login To Amadeus Sell Connect Acceptance
    Move Single Passenger For Specific Client And Add Passive Segment With Airline Code MO
    Add Non-BSP Exchange Ticketing Details For Single Segment With GDS Fare
    Verify That Supplier Code Default Value Is Correct For MO
    Verify RM*U14 Remark Is Updated With Lowest GDS Fare Value For MO
    
Verify That Specific RIR Remarks In English Are Removed From PNR
    [Tags]    us11134    de2929    open_defect
    Login To Amadeus Sell Connect Acceptance
    Move Single Passenger And Add Passive Segment With Airline Code WS
    Enter RIR Remarks In English
    Add Non-BSP Exchange Ticketing Details For Single Segment With Ticket Number
    Verify That Supplier Code Default Value Is Correct For WS
    Verify Specific RIR Remarks In English Are Removed From PNR
    
Verify That Specific RIR Remarks In French Are Removed From PNR
    [Tags]    us11134
    Login To Amadeus Sell Connect Acceptance
    Move Single Passenger And Add Passive Segment With Airline Code WS
    Create Exchange PNR In The GDS
    Enter RIR Remarks In French
    Add Non-BSP Exchange Ticketing Details For Single Segment With Ticket Number
    Verify That Supplier Code Default Value Is Correct For WS
    Verify Specific RIR Remarks In French Are Removed From PNR
    
Verify That Ticketing Instruction Remarks Can Be Written For Multiple Segments
    [Tags]    us11134
    Login To Amadeus Sell Connect Acceptance
    Move Single Passenger And Add Multiple Air Passive Segments With Airline Code WS
    Add Non-BSP Exchange Ticketing Details For Multiple Segments With Ticket Number
    Verify That Supplier Code Default Value Is Correct For WS
    Verify Multiple Ticketing Instruction Remarks for NonBSP Air Exchange With Ticket Number Are Written In The PNR
    