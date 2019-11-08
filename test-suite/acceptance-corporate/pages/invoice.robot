*** Settings ***
Library           String
Library           SeleniumLibrary
Library           Collections
Library           Screenshot
Resource          base.robot

*** Variables ***
${input_invoice}    css=#invoiceNo
${list_invoice}    //app-generic-select[@id='invoiceNo']//li[@role='menuitem']
${input_eticket}   css=#eTicketNo
${list_eticket}    //app-generic-select[@id='eTicketNo']//li[@role='menuitem']
${input_fees}    css=#feesAccountingNo
${list_fees}     //app-generic-select[@id='feesAccountingNo']//li[@role='menuitem']
${input_nonBsp_accounting}     css=#nonBspAccountingNo
${list_nonBsp_accounting}    //app-generic-select[@id='nonBspAccountingNo']//li[@role='menuitem']
${input_email}    //input[@id='emailAddress']
${form_email}    //div[@formarrayname='emailAddresses']
${button_emailAdd}    //div[@formarrayname='emailAddresses']//i[@id='add']
${checkbox_select}    //input[@type='checkbox']

*** Keywords ***
Add Multiple Email Address
    [Arguments]    @{email_address}
    Set Test Variable    ${div_index}    1
    :FOR    ${email_address}    IN    @{email_address}
    \    Click Element    ${form_email}${open_bracket}${div_index}${close_bracket}${input_email} 
    \    Enter Value    ${form_email}${open_bracket}${div_index}${close_bracket}${input_email}    ${email_address} 
    \    Click Element    ${button_emailAdd}
    \    ${div_index}    Evaluate  ${div_index} + 1
    
Get Invoice And E-tickets Remarks From PNR
    Switch To Graphic Mode
    Get PNR Details
    Get Invoice Remarks
    Get E-Eticket Remarks From PNR
    Switch To Command Page
    
Get Invoice Remarks
    ${invoice_remarks}    Get Lines Containing String    ${pnr_details}    FI PAX 0000000000 INV    
    Set Test Variable    ${invoice_remarks}
    @{inv_remarks}    Split String    ${invoice_remarks}     FI
    ${inv_remarks[1]}   Fetch from Left   ${inv_remarks[1]}    /S2
    Set Test Variable   ${inv_remarks[1]}
    Set Test Variable   ${inv_remarks[2]}

Get E-Eticket Remarks From PNR
    ${eticket_remarks}    Get Lines Containing String    ${pnr_details}    FA PAX    
    Set Test Variable    ${eticket_remarks}
    @{eticket}    Split String    ${eticket_remarks}     FA PAX
    ${eticket[1]}   Fetch From Left    ${eticket[1]}    /ETAC
    ${eticket[2]}   Fetch From Left    ${eticket[2]}    /ETAC
    ${eticket[1]}    Replace String     ${eticket[1]}    -    ${EMPTY}
    ${eticket[2]}    Replace String     ${eticket[2]}    -    ${EMPTY}
    Set Test Variable   ${eticket[1]}
    Set Test Variable   ${eticket[2]}

Select Invoices From The List
    [Arguments]    @{invoice_number}
    Wait Until Element Is Visible    ${input_invoice}    
    Click Element    ${input_invoice}
    Wait Until Element Is Visible    ${list_invoice}    30
    :FOR    ${invoice_number}    IN    @{invoice_number}
    \    Click Element    ${list_invoice}${open_bracket}${invoice_number}${close_bracket}${checkbox_select}
    Click Element    ${input_invoice}
    
Select E-Tickets To ReSend
    [Arguments]    @{eticket_number}
    Wait Until Element Is Visible    ${input_eticket}    
    Click Element    ${input_eticket} 
    Wait Until Element Is Visible    ${list_eticket}    30
    :FOR    ${eticket_number}    IN    @{eticket_number}
    \    Click Element    ${list_eticket}${open_bracket}${eticket_number}${close_bracket}${checkbox_select}
    Click Element    ${input_eticket} 
    
Select Fee Accounting Lines From The List
    [Arguments]    @{fee_number}
    Wait Until Element Is Visible    ${input_fees}    
    Click Element    ${input_fees} 
    Wait Until Element Is Visible    ${list_fees}     30
    :FOR    ${fee_number}    IN    @{fee_number}
    \    Click Element    ${list_fees}${open_bracket}${fee_number}${close_bracket}${checkbox_select}
    Click Element    ${input_fees} 
    
Select Non-BSP Accounting Lines From The List
    [Arguments]    @{nonBsp_number}
    Wait Until Element Is Visible    ${input_nonBsp_accounting}    
    Click Element    ${input_nonBsp_accounting} 
    Wait Until Element Is Visible    ${list_nonBsp_accounting}     30
    :FOR    ${nonBsp_number}    IN    @{nonBsp_number}
    \    Click Element    ${list_nonBsp_accounting}${open_bracket}${nonBsp_number}${close_bracket}${checkbox_select}
    Click Element    ${input_nonBsp_accounting} 
    
Complete PNR And Send Cryptic For Invoice
    Complete The PNR With Default Values
    Sleep    5
    Close CA Corporate Test
    Ticket TST1
    Ticket TST2
    Send Invoice Cryptic Command    RT    RFCWTPTEST    INV/ZX
    Enter Cryptic Command    RT${actual_record_locator}
    Get Invoice And E-tickets Remarks From PNR
    
Complete PNR Without Sending Cryptic For Invoice
    Complete The PNR With Default Values
    Close CA Corporate Test
    Get Record Locator Value
    Ticket TST1
    Ticket TST2
    Get Invoice And E-tickets Remarks From PNR
 
Send Invoice Cryptic Command
    [Arguments]    @{gds_commands}
    Wait Until Element Is Visible    ${label_command_page}    180
    :FOR    ${gds_command}    IN    @{gds_commands}
    \    Enter Cryptic Command    ${gds_command}

Click Send Invoice Button
    [Arguments]    ${close_corporate_test}=yes
    Wait Until Page Contains Element    ${button_submit_pnr}    30
    Scroll Element Into View     ${button_submit_pnr}
    Click Button    ${button_submit_pnr}
    Wait Until Element Is Not Visible     ${message_updatingPnr}    180
    Wait Until Element Is Visible    ${button_full_wrap}    180
    Set Test Variable    ${current_page}     CWT Corporate 
    Run Keyword If     "${close_corporate_test}" == "yes"     Close CA Corporate Test

Select Invoice And E-Tickets To Resend And Add Email
    Navigate To Page Send Invoice/Itinerary
    Select Invoices From The List    2
    Select E-Tickets To ReSend    2
    Enter Value    ${input_email}     InvoiceTest@email.com
    Take Screenshot
    Click Send Invoice Button

Select All Invoice And All E-tickets To Resend And Add Multiple Emails
    Navigate To Page Send Invoice/Itinerary
    Select Invoices From The List    1
    Select E-Tickets To ReSend    1
    Add Multiple Email Address    invoice_test1@cwt.com    invoice_test2@cwt.com
    Take Screenshot
    Click Send Invoice Button

Select All Invoices And No E-tickets And Add Email
    Navigate To Page Send Invoice/Itinerary
    Select Invoices From The List    1
    Select E-Tickets To ReSend    4
    Enter Value    ${input_email}     InvoiceTest@email.com
    Take Screenshot
    Click Send Invoice Button
    
Select Fee Accounting Lines 
    Navigate To Page Send Invoice/Itinerary
    Select Fee Accounting Lines From The List    1    2
    Take Screenshot
    Click Send Invoice Button
    
Select Non-BSP Accounting Lines 
    Navigate To Page Send Invoice/Itinerary
    Select Non-BSP Accounting Lines From The List    1    2
    Take Screenshot
    Click Send Invoice Button

Select All Fees and Non-BSP Accounting Lines
    Navigate To Page Send Invoice/Itinerary
    Select Fee Accounting Lines From The List    1    2
    Select Non-BSP Accounting Lines From The List    1    2
    Take Screenshot
    Click Send Invoice Button
    
Select Invoices, E-Tickets, Fee, And Non-BSP Accounting Lines
    Select Invoices From The List    1
    Select E-Tickets To ReSend    1
    Select Fee Accounting Lines From The List    1
    Select Non-BSP Accounting Lines From The List    1
    Enter Value    ${input_email}     InvoiceTest@email.com
    Take Screenshot
    Click Send Invoice Button
      
Verify That Invoice Remark Is Deleted, Selected Ticket Is Written And Email Is Updated
    Switch To Graphic Mode
    Get PNR Details
    Verify Expected Remarks Are Written In The PNR
    Verify Unexpected Remarks Are Not Written In The PNR
    Verify Specific Remark Is Written In The PNR    RMZ SPCL-TKT-${eticket[1]}
    Verify Specific Remark Is Not Written In The PNR    RMZ SPCL-TKT-${eticket[2]} 
    Verify Specific Remark Is Written In The PNR    ${inv_remarks[1]}   
    Verify Specific Remark Is Not Written In The PNR    ${inv_remarks[2]}
     
Verify That All Selected Invoices And Tickets And Email Added Are Written
    Switch To Graphic Mode
    Get PNR Details
    Verify Expected Remarks Are Written In The PNR
    Verify Unexpected Remarks Are Not Written In The PNR
    Verify Specific Remark Is Written In The PNR    RMZ SPCL-TKT-${eticket[1]}  
    Verify Specific Remark Is Written In The PNR    RMZ SPCL-TKT-${eticket[2]} 
    Verify Specific Remark Is Written In The PNR    ${inv_remarks[1]}   
    Verify Specific Remark Is Written In The PNR    ${inv_remarks[2]}
    
Verify That Invoice Remark Is Deleted, RMZ Ticket Is Written And Email Is Updated
    Switch To Graphic Mode
    Get PNR Details
    Verify Expected Remarks Are Written In The PNR
    Verify Unexpected Remarks Are Not Written In The PNR
    Verify Specific Remark Is Written In The PNR    ${inv_remarks[1]} 
    Verify Specific Remark Is Written In The PNR    RMZ SPCL-TKT0   
    Verify Specific Remark Is Not Written In The PNR    ${inv_remarks[2]}

Verify That Accounting Remarks Are Written
    Switch To Graphic Mode
    Get PNR Details
    Verify Expected Remarks Are Written In The PNR
    Verify Unexpected Remarks Are Not Written In The PNR
    
Verify That All Selected Invoices, Tickets, Fess, Non-BSP And Email Added Are Written
    Switch To Graphic Mode
    Get PNR Details
    Verify Expected Remarks Are Written In The PNR
    Verify Unexpected Remarks Are Not Written In The PNR
    Verify Specific Remark Is Written In The PNR    RMZ SPCL-TKT-${eticket[1]}  
    Verify Specific Remark Is Written In The PNR    RMZ SPCL-TKT-${eticket[2]} 
    Verify Specific Remark Is Written In The PNR    ${inv_remarks[1]}   
    Verify Specific Remark Is Written In The PNR    ${inv_remarks[2]}

Verify That PNR Is Correctly Queued
    Open Command Page
    Enter Cryptic Command    RTQ 
    Element Should Contain    ${text_area_command}    YTOWL210E${SPACE}${SPACE}${SPACE}${SPACE}066${SPACE}${SPACE}${SPACE}${SPACE}001    
    
    





