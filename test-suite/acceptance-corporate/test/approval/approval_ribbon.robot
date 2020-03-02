*** Settings ***
Force Tags        corp
Resource          ../../pages/base.robot
Test Setup       Login To Amadeus Sell Connect Acceptance
Test Teardown    Close All Browsers   

*** Variables ***
${test_file_name}    ribbon

*** Test Cases ***
Verify That Air Only PNRs For Client Ribbon With Any U*50 Except GUEST-NORAM, VIP-CA, or VIP-CA-S Is Correctly Queued To Approval Queue
    [Tags]    us13271    full_regression
    Create PNR With Active Air Segments For Client Ribbon With Any Udid 50 Except GUEST-NORAM, VIP-CA, or VIP-CA-S, Air Only
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
Verify That Mixed Segment PNRs For Client Ribbon With Any U*50 Except GUEST-NORAM, VIP-CA, or VIP-CA-S Is Correctly Queued To Approval Queue
    [Tags]    us13271
    Create PNR With Active Air Segments For Client Ribbon With Any Udid 50 Except GUEST-NORAM, VIP-CA, or VIP-CA-S, Mixed Segments
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
Verify That Air Only PNRs For Client Ribbon With U*50 As GUEST-NORAM Do Not Go Thru Approval Process
    [Tags]    us13271
    Create PNR With Active Air Segments For Client Ribbon With Udid 50 GUEST-NORAM, Air Only
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
Verify That Air Only PNRs For Client Ribbon With U*50 As VIP-CA Do Not Go Thru Approval Process
    [Tags]    us13271    full_regression
    Create PNR With Active Air Segments For Client Ribbon With Udid 50 VIP-CA, Air Only
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
Verify That Air Only PNRs For Client Ribbon With U*50 As VIP-CA-S Do Not Go Thru Approval Process
    [Tags]    us13271    full_regression
    Create PNR With Active Air Segments For Client Ribbon With Udid 50 VIP-CA-S, Air Only
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
Verify That Hotel Only PNRs For Client Ribbon With Any U*50 Except GUEST-NORAM, VIP-CA, or VIP-CA-S Do Not Go Thru Approval Process
    [Tags]    us13271    full_regression
    Create PNR For Client Ribbon With Any Udid 50 Except GUEST-NORAM, VIP-CA, or VIP-CA-S, Hotel Only
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
Verify That Car Only PNRs For Client Ribbon With Any U*50 Except GUEST-NORAM, VIP-CA, or VIP-CA-S Do Not Go Thru Approval Process
    [Tags]    us13271    full_regression
    Create PNR For Client Ribbon With Any Udid 50 Except GUEST-NORAM, VIP-CA, or VIP-CA-S, Car Only
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    