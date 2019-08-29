*** Settings ***
Library           String
Library           SeleniumLibrary
Library           Collections
Library           Screenshot
Resource          base.robot

*** Variables ***
${input_full_fare}    //input[@formcontrolname='highFareText']
${input_low_fare}    //input[@formcontrolname='lowFareText']
${input_reason_code}    //input[@formcontrolname='reasonCodeText']
${input_full_fare_2}
${input_low_fare_2}
${input_full_fare_3}
${input_low_fare_3}

*** Keywords ***    
Move Single Passenger And Add Single BSP Segment With TST
    Move Profile to GDS    NM1CORPORATE/AMADEUS MR    RM SYEXGVS: A:FA177    APE-test@email.com    TKOK
    Add Single BSP Segment And Store Fare
    
Move Single Passenger And Add Multiple BSP Segment With TSTs
    Move Profile to GDS    NM1CORPORATE/AMADEUS MR    RM SYEXGVS: A:FA177    APE-test@email.com
    Add Multiple BSP Segment And Store Fare
    
Move Single Passenger And Add Passive Segment 
    Move Profile to GDS    NM1CORPORATE/AMADEUS MR    RM SYEXGVS: A:FA177    APE-test@email.com
    Add Passive Air Segment In The GDS
    
Move Single Passenger And Add Multiple Air Passive Segments 
    Move Profile to GDS    NM1CORPORATE/AMADEUS MR    RM SYEXGVS: A:FA177    APE-test@email.com
    Add Multiple Passive Air Segments In The GDS
    
Add Client Reporting Values For Single BSP Segment
    Click Full Wrap
    Click Reporting Panel
    Enter Value    ${input_full_fare}    1123.50
    Enter Value    ${input_low_fare}    300.00
    Enter Value    ${input_reason_code}    L
    Click Submit To PNR
    
Add Client Reporting Values For Multiple BSP Segment
    Click Full Wrap
    Click Reporting Panel
    Enter Value    ${input_full_fare}    1123.50
    Enter Value    ${input_low_fare}    300.00
    Enter Value    ${input_full_fare_2}    999.50
    Enter Value    ${input_low_fare_2}    123.00
    Enter Value    ${input_full_fare_3}    790.00
    Enter Value    ${input_low_fare_3}    678.00
    Enter Value    ${input_reason_code}    L
    
Verify That Client Reporting Remarks Are Written In The PNR For Single TST
    Input Text    ${input_commandText}    rt
    Press Key    ${input_commandText}    \\13
    Switch To Graphic Mode
    Get PNR Details
    Verify Specific Remark Is Written In The PNR    RM *FF/-1123.50/S2
    Verify Specific Remark Is Written In The PNR    RM *LP/-300.00/S2
    Verify Specific Remark Is Written In The PNR    RM *FS/-L/S2
    Switch To Command Page
   
Verify That Client Reporting Remarks Are Written In The PNR For Multiple TSTs
    Switch To Graphic Mode
    Get PNR Details
    Verify Specific Remark Is Written In The PNR    RM *FF/-1123.50/S2-3
    Verify Specific Remark Is Written In The PNR    RM *LP/-300.00/S2-3
    Verify Specific Remark Is Written In The PNR    RM *FS/-L/S2-3
    Verify Specific Remark Is Written In The PNR    RM *FF/-999.50/S4
    Verify Specific Remark Is Written In The PNR    RM *LP/-123.00/S4
    Verify Specific Remark Is Written In The PNR    RM *FS/-L/S4
    Verify Specific Remark Is Written In The PNR    RM *FF/-790.00/S5
    Verify Specific Remark Is Written In The PNR    RM *LP/-678.00/S5
    Verify Specific Remark Is Written In The PNR    RM *FS/-L/S5
    Switch To Command Page

Add Client Reporting Values For Non-BSP Segments
    Click Reporting Panel
    Enter Value    ${input_full_fare}    2101.00
    Enter Value    ${input_low_fare}    912.99
    Enter Value    ${input_reason_code}    L
    Click Submit To PNR

Verify That Non-BSP Client Reporting Remarks Are Written In The PNR For Single Segment
    Switch To Graphic Mode
    Get PNR Details
    Verify Specific Remark Is Written In The PNR    RM *FF/-2101.00/S2
    Verify Specific Remark Is Written In The PNR    RM *LP/-912.99/S2
    Verify Specific Remark Is Written In The PNR    RM *FS/-L/S2
    Switch To Command Page
   
Verify That Non-BSP Client Reporting Remarks Are Written In The PNR For Multiple Segments
    Switch To Graphic Mode
    Get PNR Details
    Verify Specific Remark Is Written In The PNR    RM *FF/-2101.00/S2-3
    Verify Specific Remark Is Written In The PNR    RM *LP/-912.99/S2-3
    Verify Specific Remark Is Written In The PNR    RM *FS/-L/S2-3
    Switch To Command Page
    


