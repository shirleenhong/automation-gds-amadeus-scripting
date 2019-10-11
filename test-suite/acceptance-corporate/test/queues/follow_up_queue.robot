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
${test_file_name}    follow_up_queue

*** Test Cases ***
Verify That PNR Is Queued To Correct Itinerary Queue As Part Of Full Wrap
    [Tags]    us11130
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Itinerary Queue As Part Of Full Wrap
    Select Itinerary From Type Of Transaction Droplist
    Verify PNR Is Queued To Correct Follow-Up Queue
    
Verify That PNR Is Queued To Correct Invoice Queue As Part Of Full Wrap
    [Tags]    us11130
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Invoice Queue As Part Of Full Wrap
    Select Invoice From Type Of Transaction Droplist
    Verify PNR Is Queued To Correct Follow-Up Queue
    
Verify That PNR Is Queued To Correct Team And Personal Queues As Part Of Full Wrap For Non-Leisure On Demand Client
    [Tags]    us11130
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Personal And Team Queues As Part Of Full Wrap
    Populate Personal Queue And Select Pending Approval on Team Queues
    Verify PNR Is Queued To Correct Follow-Up Queue  
    
Verify That PNR Is Queued To Correct Itinerary Queue And Personal Queues As Part Of Full Wrap For Non-Leisure On Demand Client
    [Tags]    us11130
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Itinerary Queue And Team Queues As Part Of Full Wrap
    Select Itinerary From Type Of Transaction Droplist
    Verify PNR Is Queued To Correct Follow-Up Queue
