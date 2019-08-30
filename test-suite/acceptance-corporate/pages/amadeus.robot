*** Settings ***
Library           String
Library           SeleniumLibrary
Library           Collections
Library           Screenshot

*** Variables ***
${url_amadeus}    https://acceptance.custom.sellingplatformconnect.amadeus.com/LoginService/login.jsp?SITE=I05WI05W&OV_SITE_UM_USE_PREF_PACKAGE=FALSE&OV_SITE_UM_USE_HMC_HIERARCHY=FALSE&LANGUAGE=US&refreshOnError=true&appUri=/app_sell2.0/apf/init/login
${input_username}    css=#username > span:first-child input
${input_dutyCode}    css=#dutyCode input
${input_officeId}    css=#officeId input
${input_password}    css=#password input
${button_disabled_login}    css=#logi_confirmButton .xButtonDisabled
${button_enabled_login}    css=#logi_confirmButton .xButton
${button_force_sign_in}    //span[contains(text(),'Force Sign In')]
${tab_mainPage}    css=.uicTaskbarText
${button_accept}    css=div.accept
${button_command_page}    css=#etoolbar_toolbarSection_newcommandpagebtn_id
${input_commandText}    css=.cmdPromptDiv > textArea
${label_command_page}    //span[contains(@class, 'title cryptic')]
${menu_amadeus}    css=#emenu_menuSection_desktop_menu_data_idscript
${menu_corp_test}    //li[@id="emenu_menuSection_desktop_menu_data_id_SMART_TOOL_CWT Corp Test"]
${header_corp_test}    //div[@class="xDialog_titleBar xDialog_std_titleBar"]//span[contains(text(), 'CWT Corp ${env}')]
${window_corp_test}    //iframe[contains(@src,'/portal/gds-scripting-amadeus')]
${link_sign_out}    css=#eusermanagement_logout_logo_logout_id
${popUp_sign_out}   //div[contains(text(),'Sign out')]
${button_sign_out}    css=#uicAlertBox_ok > span.uicButtonBd
${icon_air}    css=.bookingTool.FS
${tab_cryptic_display}    //button[contains(@id, 'crypticDisplay')]
${popUp_pnr_display}    //div[@class='crypticPanel'][contains(@id,'epnrRetrieves')]
${button_cryptic}    css=.showInCommandPage
${button_graphical}    css=.showInGraphicMode
${close_cryptic_display}    css=#elgen-19

*** Keywords ***
Login To Amadeus Sell Connect Acceptance
    Open Browser    ${url_amadeus}    gc
    Maximize Browser Window
    Wait Until Element Is Visible    ${input_username}    60
    Input Text    ${input_username}    ${username}
    Input Text    ${input_dutyCode}    GS
    Input Text    ${input_officeId}    YTOWL2107
    Input Text    ${input_password}    ${password}
    Wait Until Element Is Not Visible    ${button_disabled_login}    30
    Click Element    ${button_enabled_login}
    Handle Force Login Window
    Wait Until Element Is Visible    ${tab_mainPage}    30
    Handle Accept Cookie Panel
    Click Element    ${button_command_page}
    Wait Until Page Contains Element    ${input_commandText}    180

Handle Force Login Window
    ${is_force_sigin}    Run Keyword And Return Status    Wait Until Element Is Visible    ${button_force_sign_in}    15
    Run Keyword If    ${is_force_sigin}    Click Element    ${button_force_sign_in}

Handle Accept Cookie Panel
    ${is_force_sigin}    Run Keyword And Return Status    Wait Until Element Is Visible    ${button_accept}    30
    Run Keyword If    ${is_force_sigin}    Click Element    ${button_accept}

Move Profile to GDS
    [Arguments]    @{gds_commands}
    Wait Until Element Is Visible    ${label_command_page}    180
    :FOR    ${gds_command}    IN    @{gds_commands}
    \    Input Text    ${input_commandText}    ${gds_command}
    \    Press Key    ${input_commandText}    \\13

Open CA Corporate Test
    Wait Until Element Is Visible    ${menu_amadeus}    30
    Click Element    ${menu_amadeus}
    Click Element    ${menu_corp_test}
    Wait Until Element Is Visible    ${header_corp_test}    60
    Wait Until Element Is Visible    ${window_corp_test}    60
    Select Frame    ${window_corp_test}

Add Single BSP Segment And Store Fare
    @{gds_commands}    Create List    AN10JANYYZORD/AAC    SS1Y1    FXP
    Wait Until Element Is Visible    ${label_command_page}    180
    :FOR    ${gds_command}    IN    @{gds_commands}
    \    Input Text    ${input_commandText}    ${gds_command}
    \    Press Key    ${input_commandText}    \\13

Add Multiple BSP Segment And Store Fare
    @{gds_commands}    Create List    AN10JANYYZORD/AAC   SS1Y1    AN20JANORDYUL/AAC    SS1Y1    FXP   AN30JANYULCDG/AAF    SS1Y1    FXP/S4    AN30JANCDGLHR/AAF    SS1Y1    FXP/S5 
    Wait Until Element Is Visible    ${label_command_page}    180
    :FOR    ${gds_command}    IN    @{gds_commands}
    \    Input Text    ${input_commandText}    ${gds_command}
    \    Press Key    ${input_commandText}    \\13

Delete Fare and Itinerary
    @{gds_commands}    Create List    RT    TTE/ALL    XI    RFCWTPTEST    ER    ER
    Wait Until Element Is Visible    ${label_command_page}    180
    :FOR    ${gds_command}    IN    @{gds_commands}
    \    Input Text    ${input_commandText}    ${gds_command}
    \    Press Key    ${input_commandText}    \\13

Logout To Amadeus Sell Connect
    Click Element    ${link_sign_out}     
    Wait Until Element Is Visible    ${popUp_sign_out}    30
    Click Element   ${button_sign_out}  
    Wait Until Element Is Visible    ${input_username}    30
    Close Browser

Get PNR Details
    Wait Until Element Is Enabled   ${icon_air}      30
    Wait Until Element Is Visible    ${tab_cryptic_display}    30
    Sleep    5
    Press Key    ${tab_cryptic_display}     \\32
    Wait Until Page Contains Element    ${popUp_pnr_display}    30
    Sleep    10
    ${pnr_details}    Get Text    ${popUp_pnr_display}
    Log    ${pnr_details}
    Set Suite Variable    ${pnr_details}
    [Teardown]    Take Screenshot

Switch To Command Page
    Click Element    ${close_cryptic_display} 
    Wait Until Page Contains Element    ${button_cryptic}    60
    Click Element    ${button_cryptic}
    Wait Until Element Is Visible    ${input_commandText}    60
    [Teardown]    Take Screenshot

Switch To Graphic Mode
    Wait Until Element Is Visible    ${button_graphical}    30
    Click Element    ${button_graphical}
    Wait Until Page Contains Element    ${tab_cryptic_display}     60
    [Teardown]    Take Screenshot

Add Passive Air Segment In The GDS With Airline Code ${airline_code}
    Input Text    ${input_commandText}    SS ${airline_code}1074 Y 10MAR YYZORD GK1 / 11551440 / ABCDEFG
    Press Key    ${input_commandText}    \\13
    
Add Multiple Passive Air Segments In The GDS
    @{gds_commands}    Create List    SS WS1074 Y 10MAR YYZORD GK1 / 11551440 / ABCDEFG    SS WS1075 Y 15MAR ORDCDG GK1 / 01301240 / 1234567
    : FOR    ${gds_command}    IN    @{gds_commands}
    \    Input Text    ${input_commandText}    ${gds_command}
    \    Press Key    ${input_commandText}    \\13

Verify Specific Remark Is Written In The PNR
    [Arguments]    ${expected_remark}    ${multi_line_remark}=False
    Wait Until Page Contains Element    ${popUp_pnr_display}    30
    ${pnr_details}    Get Text    ${popUp_pnr_display}
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

Create Exchange PNR In The GDS
    @{gds_commands}    Create List    RT    RFCWTPTEST    ER    TTK/EXCH/S2    TTK/T1/RCAD200/XCAD20YR/TCAD120    FHA 057-1346629127    FO057-1346629127E1PAR10MAY19/00002634/057-1346629127E1/S2
    : FOR    ${gds_command}    IN    @{gds_commands}
    \    Input Text    ${input_commandText}    ${gds_command}
    \    Press Key    ${input_commandText}    \\13
