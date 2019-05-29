*** Settings ***
Resource          common_library.robot

*** Keywords ***
Click Panel
    [Arguments]    ${panel_name}
    Wait Until Element Is Visible    xpath=//div[@class='panel-title']//div[contains(text(), '${panel_name}')]    60
    Click Element    xpath=//div[@class='panel-title']//div[contains(text(), '${panel_name}')]
    [Teardown]    Take Screenshot

Click Submit To PNR
    Wait Until Element Is Visible    xpath=//button[contains(text(), 'SUBMIT TO PNR')]    30
    #placeholder
    Sleep    5
    Click Element    xpath=//button[contains(text(), 'SUBMIT TO PNR')]
    Sleep    10

Enter Company Name
    [Arguments]    ${company_name}
    #add company name
    Wait Until Element Is Visible    css=#companyName    30
    Input Text    css=#companyName    ${company_name}

Select Cancellation Insurance Declined
    [Arguments]    ${declined_reason}
    #select Decline insurance
    Wait Until Element Is Visible    xpath=//div[@class='row form-group'][3]//input[@name='showInsurance']    30
    Click Element    xpath=//div[@class='row form-group'][3]//input[@name='showInsurance']
    #type reason decline
    Input Text    css=#insuranceDeclinedReason    ${declined_reason}

Select If PNR Travel to Any Countries Listed
    [Arguments]    ${countries_listed}
    Select From List    css=#u86    ${countries_listed}

Click Load PNR
    Click Element    xpath=//button[contains(text(), 'Load PNR')]
    Wait Until Element Is Visible    xpath=//button[contains(text(), 'SUBMIT TO PNR')]    30

Click Cancel Segment
    Click Element    xpath=//button[contains(text(), 'Cancel Segments')]
    Wait Until Element Is Visible    xpath=//button[contains(text(), 'Back To Main Menu')]    30

Confirm Delete
    Focus    xpath=//div[@class='modal-footer']//button[contains(text(),'Yes')]
    Click Button    xpath=//div[@class='modal-footer']//button[contains(text(),'Yes')]
    Wait Until Element Is Visible    xpath=//button[contains(text(), 'SUBMIT TO PNR')]    30
    Focus    xpath=//button[contains(text(), 'SUBMIT TO PNR')]
    Take Screenshot

Click Add Segment Main Menu
    Click Element    xpath=//button[contains(text(), 'Add Segment')]
    Wait Until Element Is Visible    xpath=//button[contains(text(), 'Back To Main Menu')]    30

Click Back To Main Menu
    Click Element    xpath=//button[contains(text(),'Back To Main Menu')]
    Wait Until Page Contains Element    xpath=//button[contains(text(), 'Load PNR')]    30
