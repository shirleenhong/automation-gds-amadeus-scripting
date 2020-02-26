*** Settings ***
Force Tags        corp
Resource          ../../pages/base.robot
Test Setup        Login To Amadeus Sell Connect Acceptance
Test Teardown     Close All Browsers

*** Variables ***
${test_file_name}    bsp_reporting

*** Test Cases ***
Verify That Reporting Remarks Are Written For Single TST
    [Tags]    us10551    us9700    us17609    full_regression   
    Create PNR With Active Air Segments For Single BSP Segment
    Get Base Fare For 1 TST
    Add Client Reporting Values For Single BSP Segment
    Verify That Client Reporting Remarks Are Written In The PNR For Single TST
    Verify Aqua Compliance Tracker Is Written In The PNR
    Delete Fare and Itinerary
    
Verify That Reporting Remark Are Written For Multiple TSTs
    [Tags]    us10551    us17609
    Create PNR With Active Air Segments For Multiple BSP Segment
    Get Base Fare For 3 TST
    Add Client Reporting Values For Multiple BSP Segment
    Verify That Client Reporting Remarks Are Written In The PNR For Multiple TSTs
    Delete Fare and Itinerary
  
Verify That Reporting Remark Are Written For Multiple Segments And TSTs 
    [Tags]    us10551
    Move Single Passenger And Add Multiple BSP Segment With Multiple TSTs
    Add Client Reporting Values For Multiple BSP Segment And Multiple TSTs
    Verify That Client Reporting Remarks Are Written In The PNR For Multiple Segments And Multiple TSTs
    Delete Fare and Itinerary
    
Verify That Client Reporting Are Correct For Exchange PNR
    [Tags]    us10551
    Move Single Passenger And Add Single BSP Segment With TST
    Create Exchange PNR In The GDS
    Verify Client Reporting Fields For Exchange PNR
    Verify That BSP Client Reporting Remarks Are Written In The PNR For Exchange TST
    Delete Fare and Itinerary 
    