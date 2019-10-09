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

*** Test Cases ***
Verify That PNRs For Client Sleeman Breweries Are Correctly Queued To Approval Queue
    [Tags]    us13271
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Client Sleeman Breweries With Udid 50 EMPLOYEE, Air Only
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    [Teardown]     Close Browser
    
Verify That PNRs For Client Sleeman Breweries With Udid50 Guest Do Not Go Thru Approval Process
    [Tags]    us13271
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Client Sleeman Breweries With Udid 50 GUEST, Air Only
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    [Teardown]     Close Browser
    
Verify That PNRs For Client Sleeman Breweries With Udid50 Executive Do Not Go Thru Approval Process
    [Tags]    us13271
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Client Sleeman Breweries With Udid 50 EXECUTIVE, Air Only
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    [Teardown]     Close Browser
    
Verify That Car Only PNRs For Client Sleeman Breweries Do Not Go Thru Approval Process
    [Tags]    us13271
    Login To Amadeus Sell Connect Acceptance
    Create PNR For Client Sleeman Breweries With Udid 50 EMPLOYEE, Car Only
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    [Teardown]     Close Browser
    
Verify That Hotel Only PNRs For Client Sleeman Breweries Do Not Go Thru Approval Process
    [Tags]    us13271
    Login To Amadeus Sell Connect Acceptance
    Create PNR For Client Sleeman Breweries With Udid 50 EMPLOYEE, Hotel Only
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    [Teardown]     Close Browser
    
Verify That Car And Hotel Only PNRs For Client Sleeman Breweries Do Not Go Thru Approval Process
    [Tags]    us13271
    Login To Amadeus Sell Connect Acceptance
    Create PNR For Client Sleeman Breweries With Udid 50 EMPLOYEE, Car And Hotel Only
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    [Teardown]     Close Browser
    
Verify That Mix Segment PNRs For Client Sleeman Breweries Are Correctly Queued To Approval Queue
    [Tags]    us13271
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Client Sleeman Breweries With Udid 50 EMPLOYEE, Mix Segments
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    [Teardown]     Close Browser