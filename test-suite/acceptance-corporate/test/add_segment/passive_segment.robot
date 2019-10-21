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
Resource          ../../pages/ticketing.robot
Resource          ../../pages/add_segment.robot
Test Teardown    Close All Browsers

*** Variables ***
${test_file_name}    add_segment

*** Test Cases ***
Verify Corp Passive Air Segment Is Added In the PNR For Non ZZ Details
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Passive Air Segments For Corporate, Non ZZ Details
    Add And Verify Air Segment for Non ZZ Details In The PNR
    
Verify Corp Passive Air Segment Is Added In the PNR For ZZ Details
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Passive Air Segments For Corporate, For ZZ Details
    Add And Verify Air Segment for ZZ In The PNR
    