*** Settings ***
Library           String
Library           SeleniumLibrary
Library           Collections
Library           Screenshot
Resource          base.robot

*** Variables ***
${tab_queue}    //span[contains(text(),'Follow-up Queue')]
${tab_ofc_doc}    css=#ofcDocumentation-link
${tab_client_queue}    //span[contains(text(), 'Client Queue')]
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
${list_email_address}    //input[@id='emailAddress']
${list_language}     //select[@id='language']
${list_transaction_type}    //div[@class='itineraryContainer']//select[@id='typeTransaction']
${input_service}    //input[@id='service']
${input_ticket}    //input[@id='ticket']
${input_offer}    //input[@id='offer']
${button_add}    //i[@id='add']
${button_remove}    //i[@id='remove']
${div_email_addresses}    //div[@formarrayname='emailAddresses']
${div_services}    //div[@formarrayname='services']
${div_tickets}    //div[@formarrayname='tickets']
${div_offers}     //div[@formarrayname='offers']
${tab_cwt_itinerary}    //a[@id='tab2-link']
${option_email}    //option[@ng-reflect-value='
${div_label_ornge}    //div[@class='col displayMsg']
${tab_cwt_itin}    css=#CWTItin-link
${select_isBusiness}    css=#isBusiness

*** Keywords ***
Click Client Queue Tab
    Wait Until Element Is Visible     ${tab_client_queue}    30
    Click Element     ${tab_client_queue}
    Wait Until Element Is Visible    ${select_isBusiness}    30    
    Set Test Variable    ${current_page}     Client Queue
    
Select ${value} In Is Business Class Booked
    Navigate To Page Client Queue
    Select From List By Value    ${select_isBusiness}    ${value}
    Take Screenshot

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
    
Click Follow-Up Queue Tab S
    Wait Until Element Is Visible    ${tab_queue}     30
    Click Element    ${tab_queue} 
    Set Test Variable    ${current_page}   Follow-Up Queue S
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
    [Teardown]    Take Screenshot
    
Populate Personal Queue And Category
    Navigate To Page Follow-Up Queue
    Enter Personal Queue And Category    1   1
    [Teardown]    Take Screenshot

Fill Up OFC Documentation And Queue With Default Values
    Select Counselor Identity: OSC
    Navigate To Page OFC Documentation And Queue
    Select From List By Label    ${select_ticketType}     Non-BSP/Vendor Ticket
    Set Test Variable    ${ofc_documentation_complete}     yes
    Take Screenshot
    
Select ${ticket_type} That Is ${is_issued_by} OSC And ${to_queue} In OFC Documentation And Queue
    Log    "${is_issued_by}"
    Log    "${to_queue}"
    ${queue}     Set Variable If    "${to_queue}" == "Queue"    1    0
    Select Counselor Identity: OSC
    Navigate To Page OFC Documentation And Queue
    Select From List By Label    ${select_ticketType}     ${ticket_type}
    Run Keyword If    "${is_issued_by}" == "Issued By"    Click Element At Coordinates    ${input_isOscTravel_yes}    0    0
    Run Keyword If    ${queue} == 1    Click Element At Coordinates    ${input_isOscQueue_yes}    0    0
    Set Test Variable    ${ofc_documentation_complete}     yes
    Take Screenshot

Populate Personal Queue and Select ${team_queue} Team Queue
	Navigate To Page Follow-Up Queue
	Enter Personal Queue And Category    1    1
	Select ${team_queue} on Team Queue List
	[Teardown]    Take Screenshot
	
Populate Personal Queue And Select ${transaction_type} Transaction Type
	Navigate To Page Follow-Up Queue
	Enter Personal Queue And Category    1    1
	# Select ${transaction_type} Transaction type
	[Teardown]    Take Screenshot
	
Populate ${queue_type} Transaction Type Queue In Standalone
    Navigate To Page Reporting Remarks
    Submit To PNR    no
    Click Itinerary And Queue
    Run Keyword If    "${queue_type}" == "Itinerary"   Select Itinerary Transaction type
    Run Keyword If    "${queue_type}" == "Invoice"   Select Invoice Transaction type
    Set Test Variable    ${transaction_type}
    Select From List By Label    ${select_transaction}    ${transaction_type} 
    [Teardown]    Take Screenshot
    
Populate Personal Queue And Category In Standalone
    Navigate To Page Reporting Remarks
    Submit To PNR    no
    Click Itinerary And Queue
    Enter Personal Queue And Category    1   1
    [Teardown]    Take Screenshot
    
Populate Personal Queue For Rail In Standalone
    Navigate To Page Follow-Up Queue S
    #Finish PNR    queueing=yes
    #Click Itinerary And Queue
    Enter Personal Queue And Category    41   ${EMPTY}
    [Teardown]    Take Screenshot

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
    Send Itinerary And Queue    queueing=yes
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
    Run Keyword If   "${team_queue}" == "VIP"     Element Should Contain    ${text_area_command}   YTOWL2107${SPACE}${SPACE}${SPACE}${SPACE}040${SPACE}${SPACE}${SPACE}${SPACE}224
    Run Keyword If   "${team_queue}" == "Pending Approval"     Element Should Contain    ${text_area_command}   YTOWL2107${SPACE}${SPACE}${SPACE}${SPACE}040${SPACE}${SPACE}${SPACE}${SPACE}225
    
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
    # Run Keyword If    "${is_queued}" == "Queued"    Element Should Contain    ${text_area_command}    YTOWL2107${SPACE}${SPACE}${SPACE}${SPACE}075${SPACE}${SPACE}${SPACE}${SPACE}110
    # ...   ELSE IF    "${is_queued}" == "Not Queued"    Element Should Not Contain    ${text_area_command}    YTOWL2107${SPACE}${SPACE}${SPACE}${SPACE}075${SPACE}${SPACE}${SPACE}${SPACE}110
    
Verify Correct Personal Queue
    [Arguments]   ${leisure_on_demand}=no
    Run Keyword If   "${personal_queue_complete}" == "yes" and "${leisure_on_demand}" == "no"   Element Should Contain    ${text_area_command}   YTOWL2107${SPACE}${SPACE}${SPACE}${SPACE}001${SPACE}${SPACE}${SPACE}${SPACE}001
    Run Keyword If   "${personal_queue_complete}" == "yes" and "${leisure_on_demand}" == "yes"   Element Should Contain    ${text_area_command}   YTOWL2101${SPACE}${SPACE}${SPACE}${SPACE}001${SPACE}${SPACE}${SPACE}${SPACE}001
    
Verify Leisure On Demand PNR Is Queued To Correct Queues
    Finish PNR   queueing=yes
    Open Command Page
    Enter Cryptic Command    RTQ 
    Verify Correct Personal Queue    yes

Click Add Queue Button ${button_no}
    Click Element   ${row_queuePlacement}${open_bracket}${button_no}${close_bracket}${button_addQueue} 
    
Enter Queue And Category For Queue Placement
    [Arguments]   ${queue_index}   ${queue_oid}   ${queue_no}    ${queue_category}
    Enter Value    ${row_queuePlacement}${open_bracket}${queue_index}${close_bracket}${input_oid}   ${queue_oid} 
    Enter Value    ${row_queuePlacement}${open_bracket}${queue_index}${close_bracket}${input_queueNo_placement}     ${queue_no}  
    Enter Value    ${row_queuePlacement}${open_bracket}${queue_index}${close_bracket}${input_queueCat_placement}    ${queue_category}     

Verify Default Values Of Queue Placement
    Select Counselor Identity: 24H
    Navigate To Page Queue Placement
    ${actual_oid}   Get Value    ${input_oid} 
    ${actual_queueNo}    Get Value    ${input_queueNo_placement}
    ${actual_queueCat}    Get Value    ${input_queueCat_placement}
    Run Keyword And Continue On Failure    Should Be Equal    ${actual_oid}    YTOWL2107    
    Run Keyword And Continue On Failure    Should Be Equal    ${actual_queueNo}    50 
    Run Keyword And Continue On Failure    Should Be Equal    ${actual_queueCat}    55 
    Take Screenshot 
    
Populate Multiple Queue Placements
    Select Counselor Identity: 24H
    Navigate To Page Queue Placement
    Click Add Queue Button 1
    Enter Queue And Category For Queue Placement   2   YTOWL2106    10    1
    Click Add Queue Button 2
    Enter Queue And Category For Queue Placement   3   YTOWL2107    1    1
    Take Screenshot

Verify PNR Is Queued To Correct Queue Placement
    Finish PNR   queueing=yes
    Open Command Page
    Enter Cryptic Command    RTQ 
    Element Should Contain    ${text_area_command}   YTOWL2107${SPACE}${SPACE}${SPACE}${SPACE}050${SPACE}${SPACE}${SPACE}${SPACE}000

Verify PNR Is Queued To Correct Multiple Queue Placement
    Finish PNR   queueing=yes
    Open Command Page
    Enter Cryptic Command    RTQ 
    Element Should Contain    ${text_area_command}   YTOWL2107${SPACE}${SPACE}${SPACE}${SPACE}050${SPACE}${SPACE}${SPACE}${SPACE}000
    Element Should Contain    ${text_area_command}   YTOWL2106${SPACE}${SPACE}${SPACE}${SPACE}010${SPACE}${SPACE}${SPACE}${SPACE}000
    Element Should Contain    ${text_area_command}   YTOWL2107${SPACE}${SPACE}${SPACE}${SPACE}001${SPACE}${SPACE}${SPACE}${SPACE}001
    
Verify PNR Is Queued Correctly At The End Of PNR
    Finish PNR   queueing=yes
    Open Command Page
    Enter Cryptic Command    RTQ 
    Element Should Contain    ${text_area_command}   YTOWL210E${SPACE}${SPACE}${SPACE}${SPACE}070${SPACE}${SPACE}${SPACE}${SPACE}001
    
Add CWT Itinerary Details For Email ${email}, In ${language} Language And For ${transaction} Transaction Type  
    Navigate To Page CWT Itinerary Tab
    Select Emails In CWT Itinerary    ${email}
    Select From List By Label    ${list_language}    ${language}
    # Select From List By Label    ${list_transaction_type}    ${transaction}
    Add Services Remark     THIS IS A TEST FOR    ADDING SERVICES REMARK
    Add Tickets Remark     THIS IS ALSO A TEST     FOR ADDING TICKETS REMARK
    # Run Keyword If    "${transaction}" == "Itinerary"     Add Offers Remark    THIS ONE IS FOR    ADDING OFFER REMARKS
    Set Test Variable    ${cwt_itin_complete}    yes
    [Teardown]    Take Screenshot
    
Add CWT Itinerary Details For All Emails, In ${language} Language And For ${transcation} Transaction Type
    Sleep    10
    Navigate To Page CWT Itinerary
    Select Emails In CWT Itinerary    TEST@EMAIL.COM    TEST_ARR@EMAIL.COM    TEST_CTC@EMAIL.COM
    Select From List By Label    ${list_language}    ${language}
    Select From List By Label    ${list_transaction_type}    ${transcation}
    Set Test Variable    ${cwt_itin_complete}    yes
    [Teardown]    Take Screenshot
    
Update Services And Test Remarks
    Update Existing Services Remarks    1     UPDATED SERVICES REMARK
    Delete Existing Services Remarks    2
    Update Existing Ticket Remarks    2    UPDATED TICKETS REMARK 
    Delete Existing Ticket Remarks    1
    [Teardown]    Take Screenshot
    
Select Emails In CWT Itinerary    
    [Arguments]    @{email}
    ${index}    Set Variable    1
    ${length}    Get Length    ${email}
    : FOR     ${email}    IN    @{email}
    \    Enter Value    ${div_email_addresses}${open_bracket}${index}${close_bracket}${list_email_address}    ${email.upper()}
    \    Run Keyword If    ${index} < ${length}     Click Element    ${div_email_addresses}${open_bracket}${index}${close_bracket}${button_add}
    \    ${index}    Evaluate    ${index} + 1 
    
Add Services Remark
    [Arguments]    @{service_remark}
    ${index}    Set Variable    1
    ${length}    Get Length    ${service_remark}
    : FOR    ${service_remark}    IN    @{service_remark}
    \    Enter Value    ${div_services}${open_bracket}${index}${close_bracket}${input_service}    ${service_remark}
    \    Run Keyword If    ${index} < ${length}     Click Element    ${div_services}${open_bracket}${index}${close_bracket}${button_add}
    \    ${index}    Evaluate    ${index} + 1

Update Existing Services Remarks
    [Arguments]    ${index}    ${update_remark}
    Delete Input Text    ${div_services}${open_bracket}${index}${close_bracket}${input_service}
    Enter Value    ${div_services}${open_bracket}${index}${close_bracket}${input_service}     ${update_remark}

Delete Existing Services Remarks
    [Arguments]   ${index}
    Click Element     ${div_services}${open_bracket}${index}${close_bracket}${button_remove}  
        
Add Tickets Remark
    [Arguments]    @{ticket_remark}
    ${index}    Set Variable    1
    ${length}    Get Length    ${ticket_remark}
    : FOR    ${ticket_remark}    IN    @{ticket_remark}
    \    Enter Value    ${div_tickets}${open_bracket}${index}${close_bracket}${input_ticket}    ${ticket_remark}
    \    Run Keyword If    ${index} < ${length}     Click Element    ${div_tickets}${open_bracket}${index}${close_bracket}${button_add}
    \    ${index}    Evaluate    ${index} + 1
    
Update Existing Ticket Remarks
    [Arguments]    ${index}    ${update_remark}
    Delete Input Text    ${div_tickets}${open_bracket}${index}${close_bracket}${input_ticket}
    Enter Value    ${div_tickets}${open_bracket}${index}${close_bracket}${input_ticket}     ${update_remark}

Delete Input Text
    [Arguments]    ${input_element}
    Double Click Element    ${input_element}
    Press Keys    ${input_element}    HOME
    Press Keys    ${input_element}    SHIFT+END
    Press Keys    ${input_element}    \ue017    
    
Delete Existing Ticket Remarks
    [Arguments]    ${index}
    Click Element    ${div_tickets}${open_bracket}${index}${close_bracket}${button_remove}
    
Click CWT Itinerary Tab
    Wait Until Element Is Visible     ${tab_cwt_itinerary}    30
    Click Element At Coordinates    ${tab_cwt_itinerary}    0    0
    Wait Until Element Is Visible    ${list_email_address}    30    
    Set Test Variable    ${current_page}     CWT Itinerary        

Add Offers Remark
    [Arguments]    @{offer_remark}
    ${index}    Set Variable    1
    ${length}    Get Length    ${offer_remark}
    : FOR    ${offer_remark}    IN    @{offer_remark}
    \    Enter Value    ${div_offers}${open_bracket}${index}${close_bracket}${input_offer}    ${offer_remark}
    \    Run Keyword If    ${index} < ${length}     Click Element    ${div_offers}${open_bracket}${index}${close_bracket}${button_add}
    \    ${index}    Evaluate    ${index} + 1
    
Update Existing Offer Remarks
    [Arguments]    ${existing_remark}    ${update_remark}
    ${num_of_element}    Get Element Count    ${input_offer}
    : FOR     ${index}    IN RANGE    1    ${num_of_element}
    \    ${matches}    Run Keyword And Return Status    Element Should Contain     ${div_offers}${open_bracket}${index}${close_bracket}${input_offer}    ${existing_remark}
    \    Run Keyword If    "${matches}" == "True"    Clear Element Text    ${div_offers}${open_bracket}${index}${close_bracket}${input_offer}
    \    Run Keyword If    "${matches}" == "True"    Enter Value    ${div_offers}${open_bracket}${index}${close_bracket}${input_offer}     ${update_remark}

Delete Existing Offer Remarks
    [Arguments]    @{offer_remark}
    : FOR    ${offer_remark}    IN    @{offer_remark}
    \    Delete Service Remark    ${offer_remark}
    [Teardown]     Take Screenshot

Delete Offer Remark
    [Arguments]    ${offer_remark}  
    ${num_of_element}    Get Element Count    ${input_offer}
    : FOR     ${index}    IN RANGE    1    ${num_of_element}
    \    ${matches}    Run Keyword And Return Status    Element Should Contain     ${div_offers}${open_bracket}${index}${close_bracket}${input_offer}    ${offer_remark}
    \    Run Keyword If    "${matches}" == "True"    Click Element    ${div_offers}${open_bracket}${index}${close_bracket}${button_remove}

Verify CWT Itinerary UI For Client Ornge
    Navigate To Page CWT Itinerary
    Wait Until Element Is Visible    ${div_label_ornge}    30
    Element Should Not Be Visible    ${div_email_addresses}${button_add}
    ${ornge_label}    Get Text    ${div_label_ornge}
    ${new_ornge_label}    Replace String    ${ornge_label}    \n    ${EMPTY}
    Should Be Equal    ${new_ornge_label}    ORNGE REQUIRES THE TRAVELLER'S E-MAIL ONLY.Travel Arranger’s will automatically receive an email from AQUA
    Log    Expected: ${new_ornge_label}
    Log    Actual: ORNGE REQUIRES THE TRAVELLER'S E-MAIL ONLY.Travel Arranger’s will automatically receive an email from AQUA
    
Verify PNR Is Queud To Aqua Queue
    Switch To Command Page
    Enter Cryptic Command    RTQ 
    Element Should Contain    ${text_area_command}   YTOWL210E${SPACE}${SPACE}${SPACE}${SPACE}070${SPACE}${SPACE}${SPACE}${SPACE}001
    Take Screenshot
    
Click CWT Itinerary Tab In Full Wrap
    Wait Until Element Is Visible    ${tab_cwt_itin}    30
    Click Element At Coordinates    ${tab_cwt_itin}    0    0
    Wait Until Element Is Visible    ${list_email_address}    30    
    Set Test Variable    ${current_page}     CWT Itinerary Tab
    
Verify Client Queue Tab Is Not Displayed
    Navigate To Page Queue
    Element Should Not Be Visible    ${tab_client_queue}
    Take Screenshot