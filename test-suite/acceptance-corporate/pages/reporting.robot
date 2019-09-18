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
${tab_nonBsp}    //span[contains(text(), 'NON BSP')]
${tab_bsp}    css=#bspReportingTab-link
${input_nonBsp_fullFare}    //div[@formarrayname='nonbsp']//input[@formcontrolname='highFareText']
${input_nonBsp_lowFare}    //div[@formarrayname='nonbsp']//input[@formcontrolname='lowFareText']

*** Keywords *** 
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
    Navigate To Page Reporting
    Click Element    ${tab_bsp} 
    Wait Until Page Contains Element    ${checkbox_clientReporting}     
    Select Client Reporting Fields To Be Written    1
    ${actual_full_fare}    Get Value    ${input_full_fare}   
    ${actual_low_fare}    Get Value   ${input_low_fare}
    Select Reason Code    A : Lowest Fare Accepted
    Set Test Variable    ${actual_full_fare}
    Set Test Variable    ${actual_low_fare}
    Take Screenshot    
        
Add Client Reporting Values For Multiple BSP Segment
    Navigate To Page Reporting
    Click Element    ${tab_bsp} 
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
    Navigate To Page Reporting
    Click Element    ${tab_bsp} 
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

Verify That Client Reporting Remarks Are Written In The PNR For Multiple Segments And Multiple TSTs
    Finish PNR
    Verify Specific Remark Is Written In The PNR    RM *FF/-12000.50/S3,5-6
    Verify Specific Remark Is Written In The PNR    RM *LP/-1300.00/S3,5-6
    Verify Specific Remark Is Written In The PNR    RM *FS/-C/S3,5-6
    Verify Specific Remark Is Written In The PNR    RM *FF/-15123.50/S2,4
    Verify Specific Remark Is Written In The PNR    RM *LP/-123.00/S2,4
    Verify Specific Remark Is Written In The PNR    RM *FS/-K/S2,4

Verify Client Reporting Fields For Exchange PNR
    Navigate To Page Reporting 
    Click Element    ${tab_bsp} 
    Wait Until Element Is Visible    ${input_full_fare}    30
    ${actual_full_fare}    Get Value    ${input_full_fare}   
    ${actual_low_fare}    Get Value   ${input_low_fare}
    ${actual_reason_code}    Get Value    ${list_reason_code}
    Run Keyword And Continue On Failure    Should Be Equal    ${actual_full_fare}    120.00    
    Run Keyword And Continue On Failure    Should Be Equal   ${actual_low_fare}   120.00 
    Run Keyword And Continue On Failure    Should Be Equal   ${actual_reason_code}    E
    Select Client Reporting Fields To Be Written    1
    Take Screenshot    
    
Verify Client Reporting Fields For Non-BSP
    Navigate To Page Reporting 
    Click Element    ${tab_nonBsp}
    Wait Until Element Is Visible    ${input_full_fare}    30
    ${actual_full_fare}    Get Value    ${input_full_fare}   
    ${actual_low_fare}    Get Value   ${input_low_fare}
    ${actual_reason_code}    Get Value    ${list_reason_code}
    Run Keyword And Continue On Failure    Should Be Equal   ${actual_full_fare}    760.00    
    Run Keyword And Continue On Failure    Should Be Equal   ${actual_low_fare}   760.00 
    Run Keyword And Continue On Failure    Should Be Equal   ${actual_reason_code}    L 
    Take Screenshot   
    
Update Client Reporting Values For Non-BSP
    Navigate To Page Reporting
    Click Element    ${tab_nonBsp}
    Wait Until Element Is Visible    ${input_full_fare}    30
    Enter Value    ${input_nonBsp_fullFare}    1123.50
    Enter Value    ${input_nonBsp_lowFare}    300.00 
    Take Screenshot 
    
Select Client Reporting Fields To Be Written
    [Arguments]    @{reporting_checkbox}  
    Wait Until Page Contains Element    ${checkbox_clientReporting}
    :FOR     ${reporting_checkbox}    IN    @{reporting_checkbox}
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