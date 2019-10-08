*** Settings ***
Library           String
Library           SeleniumLibrary
Library           Collections
Library           Screenshot
Resource          base.robot

*** Variables ***
${tab_itenararyAndQueue}    css=#itineraryQueue-link  #to be updated

*** Keywords ***
Click Itinerary And Queue Tab
    Wait Until Element Is Visible    ${tab_itenararyAndQueue}    30
    Click Element    ${tab_itenararyAndQueue}
    Set Test Variable    ${current_page}    Itinerary And Queue
    
Verify That Itinerary Queue Can Be Selected
    Navigate To Page Itinerary And Queue
    