*** Settings ***
Force Tags       corp
Resource         ../../pages/base.robot
Test Setup       Login To Amadeus Sell Connect Acceptance
Test Teardown    Close All Browsers

*** Variables ***
${test_file_name}    follow_up_queue

*** Test Cases ***
Verify That PNR Is Queued To Correct Itinerary Queue As Part Of Full Wrap
    [Tags]    us11130    full_regression     expect_to_fail    us17707
    Create PNR With Active Air Segments For Follow-Up Queue
    Populate Itinerary Transaction Type Queue
    Verify PNR Is Queued To Correct Transaction Type Queue
    
Verify That PNR Is Queued To Correct Invoice Queue As Part Of Full Wrap
    [Tags]    us11130    expect_to_fail    us17707
    Create PNR With Active Air Segments For Follow-Up Queue
    Populate Invoice Transaction Type Queue
    Verify PNR Is Queued To Correct Transaction Type Queue
   
Verify That PNR Is Queued To Correct Personal Queue As Part Of Full Wrap
    [Tags]    us11130    us17707
    Create PNR With Active Air Segments For Follow-Up Queue
    Populate Personal Queue And Category 
    Verify PNR Is Queued To Correct Personal Queue
    
Verify That PNR Is Queued To Correct Team And Personal Queues As Part Of Full Wrap For Non-Leisure On Demand Client
    [Tags]    us11130    us17707
    Create PNR With Active Air Segments For Follow-Up Queue
    Populate Personal Queue and Select Pending Approval Team Queue
    Verify PNR Is Queued To Correct Team And Personal Queue  
    
Verify That PNR Is Queued To Correct Itinerary Queue And Personal Queues As Part Of Full Wrap For Non-Leisure On Demand Client
    [Tags]    us11130    expect_to_fail    us17707
    Create PNR With Active Air Segments For Follow-Up Queue
    Populate Personal Queue And Select Itinerary Transaction Type
    Verify PNR Is Queued To Correct Itinerary And Personal Queue 
    
Verify That PNR Is Queued To Correct Transaction Type And Personal Queue For Leisure On Demand Client
    [Tags]    us11130
    Emulate To Leisure On Demand OID
    Create PNR With Active Air Segments For Follow-Up Queue
    Populate Personal Queue And Select Itinerary Transaction Type
    Verify Team Queue Is Not Displayed For Leisure On Demand
    Verify Leisure On Demand PNR Is Queued To Correct Queues
