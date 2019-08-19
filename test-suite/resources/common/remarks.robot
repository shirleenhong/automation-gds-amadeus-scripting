*** Settings ***
Resource          common_library.robot

*** Keywords ***
Select Package
    [Arguments]    ${package}
    Wait Until Element Is Visible    css=#packageList
    Select From List By Label    css=#packageList    ${package}

Enter Number of Pax for Adult
    [Arguments]    ${pax_adult}
    #enter number of pax for adult
    Double Click Element    css=#noAdult
    Press Key    css=#noAdult    \\08
    Input Text    css=#noAdult    ${pax_adult}

Enter Base Price for Adult
    [Arguments]    ${base_price_adult}
    #enter base price for adult
    Double Click Element    css=#baseAdult
    Press Key    css=#baseAdult    \\08
    Input Text    css=#baseAdult    ${base_price_adult}

Enter Base Price Tax for Adult
    [Arguments]    ${base_price_tax_adult}
    #enter base price tax for adult
    Double Click Element    css=#taxAdult
    Press Key    css=#taxAdult    \\08
    Input Text    css=#taxAdult    ${base_price_tax_adult}

Enter Base Cruise for Adult
    [Arguments]    ${base_cruise_adult}
    #enter base cruise for adult
    Double Click Element    css=#bcruiseAdult
    Press Key    css=#bcruiseAdult    \\08
    Input Text    css=#bcruiseAdult    ${base_cruise_adult}

Enter Insurance for Adult
    [Arguments]    ${insurance_adult}
    #enter insurance cost for adult
    Double Click Element    css=#insAdult
    Press Key    css=#insAdult    \\08
    Input Text    css=#insAdult    ${insurance_adult}

Enter Rail Cost for Adult
    [Arguments]    ${rail_adult}
    #enter rail cost for adult
    Double Click Element    css=#railAdult
    Press Key    css=#railAdult    \\08
    Input Text    css=#railAdult    ${rail_adult}

Enter Base Cruise Tax for Adult
    [Arguments]    ${base_cruise_tax_adult}
    #enter base cruise tax for adult
    Double Click Element    css=#tcruiseAdult
    Press Key    css=#tcruiseAdult    \\08
    Input Text    css=#tcruiseAdult    ${base_cruise_tax_adult}

Enter Number of Pax for Child
    [Arguments]    ${pax_child}
    #enter number of pax for child
    Double Click Element    css=#noChild
    Press Key    css=#noChild    \\08
    Input Text    css=#noChild    ${pax_child}

Enter Base Price for Child
    [Arguments]    ${base_price_child}
    #enter base price for child
    Double Click Element    css=#baseChild
    Press Key    css=#baseChild    \\08
    Input Text    css=#baseChild    ${base_price_child}

Enter Base Price Tax for Child
    [Arguments]    ${base_price_tax_child}
    #enter base price tax for child
    Double Click Element    css=#taxChild
    Press Key    css=#taxChild    \\08
    Input Text    css=#taxChild    ${base_price_tax_child}

Enter Base Cruise for Child
    [Arguments]    ${base_cruise_child}
    #enter base cruise for child
    Double Click Element    css=#bcruiseChild
    Press Key    css=#bcruiseChild    \\08
    Input Text    css=#bcruiseChild    ${base_cruise_child}

Enter Base Cruise Tax for Child
    [Arguments]    ${base_cruise_tax_child}
    #enter base cruise tax for child
    Double Click Element    css=#tcruiseChild
    Press Key    css=#tcruiseChild    \\08
    Input Text    css=#tcruiseChild    ${base_cruise_tax_child}

Enter Rail Cost for Child
    [Arguments]    ${rail_child}
    #enter rail cost for child
    Double Click Element    css=#railChild
    Press Key    css=#railChild    \\08
    Input Text    css=#railChild    ${rail_child}

Enter Insurance for Child
    [Arguments]    ${insurance_child}
    #enter insurance cost for child
    Double Click Element    css=#insChild
    Press Key    css=#insChild    \\08
    Input Text    css=#insChild    ${insurance_child}

Enter Number of Pax for Infant
    [Arguments]    ${pax_infant}
    #enter number of pax for infant
    Double Click Element    css=#noInfant
    Press Key    css=#noInfant    \\08
    Input Text    css=#noInfant    ${pax_infant}

Enter Base Price for Infant
    [Arguments]    ${base_price_infant}
    #enter base price for infant
    Double Click Element    css=#baseInfant
    Press Key    css=#baseInfant    \\08
    Input Text    css=#baseInfant    ${base_price_infant}

Enter Base Price Tax for Infant
    [Arguments]    ${base_price_tax_infant}
    #enter base price tax for infant
    Double Click Element    css=#taxInfant
    Press Key    css=#taxInfant    \\08
    Input Text    css=#taxInfant    ${base_price_tax_infant}

Enter Base Cruise for Infant
    [Arguments]    ${base_cruise_infant}
    #enter base cruise for infant
    Double Click Element    css=#bcruiseInfant
    Press Key    css=#bcruiseInfant    \\08
    Input Text    css=#bcruiseInfant    ${base_cruise_infant}

Enter Base Cruise Tax for Infant
    [Arguments]    ${base_cruise_tax_infant}
    #enter base cruise tax for infant
    Double Click Element    css=#tcruiseInfant
    Press Key    css=#tcruiseInfant    \\08
    Input Text    css=#tcruiseInfant    ${base_cruise_tax_infant}

Enter Rail Cost for Infant
    [Arguments]    ${rail_infant}
    #enter rail cost for infant
    Double Click Element    css=#railInfant
    Press Key    css=#railInfant    \\08
    Input Text    css=#railInfant    ${rail_infant}

Enter Insurance for Infant
    [Arguments]    ${insurance_infant}
    #enter insurance cost for infant
    Double Click Element    css=#insInfant
    Press Key    css=#insInfant    \\08
    Input Text    css=#insInfant    ${insurance_infant}

Enter Currency for ITC
    [Arguments]    ${itc_currency}
    #enter Currency for ITC
    Wait Until Element Is Visible    css=#itcCurrencyType    30
    Clear Element Text    css=#itcCurrencyType
    Input Text    css=#itcCurrencyType    ${itc_currency}

Enter ITC Hotel Cost
    [Arguments]    ${hotel_cost}
    #enter hotel cost
    Double Click Element    css=#hotelAdult
    Press Key    css=#hotelAdult    \\08
    Input Text    css=#hotelAdult    ${hotel_cost}

Enter ITC Car Cost
    [Arguments]    ${car_cost}
    #enter car cost
    Double Click Element    css=#carAdult
    Press Key    css=#carAdult    \\08
    Input Text    css=#carAdult    ${car_cost}

Enter ITC Deposit
    [Arguments]    ${itc_deposit}
    #enter deposit
    Double Click Element    css=#depAdult
    Press Key    css=#depAdult    \\08
    Input Text    css=#depAdult    ${itc_deposit}

Enter ITC Balance Due Date
    [Arguments]    ${itc_balance_due_date}
    #enter balance due date
    Clear Element Text    css=#dueDate
    Input Text    css=#dueDate    ${itc_balance_due_date}
    [Teardown]    Take Screenshot

Enter ITC Commission Amount
    [Arguments]    ${commission_amount}
    #enter comission amount
    Double Click Element    css=#commission
    Press Key    css=#commission    \\08
    Input Text    css=#commission    ${commission_amount}
    [Teardown]    Take Screenshot

Select Tour Package Currency Type
    [Arguments]    ${tour_currency_type}
    Wait Until Page Contains Element    css=#tourCurrencyType    30
    Input Text    css=#tourCurrencyType    ${tour_currency_type}
    Set Test Variable    ${tour_currency_type}

Enter Tour Package Number Of Adults
    [Arguments]    ${tour_adult}
    Clear Element Text    css=#adultNum
    Input Text    css=#adultNum    ${tour_adult}
    Set Test Variable    ${tour_adult}

Enter Tour Package Base Cost Per Adult
    [Arguments]    ${tour_adult_base_amt}
    Double Click Element    css=#baseCost
    Press Key    css=#baseCost    \\08
    Input Text    css=#baseCost    ${tour_adult_base_amt}
    Set Test Variable    ${tour_adult_base_amt}

Enter Tour Package Taxes Per Adult
    [Arguments]    ${tour_adult_taxes_amt}
    Double Click Element    css=#taxesPerAdult
    Press Key    css=#taxesPerAdult    \\08
    Input Text    css=#taxesPerAdult    ${tour_adult_taxes_amt}
    Set Test Variable    ${tour_adult_taxes_amt}

Enter Tour Package Insurance Per Adult
    [Arguments]    ${tour_adult_insurance_amt}
    Double Click Element    css=#insurancePerAdult
    Press Key    css=#insurancePerAdult    \\08
    Input Text    css=#insurancePerAdult    ${tour_adult_insurance_amt}
    Set Test Variable    ${tour_adult_insurance_amt}

Enter Tour Package Number Of Children
    [Arguments]    ${tour_child}
    Double Click Element    css=#childrenNumber
    Press Key    css=#childrenNumber    \\08
    Input Text    css=#childrenNumber    ${tour_child}
    Set Test Variable    ${tour_child}

Enter Tour Package Base Cost Per Child
    [Arguments]    ${tour_child_base_amt}
    Double Click Element    css=#childBaseCost
    Press Key    css=#childBaseCost    \\08
    Input Text    css=#childBaseCost    ${tour_child_base_amt}
    Set Test Variable    ${tour_child_base_amt}

Enter Tour Package Taxes Per Child
    [Arguments]    ${tour_child_taxes_amt}
    Double Click Element    css=#taxesPerChild
    Press Key    css=#taxesPerChild    \\08
    Input Text    css=#taxesPerChild    ${tour_child_taxes_amt}
    Set Test Variable    ${tour_child_taxes_amt}

Enter Tour Package Insurance Per Child
    [Arguments]    ${tour_child_insurance_amt}
    Double Click Element    css=#insurancePerChild
    Press Key    css=#insurancePerChild    \\08
    Input Text    css=#insurancePerChild    ${tour_child_insurance_amt}

Enter Tour Package Number Of Infant
    [Arguments]    ${tour_infant}
    Double Click Element    css=#infantNumber
    Press Key    css=#infantNumber    \\08
    Input Text    css=#infantNumber    ${tour_infant}

Enter Tour Package Total Cost Per Infant
    [Arguments]    ${tour_infant_base_amt}
    Double Click Element    css=#totalCostPerInfant
    Press Key    css=#totalCostPerInfant    \\08
    Input Text    css=#totalCostPerInfant    ${tour_infant_base_amt}

Enter Tour Package Deposit Paid
    [Arguments]    ${tour_deposit_amt}
    Double Click Element    css=#depositPaid
    Press Key    css=#depositPaid    \\08
    Input Text    css=#depositPaid    ${tour_deposit_amt}
    Set Test Variable    ${tour_deposit_amt}

Enter Tour Package Balance Due Date
    [Arguments]    ${tour_balance_due_date}
    Input Text    css=#balanceDueDate    ${tour_balance_due_date}
    Set Test Variable    ${tour_balance_due_date}

Enter Tour Package Commission Amount
    [Arguments]    ${tour_commission_amount}
    Double Click Element    css=#commission
    Press Key    css=#commission    \\08
    Input Text    css=#commission    ${tour_commission_amount}
    Set Test Variable    ${tour_commission_amount}
    [Teardown]    Take Screenshot

Click Remarks Tab
    [Arguments]    ${remarks_tab}
    Wait Until Element Is Visible     xpath=//span[contains(text(), '${remarks_tab}')]    30   
    Set Focus To Element     xpath=//span[contains(text(), '${remarks_tab}')]
    Click Element    xpath=//span[contains(text(), '${remarks_tab}')]

Select Segment From The List
    [Arguments]    ${button_order}    @{segment_number}
    Click Element    xpath=//div[@formarrayname='segments'][${button_order}]//button[@id='button-basic']
    Set Focus To Element    xpath=//div[@formarrayname='segments'][${button_order}]//ul[@id='dropdown-basic']
    : FOR    ${segment_number}    IN    @{segment_number}
    \    Select Checkbox    xpath=//div[@formarrayname='segments'][${button_order}]//input[@value='${segment_number}']

Enter Check-in At Details
    [Arguments]    ${checkin_order}    ${checkin_at}
    Double Click Element    xpath=//div[@formarrayname='segments'][${checkin_order}]//input[@formcontrolname='airline']
    Press Key    xpath=//div[@formarrayname='segments'][${checkin_order}]//input[@formcontrolname='airline']    \\08
    Input Text    xpath=//div[@formarrayname='segments'][${checkin_order}]//input[@formcontrolname='airline']    ${checkin_at}
    Set Test Variable    ${checkin_at}    ${checkin_at.upper()}
    [Teardown]    Take Screenshot

Click Add Codeshare Button
    Click Element    xpath=//i[@id='add']

Click Add Fare Rule button
    Click Element    xpath=//button[contains(text(), 'Add Fare Rule')]

Select Airline
    [Arguments]    ${airline}
    Select From List By Label    css=#airlineCode    ${airline}

Select Fare Rule Remarks
    [Arguments]    ${fare_rule_remark}=EMPTY
    Run Keyword If    '${fare_rule_remark}' == 'Ticket MIN/MAX Stay'    Select Checkbox    css=#isTicketMinMax
    Run keyword if    '${fare_rule_remark}' == 'Ticket Non-Refundable'    Select Checkbox    css=#isTicketNonRefundable
    Run keyword if    '${fare_rule_remark}' == 'Non-Ref/Tkt Value'    Select Checkbox    css=#isTicketNonRef

Add Associated Remarks
    [Arguments]    ${remark_order}    ${associated_remark}
    # Double Click Element    xpath=//div[@formarrayname='items'][${remark_order}]//input[@formcontrolname='remarkText']
    # Press Key    xpath=//div[@formarrayname='items'][${remark_order}]//input[@formcontrolname='remarkText']    \\08
    Input Text    xpath=//div[@formarrayname='items'][${remark_order}]//input[@formcontrolname='remarkText']    ${associated_remark}
    [Teardown]    Take Screenshot

Enter Currency
    [Arguments]    ${currency}
    Input Text    css=#currencyType    ${currency}

Enter Minimum Change Fee
    [Arguments]    ${min_change_fee}
    Input Text    css=#minChangeFee    ${min_change_fee}
    [Teardown]    Take Screenshot

Enter Ticket Amount
    [Arguments]    ${ticket_amt}
    Input Text    css=#ticketAmount    ${ticket_amt}
    [Teardown]    Take Screenshot

Enter Non-Refundable Percentage
    [Arguments]    ${nonref_percentage}
    Input Text    css=#nonRefundable    ${nonref_percentage}
    [Teardown]    Take Screenshot

Select Ticket Amount Or Percentage
    [Arguments]    ${amt_percentage}
    Wait Until Page Contains Element    //label[@class='control control-radio']    30
    Run Keyword If    '${amt_percentage}' == 'Non-Refundable'       Click Element    xpath=//span[contains(text(), 'Non-Refundable%')]
    Run Keyword If    '${amt_percentage}' == 'Ticket Amount'        Click Element    xpath=//label[contains(text(), 'Ticket Amount')]

Enter Departure/Arrival
    [Arguments]     ${city_pair}
    Wait Until Element Is Visible   css=#cityPair   30
    Input Text      css=#cityPair       ${city_pair} 

Select Fare Rule
    Select From List By Index  css=#fareRuleList  0
    [Teardown]    Take Screenshot

Select RBC Product Type
    [Arguments]     ${rbc_product_type}
    Input Text      css=#productType    ${rbc_product_type}

Enter Cardholder First Name And Last Name
    [Arguments]     ${cc_first_name}        ${cc_last_name}
    Input Text  css=#firstname      ${cc_first_name} 
    Input Text  css=#lastname      ${cc_last_name}

Enter First And Last Visa Number
    [Arguments]     ${visa_first_number}        ${visa_last_number}     
    Input Text      css=#firstvisanumber    ${visa_first_number}  
    Input Text      css=#lastvisanumber    ${visa_last_number}  

Enter RBC Points Redeemed
    [Arguments]     ${points_redeemed}
    Input Text  css=#pointsRedeemed    ${points_redeemed}

Enter Value Of Points
    [Arguments]     ${points_value}
    Input Text  css=#valuepoints    ${points_value}

Enter Supplier Name
    [Arguments]     ${supplier_name}
    Input Text      css=#suppliername       ${supplier_name}

Click Add RBC Redemption Points Button
    Click Element    xpath=//button[contains(text(), 'Add RBC Points Redemption ')]

Enter GST Per Adult
    [Arguments]     ${gst_adult}
    Input Text  css=#gst    ${gst_adult}       

Enter HST Per Adult
    [Arguments]     ${hst_adult}
    Input Text  css=#hst    ${hst_adult}

Enter QST Per Adult
    [Arguments]     ${qst_adult}
    Input Text  css=#qst    ${qst_adult}

Enter All Other Taxes
    [Arguments]     ${other_tax_adult}
    Input Text  css=#otherTaxes    ${other_tax_adult}
    [Teardown]    Take Screenshot
    
Enter Number of Adults
    [Arguments]     ${number_adult}
    Input Text  css=#noofadult    ${number_adult}

Enter Total Base Cost Per Adult
    [Arguments]     ${total_base_adult}
    Input Text  css=#totalbasecostadult    ${total_base_adult}  

Enter Number Of Children
    [Arguments]    ${number_children}
    Input Text  css=#noofchildren    ${number_children}

Enter Total Base Cost Per Child
    [Arguments]     ${total_base_child}
    Input Text  css=#totalbasecostchild    ${total_base_child} 

Enter GST Per Child
    [Arguments]     ${gst_child}
    Input Text  css=#cgst    ${gst_child}       

Enter HST Per Child
    [Arguments]     ${hst_child}
    Input Text  css=#chst    ${hst_child}

Enter QST Per Child
    [Arguments]     ${qst_child}
    Input Text  css=#cqst    ${qst_child}

Enter All Other Taxes For Child
    [Arguments]     ${other_tax_child}
    Input Text    css=#cotherTaxes    ${other_tax_child}
    Press Key    css=#cotherTaxes   \\09
    [Teardown]    Take Screenshot

Enter PCT
    [Arguments]     ${pct}
    Input Text    css=#pct    ${pct}
    [Teardown]    Take Screenshot

Enter Number of Bookings
    [Arguments]     ${number_bookings}
    Input Text    css=#numberbookings    ${number_bookings}

Enter Total Base Cost Per Booking
    [Arguments]     ${total_base_cost}
    Input Text  css=#totalbasecost    ${total_base_cost} 
    [Teardown]    Take Screenshot

Enter Other Product Type Description
    [Arguments]     ${other_description}
    Input Text    css=#othValue    ${other_description}
    [Teardown]    Take Screenshot

Select Segment For Associated Remark
    [Arguments]    ${button_order}    @{segment_number}
    Click Element    xpath=//div[@formarrayname='items'][${button_order}]//button[@id='button-basic']
    Set Focus To Element    xpath=//div[@formarrayname='items'][${button_order}]//ul[@id='dropdown-basic']
    : FOR    ${segment_number}    IN    @{segment_number}
    \    Select Checkbox    xpath=//div[@formarrayname='items'][${button_order}]//input[@value='${segment_number}']
    [Teardown]    Take Screenshot