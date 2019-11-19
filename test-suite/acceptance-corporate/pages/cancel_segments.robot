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
${text_warningMessage}   //div[@class='col message']
${list_voidOption}    //select[@id='voidOption']
${input_recredit_yes}    //input[@id="isReCredit"][@value='Y']/following-sibling::div[@class='control_indicator']
${input_recredit_no}    //input[@id="isReCredit"][@value='N']/following-sibling::div[@class='control_indicator']
${select_recredit}    //select[@id='partialFull']
${input_vendorName_ticketCredit}    //input[@id='vendor']
${input_counselorName}    //input[@id='firstName']
${input_counselorSurname}    //input[@id='lastName']
${input_baseAmount}    //input[@id='baseAmount']
${input_gst}    //input[@id='gst']
${input_tax}    //input[@id='tax']
${input_commission_ticketCredit}    //input[@name='commission']
${input_tixCred_freeFlow1}    //input[@id='freeFlow1']
${input_tixCred_freeFlow2}    //input[@id='freeFlow2']
${input_futureTicket_start}    //div[@ng-reflect-name='
${input_ticket_futureTicket_end}    ']//input[@formcontrolname='ticket']
${input_coupon_futureTicket_end}    ']//input[@formcontrolname='coupon']
${i_add_futureTicket_end}    ']//i[@id='add']
${input_cFirstInitial}     //input[@id='cFirstInitial']
${input_cLastName}    //input[@id='cLastName']
${checkbox_ticketVoidList}    //div[@formarrayname='ticketVoidList']//input
${list_reuseCC}    //select[@id='reuseCC']
${input_authorization}    //input[@id='authorization']
${list_vRsnOption}     //select[@id='vRsnOption']
${list_reverseItem}    //select[@id='reverseItem']
${input_otherDetails1}    //input[@id='otherDetails1']
${input_otherDetails2}    //input[@id='otherDetails2']
${text_voidWarningMessage}    //label[@style='color: red']
${checkbox_refund_ticket}    //input[@id='checked']
${input_refund_coupon}     //input[@id='coupon']
${list_partialFull}    //select[@id='partialFull']
${input_supplier}    //input[@id='supplier']
${input_invoice}   //input[@id='invoice']
${input_refundAmount}    //input[@id='refundAmount']
${input_commission}    //input[@formcontrolname='commission']
${input_baseAmount}    //input[@id='baseAmount']
${input_gst}    //input[@id='gst']
${input_otherTax}    //input[@formcontrolname='tax']
${input_freeFlow1}    //input[@id='freeFlow1']
${input_freeFlow2}    //input[@id='freeFlow2']
${list_agent_assisted}     css=#ebR
${input_tool_identifier}    //input[@formcontrolname='ebT']
${input_online_format}     //input[@formcontrolname='ebN']
${list_touch_reason}     css=#ebC


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
    Set Test Variable    ${cancel_all}    yes
    Set Test Variable    ${actual_reason}    ${EMPTY}
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
    Set Test Variable    ${actual_reason}    ${EMPTY}
    [Teardown]    Take Screenshot

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
    Set Test Variable    ${actual_reason}    ${EMPTY}
    [Teardown]    Take Screenshot
    
Verify Cancel Segment Fields Are Defaulted For PNRs Voided And Booked Via Concur
    Navigate To Page Cancel Segments
    Select From List By Value    ${list_voidOption}    VoidComplete
    Sleep    2
    Take Screenshot
    Verify Element Contains Text    ${input_requestor}    PAX Cancelled BSP PNR on OBT
    Set Test Variable    ${requestor}    PAX Cancelled BSP PNR on OBT
    Set Test Variable    ${note1}    PAX Cancelled BSP PNR on OBT
    Set Test Variable    ${note2}    THIS IS A FREE FLOW TEXT 2
    Enter Value    ${input_notes2}    ${note2}
    Click Element     ${checkbox_cancelAll}
    Set Test Variable   ${cancel_all}    yes
    Set Test Variable    ${cancel_segments_complete}    yes
    Set Test Variable    ${actual_reason}    ${EMPTY}
    [Teardown]    Take Screenshot
    
Verify Expected Cancellation Remarks Are Written
    Assign Current Date
    Finish PNR
    Verify Specific Remark Is Written In The PNR    RMX ${current_date}/CANCEL REQUESTED BY ${requestor.upper()}
    Verify Specific Remark Is Written In The PNR    RMX ${current_date}/${note1.upper()}
    Run Keyword If    "${note2}" != "${EMPTY}"     Verify Specific Remark Is Written In The PNR    RMX ${current_date}/${note2.upper()}
    Run Keyword If   "${cancel_all}" == "yes"     Verify Specific Remark Is Written In The PNR    RIR *FULLCXL**${current_date}    
    ...    ELSE    Verify Specific Remark Is Not Written In The PNR    RIR *FULLCXL**
    Run Keyword If    "${actual_reason.upper()}" == "NON REFUNDABLE TICKET CANCELLED DUE TO IROP" or "${actual_reason.upper()}" == "NON REFUNDABLE TICKET CANCELLED DUE TO SCHEDULE CHANGE"
    ...      Verify Specific Remark Is Written In The PNR    RMX ${current_date}/CANCEL NR DUE TO IROP OR SKD CHG
    Verify Expected Remarks Are Written In The PNR
    Verify Historical Remarks Are Written In The PNR
    
Verify Historical Remarks Are Written In The PNR
    ${exists}     Run Keyword And Return Status      Should Not Be Empty    ${historical_remark_1}
    Run Keyword If    "${exists}" == "True"    Get Booking File History
    : FOR    ${i}    IN RANGE   0    99
    \    ${i}    Evaluate    ${i} + 1
    \    ${exists}     Run Keyword And Return Status      Should Not Be Empty    ${historical_remark_${i}}
    \    Run Keyword If    "${exists}" == "True" and "${historical_remark_${i}}" != "None"     Verify Specific Remark Is Written In The PNR   ${historical_remark_${i}}
    \    Exit For Loop If    "${exists}" == "False"

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
    Set Test Variable    ${actual_reason}    ${EMPTY}
    Set Test Variable    ${cancel_segments_complete}    yes
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

Select UA Reason For Cancel: ${reason}
    ${reason_value}    Set Variable If     "${reason.upper()}" == "24 HOURS REFUND"    1
    ...    "${reason.upper()}" == "VOLUNTARY CANCEL"    2
    ...    "${reason.upper()}" == "UA FLIGHT NOT TICKETED YET"    3
    ...    "${reason.upper()}" == "NON REFUNDABLE TICKET CANCELLED DUE TO IROP"    4
    ...    "${reason.upper()}" == "NON REFUNDABLE TICKET CANCELLED DUE TO SCHEDULE CHANGE"    5  
    Select From List By Value    ${list_reasonUACancel}     ${reason_value}
    Run Keyword If    "${reason.upper()}" == "NON REFUNDABLE TICKET CANCELLED DUE TO IROP" or "${reason.upper()}" == "NON REFUNDABLE TICKET CANCELLED DUE TO SCHEDULE CHANGE"
    ...    Enter Value    ${input_airlineNo}    1074
    Set Test Variable    ${actual_reason}    ${reason}    

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
    Wait Until Element Is Visible    ${input_vendorName_ticketCredit}    10
    Enter Value    ${input_vendorName_ticketCredit}    ACY
    Enter Value    ${input_counselorName}    P
    Enter Value    ${input_counselorSurname}    FISHER
    Take Screenshot
    
Cancel Segment For Non BSP Ticket Credit, No Re-credit Fee and Re-credit is Partial
    Cancel All Segments
    Select From List By Label    ${list_followUp}     Non BSP Ticket Recredit
    Wait Until Element Is Visible    ${input_recredit_no}    10
    Click Element    ${input_recredit_no}
    Select From List By Label    ${select_recredit}    Partial Re-Credit
    Wait Until Element Is Visible    ${input_vendorName_ticketCredit}    10
    Enter Value    ${input_vendorName_ticketCredit}    PFS
    Enter Value    ${input_counselorName}    J
    Enter Value    ${input_counselorSurname}    ROBINSON
    Enter Value    ${input_baseAmount}    123.45
    Enter Value    ${input_gst}    6.70
    Enter Value    ${input_tax}    8.90
    Enter Value    ${input_commission_ticketCredit}    0.12
    Enter Value    ${input_tixCred_freeFlow1}    THIS IS A SAMPLE
    Enter Value    ${input_tixCred_freeFlow2}    OF A FREE FLOW TEXT
    Take Screenshot

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
    Set Test Variable    ${actual_reason}    ${reason}

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
    Click Element At Coordinates    ${button_cancel_segments}    0    0
    Wait Until Page Contains Element   ${text_warningMessage}    30
    Run Keyword And Continue On Failure    Page Should Contain    Power Hotel segment(s) must be cancelled in Power Hotel first before launching cancellation script
    Take Screenshot
    
Click Cancel Segments Tab
    Wait Until Element Is Visible    ${tab_CancelSegments}    30
    Click Element    ${tab_CancelSegments}        
    Set Test Variable    ${current_page}    Cancel Segments
    
Fill Up NonBSP Ticket Credit With Default Values For PNRs With No U*14
    Cancel All Segments
    Select From List By Label    ${list_followUp}     Non BSP Ticket Recredit
    Wait Until Element Is Visible    ${list_followUp}    10
    Enter Value    ${input_ticketNum}    1234567890
    
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
    Verify Specific Remark Is Written In The PNR    RMX . NONBSP..PFS - ISSUE OID YTOWL2106
    Verify Specific Remark Is Written In The PNR    RMX . RECREDIT BASE AMOUNT 123.45 GST 6.70 TAX 8.90
    Verify Specific Remark Is Written In The PNR    RMX . RECREDIT COMMISSION 0.12
    Verify Specific Remark Is Written In The PNR    RMX . THIS IS A SAMPLE
    Verify Specific Remark Is Written In The PNR    RMX . OF A FREE FLOW TEXT
    Verify Specific Remark Is Written In The PNR    RMX . ${current_date}/ ROBINSON J.
    Open Command Page
    Enter Cryptic Command    RTQ
    Run Keyword And Continue On Failure    Element Should Contain    ${text_area_command}    YTOWL210E${SPACE}${SPACE}${SPACE}${SPACE}060${SPACE}${SPACE}${SPACE}${SPACE}001
    [Teardown]    Take Screenshot
    
Fill Up BSP Ticket Keep For Future Travel
    Cancel All Segments
    Wait Until Element Is Visible    ${list_followUp}    30
    Select From List By Label    ${list_followUp}    BSP Keep Ticket for Future Travel/Cancel Segments Only
    Take Screenshot
    
Verify BSP Ticket Keep For Future Travel Remarks
    Assign Current Date
    Finish PNR
    Verify Specific Remark Is Written In The PNR    TK TL${current_date}/YTOWL2106/Q8C1-CXL
    Verify Specific Remark Is Written In The PNR    RM AQUA CHG-RM*BB/-123456
    Verify Specific Remark Is Written In The PNR    RM *BB/-123456
    Open Command Page
    Enter Cryptic Command    RTQ
    Run Keyword And Continue On Failure    Element Should Contain    ${text_area_command}    YTOWL2106${SPACE}${SPACE}${SPACE}${SPACE}070${SPACE}${SPACE}${SPACE}${SPACE}000
    [Teardown]    Take Screenshot
    
Fill Up Non-BSP Ticket Keep For Future Travel With ${number_of} Ticket/s And Coupon/s
    Cancel All Segments
    Wait Until Element Is Visible    ${list_followUp}    30
    Select From List By Label    ${list_followUp}    Non BSP Keep Ticket for Future Travel/Cancel Segments Only
    Enter ${number_of} Ticket And Coupon Numbers
    [Teardown]    Take Screenshot
    
Enter ${number} Ticket And Coupon Numbers
    ${limit}    Evaluate    ${number} - 1
    : FOR    ${index}    IN RANGE    0    ${number}
    \    Enter Value    ${input_futureTicket_start}${index}${input_ticket_futureTicket_end}    123456789${index}
    \    Enter Value    ${input_futureTicket_start}${index}${input_coupon_futureTicket_end}    987654321${index}
    \    Run Keyword If    ${index} != ${limit}    Click Element     ${input_futureTicket_start}${index}${i_add_futureTicket_end}
    \    ${index}    Evaluate   ${index} + 1
    Take Screenshot
    
Verify Non-BSP Ticket Keep For Future Travel When RM Aqua Remark and RM BB Remark Are Not The Same
    Assign Current Date
    Finish PNR
    Verify Specific Remark Is Written In The PNR    TK TL${current_date}/YTOWL2106/Q8C1-CXL
    Verify Specific Remark Is Written In The PNR    RM AQUA CHG-RM*BB/-123456
    Verify Specific Remark Is Written In The PNR    RM *BB/-123456
    Verify Specific Remark Is Written In The PNR    RMX DOCUBANK/TKT 1234567890/${current_date}
    Verify Specific Remark Is Written In The PNR    RMX DOCUBANK/TKT 1234567891/${current_date}
    Verify Specific Remark Is Written In The PNR    RMX DOCUBANK/TKT 1234567892/${current_date}
    Verify Specific Remark Is Written In The PNR    RMX DOCUBANK/TKT 1234567893/${current_date}
    Verify Specific Remark Is Written In The PNR    RMX ${current_date}/TKT NBR-1234567890 CPNS-9876543210
    Verify Specific Remark Is Written In The PNR    RMX ${current_date}/TKT NBR-1234567891 CPNS-9876543211
    Verify Specific Remark Is Written In The PNR    RMX ${current_date}/TKT NBR-1234567892 CPNS-9876543212
    Verify Specific Remark Is Written In The PNR    RMX ${current_date}/TKT NBR-1234567893 CPNS-9876543213
    Open Command Page
    Enter Cryptic Command    RTQ
    Run Keyword And Continue On Failure    Element Should Contain    ${text_area_command}    YTOWL2106${SPACE}${SPACE}${SPACE}${SPACE}070${SPACE}${SPACE}${SPACE}${SPACE}000
    [Teardown]    Take Screenshot
    
Verify Non-BSP Ticket Keep For Future Travel When RM Aqua Remark and RM BB Remark Are The Same
    Assign Current Date
    Finish PNR
    Verify Specific Remark Is Written In The PNR    TK TL${current_date}/YTOWL2106/Q8C1-CXL
    Verify Specific Remark Is Written In The PNR    RM AQUA CHG-RM*BB/-123456
    Verify Specific Remark Is Written In The PNR    RM *BB/-123456
    Verify Specific Remark Is Written In The PNR    RMX DOCUBANK/TKT 1234567890/${current_date}
    Verify Specific Remark Is Written In The PNR    RMX ${current_date}/TKT NBR-1234567890 CPNS-9876543210
    Open Command Page
    Enter Cryptic Command    RTQ
    Run Keyword And Continue On Failure    Element Should Contain    ${text_area_command}    YTOWL2106${SPACE}${SPACE}${SPACE}${SPACE}070${SPACE}${SPACE}${SPACE}${SPACE}000
    [Teardown]    Take Screenshot
    
Cancel Segments For BSP Ticket Refund
    Cancel All Segments
    Wait Until Element Is Visible    ${list_followUp}    5
    Select From List By Label    ${list_followUp}    BSP Ticket Refund
    Wait Until Element Is Visible    ${checkbox_refund_ticket}    5
    Click Element    ${checkbox_refund_ticket}
    Sleep    1
    Enter Value    ${input_refund_coupon}     0000012345
    Set Test Variable    ${refund_coupon}    0000012345
    Take Screenshot
    
Verify Refund Remarks Are Written In The PNR
    Finish PNR    queueing=yes
    Assign Current Date
    Verify Specific Remark Is Written In The PNR    RMX REFUND PROCESSED ${ticket_num}
    Verify Specific Remark Is Written In The PNR    RMX TKT NBR - ${ticket_num} CPNS ${refund_coupon}
    Verify Specific Remark Is Written In The PNR    TK TL${current_date}/YTOWL2106/Q8C1-CXL
    Verify Specific Remark Is Written In The PNR    RMB AQUA UPDATED THE BB FROM 123456
    Verify Specific Remark Is Written In The PNR    RM *BB/-123456
    Verify Cancelled For BSP Refund PNR IS Queued Correctly
    
Verify Cancelled For ${type} Refund PNR IS Queued Correctly
    Switch To Command Page
    Enter Cryptic Command    RTQ
    Run Keyword If    "${type}" == "BSP"    Run Keyword And Continue On Failure    Element Should Contain    ${text_area_command}    YTOWL210O${SPACE}${SPACE}${SPACE}${SPACE}041${SPACE}${SPACE}${SPACE}${SPACE}094
    ...    ELSE IF    "${type}" == "Non BSP"     Run Keyword And Continue On Failure    Element Should Contain    ${text_area_command}    YTOWL210O${SPACE}${SPACE}${SPACE}${SPACE}041${SPACE}${SPACE}${SPACE}${SPACE}098

Cancel Segments For Non BSP Ticket ${refund_type} Refund
    Cancel All Segments
    Wait Until Element Is Visible    ${list_followUp}    5
    Select From List By Label    ${list_followUp}    Non BSP Ticket Refund
    Wait Until Element Is Visible    ${list_partialFull}    5
    Select From List By Value    ${list_partialFull}    ${refund_type.lower()}
    Set Test Variable    ${supplier}     WSJ
    Set Test Variable    ${invoice}     000345
    Set Test Variable    ${refund_amount}     1231.00
    Set Test Variable    ${commission}     1.00
    Set Test Variable    ${base_amount}     1000.00
    Set Test Variable    ${gst}     200.00
    Set Test Variable    ${other_tax}     30.00
    Set Test Variable    ${free_flow_1}     FULL REFUND FREEFLOW 1
    Set Test Variable    ${free_flow_2}     FULL REFUND FREEFLOW 2
    Enter Value    ${input_supplier}    ${supplier}
    Enter Value    ${input_invoice}    ${invoice}
    Run Keyword If    "${refund_type}" == "Full"    Enter Value    ${input_refundAmount}    ${refund_amount}
    Enter Value    ${input_commission}    ${commission}
    Run Keyword If    "${refund_type}" == "Partial"    Enter Value    ${input_baseAmount}    ${base_amount}
    Run Keyword If    "${refund_type}" == "Partial"    Enter Value    ${input_gst}    ${gst}
    Run Keyword If    "${refund_type}" == "Partial"    Enter Value    ${input_otherTax}    ${other_tax}
    Enter Value    ${input_freeFlow1}    ${free_flow_1}
    Enter Value    ${input_freeFlow2}    ${free_flow_2}
    Take Screenshot
    
Verify Non BSP ${refund_type} Refund Remarks Are Written In The PNR
    Finish PNR    queueing=yes
    Assign Current Date
    Run Keyword If    "${refund_type}" == "Full"    Verify Specific Remark Is Written In The PNR    RMX ATTN ACCTNG - NONBSP FULL REFUND - ${current_date}
    ...    ELSE IF    "${refund_type}" == "Partial"    Verify Specific Remark Is Written In The PNR    RMX ATTN ACCTNG - NONBSP PART REFUND - ${current_date}
    Verify Specific Remark Is Written In The PNR    RMX . NONBSP..${supplier} - ISSUE OID YTOWL2106 
    Run Keyword If    "${refund_type}" == "Full"    Verify Specific Remark Is Written In The PNR    RMX . REFUND ${refund_amount} - COMMISSION ${commission} - ORIG INV${invoice}
    ...    ELSE IF    "${refund_type}" == "Partial"    Verify Specific Remark Is Written In The PNR    RMX . REFUND COMMISSION ${commission} - ORIG INV${invoice}
    Run Keyword If    "${refund_type}" == "Partial"    Verify Specific Remark Is Written In The PNR    RMX . REFUND BASE AMOUNT ${base_amount} GST ${gst} TAX ${other_tax}      
    Verify Specific Remark Is Written In The PNR    RMX . ${free_flow_1}
    Verify Specific Remark Is Written In The PNR    RMX . ${free_flow_2}
    Verify Cancelled For Non BSP Refund PNR IS Queued Correctly    

Verify Online Fields And Update Agent Assisted And Touch Reason Codes
    Fill Up Cancel Segment With Default Values
    Verify Online Touch Reason Fields Are Populated With Correct Values    CT    A    GI    C
    Update Agent Assisted And Touch Reason Code    AM    S
    
Verify Online Touch Reason Fields Are Populated With Correct Values
    [Arguments]    ${expected_agent_assisted}    ${expected_input_tool_identifier}    ${expected_online_format}    ${expected_touch_reason}
    Navigate To Page Cancel Segments
    ${actual_agent_assisted}     Get Value    ${list_agent_assisted}
    ${actual_input_tool_identifier}     Get Value    ${input_tool_identifier}
    ${actual_online_format}     Get Value    ${input_online_format}
    ${actual_touch_reason}     Get Value    ${list_touch_reason}
    Should Be Equal    ${actual_agent_assisted}    ${expected_agent_assisted}  
    Should Be Equal    ${actual_input_tool_identifier}    ${expected_input_tool_identifier}
    Should Be Equal    ${actual_online_format}    ${expected_online_format}  
    Should Be Equal    ${actual_touch_reason}    ${expected_touch_reason}
    Take Screenshot

Update Agent Assisted And Touch Reason Code
    [Arguments]   ${agent_assisted}    ${touch_reason}
    Select From List By Value    ${list_agent_assisted}    ${agent_assisted} 
    Select From List By Value    ${list_touch_reason}    ${touch_reason}
    Take Screenshot

Verify That Online Touch Reason Fields Are Not Displayed
    Fill Up Cancel Segment With Default Values
    Page Should Not Contain Element    ${list_agent_assisted}
    Page Should Not Contain Element    ${input_tool_identifier} 
    Page Should Not Contain Element    ${input_online_format} 
    Page Should Not Contain Element    ${list_touch_reason}
    Take Screenshot
    
Verify EB Remark Written In The PNR
    Finish PNR
    Verify Expected Remarks Are Written In The PNR