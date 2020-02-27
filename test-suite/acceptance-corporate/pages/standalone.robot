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
${input_fee_ticket_number}    css=#ticketNumber
${input_supfee_amount}    //input[@id='valueAmount']
${select_billing_type}    css=#billingType
${input_admin_fee}    css=#feeAmount
${input_segment_cost}    css=#segmentCost
${input_passExpDate}    css=#passExpDate
${button_submit_corporate}    //button[contains(text(), 'Submit Corporate Pass ')]
${button_submit_remarks}    //button[contains(text(), 'Submit Remarks')]

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
    Navigate To Page Full Wrap PNR
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
    Navigate To Page Aqua Fees 
    Select ${aqua_fee} Type Of Fee
    Select Checkbox    ${checkbox_supplemental_fee}
    Wait Until Element Is Visible    ${input_supplementalFee}    20  
    Run Keyword If    "${fee_type}" == "Schedule Change"    Select Checkbox    ${checkbox_schedule_change}
    Run Keyword If    "${fee_type}" == "Input Special Fee"    Enter Value    ${input_fee}    12.99
    Take Screenshot
    
Add Supplemental Fee Code
    Click Add Supplemental Fee Button
    Select Supplemental Fee    1
    Take Screenshot

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
    
Verify TKTL Remark Is Updated And PNR Is Queued Correctly
    Assign Current Date
    Verify Remarks Are Added Correctly In The PNR
    Verify Specific Remark Is Written In The PNR    TK TL${current_date}/YTOWL2106/Q8C1-FEE
    Verify PNR Is Queued For Aqua Fees
    
Verify PNR Is Queued For Aqua Fees
    Open Command Page
    Enter Cryptic Command    RTQ
    Element Should Contain    ${text_area_command}   YTOWL2106${SPACE}${SPACE}${SPACE}${SPACE}070${SPACE}${SPACE}${SPACE}${SPACE}000
    Take Screenshot 
   
Add Supplemental Fee Code With Ticket Number
    Click Add Supplemental Fee Button
    Select Supplemental Fee    1
    Enter Value    ${input_fee_ticket_number}    1234321567
    Take Screenshot
    
Select Supplemental Fee With Amount
    [Arguments]   @{supplemental_fee_index}
    : FOR   ${supplemental_fee_index}   IN    @{supplemental_fee_index}
    \    Select Checkbox    ${input_supplementalFee_chckbox}${open_bracket}${supplemental_fee_index}${close_bracket}${input_supfee_checkbox}
    Enter Value    ${input_supplementalFee_chckbox}${open_bracket}2${close_bracket}${input_supfee_amount}    100.00
    Take Screenshot
    Click Button    ${button_save} 

Select Type Of Fee And Supplemental Fee With Amount    
    Select AIR FEES Type Of Fee And Supplemental Fee
    Click Add Supplemental Fee Button
    Select Supplemental Fee With Amount    2
    Take Screenshot
    
Verify MIS Segment For Aqua Fee Is Written In The PNR
    Assign Current Date    
    Verify Specific Remark Is Written In The PNR    MIS 1A HK1 YYZ ${current_date}-TYP-CWT/FEE ONLY
    
Click Submit Corporate Pass
    Click Element    ${button_submit_corporate}
    
Click Add Supplier Remark
    Click Element    ${button_add_supplier_accounting_remark}
        
Add Accounting Remark For Standalone Air Canada Pass Purchase
    Handle SmartTool PopUp
    Open CA Corporate Test
    Click Airline Corporate Pass Purchase
    Click Add Supplier Remark
    Select From List By Label    ${list_accounting_type}    Air Canada Individual Pass Purchase
    Enter Value   ${input_supplier_confirmationNo}    1234
    Enter Value    ${input_tktnumber}    1234567890
    Enter Value    ${input_commission}    2.00
    Enter Value    ${input_departurecity}    YUL
    Enter Value    ${list_purchasetype}     RAPIDAIR
    Select From List By Label    ${list_faretype}       FLEX
    Select Visa As FOP
    Enter Credit Card Number 4444333322221111
    Enter Credit Card Expiration Date 1222
    Select From List By Label    ${select_billing_type}    POS Service Fee
    Enter Value    ${input_admin_fee}    20.00
    Enter Value    ${input_segment_cost}    10.00
    Enter Value    ${input_passExpDate}    1222
    Verify Supplier Code Default Value Is Correct For Air Canada Individual Pass Purchase
    Take Screenshot    
    Click Save Button
    Click Submit Corporate Pass
    
Add Accounting Remark For Standalone Westjet Pass Purchase
    Open CA Corporate Test
    Click Airline Corporate Pass Purchase
    Click Add Supplier Remark
    Select From List By Label    ${list_accounting_type}    Westjet Individual Pass Purchase
    Enter Value   ${input_supplier_confirmationNo}    8888
    Enter Value    ${input_commission}    80.00
    Enter Value    ${input_tktnumber}    0888823456
    Enter Value    ${input_departurecity}    CDG        
    Enter Value    ${list_purchasetype}     Westjet Travel Pass
    Enter Value    ${list_faretype}       LAT
    Select Visa As FOP
    Enter Credit Card Number 4444333322221111
    Enter Credit Card Expiration Date 1222
    Select From List By Label    ${select_billing_type}    Settlement Fee
    Enter Value    ${input_admin_fee}    18.05
    Enter Value    ${input_segment_cost}    101.00
    Enter Value    ${input_passExpDate}    1222
    Verify Supplier Code Default Value Is Correct For Westjet Individual Pass Purchase
    Take Screenshot
    Click Save Button
    Click Submit Corporate Pass
    
Add Accounting Remark For Standalone Porter Pass Purchase
    Open CA Corporate Test
    Click Airline Corporate Pass Purchase
    Click Add Supplier Remark
    Select From List By Label    ${list_accounting_type}    Porter Individual Pass Purchase
    Enter Value   ${input_supplier_confirmationNo}    4433
    Enter Value    ${input_commission}    12.00
    Enter Value    ${input_commission}    2.00
    Enter Value    ${input_tktnumber}    8888999912
    Enter Value    ${input_departurecity}    FRA        
    Enter Value    ${list_purchasetype}     Porter Travel Pass 
    Enter Value    ${list_faretype}       EXECUTIVE
    Select American Express As FOP
    Enter Credit Card Number 378282246310005
    Enter Credit Card Expiration Date 1222
    Select From List By Label    ${select_billing_type}    POS Service Fee
    Enter Value    ${input_admin_fee}    12.20
    Enter Value    ${input_segment_cost}    350.00
    Enter Value    ${input_passExpDate}    1222
    Verify Supplier Code Default Value Is Correct For Porter Individual Pass Purchase
    Take Screenshot    
    Click Save Button
    Click Submit Corporate Pass
    
Add Accounting Remark For Standalone Air North Pass Purchase
    Open CA Corporate Test
    Click Airline Corporate Pass Purchase
    Click Add Supplier Remark
    Select From List By Label    ${list_accounting_type}    Air North Individual Pass Purchase
    Enter Value   ${input_supplier_confirmationNo}    5432
    Enter Value    ${input_commission}    1.00
    Enter Value    ${input_tktnumber}    4444888822
    Enter Value    ${input_departurecity}    AKL        
    Enter Value    ${list_purchasetype}     U.S COMMUTER 
    Enter Value    ${list_faretype}       TANGO
    Select Mastercard As FOP
    Enter Credit Card Number 5555555555554444
    Enter Credit Card Expiration Date 1222
    Select From List By Label    ${select_billing_type}    Settlement Fee
    Enter Value    ${input_admin_fee}    10.00
    Enter Value    ${input_segment_cost}    120.05
    Enter Value    ${input_passExpDate}    1222
    Verify Supplier Code Default Value Is Correct For Air North Individual Pass Purchase
    Take Screenshot
    Click Save Button
    Click Submit Corporate Pass
    
Add Accounting Remark For Standalone Pacific Coastal Pass Purchase
    Open CA Corporate Test
    Click Airline Corporate Pass Purchase
    Click Add Supplier Remark
    Select From List By Label    ${list_accounting_type}    Pacific Coastal Individual Pass Purchase
    Enter Value   ${input_supplier_confirmationNo}    2222
    Enter Value    ${input_commission}    12.12
    Enter Value    ${input_tktnumber}    0888823456
    Enter Value    ${input_departurecity}    BFS        
    Enter Value    ${list_purchasetype}     QUEBEC 
    Enter Value    ${list_faretype}       PREMIUM ECONOMY
    Select Visa As FOP
    Enter Credit Card Number 4444333322221111
    Enter Credit Card Expiration Date 1222
    Select From List By Label    ${select_billing_type}    POS Service Fee
    Enter Value    ${input_admin_fee}    5.01
    Enter Value    ${input_segment_cost}    75.01
    Enter Value    ${input_passExpDate}    1222
    Verify Supplier Code Default Value Is Correct For Pacific Coastal Individual Pass Purchase
    Take Screenshot
    Click Save Button
    Click Submit Corporate Pass
    
Verify Accounting Remarks Per Airline Are Written Correctly
    Sleep    5
    Close CA Corporate Test
    Switch To Graphic Mode
    Get PNR Details
    Verify Expected Remarks Are Written In The PNR    True
    Switch To Command Page

Add CWT Itinerary Details For Email ${email}, In ${language} Language And For ${transaction} Transaction Type In Standalone
    Navigate To Page CWT Itinerary
    Select Emails In CWT Itinerary    ${email}
    Select From List By Label    ${list_language}    ${language}
    Select From List By Label    ${list_transaction_type}    ${transaction}
    Add Services Remark     THIS IS A TEST FOR    ADDING SERVICES REMARK
    Add Tickets Remark     THIS IS ALSO A TEST     FOR ADDING TICKETS REMARK
    Run Keyword If    "${transaction}" == "Itinerary"     Add Offers Remark    THIS ONE IS FOR    ADDING OFFER REMARKS
    Set Test Variable    ${cwt_itin_complete}    yes
    [Teardown]    Take Screenshot
    
Add CWT Itinerary Details For All Emails, In ${language} Language And For ${transcation} Transaction Type In Standalone
    Sleep    10
    Navigate To Page CWT Itinerary
    Select Emails In CWT Itinerary    TEST@EMAIL.COM    TEST_ARR@EMAIL.COM    TEST_CTC@EMAIL.COM
    Select From List By Label    ${list_language}    ${language}
    Select From List By Label    ${list_transaction_type}    ${transcation}
    Set Test Variable    ${cwt_itin_complete}    yes
    [Teardown]    Take Screenshot
    
Verify Remarks Are Added Correctly In The PNR For Standalone
    Click Submit To PNR     yes    yes
    Switch To Graphic Mode
    Get PNR Details
    Verify Expected Remarks Are Written In The PNR    True

Select Seats Tab
    Wait Until Element Is Visible    ${tab_Seats}    10
    Click Element    ${tab_Seats}    

Click Add Seat Remarks
    Wait Until Element Is Visible    ${button_add_seat}    10
    Click Element    ${button_add_seat} 
    
Select Agent Remarks Tab
    Wait Until Element Is Visible    ${tab_documentPnr}    10
    Click Element    ${tab_documentPnr}

Add Seat Remarks in Standalone For Option Online Check-in, Preferred And Upgrade
    Navigate To Page Remarks in Main Menu
    Select Seats Tab 
    Click Add Seat Remarks
    Wait Until Element Is Visible    ${input_seat_select1}
    Click Element    ${input_seat_select1}    
    Click Element    ${input_seat_select2}
    Select From List By Label    ${select_seat_Type}    WINDOW
    Click Element    ${input_seat_select5}
    Enter Value    ${input_seat_no}    2D
    Take Screenshot    
    Click Save Button In Seats
    
Add Seat Remarks in Standalone For Option Waitlist, Request And Clearance Check
    Navigate To Page Remarks in Main Menu
    Select Seats Tab 
    Click Add Seat Remarks
    Wait Until Element Is Visible    ${input_seat_select3}
    Select From List By Value   ${select_segment_number}    2
    Click Element   ${input_seat_select3}
    Click Element   ${input_seat_select4}
    Click Element   ${input_seat_select6}
    Take Screenshot    
    Click Save Button In Seats
    Click Element    ${button_add_seat}
    Wait Until Element Is Visible    ${input_seat_select3}
    Select From List By Value    ${select_segment_number}    3
    Click Element   ${input_seat_select3}
    Click Element   ${input_seat_select4}
    Click Element   ${input_seat_select6}
    Take Screenshot    
    Click Save Button In Seats
    
Verify If Remarks Are Written Correctly For Standalone Remarks
    Wait Until Element Is Visible    ${button_submit_remarks}    10
    Click Element    ${button_submit_remarks}
    Wait Until Element Is Not Visible     ${message_updatingPnr}    180
    Wait Until Element Is Visible    ${button_full_wrap}    180
    Wait For Script To Complete
    Close CA Corporate Test
    Switch To Graphic Mode
    Get PNR Details
    Verify Expected Remarks Are Written In The PNR    True
    Switch To Command Page
    
Add Single Agent Remark
    Navigate To Page Remarks in Main Menu
    Select Agent Remarks Tab
    Enter Value    ${row_documentPNR}${open_bracket}1${close_bracket}${input_document}    Testing Document PNR Remark
    Take Screenshot
    
Add Multiple Agent Remarks
    Navigate To Page Remarks in Main Menu
    Select Agent Remarks Tab
    Populate Multiple Document PNR    Testing Document PNR Remark 1    Testing Document PNR Remark 2    Testing Document PNR Remark 3    Testing Document PNR Remark 4
    Take Screenshot
    
Add Associated Remarks For Ticket Min/Max Stay
    Navigate To Page Remarks in Main Menu
    Click Associated Remarks Tab
    Select Segments    2
    Enter Value    ${input_assoc_remark}    Testing Fare Rule For Ticket Min and Max Stay
    Take Screenshot
    
Add Associated Remarks For Ticket Non Refundable
    Navigate To Page Remarks in Main Menu
    Click Associated Remarks Tab
    Select Segments    2    4
    Enter Value    ${input_assoc_remark}    Testing fare Rule For Ticket Non Ref and Non Ref
    Take Screenshot
