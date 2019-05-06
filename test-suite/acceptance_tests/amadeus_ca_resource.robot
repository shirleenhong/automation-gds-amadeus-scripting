*** Settings ***
Resource          ../resources/common/common_library.robot
Resource          ../resources/common/core.robot
Resource          ../resources/common/payment.robot

*** Keywords ***
Login To Amadeus Sell Connect
    Open Browser    https://acceptance.custom.sellingplatformconnect.amadeus.com/LoginService/login.jsp?SITE=I05WI05W&OV_SITE_UM_USE_PREF_PACKAGE=FALSE&OV_SITE_UM_USE_HMC_HIERARCHY=FALSE&LANGUAGE=US&refreshOnError=true&appUri=/app_sell2.0/apf/init/login    gc
    Maximize Browser Window
    Wait Until Element Is Visible    css=#username > span:first-child input    60
    Enter Username    U002MCC
    Enter Dutycode    GS
    Enter Office ID    YTOWL2107
    Enter Password    Amasel03@
    Wait Until Element Is Not Visible    css=#logi_confirmButton .xButtonDisabled    30
    Click Element    css=#logi_confirmButton .xButton
    Handle Force Login Window
    Wait Until Element Is Visible    css=.uicTaskbarText    30
    Handle Accept Cookie Panel
    Add New Command Page

Verify Specific Remark Is Written In The PNR
    [Arguments]    ${expected_remark}    ${multi_line_remark}=False
    Wait Until Page Contains Element    xpath=//div[@class='crypticPanel'][contains(@id,'epnrRetrieves')]    30
    ${pnr_details}    Get Text    xpath=//div[@class='crypticPanel'][contains(@id,'epnrRetrieves')]
    Log    ${pnr_details}
    Run Keyword And Continue On Failure    Run Keyword If    "${multi_line_remark}" == "True"    Remove Line Break And Spaces    ${pnr_details}    ${expected_remark}
    Run Keyword And Continue On Failure    Should Contain    ${pnr_details}    ${expected_remark}
    Log    Expected: ${expected_remark}
    Log    Actual: ${pnr_details}

Remove Line Break And Spaces
    [Arguments]    ${pnr_details}    ${expected_remark}
    ${pnr_details}    Replace String    ${pnr_details}    ${SPACE}    ${EMPTY}
    ${pnr_details_flattened}    Replace String    ${pnr_details}    \n    ${EMPTY}
    Set Test Variable    ${pnr_details}    ${pnr_details_flattened}
    ${expected_remark}    Replace String    ${expected_remark}    ${SPACE}    ${EMPTY}
    ${expected_remark_flattened}    Replace String    ${expected_remark}    \n    ${EMPTY}
    Set Test Variable    ${expected_remark}    ${expected_remark_flattened}

Verify Specific Remark Is Not Written In The PNR
    [Arguments]    ${expected_remark}    ${multi_line_remark}=False
    ${pnr_details}    Get Text    xpath=//div[@class='crypticPanel'][contains(@id,'epnrRetrieves')]
    Log    ${pnr_details}
    Run Keyword And Continue On Failure    Run Keyword If    "${multi_line_remark}" == "True"    Remove Line Break And Spaces    ${pnr_details}
    Run Keyword And Continue On Failure    Should Not Contain    ${pnr_details}    ${expected_remark}
    Log    Expected: ${expected_remark}
    Log    Expected: ${pnr_details}

Verify Specific Remark Is Only Written Once
    [Arguments]    ${expected_remark}
    ${pnr_details}    Get Text    xpath=//div[@class='crypticPanel'][contains(@id,'epnrRetrieves')]
    Log    ${pnr_details}
    Run Keyword And Continue On Failure    Should Contain X Times    ${pnr_details}    ${expected_remark}    1    ${expected_remark} is found multiple times

Logout To Amadeus Sell Connect
    Comment    User Sign Out
    Click Element    css=#eusermanagement_logout_logo_logout_id
    Wait Until Element Is Visible    xpath=//div[contains(text(),'Sign out')]    30
    Click Element    css=#uicAlertBox_ok > span.uicButtonBd
    Wait Until Element Is Visible    css=#username > span:first-child input    30

Create Matrix Receipt
    [Arguments]    ${mode_of_payment}    ${bank_account}    ${passenger_name}    ${description}    ${amount}    ${gc_number}=${EMPTY}
    ...    ${credit_card_number}=${EMPTY}    ${exp_date}=${EMPTY}
    Select Bank Account    ${bank_account}
    Select Passenger Name    ${passenger_name}
    Enter Description    ${description}
    Enter Amount    ${amount}
    Enter GC Number    ${gc_number}
    Run Keyword And Continue On Failure    Run Keyword If    "${mode_of_payment}" == "Cash" or "${mode_of_payment}" == "Cheque"    Select Mode Of Payment    ${mode_of_payment}
    Run Keyword And Continue On Failure    Run Keyword If    "${mode_of_payment}" == "Credit Card"    Enter Credit Card Number    ${credit_card_number}
    Run Keyword And Continue On Failure    Run Keyword If    "${mode_of_payment}" == "Credit Card"    Enter Credit Card Expiration Date    ${exp_date}
    Click Element    css=#amount
    Click Save Button

Create Matrix Receipt For RBC Redemption
    [Arguments]    ${bank_account}    ${passenger_name}    ${amount}    ${rbc_points}    ${cwt_reference}    ${last_four_vi}
    Select Bank Account    ${bank_account}
    Select Passenger Name    ${passenger_name}
    Enter Amount    ${amount}
    Enter RBC Points    ${rbc_points}
    Enter CWT Reference    ${cwt_reference}
    Enter Last Four Digit VI    ${last_four_vi}
    Click Element    css=#amount
    Click Save Button

Create Matrix Accounting Remark
    [Arguments]    ${is_apay_true}    ${accounting_remark_type}    ${supplier_code}    ${supplier_confirmation_number}    ${form_of_payment}    ${cc_vendor_code}=${EMPTY}
    ...    ${credit_card_number}=${EMPTY}    ${exp_date}=${EMPTY}    ${remark_description}=${EMPTY}
    Select Accounting Remark Type    ${accounting_remark_type}
    Run Keyword If    "${is_apay_true}" == "YES"    Enter Matrix Accounting Description    ${remark_description}
    Run Keyword If    "${is_apay_true}" == "NO"    Enter Supplier Code    ${supplier_code}
    Run Keyword If    "${is_apay_true}" == "YES" and "${supplier_code}" == "AD1"    Enter Supplier Code    ${supplier_code}
    Set Suite Variable    ${supplier_code}
    Enter Supplier Confirmation Number    ${supplier_confirmation_number}
    Select Matrix Form Of Payment    ${form_of_payment}
    Run Keyword If    "${form_of_payment}" == "Credit Card"    Select Credit Card Vendor Code    ${cc_vendor_code}
    Run Keyword If    "${form_of_payment}" == "Credit Card"    Enter Credit Card Number    ${credit_card_number}
    Run Keyword If    "${form_of_payment}" == "Credit Card"    Enter Credit Card Expiration Date    ${exp_date}
    [Teardown]    Take Screenshot

Verify Royal Bank Concierge UDID Remarks Are Written
    [Arguments]    ${redemption}=${EMPTY}    ${reservation}=${EMPTY}    ${booking_type}=${EMPTY}    ${is_hotel_name_blank}=False    ${is_caller_name_blank}=False
    Run Keyword If    "${redemption}" == "Within"    Verify Specific Remark Is Written In The PNR    RM *U3/-WITHIN 48HRS OF BKNG
    ...    ELSE    Verify Specific Remark Is Written In The PNR    RM *U4/-OUTSIDE 48HRS OF BKNG
    Run Keyword If    "${reservation}" == "Email"    Verify Specific Remark Is Written In The PNR    RM *U6/-EMAIL REQUEST
    ...    ELSE    Verify Specific Remark Is Written In The PNR    RM *U5/-PHONE REQUEST
    Run Keyword If    "${booking_type}" == "Cruise"    Verify Specific Remark Is Written In The PNR    RM *U10/-CRUISE/TOUR/FIT
    ...    ELSE    Verify Specific Remark Is Written In The PNR    RM *U8/-AIR ONLY BOOKING
    Run Keyword If    "${is_caller_name_blank}" == "True"    Verify Specific Remark Is Written In The PNR    RM *U11/-${caller_name.upper()}
    Verify Specific Remark Is Written In The PNR    RM *U12/-${delegate_caller_name.upper()}
    Run Keyword If    "${is_hotel_name_blank}" == "True"    Verify Specific Remark Is Written In The PNR    RM *U13/-NO HTL BKD
    ...    ELSE    Verify Specific Remark Is Written In The PNR    RM *U13/-${hotel_name.upper()}
    Verify Specific Remark Is Written In The PNR    RM *U15/-${is_business_reserved}
    Verify Specific Remark Is Written In The PNR    RM *U17/-${is_hotel_booked}
    Run Keyword If    "${is_hotel_booked}" == "No"    Verify Specific Remark Is Written In The PNR    RM *U18/-
    Verify Specific Remark Is Written In The PNR    RM *U30/-TGIF

Verify Package Costs UDID Remarks Are Written In the PNR
    [Arguments]    ${balance_due_date}    ${balance_due_amt}
    Verify Specific Remark Is Written In The PNR    RM *U43/-${balance_due_date}
    Verify Specific Remark Is Written In The PNR    RM *U42/-${tour_commission_amount}
    Verify Specific Remark Is Written In The PNR    RM *U41/-${balance_due_amt}
