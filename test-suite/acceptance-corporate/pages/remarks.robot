*** Settings ***
Library           String
Library           SeleniumLibrary
Library           Collections
Library           Screenshot
Resource          base.robot
Resource          amadeus.robot
Resource          ../../resources/common/api-utilities.txt

*** Variables ***
${button_add_seat}    //button[contains(text(), 'Add Seat')]
${select_seat_remarkOptions}    //select[@id='seatForm']
${input_segment}   //button[@id='button-basic']//input[@formcontrolname='segment']
${list_segment}    //ul[@id='dropdown-basic']
${select_seat_formType}    //select[@id='seatFormType']
${input_seat_number}    css=#seatFormNumber
${button_close}    //button[contains(text(), 'Close')]
${tab_Seats}    //span[contains(text(), 'Seat')]
${tab_ird_remarks}    //span[contains(text(), 'IRD Remarks')]
${row_ird_status}    //tbody[@formarrayname='irdItems']
${select_ird_status}    //select[@id="irdStatus"]
${select_low_savingStatus}    //select[@id="lowSavingStatus"]
${label_ird_savings_value}    //label[contains(text(), '0.00')]
${tab_documentPnr}    css=#documentPnrTab-link
${row_documentPNR}    //div[@formarrayname='items']
${button_addRemark}    //i[@id='add']
${input_document}    //input[@formcontrolname='documentation']

*** Keywords ***
Navigate To Add Seat Remarks
    Click Element    ${tab_Seats}    
    Click Element    ${button_add_seat}    
    Set Test Variable    ${current_page}    Add Seat Remarks
    Set Test Variable    ${ticketing_details_complete}    no
    
Click IRD Remarks Tab
    Wait Until Element Is Visible    ${tab_ird_remarks}     30
    Click Element At Coordinates    ${tab_ird_remarks}     0    0
    Wait Until Page Contains Element    ${tab_ird_remarks}    30
    Set Test Variable    ${current_page}    IRD Remarks
    
    
Click Save Button In Seats Page
    Click Element    ${button_save}
    Wait Until Page Contains Element    ${button_update}     30
    Set Focus To Element    ${button_submit_pnr}
    Set Test Variable    ${current_page}    Seats
    [Teardown]    Take Screenshot
    
Add Canada Domestic Segment And Store Fare
    @{gds_commands}    Create List    AN10JANYYCYEG/AAC    SS1Y1    AN15JANYEGYYC/AAC    SS1Y1    FXP
    Wait Until Element Is Visible    ${label_command_page}    180
    : FOR    ${gds_command}    IN    @{gds_commands}
    \    Input Text    ${input_commandText}    ${gds_command}
    \    Press Key    ${input_commandText}    \\13 
    
Click Add Seat
    Wait Until Element Is Visible    ${button_add_seat}    30
    Click Element    ${button_add_seat}    
    Set Test Variable    ${current_page}    Add Seat Remarks
    Set Test Variable    ${ticketing_details_complete}    no

Add Seat Remarks For Multiple Seat Remarks Options In Single Segment
    Navigate To Page Seats 
    Wait Until Page Contains Element    ${select_seat_remarkOptions}    30
    Select Seat Option    SEATING SUBJECT TO AIRPORT OR ONLINE CHECK IN    2
    Take Screenshot
    
Select Seat Remarks Option
    [Arguments]    @{seat_options}
    ${line_count}    Get Line Count    ${seat_options}
    ${loop_max}    Evaluate    (${line_count} / 4) + 1
    Set Test Variable    ${seat_rmk_opt_index}    0
    Set Test Variable    ${seat_type_index}    1
    Set Test Variable    ${seat_no_index}    2
    Set Test Variable    ${segment_no_index}    3    
    : FOR    ${index}    IN RANGE    1    ${loop_max}
    \    Select From List By Label    ${select_seat_remarkOptions}    ${seat_options[${seat_rmk_opt_index}]}
    \    ${is_visible_1}    Run Keyword And Return Status     Page Should Contain Element    ${select_seat_formType}
    \    Run Keyword If    "${is_visible_1}" == "True"     Select From List By Label     ${select_seat_formType}    ${seat_options[${seat_type_index}]}
    \    ${is_visible_2}    Run Keyword And Return Status     Page Should Contain Element    ${input_seat_number}
    \    Run Keyword If    "${is_visible_2}" == "True"     Enter Value     ${input_seat_number}    ${seat_options[${seat_no_index}]}
    \    Select Itinerary Segments    ${seat_options[${segment_no_index}]}
    \    Click Save Button In Seats Page
    \    ${seat_rmk_opt_index}    Evaluate    ${seat_rmk_opt_index} + 4
    \    ${seat_type_index}    Evaluate    ${seat_type_index} + 4
    \    ${seat_no_index}    Evaluate    ${seat_no_index} + 4
    \    ${segment_no_index}    Evaluate    ${segment_no_index} + 4
    \    ${index}    Evaluate   ${index} + 1

Select Seat Option
       [Arguments]    ${seat_option}    ${segment_select}    ${seat_type}=${EMPTY}    ${seat_number}=${EMPTY}
       : FOR    ${seat_option}    IN    @{seat_option}
       \    Wait Until Page Contains Element    ${select_seat_remarkOptions}    30
       \    Select From List By Label    ${list_of_seatOption}    ${select_seat_remarkOptions}
       \    ${status_1}    Run Keyword And Return Status    Page Should Contain Element    ${select_seat_formType}
       \    ${status_2}    Run Keyword And Return Status    Page Should Contain Element    ${input_seat_number}
       \    Run Keyword If    '${status_1}' == 'True'    Select From List By Label    ${select_seat_formType}    ${seat_type}
       \    Run Keyword If    '${status_2}' == 'True'    Enter Value     ${input_seat_number}    ${seat_number}
       \    Click Button    ${button_save}
       \    Take Screenshot    
       
Click Document PNR Tab
    Wait Until Element Is Visible    ${tab_documentPnr}    30
    Click Element    ${tab_documentPnr}
    Set Test Variable    ${current_page}    Document PNR
    
Populate Document PNR 
    Enter Value    ${row_documentPNR}[1]${input_document}    Testing Document PNR Remark

Click Add Remark Button ${button_no}
    Click Element   ${row_documentPNR}[${button_no}]${button_addRemark}
    
Populate Multiple Document PNR
    [Arguments]    @{document_values}
    Set Test Variable   ${document_index}    0
    : FOR    ${document_values}    IN    @{document_values}
    \    ${document_index}    Evaluate    ${document_index} + 1
    \    Enter Value    ${row_documentPNR}[${document_index}]${input_document}    ${document_values}  
    \    Click Add Remark Button ${document_index}
    \    Set Test Variable   ${document_index}
    \    Exit For Loop If  "${document_index}" == "4"    
    Take Screenshot
    
Verify That Multiple Document PNR Can Be Added
    Navigate To Page Document PNR
    Populate Multiple Document PNR    Testing Document PNR Remark 1    Testing Document PNR Remark 2    Testing Document PNR Remark 3    Testing Document PNR Remark 4

Verify That Single Document PNR Can Be Added
    Navigate To Page Document PNR
    Enter Value    ${row_documentPNR}[1]${input_document}    Testing Document PNR Remark
    Take Screenshot
    
Verify That Document PNR Remarks Are Written In The PNR
    Finish PNR
    Verify Expected Remarks Are Written In The PNR
    
#-----------IRD Keywords And Verifiation---------------#

Verify IRD Status Default Value Is Correct For ${ird_default_status} For Multi Segment
    Set Test Variable    ${ird_default_status}    
    ${actual_ird_status}    Get Element Attribute    ${select_ird_status}    ng-reflect-value
    Run Keyword If    "${label_ird_savings_value}" == "0.00"    Should Contain    ${row_ird_status}[1]${select_ird_status}    NO LFO
    
Verify IRD Status Default Value Is Correct For ${ird_default_status} For Single Segment
    Set Test Variable    ${ird_default_status}    
    ${actual_ird_status}    Get Element Attribute    ${select_ird_status}    ng-reflect-value
    Run Keyword If    "${label_ird_savings_value}" == "20.00"    Should Contain    ${row_ird_status}[3]${select_ird_status}    ACCEPTEDCP

Select ${ird_status} As IRD Status With Value For Savings
    Set Test Variable    ${ird_status}    
    Select From List By Label    ${row_ird_status}[2]${select_ird_status}    ACCEPTEDCP
    
Select IRD Status With Multiple Pricing And Segment In The PNR
    Wait Until Element Is Visible    ${row_ird_status}    
    Select From List By Label    ${row_ird_status}[2]${select_ird_status}    ACCEPTEDCP
    Select From List By Label    ${row_ird_status}[2]${select_ird_status}    DECLINED
    Select From List By Label    ${row_ird_status}[2]${select_low_savingStatus}    ACCEPTEDLFO
    Select From List By Label    ${row_ird_status}[3]${select_ird_status}    DECLINED
    Select From List By Label    ${row_ird_status}[3]${select_low_savingStatus}    DECLINED
    
Select IRD Status With Single Pricing And Segment In The PNR
    Wait Until Element Is Visible    ${row_ird_status} 
    Select From List By Label    ${row_ird_status}[1]${select_low_savingStatus}    ACCEPTEDLFO

Verify If IRD Status Are Written Correctly For Multi Segment In The PNR
    Verify IRD Status Default Value Is Correct For NO LFO For Multi Segment
    Select IRD Status With Multiple Pricing And Segment In The PNR
    Finish PNR  
    Verify Expected Remarks Are Written In The PNR  
    
Verify If IRD Status Are Written Correctly For Single Segment In The PNR
    Select IRD Status With Single Pricing And Segment In The PNR
    Verify IRD Status Default Value Is Correct For ACCEPTEDCP For Single Segment
    Finish PNR  
    Verify Expected Remarks Are Written In The PNR  