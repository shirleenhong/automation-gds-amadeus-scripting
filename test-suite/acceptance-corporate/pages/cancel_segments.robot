*** Settings ***
Resource          base.robot

*** Variables ***
${input_requestor}    css=#requestor
${input_notes1}     css=#desc1
${input_notes2}     css=#desc2
${list_followUp}    css=#followUpOption
${checkbox_cancelAll}    css=#cancelAll
${list_acCancelCheck}    css=#cancelProcess
${checkbox_segment_start}    //input[@type='checkbox' and @ng-reflect-name='
${checkbox_segment_end}      ']
${list_reasonUACancel}    css=#reasonUACancel
${input_airlineNo}     css=#airlineNo
${list_reasonACCancel}    css=#reasonACCancel
${list_relationship}    css=#relationship
${input_acFlightNo}    css=#acFlightNo
${input_acCancelMonth}    css=#acCancelMonth
${input_acCancelYear}     css=#acCancelYear
${input_acTicketNo}    //input[@ng-reflect-name='acTicketNo']
${list_acpassengerNo}    css=#acpassengerNo
${tab_CancelSegments}    //span[contains(text(), 'Cancel Segments')]
${tab_nonBspTicketCredit}     //span[contains(text(), 'NonBSP Ticket Credit')]
${input_ticketNum}    css=#ticketNum
${input_recredit_yes}    //input[@id="isReCredit"][@value='Y']/following-sibling::div[@class='control_indicator']
${input_recredit_no}    //input[@id="isReCredit"][@value='N']/following-sibling::div[@class='control_indicator']
${select_recredit}    //select[@id='partialFull']
${input_vendorName}    //input[@id='vendor']
${input_counselorName}    //input[@id='firstName']
${input_counselorSurname}    //input[@id='lastName']
${input_baseAmount}    //input[@id='baseAmount']
${input_gst}    //input[@id='gst']
${input_tax}    //input[@id='tax']
${input_commission}    //input[@name='commission']
${input_tixCred_freeFlow1}    //input[@id='freeFlow1']
${input_tixCred_freeFlow2}    //input[@id='freeFlow2']

*** Keywords ***
Fill Up Cancel Segment With Default Values
    Navigate To Page Cancel Segments
    Set Test Variable    ${requestor}    Chuck Velasquez
    Set Test Variable    ${note1}    THIS IS A FREE FLOW TEXT 1
    Set Test Variable    ${note2}    THIS IS A FREE FLOW TEXT 2
    Enter Value    ${input_requestor}    ${requestor}
    Enter Value    ${input_notes1}    ${note1}
    Enter Value    ${input_notes2}    ${note2}
    Set Test Variable    ${cancel_segments_complete}    yes
    [Teardown]    Take Screenshot

Cancel All Segments
    Navigate To Page Cancel Segments
    Set Test Variable    ${requestor}    Chuck Velasquez
    Set Test Variable    ${note1}    THIS IS A FREE FLOW TEXT 1
    Set Test Variable    ${note2}    THIS IS A FREE FLOW TEXT 2
    Enter Value    ${input_requestor}    ${requestor}
    Enter Value    ${input_notes1}    ${note1}
    Enter Value    ${input_notes2}    ${note2}
    Click Element     ${checkbox_cancelAll}
    Set Test Variable   ${cancel_all}    yes
    Set Test Variable    ${cancel_segments_complete}    yes
    [Teardown]    Take Screenshot

Verify Element Contains Text
    [Arguments]    ${element}    ${text}
    ${value}    Get Value    ${element}
    Run Keyword And Continue On Failure    Should Be Equal As Strings    ${value}    ${text}

Verify Cancel Segment Fields Are Defaulted For PNRs Booked Via Concur
    Navigate To Page Cancel Segments
    Verify Element Contains Text    ${input_requestor}    PAX CXLD PNR VIA OBT
    Set Test Variable    ${requestor}    PAX CXLD PNR VIA OBT
    Set Test Variable    ${note1}    PAX CXLD PNR VIA OBT
    Set Test Variable    ${note2}    THIS IS A FREE FLOW TEXT 2
    Enter Value    ${input_notes2}    ${note2}
    Click Element     ${checkbox_cancelAll}
    Set Test Variable   ${cancel_all}    yes
    Set Test Variable    ${cancel_segments_complete}    yes
    [Teardown]    Take Screenshot
    
Verify Expected Cancellation Remarks Are Written
    Assign Current Date
    Finish PNR
    Verify Specific Remark Is Written In The PNR    RMX ${current_date}/CANCEL REQUESTED BY ${requestor.upper()}
    Verify Specific Remark Is Written In The PNR    RMX ${current_date}/${note1}
    Run Keyword If    "${note2}" != "${EMPTY}"     Verify Specific Remark Is Written In The PNR    RMX ${current_date}/${note2}
    Run Keyword If   "${cancel_all}" == "yes"     Verify Specific Remark Is Written In The PNR    RIR *FULLCXL**${current_date}    
    ...    ELSE    Verify Specific Remark Is Not Written In The PNR    RIR *FULLCXL**
    Run Keyword If    "${reason.upper()}" == "NON REFUNDABLE TICKET CANCELLED DUE TO IROP" or "${reason.upper()}" == "NON REFUNDABLE TICKET CANCELLED DUE TO SCHEDULE CHANGE"
    ...      Verify Specific Remark Is Written In The PNR    RMX ${current_date}/CANCEL NR DUE TO IROP OR SKD CHG
    Verify Expected Remarks Are Written In The PNR

Verify NonBSP Ticket Credit from Supplier Remark For PNRs With No U*14
    Assign Current Date
    Finish PNR
    Verify Specific Remark Is Written In The PNR    RMX DOCUBANK/TKT 1234567890/${current_date}
    
Cancel Segment ${segment} Using Cryptic Command
    Enter Cryptic Command    XE${segment}
    Enter Cryptic Command    RT
    
Cancel Segments ${segments} Via UI
    Navigate To Page Cancel Segments
    Set Test Variable    ${requestor}    Chuck Velasquez
    Set Test Variable    ${note1}    THIS IS A FREE FLOW TEXT 1
    Set Test Variable    ${note2}    THIS IS A FREE FLOW TEXT 2
    Tick Checkbox For Segments ${segments}
    Enter Value    ${input_requestor}    ${requestor}
    Enter Value    ${input_notes1}    ${note1}
    Enter Value    ${input_notes2}    ${note2}
    Set Test Variable   ${cancel_all}    no
    Take Screenshot
    
Tick Checkbox For Segments ${segments}
    @{segments}    Split String    ${segments}    ,
    :FOR   ${segment}    IN    @{segments}
    \    ${segment_index}     Evaluate     ${segment} - 2
    \    Select Checkbox    ${checkbox_segment_start}${segment_index}${checkbox_segment_end}
    
Cancel UA Segment With Reason ${reason}
    Cancel All Segments
    Select UA Reason For Cancel: ${reason}
    Take Screenshot
    Set Test Variable    ${cancel_segments_complete}    yes

Select UA Reason For Cancel: ${reason}
    ${reason_value}    Set Variable If     "${reason.upper()}" == "24 HOURS REFUND"    1
    ...    "${reason.upper()}" == "VOLUNTARY CANCEL"    2
    ...    "${reason.upper()}" == "UA FLIGHT NOT TICKETED YET"    3
    ...    "${reason.upper()}" == "NON REFUNDABLE TICKET CANCELLED DUE TO IROP"    4
    ...    "${reason.upper()}" == "NON REFUNDABLE TICKET CANCELLED DUE TO SCHEDULE CHANGE"    5  
    Select From List By Value    ${list_reasonUACancel}     ${reason_value}
    Run Keyword If    "${reason.upper()}" == "NON REFUNDABLE TICKET CANCELLED DUE TO IROP" or "${reason.upper()}" == "NON REFUNDABLE TICKET CANCELLED DUE TO SCHEDULE CHANGE"
    ...    Enter Value    ${input_airlineNo}    1074
    Set Test Variable    ${reason}    

Cancel AC Segment With Reason ${reason}
    Cancel All Segments
    Select AC Reason For Cancel: ${reason}
    Take Screenshot
    Set Test Variable    ${cancel_segments_complete}    yes
    
Cancel Segment For Non BSP Ticket Credit, No Re-credit Fee and Re-credit is Full
    Cancel All Segments
    Select From List By Label    ${list_followUp}     Non BSP Ticket Recredit
    Wait Until Element Is Visible    ${input_recredit_no}    10
    Click Element    ${input_recredit_no}
    Select From List By Label    ${select_recredit}    Full Re-Credit
    Wait Until Element Is Visible    ${input_vendorName}    10
    Enter Value    ${input_vendorName}    ACY
    Enter Value    ${input_counselorName}    P
    Enter Value    ${input_counselorSurname}    FISHER
    Take Screenshot
    # Set Test Variable    ${non_bsp_ticket_credit_complete}    yes
    
Cancel Segment For Non BSP Ticket Credit, No Re-credit Fee and Re-credit is Partial
    Cancel All Segments
    Select From List By Label    ${list_followUp}     Non BSP Ticket Recredit
    Wait Until Element Is Visible    ${input_recredit_no}    10
    Click Element    ${input_recredit_no}
    Select From List By Label    ${select_recredit}    Partial Re-Credit
    Wait Until Element Is Visible    ${input_vendorName}    10
    Enter Value    ${input_vendorName}    PFS
    Enter Value    ${input_counselorName}    J
    Enter Value    ${input_counselorSurname}    ROBINSON
    Enter Value    ${input_baseAmount}    123.45
    Enter Value    ${input_gst}    6.70
    Enter Value    ${input_tax}    8.90
    Enter Value    ${input_commission}    0.12
    Enter Value    ${input_tixCred_freeFlow1}    THIS IS A SAMPLE
    Enter Value    ${input_tixCred_freeFlow2}    OF A FREE FLOW TEXT
    Take Screenshot
    # Set Test Variable    ${non_bsp_ticket_credit_complete}    yes

Select AC Reason For Cancel: ${reason}
    Log    ${reason.upper()}
    ${reason_value}    Set Variable If     "${reason.upper()}" == "NAME CORRECTION NCC WITH OAL"     1
    ...    "${reason.upper()}" == "NAME CORRECTION NCC LEGAL NAME WITH OAL"     2
    ...    "${reason.upper()}" == "DUPLICATE TICKETS"     3
    ...    "${reason.upper()}" == "24 HOURS REFUND"     4
    ...    "${reason.upper()}" == "DEATH OF PAX OR TRAVELLING COMPANION"     5
    ...    "${reason.upper()}" == "IRROP: WILL REFUND PROCESS DUE IRROP"     6
    ...    "${reason.upper()}" == "VOLUNTARY CANCEL"     7
    ...    "${reason.upper()}" == "AC FLIGHT NOT TICKETED YET"     8
    ...    "${reason.upper()}" == "UNACCEPTABLE SCHEDULE CHANGE"     9
    ...    "${reason.upper()}" == "UNACCEPTABLE DELAY GREATER THAN 2 HRS"     10
    ...    "${reason.upper()}" == "JURY/MILITARY DUTY"     11
    Select From List By Value    ${list_reasonACCancel}     ${reason_value}
    Run Keyword If    ${reason_value} == 5     Select Relationship: Companion
    Run Keyword If    ${reason_value} == 6 or ${reason_value} == 9 or ${reason_value} == 10
    ...    Enter Value    ${input_acFlightNo}    1074
    Run Keyword If    ${reason_value} == 11    Enter Value     ${input_acCancelMonth}    03
    Run Keyword If    ${reason_value} == 11    Enter Value     ${input_acCancelYear}    20
    Run Keyword If    ${reason_value} == 1 or ${reason_value} == 2 or ${reason_value} == 3     Input AC Ticket Number: 1234567890
    Run Keyword If    ${reason_value} == 1 or ${reason_value} == 2 or ${reason_value} == 3     Select From List By Value     ${list_acpassengerNo}    1
    Set Test Variable    ${reason}

Input AC Ticket Number: ${ticket_number}
    Wait Until Element Is Visible    ${input_acTicketNo}
    Enter Value    ${input_acTicketNo}    ${ticket_number}
    
Select Relationship: ${relationship}
    ${relationship_value}     Set Variable If     "${relationship.upper()}" == "FATHER"     FTHR
    ...    "${relationship.upper()}" == "MOTHER"     MTHR
    ...    "${relationship.upper()}" == "SISTER"     SIST
    ...    "${relationship.upper()}" == "BROTHER"     BROT
    ...    "${relationship.upper()}" == "GRANDMOTHER"     GMTH
    ...    "${relationship.upper()}" == "GRANDFATHER"     GFTH
    ...    "${relationship.upper()}" == "CHILD"     CHLD
    ...    "${relationship.upper()}" == "GRANDCHILD"     GCHL
    ...    "${relationship.upper()}" == "COMPANION"     COMP    
    Select From List By Value    ${list_relationship}    ${relationship_value}     

Verify Agent Is Unable To Cancel Segments Due To Existing Power Hotel Segment
    Navigate To Page CWT Corporate
    Wait Until Page Contains Element    ${button_cancel_segments}     180
    Click Element At Coordinates    ${button_cancel_segments}    0    0
    Wait Until Page Contains Element   ${warning_message}    30
    Run Keyword And Continue On Failure    Page Should Contain    Power Hotel segment(s) must be cancelled in Power Hotel first before launching cancellation script
    
Click NonBSP Ticket Credit Tab
    Wait Until Element Is Visible    ${tab_nonBspTicketCredit}    30
    Click Element    ${tab_nonBspTicketCredit}        
    Set Test Variable    ${current_page}    NonBSP Ticket Credit
    
Click Cancel Segments Tab
    Wait Until Element Is Visible    ${tab_CancelSegments}    30
    Click Element    ${tab_CancelSegments}        
    Set Test Variable    ${current_page}    Cancel Segments
    
Fill Up NonBSP Ticket Credit With Default Values For PNRs With No U*14
    Cancel All Segments
    Select From List By Label    ${list_followUp}     Non BSP Ticket Recredit
    Wait Until Element Is Visible    ${list_followUp}    10
    Enter Value    ${input_ticketNum}    1234567890
    # Set Test Variable    ${non_bsp_ticket_credit_complete}    yes
    
Verify That NonBSP Ticket Credit from Supplier Remarks Should Be Written When There Is No Re-credit Fee and Re-credit is Full
    Assign Current Date
    Finish PNR
    Verify Specific Remark Is Written In The PNR    RMX ATTN ACCTNG - NONBSP FULL RECREDIT - ${current_date}
    Verify Specific Remark Is Written In The PNR    RMX . NONBSP..ACY - ISSUE OID YTOWL2106
    Verify Specific Remark Is Written In The PNR    RMX . ${current_date}/ FISHER P.
    Open Command Page
    Enter Cryptic Command    RTQ
    Run Keyword And Continue On Failure    Element Should Contain    ${text_area_command}    YTOWL210E${SPACE}${SPACE}${SPACE}${SPACE}060${SPACE}${SPACE}${SPACE}${SPACE}001
    [Teardown]    Take Screenshot
    
Verify That NonBSP Ticket Credit from Supplier Remarks Should Be Written When There Is No Re-credit Fee and Re-credit is Partial
    Assign Current Date
    Finish PNR
    Verify Specific Remark Is Written In The PNR    RMX ATTN ACCTNG - NONBSP PART RECREDIT - ${current_date}
    Verify Specific Remark Is Written In The PNR    RMX . NONBSP..ACY - ISSUE OID YTOWL2106
    Verify Specific Remark Is Written In The PNR    RMX . RECREDIT BASE AMOUNT 123.45 GST 6.70 TAX 8.90
    Verify Specific Remark Is Written In The PNR    RMX . RECREDIT COMMISSION 0.12
    Verify Specific Remark Is Written In The PNR    RMX . THIS IS A SAMPLE
    Verify Specific Remark Is Written In The PNR    RMX . OF A FREE FLOW TEXT
    Verify Specific Remark Is Written In The PNR    RMX . ${current_date}/ ROBINSON J.
    Open Command Page
    Enter Cryptic Command    RTQ
    Run Keyword And Continue On Failure    Element Should Contain    ${text_area_command}    YTOWL210E${SPACE}${SPACE}${SPACE}${SPACE}060${SPACE}${SPACE}${SPACE}${SPACE}001
    [Teardown]    Take Screenshot