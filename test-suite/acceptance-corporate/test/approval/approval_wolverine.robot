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
Verify That PNRs For Client Wolverine Are Queued For Approval
    [Tags]    us13271
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Client Wolverine, Air Only, Select First Primary Reason
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    [Teardown]     Close Browser
    
Verify That PNRs For Client Wolverine Can Skip Approval
    [Tags]    us13271
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Client Wolverine, Mix Segments, Skip Approval
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    [Teardown]     Close Browser
    
Verify That Car Only PNRs For Client Wolverine Do Not Go Thru Approval Process
    [Tags]    us13271
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Client Wolverine, Car Only
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    [Teardown]     Close Browser
    
Verify That Hotel Only PNRs For Client Wolverine Do Not Go Thru Approval Process
    [Tags]    us13271
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Client Wolverine, Hotel Only
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    [Teardown]     Close Browser
    
Verify That Car And Hotel Only PNRs For Client Wolverine Do Not Go Thru Approval Process
    [Tags]    us13271
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Client Wolverine, Car And Hotel Only
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    [Teardown]     Close Browser