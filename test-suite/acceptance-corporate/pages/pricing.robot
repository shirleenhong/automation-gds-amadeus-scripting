*** Settings ***
Library           String
Library           SeleniumLibrary
Library           Collections
Library           Screenshot
Resource          base.robot

*** Variables ***
${panel_pricing}    //div[@class='panel-title']//div[contains(text(), 'Pricing')]
${tab_airfareCommission}    //span[contains(text(), 'Airline Commission')]
${div_segment_line}     //div[@formarrayname='airFares'][
${checkbox_segment}    ]//input[@name='chkIncluded']
${input_segment}    ]//input[@formcontrolname='segments']
${input_commission}    ]//input[@formcontrolname='commission']
${list_commissionType}    ]//select[@id='commissionType']

*** Keywords ***
Click Pricing Panel
    Wait Until Element Is Visible    ${panel_pricing}    30
    Click Element    ${panel_pricing}
    Set Test Variable    ${current_page}    Pricing
    
Click Airfare Commission Tab
    Wait Until Element Is Visible    ${tab_airfareCommission}    30
    Click Element    ${tab_airfareCommission}
    Set Test Variable    ${current_page}    Airfare Commission
    
Update Airfare Commision With ${value} ${type} For Segment ${segment_num}
    Navigate To Page Airfare Commission
    : FOR    ${i}     IN RANGE    1    9
    \    ${exists}    Run Keyword And Return Status     Element Should Be Visible     ${div_segment_line}${i}${input_segment}
    \    Exit For Loop If    not ${exists}
    \    ${current_seg}    Run Keyword If    ${exists}    Get Value     ${div_segment_line}${i}${input_segment}
    \    ${matches}    Run Keyword And Return Status     Should Match    ${current_seg}     ${segment_num}
    \    Run Keyword If     ${matches}    Click Element    ${div_segment_line}${i}${checkbox_segment}
    \    Run Keyword If     ${matches}    Enter Value    ${div_segment_line}${i}${input_commission}     ${value}
    \    Run Keyword If     ${matches}    Select From List By Value     ${div_segment_line}${i}${list_commissionType}     ${type}
    Take Screenshot
    