*** Settings ***
Library           String
Library           SeleniumLibrary
Library           Collections
Library           Screenshot
Resource          base.robot

*** Variables ***
${tab_accounting}
${button_add_accounting}
${list_segment}
${list_accounting_type}
${input_confirmation_nbr}
${input_ticket_number}
${input_base_amt}
${input_gst_tax}
${input_hst_tax}
${input_qst_tax}
${input_other_tax}
${input_supplier_code}

*** Keywords ***
Add Non-BSP Ticketing Details For Single Segment
    Click Payment Panel
    Click Element    ${tab_accounting}    
    Click Element    ${button_add_accounting}
    Select From List By Value    ${list_segment}   text 
    Select From List By Value    ${list_accounting_type}    text
    Enter Value    ${input_confirmation_nbr}    54321
    Add Ticketing Amount Details
    Enter Value    ${input_ticket_number}    1234567890
    
Add Non-BSP Exchange Ticketing Details For Single Segment
    Click Payment Panel
    Click Element    ${tab_accounting}    
    Click Element    ${button_add_accounting}
    Select From List By Value    ${list_segment}    text
    Select From List By Value    ${list_acounting_type}    NonBSP Air Exchange
    Enter Value    ${input_confirmation_nbr}    54321
    Add Ticketing Amount Details        

Add Ticketing Amount Details
    Enter Value    ${input_base_amt}    750.00
    Enter Value    ${input_gst_tax}    1.00
    Enter Value    ${input_hst_tax}    2.00
    Enter Value    ${input_qst_tax}    3.00
    Enter Value    ${input_other_tax}   4.00

Verify Supplier Code Default Value Is Correct For ${supplier_code}
    Set Test Variable    ${supplier_code}    
    ${actual_supplier_code}    Get Text    ${input_supplier_code}
    Run Keyword If    "${supplier_code}" == "AC"    Should contain    ${actual_supplier_code}     ACY
    Run keyword if    "${supplier_code}" == "WS"    Should contain    ${actual_supplier_code}     WJ3
    Run keyword if    "${supplier_code}" == "PD"    Should contain    ${actual_supplier_code}     PTA
    Run keyword if    "${supplier_code}" == "9M"    Should contain    ${actual_supplier_code}     CMA
    Run keyword if    "${supplier_code}" == "MO"    Should contain    ${actual_supplier_code}     C5A
    Run keyword if    "${supplier_code}" == "YP"    Should contain    ${actual_supplier_code}     K9P
    Run keyword if    "${supplier_code}" == "4N"    Should contain    ${actual_supplier_code}     A5N
    Run keyword if    "${supplier_code}" == "8P"    Should contain    ${actual_supplier_code}     PF3
    Run keyword if    "${supplier_code}" == "WJ"    Should contain    ${actual_supplier_code}     ALO
    Run keyword if    "${supplier_code}" == "WN"    Should contain    ${actual_supplier_code}     SOA
               

    
Select Multiple Segments
    [Arguments]    @{segment_number}
    Wait Until Element Is Visible    xpath=//app-segment-select[@id='segmentNo']//button[@id='button-basic']    30
    Click Button    xpath=//app-segment-select[@id='segmentNo']//button[@id='button-basic']
    Wait Until Element Is Visible    xpath=//ul[@id='dropdown-basic']    30
    :FOR    ${segment_number}    IN    @{segment_number}
    \    Click Element    xpath=//ul[@id='dropdown-basic']//input[@value='${segment_number}']
    Click Element    xpath=//app-segment-select[@id='segmentNo']//button[@id='button-basic']
    [Teardown]    Take Screenshot

Add Non-BSP Ticketing Details For Multiple Segments
    Click Payment Panel
    Click Element    ${tab_accounting}    
    Click Element    ${button_add_accounting}
    Select Multiple Segments    2    3
    Select From List By Value    ${list_accounting_type}    text
    Enter Value    ${input_confirmation_nbr}    54321
    Add Ticketing Amount Details
    Enter Value    ${input_ticket_number}    text
    
Verify That Ticketing Remarks For Non-BSP With Single Segment Are Written In The PNR
    Switch To Graphic Mode
    Get PNR Details    
    Run Keyword And Continue On Failure    Should Contain    ${pnr_details}    RMT/TKT1-VEN/TK-1234567890/VN-ACY/S2 
    Run Keyword And Continue On Failure    Should Contain    ${pnr_details}    RMT/TKT1-BA-750.00/TX1-1.00XG/TX2-2.00RC/TX3-3.00XQ/TX4-0XT/COMM-0/S2
    Run Keyword And Continue On Failure    Should Contain    ${pnr_details}    RMF/LCC-AC*GRAND TOTAL CAD 750
    Run Keyword And Continue On Failure    Should Contain    ${pnr_details}    RIR AIRLINE LOCATOR NUMBER – 54321/S2
    
Verify That Ticketing Remarks For Non-BSP With Multiple Segments Are Written In The PNR
    Switch To Graphic Mode
    Get PNR Details  
    Run Keyword And Continue On Failure    Should Contain    ${pnr_details}    RMT/TKT1-VEN/TK-1234567890/VN-ACY/S2-3 
    Run Keyword And Continue On Failure    Should Contain    ${pnr_details}    RMT/TKT1-BA-750.00/TX1-1.00XG/TX2-2.00RC/TX3-3.00XQ/TX4-0XT/COMM-0/S2-3
    Run Keyword And Continue On Failure    Should Contain    ${pnr_details}    RMF/LCC-AC*GRAND TOTAL CAD 750
    Run Keyword And Continue On Failure    Should Contain    ${pnr_details}    RIR AIRLINE LOCATOR NUMBER – 54321/S2-3
    
    