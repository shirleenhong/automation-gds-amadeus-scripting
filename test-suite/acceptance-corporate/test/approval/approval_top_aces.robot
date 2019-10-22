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
${test_file_name}    top

*** Test Cases ***
Verify That Air Only PNRs For Client Top Aces Is Queued For Approval
    [Tags]    us13271
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Client Top Aces, Air Only, Intl Route
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
    
Verify That PNRs For Client Top Aces Can Skip Approval
    [Tags]    us13271    full_regression
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Client Top Aces, Mix Segments, Intl Route
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
    
Verify That PNRs For Client Top Aces With Domestic Route Do Not Go Thru Approval Process
    [Tags]    us13271
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Client Top Aces, Air Only, Dom Route
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
    
Verify That PNRs For Client Top Aces With Trans Route Do Not Go Thru Approval Process
    [Tags]    us13271    full_regression
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Client Top Aces, Air Only, Trans Route
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
    
Verify That Car Only PNRs For Client Top Aces Do Not Go Thru Approval Process
    [Tags]    us13271    full_regression
    Login To Amadeus Sell Connect Acceptance
    Create PNR For Client Top Aces, Car Only
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
    
Verify That Hotel Only PNRs For Client Top Aces Do Not Go Thru Approval Process
    [Tags]    us13271    full_regression
    Login To Amadeus Sell Connect Acceptance
    Create PNR For Client Top Aces, Hotel Only
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
    
Verify That Car And Hotel Only PNRs For Client Top Aces Do Not Go Thru Approval Process
    [Tags]    us13271
    Login To Amadeus Sell Connect Acceptance
    Create PNR For Client Top Aces, Car And Hotel Only
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    