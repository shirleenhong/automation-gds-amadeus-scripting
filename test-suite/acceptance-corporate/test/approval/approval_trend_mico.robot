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
${test_file_name}    trend

*** Test Cases ***
Verify That PNRs For Client Trend Mico Exit Approval Process When First Primary Approval Reason Is Selected
    [Tags]    us13271
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Client Trend Mico, Air Only, Select First Primary Reason
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
Verify That PNRs For Client Trend Mico Are Put On Hold When Second Primary Approval Reason Is Selected
    [Tags]    us13271
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Client Trend Mico, Air Only, Select Second Primary Reason
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
Verify That PNRs For Client Trend Mico With Travel Auth By Remark Do Not Go Thru Approval Process
    [Tags]    us13271
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Client Trend Mico With Travel Auth By Remark, Air Only
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
Verify That Car Only PNRs For Client Trend Mico Do Not Go Thru Approval Process
    [Tags]    us13271    full_regression
    Login To Amadeus Sell Connect Acceptance
    Create PNR For Client Trend Mico, Car Only
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
Verify That Hotel Only PNRs For Client Trend Mico Do Not Go Thru Approval Process
    [Tags]    us13271    full_regression
    Login To Amadeus Sell Connect Acceptance
    Create PNR For Client Trend Mico, Hotel Only
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
Verify That Car And Hotel Only PNRs For Client Trend Mico Do Not Go Thru Approval Process
    [Tags]    us13271
    Login To Amadeus Sell Connect Acceptance
    Create PNR For Client Trend Mico, Car And Hotel Only
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
Verify That PNRs For Client Trend Mico Can Skip Approval Process
    [Tags]    us13271    full_regression
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Client Trend Mico, Mix Segments, Skip Approval
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    