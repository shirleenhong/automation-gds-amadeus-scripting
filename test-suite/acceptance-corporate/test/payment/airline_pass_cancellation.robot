*** Settings ***
Force Tags        corp
Resource          ../../pages/base.robot
Test Setup       Login To Amadeus Sell Connect Acceptance 
Test Teardown    Close All Browsers

*** Variables ***
${test_file_name}    airline_pass_cancellation

*** Test Cases ***
Verify That All Air Segments Are Deleted, Dummy Air Segment Is Added, And Remarks Are Written
    [Tags]    US10986     de3198
    Create PNR With Active Air Segments For Airline Pass Cancellation
    Complete PNR and Get 2 Air Segments In The PNR
    Cancel All Air Segments And Add Airline Pass Cancellation Remarks With Ticket Number
    Verify That RMX, TKT, PE, And Itinerary Remarks Are Written In The PNR
    Verify Dummy AC Air Segment For Airline Pass Cancellation
    Verify That 2 Air Segments Are Deleted In The PNR
    Verify PNR Is Queued To Correct Queue Placement For Airline Cancel Pass

Verify That Selected Air Segments Are Deleted, Dummy Air Segment Is Added, And Remarks Are Written
    [Tags]    US10986     de3198
    Create PNR With Passive Air Segments For Airline Pass Cancellation On Other Airline
    Complete PNR and Get 2 Air Segments In The PNR
    Cancel Selected Air Segments And Add Airline Pass Cancellation Remarks With Ticket Number
    Verify That RMX, TKT, PE, And Itinerary Remarks Are Written In The PNR
    Verify Dummy WS Air Segment For Airline Pass Cancellation
    Verify That 1 Air Segments Are Deleted In The PNR		
    Verify PNR Is Queued To Correct Queue Placement For Airline Cancel Pass
 
Verify That All Air Segments Are Deleted, Dummy Air Segment Is Added, And Remarks Without Optional Values Are Written
    [Tags]    US10986     de3198
    Create PNR With Passive Air Segments For Airline Pass Cancellation With Passive Air
    Complete PNR and Get 2 Air Segments In The PNR
    Cancel Air Segments And Add Airline Pass Cancellation Remarks Without Optional Values
    Verify RMX, PE, AND TKT Remarks Without Optional Values Are Written In The PNR
    Verify Dummy AC Air Segment For Airline Pass Cancellation
    Verify That 2 Air Segments Are Deleted In The PNR
    
Verify That All Air Segments Are Deleted, Dummy Air Segment Is Added, And RMG Remarks Are Written
    [Tags]    US10986     de3198
    Create PNR With Active Air Segments For Airline Pass Cancellation With RM*14
    Complete PNR and Get 1 Air Segments In The PNR
    Cancel All Air Segments And Add Airline Pass Cancellation Remarks With Ticket Number
    Verify That RMX, TKT, PE, And Itinerary Remarks Are Written In The PNR
    Verify Dummy AC Air Segment For Airline Pass Cancellation
    Verify That 1 Air Segments Are Deleted In The PNR
    Verify PNR Is Queued To Correct Queue Placement For Airline Cancel Pass
    