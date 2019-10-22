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
${test_file_name}    iqvia

*** Test Cases ***
Verify That Air Only PNRs For Client IQVIA Is Correctly Queued For Approval
    [Tags]    us13271    expect_to_fail
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Client IQVIA With Air Only Segments, Select Travel is Booked in Business Class
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
Verify That Car Only PNRs For Client IQVIA With Any U*50 Do Not Go Thru Approval Process
    [Tags]    us13271
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Client IQVIA With Any Udid 50, Car Only
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly

Verify That Hotel Only PNRs For Client IQVIA With Any U*50 Do Not Go Thru Approval Process
    [Tags]    us13271    full_regression
    Login To Amadeus Sell Connect Acceptance
    Create PNR For Client IQVIA With Any Udid 50, Hotel Only
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    