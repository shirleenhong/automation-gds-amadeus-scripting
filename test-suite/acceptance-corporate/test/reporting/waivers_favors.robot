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
    Login To Amadeus Sell Connect Acceptance
    Move Single Passenger And Add Single BSP Segment With TST
    # Select Waivers Code Option ${waiver_code}
    # Verify That Waivers Code U63 Is Written In The PNR
    # [Teardown]    Close Browser
    
Verify U63 Is Written For Single Ticket With Multiple Codes
    Login To Amadeus Sell Connect Acceptance
    Move Single Passenger And Add Multiple BSP Segments With Single TST
    # Select Multiple Waiver Code Options For Single Ticket
    # Verify That Waivers Code U63 Is Written In The PNR
    # [Teardown]    Close Browser
 
Verify U63 Is Written For Multiple Tickets With Multiple Codes  
    Login To Amadeus Sell Connect Acceptance
    Move Single Passenger And Add Multiple BSP Segment With TSTs
    # Select Multiple Waiver Code Options For Multiple Tickets
    # Verify That Waivers Code U63 Is Written In The PNR
    # [Teardown]    Close Browser

