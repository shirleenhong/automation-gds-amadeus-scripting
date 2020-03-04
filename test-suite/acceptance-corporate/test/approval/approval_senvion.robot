*** Settings ***
Force Tags        corp
Resource          ../../pages/base.robot
Test Setup       Login To Amadeus Sell Connect Acceptance
Test Teardown    Close All Browsers   

*** Variables ***
${test_file_name}    senvion

*** Test Cases ***
Verify That Air Only PNRs For Client Senvion Is Correctly Queued For Approval
    [Tags]    us13271
    Create PNR With Active Air Segments For Client Senvion With Udid 50 VIP-CA-S, Air Only
    Fill Up Approval Fields
    Fill Up UDID Fields For Client Senvion
    Verify PNR Approval Is Processed Correctly
    
Verify That Car Only PNRs For Client Senvion Is Correctly Queued For Approval
    [Tags]    us13271
    Create PNR For Client Senvion With Udid 50 VIP-CA-S, Car Only
    Fill Up Approval Fields
    Fill Up UDID Fields For Client Senvion
    Verify PNR Approval Is Processed Correctly
    
Verify That Hotel Only PNRs For Client Senvion Is Correctly Queued For Approval
    [Tags]    us13271    full_regression
    Create PNR For Client Senvion With Udid 50 VIP-CA-S, Hotel Only
    Fill Up Approval Fields
    Fill Up UDID Fields For Client Senvion
    Verify PNR Approval Is Processed Correctly
    
Verify That PNRs For Client Senvion Can Skip Approval
    [Tags]    us13271    full_regression
    Create PNR With Active Air Segments For Client Senvion With Udid 50 VIP-CA-S, Mix Segments
    Fill Up Approval Fields
    Fill Up UDID Fields For Client Senvion
    Verify PNR Approval Is Processed Correctly
    
Verify That PNRs For Client Senvion With U*50 GUEST-CA-S Do Not Go Thru Approval Process
    [Tags]    us13271
    Create PNR With Active Air Segments For Client Senvion With Udid 50 GUEST-CA-S, Air Only
    Fill Up Approval Fields
    Fill Up UDID Fields For Client Senvion
    Verify PNR Approval Is Processed Correctly
    