*** Settings ***
Force Tags        corp
Resource          ../../pages/base.robot
Test Setup       Login To Amadeus Sell Connect Acceptance
Test Teardown    Close All Browsers   

*** Test Cases ***
Verify That The Amadeus TK Line is Written When "PNR On Hold" is Selected
    [Tags]    us11386    sanity_test
    Move Single Passenger And Add Multiple Air Passive Segments With Airline Code AC
    Fill Up Ticketing Panel With PNR ON HOLD
    Verify That Aqua TK Line Is Written Correctly For PNR On Hold
    
Verify That The Amadeus TK Line is Written When "Fee Only" is Selected
    [Tags]    us11386    us17663    expect_to_fail
    Move Single Passenger And Add Multiple Air Passive Segments With Airline Code AC
    Fill Up Ticketing Panel For FEE ONLY
    Verify That Aqua TK Line Is Written Correctly For Fee Only

Verify That The Amadeus TK Line is Written When "Cancelled PNR" is Selected
    [Tags]    us11386    us17663    expect_to_fail
    Move Single Passenger And Add Multiple Air Passive Segments With Airline Code AC
    Fill Up Ticketing Panel For CANCELLED PNR
    Verify That Aqua TK Line Is Written Correctly For Cancelled PNR

Verify That The Amadeus TK Line is Written For Changed PNR with Billed Service
    [Tags]    us11386    us17663
    Move Single Passenger And Add Multiple Air Passive Segments With Airline Code AC
    # Verify Ticketing Panel Dropdown For ISSUE E-TICKET OR NON BSP TICKET
    Fill Up Ticketing Panel For CHANGED PNR-AFTER TICKETING/UPDATE MATRIX-NO FEE
    Verify That Aqua TK Line Is Written Correctly For For Other Type of TK Line

Verify That The Amadeus TK Line is Written For Changed PNR without Billed Service
    [Tags]    us11386    us17663
    Move Single Passenger And Add Multiple Passive Air With Different Airline Codes
    # Verify Ticketing Panel Dropdown For ISSUE E-TICKET OR NON BSP TICKET
    Fill Up Ticketing Panel For CHANGED PNR-AFTER TICKETING/UPDATE MATRIX-NO FEE
    Verify That Aqua TK Line Is Written Correctly For Changed PNR Without Billed Service Fee

Verify That The Amadeus TK Line is Written and Updated For Other Types of TK Line
    [Tags]    us11386    us17663
    Move Single Passenger And Add Multiple Air Passive Segments With Airline Code AC
    Fill Up Ticketing Panel For ISSUE E-TICKET OR NON BSP TICKET
    Verify That Aqua TK Line Is Written Correctly For For Other Type of TK Line
    Fill Up Ticketing Panel With PNR ON HOLD
    Verify That Aqua TK Line Is Written Correctly For Updated TK Line
