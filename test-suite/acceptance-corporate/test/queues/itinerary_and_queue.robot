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

*** Variables ***
${test_file_name}    itinerary_and_queue

*** Test Cases ***
Verify That PNR Is Queued To Correct Itinerary Queue As Part Of Full Wrap
    [Tags]    us11130    not_ready
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Itinerary Queue As Part Of Full Wrap
    # Verify That Itinerary Queue Can Be Selected
    # [Teardown]    Close Browser
    
Verify That PNR Is Queued To Correct Invoice Queue As Part Of Full Wrap
    [Tags]    us11130    not_ready
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Invoice Queue As Part Of Full Wrap