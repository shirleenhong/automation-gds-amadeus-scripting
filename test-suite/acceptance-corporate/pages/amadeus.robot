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
${popUp_sign_out}    //div[contains(text(),'Sign out')]
${button_sign_out}    css=#uicAlertBox_ok > span.uicButtonBd
${icon_air}       css=.bookingTool.FS
${tab_cryptic_display}    //button[contains(@id, 'crypticDisplay')]
${popUp_pnr_display}    //div[@class='crypticPanel'][contains(@id,'epnrRetrieves')]
${button_cryptic}    css=.showInCommandPage
${button_graphical}    css=.showInGraphicMode
${close_cryptic_display}    css=#elgen-19
${response_simultaneous}    //pre[@id='responseCommand']//code[contains(text(), 'SIMULTANEOUS CHANGES TO PNR')]
${overlay_loader}    //div[@class='uicLoaderOverlay uicLo-loading'] 

*** Keywords ***
Login To Amadeus Sell Connect Acceptance
    Open Browser    ${url_amadeus}    gc
    Maximize Browser Window
    Wait Until Element Is Visible    ${input_username}    60
    Input Text    ${input_username}    ${username}
    Input Text    ${input_dutyCode}    GS
    Input Text    ${input_officeId}    YTOWL2107
    Input Password    ${input_password}    ${password}
    Wait Until Element Is Not Visible    ${button_disabled_login}    30
    Click Element    ${button_enabled_login}
    Handle Force Login Window
    Wait Until Element Is Visible    ${tab_mainPage}    30
    Handle Accept Cookie Panel
    Click Element    ${button_command_page}
    Wait Until Page Contains Element    ${input_commandText}    180
    Set Test Variable    ${current_page}    Amadeus

Handle Force Login Window
    ${is_force_sigin}    Run Keyword And Return Status    Wait Until Element Is Visible    ${button_force_sign_in}    15
    Run Keyword If    ${is_force_sigin}    Click Element    ${button_force_sign_in}

Handle Accept Cookie Panel
    ${is_force_sigin}    Run Keyword And Return Status    Wait Until Element Is Visible    ${button_accept}    30
    Run Keyword If    ${is_force_sigin}    Click Element    ${button_accept}

Move Profile to GDS
    [Arguments]    @{gds_commands}
    Wait Until Element Is Visible    ${label_command_page}    180
    : FOR    ${gds_command}    IN    @{gds_commands}
    \    Input Text    ${input_commandText}    ${gds_command}
    \    Press Key    ${input_commandText}    \\13

Open CA Corporate Test
    Wait Until Element Is Visible    ${menu_amadeus}    30
    Click Element    ${menu_amadeus}
    Click Element    ${menu_corp_test}
    Wait Until Element Is Visible    ${header_corp_test}    60
    Wait Until Element Is Visible    ${window_corp_test}    60
    Select Frame    ${window_corp_test}
    Set Test Variable    ${current_page}    CWT Corporate
    Set Test Variable    ${pnr_submitted}    no
    Set Test Variable    ${pnr_details}     ${EMPTY}

Add Single BSP Segment And Store Fare
    @{gds_commands}    Create List    AN10JANYYZORD/AAC    SS1Y1    FXP
    Wait Until Element Is Visible    ${label_command_page}    180
    : FOR    ${gds_command}    IN    @{gds_commands}
    \    Input Text    ${input_commandText}    ${gds_command}
    \    Press Key    ${input_commandText}    \\13

Add Multiple BSP Segment And Store Fare
    @{gds_commands}    Create List    AN10JANYYZORD/AAC    SS1Y1    AN20JANORDYUL/AAC    SS1Y1    FXP
    ...    AN30JANYULCDG/AAF    SS1Y1    FXP/S4    AN10FEBCDGLHR/AAF    SS1Y1    FXP/S5
    Wait Until Element Is Visible    ${label_command_page}    180
    : FOR    ${gds_command}    IN    @{gds_commands}
    \    Input Text    ${input_commandText}    ${gds_command}
    \    Press Key    ${input_commandText}    \\13

Delete Fare and Itinerary
    @{gds_commands}    Create List   IR    RT    TTE/ALL    XI    RFCWTPTEST    ER
    ...    ER
    Wait Until Element Is Visible    ${label_command_page}    180
    : FOR    ${gds_command}    IN    @{gds_commands}
    \    Input Text    ${input_commandText}    ${gds_command}
    \    Press Key    ${input_commandText}    \\13

Logout To Amadeus Sell Connect
    Click Element    ${link_sign_out}
    Wait Until Element Is Visible    ${popUp_sign_out}    30
    Click Element    ${button_sign_out}
    Wait Until Element Is Visible    ${input_username}    30
    Close Browser

Get PNR Details
    Wait Until Page Does Not Contain    ${overlay_loader}    
    Wait Until Element Is Enabled    ${icon_air}    30
    Wait Until Element Is Visible    ${tab_cryptic_display}    60
    Sleep    2
    Press Key    ${tab_cryptic_display}    \\32
    Wait Until Page Contains Element    ${popUp_pnr_display}    60
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
    Wait Until Page Contains Element    ${tab_cryptic_display}    60
    [Teardown]    Take Screenshot

Add Passive Air Segment In The GDS With Airline Code ${airline_code}
    Input Text    ${input_commandText}    SS ${airline_code}1074 Y 10MAR YYZORD GK1 / 11551440 / ABCDEFG
    Press Key    ${input_commandText}    \\13

Add Multiple Passive Air Segments In The GDS With Airline Code ${airline_code}
    @{gds_commands}    Create List    SS ${airline_code}1074 Y 10MAR YYZORD GK1 / 11551440 / ABCDEFG    SS ${airline_code}1075 Y 15MAR ORDCDG GK1 / 01301240 / 1234567
    : FOR    ${gds_command}    IN    @{gds_commands}
    \    Input Text    ${input_commandText}    ${gds_command}
    \    Press Key    ${input_commandText}    \\13

Add Multiple Passive Air Segments In The GDS With Different Airline Codes
    @{gds_commands}    Create List    SS UA1074 Y 10MAR YYZORD GK1 / 11551440 / ABCDEFG    SS AF1075 Y 15MAR ORDCDG GK1 / 01301240 / 1234567    SS UA1075 Y 20MAR CDGYYZ GK1 / 01301240 / ABC123
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

Verify Specific Remark Is Not Written In The PNR
    [Arguments]    ${expected_remark}    ${multi_line_remark}=False
    Wait Until Page Contains Element    ${popUp_pnr_display}    30
    ${pnr_details}    Get Text    ${popUp_pnr_display}
    Log    ${pnr_details}
    Run Keyword And Continue On Failure    Run Keyword If    "${multi_line_remark}" == "True"    Remove Line Break And Spaces    ${pnr_details}    ${expected_remark}
    Run Keyword And Continue On Failure    Should Not Contain    ${pnr_details}    ${expected_remark}
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
    @{gds_commands}    Create List    RT    RFCWTPTEST    ER    ER    TTK/EXCH/S2
    ...    TTK/T1/RCAD200.00/XCAD20.00YR/TCAD120.00    FHA 057-1346629127    FO057-1346629127E1PAR10MAY19/00002634/057-1346629127E1/S2
    : FOR    ${gds_command}    IN    @{gds_commands}
    \    Input Text    ${input_commandText}    ${gds_command}
    \    Press Key    ${input_commandText}    \\13

Move Single Passenger
    Move Profile to GDS    NM1Juarez/Rose Ms    APE-test@email.com    RM*CF/-RBP0000000N    RMP/CITIZENSHIP-CA    RM SYEXGVS: A:FA177

Move Multiple Passenger
    Move Profile to GDS    NM1Juarez/Rose Ms    NM1De Guzman/Cyril Mr    APE-test@email.com    RM*CF/-RBP0000000N    RMP/CITIZENSHIP-CA    RM SYEXGVS: A:FA177

Move Single Passenger And Add Single BSP Segment With TST
    Move Profile to GDS    NM1CORPORATE/AMADEUS MR    RM*U25/-A:FA177    APE-test@email.com    RM*BOOK-YTOWL220N/TKT-YTOWL2106/CC-C
    Add Single BSP Segment And Store Fare

Move Single Passenger And Add Multiple BSP Segment With TSTs
    Move Profile to GDS    NM1CORPORATE/AMADEUS MR    RM*U25/-A:FA177    APE-test@email.com    RM*BOOK-YTOWL220N/TKT-YTOWL2106/CC-C
    Add Multiple BSP Segment And Store Fare

Move Single Passenger And Add Passive Segment With Airline Code ${airline_code}
    Move Profile to GDS    NM1CORPORATE/AMADEUS MR    RM*U25/-A:FA177    APE-test@email.com    RM*CN/-CN1    RM*U14/-${airline_code}PASS-1234567890.LAT/777    RM*BOOK-YTOWL220N/TKT-YTOWL2106/CC-CA 
    Add Passive Air Segment In The GDS With Airline Code ${airline_code}
    Set Test Variable    ${consultant_number}    CN1
    Set Test Variable    ${airline_code}

Move Single Passenger For Specific Client And Add Passive Segment With Airline Code ${airline_code}
    Move Profile to GDS    NM1CORPORATE/AMADEUS MR    RM*U25/-A:FA177    APE-test@email.com    RM*CN/-CN1    RM*U14/-${airline_code}PASS-1234567890.LAT/777    RM*CF/-ZZB0000000N    RM*BOOK-YTOWL220N/TKT-YTOWL2106/CC-CA 
    Add Passive Air Segment In The GDS With Airline Code ${airline_code}
    Set Test Variable    ${consultant_number}    CN1
    Set Test Variable    ${airline_code}

Move Single Passenger And Add Multiple Air Passive Segments With Airline Code ${airline_code}
    Move Profile to GDS    NM1CORPORATE/AMADEUS MR    RM*U25/-A:FA177    APE-test@email.com    RM*BOOK-YTOWL220N/TKT-YTOWL2106/CC-CA 
    Add Multiple Passive Air Segments In The GDS With Airline Code ${airline_code}
    Set Test Variable    ${airline_code}

Move Single Passenger And Add Multiple Passive Air With Different Airline Codes
    Move Profile to GDS    NM1CORPORATE/AMADEUS MR    RM*U25/-A:FA177    APE-test@email.com    RM*BOOK-YTOWL220N/TKT-YTOWL2106/CC-CA 
    Add Multiple Passive Air Segments In The GDS With Different Airline Codes

Enter RIR Remarks In English
    Move Profile to GDS    RMZ/LANGUAGE-EN-CA    RIR THE AIRLINE TICKET CHARGE ON THIS ITINERARY/INVOICE/S2    RIR IS FOR INTERNAL COST RE-ALLOCATION PURPOSES ONLY./S2    RIR **PLEASE DO NOT EXPENSE** THIS CHARGE AS IT WILL NOT APPEAR/S2    RIR ON YOUR CREDIT CARD STATEMENT./S2

Enter RIR Remarks In French
    Move Profile to GDS    RMZ/LANGUAGE-FR-CA    RIR LES FRAIS DE BILLET D AVION DE CET ITINERAIRE/FACTURE /S2    RIR NE SONT QU AUX FINS DE REATTRIBUTION DES COUTS A L INTERNE./S2    RIR **VEILLEZ NE PAS INSCRIRE** CES COUTS PUISQU ILS NE PARAITRONT PAS /S2    RIR ON YOUR CREDIT CARD STATEMENT./SRIR SUR VOTRE RELEVE DE CARTE DE CREDIT./S2
    
Handle Simultaneous Changes To PNR 
    Sleep   3
    ${status}    Run Keyword And Return Status    Page Should Contain Element     ${response_simultaneous}
    Run keyword If    '${status}' == 'TRUE'    Delete Fare and Itinerary

Move Single Passenger For EN
    Move Profile to GDS    NM1Juarez/Rose Ms    APE-test@email.com    RM*CF/-RBP0000000N    RMP/CITIZENSHIP-CA    RM SYEXGVS: A:FA177
    
Move Single Passenger For FR
    Move Profile to GDS    NM1Juarez/Rose Ms    APE-test@email.com    RM*CF/-RBP0000000N    RMP/CITIZENSHIP-CA    RM SYEXGVS: A:FA177    RMZ/LANGUAGE-FR-CA