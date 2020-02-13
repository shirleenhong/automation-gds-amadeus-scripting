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
    