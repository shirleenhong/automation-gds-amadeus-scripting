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
Populate Document PNR 
    Enter Value    ${row_documentPNR}[1]${input_document}    Testing Document PNR Remark

Click Add Remark Button
    Click Element   //div[@formarrayname='items'][1]//i[@class='fas fa-plus-circle iconPlus']
    
Populate Multiple Document PNR
    Enter Value    ${row_documentPNR}[1]${input_document}    Testing Document PNR Remark
    