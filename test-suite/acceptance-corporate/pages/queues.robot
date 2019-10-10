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
    Set Test Variable    ${personal_queue_complete}    no
    Set Test Variable    ${transaction_type}   no

Select ${transaction_type} From Type Of Transaction Droplist
    Navigate To Page Follow-Up Queue
    Select From List By Label    ${select_transaction}    ${transaction_type}  
    Set Test Variable    ${transaction_type}    
    Take Screenshot

Populate Personal Queues
    [Arguments]   ${queue_no}    ${category_no}
    Enter Value    ${input_queueNo}    ${queue_no}
    Enter Value    ${input_queueCategory}    ${category_no}
    Set Test Variable    ${personal_queue_complete}    yes
    
Select ${team_queue} on Team Queue List
    Select From List By Label    ${select_teamQueue}     ${team_queue}
    Set Test Variable    ${team_queue_complete}    yes

Populate Personal Queue And Select ${team_queue} on Team Queues
    Navigate To Page Follow-Up Queue
    Populate Personal Queues    1    1
    Select ${team_queue} on Team Queue List

Verify PNR Is Queued To Correct Follow-Up Queue
    Finish PNR   queueing=yes
    Verify PNR Is Queued 

Verify PNR Is Queued 
    Open Command Page
    Enter Cryptic Command    RTQ 
    Run Keyword If  "${transaction_type}" == "Itinerary"  Element Should Contain    ${text_area_command}    YTOWL210E${SPACE}${SPACE}${SPACE}${SPACE}065${SPACE}${SPACE}${SPACE}${SPACE}001
    ...    ELSE IF   "${transaction_type}" == "Invoice"   Element Should Contain    ${text_area_command}    YTOWL210E${SPACE}${SPACE}${SPACE}${SPACE}066${SPACE}${SPACE}${SPACE}${SPACE}001
    ...    ELSE IF   "${personal_queue_complete}" == "yes"     Element Should Contain    ${text_area_command}   YTOWL2107${SPACE}${SPACE}${SPACE}${SPACE}001${SPACE}${SPACE}${SPACE}${SPACE}001
    ...    ELSE IF   "${team_queue}" == "VIP"     Element Should Contain    ${text_area_command}   PARWL2877${SPACE}${SPACE}${SPACE}${SPACE}062${SPACE}${SPACE}${SPACE}${SPACE}000
    ...    ELSE IF   "${team_queue}" == "Pending Approval"     Element Should Contain    ${text_area_command}   PARWL2877${SPACE}${SPACE}${SPACE}${SPACE}063${SPACE}${SPACE}${SPACE}${SPACE}000
    [Teardown]    Take Screenshot