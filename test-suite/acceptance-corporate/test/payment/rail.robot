*** Settings ***
Force Tags        corp
Library           String
Library           SeleniumLibrary
Library           Collections
Library           Screenshot
Resource          ../../pages/amadeus.robot
Resource          ../../pages/base.robot
Resource          ../../pages/reporting.robot
Resource          ../../pages/payment.robot
Test Teardown    Close All Browsers

*** Test Cases ***
Verify That Ticketing Remarks Are Written Correctly For Rail Without Ticket Number
    [Tags]    us17416
    Login To Amadeus Sell Connect Acceptance
	Move Single Passenger
	Add 1 Rail Segments
	Add Rail Ticketing Details For Single Segment Without Ticket Number
	Verify Ticketing Instruction Remarks For Rail Without Ticket Number Are Written In The PNR
	
Verify That Ticketing Remarks Are Written Correctly For Rail With Ticket Number
    [Tags]    us17416
    Login To Amadeus Sell Connect Acceptance
	Move Single Passenger
	Add 1 Rail Segments
	Add Rail Ticketing Details For Single Segment With Ticket Number
    Verify Ticketing Instruction Remarks For Rail With Ticket Number Are Written In The PNR