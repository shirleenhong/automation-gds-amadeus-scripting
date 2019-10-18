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
${test_file_name}    jaguar

*** Test Cases ***
Verify That Air Only PNRs For Client Jaguar Land Rover Is Correctly Queued For Approval When Travel to any High Risk Country below must have ECM Approval Is Selected
    [Tags]    us13271
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Client Jaguar Land Rover With Air Only Segments, Select Travel to any High Risk Country below must have ECM Approval
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
Verify That Air Only PNRs For Client Jaguar Land Rover Is Correctly Queued For Approval When Any Country Is Selected
    [Tags]    us13271
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Client Jaguar Land Rover With Air Only Segments, Select Any Country
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
Verify That Air Only PNRs For Client Jaguar Land Rover Is Correctly Queued For Approval When Travel does not include Any Country listed Above Is Selected
    [Tags]    us13271    full_regression
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Client Jaguar Land Rover With Air Only Segments, Select Travel does not include Any Country Listed Above
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
Verify That Air Only Transborder PNRs For Client Jaguar Land Rover Do Not Go Thru Approval Process
    [Tags]    us13271    full_regression
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Client Jaguar Land Rover With Air Only Transborder Segments
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
Verify That Air Only Domestic PNRs For Client Jaguar Land Rover Do Not Go Thru Approval Process
    [Tags]    us13271    full_regression
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Client Jaguar Land Rover With Air Only Domestic Segments
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
Verify That Air Only PNRs For Client Jaguar Land Rover With RMG/ECM APPROVAL-RECEIVED Remark Do Not Go Thru Approval Process
    [Tags]    us13271    full_regression
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Client Jaguar Land Rover With Air Only Segments, RMG/ECM APPROVAL-RECEIVED
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
Verify That Air Only PNRs For Client Jaguar Land Rover With RMG/ECM-APPROVAL NOT REQUIRED Remark Do Not Go Thru Approval Process
    [Tags]    us13271
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Client Jaguar Land Rover With Air Only Segments, RMG/ECM-APPROVAL NOT REQUIRED
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
Verify That Car Only PNRs For Client Jaguar Land Rover Do Not Go Thru Approval Process
    [Tags]    us13271    full_regression
    Login To Amadeus Sell Connect Acceptance
    Create PNR For Client Jaguar Land Rover With Car Only Segment
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly

Verify That Hotel Only PNRs For Client Jaguar Land Rover With Any U*50 Do Not Go Thru Approval Process
    [Tags]    us13271    full_regression
    Login To Amadeus Sell Connect Acceptance
    Create PNR For Client Jaguar Land Rover With Hotel Only Segment
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly