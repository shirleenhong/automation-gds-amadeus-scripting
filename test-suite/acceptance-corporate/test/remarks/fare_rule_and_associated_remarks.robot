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
Resource          ../../pages/fees.robot
Resource          ../../pages/ticketing.robot
Resource          ../../pages/remarks.robot
Resource          ../../../resources/common/api-utilities.txt
Test Setup       Login To Amadeus Sell Connect Acceptance
Test Teardown    Close All Browsers

*** Variables ***
${test_file_name}    fare_rule_assoc

*** Test Cases ***
Verify That Fare Rule Optional Fare Remarks Are Written For Ticket Min/Max Stay
    [Tags]    us16893    us16892
    Create PNR With Passive Air Segments For Corporate, Fare Rule Min and Max Stay With Assoc Remarks
    Complete Fare Rule For Ticket Min/Max Stay With Associated Remarks
    
Verify That Fare Rule Optional Fare Remarks Are Written For Ticket Non-Refundable
    [Tags]    us16893    us16892
    Create PNR With Passive Air Segments For Corporate, Fare Rule Ticket Non Refundable With Assoc Remarks
    Complete Fare Rule For Ticket Non Refundable And Non Ref With Associated Remarks
    
Verify That Fare Rule Optional Fare Remarks Are Written For Ticket Amount
    [Tags]    us16893    us16892
    Create PNR With Passive Air Segments For Corporate, Fare Rule Ticket Amount
    Complete Fare Rule For Ticket Amount And Verify Remarks
    
Verify That Fare Rule Optional Fare Remarks Are Written For Non-Refundable %
    [Tags]    us16893    us16892
    Create PNR With Passive Air Segments For Corporate, Fare Rule Non refundable Percentage
    Complete fare Rule For Non Refundable Percentage And Verify Remarks
    