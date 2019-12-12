*** Settings ***
Force Tags        corp
Library           String
Library           SeleniumLibrary
Library           Collections
Library           Screenshot
Resource          ../../pages/amadeus.robot
Resource          ../../pages/remarks.robot
Resource          ../../pages/base.robot
Resource          ../../../resources/common/api-utilities.txt
Test Teardown     Close All Browsers

*** Variables ***
${test_file_name}    cwt_itinerary

*** Test Cases ***
Verify That CWT Itinerary Remarks Are Written When There Are No Air Passive Segment
    [Tags]    us9901    us15240
    Login To Amadeus Sell Connect Acceptance
    Create PNR For CWT Itinerary, Hotel And Car Only
    Complete The PNR With Default Values
    Add CWT Itinerary Details For Email test@email.com, In English Language And For Invoice Transaction Type
    Verify Remarks Are Added Correctly In The PNR
    Verify Remarks Are Not Found In The PNR
    
Verify That CWT Itinerary Remarks Are Written When Air Passive Segment is Domestic
    [Tags]    us9901    us15240    US16548
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For CWT Itinerary, Domestic Flight
    Complete The PNR With Default Values
    Add CWT Itinerary Details For Email test@email.com, In French Language And For Itinerary Transaction Type
    Verify Remarks Are Added Correctly In The PNR
    
Verify That CWT Itinerary Remarks Are Updated When Remarks Are Deleted/Updated
    [Tags]    us9901    us15240    US16548
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For CWT Itinerary, With Existing RIR Remarks
    Complete The PNR With Default Values
    Add CWT Itinerary Details For All Emails, In French Language And For Invoice Transaction Type
    Update Services And Test Remarks
    Verify Remarks Are Added Correctly In The PNR
    Verify Remarks Are Not Found In The PNR

Verify That CWT Itinerary Remarks Are Written When Air Passive Segment is Transborder
    [Tags]    us9901    us15240    US16548
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For CWT Itinerary, Transborder Flight
    Add CWT Itinerary Details For Email test@email.com, In English Language And For Invoice Transaction Type
    Verify Remarks Are Added Correctly In The PNR
    