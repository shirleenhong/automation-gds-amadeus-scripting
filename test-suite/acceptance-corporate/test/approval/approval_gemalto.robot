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
${test_file_name}    gemalto

*** Test Cases ***
Verify That PNRs For Client Gemalto Is Correctly Queued To Approval Queue For Ticket is Not Instant Purchase
    [Tags]    us13271
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Client Gemalto With Any Udid, Air with Hotel and Car, Ticket is Not Instant Purchase
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
Verify That PNRs For Client Gemalto Is Correctly Queued To Approval Queue For Exchange ticket
    [Tags]    us13271
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Client Gemalto With Any Udid, Air only, Exchange ticket
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
    
Verify That PNRs For Client Gemalto Is Correctly Queued To Approval Queue For Car Modified and Cost
    [Tags]    us13271
    Login To Amadeus Sell Connect Acceptance
    Create PNR For Client Gemalto With Any Udid, Car only, Car Modified and Cost
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
    
Verify That PNRs For Client Gemalto Is Correctly Queued To Approval Queue For Hotel Modified and Cost
    [Tags]    us13271    full_regression
    Login To Amadeus Sell Connect Acceptance
    Create PNR For Client Gemalto With Any Udid, Hotel only, Hotel Modified and Cost
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
    
Verify That PNRs For Client Gemalto Is Correctly Queued To Approval Queue For No Travel for Relocation
    [Tags]    us13271    full_regression
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Client Gemalto With Any Udid, Air with Hotel and Car, No Travel for Relocation
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
    
Verify That PNRs For Client Gemalto Is Correctly Queued To Approval Queue For Travel is Not Related to Natural Disaster
    [Tags]    us13271
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Client Gemalto With Any Udid, Air with Hotel and Car, Travel is Not Related to Natural Disaster
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
    
Verify That PNRs For Client Gemalto Can Skip Approval Process
    [Tags]    us13271    full_regression
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Client Gemalto With Any Udid, Ignore Approval Process
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
    
Verify That PNRs For Client Gemalto Do Not Go Thru Approval When RM U13 Is Written
    [Tags]    us13271    full_regression
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Client Gemalto With Any Udid and RM U13 Remark
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
    
Verify That PNRs For Client Gemalto Do Not Go Thru Approval For Udid Guest
    [Tags]    us13271
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Client Gemalto With Udid Guest
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    