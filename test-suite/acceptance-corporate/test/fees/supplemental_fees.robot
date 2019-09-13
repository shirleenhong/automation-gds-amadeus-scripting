*** Settings ***
Force Tags        corp
Library           String
Library           SeleniumLibrary
Library           Collections
Library           Screenshot
Resource          ../../pages/amadeus.robot
Resource          ../../pages/base.robot
Resource          ../../pages/payment.robot
Resource          ../../pages/reporting.robot
Resource          ../../pages/fees.robot

*** Test Cases ***
Test
    Login To Amadeus Sell Connect Acceptance
    Sleep    5
    Retrieve PNR
    Wait Until Element Is Visible    ${menu_amadeus}    30
    Click Element    ${menu_amadeus}
    Click Element    //li[@id="emenu_menuSection_desktop_menu_data_id_SMART_TOOL_CWT Corp Dev"]
    Wait Until Element Is Visible    //div[@class="xDialog_titleBar xDialog_std_titleBar"]//span[contains(text(), 'CWT Corp Dev')]    60
    Wait Until Element Is Visible    //iframe[contains(@src,'/portal/gds-scripting-amadeus')]    60
    Select Frame    //iframe[contains(@src,'/portal/gds-scripting-amadeus')]
    Click Full Wrap
    Click Fees Panel
    Verify Default Single Ticket Segments