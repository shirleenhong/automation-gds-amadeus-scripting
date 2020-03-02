*** Settings ***
Force Tags        corp
Resource          ../../pages/base.robot
Test Setup       Login To Amadeus Sell Connect Acceptance
Test Teardown    Close All Browsers

*** Variables ***
${test_file_name}    yardi

*** Test Cases ***
Verify That PNRs For Client Yardi Systems Are Queued For Approval When First Primary Reason Is Selected
    [Tags]    us13271
    Create PNR With Active Air Segments For Client Yardi Systems With Udid50 GENERAL-CA-S, Air Only, Select First Primary Reason
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
Verify That PNRs For Client Yardi Systems Are Queued For Approval When Second Primary Reason Is Selected
    [Tags]    us13271    expect_to_fail
    Create PNR With Active Air Segments For Client Yardi Systems With Udid50 GENERAL-CA-S, Air Only, Select Second Primary Reason
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
Verify That PNRs For Client Yardi Systems Are Queued For Approval When Third Primary Reason Is Selected
    [Tags]    us13271    expect_to_fail
    Create PNR With Active Air Segments For Client Yardi Systems With Udid50 GENERAL-CA-S, Mix Segments, Select Third Primary Reason
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
Verify That PNRs For Client Yardi Systems Are Queued For Approval When Fourth Primary Reason Is Selected
    [Tags]    us13271    expect_to_fail
    Create PNR With Active Air Segments For Client Yardi Systems With Udid50 GENERAL-CA-S, Air Only, Select Fourth Primary Reason
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
Verify That PNRs For Client Yardi Systems Are Queued For Approval When Fifth Primary Reason Is Selected
    [Tags]    us13271    expect_to_fail
    Create PNR With Active Air Segments For Client Yardi Systems With Udid50 GENERAL-CA-S, Air Only, Select Fifth Primary Reason
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
Verify That PNRs For Client Yardi Systems Are Queued For Approval When Sixth Primary Reason Is Selected
    [Tags]    us13271    expect_to_fail
    Create PNR For Client Yardi Systems With Udid50 VIP-CA-S, Car Only, Select Sixth Primary Reason
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
Verify That PNRs For Client Yardi Systems Are Queued For Approval When Seventh Primary Reason Is Selected
    [Tags]    us13271    expect_to_fail
    Create PNR For Client Yardi Systems With Udid50 GENERAL-CA-S, Hotel Only, Select Seventh Primary Reason
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
Verify That PNRs For Client Yardi Systems Are Queued For Approval When Eight Primary Reason Is Selected
    [Tags]    us13271    expect_to_fail
    Create PNR For Client Yardi Systems With Udid50 GENERAL-CA-S, Car And Hotel Only, Select Eight Primary Reason
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
Verify That PNRs For Client Yardi Systems Can Skip Approval
    [Tags]    us13271    full_regression
    Create PNR With Active Air Segments For Client Yardi Systems With Udid50 VIP-CA-S, Air Only, Skip Approval
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly

Verify That PNRs For Client Yardi Systems With UDID GUEST-CA-S Do Not Go Thru Approval Process
    [Tags]    us13271
    Create PNR With Active Air Segments For Client Yardi Systems With Udid50 GUEST-CA-S, Air Only
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly