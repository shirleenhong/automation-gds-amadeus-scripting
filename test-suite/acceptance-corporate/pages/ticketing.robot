*** Settings ***
Library           String
Library           SeleniumLibrary
Library           Collections
Library           Screenshot
Resource          base.robot
Resource          amadeus.robot

*** Variables ***
${input_ticketingDate}    css=#dtxtTicketDate
${checkbox_onHold}    css=#chkOnHold
${dropdown_tkLine}    css=#selTK
${checkbox_verifyTicket}    css=#chkVerifyAck

*** Keywords ***
Fill Up Ticketing Panel With Default Values
    Navigate To Page Ticketing
    Select Checkbox    ${checkbox_onHold}
    Select Checkbox    ${checkbox_verifyTicket}
    Set Test Variable    ${ticketing_complete}    yes
    [Teardown]    Take Screenshot

#for verifying default dropdown value per CFA line
Verify Ticketing Panel Dropdown For ${selected_aqua_tkLine}
    Navigate To Page Ticketing
    Wait Until Element Is Visible    ${dropdown_tkLine}    30
    ${actual_aqua_tkLine}    Get Selected List Label    ${dropdown_tkLine}
    ${actual_aqua_tkLine}    Strip String    ${actual_aqua_tkLine}
    Log    Expected: "${selected_aqua_tkLine}"
    Log    Actual: "${actual_aqua_tkLine}"
    Run Keyword And Continue On Failure    Should Be Equal    ${actual_aqua_tkLine}    ${selected_aqua_tkLine}
    [Teardown]    Take Screenshot

Fill Up Ticketing Panel For ${selected_aqua_tkLine}
    Navigate To Page Ticketing
    Assign Current Date
    Enter Value    ${input_ticketingDate}    01312020
    Run Keyword If    "${selected_aqua_tkLine}" == "ISSUE E-TICKET OR NON BSP TICKET"    Select From List By Label    ${dropdown_tkLine}    ISSUE E-TICKET OR NON BSP TICKET
    Run Keyword If    "${selected_aqua_tkLine}" == "INVOICE HOTEL ONLY/CAR ONLY/LIMO ONLY"    Select From List By Label    ${dropdown_tkLine}    INVOICE HOTEL ONLY/CAR ONLY/LIMO ONLY
    Run Keyword If    "${selected_aqua_tkLine}" == "CHANGED PNR-AFTER TICKETING/UPDATE MATRIX-NO FEE"    Select From List By Label    ${dropdown_tkLine}    CHANGED PNR-AFTER TICKETING/UPDATE MATRIX-NO FEE
    Run Keyword If    "${selected_aqua_tkLine}" == "FEE ONLY"    Select From List By Label    ${dropdown_tkLine}    FEE ONLY
    Run Keyword If    "${selected_aqua_tkLine}" == "CANCELLED PNR"    Select From List By Label    ${dropdown_tkLine}    CANCELLED PNR
    Select Checkbox    ${checkbox_verifyTicket}
    Set Test Variable    ${ticketing_complete}    yes
    [Teardown]    Take Screenshot
    
Verify That Aqua TK Line Is Written Correctly For PNR On Hold
    Finish PNR
    Verify Specific Remark Is Written In The PNR    /YTOWL2106/Q8C1-ONHOLD
    Verify Specific Remark Is Written In The PNR    RIR ONHOLD:AWAITING APPROVAL
    
Verify That Aqua TK Line Is Written Correctly For Fee Only
    Finish PNR
    Verify Specific Remark Is Written In The PNR    TK TL31JAN/YTOWL2106/Q8C1-FEE
    
Verify That Aqua TK Line Is Written Correctly For Cancelled PNR
    Finish PNR
    Verify Specific Remark Is Written In The PNR    TK TL31JAN/YTOWL2106/Q8C1-CXL

Verify That Aqua TK Line Is Written Correctly For Changed PNR Without Billed Service Fee
    Finish PNR
    Verify Specific Remark Is Written In The PNR    TK TL31JAN/YTOWL2106/Q8C1-CHG
    
Verify That Aqua TK Line Is Written Correctly For For Other Type of TK Line
    Finish PNR
    Verify Specific Remark Is Written In The PNR    TK TL31JAN/YTOWL2106/Q8C1
    
Verify That Aqua TK Line Is Written Correctly For Updated TK Line
    Submit To PNR    
    Get PNR Details
    Verify Specific Remark Is Written In The PNR    /YTOWL2106/Q8C1-ONHOLD
    Verify Specific Remark Is Written In The PNR    RIR ONHOLD:AWAITING APPROVAL