*** Settings ***
Library           String
Library           SeleniumLibrary
Library           Collections
Library           Screenshot
Resource          base.robot

*** Variables ***
${tab_queue}    css=#queue-link
${select_transaction}   css=#typeTransaction
${select_teamQueue}   css=#teamQueue
${input_queueNo}    css=#queueNo
${input_queueCategory}    css=#queueCategory

*** Keywords ***
Click Follow-Up Queue Tab
    Wait Until Element Is Visible    ${tab_queue}     30
    Click Element    ${tab_queue} 
    Set Test Variable    ${current_page}   Follow-Up Queue 

Select ${transaction_type} From Type Of Transaction Droplist
    Navigate To Page Follow-Up Queue
    Select From List By Label    ${select_transaction}    ${transaction_type}  
    Set Test Variable    ${transaction_type}
    Take Screenshot
    
Verify PNR Is Queued To Correct Follow-Up Queue
    Finish PNR   queueing=yes
    Verify PNR Is Queued 

Verify PNR Is Queued 
    Open Command Page
    Enter Cryptic Command    RTQ 
    Run Keyword If  "${transaction_type}" == "Itinerary"  Element Should Contain    ${text_area_command}    YTOWL210E${SPACE}${SPACE}${SPACE}${SPACE}065${SPACE}${SPACE}${SPACE}${SPACE}001
    ...   ELSE IF   "${transaction_type}" == "Invoice"   Element Should Contain    ${text_area_command}    YTOWL210E${SPACE}${SPACE}${SPACE}${SPACE}066${SPACE}${SPACE}${SPACE}${SPACE}001
    [Teardown]    Take Screenshot