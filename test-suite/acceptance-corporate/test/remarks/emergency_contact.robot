*** Settings ***
Force Tags        corp
Library           String
Library           SeleniumLibrary
Library           Collections
Library           Screenshot
Resource          ../../pages/amadeus.robot
Resource          ../../pages/remarks.robot
Resource          ../../pages/base.robot
Resource          ../../../resources/common/api-utilities.txt
Test Teardown    Close All Browsers

*** Variables ***
${test_file_name}    emergency_contact
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

*** Test Cases ***
Verify That The Emergency Contact Info Remarks Are Correctly Written When Only Mandatory Fields Are Filled
    [TAGS]    us9677    
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Emergency Contact, Mandatory Fields Only
    Add 2 Emergency Contact For Mandatory Fields Only
    Verify Remarks Are Added Correctly In The PNR
    
Verify That The Emergency Contact Info Remarks Are Correctly Written When All Fields Are Filled
    [TAGS]    us9677    
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Emergency Contact, All Fields
    Add 4 Emergency Contact For All Fields
    Delete Emergency Contact 4
    Verify Remarks Are Added Correctly In The PNR
    Verify Remarks Are Not Found In The PNR
    
Verify That Emergency Contact Tab Is Not Displayed When PNR Contains Passive Segments Only
    [TAGS]    us9677    
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Passive Air Segments For Emergency Contact, Passive Air Segment
    Verify Emerency Contact Tab Is Not Displayed
    Verify Remarks Are Not Found In The PNR
    
Verify That Emergency Contact Tab Is Not Displayed When PNR Does Not Have Any Segments
    [TAGS]    us9677    
    Login To Amadeus Sell Connect Acceptance
    Create PNR For Emergency Contact, No Segments
    Verify Emerency Contact Tab Is Not Displayed
    Verify Remarks Are Not Found In The PNR

*** Keywords ***
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