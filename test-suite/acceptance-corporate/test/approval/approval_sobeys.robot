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
Verify That PNRs For Client Sobeys Is Writing Correct Remarks When Traveller Received Approval
    [Tags]    us13271
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Client Sobeys With Any Udid, Air with Hotel and Car, Traveller Received Approval
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    [Teardown]    Close Browser
     
Verify That PNRs For Client Sobeys Is Writing Correct Remarks When Traveller Obtain Approval
    [Tags]    us13271
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Client Sobeys With Any Udid, Air with Hotel and Car, Traveller Must Obtain Approval
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    [Teardown]    Close Browser
    
Verify That PNRs For Client Sobeys Is Writing Correct Remarks When PNR Has U47 And Traveller Received Approval
    [Tags]    us13271
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Client Sobeys With Any Udid, U47, Air Only, Traveller Received Approval
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    [Teardown]    Close Browser
    
Verify That PNRs For Client Sobeys Is Writing Correct Remarks For Hotel Only And Traveller Obtain Approval
    [Tags]    us13271
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Client Sobeys With Any Udid, Hotel Only, Traveller Must Obtain Approval
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    [Teardown]    Close Browser
    
Verify That PNRs For Client Sobeys Is Writing Correct Remarks For Car Only And Traveller Received Approval
    [Tags]    us13271
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Client Sobeys With Any Udid, Car Only, Traveller Received Approval
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    [Teardown]    Close Browser
    
Verify That PNRs For Client Sobeys Can Skip Approval Process
    [Tags]    us13271
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Client Sobeys With Any Udid, Air with Hotel and Car, Ignore Approval
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    [Teardown]    Close Browser
    
Verify That PNRs For Client Sobeys With RMG Approval Received Do Not Go Thru Approval Process
    [Tags]    us13271
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Client Sobeys With any Udid, RMG Approval Received, Air with Hotel and Car
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    [Teardown]    Close Browser
    
Verify That PNRs For Client Sobeys With U50 Guest Do Not Go Thru Approval Process
    [Tags]    us13271
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Client Sobeys With U50 GUEST, Air with Hotel and Car
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    [Teardown]    Close Browser
    