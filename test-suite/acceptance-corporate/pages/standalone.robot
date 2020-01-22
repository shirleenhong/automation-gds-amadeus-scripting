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
${input_consultant_name}    css=#name
${input_consultant_number}    css=#cnNumber
${input_consultant_oid}    css=#officeId
${input_agent_queue}     css=#queue
${input_fare_request}    css=#fareRequest
${checkbox_air}    css=#airFlexibility
${checkbox_date}    css=#dateFlexibility
${checkbox_schedule}    css=#scheduleFlexibility
${input_stopver}    //input[@id='stops']
${input_comments}    //input[@id='comments']
${button_add}    //i[@id='add']
${row_stopver}    //div[@formarrayname='stops']
${row_comments}    //div[@formarrayname='comments']
${input_isTravel_yes}     //input[@id='isTravel'][@value='Y']
${input_isTravel_no}     //input[@id='isTravel'][@value='N']
${list_fee_type}    css=#feeType
${select_fee_segment}    //input[@formcontrolname='genericElement']
${checkbox_supplemental_fee}    //input[@name='enableSupFee']
${button_add_supplemental_fee}    //tbody[@formarrayname='segments']//i[@id='add']


*** Keywords ***
Add Multiple Email Address
    [Arguments]    @{email_address}
    Set Test Variable    ${div_index}    1
    Click Element    ${button_emailAdd}
    :FOR    ${email_address}    IN    @{email_address}
    \    Click Element    ${form_email}${open_bracket}${div_index}${close_bracket}${input_email} 
    \    Enter Value    ${form_email}${open_bracket}${div_index}${close_bracket}${input_email}    ${email_address} 
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
    ${eticket[1]}    Strip String    ${eticket[1]}
    ${eticket[2]}    Strip String     ${eticket[2]}    
    Set Test Variable   ${eticket[1]}
    Set Test Variable   ${eticket[2]}

Select Invoices From The List
    [Arguments]    @{invoice_number}
    Wait Until Element Is Visible    ${input_invoice}    30    
    Click Element    ${input_invoice}
    Wait Until Element Is Visible    ${list_invoice}    30
    :FOR    ${invoice_number}    IN    @{invoice_number}
    \    Click Element    ${list_invoice}${open_bracket}${invoice_number}${close_bracket}${checkbox_select}
    Click Element    ${input_invoice}
    
Select E-Tickets To ReSend
    [Arguments]    @{eticket_number}
    Wait Until Element Is Visible    ${input_eticket}     30   
    Click Element    ${input_eticket} 
    Wait Until Element Is Visible    ${list_eticket}    30
    :FOR    ${eticket_number}    IN    @{eticket_number}
    \    Click Element    ${list_eticket}${open_bracket}${eticket_number}${close_bracket}${checkbox_select}
    Click Element    ${input_eticket} 
    
Select Fee Accounting Lines From The List
    [Arguments]    @{fee_number}
    Wait Until Element Is Visible    ${input_fees}    30
    Click Element    ${input_fees} 
    Wait Until Element Is Visible    ${list_fees}     30
    :FOR    ${fee_number}    IN    @{fee_number}
    \    Click Element    ${list_fees}${open_bracket}${fee_number}${close_bracket}${checkbox_select}
    Click Element    ${input_fees} 
    
Select Non-BSP Accounting Lines From The List
    [Arguments]    @{nonBsp_number}
    Wait Until Element Is Visible    ${input_nonBsp_accounting}    30   
    Click Element    ${input_nonBsp_accounting} 
    Wait Until Element Is Visible    ${list_nonBsp_accounting}     30
    :FOR    ${nonBsp_number}    IN    @{nonBsp_number}
    \    Click Element    ${list_nonBsp_accounting}${open_bracket}${nonBsp_number}${close_bracket}${checkbox_select}
    Click Element    ${input_nonBsp_accounting} 
    
Complete The PNR In Corporate Scripts
    Sleep    5
    Enter Cryptic Command    RT
    Navigate To Page Reporting Remarks
    Submit To PNR    close_corporate_test=no  
    
Complete PNR And Send Cryptic For Invoice
    Complete The PNR In Corporate Scripts
    Sleep    5
    Close CA Corporate Test
    Sleep    2
    Ticket TST1
    Ticket TST2
    Send Invoice Cryptic Command    RT    RFCWTPTEST    INV/ZX
    Enter Cryptic Command    RT${actual_record_locator}
    Get Invoice And E-tickets Remarks From PNR
    
Complete PNR Without Sending Cryptic For Invoice
    Complete The PNR In Corporate Scripts
    Close CA Corporate Test
    Sleep    2
    Ticket TST1
    Ticket TST2
    
Complete PNR In Amadeus Send Cryptic For Invoice
    Enter Cryptic Command     RFCWTPTEST
    Enter Cryptic Command     ER
    Enter Cryptic Command     ER
    Sleep    2
    Ticket TST1
    Ticket TST2
    Send Invoice Cryptic Command    RT    RFCWTPTEST    INV/ZX
    Enter Cryptic Command    RT${actual_record_locator}
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

Verify If Corporate Script Send INV Cryptic Automatically
    Navigate To Page Send Invoice/Itinerary
    Sleep   3
    Close CA Corporate Test
    Get Invoice And E-tickets Remarks From PNR
    
Select All Invoice And All E-tickets To Resend And Add Multiple Emails
    Navigate To Page Send Invoice/Itinerary
    Select Invoices From The List    1
    Select E-Tickets To ReSend    1
    Add Multiple Email Address    invoice_test1@cwt.com    invoice_test2@cwt.com
    Take Screenshot
    Click Send Invoice Button

Select Invoice And No E-tickets And Add Email
    Navigate To Page Send Invoice/Itinerary
    Select Invoices From The List    2
    Select E-Tickets To ReSend    4
    Enter Value    ${input_email}     InvoiceTest@email.com
    Take Screenshot
    Click Send Invoice Button
    
Select Fee Accounting Lines 
    Navigate To Page Send Invoice/Itinerary
    Select Fee Accounting Lines From The List    1    2
    Enter Value    ${input_email}     InvoiceTest@email.com
    Take Screenshot
    Click Send Invoice Button
    
Select Non-BSP Accounting Lines 
    Navigate To Page Send Invoice/Itinerary
    Select Non-BSP Accounting Lines From The List    1    2
    Enter Value    ${input_email}     InvoiceTest@email.com
    Take Screenshot
    Click Send Invoice Button

Select All Fees and Non-BSP Accounting Lines
    Navigate To Page Send Invoice/Itinerary
    Select Fee Accounting Lines From The List    1    2
    Select Non-BSP Accounting Lines From The List    1    2
    Enter Value    ${input_email}     InvoiceTest@email.com
    Take Screenshot
    Click Send Invoice Button
    
Select Invoices, E-Tickets, Fee, And Non-BSP Accounting Lines
    Navigate To Page Send Invoice/Itinerary
    Select Invoices From The List    1
    Select E-Tickets To ReSend    1
    Select Fee Accounting Lines From The List    1    2
    Select Non-BSP Accounting Lines From The List    1    2
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
    Verify Expected Remarks Are Written In The PNR    True
    Verify Unexpected Remarks Are Not Written In The PNR
    Verify Specific Remark Is Not Written In The PNR    RMZ SPCL-TKT
    
Verify That All Selected Invoices, Tickets, Fess, Non-BSP And Email Added Are Written
    Switch To Graphic Mode
    Get PNR Details
    Verify Expected Remarks Are Written In The PNR    True
    Verify Unexpected Remarks Are Not Written In The PNR
    Verify Specific Remark Is Written In The PNR    RMZ SPCL-TKT-${eticket[1]}  
    Verify Specific Remark Is Written In The PNR    RMZ SPCL-TKT-${eticket[2]} 
    Verify Specific Remark Is Written In The PNR    ${inv_remarks[1]}   
    Verify Specific Remark Is Written In The PNR    ${inv_remarks[2]}
    Verify New MAC Remarks Are Written
    
Verify That PNR Is Correctly Queued
    Open Command Page
    Enter Cryptic Command    RTQ 
    Element Should Contain    ${text_area_command}    YTOWL210E${SPACE}${SPACE}${SPACE}${SPACE}066${SPACE}${SPACE}${SPACE}${SPACE}001    

Verify New MAC Remarks Are Written
    Verify Specific Remark Is Written In The PNR     RM *MAC/-SUP-ACY/-LK-MAC1/-AMT-300.00/-PT-13.00RC/-PT-100
    Verify Specific Remark Is Written In The PNR     .00XT/CD-00.00
    Verify Specific Remark Is Written In The PNR     RM *MAC/-LK-MAC1/-FOP-CCVIXXXXXXXXXXXX1111/-EXP-0820/-TK-
    Verify Specific Remark Is Written In The PNR     2211333555/-MP-ALL/-BKN-CON1234567/S2
    Verify Specific Remark Is Written In The PNR     RM *MAC/-SUP-A22/-LK-MAC2/-AMT-150.00/-PT-10.00RC/-PT-20.
    Verify Specific Remark Is Written In The PNR     00XT/S2
    Verify Specific Remark Is Written In The PNR     RM *MAC/-LK-MAC2/-FOP-CCVIXXXXXXXXXXXX1111/-EXP-0820/-TK-
    Verify Specific Remark Is Written In The PNR     2211333555/-MP-ALL/-BKN-CON1234567/S2
     
Populate IRD Rate Request Mandatory And Optional Fields
    Navigate To Page IRD Rate Request
    Enter Value    ${input_consultant_name}     Consultant Name
    Enter Value    ${input_consultant_number}    AB1
    Enter Value    ${input_consultant_oid}     YTOWL2107
    Enter Value    ${input_fare_request}    F Class
    Verify Agent Queue And Category Default Value
    Select Checkbox    ${checkbox_air}
    Select Checkbox    ${checkbox_date}
    Select Checkbox    ${checkbox_schedule}
    Add Stopovers    CDG
    Select Yes On Is Travel Within 24 Hours
    Enter Value    ${input_comments}    This is test comment
    Take Screenshot

Populate IRD Rate Request Mandatory Fields Only
    Set Test Variable    ${actual_agent_queue}    51C200
    Navigate To Page IRD Rate Request
    Enter Value    ${input_consultant_name}     Consultant Name
    Enter Value    ${input_consultant_number}    AB1
    Enter Value    ${input_consultant_oid}     YTOWL2107
    Enter Value    ${input_fare_request}    J Class
    Enter Value    ${input_agent_queue}     ${actual_agent_queue}
    Select No On Is Travel Within 24 Hours
    Take Screenshot

Populate IRD Rate Request With Multiple Stopovers
    Navigate To Page IRD Rate Request
    Enter Value    ${input_consultant_name}     Consultant Name
    Enter Value    ${input_consultant_number}    AB1
    Enter Value    ${input_consultant_oid}     YTOWL2107
    Enter Value    ${input_fare_request}    F Class
    Verify Agent Queue And Category Default Value
    Select Checkbox    ${checkbox_air}
    Select Checkbox    ${checkbox_schedule}
    Add Stopovers    CDG    LHR    BCN    AMS
    Select Yes On Is Travel Within 24 Hours
    Enter Value    ${input_comments}    This is test comment
    Take Screenshot
    
Populate IRD Rate Request With Multiple Comments
    Navigate To Page IRD Rate Request
    Enter Value    ${input_consultant_name}     Consultant Name
    Enter Value    ${input_consultant_number}    AB1
    Enter Value    ${input_consultant_oid}     YTOWL2107
    Enter Value    ${input_fare_request}    F Class
    Verify Agent Queue And Category Default Value
    Select Checkbox    ${checkbox_air}
    Select Checkbox    ${checkbox_date}
    Select No On Is Travel Within 24 Hours
    Add Comments    This is test comment1    This is test comment2    This is test comment3    This is test comment4    This is test comment5    This is test comment6    This is test comment7    This is test comment8
    Take Screenshot
    
Select ${is_travel_value} On Is Travel Within 24 Hours
    Run Keyword If    '${is_travel_value}' == 'Yes'    Click Element At Coordinates   ${input_isTravel_yes}    0     0    ELSE      Click Element At Coordinates   ${input_isTravel_no}    0    0

Add Stopovers
    [Arguments]    @{stopovers_codes}
    Set Test Variable    ${index}    0
    : FOR    ${stopovers_codes}    IN    @{stopovers_codes}
    \    ${index}    Evaluate    ${index} + 1 
    \    Run Keyword If    '${index}' != '1'    Click Add Stopover
    \    Enter Value    ${row_stopver}${open_bracket}${index}${close_bracket}${input_stopver}    ${stopovers_codes}

Add Comments
    [Arguments]    @{comments}
    Set Test Variable    ${index}    0
    : FOR    ${comments}    IN    @{comments}
    \    ${index}    Evaluate    ${index} + 1 
    \    Run Keyword If    '${index}' != '1'    Click Add Comment
    \    Enter Value    ${row_comments}${open_bracket}${index}${close_bracket}${input_comments}    ${comments}

Click Add Stopover
    Click Element    ${row_stopver}${open_bracket}1${close_bracket}${button_add}
    
Click Add Comment
    Click Element    ${row_comments}${open_bracket}1${close_bracket}${button_add}
  
Verify Agent Queue And Category Default Value
    ${actual_agent_queue}    Get Value    ${input_agent_queue}
    Should Be Equal    ${actual_agent_queue}    50C231
    Set Test Variable    ${actual_agent_queue}
    
Verify IRD Rate Request Remarks Are Written
    Finish PNR
    Assign Current Date
    Verify Expected Remarks Are Written In The PNR
    Verify Unexpected Remarks Are Not Written In The PNR
    Verify Specific Remark Is Written In The PNR    RMF DATE-${current_date} OID-YTOWL2107 AGENT QUEUE/CATEGORY - ${actual_agent_queue} CFA-AAA    True
    
Verify That PNR Is Queued When Travel Is ${travel_time} 24 Hrs
    Open Command Page
    Enter Cryptic Command    RTQ 
    # Run Keyword If    '${travel_time}' == 'Within'    Element Should Contain    ${text_area_command}    YTOWL210N${SPACE}${SPACE}${SPACE}${SPACE}040${SPACE}${SPACE}${SPACE}${SPACE}250
    # ...    ELSE    Element Should Contain    ${text_area_command}    YTOWL210N${SPACE}${SPACE}${SPACE}${SPACE}040${SPACE}${SPACE}${SPACE}${SPACE}240
    Element Should Contain    ${text_area_command}    YTOWL210N${SPACE}${SPACE}${SPACE}${SPACE}000${SPACE}${SPACE}${SPACE}${SPACE}000

Verify That IRD Rate Request Is Not Displayed On the Main Menu
    Open CA Corporate Test
    Page Should Not Contain Element    ${input_agent_queue} 
    
Select ${aqua_fee} Type Of Fee
    Navigate To Page Aqua Fees
    Select From List By Label   ${list_fee_type}    ${aqua_fee}
    Take Screenshot
    
Select Segment And Select ${aqua_fee} 
    Navigate To Page Aqua Fees
    Select From List By Label   ${list_fee_type}    ${aqua_fee}
    Run Keyword If    "${aqua_fee}" == "CAR ONLY FEES"    Select Segments For Aqua Fee   3    4
    Run Keyword If    "${aqua_fee}" == "HOTEL ONLY FEES"    Select Segments For Aqua Fee   2    3 
    Run Keyword If    "${aqua_fee}" == "LIMO ONLY FEES"    Select Segments For Aqua Fee   3 
    Take Screenshot
    
Click Submit To PNR On Aqua Fees
    Click Submit To PNR    
    Switch To Graphic Mode
    Get PNR Details
    
Verify Aqua Fee Remarks Are Written In The PNR
    Click Submit To PNR On Aqua Fees
    Verify Expected Remarks Are Written In The PNR
    Verify Unexpected Remarks Are Not Written In The PNR
    
Select Segments For Aqua Fee
    [Arguments]    @{segment_number}
    Wait Until Element Is Visible    ${select_fee_segment}    30
    Click Button    ${select_fee_segment}
    Wait Until Element Is Visible    ${list_segment}    30
    :FOR    ${segment_number}    IN    @{segment_number}
    \    Click Element    ${list_segment}${open_bracket}1${close_bracket}${checkbox_start}${segment_number}${checkbox_end}
    Click Element    ${select_fee_segment}
    [Teardown]    Take Screenshot
   
Select ${aqua_fee} And Update Touch Reason
    Set Test Variable    ${aqua_fee}
    Navigate To Page Aqua Fees
    Select ${aqua_fee} Type Of Fee
    Run Keyword If    "${aqua_fee}" == "AIR FEES"    Update Agent Assisted And Touch Reason Code    AM    A
    Run Keyword If    "${aqua_fee}" == "RAIL FEES"    Update Agent Assisted And Touch Reason Code    AM    S
    
Select Update Touch Reason ${aqua_fee}, And Segment 
    Set Test Variable    ${aqua_fee}
    Navigate To Page Aqua Fees
    Select Segment And Select ${aqua_fee}
    Run Keyword If    "${aqua_fee}" == "CAR ONLY FEES"    Update Agent Assisted And Touch Reason Code    AM    C
    Run Keyword If    "${aqua_fee}" == "HOTEL ONLY FEES"    Update Agent Assisted And Touch Reason Code    AM    M
    Run Keyword If    "${aqua_fee}" == "LIMO ONLY FEES"    Update Agent Assisted And Touch Reason Code    AM    L
    
Create PNR And Exchange Ticket
    Add FS And Commission Line In The PNR    FS02    FM10.00    RFCWTPTEST    ER     ER
    Sleep    4
    Get Record Locator Value
    Ticket TST1
    Create 1 Test Dates
    Create Exchange PNR In The GDS
    
Select ${aqua_fee} Type Of Fee And ${fee_type}
    Select ${aqua_fee} Type Of Fee
    Select Checkbox    ${checkbox_supplemental_fee}
    Wait Until Element Is Visible    ${input_fee} 
    Run Keyword If    "${fee_type}" == "Schedule Change"    Select Checkbox    ${checkbox_schedule_change}
    Run Keyword If    "${fee_type}" == "Input Special Fee"    Enter Value    ${input_fee}    12.99
    Take Screenshot
    
Add Supplemental Fee Code
    Navigate To Page Aqua Fees
    Click Add Supplemental Fee Button
    Select Supplemental Fee    1

Select Supplemental Fee
     [Arguments]   @{supplemental_fee_index}
    : FOR   ${supplemental_fee_index}   IN    @{supplemental_fee_index}
    \    Select Checkbox    ${input_supplementalFee_chckbox}${open_bracket}${supplemental_fee_index}${close_bracket}${input_supfee_checkbox}
    Click Button    ${button_save}  
    Wait Until Element Is Enabled    ${checkbox_supplemental_fee}    30   
    Click Element At Coordinates    ${input_feeCode}    0    0

Click Add Supplemental Fee Button
    Wait Until Element Is Visible    ${button_add_supplemental_fee}    30
    Click Element At Coordinates    ${button_add_supplemental_fee}    0    0
    Wait Until Element Is Visible    ${input_supfee_checkbox}    30
    