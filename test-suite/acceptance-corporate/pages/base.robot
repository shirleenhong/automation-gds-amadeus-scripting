*** Settings ***
Library           String
Library           SeleniumLibrary
Library           Collections
Library           Screenshot
Library           DateTime
Resource          amadeus.robot
Resource          payment.robot
Resource          ticketing.robot
Resource          reporting.robot
Resource          remarks.robot
Resource          cancel_segments.robot
Resource          queues.robot
Resource          invoice.robot
Resource          ../../resources/common/api-utilities.txt

*** Variables ***
${button_sign_out}    css=#uicAlertBox_ok > span.uicButtonBd
${button_close}    //span[contains(text(),'CWT Corp Test')]/following-sibling::span[@class='xDialog_close xDialog_std_close']
${button_full_wrap}    //button[contains(text(), 'Full Wrap PNR')]
${button_submit_pnr}    //button[@class='leisureBtnSubmit']
${button_cancel_segments}    //button[contains(text(), 'Cancel Segments')]
${button_cancel_segment}    //button[@class='cancelsegment']
${panel_reporting}    //div[@class='panel-title']//div[contains(text(), 'Reporting')]
${panel_payment}    //div[@class='panel-title']//div[contains(text(), 'Payment')]
${panel_ticketing}    //div[@class='panel-title']//div[contains(text(), 'Ticketing')]
${message_updatingPnr}    //div[contains(text(), 'Updating PNR')]
${message_loadingPnr}    //div[contains(text(), 'Loading PNR')]
${list_counselor_identity}    //select[@id='selCounselorIdentity']
${input_ticketingDate}    css=#dtxtTicketDate
${checkbox_onHold}    css=#chkOnHold
${panel_fees}    //div[@class='panel-title']//div[contains(text(), 'Fees')]
${button_main_menu}    //button[contains(text(), 'Back To Main Menu')]
${button_save}    //button[contains(text(), 'Save')]
${panel_remarks}    //div[@class='panel-title']//div[contains(text(), 'Remarks')]
${text_warning}    //div[@class='col message']
${panel_queue}    //div[@class='panel-title']//div[contains(text(), 'Queue')]
${button_itinerary_queue}    //button[contains(text(), 'Itinerary and Queue')]
${message_sendingItinerary}     //div[contains(text(), 'Sending Itinerary and Queueing')]
${button_send_invoice_itinerary}    //button[contains(text(), 'Send Invoice/Itinerary')]
${open_bracket}     [
${close_bracket}     ]
${panel_passive_segment}    //div[contains(text(),  'Passive Segment')]
${button_add_segment}    //div[@class='loader']//button[contains(text(), 'Add Segment')]
${message_add_segments}    //div[contains(text(), 'Adding Segments')]
${button_add_passive_segment}    //div[@class='panel-body card-block card-body']//button[contains(text(), 'Add Segment')]
${panel_itinerary_and_queue}    //i[contains(text(),  'Itinerary And Queue')]
@{corp_pages}     Add Segment    Full Wrap PNR    Send Invoice/Itinerary    Itinerary and Queue    Cancel Segments
@{add_segment_pages}    Passive Segment    Add Passive Segment
@{cancel_segment_pages}    Cancel Segments     NonBSP Ticket Credit
@{payment_pages}    Payment    Non BSP Processing    Add Accounting Line
@{reporting_pages}    Reporting    BSP Reporting    Non BSP Reporting    Matrix Reporting    Waivers    Reporting Remarks
@{remarks_pages}    Remarks    Seats    IRD Remarks    Document PNR    Visa And Passport    ESC Remarks    Emergency Contact
@{fees_pages}    Fees
@{queue_pages}    Queue    Follow-Up Queue    OFC Documentation And Queue    Queue Placement
@{ticketing_pages}    Ticketing    Ticketing Line    Ticketing Instructions
@{full_wrap_pages}    Full Wrap PNR    @{payment_pages}    @{reporting_pages}    @{remarks_pages}    @{fees_pages}    @{queue_pages}    @{ticketing_pages}
${itinerary_and_queue_pages}    Itinerary and Queue    CWT Itinerary    Follow-Up Queue S

*** Keywords ***
Enter Value
    [Arguments]    ${element}    ${value}
    Double Click Element    ${element}
    Press Key    ${element}    \\08
    Input Text    ${element}    ${value}
    Press Key    ${element}    \\09
    
Close CA Corporate Test
    Unselect Frame
    Wait Until Element Is Not Visible    ${overlay_loader}    20
    Wait Until Element Is Visible    ${header_corp_test}    50
    Run Keyword If    "${current_page}" == 'Add Passive Segment'   Sleep  10   ELSE   Sleep    5
    Click Element    ${button_close}
    Set Test Variable    ${current_page}    Amadeus

Click Full Wrap
    Wait Until Page Contains Element   ${button_full_wrap}    180 
    Click Element    ${button_full_wrap}
    Wait Until Element Is Visible    ${message_loadingPnr}    180
    Wait Until Page Does Not Contain Element    ${message_loadingPnr}    180
    Wait Until Element Is Visible    ${button_submit_pnr}    30
    Set Test Variable    ${current_page}    Full Wrap PNR
    Set Test Variable    ${ticketing_complete}    no
    Set Test Variable    ${ofc_documentation_complete}     no
    Set Test Variable    ${routing_code_selected}    no
    Set Test Variable    ${destination_selected}    no
    Set Test Variable    ${visa_complete}    no
    Set Test Variable   ${esc_remarks_complete}    no
    [Teardown]    Take Screenshot
    
Click Cancel Segments
    Sleep    5
    Wait Until Page Contains Element    ${button_cancel_segments}     180
    Click Element At Coordinates    ${button_cancel_segments}    0    0
    Wait Until Element Is Visible    ${input_requestor}     30
    Set Test Variable    ${current_page}    Cancel Segments
    Set Test Variable    ${pnr_submitted}   no
    Set Test Variable    ${non_bsp_ticket_credit_complete}    no
    Set Test Variable    ${cancel_segments_complete}    no

Click Itinerary And Queue
    Wait Until Page Contains Element   ${button_full_wrap}    180 
    Click Element At Coordinates    ${button_itinerary_queue}    0    0 
    Wait Until Element Is Visible    ${button_submit_pnr}    30
    Wait Until Element Is Visible    ${select_transaction}      30
    Set Test Variable    ${current_page}    Follow-Up Queue S
    Set Test Variable    ${pnr_submitted}    no
    [Teardown]    Take Screenshot  
    
Click Send Itinerary And Queue
    [Arguments]    ${close_corporate_test}=yes
    Wait Until Page Contains Element    ${button_submit_pnr}    30
    Scroll Element Into View     ${button_submit_pnr}
    Click Button    ${button_submit_pnr}
    Wait Until Element Is Not Visible     ${message_sendingItinerary}    180
    Wait Until Element Is Visible    ${button_full_wrap}    180
    Set Test Variable    ${current_page}     CWT Corporate
    Sleep    5
    Run Keyword If     "${close_corporate_test}" == "yes"     Close CA Corporate Test

Click Reporting Panel
    Wait Until Element Is Visible    ${panel_payment}     60
    Scroll Element Into View     ${panel_payment}
    Click Element    ${panel_reporting}
    Set Test Variable    ${current_page}    Reporting
    
Collapse Reporting Panel
    Wait Until Element Is Visible    ${panel_reporting}    60
    Scroll Element Into View     ${panel_payment}
    Click Element    ${panel_reporting}
    Set Test Variable    ${current_page}    Full Wrap PNR
    
Click Payment Panel
    Wait Until Element Is Visible    ${panel_payment}    60
    Scroll Element Into View     ${panel_payment}
    Click Element    ${panel_payment}
    Set Test Variable    ${current_page}    Payment
    [Teardown]    Take Screenshot
    
Collapse Payment Panel
    Wait Until Element Is Visible    ${panel_payment}    60
    Scroll Element Into View     ${panel_payment}
    Click Element    ${panel_payment}
    Set Test Variable    ${current_page}    Full Wrap PNR
    [Teardown]    Take Screenshot
    
Click Submit To PNR
    [Arguments]    ${close_corporate_test}=yes     ${queueing}=no
    Wait Until Page Contains Element    ${button_submit_pnr}    30
    Scroll Element Into View     ${button_submit_pnr}
    Click Button    ${button_submit_pnr}
    Wait Until Element Is Not Visible     ${message_updatingPnr}    180
    Wait Until Element Is Visible    ${button_full_wrap}    180
    Set Test Variable    ${current_page}     CWT Corporate
    Run Keyword If   "${queueing}" == "yes"     Sleep    5
    # Sleep    5
    Run Keyword If     "${close_corporate_test}" == "yes"     Close CA Corporate Test
    Set Test Variable    ${pnr_submitted}    yes
    
Click Cancel Segment Button 
   Wait Until Page Contains Element    ${button_cancel_segment}     10
   Scroll Element Into View    ${button_cancel_segment}
   Click Element    ${button_cancel_segment}
   Wait Until Element Is Not Visible     ${message_updatingPnr}    180
   Wait Until Element Is Visible    ${button_full_wrap}    180
   Set Test Variable    ${current_page}     CWT Corporate
   Sleep    5
   Close CA Corporate Test
    
Click Back To Main Menu
    Wait Until Element Is Visible    ${button_main_menu}
    Click Element    ${button_main_menu}
    Set Test Variable    ${current_page}    CWT Corporate
    
Click Add Segment From Main Menu
    Wait Until Element Is Visible    ${button_add_segment}     60   
    Click Element    ${button_add_segment}
    Set Test Variable    ${current_page}    Add Segment
    
Click Add Segment to PNR
    [Arguments]    ${close_corporate_test}=yes
    Wait Until Element Is Visible    ${button_add_segment_toPNR}    60  
    Sleep   3  
    Click Element At Coordinates    ${button_add_segment_toPNR}   0   0
    Wait Until Element Is Not Visible     ${message_add_segments}      180
    Wait Until Element Is Visible    ${button_full_wrap}    180
    Sleep   3 
    Run Keyword If     "${close_corporate_test}" == "yes"     Close CA Corporate Test
    Set Test Variable    ${current_page}     CWT Corporate
  
Assign Current Date
    ${current_date}    Get Current Date
    ${current_day}     Convert Date     ${current_date}    %d
    ${current_month}     Convert Date     ${current_date}    %m
    ${current_year}     Convert Date     ${current_date}    %y
    ${current_time}     Convert Date     ${current_date}    %H:%M
    ${month}     Convert Month To MMM    ${current_date}
    Set Test Variable    ${current_time}    
    Set Test Variable    ${current_date}   ${current_day}${month}
    Set Test Variable    ${current_day}
    Set Test Variable    ${current_month}
    Set Test Variable    ${current_year}     20${current_year}
    Set Test Variable    ${date_today}    ${current_year}-${current_month}-${current_day}
    Log    ${current_date} 
    Log    ${current_day}/${current_month}/${current_year}

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

Navigate To Page ${destination_page}
     Set Test Variable    ${i}     1
     ${to_add_segment}    Run Keyword And Return Status    Should Contain    ${add_segment_pages}    ${destination_page}
     ${to_full_wrap}    Run Keyword And Return Status    Should Contain    ${full_wrap_pages}    ${destination_page}
     ${to_itinerary_and_queue}    Run Keyword And Return Status    Should Contain    ${itinerary_and_queue_pages}    ${destination_page}
     ${to_cancel_segments}    Run Keyword And Return Status    Should Contain    ${cancel_segment_pages}    ${destination_page}
     Set Test Variable    ${to_add_segment}    
     Set Test Variable    ${to_full_wrap}
     Set Test Variable    ${to_itinerary_and_queue}
     Set Test Variable    ${to_cancel_segments}
     : FOR     ${i}    IN RANGE   1    2
     \    ${i}    Evaluate    ${i} + 1
     \    Run Keyword If    "${current_page}" == "Amadeus"     Open CA Corporate Test
     \    Run Keyword If    "${current_page}" == "Add Accounting Line" and "${ticketing_details}" == "yes"     Click Save Button
     \    Run Keyword If    "${current_page}" == "CWT Corporate" and "${destination_page}" != "CWT Corporate"     Navigate From Corp    ${destination_page}
     \    Run Keyword If    "${to_add_segment}" == "True"    Navigate From Add Segment    ${destination_page}
     \    Run Keyword If    "${to_full_wrap}" == "True"    Navigate From Full Wrap    ${destination_page}
     \    Run Keyword If    "${to_itinerary_and_queue}" == "True"    Navigate From Itinerary And Queue    ${destination_page}
     \    Run Keyword If    "${to_cancel_segments}" == "True"    Navigate From Cancel Segments    ${destination_page}
     \    Run Keyword If    "${current_page}" == "Cryptic Display" and "${destination_page}" != "Cryptic Display"     Switch To Command Page
     \    Run Keyword If    "${current_page}" == "Add Accounting Line" and "${destination_page}" == "Fees"    Click Fees Panel
     \    Exit For Loop If    "${current_page}" == "${destination_page}" 
     Should Be Equal   ${current_page}    ${destination_page}
     
Navigate From Corp
     [Arguments]    ${destination_page}  
     Run Keyword If    "${to_add_segment}" == "True"    Click Add Segment From Main Menu
     ...    ELSE IF    "${to_full_wrap}" == "True"    Click Full Wrap
     ...    ELSE IF    "${to_itinerary_and_queue}" == "True"    Click Itinerary And Queue
     ...    ELSE IF    "${to_cancel_segments}" == "True"    Click Cancel Segments
     ...    ELSE IF    "${destination_page}" == "Send Invoice/Itinerary"     Click Send Invoice
     ...    ELSE    Close CA Corporate Test

Navigate From Cancel Segments
    [Arguments]    ${destination_page}
    Run Keyword If    "${destination_page}" == "Cancel Segments"    Click Cancel Segments Tab     
    ...    ELSE IF    "${destination_page}" == "NonBSP Ticket Credit"    Click NonBSP Ticket Credit Tab

Navigate From Add Segment
    [Arguments]    ${destination_page}
    ${in_add_segment}     Run Keyword And Return Status    Should Contain    ${add_segment_pages}    ${current_page}
    Run Keyword If    "${destination_page}" == "Add Passive Segment"    Click Add Passive Segment Button
    
Click Add Passive Segment Button
	Wait Until Element Is Visible     ${button_add_passive_segment}    30
	Click Element At Coordinates    ${button_add_passive_segment}   0   0
	Click Element At Coordinates    ${button_add_passive_segment}   0   0
	Wait Until Element Is Visible    ${select_segment_type}    30
	Set Test Variable   ${current_page}    Add Passive Segment

Collapse Open Panel
    ${in_payment}    Run Keyword And Return Status    Should Contain    ${payment_pages}    ${current_page}
    ${in_reporting}    Run Keyword And Return Status    Should Contain    ${reporting_pages}    ${current_page}
    ${in_remarks}    Run Keyword And Return Status    Should Contain    ${remarks_pages}    ${current_page}
    ${in_fees}    Run Keyword And Return Status    Should Contain    ${fees_pages}    ${current_page}
    ${in_queue}    Run Keyword And Return Status    Should Contain    ${queue_pages}    ${current_page}
    ${in_ticketing}    Run Keyword And Return Status    Should Contain    ${ticketing_pages}    ${current_page}
    Run Keyword If    "${in_payment}" == "True" and "${to_payment}" == "False"    Collapse Payment Panel
    ...    ELSE IF    "${in_reporting}" == "True" and "${to_reporting}" == "False"    Collapse Reporting Panel
    ...    ELSE IF    "${in_remarks}" == "True" and "${to_remarks}" == "False"    Collapse Remarks Panel
    ...    ELSE IF    "${in_fees}" == "True" and "${to_fees}" == "False"    Collapse Fees Panel
    ...    ELSE IF    "${in_queue}" == "True" and "${to_queue}" == "False"    Collapse Queue Panel
    ...    ELSE IF    "${in_ticketing}" == "True" and "${to_ticketing}" == "False"    Collapse Ticketing Panel

Navigate From Full Wrap
    [Arguments]    ${destination_page}
    ${to_payment}    Run Keyword And Return Status    Should Contain    ${payment_pages}    ${destination_page}
    ${to_reporting}    Run Keyword And Return Status    Should Contain    ${reporting_pages}    ${destination_page}
    ${to_remarks}    Run Keyword And Return Status    Should Contain    ${remarks_pages}    ${destination_page}
    ${to_fees}    Run Keyword And Return Status    Should Contain    ${fees_pages}    ${destination_page}
    ${to_queue}    Run Keyword And Return Status    Should Contain    ${queue_pages}    ${destination_page}
    ${to_ticketing}    Run Keyword And Return Status    Should Contain    ${ticketing_pages}    ${destination_page}
    Set Test Variable    ${to_payment}
    Set Test Variable    ${to_reporting}
    Set Test Variable    ${to_remarks}
    Set Test Variable    ${to_fees}
    Set Test Variable    ${to_queue}
    Set Test Variable    ${to_ticketing}
    Collapse Open Panel
    Run Keyword If    "${to_payment}" == "True"    Navigate From Payment    ${destination_page}    
    ...    ELSE IF    "${to_reporting}" == "True"    Navigate From Reporting    ${destination_page}
    ...    ELSE IF    "${to_remarks}" == "True"   Navigate From Remarks    ${destination_page}
    ...    ELSE IF    "${to_fees}" == "True"    Click Fees Panel
    ...    ELSE IF    "${to_queue}" == "True"    Navigate From Queue    ${destination_page}
    ...    ELSE IF    "${to_ticketing}" == "True"       Navigate From Ticketing    ${destination_page}
    ...    ELSE   Click Back To Main Menu

Navigate From Payment
    [Arguments]    ${destination_page}
    ${in_payment}    Run Keyword And Return Status    Should Contain     ${payment_pages}    ${current_page}
    Run Keyword If    "${in_payment}" == "False"    Click Payment Panel
    Run Keyword If    "${destination_page}" == "Add Accounting Line"    Navigate To Add Accounting Line

Navigate From Reporting
    [Arguments]    ${destination_page}
    ${in_reporting}    Run Keyword And Return Status    Should Contain     ${reporting_pages}    ${current_page}
    Run Keyword If    "${in_reporting}" == "False"    Click Reporting Panel
    Run Keyword If    "${destination_page}" == "BSP Reporting"    Click BSP Reporting Tab
    ...    ELSE IF    "${destination_page}" == "Non BSP Reporting"    Click Non BSP Reporting Tab
    ...    ELSE IF    "${destination_page}" == "Matrix Reporting"    Click Matrix Reporting Tab
    ...    ELSE IF    "${destination_page}" == "Reporting Remarks"    Click Reporting Remarks Tab
    ...    ELSE IF    "${destination_page}" == "Waivers"    Click Waivers Reporting Tab

Navigate From Remarks
    [Arguments]    ${destination_page}
    ${in_remarks}    Run Keyword And Return Status    Should Contain     ${remarks_pages}    ${current_page}
    Run Keyword If    "${in_remarks}" == "False"    Click Remarks Panel
    Run Keyword If    "${destination_page}" == "Document PNR"    Click Document PNR Tab
    ...    ELSE IF    "${destination_page}" == "Seats"    Click Seats Tab
    ...    ELSE IF    "${destination_page}" == "IRD Remarks"    Click IRD Remarks Tab
    ...    ELSE IF    "${destination_page}" == "Visa And Passport"    Click Visa And Passport Tab
    ...    ELSE IF    "${destination_page}" == "ESC Remarks"    Click ESC Remarks Tab
    ...    ELSE IF    "${destination_page}" == "Emergency Contact"    Click Emergency Contact Tab

Navigate From Ticketing
    [Arguments]    ${destination_page}
    ${in_ticketing}    Run Keyword And Return Status    Should Contain     ${ticketing_pages}    ${current_page}
    Run Keyword If    "${in_ticketing}" == "False"    Click Ticketing Panel
    Run Keyword If    "${destination_page}" == "Ticketing Instructions"    Click Ticketing Instructions Tab
    ...   ELSE IF    "${destination_page}" == "Ticketing Line"    Click Ticketing Line Tab

Navigate From Queue
    [Arguments]    ${destination_page}
    ${in_queue}    Run Keyword And Return Status    Should Contain     ${queue_pages}    ${current_page}
    Run Keyword If    "${in_queue}" == "False"    Click Queue Panel
    Run Keyword If    "${destination_page}" == "Follow-Up Queue"    Click Follow-Up Queue Tab
    ...    ELSE IF    "${destination_page}" == "OFC Documentation And Queue"    Click OFC Documentation And Queue Tab
    ...    ELSE IF    "${destination_page}" == "Queue Placement"    Click Queue Placement Tab
    
Navigate From Itinerary And Queue
    [Arguments]    ${destination_page}
    ${in_itinerary_and_queue}    Run Keyword And Return Status    Should Contain     ${itinerary_and_queue_pages}    ${current_page}
    Run Keyword If    "${in_itinerary_and_queue}" == "False"    Click Itinerary And Queue Panel
    Run Keyword If    "${destination_page}" == "Follow-Up Queue S"    Click Follow-Up Queue Tab
    ...    ELSE IF    "${destination_page}" == "CWT Itinerary"    Click CWT Itinerary Tab
       
Click Itinerary And Queue Panel
    Wait Until Element Is Visible    ${panel_itinerary_and_queue}    60
    Click Element    ${panel_itinerary_and_queue}
    Set Test Variable    ${current_page}    Itinerary And Queue

Finish PNR
    [Arguments]     ${close_corporate_test}=yes     ${queueing}=no
    ${in_full_wrap}    Run Keyword And Return Status    Should Contain    ${full_wrap_pages}    ${current_page}
    ${in_itinerary_and_queue}    Run Keyword And Return Status    Should Contain    ${itinerary_and_queue_pages}    ${current_page}
    ${in_cancel_segments}    Run Keyword And Return Status    Should Contain    ${cancel_segment_pages}    ${current_page}
    Run Keyword If    "${pnr_submitted}" == "no" and "${in_full_wrap}" == "True"     Submit To PNR    ${close_corporate_test}    ${queueing}
    ...    ELSE IF    "${pnr_submitted}" == "no" and "${in_itinerary_and_queue}" == "True"     Click Submit To PNR    ${close_corporate_test}    ${queueing}
    ...    ELSE IF    "${pnr_submitted}" == "no" and "${in_cancel_segments}" == "True"    Fill Up Required And Cancel Segments
    ${status}     Run Keyword And Return Status    Should Not Be Empty  ${pnr_details}
    Run Keyword If    "${status}" == "False"    Run Keywords        Switch To Graphic Mode    Get PNR Details

Fill Up Required And Cancel Segments
     Run Keyword If     "${cancel_segments_complete}" == "no"    Cancel All Segments
     # Run Keyword If     "${non_bsp_ticket_credit_complete}" == "no"    Fill Up NonBSP Ticket Credit With Default Values
     Click Cancel Segment Button
    
Submit To PNR
    [Arguments]    ${close_corporate_test}=yes    ${queueing}=no 
    Run Keyword If    "${current_page}" == "Add Accounting Line"    Click Save Button
    Run Keyword If    "${routing_code_selected}" == "no"     Select Default Value For Routing Code
    Run Keyword If    "${destination_selected}" == "no"    Select Default Value For Destination Code 
    Run Keyword If    "${ticketing_complete}" == "no"     Fill Up Ticketing Panel With Default Values
    Run Keyword If    "${visa_complete}" == "no"    Fill Up Visa And Passport Fields With Default Values
    Run Keyword If    "${actual_counselor_identity}" == "OFC" and "${ofc_documentation_complete}" == "no"    Fill Up OFC Documentation And Queue With Default Values
    Collapse Open Panel
    Click Submit To PNR    ${close_corporate_test}    ${queueing}        
    
Click Ticketing Panel
    Wait Until Element Is Visible    ${panel_ticketing}    60
    Scroll Element Into View    ${panel_ticketing}
    Click Element    ${panel_ticketing}
    Set Test Variable    ${current_page}    Ticketing
    
Collapse Ticketing Panel
    Wait Until Element Is Visible    ${panel_ticketing}    60
    Scroll Element Into View     ${panel_payment}
    Click Element    ${panel_ticketing}
    Set Test Variable    ${current_page}    Full Wrap PNR

Select Counselor Identity: ${identity}
    ${in_corp}    Run Keyword And Return Status    Should Contain    ${full_wrap_pages}    ${current_page}
    Run Keyword If    "${in_corp}" == "False"    Navigate To Page CWT Corporate
    Wait Until Page Contains Element    ${list_counselor_identity}    30
    Select From List By Label    ${list_counselor_identity}     ${identity}
    Set Test Variable    ${actual_counselor_identity}    ${identity}
    
Verify UDID 86 Remark Is Not Written In The PNR
    Finish PNR
    Verify Specific Remark Is Not Written In The PNR    RM *U86
    
Verify UDID 86 Remark Is Written Correctly In The PNR
    Finish PNR
    Verify Specific Remark Is Written In The PNR    RM *U86/-OVERRIDE ${actual_counselor_identity}
     
Click Fees Panel
    Wait Until Element Is Visible    ${panel_fees}    60
    Click Element    ${panel_fees}
    Set Test Variable    ${current_page}    Fees
    
Collapse Fees Panel
    Wait Until Element Is Visible    ${panel_fees}    60
    Scroll Element Into View     ${panel_payment}
    Click Element    ${panel_fees}
    Set Test Variable    ${current_page}    Full Wrap PNR
    
Navigate From Fees
    [Arguments]    ${destination_page}
    Run Keyword If    "${destination_page}" == "Ticketing Line"    Click Ticketing Panel
    Run Keyword If    "${destination_page}" == "Reporting Remarks"    Click Reporting Panel
    
Click Remarks Panel
    Wait Until Element Is Visible    ${panel_remarks}    60
    Click Element    ${panel_remarks}
    Set Test Variable    ${current_page}    Remarks
    
Collapse Remarks Panel
    Wait Until Element Is Visible    ${panel_remarks}    60
    Scroll Element Into View     ${panel_payment}
    Click Element    ${panel_remarks}
    Set Test Variable    ${current_page}    Full Wrap PNR

Click Queue Panel
    Wait Until Element Is Visible    ${panel_queue}    60
    Click Element    ${panel_queue}
    Set Test Variable    ${current_page}    Queue
    
Collapse Queue Panel
    Wait Until Element Is Visible    ${panel_queue}    60
    Scroll Element Into View     ${panel_payment}
    Click Element    ${panel_queue}
    Set Test Variable    ${current_page}    Full Wrap PNR
    
Get Other Remark Values From Json
    [Arguments]    ${json_file_object}     ${client_data}
    : FOR    ${i}    IN RANGE    0     99
    \    ${i}    Evaluate    ${i} + 1
    \    ${exists}     Run Keyword And Return Status      Get Json Value As String    ${json_file_object}    $.['${client_data}'].OtherRemarks${i}
    \    ${other_rmk}     Run Keyword If    "${exists}" == "True"     Get Json Value As String    ${json_file_object}    $.['${client_data}'].OtherRemarks${i}
    \    Set Test Variable    ${other_rmk_${i}}     ${other_rmk}
    \    Exit For Loop If    "${exists}" == "False" or "${other_rmk_${i}}" == "None" 
    
Get Expected Remark Values From Json
    [Arguments]    ${json_file_object}     ${client_data}
    : FOR    ${i}    IN RANGE    0     99
    \    ${i}    Evaluate    ${i} + 1
    \    ${exists}     Run Keyword And Return Status      Get Json Value As String    ${json_file_object}    $.['${client_data}'].ExpectedRemark${i}
    \    ${expected_remark}     Run Keyword If    "${exists}" == "True"     Get Json Value As String    ${json_file_object}    $.['${client_data}'].ExpectedRemark${i}
    \    Set Test Variable    ${expected_remark_${i}}     ${expected_remark}
    \    Exit For Loop If    "${exists}" == "False" or "${expected_remark_${i}}" == "None"\

Get Historical Remark Values From Json
    [Arguments]    ${json_file_object}     ${client_data}
    : FOR    ${i}    IN RANGE    0     99
    \    ${i}    Evaluate    ${i} + 1
    \    ${exists}     Run Keyword And Return Status      Get Json Value As String    ${json_file_object}    $.['${client_data}'].HistoricalRemark${i}
    \    ${historical_remark}     Run Keyword If    "${exists}" == "True"     Get Json Value As String    ${json_file_object}    $.['${client_data}'].HistoricalRemark${i}
    \    Set Test Variable    ${historical_remark_${i}}     ${historical_remark}
    \    Exit For Loop If    "${exists}" == "False" or "${historical_remark_${i}}" == "None"  

Get Unexpected Remark Values From Json
    [Arguments]    ${json_file_object}     ${client_data}
    : FOR    ${i}    IN RANGE    0     99
    \    ${i}    Evaluate    ${i} + 1
    \    ${exists}     Run Keyword And Return Status      Get Json Value As String    ${json_file_object}    $.['${client_data}'].UnexpectedRemark${i}
    \    ${unexpected_remark}     Run Keyword If    "${exists}" == "True"     Get Json Value As String    ${json_file_object}    $.['${client_data}'].UnexpectedRemark${i}
    \    Set Test Variable    ${unexpected_remark_${i}}     ${unexpected_remark}
    \    Exit For Loop If    "${exists}" == "False" or "${unexpected_remark_${i}}" == "None" 

Get Test Data From Json     
    [Arguments]    ${file_name}     ${client_data}
    ${json_file_object}    Get File    ${file_name}.json     encoding=iso-8859-1    encoding_errors=strict
    Get Passenger Info From Json     ${json_file_object}    ${client_data}
    Get Air Segment Values From Json     ${json_file_object}    ${client_data}
    Get Other Remark Values From Json     ${json_file_object}    ${client_data}
    Get Expected Approval Values From Json    ${json_file_object}    ${client_data}
    Get Historical Remark Values From Json    ${json_file_object}    ${client_data}
    ${num_car_segments}    Get Json Value As String    ${json_file_object}    $.['${client_data}'].NumCarSegments
    ${num_htl_segments}    Get Json Value As String    ${json_file_object}    $.['${client_data}'].NumHotelSegments
    Set Test variable    ${num_car_segments}
    Set Test variable    ${num_htl_segments}
    
Get Passenger Info From Json
    [Arguments]    ${json_file_object}     ${client_data}
    ${psngr_1}    Get Json Value As String    ${json_file_object}    $.['${client_data}'].PassengerName1
    ${cfa}    Get Json Value As String    ${json_file_object}    $.['${client_data}'].Client
    ${udid50}    Get Json Value As String    ${json_file_object}    $.['${client_data}'].Udid50
    ${udid25}    Get Json Value As String    ${json_file_object}    $.['${client_data}'].Udid25
    ${email}    Get Json Value As String    ${json_file_object}    $.['${client_data}'].Email
    ${consultant_num}    Get Json Value As String    ${json_file_object}    $.['${client_data}'].ConsultantNo
    ${tkt_line}    Get Json Value As String    ${json_file_object}    $.['${client_data}'].TicketingLine
    ${form_of_payment}    Get Json Value As String    ${json_file_object}    $.['${client_data}'].FormOfPayment
    Set Test Variable    ${psngr_1}
    Set Test Variable    ${cfa}
    Set Test Variable    ${udid50}
    Set Test Variable    ${udid25}
    Set Test Variable    ${email}
    Set Test Variable    ${consultant_num}
    Set Test Variable    ${tkt_line}
    Set Test Variable    ${form_of_payment}

Get Expected Approval Values From Json
    [Arguments]    ${json_file_object}     ${client_data}
    ${with_ui}    Get Json Value As String    ${json_file_object}    $.['${client_data}'].WithUI
    ${ignore_approval}    Get Json Value As String    ${json_file_object}    $.['${client_data}'].IgnoreApproval
    ${primary_approval_reason}    Get Json Value As String    ${json_file_object}    $.['${client_data}'].PrimaryApprovalReason
    ${secondary_approval_reason}    Get Json Value As String    ${json_file_object}    $.['${client_data}'].SecondaryApprovalReason
    ${approver_name}    Get Json Value As String    ${json_file_object}    $.['${client_data}'].ApproverName
    ${total_cost}    Get Json Value As String    ${json_file_object}    $.['${client_data}'].TotalCost
    ${addtl_message}    Get Json Value As String    ${json_file_object}    $.['${client_data}'].AdditionalMessage
    ${queue_approval}    Get Json Value As String    ${json_file_object}    $.['${client_data}'].QueueToApproval
    ${onhold_rmk}    Get Json Value As String    ${json_file_object}    $.['${client_data}'].OnHoldRmk
    ${queue_tkt}    Get Json Value As String    ${json_file_object}    $.['${client_data}'].QueueToTkt
    Get Expected Remark Values From Json    ${json_file_object}     ${client_data}
    Get Unexpected Remark Values From Json    ${json_file_object}     ${client_data}
    Set Test Variable    ${with_ui}
    Set Test Variable    ${ignore_approval}
    Set Test Variable    ${primary_approval_reason}
    Set Test Variable    ${secondary_approval_reason}
    Set Test Variable    ${approver_name}
    Set Test Variable    ${total_cost}
    Set Test Variable    ${addtl_message}
    Set Test Variable    ${queue_approval}
    Set Test Variable    ${onhold_rmk}
    Set Test Variable    ${queue_tkt}

Get Air Segment Values From Json
    [Arguments]    ${json_file_object}     ${client_data}
    ${num_air_segments}    Get Json Value As String    ${json_file_object}    $.['${client_data}'].NumAirSegments
    Set Test variable    ${num_air_segments}
    : FOR     ${i}    IN RANGE    1    5
    \    ${air_seg_route}    Get Json Value As String    ${json_file_object}    $.['${client_data}'].AirSegmentRoute${i}
    \    ${airline_code}    Get Json Value As String   ${json_file_object}    $.['${client_data}'].AirlineCode${i}
    \    ${price_cmd}    Get Json Value As String    ${json_file_object}    $.['${client_data}'].PriceCommand${i}
    \    Set Test Variable    ${air_seg_route_${i}}    ${air_seg_route}
    \    Set Test Variable    ${airline_code_${i}}    ${airline_code}
    \    Set Test Variable    ${price_cmd_${i}}    ${price_cmd}
    \    ${i}    Evaluate    ${i} + 1

Verify Expected Remarks Are Written In The PNR
    [Arguments]    ${multi_line_remark}=False
    : FOR    ${i}    IN RANGE   0    99
    \    ${i}    Evaluate    ${i} + 1
    \    ${exists}     Run Keyword And Return Status      Should Not Be Empty    ${expected_remark_${i}}
    \    Run Keyword If    "${exists}" == "True" and "${expected_remark_${i}}" != "None"     Verify Specific Remark Is Written In The PNR   ${expected_remark_${i}}    ${multi_line_remark}
    \    Exit For Loop If    "${exists}" == "False"
   
Verify Unexpected Remarks Are Not Written In The PNR
    : FOR    ${i}    IN RANGE   0    99
    \    ${i}    Evaluate    ${i} + 1
    \    ${exists}     Run Keyword And Return Status      Should Not Be Empty    ${unexpected_remark_${i}}
    \    Run Keyword If    "${exists}" == "True" and "${unexpected_remark_${i}}" != "None"     Verify Specific Remark Is Not Written In The PNR   ${unexpected_remark_${i}}
    \    Exit For Loop If    "${exists}" == "False"  

Verify Remarks Are Added Correctly In The PNR
    Finish PNR   queueing=yes
    Verify Expected Remarks Are Written In The PNR
    
Verify Remarks Are Not Found In The PNR
    Finish PNR   queueing=yes
    Verify Unexpected Remarks Are Not Written In The PNR
    
Complete The PNR With Default Values
    Sleep    5
    Enter Cryptic Command    RFCWTTEST
    Enter Cryptic Command    ER
    Enter Cryptic Command    ER
    Enter Cryptic Command    RT  
    
Verify Element Contains Text
    [Arguments]    ${element}    ${text}
    ${value}    Get Value    ${element}
    Run Keyword And Continue On Failure    Should Be Equal As Strings    ${value}    ${text}

Click Send Invoice
    Wait Until Page Contains Element    ${button_send_invoice_itinerary}      180
    Click Element     ${button_send_invoice_itinerary} 
    Wait Until Element Is Visible    ${message_loadingPnr}    180
    Wait Until Page Does Not Contain Element    ${message_loadingPnr}    180
    Wait Until Element Is Visible    ${button_submit_pnr}    30
    Set Test Variable    ${current_page}    Send Invoice/Itinerary
    Set Test Variable    ${pnr_submitted}   no
