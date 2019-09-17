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
    
Verify Aqua Ticketing Instructions Remark Are Written For Hotel And Car Only Segments
    Finish PNR
    Verify Specific Remark Is Written In The PNR    RMT TKT1-INV-HTL/S2
    Verify Specific Remark Is Written In The PNR    RMT TKT1-INV-CAR/S3
    Verify Specific Remark Is Written In The PNR    RMT TKT1-INV-HTL/S2
    Verify Specific Remark Is Written In The PNR    RMT SPLIT1

Verify Aqua Ticketing Instructions Remark Are Written For ${limo_segments} Limo Only Segment
    Finish PNR
    Verify Specific Remark Is Written In The PNR    RMT SPLIT1
    :FOR    ${i}    IN RANGE    0    ${limo_segments}
    \    ${i}    Evaluate    ${i} + 1
    \    ${seg_num}    Evaluate    ${i} + 1
    \    Verify Specific Remark Is Written In The PNR     RMT/TKT${i}-INV-LIMO/S${seg_num}
    
    
Verify Aqua Ticketing Instructions Remark Are Written For ${car_segments} Car Only Segment
    Finish PNR
    Verify Specific Remark Is Written In The PNR    RMT SPLIT1
    :FOR    ${i}    IN RANGE    0    ${car_segments}
    \    ${i}    Evaluate    ${i} + 1
    \    ${seg_num}    Evaluate    ${i} + 1
    \    Verify Specific Remark Is Written In The PNR     RMT/TKT${i}-INV-CAR/S${seg_num}
       
Verify Aqua Ticketing Instructions Remark Are Written For ${hotel_segments} Hotel Only Segment
    Finish PNR
    Verify Specific Remark Is Written In The PNR    RMT SPLIT1
    :FOR    ${i}    IN RANGE    0    ${hotel_segments}
    \    ${i}    Evaluate    ${i} + 1
    \    ${seg_num}    Evaluate    ${i} + 1
    \    Verify Specific Remark Is Written In The PNR     RMT/TKT${i}-INV-HTL/S${seg_num}

Verify Aqua Ticketing Instruction Remarks Are Not Written For Ticketed Air Segments, Limo, Hotel And Car Segments
    Finish PNR
    Verify Specific Remark Is Not Written In The PNR     RMT TKT1-ETK/S2
    Verify Specific Remark Is Not Written In The PNR     RMT TKT1-DOM/S2
    Verify Specific Remark Is Not Written In The PNR     RMT SPLIT1
    Verify Specific Remark Is Not Written In The PNR     RMQ ADVISED USTRAVEL A PASSPORT AND VISA ARE REQUIRED.
    Verify Specific Remark Is Not Written In The PNR     RMQ ADVISED USTRAVEL 6 MONTH FROM DEPARTURE.
    Verify Specific Remark Is Not Written In The PNR    RMT TKT1-INV-LIMO/S3
    Verify Specific Remark Is Not Written In The PNR    RMT TKT1-INV-HTL/S4
    Verify Specific Remark Is Not Written In The PNR    RMT TKT1-INV-CAR/S5

Verify Message No Unticketed Air Segment Is Displayed
    Navigate To Page Ticketing Instructions
    Run Keyword And Continue On Failure    Page Should Contain    No Unticketed Air Segment Found In The PNR

Verify Aqua Ticketing Instructions Remark Are Written For Unticketed Air Segment ${segment_number} Only
    Finish PNR
    Verify Specific Remark Is Written In The PNR     RMT TKT1-ETK/S2
    Verify Specific Remark Is Written In The PNR     RMT TKT1-TRANS/S2
    Verify Specific Remark Is Written In The PNR     RMT SPLIT1
    Verify Specific Remark Is Written In The PNR     RMQ ADVISED USTRAVEL A PASSPORT AND VISA ARE REQUIRED.
    Verify Specific Remark Is Written In The PNR     RMQ ADVISED USTRAVEL 6 MONTH FROM DEPARTURE.
    Verify Specific Remark Is Not Written In The PNR    RMT TKT1-INV-LIMO/S3
    Verify Specific Remark Is Not Written In The PNR    RMT TKT1-INV-HTL/S4
    Verify Specific Remark Is Not Written In The PNR    RMT TKT1-INV-CAR/S5

Select Unticketed TST ${unticketed_segment}
    Navigate To Page Ticketing Instructions
    Select Unticketed Air Segments    ${unticketed_segment}
    
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
    Select Limo Segments    1    2
    
Select All Unticketed Car Segment
    Navigate To Page Ticketing Instructions
    Select Car Segments    1    2
    
Select All Unticketed Hotel Segment
    Navigate To Page Ticketing Instructions
    Select Hotel Segments    1    2
    
Select All Unticketed TSTs
    Navigate To Page Ticketing Instructions
    Select Unticketed Air Segments    1    2    3    4
    
Verify Ticketed Segments Are Not Displayed In The Unticketed TST List
    Wait Until Element Is Visible    ${input_unticketedTst}    30
    Click Button    ${input_unticketedTst}
    Wait Until Element Is Visible    ${list_unticketedTst}    30
    Run Keyword And Continue On Failure    Element Should Not Be Visible    ${list_unticketedTst}//input[@value='${segment_number}']
    Click Element    ${input_unticketedTst}
    
Verify Ticketing Instruction Remarks Are Written For Exchanged Air Segments
    Finish PNR
    Verify Specific Remark Is Written In The PNR    RMT TKT1-ETK/S2-4
    Verify Specific Remark Is Written In The PNR    RMT SPLIT1
    Verify Specific Remark Is Written In The PNR    RMT TKT1-INTL/S2-4
    
Verify Ticketing Instruction Remarks Are Not Written For Ticketed Air Segment ${segment_number}
    Finish PNR
    ${tkt_remarks}    Get Lines Matching Pattern    ${pnr_details}    RMT TKT*
    ${num_matches}    Get Line Count    ${tkt_remarks}
    ${num_matches}    Evaluate    ${num_matches} - 1
    : FOR      ${i}    IN RANGE   0    ${num_matches}
    \    Run Keyword And Continue On Failure    Should Not Contain    ${tkt_remarks[${i}]}    /S${segment_number}
    
Verify Multiple Aqua Ticketing Instruction Remarks Are Written Correctly
    Finish PNR
    Verify Specific Remark Is Written In The PNR     RMT TKT1-ETK/S2
    Verify Specific Remark Is Written In The PNR     RMT TKT1-ETK/S3
    Verify Specific Remark Is Written In The PNR     RMT TKT1-ETK/S4
    Verify Specific Remark Is Written In The PNR     RMT TKT1-ETK/S5
    Verify Specific Remark Is Written In The PNR     RMT SPLIT4
    Verify Specific Remark Is Written In The PNR     RMT TKT1-TRANS/S2
    Verify Specific Remark Is Written In The PNR     RMT TKT1-INTL/S3
    Verify Specific Remark Is Written In The PNR     RMT TKT1-INTL/S4
    Verify Specific Remark Is Written In The PNR     RMT TKT1-TRANS/S5
    Verify Specific Remark Is Written In The PNR     RMQ ADVISED USTRAVEL A PASSPORT AND VISA ARE REQUIRED.
    Verify Specific Remark Is Written In The PNR     RMQ ADVISED USTRAVEL 6 MONTH FROM DEPARTURE.