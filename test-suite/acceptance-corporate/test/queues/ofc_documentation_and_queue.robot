*** Settings ***
Force Tags        corp
Resource          ../../pages/base.robot
Test Setup       Login To Amadeus Sell Connect Acceptance
Test Teardown    Close All Browsers

*** Variables ***
${test_file_name}    ofc_doc

*** Test Cases ***
Verify That PNR Is Queued With Correct Remark When Ticket Type Is Non-BSP And Is Issued By ODC For Fare/Travel
    [Tags]    us10580
    Create PNR With Passive Air Segments For OFC Documentation And Queue, Non-BSP, Issued By ODC
    Select Non-BSP/Vendor Ticket That Is Issued By OSC And Don't Queue In OFC Documentation And Queue
    Verify Remarks Are Added Correctly In The PNR
    Verify RF Line Used Agent Sine
    Verify PNR Is Queued To OSC
    
Verify That PNR Is Not Queued With Correct Remark When Ticket Type Is Non-BSP And Is OSC To Queue
    [Tags]    us10580
    Create PNR With Passive Air Segments For OFC Documentation And Queue, Non-BSP, OSC To Queue
    Select Non-BSP/Vendor Ticket That Is Not Issued By OSC And Queue In OFC Documentation And Queue
    Verify Remarks Are Added Correctly In The PNR
    Verify PNR Is Not Queued To OSC
    
Verify That PNR Is Not Queued When Ticket Type Is Non-BSP, Is Not Issued By ODC
    [Tags]    us10580
    Create PNR With Passive Air Segments For OFC Documentation And Queue
    Select Non-BSP/Vendor Ticket That Is Not Issued By OSC And Don't Queue In OFC Documentation And Queue
    Verify Remarks Are Added Correctly In The PNR
    Verify RF Line Used Agent Sine
    Verify PNR Is Not Queued To OSC
    
Verify That PNR Is Not Queued When Ticket Type Is BSP, Is Issued By ODC
    [Tags]    us10580
    Create PNR With Active Air Segments For OFC Documentation And Queue
    Select BSP Airline Ticket That Is Issued By OSC And Don't Queue In OFC Documentation And Queue
    Verify Remarks Are Added Correctly In The PNR
    Verify RF Line Used Agent Sine
    Verify PNR Is Not Queued To OSC
    
Verify That PNR Is Not Queued When Ticket Type Is BSP, Is Not Issued By ODC, OSC To Queue
    [Tags]    us10580
    Create PNR With Active Air Segments For OFC Documentation And Queue
    Select BSP Airline Ticket That Is Not Issued By OSC And Queue In OFC Documentation And Queue
    Verify Remarks Are Added Correctly In The PNR
    Verify RF Line Used Agent Sine
    Verify PNR Is Queued To OSC