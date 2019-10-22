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
${test_file_name}    fujitsu

*** Test Cases ***
Verify That PNRs For Client Fujitsu Is Writing Correct Remarks For Client Visit Billable
    [Tags]    us13271
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Client Fujitsu With Any Udid, Air with Hotel and Car, Client Visit Billable
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
    
Verify That PNRs For Client Fujitsu Is Correctly Queued To Approval Queue For Conference Tradeshow
    [Tags]    us13271
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Client Fujitsu With Any Udid, Air with Hotel and Car, Conference/Tradeshow
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
    
Verify That PNRs For Client Fujitsu Is Correctly Queued To Approval Queue For Client Visit NonBillable
    [Tags]    us13271    full_regression
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Client Fujitsu With Any Udid, Air with Hotel and Car, Client Visit-Nonbillable
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
    
Verify That PNRs For Client Fujitsu Is Correctly Queued To Approval Queue For Internal Meeting
    [Tags]    us13271    full_regression
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Client Fujitsu With Any Udid, Air only, Internal Meeting
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
    
Verify That PNRs For Client Fujitsu Is Correctly Queued To Approval Queue For Recruit
    [Tags]    us13271
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Client Fujitsu With Any Udid, Hotel only, Recruit
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
    
Verify That PNRs For Client Fujitsu Is Correctly Queued To Approval Queue For Relocation
    [Tags]    us13271
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Client Fujitsu With Any Udid, Car only, Relocation
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
    
Verify That PNRs For Client Fujitsu Is Correctly Queued To Approval Queue For Sales Call
    [Tags]    us13271    full_regression
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Client Fujitsu With Any Udid, Air with Hotel and Car, Sales Call
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
    
Verify That PNRs For Client Fujitsu Is Correctly Queued To Approval Queue For Training/Seminar
    [Tags]    us13271
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Client Fujitsu With Any Udid, Air with Hotel and Car, Training/Seminar
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
    
Verify That PNRs For Client Fujitsu Can Skip Approval Process
    [Tags]    us13271    full_regression
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Client Fujitsu With Any Udid, Air with Hotel and Car, Ignore Approval
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
    
Verify That PNRs For Client Fujitsu Do Not Go Thru Approval Process For Rail
    [Tags]    us13271    full_regression
    Login To Amadeus Sell Connect Acceptance
    Create PNR For Client Fujitsu With Any Udid, Rail only
    Add 1 Rail Segments
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
    
Verify That PNRs For Client Fujitsu U50 FAI CEO Do Not Go Thru Approval Process
    [Tags]    us13271
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Client Fujitsu With Udid FAI CEO, Air with Hotel and Car
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    