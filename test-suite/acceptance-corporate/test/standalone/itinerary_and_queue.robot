*** Settings ***
Force Tags       corp
Resource         ../../pages/base.robot
Test Setup       Login To Amadeus Sell Connect Acceptance
Test Teardown    Close All Browsers

*** Variables ***
${test_file_name}    itinerary_and_queue

*** Test Cases ***
Verify That PNR Is Queued To Correct Itinerary Queue As Standalone
    [Tags]    us11130    us17778
    Create PNR With Active Air Segments For Follow-Up Queue
    Populate Itinerary Transaction Type Queue In Standalone
    Verify PNR Is Queued To Correct Transaction Type Queue For Standalone
    
Verify That PNR Is Queued To Correct Invoice Queue As Standalone
    [Tags]    us11130    us17778    full_regression
    Create PNR With Active Air Segments For Follow-Up Queue
    Populate Invoice Transaction Type Queue In Standalone
    Verify PNR Is Queued To Correct Transaction Type Queue For Standalone
    
Verify That PNR Is Queued To Correct Personal Queue As Standalone
    [Tags]    us11130    us17778
    Create PNR With Active Air Segments For Follow-Up Queue
    Populate Personal Queue And Category In Standalone
    Verify PNR Is Queued To Correct Personal Queue For Standalone
    
Verify That CWT Itinerary Remarks Are Written When There Are No Air Passive Segment
    [Tags]    us9901    us15240    us15702    us17778    sanity_test
    Create PNR For CWT Itinerary, Hotel And Car Only
    Complete The PNR With Default Values
    Add CWT Itinerary Details For Email test@email.com, In English Language And For Invoice Transaction Type In Standalone
    Verify Remarks Are Added Correctly In The PNR For Standalone
    Verify Remarks Are Not Found In The PNR
    Verify PNR Is Queud To Aqua Queue
    
Verify That CWT Itinerary Remarks Are Written When Air Passive Segment is Domestic
    [Tags]    us9901    us15240    US16548    us15702    us17778
    Create PNR With Active Air Segments For CWT Itinerary, Domestic Flight
    Complete The PNR With Default Values
    Add CWT Itinerary Details For Email test@email.com, In French Language And For Itinerary Transaction Type In Standalone
    Verify Remarks Are Added Correctly In The PNR For Standalone
    Verify Remarks Are Not Found In The PNR
    Verify PNR Is Queud To Aqua Queue
    
Verify That CWT Itinerary Remarks Are Updated When Remarks Are Deleted/Updated
    [Tags]    us9901    us15240    US16548    us15702    us17778
    Create PNR With Active Air Segments For CWT Itinerary, With Existing RIR Remarks
    Complete The PNR With Default Values
    Add CWT Itinerary Details For All Emails, In French Language And For Invoice Transaction Type In Standalone
    Update Services And Test Remarks
    Verify Remarks Are Added Correctly In The PNR For Standalone
    Verify Remarks Are Not Found In The PNR
    Verify PNR Is Queud To Aqua Queue

Verify That CWT Itinerary Remarks Are Written When Air Passive Segment is Transborder
    [Tags]    us9901    us15240    US16548    us15702    us17778
    Create PNR With Active Air Segments For CWT Itinerary, Transborder Flight
    Complete The PNR With Default Values
    Add CWT Itinerary Details For Email test@email.com, In French Language And For Itinerary Transaction Type In Standalone
    Verify Remarks Are Added Correctly In The PNR For Standalone
    Verify Remarks Are Not Found In The PNR
    Verify PNR Is Queud To Aqua Queue
    
Verify That Aqua Override Remark Is Written When CWT Itinerary Tab Standalone Is Not Accessed
    [Tags]    us15702
    Create PNR With Active Air Segments For CWT Itinerary Aqua Override With Active Air
    Complete The PNR With Default Values
    Fill Up Update Tktl Panel With PNR ON HOLD    
    Verify Remarks Are Added Correctly In The PNR
    Verify PNR Is Queud To Aqua Queue