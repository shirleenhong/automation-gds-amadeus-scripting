*** Settings ***
Force Tags        corp
Resource          ../../pages/base.robot
Test Setup       Login To Amadeus Sell Connect Acceptance
Test Teardown    Close All Browsers   

*** Variables ***
${test_file_name}    aqua_tkt_instruction

*** Test Cases ***
Verify That Aqua Ticketing Instructions Remark Are Written For Unticketed Air Segment And Not Ticketed Air Segments 
    [Tags]    us11219    full_regression
    Create PNR With Active Air Segments For Air Only Segments, Ticket 1st TST
    Ticket TST1
    Select Unticketed TST 2
    Verify Remarks Are Added Correctly In The PNR
    Verify Ticketing Instruction Remarks Are Not Written For Ticketed Air Segment 2
    
Verify That Aqua Ticketing Instructions Remark are Written for Multiple Unticketed Air Segments And Not Ticketed Air Segments
    [Tags]    us11219    full_regression
    Create PNR With Active Air Segments For Air Only Segments with 4 TST, Ticket 4th TST
    Ticket TST4
    Select All Unticketed TSTs
    Verify Remarks Are Added Correctly In The PNR
    Verify Ticketing Instruction Remarks Are Not Written For Ticketed Air Segment 5
    
Verify That Aqua Ticketing Instructions Remark Are Written for Unticketed Air Segments With Limo, Hotel, and Car Segments
    [Tags]    us11219    sanity_test
    Create PNR With Active Air Segments For Mix Segments, All Unticketed
    Select Unticketed TST 1
    Verify Remarks Are Added Correctly In The PNR
    Verify Remarks Are Not Found In The PNR
    
Verify That Aqua Ticketing Instruction Remarks Are Not Written For Ticketed Air Segments, Limo, Hotel And Car Segments
    [Tags]    us11219    full_regression
    Create PNR With Active Air Segments For Mix Segments, Ticketed Air
    Ticket TST1
    Verify Message No Unticketed Air Segment Is Displayed
    Verify Remarks Are Not Found In The PNR
    
Verify That Aqua Ticketing Instructions Remark Are Written For One Limo Only Segment
    [Tags]    us11219
    Create PNR For One Limo Segment Only
    Select Unticketed Limo Segment 2
    Verify Remarks Are Added Correctly In The PNR
    
Verify That Aqua Ticketing Instructions Remark Are Written For Multiple Limo Only Segment
    [Tags]    us11219    full_regression
    Create PNR For Multi Limo Segments
    Select All Unticketed Limo Segment
    Verify Remarks Are Added Correctly In The PNR
    
Verify That Aqua Ticketing Instructions Remark Are Written For One Car Only Segment
    [Tags]    us11219
    Create PNR For One Car Segment Only
    Select Unticketed Car Segment 2
    Verify Remarks Are Added Correctly In The PNR
    
Verify That Aqua Ticketing Instructions Remark Are Written For Multiple Car Only Segment
    [Tags]    us11219    full_regression
    Create PNR For Multi Car Segments
    Select All Unticketed Car Segment
    Verify Remarks Are Added Correctly In The PNR
    
Verify That Aqua Ticketingk Instructions Remark Are Written For One Hotel Only Segment
    [Tags]    us11219
    Create PNR For One Hotel Segment Only
    Select Unticketed Hotel Segment 2
    Verify Remarks Are Added Correctly In The PNR
    
Verify That Aqua Ticketing Instructions Remark Are Written For Multiple Hotel Only Segment
    [Tags]    us11219    full_regression
    Create PNR For Multi Hotel Segments
    Select All Unticketed Hotel Segment
    Verify Remarks Are Added Correctly In The PNR
    
Verify That Aqua Ticketing Instructions Remark Are Written For Hotel And Car Only Segments
    [Tags]     us11219    full_regression
    Create PNR For Car And Hotel Segments
    Select All Unticketed Hotel Segment
    Verify Remarks Are Added Correctly In The PNR
    Verify Remarks Are Not Found In The PNR