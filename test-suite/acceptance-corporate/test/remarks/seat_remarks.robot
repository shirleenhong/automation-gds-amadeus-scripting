*** Settings ***
Force Tags        corp
Resource          ../../pages/base.robot
Test Setup       Login To Amadeus Sell Connect Acceptance
Test Teardown    Close All Browsers   
*** Variables ***
${test_file_name}    seat_remarks

*** Test Cases ***
Verify Seat Remarks Are Written Corretly In The PNR For Single Segment Selection In EN Language
    [Tags]    us11820    sanity_test
    Create PNR With Active Air Segments For Corporate, With Seat Remarks For Single Segment For EN
    Select And Verify Seat Remarks For Option Online Check-in, Preferred And Upgrade
    
Verify Seat Remarks Are Written Corretly In The PNR For Multiple Segment Selection In EN Language
    [Tags]    us11820
    Create PNR With Active Air Segments For Corporate, With Seats Remarks For Multiple Segment For EN
    Select And Verify Seat Remarks For Option Waitlist, Request And Clearance Check
    
Verify Seat Remarks Are Written Corretly In The PNR For Single Segment Selection In FR Language
    [Tags]    us11820    de2793
    Create PNR With Active Air Segments For Corporate, With Seat Remarks For Single Segment For FR
    Select And Verify Seat Remarks For Option Online Check-in, Preferred And Upgrade
    
Verify Seat Remarks Are Written Corretly In The PNR For Multiple Segment Selection In FR Language
    [Tags]    us11820
    Create PNR With Active Air Segments For Corporate, With IRD Remarks For Multiple Segment For FR
    Select And Verify Seat Remarks For Option Waitlist, Request And Clearance Check
    