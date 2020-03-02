*** Settings ***
Force Tags        corp
Resource          ../../pages/base.robot
Test Setup       Login To Amadeus Sell Connect Acceptance
Test Teardown    Close All Browsers   

*** Variables ***
${test_file_name}    gilead

*** Test Cases ***
Verify That PNRs For Client Gilead Is Writing Correct Remarks For Approval E-Mail Required
    [Tags]    us13271
    Create PNR With Active Air Segments For Client Gilead With Any Udid, Approval E-Mail Required
    Fill Up Approval Fields
    Fill Up Udid Fields For Client Gilead
    Verify PNR Approval Is Processed Correctly
    
Verify That PNRs For Client Gilead Is Writing Correct Remarks Approval E-Mail Required For Exchange
    [Tags]    us13271    full_regression
    Create PNR With Active Air Segments For Client Gilead With Any Udid, Air Only, Approval E-Mail Required For Exchange
    Fill Up Approval Fields
    Fill Up Udid Fields For Client Gilead
    Verify PNR Approval Is Processed Correctly
    
Verify That PNRs For Client Gilead Is Writing Correct Remarks For Consultant will Request Email
    [Tags]    us13271    expect_to_fail
    Create PNR With Active Air Segments For Client Gilead With Any Udid, Air Only, Consultant will Request Email
    Fill Up Approval Fields
    Fill Up Udid Fields For Client Gilead
    Verify PNR Approval Is Processed Correctly
    
Verify That PNRs For Client Gilead Is Writing Correct Remarks For Air, Hotel, Car
    [Tags]    us13271
    Create PNR With Active Air Segments For Client Gilead With Any Udid, with Air hotel and Car, Approval E-Mail Required
    Fill Up Approval Fields
    Fill Up Udid Fields For Client Gilead
    Verify PNR Approval Is Processed Correctly
    
Verify That PNRs For Client Gilead Can Skip Approval Process
    [Tags]    us13271    full_regression
    Create PNR With Active Air Segments For Client Gilead With Any Udid, Air Only, Ignore Approval Process
    Fill Up Approval Fields
    Fill Up Udid Fields For Client Gilead
    Verify PNR Approval Is Processed Correctly
    
Verify That PNRs For Client Gilead Do Not Go Thru Approval For Hotel Only
    [Tags]    us13271    full_regression
    Create PNR For Client Gilead With Any Udid, Hotel Only
    Fill Up Approval Fields
    Fill Up Udid Fields For Client Gilead
    Verify PNR Approval Is Processed Correctly
    
Verify That PNRs For Client Gilead Do Not Go Thru Approval For Car Only
    [Tags]    us13271    full_regression
    Create PNR For Client Gilead With Any Udid, Car Only
    Fill Up Approval Fields
    Fill Up Udid Fields For Client Gilead
    Verify PNR Approval Is Processed Correctly
    