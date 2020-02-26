*** Settings ***
Force Tags        corp
Resource          ../../pages/base.robot
Test Setup        Login To Amadeus Sell Connect Acceptance
Test Teardown     Close All Browsers

*** Variables ***
${test_file_name}    destination_code

*** Test Cases ***
Verify That Destination Code Remark Is Written For Single TST
    [Tags]   us11000
    Create PNR With Active Air Segments For Destination Code Remark With Single TST
    Populate Destination Code Fields For Single TST
    Verify Destination Code Remarks Are Written In The PNR    
    
Verify That Destination Code Remark Is Written For Multiple Segment And Single TST
    [Tags]   us11000
    Create PNR With Active Air Segments For Destination Code Remark With Multiple Segment And Single TST
    Populate Destination Code Fields For Single TST
    Verify Destination Code Remarks Are Written In The PNR
    
Verify That Destination Code Remark Is Written For Multiple Segment And Multiple TSTs
    [Tags]   us11000
    Create PNR With Active Air Segments For Destination Code Remark With Multiple Segment And Multiple TSTs
    Populate Destination Code Fields For Multiple TST
    Verify Destination Code Remarks Are Written In The PNR
    
Verify That Destination Code Remark Is Written For Passive Air Segments
    [Tags]   us17712
    Create PNR With Passive Air Segments For Destination Code Remark For Passive Air Segment/s
    Populate Destination Code Fields For Passive Air, No TST
    Verify Destination Code Remarks Are Written In The PNR

Verify That Destination Code Remark Is Written For Active Car Segments
    [Tags]   us17712
    Create PNR With Active Car Segments For Destination Code Remark For Active Car Segment/s
    Populate Destination Code Fields For Active Car, No TST
    Verify Destination Code Remarks Are Written In The PNR
    
Verify That Destination Code Remark Is Written For Passive Car Segments
    [Tags]   us17712
    Create PNR For Destination Code Remark For Passive Car Segment/s
    Populate Destination Code Fields For Passive Car, No TST
    Verify Destination Code Remarks Are Written In The PNR
    
Verify That Destination Code Remark Is Written For Active Hotel Segments
    [Tags]   us17712    not_ready
    Create PNR With Active Hotel Segments In YVR For Destination Code Remark For Active Hotel Segment/s
    Populate Destination Code Fields For Active Hotel, No TST
    Verify Destination Code Remarks Are Written In The PNR    
    
Verify That Destination Code Remark Is Written For Passive Hotel Segments
    [Tags]   us17712
    Create PNR For Destination Code Remark For Passive Hotel Segment/s
    Populate Destination Code Fields For Passive Hotel, No TST
    Verify Destination Code Remarks Are Written In The PNR
    
Verify That Destination Code Remark Is Written For Rail Segments
    [Tags]    us17712
    Create PNR For Destination Code Remark For Rail Segment/s
    Add 2 Rail Segments
    Populate Destination Code Fields For Rail, No TST
    Verify Destination Code Remarks Are Written In The PNR
    
Verify That Destination Code Remark Is Written For Limo Segments
    [Tags]    us17712
    Create PNR For Destination Code Remark For Limo Segment/s
    Populate Destination Code Fields For Limo, No TST
    Verify Destination Code Remarks Are Written In The PNR
