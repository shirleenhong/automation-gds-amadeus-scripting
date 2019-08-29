*** Settings ***
Library           String
Library           SeleniumLibrary
Library           Collections
Library           Screenshot
Resource          base.robot

*** Variables ***
${list_segment}
${list_accounting_type}    css=#accountingTypeRemark
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
${input_confirmationNo}    css=#supplierConfirmatioNo
${input_ccNo}    css=#ccNo
${input_expirydate}    css=#expDate
${input_baseamount}    css=#baseAmount
${input_commission}    css=#commisionWithoutTax
${input_gsttax}    css=#gst
${input_hsttax}    css=#hst
${input_qsttax}    css=#qst
${input_othtax}    css=#othertax
${input_tktnumber}    css=#tktLine
${input_departurecity}    css=#departureCity
${list_purchasetype}    css=#passPurchase
${list_faretype}    css=#fareType
${input_suppliercode}    css=#supplierCodeName

*** Keywords ***
Move Single Passenger
    Move Profile to GDS    NM1Juarez/Rose Ms    APE-test@email.com    RM*CF/-RBP0000000N    RMP/CITIZENSHIP-CA    RM SYEXGVS: A:FA177
    
Move Multiple Passenger
    Move Profile to GDS    NM1Juarez/Rose Ms    NM1De Guzman/Cyril Mr    APE-test@email.com    RM*CF/-RBP0000000N    RMP/CITIZENSHIP-CA    RM SYEXGVS: A:FA177
    
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
    [Arguments]    ${base_amt}=${EMPTY}    ${gst_tax}=${EMPTY}    ${hst_tax}=${EMPTY}    ${qst_tax}=${EMPTY}    ${oth_tax}=${EMPTY}
    Enter Value    ${input_base_amt}    ${base_amt}
    Enter Value    ${input_gst_tax}    ${gst_tax}
    Enter Value    ${input_hst_tax}    ${hst_tax}
    Enter Value    ${input_qst_tax}    ${qst_tax}
    Enter Value    ${input_other_tax}   ${oth_tax}

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

#-----For Payment Keywords-------#  
Add Matrix Accounting Remark For Air Canada Pass Purchase 
    Click Payment Panel
    Click Matrix Accounting Remark Tab
    Click Add Accounting Line Button
    Select From List By Value    ${list_accounting_type}    Air Canada Individual Pass Purchase
    Enter Value    ${input_confirmationNo}    879111
    Add Ticketing Amount Details    100.00    15.05    2.20    10.00    3.00
    Enter Value    ${input_tktnumber}    0002167899
    Enter Value    ${input_departurecity}    YVR        
    Select From List By Value    ${list_purchasetype}     COMMUTER-U.S COMMUTER
    Select From List By Value    ${list_faretype}       FLEX
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
    Click Element    ${input_confirmationNo}
    Input Text    ${input_confirmationNo}    ${supplier_confirmation_number}
    
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
    Double Click Element    ${input_ccNo}
    Press Key    ${input_ccNo}    \\08
    Input Text    ${input_ccNo}    ${credit_card_number}
    
Enter Credit Card Expiration Date ${exp_date}
    Set Test Variable    ${exp_date}      
    Double Click Element    ${input_expirydate}
    Press Key    ${input_expirydate}    \\08
    Input Text    ${input_expirydate}    ${exp_date}
         
Select Type Of Pass Purchase ${pass_purchase_type}
    Set Test Variable    ${pass_purchase_type}    
    Select From List By Value    ${list_purchasetype}    ${pass_purchase_type}
    [Teardown]    Take Screenshot

Select Fare Type ${fare_type}
    Set Test Variable    ${fare_type}    
    Select From List By Value    ${list_faretype}    ${fare_type}
    [Teardown]    Take Screenshot

Verify Supplier Code Default Value Is Correct ${acct_remark_type}
    Set Test Variable    ${acct_remark_type}
    ${actual_supplier_code}    Get Text    ${input_suppliercode}    
    Run Keyword If    "${acct_remark_type}" == "Air Canada Individual Pass Purchase"   Should Contain    ${actual_supplier_code}    ACJ
    Run Keyword If    "${acct_remark_type}" == "Westjet Individual Pass Purchase"   Should Contain    ${actual_supplier_code}    WJP
    Run Keyword If    "${acct_remark_type}" == "Porter Individual Pass Purchase"   Should Contain    ${actual_supplier_code}    PTP