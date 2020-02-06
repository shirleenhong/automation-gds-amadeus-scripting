*** Settings ***
Force Tags        corp
Resource          ../../pages/base.robot
Test Setup       Login To Amadeus Sell Connect Acceptance
Test Teardown    Close All Browsers   

*** Variables ***
${test_file_name}    visa_and_passport

*** Test Cases ***
Verify That Passport Remark Is Written When PNR Route Is International
    [Tags]    us10040
    Create PNR With Active Air Segments For International Flight, Passport Remark Only
    Fill Up Visa And Passport With CA Citizenship, Advised To Mr. Corp And Leave Visa Unchecked
    Verify Remarks Are Added Correctly In The PNR
    
Verify That Visa And Passport Remark Is Written When PNR Route Is International
    [Tags]    us10040    sanity_test
    Create PNR With Active Air Segments For International Flight, Passport And Visa Remark
    Fill Up Visa And Passport With CA Citizenship, Advised To Mr. Corp And Select Visa For Segment/s 1
    Verify Remarks Are Added Correctly In The PNR
    
Verify That Multiple Visa And Passport Remarks Are Written In The PNR When PNR Route Is International
    [Tags]    us10040
    Create PNR With Active Air Segments For International Flight, Multiple Passport And Visa Remark
    Fill Up Visa And Passport With CA Citizenship, Advised To Mr. Corp And Select Visa For Segment/s 1
    Verify Remarks Are Added Correctly In The PNR
    
Verify That Visa And Passport Are Not Required When PNR Route Is Domestic
    [Tags]    us10040
    Create PNR With Active Air Segments For Domestic Flight Only
    Verify No International Destinations Found in Itinerary Message Is Displayed In Visa And Passport Tab
    Verify Remarks Are Not Found In The PNR
    
Verify That Visa And Passport Are Not Required When PNR Route Is Trans
    [Tags]    us10040
    Create PNR With Active Air Segments For Trans Flight Only
    Verify No International Destinations Found in Itinerary Message Is Displayed In Visa And Passport Tab
    Verify Remarks Are Not Found In The PNR
    