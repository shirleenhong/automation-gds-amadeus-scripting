*** Settings ***
Library           String
Library           SeleniumLibrary
Library           Collections
Library           Screenshot
Resource          amadeus.robot
Resource          payment.robot

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
    Wait Until Page Contains Element   ${button_full_wrap}    180 
    Click Element    ${button_full_wrap}
    Wait Until Element Is Visible    ${message_loadingPnr}    180
    Wait Until Page Does Not Contain Element    ${message_loadingPnr}    180
    Wait Until Element Is Visible    ${button_submit_pnr}    30
    Set Test Variable    ${current_page}    Full Wrap PNR

Click Reporting Panel
    Wait Until Element Is Visible    ${panel_reporting}    60
    Click Element    ${panel_reporting}
    
Click Payment Panel
    Wait Until Element Is Visible    ${panel_payment}    60
    Click Element    ${panel_payment}
    Set Test Variable    ${current_page}    Payment
    [Teardown]    Take Screenshot

Click Submit To PNR
    [Arguments]    ${close_corporate_test}=yes
    Wait Until Page Contains Element    ${button_submit_pnr}    30
    Click Element    ${button_submit_pnr}    
    Wait Until Element Is Not Visible     ${message_updatingPnr}    180
    Wait Until Element Is Visible    ${button_full_wrap}    180
    Run Keyword If     "${close_corporate_test}" == "yes"     Close CA Corporate Test
    Set Test Variable    ${pnr_submitted}    yes

Click Back To Main Menu
    Wait Until Element Is Visible    ${button_main_menu}
    Click Element    ${button_main_menu}
    Set Test Variable    ${current_page}    CWT Corporate
   
Assign Current Date
    ${current_date}    Get Current Date
    ${day}     Convert Date     ${current_date}    %d
    ${month}     Convert Month To MMM    ${current_date}
    Set Test Variable    ${current_date}   ${day}${month}
    Log    ${current_date} 

Convert Month To MMM
    [Arguments]     ${date}
    ${month}    Convert Date    ${date}    %m
    ${month}    Run Keyword If     "${month}" == "01"     Set Variable    JAN    ELSE IF    "${month}" == "02"    Set Variable    FEB     
    ...    ELSE IF    "${month}" == "03"    Set Variable    MAR     ELSE IF    "${month}" == "04"    Set Variable    APR     
    ...    ELSE IF    "${month}" == "05"    Set Variable    MAY     ELSE IF    "${month}" == "06"    Set Variable    JUN
    ...    ELSE IF    "${month}" == "07"    Set Variable    JUL     ELSE IF    "${month}" == "08"    Set Variable    AUG     
    ...    ELSE IF    "${month}" == "09"    Set Variable    SEP     ELSE IF    "${month}" == "10"    Set Variable    OCT
    ...    ELSE IF    "${month}" == "11"    Set Variable    NOV     ELSE IF    "${month}" == "12"    Set Variable    DEC
    Log    ${month}
    [Return]     ${month}

Navigate to Page ${destination_page}
     Set Test Variable    ${i}     1
     : FOR     ${i}    IN    10
     \    ${i}    Evaluate    ${i} + 1
     \    Run Keyword If    "${current_page}" == "Amadeus"     Open CA Corporate Test
     \    Run Keyword If    "${current_page}" == "CWT Corporate"     Navigate From Corp    ${destination_page}
     \    Run Keyword If    "${current_page}" == "Full Wrap PNR"    Navigate From Full Wrap    ${destination_page}
     \    Run Keyword If    "${current_page}" == "Payment"    Navigate From Payment    ${destination_page}
     \    Exit For Loop If    "${current_page}" == "${destination_page}" 
     Log    ${current_page}
     Log    ${destination_page}   

Navigate From Corp
     [Arguments]    ${destination_page}
     Run Keyword If    "${destination_page}" == "Full Wrap PNR" or "${destination_page}" == "Payment" or "${destination_page}" == "Non BSP Processing" or "${destination_page}" == "Add Accounting Line" or "${destination_page}" == "Reporting"
     ...    Click Full Wrap
     ...    ELSE    Close CA Corporate Test
    
Navigate From Full Wrap
    [Arguments]    ${destination_page}
    Run Keyword If    "${destination_page}" == "Payment" or "${destination_page}" == "Non BSP Processing" or "${destination_page}" == "Add Accounting Line"    Click Payment Panel
    ...    ELSE IF    "${destination_page}" == "Reporting"     Click Reporting Panel
    ...    ELSE   Click Back To Main Menu

Navigate From Payment
    [Arguments]    ${destination_page}
    Run Keyword If    "${destination_page}" == "Add Accounting Line"    Navigate To Add Accounting Line
    
Finish PNR
    Run Keyword If    "${pnr_submitted}" == "no"    Submit To PNR
    Run Keyword If    "${pnr_details}" == "${EMPTY}"    Run Keywords        Switch To Graphic Mode    Get PNR Details
    
Submit To PNR
    [Arguments]    ${close_corporate_test}=yes    
    Run Keyword If    "${current_page}" == "Add Accounting Line"    Click Save Button    
    ...    ELSE IF    "${current_page}" == "Payment" or "${current_page}" == "Reporting" or "${current_page}" == "Full Wrap PNR"    Click Submit To PNR    ${close_corporate_test}