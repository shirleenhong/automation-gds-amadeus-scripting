*** Settings ***
Library           String
Library           SeleniumLibrary
Library           Collections
Library           Screenshot
Resource          base.robot
Resource          ../../resources/common/api-utilities.txt

*** Variables ***
${input_segment}   //button[@id='button-basic']//input[@formcontrolname='segment']
${list_segment}    //ul[@id='dropdown-basic']
${list_accounting_type}    css=#accountingTypeRemark
${input_suppliercode}    css=#supplierCodeName
${button_addaccountingline}    //button[contains(text(), 'Add Accounting Line')]
${tab_nonBsp_processing}    //span[contains(text(), 'Non-BSP Processing')]
${tab_matrix_receipt}    //span[contains(text(), 'Matrix Receipt')]
${tab_leisure_fee}    //span[contains(text(), 'Leisure Fee')]
${field_vendorcode}    css=#vendorCode
${fop_visacard}    xpath=//option[contains(text(),'Visa')]
${fop_mastercard}    xpath=//option[contains(text(),'Mastercard')]
${fop_amexcard}    xpath=//option[contains(text(),'American Express')]
${fop_dinerscard}    xpath=//option[contains(text(),'Diners')]
${input_supplier_confirmationNo}    css=#supplierConfirmatioNo
${input_ccNo}    css=#ccNo
${input_expirydate}    css=#expDate
${input_baseamount}    css=#baseAmount
${input_commission}    css=#commisionWithoutTax
${input_gsttax}    css=#gst
${input_hsttax}    css=#hst
${input_qsttax}    css=#qst
${input_othtax}    css=#otherTax
${input_penaltyBaseAmount}    css=#penaltyBaseAmount
${input_penaltyGst}    css=#penaltyGst
${input_penaltyHst}    css=#penaltyHst
${input_penaltyQst}    css=#penaltyQst
${input_tktnumber}    css=#tktLine
${input_origTicketLine}    css=#originalTktLine
${input_departurecity}    css=#departureCity
${list_purchasetype}    css=#passPurchase
${list_faretype}    css=#fareType
${button_update}    //i[@class='fas fa-edit']
${input_lowestGdsFare}    css=#gdsFare
${input_consultantNo}    css=#consultantNo
${edit_order}    xpath=//tr[1]//i[@class='fas fa-edit']
${list_description}    css=#descriptionapay
${input_otherCostDesc}    css=#otherDescription
${list_airlineCorporatePass}     //select[@id='airlineCorporatePassSelection']

*** Keywords ***    
Add Non-BSP Exchange Ticketing Details For Single Segment Without Ticket Number
    Navigate To Page Add Accounting Line
    Select From List By Label    ${list_accounting_type}    Non BSP Exchange
    Select Itinerary Segments    2
    Enter Value    ${input_supplier_confirmationNo}    0000054321
    Add Ticketing Amount Details With Other Tax And Commission    1000.00    100.00    10.00    1.00    0.10    0.10
    Select From List By Label    ${list_faretype}       FLEX
    Set Test Variable    ${tkt_number}    ${EMPTY}
    Set Test Variable    ${orig_tkt_number}    ${EMPTY}
    Set Test Variable    ${fare_type}    FLEX
    [TEARDOWN]    Take Screenshot
    
Add Non-BSP Exchange Ticketing Details For Single Segment With GDS Fare
    Navigate To Page Add Accounting Line
    Select From List By Label    ${list_accounting_type}    Non BSP Exchange
    Select Itinerary Segments    2
    Enter Value    ${input_supplier_confirmationNo}    0000054321
    Add Ticketing Amount Details With Other Tax And Commission    1000.00    100.00    10.00    1.00    0.10    0.10
    Select From List By Label    ${list_faretype}       FLEX
    Enter 1000 In Lowest GDS Fare Field
    Enter Value    ${input_tktnumber}    1234567890
    Enter Value    ${input_origTicketLine}    0987654321
    Set Test Variable    ${tkt_number}    1234567890
    Set Test Variable    ${orig_tkt_number}    0987654321
    Set Test Variable    ${fare_type}    FLEX
    [TEARDOWN]    Take Screenshot

Add Non-BSP Exchange Ticketing Details For Single Segment With Ticket Number
    Navigate To Page Add Accounting Line
    Select From List By Label    ${list_accounting_type}    Non BSP Exchange
    Select Itinerary Segments    2
    Enter Value    ${input_supplier_confirmationNo}    0000054321
    Add Ticketing Amount Details With Other Tax And Commission    1000.00    100.00    10.00    1.00    0.10    0.1
    Select From List By Label    ${list_faretype}       FLEX
    Enter Value    ${input_tktnumber}    1234567890
    Enter Value    ${input_origTicketLine}    0987654321
    Set Test Variable    ${tkt_number}    1234567890
    Set Test Variable    ${orig_tkt_number}    0987654321
    Set Test Variable    ${fare_type}    FLEX
    [TEARDOWN]    Take Screenshot
    
Add Non-BSP Exchange Ticketing Details For Multiple Segments With Ticket Number
    Navigate To Page Add Accounting Line
    Select From List By Label    ${list_accounting_type}    Non BSP Exchange
    Select Itinerary Segments    2    3
    Enter Value    ${input_supplier_confirmationNo}    0000054321
    Add Ticketing Amount Details With Other Tax And Commission    1000.00    100.00    10.00    1.00    0.10    0.1
    Enter Value    ${input_tktnumber}    1234567890
    Enter Value    ${input_origTicketLine}    0987654321
    Set Test Variable    ${tkt_number}    1234567890
    Set Test Variable    ${orig_tkt_number}    0987654321
    [TEARDOWN]    Take Screenshot
    
Add Non-BSP Exchange Ticketing Details For Single Segment With Ticket Number And Penalty
    Navigate To Page Add Accounting Line
    Select From List By Label    ${list_accounting_type}    Non BSP Exchange
    Select Itinerary Segments    2
    Enter Value    ${input_supplier_confirmationNo}    0000054321
    Add Ticketing Amount Details With Other Tax And Commission    1000.00    100.00    10.00    1.00    0.10    0.1
    Add Penalty Amount Details    10.00    1.00    1.00    1.00
    Select From List By Label    ${list_faretype}       FLEX
    Enter Value    ${input_tktnumber}    1234567890
    Enter Value    ${input_origTicketLine}    0987654321
    Set Test Variable    ${tkt_number}    1234567890
    Set Test Variable    ${orig_tkt_number}    0987654321
    Set Test Variable    ${fare_type}    FLEX
    [TEARDOWN]    Take Screenshot
    
# For Non-BSP Airline and APAY #  
Add Non-BSP Ticketing Details For Segment ${segment_no} 
    Navigate To Page Add Accounting Line
    Wait Until Element Is Visible    ${list_accounting_type}    30
    Select From List By Label    ${list_accounting_type}    Non BSP Airline
    Select Itinerary Segments   ${segment_no} 
    Enter Value    ${input_supplier_confirmationNo}    54321
    Add Ticketing Amount Details With Other Tax And Commission    750.00    1.00    2.00    3.00    4.00     5.00
    Enter Value    ${input_tktnumber}    1234567890
    Take Screenshot
    
Add Non-BSP Ticketing Details For Multiple Segments
    Navigate To Page Add Accounting Line
    Select From List By Label    ${list_accounting_type}    Non BSP Airline
    Select Itinerary Segments    2    3
    Enter Value    ${input_supplier_confirmationNo}    54321
    Add Ticketing Amount Details With Other Tax And Commission     750.00    1.00    2.00    3.00    4.00     5.00
    Enter Value    ${input_tktnumber}    1234567890
    Take Screenshot

Add Non-BSP Ticketing Details Without Ticket Number For Segment ${segment_no}
    Navigate To Page Add Accounting Line
    Select From List By Label    ${list_accounting_type}    Non BSP Airline
    Select Itinerary Segments   ${segment_no} 
    Enter Value    ${input_supplier_confirmationNo}    54321
    Add Ticketing Amount Details With Other Tax And Commission    750.00    1.00    2.00    3.00    4.00     5.00
    Take Screenshot

Add APAY Ticketing Details For Single Segment
    Navigate To Page Add Accounting Line
    Select From List By Label    ${list_accounting_type}    APAY
    Select Itinerary Segments    2
    # Development in progress - unable to write remark for OTHER COSTS
    Press A Key X Times     tab     1
    Press A Key X Times     down     7
    Press A Key X Times     enter    1     
    Wait Until Element Is Visible    ${input_otherCostDesc}    20
    Enter Value    ${input_otherCostDesc}    TEST DESCRIPTION
    Press Keys    ${input_otherCostDesc}    ENTER
    Add Ticketing Amount Details With Other Tax    750.00    1.00    2.00    3.00    4.00
    Enter Value    ${input_tktnumber}    1234567890
    Take Screenshot
    
Press A Key X Times
    [Arguments]   ${key}     ${times}
    :FOR     ${i}    IN RANGE     0     ${times}
    \    Keydown     ${key}
    \    Keyup     ${key}
    \    ${i}    Evaluate    ${i} + 1
    
Add APAY Ticketing Details For Multiple Segments
    Navigate To Page Add Accounting Line
    Select From List By Label    ${list_accounting_type}    APAY
    Select Itinerary Segments    2    3
    Enter Value    ${list_description}    SEAT COSTS
    Add Ticketing Amount Details With Other Tax    750.00    1.00    2.00    3.00    4.00
    Enter Value    ${input_tktnumber}    1234567890
    Take Screenshot
   
Add Non-BSP and APAY Ticketing Detals For Multiple Segments
    Add Non-BSP Ticketing Details For Segment 2 
    Enter Value    ${input_suppliercode}    AEO
    Click Save Button
    Navigate To Page Add Accounting Line
    Wait Until Element Is Visible    ${list_accounting_type}    30
    Select From List By Label    ${list_accounting_type}    APAY
    Select Itinerary Segments    3
    Enter Value    ${list_description}    FREIGHT COSTS
    Verify That Supplier Code Default Value Is Correct For Other Type Of APAY
    Add Ticketing Amount Details With Other Tax    1230.00    11.00    12.00    13.00    14.00
    Enter Value    ${input_tktnumber}    9876543210
    Take Screenshot
    Click Save Button
    Navigate To Page Add Accounting Line
    Wait Until Element Is Visible    ${list_accounting_type}    30
    Select From List By Label    ${list_accounting_type}    APAY
    Select Itinerary Segments    4
    Enter Value    ${list_description}    BAGGAGE FEES
    Verify That Supplier Code Default Value Is Correct For Other Type Of APAY
    Add Ticketing Amount Details With Other Tax    1234.34    10.09    11.01    12.00    13.00
    Enter Value    ${input_tktnumber}    3210987654
    Take Screenshot
# For Non-BSP Airline and APAY # 

Add Ticketing Amount Details With Other Tax
    [Arguments]    ${base_amt}=${EMPTY}    ${gst_tax}=${EMPTY}    ${hst_tax}=${EMPTY}    ${qst_tax}=${EMPTY}    ${oth_tax}=${EMPTY}
    Enter Value    ${input_baseamount}    ${base_amt}
    Enter Value    ${input_gst_tax}    ${gst_tax}
    Enter Value    ${input_hst_tax}    ${hst_tax}
    Enter Value    ${input_qst_tax}    ${qst_tax}    
    Enter Value    ${input_othtax}   ${oth_tax}
    
Add Ticketing Amount Details With Commission
    [Arguments]    ${base_amt}=${EMPTY}    ${gst_tax}=${EMPTY}    ${hst_tax}=${EMPTY}    ${qst_tax}=${EMPTY}    ${comm_amt}=${EMPTY}
    Enter Value    ${input_baseamount}    ${base_amt}
    Enter Value    ${input_gsttax}    ${gst_tax}
    Enter Value    ${input_hsttax}    ${hst_tax}
    Enter Value    ${input_qsttax}    ${qst_tax}
    Enter Value    ${input_commission}    ${comm_amt}
    
Add Ticketing Amount Details With Other Tax And Commission
    [Arguments]    ${base_amt}=${EMPTY}    ${gst_tax}=${EMPTY}    ${hst_tax}=${EMPTY}    ${qst_tax}=${EMPTY}    ${oth_tax}=${EMPTY}    ${comm_amt}=${EMPTY}
    Enter Value    ${input_baseamount}    ${base_amt}
    Enter Value    ${input_gsttax}    ${gst_tax}
    Enter Value    ${input_hsttax}    ${hst_tax}
    Enter Value    ${input_qsttax}    ${qst_tax}
    Enter Value    ${input_othtax}   ${oth_tax}
    Enter Value    ${input_commission}    ${comm_amt}
    
Add Penalty Amount Details
    [Arguments]     ${penalty_base_amt}=${EMPTY}     ${penalty_gst_tax}=${EMPTY}     ${penalty_hst_tax}=${EMPTY}    ${penalty_qst_tax}=${EMPTY}
    Enter Value    ${input_penalty_base_amount}    ${penalty_base_amt}
    Enter Value    ${input_penaltyGst}    ${penalty_gst_tax}
    Enter Value    ${input_penaltyHst}    ${penalty_hst_tax}
    Enter Value    ${input_penaltyQst}    ${penalty_qst_tax}

Select Itinerary Segments
    [Arguments]    @{segment_number}
    Wait Until Element Is Visible    ${input_segment}    30
    Click Button    ${input_segment}
    Wait Until Element Is Visible    ${list_segment}    30
    :FOR    ${segment_number}    IN    @{segment_number}
    \    Click Element    ${list_segment}//input[@value='${segment_number}']
    Click Element    ${input_segment}
    [Teardown]    Take Screenshot
 
Click Update Button
    Wait Until Element Is Visible    ${edit_order}    30
    Click Element    ${edit_order}
    [Teardown]    Take Screenshot

# Verification For Non-BSP Airline and APAY #     
Verify That Ticketing Remarks For Non-BSP With Single Segment Are Written In The PNR
    Finish PNR
    Verify Specific Remark Is Written In The PNR    RMT TKT1-VEN/TK-1234567890/VN-ACY/S2 
    Verify Specific Remark Is Written In The PNR    RMT TKT1-BA-750.00/TX1-1.00XG/TX2-2.00RC/TX3-3.00XQ/TX4-4.00XT/COMM-5.00/S2    True
    Verify Specific Remark Is Written In The PNR    RMF LCC-${airline_code}*GRAND TOTAL CAD 760.00
    Verify Specific Remark Is Written In The PNR    RIR AIRLINE LOCATOR NUMBER - 54321/S2
    
Verify That Ticketing Remarks For Non-BSP With Multiple Segments Are Written In The PNR
    Finish PNR
    Verify Specific Remark Is Written In The PNR    RMT TKT1-VEN/TK-1234567890/VN-WJ3/S2-3 
    Verify Specific Remark Is Written In The PNR    RMT TKT1-BA-750.00/TX1-1.00XG/TX2-2.00RC/TX3-3.00XQ/TX4-4.00XT/COMM-5.00/S2-3    True
    Verify Specific Remark Is Written In The PNR    RMF LCC-${airline_code}*GRAND TOTAL CAD 760.00
    Verify Specific Remark Is Written In The PNR    RIR AIRLINE LOCATOR NUMBER - 54321/S2-3
   
Verify That Ticketing Remarks For Non-BSP Without Ticket Number Are Written In The PNR
    Finish PNR
    Verify Specific Remark Is Written In The PNR    RMT TKT1-VEN/VN-C5A/S2 
    Verify Specific Remark Is Written In The PNR    RMT TKT1-BA-750.00/TX1-1.00XG/TX2-2.00RC/TX3-3.00XQ/TX4-4.00XT/COMM-5.00/S2    True
    Verify Specific Remark Is Written In The PNR    RMF LCC-${airline_code}*GRAND TOTAL CAD 760.00
    Verify Specific Remark Is Written In The PNR    RIR AIRLINE LOCATOR NUMBER - 54321/S2
    
Verify That Ticketing Remarks For Multiple Non-BSP Are Written In The PNR
    Finish PNR
    Verify Specific Remark Is Written In The PNR    RMT TKT1-VEN/TK-1234567890/VN-WJ3/S2 
    Verify Specific Remark Is Written In The PNR    RMT TKT1-BA-750.00/TX1-1.00XG/TX2-2.00RC/TX3-3.00XQ/TX4-4.00XT/COMM-5.00/S2    True
    Verify Specific Remark Is Written In The PNR    RMT TKT2-VEN/TK-1234567890/VN-WJ3/S3 
    Verify Specific Remark Is Written In The PNR    RMT TKT2-BA-750.00/TX1-1.00XG/TX2-2.00RC/TX3-3.00XQ/TX4-4.00XT/COMM-5.00/S3    True
    Verify Specific Remark Is Written In The PNR    RMF LCC-${airline_code}*GRAND TOTAL CAD 1520.00
    Verify Specific Remark Is Written In The PNR    RIR AIRLINE LOCATOR NUMBER - 54321/S2
    Verify Specific Remark Is Written In The PNR    RIR AIRLINE LOCATOR NUMBER - 54321/S3
    
Verify That Ticketing Remarks For APAY With Single Segment Are Written In The PNR
    Finish PNR
    Verify Specific Remark Is Written In The PNR    RMT TKT1-VN-CGO/BA-750.00/TX1-1.00XG/TX2-2.00RC/TX3-3.00XQ/TX4-4.00XT/S2    True
    # Verify Specific Remark Is Written In The PNR    RIR AIRLINE LOCATOR NUMBER - 1234567890/S2
    Verify Specific Remark Is Written In The PNR    RIR PAID TEST DESCRIPTION CF-1234567890 CAD750.00 PLUS 6.00TAX ON VI/S2    True
    Verify Specific Remark Is Written In The PNR    RM *EB/-AMA/-GIS
    Verify Specific Remark Is Not Written In The PNR    RM *EB/-EBA 
    Verify Specific Remark Is Not Written In The PNR    RMF LCC-${airline_code}*GRAND TOTAL CAD 760.00    
    
Verify That Ticketing Remarks For APAY With Multiple Segments Are Written In The PNR
    Finish PNR
    Verify Specific Remark Is Written In The PNR    RMT TKT1-VN-PFS/BA-750.00/TX1-1.00XG/TX2-2.00RC/TX3-3.00XQ/TX4-4.00XT/S2-3    True
    # Verify Specific Remark Is Written In The PNR    RIR AIRLINE LOCATOR NUMBER - 1234567890/S2-3
    Verify Specific Remark Is Written In The PNR    RIR PAID SEAT COSTS CF-1234567890 CAD750.00 PLUS 6.00TAX ON VI/S2-3    True
    Verify Specific Remark Is Not Written In The PNR    RMF LCC-${airline_code}*GRAND TOTAL CAD 760.00
    
Verify That Ticketing Remarks For Non-BSP And APAY With Multiple Segments Are Written In The PNR
    Finish PNR
    Verify Specific Remark Is Written In The PNR    RMT TKT1-VEN/TK-1234567890/VN-AEO/S2 
    Verify Specific Remark Is Written In The PNR    RMT TKT1-BA-750.00/TX1-1.00XG/TX2-2.00RC/TX3-3.00XQ/TX4-4.00XT/COMM-5.00/S2    True
    Verify Specific Remark Is Written In The PNR    RMF LCC-UA*GRAND TOTAL CAD 760.00
    Verify Specific Remark Is Written In The PNR    RIR AIRLINE LOCATOR NUMBER - 54321/S2
    Verify Specific Remark Is Written In The PNR    RMT TKT2-VN-CGO/BA-1230.00/TX1-11.00XG/TX2-12.00RC/TX3-13.00XQ/TX4-14.00XT/S3    True
    # Verify Specific Remark Is Written In The PNR    RIR AIRLINE LOCATOR NUMBER - 9876543210/S3
    Verify Specific Remark Is Written In The PNR    RIR PAID FREIGHT COSTS CF-9876543210 CAD1230.00 PLUS 36.00TAX ON VI/S3    True
    Verify Specific Remark Is Written In The PNR    RMT TKT3-VN-CGO/BA-1234.34/TX1-10.09XG/TX2-11.01RC/TX3-12.00XQ/TX4-13.00XT/S4    True
    # Verify Specific Remark Is Written In The PNR    RIR AIRLINE LOCATOR NUMBER - 3210987654/S4
    Verify Specific Remark Is Written In The PNR    RIR PAID BAGGAGE FEES CF-3210987654 CAD1234.34 PLUS 33.10TAX ON VI/S4    True
    Verify Specific Remark Is Written In The PNR    RM *EB/-AMA/-GIS
    Verify Specific Remark Is Not Written In The PNR    RM *EB/-EBA 
# Verification For Non-BSP Airline and APAY # 

#-----For Payment Keywords-------#  
Add Matrix Accounting Remark For Air Canada Pass Purchase 
    Navigate To Page Add Accounting Line
    Select From List By Label    ${list_accounting_type}    Air Canada Individual Pass Purchase
    Enter Value    ${input_supplier_confirmationNo}    879111
    Add Ticketing Amount Details With Commission    100.00    15.05    2.20    10.00    3.00
    Enter Value    ${input_tktnumber}    0002167899
    Enter Value    ${input_departurecity}    YVR        
    Select From List By Label    ${list_purchasetype}     COMMUTER-U.S COMMUTER
    Select From List By Label    ${list_faretype}       FLEX
    Verify Supplier Code Default Value Is Correct For Air Canada Individual Pass Purchase
    Click Save Button
    Take Screenshot
    
Add Matrix Accounting Remark For Air Canada Pass Purchase For Premium
    Navigate To Page Add Accounting Line
    Select From List By Label    ${list_accounting_type}    Air Canada Individual Pass Purchase
    Enter Value    ${input_confirmationNo}    879111
    Add Ticketing Amount Details With Commission    100.00    15.05    2.20    10.00    3.00
    Enter Value    ${input_tktnumber}    0002167899
    Enter Value    ${input_departurecity}    YVR        
    Select From List By Label    ${list_purchasetype}     COMMUTER-U.S COMMUTER
    Select From List By Label    ${list_faretype}       PREMIUM ECONOMY
    Verify Supplier Code Default Value Is Correct For Air Canada Individual Pass Purchase
    Click Save Button
    Take Screenshot

Click Matrix Accounting Remark Tab
    Wait Until Element Is Visible   ${tab_nonBsp_processing}    60
    Set Focus To Element    ${tab_nonBsp_processing} 
    Click Element    ${tab_nonBsp_processing} 
    
Click Matrix Receipt Tab
    Wait Until Element Is Visible   ${tab_matrix_receipt}   60
    Set Focus To Element    ${tab_matrix_receipt}
    Click Element    ${tab_matrix_receipt}
   
Click Add Accounting Line Button
    Click Element    ${button_addaccountingline}
    
Select Accounting Remark Type
    [Arguments]    ${accounting_remark_type}
    Set Suite Variable    ${accounting_remark_type}
    Click Element    ${list_accounting_type}
    Click Element    xpath=//option[contains(text(),'${accounting_remark_type}')]
    ${remark_description}    Set Variable    ${accounting_remark_type}
    
Enter Supplier Confirmation Number ${supplier_confirmation_number}
    Set Suite Variable    ${supplier_confirmation_number}
    Click Element    ${input_confirmationNo}
    Input Text    ${input_supplier_confirmationNo}    ${supplier_confirmation_number}
    
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

Verify Supplier Code Default Value Is Correct For ${acct_remark_type}
    Set Test Variable    ${acct_remark_type}
    ${actual_supplier_code}    Get Element Attribute    ${input_suppliercode}    ng-reflect-model
    Run Keyword If    "${acct_remark_type}" == "Air Canada Individual Pass Purchase"   Should Contain    ${actual_supplier_code}    ACJ
    Run Keyword If    "${acct_remark_type}" == "Westjet Individual Pass Purchase"   Should Contain    ${actual_supplier_code}    WJP
    Run Keyword If    "${acct_remark_type}" == "Porter Individual Pass Purchase"   Should Contain    ${actual_supplier_code}    PTP
    
Verify That Supplier Code Default Value Is Correct For ${airline_code}
    Set Test Variable    ${airline_code}
    ${actual_supplier_code}    Get Element Attribute    ${input_suppliercode}    ng-reflect-model
    Set Test Variable    ${actual_supplier_code}    ${actual_supplier_code}
    Run Keyword If    "${airline_code}" == "AC"   Should Contain    ${actual_supplier_code}    ACY
    Run Keyword If    "${airline_code}" == "WS"   Should Contain    ${actual_supplier_code}    WJ3
    Run Keyword If    "${airline_code}" == "PD"   Should Contain    ${actual_supplier_code}    PTA
    Run Keyword If    "${airline_code}" == "9M"   Should Contain    ${actual_supplier_code}    CMA
    Run Keyword If    "${airline_code}" == "MO"   Should Contain    ${actual_supplier_code}    C5A
    Run Keyword If    "${airline_code}" == "YP"   Should Contain    ${actual_supplier_code}    K9P
    Run Keyword If    "${airline_code}" == "4N"   Should Contain    ${actual_supplier_code}    A5N
    Run Keyword If    "${airline_code}" == "8P"   Should Contain    ${actual_supplier_code}    PF3
    Run Keyword If    "${airline_code}" == "WJ"   Should Contain    ${actual_supplier_code}    ALO
    Run Keyword If    "${airline_code}" == "WN"   Should Contain    ${actual_supplier_code}    SOA
    Run Keyword If    "${airline_code}" == "Seat Costs APAY"   Should Contain    ${actual_supplier_code}    PFS
    Run Keyword If    "${airline_code}" == "Other Type Of APAY"   Should Contain    ${actual_supplier_code}    CGO
    
Verify Ticketing Instruction Remarks for NonBSP Air Exchange ${with_value} Ticket Number Are Written In The PNR
    Finish PNR 
    Run Keyword If    "${with_value}" == "With"    Verify Specific Remark Is Written In The PNR    RM *NE/-EX-Y/-OTK-${orig_tkt_number}
    ...    ELSE    Verify Specific Remark Is Written In The PNR    RM *NE/-EX-Y
    Run Keyword If    "${with_value}" == "With"    Verify Specific Remark Is Written In The PNR    RMT TKT1-VEN/TK-${tkt_number}/VN-${actual_supplier_code}/S2
    ...    ELSE    Verify Specific Remark Is Written In The PNR    RMT TKT1-VEN/VN-${actual_supplier_code}/S2
    Verify Specific Remark Is Written In The PNR    RMF LCC-${airline_code}*GRAND TOTAL CAD 1111.20
    Verify Specific Remark Is Written In The PNR    RMT TKT1-BA-1000.00/TX1-100.00XG/TX2-10.00RC/TX3-1.00XQ/TX4-0.10XT/COMM-0.10/S2    True
    
Verify Ticketing Instruction Remarks for NonBSP Air Exchange ${with_value} Ticket Number And Penalty Amount Are Written In The PNR
    Finish PNR 
    Run Keyword If    "${with_value}" == "With"    Verify Specific Remark Is Written In The PNR    RM *NE/-EX-Y/-OTK-${orig_tkt_number}
    ...    ELSE    Verify Specific Remark Is Written In The PNR    RM *NE/-EX-Y
    Run Keyword If    "${with_value}" == "With"    Verify Specific Remark Is Written In The PNR    RMT TKT1-VEN/TK-${tkt_number}/VN-${actual_supplier_code}/S2
    ...    ELSE    Verify Specific Remark Is Written In The PNR    RMT TKT1-VEN/VN-${actual_supplier_code}/S2
    Verify Specific Remark Is Written In The PNR    RMF LCC-${airline_code}*GRAND TOTAL CAD 1124.20
    Verify Specific Remark Is Written In The PNR    RMT TKT1-BA-1010.00/TX1-101.00XG/TX2-11.00RC/TX3-2.00XQ/TX4-0.10XT/COMM-0.10/S2    True
    
Verify Multiple Ticketing Instruction Remarks for NonBSP Air Exchange ${with_value} Ticket Number Are Written In The PNR
    Finish PNR 
    Run Keyword If    "${with_value}" == "With"    Verify Specific Remark Is Written In The PNR    RM *NE/-EX-Y/-OTK-${orig_tkt_number}
    ...    ELSE    Verify Specific Remark Is Written In The PNR    RM *NE/-EX-Y
    Run Keyword If    "${with_value}" == "With"    Verify Specific Remark Is Written In The PNR    RMT TKT1-VEN/TK-${tkt_number}/VN-${actual_supplier_code}/S2-3
    ...     ELSE    Verify Specific Remark Is Written In The PNR    RMT TKT1-VEN/VN-${actual_supplier_code}/S2-3
    Verify Specific Remark Is Written In The PNR    RMF LCC-${airline_code}*GRAND TOTAL CAD 1111.20
    Verify Specific Remark Is Written In The PNR    RMT TKT1-BA-1000.00/TX1-100.00XG/TX2-10.00RC/TX3-1.00XQ/TX4-0.10XT/COMM-0.10/S2    True
    
Verify Penalty Remarks Are Not Written In The PNR
    Verify Specific Remark Is Not Written In The PNR    RMT TKT1-VN-${actual_supplier_code}/BA-
    
Verify Penalty Remarks Are Written In The PNR
    Verify Specific Remark Is Written In The PNR    RMT TKT1-VN-A22/BA-10.00/TX1-1.00XG/TX2-1.00RC/TX3-1.00XQ/TX4-0.00XT/S2    True

Click Save Button
    Click Element    ${button_save}
    Wait Until Page Contains Element    ${button_update}     30
    Set Focus To Element    ${button_submit_pnr}
    Set Test Variable    ${current_page}    Payment
    [Teardown]    Take Screenshot
    
Update Consultant Number To ${consultant_number}
    Enter Value    ${input_consultantNo}    ${consultant_number}    
    Set Test Variable     ${consultant_number}     ${consultant_number}
    [Teardown]    Take Screenshot
    
Verify Consultant Number Remark Is Written With The Correct Value
    Finish PNR
    Verify Specific Remark Is Written In The PNR    RM *CN/-${consultant_number}
    
Verify RMG Remark Is Written With Supplier Code ${supplier_code}
    Finish PNR
    Verify Specific Remark Is Written In The PNR    RMG ${supplier_code}PASSCHG
    
Enter ${lowest_gds_fare_value} In Lowest GDS Fare Field
    Enter Value    ${input_lowestGdsFare}    ${lowest_gds_fare_value}
    Set Test Variable    ${lowest_gds_fare_value}
    
Verify RM*U14 Remark Is Updated With Lowest GDS Fare Value For ${airline_code}
    Finish PNR
    Verify Specific Remark Is Written In The PNR    RM *U14/-${airline_code}PASS-${tkt_number}.${fare_type}/${lowest_gds_fare_value}
    
Verify Specific RIR Remarks In English Are Removed From PNR
    Finish PNR
    Verify Specific Remark Is Not Written In The PNR    RIR THE AIRLINE TICKET CHARGE ON THIS ITINERARY/INVOICE/S2
    Verify Specific Remark Is Not Written In The PNR    RIR IS FOR INTERNAL COST RE-ALLOCATION PURPOSES ONLY./S2
    Verify Specific Remark Is Not Written In The PNR    RIR **PLEASE DO NOT EXPENSE** THIS CHARGE AS IT WILL NOT APPEAR/S2
    Verify Specific Remark Is Not Written In The PNR    RIR ON YOUR CREDIT CARD STATEMENT./S2
    
Verify Specific RIR Remarks In French Are Removed From PNR
    Finish PNR
    Verify Specific Remark Is Not Written In The PNR    RIR LES FRAIS DE BILLET D AVION DE CET ITINERAIRE/FACTURE /S2
    Verify Specific Remark Is Not Written In The PNR    RIR NE SONT QU AUX FINS DE REATTRIBUTION DES COUTS A L INTERNE./S2
    Verify Specific Remark Is Not Written In The PNR    RIR **VEILLEZ NE PAS INSCRIRE** CES COUTS PUISQU ILS NE PARAITRONT PAS /S2
    Verify Specific Remark Is Not Written In The PNR    RIR SUR VOTRE RELEVE DE CARTE DE CREDIT./S2
    
#-----Verification For PassPurchase-----#
Verify Passive Segment Are Written For Air Canada Pass Purchase PNR
    Assign Current Date
    Verify Specific Remark Is Written In The PNR    AC 123 Q ${current_date}
    Verify Specific Remark Is Written In The PNR    YVRYVR GK1 0700 0800 ${current_date} 879111   True
    

Verify Passive Segment Are Written For Westjet Pass Purchase PNR
    Assign Current Date
    Verify Specific Remark Is Written In The PNR    WS 123 Q ${current_date} 
    Verify Specific Remark Is Written In The PNR    YYZYYZ GK1 0700 0800 ${current_date}   True
    Verify Specific Remark Is Written In The PNR    123456    
    
Verify Passive Segment Are Written For Porter Pass Purchase PNR
    Assign Current Date
    Verify Specific Remark Is Written In The PNR    PD 123 Q ${current_date} 
    Verify Specific Remark Is Written In The PNR    YCCYCC GK1 0700 0800 ${current_date}    True
    Verify Specific Remark Is Written In The PNR    123ABC    
    
Verify Updated Passive Segment Are Written For Air Canada Pass Purhase PNR
    Assign Current Date
    Verify Specific Remark Is Written In The PNR    AC 123 Q ${current_date}
    Verify Specific Remark Is Written In The PNR    YCCYCC GK1 0700 0800 ${current_date} 879222    True

Verify Itinerary Remarks Are Written For Air Canada Pass Purchase PNR
    Verify Specific Remark Is Written In The PNR    RIR U.S COMMUTER PASS-FLEX/S2    
    Verify Specific Remark Is Written In The PNR    ALL DETAILS DISCUSSED AND    
    Verify Specific Remark Is Written In The PNR    APPROVED BY CLIENT    
    Verify Specific Remark Is Written In The PNR    CHARGE TO CLIENTS CREDIT CARD    
    Verify Specific Remark Is Written In The PNR    AUTHORIZED BY CLIENT    
    Take Screenshot
    
Verify Itinerary Remarks Are Written For Air Canada Pass Purchase PNR For Premium
    Verify Specific Remark Is Written In The PNR    RIR U.S COMMUTER PASS-PREMIUM ECONOMY/S2    
    Verify Specific Remark Is Written In The PNR    ALL DETAILS DISCUSSED AND    
    Verify Specific Remark Is Written In The PNR    APPROVED BY CLIENT    
    Verify Specific Remark Is Written In The PNR    CHARGE TO CLIENTS CREDIT CARD    
    Verify Specific Remark Is Written In The PNR    AUTHORIZED BY CLIENT    
    Verify Specific Remark Is Written In The PNR    RIR AIR CANADA INDIVIDUAL PASS REDEMPTION-PREMIUM ECONOMY FARE/S2    True
    Verify Specific Remark Is Written In The PNR    RIR YOUR AC CONFIRMATION NUMBER IS 879111/S2    
    Take Screenshot
    
Verify Updated Itinerary Remarks Are Written For Air Canada Pass Purchase PNR
    Verify Specific Remark Is Written In The PNR    QUEBEC PASS-LATITUDE/S2    
    Verify Specific Remark Is Written In The PNR    ALL DETAILS DISCUSSED AND    
    Verify Specific Remark Is Written In The PNR    APPROVED BY CLIENT    
    Verify Specific Remark Is Written In The PNR    CHARGE TO CLIENTS CREDIT CARD    
    Verify Specific Remark Is Written In The PNR    AUTHORIZED BY CLIENT    
    Take Screenshot
    
Verify Ticketing Remarks Are Written For Air Canada Pass Purchase PNR
    Verify Specific Remark Is Written In The PNR    TKT1-VEN/TK-0002167899/VN-ACJ/S2    
    Verify Specific Remark Is Written In The PNR    TKT1-BA-100.00/TX1-15.05XG/TX2-2.20RC/TX3-10.00XQ/TX4-0.00XT/COMM-3.00/S2    True
    Take Screenshot
    
Verify PE Remark Are Written For Air Canada Pass Purchase PNR
    Verify Specific Remark Is Written In The PNR    RMF LCC-AC*GRAND TOTAL CAD 127.25
    Take Screenshot
        
Verify UDID Remark Are Written For Air Canada Pass Purchase PNR
    Verify Specific Remark Is Written In The PNR    RM *U14/-ACPASS-INDIVIDUAL
    
Verify Itinerary Remarks Are Written For Westjet Pass Purchase PNR
    Verify Specific Remark Is Written In The PNR    TOUS LES DETAILS ONT ETE PRESENTES AU CLIENT ET    
    Verify Specific Remark Is Written In The PNR    APPROUVES PAR CE DERNIER    
    Verify Specific Remark Is Written In The PNR    LES FRAIS APPLIQUES A LA CARTE DE CREDIT DES    
    Verify Specific Remark Is Written In The PNR    CLIENTS ONT ETE APPROUVES PAR LE CLIENT    
    Verify Specific Remark Is Written In The PNR    RIR WESTJET INDIVIDUAL PASS REDEMPTION/S2  
    Verify Specific Remark Is Written In The PNR    RIR VOTRE NUMERO DE CONFIRMATION WS EST 123456/S2
    Take Screenshot
    
Verify Ticketing Remarks Are Written For Westjet Pass Purchase PNR
    Verify Specific Remark Is Written In The PNR    TKT1-VEN/TK-0987612345/VN-WJP/S2    
    Verify Specific Remark Is Written In The PNR    TKT1-BA-210.00/TX1-10.00XG/TX2-2.20RC/TX3-10.00XQ/TX4-0.00XT/COMM-3.00/S2    True
    Take Screenshot
    
Verify PE Remark Are Written For Westjet Pass Purchase PNR
    Verify Specific Remark Is Written In The PNR    RMF LCC-WS*GRAND TOTAL CAD 232.20
    Take Screenshot
    
Verify UDID Remark Are Written For Westjet Pass Purchase PNR
    Verify Specific Remark Is Written In The PNR    RM *U14/-WSPASS-INDIVIDUAL
    
Verify Itinerary Remarks Are Written For Porter Pass Purchase PNR
    Verify Specific Remark Is Written In The PNR    ALL DETAILS DISCUSSED AND
    Verify Specific Remark Is Written In The PNR    APPROVED BY CLIENT
    Verify Specific Remark Is Written In The PNR    CHARGE TO CLIENTS CREDIT CARD 
    Verify Specific Remark Is Written In The PNR    AUTHORIZED BY CLIENT
    Verify Specific Remark Is Written In The PNR    RIR PORTER INDIVIDUAL PASS REDEMPTION/S2   
    Take Screenshot
    
Verify Ticketing Remarks Are Written For Porter Pass Purchase PNR
    Verify Specific Remark Is Written In The PNR    TKT1-VEN/TK-1234567890/VN-PTP/S2
    Verify Specific Remark Is Written In The PNR    TKT1-BA-105.00/TX1-15.05XG/TX2-3.00RC/TX3-12.00XQ/TX4-0.00XT/COMM-1.00/S2    True
    Take Screenshot
    
Verify PE Remark Are Written For Porter Pass Purchase PNR
    Verify Specific Remark Is Written In The PNR    RMF LCC-PD*GRAND TOTAL CAD 135.05
    Take Screenshot
    
Verify UDID Remark Are Written For Porter Pass Purchase PNR
    Verify Specific Remark Is Written In The PNR    RM *U14/-PDPASS-INDIVIDUAL
    
Verify Updated Ticketing Remarks Are Written For Air Canada Pass Purchase PNR
    Verify Specific Remark Is Written In The PNR    TKT1-VEN/TK-0987654321/VN-ACJ/S2
    Verify Specific Remark Is Written In The PNR    TKT1-BA-200.10/TX1-5.05XG/TX2-3.20RC/TX3-2.00XQ/TX4-0.00XT/COMM-3.00/S2    True
    Take Screenshot
    
Verify Updated PE Remark Are Written For Air Canada Pass Purchase PNR
    Verify Specific Remark Is Written In The PNR    LCC-AC*GRAND TOTAL CAD 210.35
    Take Screenshot
    
Verify Updated UDID Remark Are Written For Air Canada Pass Purchase PNR
    Verify Specific Remark Is Written In The PNR    RM *U14/-ACPASS-INDIVIDUAL
    
Add Matrix Accounting Remark For WestJet Pass Purchase
    Navigate To Page Add Accounting Line
    Select From List By Label    ${list_accounting_type}    Westjet Individual Pass Purchase
    Enter Value    ${input_supplier_confirmationNo}    123456
    Add Ticketing Amount Details With Commission    210.00    10.00    2.20    10.00    3.00
    Enter Value    ${input_tktnumber}    0987612345
    Enter Value    ${input_departurecity}    YYZ        
    Select From List By Label    ${list_purchasetype}     Westjet Travel Pass
    Verify Supplier Code Default Value Is Correct For Westjet Individual Pass Purchase
    Take Screenshot
    Click Save Button
    
Add Matrix Accounting Remark For Porter Pass Purchase
    Navigate To Page Add Accounting Line
    Select From List By Label    ${list_accounting_type}    Porter Individual Pass Purchase
    Enter Value    ${input_supplier_confirmationNo}    123ABC
    Add Ticketing Amount Details With Commission    105.00    15.05    3.00    12.00    1.00
    Enter Value    ${input_tktnumber}    1234567890
    Enter Value    ${input_departurecity}    YCC        
    Select From List By Label    ${list_purchasetype}     Porter Travel Pass
    Verify Supplier Code Default Value Is Correct For Porter Individual Pass Purchase
    Take Screenshot
    Click Save Button

Modify Matrix Accounting Remark For Air Canada Pass Purchase
    Open CA Corporate Test
    Click Full Wrap
    Click Payment Panel
    Click Update Button
    Select From List By Label    ${list_accounting_type}    Air Canada Individual Pass Purchase
    Enter Value    ${input_supplier_confirmationNo}    879222
    Add Ticketing Amount Details With Commission    200.10    5.05    3.20    2.00    3.00
    Enter Value    ${input_tktnumber}    0987654321
    Enter Value    ${input_departurecity}    YCC        
    Select From List By Label    ${list_purchasetype}     REGIONAL-QUEBEC
    Select From List By Label    ${list_faretype}       LATITUDE
    Verify Supplier Code Default Value Is Correct For Air Canada Individual Pass Purchase
    Take Screenshot
    Click Save Button

Navigate To Add Accounting Line
    Click Element At Coordinates    ${tab_nonBsp_processing}    0    0    
    Click Element    ${button_addaccountingline} 
    Set Test Variable    ${current_page}    Add Accounting Line
    Set Test Variable    ${ticketing_details_complete}    no

Verify Airline Corporate Pass Remarks Are Written In The PNR
    Finish PNR
    Verify Expected Remarks Are Written In The PNR
    
Select Airline Corporate Pass Redemption
    Navigate To Page Add Accounting Line
    Wait Until Element Is Visible    ${list_accounting_type}    30
    Select From List By Label    ${list_accounting_type}    Airline Corporate Pass Redemption

Add Airline Corporate Pass Redemption And Verify Default Amount Values
    Select Airline Corporate Pass Redemption
    Select Airline Corporate Pass By Value     1
    Select Itinerary Segments   2   3   4
    Enter Value    ${input_supplier_confirmationNo}    0987654321
    Enter Value    ${input_tktnumber}    1234561234
    Take Screenshot
    Set Test Variable    ${ticketing_details}    yes
    
Select Airline Corporate Pass By Value
    [Arguments]    ${index_value}
    Wait Until Page Contains Element   ${list_airlineCorporatePass}    5
    Select From List By Value     ${list_airlineCorporatePass}     ${index_value}

Select Airline Corporate Pass By Label
    [Arguments]    @{labels}
    Wait Until Page Contains Element   ${list_airlineCorporatePass}    5
    : FOR    ${label}   IN     @{labels}
    \    Select From List By Label     ${list_airlineCorporatePass}     ${label}    
    
Add Airline Corporate Pass Redemption And Verify Default Amount Values For ZZB
    Select Airline Corporate Pass Redemption
    Select Airline Corporate Pass By Label    AC/TRANSTEST.LAT/1238903456789
    Select Itinerary Segments   2   3
	Enter Value    ${input_supplier_confirmationNo}    0987654321
    Enter Value    ${input_tktnumber}    1234561234
    Enter 123 In Lowest GDS Fare Field
    Take Screenshot
    
Add Airline Corporate Pass Redemption And Verify Default Amount Values For 92Z
    Select Airline Corporate Pass Redemption
    Select Airline Corporate Pass By Label    WS/RAPIDAIR.FLE/091241421414
    Select Itinerary Segments   2
	Enter Value    ${input_supplier_confirmationNo}    0987654321
    Enter Value    ${input_tktnumber}    1234561234
    Enter 2134 In Lowest GDS Fare Field
    Take Screenshot
    
Add Airline Corporate Pass Redemption And Verify Default Amount Values For YVQ
    Select Airline Corporate Pass Redemption
    Select Airline Corporate Pass By Label    WS/RAPIDAIR.FLE/091241421414
    Select Itinerary Segments   2    4
	Enter Value    ${input_supplier_confirmationNo}    0987654321
    Enter Value    ${input_tktnumber}    1234561234
    Enter 2134 In Lowest GDS Fare Field
    Take Screenshot
    Click Save Button
    Select Airline Corporate Pass Redemption
    Select Airline Corporate Pass By Label    WS/TRANSCONTL.LAT/0140831475422
    Select Itinerary Segments   3
    Enter Value    ${input_supplier_confirmationNo}    1212321234
    Enter Value    ${input_tktnumber}    9812356781
    Enter 2311 In Lowest GDS Fare Field
    Take Screenshot
    Click Save Button
    
Add Airline Corporate Pass Redemption And Verify Default Amount Values For YFV
    Select Airline Corporate Pass Redemption
    Select Airline Corporate Pass By Label    WS/RAPIDAIR.FLE/091241421414 
    Select Itinerary Segments   2   3
    Enter Value    ${input_supplier_confirmationNo}    0987654321
    Enter 2134 In Lowest GDS Fare Field
    Take Screenshot
    Click Save Button
    #Select Airline Corporate Pass Redemption
    #Select Airline Corporate Pass By Label    WS/TRANSTEST.LAT/1238903456789
    #Select Itinerary Segments   4   5
    #Enter Value    ${input_supplier_confirmationNo}    1212321234
    #Enter 2311 In Lowest GDS Fare Field
    #Click Save Button
    #Take Screenshot
    