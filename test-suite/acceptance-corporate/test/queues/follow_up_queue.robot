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
    Create PNR With Active Air Segments For Follow-Up Queue
    Populate Itinerary Transaction Type Queue
    Verify PNR Is Queued To Correct Transaction Type Queue
    
Verify That PNR Is Queued To Correct Invoice Queue As Part Of Full Wrap
    [Tags]    us11130
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Follow-Up Queue
    Populate Invoice Transaction Type Queue
    Verify PNR Is Queued To Correct Transaction Type Queue
   
Verify That PNR Is Queued To Correct Personal Queue As Part Of Full Wrap
    [Tags]    us11130
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Follow-Up Queue
    Populate Personal Queue And Category 
    Verify PNR Is Queued To Correct Personal Queue
    
Verify That PNR Is Queued To Correct Team And Personal Queues As Part Of Full Wrap For Non-Leisure On Demand Client
    [Tags]    us11130
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Follow-Up Queue
    Populate Personal Queue and Select Pending Approval Team Queue
    Verify PNR Is Queued To Correct Team And Personal Queue  
    
Verify That PNR Is Queued To Correct Itinerary Queue And Personal Queues As Part Of Full Wrap For Non-Leisure On Demand Client
    [Tags]    us11130
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Follow-Up Queue
    Populate Personal Queue And Select Itinerary Transaction Type
    Verify PNR Is Queued To Correct Itinerary And Personal Queue 
    
Verify That PNR Is Queued To Correct Itinerary Queue As Standalone
    [Tags]    us11130
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Follow-Up Queue
    Populate Itinerary Transaction Type Queue In Standalone
    Verify PNR Is Queued To Correct Transaction Type Queue For Standalone
    
Verify That PNR Is Queued To Correct Invoice Queue As Standalone
    [Tags]    us11130
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Follow-Up Queue
    Populate Invoice Transaction Type Queue In Standalone
    Verify PNR Is Queued To Correct Transaction Type Queue For Standalone
    
Verify That PNR Is Queued To Correct Personal Queue As Standalone
    [Tags]    us11130
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Follow-Up Queue
    Populate Personal Queue And Category In Standalone
    Verify PNR Is Queued To Correct Personal Queue For Standalone
    
Verify That PNR Is Queued To Correct Transaction Type And Personal Queue For Leisure On Demand Client
    [Tags]    us11130
    Login To Amadeus Sell Connect Acceptance
    Emulate To Leisure On Demand OID
    Create PNR With Active Air Segments For Follow-Up Queue
    Populate Personal Queue And Select Itinerary Transaction Type
    Verify Team Queue Is Not Displayed For Leisure On Demand
    Verify Leisure On Demand PNR Is Queued To Correct Queues
