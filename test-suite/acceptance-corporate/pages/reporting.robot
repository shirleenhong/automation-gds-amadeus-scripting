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
    Wait Until Page Contains Element    ${checkbox_clientReporting}     
    Select Checkbox    ${tab_clientReporting}[1]${checkbox_clientReporting}
    Enter Full Fare    1123.50
    Enter Low Fare    300.00
    Select Reason Code    A : Lowest Fare Accepted
    
Add Client Reporting Values For Multiple BSP Segment
    Navigate To Page Reporting
    Wait Until Page Contains Element    ${tab_clientReporting}[3]${checkbox_clientReporting}    60
    Select Checkbox    ${tab_clientReporting}[1]${checkbox_clientReporting}
    Select Checkbox    ${tab_clientReporting}[2]${checkbox_clientReporting}
    Select Checkbox    ${tab_clientReporting}[3]${checkbox_clientReporting}
    Enter Full Fare    1123.50
    Enter Low Fare    300.00
    Select Reason Code    C : Low Cost Supplier Fare Declined
    Enter Full Fare    999.50    2
    Enter Low Fare    123.00    2
    Select Reason Code    K : Client Negotiated Fare Declined    2
    Enter Full Fare    790.00    3
    Enter Low Fare    678.00    3
    Select Reason Code    5 : Fare not in compliance    3
    
Verify That Client Reporting Remarks Are Written In The PNR For Single TST
    Finish PNR
    Verify Specific Remark Is Written In The PNR    RM *FF/-1123.50/S2
    Verify Specific Remark Is Written In The PNR    RM *LP/-300.00/S2
    Verify Specific Remark Is Written In The PNR    RM *FS/-A/S2
   
Verify That Client Reporting Remarks Are Written In The PNR For Multiple TSTs
    Finish PNR
    Verify Specific Remark Is Written In The PNR    RM *FF/-1123.50/S2-3
    Verify Specific Remark Is Written In The PNR    RM *LP/-300.00/S2-3
    Verify Specific Remark Is Written In The PNR    RM *FS/-C/S2-3
    Verify Specific Remark Is Written In The PNR    RM *FF/-999.50/S4
    Verify Specific Remark Is Written In The PNR    RM *LP/-123.00/S4
    Verify Specific Remark Is Written In The PNR    RM *FS/-K/S4
    Verify Specific Remark Is Written In The PNR    RM *FF/-790.00/S5
    Verify Specific Remark Is Written In The PNR    RM *LP/-678.00/S5
    Verify Specific Remark Is Written In The PNR    RM *FS/-5/S5

Verify Client Reporting Fields For Non-BSP Segments
    Click Reporting Panel
    Click Element    ${tab_nonBsp}
    Wait Until Element Is Visible    ${input_full_fare}
    Element Should Be Visible    ${input_full_fare}   
    Element Should Be Visible    ${input_low_fare}
    Element Should Be Visible    ${list_reason_code}
    Take Screenshot    
    
Select Client Reporting Fields To Be Written
    Navigate To Page Reporting   
    Wait Until Page Contains Element    ${checkbox_clientReporting}
    Select Checkbox    ${tab_clientReporting}[1]${checkbox_clientReporting}
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

Verify That BSP Client Reporting Remarks Are Written In The PNR For Exchange TST
    Finish PNR
    Verify Specific Remark Is Written In The PNR    RM *FF/-120.00/S2
    Verify Specific Remark Is Written In The PNR    RM *LP/-120.00/S2
    Verify Specific Remark Is Written In The PNR    RM *FS/-E/S2
    
Verify That Accounting Remark Is Written Correctly For Non BSP Airline Pass Purchase
    Switch To Graphic Mode
    Get PNR Details
    Verify Specific Remark Is Written In The PNR    RM *FF/-127.25/S2
    Verify Specific Remark Is Written In The PNR    RM *LP/-127.25/S2
    Verify Specific Remark Is Written In The PNR    RM *FS/-L/S2
    Switch To Command Page
    
Verify Accounting Remark Is Written Correctly For Non BSP Exchange
    Finish PNR
    Verify Specific Remark Is Written In The PNR    RM *FF/-1111.20/S2
    Verify Specific Remark Is Written In The PNR    RM *LP/-1111.20/S2
    Verify Specific Remark Is Written In The PNR    RM *FS/-E/S2