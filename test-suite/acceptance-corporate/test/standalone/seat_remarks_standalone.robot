*** Settings ***
Force Tags        corp
Resource          ../../pages/base.robot
Test Setup        Login To Amadeus Sell Connect Acceptance
Test Teardown     Close All Browsers

*** Variables ***
${test_file_name}    seat_remarks

*** Test Cases ***
Verify Seat Remarks Are Written Corretly In The PNR For Single Segment Selection In EN Language
    [Tags]    us18001    sanity_test
    Create PNR With Active Air Segments For Corporate, With Seat Remarks For Single Segment For EN
    Add Seat Remarks in Standalone For Option Online Check-in, Preferred And Upgrade
    Verify If Remarks Are Written Correctly For Standalone Remarks
    
Verify Seat Remarks Are Written Corretly In The PNR For Multiple Segment Selection In EN Language
    [Tags]    us18001
    Create PNR With Active Air Segments For Corporate, With Seats Remarks For Multiple Segment For EN
    Add Seat Remarks in Standalone For Option Waitlist, Request And Clearance Check
    Verify If Remarks Are Written Correctly For Standalone Remarks
    
Verify Seat Remarks Are Written Corretly In The PNR For Single Segment Selection In FR Language
    [Tags]    us18001
    Create PNR With Active Air Segments For Corporate, With Seat Remarks For Single Segment For FR
    Add Seat Remarks in Standalone For Option Online Check-in, Preferred And Upgrade
    Verify If Remarks Are Written Correctly For Standalone Remarks
    
Verify Seat Remarks Are Written Corretly In The PNR For Multiple Segment Selection In FR Language
    [Tags]    us18001
    Create PNR With Active Air Segments For Corporate, With IRD Remarks For Multiple Segment For FR
    Add Seat Remarks in Standalone For Option Waitlist, Request And Clearance Check
    Verify If Remarks Are Written Correctly For Standalone Remarks