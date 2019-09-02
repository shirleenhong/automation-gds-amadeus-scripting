*** Settings ***
Library           String
Library           SeleniumLibrary
Library           Collections
Library           Screenshot
Resource          amadeus.robot

*** Variables ***
${button_sign_out}    css=#uicAlertBox_ok > span.uicButtonBd
${button_close}    //span[@class='xDialog_close xDialog_std_close']
${button_full_wrap}    //button[contains(text(), 'Full Wrap PNR')]
${button_submit_pnr}    //button[contains(text(), 'SUBMIT TO PNR')]
${panel_reporting}    //div[@class='panel-title']//div[contains(text(), 'Reporting')]
${panel_payment}    //div[@class='panel-title']//div[contains(text(), 'Payment')]
${message_updatingPnr}    //div[contains(text(), 'Updating PNR')]
${message_loadingPnr}    //div[contains(text(), 'Loading PNR')]

*** Keywords ***
Enter Value 
    [Arguments]    ${element}    ${value}
    Double Click Element    ${element}
    Press Key    ${element}    \\08
    Input Text    ${element}    ${value}
    Press Key    ${element}    \\09
    
Close CA Corporate Test
    Unselect Frame
    Wait Until Element Is Visible    ${header_corp_test}    50
    Click Element    ${button_close}
    Wait Until Element Is Visible    ${input_commandText}    30

Click Full Wrap 
    Wait Until Page Contains Element    ${button_full_wrap}    180
    Sleep    5
    Click Element    ${button_full_wrap}
    Wait Until Element Is Visible    ${button_submit_pnr}    30

Click Reporting Panel
    Wait Until Element Is Visible    ${panel_reporting}    60
    Click Element    ${panel_reporting}
    [Teardown]    Take Screenshot
    
Click Payment Panel
    Wait Until Element Is Visible    ${panel_payment}    60
    Click Element    ${panel_payment}
    [Teardown]    Take Screenshot

Click Submit To PNR
     [Arguments]    ${close_corporate_test}=yes
    Wait Until Page Contains Element    ${button_submit_pnr}    30
    Wait Until Element Is Not Visible     ${message_updatingPnr}    180
    Wait Until Element Is Visible    ${button_full_wrap}    180
    Run Keyword If     "${close_corporate_test}" == "yes"     Close CA Corporate Test
