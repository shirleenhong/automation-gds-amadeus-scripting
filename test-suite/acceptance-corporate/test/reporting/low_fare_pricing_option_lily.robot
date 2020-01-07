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
Test Setup       Login To Amadeus Sell Connect Acceptance
Test Teardown     Close All Browsers

*** Variables ***
${test_file_name}    lilly_low_fare

*** Test Cases ***
Verify Low fare Is Defaulted And Write Correctly For Single TST For Domestic Flight
    [Tags]    US15248
    Create PNR With Active Air Segments For Client Lilly With CFA PX1, Domestic Single TST
    Add Client Reporting Values For Single TST BSP Segment For Lily
    Verify That Single BSP Client Reporting Remarks Are Written In The PNR For Single TST
    
Verify Low fare Is Defaulted And Write Correctly For Multi TST For Domestic Flight
    [Tags]    US15248
    Create PNR With Active Air Segments For Client Lilly With CFA PX1, Domestic Multi TST
    Add Client Reporting Values For Multi TST BSP Segment For Lily
    Verify That Single BSP Client Reporting Remarks Are Written In The PNR For Multiple TST
    
Verify Low fare Is Defaulted And Write Correctly For Multiple TST For International Flight
    [Tags]    US15248
    Create PNR With Active Air Segments For Client Lilly With CFA PX1, Intl Multi TST
    Add Client Reporting Values For Multi TST BSP Segment For Lily
    Verify That Single BSP Client Reporting Remarks Are Written In The PNR For Multiple TST
    
Verify Low fare Is Defaulted And Write Correctly For Multiple TST For Transborder Flight
    [Tags]    US15248
    Create PNR With Active Air Segments For Client Lilly With CFA PX1, Trans Multi TST
    Add Client Reporting Values For Multi TST BSP Segment For Lily
    Verify That Single BSP Client Reporting Remarks Are Written In The PNR For Multiple TST