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
${test_file_name}    securitas

*** Test Cases ***
Verify That Air Only PNRs For Client Securitas Electronic Security Is Correctly Queued For VIP-CA 
    [Tags]    us13271
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Client Securitas Electronic Security With Udid50 VIP-CA, Air Only, Use First Primary Reason
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
Verify That Air Only PNRs For Client Securitas Electronic Security Is Correctly Queued For VIP EXEMPT-CA 
    [Tags]    us13271
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Client Securitas Electronic Security With Udid50 VIP EXEMPT-CA, Air Only, Use Second Primary Reason
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
Verify That Air Only PNRs For Client Securitas Electronic Security Is Correctly Queued For VIP GUEST-CA 
    [Tags]    us13271    full_regression
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Client Securitas Electronic Security With Udid50 GUEST-CA, Air Only, Use First Primary Reason
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
Verify That Air Only PNRs For Client Securitas Electronic Security Is Correctly Queued For VIP GENERAL-CA 
    [Tags]    us13271    expect_to_fail
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Client Securitas Electronic Security With Udid50 GENERAL-CA, Air Only, Use Second Primary Reason
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
Verify That Air Only PNRs For Client Securitas Electronic Security Can Skip Approval Process 
    [Tags]    us13271    expect_to_fail
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Client Securitas Electronic Security With Udid50 OPERATIONS-CA, Mix Segments, Skip Approval
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
Verify That Car Only PNRs For Client Securitas Electronic Security Do Not Go Thru Approval Process 
    [Tags]    us13271    full_regression
    Login To Amadeus Sell Connect Acceptance
    Create PNR For Client Securitas Electronic Security With Udid50 VIP-CA, Car Only
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
Verify That Hotel Only PNRs For Client Securitas Electronic Security Do Not Go Thru Approval Process 
    [Tags]    us13271    full_regression
    Login To Amadeus Sell Connect Acceptance
    Create PNR For Client Securitas Electronic Security With Udid50 VIP-CA, Hotel Only
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
Verify That Car & Hotel Only PNRs For Client Securitas Electronic Security Do Not Go Thru Approval Process 
    [Tags]    us13271
    Login To Amadeus Sell Connect Acceptance
    Create PNR For Client Securitas Electronic Security With Udid50 VIP-CA, Car And Hotel Only
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
Verify That Air Only PNRs For Client Securitas Electronic Security For EMPLOYEE-CA Do Not Go Thru Approval Process
    [Tags]    us13271
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Client Securitas Electronic Security With Udid50 EMPLOYEE-CA, Air Only
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    