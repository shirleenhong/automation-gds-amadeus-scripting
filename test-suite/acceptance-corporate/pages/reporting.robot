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

*** Keywords ***
Click BSP Reporting Tab
    Wait Until Element Is Visible    ${tab_bsp}    30
    Click Element    ${tab_bsp}
    Set Test Variable    ${current_page}    BSP Reporting

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

Enter Full Fare
    [Arguments]    ${full_fare_value}    ${tst_number}=1
    Enter Value    ${fare_row_number}[${tst_number}]${input_full_fare}    ${full_fare_value}

Enter Low Fare
    [Arguments]    ${low_fare_value}    ${tst_number}=1
    Enter Value    ${fare_row_number}[${tst_number}]${input_low_fare}    ${low_fare_value}

Select Reason Code
    [Arguments]    ${reason_code_value}    ${tst_number}=1
    Select From List By Label    ${fare_row_number}[${tst_number}]${list_reason_code}    ${reason_code_value}

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
    Wait Until Page Contains Element    ${tab_clientReporting}[3]${checkbox_clientReporting}    60
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
    Wait Until Page Contains Element    ${tab_clientReporting}[2]${checkbox_clientReporting}    60
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
    \    Select Checkbox    ${tab_clientReporting}[${reporting_checkbox}]${checkbox_clientReporting}
    Take Screenshot

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
    
Select Waivers Code Option ${waiver_code} #ANC/50�- NAME CHANGE
    Navigate To Page Reporting
    Click Element    #waiversTab
    Wait Until Page Contains Element    #CodeListField    30     
    Select From List By Value    ${waiver_code}

Select Multiple Waiver Code Options
    [Arguments]    @{waiver_codes}
     Wait Until Page Contains Element    #CodeListField    30
     : FOR      &{waiver_codes}   IN    @{waiver_codes}
     \    #keyword to selet waiver codes
     Take Screenshot    

Enter Amount For Waiver Code ${waiver_code}
    Input Text    locator    text 
    
Select Multiple Waiver Code Options For Single Ticket
    Navigate To Page Reporting
    Click Element    #waiversTab
    Wait Until Page Contains Element    #CodeListField    30     
    Select Multiple Waiver Code Options
    Enter Amount For Waiver Code ${waiver_code}

Select Multiple Waiver Code Options For Multiple Tickets
    Navigate To Page Reporting
    Click Element    #waiversTab
    Wait Until Page Contains Element    #CodeListField    30     
    Select Multiple Waiver Code Options
    Enter Amount For Waiver Code ${waiver_code}

Verify That Waivers Code ${u63_code} Is Written In The PNR
    Finish PNR
    Run Keyword If    '${u63_code}' == 'ANC/50'    Verify Specific Remark Is Written In The PNR    RM *U63/-ANCCN150/S2    
    Run Keyword If    '${u63_code}' == 'ANC/50'
    Switch To Command Page

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
    # Click Element At Coordinates    ${tab_matrixReporting}    0    0
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
