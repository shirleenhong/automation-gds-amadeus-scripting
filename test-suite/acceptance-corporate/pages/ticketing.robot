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
${tab_tktLine}    //span[contains(text(), 'Ticketing Line')]
${tab_tktInstructions}    //span[contains(text(), 'Ticketing Instruction')]
${list_segments}    //ul[@id='dropdown-basic']
${input_unticketedTst}    //input[@formcontrolname='tst']
${input_nonAirSegments}    //input[@formcontrolname='segment']
${tab_tktInstruction}    //tab[@id='ticketingInstruction']
${text_noSegments}    //b[contains(text(), '*No Segments Available for Ticketing*')]
${select_primaryReason}    //select[@id='primaryReason']
${select_secondaryReason}    //select[@id='secondaryReason']
${input_approverName}     //div[@formarrayname='additionalValues'][1]//input[@id='textValue']
${input_totalCost}     //div[@formarrayname='additionalValues'][2]//input[@id='textValue']
${text_Danger}    //div[@class='col text-danger']
${checkbox_ignoreApproval}    css=#noApproval

*** Keywords ***
Select Primary Approval Reason: ${primary_reason}
    Select From List By Label     ${select_primaryReason}    ${primary_reason}

Select Secondary Reason: ${secondary_reason}
    Select From List By Label     ${select_secondaryReason}    ${secondary_reason}
    
Fill Up Approval Fields
    Navigate To Page Ticketing Line
    Scroll Element Into View    ${button_submit_pnr}
    Run Keyword If    "${with_ui}" == "Yes" and "${ignore_approval}" == "Yes"       Select Checkbox    ${checkbox_ignoreApproval}
    ...    ELSE IF    "${with_ui}" == "Yes" and "${ignore_approval}" != "Yes"    Fill Up Approval Reason Fields
    ...    ELSE IF    "${with_ui}" == "No"    Verify Approval Fields Are Not Displayed
    [Teardown]    Take Screenshot
    
Verify Approval Fields Are Not Displayed
    Scroll Element Into View    ${button_submit_pnr}
    Run Keyword And Continue On Failure    Page Should Not Contain Element     ${select_primaryReason}
    Run Keyword And Continue On Failure    Page Should Not Contain Element     ${checkbox_ignoreApproval}

Fill Up Approval Reason Fields
    Run Keyword If    "${primary_approval_reason}" != "None"    Select Primary Approval Reason: ${primary_approval_reason}
    Run Keyword If    "${secondary_approval_reason}" != "None"    Select Secondary Reason: ${secondary_approval_reason}
    Run Keyword If    "${approver_name}" != "None"    Enter Value    ${input_approverName}    ${approver_name}
    Run Keyword If    "${total_cost}" != "None"    Enter Value    ${input_totalCost}    ${total_cost}  
    Run Keyword If    "${addtl_message}" != "None"    Verify Warning Message Is Displayed     ${addtl_message}
    
Verify Warning Message Is Displayed
    [Arguments]    ${warning_message}
    Run Keyword And Continue On Failure     Element Should Contain    ${text_Danger}    ${warning_message}

Click Ticketing Instructions Tab
    Wait Until Element Is Visible   ${tab_tktInstructions}    30
    Click Element At Coordinates    ${tab_tktInstructions}    0    0
    Wait Until Page Contains Element    ${tab_tktInstruction}    30
    Set Test Variable    ${current_page}    Ticketing Instructions
    
Click Ticketing Line Tab
    Wait Until Element Is Visible   ${tab_tktLine}    30
    Click Element At Coordinates    ${tab_tktLine}    0    0
    Wait Until Page Contains Element    ${input_ticketingDate}    30
    Set Test Variable    ${current_page}    Ticketing Line        
    
Select Unticketed Air Segments
    [Arguments]    @{segment_number}
    Wait Until Element Is Visible    ${input_unticketedTst}    30
    Click Button    ${input_unticketedTst}
    Wait Until Element Is Visible    ${list_segments}    30
    ${has_ticketed}     Run Keyword And Return Status     Should Not Be Empty     ${ticketed_tst}
    Run Keyword If    "${has_ticketed}" == "True"    Run Keyword And Continue On Failure    Page Should Not Contain Element    ${list_segments}//input[@value='${ticketed_tst}'] 
    :FOR    ${segment_number}    IN    @{segment_number}
    \    Click Element    ${list_segments}//input[@value='${segment_number}']
    Click Element    ${input_unticketedTst}
    [Teardown]    Take Screenshot
    
Select Car Segments
    [Arguments]    @{segment_number}
    Wait Until Element Is Visible    ${input_nonAirSegments}    30
    Click Button    ${input_nonAirSegments}
    Wait Until Element Is Visible    ${list_segments}    30
    :FOR    ${segment_number}    IN    @{segment_number}
    \    Click Element    ${list_segments}//input[@value='${segment_number}']
    Click Element    ${input_nonAirSegments}
    [Teardown]    Take Screenshot
    
Select Hotel Segments
    [Arguments]    @{segment_number}
    Wait Until Element Is Visible    ${input_nonAirSegments}    30
    Click Button    ${input_nonAirSegments}
    Wait Until Element Is Visible    ${list_segments}    30
    :FOR    ${segment_number}    IN    @{segment_number}
    \    Click Element    ${list_segments}//input[@value='${segment_number}']
    Click Element    ${input_nonAirSegments}
    [Teardown]    Take Screenshot
    
Select Limo Segments
    [Arguments]    @{segment_number}
    Wait Until Element Is Visible    ${input_nonAirSegments}    30
    Click Button    ${input_nonAirSegments}
    Wait Until Element Is Visible    ${list_segments}    30
    :FOR    ${segment_number}    IN    @{segment_number}
    \    Click Element    ${list_segments}//input[@value='${segment_number}']
    Click Element    ${input_nonAirSegments}
    [Teardown]    Take Screenshot

Fill Up Ticketing Panel With Default Values
    ${is_ticketing_displayed}    Run Keyword And Return Status    Element Should Be Visible    ${tab_tktLine}        
    Run Keyword If    "${is_ticketing_displayed}" == "True"    Click Ticketing Line Tab   ELSE    Navigate To Page Ticketing Line   
    Select Checkbox    ${checkbox_verifyTicket}
    Set Test Variable    ${ticketing_complete}    yes
    [Teardown]    Take Screenshot
    
Fill Up Ticketing Panel With PNR ON HOLD
    Navigate To Page Ticketing Line
    Select Checkbox    ${checkbox_onHold}
    Select Checkbox    ${checkbox_verifyTicket}
    Set Test Variable    ${ticketing_complete}    yes
    [Teardown]    Take Screenshot

#for verifying default dropdown value per CFA line
Verify Ticketing Panel Dropdown For ${selected_aqua_tkLine}
    Navigate To Page Ticketing Line
    Wait Until Element Is Visible    ${dropdown_tkLine}    30
    ${actual_aqua_tkLine}    Get Selected List Label    ${dropdown_tkLine}
    ${actual_aqua_tkLine}    Strip String    ${actual_aqua_tkLine}
    Log    Expected: "${selected_aqua_tkLine}"
    Log    Actual: "${actual_aqua_tkLine}"
    Run Keyword And Continue On Failure    Should Be Equal    ${actual_aqua_tkLine}    ${selected_aqua_tkLine}
    [Teardown]    Take Screenshot

Fill Up Ticketing Panel For ${selected_aqua_tkLine}
    Navigate To Page Ticketing Line
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
    
Verify Aqua Ticketing Instructions Remark Are Written For Hotel Only Segments
    Finish PNR
    Verify Specific Remark Is Written In The PNR    RMT TKT1-INV-HTL/S3-4
    Verify Specific Remark Is Written In The PNR    RMT SPLIT1
    Verify Specific Remark Is Not Written In The PNR    RMT TKT1-INV-CAR/S2

Verify Aqua Ticketing Instructions Remark Are Written For Limo Segment ${limo_segments} Only
    Finish PNR
    Verify Specific Remark Is Written In The PNR    RMT SPLIT1
    Verify Specific Remark Is Written In The PNR     RMT TKT1-INV-LIMO/S${limo_segments}
    
    
Verify Aqua Ticketing Instructions Remark Are Written For Car Segment ${car_segments} Only
    Finish PNR
    Verify Specific Remark Is Written In The PNR    RMT SPLIT1
    Verify Specific Remark Is Written In The PNR    RMT TKT1-INV-CAR/S${car_segments}
       
Verify Aqua Ticketing Instructions Remark Are Written For Hotel Segment ${hotel_segments} Only
    Finish PNR
    Verify Specific Remark Is Written In The PNR    RMT SPLIT1
    Verify Specific Remark Is Written In The PNR    RMT TKT1-INV-HTL/S${hotel_segments}

Verify Aqua Ticketing Instruction Remarks Are Not Written For Ticketed Air Segments, Limo, Hotel And Car Segments
    Finish PNR
    Verify Ticketing Instruction Remarks Are Not Written For Ticketed Air Segment 2
    Verify Specific Remark Is Not Written In The PNR    RMQ ADVISED USTRAVEL A PASSPORT AND VISA ARE REQUIRED
    Verify Specific Remark Is Not Written In The PNR    RMQ ADVISED USTRAVEL 6 MONTH FROM DEPARTURE
    Verify Specific Remark Is Not Written In The PNR    RMT TKT1-INV-LIMO/S3
    Verify Specific Remark Is Not Written In The PNR    RMT TKT1-INV-HTL/S4
    Verify Specific Remark Is Not Written In The PNR    RMT TKT1-INV-CAR/S5

Verify Message No Unticketed Air Segment Is Displayed
    Navigate To Page Ticketing Instructions
    Run Keyword And Continue On Failure    Page Should Contain Element    ${text_noSegments}
    #Run Keyword And Continue On Failure    Set Focus To Element    ${tab_tktInstruction}

Verify Aqua Ticketing Instructions Remark Are Written For Unticketed Air Segment ${segment_number} Only
    Finish PNR
    Verify Specific Remark Is Written In The PNR     RMT TKT1-ETK/S${segment_number}
    Verify Specific Remark Is Written In The PNR     RMT TKT1-${route_code}/S${segment_number}
    Verify Specific Remark Is Written In The PNR     RMT SPLIT1
    Verify Specific Remark Is Written In The PNR     RMQ ADVISED USTRAVEL A PASSPORT AND VISA ARE REQUIRED
    Verify Specific Remark Is Written In The PNR     RMQ ADVISED USTRAVEL 6 MONTH FROM DEPARTURE
    Verify Specific Remark Is Not Written In The PNR    RMT TKT1-INV-LIMO/S3
    Verify Specific Remark Is Not Written In The PNR    RMT TKT1-INV-HTL/S4
    Verify Specific Remark Is Not Written In The PNR    RMT TKT1-INV-CAR/S5

Select Unticketed TST ${unticketed_segment}
    Navigate To Page Ticketing Instructions
    Select Unticketed Air Segments    ${unticketed_segment}
    
Select TST ${unticketed_segment} And Submit To PNR
    Navigate To Page Ticketing Instructions
    Select Unticketed Air Segments    ${unticketed_segment}
    Fill Up Ticketing Panel With Default Values
    Click Submit To PNR
    
Select Unticketed Limo Segment ${segment_number}
    Navigate To Page Ticketing Instructions
    Select Limo Segments    ${segment_number}
    
Select Unticketed Car Segment ${segment_number}
    Navigate To Page Ticketing Instructions
    Select Car Segments    ${segment_number}
    
Select Unticketed Hotel Segment ${segment_number}
    Navigate To Page Ticketing Instructions
    Select Hotel Segments    ${segment_number}
    
Select All Unticketed Limo Segment
    Navigate To Page Ticketing Instructions
    Wait Until Element Is Visible    ${input_nonAirSegments}    30
    Click Button    ${input_nonAirSegments}
    Wait Until Element Is Visible    ${list_segments}    30
    :FOR    ${i}    IN RANGE    1    99
    \   ${visible_element}    Run Keyword And Return Status     Page Should Contain Element   (${list_segments}//input)[${i}]
    \    Run Keyword If    "${visible_element}" == "True"    Click Element    (${list_segments}//input)[${i}]
    \    Exit For Loop If    "${visible_element}" == "False"
    Click Element    ${input_nonAirSegments}
    [Teardown]    Take Screenshot    
    
Select All Unticketed Car Segment
    Navigate To Page Ticketing Instructions
    Wait Until Element Is Visible    ${input_nonAirSegments}    30
    Click Button    ${input_nonAirSegments}
    Wait Until Element Is Visible    ${list_segments}    30
    :FOR    ${i}    IN RANGE    1    99
    \   ${visible_element}    Run Keyword And Return Status     Page Should Contain Element   (${list_segments}//input)[${i}]
    \    Run Keyword If    "${visible_element}" == "True"    Click Element    (${list_segments}//input)[${i}]
    \    Exit For Loop If    "${visible_element}" == "False"
    Click Element    ${input_nonAirSegments}
    [Teardown]    Take Screenshot    
    
Select All Unticketed Hotel Segment
    Navigate To Page Ticketing Instructions
    Wait Until Element Is Visible    ${input_nonAirSegments}    30
    Click Button    ${input_nonAirSegments}
    Wait Until Element Is Visible    ${list_segments}    30
    :FOR    ${i}    IN RANGE    1    99
    \   ${visible_element}    Run Keyword And Return Status     Page Should Contain Element   (${list_segments}//input)[${i}]
    \    Run Keyword If    "${visible_element}" == "True"    Click Element    (${list_segments}//input)[${i}]
    \    Exit For Loop If    "${visible_element}" == "False"
    Click Element    ${input_nonAirSegments}
    [Teardown]    Take Screenshot    
    
Select All Unticketed TSTs
    Navigate To Page Ticketing Instructions
    Wait Until Element Is Visible    ${input_unticketedTst}    30
    Click Button    ${input_unticketedTst}
    Wait Until Element Is Visible    ${list_segments}    30 
    :FOR    ${i}    IN RANGE    1    99
    \   ${visible_element}    Run Keyword And Return Status     Page Should Contain Element   (${list_segments}//input)[${i}]
    \    Run Keyword If    "${visible_element}" == "True"    Click Element    (${list_segments}//input)[${i}]
    \    Exit For Loop If    "${visible_element}" == "False"
    Click Element    ${input_unticketedTst}
    [Teardown]    Take Screenshot
    
Verify Ticketing Instruction Remarks Are Written For Unticketed Air Segments ${air_segments}
    Finish PNR
    Verify Specific Remark Is Written In The PNR    RMT TKT1-ETK/S${air_segments}
    Verify Specific Remark Is Written In The PNR    RMT SPLIT1
    Verify Specific Remark Is Written In The PNR    RMT TKT1-${route_code}/S${air_segments}
    
Verify Ticketing Instruction Remarks Are Written For Multiple Unticketed Air Segments ${start} To ${end}
    Finish PNR
    Set Test Variable    ${tkt_num}    0
    ${end}    Evaluate    ${end} + 1
    :FOR    ${i}    IN RANGE    ${start}    ${end}
    \    ${tkt_num}    Evaluate    ${tkt_num} + 1
    \    Verify Specific Remark Is Written In The PNR    RMT TKT${tkt_num}-ETK/S${i}
    \    Verify Specific Remark Is Written In The PNR    RMT TKT${tkt_num}-${route_code_${tkt_num}}/S${i}
    \    ${i}    Evaluate    ${i} + 1
    Verify Specific Remark Is Written In The PNR    RMT SPLIT${tkt_num}

    
Verify Ticketing Instruction Remarks Are Not Written For Ticketed Air Segment ${segment_number}
    Finish PNR
    ${tkt_remarks}    Get Lines Containing String    ${pnr_details}    RMT TKT
    ${num_matches}    Get Line Count    ${tkt_remarks}
    : FOR      ${i}    IN RANGE    0    ${num_matches}
    \    ${line}    Get Line    ${tkt_remarks}    ${i}
    \    Run Keyword And Continue On Failure    Should Not Contain    ${line}    /S${segment_number}
    \    ${i}    Evaluate    ${i} + 1
    
Verify Multiple Aqua Ticketing Instruction Remarks Are Written Correctly
    Finish PNR
    Verify Specific Remark Is Written In The PNR     RMT TKT1-ETK/S2
    Verify Specific Remark Is Written In The PNR     RMT TKT1-ETK/S3
    Verify Specific Remark Is Written In The PNR     RMT TKT1-ETK/S4
    Verify Specific Remark Is Written In The PNR     RMT TKT1-ETK/S5
    Verify Specific Remark Is Written In The PNR     RMT SPLIT4
    Verify Specific Remark Is Written In The PNR     RMT TKT1-INTL/S2
    Verify Specific Remark Is Written In The PNR     RMT TKT1-INTL/S3
    Verify Specific Remark Is Written In The PNR     RMT TKT1-INTL/S4
    Verify Specific Remark Is Written In The PNR     RMT TKT1-INTL/S5
    
Verify PNR Approval Is Processed Correctly
    Finish PNR    queueing=yes
    Assign Current Date
    Run Keyword If    "${queue_approval}" == "Yes"    Verify PNR Is Queued For Approval
    ...    ELSE    Verify PNR Is Not Queued For Approval
    Run Keyword If    "${expected_remark_1}" != "None" and "${secondary_approval_reason}" == "Awaiting ECM Approval"    Verify Specific Remark Is Written In The PNR   ${expected_remark_1}${date_today}
    ...    ELSE    Run Keyword If    "${expected_remark_1}" != "None"    Verify Expected Remarks Are Written In The PNR    
    Run Keyword If    "${onhold_rmk}" == "Yes"    Verify Specific Remark Is Written In The PNR   TK TL${current_date}/YTOWL2106/Q8C1-ONHOLD    ELSE   Verify Specific Remark Is Not Written In The PNR   TK TL${current_date}/YTOWL2106/Q8C1-ONHOLD 
    Run Keyword If    "${queue_tkt}" == "Yes"    Verify Specific Remark Is Written In The PNR   RMQ YTOWL2107/70C1
    ...    ELSE    Verify Specific Remark Is Not Written In The PNR   RMQ YTOWL2107/70C1

Verify PNR Is Queued For Approval
    Open Command Page
    Enter Cryptic Command    RTQ 
    Run Keyword If    "${cfa}" != "D7V"    Run Keyword And Continue On Failure    Element Should Contain    ${text_area_command}    YTOWL2107${SPACE}${SPACE}${SPACE}${SPACE}041${SPACE}${SPACE}${SPACE}${SPACE}096    
    ...    ELSE    Run Keyword And Continue On Failure    Element Should Contain    ${text_area_command}    YTOWL28AN${SPACE}${SPACE}${SPACE}${SPACE}000${SPACE}${SPACE}${SPACE}${SPACE}096   
    Run Keyword If    "${cfa}" == "D7V"    Run Keyword And Continue On Failure    Element Should Not Contain    ${text_area_command}    YTOWL2107${SPACE}${SPACE}${SPACE}${SPACE}041${SPACE}${SPACE}${SPACE}${SPACE}096
    [Teardown]    Take Screenshot
    
Verify PNR Is Not Queued For Approval
    Open Command Page
    Enter Cryptic Command    RTQ
    Run Keyword And Continue On Failure    Element Should Not Contain    ${text_area_command}    YTOWL2107${SPACE}${SPACE}${SPACE}${SPACE}041${SPACE}${SPACE}${SPACE}${SPACE}096
    [Teardown]    Take Screenshot