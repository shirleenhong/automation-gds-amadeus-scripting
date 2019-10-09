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
    [Tags]    us11130
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Itinerary Queue As Part Of Full Wrap
    Select Itinerary From Type Of Transaction Droplist
    Verify PNR Is Queued To Correct Follow-Up Queue
    [Teardown]    Close Browser
    
Verify That PNR Is Queued To Correct Invoice Queue As Part Of Full Wrap
    [Tags]    us11130
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Invoice Queue As Part Of Full Wrap
    Select Invoice From Type Of Transaction Droplist
    [Teardown]    Close Browser