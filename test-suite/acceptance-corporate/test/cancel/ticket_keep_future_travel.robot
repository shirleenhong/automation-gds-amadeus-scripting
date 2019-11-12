*** Settings ***
Force Tags        corp
Resource          ../../pages/base.robot
Test Teardown    Close All Browsers

*** Variables ***
${test_file_name}    cancel_ticketKeep_futureTravel

*** Test Cases ***    
Verify That The BSP Ticket Keep for Future Travel Should Be Written in the PNR Upon Cancel When RM/Aqua CHG Remark and RM*BB/- Are Not The Same
    [TAGS]    us11190
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Cancellation, Air Segment, RM Aqua And RM BB Is Not Equal
    Complete The PNR With Default Values
    Fill Up BSP Ticket Keep For Future Travel
    Verify BSP Ticket Keep For Future Travel Remarks
    
Verify That The BSP Ticket Keep for Future Travel Should Be Written in the PNR Upon Cancel When RM/Aqua CHG Remark and RM*BB/- Are The Same
    [TAGS]    us11190
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Cancellation, Air Segment, RM Aqua And RM BB Is Equal
    Complete The PNR With Default Values
    Fill Up BSP Ticket Keep For Future Travel
    Verify BSP Ticket Keep For Future Travel Remarks

Verify That The Non BSP Ticket Keep for Future Travel Should Be Written in the PNR Upon Cancel When RMB/Aqua updated Remark and RM*BB/- Are Not The Same
    [TAGS]    us11190
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Passive Air Segments For Cancellation, Air Segment, RM Aqua And RM BB Is Not Equal
    Complete The PNR With Default Values
    Fill Up Non-BSP Ticket Keep For Future Travel With 4 Ticket/s And Coupon/s
    Verify Non-BSP Ticket Keep For Future Travel When RM Aqua Remark and RM BB Remark Are Not The Same

Verify That The Non BSP Ticket Keep for Future Travel Should Be Written in the PNR Upon Cancel When RMB/Aqua updated Remark and RM*BB/- Are The Same
    [TAGS]    us11190
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Passive Air Segments For Cancellation, Air Segment, RM Aqua And RM BB Is Equal
    Complete The PNR With Default Values
    Fill Up Non-BSP Ticket Keep For Future Travel With 1 Ticket/s And Coupon/s
    Verify Non-BSP Ticket Keep For Future Travel When RM Aqua Remark and RM BB Remark Are The Same
