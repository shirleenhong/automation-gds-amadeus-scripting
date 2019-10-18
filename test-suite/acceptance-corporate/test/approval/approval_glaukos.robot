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
${test_file_name}    glaukos

*** Test Cases ***
Verify That Air Only PNRs For Client Glaukos Is Correctly Queued For Approval When Travel is Booked First Class is Selected
    [Tags]    us13271
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Client Glaukos With Udid 50 GENERAL-CA, Air Only, Select Travel is Booked First Class
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
Verify That Air Only PNRs For Client Glaukos Is Correctly Queued For Approval When Travel is Booked Business Class is Selected
    [Tags]    us13271    full_regression
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Client Glaukos With Udid 50 GUEST-CA, Air Only, Select Travel is Booked Business Class
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
Verify That Air Only PNRs For Client Glaukos Is Correctly Queued For Approval When Travel is Booked Premium Economy is Selected
    [Tags]    us13271    
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Client Glaukos With Udid 50 GENERAL-CA, Air Only, Select Travel is Booked Premium Economy
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly

Verify That Hotel And Car Only PNRs For Client Glaukos Do Not Go Thru Approval Process
    [Tags]    us13271    full_regression
    Login To Amadeus Sell Connect Acceptance
    Create PNR For Client Glaukos With Udid 50 GUEST-CA, Hotel And Car Segments
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
Verify That Air Only PNRs For Client Glaukos With Other U*50 Do Not Go Thru Approval Process
    [Tags]    us13271
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Client Glaukos With Other Udid 50, Air Only
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly