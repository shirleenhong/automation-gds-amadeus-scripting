*** Settings ***
Resource          common_library.robot

*** Keywords ***
Add New Command Page
    Click Element    css=#etoolbar_toolbarSection_newcommandpagebtn_id
    Wait Until Page Contains Element    css=.cmdPromptDiv > textArea    180

Close CA Migration Window
    Wait Until Element Is Not Visible    xpath=//div[@class='uicLoaderOverlay uicLo-loading']    60
    Unselect Frame
    Wait Until Element Is Visible    xpath=//div[@class="xDialog_titleBar xDialog_std_titleBar"]//span[contains(text(), 'CWT Canada')]    50
    Sleep    5
    Wait Until Element Is Not Visible    xpath=//div[@class='uicLoaderOverlay uicLo-loading']    60
    Click Element    xpath=//div[@class="xDialog_titleBar xDialog_std_titleBar"]//span[contains(text(), 'CWT Canada')]/following-sibling::span//span[@class='xWidget xICNstd']

Close Cryptic Display Window
    Click Element    css=#elgen-19

Enter Dutycode
    [Arguments]    ${dutycode}
    Input Text    css=#dutyCode input    ${dutycode}

Enter GDS Command
    [Arguments]    @{gds_commands}
    Wait Until Element Is Visible    //span[contains(@class, 'title cryptic')]    180
    : FOR    ${gds_command}    IN    @{gds_commands}
    \    Input Text    css=.cmdPromptDiv > textArea    ${gds_command}
    \    Press Key    css=.cmdPromptDiv > textArea    \\13
    \    Wait Until Element Is Not Visible    //div[@class='processing']    30

Enter Office ID
    [Arguments]    ${office_id}
    Input Text    css=#officeId input    ${office_id}

Enter Password
    [Arguments]    ${password}
    Input Password    css=#password input    ${password}

Enter Username
    [Arguments]    ${username}
    Input Text    css=#username > span:first-child input    ${username}

Handle Accept Cookie Panel
    ${is_force_sigin}    Run Keyword And Return Status    Wait Until Element Is Visible    css=div.accept    30
    Run Keyword If    ${is_force_sigin}    Click Element    css=div.accept

Handle Force Login Window
    ${is_force_sigin}    Run Keyword And Return Status    Wait Until Element Is Visible    xpath=//span[contains(text(),'Force Sign In')]    15
    Run Keyword If    ${is_force_sigin}    Click Element    xpath=//span[contains(text(),'Force Sign In')]

Open CA Migration Window
    Handle Smart Tool PopUp
    Wait Until Element Is Visible    css=#emenu_menuSection_desktop_menu_data_idscript    30
    Click Element    css=#emenu_menuSection_desktop_menu_data_idscript
    Click Element    //li[@id="emenu_menuSection_desktop_menu_data_id_SMART_TOOL_CWT Canada Leisure ${env}"]
    Wait Until Element Is Visible    xpath=//div[@class="xDialog_titleBar xDialog_std_titleBar"]//span[contains(text(), 'CWT Canada Leisure ${env}')]    60
    Wait Until Element Is Visible    xpath=//iframe[contains(@src,'/portal/gds-scripting-amadeus')]    60
    Select Frame    xpath=//iframe[contains(@src,'/portal/gds-scripting-amadeus')]
    Sleep    5
    Import Library    AngularJSLibrary    app-root
    Wait For Script To Complete

Open Cryptic Display Window
    Wait Until Element Is Enabled    css=.bookingTool.FS    30
    Wait Until Element Is Visible    xpath=//button[contains(@id, 'crypticDisplay')]    30
    Sleep    5
    Press Key    xpath=//button[contains(@id, 'crypticDisplay')]    \\32
    Wait Until Page Contains Element    xpath=//div[@class='crypticPanel'][contains(@id,'epnrRetrieves')]    30
    Sleep    10
    [Teardown]    Take Screenshot

Switch To Command Page
    Wait Until Page Contains Element    css=.showInCommandPage    60
    Click Element    css=.showInCommandPage
    Wait Until Element Is Visible    css=.cmdPromptDiv > textArea    60
    [Teardown]    Take Screenshot

Switch To Graphic Mode
    Wait Until Element Is Visible    css=.showInGraphicMode    30
    Click Element    css=.showInGraphicMode
    Wait Until Page Contains Element    xpath=//span[contains(text(), 'Cryptic Display')]    60
    [Teardown]    Take Screenshot

Login To Amadeus Sell Connect
    Open Browser    https://acceptance.sellingplatformconnect.amadeus.com/LoginService/login.jsp?SITE=LOGINURL&LANGUAGE=GB    gc
    Maximize Browser Window
    Wait Until Element Is Visible    css=#username > span:first-child input    60
    Enter Username    ${username}
    Enter Dutycode    GS
    Enter Office ID    YTOWL2107
    Enter Password    ${password}
    Wait Until Element Is Not Visible    css=#logi_confirmButton .xButtonDisabled    30
    Click Element    css=#logi_confirmButton .xButton
    Handle Force Login Window
    Wait Until Element Is Visible    css=.uicTaskbarText    60
    Handle Accept Cookie Panel
    Add New Command Page

Logout To Amadeus Sell Connect
    Comment    User Sign Out
    Click Element    css=#eusermanagement_logout_logo_logout_id
    Wait Until Element Is Visible    xpath=//div[contains(text(),'Sign out')]    30
    Click Element    css=#uicAlertBox_ok > span.uicButtonBd
    Wait Until Element Is Visible    css=#username > span:first-child input    30

Login to Amadeus Production
    Open Browser    https://1a.sellingplatformconnect.amadeus.com/LoginService/login.jsp?SITE=LOGINURL&LANGUAGE=GB    gc
    Maximize Browser Window
    Wait Until Element Is Visible    css=#username > span:first-child input    60
    Enter Username    ${username}
    Enter Dutycode    GS
    Enter Office ID    YTOWL2107
    Enter Password    ${password}
    Wait Until Element Is Not Visible    css=#logi_confirmButton .xButtonDisabled    30
    Click Element    css=#logi_confirmButton .xButton
    Handle Force Login Window
    Wait Until Element Is Visible    css=.uicTaskbarText    30
    Handle Accept Cookie Panel
    Add New Command Page

Open CA Migration Prod
    Wait Until Element Is Visible    css=#emenu_menuSection_desktop_menu_data_idscript    30
    Click Element    css=#emenu_menuSection_desktop_menu_data_idscript
    Click Element    xpath=//li[@id="emenu_menuSection_desktop_menu_data_id_SMART_TOOL_CWT Canada Leisure"]
    Wait Until Element Is Visible    xpath=//div[@class="xDialog_titleBar xDialog_std_titleBar"]//span[contains(text(), 'CWT Canada Leisure')]    60
    Wait Until Element Is Visible    xpath=//iframe[contains(@src,'/portal/gds-scripting-amadeus')]    60
    Select Frame    xpath=//iframe[contains(@src,'/portal/gds-scripting-amadeus')]
    Sleep    5

Close CA Migration Prod
    Unselect Frame
    Sleep    5
    Wait Until Element Is Visible    xpath=//div[@class="xDialog_titleBar xDialog_std_titleBar"]//span[contains(text(), 'CWT Canada')]    50
    Click Element    xpath=//div[@class="xDialog_titleBar xDialog_std_titleBar"]//span[contains(text(), 'CWT Canada')]/following-sibling::span//span[@class='xWidget xICNstd']

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

Convert Month To MMM
    [Arguments]    ${date}
    ${month}    Convert Date    ${date}    %m
    ${month}    Run Keyword If    "${month}" == "01"    Set Variable    JAN
    ...    ELSE IF    "${month}" == "02"    Set Variable    FEB
    ...    ELSE IF    "${month}" == "03"    Set Variable    MAR
    ...    ELSE IF    "${month}" == "04"    Set Variable    APR
    ...    ELSE IF    "${month}" == "05"    Set Variable    MAY
    ...    ELSE IF    "${month}" == "06"    Set Variable    JUN
    ...    ELSE IF    "${month}" == "07"    Set Variable    JUL
    ...    ELSE IF    "${month}" == "08"    Set Variable    AUG
    ...    ELSE IF    "${month}" == "09"    Set Variable    SEP
    ...    ELSE IF    "${month}" == "10"    Set Variable    OCT
    ...    ELSE IF    "${month}" == "11"    Set Variable    NOV
    ...    ELSE IF    "${month}" == "12"    Set Variable    DEC
    Log    ${month}
    [Return]    ${month}

Ticket TST${tst_no}
    Enter GDS Command    RFCWTTEST
    Enter GDS Command    ER
    Sleep    4
    Get Record Locator Value
    Enter GDS Command    TTP/T${tst_no}
    Sleep    8
    Enter GDS Command    RT${actual_record_locator}
    Set Test Variable    ${ticketed_tst}    ${tst_no}

Get Record Locator Value
    Switch To Graphic Mode
    Wait Until Element Is Visible    xpath=//div[contains(text(), 'Record Locator')]    30
    ${actual_record_locator}    Get Text    xpath=//div[contains(text(), 'Record Locator')]
    ${actual_record_locator}    Fetch From Right    ${actual_record_locator}    :${SPACE}
    Set Test Variable    ${actual_record_locator}
    Log    ${actual_record_locator}
    Switch To Command Page

Get PNR Details
    Wait Until Element Is Not Visible    //div[@class='uicLoaderOverlay uicLo-loading']    10
    Wait Until Element Is Enabled    css=.bookingTool.FS    30
    Wait Until Element Is Visible    //button[contains(@id, 'crypticDisplay')]    60
    Sleep    2
    Press Keys    //button[contains(@id, 'crypticDisplay')]    \\32
    Wait Until Page Contains Element    //div[@class='crypticPanel'][contains(@id,'epnrRetrieves')]    60
    Wait Until Element Is Not Visible    //div[@class='uicLoaderOverlay uicLo-loading']    10
    Sleep    1
    ${pnr_details}    Get Text    //div[@class='crypticPanel'][contains(@id,'epnrRetrieves')]
    Log    ${pnr_details}
    Set Test Variable    ${pnr_details}    ${pnr_details}
    Close Cryptic Display
    [Teardown]    Take Screenshot

Handle Smart Tool PopUp
    ${exists}    Run Keyword And Return Status    Wait Until Element Is Visible    //div[contains(@class,'std_titleBar')]//span[@class='xWidget xICNstd']    20
    Run Keyword If    ${exists}    Click Element    //div[contains(@class,'std_titleBar')]//span[@class='xWidget xICNstd']

Wait For Script To Complete
    Wait For Angular
    Set Ignore Implicit Angular Wait    ${True}
