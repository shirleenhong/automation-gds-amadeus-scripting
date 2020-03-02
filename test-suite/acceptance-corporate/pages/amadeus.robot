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
${menu_corp_test}      //li[@id="emenu_menuSection_desktop_menu_data_id_SMART_TOOL_CWT Corp ${env}"]
${header_corp_test}    //div[@class="xDialog_titleBar xDialog_std_titleBar"]//span[contains(text(), 'CWT Corp ${env}')]
${window_corp_test}    //iframe[contains(@src,'/portal/gds-scripting-amadeus/?corporate')]
${link_sign_out}    css=#eusermanagement_logout_logo_logout_id
${popUp_sign_out}    //div[contains(text(),'Sign out')]
${button_sign_out}    css=#uicAlertBox_ok > span.uicButtonBd
${icon_air}       css=.bookingTool.FS
${tab_cryptic_display}    //button[contains(@id, 'crypticDisplay')]
${tab_booking_file_history}    //span[contains(text(), 'Booking file history')]
${popUp_pnr_display}    //div[@class='crypticPanel'][contains(@id,'epnrRetrieves')]
${popUp_pnr_history}   //div[@class='cmdPopupContent']
${button_cryptic}    css=.showInCommandPage
${button_graphical}    css=.showInGraphicMode
${close_cryptic_display}    css=#e4retrievePNR_cdPopup_id > .ydlg-close
${close_booking_file_history}    //div[@class='btnCmdPageCLose']
${response_simultaneous}    //pre[@id='responseCommand']//code[contains(text(), 'SIMULTANEOUS CHANGES TO PNR')]
${overlay_loader}    //div[@class='uicLoaderOverlay uicLo-loading'] 
${text_record_locator}     //div[contains(text(), 'Record Locator')]
${icon_processing}    //div[@class='processing']
${text_area_command}    //div[@class='crypticContainer']
${button_officeId}   css=#office-id-button
${popUp_oid}    css=#ngb-popover-0 
${oid_YTOWL2101}    //a[contains(text(), 'YTOWL2101')]
${tst_line}    //table[@class='tstTsmView line']//tr
${tst_row}    //td[@class='price textwrap']
${button_closeSmartTool}    //div[contains(@class,'std_titleBar')]//span[@class='xWidget xICNstd']
${link_view_tst}    //a[contains(text(), 'View/Modify TST
${link_view_tst_end}    ')]
${popup_amadeus_tst}    //div[@id='e4retrievePNR_manageTSTPopup_id']
${input_base_fare}    //input[@name='baseFare']
${input_tst_currency}    //input[@name='baseCur']
${close_tst_window}    css=#e4retrievePNR_manageTSTPopup_id > .ydlg-close

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
    Sleep     10
    Select Frame    ${window_corp_test}
    Set Test Variable    ${current_page}    CWT Corporate
    Set Test Variable    ${pnr_submitted}    no
    Set Test Variable    ${pnr_details}     ${EMPTY}
    Set Test Variable    ${ticketing_complete}     no
    Set Test Variable     ${ticketing_details}    no
    Set Test Variable     ${actual_counselor_identity}    ${EMPTY}
    Set Test Variable     ${ignored_approval}    False
    Import Library     AngularJSLibrary    app-root
    Wait For Script To Complete

Add Single BSP Segment And Store Fare
    Create 1 Test Dates
    @{gds_commands}    Create List    AN${test_date_1}YYZORD/AAC    SS1Y1    FXP
    Wait Until Element Is Visible    ${label_command_page}    180
    : FOR    ${gds_command}    IN    @{gds_commands}
    \    Enter Cryptic Command    ${gds_command}
    Set Test Variable    ${final_destination}    ORD    


Add Multiple BSP Segment And Store Fare
    Create 4 Test Dates
    @{gds_commands}    Create List    AN${test_date_1}YYZORD/AAC    SS1Y1    AN${test_date_2}ORDYUL/AAC    SS1Y1    FXP
    ...    AN${test_date_3}YULCDG/AAF    SS1Y1    FXP/S4    AN${test_date_4}CDGLHR/AAF    SS1Y1    FXP/S5
    Wait Until Element Is Visible    ${label_command_page}    180
    : FOR    ${gds_command}    IN    @{gds_commands}
    \    Enter Cryptic Command    ${gds_command}
    Set Test Variable    ${final_destination}    ORD  
    
Add Multiple BSP Segment And Store Multiple Fares
    Create 5 Test Dates
    @{gds_commands}    Create List    AN${test_date_1}YYZCDG/AAF    SS1Y1    AN${test_date_2}CDGLHR/AAF    SS1Y1    AN${test_date_2}LHRCDG/AAF
    ...    SS1Y1    AN${test_date_3}CDGYUL/AAC    SS1Y1    AN${test_date_3}YULCDG/AAC    SS1Y1    FXP/S3,5-6    FXP/S2,4
    Wait Until Element Is Visible    ${label_command_page}    180
    : FOR    ${gds_command}    IN    @{gds_commands}
    \    Enter Cryptic Command    ${gds_command}
    Set Test Variable    ${final_destination}    CDG

Add Multiple BSP Segments And Store Single Fare
    Create 2 Test Dates
    @{gds_commands}    Create List    AN${test_date_1}YYZORD/AAC    SS1Y1    AN${test_date_2}ORDYUL/AAC    SS1Y1    FXP
    Wait Until Element Is Visible    ${label_command_page}    180
    : FOR    ${gds_command}    IN    @{gds_commands}
    \    Enter Cryptic Command    ${gds_command}
    Set Test Variable    ${final_destination}    ORD  
	
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
    Close All Browsers

Get PNR Details
    Wait Until Element Is Not Visible    ${overlay_loader}    10
    Wait Until Element Is Enabled    ${icon_air}    30
    Wait Until Element Is Visible    ${tab_cryptic_display}    60
    Sleep    2
    Press Keys    ${tab_cryptic_display}    \\32
    Wait Until Page Contains Element    ${popUp_pnr_display}    60
    Wait Until Element Is Not Visible    ${overlay_loader}    10
    Sleep    1
    ${pnr_details}    Get Text    ${popUp_pnr_display}
    Log    ${pnr_details}
    Set Test Variable    ${pnr_details}    ${pnr_details}
    Close Cryptic Display
    [Teardown]    Take Screenshot
    
Get Booking File History
    Wait Until Element Is Not Visible    ${overlay_loader}    10
    Wait Until Element Is Enabled    ${icon_air}    30
    Wait Until Element Is Visible    ${tab_booking_file_history}    60
    Sleep    2
    Press Keys    ${tab_booking_file_history}    \\32
    Wait Until Page Contains Element    ${popUp_pnr_history}    60
    Wait Until Element Is Not Visible    ${overlay_loader}    10
    Sleep    1
    ${pnr_details}    Get Text    ${popUp_pnr_history}
    Log    ${pnr_details}
    Set Test Variable    ${pnr_details}
    Take Screenshot
    Click Element    ${close_booking_file_history}

Switch To Command Page
    Wait Until Page Contains Element    ${button_cryptic}    60
    Click Element At Coordinates    ${button_cryptic}    0    0
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
    Click Element At Coordinates    ${button_graphical}    0    0
    Wait Until Page Contains Element    ${tab_cryptic_display}    60
    Wait Until Element Is Not Visible    ${overlay_loader}    60
    Set Test Variable    ${current_page}    Cryptic Display
    [Teardown]    Take Screenshot

Add Passive Air Segment In The GDS With Airline Code ${airline_code}
    Input Text    ${input_commandText}    SS ${airline_code}1074 Y 10MAR YYZORD GK1 / 11551440 / ABCDEFG
    Press Key    ${input_commandText}    \\13
    Sleep    2
    Set Test Variable    ${final_destination}    ORD  

Add Multiple Passive Air Segments In The GDS With Airline Code ${airline_code}
    @{gds_commands}    Create List    SS ${airline_code}1074 Y 10MAR YYZORD GK1 / 11551440 / ABCDEFG    SS ${airline_code}1075 Y 15MAR ORDCDG GK1 / 01301240 / 1234567
    : FOR    ${gds_command}    IN    @{gds_commands}
    \    Enter Cryptic Command    ${gds_command}
    Set Test Variable    ${final_destination}    CDG  

Add Multiple Passive Air Segments In The GDS With Different Airline Codes
    @{gds_commands}    Create List    SS UA1074 Y 10MAR YYZORD GK1 / 11551440 / ABCDEFG    SS AF1075 Y 15MAR ORDCDG GK1 / 01301240 / 1234567    SS UA1075 Y 20MAR CDGYYZ GK1 / 01301240 / ABC123
    : FOR    ${gds_command}    IN    @{gds_commands}
    \    Enter Cryptic Command    ${gds_command}
    Set Test Variable    ${final_destination}    CDG

Verify Specific Remark Is Written In The PNR
    [Arguments]    ${expected_remark}    ${multi_line_remark}=False
    Log    ${pnr_details}
    Run Keyword And Continue On Failure    Run Keyword If    "${multi_line_remark}" == "True"    Remove Line Break And Spaces    ${pnr_details}    ${expected_remark}
    Run Keyword And Continue On Failure    Run Keyword If    "${multi_line_remark}" == "True"    Should Contain    ${pnr_details_flattened}    ${expected_remark_flattened}   ELSE    Should Contain    ${pnr_details}    ${expected_remark} 
    Run Keyword If    "${multi_line_remark}" == "True"    Log    Expected: ${expected_remark_flattened}    ELSE     Log    Expected: ${expected_remark}
    Run Keyword If    "${multi_line_remark}" == "True"    Log    Expected: ${pnr_details_flattened}     ELSE    Log    Actual: ${pnr_details}

Verify Specific Remark Is Not Written In The PNR
    [Arguments]    ${expected_remark}    ${multi_line_remark}=False
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
    Create 1 Test Dates
    @{gds_commands}    Create List    RT    RFCWTPTEST    ER    ER    TTK/EXCH/S2
    ...    TTK/T1/RCAD200.00/XCAD20.00YR/TCAD120.00    FHA 057-1346629127    FO057-1346629127E1PAR${test_date_1}20/00002634/057-1346629127E1/S2
    : FOR    ${gds_command}    IN    @{gds_commands}
    \    Enter Cryptic Command    ${gds_command}
    
Create Multiple TKT Exchange PNR In The GDS
    @{gds_commands}    Create List    RT   TTK/EXCH/S2    TTK/T1/RCAD200.00/XCAD20.00YR/TCAD120.00    FHA 057-1346629127    FO057-1346629127E1PAR${test_date_1}20/00002634/057-1346629127E1/S2    TTK/EXCH/S3    TTK/T2/RCAD200.00/XCAD20.00YR/TCAD120.00    FO057-1346629128E1PAR${test_date_2}20/00002634/057-1346629127E1/S3   RFCWTPTEST   ER
    : FOR    ${gds_command}    IN    @{gds_commands}
    \    Enter Cryptic Command    ${gds_command}
    Sleep    5

Move Single Passenger
    Move Profile to GDS    NM1CORPORATE/AMADEUS MR    APE-test@email.com    RM*CF/-AAA0000000C    RMP/CITIZENSHIP-CA    RM*U25/-A:FA177    RM*BOOK-YTOWL220N/TKT-YTOWL2106/CC-C   RM*CN/-CN1
    Handle Smart Tool PopUp
    Set Test Variable    ${cfa}    AAA
    Set Test Variable    ${num_air_segments}     0

Move Single Passenger For OBT
    Move Profile to GDS    NM1CORPORATE/AMADEUS MR    APE-test@email.com    RM*CF/-AAA0000000C    RMP/CITIZENSHIP-CA    RM*U25/-A:FA177    RM*EB/-EBA    RM*BOOK-YTOWL220N/TKT-YTOWL2106/CC-C
    Handle Smart Tool PopUp 
    Set Test Variable    ${cfa}    AAA
    Set Test Variable    ${num_air_segments}     0

Move Multiple Passenger
    Move Profile to GDS    NM1Juarez/Rose Ms    NM1De Guzman/Cyril Mr    APE-test@email.com    RM*CF/-AAA0000000C    RMP/CITIZENSHIP-CA    RM*U25/-A:FA177
    Handle Smart Tool PopUp
    Set Test Variable    ${cfa}    AAA
    Set Test Variable    ${num_air_segments}     0

Move Single Passenger And Add Single BSP Segment With TST
    Move Profile to GDS    NM1CORPORATE/AMADEUS MR    RM*U25/-A:FA177    APE-test@email.com    RM*BOOK-YTOWL220N/TKT-YTOWL2106/CC-C    RM*CF/-AAA0000000C    RM*CN/-CN1
    Add Single BSP Segment And Store Fare
    Handle Smart Tool PopUp
    Set Test Variable    ${cfa}    AAA
    Set Test Variable    ${num_air_segments}     0

Move Single Passenger And Add Single BSP Segment With IFC CN Number And TST
    Move Profile to GDS    NM1CORPORATE/AMADEUS MR    RM*U25/-A:FA177    APE-test@email.com    RM*BOOK-YTOWL220N/TKT-YTOWL2106/CC-C    RM*CF/-AAA0000000C    RM*CN/-IFC
    Add Single BSP Segment And Store Fare
    Move Profile to GDS    RT
    Handle Smart Tool PopUp
    Set Test Variable    ${cfa}    AAA
    Set Test Variable    ${num_air_segments}     0

Move Single Passenger And Add Multiple BSP Segment With TSTs
    Move Profile to GDS    NM1CORPORATE/AMADEUS MR    RM*U25/-A:FA177    APE-test@email.com    RM*BOOK-YTOWL220N/TKT-YTOWL2106/CC-C    RM*CF/-AAA0000000C    RM*CN/-CN1
    Add Multiple BSP Segment And Store Fare
    Handle Smart Tool PopUp
    Set Test Variable    ${cfa}    AAA
    Set Test Variable    ${num_air_segments}     0
	
Move Single Passenger And Add Multiple BSP Segments With Single TST
    Move Profile to GDS    NM1CORPORATE/AMADEUS MR    RM*U25/-A:FA177    APE-test@email.com    RM*BOOK-YTOWL220N/TKT-YTOWL2106/CC-C    RM*CF/-AAA0000000C    RM*CN/-CN1
    Add Multiple BSP Segments And Store Single Fare
    Handle Smart Tool PopUp
    Take Screenshot
    Set Test Variable    ${cfa}    AAA
    Set Test Variable    ${num_air_segments}     0
    
Move Single Passenger And Add Multiple BSP Segment With Multiple TSTs
    Move Profile to GDS    NM1CORPORATE/AMADEUS MR    RM*U25/-A:FA177    APE-test@email.com    RM*BOOK-YTOWL220N/TKT-YTOWL2106/CC-C    RM*CF/-AAA0000000C    RM*CN/-CN1
    Add Multiple BSP Segment And Store Multiple Fares
    Handle Smart Tool PopUp
    Take Screenshot
    Set Test Variable    ${cfa}    AAA
    Set Test Variable    ${num_air_segments}     0

Move Single Passenger And Add Passive Segment With Airline Code ${airline_code}
    Move Profile to GDS    NM1CORPORATE/AMADEUS MR    RM*U25/-A:FA177    APE-test@email.com    RM*CN/-CN1    RM*U14/-${airline_code}PASS-1234567890.LAT/777    RM*BOOK-YTOWL220N/TKT-YTOWL2106/CC-CA    RM*U86/-OVERRIDE OFC    TKOK     RM*CF/-AAA0000000C
    Add Passive Air Segment In The GDS With Airline Code ${airline_code}
    Set Test Variable    ${consultant_number}    CN1
    Set Test Variable    ${airline_code}
    Handle Smart Tool PopUp
    Take Screenshot
    Set Test Variable    ${cfa}    AAA
    Set Test Variable    ${num_air_segments}     0
    
Move Single Passenger And Add Passive Segment For APAY With Airline Code ${airline_code}
    Move Profile to GDS    NM1CORPORATE/AMADEUS MR    RM*U25/-A:FA177    APE-test@email.com    RM*CN/-CN1    RM*U14/-${airline_code}PASS-1234567890.LAT/777    RM*BOOK-YTOWL220N/TKT-YTOWL2106/CC-CA    TKOK     RM*CF/-AAA0000000C
    Add Passive Air Segment In The GDS With Airline Code ${airline_code}
    Set Test Variable    ${consultant_number}    CN1
    Set Test Variable    ${airline_code}
    Handle Smart Tool PopUp
    Take Screenshot
    Set Test Variable    ${cfa}    AAA
    Set Test Variable    ${num_air_segments}     0

Move Single Passenger For Specific Client And Add Passive Segment With Airline Code ${airline_code}
    Move Profile to GDS    NM1CORPORATE/AMADEUS MR    RM*U25/-A:FA177    APE-test@email.com    RM*CN/-CN1    RM*U14/-${airline_code}PASS-1234567890.LAT/777    RM*CF/-ZZB0000000C    RM*BOOK-YTOWL220N/TKT-YTOWL2106/CC-CA    TKOK
    Add Passive Air Segment In The GDS With Airline Code ${airline_code}
    Set Test Variable    ${consultant_number}    CN1
    Set Test Variable    ${airline_code}
    Handle Smart Tool PopUp
    Set Test Variable    ${cfa}    ZZB
    Set Test Variable    ${num_air_segments}     0
    Take Screenshot

Move Single Passenger And Add Multiple Air Passive Segments With Airline Code ${airline_code}
    Move Profile to GDS    NM1CORPORATE/AMADEUS MR    RM*U25/-A:FA177    APE-test@email.com    RM*BOOK-YTOWL220N/TKT-YTOWL2106/CC-CA    RM*CF/-AAA0000000C        TKOK
    Add Multiple Passive Air Segments In The GDS With Airline Code ${airline_code}
    Set Test Variable    ${airline_code}
    Handle Smart Tool PopUp
    Take Screenshot
    Set Test Variable    ${cfa}    AAA
    Set Test Variable    ${num_air_segments}     0

Move Single Passenger And Add Multiple Passive Air With Different Airline Codes
    Move Profile to GDS    NM1CORPORATE/AMADEUS MR    RM*U25/-A:FA177    APE-test@email.com    RM*BOOK-YTOWL220N/TKT-YTOWL2106/CC-CA    RM*CF/-AAA0000000C
    Add Multiple Passive Air Segments In The GDS With Different Airline Codes
    Handle Smart Tool PopUp
    Take Screenshot
    Set Test Variable    ${cfa}    AAA
    Set Test Variable    ${num_air_segments}     0

Enter FOP Credit Card Remark
    Move Profile to GDS    FPCCVI4444333322221111/1029
    
Enter EB Remark For APAY
    Move Profile to GDS    RM*EB/-EBA

Enter RIR Remarks In English
    Move Profile to GDS    RMZ/LANGUAGE-EN-CA    RIR THE AIRLINE TICKET CHARGE ON THIS ITINERARY/INVOICE/S2    RIR IS FOR INTERNAL COST RE-ALLOCATION PURPOSES ONLY./S2    RIR **PLEASE DO NOT EXPENSE** THIS CHARGE AS IT WILL NOT APPEAR/S2    RIR ON YOUR CREDIT CARD STATEMENT./S2

Enter RIR Remarks In French
    Move Profile to GDS    RMZ/LANGUAGE-FR-CA    RIR LES FRAIS DE BILLET D AVION DE CET ITINERAIRE/FACTURE /S2    RIR NE SONT QU AUX FINS DE REATTRIBUTION DES COUTS A L INTERNE./S2    RIR **VEILLEZ NE PAS INSCRIRE** CES COUTS PUISQU ILS NE PARAITRONT PAS /S2    RIR ON YOUR CREDIT CARD STATEMENT./SRIR SUR VOTRE RELEVE DE CARTE DE CREDIT./S2
    
Handle Simultaneous Changes To PNR
    Sleep   3
    ${status}    Run Keyword And Return Status    Page Should Contain Element     ${response_simultaneous}
    Run keyword If    ${status}    Sleep    60    #to avoid simultaneous change before performing action
    Run keyword If    ${status}    Delete Fare and Itinerary

Move Single Passenger For EN
    Move Profile to GDS    NM1Juarez/Rose Ms    APE-test@email.com    RM*CF/-RBP0000000C    RMP/CITIZENSHIP-CA    RM*U25/-A:FA177    RM*BOOK-YTOWL220N/TKT-YTOWL2106/CC-CA
    Handle Smart Tool PopUp
    Set Test Variable    ${cfa}    RBP
    Set Test Variable    ${num_air_segments}     0
    
Move Single Passenger For FR
    Move Profile to GDS    NM1Juarez/Rose Ms    APE-test@email.com    RM*CF/-RBP0000000C    RMP/CITIZENSHIP-CA    RM*U25/-A:FA177    RMZ/LANGUAGE-FR-CA    RM*BOOK-YTOWL220N/TKT-YTOWL2106/CC-CA
    Handle Smart Tool PopUp
    Set Test Variable    ${cfa}    RBP
    Set Test Variable    ${num_air_segments}     0

Create ${num_of_test_dates} Test Dates
    ${tdate}    Get Current Date
    ${tdate}    Add Time To Date    ${tdate}    180 days
    Set Test Variable    ${add_to_date}    3 days
    ${num_of_test_dates}    Evaluate    ${num_of_test_dates} + 1
    : FOR    ${i}    IN RANGE    0    ${num_of_test_dates}
    \    ${i}    Evaluate    ${i} + 1
    \    ${test_date}    Add Time To Date    ${tdate}    ${add_to_date}
    \    Set Test Variable    ${tdate}    ${test_date}
    \    ${day}    Convert Date    ${test_date}    %d
    \    ${day_int}    Convert To Integer    ${day}
    \    ${car_drop_day}    Evaluate    ${day_int} + 1
    \    ${month}    Convert Month To MMM    ${test_date}
    \    Set Test Variable    ${test_date_${i}}    ${day}${month}
    \    Set Test Variable    ${car_drop_day_${i}}    ${car_drop_day}${month}
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
    Handle Smart Tool PopUp
    Set Test Variable    ${cfa}    AAA
    Set Test Variable    ${num_air_segments}     0
    
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
    Handle Smart Tool PopUp
    Take Screenshot
    Set Test Variable    ${cfa}    AAA
    Set Test Variable    ${num_air_segments}     0
    
Ticket TST${tst_no}
    Enter Cryptic Command    RFCWTTEST
    Enter Cryptic Command    ER
    Sleep    4
    Get Record Locator Value
    Enter Cryptic Command    TTP/T${tst_no}
    Take Screenshot
    Sleep    4
    Enter Cryptic Command    RT${actual_record_locator}
    Set Test Variable    ${ticketed_tst}    ${tst_no}
    
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
    Handle Smart Tool PopUp
    Take Screenshot
    Set Test Variable    ${cfa}    AAA
    Set Test Variable    ${num_air_segments}     0
    
Retrieve Current PNR 
    Wait Until Element Is Visible    ${label_command_page}    180
    Enter Cryptic Command    RT${actual_record_locator}
    
Create PNR With ${number_of_segments} Limo Segments
    Move Profile to GDS    NM1CORPORATE/AMADEUS MR    RM*U25/-A:FA177    APE-test@email.com    RM*CN/-CN1    RM*CF/-AAA0000000C    RM*BOOK-YTOWL220N/TKT-YTOWL2106/CC-CA    TKOK    FS02    FM10    FPCASH
    Add ${number_of_segments} Limo Segments
    Set Test Variable    ${cfa}     AAA
    Set Test Variable    ${num_air_segments}     0
    
Create PNR With ${number_of_segments} Car Segments
    Move Profile to GDS    NM1CORPORATE/AMADEUS MR    RM*U25/-A:FA177    APE-test@email.com    RM*CN/-CN1    RM*CF/-AAA0000000C    RM*BOOK-YTOWL220N/TKT-YTOWL2106/CC-CA    TKOK    FS02    FM10    FPCASH
    Add ${number_of_segments} Car Segments
    Set Test Variable    ${cfa}     AAA
    Set Test Variable    ${num_air_segments}     0
    
Create PNR With ${number_of_segments} Hotel Segments
    Move Profile to GDS    NM1CORPORATE/AMADEUS MR    RM*U25/-A:FA177    APE-test@email.com    RM*CN/-CN1    RM*CF/-AAA0000000C    RM*BOOK-YTOWL220N/TKT-YTOWL2106/CC-CA    TKOK    FS02    FM10    FPCASH
    Add ${number_of_segments} Passive Hotel Segments
    Set Test Variable    ${cfa}     AAA
    Set Test Variable    ${num_air_segments}     0

Create PNR With ${number_of_segments} Hotel Segment/s With Invoice
    Move Profile to GDS    NM1CORPORATE/AMADEUS MR    RM*U25/-A:FA177    APE-test@email.com    RM*CN/-CN1    RM*CF/-AAA0000000C    RM*BOOK-YTOWL220N/TKT-YTOWL2106/CC-CA    TKOK    FS02    FM10    FPCASH
    Add ${number_of_segments} Passive Hotel Segments
    Move Profile to GDS    RFCWTTEST    ER
    Sleep    4
    Get Record Locator Value
    Move Profile to GDS    INV/MI000143
    Sleep    4
    Move Profile to GDS    RT${actual_record_locator}
    Set Test Variable    ${cfa}    AAA
    Set Test Variable    ${num_air_segments}     0

Create PNR With One TST For Airline Code ${airline_code}
    Move Profile to GDS    NM1CORPORATE/AMADEUS MR    RM*U25/-A:FA177    APE-test@email.com    RM*CN/-CN1    RM*CF/-AAA0000000C    RM*BOOK-YTOWL220N/TKT-YTOWL2106/CC-CA    TKOK    FS02    FM10    FPCASH
    Create 2 Test Dates
    Move Profile to GDS    AN${test_date_1}YULORD/A${airline_code}    SS1Y1    AN${test_date_2}ORDYUL/A${airline_code}    SS1Y1    SR DOCS AC HK1-P-GBR-00823451-GB-30JUN73-M-14APR09-CORPORATE-AMADEUS/P1/S2-3
    Move Profile to GDS    FXP/S2-3    RFCWTTEST   ER
    Set Test Variable    ${ticketed_tst}    ${EMPTY}
    Sleep    4
    Set Test Variable    ${airline_code}
    Set Test Variable    ${route_code}    TRANS
    Take Screenshot
    Handle Smart Tool PopUp
    Take Screenshot
    Set Test Variable    ${cfa}    AAA
    Set Test Variable    ${num_air_segments}     0

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
    Handle Smart Tool PopUp
    Take Screenshot
    Set Test Variable    ${cfa}    AAA
    Set Test Variable    ${num_air_segments}     0
    
Add ${number_of_segments} Passive Hotel Segments
    Create ${number_of_segments} Test Dates
    :FOR    ${i}    IN RANGE    0   ${number_of_segments}
    \    ${i}    Evaluate    ${i} + 1
    \    Enter Cryptic Command    HU1AHK1STR${test_date_${i}}-${test_date_${i}}/GERMANY,PARK INN STUTTGART,TEL-+49 711320940,FAX-+49 7113209410,CF:12345,SINGLE ROOM,RATE:CWT EUR60.00/NIGHT,SI-*H01*/p1    0.5
    Set Test Variable    ${final_destination}    ORD

Add ${number_of_segments} Active Hotel Segments In ${city_code}
    Create ${number_of_segments} Test Dates
    :FOR    ${i}    IN RANGE    0   ${number_of_segments}
    \    ${i}    Evaluate    ${i} + 1
    \    Enter Cryptic Command    HA ${city_code} ${test_date_${i}}-1     
    \    Enter Cryptic Command    HA1
    \    Enter Cryptic Command    HP1
    \    Enter Cryptic Command    HS/G-CCVI4012888888881881EXP1221
    \    Verify Hotel Segment Is Booked
    Set Test Variable    ${final_destination}    ORD
    
Verify Hotel Segment Is Booked
    Element Should Not Contain    ${text_area_command}    UNABLE TO PROCESS - CONTACT HELP DESK
    Take Screenshot

Add ${number_of_segments} Limo Segments
    Create ${number_of_segments} Test Dates
    :FOR    ${i}    IN RANGE    0   ${number_of_segments}
    \    ${i}    Evaluate    ${i} + 1
    \    Enter Cryptic Command    RU1AHK1DXB${test_date_${i}}-/TYP-LIM/SUN-EXECUTIVE/SUC-YY/STP-DXB AIRPORT/SD-${test_date_${i}}/ST-1010/EC-DXB/ED-${test_date_${i}}/ET-1300/CF-12345    0.5          
    Set Test Variable    ${final_destination}    ORD

Add Passenger Names
    :FOR    ${i}     IN RANGE    1    99
    \    ${exists}    Run Keyword And Return Status     Should Not Be Empty     ${psngr_${i}} 
    \    Exit For Loop If    not ${exists}
    \    Run Keyword If    ${exists}    Enter Cryptic Command    NM1${psngr_${i}}
    \    ${passenger_no}    Set Variable    ${i}
    Set Test Variable    ${passenger_no}
    
Add ${number_of_segments} Car Segments
    Create ${number_of_segments} Test Dates
    :FOR    ${i}    IN RANGE    0   ${number_of_segments}
    \    ${i}    Evaluate    ${i} + 1
    \    Enter Cryptic Command    CU1AHK1FRA${test_date_${i}}-${test_date_${i}}CCMR/SUC-EP/SUN-EUROPCAR/SD-${test_date_${i}}/ST-1700/ED-${test_date_${i}}/ET-1700/TTL-100.00USD/DUR-DAILY/MI-50KM FREE/CF-TEST/P1    0.5       
    Set Test Variable    ${final_destination}    ORD

Add ${number_of_segments} Rail Segments
    Create ${number_of_segments} Test Dates
    :FOR    ${i}    IN RANGE    0   ${number_of_segments}
    \    ${i}    Evaluate    ${i} + 1
    \    Enter Cryptic Command    RU1AHK1CUN${test_date_${i}}-/TYP-TRN/SUN-NS/SUC-ZZ/SC-KEL/SD-${test_date_${i}}/ST-1800/ED-${test_date_${i}}/ET-0800/CF-12345    0.5
    Set Test Variable    ${final_destination}    ORD
    
Create PNR With Passive Air Segments For ${client_data}
    Get Test Data From Json    ${CURDIR}${/}test_data/${test_file_name}_test_data    ${client_data}
    Create ${num_air_segments} Test Dates
    Add Passenger Names
    Move Profile to GDS    RM*U25/-A:${udid25}    APE-${email}    RM*CN/-${consultant_num}    RM*CF/-${cfa}0000000C    RM*BOOK-YTOWL220N/TKT-YTOWL2106/CC-CA    ${tkt_line}    FP${form_of_payment}    RM*U50/-${udid50}
    Run Keyword If    "${num_air_segments}" != "0"    Book ${num_air_segments} Passive Air Segments
    Run Keyword If    "${num_car_segments}" != "0"    Add ${num_car_segments} Car Segments
    Run Keyword If    "${num_htl_segments}" != 0    Add ${num_htl_segments} Passive Hotel Segments
    Run Keyword If    "${other_rmk_1}" != "None"    Add Other Remarks
    Handle Smart Tool PopUp
    Take Screenshot

Create PNR With ${num_segments} Rail Only Segments For ${client_data}
    Get Test Data From Json    ${CURDIR}${/}test_data/${test_file_name}_test_data    ${client_data}
    Create ${num_air_segments} Test Dates
    Add Passenger Names
    Move Profile to GDS    RM*U25/-A:${udid25}    APE-${email}    RM*CN/-${consultant_num}    RM*CF/-${cfa}0000000C    RM*BOOK-YTOWL220N/TKT-YTOWL2106/CC-CA    ${tkt_line}    FP${form_of_payment}    RM*U50/-${udid50}
    Add ${num_segments} Rail Segments
    Handle Smart Tool PopUp
    Take Screenshot
    

Create PNR With Passive Air Segments That Departs And Arrives From 6:00PM-6:00AM For ${client_data}
    Get Test Data From Json    ${CURDIR}${/}test_data/${test_file_name}_test_data    ${client_data}
    Create ${num_air_segments} Test Dates
    Add Passenger Names
    Move Profile to GDS    RM*U25/-A:${udid25}    APE-${email}    RM*CN/-${consultant_num}    RM*CF/-${cfa}0000000C    RM*BOOK-YTOWL220N/TKT-YTOWL2106/CC-CA    ${tkt_line}    FP${form_of_payment}    RM*U50/-${udid50}
    Run Keyword If    "${num_air_segments}" != "0"    Book ${num_air_segments} Passive Air Segments That Departs And Arrives From 6:00PM-6:00AM
    Run Keyword If    "${num_car_segments}" != "0"    Add ${num_car_segments} Car Segments
    Run Keyword If    "${num_htl_segments}" != 0    Add ${num_htl_segments} Passive Hotel Segments
    Run Keyword If    "${other_rmk_1}" != "None"    Add Other Remarks
    Handle Smart Tool PopUp
    Take Screenshot
    
Create PNR With Passive Air Segments That Departs From 6:00PM-6:00AM For ${client_data}
    Get Test Data From Json    ${CURDIR}${/}test_data/${test_file_name}_test_data    ${client_data}
    Create ${num_air_segments} Test Dates
    Add Passenger Names
    Move Profile to GDS    RM*U25/-A:${udid25}    APE-${email}    RM*CN/-${consultant_num}    RM*CF/-${cfa}0000000C    RM*BOOK-YTOWL220N/TKT-YTOWL2106/CC-CA    ${tkt_line}    FP${form_of_payment}    RM*U50/-${udid50}
    Run Keyword If    "${num_air_segments}" != "0"    Book ${num_air_segments} Passive Air Segments That Departs From 6:00PM-6:00AM
    Run Keyword If    "${num_car_segments}" != "0"    Add ${num_car_segments} Car Segments
    Run Keyword If    "${num_htl_segments}" != 0    Add ${num_htl_segments} Passive Hotel Segments
    Run Keyword If    "${other_rmk_1}" != "None"    Add Other Remarks
    Handle Smart Tool PopUp
    Take Screenshot
    
Create PNR With Active Air Segments For ${client_data}
    Get Test Data From Json    ${CURDIR}${/}test_data/${test_file_name}_test_data    ${client_data}
    Create ${num_air_segments} Test Dates
    Add Passenger Names
    Move Profile to GDS    RM*U25/-A:${udid25}    APE-${email}    RM*CN/-${consultant_num}    RM*CF/-${cfa}0000000C    RM*BOOK-YTOWL220N/TKT-YTOWL2106/CC-CA    ${tkt_line}    FP${form_of_payment}    RM*U50/-${udid50}
    Run Keyword If    "${num_air_segments}" != "0"    Book ${num_air_segments} Active Air Segments
    Run Keyword If    "${num_car_segments}" != "0"    Add ${num_car_segments} Car Segments
    Run Keyword If    "${num_htl_segments}" != 0    Add ${num_htl_segments} Passive Hotel Segments
    Run Keyword If    "${num_limo_segments}" != 0    Add ${num_limo_segments} Limo Segments
    Run Keyword If    "${other_rmk_1}" != "None"    Add Other Remarks
    Enter Cryptic Command    RT
    Handle Smart Tool PopUp
    Take Screenshot
    
Create PNR With Active Air Segments Less Than ${no_of_days} Days For ${client_data}
    Get Test Data From Json    ${CURDIR}${/}test_data/${test_file_name}_test_data    ${client_data}
    Add Passenger Names
    Move Profile to GDS    RM*U25/-A:${udid25}    APE-${email}    RM*CN/-${consultant_num}    RM*CF/-${cfa}0000000C    RM*BOOK-YTOWL220N/TKT-YTOWL2106/CC-CA    ${tkt_line}    FP${form_of_payment}    RM*U50/-${udid50}
    Run Keyword If    "${num_air_segments}" != "0"    Book ${num_air_segments} Active Air Segments Less Than ${no_of_days} Days
    Run Keyword If    "${num_car_segments}" != "0"    Add ${num_car_segments} Car Segments
    Run Keyword If    "${num_htl_segments}" != 0    Add ${num_htl_segments} Passive Hotel Segments
    Run Keyword If    "${num_limo_segments}" != 0    Add ${num_limo_segments} Limo Segments
    Run Keyword If    "${other_rmk_1}" != "None"    Add Other Remarks
    Enter Cryptic Command    RT
    Handle Smart Tool PopUp
    Take Screenshot
    
Create PNR For ${client_data}
    Get Test Data From Json    ${CURDIR}${/}test_data/${test_file_name}_test_data    ${client_data}
    Create ${num_air_segments} Test Dates
    Add Passenger Names
    Move Profile to GDS    RM*U25/-A:${udid25}    APE-${email}    RM*CN/-${consultant_num}    RM*CF/-${cfa}0000000C    RM*BOOK-YTOWL220N/TKT-YTOWL2106/CC-CA    ${tkt_line}    FPCASH    RM*U50/-${udid50}
    Run Keyword If    "${num_car_segments}" != "0"    Add ${num_car_segments} Car Segments
    Run Keyword If    "${num_htl_segments}" != 0    Add ${num_htl_segments} Passive Hotel Segments
    Run Keyword If    "${num_limo_segments}" != 0    Add ${num_limo_segments} Limo Segments
    Run Keyword If    "${other_rmk_1}" != "None"    Add Other Remarks
    Set Test Variable    ${final_destination}    YUL
    Handle Smart Tool PopUp
    Take Screenshot
    
Create PNR With Active Hotel Segments In ${city_code} For ${client_data}
    Get Test Data From Json    ${CURDIR}${/}test_data/${test_file_name}_test_data    ${client_data}
    Create ${num_air_segments} Test Dates
    Add Passenger Names
    Move Profile to GDS    RM*U25/-A:${udid25}    APE-${email}    RM*CN/-${consultant_num}    RM*CF/-${cfa}0000000C    RM*BOOK-YTOWL220N/TKT-YTOWL2106/CC-CA    ${tkt_line}    FPCASH    RM*U50/-${udid50}
    Run Keyword If    "${num_car_segments}" != "0"    Add ${num_car_segments} Car Segments
    Run Keyword If    "${num_htl_segments}" != 0    Add ${num_htl_segments} Active Hotel Segments In ${city_code}
    Run Keyword If    "${num_limo_segments}" != 0    Add ${num_limo_segments} Limo Segments
    Run Keyword If    "${other_rmk_1}" != "None"    Add Other Remarks
    Handle Smart Tool PopUp
    Take Screenshot

Create PNR With Active Car Segments For ${client_data}
    Get Test Data From Json    ${CURDIR}${/}test_data/${test_file_name}_test_data    ${client_data}
    Create ${num_air_segments} Test Dates
    Add Passenger Names
    Move Profile to GDS    RM*U25/-A:${udid25}    APE-${email}    RM*CN/-${consultant_num}    RM*CF/-${cfa}0000000C    RM*BOOK-YTOWL220N/TKT-YTOWL2106/CC-CA    ${tkt_line}    FPCASH    RM*U50/-${udid50}
    Run Keyword If    "${num_car_segments}" != "0"    Book ${num_car_segments} Active Car Segments
    Run Keyword If    "${other_rmk_1}" != "None"    Add Other Remarks
    Sleep     5
    Enter Cryptic Command    RT
    Take Screenshot

Enter Cryptic Command
    [Arguments]    ${gds_command}    ${sleep_amount}=0.1
    Input Text    ${input_commandText}     ${gds_command}
    Sleep    ${sleep_amount}
    Press Key    ${input_commandText}    \\13
    Wait Until Element Is Not Visible    ${icon_processing}    30

Book ${num_car_segments} Active Car Segments
    Create ${num_car_segments} Test Dates
    : FOR    ${i}    IN RANGE   1   int(${num_car_segments}+1)
    \    ${nxt}       Evaluate    ${i} + 1
    \    Enter Cryptic Command    CA${car_pickup_city${i}}${test_date_${i}}-${test_date_${nxt}}/ARR-0900-1800
    \    Enter Cryptic Command    CA${car_pickup_city${i}}${test_date_${i}}-${test_date_${nxt}}/ARR-0900-1800
    \    Enter Cryptic Command    CS1
    \    ${i}    Evaluate    ${i} + 1

Handle Smart Tool PopUp
    ${exists}    Run Keyword And Return Status    Wait Until Element Is Visible    ${button_closeSmartTool}    40
    Run Keyword If    ${exists}    Click Element    ${button_closeSmartTool} 
    
Book ${numberOfAir} Passive Air Segments
    Create ${numberOfAir} Test Dates
    : FOR    ${i}    IN RANGE   0   ${numberOfAir}
    \    ${i}    Evaluate    ${i} + 1
    \    Enter Cryptic Command    SS ${airline_code_${i}}1074 Y ${test_date_${i}} ${air_seg_route_${i}} GK1 / 11551440 / ABCDEFG
    \    ${final_destination}    Get Substring    ${air_seg_route_${i}}    3
    \    Set Test Variable    ${final_destination}

Book ${numberOfAir} Passive Air Segments That Departs And Arrives From 6:00PM-6:00AM
    Create ${numberOfAir} Test Dates
    : FOR    ${i}    IN RANGE   0   ${numberOfAir}
    \    ${i}    Evaluate    ${i} + 1
    \    Enter Cryptic Command    SS ${airline_code_${i}}1074 Y ${test_date_${i}} ${air_seg_route_${i}} GK1 / 02340436 / ABFGCDE
    \    ${final_destination}    Get Substring    ${air_seg_route_${i}}    3
    \    Set Test Variable    ${final_destination}
  
Book ${numberOfAir} Passive Air Segments That Departs From 6:00PM-6:00AM
    Create ${numberOfAir} Test Dates
    : FOR    ${i}    IN RANGE   0   ${numberOfAir}
    \    ${i}    Evaluate    ${i} + 1
    \    Enter Cryptic Command    SS ${airline_code_${i}}1074 Y ${test_date_${i}} ${air_seg_route_${i}} GK1 / 05590923 / EFGABCD
    \    ${final_destination}    Get Substring    ${air_seg_route_${i}}    3
    \    Set Test Variable    ${final_destination}
        
Book ${numberOfAir} Active Air Segments
    Create ${numberOfAir} Test Dates
    : FOR    ${i}    IN RANGE   0   ${numberOfAir}
    \    ${i}    Evaluate    ${i} + 1   
    \    Enter Cryptic Command    AN${test_date_${i}}${air_seg_route_${i}}/A${airline_code_${i}}    0.5
    \    Enter Cryptic Command    SS${passenger_no}${class_${i}}${seat_${i}}
    \    Run Keyword If    "${price_cmd_${i}}" != "None"    Enter Cryptic Command    ${price_cmd_${i}}
    \    ${final_destination}    Get Substring    ${air_seg_route_${i}}    3
    \    Set Test Variable    ${final_destination}
    # \    ${passenger_no}    
      
Book ${numberOfAir} Active Air Segments Less Than ${no_of_days} Days
    Create ${numberOfAir} Test Dates For Booking Less Than ${no_of_days} days
    : FOR    ${i}    IN RANGE   0   ${numberOfAir}
    \    ${i}    Evaluate    ${i} + 1   
    \    Enter Cryptic Command    AN${test_date_${i}}${air_seg_route_${i}}/A${airline_code_${i}}    0.5
    \    Enter Cryptic Command    SS1${class_${i}}${seat_${i}}
    \    Run Keyword If    "${price_cmd_${i}}" != "None"    Enter Cryptic Command    ${price_cmd_${i}}
    \    ${final_destination}    Get Substring    ${air_seg_route_${i}}    3
    \    Set Test Variable    ${final_destination}    
    
Add Other Remarks
    : FOR    ${i}    IN RANGE   0    99
    \    ${i}    Evaluate    ${i} + 1
    \    ${exists}     Run Keyword And Return Status      Should Not Be Empty    ${other_rmk_${i}}
    \    Run Keyword If    "${exists}" == "True" and "${other_rmk_${i}}" != "None"     Enter Cryptic Command    ${other_rmk_${i}}
    \    Exit For Loop If    "${exists}" == "False"

Create MIS Segment With ${mis_segment_type} 5 Months From Now
    Create 1 Test Dates For Booking Less Than 150 days
    Move Profile to GDS    RU1AHK1SAO${test_date_1}/TYP-CWT/${mis_segment_type}

Emulate To Leisure On Demand OID 
    Click Element    ${button_officeId}
    Wait Until Page Contains Element   ${popUp_oid}     20
    Scroll Element Into View    ${oid_YTOWL2101} 
    Wait Until Page Contains Element    ${oid_YTOWL2101}    20   
    Click Element    ${oid_YTOWL2101}
    Sleep    7
    Select Window  title=YTOWL2101 - Amadeus Selling Platform Connect  
    Wait Until Element Is Visible    ${tab_mainPage}    60
    Click Element    ${button_command_page}
    Wait Until Page Contains Element    ${input_commandText}    180
    Set Test Variable    ${current_page}    Amadeus

Get ${number_of_segment} Air Segments In The PNR
    Set Test Variable    ${number_of_segment}
    :FOR     ${i}    IN RANGE     0     ${number_of_segment}
    \    ${i}    Evaluate   ${i} + 1
    \    ${cur_seg}    Evaluate    ${i} + 1
    \    ${cur_seg}    Convert To String    ${cur_seg}
    \    Log    ${airline_code_${i}} HK1
    \    ${active_air}    Get Lines Containing String    ${pnr_details}    ${air_seg_route_${i}}
    \    ${active_air}    Fetch from Left   ${active_air}    HK1
    \    ${active_air}    Fetch from Right   ${active_air}    ${cur_seg}${SPACE}${SPACE}
    \    Set Test Variable    ${active_air_${i}}    ${active_air}     

Add Passive Car Segment On ${city_code} From ${pickup_date} To ${return_date}
    Move Profile to GDS    CU1AHK1${city_code}${pickup_date}-${return_date}PCAR/SUC-ET/SUN-ENTERPRISE/SD-10MAR/ST-1600/ED-15MAR/ET-1500/TTL-140.00USD/DUR-WEEKLY/MI-70KM FREE/CF-123336
    
Get Fare For ${no_of_tst} TST
    Switch To Graphic Mode
    Set Test Variable    ${tst_row_no}    0
    Set Test Variable    ${i}    0
    Wait Until Element Is Visible    ${tst_row}    60    
    :FOR    ${no_of_tst}    IN RANGE    0    ${no_of_tst}
    \    ${tst_row_no}    Evaluate    ${tst_row_no} + 3
    \    ${tst}   Get Text    ${tst_line}${open_bracket}${tst_row_no}${close_bracket}${tst_row}
    \    ${i}    Evaluate    ${i} + 1
    \    ${tst}    Fetch From Left    ${tst}    CAD
    \    ${tst}    Strip String    ${tst}
    \    Set Test Variable    ${tst_${i}}    ${tst} 
    Switch To Command Page

Cancel PNR
    Run Keyword If    "${current_page}" != "Amadeus"    Switch To Command Page
    Enter Cryptic Command    XI
    Enter Cryptic Command    RFCWTTEST
    Enter Cryptic Command    ER
    Enter Cryptic Command    ER
    Enter Cryptic Command    IG

Handle E-ticket Error
    Sleep   3
    Retrieve Current PNR 
    ${status}    Run Keyword And Return Status    Element Should Contain    ${text_area_command}    ETKT DISALLOWED
    Run keyword If    '${status}' == 'True'    Enter Cryptic Command     TTP/T${tst_no}

Add ${number_of_segments} Rail Segments With ${route} City Codes
    Create ${number_of_segments} Test Dates
    :FOR    ${i}    IN RANGE    0   ${number_of_segments}
    \    ${i}    Evaluate    ${i} + 1
    \    Run Keyword If    "${route}"== "Domestic"   Enter Cryptic Command    RU1AHK1YYZ${test_date_${i}}-/TYP-TRN/SUN-NS/SUC-ZZ/SC-KEL/SD-${test_date_${i}}/ST-1800/ED-${test_date_${i}}/ET-0800/CF-12345
    \    Run Keyword If    "${route}"== "Transborder"   Enter Cryptic Command    RU1AHK1ORD${test_date_${i}}-/TYP-TRN/SUN-NS/SUC-ZZ/SC-KEL/SD-${test_date_${i}}/ST-1800/ED-${test_date_${i}}/ET-0800/CF-12345
    \    Run Keyword If    "${route}"== "International"   Enter Cryptic Command    RU1AHK1LHR${test_date_${i}}-/TYP-TRN/SUN-NS/SUC-ZZ/SC-KEL/SD-${test_date_${i}}/ST-1800/ED-${test_date_${i}}/ET-0800/CF-12345
    Set Test Variable    ${final_destination}    ORD

Get Base Fare For ${no_of_tst} TST
    Switch To Graphic Mode
    Set Test Variable    ${i}    0
    :FOR    ${i}    IN RANGE    0    ${no_of_tst}
    \    ${i}    Evaluate    ${i} + 1
    \    Click Element    ${link_view_tst}${i}${link_view_tst_end}
    \    Wait Until Page Contains Element    ${popup_amadeus_tst}    30
    \    Wait Until Element Is Visible    ${input_base_fare}    30
    \    ${actual_tst_currency}    Get Value    ${input_tst_currency}
    \    ${actual_tst_fare}    Get Value    ${input_base_fare}
    \    Set Test Variable   ${actual_tst_currency_${i}}    ${actual_tst_currency}
    \    Set Test Variable   ${actual_tst_fare_${i}}    ${actual_tst_fare}
    \    Click Element    ${close_tst_window}
    \    Wait Until Page Contains Element    ${button_cryptic}    120
    \    Sleep    5
    Switch To Command Page
    
Add ${number_of_segments} Car Segments With Pick And Drop Off Days Apart
    Create ${number_of_segments} Test Dates
    :FOR    ${i}    IN RANGE    0   ${number_of_segments}
    \    ${i}    Evaluate    ${i} + 1
    Enter Cryptic Command    CU1AHK1ORD${test_date_${i}}-${car_drop_day_${i}}CCMR/SUC-EP/SUN-EUROPCAR/SD-${test_date_${i}}/ST-1700/ED-${car_drop_day_${i}}/ET-1700/TTL-100.00USD/DUR-DAILY/MI-50KM FREE/CF-TEST/P1    0.5       


