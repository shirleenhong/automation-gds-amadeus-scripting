*** Settings ***
Force Tags        corp
Resource          ../../pages/base.robot
Test Setup       Login To Amadeus Sell Connect Acceptance
Test Teardown    Close All Browsers

*** Variables ***
${test_file_name}    fare_rule_assoc

*** Test Cases ***
Verify That Associated Fare Remarks Are Written For Ticket Min/Max Stay
    [Tags]    us18001
    Create PNR With Passive Air Segments For Corporate, Fare Rule Min and Max Stay With Assoc Remarks
    Complete Fare Rule For Ticket Min/Max Stay With Associated Remarks
    Verify Fare Rule Remarks Are Written In The PNR
    
Verify That Associated Remarks Are Written For Ticket Non-Refundable
    [Tags]    us18001
    Create PNR With Passive Air Segments For Corporate, Fare Rule Ticket Non Refundable With Assoc Remarks
    Complete Fare Rule For Ticket Non Refundable And Non Ref With Associated Remarks
    Verify Fare Rule Remarks Are Written In The PNR   
    