*** Settings ***
Force Tags        corp
Resource          ../../pages/base.robot
Test Setup       Login To Amadeus Sell Connect Acceptance
Test Teardown    Close All Browsers   

*** Variables ***
${test_file_name}    airfare_commission

*** Test Cases ***
Verify Commission Remark In Percentage Format Is Written Correctly For Unticketed TST
    [tags]    us15252    sanity_test
    Create PNR With Active Air Segments For Unticketed TST, Add Single FM Remark By Percentage
    Update Airfare Commision With 5 Percentage For Segment 2
    Verify Remarks Are Added Correctly In The PNR
    
Verify Commission Remark In Dollar Format Is Written Correctly For Unticketed TST
    [tags]    us15252
    Create PNR With Active Air Segments For Unticketed TST, Add Single FM Remark By Dollar
    Update Airfare Commision With 5.55 Dollar Amount For Segment 2
    Verify Remarks Are Added Correctly In The PNR
    
Verify Commission Remark Is Written For Multiple Unticketed TSTs
    [tags]    us15252    
    Create PNR With Active Air Segments For Unticketed TST, Add Multiple FM Remark
    Update Airfare Commision With 5.00 Dollar Amount For Segment 2,5
    Update Airfare Commision With 5 Percentage For Segment 3,4
    Verify Remarks Are Added Correctly In The PNR
    
Verify Commission Remark In Percentage Format Is Written Correctly For Exchange Ticket
    [tags]    us15252
    Create PNR With Active Air Segments For Exchange TST, Single FM Remark, Update By Percentage
    Create Exchange PNR In The GDS
    Update Airfare Commision With 5 Percentage For Segment 2
    Verify Remarks Are Added Correctly In The PNR

Verify Commission Remark In Dollar Format Is Written Correctly For Exchange Ticket
    [tags]    us15252
    Create PNR With Active Air Segments For Exchange TST, Single FM Remark, Update By Dollar
    Create Exchange PNR In The GDS
    Update Airfare Commision With 5.00 Dollar Amount For Segment 2
    Verify Remarks Are Added Correctly In The PNR
    
Verify Commission Remark Is Written For Multiple Exchange Tickets
    [tags]    us15252
    Create PNR With Active Air Segments For Exchange TST, Multiple FM Remark
    Create Multiple TKT Exchange PNR In The GDS
    Update Airfare Commision With 5.00 Dollar Amount For Segment 2,5
    Update Airfare Commision With 5 Percentage For Segment 3,4
    Verify Remarks Are Added Correctly In The PNR
    