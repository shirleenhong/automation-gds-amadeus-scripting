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
${tab_queuePlacement}   css=#queueMinder-link
${button_addQueue}    //i[@id='add']
${row_queuePlacement}    //tbody[@formarrayname='queues']
${input_oid}    //input[@id='oid']
${input_queueNo_placement}    //input[@id='queueNumber']
${input_queueCat_placement}    //input[@id='category']

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
    
Click Queue Placement Tab
    Wait Until Element Is Visible    ${tab_queuePlacement}     30
    Click Element    ${tab_queuePlacement} 
    Set Test Variable    ${current_page}   Queue Placement
    Set Test Variable    ${personal_queue_complete}    no

Select ${transaction_type} From Type Of Transaction Droplist
    Navigate To Page Follow-Up Queue
    Select From List By Label    ${select_transaction}    ${transaction_type}  
    Set Test Variable    ${transaction_type}
    Take Screenshot

Select ${transaction_type} Transaction type
    Set Test Variable    ${transaction_type}
    Select From List By Label    ${select_transaction}    ${transaction_type} 

Enter Personal Queue And Category
    [Arguments]   ${queue_no}    ${category_no}
    Enter Value    ${input_queueNo}    ${queue_no}
    Enter Value    ${input_queueCategory}    ${category_no}
    Set Test Variable    ${personal_queue_complete}    yes
    
Select ${team_queue} on Team Queue List
    Set Test Variable    ${team_queue}
    Select From List By Label    ${select_teamQueue}     ${team_queue}
    Set Test Variable    ${team_queue_complete}    yes	

Populate ${queue_type} Transaction Type Queue
    Navigate To Page Follow-Up Queue
    Run Keyword If    "${queue_type}" == "Itinerary"   Select Itinerary Transaction type
    Run Keyword If    "${queue_type}" == "Invoice"   Select Invoice Transaction type
    
Populate Personal Queue And Category
    Navigate To Page Follow-Up Queue
    Enter Personal Queue And Category    1   1

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

Populate Personal Queue and Select ${team_queue} Team Queue
	Navigate To Page Follow-Up Queue
	Enter Personal Queue And Category    1    1
	Select ${team_queue} on Team Queue List

Populate Personal Queue And Select ${transaction_type} Transaction Type
	Navigate To Page Follow-Up Queue
	Enter Personal Queue And Category    1    1
	Select ${transaction_type} Transaction type
	
Populate ${queue_type} Transaction Type Queue In Standalone
    Navigate To Page Reporting Remarks
    Submit To PNR    no
    Click Itinerary And Queue
    Run Keyword If    "${queue_type}" == "Itinerary"   Select Itinerary Transaction type
    Run Keyword If    "${queue_type}" == "Invoice"   Select Invoice Transaction type
    Set Test Variable    ${transaction_type}
    Select From List By Label    ${select_transaction}    ${transaction_type} 
    
Populate Personal Queue And Category In Standalone
    Navigate To Page Reporting Remarks
    Submit To PNR    no
    Click Itinerary And Queue
    Enter Personal Queue And Category    1   1

Verify Team Queue Is Not Displayed For Leisure On Demand
    Page Should Not Contain Element    ${select_teamQueue}     

Verify PNR Is Queued To Correct ${queue_type} Queue
    Finish PNR   queueing=yes
    Open Command Page
    Enter Cryptic Command    RTQ 
    Run Keyword If  "${queue_type}" == "Team Queue"  Verify Correct Team Queue
    Run Keyword If  "${queue_type}" == "Transaction Type"  Verify Correct Transaction Type Queue
    Run Keyword If  "${queue_type}" == "Personal"  Verify Correct Personal Queue
    Run Keyword If  "${queue_type}" == "Team And Personal"  Verify Correct Team Queue  
    Run Keyword If  "${queue_type}" == "Team And Personal"  Verify Correct Personal Queue 
    Run Keyword If  "${queue_type}" == "Itinerary And Personal"  Verify Correct Transaction Type Queue
    Run Keyword If  "${queue_type}" == "Itinerary And Personal"  Verify Correct Personal Queue 
    [Teardown]    Take Screenshot
    
Verify PNR Is Queued To Correct ${queue_type} Queue For Standalone
    Click Submit To PNR   queueing=yes
    Enter Cryptic Command    RTQ 
    Run Keyword If  "${queue_type}" == "Team Queue"  Verify Correct Team Queue
    Run Keyword If  "${queue_type}" == "Transaction Type"  Verify Correct Transaction Type Queue
    Run Keyword If  "${queue_type}" == "Personal"  Verify Correct Personal Queue
    Run Keyword If  "${queue_type}" == "Team And Personal"  Verify Correct Team Queue  
    Run Keyword If  "${queue_type}" == "Team And Personal"  Verify Correct Personal Queue 
    Run Keyword If  "${queue_type}" == "Itinerary And Personal"  Verify Correct Transaction Type Queue
    Run Keyword If  "${queue_type}" == "Itinerary And Personal"  Verify Correct Personal Queue 
    [Teardown]    Take Screenshot
    
Verify Correct Team Queue
    Run Keyword If   "${team_queue}" == "VIP"     Element Should Contain    ${text_area_command}   PARWL2877${SPACE}${SPACE}${SPACE}${SPACE}062${SPACE}${SPACE}${SPACE}${SPACE}000
    Run Keyword If   "${team_queue}" == "Pending Approval"     Element Should Contain    ${text_area_command}   PARWL2877${SPACE}${SPACE}${SPACE}${SPACE}063${SPACE}${SPACE}${SPACE}${SPACE}000
    
Verify Correct Transaction Type Queue
    Run Keyword If  "${transaction_type}" == "Itinerary"  Element Should Contain    ${text_area_command}    YTOWL210E${SPACE}${SPACE}${SPACE}${SPACE}065${SPACE}${SPACE}${SPACE}${SPACE}001
	...    ELSE IF    "${transaction_type}" == "Invoice"   Element Should Contain    ${text_area_command}    YTOWL210E${SPACE}${SPACE}${SPACE}${SPACE}066${SPACE}${SPACE}${SPACE}${SPACE}001
    
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
    
Verify Correct Personal Queue
    [Arguments]   ${leisure_on_demand}=no
    Run Keyword If   "${personal_queue_complete}" == "yes" and "${leisure_on_demand}" == "no"   Element Should Contain    ${text_area_command}   YTOWL2107${SPACE}${SPACE}${SPACE}${SPACE}001${SPACE}${SPACE}${SPACE}${SPACE}001
    Run Keyword If   "${personal_queue_complete}" == "yes" and "${leisure_on_demand}" == "yes"   Element Should Contain    ${text_area_command}   YTOWL2106${SPACE}${SPACE}${SPACE}${SPACE}001${SPACE}${SPACE}${SPACE}${SPACE}001
    
Verify Leisure On Demand PNR Is Queued To Correct Queues
    Finish PNR   queueing=yes
    Open Command Page
    Enter Cryptic Command    RTQ 
    Verify Correct Transaction Type Queue
    Verify Correct Personal Queue    yes

Click Add Queue Button ${button_no}
    Click Element   ${row_queuePlacement}${open_bracket}${button_no}${close_bracket}${button_addQueue} 
    
Enter Queue And Category For Queue Placement
    [Arguments]   ${queue_index}   ${queue_oid}   ${queue_no}    ${queue_category}
    Enter Value    ${row_queuePlacement}${open_bracket}${queue_index}${close_bracket}${input_oid}   ${queue_oid} 
    Enter Value    ${row_queuePlacement}${open_bracket}${queue_index}${close_bracket}${input_queueNo_placement}     ${queue_no}  
    Enter Value    ${row_queuePlacement}${open_bracket}${queue_index}${close_bracket}${input_queueCat_placement}    ${queue_category}     

Verify Default Values Of Queue Placement
    Select Counselor Identity: ESC
    Navigate To Page Queue Placement
    ${actual_oid}   Get Value    ${input_oid} 
    ${actual_queueNo}    Get Value    ${input_queueNo_placement}
    ${actual_queueCat}    Get Value    ${input_queueCat_placement}
    Run Keyword And Continue On Failure    Should Be Equal    ${actual_oid}    YTOWL2107    
    Run Keyword And Continue On Failure    Should Be Equal    ${actual_queueNo}    50 
    Run Keyword And Continue On Failure    Should Be Equal    ${actual_queueCat}    55 
    Take Screenshot 
    
Populate Multiple Queue Placements
    Select Counselor Identity: ESC
    Navigate To Page Queue Placement
    Click Add Queue Button 1
    Enter Queue And Category For Queue Placement   2   YTOWL2106    10    1
    Click Add Queue Button 2
    Enter Queue And Category For Queue Placement   3   YTOWL2107    1    1
    Take Screenshot

Verify PNR Is Queued To Correct Queue Placement
    Finish PNR   queueing=yes
    Enter Cryptic Command    RTQ 
    Element Should Contain    ${text_area_command}   YTOWL2107${SPACE}${SPACE}${SPACE}${SPACE}000${SPACE}${SPACE}${SPACE}${SPACE}000

Verify PNR Is Queued To Correct Multiple Queue Placement
    Finish PNR   queueing=yes
    Enter Cryptic Command    RTQ 
    Element Should Contain    ${text_area_command}   YTOWL2107${SPACE}${SPACE}${SPACE}${SPACE}000${SPACE}${SPACE}${SPACE}${SPACE}000
    Element Should Contain    ${text_area_command}   YTOWL2106${SPACE}${SPACE}${SPACE}${SPACE}010${SPACE}${SPACE}${SPACE}${SPACE}000
    Element Should Contain    ${text_area_command}   YTOWL2107${SPACE}${SPACE}${SPACE}${SPACE}001${SPACE}${SPACE}${SPACE}${SPACE}001
