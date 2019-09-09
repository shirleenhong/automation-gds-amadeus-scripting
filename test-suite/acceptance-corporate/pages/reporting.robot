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
${input_reason_code}    //input[@formcontrolname='reasonCodeText']
${tab_clientReporting}    //div[@formarrayname='fares']
${checkbox_clientReporting}    //input[@id='chkIncluded'] 

*** Keywords *** 
Enter Full Fare
    [Arguments]    ${full_fare_value}    ${tst_number}=1
    Enter Value    ${fare_row_number}[${tst_number}]${input_full_fare}    ${full_fare_value}   

Enter Low Fare
    [Arguments]    ${low_fare_value}    ${tst_number}=1
    Enter Value    ${fare_row_number}[${tst_number}]${input_low_fare}    ${low_fare_value}     

Enter Reason Code
    [Arguments]    ${reason_code_value}    ${tst_number}=1
    Enter Value    ${fare_row_number}[${tst_number}]${input_reason_code}    ${reason_code_value}  

Add Client Reporting Values For Single BSP Segment
    Click Reporting Panel
    Wait Until Page Contains Element    ${checkbox_clientReporting}     
    Select Checkbox    ${tab_clientReporting}[1]${checkbox_clientReporting}
    Enter Full Fare    1123.50
    Enter Low Fare    300.00
    Enter Reason Code    A : Lowest Fare Accepted
    
Add Client Reporting Values For Multiple BSP Segment
    Click Reporting Panel
    Wait Until Page Contains Element    ${tab_clientReporting}[3]${checkbox_clientReporting}    60
    Select Checkbox    ${tab_clientReporting}[1]${checkbox_clientReporting}
    Select Checkbox    ${tab_clientReporting}[2]${checkbox_clientReporting}
    Select Checkbox    ${tab_clientReporting}[3]${checkbox_clientReporting}
    Enter Full Fare    1123.50
    Enter Low Fare    300.00
    Enter Reason Code    C : Low Cost Supplier Fare Declined
    Enter Full Fare    999.50    2
    Enter Low Fare    123.00    2
    Enter Reason Code    K : Client Negotiated Fare Declined    2
    Enter Full Fare    790.00    3
    Enter Low Fare    678.00    3
    Enter Reason Code    5 : Fare not in compliance    3
    
Verify That Client Reporting Remarks Are Written In The PNR For Single TST
    Switch To Graphic Mode
    Get PNR Details
    Verify Specific Remark Is Written In The PNR    RM *FF/-1123.50/S2
    Verify Specific Remark Is Written In The PNR    RM *LP/-300.00/S2
    Verify Specific Remark Is Written In The PNR    RM *FS/-A/S2
   
Verify That Client Reporting Remarks Are Written In The PNR For Multiple TSTs
    Switch To Graphic Mode
    Get PNR Details
    Verify Specific Remark Is Written In The PNR    RM *FF/-1123.50/S2-3
    Verify Specific Remark Is Written In The PNR    RM *LP/-300.00/S2-3
    Verify Specific Remark Is Written In The PNR    RM *FS/-C/S2-3
    Verify Specific Remark Is Written In The PNR    RM *FF/-999.50/S4
    Verify Specific Remark Is Written In The PNR    RM *LP/-123.00/S4
    Verify Specific Remark Is Written In The PNR    RM *FS/-K/S4
    Verify Specific Remark Is Written In The PNR    RM *FF/-790.00/S5
    Verify Specific Remark Is Written In The PNR    RM *LP/-678.00/S5
    Verify Specific Remark Is Written In The PNR    RM *FS/-5/S5

Add Client Reporting Values For Non-BSP Segments
    Click Reporting Panel
    Enter Value    //input[@formcontrolname='highFareText']    2101.00
    Enter Value   //input[@formcontrolname='lowFareText']    912.99
    
Select Client Reporting Fields To Be Written
    Click Reporting Panel   
    Wait Until Page Contains Element    ${checkbox_clientReporting}
    Select Checkbox    ${tab_clientReporting}[1]${checkbox_clientReporting}

Verify That Non-BSP Client Reporting Remarks Are Written In The PNR For Single Segment
    # Switch To Graphic Mode
    # Get PNR Details
    Verify Specific Remark Is Written In The PNR    RM *FF/-2101.00/S2
    Verify Specific Remark Is Written In The PNR    RM *LP/-912.99/S2
    Verify Specific Remark Is Written In The PNR    RM *FS/-L/S2
   
Verify That Non-BSP Client Reporting Remarks Are Written In The PNR For Multiple Segments
    # Switch To Graphic Mode
    # Get PNR Details
    Verify Specific Remark Is Written In The PNR    RM *FF/-2101.00/S2-3
    Verify Specific Remark Is Written In The PNR    RM *LP/-912.99/S2-3
    Verify Specific Remark Is Written In The PNR    RM *FS/-L/S2-3

Verify That BSP Client Reporting Remarks Are Written In The PNR For Exchange TST
    Switch To Graphic Mode
    Get PNR Details
    Verify Specific Remark Is Written In The PNR    RM *FF/-120.00/S2
    Verify Specific Remark Is Written In The PNR    RM *LP/-120.00/S2
    Verify Specific Remark Is Written In The PNR    RM *FS/-E/S2
    Switch To Command Page
    
Verify That Accounting Remark Is Written Correctly For Non BSP Airline Pass Purchase
    Switch To Graphic Mode
    Get PNR Details
    Verify Specific Remark Is Written In The PNR    RM *FF/-127.25/S2
    Verify Specific Remark Is Written In The PNR    RM *LP/-127.25/S2
    Verify Specific Remark Is Written In The PNR    RM *FS/-L/S2
    Switch To Command Page