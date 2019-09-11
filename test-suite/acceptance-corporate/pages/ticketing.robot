*** Settings ***
Library           String
Library           SeleniumLibrary
Library           Collections
Library           Screenshot
Resource          base.robot

*** Variables ***
${input_ticketingDate}    css=#dtxtTicketDate
${checkbox_onHold}    css=#chkOnHold
${dropdown_tkLine}    css=#selTK
${checkbox_verifyTicket}    css=#chkVerifyAck

*** Keywords ***
Fill Up Ticketing Panel With Default Values
    Navigate To Page Ticketing
    Assign Current Date
    Enter Value    ${input_ticketingDate}    01312020
    Select Checkbox    ${checkbox_onHold}
    Select Checkbox    ${checkbox_verifyTicket}
    Set Test Variable    ${ticketing_complete}    yes
    [Teardown]    Take Screenshot

#for verifying default dropdown value per CFA line
Verify Ticketing Panel Dropdown For ${selected_aqua_tkLine}
    Navigate To Page Ticketing
    Get Text    ${dropdown_tkLine}
    Should Be Equal    ${dropdown_tkLine}    ${selected_aqua_tkLine}
    [Teardown]    Take Screenshot

Fill Up Ticketing Panel For ${selected_aqua_tkLine}
    Navigate To Page Ticketing
    Assign Current Date
    Enter Value    ${input_ticketingDate}    01312020
    Run Keyword If    "${selected_aqua_tkLine}" == "ISSUE E-TICKET OR NON BSP TICKET"    Select From List By Value    ${dropdown_tkLine}    ISSUE E-TICKET OR NON BSP TICKET
    Run Keyword If    "${selected_aqua_tkLine}" == "INVOICE HOTEL ONLY/CAR ONLY/LIMO ONLY"    Select From List By Value    ${dropdown_tkLine}    INVOICE HOTEL ONLY/CAR ONLY/LIMO ONLY
    Run Keyword If    "${selected_aqua_tkLine}" == "CHANGED PNR-AFTER TICKETING/UPDATE MATRIX-NO FEE"    Select From List By Value    ${dropdown_tkLine}    CHANGED PNR-AFTER TICKETING/UPDATE MATRIX-NO FEE
    Run Keyword If    "${selected_aqua_tkLine}" == "FEE ONLY"    Select From List By Value    ${dropdown_tkLine}    FEE ONLY
    Run Keyword If    "${selected_aqua_tkLine}" == "CANCELLED PNR"    Select From List By Value    ${dropdown_tkLine}    CANCELLED PNR
    Select Checkbox    ${checkbox_verifyTicket}
    Set Test Variable    ${ticketing_complete}    yes
    [Teardown]    Take Screenshot
    
Verify That Aqua TK Line Is Written Correctly For PNR On Hold
    Finish PNR
    Verify Specific Remark Is Written In The PNR    TKTL04DEC/YTOWL2106/Q8C1-ONHOLD
    Verify Specific Remark Is Written In The PNR    RMM/ONHOLD:AWAITING APPROVAL
    [Teardown]    Take Screenshot
    
Verify That Aqua TK Line Is Written Correctly For Fee Only
    Finish PNR
    Verify Specific Remark Is Written In The PNR    TKTL31JAN/YTOWL2106/Q8C1-FEE
    [Teardown]    Take Screenshot
    
Verify That Aqua TK Line Is Written Correctly For Cancelled PNR
    Finish PNR
    Verify Specific Remark Is Written In The PNR    TKTL31JAN/YTOWL2106/Q8C1-CXL
    [Teardown]    Take Screenshot
    
Verify That Aqua TK Line Is Written Correctly For Changed PNR Without Billed Service Fee
    Finish PNR
    Verify Specific Remark Is Written In The PNR    TKTL31JAN/YTOWL2106/Q8C1-CHG
    [Teardown]    Take Screenshot
    
Verify That Aqua TK Line Is Written Correctly For For Other Type of TK Line
    Finish PNR
    Verify Specific Remark Is Written In The PNR    TKTL31JAN/YTOWL2106/Q8C1
    [Teardown]    Take Screenshot
