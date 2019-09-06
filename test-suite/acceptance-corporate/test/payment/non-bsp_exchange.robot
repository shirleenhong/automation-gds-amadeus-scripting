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
    Click Save Button
    Click Submit To PNR
    Verify Ticketing Instruction Remarks for NonBSP Air Exchange Without Ticket Number Are Written In The PNR
    [Teardown]    Close Browser
    
Verify That Ticketing Instruction Remarks Are Written Correctly When Original Ticket Number And New Ticket Number Are Provided
    [Tags]    us11134
    Login To Amadeus Sell Connect Acceptance
    Move Single Passenger And Add Passive Segment With Airline Code WN
    Open CA Corporate Test
    Add Non-BSP Exchange Ticketing Details For Single Segment With Ticket Number
    Verify That Supplier Code Default Value Is Correct For WN
    Click Save Button
    Click Submit To PNR
    Verify Ticketing Instruction Remarks for NonBSP Air Exchange With Ticket Number Are Written In The PNR
    [Teardown]    Close Browser
    
Verify That Ticketing Instruction Remarks Are Written Correctly For Specific Supplier Codes And Without Penalty Amount
    [Tags]    us11134
    Login To Amadeus Sell Connect Acceptance
    Move Single Passenger And Add Passive Segment With Airline Code AC
    Open CA Corporate Test
    Add Non-BSP Exchange Ticketing Details For Single Segment With Ticket Number
    Verify That Supplier Code Default Value Is Correct For AC
    Verify Penalty Amount Fields Are Displayed
    Click Save Button
    Click Submit To PNR
    Verify Ticketing Instruction Remarks for NonBSP Air Exchange With Ticket Number Are Written In The PNR
    Verify Penalty Remarks Are Not Written In The PNR
    [Teardown]    Close Browser
    
Verify That Ticketing Instruction Remarks Are Written Correctly For Specific Supplier Codes And With Penalty Amount
    [Tags]    us11134
    Login To Amadeus Sell Connect Acceptance
    Move Single Passenger And Add Passive Segment With Airline Code AC
    Open CA Corporate Test
    Add Non-BSP Exchange Ticketing Details For Single Segment With Ticket Number And Penalty
    Verify That Supplier Code Default Value Is Correct For AC
    Verify Penalty Amount Fields Are Displayed
    Click Save Button
    Click Submit To PNR
    Verify Ticketing Instruction Remarks for NonBSP Air Exchange With Ticket Number Are Written In The PNR
    Verify Penalty Remarks Are Written In The PNR
    [Teardown]    Close Browser
    
Verify That Consultant Number Remark Is Updated When Consultant Number Field Is Not Empty
    [Tags]    us11134
    Login To Amadeus Sell Connect Acceptance
    Move Single Passenger And Add Passive Segment With Airline Code PD
    Open CA Corporate Test
    Add Non-BSP Exchange Ticketing Details For Single Segment Without Ticket Number
    Verify That Supplier Code Default Value Is Correct For PD
    Update Consultant Number to CN2
    Click Save Button
    Click Submit To PNR
    Verify Consultant Number Remark Is Written With The Correct Value
    [Teardown]    Close Browser
    
Verify That Consultant Number Remark Is Updated When Consultant Number Field Is Blank
    [Tags]    us11134
    Login To Amadeus Sell Connect Acceptance
    Move Single Passenger And Add Passive Segment With Airline Code PD
    Open CA Corporate Test
    Add Non-BSP Exchange Ticketing Details For Single Segment Without Ticket Number
    Verify That Supplier Code Default Value Is Correct For PD
    Click Save Button
    Click Submit To PNR
    Verify Consultant Number Remark Is Written With The Correct Value
    [Teardown]    Close Browser
    
Verify That G Remark Is Written When RM*U14-[AirlineCode]PASS Is Present In PNR
    [Tags]    us11134
    Login To Amadeus Sell Connect Acceptance
    Move Single Passenger And Add Passive Segment With Airline Code MO
    Open CA Corporate Test
    Add Non-BSP Exchange Ticketing Details For Single Segment Without Ticket Number
    Verify That Supplier Code Default Value Is Correct For MO
    Click Save Button
    Click Submit To PNR
    Verify RMG Remark Is Written With Supplier Code MO
    [Teardown]    Close Browser
    
Verify That RM*U14 Remark Is Updated With Lowest GDS Fare Value For Specific Client
    [Tags]    us11134
    Login To Amadeus Sell Connect Acceptance
    Move Single Passenger For Specific Client And Add Passive Segment With Airline Code MO
    Open CA Corporate Test
    Add Non-BSP Exchange Ticketing Details For Single Segment Without Ticket Number
    Verify That Supplier Code Default Value Is Correct For MO
    Enter 1000 In Lowest GDS Fare Field
    Click Save Button
    Click Submit To PNR
    Verify RM*U14 Remark Is Updated With Lowest GDS Fare Value For MO
    [Teardown]    Close Browser
    
Verify That Specific RIR Remarks In English Are Removed From PNR
    [Tags]    us11134
    Login To Amadeus Sell Connect Acceptance
    Move Single Passenger And Add Passive Segment With Airline Code WS
    Enter RIR Remarks In English
    Open CA Corporate Test
    Add Non-BSP Exchange Ticketing Details For Single Segment With Ticket Number
    Verify That Supplier Code Default Value Is Correct For WS
    Click Save Button
    Click Submit To PNR
    Verify Specific RIR Remarks In English Are Removed From PNR
    [Teardown]    Close Browser
    
Verify That Specific RIR Remarks In French Are Removed From PNR
    [Tags]    us11134
    Login To Amadeus Sell Connect Acceptance
    Move Single Passenger And Add Passive Segment With Airline Code WS
    Create Exchange PNR In The GDS
    Enter RIR Remarks In French
    Open CA Corporate Test
    Add Non-BSP Exchange Ticketing Details For Single Segment With Ticket Number
    Verify That Supplier Code Default Value Is Correct For WS
    Click Save Button
    Click Submit To PNR
    Verify Specific RIR Remarks In French Are Removed From PNR
    [Teardown]    Close Browser
    
Verify That Ticketing Instruction Remarks Can Be Written For Multiple Segments
    [Tags]    us11134
    Login To Amadeus Sell Connect Acceptance
    Move Single Passenger And Add Multiple Air Passive Segments
    Open CA Corporate Test
    Add Non-BSP Exchange Ticketing Details For Multiple Segments With Ticket Number
    Verify That Supplier Code Default Value Is Correct For WS
    Click Save Button
    Click Submit To PNR
    Verify Multiple Ticketing Instruction Remarks for NonBSP Air Exchange With Ticket Number Are Written In The PNR
    [Teardown]    Close Browser 
    
CREATE PNR FOR ME
    Login To Amadeus Sell Connect Acceptance
    Move Single Passenger And Add Passive Segment With Airline Code WN
    Navigate To Page Add Accounting Line
