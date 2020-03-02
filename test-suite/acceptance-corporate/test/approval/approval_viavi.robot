*** Settings ***
Force Tags        corp
Resource          ../../pages/base.robot
Test Setup        Login To Amadeus Sell Connect Acceptance
Test Teardown     Close All Browsers


*** Variables ***
${test_file_name}    viavi

*** Test Cases ***
Verify That Air Only PNRs For Client Viavi Are Queued For Approval
    [Tags]    us13271
    Create PNR With Active Air Segments For Client VIAVI Air Only
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
Verify That PNRs For Client Viavi Can Skip Approval
    [Tags]    us13271    full_regression
    Create PNR With Active Air Segments For Client VIAVI Mix Segments, Skip Approval
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
    
Verify That Car Only PNRs For Client Viavi Do Not Go Thru Approval Process
    [Tags]    us13271    full_regression
    Create PNR For Client VIAVI Car Only
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
Verify That Hotel Only PNRs For Client Viavi Do Not Go Thru Approval Process
    [Tags]    us13271    full_regression
    Create PNR For Client VIAVI Hotel Only
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
Verify That Car And Hotel Only PNRs For Client Viavi Do Not Go Thru Approval Process
    [Tags]    us13271
    Create PNR For Client VIAVI Car And Hotel Only
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
Verify That Air Only PNRs For Client Viavi With RM*FS/-L Remark Do Not Go Thru Approval Process
    [Tags]    us13271    us15596    full_regression
    Create PNR With Active Air Segments For Client VIAVI Air Only, With RM*FS/-L Remark
    Select Reason Code Value L For TST 1
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
Verify That Air Only PNRs For Client Viavi With RM*FS/-7 Remark Do Not Go Thru Approval Process
    [Tags]    us13271    us15596
    Create PNR With Active Air Segments For Client VIAVI Air Only, With RM*FS/-7 Remark
    Select Reason Code Value 7 For TST 1
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    