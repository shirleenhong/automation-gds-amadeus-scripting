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
${test_file_name}    queue_placement

*** Test Cases ***
Verify That Queue Placement For OSC Is Populated With Default Value And PNR Is Queued To Correct Queue
    [Tags]    us9538
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Queue Placement
    Verify Default Values Of Queue Placement
    Verify PNR Is Queued To Correct Queue Placement
    
Verify That Multiple Queue Placement For OSC PNR Is Queued To Correct Queue
    [Tags]    us9538
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Queue Placement
    Populate Multiple Queue Placements
    Verify PNR Is Queued To Correct Multiple Queue Placement
    