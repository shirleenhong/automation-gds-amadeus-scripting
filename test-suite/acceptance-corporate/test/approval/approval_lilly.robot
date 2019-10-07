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

*** Variables ***
${test_file_name}    lilly

*** Test Cases ***
Verify That PNRs For Client Lilly Are Queued For Approval
    [Tags]    us13271
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Client Lilly With Udid 50 NORAM-ASSOCIATE-S, Air Only, Intl Route
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    [Teardown]     Close Browser
     
Verify That PNRs For Client Lilly With Domestic Route Do Not Go Thru Approval Process
    [Tags]    us13271
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Client Lilly With Udid 50 NORAM-ASSOCIATE-S, Air Only, Dom Route
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    [Teardown]     Close Browser
     
Verify That PNRs For Client Lilly With Trans Route Do Not Go Thru Approval Process
    [Tags]    us13271
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Client Lilly With Udid 50 NORAM-ASSOCIATE-S, Air Only, Trans Route
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    [Teardown]     Close Browser
    
Verify That Car Only PNRs For Client Lilly Do Not Go Thru Approval Process
    [Tags]    us13271
    Login To Amadeus Sell Connect Acceptance
    Create PNR For Client Lilly With Udid 50 NORAM-ASSOCIATE-S, Car Only
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    [Teardown]     Close Browser
    
Verify That Car & Hotel Only PNRs For Client Lilly Do Not Go Thru Approval Process
    [Tags]    us13271
    Login To Amadeus Sell Connect Acceptance
    Create PNR For Client Lilly With Udid 50 NORAM-ASSOCIATE-S, Car And Hotel Only
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    [Teardown]     Close Browser
    
Verify That PNRs For Client Lilly Can Skip Approval Process
    [Tags]    us13271
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Client Lilly With Udid 50 NORAM-ASSOCIATE-S, Mix Segments, Intl Route
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    [Teardown]     Close Browser
    
Verify That PNRs For Client Lilly With U*50 As Guest Do Not Go Thru Approval Process
    [Tags]    us13271
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Client Lilly With Udid 50 GUEST, Air Only, Intl Route
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    [Teardown]     Close Browser