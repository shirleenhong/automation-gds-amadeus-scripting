*** Settings ***
Library           String
Library           SeleniumLibrary
Library           Collections
Library           Screenshot
Resource          base.robot

*** Variables ***
${fare_row_number}    //div[@formarrayname='fares']
${input_full_fare}    //input[@formcontrolname='highFareText']
${input_low_fare}    //input[@formcontrolname='lowFareText']
${list_reason_code}    //select[@formcontrolname='reasonCodeText']
${tab_clientReporting}    //div[@formarrayname='fares']
${checkbox_clientReporting}    //input[@id='chkIncluded']
${tab_nonBsp}     //span[contains(text(), 'NON BSP')]
${tab_bsp}        css=#bspReportingTab-link
${tab_matrixReporting}    //span[contains(text(), 'Matrix Reporting')]
${input_nonBsp_fullFare}    //div[@formarrayname='nonbsp']//input[@formcontrolname='highFareText']
${input_nonBsp_lowFare}    //div[@formarrayname='nonbsp']//input[@formcontrolname='lowFareText']
${input_cic_number}    //input[@formcontrolname='cicNumber']
${input_file_finisher_yes}    //input[@id="rbFileFinisher"][@ng-reflect-value='YES']
${input_file_finisher_no}    //input[@id="rbFileFinisher"][@ng-reflect-value='NO']
${tab_waivers}   //span[contains(text(), 'Waivers')]
${tab_reportingRemarks}       //span[contains(text(), 'Reporting Remarks')]
${list_routing_code}    //select[@formcontrolname='bspRouteCode']
${button_addWaiver}    //i[@id='add']
${list_waivers}    //select[@id='waiver']
${button_removeWaiver}    css=#remove
${input_waiver}    css=#waiver
${input_waiverAmount}    css=#waiverText
${form_segments}    //tbody[@formarrayname='segments']
${input_destination}    //input[@id='destinationList']
${input_car_savings_code_start}    //div[@ng-reflect-name='
${input_carSavings_checkBox_end}    ']//input[@name='chkIncluded']
${select_carSavings_reasonCode_end}    ']//select[@name='carReasonCode']
${tab_car_savings_code}    //span[contains(text(), 'Car Savings Code')]
${list_agent_assisted}     css=#ebR
${input_tool_identifier}    //input[@formcontrolname='ebT']
${input_online_format}     //input[@formcontrolname='ebN']
${list_touch_reason}     css=#ebC
${tab_hotelSavingsCode}    css=#hotelSegmentsTab-link
${list_hotelSavings}    ]//select[@formcontrolname='hotelSavingsCode']
${row_hotels}    //div[@formarrayname='hotels'][
${checkbox_hotelSegment}    ]//input[@id='chkIncluded']
${input_hotelSegNum}    ]//input[@formcontrolname='segment']
${input_checkInDate}    ]//input[@formcontrolname='checkInDate']
${input_chainCode}    ]//input[@formcontrolname='chainCode']


*** Keywords ***
Click BSP Reporting Tab
    Wait Until Element Is Visible    ${tab_bsp}    30
    Click Element    ${tab_bsp}
    Set Test Variable    ${current_page}    BSP Reporting
    Wait Until Element Is Visible    ${fare_row_number}${open_bracket}1${close_bracket}${list_reason_code}    20

Click Non BSP Reporting Tab
    Wait Until Element Is Visible    ${tab_nonBsp}    30
    Click Element    ${tab_nonBsp}
    Wait Until Page Contains Element    ${input_full_fare}    30
    Set Test Variable    ${current_page}    Non BSP Reporting

Click Matrix Reporting Tab
    Wait Until Element Is Visible    ${tab_matrixReporting}    30
    Click Element    ${tab_matrixReporting}
    Wait Until Element Is Visible    ${input_cic_number}    30
    Set Test Variable    ${current_page}    Matrix Reporting
    
Click Waivers Reporting Tab
    Wait Until Element Is Visible    ${tab_waivers}    30
    Click Element    ${tab_waivers}
    Wait Until Element Is Visible    ${button_addWaiver}    30
    Set Test Variable    ${current_page}    Waivers

Click Reporting Remarks Tab
    Scroll Element Into View     ${tab_reportingRemarks}
    Wait Until Element Is Visible    ${tab_reportingRemarks}    30
    Click Element    ${tab_reportingRemarks}
    Wait Until Page Contains Element    ${list_routing_code}    30
    Set Test Variable    ${current_page}    Reporting Remarks

Click Car Savings Code Tab
    Wait Until Element Is Visible    ${tab_car_savings_code}    30
    Click Element    ${tab_car_savings_code}
    Wait Until Element Is Visible    ${input_car_savings_code_start}0${input_carSavings_checkBox_end}    30
    Set Test Variable    ${current_page}    Car Savings Code
    
Click Hotel Savings Code Tab
    Wait Until Element Is Visible    ${tab_hotelSavingsCode}    30
    Click Element    ${tab_hotelSavingsCode}
    Set Test Variable    ${current_page}    Hotel Savings Code    
    
Enter Full Fare
    [Arguments]    ${full_fare_value}    ${tst_number}=1
    Enter Value    ${fare_row_number}${open_bracket}${tst_number}${close_bracket}${input_full_fare}    ${full_fare_value}

Enter Low Fare
    [Arguments]    ${low_fare_value}    ${tst_number}=1
    Enter Value    ${fare_row_number}${open_bracket}${tst_number}${close_bracket}${input_low_fare}    ${low_fare_value}

Select Reason Code
    [Arguments]    ${reason_code_value}    ${tst_number}=1
    Select From List By Label    ${fare_row_number}${open_bracket}${tst_number}${close_bracket}${list_reason_code}    ${reason_code_value}

Add Client Reporting Values For Single BSP Segment
    Navigate To Page BSP Reporting
    Wait Until Page Contains Element    ${checkbox_clientReporting}    30
    Select Client Reporting Fields To Be Written    1
    ${actual_full_fare}    Get Value    ${input_full_fare}
    ${actual_low_fare}    Get Value    ${input_low_fare}
    Select Reason Code    A : Lowest Fare Accepted
    Set Test Variable    ${actual_full_fare}
    Set Test Variable    ${actual_low_fare}
    Take Screenshot

Add Client Reporting Values For Multiple BSP Segment
    Navigate To Page BSP Reporting
    Wait Until Page Contains Element    ${tab_clientReporting}${open_bracket}3${close_bracket}${checkbox_clientReporting}    60
    Select Client Reporting Fields To Be Written    1    2    3
    Enter Full Fare    4000.50
    Enter Low Fare    300.00
    Select Reason Code    C : Low Cost Supplier Fare Declined
    Enter Full Fare    5123.50    2
    Enter Low Fare    123.00    2
    Select Reason Code    K : Client Negotiated Fare Declined    2
    Enter Full Fare    790.00    3
    Enter Low Fare    678.00    3
    Select Reason Code    5 : Fare not in compliance    3
    Take Screenshot

Add Client Reporting Values For Multiple BSP Segment And Multiple TSTs
    Navigate To Page BSP Reporting
    Wait Until Page Contains Element    ${tab_clientReporting}${open_bracket}2${close_bracket}${checkbox_clientReporting}    60
    Select Client Reporting Fields To Be Written    1    2
    Enter Full Fare    12000.50
    Enter Low Fare    1300.00
    Select Reason Code    C : Low Cost Supplier Fare Declined
    Enter Full Fare    15123.50    2
    Enter Low Fare    123.00    2
    Select Reason Code    K : Client Negotiated Fare Declined    2
    Take Screenshot

Verify That Client Reporting Remarks Are Written In The PNR For Single TST
    Finish PNR
    Verify Specific Remark Is Written In The PNR    RM *FF/-${actual_full_fare}/S2
    Verify Specific Remark Is Written In The PNR    RM *LP/-${actual_low_fare}/S2
    Verify Specific Remark Is Written In The PNR    RM *FS/-A/S2
    Switch To Command Page

Verify Aqua Compliance Tracker Is Written In The PNR
    Get Record Locator Value
    Verify Specific Remark Is Written In The PNR    RM *U70/-${actual_record_locator}
    Switch To Command Page

Verify That Client Reporting Remarks Are Written In The PNR For Multiple TSTs
    Finish PNR
    Verify Specific Remark Is Written In The PNR    RM *FF/-4000.50/S2-3
    Verify Specific Remark Is Written In The PNR    RM *LP/-300.00/S2-3
    Verify Specific Remark Is Written In The PNR    RM *FS/-C/S2-3
    Verify Specific Remark Is Written In The PNR    RM *FF/-5123.50/S4
    Verify Specific Remark Is Written In The PNR    RM *LP/-123.00/S4
    Verify Specific Remark Is Written In The PNR    RM *FS/-K/S4
    Verify Specific Remark Is Written In The PNR    RM *FF/-790.00/S5
    Verify Specific Remark Is Written In The PNR    RM *LP/-678.00/S5
    Verify Specific Remark Is Written In The PNR    RM *FS/-5/S5
    Switch To Command Page

Verify That Client Reporting Remarks Are Written In The PNR For Multiple Segments And Multiple TSTs
    Finish PNR
    Verify Specific Remark Is Written In The PNR    RM *FF/-12000.50/S3,5-6
    Verify Specific Remark Is Written In The PNR    RM *LP/-1300.00/S3,5-6
    Verify Specific Remark Is Written In The PNR    RM *FS/-C/S3,5-6
    Verify Specific Remark Is Written In The PNR    RM *FF/-15123.50/S2,4
    Verify Specific Remark Is Written In The PNR    RM *LP/-123.00/S2,4
    Verify Specific Remark Is Written In The PNR    RM *FS/-K/S2,4
    Switch To Command Page

Verify Client Reporting Fields For Exchange PNR
    Navigate To Page BSP Reporting
    ${actual_full_fare}    Get Value    ${input_full_fare}
    ${actual_low_fare}    Get Value    ${input_low_fare}
    ${actual_reason_code}    Get Value    ${list_reason_code}
    Run Keyword And Continue On Failure    Should Be Equal    ${actual_full_fare}    120.00
    Run Keyword And Continue On Failure    Should Be Equal    ${actual_low_fare}    120.00
    Run Keyword And Continue On Failure    Should Be Equal    ${actual_reason_code}    E
    Select Client Reporting Fields To Be Written    1
    Take Screenshot

Verify Client Reporting Fields For Non-BSP
    Navigate To Page Non BSP Reporting
    ${actual_full_fare}    Get Value    ${input_full_fare}
    ${actual_low_fare}    Get Value    ${input_low_fare}
    ${actual_reason_code}    Get Value    ${list_reason_code}
    Run Keyword And Continue On Failure    Should Be Equal    ${actual_full_fare}    760.00
    Run Keyword And Continue On Failure    Should Be Equal    ${actual_low_fare}    760.00
    Run Keyword And Continue On Failure    Should Be Equal    ${actual_reason_code}    L
    Take Screenshot

Update Client Reporting Values For Non-BSP
    Navigate To Page Non BSP Reporting
    Enter Value    ${input_nonBsp_fullFare}    1123.50
    Enter Value    ${input_nonBsp_lowFare}    300.00
    Take Screenshot

Select Client Reporting Fields To Be Written
    [Arguments]    @{reporting_checkbox}
    Wait Until Page Contains Element    ${checkbox_clientReporting}
    : FOR    ${reporting_checkbox}    IN    @{reporting_checkbox}
    \    Select Checkbox    ${tab_clientReporting}${open_bracket}${reporting_checkbox}${close_bracket}${checkbox_clientReporting}
    [Teardown]    Take Screenshot

Verify That Non-BSP Client Reporting Remarks Are Written In The PNR For Single Segment
    Finish PNR
    Verify Specific Remark Is Written In The PNR    RM *FF/-760.00/S2
    Verify Specific Remark Is Written In The PNR    RM *LP/-760.00/S2
    Verify Specific Remark Is Written In The PNR    RM *FS/-L/S2

Verify That Non-BSP Client Reporting Remarks Are Written In The PNR For Multiple Segments
    Finish PNR
    Verify Specific Remark Is Written In The PNR    RM *FF/-760.00/S2-3
    Verify Specific Remark Is Written In The PNR    RM *LP/-760.00/S2-3
    Verify Specific Remark Is Written In The PNR    RM *FS/-L/S2-3

Verify That Updated Non-BSP Client Reporting Remarks Are Written In The PNR
    Finish PNR
    Verify Specific Remark Is Written In The PNR    RM *FF/-1123.50/S2
    Verify Specific Remark Is Written In The PNR    RM *LP/-300.00/S2
    Verify Specific Remark Is Written In The PNR    RM *FS/-L/S2

Verify That BSP Client Reporting Remarks Are Written In The PNR For Exchange TST
    Finish PNR
    Verify Specific Remark Is Written In The PNR    RM *FF/-120.00/S2
    Verify Specific Remark Is Written In The PNR    RM *LP/-120.00/S2
    Verify Specific Remark Is Written In The PNR    RM *FS/-E/S2
    Switch To Command Page

Verify That Accounting Remark Is Written Correctly For Non BSP Airline Pass Purchase
    Finish PNR
    Verify Specific Remark Is Written In The PNR    RM *FF/-127.25/S2
    Verify Specific Remark Is Written In The PNR    RM *LP/-127.25/S2
    Verify Specific Remark Is Written In The PNR    RM *FS/-L/S2
    Switch To Command Page

Verify Accounting Remark Is Written Correctly For Non BSP Exchange
    Finish PNR
    Verify Specific Remark Is Written In The PNR    RM *FF/-1111.20/S2
    Verify Specific Remark Is Written In The PNR    RM *LP/-1111.20/S2
    Verify Specific Remark Is Written In The PNR    RM *FS/-E/S2

Select File Finisher to ${file_finisher_value}
    Navigate To Page Matrix Reporting
    Run Keyword If    "${file_finisher_value}" == "YES"    Click Element    ${input_file_finisher_yes}
    Run Keyword If    "${file_finisher_value}" == "NO"    Click Element    ${input_file_finisher_no}
    [Teardown]    Take Screenshot

Verify If The Default CIC Number Value Displayed Is ${expected_cic_number}
    Navigate To Page Matrix Reporting
    ${actual_cic_number}    Get Element Attribute    ${input_cic_number}    ng-reflect-model
    Log    Expected: "${expected_cic_number}"
    Log    Actual: "${actual_cic_number}"
    Run Keyword And Continue On Failure    Should Be Equal    ${actual_cic_number}    ${expected_cic_number}
    [Teardown]    Take Screenshot

Enter CIC Number Value: ${cic_number_value}
    Navigate To Page Matrix Reporting
    Clear Element Text    ${input_cic_number}
    Enter Value    ${input_cic_number}    ${cic_number_value}
    Log    Entered in the CIC Number field: "${cic_number_value}"
    [Teardown]    Take Screenshot

Create Exchange and NE Remark For Single Passenger With Single BSP Segment
    Create Exchange NE Remark
    Create Exchange PNR In The GDS
    
Verify CN And NUC Remark Are Written Correctly For Exchanged PNR
    Finish PNR
    Verify Specific Remark Is Written In The PNR    RM *CN/-ADT
    Verify Specific Remark Is Written In The PNR    RM *NUC
    
Verify CN And NUC Remark Are Updated Correctly For Exchanged PNR
    Submit To PNR
    Get PNR Details
    Verify Specific Remark Is Written In The PNR    RM *CN/-IFC
    Verify Specific Remark Is Written In The PNR    RM *NUC

Verify CN And NUC Remark Are Written Correctly For PNR With IFC CN Number Remark
    Finish PNR
    Verify Specific Remark Is Written In The PNR    RM *CN/-QWE
    Verify Specific Remark Is Written In The PNR    RM *NUC
    
Verify CN And NUC Remark Are Written Correctly For PNR With Hotel and Invoice Remark
    Finish PNR
    Verify Specific Remark Is Written In The PNR    RM *CN/-IFC
    Verify Specific Remark Is Written In The PNR    RM *NUC
    
Verify CN And NUC Remark Are Updated Correctly For PNR With Hotel and Invoice Remark
    Submit To PNR
    Get PNR Details
    Verify Specific Remark Is Written In The PNR    RM *CN/-ASD
    Verify Specific Remark Is Written In The PNR    RM *NUC
    
Click Add Waiver Button ${button_no}
    Click Element    ${form_segments}${open_bracket}${button_no}${close_bracket}${button_addWaiver}
    Wait Until Page Contains Element    ${list_waivers}     30

Select Waivers Code Option For Single Ticket
    Navigate To Page Waivers
    Select Waiver Code Options   1   ANC/50 - Name Change 

Select Multiple Waiver Code Options For Single Ticket
    Navigate To Page Waivers
    Select Waiver Code Options   1    ASC/50 - Seat / Waitlist Change    CSR/50 - Car Certificate Usage    HNS - Waived No Show Charge
    Take Screenshot
    
Select Multiple Waiver Code Options For Multiple Tickets
    Navigate To Page Waivers
    Select Waiver Code Options    1    ASC/50 - Seat / Waitlist Change    
    Select Waiver Code Options    2    HSR/50 - Hotel Certificate Usage     HNS - Waived No Show Charge    
    Select Waiver Code Options    3    ANC/50 - Name Change      CSR/50 - Car Certificate Usage      AMT - Client Missed Ticketing   

Select Multiple Waiver Code Options With Values For Multiple Tickets
    Navigate To Page Waivers
    Select Waiver Code Options    1    AFM - Fair Match    AMT - Client Missed Ticketing     
    Select Waiver Code Options    2    HNS - Waived No Show Charge  

Select Waiver Code Options
    [Arguments]   ${tst_no}    @{waiver_codes}
    : FOR      ${waiver_codes}   IN    @{waiver_codes}
    \    Click Add Waiver Button ${tst_no}
    \    Select From List By Label    ${list_waivers}     ${waiver_codes} 
    \    ${status}    Run Keyword And Return Status    Page Should Contain Element    ${input_waiverAmount}
    \    Run Keyword If     '${status}' == 'True'    Enter Value    ${input_waiverAmount}    1234 
    \    Click Button    ${button_save}  
    \    Wait Until Page Contains Element    ${button_removeWaiver}    30  
    \    Click Element At Coordinates    ${input_waiver}    0    0  
    Take Screenshot
  
Verify That Waivers Code Is Written In The PNR
    Finish PNR
    Verify Specific Remark Is Written In The PNR    RM *U63/-ANCCN150/S2    
    Switch To Command Page
    
Verify That Multiple Waiver Codes Are Written In The PNR For Single Ticket
    Finish PNR
    Verify Specific Remark Is Written In The PNR    RM *U63/-ASCCN150/CSRCN150/HNSCN11234/S2-3
    Switch To Command Page
    
Verify That Multiple Waiver Codes Are Written In The PNR For Multiple Tickets
    Finish PNR
    Verify Specific Remark Is Written In The PNR    RM *U63/-ASCCN150/S2-3
    Verify Specific Remark Is Written In The PNR    RM *U63/-HSRCN150/HNSCN11234/S4
    Verify Specific Remark Is Written In The PNR    RM *U63/-ANCCN150/CSRCN150/AMTCN11234/S5
    Switch To Command Page
    
Verify That Multiple Waiver Codes With Values Are Written In The PNR For Multiple Tickets
    Finish PNR
    Verify Specific Remark Is Written In The PNR    RM *U63/-AFMCN11234/AMTCN11234/S3,5-6
    Verify Specific Remark Is Written In The PNR    RM *U63/-HNSCN11234/S2,4
    Switch To Command Page

Verify Routing Code Dropdown Is Displayed With Correct Values
    Navigate To Page Reporting Remarks
    #Click Element    ${list_routing_code}
    ${list}     Get Selected List Labels         ${list_routing_code}
    Log     ${list}
    Run Keyword And Continue On Failure    List Selection Should Be    ${list_routing_code}    USA incl. all US Territories and Possessions    Mexico/Central America/Canal Zone/Costa Rica
    ...    Caribbean and Bermuda    South America    Europe-incl. Morocco/Tunisia/Algeria/Greenland    Africa    Middle East/Western Asia
    ...    Asia incl. India    Australia/New Zealand/Islands of the Pacific incl. Hawaii excl. Guam    Canada and St. Pierre et Miquelon
    
Verify Routing Code Dropdown Is A Required Field
    Fill Up Ticketing Panel With Default Values
    Scroll Element Into View    ${list_routing_code}
    Click Submit To PNR
    Element Should Contain    ${text_warning}     Please make sure all the inputs are valid and put required values!
    
Fill Up Routing Code With ${selection}
    Navigate To Page Reporting Remarks
    Select From List By Label    ${list_routing_code}     ${selection}
    Set Test Variable    ${routing_code_selected}    yes
    [Teardown]    Take Screenshot
    
Verify Country Of Destination Is Mapped In The FS Remark
    Finish PNR
    Verify Expected Remarks Are Written In The PNR
    
Select Default Value For Routing Code
    Run Keyword If    "${destination_selected}" == "no"   Navigate To Page Reporting Remarks
    Select From List By Label    ${list_routing_code}     Canada and St. Pierre et Miquelon
    Run Keyword If    "${destination_selected}" == "no"    Select Default Value For Destination Code 
    Set Test Variable    ${routing_code_selected}    yes
    [Teardown]    Take Screenshot
    
Select Default Value For Destination Code
    Navigate To Page Reporting Remarks
    ${is_destination_present}    Run Keyword And Return Status    Page Should Contain Element    ${input_destination} 
    Run Keyword If    "${is_destination_present}" == "True"   Enter Destination Code Default Value
    Set Test Variable    ${destination_selected}    yes

Enter Destination Code Default Value        
    ${elements_count}    Get Element Count    ${input_destination} 
    Set Test Variable    ${elements_count}
        : FOR    ${destination_index}    IN RANGE    0    ${elements_count}
	    \    ${destination_index}    Evaluate    ${destination_index} + 1
	    \    Enter Value    ${form_segments}${open_bracket}${destination_index}${close_bracket}${input_destination}    YUL
    
Select Destination Code Values
	[Arguments]    @{destination_code}
	Set Test Variable    ${destination_index}    1
	: FOR    ${destination_code}    IN    @{destination_code}
	    \    Enter Value    ${form_segments}${open_bracket}${destination_index}${close_bracket}${input_destination}    ${destination_code}
		\    ${destination_index}    Evaluate    ${destination_index} + 1
	
Populate Destination Code Fields For ${tst_no} TST
    Navigate To Page Reporting Remarks
    Run Keyword If  "${tst_no}" == "Single"   Select Destination Code Values    YUL
    ...  ELSE IF   "${tst_no}" == "Multiple"    Select Destination Code Values   YUL   YYZ   ORD
    Set Test Variable    ${destination_selected}    yes
    Take Screenshot
    
Verify Destination Code Remarks Are Written In The PNR
    Finish PNR
    Verify Expected Remarks Are Written In The PNR
    
Select Reason Code ${reason_code_value} For TST${tst_number}
    Navigate To Page BSP Reporting
    Select From List By Label    ${fare_row_number}${open_bracket}${tst_number}${close_bracket}${list_reason_code}    ${reason_code_value}
    Sleep    2
    Take Screenshot
    
Add Car Savings Code For ${number_of} Segments
    Navigate to Page Car Savings Code
    Add ${number_of} Car Savings Code
    Take Screenshot
    
Add ${number} Car Savings Code
    ${limit}    Evaluate    ${number} - 1
    : FOR    ${index}    IN RANGE    0    ${number}
    \    Click Element    ${input_car_savings_code_start}${index}${input_carSavings_checkBox_end}
    \    Run Keyword If    ${index} == 0    Select From List By Label     ${input_car_savings_code_start}${index}${select_carSavings_reasonCode_end}    I : Sold out
    \    Run Keyword If    ${index} == 1    Select From List By Label     ${input_car_savings_code_start}${index}${select_carSavings_reasonCode_end}    C : Preferred size not available
    \    Run Keyword If    ${index} == 2    Select From List By Label     ${input_car_savings_code_start}${index}${select_carSavings_reasonCode_end}    R : Preferred supplier not in city
    \    Run Keyword If    ${index} == 3    Select From List By Label     ${input_car_savings_code_start}${index}${select_carSavings_reasonCode_end}    W : CWT negotiated rate accepted
    \    Run Keyword If    ${index} == 4    Select From List By Label     ${input_car_savings_code_start}${index}${select_carSavings_reasonCode_end}    X : Booked company preferred car
    \    ${index}    Evaluate   ${index} + 1
    Take Screenshot
    
Verify Car Savings Code Remark For Single Passive Car Segments
    Finish PNR
    Assign Current Date
    Verify Specific Remark Is Written In The PNR    RM *CS${test_date_1}FRA/-SV-I
    Verify Specific Remark Is Not Written In The PNR    RM *CS22MAYFRA/-SV-C

Verify Car Savings Code Remark For Multiple Passive Car Segments
    Finish PNR
    Verify Specific Remark Is Written In The PNR    RM *CS${test_date_1}FRA/-SV-I
    Verify Specific Remark Is Written In The PNR    RM *CS${test_date_2}FRA/-SV-C
    Verify Specific Remark Is Not Written In The PNR    RM *CS23DECPEK/-SV-W
    
Verify Car Savings Code Remark For Single Active Car Segments
    Finish PNR
    Assign Current Date
    Verify Specific Remark Is Written In The PNR    RM *CS${test_date_1}YUL/-SV-I
    
Verify Car Savings Code Remark For Multiple Active Car Segments
    Finish PNR
    Verify Specific Remark Is Written In The PNR    RM *CS${test_date_1}LHR/-SV-I
    Verify Specific Remark Is Written In The PNR    RM *CS${test_date_2}CDG/-SV-C
    
Verify Car Savings Code Remark For Active And Passive Car Segments
    Finish PNR
    Assign Current Date
    Verify Specific Remark Is Written In The PNR    RM *CS21FEBPEK/-SV-I
    Verify Specific Remark Is Written In The PNR    RM *CS${test_date_1}CDG/-SV-C
    Verify Specific Remark Is Written In The PNR    RM *CS${test_date_2}YYZ/-SV-R
    Verify Specific Remark Is Not Written In The PNR    RM *CS23NOVPEK/-SV-X
    Verify Specific Remark Is Not Written In The PNR    RM *CS14DECMEL/-SV-Y

Verify Online Fields And Update Agent Assisted And Touch Reason Codes
    Navigate To Page Reporting Remarks
    Verify Online Touch Reason Fields Are Populated With Correct Values    CT    A    GI    C
    Update Agent Assisted And Touch Reason Code    AM    S
    
Verify Online Touch Reason Fields Are Populated With Correct Values
    [Arguments]    ${expected_agent_assisted}    ${expected_input_tool_identifier}    ${expected_online_format}    ${expected_touch_reason}
    ${actual_agent_assisted}     Get Value    ${list_agent_assisted}
    ${actual_input_tool_identifier}     Get Value    ${input_tool_identifier}
    ${actual_online_format}     Get Value    ${input_online_format}
    ${actual_touch_reason}     Get Value    ${list_touch_reason}
    Should Be Equal    ${actual_agent_assisted}    ${expected_agent_assisted}  
    Should Be Equal    ${actual_input_tool_identifier}    ${expected_input_tool_identifier}
    Should Be Equal    ${actual_online_format}    ${expected_online_format}  
    Should Be Equal    ${actual_touch_reason}    ${expected_touch_reason}
    Take Screenshot

Update Agent Assisted And Touch Reason Code
    [Arguments]   ${agent_assisted}    ${touch_reason}
    Select From List By Value    ${list_agent_assisted}    ${agent_assisted} 
    Select From List By Value    ${list_touch_reason}    ${touch_reason}
    Sleep    2
    Take Screenshot

Verify That Online Touch Reason Fields Are Not Displayed
    Navigate To Page Reporting Remarks
    Page Should Not Contain Element    ${list_agent_assisted}
    Page Should Not Contain Element    ${input_tool_identifier} 
    Page Should Not Contain Element    ${input_online_format} 
    Page Should Not Contain Element    ${list_touch_reason}
    Take Screenshot
    
Verify EB Remark Written In The PNR
    Finish PNR
    Verify Expected Remarks Are Written In The PNR
    
Fill Up Hotel Savings Code With Value ${hotel_savings_code}
    Navigate To Page Hotel Savings Code
    @{codes}     Split String     ${hotel_savings_code}    ,
    ${i}    Set Variable    1    
    : FOR    ${code}    IN    @{codes}
    \    Click Element    ${row_hotels}${i}${checkbox_hotelSegment}
    \    ${date}    Get Value    ${row_hotels}${i}${input_checkInDate}
    \    Run Keyword And Continue On Failure    Should Be Equal    ${date}    ${test_date_${i}}
    \    ${chain_code}    Get Value    ${row_hotels}${i}${input_chainCode}
    \    Run Keyword If    "${chain_code}" == "${EMPTY}"    Enter Value    ${row_hotels}${i}${input_chainCode}    1A
    \    ${chain_code}    Set Variable If    "${chain_code}" == "${EMPTY}"    1A    ${chain_code}
    \    Set Test Variable    ${chain_code_${i}}    ${chain_code}
    \    Select From List By Value    ${row_hotels}${i}${list_hotelSavings}    ${code}
    \    Set Test Variable    ${hotel_savings_code_${i}}    ${code}
    \    ${i}    Evaluate    ${i} + 1
    Take Screenshot

Fill Up Hotel Savings Code Without Value
     Navigate To Page Hotel Savings Code
    ${i}    Set Variable    1    
    : FOR    ${i}    IN RANGE    1     9
    \    Click Element    ${row_hotels}${i}${checkbox_hotelSegment}
    \    ${date}    Get Value    ${row_hotels}${i}${input_checkInDate}
    \    Run Keyword And Continue On Failure    Should Be Equal    ${date}    ${test_date_${i}}
    \    ${chain_code}    Get Value    ${row_hotels}${i}${input_chainCode}
    \    Run Keyword If    "${chain_code}" == "${EMPTY}"    Enter Value    ${row_hotels}${i}${input_chainCode}    1A
    \    ${chain_code}    Set Variable If    "${chain_code}" == "${EMPTY}"    1A    ${chain_code}
    \    Set Test Variable    ${chain_code_${i}}    ${chain_code}
    \    ${next}    Evaluate    ${i} + 1
    \    ${exists}    Run Keyword And Return Status   Element Should Be Visible     ${row_hotels}${next}${checkbox_hotelSegment}
    \    Exit For Loop If    not ${exists}
    Take Screenshot

Verify Hotel Savings Remark Is Written In The PNR
    Finish PNR
   : FOR    ${i}    IN RANGE    1      10
   \    ${status}    Run Keyword And Return Status    Should Not Be Empty     ${hotel_savings_code_${i}}
   \    Run Keyword If    ${status}    Verify Specific Remark Is Written In The PNR    RM *HS${test_date_${i}}/-SV-${hotel_savings_code_${i}}/-CHN-${chain_code_${i}}
   \    ${i}    Evaluate    ${i} + 1
   \    Exit For Loop If   not ${status} 
   Verify Unexpected Remarks Are Not Written In The PNR
   Cancel PNR
    
Verify HS Remark Is Written Without Savings Code
    Finish PNR
    : FOR    ${i}    IN RANGE    1      10
    \    ${status}    Run Keyword And Return Status    Should Not Be Empty     ${chain_code_${i}}
    \    Run Keyword If    ${status}    Verify Specific Remark Is Written In The PNR    RM *HS${test_date_${i}}/-CHN-${chain_code_${i}}
    \    ${i}    Evaluate    ${i} + 1
    \    Exit For Loop If   not ${status} 
    Verify Unexpected Remarks Are Not Written In The PNR
    Cancel PNR