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
#Test Teardown    Close All Browsers

*** Variables ***
${test_file_name}    ird_remarks

*** Test Cases ***
Verify That IRD Remarks Are Defaulted And Updated In The PNR For Multiple Segment
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Corporate, With IRD Remarks For Multiple International Flight
    Verify If IRD Status Are Written Correctly For Multi Segment In The PNR
    
Verify That IRD Remarks Are Defaulted And Updated In The PNR For Single Segment
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Corporate, With IRD Remarks For Single International Flight
    Verify If IRD Status Are Written Correctly For Single Segment In The PNR