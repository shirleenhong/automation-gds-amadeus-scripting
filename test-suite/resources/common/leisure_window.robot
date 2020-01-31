*** Settings ***
Resource          common_library.robot

*** Keywords ***
Click Panel
    [Arguments]    ${panel_name}
    Wait Until Element Is Visible    xpath=//div[@class='panel-title']//div[contains(text(), '${panel_name}')]    60
    Run Keyword If    '${panel_name}' == 'Reporting'    Scroll Element Into View    xpath=//div[@class='panel-title']//div[contains(text(), 'Payment')]
    ...    ELSE    Scroll Element Into View    xpath=//div[@class='panel-title']//div[contains(text(), '${panel_name}')]
    Click Element    xpath=//div[@class='panel-title']//div[contains(text(), '${panel_name}')]
    [Teardown]    Take Screenshot

Click Submit To PNR
    Scroll Element Into View    xpath=//button[contains(text(), 'SUBMIT TO PNR')]
    # Wait Until Element Is Visible    xpath=//button[contains(text(), 'SUBMIT TO PNR')]    60
    Sleep    5
    Click Element    xpath=//button[contains(text(), 'SUBMIT TO PNR')]
    Wait Until Element Is Not Visible     xpath=//div[contains(text(), 'Updating PNR')]    180
    Wait Until Element Is Visible    xpath=//button[contains(text(), 'Wrap PNR')]    180
    Wait For Script To Complete

Enter Company Name
    [Arguments]    ${company_name}
    Wait Until Element Is Visible    css=#companyName    30
    Input Text    css=#companyName    ${company_name}

Click Wrap PNR
    Wait Until Element Is Visible    xpath=//button[contains(text(), 'Wrap PNR')]    30
    Wait For Script To Complete
    Click Element    xpath=//button[contains(text(), 'Wrap PNR')]
    Wait Until Element Is Visible    xpath=//button[contains(text(), 'SUBMIT TO PNR')]    30

Click Cancel Segment
    Wait Until Element Is Visible    xpath=//button[contains(text(), 'Cancel Segments')]    30
    Wait For Script To Complete
    Click Element    xpath=//button[contains(text(), 'Cancel Segments')]
    Wait Until Element Is Visible    xpath=//button[contains(text(), 'Back To Main Menu')]    30

Click Re-Send Invoice And Itinerary
    Sleep    5
    Click Element    xpath=//button[contains(text(), 'Cancel Segments')]
    Wait Until Element Is Visible    xpath=//button[contains(text(), ' Re-send Invoice/Itinerary ')]    30

Confirm Delete
    Set Focus To Element    xpath=//div[@class='modal-footer']//button[contains(text(),'Yes')]
    Click Button    xpath=//div[@class='modal-footer']//button[contains(text(),'Yes')]
    Wait Until Element Is Visible    xpath=//button[contains(text(), 'SUBMIT TO PNR')]    30
    Set Focus To Element    xpath=//button[contains(text(), 'SUBMIT TO PNR')]
    Sleep    3
    Take Screenshot

Click Add Segment Main Menu
    Wait Until Element Is Visible    xpath=//button[contains(text(), 'Add Segment')]    30
    Wait For Script To Complete
    Click Element    xpath=//button[contains(text(), 'Add Segment')]
    Wait Until Element Is Visible    xpath=//button[contains(text(), 'Back To Main Menu')]    30

Click Back To Main Menu
    Click Element    xpath=//button[contains(text(),'Back To Main Menu')]
    Wait Until Page Contains Element    xpath=//button[contains(text(), 'Wrap PNR')]    30

Click Itinerary And Queue
    Wait Until Element Is Visible    xpath=//button[contains(text(), 'Itinerary and Queue')]    60
    Sleep    5
    Click Element    xpath=//button[contains(text(), 'Itinerary and Queue')]
    Wait Until Element Is Visible    xpath=//button[contains(text(), ' Send Itinerary and Queue')]    30

Click Send Itinerary And Queue
    Click Element    xpath=//button[contains(text(), ' Send Itinerary and Queue')]
    Sleep    10
