*** Settings ***
Force Tags        corp
Library           String
Library           SeleniumLibrary
Library           Collections
Library           Screenshot
Resource          ../../pages/amadeus.robot
Resource          ../../pages/base.robot
Resource          ../../pages/payment.robot
Resource          ../../pages/reporting.robot
Resource          ../../pages/ticketing.robot

*** Test Cases ***
Verify That The Amadeus TK Line is Written When "PNR On Hold" is Selected
    [Tags]    us11386
    Login To Amadeus Sell Connect Acceptance
    Move Single Passenger And Add Multiple Air Passive Segments With Airline Code AC
    Fill Up Ticketing Panel With Default Values
    Verify That Aqua TK Line Is Written Correctly For PNR On Hold
    [Teardown]    Run Keywords    Close Cryptic Display    Logout To Amadeus Sell Connect

Verify That The Amadeus TK Line is Written When "Fee Only" is Selected
    [Tags]    us11386
    Login To Amadeus Sell Connect Acceptance
    Move Single Passenger And Add Multiple Air Passive Segments With Airline Code AC
    Fill Up Ticketing Panel For FEE ONLY
    Verify That Aqua TK Line Is Written Correctly For Fee Only
    [Teardown]    Run Keywords    Close Cryptic Display    Logout To Amadeus Sell Connect

Verify That The Amadeus TK Line is Written When "Cancelled PNR" is Selected
    [Tags]    us11386
    Login To Amadeus Sell Connect Acceptance
    Move Single Passenger And Add Multiple Air Passive Segments With Airline Code AC
    Fill Up Ticketing Panel For CANCELLED PNR
    Verify That Aqua TK Line Is Written Correctly For Cancelled PNR
    [Teardown]    Run Keywords    Close Cryptic Display    Logout To Amadeus Sell Connect

Verify That The Amadeus TK Line is Written For Changed PNR with Billed Service
    [Tags]    us11386
    Login To Amadeus Sell Connect Acceptance
    Move Single Passenger And Add Multiple Air Passive Segments With Airline Code AC
    Verify Ticketing Panel Dropdown For INVOICE HOTEL ONLY/CAR ONLY/LIMO ONLY
    Fill Up Ticketing Panel For CHANGED PNR-AFTER TICKETING/UPDATE MATRIX-NO FEE
    Verify That Aqua TK Line Is Written Correctly For For Other Type of TK Line
    [Teardown]    Run Keywords    Close Cryptic Display    Logout To Amadeus Sell Connect

Verify That The Amadeus TK Line is Written For Changed PNR without Billed Service
    [Tags]    us11386
    Login To Amadeus Sell Connect Acceptance
    Move Single Passenger And Add Multiple Passive Air With Different Airline Codes
    Verify Ticketing Panel Dropdown For CHANGED PNR-AFTER TICKETING/UPDATE MATRIX-NO FEE
    Fill Up Ticketing Panel For CHANGED PNR-AFTER TICKETING/UPDATE MATRIX-NO FEE
    Verify That Aqua TK Line Is Written Correctly For Changed PNR Without Billed Service Fee
    [Teardown]    Run Keywords    Close Cryptic Display    Logout To Amadeus Sell Connect

Verify That The Amadeus TK Line is Written and Updated For Other Types of TK Line
    [Tags]    us11386
    Login To Amadeus Sell Connect Acceptance
    Move Single Passenger And Add Multiple Air Passive Segments With Airline Code AC
    Fill Up Ticketing Panel For ISSUE E-TICKET OR NON BSP TICKET
    Verify That Aqua TK Line Is Written Correctly For For Other Type of TK Line
    Close Cryptic Display
    Fill Up Ticketing Panel With Default Values
    Verify That Aqua TK Line Is Written Correctly For Updated TK Line
    [Teardown]    Run Keywords    Close Cryptic Display    Logout To Amadeus Sell Connect
