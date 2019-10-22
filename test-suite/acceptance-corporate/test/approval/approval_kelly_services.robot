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
${test_file_name}    kelly

*** Test Cases ***
Verify That PNRs For Client Kelly Services Are Queued For Approval When First Primary Reason Is Selected
    [Tags]    us13271    expect_to_fail
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Client Kelly Services With Udid50 EMPLOYEE-CA, Air And Hotel
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
Verify That PNRs For Client Kelly Services Are Queued For Approval When Second Primary Reason Is Selected
    [Tags]    us13271    expect_to_fail
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Client Kelly Services With Udid50 EMPLOYEE-CA, Air And Hotel
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
Verify That PNRs For Client Kelly Services Can Skip Approval
    [Tags]    us13271    expect_to_fail
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Client Kelly Services With Udid50 EMPLOYEE-CA, Air Only, Skip Approval
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
Verify That Hotel Only PNRs For Client Kelly Services Are Queued For Approval
    [Tags]    us13271
    Login To Amadeus Sell Connect Acceptance
    Create PNR For Client Kelly Services With RM*FS/-L Remark, Hotel Only
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
Verify That Air Only PNRs For Client Kelly Services With RM*FS/-L Remark Do Not Go Thru Approval Process
    [Tags]    us13271     expect_to_fail
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Client Kelly Services With RM*FS/-L Remark, Air Only
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
Verify That PNRs For Client Kelly Services With RM*U20 Remark Do Not Go Thru Approval Process
    [Tags]    us13271    full_regression
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Client Kelly Services With RM*U20 Remark, Air And Hotel
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
Verify That PNRs For Client Kelly Services With Udid50 EMPLOYEE-CA Do Not Go Thru Approval Process
    [Tags]    us13271    full_regression
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Client Kelly Services With Udid50 EXECUTIVE-CA, Air And Hotel
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
Verify That PNRs For Client Kelly Services With Udid50 BOARD OF DIRECTORS Do Not Go Thru Approval Process
    [Tags]    us13271
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Client Kelly Services With Udid50 BOARD OF DIRECTORS, Air And Hotel
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
Verify That Car Only PNRs For Client Kelly Services Do Not Go Thru Approval Process
    [Tags]    us13271    full_regression
    Login To Amadeus Sell Connect Acceptance
    Create PNR For Client Kelly Services With Udid50 EMPLOYEE-CA, Car Only
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly