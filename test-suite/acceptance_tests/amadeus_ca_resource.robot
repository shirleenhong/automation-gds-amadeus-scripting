*** Settings ***
Resource          ../resources/common/common_library.robot
Resource          ../resources/common/core.robot

*** Keywords ***
Login To Amadeus Sell Connect
    Open Browser    https://acceptance.custom.sellingplatformconnect.amadeus.com/LoginService/login.jsp?SITE=I05WI05W&OV_SITE_UM_USE_PREF_PACKAGE=FALSE&OV_SITE_UM_USE_HMC_HIERARCHY=FALSE&LANGUAGE=US&refreshOnError=true&appUri=/app_sell2.0/apf/init/login    gc
    Maximize Browser Window
    Wait Until Element Is Visible    css=#username > span:first-child input    60
    Enter Username    U068SXH
    Enter Dutycode    GS
    Enter Office ID    LONWL2220
    Enter Password    Kamote1!
    Wait Until Element Is Not Visible    css=#logi_confirmButton .xButtonDisabled    30
    Click Element    css=#logi_confirmButton .xButton
    Handle Force Login Window
    Wait Until Element Is Visible    css=.uicTaskbarText    30
    Handle Accept Cookie Panel
    Add New Command Page

Verify Specific Remark Is Written In The PNR
    [Arguments]    ${expected_remark}    ${multi_line_remark}=False
    ${pnr_details}    Get Text    css=#epnrRetrieves1_crypticText
    Log    ${pnr_details}
    Run Keyword And Continue On Failure    Run Keyword If    "${multi_line_remark}" == "True"    Remove Line Break And Spaces    ${pnr_details}    ${expected_remark}
    Run Keyword And Continue On Failure    Should Contain    ${pnr_details}    ${expected_remark}
    Log    Expected: ${expected_remark}
    Log    Expected: ${pnr_details}

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
    ${pnr_details}    Get Text    css=#epnrRetrieves1_crypticText
    Log    ${pnr_details}
    Run Keyword And Continue On Failure    Run Keyword If    "${multi_line_remark}" == "True"    Remove Line Break And Spaces    ${pnr_details}
    Run Keyword And Continue On Failure    Should Not Contain    ${pnr_details}    ${expected_remark}
    Log    Expected: ${expected_remark}
    Log    Expected: ${pnr_details}

Verify Specific Remark Is Only Written Once
    [Arguments]    ${expected_remark}
    ${pnr_details}    Get Text    css=#epnrRetrieves1_crypticText
    Log    ${pnr_details}
    Run Keyword And Continue On Failure    Should Contain X Times    ${pnr_details}    ${expected_remark}    1    ${expected_remark} is found multiple times

Logout To Amadeus Sell Connect
    Comment    User Sign Out
    Click Element    css=#eusermanagement_logout_logo_logout_id
    Wait Until Element Is Visible    xpath=//div[contains(text(),'Sign out')]    30
    Click Element    css=#uicAlertBox_ok > span.uicButtonBd
    Wait Until Element Is Visible    css=#username > span:first-child input    30
