*** Settings ***
Library           String
Library           SeleniumLibrary
Library           Collections
Library           Screenshot
Resource          base.robot
Resource          amadeus.robot

*** Variables ***
${tab_documentPnr}    css=#documentPnrTab-link
${row_documentPNR}    //div[@formarrayname='items']
${add_button}    //i[@class='fas fa-plus-circle iconPlus']
${input_document}    //input[@formcontrolname='documentation']

*** Keywords ***
Click Document PNR Tab
    Wait Until Element Is Visible    ${tab_documentPnr}    30
    Click Element    ${tab_documentPnr}
    Set Test Variable    ${current_page}    Document PNR
    
Populate Document PNR 
    Enter Value    ${row_documentPNR}[1]${input_document}    Testing Document PNR Remark

Click Add Remark Button ${button_no}
    Click Element   //div[@formarrayname='items'][${button_no}]//i[@class='fas fa-plus-circle iconPlus']
    
Populate Multiple Document PNR
    [Arguments]    @{document_values}
    Set Test Variable   ${document_index}    0
    : FOR    ${document_values}    IN    @{document_values}
    \    ${document_index}    Evaluate    ${document_index} + 1
    \    Enter Value    ${row_documentPNR}[${document_index}]${input_document}    ${document_values}  
    \    Click Add Remark Button ${document_index}
    \    Set Test Variable   ${document_index}
    \    Run Keyword If   "${document_index}" == "4"    Exit For Loop
    Take Screenshot
    
Verify That Multiple Document PNR Can Be Added
    Navigate To Page Document PNR
    Populate Multiple Document PNR    Document Testing 1    Document Testing 2    Document Testing 3    Document Testing 4

Verify That Single Document PNR Can Be Added
    Navigate To Page Document PNR
    Enter Value    ${row_documentPNR}[1]${input_document}    Testing Document PNR Remark
    
    
    