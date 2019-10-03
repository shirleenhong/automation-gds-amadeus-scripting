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
Verify That Air Only PNRs For Client Ribbon With Any U*50 Except GUEST-NORAM, VIP-CA, or VIP-CA-S Is Correctly Queued To Approval Queue
    [Tags]    us13271
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Client Ribbon With Any Udid 50 Except GUEST-NORAM, VIP-CA, or VIP-CA-S, Air Only
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    [Teardown]    Logout To Amadeus Sell Connect
    
Verify That Mixed Segment PNRs For Client Ribbon With Any U*50 Except GUEST-NORAM, VIP-CA, or VIP-CA-S Is Correctly Queued To Approval Queue
    [Tags]    us13271
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Client Ribbon With Any Udid 50 Except GUEST-NORAM, VIP-CA, or VIP-CA-S, Mixed Segments
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    [Teardown]    Logout To Amadeus Sell Connect
    
Verify That Air Only PNRs For Client Ribbon With U*50 As GUEST-NORAM Do Not Go Thru Approval Process
    [Tags]    us13271
    Login To Amadeus Sell Connect Acceptance
    Create PNR For Client Ribbon With Udid 50 GUEST-NORAM, Air Only
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    [Teardown]    Logout To Amadeus Sell Connect
    
Verify That Air Only PNRs For Client Ribbon With U*50 As VIP-CA Do Not Go Thru Approval Process
    [Tags]    us13271
    Login To Amadeus Sell Connect Acceptance
    Create PNR For Client Ribbon With Udid 50 VIP-CA, Air Only
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    [Teardown]    Logout To Amadeus Sell Connect
    
Verify That Air Only PNRs For Client Ribbon With U*50 As VIP-CA-S Do Not Go Thru Approval Process
    [Tags]    us13271
    Login To Amadeus Sell Connect Acceptance
    Create PNR For Client Ribbon With Udid 50 VIP-CA-S, Air Only
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    [Teardown]    Logout To Amadeus Sell Connect
    
Verify That Hotel Only PNRs For Client Ribbon With Any U*50 Except GUEST-NORAM, VIP-CA, or VIP-CA-S Do Not Go Thru Approval Process
    [Tags]    us13271
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Client Ribbon With Any Udid 50 Except GUEST-NORAM, VIP-CA, or VIP-CA-S, Hotel Only
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    [Teardown]    Logout To Amadeus Sell Connect
    
Verify That Car Only PNRs For Client Ribbon With Any U*50 Except GUEST-NORAM, VIP-CA, or VIP-CA-S Do Not Go Thru Approval Process
    [Tags]    us13271
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Client Ribbon With Any Udid 50 Except GUEST-NORAM, VIP-CA, or VIP-CA-S, Car Only
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    [Teardown]    Logout To Amadeus Sell Connect