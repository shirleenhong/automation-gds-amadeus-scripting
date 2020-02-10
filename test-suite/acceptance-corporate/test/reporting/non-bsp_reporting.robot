*** Settings ***
Force Tags       corp
Resource         ../../pages/base.robot
Test Setup       Login To Amadeus Sell Connect Acceptance
Test Teardown    Close All Browsers

*** Variables ***
${test_file_name}    non_bsp_reporting

*** Test Cases ***
Verify That Reporting Remarks Are Written For Single Non-BSP Segment
    [Tags]    us13617    us16563    full_regression    us16895    us17609
    Create PNR For Non BSP Reporting
    Book 1 Passive Air Segments For AC With Flight Number 317 And Route YULYYC
    Add Non-BSP Ticketing Details For Segment 2
    Verify Client Reporting Fields For Non-BSP For Single Segment
    Verify That Non-BSP Client Reporting Remarks Are Written In The PNR For Single Segment
    Verify High Fare Calculation For 1 Segment Is Sent
    
Verify That Reporting Remarks Are Written For Multiple Non-BSP Segments
    [Tags]    us13617    us16563    us17609
    Create PNR For Non BSP Reporting
    Book 2 Multiple Passive Air Segments For WS
    Add Non-BSP Ticketing Details For Multiple Segments
    Verify Client Reporting Fields For Non-BSP For Multiple Segment
    Verify That Non-BSP Client Reporting Remarks Are Written In The PNR For Multiple Segments
    Verify High Fare Calculation For 2 Segment Is Sent

Verify That Multiple Reporting Remarks Are Written for Multiple Non-BSP Accounting
    [Tags]    us13617    us16563    not_ready
    Create PNR For Non BSP Reporting
    Book 4 Multiple Passive Air Segments For Different Airline Codes
    Add Multiple Non-BSP Ticketing Details For Multiple Segments
    Verify Client Reporting Fields For Multiple Non-BSP Accounting
    Verify That Multiple Non-BSP Client Reporting Remarks Are Written In The PNR For Multiple Segments
    
Verify That Updated Reporting Values Are Written For Multiple Non-BSP Segments
    [Tags]    us13617    us16563
    Create PNR For Non BSP Reporting
    Book 1 Passive Air Segments For AC With Flight Number 317 And Route YULYYC
    Add Non-BSP Ticketing Details For Segment 2
    Update Client Reporting Values For Non-BSP
    Verify That Updated Non-BSP Client Reporting Remarks Are Written In The PNR
    Verify High Fare Calculation For 1 Segment Is Sent
    
Verify That Accounting Remark Is Written Correctly For Non BSP Exchange
    [Tags]    us13616
    Move Single Passenger And Add Passive Segment With Airline Code PD
    Add Non-BSP Exchange Ticketing Details For Single Segment Without Ticket Number
    Verify That Supplier Code Default Value Is Correct For PD
    Verify Accounting Remark Is Written Correctly For Non BSP Exchange
    