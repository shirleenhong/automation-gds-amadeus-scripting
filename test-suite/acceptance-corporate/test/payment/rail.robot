*** Settings ***
Force Tags        corp
Resource          ../../pages/base.robot
Test Setup       Login To Amadeus Sell Connect Acceptance
Test Teardown    Close All Browsers

*** Variables ***
${test_file_name}    rail

*** Test Cases ***
Verify That Ticketing Remarks Are Written Correctly For Rail Without Ticket Number
    [Tags]    us17416    de3221
	Create PNR With 1 Rail Only Segments For Rail Without Ticket Number
	Add Rail Ticketing Details For Single Segment Without Ticket Number
	Verify Remarks Are Added Correctly In The PNR
	
Verify That Ticketing Remarks Are Written Correctly For Rail With Ticket Number
    [Tags]    us17416    de3221
	Create PNR With 1 Rail Only Segments For Rail With Ticket Number
	Add Rail Ticketing Details For Single Segment With Ticket Number
	Verify Remarks Are Added Correctly In The PNR
    
