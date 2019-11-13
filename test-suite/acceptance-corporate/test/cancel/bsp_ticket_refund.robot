*** Settings ***
Force Tags        corp
Library           String
Resource          ../../pages/base.robot
Test Teardown    Close All Browsers

*** Variables ***
${test_file_name}    bsp_ticket_refund
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

*** Test Cases ***
Verify BSP Ticket Refund Is Written In The PNR Upon Cancel When RM*BB Remark and "RMB/Aqua updated" Remark Values Are Equal
    [tags]    us11191
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For BSP Ticket Refund
    Complete PNR And Ticket TST1
    Cancel Segments For BSP Ticket Refund
    Verify Refund Remarks Are Written In The PNR
    
Verify BSP Ticket Refund Is Written In The PNR When RM*BB Remark and "RMB/Aqua updated" Remark Values Are Not Equal
    [tags]    us11191
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For BSP Ticket Refund With Mismatch BB Remark
    Complete PNR And Ticket TST1
    Cancel Segments For BSP Ticket Refund
    Verify Refund Remarks Are Written In The PNR
    
Verify Non BSP Ticket Refund Is Written In The PNR When Full Refund Is Selected
    [tags]    us11191
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Non BSP Ticket Refund
    Complete PNR And Ticket TST1
    Cancel Segments For Non BSP Ticket Full Refund
    Verify Non BSP Full Refund Remarks Are Written In The PNR
    
Verify Non BSP Ticket Refund Is Written In The PNR When Partial Refund Is Selected
    [tags]    us11191
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Non BSP Ticket Refund
    Complete PNR And Ticket TST1
    Cancel Segments For Non BSP Ticket Partial Refund
    Verify Non BSP Partial Refund Remarks Are Written In The PNR
    
*** Keywords ***
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
    ...    ELSE IF    "${refund_type}" == "Partial"    Verify Specific Remark Is Written In The PNR    RMX . REFUND COMMISSION ${commission} - ORIG INV ${invoice}
    Run Keyword If    "${refund_type}" == "Partial"    Verify Specific Remark Is Written In The PNR    RMX . REFUND BASE AMOUNT ${base_amount} GST ${gst} TAX ${other_tax}      
    Verify Specific Remark Is Written In The PNR    RMX . ${free_flow_1}
    Verify Specific Remark Is Written In The PNR    RMX . ${free_flow_2}
    Verify Cancelled For Non BSP Refund PNR IS Queued Correctly    
    