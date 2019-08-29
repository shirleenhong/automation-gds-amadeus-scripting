*** Settings ***
Library           String
Library           SeleniumLibrary
Library           Collections
Library           Screenshot
Resource          base.robot

*** Variables ***
${tab_accounting}
${button_add_accounting}
${list_segment}
${list_accounting_type}
${input_confirmation_nbr}
${input_ticket_number}
${input_base_amt}
${input_gst_tax}
${input_hst_tax}
${input_qst_tax}
${input_other_tax}
${input_supplier_code}
${button_addaccountingline}    //button[contains(text(), 'Add Accounting Line')]
${tab_matrix_accounting}    //span[contains(text(), 'Matrix Accounting Remark')]
${tab_matrix_receipt}    //span[contains(text(), 'Matrix Receipt')]
${tab_leisure_fee}    //span[contains(text(), 'Leisure Fee')]
${field_vendorcode}    css=#vendorCode
${fop_visacard}    xpath=//option[contains(text(),'Visa')]
${fop_mastercard}    xpath=//option[contains(text(),'Mastercard')]
${fop_amexcard}    xpath=//option[contains(text(),'American Express')]
${fop_dinerscard}    xpath=//option[contains(text(),'Diners')]
${text_confirmationNo}    css=#supplierConfirmatioNo
${text_ccNo}    css=#ccNo
${text_expirydate}    css=#expDate
${text_baseamount}    css=#baseAmount
${text_commission}    css=#commisionWithoutTax
${text_gsttax}    css=#gst
${text_hsttax}    css=#hst
${text_qsttax}    css=#qst
${text_othtax}    css=#othertax
${text_tktnumber}    css=#tktLine
${text_departurecity}    css=#departureCity
${list_purchasetype}    css=#passPurchase
${list_faretype}    css=#fareType

*** Keywords ***
Add Non-BSP Ticketing Details For Single Segment
    Click Payment Panel
    Click Element    ${tab_accounting}    
    Click Element    ${button_add_accounting}
    Select From List By Value    ${list_segment}   text 
    Select From List By Value    ${list_accounting_type}    text
    Enter Value    ${input_confirmation_nbr}    54321
    Add Ticketing Amount Details
    Enter Value    ${input_ticket_number}    1234567890

Add Ticketing Amount Details
    Enter Value    ${input_base_amt}    750.00
    Enter Value    ${input_gst_tax}    1.00
    Enter Value    ${input_hst_tax}    2.00
    Enter Value    ${input_qst_tax}    3.00
    Enter Value    ${input_other_tax}   4.00

Verify Supplier Code Default Value Is Correct For ${supplier_code}
    Set Test Variable    ${supplier_code}    
    ${actual_supplier_code}    Get Text    ${input_supplier_code}
    Run Keyword If    "${supplier_code}" == "AC"    Should contain    ${actual_supplier_code}     ACY
    Run keyword if    "${supplier_code}" == "WS"    Should contain    ${actual_supplier_code}     WJ3
    
Select Multiple Segments
    [Arguments]    @{segment_number}
    Wait Until Element Is Visible    xpath=//app-segment-select[@id='segmentNo']//button[@id='button-basic']    30
    Click Button    xpath=//app-segment-select[@id='segmentNo']//button[@id='button-basic']
    Wait Until Element Is Visible    xpath=//ul[@id='dropdown-basic']    30
    :FOR    ${segment_number}    IN    @{segment_number}
    \    Click Element    xpath=//ul[@id='dropdown-basic']//input[@value='${segment_number}']
    Click Element    xpath=//app-segment-select[@id='segmentNo']//button[@id='button-basic']
    [Teardown]    Take Screenshot

Add Non-BSP Ticketing Details For Multiple Segments
    Click Payment Panel
    Click Element    ${tab_accounting}    
    Click Element    ${button_add_accounting}
    Select Multiple Segments    2    3
    Select From List By Value    ${list_accounting_type}    text
    Enter Value    ${input_confirmation_nbr}    54321
    Add Ticketing Amount Details
    Enter Value    ${input_ticket_number}    text
    
Verify That Ticketing Remarks For Non-BSP With Single Segment Are Written In The PNR
    Switch To Graphic Mode
    Get PNR Details    
    Run Keyword And Continue On Failure    Should Contain    ${pnr_details}    RMT/TKT1-VEN/TK-1234567890/VN-ACY/S2 
    Run Keyword And Continue On Failure    Should Contain    ${pnr_details}    RMT/TKT1-BA-750.00/TX1-1.00XG/TX2-2.00RC/TX3-3.00XQ/TX4-0XT/COMM-0/S2
    Run Keyword And Continue On Failure    Should Contain    ${pnr_details}    RMF/LCC-AC*GRAND TOTAL CAD 750
    Run Keyword And Continue On Failure    Should Contain    ${pnr_details}    RIR AIRLINE LOCATOR NUMBER – 54321/S2
    
Verify That Ticketing Remarks For Non-BSP With Multiple Segments Are Written In The PNR
    Switch To Graphic Mode
    Get PNR Details  
    Run Keyword And Continue On Failure    Should Contain    ${pnr_details}    RMT/TKT1-VEN/TK-1234567890/VN-ACY/S2-3 
    Run Keyword And Continue On Failure    Should Contain    ${pnr_details}    RMT/TKT1-BA-750.00/TX1-1.00XG/TX2-2.00RC/TX3-3.00XQ/TX4-0XT/COMM-0/S2-3
    Run Keyword And Continue On Failure    Should Contain    ${pnr_details}    RMF/LCC-AC*GRAND TOTAL CAD 750
    Run Keyword And Continue On Failure    Should Contain    ${pnr_details}    RIR AIRLINE LOCATOR NUMBER – 54321/S2-3
    
Add Matrix Accounting Remark For Air Canada Pass Purchase
    [Arguments]    ${remark_type}    ${supplier_confirmation_number}    ${base_amount}    ${gst_tax}    ${hst_tax}    ${qst_tax}    ${commission_with_tax}    ${pass_purchase_type}    ${fare_type}    ${ticket_number}=${EMPTY}    ${departure_city}=${EMPTY}
    Click Payment Panel
    Click Matrix Accounting Remark Tab
    Click Add Accounting Line Button
    Select Accounting Remark Type    ${remark_type}
    Enter Supplier Confirmation Number ${supplier_confirmation_number}
    Enter Base Amount ${base_amount}
    Enter GST Tax Amount ${gst_tax}
    Enter HST Tax Amount ${hst_tax}
    Enter QST Tax Amount ${qst_tax}
    Enter Commission Without Tax Amount ${commission_with_tax}
    Enter Ticket Number ${ticket_number}
    Enter Departure City ${departure_city}
    Select Type Of Pass Purchase ${pass_purchase_type}
    Select Fare Type ${fare_type}
    [Teardown]    Take Screenshot    

Click Matrix Accounting Remark Tab
    Wait Until Element Is Visible   ${tab_matrix_accounting}   60
    Set Focus To Element    ${tab_matrix_accounting}
    Click Element    ${tab_matrix_accounting}
    
Click Matrix Receipt Tab
    Wait Until Element Is Visible   ${tab_matrix_receipt}   60
    Set Focus To Element    ${tab_matrix_receipt}
    Click Element    ${tab_matrix_receipt}
   
Click Add Accounting Line Button
    Click Element    ${button_addaccountingline}
    
Select Accounting Remark Type
    [Arguments]    ${accounting_remark_type}
    Set Suite Variable    ${accounting_remark_type}
    Click Element    css=#accountingTypeRemark
    Click Element    xpath=//option[contains(text(),'${accounting_remark_type}')]
    ${remark_description}    Set Variable    ${accounting_remark_type}
    
Enter Supplier Confirmation Number ${supplier_confirmation_number}
    Set Suite Variable    ${supplier_confirmation_number}
    Click Element    ${text_confirmationNo}
    Input Text    ${text_confirmationNo}    ${supplier_confirmation_number}
    
Select Visa As FOP
    Wait Until Page Contains Element    ${field_vendorcode}    30
    Click Element    ${field_vendorcode}
    Click Element    ${fop_visacard}
    
Select Mastercard As FOP
    Wait Until Page Contains Element    ${field_vendorcode}    30
    Click Element    ${field_vendorcode}
    Click Element    ${fop_mastercard}
    
Select American Express As FOP
    Wait Until Page Contains Element    ${field_vendorcode}    30
    Click Element    ${field_vendorcode}
    Click Element    ${fop_amexcard}
    
Select Diners Card As FOP
    Wait Until Page Contains Element    ${field_vendorcode}    30
    Click Element    ${field_vendorcode}
    Click Element    ${fop_dinerscard}]
    
Enter Credit Card Number ${credit_card_number}
    Set Suite Variable    ${credit_card_number}
    Double Click Element    ${text_ccNo}
    Press Key    ${text_ccNo}    \\08
    Input Text    ${text_ccNo}    ${credit_card_number}
    
Enter Credit Card Expiration Date ${exp_date}
    Set Test Variable    ${exp_date}      
    Double Click Element    ${text_expirydate}
    Press Key    ${text_expirydate}    \\08
    Input Text    ${text_expirydate}    ${exp_date}
    
Enter Base Amount ${base_amount}
    Set Suite Variable    ${base_amount}
    Double Click Element    ${text_baseamount}
    Press Key    ${text_baseamount}    \\08
    Input Text    ${text_baseamount}    ${base_amount}
    [Teardown]    Take Screenshot

Enter Commission Without Tax Amount ${commission_with_tax}
    Set Suite Variable    ${commission_with_tax}
    # Press Key    css=#baseAmount    \\09
    Double Click Element    ${text_commission}
    Press Key    ${text_commission}   \\08
    Input Text    ${text_commission}    ${commission_with_tax}
    Press Key    ${text_commission}    \\09
    [Teardown]    Take Screenshot

Enter GST Tax Amount ${gst_tax}
    Set Suite Variable    ${gst_tax}
    Double Click Element    ${text_gsttax}
    Press Key    ${text_gsttax}    \\08
    Input Text    ${text_gsttax}    ${gst_tax}
    [Teardown]    Take Screenshot

Enter HST Tax Amount ${hst_tax}
    Set Suite Variable    ${hst_tax}
    Double Click Element    ${text_hsttax}
    Press Key    ${text_hsttax}    \\08
    Input Text    ${text_hsttax}    ${hst_tax}
    [Teardown]    Take Screenshot

Enter QST Tax Amount ${qst_tax}
    Set Suite Variable    ${qst_tax}
    Double Click Element    ${text_qsttax}
    Press Key    ${text_qsttax}    \\08
    Input Text    ${text_qsttax}    ${qst_tax}
    Press Key    ${text_qsttax}    \\09
    [Teardown]    Take Screenshot

Enter Other Tax Amount ${other_tax}
    Set Suite Variable    ${other_tax}
    Double Click Element    ${text_othtax}
    Press Key    ${text_othtax}    \\08
    Input Text    ${text_othtax}    ${other_tax}
    [Teardown]    Take Screenshot
    
Enter Ticket Number ${ticket_number}
    Set Suite Variable    ${ticket_number}
    Double Click Element    ${text_tktnumber}
    Press Key    ${text_tktnumber}    \\08
    Input Text    ${text_tktnumber}    ${ticket_number}
    Press Key    ${text_tktnumber}    \\09
    
Enter Departure City ${departure_city}
    Set Suite Variable   ${departure_city}
    Double CLick Element    ${text_departurecity}
    Press key    ${text_departurecity}    \\08
    Input Text    ${text_departurecity}    ${departure_city}
    Press Key    ${text_departurecity}    \\09
     
Select Type Of Pass Purchase ${pass_purchase_type}
    Set Test Variable    ${pass_purchase_type}    
    Select From List By Value    ${list_purchasetype}    ${pass_purchase_type}
    [Teardown]    Take Screenshot

Select Fare Type ${fare_type}
    Set Test Variable    ${fare_type}    
    Select From List By Value    ${list_faretype}    ${fare_type}
    [Teardown]    Take Screenshot
