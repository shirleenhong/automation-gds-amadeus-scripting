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
${test_file_name}    imperial

*** Test Cases ***
Verify That PNRs For Client Imperial Tobacco Is Correctly Queued To Approval Queue For DOM Booked Less than 14 days
    [Tags]    us13271
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments Less Than 14 Days For Client Imperial With Any Udid, Air DOM Booked Less than 14 days
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
    
Verify That PNRs For Client Imperial Tobacco Is Correctly Queued To Approval Queue For TRANS Booked Less than 14 days
    [Tags]    us13271    full_regression
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments Less Than 14 Days For Client Imperial With Any Udid, Air TRANS Booked Less than 14 days
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
    
Verify That PNRs For Client Imperial Tobacco Is Correctly Queued To Approval Queue For DOM Booked More than 14 days
    [Tags]    us13271    full_regression
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Client Imperial With Any Udid, Air DOM Booked More than 14 days, Lowest Fare Declined Reason
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
    
Verify That PNRs For Client Imperial Tobacco Is Correctly Queued To Approval Queue For TRANS Booked More than 14 days
    [Tags]    us13271
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Client Imperial With Any Udid, Air TRANS Booked More than 14 days, Lowest Fare Declined Reason
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
    
Verify That PNRs For Client Imperial Tobacco Is Correctly Queued To Approval Queue For INTL Booked Less than 21 days
    [Tags]    us13271
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments Less Than 21 Days For Client Imperial With Any Udid, Air INTL Booked Less than 21 days
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
    
Verify That PNRs For Client Imperial Tobacco Is Correctly Queued To Approval Queue For INTL Booked More than 21 days 
    [Tags]    us13271    full_regression
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Client Imperial With Any Udid, Air INTL Booked More than 21 days, Lowest Fare Declined Reason
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
    
Verify That PNRs For Client Imperial Tobacco Can Skip Approval Process
    [Tags]    us13271    full_regression
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Client Imperial With Any Udid, Ignore Approval Process
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
    
Verify That PNRs For Client Imperial Tobacco Do Not Go Thru Approval Process When Air Savings Code L
    [Tags]    us13271   expect_to_fail    full_regression
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Client Imperial With Any Udid, Air DOM Booked More than 14 days, Air Savings Code L
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
    
Verify That PNRs For Client Imperial Tobacco Do Not Go Thru Approval Process When Air Savings Code 7
    [Tags]    us13271    expect_to_fail
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Client Imperial With Any Udid, Air TRANS Booked More than 14 days, Air Savings Code 7
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
    
Verify That PNRs For Client Imperial Tobacco Do Not Go Thru Approval Process When Air Savings Code 7 And INTL Booked More than 21 days 
    [Tags]    us13271    expect_to_fail
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Client Imperial With Any Udid, Air INTL Booked More than 21 days, Air Savings Code 7
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
    
Verify That PNRs For Client Imperial Tobacco Do Not Go Thru Approval Process When UDID is President
    [Tags]    us13271    full_regression
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments Less Than 14 Days For Client Imperial With Udid President, Air DOM Booked
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
    
Verify That PNRs For Client Imperial Tobacco Do Not Go Thru Approval Process For Hotel And Car
    [Tags]    us13271
    Login To Amadeus Sell Connect Acceptance
    Create PNR For Client Imperial With Any Udid, Hotel And Car
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    