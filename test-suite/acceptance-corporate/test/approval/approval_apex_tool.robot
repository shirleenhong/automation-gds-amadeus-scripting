*** Settings ***
Force Tags        corp
Resource          ../../pages/base.robot
Test Setup        Login To Amadeus Sell Connect Acceptance
Test Teardown    Close All Browsers

*** Variables ***
${test_file_name}    apex_tool

*** Test Cases ***
Verify That PNRs For Client Apex Tool Go Thru Approval Process When U50 Is Not VIP-NORAM
    [Tags]    us16550    not_ready    
    Create PNR With Active Air Segments For Client Apex Tool With U50 GUEST-NORAM
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
Verify That PNRs For Client Apex Tool Do Not Go Thru Approval Process When U50 Is VIP-NORAM
    [Tags]    us16550    not_ready
    Create PNR With Active Air Segments For Client Apex Tool With U50 VIP-NORAM
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
Verify That PNRs For Client Apex Tool Can Skip Approval Process
    [Tags]    us16550    not_ready
    Create PNR With Active Air Segments For Client Apex Tool, Skip Approval
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
Very That Car/Hotel Only PNRs For Client Apex Tool Do Not Go Thru Approval Process
    [Tags]    us16550    not_ready
    Create PNR For Client Apex Tool With Car & Hotel Only Segments
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    