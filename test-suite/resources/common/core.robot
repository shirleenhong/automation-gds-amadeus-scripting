*** Settings ***
Resource          common_library.robot

*** Keywords ***
Add New Command Page
    #Open Command Page
    Click Element    css=#etoolbar_toolbarSection_newcommandpagebtn_id
    Wait Until Page Contains Element    css=.cmdPromptDiv > textArea    60

Close CA Migration Window
    #Close CA Migration Window
    [Arguments]    ${env}=Test
    Unselect Frame
    Wait Until Element Is Visible    xpath=//div[@class="xDialog_titleBar xDialog_std_titleBar"]//span[contains(text(), 'CA Migration ${env})]    50
    Click Element    xpath=.//div[@class="xDialog_titleBar xDialog_std_titleBar"][@atdraggable='2']//span[2]//span

Close Cryptic Display Window
    Click Element    css=#elgen-19

Enter Dutycode
    [Arguments]    ${dutycode}
    Input Text    css=#dutyCode input    ${dutycode}

Enter GDS Command
    [Arguments]    @{gds_commands}
    #Wait For Page to Load before sending commands
    Wait Until Element Is Visible    //span[contains(@class, 'title cryptic')]    60
    : FOR    ${gds_command}    IN    @{gds_commands}
    \    Input Text    css=.cmdPromptDiv > textArea    ${gds_command}
    \    Press Key    css=.cmdPromptDiv > textArea    \\13

Enter Office ID
    [Arguments]    ${office_id}
    Input Text    css=#officeId input    ${office_id}

Enter Password
    [Arguments]    ${password}
    Input Text    css=#password input    ${password}

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
    [Arguments]    ${env}=Test
    Wait Until Element Is Visible    css=#emenu_menuSection_desktop_menu_data_idscript    30
    Click Element    css=#emenu_menuSection_desktop_menu_data_idscript
    #Open and verify CA Migration window
    #env is passed as a param in the robot run command, can be Local/Dev/Test/UAT
    Click Element    xpath=//li[@id="emenu_menuSection_desktop_menu_data_id_SMART_TOOL_CA Migration ${env}"]
    Wait Until Element Is Visible    xpath=//div[@class="xDialog_titleBar xDialog_std_titleBar"]//span[contains(text(), 'CA Migration ${env}')]    60
    Wait Until Element Is Visible    xpath=//iframe[contains(@src,'https://${env}.int.us-west-2.bpg-aws-cwt.com')]    60
    Select Frame    xpath=//iframe[contains(@src,'https://${env}.int.us-west-2.bpg-aws-cwt.com')]
    Wait Until Page Contains Element    xpath=//button[contains(text(), 'Submit To PNR')]    180

Open Cryptic Display Window
    #Open Cryptic Display window from Graphic Mode
    Wait Until Element Is Enabled    css=#tpl1_FS
    Press Key    xpath=//button[contains(@id, 'crypticDisplay')]    \\32
    Wait Until Element Is Visible    css=#epnrRetrieves1_crypticText    30

Retrieve PNR In Command Page
    [Arguments]    ${current_pnr}
    Input Text    css=.cmdPromptDiv > textArea    IG
    Press Key    css=.cmdPromptDiv > textArea    \\13
    Input Text    css=.cmdPromptDiv > textArea    RT${current_pnr}
    Press Key    css=.cmdPromptDiv > textArea    \\13
    Wait Until Element Contains    css=#cryptics1_cmd_shellbridge_shellWindow_top_left_modeString_currentCommand    TST    30

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
