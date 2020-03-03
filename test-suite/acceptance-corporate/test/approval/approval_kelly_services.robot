*** Settings ***
Force Tags        corp
Resource          ../../pages/base.robot
Test Setup       Login To Amadeus Sell Connect Acceptance
Test Teardown    Close All Browsers   

*** Variables ***
${test_file_name}    kelly

*** Test Cases ***
Verify That PNRs For Client Kelly Services Are Queued For Approval When First Primary Reason Is Selected
    [Tags]    us13271    expect_to_fail
    Create PNR With Active Air Segments For Client Kelly Services With Udid50 EMPLOYEE-CA, Air And Hotel, First Primary Reason
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
Verify That PNRs For Client Kelly Services Are Queued For Approval When Second Primary Reason Is Selected
    [Tags]    us13271    expect_to_fail
    Create PNR With Active Air Segments For Client Kelly Services With Udid50 EMPLOYEE-CA, Air And Hotel, Second Primary Reason
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
Verify That PNRs For Client Kelly Services Can Skip Approval
    [Tags]    us13271    expect_to_fail
    Create PNR With Active Air Segments For Client Kelly Services With Udid50 EMPLOYEE-CA, Air Only, Skip Approval
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
Verify That Hotel Only PNRs For Client Kelly Services Are Queued For Approval
    [Tags]    us13271
    Create PNR For Client Kelly Services With RM*FS/-L Remark, Hotel Only
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
Verify That Air Only PNRs For Client Kelly Services With RM*FS/-L Remark Do Not Go Thru Approval Process
    [Tags]    us13271     expect_to_fail
    Create PNR With Active Air Segments For Client Kelly Services With RM*FS/-L Remark, Air Only
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
Verify That PNRs For Client Kelly Services With RM*U20 Remark Do Not Go Thru Approval Process
    [Tags]    us13271    full_regression
    Create PNR With Active Air Segments For Client Kelly Services With RM*U20 Remark, Air And Hotel
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
Verify That PNRs For Client Kelly Services With Udid50 EMPLOYEE-CA Do Not Go Thru Approval Process
    [Tags]    us13271    full_regression
    Create PNR With Active Air Segments For Client Kelly Services With Udid50 EXECUTIVE-CA, Air And Hotel
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
Verify That PNRs For Client Kelly Services With Udid50 BOARD OF DIRECTORS Do Not Go Thru Approval Process
    [Tags]    us13271
    Create PNR With Active Air Segments For Client Kelly Services With Udid50 BOARD OF DIRECTORS, Air And Hotel
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
Verify That Car Only PNRs For Client Kelly Services Do Not Go Thru Approval Process
    [Tags]    us13271    full_regression
    Create PNR For Client Kelly Services With Udid50 EMPLOYEE-CA, Car Only
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    