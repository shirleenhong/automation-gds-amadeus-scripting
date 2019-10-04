*** Settings ***
Library           String
Library           SeleniumLibrary
Library           Collections
Library           Screenshot
Resource          base.robot

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
${menu_corp_test}      //li[@id="emenu_menuSection_desktop_menu_data_id_SMART_TOOL_CWT Corp Test"]
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
${close_cryptic_display}    css=#e4retrievePNR_cdPopup_id > .ydlg-close
${response_simultaneous}    //pre[@id='responseCommand']//code[contains(text(), 'SIMULTANEOUS CHANGES TO PNR')]
${overlay_loader}    //div[@class='uicLoaderOverlay uicLo-loading'] 
${text_record_locator}     //div[contains(text(), 'Record Locator')]
${icon_processing}    //div[@class='processing']
${text_area_command}    //div[@class='crypticContainer']

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
    Wait Until Element Is Visible    ${tab_mainPage}    60
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
    \    Enter Cryptic Command    ${gds_command}

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
    Set Test Variable    ${ticketing_complete}     no
    Set Test Variable     ${ticketing_details}    no

Add Single BSP Segment And Store Fare
    @{gds_commands}    Create List    AN10JANYYZORD/AAC    SS1Y1    FXP
    Wait Until Element Is Visible    ${label_command_page}    180
    : FOR    ${gds_command}    IN    @{gds_commands}
    \    Enter Cryptic Command    ${gds_command}

Add Multiple BSP Segment And Store Fare
    @{gds_commands}    Create List    AN10JANYYZORD/AAC    SS1Y1    AN20JANORDYUL/AAC    SS1Y1    FXP
    ...    AN30JANYULCDG/AAF    SS1Y1    FXP/S4    AN10FEBCDGLHR/AAF    SS1Y1    FXP/S5
    Wait Until Element Is Visible    ${label_command_page}    180
    : FOR    ${gds_command}    IN    @{gds_commands}
    \    Enter Cryptic Command    ${gds_command}
    
Add Multiple BSP Segment And Store Multiple Fares
    @{gds_commands}    Create List    AN10JANYYZCDG/AAF    SS1Y1    AN20JANCDGLHR/AAF    SS1Y1    AN20JANLHRCDG/AAF
    ...    SS1Y1    AN10FEBCDGYUL/AAC    SS1Y1    AN10FEBYULCDG/AAC    SS1Y1    FXP/S3,5-6    FXP/S2,4
    Wait Until Element Is Visible    ${label_command_page}    180
    : FOR    ${gds_command}    IN    @{gds_commands}
    \    Enter Cryptic Command    ${gds_command}

Add Multiple BSP Segments And Store Single Fare
    @{gds_commands}    Create List    AN10JANYYZORD/AAC    SS1Y1    AN20JANORDYUL/AAC    SS1Y1    FXP
    Wait Until Element Is Visible    ${label_command_page}    180
    : FOR    ${gds_command}    IN    @{gds_commands}
    \    Enter Cryptic Command    ${gds_command}
	
Delete Fare and Itinerary
    @{gds_commands}    Create List   IR    RT    TTE/ALL    XI    RFCWTPTEST    ER
    ...    ER
    Wait Until Element Is Visible    ${label_command_page}    180
    : FOR    ${gds_command}    IN    @{gds_commands}
    \    Enter Cryptic Command    ${gds_command}
    Handle Simultaneous Changes To PNR

Logout To Amadeus Sell Connect
    Click Element    ${link_sign_out}
    Wait Until Element Is Visible    ${popUp_sign_out}    30
    Click Element    ${button_sign_out}
    Wait Until Element Is Visible    ${input_username}    30
    Close Browser

Get PNR Details
    Wait Until Element Is Not Visible    ${overlay_loader}    10
    Wait Until Element Is Enabled    ${icon_air}    30
    Wait Until Element Is Visible    ${tab_cryptic_display}    60
    Sleep    2
    Press Key    ${tab_cryptic_display}    \\32
    Wait Until Page Contains Element    ${popUp_pnr_display}    60
    Wait Until Element Is Not Visible    ${overlay_loader}    10
    ${pnr_details}    Get Text    ${popUp_pnr_display}
    Log    ${pnr_details}
    Set Test Variable    ${pnr_details}    ${pnr_details}
    Close Cryptic Display
    [Teardown]    Take Screenshot

Switch To Command Page
    Wait Until Page Contains Element    ${button_cryptic}    60
    Click Element    ${button_cryptic}
    Wait Until Element Is Visible    ${input_commandText}    60
    Set Test Variable    ${current_page}    Amadeus
    [Teardown]    Take Screenshot

Close Cryptic Display
    Click Element    ${close_cryptic_display}
    Set Test Variable    ${current_page}    Amadeus
    
Open Command Page
    Wait Until Page Contains Element    ${button_cryptic}    60
    Click Element    ${button_cryptic}
    Wait Until Element Is Visible    ${input_commandText}    60
    Set Test Variable    ${current_page}    Amadeus
    [Teardown]    Take Screenshot

Switch To Graphic Mode
    Wait Until Element Is Visible    ${button_graphical}    30
    Click Element    ${button_graphical}
    Wait Until Page Contains Element    ${tab_cryptic_display}    60
    Wait Until Element Is Not Visible    ${overlay_loader}    60
    Set Test Variable    ${current_page}    Cryptic Display
    [Teardown]    Take Screenshot

Add Passive Air Segment In The GDS With Airline Code ${airline_code}
    Input Text    ${input_commandText}    SS ${airline_code}1074 Y 10MAR YYZORD GK1 / 11551440 / ABCDEFG
    Press Key    ${input_commandText}    \\13
    Sleep    2

Add Multiple Passive Air Segments In The GDS With Airline Code ${airline_code}
    @{gds_commands}    Create List    SS ${airline_code}1074 Y 10MAR YYZORD GK1 / 11551440 / ABCDEFG    SS ${airline_code}1075 Y 15MAR ORDCDG GK1 / 01301240 / 1234567
    : FOR    ${gds_command}    IN    @{gds_commands}
    \    Enter Cryptic Command    ${gds_command}

Add Multiple Passive Air Segments In The GDS With Different Airline Codes
    @{gds_commands}    Create List    SS UA1074 Y 10MAR YYZORD GK1 / 11551440 / ABCDEFG    SS AF1075 Y 15MAR ORDCDG GK1 / 01301240 / 1234567    SS UA1075 Y 20MAR CDGYYZ GK1 / 01301240 / ABC123
    : FOR    ${gds_command}    IN    @{gds_commands}
    \    Enter Cryptic Command    ${gds_command}

Verify Specific Remark Is Written In The PNR
    [Arguments]    ${expected_remark}    ${multi_line_remark}=False
    Log    ${pnr_details}
    Run Keyword And Continue On Failure    Run Keyword If    "${multi_line_remark}" == "True"    Remove Line Break And Spaces    ${pnr_details}    ${expected_remark}
    Run Keyword And Continue On Failure    Run Keyword If    "${multi_line_remark}" == "True"    Should Contain    ${pnr_details_flattened}    ${expected_remark_flattened}   ELSE    Should Contain    ${pnr_details}    ${expected_remark} 
    Run Keyword If    "${multi_line_remark}" == "True"    Log    Expected: ${expected_remark_flattened}    ELSE     Log    Expected: ${expected_remark}
    Run Keyword If    "${multi_line_remark}" == "True"    Log    Expected: ${pnr_details_flattened}     ELSE    Log    Actual: ${pnr_details}

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
    ${expected_remark}    Replace String    ${expected_remark}    ${SPACE}    ${EMPTY}
    ${expected_remark_flattened}    Replace String    ${expected_remark}    \n    ${EMPTY}
    Set Test Variable    ${pnr_details_flattened}
    Set Test Variable    ${expected_remark_flattened}

Create Exchange NE Remark   
   Move Profile to GDS    RM*NE/-EX-Y    TKOK

Create Exchange PNR In The GDS
    @{gds_commands}    Create List    RT    RFCWTPTEST    ER    ER    TTK/EXCH/S2
    ...    TTK/T1/RCAD200.00/XCAD20.00YR/TCAD120.00    FHA 057-1346629127    FO057-1346629127E1PAR10MAY19/00002634/057-1346629127E1/S2
    : FOR    ${gds_command}    IN    @{gds_commands}
    \    Enter Cryptic Command    ${gds_command}
    
Create Multiple TKT Exchange PNR In The GDS
    @{gds_commands}    Create List    RT   TTK/EXCH/S2    TTK/T1/RCAD200.00/XCAD20.00YR/TCAD120.00    FHA 057-1346629127    FO057-1346629127E1PAR10MAY19/00002634/057-1346629127E1/S2    TTK/EXCH/S3    TTK/T2/RCAD200.00/XCAD20.00YR/TCAD120.00    FO057-1346629128E1PAR10MAY19/00002634/057-1346629127E1/S3   RFCWTPTEST   ER    RT${actual_record_locator}
    : FOR    ${gds_command}    IN    @{gds_commands}
    \    Enter Cryptic Command    ${gds_command}

Move Single Passenger
    Move Profile to GDS    NM1Juarez/Rose Ms    APE-test@email.com    RM*CF/-RBP0000000N    RMP/CITIZENSHIP-CA    RM SYEXGVS: A:FA177    RM*BOOK-YTOWL220N/TKT-YTOWL2106/CC-C

Move Single Passenger For OBT
    Move Profile to GDS    NM1Juarez/Rose Ms    APE-test@email.com    RM*CF/-RBP0000000N    RMP/CITIZENSHIP-CA    RM SYEXGVS: A:FA177    RM*EB/-EBA    RM*BOOK-YTOWL220N/TKT-YTOWL2106/CC-C

Move Multiple Passenger
    Move Profile to GDS    NM1Juarez/Rose Ms    NM1De Guzman/Cyril Mr    APE-test@email.com    RM*CF/-RBP0000000N    RMP/CITIZENSHIP-CA    RM SYEXGVS: A:FA177

Move Single Passenger And Add Single BSP Segment With TST
    Move Profile to GDS    NM1CORPORATE/AMADEUS MR    RM*U25/-A:FA177    APE-test@email.com    RM*BOOK-YTOWL220N/TKT-YTOWL2106/CC-C    RM*CF/-VB70000000C    RM*CN/-CN1
    Add Single BSP Segment And Store Fare

Move Single Passenger And Add Single BSP Segment With IFC CN Number And TST
    Move Profile to GDS    NM1CORPORATE/AMADEUS MR    RM*U25/-A:FA177    APE-test@email.com    RM*BOOK-YTOWL220N/TKT-YTOWL2106/CC-C    RM*CF/-VB70000000C    RM*CN/-IFC
    Add Single BSP Segment And Store Fare
    Move Profile to GDS    RT

Move Single Passenger And Add Multiple BSP Segment With TSTs
    Move Profile to GDS    NM1CORPORATE/AMADEUS MR    RM*U25/-A:FA177    APE-test@email.com    RM*BOOK-YTOWL220N/TKT-YTOWL2106/CC-C    RM*CF/-AAA0000000C    RM*CN/-CN1
    Add Multiple BSP Segment And Store Fare
	
Move Single Passenger And Add Multiple BSP Segments With Single TST
    Move Profile to GDS    NM1CORPORATE/AMADEUS MR    RM*U25/-A:FA177    APE-test@email.com    RM*BOOK-YTOWL220N/TKT-YTOWL2106/CC-C    RM*CF/-AAA0000000C    RM*CN/-CN1
    Add Multiple BSP Segments And Store Single Fare
    
Move Single Passenger And Add Multiple BSP Segment With Multiple TSTs
    Move Profile to GDS    NM1CORPORATE/AMADEUS MR    RM*U25/-A:FA177    APE-test@email.com    RM*BOOK-YTOWL220N/TKT-YTOWL2106/CC-C    RM*CF/-AAA0000000C    RM*CN/-CN1
    Add Multiple BSP Segment And Store Multiple Fares

Move Single Passenger And Add Passive Segment With Airline Code ${airline_code}
    Move Profile to GDS    NM1CORPORATE/AMADEUS MR    RM*U25/-A:FA177    APE-test@email.com    RM*CN/-CN1    RM*U14/-${airline_code}PASS-1234567890.LAT/777    RM*BOOK-YTOWL220N/TKT-YTOWL2106/CC-CA    RM*U86/-OVERRIDE OFC    TKOK     RM*CF/-VB70000000C    RM*CN/-CN1
    Add Passive Air Segment In The GDS With Airline Code ${airline_code}
    Set Test Variable    ${consultant_number}    CN1
    Set Test Variable    ${airline_code}

Move Single Passenger For Specific Client And Add Passive Segment With Airline Code ${airline_code}
    Move Profile to GDS    NM1CORPORATE/AMADEUS MR    RM*U25/-A:FA177    APE-test@email.com    RM*CN/-CN1    RM*U14/-${airline_code}PASS-1234567890.LAT/777    RM*CF/-ZZB0000000C    RM*BOOK-YTOWL220N/TKT-YTOWL2106/CC-CA    TKOK
    Add Passive Air Segment In The GDS With Airline Code ${airline_code}
    Set Test Variable    ${consultant_number}    CN1
    Set Test Variable    ${airline_code}

Move Single Passenger And Add Multiple Air Passive Segments With Airline Code ${airline_code}
    Move Profile to GDS    NM1CORPORATE/AMADEUS MR    RM*U25/-A:FA177    APE-test@email.com    RM*BOOK-YTOWL220N/TKT-YTOWL2106/CC-CA    RM*CF/-VB70000000C        TKOK
    Add Multiple Passive Air Segments In The GDS With Airline Code ${airline_code}
    Set Test Variable    ${airline_code}

Move Single Passenger And Add Multiple Passive Air With Different Airline Codes
    Move Profile to GDS    NM1CORPORATE/AMADEUS MR    RM*U25/-A:FA177    APE-test@email.com    RM*BOOK-YTOWL220N/TKT-YTOWL2106/CC-CA    RM*CF/-AAA0000000C
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
    Move Profile to GDS    NM1Juarez/Rose Ms    APE-test@email.com    RM*CF/-RBP0000000N    RMP/CITIZENSHIP-CA    RM SYEXGVS: A:FA177    RM*BOOK-YTOWL220N/TKT-YTOWL2106/CC-CA
    
Move Single Passenger For FR
    Move Profile to GDS    NM1Juarez/Rose Ms    APE-test@email.com    RM*CF/-RBP0000000N    RMP/CITIZENSHIP-CA    RM SYEXGVS: A:FA177    RMZ/LANGUAGE-FR-CA    RM*BOOK-YTOWL220N/TKT-YTOWL2106/CC-CA

Create ${num_of_test_dates} Test Dates
    ${tdate}    Get Current Date
    ${tdate}    Add Time To Date    ${tdate}    180 days
    Set Test Variable    ${add_to_date}    3 days
    : FOR    ${i}    IN RANGE    0    ${num_of_test_dates}
    \    ${i}    Evaluate    ${i} + 1
    \    ${test_date}    Add Time To Date    ${tdate}    ${add_to_date}
    \    Set Test Variable    ${tdate}    ${test_date}
    \    ${day}    Convert Date    ${test_date}    %d
    \    ${month}    Convert Month To MMM    ${test_date}
    \    Set Test Variable    ${test_date_${i}}    ${day}${month}
    \    Set Test Variable    ${tdate}    ${test_date}

Create ${num_of_test_dates} Test Dates For Booking Less Than ${no_of_days} days
    ${tdate}    Get Current Date  
    ${tdate}    Run Keyword If    '${no_of_days}' == '14'    Add Time To Date    ${tdate}    10 days   ELSE   Set Variable    ${tdate}    
    ${tdate}    Run Keyword If    '${no_of_days}' == '21'    Add Time To Date    ${tdate}    19 days   ELSE   Set Variable    ${tdate}
    Set Test Variable    ${tdate}    
    Set Test Variable    ${add_to_date}    3 days
    : FOR    ${i}    IN RANGE    0    ${num_of_test_dates}
    \    ${i}    Evaluate    ${i} + 1 
    \    ${day}    Convert Date    ${tdate}    %d
    \    ${month}    Convert Month To MMM    ${tdate}
    \    Set Test Variable    ${test_date_${i}}    ${day}${month}
    \    ${tdate}     Add Time To Date    ${tdate}    ${add_to_date}
   
Get Record Locator Value
    Switch To Graphic Mode
    ${actual_record_locator}    Get Text    ${text_record_locator}
    ${actual_record_locator}     Fetch From Right    ${actual_record_locator}    :${SPACE}
    Set Test Variable     ${actual_record_locator}
    Log    ${actual_record_locator}    
    Open Command Page
    
Create And Ticket PNR With Airline Code ${airline_code}
    Move Profile to GDS    NM1CORPORATE/AMADEUS MR    RM*U25/-A:FA177    APE-test@email.com    RM*CN/-CN1    RM*U14/-${airline_code}PASS-1234567890.LAT/777    RM*CF/-AAA0000000C    RM*BOOK-YTOWL220N/TKT-YTOWL2106/CC-CA    TKOK    FS02    FM10    FPCASH    
    Create 2 Test Dates
    Move Profile to GDS    AN${test_date_1}YULORD/A${airline_code}    SS1Y1    AN${test_date_2}ORDYUL/A${airline_code}    SS1Y1    FXP/S2    FXP/S3    SR DOCS AC HK1-P-GBR-00823451-GB-30JUN73-M-14APR09-CORPORATE-AMADEUS/P1/S2-3    RFCWTTEST   ER    
    Sleep    4
    Get Record Locator Value
    Move Profile to GDS    TTP/T1
    Set Test Variable    ${ticketed_tst}    1
    Sleep    4
    Move Profile to GDS     RT${actual_record_locator}
    Set Test Variable    ${airline_code}
    Set Test Variable    ${route_code}    TRANS
    
Create And Ticket 2nd TST With Airline Code ${airline_code}
    Move Profile to GDS    NM1CORPORATE/AMADEUS MR    RM*U25/-A:FA177    APE-test@email.com    RM*CN/-CN1    RM*U14/-${airline_code}PASS-1234567890.LAT/777    RM*CF/-AAA0000000C    RM*BOOK-YTOWL220N/TKT-YTOWL2106/CC-CA    TKOK    FS02    FM10    FPCASH
    Create 2 Test Dates
    Move Profile to GDS    AN${test_date_1}YULORD/A${airline_code}    SS1Y1    AN${test_date_2}ORDYUL/A${airline_code}    SS1Y1    FXP/S3    SR DOCS AC HK1-P-GBR-00823451-GB-30JUN73-M-14APR09-CORPORATE-AMADEUS/P1/S2-3    RFCWTTEST   ER
    Sleep    4
    Get Record Locator Value
    Move Profile to GDS    TTP/T1
    Set Test Variable    ${ticketed_tst}    1
    Sleep    4
    Move Profile to GDS     RT${actual_record_locator}
    Set Test Variable    ${airline_code}
    Set Test Variable    ${route_code}    TRANS
    
Create PNR With 4 TST And Ticket Last TST For Airline Code ${airline_code}
    Move Profile to GDS    NM1CORPORATE/AMADEUS MR    RM*U25/-A:FA177    APE-test@email.com    RM*CN/-CN1    RM*U14/-${airline_code}PASS-1234567890.LAT/777    RM*CF/-AAA0000000C    RM*BOOK-YTOWL220N/TKT-YTOWL2106/CC-CA    TKOK    FS02    FM10    FPCASH
    Create 4 Test Dates
    Move Profile to GDS    AN${test_date_1}YULCDG/A${airline_code}    SS1Y1    AN${test_date_2}CDGTXL/AAF   SS1Y1    AN${test_date_3}TXLCDG/AAF    SS1Y1    AN${test_date_4}CDGYUL/A${airline_code}    SS1Y1    SR DOCS AC HK1-P-GBR-00823451-GB-30JUN73-M-14APR09-CORPORATE-AMADEUS/P1/S2,5    SR DOCS AF HK1-P-GBR-00823451-GB-30JUN73-M-14APR09-CORPORATE-AMADEUS/P1/S3-4
    Move Profile to GDS    FXP/S2    FXP/S3    FXP/S4    FXP/S5    RFCWTTEST   ER    ER
    Sleep    4
    Get Record Locator Value
    Move Profile to GDS    TTP/T4
    Set Test Variable    ${ticketed_tst}    1
    Sleep    4
    Retrive Current PNR
    Set Test Variable    ${airline_code}
    Set Test Variable    ${route_code_1}    INTL
    Set Test Variable    ${route_code_2}    INTL
    Set Test Variable    ${route_code_3}    INTL
    Set Test Variable    ${route_code_4}    INTL
    
Create PNR With 1 TST And Ticket For Airline Code ${airline_code}
    Move Profile to GDS    NM1CORPORATE/AMADEUS MR    RM*U25/-A:FA177    APE-test@email.com    RM*CN/-CN1    RM*U14/-${airline_code}PASS-1234567890.LAT/777    RM*CF/-AAA0000000C    RM*BOOK-YTOWL220N/TKT-YTOWL2106/CC-CA    TKOK    FS02    FM10    FPCASH    
    Create 2 Test Dates
    Move Profile to GDS    AN${test_date_1}YULYYZ/A${airline_code}    SS1Y1    FXP/S2    SR DOCS AC HK1-P-GBR-00823451-GB-30JUN73-M-14APR09-CORPORATE-AMADEUS/P1/S2    RFCWTTEST   ER    
    Sleep    4
    Get Record Locator Value
    Move Profile to GDS    TTP/T1
    Set Test Variable    ${ticketed_tst}    1
    Sleep    4
    Move Profile to GDS     RT${actual_record_locator}
    Set Test Variable    ${airline_code}
    Set Test Variable    ${route_code}    DOM
    
Retrive Current PNR 
    Wait Until Element Is Visible    ${label_command_page}    180
    Input Text    ${input_commandText}    RT${actual_record_locator}
    Press Key    ${input_commandText}    \\13
    Sleep    1
    
Create PNR With ${number_of_segments} Limo Segments
    Move Profile to GDS    NM1CORPORATE/AMADEUS MR    RM*U25/-A:FA177    APE-test@email.com    RM*CN/-CN1    RM*CF/-AAA0000000C    RM*BOOK-YTOWL220N/TKT-YTOWL2106/CC-CA    TKOK    FS02    FM10    FPCASH
    Add ${number_of_segments} Limo Segments
    
Create PNR With ${number_of_segments} Car Segments
    Move Profile to GDS    NM1CORPORATE/AMADEUS MR    RM*U25/-A:FA177    APE-test@email.com    RM*CN/-CN1    RM*CF/-AAA0000000C    RM*BOOK-YTOWL220N/TKT-YTOWL2106/CC-CA    TKOK    FS02    FM10    FPCASH
    Add ${number_of_segments} Car Segments
    
Create PNR With ${number_of_segments} Hotel Segments
    Move Profile to GDS    NM1CORPORATE/AMADEUS MR    RM*U25/-A:FA177    APE-test@email.com    RM*CN/-CN1    RM*CF/-AAA0000000C    RM*BOOK-YTOWL220N/TKT-YTOWL2106/CC-CA    TKOK    FS02    FM10    FPCASH
    Add ${number_of_segments} Hotel Segments

Create PNR With ${number_of_segments} Hotel Segment/s With Invoice
    Move Profile to GDS    NM1CORPORATE/AMADEUS MR    RM*U25/-A:FA177    APE-test@email.com    RM*CN/-CN1    RM*CF/-AAA0000000C    RM*BOOK-YTOWL220N/TKT-YTOWL2106/CC-CA    TKOK    FS02    FM10    FPCASH
    Add ${number_of_segments} Hotel Segments
    Move Profile to GDS    RFCWTTEST    ER
    Sleep    4
    Get Record Locator Value
    Move Profile to GDS    INV/MI000143
    Sleep    4
    Move Profile to GDS    RT${actual_record_locator}

Create PNR With One TST For Airline Code ${airline_code}
    Move Profile to GDS    NM1CORPORATE/AMADEUS MR    RM*U25/-A:FA177    APE-test@email.com    RM*CN/-CN1    RM*CF/-AAA0000000C    RM*BOOK-YTOWL220N/TKT-YTOWL2106/CC-CA    TKOK    FS02    FM10    FPCASH
    Create 2 Test Dates
    Move Profile to GDS    AN${test_date_1}YULORD/A${airline_code}    SS1Y1    AN${test_date_2}ORDYUL/A${airline_code}    SS1Y1    SR DOCS AC HK1-P-GBR-00823451-GB-30JUN73-M-14APR09-CORPORATE-AMADEUS/P1/S2-3
    Move Profile to GDS    FXP/S2-3    RFCWTTEST   ER
    Set Test Variable    ${ticketed_tst}    ${EMPTY}
    Sleep    4
    Set Test Variable    ${airline_code}
    Set Test Variable    ${route_code}    TRANS

Create PNR With 4 TSTs For Airline Code ${airline_code}
    Move Profile to GDS    NM1CORPORATE/AMADEUS MR    RM*U25/-A:FA177    APE-test@email.com    RM*CN/-CN1    RM*CF/-AAA0000000C    RM*BOOK-YTOWL220N/TKT-YTOWL2106/CC-CA    TKOK    FS02    FM10    FPCASH
    Create 4 Test Dates
    Move Profile to GDS    AN${test_date_1}YULORD/A${airline_code}    SS1Y1    AN${test_date_2}ORDLHR/AAA    SS1Y1    AN${test_date_3}LHRORD/AAA    SS1Y1    AN${test_date_4}ORDYUL/A${airline_code}    SS1Y1    SR DOCS AC HK1-P-GBR-00823451-GB-30JUN73-M-14APR09-CORPORATE-AMADEUS/P1/S2,5    SR DOCS AA HK1-P-GBR-00823451-GB-30JUN73-M-14APR09-CORPORATE-AMADEUS/P1/S3-4
    Move Profile to GDS    FXP/S2    FXP/S3    FXP/S4    FXP/S5    RFCWTTEST   ER
    Sleep    4
    Set Test Variable    ${airline_code}
    Set Test Variable    ${ticketed_tst}    ${EMPTY}
    Set Test Variable    ${airline_code}
    Set Test Variable    ${route_code_1}    TRANS
    Set Test Variable    ${route_code_2}    INTL
    Set Test Variable    ${route_code_3}    INTL
    Set Test Variable    ${route_code_4}    TRANS
    
Add ${number_of_segments} Hotel Segments
    Create ${number_of_segments} Test Dates
    :FOR    ${i}    IN RANGE    0   ${number_of_segments}
    \    ${i}    Evaluate    ${i} + 1
    \    Move Profile to GDS    HU1AHK1STR${test_date_${i}}-${test_date_${i}}/GERMANY,PARK INN STUTTGART,TEL-+49 711320940,FAX-+49 7113209410,CF:12345,SINGLE ROOM,RATE:CWT EUR60.00/NIGHT,SI-*H01*/p1
    
Add ${number_of_segments} Limo Segments
    Create ${number_of_segments} Test Dates
    :FOR    ${i}    IN RANGE    0   ${number_of_segments}
    \    ${i}    Evaluate    ${i} + 1
    \    Move Profile to GDS    RU1AHK1DXB${test_date_${i}}-/TYP-LIM/SUN-EXECUTIVE/SUC-YY/STP-DXB AIRPORT/SD-${test_date_${i}}/ST-1010/EC-DXB/ED-${test_date_${i}}/ET-1300/CF-12345          
    
Add ${number_of_segments} Car Segments
    Create ${number_of_segments} Test Dates
    :FOR    ${i}    IN RANGE    0   ${number_of_segments}
    \    ${i}    Evaluate    ${i} + 1
    \    Move Profile to GDS    CU1AHK1FRA${test_date_${i}}-${test_date_${i}}CCMR/SUC-EP/SUN-EUROPCAR/SD-${test_date_${i}}/ST-1700/ED-${test_date_${i}}/ET-1700/TTL-100.00USD/DUR-DAILY/MI-50KM FREE/CF-TEST/P1       

Add ${number_of_segments} Rail Segments
    Create ${number_of_segments} Test Dates
    :FOR    ${i}    IN RANGE    0   ${number_of_segments}
    \    ${i}    Evaluate    ${i} + 1
    \    Move Profile to GDS    RU1AHK1CUN${test_date_${i}}-/TYP-SEA/SUN-STENA LINE/SUC-ZZ/SC-KEL/SD-${test_date_${i}}/ST-1800OSL/ED-${test_date_${i}}/ET-0800/CF-12345
    
Create PNR With Passive Air Segments For ${client_data}
    ${client_name}    Get Client Name    ${client_data}
    Get Test Data From Json    ${CURDIR}${/}test_data/${client_name}_test_data    ${client_data}
    Create ${num_air_segments} Test Dates
    Move Profile to GDS    NM1${psngr_1}    RM*U25/-A:${udid25}    APE-${email}    RM*CN/-${consultant_num}    RM*CF/-${cfa}0000000C    RM*BOOK-YTOWL220N/TKT-YTOWL2106/CC-CA    ${tkt_line}    FP${form_of_payment}    RM*U50/-${udid50}
    Run Keyword If    "${num_air_segments}" != "0"    Book ${num_air_segments} Passive Air Segments
    Run Keyword If    "${num_car_segments}" != "0"    Add ${num_car_segments} Car Segments
    Run Keyword If    "${num_htl_segments}" != 0    Add ${num_htl_segments} Hotel Segments
    
Create PNR With Active Air Segments For ${client_data}
    Get Test Data From Json    ${CURDIR}${/}test_data/${test_file_name}_test_data    ${client_data}
    Create ${num_air_segments} Test Dates
    Move Profile to GDS    NM1${psngr_1}    RM*U25/-A:${udid25}    APE-${email}    RM*CN/-${consultant_num}    RM*CF/-${cfa}0000000C    RM*BOOK-YTOWL220N/TKT-YTOWL2106/CC-CA    ${tkt_line}    FP${form_of_payment}    RM*U50/-${udid50}
    Run Keyword If    "${num_air_segments}" != "0"    Book ${num_air_segments} Active Air Segments
    Run Keyword If    "${num_car_segments}" != "0"    Add ${num_car_segments} Car Segments
    Run Keyword If    "${num_htl_segments}" != 0    Add ${num_htl_segments} Hotel Segments
    Run Keyword If    "${other_rmk_1}" != "None"    Add Other Remarks
    
Create PNR With Active Air Segments Less Than ${no_of_days} Days For ${client_data}
    ${client_name}    Get Client Name    ${client_data}   
    Get Test Data From Json    ${CURDIR}${/}test_data/${client_name}_test_data    ${client_data}
    Move Profile to GDS    NM1${psngr_1}    RM*U25/-A:${udid25}    APE-${email}    RM*CN/-${consultant_num}    RM*CF/-${cfa}0000000C    RM*BOOK-YTOWL220N/TKT-YTOWL2106/CC-CA    ${tkt_line}    FP${form_of_payment}    RM*U50/-${udid50}
    Run Keyword If    "${num_air_segments}" != "0"    Book ${num_air_segments} Active Air Segments Less Than ${no_of_days} Days
    Run Keyword If    "${num_car_segments}" != "0"    Add ${num_car_segments} Car Segments
    Run Keyword If    "${num_htl_segments}" != 0    Add ${num_htl_segments} Hotel Segments
    Run Keyword If    "${other_rmk_1}" != "None"    Add Other Remarks
    
Create PNR For ${client_data}
    ${client_name}    Get Client Name    ${client_data}
    Get Test Data From Json    ${CURDIR}${/}test_data/${client_name}_test_data    ${client_data}
    Create ${num_air_segments} Test Dates
    Move Profile to GDS    NM1${psngr_1}    RM*U25/-A:${udid25}    APE-${email}    RM*CN/-${consultant_num}    RM*CF/-${cfa}0000000C    RM*BOOK-YTOWL220N/TKT-YTOWL2106/CC-CA    ${tkt_line}    FPCASH    RM*U50/-${udid50}
    Run Keyword If    "${num_car_segments}" != "0"    Add ${num_car_segments} Car Segments
    Run Keyword If    "${num_htl_segments}" != 0    Add ${num_htl_segments} Hotel Segments
    Run Keyword If    "${other_rmk_1}" != "None"    Add Other Remarks

Enter Cryptic Command
    [Arguments]    ${gds_command}
    Input Text    ${input_commandText}     ${gds_command}
    Press Key    ${input_commandText}    \\13
    Wait Until Element Is Not Visible    ${icon_processing}    20
    
Book ${numberOfAir} Passive Air Segments
    Create ${numberOfAir} Test Dates
    : FOR    ${i}    IN RANGE   0   ${numberOfAir}
    \    ${i}    Evaluate    ${i} + 1
    \    Enter Cryptic Command    SS ${airline_code_${i}}1074 Y ${test_date_${i}} ${air_seg_route_${i}} GK1 / 11551440 / ABCDEFG
        
Book ${numberOfAir} Active Air Segments
    Create ${numberOfAir} Test Dates
    : FOR    ${i}    IN RANGE   0   ${numberOfAir}
    \    ${i}    Evaluate    ${i} + 1   
    \    Enter Cryptic Command    AN${test_date_${i}}${air_seg_route_${i}}/A${airline_code_${i}}
    \    Enter Cryptic Command    SS1Y1
    \    Run Keyword If    "${price_cmd_${i}}" != "None"    Enter Cryptic Command    ${price_cmd_${i}}    
      
Book ${numberOfAir} Active Air Segments Less Than ${no_of_days} Days
    Create ${numberOfAir} Test Dates For Booking Less Than ${no_of_days} days
    : FOR    ${i}    IN RANGE   0   ${numberOfAir}
    \    ${i}    Evaluate    ${i} + 1   
    \    Enter Cryptic Command    AN${test_date_${i}}${air_seg_route_${i}}/A${airline_code_${i}}
    \    Enter Cryptic Command    SS1Y1
    \    Run Keyword If    "${price_cmd_${i}}" != "None"    Enter Cryptic Command    ${price_cmd_${i}}    
    
Add Other Remarks
    : FOR    ${i}    IN RANGE   0    99
    \    ${i}    Evaluate    ${i} + 1
    \    ${exists}     Run Keyword And Return Status      Should Not Be Empty    ${other_rmk_${i}}
    \    Run Keyword If    "${exists}" == "True" and "${other_rmk_${i}}" != "None"     Enter Cryptic Command    ${other_rmk_${i}}
    \    Exit For Loop If    "${exists}" == "False"