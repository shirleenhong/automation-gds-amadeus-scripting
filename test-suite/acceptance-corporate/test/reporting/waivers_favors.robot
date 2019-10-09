*** Settings ***
Force Tags        corp
Library           String
Library           SeleniumLibrary
Library           Collections
Library           Screenshot
Resource          ../../pages/amadeus.robot
Resource          ../../pages/reporting.robot
Resource          ../../pages/base.robot

*** Test Cases ***
Verify U63 Is Written For Single Ticket With Single Codes
    [Tags]    us12284
    Login To Amadeus Sell Connect Acceptance
    Move Single Passenger And Add Single BSP Segment With TST
    Select Waivers Code Option For Single Ticket
    Verify That Waivers Code Is Written In The PNR
    Delete Fare and Itinerary
    [Teardown]    Close Browser
    
Verify U63 Is Written For Single Ticket With Multiple Codes
    [Tags]    us12284
    Login To Amadeus Sell Connect Acceptance
    Move Single Passenger And Add Multiple BSP Segments With Single TST
    Select Multiple Waiver Code Options For Single Ticket
    Verify That Multiple Waiver Codes Are Written In The PNR For Single Ticket
    Delete Fare and Itinerary
    [Teardown]    Close Browser
 
Verify U63 Is Written For Multiple Tickets With Multiple Codes  
    [Tags]    us12284
    Login To Amadeus Sell Connect Acceptance
    Move Single Passenger And Add Multiple BSP Segment With TSTs
    Select Multiple Waiver Code Options For Multiple Tickets
    Verify That Multiple Waiver Codes Are Written In The PNR For Multiple Tickets
    Delete Fare and Itinerary
    [Teardown]    Close Browser
    
Verify U63 Is Written For Multiple Tickets With Multiple Codes That Has Values
    [Tags]    us12284
    Login To Amadeus Sell Connect Acceptance
    Move Single Passenger And Add Multiple BSP Segment With Multiple TSTs
    Select Multiple Waiver Code Options With Values For Multiple Tickets
    Verify That Multiple Waiver Codes With Values Are Written In The PNR For Multiple Tickets
    Delete Fare and Itinerary
    [Teardown]    Close Browser