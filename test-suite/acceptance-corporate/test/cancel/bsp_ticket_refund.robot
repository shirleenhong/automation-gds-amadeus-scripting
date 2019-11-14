*** Settings ***
Force Tags        corp
Library           String
Resource          ../../pages/base.robot
Test Setup       Login To Amadeus Sell Connect Acceptance
Test Teardown    Close All Browsers

*** Variables ***
${test_file_name}    bsp_ticket_refund

*** Test Cases ***
Verify BSP Ticket Refund Is Written In The PNR Upon Cancel When RM*BB Remark and "RMB/Aqua updated" Remark Values Are Equal
    [tags]    us11191
    Create PNR With Active Air Segments For BSP Ticket Refund
    Complete PNR And Ticket TST1
    Cancel Segments For BSP Ticket Refund
    Verify Refund Remarks Are Written In The PNR
    
Verify BSP Ticket Refund Is Written In The PNR When RM*BB Remark and "RMB/Aqua updated" Remark Values Are Not Equal
    [tags]    us11191
    Create PNR With Active Air Segments For BSP Ticket Refund With Mismatch BB Remark
    Complete PNR And Ticket TST1
    Cancel Segments For BSP Ticket Refund
    Verify Refund Remarks Are Written In The PNR
    
Verify Non BSP Ticket Refund Is Written In The PNR When Full Refund Is Selected
    [tags]    us11191
    Create PNR With Active Air Segments For Non BSP Ticket Refund
    Complete PNR And Ticket TST1
    Cancel Segments For Non BSP Ticket Full Refund
    Verify Non BSP Full Refund Remarks Are Written In The PNR
    
Verify Non BSP Ticket Refund Is Written In The PNR When Partial Refund Is Selected
    [tags]    us11191
    Create PNR With Active Air Segments For Non BSP Ticket Refund
    Complete PNR And Ticket TST1
    Cancel Segments For Non BSP Ticket Partial Refund
    Verify Non BSP Partial Refund Remarks Are Written In The PNR
    