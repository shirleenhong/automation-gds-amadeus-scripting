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
${test_file_name}    senvion

*** Test Cases ***
Verify That Air Only PNRs For Client Senvion Is Correctly Queued For Approval
    [Tags]    us13271
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Client Senvion With Udid 50 VIP-CA-S, Air Only
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
Verify That Car Only PNRs For Client Senvion Is Correctly Queued For Approval
    [Tags]    us13271
    Login To Amadeus Sell Connect Acceptance
    Create PNR For Client Senvion With Udid 50 VIP-CA-S, Car Only
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
    
Verify That Hotel Only PNRs For Client Senvion Is Correctly Queued For Approval
    [Tags]    us13271    full_regression
    Login To Amadeus Sell Connect Acceptance
    Create PNR For Client Senvion With Udid 50 VIP-CA-S, Hotel Only
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
Verify That PNRs For Client Senvion Can Skip Approval
    [Tags]    us13271    full_regression
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Client Senvion With Udid 50 VIP-CA-S, Mix Segments
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
Verify That PNRs For Client Senvion With U*50 GUEST-CA-S Do Not Go Thru Approval Process
    [Tags]    us13271
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Client Senvion With Udid 50 GUEST-CA-S, Air Only
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    