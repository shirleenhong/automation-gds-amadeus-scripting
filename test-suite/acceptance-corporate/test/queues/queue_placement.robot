*** Settings ***
Force Tags        corp
Resource          ../../pages/base.robot
Test Setup       Login To Amadeus Sell Connect Acceptance
Test Teardown    Close All Browsers   

*** Variables ***
${test_file_name}    queue_placement

*** Test Cases ***
Verify That Queue Placement For OSC Is Populated With Default Value And PNR Is Queued To Correct Queue
    [Tags]    us9538
    Create PNR With Active Air Segments For Queue Placement
    Verify Default Values Of Queue Placement
    Verify PNR Is Queued To Correct Queue Placement
    
Verify That Multiple Queue Placement For OSC PNR Is Queued To Correct Queue
    [Tags]    us9538
    Create PNR With Active Air Segments For Queue Placement
    Populate Multiple Queue Placements
    Verify PNR Is Queued To Correct Multiple Queue Placement
    
Verify That PNRs Are Queued Correctly At End Of Full Wrap
    [Tags]    us17610
    Create PNR With Active Air Segments For Queue Placement
    Complete The PNR In Full Wrap
    Verify PNR Is Queued Correctly At The End Of PNR
    
    