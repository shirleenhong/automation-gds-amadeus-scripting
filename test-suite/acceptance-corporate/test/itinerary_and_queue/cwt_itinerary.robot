*** Settings ***
Force Tags        corp
Resource          ../../pages/base.robot
Test Setup       Login To Amadeus Sell Connect Acceptance
Test Teardown     Close All Browsers

*** Variables ***
${test_file_name}    cwt_itinerary

*** Test Cases ***
Verify That CWT Itinerary Remarks Are Written When There Are No Air Passive Segment
    [Tags]    us9901    us15240    us15702    sanity_test
    Create PNR For CWT Itinerary, Hotel And Car Only
    Complete The PNR With Default Values
    Add CWT Itinerary Details For Email test@email.com, In English Language And For Invoice Transaction Type
    Verify Remarks Are Added Correctly In The PNR
    Verify Remarks Are Not Found In The PNR
    Verify PNR Is Queud To Aqua Queue
    
Verify That CWT Itinerary Remarks Are Written When Air Passive Segment is Domestic
    [Tags]    us9901    us15240    US16548    us15702
    Create PNR With Active Air Segments For CWT Itinerary, Domestic Flight
    Complete The PNR With Default Values
    Add CWT Itinerary Details For Email test@email.com, In French Language And For Itinerary Transaction Type
    Verify Remarks Are Added Correctly In The PNR
    Verify Remarks Are Not Found In The PNR
    Verify PNR Is Queud To Aqua Queue
    
Verify That CWT Itinerary Remarks Are Updated When Remarks Are Deleted/Updated
    [Tags]    us9901    us15240    US16548    us15702
    Create PNR With Active Air Segments For CWT Itinerary, With Existing RIR Remarks
    Complete The PNR With Default Values
    Add CWT Itinerary Details For All Emails, In French Language And For Invoice Transaction Type
    Update Services And Test Remarks
    Verify Remarks Are Added Correctly In The PNR
    Verify Remarks Are Not Found In The PNR
    Verify PNR Is Queud To Aqua Queue

Verify That CWT Itinerary Remarks Are Written When Air Passive Segment is Transborder
    [Tags]    us9901    us15240    US16548    us15702
    Create PNR With Active Air Segments For CWT Itinerary, Transborder Flight
    Complete The PNR With Default Values
    Add CWT Itinerary Details For Email test@email.com, In French Language And For Itinerary Transaction Type
    Verify Remarks Are Added Correctly In The PNR
    Verify Remarks Are Not Found In The PNR
    Verify PNR Is Queud To Aqua Queue
    
Verify That Aqua Override Remark Is Written When CWT Itinerary Tab In Full Wrap Is Not Accessed
    [Tags]    us15702
    Create PNR With Active Air Segments For CWT Itinerary Aqua Override With Active Air
    Navigate To Page Reporting Remarks
    Verify Remarks Are Added Correctly In The PNR
    Verify PNR Is Queud To Aqua Queue
    
Verify That Aqua Override Remark Is Not Written When CWT Itinerary Tab In Full Wrap Is Accessed
    [Tags]    us15702    us17707
    Create PNR With Active Air Segments For CWT Itinerary, Domestic Flight
    Add CWT Itinerary Details For Email test@email.com, In English Language And For Invoice Transaction Type
    Verify Remarks Are Not Found In The PNR
    Verify PNR Is Queud To Aqua Queue
    