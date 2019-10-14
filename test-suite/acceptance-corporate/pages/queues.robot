*** Settings ***
Library           String
Library           SeleniumLibrary
Library           Collections
Library           Screenshot
Resource          base.robot

*** Variables ***
${tab_queue}    css=#queue-link
${tab_ofc_doc}    css=#ofcDocumentation-link
${select_transaction}   css=#typeTransaction
${select_teamQueue}   css=#teamQueue
${input_queueNo}    css=#queueNo
${input_queueCategory}    css=#queueCategory
${select_ticketType}    css=#ticketType
${input_isOscTravel_yes}     //input[@id='isOscTravel' and @value='Y']
${input_isOscTravel_no}    //input[@id='isOscTravel' and @value='N']    
${input_isOscQueue_yes}    //input[@id='isOscQueue' and @value='Y']
${input_isOscQueue_no}    //input[@id='isOscQueue' and @value='N']     

*** Keywords ***
Click OFC Documentation And Queue Tab
    Wait Until Element Is Visible     ${tab_ofc_doc}    30
    Click Element     ${tab_ofc_doc}
    Wait Until Element Is Visible    ${select_ticketType}    30    
    Set Test Variable    ${current_page}     OFC Documentation And Queue

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

Fill Up OFC Documentation And Queue With Default Values
    Select Counselor Identity: OFC
    Navigate To Page OFC Documentation And Queue
    Select From List By Label    ${select_ticketType}     Non-BSP/Vendor Ticket
    Set Test Variable    ${ofc_documentation_complete}     yes
    
Select ${ticket_type} That Is ${is_issued_by} OSC And ${to_queue} In OFC Documentation And Queue
    Select Counselor Identity: OFC
    Navigate To Page OFC Documentation And Queue
    Select From List By Label    ${select_ticketType}     ${ticket_type}
    Run Keyword If    "${is_issued_by}" == "Issued By"    Click Element At Coordinates    ${input_isOscTravel_yes}    0    0
    Run Keyword If    "${to_queue}" == "Queue"    Click Element At Coordinates    ${input_isOscQueue_yes}    0    0
    Set Test Variable    ${ofc_documentation_complete}     yes
    
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
    
Verify RF Line Used Agent Sine
    Open Command Page
    Enter Cryptic Command    RT
    Run Keyword And Continue On Failure    Element Should Contain    ${text_area_command}    RFOSC AGT/   
    [Teardown]    Take Screenshot
    
Verify PNR Is ${is_queued} To OSC
    ${in_graphic}    Run Keyword And Return Status     Element Should Be Visible   ${button_cryptic}
    Run Keyword If   "${in_graphic}" == "True"     Open Command Page
    Enter Cryptic Command    RTQ 
    Run Keyword If    "${is_queued}" == "Queued"    Element Should Contain    ${text_area_command}    YTOWL2107${SPACE}${SPACE}${SPACE}${SPACE}041${SPACE}${SPACE}${SPACE}${SPACE}000
    ...   ELSE IF    "${is_queued}" == "Not Queued"    Element Should Not Contain    ${text_area_command}    YTOWL2107${SPACE}${SPACE}${SPACE}${SPACE}041${SPACE}${SPACE}${SPACE}${SPACE}000
    