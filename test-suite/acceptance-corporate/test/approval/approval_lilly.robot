*** Settings ***
Force Tags        corp
Library           String
Library           SeleniumLibrary
Library           Collections
Library           Screenshot
Resource          ../../pages/base.robot
Test Setup       Login To Amadeus Sell Connect Acceptance
Test Teardown    Close All Browsers

*** Variables ***
${test_file_name}    lilly

*** Test Cases ***
Verify That PNRs For Client Lilly Are Queued For Approval
    [Tags]    us13271
    Create PNR With Active Air Segments For Client Lilly With Udid 50 NORAM-ASSOCIATE-S, Air Only, Intl Route
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
     
Verify That PNRs For Client Lilly With Domestic Route Do Not Go Thru Approval Process
    [Tags]    us13271
    Create PNR With Active Air Segments For Client Lilly With Udid 50 NORAM-ASSOCIATE-S, Air Only, Dom Route
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
     
Verify That PNRs For Client Lilly With Trans Route Do Not Go Thru Approval Process
    [Tags]    us13271    full_regression
    Create PNR With Active Air Segments For Client Lilly With Udid 50 NORAM-ASSOCIATE-S, Air Only, Trans Route
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
Verify That Car Only PNRs For Client Lilly Do Not Go Thru Approval Process
    [Tags]    us13271    full_regression
    Create PNR For Client Lilly With Udid 50 NORAM-ASSOCIATE-S, Car Only
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
Verify That Car & Hotel Only PNRs For Client Lilly Do Not Go Thru Approval Process
    [Tags]    us13271
    Create PNR For Client Lilly With Udid 50 NORAM-ASSOCIATE-S, Car And Hotel Only
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
Verify That PNRs For Client Lilly Can Skip Approval Process
    [Tags]    us13271    full_regression
    Create PNR With Active Air Segments For Client Lilly With Udid 50 NORAM-ASSOCIATE-S, Mix Segments, Intl Route
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
Verify That PNRs For Client Lilly With U*50 As Guest Do Not Go Thru Approval Process
    [Tags]    us13271    us15247
    Create PNR With Active Air Segments For Client Lilly With Udid 50 GUEST, Air Only, Intl Route
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
Verify that fare tracking override UI is displayed and remark is written when 1 of the segment is SYD And CFA is PX1
    [Tags]    us15247    not_ready
    Create PNR With Active Air Segments For Client Lilly With CFA PX1, SYD Route, DL Airline
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
Verify that fare tracking override UI is displayed and remark is written when 1 of the segment is IND And CFA is PX1
    [Tags]    us15247    not_ready
    Create PNR With Active Air Segments For Client Lilly With CFA PX1, IND Route, DL Airline
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    Cancel PNR
    
Verify that fare tracking override UI is displayed and remark is written when 1 of the segment is MEX And CFA is PX1
    [Tags]    us15247    not_ready
    Create PNR With Active Air Segments For Client Lilly With CFA PX1, MEX Route, DL Airline
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    Cancel PNR
    
Verify that fare tracking override UI is displayed and remark is written when 1 of the segment is SYD And CFA is ZX4
    [Tags]    us15247
    Create PNR With Active Air Segments For Client Lilly With CFA ZX4, SYD Route, DL Airline
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    Cancel PNR
    
Verify that fare tracking override UI is displayed and remark is written when 1 of the segment is IND And CFA is ZX4
    [Tags]    us15247
    Create PNR With Active Air Segments For Client Lilly With CFA ZX4, IND Route, DL Airline
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    Cancel PNR
    
Verify that fare tracking override UI is displayed and remark is written when 1 of the segment is MEX And CFA is ZX4
    [Tags]    us15247
    Create PNR With Active Air Segments For Client Lilly With CFA ZX4, MEX Route, DL Airline
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    Cancel PNR
    
Verify that fare tracking override remarks is not written when No Is selected And CFA is ZX4
    [Tags]    us15247
    Create PNR With Active Air Segments For Client Lilly With CFA ZX4, SYD Route, DL Airline, Dont Upgrade
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    Cancel PNR
    
Verify that fare tracking override UI is Not displayed and remark is Not written when 1 of the segment is Not SYD, IND, or MEX And CFA is ZX4
    [Tags]    us15247
    Create PNR With Active Air Segments For Client Lilly With CFA ZX4, Intl Route
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    Cancel PNR
    
Verify that fare tracking override UI is Not displayed and remark is Not written airline code is not DL And CFA is ZX4
    [Tags]    us15247
    Create PNR With Active Air Segments For Client Lilly With CFA ZX4, IND Route, Non DL Airline
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    Cancel PNR
    
Verify that fare tracking override UI is Not displayed and remark is Not written airline code is not DL And CFA is PX1
    [Tags]    us15247    not_ready
    Create PNR With Active Air Segments For Client Lilly With CFA PX1, SYD Route, Non DL Airline
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    Cancel PNR