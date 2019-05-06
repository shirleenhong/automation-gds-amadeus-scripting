*** Settings ***
Resource          common_library.robot

*** Keywords ***
Select Package
    [Arguments]    ${package}
    Wait Until Element Is Visible    css=#packageList
    Select From List    css=#packageList    ${package}

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

Enter ITC Commission Amount
    [Arguments]    ${commission_amount}
    #enter comission amount
    Double Click Element    css=#commission
    Press Key    css=#commission    \\08
    Input Text    css=#commission    ${commission_amount}

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
    Click Element    xpath=//span[contains(text(), '${remarks_tab}')]

Select Segment From The List
    [Arguments]    ${button_order}  @{segment_number}
    Click Element    xpath=//div[@formarrayname='segments'][${button_order}]//button[@id='button-basic']
    Focus  xpath=//div[@formarrayname='segments'][${button_order}]//ul[@id='dropdown-basic']
    : FOR    ${segment_number}    IN    @{segment_number}
    \    Select Checkbox    xpath=//div[@formarrayname='segments'][${button_order}]//input[@value='${segment_number}']

Enter Check-in At Details
    [Arguments]    ${checkin_order}  ${checkin_at}
    Double Click Element    xpath=//div[@formarrayname='segments'][${checkin_order}]//input[@formcontrolname='airline']
    Press Key    xpath=//div[@formarrayname='segments'][${checkin_order}]//input[@formcontrolname='airline']    \\08
    Input Text    xpath=//div[@formarrayname='segments'][${checkin_order}]//input[@formcontrolname='airline']    ${checkin_at}
    Set Test Variable    ${checkin_at}    ${checkin_at.upper()}
    [Teardown]    Take Screenshot

Click Add Codeshare Button
    Click Element    xpath=//i[@id='add']
