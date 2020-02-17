*** Settings ***
Force Tags       corp
Resource         ../../pages/base.robot
Test Setup       Login To Amadeus Sell Connect Acceptance
# Test Teardown    Close All Browsers

*** Variables ***
${test_file_name}    no_hotel_booked

*** Test Cases ***
Verify That No Hotel Booked Udid Is Written For 2 Air Segments
    [Tags]    us17591    not_ready
    Create PNR With Passive Air Segments For No Hotel Booked With 2 Air Segments
    Verify 1 No Hotel Booked Fields And Populate With Valid Values
    Verify No Hotel Booked UDIDs Are Written In the PNR
    
Verify That No Hotel Booked Udid Is Written For 3 Air Segments
    [Tags]    us17591    not_ready
    Create PNR With Passive Air Segments For No Hotel Booked With 3 Air Segments
    Verify 2 No Hotel Booked Fields And Populate With Valid Values
    Verify No Hotel Booked UDIDs Are Written In the PNR
    
Verify That No Hotel Booked Udid Is Written For Air Segments With Car
    [Tags]    us17591    not_ready
    Create PNR With Passive Air Segments For No Hotel Booked With Air Segments And Car
    Add 1 Car Segments With Pick And Drop Off Days Apart
    Verify 1 No Hotel Booked Fields And Populate With Valid Values
    Verify No Hotel Booked UDIDs Are Written In the PNR With Car
    


