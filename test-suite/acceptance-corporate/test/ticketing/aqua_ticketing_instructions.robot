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
Resource          ../../../resources/common/api-utilities.txt
Test Teardown    Close All Browsers

*** Variables ***
${test_file_name}    aqua_tkt_instruction

*** Test Cases ***
Verify That Aqua Ticketing Instructions Remark Are Written For Unticketed Air Segment And Not Ticketed Air Segments 
    [Tags]    us11219
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Air Only Segments, Ticket 1st TST
    Ticket TST1
    Select Unticketed TST 2
    Verify Ticketing Instruction Remarks Are Not Written For Ticketed Air Segment 2
    Verify Remarks Are Added Correctly In The PNR
    
Verify That Aqua Ticketing Instructions Remark are Written for Multiple Unticketed Air Segments And Not Ticketed Air Segments
    [Tags]    us11219
    Login To Amadeus Sell Connect Acceptance
    Create PNR With 4 TST And Ticket Last TST For Airline Code AC
    Select All Unticketed TSTs
    Verify Ticketing Instruction Remarks Are Written For Multiple Unticketed Air Segments 2 To 4
    Verify Ticketing Instruction Remarks Are Not Written For Ticketed Air Segment 5
    
Verify That Aqua Ticketing Instructions Remark Are Written for Unticketed Air Segments With Limo, Hotel, and Car Segments
    [Tags]    us11219
    Login To Amadeus Sell Connect Acceptance
    Create PNR With One TST For Airline Code AC
    Add 1 Limo Segments
    Add 1 Hotel Segments
    Add 1 Car Segments
    Select Unticketed TST 1
    Verify Aqua Ticketing Instructions Remark Are Written For Unticketed Air Segment 2,6 Only
    
Verify That Aqua Ticketing Instruction Remarks Are Not Written For Ticketed Air Segments, Limo, Hotel And Car Segments
    [Tags]    us11219
    Login To Amadeus Sell Connect Acceptance
    Create PNR With 1 TST And Ticket For Airline Code AC
    Add 1 Limo Segments
    Add 1 Hotel Segments
    Add 1 Car Segments
    Verify Message No Unticketed Air Segment Is Displayed
    Verify Aqua Ticketing Instruction Remarks Are Not Written For Ticketed Air Segments, Limo, Hotel And Car Segments
    
Verify That Aqua Ticketing Instructions Remark Are Written For One Limo Only Segment
    [Tags]    us11219
    Login To Amadeus Sell Connect Acceptance
    Create PNR With 1 Limo Segments
    Select Unticketed Limo Segment 2
    Verify Aqua Ticketing Instructions Remark Are Written For Limo Segment 2 Only
    
    
Verify That Aqua Ticketing Instructions Remark Are Written For Multiple Limo Only Segment
    [Tags]    us11219
    Login To Amadeus Sell Connect Acceptance
    Create PNR With 2 Limo Segments
    Select All Unticketed Limo Segment
    Verify Aqua Ticketing Instructions Remark Are Written For Limo Segment 2-3 Only
    
Verify That Aqua Ticketing Instructions Remark Are Written For One Car Only Segment
    [Tags]    us11219
    Login To Amadeus Sell Connect Acceptance
    Create PNR With 1 Car Segments
    Select Unticketed Car Segment 2
    Verify Aqua Ticketing Instructions Remark Are Written For Car Segment 2 Only
    
Verify That Aqua Ticketing Instructions Remark Are Written For Multiple Car Only Segment
    [Tags]    us11219
    Login To Amadeus Sell Connect Acceptance
    Create PNR With 2 Car Segments
    Select All Unticketed Car Segment
    Verify Aqua Ticketing Instructions Remark Are Written For Car Segment 2-3 Only
    
Verify That Aqua Ticketing Instructions Remark Are Written For One Hotel Only Segment
    [Tags]    us11219
    Login To Amadeus Sell Connect Acceptance
    Create PNR With 1 Hotel Segments
    Select Unticketed Hotel Segment 2
    Verify Aqua Ticketing Instructions Remark Are Written For Hotel Segment 2 Only
    
Verify That Aqua Ticketing Instructions Remark Are Written For Multiple Hotel Only Segment
    [Tags]    us11219
    Login To Amadeus Sell Connect Acceptance 
    Create PNR With 2 Hotel Segments
    Select All Unticketed Hotel Segment
    Verify Aqua Ticketing Instructions Remark Are Written For Hotel Segment 2-3 Only
    
Verify That Aqua Ticketing Instructions Remark Are Written For Hotel And Car Only Segments
    [Tags]     us11219
    Login To Amadeus Sell Connect Acceptance
    Create PNR With 2 Hotel Segments
    Add 1 Car Segments
    Select All Unticketed Hotel Segment
    Verify Aqua Ticketing Instructions Remark Are Written For Hotel Only Segments
    