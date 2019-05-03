*** Settings ***
Resource          common_library.robot

*** Keywords ***
Click Panel
    [Arguments]    ${panel_name}
    Click Element    xpath=//div[contains(text(), '${panel_name}')]

Click Submit To PNR
    Wait Until Element Is Visible    xpath=//button[contains(text(), 'Submit To PNR')]    30
    Click Element    xpath=//button[contains(text(), 'Submit To PNR')]

Add Passive Segment
    [Arguments]    ${supplier_name}    ${departure}    ${arrival}
    Click Element    xpath=//button[contains(text(), 'Add Tour Segment')]
    Input Text    css=#suppliername    ${supplier_name}
    Input Text    css=#from    ${departure}
    Input Text    css=#to    ${arrival}
    Click Element    xpath=//button[contains(text(), 'Save')]
    Wait Until Page Does Not Contain    xpath=//button[contains(text(), 'Save')]    30
    Wait Until Page Contains Element    xpath=//td[contains(text(), '${supplier_name}')]    30

Select Routing Code
    [Arguments]    ${routecode}
    #Select BSP Routing Code    Select BSP Routing Code
    Wait Until Element Is Visible    css=#bspRouteCode
    Select From List    css=#bspRouteCode    ${routecode}
    Take Screenshot
