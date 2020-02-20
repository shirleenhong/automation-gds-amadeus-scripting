*** Settings ***
Library           String
Library           SeleniumLibrary
Library           Collections
Library           Screenshot
Resource          base.robot

*** Variables ***
${row_supplemental_fees}    //tbody[@formarrayname='segments']
${tab_supplemental_fees}    //tab[@id='supplementalFeeTab']
${input_supplementalFee_chckbox}    //div[@formarrayname='fees']
${checkbox_schedule_change}    //input[@id='isChange']
${list_no_feeCode}    //select[@id='noFeeCode']
${input_ticket_segment}    //input[@id='segment']
${input_fee}    //input[@id='fee']
${input_supfee_checkbox}    //input[@id='selected']
${button_addSupFee}    //i[@id='add']
${input_feeCode}    //input[@id='code']
${button_addFee}    //i[@id='addFee']
${input_supplementalFee}    //input[@id='supplementalFee']

*** Keywords ***
Add Canada Domestic Segment And Store Multiple Fare
    Create 2 Test Dates
    @{gds_commands}    Create List    AN${test_date_1}YYCYEG/AAC    SS1Y1    FXP/S2    AN${test_date_2}YEGYYC/AAC    SS1Y1    FXP/S3
    Wait Until Element Is Visible    ${label_command_page}    180
    : FOR    ${gds_command}    IN    @{gds_commands}
    \    Enter Cryptic Command    ${gds_command}
    
Add International Segment And Store Single Fare
    Create 2 Test Dates
    @{gds_commands}    Create List    AN${test_date_1}YULCDG/AAF    SS1Y1    AN${test_date_2}CDGYUL/AAF    SS1Y1    FXP
    Wait Until Element Is Visible    ${label_command_page}    180
    : FOR    ${gds_command}    IN    @{gds_commands}
    \    Enter Cryptic Command    ${gds_command}
   
Add FS And Commission Line In The PNR
    [Arguments]    ${fs_line}    ${commission_value}    ${ticket_line}    ${received}    ${end_pnr}
    @{gds_commands}    Create List    ${fs_line}    ${commission_value}    ${ticket_line}    ${received}    ${end_pnr}
    Wait Until Element Is Visible    ${label_command_page}    180
    : FOR    ${gds_command}    IN    @{gds_commands}
    \    Enter Cryptic Command    ${gds_command}
    
Verify Default Fee In Ticket Segments
    [Arguments]    @{expected_fee_amount}
    Wait Until Element Is Visible    ${input_fee}    60
    ${elements_count}    Get Element Count    ${row_supplemental_fees}${input_fee}
    Set Test Variable    ${elements_count}
        : FOR    ${fee_index}    IN RANGE    0    ${elements_count}
	    \    Set Test Variable    ${div_index}    ${fee_index}
	    \    ${div_index}    Evaluate    ${div_index} + 1
	    \    ${fee_value}    Get Value    ${row_supplemental_fees}${open_bracket}${div_index}${close_bracket}${input_fee}
	    \    Run Keyword And Continue On Failure    Should Be Equal    ${expected_fee_amount[${fee_index}]}    ${fee_value}
	    \    ${fee_index}    Evaluate    ${fee_index} + 1
	    \    Log    Expected: ${expected_fee_amount}
	    \    Log    Actual: ${fee_value}    
    [Teardown]    Take Screenshot
    
Verify Default Fee Code in Ticket Segments
    [Arguments]    @{expected_fee_code}
    Wait Until Element Is Visible    ${input_fee}    60
    ${elements_count}    Get Element Count    ${row_supplemental_fees}${input_fee}
    Set Test Variable    ${elements_count}
        : FOR    ${fee_index}    IN RANGE    0    ${elements_count}
	    \    Set Test Variable    ${div_index}    ${fee_index}
	    \    ${div_index}    Evaluate    ${div_index} + 1
	    \    ${fee_code}    Get Value    ${row_supplemental_fees}${open_bracket}${div_index}${close_bracket}${input_feeCode}
	    \    Run Keyword And Continue On Failure    Should Be Equal    ${expected_fee_code[${fee_index}]}    ${fee_code}
	    \    ${fee_index}    Evaluate    ${fee_index} + 1
	    \    Log    Expected: ${expected_fee_code}
	    \    Log    Actual: ${fee_code} 
    [Teardown]    Take Screenshot

Tick Schedule Change Checkbox
    [Arguments]   @{schedule_fee_index}
    : FOR   ${schedule_fee_index}   IN    @{schedule_fee_index}
    \    Select Checkbox    ${row_supplemental_fees}${open_bracket}${schedule_fee_index}${close_bracket}${checkbox_schedule_change}
	    
Select No Fee Code ${no_fee_code}
    Navigate To Page Fees
    Select From List By Label   ${list_no_feeCode}    ${no_fee_code}
    Take Screenshot  
    
Enter Fee Amount
    [Arguments]   ${fee_amt}
    Enter Value    ${row_supplemental_fees}${open_bracket}1${close_bracket}${input_fee}    ${fee_amt}

Select Supplemental Fee For First Ticket
    Click Add Sup Fee Button 1
    Wait Until Element Is Visible    ${input_supplementalFee_chckbox}${open_bracket}1${close_bracket}${input_supfee_checkbox}    30
    Select Checkbox    ${input_supplementalFee_chckbox}${open_bracket}1${close_bracket}${input_supfee_checkbox}  
    Take Screenshot  
    Click Button    ${button_save}  
    Wait Until Element Is Enabled    ${checkbox_schedule_change}    30 
    Click Element At Coordinates    ${input_supplementalFee}    0    0       

Click Add Sup Fee Button ${add_fee_index}
    Wait Until Element Is Visible    ${tab_supplemental_fees}${open_bracket}1${close_bracket}${row_supplemental_fees}${open_bracket}${add_fee_index}${close_bracket}${button_addSupFee}    30
    Click Element At Coordinates    ${tab_supplemental_fees}${open_bracket}1${close_bracket}${row_supplemental_fees}${open_bracket}${add_fee_index}${close_bracket}${button_addSupFee}    0    0
    Wait Until Element Is Visible    ${input_supplementalFee_chckbox}${open_bracket}1${close_bracket}${input_supfee_checkbox}    30
    
Click Add Fee Button
    Click Element    ${tab_supplemental_fees}${button_addFee} 

Select Multiple Supplemental Fee
     [Arguments]   @{supplemental_fee_index}
    : FOR   ${supplemental_fee_index}   IN    @{supplemental_fee_index}
    \    Select Checkbox    ${input_supplementalFee_chckbox}${open_bracket}${supplemental_fee_index}${close_bracket}${input_supfee_checkbox}
    Click Button    ${button_save}  
    Wait Until Element Is Enabled    ${checkbox_schedule_change}    30   
    Click Element At Coordinates    ${input_supplementalFee}    0    0

Select Supplemental Fees For All TSTs
    Navigate To Page Fees
    Click Add Sup Fee Button 1
    Select Multiple Supplemental Fee   1   2
    Click Add Fee Button
    Click Add Sup Fee Button 2
    Select Multiple Supplemental Fee   1   2

Select All Schedule Change Checkbox
    Navigate To Page Fees
    Click Add Fee Button
    Tick Schedule Change Checkbox   1   2
    #Verify Default Fee Code in Ticket Segments    ATD    ATD
    #Verify Default Fee In Ticket Segments    30.00    30.00
    Take Screenshot
    
Verify Default Values Of Exchange Flat Fee With Supplemental Fee
    Navigate To Page Fees
    Click Add Fee Button
    #Verify Default Fee Code in Ticket Segments    ATB   ATB
    #Verify Default Fee In Ticket Segments    27.00   27.00
    Select Supplemental Fee For First Ticket
    
Verify Default Values Of Special Fee For ${segment_type} Ticket
    Navigate To Page Fees
    #Run Keyword If    "${segment_type}" == "air"    Verify Default Fee Code in Ticket Segments    ATI    ELSE IF   "${segment_type}" == "rail"    Verify Default Fee Code in Ticket Segments    RTD
    #Verify Default Fee In Ticket Segments    60.00
    Take Screenshot

Verify Default Values Of Special Fee That Has No Value in DB
    Navigate To Page Fees
    #Verify Default Fee Code in Ticket Segments    ATI
    Verify Default Fee In Ticket Segments    ${EMPTY}
    Enter Fee Amount    12.50
    Take Screenshot
    
Book Multiple Segments With Air Car Rail And Hotel
    Add Canada Domestic Segment And Store Multiple Fare
    Add 1 Rail Segments
    Add 1 Passive Hotel Segments
    Add 1 Car Segments
    
Verify Correct OBT Fee Remark Are Written In The PNR For Multiple Segment
    Finish PNR
    Verify Specific Remark Is Written In The PNR    RMF SUPFEE1-ATE    

Verify Correct OBT Fee Remark Are Written In The PNR For Air Only
    Finish PNR
    Verify Specific Remark Is Written In The PNR    RMF SUPFEE1-ATE
    
Verify Correct OBT Fee Remark Are Written In The PNR For Rail Only
    Finish PNR
    Verify Specific Remark Is Written In The PNR    RMF SUPFEE1-RTE
    
Verify Correct OBT Fee Remark Are Written In The PNR For Hotel Only
    Finish PNR
    Verify Specific Remark Is Written In The PNR    RMF SUPFEE1-HBE
    
Verify Correct OBT Fee Remark Are Written In The PNR For Car Only
    Finish PNR
    Verify Specific Remark Is Written In The PNR    RMF SUPFEE1-CBE
    
Verify The No Supfee Remark Are Written In The PNR
    Finish PNR
    Verify Specific Remark Is Not Written In The PNR    RMF SUPFEE1-ATE    

Verify Air/Rail Fees Are Not Displayed
    Navigate To Page Fees
    Run Keyword And Continue On Failure    Element Should Not Be Visible    ${input_feeCode}
    Run Keyword And Continue On Failure    Element Should Not Be Visible    ${input_fee}
    Take Screenshot
    
Verify That Migration OBT Remark Is Written
    Close CA Corporate Test
    Finish PNR
    Verify Expected Remarks Are Written In The PNR 
    
Verify That Migration OBT Remark Is Not Written
    Close CA Corporate Test
    Finish PNR
    Verify Unexpected Remarks Are Not Written In The PNR 
