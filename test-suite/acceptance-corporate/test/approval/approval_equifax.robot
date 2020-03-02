*** Settings ***
Force Tags        corp
Resource          ../../pages/base.robot
Test Setup        Login To Amadeus Sell Connect Acceptance
Test Teardown    Close All Browsers

*** Variables ***
${test_file_name}    equifax

*** Test Cases ***
Verify That Air Only PNRs For Client Equifax Is Correctly Queued For Approval
    [Tags]    us13271    full_regression
    Create PNR With Active Air Segments For Client Equifax Air Only To SYD, Select International Travel country includes Australia or New Zealand
    Fill Up Approval Fields
    Select Advance Booking Reason: P14 - Purchased with a 14+ advance
    Verify PNR Approval Is Processed Correctly
    
Verify That Mixed Segment PNRs For Client Equifax Is Correctly Queued For Approval
    [Tags]    us13271
    Create PNR With Active Air Segments For Client Equifax Mixed Segments To AKL, Select International Travel country includes Australia or New Zealand
    Fill Up Approval Fields
    Select Advance Booking Reason: P14 - Purchased with a 14+ advance
    Verify PNR Approval Is Processed Correctly

Verify That Air Only PNRs For Client Equifax With U*50 As CONCIERGE-NORAM-S Do Not Go Thru Approval Process
    [Tags]    us13271
    Create PNR With Active Air Segments For Client Equifax With Udid 50 CONCIERGE-NORAM-S, Air Only
    Fill Up Approval Fields
    Select Advance Booking Reason: P14 - Purchased with a 14+ advance
    Verify PNR Approval Is Processed Correctly

Verify That Hotel Only PNRs For Client Equifax With Any U*50 Except CONCIERGE-NORAM-S Do Not Go Thru Approval Process
    [Tags]    us13271    full_regression
    Create PNR For Client Equifax With Any Udid 50 Except CONCIERGE-NORAM-S, Hotel Only
    Fill Up Approval Fields
    Select Advance Booking Reason: P14 - Purchased with a 14+ advance
    Verify PNR Approval Is Processed Correctly
    
Verify That Car Only PNRs For Client Equifax With Any U*50 Except CONCIERGE-NORAM-S Do Not Go Thru Approval Process
    [Tags]    us13271    full_regression
    Create PNR For Client Equifax With Any Udid 50 Except CONCIERGE-NORAM-S, Car Only
    Fill Up Approval Fields
    Select Advance Booking Reason: P14 - Purchased with a 14+ advance
    Verify PNR Approval Is Processed Correctly
    