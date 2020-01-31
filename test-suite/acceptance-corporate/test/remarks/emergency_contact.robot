*** Settings ***
Force Tags        corp
Resource          ../../pages/base.robot
Test Setup       Login To Amadeus Sell Connect Acceptance
Test Teardown    Close All Browsers  

*** Variables ***
${test_file_name}    emergency_contact

*** Test Cases ***
Verify That The Emergency Contact Info Remarks Are Correctly Written When Only Mandatory Fields Are Filled
    [TAGS]    us9677        sanity_test
    Create PNR With Active Air Segments For Emergency Contact, Mandatory Fields Only
    Add 2 Emergency Contact For Mandatory Fields Only
    Verify Remarks Are Added Correctly In The PNR
    
Verify That The Emergency Contact Info Remarks Are Correctly Written When All Fields Are Filled
    [TAGS]    us9677    
    Create PNR With Active Air Segments For Emergency Contact, All Fields
    Add 4 Emergency Contact For All Fields
    Delete Emergency Contact 4
    Verify Remarks Are Added Correctly In The PNR
    Verify Remarks Are Not Found In The PNR
    
Verify That Emergency Contact Tab Is Not Displayed When PNR Contains Passive Segments Only
    [TAGS]    us9677    
    Create PNR With Passive Air Segments For Emergency Contact, Passive Air Segment
    Verify Emerency Contact Tab Is Not Displayed
    Verify Remarks Are Not Found In The PNR
    
Verify That Emergency Contact Tab Is Not Displayed When PNR Does Not Have Any Segments
    [TAGS]    us9677    
    Create PNR For Emergency Contact, No Segments
    Verify Emerency Contact Tab Is Not Displayed
    Verify Remarks Are Not Found In The PNR
