*** Settings ***
Force Tags        corp
Resource          ../../pages/base.robot
Test Setup       Login To Amadeus Sell Connect Acceptance
Test Teardown    Close All Browsers

*** Variables ***
${test_file_name}    ird_remarks

*** Test Cases ***
Verify That IRD Remarks Are Defaulted And Updated In The PNR For Multiple Segment
    [Tags]    us11821    sanity_test
    Create PNR With Active Air Segments For Corporate, With IRD Remarks For Multiple International Flight
    Verify If IRD Status Are Written Correctly For Multi Segment In The PNR
    
Verify That IRD Remarks Are Defaulted And Updated In The PNR For Single Segment
    [Tags]    us11821    de2792
    Create PNR With Active Air Segments For Corporate, With IRD Remarks For Single International Flight
    Verify If IRD Status Are Written Correctly For Single Segment In The PNR
    