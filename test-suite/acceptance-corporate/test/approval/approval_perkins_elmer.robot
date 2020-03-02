*** Settings ***
Force Tags        corp
Resource          ../../pages/base.robot
Test Setup       Login To Amadeus Sell Connect Acceptance
Test Teardown    Close All Browsers   

*** Variables ***
${test_file_name}    perkins

*** Test Cases ***
Verify That PNRs For Client Perkins Elmer With Trip Approved By Remark Do Not Go Thru Approval Process
    [Tags]    us13271
    Create PNR With Active Air Segments For Client Perkins Elmer With Trip Approved By Remark, Air Only
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
Verify That Car Only PNRs For Client Perkins Elmer Do Not Go Thru Approval Process
    [Tags]    us13271    full_regression
    Create PNR For Client Perkins Elmer, Car Only
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
Verify That Hotel Only PNRs For Client Perkins Elmer Do Not Go Thru Approval Process
    [Tags]    us13271    full_regression
    Create PNR For Client Perkins Elmer, Hotel Only
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
Verify That Car And Hotel Only PNRs For Client Perkins Elmer Do Not Go Thru Approval Process
    [Tags]    us13271
    Create PNR For Client Perkins Elmer, Car And Hotel Only
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
Verify That PNRs For Client Perkins Elmer Are Queued Correctly When 1st Primary Reason Is Selected
    [Tags]    us13271
    Create PNR With Active Air Segments For Client Perkins Elmer, Air Only, Use First Primary Reason Code
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
Verify That PNRs For Client Perkins Elmer Are Queued Correctly When 2nd Primary Reason Is Selected
    [Tags]    us13271    full_regression
    Create PNR With Active Air Segments For Client Perkins Elmer, Air Only, Use Second Primary Reason Code
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
Verify That PNRs For Client Perkins Elmer Get Trip Approved Remark When 3rd Primary Reason Is Selected
    [Tags]    us13271    full_regression
    Create PNR With Active Air Segments For Client Perkins Elmer, Air Only, Use Third Primary Reason Code
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
Verify That PNRs For Perkins Elmer Can Skip Approval Process
    [Tags]    us13271    full_regression
    Create PNR With Active Air Segments For Client Perkins Elmer, Mix Segments, Skip Approval
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly 
    