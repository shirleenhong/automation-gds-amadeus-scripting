*** Settings ***
Force Tags        corp
Resource          ../../pages/base.robot
Test Setup       Login To Amadeus Sell Connect Acceptance
Test Teardown    Close All Browsers

*** Variables ***
${test_file_name}    bsp_non_bsp_ticket_void

*** Test Cases ***
Verify PNR With Voided BSP Segment Can Be Cancelled Without Reuising Credit Card Authorization
    [Tags]    us11189
    Create PNR With Active Air Segments For Ticket Void Cancellation
    Complete PNR And Ticket TST1
    Void The Ticket
    Cancel Segment For BSP Void, Don't Reuse Credit Card Authorization And Select Passenger VRsn Option
    Verify Cancellation For Voided BSP Ticket Remarks Are Written In The PNR
    
Verify PNR With Voided BSP Segment Can Be Cancelled While Reuising Credit Card Authorization
    [Tags]    us11189
    Create PNR With Active Air Segments For Ticket Void Cancellation
    Complete PNR And Ticket TST1
    Void The Ticket
    Cancel Segment For BSP Void, Reuse Credit Card Authorization And Select Agency VRsn Option
    Verify Cancellation For Voided BSP Ticket Remarks Are Written In The PNR

Verify PNR With Voided Non BSP Segment Can Be Cancelled With Reason Reverse All Items
    [Tags]    us11189
    Create PNR With Active Air Segments For Ticket Void Cancellation
    Complete PNR And Ticket TST1
    Void The Ticket
    Cancel Segment For Non BSP Void, Reverse All Items
    Verify Cancellation For Voided Non BSP Ticket Remarks Are Written In The PNR
    
Verify PNR With Voided Non BSP Segment Can Be Cancelled With Reason Reverse Fee only
    [Tags]    us11189
    Create PNR With Active Air Segments For Ticket Void Cancellation
    Complete PNR And Ticket TST1
    Void The Ticket
    Cancel Segment For Non BSP Void, Reverse Fee only
    Verify Cancellation For Voided Non BSP Ticket Remarks Are Written In The PNR
    
Verify PNR With Voided Non BSP Segment Can Be Cancelled With Reason Reverse Document
    [Tags]    us11189
    Create PNR With Active Air Segments For Ticket Void Cancellation
    Complete PNR And Ticket TST1
    Void The Ticket
    Cancel Segment For Non BSP Void, Reverse Document
    Verify Cancellation For Voided Non BSP Ticket Remarks Are Written In The PNR
    
Verify PNR Non Voided Ticket Cannot Be Cancelled
    [Tags]    us11189
    Create PNR With Active Air Segments For Ticket Void Cancellation
    Complete PNR And Ticket TST1
    Verify Agent Is Not Able To Cancel Segments With Unvoided Ticket

Verify User Is Able To Cancel Both Voided And Unticketed TST
    [Tags]    de3230
    Create PNR With Active Air Segments For Multi TST, Ticket Void 1 TST
    Complete PNR And Ticket TST1
    Void The Ticket
    Cancel Segment For BSP Void, Don't Reuse Credit Card Authorization And Select Passenger VRsn Option
    Verify Cancellation For Voided BSP Ticket Remarks Are Written In The PNR
    Verify Expected Cancellation Remarks Are Written 
    
