*** Settings ***
Force Tags        corp
Library           String
Resource          ../../pages/base.robot
Test Setup       Login To Amadeus Sell Connect Acceptance
Test Teardown    Close All Browsers

*** Test Cases ***
Verify That The Amadeus TK Line is Written When "PNR On Hold" is Selected
    [Tags]    us15701
    Move Single Passenger And Add Multiple Air Passive Segments With Airline Code AC
    Complete The PNR With Default Values
    Fill Up Update Tktl Panel With PNR ON HOLD
    Verify That Aqua TK Line Is Written Correctly For PNR On Hold
    
Verify That The Amadeus TK Line is Written When "Fee Only" is Selected
    [Tags]    us15701
    Move Single Passenger And Add Multiple Air Passive Segments With Airline Code AC
    Complete The PNR With Default Values
    Fill Up Update Tktl Panel For FEE ONLY
    Verify That Aqua TK Line Is Written Correctly For Fee Only
    
Verify That The Amadeus TK Line is Written When "Cancelled PNR" is Selected
    [Tags]    us15701
    Move Single Passenger And Add Multiple Air Passive Segments With Airline Code AC
    Complete The PNR With Default Values
    Fill Up Update Tktl Panel For CANCELLED PNR
    Verify That Aqua TK Line Is Written Correctly For Cancelled PNR
    
Verify That The Amadeus TK Line is Written and Updated For Other Types of TK Line
    [Tags]    us11386
    Move Single Passenger And Add Multiple Air Passive Segments With Airline Code AC
    Complete The PNR With Default Values
    Fill Up Update Tktl Panel For ISSUE E-TICKET OR NON BSP TICKET
    Verify That Aqua TK Line Is Written Correctly For For Other Type of TK Line
    