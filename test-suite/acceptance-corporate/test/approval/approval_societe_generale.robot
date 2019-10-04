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
${test_file_name}    societe

*** Test Cases ***
Verify That PNRs For Client Societe Generale Exit Approval Process When First Primary Reason Is Selected
    [Tags]    us13271
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Client Societe Generale, Air Only, Select First Primary Reason
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    [Teardown]     Close Browser
    
Verify That PNRs For Client Societe Generale Are Put On Hold When Second Primary Reason Is Selected
    [Tags]    us13271
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Client Societe Generale, Air Only, Select Second Primary Reason
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    [Teardown]     Close Browser
    
Verify That PNRs For Client Societe Generale Can Skip Approval
    [Tags]    us13271
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Client Societe Generale, Mix Segments, Skip Approval
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    [Teardown]     Close Browser
    
Verify That PNRs For Client Societe Generale With FOP That Is Not AX Do Not Go Thru Approval Process
    [Tags]    us13271
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Client Societe Generale, Air Only, FOP Is Not AX
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    [Teardown]     Close Browser

Verify That PNRs For Client Societe Generale With FOP That Is AX But Does Not End In 1010 Do Not Go Thru Approval Process
    [Tags]    us13271
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Client Societe Generale, Air Only, FOP Is AX But Does Not End In 1010
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    [Teardown]     Close Browser
    
Verify That PNRs For Client Societe Generale With BTA APPR RECEIVED Remark Do Not Go Thru Approval Process
    [Tags]    us13271
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Client Societe Generale With BTA APPR RECEIVED Remark, Air Only
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    [Teardown]     Close Browser