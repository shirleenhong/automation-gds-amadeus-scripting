*** Settings ***
Force Tags        corp
Resource          ../../pages/base.robot
Test Setup       Login To Amadeus Sell Connect Acceptance
Test Teardown    Close All Browsers   

*** Variables ***
${test_file_name}    exchange_fee_indicator

*** Test Cases ***
Verify That Exchange Fee Indicator Is Written For Single BSP Segment With Exchange TST
    [tags]    us17417
    Create PNR With Active Air Segments For Single Segment With Exchange
    Create Single Ticket and Exchange the PNR base on 1
    Select Reason Code Value E For TST 1
    Verify Remarks Are Added Correctly In The PNR
    
Verify That Exchange Fee Indicator Is Written For Single Non-BSP Segment With Exhange Ticketing Details
    [tags]    us17417
    Create PNR With Passive Air Segments For Single Segment With Exchange
    Add Non-BSP Exchange Ticketing Details For Single Segment With Ticket Number
    Verify Remarks Are Added Correctly In The PNR
    
Verify That Exchange Fee Indicator Is Not Written For Signle BSP Segment Without Exchange TST
    [tags]    us17417
    Create PNR With Active Air Segments For Single Segment Without Exchange
    Select Reason Code Value E For TST 1
    Verify Remarks Are Not Found In The PNR
    
Verify That Exchange Fee Indicator Is Not Written For Single Non-BSP Segment Without Exchange TST
    [tags]    us17417
    Create PNR With Passive Air Segments For Single Segment Without Exchange
    Add Non-BSP Ticketing Details For Segment 2
    Update Client Reporting Values For Non-BSP
    Verify Remarks Are Not Found In The PNR
  
Verify That Exchange Fee Indicator Is Written For Multi BSP Segment With Exchange TST
    [tags]    us17417
    Create PNR With Active Air Segments For Multi Segment With Exchange
    Create Multi Ticket and Exchange the PNR
    Complete The PNR In Full Wrap
    Verify Remarks Are Added Correctly In The PNR
    
Verify That Exchange Fee Indicator Is Written For Multi Non-BSP Segment With Exhange Ticketing Details
    [tags]    us17417
    Create PNR With Passive Air Segments For Multi Segment With Exchange
    Add Multiple Non-BSP Exchange Ticketing Details For Single Segment With Ticket Number
    Verify Remarks Are Added Correctly In The PNR
  