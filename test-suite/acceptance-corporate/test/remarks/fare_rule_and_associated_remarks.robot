*** Settings ***
Force Tags        corp
Resource          ../../pages/base.robot
Test Setup       Login To Amadeus Sell Connect Acceptance
Test Teardown    Close All Browsers

*** Variables ***
${test_file_name}    fare_rule_assoc

*** Test Cases ***
Verify That Fare Rule Optional Fare Remarks Are Written For Ticket Min/Max Stay
    [Tags]    us16893    us16892
    Create PNR With Passive Air Segments For Corporate, Fare Rule Min and Max Stay With Assoc Remarks
    Complete Fare Rule For Ticket Min/Max Stay With Associated Remarks
    Verify Fare Rule Remarks Are Written In The PNR
    
Verify That Fare Rule Optional Fare Remarks Are Written For Ticket Non-Refundable
    [Tags]    us16893    us16892
    Create PNR With Passive Air Segments For Corporate, Fare Rule Ticket Non Refundable With Assoc Remarks
    Complete Fare Rule For Ticket Non Refundable And Non Ref With Associated Remarks
    Verify Fare Rule Remarks Are Written In The PNR    

Verify That Fare Rule Optional Fare Remarks Are Written For Ticket Amount
    [Tags]    us16893    us16892
    Create PNR With Passive Air Segments For Corporate, Fare Rule Ticket Amount
    Complete Fare Rule For Ticket Amount And Verify Remarks
    
Verify That Fare Rule Optional Fare Remarks Are Written For Non-Refundable %
    [Tags]    us16893    us16892
    Create PNR With Passive Air Segments For Corporate, Fare Rule Non refundable Percentage
    Complete fare Rule For Non Refundable Percentage And Verify Remarks
    
Verify That PBN Remark For Fare Rule Optional Fare Remarks Are Entered In The PNR For Air Canada Segment/s
    [Tags]    us16893    us16892    us17708    de3219
    Create PNR With Active Air Segments For Corporate, Fare Rule For Air Canada and WestJet Segments
    Add Fare Rule For Air Canada Segments
    Verify If PBN Remark For Fare Rule Are Entered In The PNR For Air Canada Segment/s
    
Verify That PBN Remark For Fare Rule Optional Fare Remarks Are Entered In The PNR For WestJet Segment/s
    [Tags]    us16893    us16892    us17708    de3219
    Create PNR With Active Air Segments For Corporate, Fare Rule For Air Canada and WestJet Segments
    Add Fare Rule For WestJet Segments
    Verify If PBN Remark For Fare Rule Are Entered In The PNR For WestJet Segment/s
    