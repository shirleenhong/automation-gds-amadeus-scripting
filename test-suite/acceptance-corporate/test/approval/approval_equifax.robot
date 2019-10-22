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
${test_file_name}    equifax

*** Test Cases ***
Verify That Air Only PNRs For Client Equifax Is Correctly Queued For Approval
    [Tags]    us13271    full_regression
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Client Equifax Air Only To SYD, Select International Travel country includes Australia or New Zealand
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
Verify That Mixed Segment PNRs For Client Equifax Is Correctly Queued For Approval
    [Tags]    us13271
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Client Equifax Mixed Segments To AKL, Select International Travel country includes Australia or New Zealand
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly

Verify That Air Only PNRs For Client Equifax With U*50 As CONCIERGE-NORAM-S Do Not Go Thru Approval Process
    [Tags]    us13271
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Client Equifax With Udid 50 CONCIERGE-NORAM-S, Air Only
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly

Verify That Hotel Only PNRs For Client Equifax With Any U*50 Except CONCIERGE-NORAM-S Do Not Go Thru Approval Process
    [Tags]    us13271    full_regression
    Login To Amadeus Sell Connect Acceptance
    Create PNR For Client Equifax With Any Udid 50 Except CONCIERGE-NORAM-S, Hotel Only
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
Verify That Car Only PNRs For Client Equifax With Any U*50 Except CONCIERGE-NORAM-S Do Not Go Thru Approval Process
    [Tags]    us13271    full_regression
    Login To Amadeus Sell Connect Acceptance
    Create PNR For Client Equifax With Any Udid 50 Except CONCIERGE-NORAM-S, Car Only
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    