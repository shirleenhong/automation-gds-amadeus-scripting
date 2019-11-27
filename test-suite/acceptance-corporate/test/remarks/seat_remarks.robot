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
Resource          ../../pages/fees.robot
Resource          ../../pages/ticketing.robot
Resource          ../../pages/remarks.robot
Resource          ../../../resources/common/api-utilities.txt
Test Teardown    Close All Browsers

*** Variables ***
${test_file_name}    seat_remarks

*** Test Cases ***
Verify Seat Remarks Are Written Corretly In The PNR For Single Segment Selection In EN Language
    [Tags]    us11820
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Corporate, With Seat Remarks For Single Segment For EN
    Select And Verify Seat Remarks For Option Online Check-in, Preferred And Upgrade
    
Verify Seat Remarks Are Written Corretly In The PNR For Multiple Segment Selection In EN Language
    [Tags]    us11820
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Corporate, With Seats Remarks For Multiple Segment For EN
    Select And Verify Seat Remarks For Option Waitlist, Request And Clearance Check
    
Verify Seat Remarks Are Written Corretly In The PNR For Single Segment Selection In FR Language
    [Tags]    us11820    de2793    expect_to_fail
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Corporate, With Seat Remarks For Single Segment For FR
    Select And Verify Seat Remarks For Option Online Check-in, Preferred And Upgrade
    
Verify Seat Remarks Are Written Corretly In The PNR For Multiple Segment Selection In FR Language
    [Tags]    us11820
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Corporate, With IRD Remarks For Multiple Segment For FR
    Select And Verify Seat Remarks For Option Waitlist, Request And Clearance Check