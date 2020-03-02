*** Settings ***
Force Tags        corp
Resource          ../../pages/base.robot
Test Teardown    Close All Browsers

*** Variables ***
${test_file_name}    taylor

*** Test Cases ***
Verify That PNRs For Client Taylor Made Are Queued Correctly When 1st Primary Reason Is Selected
    [Tags]    us13271
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Client Taylor Made, Air Only, Select First Primary Reason
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
    
Verify That PNRs For Client Taylor Made Are Queued Correctly When 2nd Primary Reason Is Selected
    [Tags]    us13271    full_regression
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Client Taylor Made, Air Only, Select Second Primary Reason
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
    
Verify That PNRs For Client Taylor Made Are Queued Correctly When 3rd Primary Reason Is Selected
    [Tags]    us13271    full_regression
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Client Taylor Made, Air Only, Select Third Primary Reason
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
    
Verify That PNRs For Client Taylor Can Skip Approval
    [Tags]    us13271    full_regression
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Client Taylor Made Mix Segments, Skip Approval
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
    
Verify That Car Only PNRs For Client Taylor Made Do Not Go Thru Approval Process
    [Tags]    us13271    full_regression
    Login To Amadeus Sell Connect Acceptance
    Create PNR For Client Taylor Made, Car Only
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
    
Verify That Hotel Only PNRs For Client Taylor Made Do Not Go Thru Approval Process
    [Tags]    us13271    full_regression
    Login To Amadeus Sell Connect Acceptance
    Create PNR For Client Taylor Made, Hotel Only
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
    
Verify That Car And Hotel Only PNRs For Client Taylor Made Do Not Go Thru Approval Process
    [Tags]    us13271
    Login To Amadeus Sell Connect Acceptance
    Create PNR For Client Taylor Made, Car And Hotel Only
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
Verify That PNRs For Client Taylor Made With Udid50 CEO-NORAM Do Not Go Thru Approval Process
    [Tags]    us13271
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Client Taylor Made With Udid50 CEO-NORAM, Air Only
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
    
Verify That PNRs For Client Taylor Made With Udid50 SRVP-NORAM Do Not Go Thru Approval Process
    [Tags]    us13271    full_regression
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Client Taylor Made With Udid50 SRVP-NORAM, Air Only
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
    
Verify That PNRs For Client Taylor Made With Udid50 VP-NORAM Do Not Go Thru Approval Process
    [Tags]    us13271    full_regression
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Client Taylor Made With Udid50 VP-NORAM, Air Only
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    