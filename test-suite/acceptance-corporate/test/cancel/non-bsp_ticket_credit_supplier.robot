*** Settings ***
Force Tags        corp
Resource          ../../pages/base.robot
Test Setup       Login To Amadeus Sell Connect Acceptance
Test Teardown    Close All Browsers

*** Variables ***
${test_file_name}    cancel_nonbsp_ticketCredit

*** Test Cases ***    
Verify That NonBSP Ticket Credit from Supplier Remarks Should Be Written When No U*14 Is Written in the PNR
    [TAGS]    us11193
    Create PNR With Passive Air Segments For Cancellation, UA Air Segments, No U*14
    Complete The PNR With Default Values
    Fill Up NonBSP Ticket Credit With Default Values For PNRs With No U*14
    Verify NonBSP Ticket Credit from Supplier Remark For PNRs With No U*14

Verify That NonBSP Ticket Credit from Supplier Remarks Should Be Written When U*14 is Written in the PNR, No Re-credit Fee and Re-credit is Full
    [TAGS]    us11193
    Create PNR With Passive Air Segments For Cancellation, AC Air Segments, With U*14
    Complete The PNR With Default Values
    Cancel Segment For Non BSP Ticket Credit, No Re-credit Fee and Re-credit is Full
    Verify That NonBSP Ticket Credit from Supplier Remarks Should Be Written When There Is No Re-credit Fee and Re-credit is Full

Verify That NonBSP Ticket Credit from Supplier Remarks Should Be Written When U*14 is Written in the PNR, No Re-credit Fee and Re-credit is Partial
    [TAGS]    us11193
    Create PNR With Passive Air Segments For Cancellation, AC Air Segments, With U*14
    Complete The PNR With Default Values
    Cancel Segment For Non BSP Ticket Credit, No Re-credit Fee and Re-credit is Partial
    Verify That NonBSP Ticket Credit from Supplier Remarks Should Be Written When There Is No Re-credit Fee and Re-credit is Partial
