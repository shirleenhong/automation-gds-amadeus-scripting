*** Settings ***
Library           String
Library           SeleniumLibrary
Library           Collections
Library           Screenshot
Resource          base.robot
Resource          amadeus.robot

*** Variables ***
${button_add_seat}    //button[contains(text(), 'Add Seat Remarks')]
${select_seat_remarkOptions}    //select[@id='seatForm']
${input_segment}   //button[@id='button-basic']//input[@formcontrolname='segment']
${tab_visaAndPassport}     css=#visaPassportTab-link
${list_segment}    //ul[@id='dropdown-basic']
${button_close}    //button[contains(text(), 'Close')]
${tab_Seats}    //span[contains(text(), 'Seat')]
${tab_ird_remarks}    //span[contains(text(), 'IRD Savings Accepted')]
${row_ird_status}    //tbody[@formarrayname='irdItems']
${select_ird_status}    //select[@id="irdStatus"]
${select_low_savingStatus}    //select[@id="lowSavingStatus"]
${label_ird_savings_value}    //label[contains(text(), '0.00')]
${tab_documentPnr}    css=#documentPnrTab-link
${row_documentPNR}    //div[@formarrayname='items']
${button_addRemark}    //i[@id='add']
${input_document}    //input[@formcontrolname='documentation']
${select_seat_Type}    //select[@name='seatType']
${select_segment_number}    //select[@formcontrolname='segment']
${input_seat_number}    //input[@name='seatNumber']
${input_seat_select1}    //input[@name='check1']
${input_seat_select2}    //input[@name='check2']
${input_seat_select3}    //input[@name='check3']
${input_seat_select4}    //input[@name='check4']
${input_seat_select5}    //input[@name='check5']
${input_seat_select6}    //input[@name='check6']
${checkbox_advisorySent}    //input[@id='senttraveladvicory']
${input_citizenship}     css=#citizenship
${input_adviseTo}     css=#passportName
${checkbox_visa}     //input[@formcontrolname='visa']
${row_visa_segment}    //div[@ng-reflect-name='segments']
${text_noIntlMessage}    //span[@class='p3']
${tab_escRemarks}    //span[contains(text(), 'ESC Remarks')]
${input_esc_read_yes}    //input[@id='isESCRead' and @ng-reflect-value='Y']
${input_esc_read_no}    //input[@id='isESCRead' and @ng-reflect-value='N']
${tab_emergency_contact}    css=#emergencyContact-link
${button_add_emergency_contact}    //button[@class='leisureBtnSubmit addContactButton']
${input_ec_name}    //input[@ng-reflect-name='name']
${input_ec_country_code}    //input[@ng-reflect-name='countryCode']
${input_ec_phone}    //input[@ng-reflect-name='phone']
${input_ec_free_flow_text}    //input[@ng-reflect-name='freeFlowText']
${list_ec_passengers}    //select[@ng-reflect-name='passengers']
${button_add}    //i[@id='add']
${button_remove}    //i[@id='remove']
${div_ec_row}    //tab[@id='emergencyContact']//div[@ng-reflect-name='items']

*** Keywords ***
Click Seats Tab
    Wait Until Element Is Visible    ${tab_seats}    30
    Click Element    ${tab_Seats}    
    Click Element    ${button_add_seat}    
    Set Test Variable    ${current_page}    Seats
    Set Test Variable    ${ticketing_details_complete}    no
	
Click ESC Remarks Tab
   Wait Until Element Is Visible    ${tab_escRemarks}    30
   Click Element    ${tab_escRemarks}
   Set Test Variable    ${current_page}    ESC Remarks
    
Click IRD Remarks Tab
    Wait Until Element Is Visible    ${tab_ird_remarks}    30
    Click Element    ${tab_ird_remarks}
    Set Test Variable    ${current_page}    IRD Remarks

Click Document PNR Tab
    Wait Until Element Is Visible    ${tab_documentPnr}    30
    Click Element    ${tab_documentPnr}
    Set Test Variable    ${current_page}    Document PNR
    
Click Visa And Passport Tab
    Wait Until Element Is Visible    ${tab_visaAndPassport}    30
    Click Element    ${tab_visaAndPassport}
    Set Test Variable    ${current_page}    Visa And Passport

Navigate To Add Seat Remarks
    Click Element    ${tab_Seats}    
    Click Element    ${button_add_seat}    
    Set Test Variable    ${current_page}    Add Seat Remarks
    Set Test Variable    ${ticketing_details_complete}    no
    
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
    
Populate Document PNR 
    Enter Value    ${row_documentPNR}${open_bracket}1${close_bracket}${input_document}    Testing Document PNR Remark

Click Add Remark Button ${button_no}
    Click Element   ${row_documentPNR}${open_bracket}${button_no}${close_bracket}${button_addRemark}
    
Populate Multiple Document PNR
    [Arguments]    @{document_values}
    Set Test Variable   ${document_index}    0
    : FOR    ${document_values}    IN    @{document_values}
    \    ${document_index}    Evaluate    ${document_index} + 1
    \    Enter Value    ${row_documentPNR}${open_bracket}${document_index}${close_bracket}${input_document}    ${document_values}  
    \    Click Add Remark Button ${document_index}
    \    Set Test Variable   ${document_index}
    \    Exit For Loop If  "${document_index}" == "4"    
    Take Screenshot
    
Verify That Multiple Document PNR Can Be Added
    Navigate To Page Document PNR
    Populate Multiple Document PNR    Testing Document PNR Remark 1    Testing Document PNR Remark 2    Testing Document PNR Remark 3    Testing Document PNR Remark 4

Verify That Single Document PNR Can Be Added
    Navigate To Page Document PNR
    Enter Value    ${row_documentPNR}${open_bracket}1${close_bracket}${input_document}    Testing Document PNR Remark
    Take Screenshot
    
Verify That Document PNR Remarks Are Written In The PNR
    Finish PNR
    Verify Expected Remarks Are Written In The PNR
    
#-----------IRD Keywords And Verification---------------#

Verify IRD Status Default Value Is Correct For ${ird_default_status} For Multi Segment
    Set Test Variable    ${ird_default_status}    
    ${actual_ird_status}    Get Element Attribute    ${select_ird_status}    ng-reflect-value
    Run Keyword If    "${label_ird_savings_value}" == "0.00"    Should Contain    ${row_ird_status}${open_bracket}1${close_bracket}${select_ird_status}    NO LFO
    
Verify IRD Status Default Value Is Correct For ${ird_default_status} For Single Segment
    Set Test Variable    ${ird_default_status}    
    ${actual_ird_status}    Get Element Attribute    ${select_ird_status}    ng-reflect-value
    Run Keyword If    "${label_ird_savings_value}" == "20.00"    Should Contain    ${row_ird_status}${open_bracket}3${close_bracket}${select_ird_status}    ACCEPTEDCP

Select ${ird_status} As IRD Status With Value For Savings
    Set Test Variable    ${ird_status}    
    Select From List By Label    ${row_ird_status}${open_bracket}2${close_bracket}${select_ird_status}    ACCEPTEDCP
    Select From List By Label    ${row_ird_status}${open_bracket}1${close_bracket}${select_low_savingStatus}    ACCEPTEDLFO
    Take Screenshot    
    [Teardown]    Collapse Remarks Panel
    
Select IRD Status With Multiple Pricing And Segment In The PNR
    Wait Until Element Is Visible    ${row_ird_status}   
    Select From List By Label    ${row_ird_status}${open_bracket}2${close_bracket}${select_ird_status}    ACCEPTEDCP
    Select From List By Label    ${row_ird_status}${open_bracket}2${close_bracket}${select_ird_status}    DECLINED
    Select From List By Label    ${row_ird_status}${open_bracket}2${close_bracket}${select_low_savingStatus}    ACCEPTEDLFO
    Select From List By Label    ${row_ird_status}${open_bracket}3${close_bracket}${select_ird_status}    DECLINED
    Select From List By Label    ${row_ird_status}${open_bracket}3${close_bracket}${select_low_savingStatus}    DECLINED
    Take Screenshot    
    [Teardown]    Collapse Remarks Panel
    
Select Status For IRD
    [Arguments]    @{ird_status}
    Set Test Variable    ${statusfield_index}    1
    : FOR    ${ird_status}    IN    @{ird_status}
    \    #${actual_ird_status}    Get Value    ${row_ird_status}${open_bracket}${statusfield_index}${close_bracket}${select_ird_status}
    \    ${status}    Run Keyword And Return Status    Element Should Be Enabled    ${row_ird_status}${open_bracket}${statusfield_index}${close_bracket}${select_ird_status}
    \    Log    ${status}
    \    Run Keyword If    "${status}" == "True"    Select From List By Label    ${row_ird_status}${open_bracket}${statusfield_index}${close_bracket}${select_ird_status}    ${ird_status}
    \    #Select From List By Label    ${row_ird_status}${open_bracket}${statusfield_index}${close_bracket}${select_ird_status}    ${ird_status}
    \    ${statusfield_index}    Evaluate    ${statusfield_index} + 1
    Take Screenshot
    
IRD Status
    [Arguments]    @{ird_status}
    ${count}    Get Element Count    ${select_ird_status}
    ${loop}    Evaluate    ${count}
    : FOR    ${index}    IN RANGE    1    ${loop}
    \    ${status}    Run Keyword And Return Status    Element Should Be Enabled    ${row_ird_status}${open_bracket}${statusfield_index}${close_bracket}${select_ird_status}
    \    Run Keyword If    "${status}" == "True"    Select From List By Label    ${row_ird_status}${open_bracket}${statusfield_index}${close_bracket}${select_ird_status}    ${ird_status}
    \    ${index}    Evaluate    ${index} + 1

Select IRD Status With Single Pricing And Segment In The PNR
    Wait Until Element Is Visible    ${row_ird_status} 
    Select From List By Label    ${row_ird_status}${open_bracket}1${close_bracket}${select_low_savingStatus}    ACCEPTEDLFO

Verify If IRD Status Are Written Correctly For Single Segment In The PNR
    Navigate To Page IRD Remarks
    Select ACCEPTEDCP As IRD Status With Value For Savings
    Finish PNR  
    Verify Expected Remarks Are Written In The PNR  
    
Verify If IRD Status Are Written Correctly For Multi Segment In The PNR
    Navigate To Page IRD Remarks
    Select IRD Status With Multiple Pricing And Segment In The PNR
    #Verify IRD Status Default Value Is Correct For ACCEPTEDCP For Single Segment
    Finish PNR  
    Verify Expected Remarks Are Written In The PNR
    
#---------Keyword and script For Seats-----------#

Select And Verify Seat Remarks For Option Online Check-in, Preferred And Upgrade
    Navigate To Page Seats
    Wait Until Element Is Visible    ${input_seat_select1}
    Click Element    ${input_seat_select1}    
    Click Element    ${input_seat_select2}
    Select From List By Label    ${select_seat_Type}    WINDOW
    Click Element    ${input_seat_select5}
    Enter Value    ${input_seat_number}    2D
    Take Screenshot    
    Click Save Button In Seats
    Finish PNR
    Verify Expected Remarks Are Written In The PNR

Select And Verify Seat Remarks For Option Waitlist, Request And Clearance Check
    Navigate To Page Seats
    Wait Until Element Is Visible    ${input_seat_select3}
    Select From List By Label    ${select_segment_number}    2
    Click Element   ${input_seat_select3}
    Click Element   ${input_seat_select4}
    Click Element   ${input_seat_select6}
    Take Screenshot    
    Click Save Button In Seats
    Click Element    ${button_add_seat}
    Wait Until Element Is Visible    ${input_seat_select3}
    Select From List By Label    ${select_segment_number}    3
    Click Element   ${input_seat_select3}
    Click Element   ${input_seat_select4}
    Click Element   ${input_seat_select6}
    Take Screenshot    
    Click Save Button In Seats
    Finish PNR
    Verify Expected Remarks Are Written In The PNR    True
    
Fill Up Visa And Passport Fields With Default Values
    Navigate To Page Visa And Passport
    ${is_dom}    Run Keyword And Return Status    Element Should Contain    ${text_noIntlMessage}    * No International Destinations Found in Itinerary *
    Run Keyword If    "${is_dom}" == "False"    Tick Advisory Sent Checkbox
    Run Keyword If    "${is_dom}" == "False"    Enter Value    ${input_citizenship}    CA
    Run Keyword If    "${is_dom}" == "False"    Enter Value    ${input_adviseTo}    Chuck Velasquez
    Set Test Variable    ${visa_complete}    yes
    [Teardown]    Run Keywords    Take Screenshot    Collapse Remarks Panel
    
Tick Advisory Sent Checkbox
    Click Element At Coordinates    ${checkbox_advisorySent}    0    0
    Wait Until Element Is Visible    ${input_citizenship}    
    
Tick Visa Checkbox For Segments ${segments}
    @{segment_list}     Split String    ${segments}    ,
    :FOR    ${row}    IN    @{segment_list}
    \    Click Element    ${row_visa_segment}${open_bracket}${row}${close_bracket}${checkbox_visa}
        
Fill Up Visa And Passport With ${citizenship} Citizenship, Advised To ${advisee} And Leave Visa Unchecked
    Navigate To Page Visa And Passport
    Tick Advisory Sent Checkbox
    Enter Value    ${input_citizenship}    ${citizenship}
    Enter Value    ${input_adviseTo}     ${advisee}
    Set Test Variable    ${visa_complete}    yes
    [Teardown]    Take Screenshot
    
Fill Up Visa And Passport With ${citizenship} Citizenship, Advised To ${advisee} And Select Visa For Segment/s ${segments}
    Navigate To Page Visa And Passport
    Tick Advisory Sent Checkbox
    Enter Value    ${input_citizenship}    ${citizenship}
    Enter Value    ${input_adviseTo}     ${advisee}
    Tick Visa Checkbox For Segments ${segments}
    Set Test Variable    ${visa_complete}    yes
    [Teardown]    Take Screenshot
    
Verify No International Destinations Found in Itinerary Message Is Displayed In Visa And Passport Tab
    Navigate To Page Visa And Passport
    Run Keyword And Continue On Failure    Element Should Contain    ${text_noIntlMessage}    * No International Destinations Found in Itinerary *
    [Teardown]    Take Screenshot
	
Select ${selected_option} In Verify ESC Remarks Have Been Read
   Navigate To Page ESC Remarks
   Click Element At Coordinates    ${input_esc_read_${selected_option.lower()}}    0    0
   Set Test Variable    ${esc_remarks_complete}    yes
   Set Test Variable    ${is_esc_read}   ${selected_option.lower()}
   [Teardown]    Take Screenshot

Verify That ESC Remarks Tab Is Not Displayed
   Navigate To Page Remarks
   Run Keyword And Return Status    Element Should Not Be Visible     ${tab_esc_remarks}
   [Teardown]     Take Screenshot

Verify ESC Remarks Are Written Correctly In The PNR
   Assign Current Date
   Finish PNR
   Run Keyword If    "${is_esc_read}" == "yes"     Verify Agent Read ESC Remarks Are Written In The PNR
    Run Keyword If    "${is_esc_read}" == "no"     Verify Agent Did Not Read ESC Remarks Are Written In The PNR

Verify Agent Read ESC Remarks Are Written In The PNR
    ${in_current_time}    Run Keyword And Return Status     Verify Specific Remark Is Written In The PNR    RME ESC AGENT READ ESC REMARKS/${current_time}/${current_date}
    ${in_current_time_plus}    Run Keyword And Return Status     Verify Specific Remark Is Written In The PNR    RME ESC AGENT READ ESC REMARKS/${current_time_plus}/${current_date}
    Should Be True    ${in_current_time} or ${in_current_time_plus}

Verify Agent Did Not Read ESC Remarks Are Written In The PNR
    ${in_current_time}    Run Keyword And Return Status     Verify Specific Remark Is Written In The PNR    RME ESC AGENT DID NOT HAVE TIME TO READ ESC REMARKS/${current_time}/${current_date}    True
    ${in_current_time_plus}    Run Keyword And Return Status     Verify Specific Remark Is Written In The PNR    RME ESC AGENT DID NOT HAVE TIME TO READ ESC REMARKS/${current_time_plus}/${current_date}    True
    Should Be True    ${in_current_time} or ${in_current_time_plus}    

Verify ESC Remarks Are Not Written In The PNR
   Finish PNR
   Verify Specific Remark Is Not Written In The PNR    RME ESC AGENT
   
Click Save Button In Seats
    Click Element    ${button_save}
    Wait Until Page Contains Element    ${button_update}     30
    Set Focus To Element    ${button_submit_pnr}
    Set Test Variable    ${current_page}    Seats
    [Teardown]    Take Screenshot
    
Click Add Emergency Contact 
    Wait Until Element Is Visible    ${button_add_emergency_contact}    10
    Click Element    ${button_add_emergency_contact}
    Wait Until Element Is Visible    ${input_ec_name}    10

Add ${num_of_contacts} Emergency Contact For Mandatory Fields Only
    Navigate To Page Emergency Contact
    Click Add Emergency Contact
    : FOR     ${index}    IN RANGE    0     ${num_of_contacts}
    \    ${index}    Evaluate    ${index} + 1
    \    Enter Value    ${div_ec_row}${open_bracket}${index}${close_bracket}${input_ec_name}    Contact No One
    \    Enter Value    ${div_ec_row}${open_bracket}${index}${close_bracket}${input_ec_country_code}    US
    \    Enter Value    ${div_ec_row}${open_bracket}${index}${close_bracket}${input_ec_phone}    19871989${index}
    \    Run Keyword If    ${num_of_contacts} > ${index}    Click Element    ${div_ec_row}${open_bracket}${index}${close_bracket}${button_add}
    [Teardown]    Take Screenshot
    
Add ${num_of_contacts} Emergency Contact For All Fields
    Navigate To Page Emergency Contact
    Click Add Emergency Contact
    : FOR     ${index}    IN RANGE    0     ${num_of_contacts}
    \    ${index}    Evaluate    ${index} + 1
    \    Enter Value    ${div_ec_row}${open_bracket}${index}${close_bracket}${input_ec_name}    Contact No One
    \    Enter Value    ${div_ec_row}${open_bracket}${index}${close_bracket}${input_ec_country_code}    US
    \    Enter Value    ${div_ec_row}${open_bracket}${index}${close_bracket}${input_ec_phone}    19871989
    \    Enter Value    ${div_ec_row}${open_bracket}${index}${close_bracket}${input_ec_free_flow_text}    FREE-FLOW-TEXT${index}
    \    Select From List By Value    ${div_ec_row}${open_bracket}${index}${close_bracket}${list_ec_passengers}     P${index}
    \    Run Keyword If    ${num_of_contacts} > ${index}    Click Element    ${div_ec_row}${open_bracket}${index}${close_bracket}${button_add}
    [Teardown]    Take Screenshot

Delete Emergency Contact ${index}
    Click Element    ${div_ec_row}${open_bracket}${index}${close_bracket}${button_remove}
    [Teardown]    Take Screenshot
    
Verify Emerency Contact Tab Is Not Displayed
    Navigate To Page Remarks
    Run Keyword And Continue On Failure    Element Should Not Be Visible    ${tab_emergency_contact}
    [Teardown]    Take Screenshot
    
Click Emergency Contact Tab
    Wait Until Element Is Visible    ${tab_emergency_contact}    30
    Click Element    ${tab_emergency_contact}    
    Set Test Variable    ${current_page}    Emergency Contact