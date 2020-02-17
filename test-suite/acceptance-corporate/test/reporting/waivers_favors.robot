*** Settings ***
Force Tags       corp
Resource         ../../pages/base.robot
Test Setup       Login To Amadeus Sell Connect Acceptance
Test Teardown    Close All Browsers

*** Variables ***
${test_file_name}    waivers_favors

*** Test Cases ***
Verify U63 Is Written For Single Ticket With Single Codes
    [Tags]    us12284    full_regression    us17711
    Create PNR With Active Air Segments For Single Waiver/Favors
    Select Waivers Code Option For Single Ticket
    Verify That Waivers Code Is Written In The PNR
    Delete Fare and Itinerary
    
Verify U63 Is Written For Single Passive Segment With Multiple Codes
    [Tags]    us12284    us17711
    Create PNR With Passive Air Segments For Multiple Waiver/Favors
    Select Multiple Waiver Code Options
    Verify That Multiple Waiver Codes Are Written In The PNR For Single Ticket
    Delete Fare and Itinerary

Verify U63 Is Written For Multiple Tickets With Multiple Codes  
    [Tags]    us12284    full_regression    us17711    expect_to_fail
    Move Single Passenger And Add Multiple BSP Segment With TSTs
    Select Multiple Waiver Code Options For Multiple Tickets
    Verify That Multiple Waiver Codes Are Written In The PNR For Multiple Tickets
    Delete Fare and Itinerary
        
Verify U63 Is Written For Multiple Passive Segment With Multiple Codes That Has Values
    [Tags]    us12284    us17711
    Create PNR With Passive Air Segments For Multiple Waiver/Favors
    Select Multiple Waiver Code Options With Values
    Verify That Multiple Waiver Codes With Values Are Written In The PNR For Multiple Tickets
    Delete Fare and Itinerary   