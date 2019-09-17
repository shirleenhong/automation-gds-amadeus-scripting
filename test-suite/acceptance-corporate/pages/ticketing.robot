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
${tab_tktInstructions}    //span[contains(text(), 'Ticketing Instructions')]
${list_unticketedTst}    css=#unticketedTst    #//ul[@id='dropdown-basic']
${input_unticketedTst}    css=#unticketedTst    #//button[@id='button-basic']//input[@formcontrolname='unticketedTst']
${list_carSegments}    css=#carSegments    #//ul[@id='dropdown-basic']
${input_carSegments}    css=#carSegments    #//button[@id='button-basic']//input[@formcontrolname='carSegments']
${list_hotelSegments}    css=#hotelSegments    #//ul[@id='dropdown-basic']
${input_hotelSegments}    css=#hotelSegments    #//button[@id='button-basic']//input[@formcontrolname='hotelSegments']
${list_limoSegments}    css=#limoSegments    #//ul[@id='dropdown-basic']
${input_limoSegments}    css=#limoSegments    #//button[@id='button-basic']//input[@formcontrolname='limoSegments']

*** Keywords ***
Click Ticketing Instructions Tab
    Wait Until Element Is Visible   ${tab_tktInstructions}    30
    Click Element    ${tab_tktInstructions}
    Wait Until Page Contains Element    ${list_unticketedTst}    30
    Set Test Variable    ${current_page}    Ticketing Instructions    
    
Select Unticketed Air Segments
    [Arguments]    @{segment_number}
    Wait Until Element Is Visible    ${input_unticketedTst}    30
    Click Button    ${input_unticketedTst}
    Wait Until Element Is Visible    ${list_unticketedTst}    30
    :FOR    ${segment_number}    IN    @{segment_number}
    \    Click Element    ${list_unticketedTst}//input[@value='${segment_number}']
    Click Element    ${input_unticketedTst}
    [Teardown]    Take Screenshot
    
Select Car Segments
    [Arguments]    @{segment_number}
    Wait Until Element Is Visible    ${input_carSegments}    30
    Click Button    ${input_carSegments}
    Wait Until Element Is Visible    ${list_carSegments}    30
    :FOR    ${segment_number}    IN    @{segment_number}
    \    Click Element    ${list_carSegments}//input[@value='${segment_number}']
    Click Element    ${input_carSegments}
    [Teardown]    Take Screenshot
    
Select Hotel Segments
    [Arguments]    @{segment_number}
    Wait Until Element Is Visible    ${input_hotelSegments}    30
    Click Button    ${input_hotelSegments}
    Wait Until Element Is Visible    ${list_hotelSegments}    30
    :FOR    ${segment_number}    IN    @{segment_number}
    \    Click Element    ${list_hotelSegments}//input[@value='${segment_number}']
    Click Element    ${input_hotelSegments}
    [Teardown]    Take Screenshot
    
Select Limo Segments
    [Arguments]    @{segment_number}
    Wait Until Element Is Visible    ${input_limoSegments}    30
    Click Button    ${input_limoSegments}
    Wait Until Element Is Visible    ${list_limoSegments}    30
    :FOR    ${segment_number}    IN    @{segment_number}
    \    Click Element    ${list_limoSegments}//input[@value='${segment_number}']
    Click Element    ${inputt_limoSegments}
    [Teardown]    Take Screenshot

Fill Up Ticketing Panel With Default Values
    Navigate To Page Ticketing
    Assign Current Date
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
