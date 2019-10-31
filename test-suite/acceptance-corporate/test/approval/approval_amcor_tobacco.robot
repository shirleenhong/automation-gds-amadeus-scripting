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
${test_file_name}    amcor

*** Test Cases ***
Verify That PNRs For Client Amcor Tobbacco Is Correctly Queued To Approval Queue
    [Tags]    us13271    full_regression
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Client Amcor Tobacco With Any Udid 50 Except EXECUTIVE ASC-CA, Air Only
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
Verify That PNRs For Client Amcor Tobbacco with Mixed Segments Is Correctly Queued To Approval Queue
    [Tags]    us13271
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Client Amcor Tobacco With Any Udid 50 Except EXECUTIVE ASC-CA, Mix Segments
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
Verify That Hotel Only PNRs For Client Amcor Tobbacco Do Not Go Thru Approval Process
    [Tags]    us13271    full_regression
    Login To Amadeus Sell Connect Acceptance
    Create PNR For Client Amcor Tobacco With Any Udid 50 Except EXECUTIVE ASC-CA, Hotel Only
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
Verify That Car Only PNRs For Client Amcor Tobbacco Do Not Go Thru Approval Process
    [Tags]    us13271    full_regression
    Login To Amadeus Sell Connect Acceptance
    Create PNR For Client Amcor Tobacco With Any Udid 50 Except EXECUTIVE ASC-CA, Car Only
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
Verify That PNRs For Client Amcor Tobbacco With U*50 As EXECUTIVE ASC-CA Do Not Go Thru Approval Process
    [Tags]    us13271
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Client Amcor Tobacco With Udid 50 EXECUTIVE ASC-CA, Air Only
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
Verify That PNRs For Client Amcor Tobbacco With Non Air Segments And U*50 As EXECUTIVE ASC-CA Do Not Go Thru Approval Process
    [Tags]    us13271
    Login To Amadeus Sell Connect Acceptance
    Create PNR For Client Amcor Tobacco With Udid 50 EXECUTIVE ASC-CA, Hotel and Car Only
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly