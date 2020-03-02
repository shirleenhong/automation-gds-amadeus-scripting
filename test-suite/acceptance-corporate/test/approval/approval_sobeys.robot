*** Settings ***
Force Tags        corp
Resource          ../../pages/base.robot
Test Teardown    Close All Browsers

*** Variables ***
${test_file_name}    sobeys

*** Test Cases ***
Verify That PNRs For Client Sobeys Is Writing Correct Remarks When Traveller Received Approval
    [Tags]    us13271
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Client Sobeys With Any Udid, Air with Hotel and Car, Traveller Received Approval
    Fill Up Approval Fields
    Fill Up UDID Fields For Client Sobeys
    Verify PNR Approval Is Processed Correctly
    
Verify That PNRs For Client Sobeys Is Writing Correct Remarks When Traveller Obtain Approval
    [Tags]    us13271    expect_to_fail
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Client Sobeys With Any Udid, Air with Hotel and Car, Traveller Must Obtain Approval
    Fill Up Approval Fields
    Fill Up UDID Fields For Client Sobeys
    Verify PNR Approval Is Processed Correctly
    
Verify That PNRs For Client Sobeys Is Writing Correct Remarks When PNR Has U47 And Traveller Received Approval
    [Tags]    us13271
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Client Sobeys With Any Udid, U47, Air Only, Traveller Received Approval
    Fill Up Approval Fields
    Fill Up UDID Fields For Client Sobeys
    Verify PNR Approval Is Processed Correctly
    
Verify That PNRs For Client Sobeys Is Writing Correct Remarks For Hotel Only And Traveller Obtain Approval
    [Tags]    us13271    expect_to_fail
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Client Sobeys With Any Udid, Hotel Only, Traveller Must Obtain Approval
    Fill Up Approval Fields
    Fill Up UDID Fields For Client Sobeys
    Verify PNR Approval Is Processed Correctly
    
Verify That PNRs For Client Sobeys Is Writing Correct Remarks For Car Only And Traveller Received Approval
    [Tags]    us13271
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Client Sobeys With Any Udid, Car Only, Traveller Received Approval
    Fill Up Approval Fields
    Fill Up UDID Fields For Client Sobeys
    Verify PNR Approval Is Processed Correctly
    
Verify That PNRs For Client Sobeys Can Skip Approval Process
    [Tags]    us13271    full_regression
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Client Sobeys With Any Udid, Air with Hotel and Car, Ignore Approval
    Fill Up Approval Fields
    Fill Up UDID Fields For Client Sobeys
    Verify PNR Approval Is Processed Correctly
    
Verify That PNRs For Client Sobeys With RMG Approval Received Do Not Go Thru Approval Process
    [Tags]    us13271
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Client Sobeys With any Udid, RMG Approval Received, Air with Hotel and Car
    Fill Up Approval Fields
    Fill Up UDID Fields For Client Sobeys
    Verify PNR Approval Is Processed Correctly
    
Verify That PNRs For Client Sobeys With U50 Guest Do Not Go Thru Approval Process
    [Tags]    us13271
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Client Sobeys With U50 GUEST, Air with Hotel and Car
    Fill Up Approval Fields
    Fill Up UDID Fields For Client Sobeys
    Verify PNR Approval Is Processed Correctly
    