*** Settings ***
Force Tags        corp
Resource          ../../pages/base.robot
Test Setup       Login To Amadeus Sell Connect Acceptance
Test Teardown    Close All Browsers   

*** Variables ***
${test_file_name}    agilent

*** Test Cases ***
Verify That PNRs For Client Agilent Exit Approval Process When Country Iran/Iraq/Afghanistan Is Selected
    [Tags]    us13271     expect_to_fail    
    Create PNR With Active Air Segments For Client Agilent Air Only, Intl Route, Select First Option In Country
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
Verify That PNRs For Client Agilent Exit Approval Process When First Secondary Reason Is Selected
    [Tags]    us13271    expect_to_fail
    Create PNR With Active Air Segments For Client Agilent Air Only, Intl Route, Select Any Country & First Secondary Reason
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
Verify That PNRs For Client Agilent Exit Approval Process When Second Secondary Reason Is Selected
    [Tags]    us13271
    Create PNR With Active Air Segments For Client Agilent Air Only, Intl Route, Select Any Country & Second Secondary Reason
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
Verify That PNRs For Client Agilent Can Skip Approval
    [Tags]    us13271
    Create PNR With Active Air Segments For Client Agilent Mix Segments, Intl Route, Skip Approval
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
Verify That PNRs For Client Agilent With Domestic Route Do Not Go Thru Approval Process
    [Tags]    us13271    full_regression
    Create PNR With Active Air Segments For Client Agilent Air Only, Dom Route
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
Verify That PNRs For Client Agilent With Trans Route Do Not Go Thru Approval Process
    [Tags]    us13271
    Create PNR With Active Air Segments For Client Agilent Air Only, Trans Route
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
Verify That Car Only PNRs For Client Agilent Do Not Go Thru Approval Process
    [Tags]    us13271    full_regression
    Create PNR For Client Agilent Car Only
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
Verify That Hotel Only PNRs For Client Agilent Do Not Go Thru Approval Process
    [Tags]    us13271    full_regression
    Create PNR For Client Agilent Hotel Only
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
Verify That Car & Hotel Only PNRs For Client Agilent Do Not Go Thru Approval Process
    [Tags]    us13271
    Create PNR For Client Agilent Car & Hotel Only
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
Verify That PNRs For Client Agilent With Moxie High Risk Approval Email Received Remark Do Not Go Thru Approval Process
    [Tags]    us13271    full_regression
    Create PNR With Active Air Segments For Client Agilent Air Only, Intl Route, With Moxie High Risk Approval Email Received Remark
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
Verify That PNRs For Client Agilent With No Approval Required Remark Do Not Go Thru Approval Process
    [Tags]    us13271    full_regression
    Create PNR With Active Air Segments For Client Agilent Air Only, Intl Route, With No Approval Required Remark
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
