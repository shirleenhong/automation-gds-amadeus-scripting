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
${test_file_name}    gilead

*** Test Cases ***
Verify That PNRs For Client Gilead Is Correctly Queued To Approval Queue For Approval E-Mail Required
    [Tags]    us13271
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Client Gilead With Any Udid, Approval E-Mail Required
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    [Teardown]    Close Browser
    
Verify That PNRs For Client Gilead Is Correctly Queued To Approval Queue For Approval E-Mail Required For Exchange
    [Tags]    us13271
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Client Gilead With Any Udid, Air Only, Approval E-Mail Required For Exchange
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    [Teardown]    Close Browser
    
Verify That PNRs For Client Gilead Is Correctly Queued To Approval Queue For Consultant will Request Email
    [Tags]    us13271
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Client Gilead With Any Udid, Air Only, Consultant will Request Email
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    [Teardown]    Close Browser
    
Verify That PNRs For Client Gilead Is Correctly Queued To Approval Queue For Air, Hotel, Car
    [Tags]    us13271
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Client Gilead With Any Udid, with Air hotel and Car, Approval E-Mail Required
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    [Teardown]    Close Browser
    
Verify That PNRs For Client Gilead Can Skip Approval Process
    [Tags]    us13271
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Client Gilead With Any Udid, Air Only, Ignore Approval Process
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    [Teardown]    Close Browser
    
Verify That PNRs For Client Gilead Do Not Go Thru Approval For Hotel Only
    [Tags]    us13271
    Login To Amadeus Sell Connect Acceptance
    Create PNR For Client Gilead With Any Udid, Hotel Only
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    [Teardown]    Close Browser
    
Verify That PNRs For Client Gilead Do Not Go Thru Approval For Car Only
    [Tags]    us13271
    Login To Amadeus Sell Connect Acceptance
    Create PNR For Client Gilead With Any Udid, Car Only
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    [Teardown]    Close Browser