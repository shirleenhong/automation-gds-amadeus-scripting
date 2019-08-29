*** Settings ***
Library           String
Library           SeleniumLibrary
Library           Collections
Library           Screenshot
Resource          ../../acceptance-corporate/pages/amadeus.robot

*** Variables ***
${button_sign_out}    css=#uicAlertBox_ok > span.uicButtonBd
${button_close}    //span[@class='xDialog_close xDialog_std_close']
${button_full_wrap}    //button[contains(text(), 'Full Wrap PNR')]
${button_submit_pnr}    //button[contains(text(), 'SUBMIT TO PNR')]
${panel_reporting}    //div[@class='panel-title']//div[contains(text(), 'Reporting')]
${panel_payment}    xpath=//div[@class='panel-title']//div[contains(text(), 'Payment')]

*** Keywords ***
Close CA Corporate Test
    Unselect Frame
    Wait Until Element Is Visible    ${header_corp_test}    50
    Click Element    ${button_close}

Click Full Wrap
    Sleep    5    
    Click Element    ${button_full_wrap}
    Wait Until Element Is Visible    ${button_submit_pnr}    30

Click Reporting Panel
    Wait Until Element Is Visible    ${panel_reporting}    60
    Click Element    ${panel_reporting}
    [Teardown]    Take Screenshot

Click Submit To PNR
    Wait Until Element Is Visible    ${button_submit_pnr}    30
    Click Element    ${button_submit_pnr}

Click Payment Panel
    Wait Until Element Is Visible    ${panel_payment}    60
    Click Element    ${panel_payment}
    [Teardown]    Take Screenshot