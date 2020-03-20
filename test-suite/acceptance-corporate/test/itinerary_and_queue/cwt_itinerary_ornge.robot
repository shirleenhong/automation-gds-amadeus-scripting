*** Settings ***
Force Tags        corp
Resource          ../../pages/base.robot
Test Setup       Login To Amadeus Sell Connect Acceptance
Test Teardown     Close All Browsers

*** Variables ***
${test_file_name}    cwt_itinerary_ornge

*** Test Cases ***
Verify That CWT Itinerary Should Only Add The Traveler's Email In Client Ornge For Single Passenger With One Email
    [Tags]    us15240
    Create PNR With Active Air Segments For CWT Itinerary, With Hotel And Car
    Complete The PNR With Default Values
    Verify CWT Itinerary UI For Client Ornge
    Add CWT Itinerary Details For Email test@email.com, In English Language And For Invoice Transaction Type For Client Ornge
    Verify Remarks Are Added Correctly In The PNR
    
Verify That CWT Itinerary Should Only Add The Traveler's Email In Client Ornge For Multiple Passengers With Multiple Emails
    [Tags]    us15240
    Create PNR With Active Air Segments For CWT Itinerary, Multiple Passengers
    Complete The PNR With Default Values
    Verify CWT Itinerary UI For Client Ornge
    Add CWT Itinerary Details For Email test1122@email.com, In French Language And For Itinerary Transaction Type For Client Ornge
    Verify Remarks Are Added Correctly In The PNR
