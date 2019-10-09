*** Settings ***
Force Tags        corp
Library           String
Library           SeleniumLibrary
Library           Collections
Library           Screenshot
Resource          ../../pages/amadeus.robot
Resource          ../../pages/reporting.robot
Resource          ../../pages/base.robot
Resource          ../../../resources/common/api-utilities.txt
Test Teardown    Close All Browsers

*** Variables ***
${test_file_name}    destination_code

*** Test Cases ***
Verify That Destination Code Remark Is Written For Single TST
    [Tags]   us11100
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Destination Code Remark With Single TST
    Populate Destination Code Fields For Single TST
    Verify Destination Code Remarks Are Written In The PNR
    
    
    
Verify That Destination Code Remark Is Written For Multiple Segment And Single TST
    [Tags]   us11100
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Destination Code Remark With Multiple Segment And Single TST
    Populate Destination Code Fields For Single TST
    Verify Destination Code Remarks Are Written In The PNR
    
    
Verify That Destination Code Remark Is Written For Multiple Segment And Multiple TSTs
    [Tags]   us11100
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Destination Code Remark With Multiple Segment And Multiple TSTs
    Populate Destination Code Fields For Multiple TST
    Verify Destination Code Remarks Are Written In The PNR
    