*** Settings ***
Force Tags        corp
Resource          ../../pages/base.robot
Test Setup        Login To Amadeus Sell Connect Acceptance
Test Teardown     Close All Browsers

*** Variables ***
${test_file_name}    virtamove

*** Test Cases ***
Verify That PNRs For Client VirtaMove Corp Exit Approval Process When First Primary Approval Reason Is Selected
    [Tags]    us13271
    Create PNR With Active Air Segments For Client VirtaMove Corp, Air Only, Select First Primary Reason
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
Verify That PNRs For Client VirtaMove Corp Are Put On Hold When Second Primary Approval Reason Is Selected
    [Tags]    us13271
    Create PNR With Active Air Segments For Client VirtaMove Corp, Air Only, Select Second Primary Reason
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
Verify That PNRs For Client VirtaMove Corp With Travel Auth By Remark Do Not Go Thru Approval Process
    [Tags]    us13271    full_regression
    Create PNR With Active Air Segments For Client VirtaMove Corp With Travel Auth By Remark, Air Only
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
Verify That Car Only PNRs For Client VirtaMove Corp Can Skip Approval Process
    [Tags]    us13271    full_regression
    Create PNR For Client VirtaMove Corp, Car Only, Skip Approval
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
Verify That Hotel Only PNRs For Client VirtaMove Corp Can Skip Approval Process
    [Tags]    us13271    full_regression
    Create PNR For Client VirtaMove Corp, Hotel Only, Skip Approval
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
Verify That Car And Hotel Only PNRs For Client VirtaMove Corp Can Skip Approval Process
    [Tags]    us13271
    Create PNR For Client VirtaMove Corp, Car And Hotel Only, Skip Approval
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
Verify That PNRs For Client VirtaMove Corp Can Skip Approval Process
    [Tags]    us13271    full_regression
    Create PNR With Active Air Segments For Client VirtaMove Corp, Mix Segments, Skip Approval
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    