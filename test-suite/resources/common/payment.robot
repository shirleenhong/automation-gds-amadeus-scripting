*** Settings ***
Resource          common_library.robot

*** Keywords ***
Click Add Matrix Receipt Button
    Sleep    5
    Scroll Element Into View    xpath=//button[contains(text(), 'Add Matrix Receipt')]
    Click Element    xpath=//button[contains(text(), 'Add Matrix Receipt')]

Select Bank Account
    [Arguments]    ${bank_account}
    Click Element    css=#bankAccount
    Click Element    xpath=//option[contains(text(), '${bank_account}')]
    Set Suite Variable    ${bank_account}

Select Passenger Name
    [Arguments]    ${passenger_name}
    Click Element    css=#pasenger
    Input Text    css=#pasenger    ${passenger_name}
    Press Key    css=#pasenger    \\09
    Set Suite Variable    ${passenger_name}

Enter Amount
    [Arguments]    ${amount}
    Double Click Element    css=#amount
    Press Key    css=#amount    \\08
    Input Text    css=#amount    ${amount}
    Set Suite Variable    ${amount}

Enter GC Number
    [Arguments]    ${gc_number}
    Double Click Element    css=#gcNumber
    Press Key    css=#gcNumber    \\08
    Input Text    css=#gcNumber    ${gc_number}
    Set Suite Variable    ${gc_number}

Select Mode Of Payment
    [Arguments]    ${mode_of_payment}
    Click Element    css=#modePayment
    Click Element    xpath=//option[contains(text(), '${mode_of_payment}')]

Click Save Button
    Click Element    xpath=//button[contains(text(), 'Save')]
    Wait Until Page Contains Element    xpath=//i[@class='fas fa-edit']    30
    Set Focus To Element    xpath=//button[contains(text(), 'SUBMIT TO PNR')]
    [Teardown]    Take Screenshot

Enter Credit Card Number
    [Arguments]    ${credit_card_number}
    Double Click Element    css=#ccNo
    Press Key    css=#ccNo    \\08
    Input Text    css=#ccNo    ${credit_card_number}
    Set Suite Variable    ${credit_card_number}

Enter Credit Card Expiration Date
    [Arguments]    ${exp_date}
    Double Click Element    css=#expDate
    Press Key    css=#expDate    \\08
    Input Text    css=#expDate    ${exp_date}

Enter RBC Points
    [Arguments]    ${rbc_points}
    Double Click Element    css=#points
    Press Key    css=#points    \\08
    Input Text    css=#points    ${rbc_points}
    Set Suite Variable    ${rbc_points}

Enter CWT Reference
    [Arguments]    ${cwt_reference}
    Double Click Element    css=#cwtRef
    Press Key    css=#cwtRef    \\08
    Input Text    css=#cwtRef    ${cwt_reference}
    Set Suite Variable    ${cwt_reference}

Enter Last Four Digit VI
    [Arguments]    ${last_four_vi}
    Double Click Element    css=#lastFourVi
    Press Key    css=#lastFourVi    \\08
    Input Text    css=#lastFourVi    ${last_four_vi}
    Set Suite Variable    ${last_four_vi}

Click Payment Tab
    [Arguments]    ${payment_tab}
    Wait Until Element Is Visible    xpath=//span[contains(text(), '${payment_tab}')]    60
    Set Focus To Element    xpath=//span[contains(text(), '${payment_tab}')]
    Click Element    xpath=//span[contains(text(), '${payment_tab}')]

Select Traveler Province
    [Arguments]    ${province}
    Select From List By Label    css=#address    ${province}
    [Teardown]    Take Screenshot

Select Segment Association
    [Arguments]    ${segment_assoc}
    Select From List By Label    xpath=//select[@id=' segmentAssoc']    ${segment_assoc}

Enter Credit Card Vendor
    [Arguments]    ${cc_vendor}
    Input Text    css=#vendorCode    ${cc_vendor}

Select Segment Number
    [Arguments]    ${segment_num}
    Select From List By Label    xpath=//select[@id='segmentNum']    ${segment_num}

Select Leisure Fee Form of Payment
    [Arguments]    ${form_of_payment}
    Select From List By Label    css=#paymentType    ${form_of_payment}

Select Credit Card Vendor Code
    [Arguments]    ${cc_vendor_code}
    Wait Until Page Contains Element    css=#vendorCode    30
    Click Element    css=#vendorCode
    Sleep    2
    Click Element    xpath=//option[contains(text(),'${cc_vendor_code}')]
    Comment    Select From List By Value    css=#vendorCode    ${cc_vendor_code}
    Set Suite Variable    ${cc_vendor_code}

Enter Reason for No Association Fees
    [Arguments]    ${no_fee_reason}
    #add reason no assoc fee
    Wait Until Element Is Visible    css=#noFeeReason    30
    Clear Element Text    css=#noFeeReason
    Input Text    css=#noFeeReason    ${no_fee_reason}
    [Teardown]    Take Screenshot

Click Add Accounting Line Button
    Scroll Element Into View    xpath=//button[contains(text(), 'Add Accounting Line')]
    Click Element    xpath=//button[contains(text(), 'Add Accounting Line')]

Enter Matrix Accounting Description
    [Arguments]    ${remark_description}
    Wait Until Page Contains Element    css=#descriptionapay    30
    Double Click Element    css=#descriptionapay
    Press Key    css=#descriptionapay    \\08
    Input Text    css=#descriptionapay    ${remark_description}
    Set Suite Variable    ${remark_description}

Select Accounting Remark Type
    [Arguments]    ${accounting_remark_type}
    Click Element    css=#accountingTypeRemark
    Click Element    xpath=//option[contains(text(),'${accounting_remark_type}')]
    ${remark_description}    Set Variable    ${accounting_remark_type}
    Set Suite Variable    ${accounting_remark_type}

Select Passenger
    [Arguments]    ${passenger_number}
    Click Element    css=#passengerNo
    Click Element    xpath=//option[contains(text(),'${passenger_number}')]
    Press Key    css=#passengerNo    \\09
    Set Suite Variable    ${passenger_number}
    [Teardown]    Take Screenshot

Enter Supplier Code
    [Arguments]    ${supplier_code}
    Double Click Element    css=#supplierCodeName
    Press Key    css=#supplierCodeName    \\01
    Press Key    css=#supplierCodeName    \\08
    Input Text    css=#supplierCodeName    ${supplier_code}
    Press Key    css=#supplierCodeName    \\09
    Set Suite Variable    ${supplier_code}

Enter Supplier Confirmation Number
    [Arguments]    ${supplier_confirmation_number}
    Click Element    css=#supplierConfirmatioNo
    Input Text    css=#supplierConfirmatioNo    ${supplier_confirmation_number}
    Set Suite Variable    ${supplier_confirmation_number}

Select Matrix Form Of Payment
    [Arguments]    ${fop}
    Click Element    css=#fop
    Click Element    xpath=//option[contains(text(),'${fop}')]
    Click Element    css=#fop
    Press Key    css=#fop    \\09
    Set Suite Variable    ${fop}

Enter Base Amount
    [Arguments]    ${base_amount}
    Double Click Element    css=#baseAmount
    Press Key    css=#baseAmount    \\08
    Input Text    css=#baseAmount    ${base_amount}
    Set Suite Variable    ${base_amount}
    [Teardown]    Take Screenshot

Enter Commission Without Tax Amount
    [Arguments]    ${commission_with_tax}
    # Press Key    css=#baseAmount    \\09
    Double Click Element    css=#commisionWithoutTax
    Press Key    css=#commisionWithoutTax    \\08
    Input Text    css=#commisionWithoutTax    ${commission_with_tax}
    Press Key    css=#commisionWithoutTax    \\09
    Set Suite Variable    ${commission_with_tax}
    [Teardown]    Take Screenshot

Enter GST Tax Amount
    [Arguments]    ${gst_tax}
    Double Click Element    css=#gst
    Press Key    css=#gst    \\08
    Input Text    css=#gst    ${gst_tax}
    Set Suite Variable    ${gst_tax}
    [Teardown]    Take Screenshot

Enter HST Tax Amount
    [Arguments]    ${hst_tax}
    Double Click Element    css=#hst
    Press Key    css=#hst    \\08
    Input Text    css=#hst    ${hst_tax}
    Set Suite Variable    ${hst_tax}
    [Teardown]    Take Screenshot

Enter QST Tax Amount
    [Arguments]    ${qst_tax}
    Double Click Element    css=#qst
    Press Key    css=#qst    \\08
    Input Text    css=#qst    ${qst_tax}
    Press Key    css=#qst    \\09
    Set Suite Variable    ${qst_tax}
    [Teardown]    Take Screenshot

Enter Other Tax Amount
    [Arguments]    ${other_tax}
    Double Click Element    css=#otherTax
    Press Key    css=#otherTax    \\08
    Input Text    css=#otherTax    ${other_tax}
    Set Suite Variable    ${other_tax}
    [Teardown]    Take Screenshot

Enter Ticket Number
    [Arguments]    ${ticket_number}
    Double Click Element    css=#tktLine
    Press Key    css=#tktLine    \\08
    Input Text    css=#tktLine    ${ticket_number}
    Press Key    css=#tktLine    \\09
    Set Suite Variable    ${ticket_number}

Enter Price Vs Other Supplier
    [Arguments]    ${price_vs_supplier}
    #enter price vs other supplier value
    Input Text    css=#priceVsSupplier    ${price_vs_supplier}

Select Is This Air Only?
    [Arguments]    ${is_this_air}
    #select is this air only
    Wait Until Element Is Visible    css=#airOnly    30
    Select From List By Value    css=#airOnly    ${is_this_air}

Enter Hotel/ Property Name
    [Arguments]    ${property_name}
    #enter hotel/property name
    Input Text    css=#propertyName    ${property_name}

Select Flights
    [Arguments]    ${select_flight}
    #select flight
    Select From List By Value    css=#flightType    ${select_flight}

Select Exclusive Property
    [Arguments]    ${exclusive_property}
    #select exclusive property?
    Select From List By Label    css=#exclusiveProperty    ${exclusive_property}

Enter Group
    [Arguments]    ${group}
    #select group
    Select From List By Label    css=#group    ${group}
    [Teardown]    Take Screenshot

Select Preferred Vendor
    [Arguments]    ${preferred_vendor}
    #select preferred vendor
    Select From List By Label    css=#preferredVendor    ${preferred_vendor}
    [Teardown]    Take Screenshot

Click Update Button
    [Arguments]    ${edit_order}
    Click Element    xpath=//tr[${edit_order}]//i[@class='fas fa-edit']

Click Payment Delete Button
    [Arguments]    ${delete_order}
    Sleep    3
    Click Element    xpath=//tr[${delete_order}]//i[@class=' fas fa-trash-alt']
    Sleep    3

Enter Commission Percentage
    [Arguments]    ${commission_percent}
    Double Click Element    css=#commisionPercentage
    Press Key    css=#commisionPercentage    \\08
    Input Text    css=#commisionPercentage    ${commission_percent}
    Press Key    css=#commisionPercentage    \\09

Select Segment
    [Arguments]    @{segment_number}
    Wait Until Element Is Visible    xpath=//app-segment-select[@id='segmentNo']//button[@id='button-basic']    30
    Click Button    xpath=//app-segment-select[@id='segmentNo']//button[@id='button-basic']
    Wait Until Element Is Visible    xpath=//ul[@id='dropdown-basic']    30
    : FOR    ${segment_number}    IN    @{segment_number}
    \    Click Element    xpath=//ul[@id='dropdown-basic']//input[@value='${segment_number}']
    Click Element    xpath=//app-segment-select[@id='segmentNo']//button[@id='button-basic']
    [Teardown]    Take Screenshot

Enter Description
    [Arguments]    ${description}
    Double Click Element    xpath=//textarea[@id='description']
    Press Key    xpath=//textarea[@id='description']    \\08
    Input Text    xpath=//textarea[@id='description']    ${description}
    Set Suite Variable    ${description}

Click Add Leisure Fee Collection Button
    Scroll Element Into View    xpath=//button[contains(text(), 'Add Leisure Fee Collection')]
    Click Element    xpath=//button[contains(text(), 'Add Leisure Fee Collection')]

Select Tax Exemption
    [Arguments]    @{tax_exemption}
    : FOR    ${tax_exemption}    IN    @{tax_exemption}
    \    Run Keyword If    '${tax_exemption}' == 'HST Exempt'    Select Checkbox    xpath=//input[@value='RC']
    \    Run Keyword If    '${tax_exemption}' == 'GST Exempt'    Select Checkbox    xpath=//input[@value='XG']
    \    Run Keyword If    '${tax_exemption}' == 'QST Exempt'    Select Checkbox    xpath=//input[@value='XQ']
    [Teardown]    Take Screenshot

Unselect Tax Exemption
    [Arguments]    @{tax_exemption}
    : FOR    ${tax_exemption}    IN    @{tax_exemption}
    \    Run Keyword If    '${tax_exemption}' == 'HST Exempt'    Unselect Checkbox    xpath=//input[@value='RC']
    \    Run Keyword If    '${tax_exemption}' == 'GST Exempt'    Unselect Checkbox    xpath=//input[@value='XG']
    \    Run Keyword If    '${tax_exemption}' == 'QST Exempt'    Unselect Checkbox    xpath=//input[@value='XQ']

Select Type Of Pass Purchase
    [Arguments]    ${pass_purchase_type}
    Select From List By Value    css=#passPurchase    ${pass_purchase_type}
    [Teardown]    Take Screenshot

Select Fare Type
    [Arguments]    ${fare_type}
    Select From List By Value    css=#fareType    ${fare_type}
    [Teardown]    Take Screenshot

Enter Penalty Amount
    [Arguments]    ${penalty_amount}
    Double Click Element    css=#penaltyBaseAmount
    Press Key    css=#penaltyBaseAmount    \\08
    Input Text    css=#penaltyBaseAmount    ${penalty_amount}
    Set Suite Variable    ${penalty_amount}
    [Teardown]    Take Screenshot

Enter Penalty GST Amount
    [Arguments]    ${penalty_gst}
    Double Click Element    css=#penaltyGst
    Press Key    css=#penaltyGst    \\08
    Input Text    css=#penaltyGst    ${penalty_gst}
    Set Suite Variable    ${penalty_gst}
    [Teardown]    Take Screenshot

Enter Penalty HST Amount
    [Arguments]    ${penalty_hst}
    Double Click Element    css=#penaltyHst
    Press Key    css=#penaltyHst    \\08
    Input Text    css=#penaltyHst    ${penalty_hst}
    Set Suite Variable    ${penalty_hst}
    [Teardown]    Take Screenshot

Enter Penalty QST Amount
    [Arguments]    ${penalty_qst}
    Double Click Element    css=#penaltyQst
    Press Key    css=#penaltyQst    \\08
    Input Text    css=#penaltyQst    ${penalty_qst}
    Set Suite Variable    ${penalty_qst}
    [Teardown]    Take Screenshot

Enter Original Ticket Number
    [Arguments]    ${original_ticket}
    Double Click Element    css=#originalTktLine
    Press Key    css=#originalTktLine    \\08
    Input Text    css=#originalTktLine    ${original_ticket}
    Set Suite Variable    ${original_ticket}
    [Teardown]    Take Screenshot
