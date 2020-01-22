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

*** Keywords ***
Add Canada Domestic Segment And Store Multiple Fare
    Create 2 Test Dates
    @{gds_commands}    Create List    AN${test_date_1}YYCYEG/AAC    SS1Y1    FXP/S2    AN${test_date_2}YEGYYC/AAC    SS1Y1    FXP/S3
    Wait Until Element Is Visible    ${label_command_page}    180
    : FOR    ${gds_command}    IN    @{gds_commands}
    \    Input Text    ${input_commandText}    ${gds_command}
    \    Press Key    ${input_commandText}    \\13

Add Transborder Segment And Store Multiple Fare
    Create 2 Test Dates
    @{gds_commands}    Create List    AN${test_date_1}ORDYYC/AAC    SS1Y1    FXP/S2    AN${test_date_2}YYCORD/AAC    SS1Y1    FXP/S3
    Wait Until Element Is Visible    ${label_command_page}    180
    : FOR    ${gds_command}    IN    @{gds_commands}
    \    Input Text    ${input_commandText}    ${gds_command}
    \    Press Key    ${input_commandText}    \\13
    
Add International Segment And Store Single Fare
    Create 2 Test Dates
    @{gds_commands}    Create List    AN${test_date_1}YULCDG/AAF    SS1Y1    AN${test_date_2}CDGYUL/AAF    SS1Y1    FXP
    Wait Until Element Is Visible    ${label_command_page}    180
    : FOR    ${gds_command}    IN    @{gds_commands}
    \    Input Text    ${input_commandText}    ${gds_command}
    \    Press Key    ${input_commandText}    \\13
   
Add SSR Document In The PNR
    [Arguments]    @{ssr_documents}
    Wait Until Element Is Visible    ${label_command_page}    180
    : FOR    ${ssr_documents}    IN    @{ssr_documents}
    \    Input Text    ${input_commandText}    ${ssr_documents}
    \    Press Key    ${input_commandText}    \\13
   
Add FS And Commission Line In The PNR
    [Arguments]    ${fs_line}    ${commission_value}    ${ticket_line}    ${received}    ${end_pnr}
    @{gds_commands}    Create List    ${fs_line}    ${commission_value}    ${ticket_line}    ${received}    ${end_pnr}
    Wait Until Element Is Visible    ${label_command_page}    180
    : FOR    ${gds_command}    IN    @{gds_commands}
    \    Input Text    ${input_commandText}    ${gds_command}
    \    Press Key    ${input_commandText}    \\13    
    
Add OBT Remark In The PNR
    [Arguments]    @{obt_remarks} 
    Wait Until Element Is Visible    ${label_command_page}    180
    : FOR    ${obt_remarks}    IN    @{obt_remarks}
    \    Input Text    ${input_commandText}    ${obt_remarks}
    \    Press Key    ${input_commandText}    \\13

Add CFA Remark
    [Arguments]    @{cfa_remark}
    Wait Until Element Is Visible    ${label_command_page}    180
    : FOR    ${cfa_remark}    IN    @{cfa_remark}
    \    Input Text    ${input_commandText}    ${cfa_remark}
    \    Press Key    ${input_commandText}    \\13
    
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
    Select From List By Label   ${list_no_feeCode}    ${no_fee_code}  
    
Enter Fee Amount
    [Arguments]   ${fee_amt}
    Enter Value    ${row_supplemental_fees}[1]${input_fee}    ${fee_amt}
         
Create Single Ticket For The PNR
    Get Record Locator Value
    @{gds_commands}    Create List    TTP/T1    RT${actual_record_locator}
	    : FOR    ${gds_command}    IN    @{gds_commands}
	    \    Input Text    ${input_commandText}    ${gds_command}
	    \    Press Key    ${input_commandText}    \\13 
	    
Create Multiple Ticket For The PNR
    Get Record Locator Value
    @{gds_commands}    Create List    TTP/T1    RT${actual_record_locator}   TTP/T2   RT${actual_record_locator}
	    : FOR    ${gds_command}    IN    @{gds_commands}
	    \    Input Text    ${input_commandText}    ${gds_command}
	    \    Press Key    ${input_commandText}    \\13

Select Supplemental Fee For First Ticket
    Click Add Sup Fee Button 1
    Wait Until Element Is Visible    ${input_supplementalFee_chckbox}[1]${input_supfee_checkbox}    30
    Select Checkbox    ${input_supplementalFee_chckbox}[1]${input_supfee_checkbox}  
    Take Screenshot  
    Click Button    ${button_save}  
    Wait Until Element Is Enabled    ${checkbox_schedule_change}    30 
    Click Element At Coordinates    ${input_feeCode}    0    0       

Click Add Sup Fee Button ${add_fee_index}
    Wait Until Element Is Visible    ${tab_supplemental_fees}${open_bracket}1${close_bracket}${row_supplemental_fees}[${add_fee_index}]${button_addSupFee}    30
    Click Element At Coordinates    ${tab_supplemental_fees}${open_bracket}1${close_bracket}${row_supplemental_fees}[${add_fee_index}]${button_addSupFee}    0    0
    Wait Until Element Is Visible    ${input_supplementalFee_chckbox}${open_bracket}1${close_bracket}${input_supfee_checkbox}    30
    Sleep    4
    
Click Add Fee Button
    Click Element    ${tab_supplemental_fees}${button_addFee} 

Select Multiple Supplemental Fee
     [Arguments]   @{supplemental_fee_index}
    : FOR   ${supplemental_fee_index}   IN    @{supplemental_fee_index}
    \    Select Checkbox    ${input_supplementalFee_chckbox}${open_bracket}${supplemental_fee_index}${close_bracket}${input_supfee_checkbox}
    Click Button    ${button_save}  
    Wait Until Element Is Enabled    ${checkbox_schedule_change}    30   
    Click Element At Coordinates    ${input_feeCode}    0    0

Select Supplemental Fees For All TSTs
    Navigate To Page Fees
    Click Add Sup Fee Button 1
    Select Multiple Supplemental Fee   1   2
    Click Add Fee Button
    Click Add Sup Fee Button 2
    Select Multiple Supplemental Fee   1   2

Move Single Passenger For Fees
    Move Profile to GDS     NM1Juarez/Rose Ms    APE-test@email.com    RMP/CITIZENSHIP-CA    RM*U25/-A:FA177    RM*BOOK-YTOWL220N/TKT-YTOWL2106/CC-C    FPCASH    RM*CN/-CN1    TKOK
        
Move Single Passenger With Multiple Segment For Dom Canada With TSTs
    Move Single Passenger For Fees
    Add Canada Domestic Segment And Store Multiple Fare
    Add SSR Document In The PNR    SR DOCS AC HK1-P-GBR-00823451-GB-30JUN73-M-14APR09-JUAREZ-ROSE/P1/S2    SR DOCS AC HK1-P-GBR-00823451-GB-30JUN73-M-14APR09-JUAREZ-ROSE/P1/S3
    Add CFA Remark    RM*CF/-NRD0000000C
    Add FS And Commission Line In The PNR    FS02    FM10.00    TKOK10JAN    RFCWTPTEST    ER
    Sleep    4
    Create 2 Test Dates
    Create Multiple TKT Exchange PNR In The GDS
    Set Test Variable    ${cfa}    NRD
    Set Test Variable    ${num_air_segments}     0
    
Move Single Passenger With Multiple Segment For Transborder With TSTs
    Move Single Passenger For Fees
    Add Transborder Segment And Store Multiple Fare
    Add CFA Remark    RM*CF/-RH60000000C
    Add FS And Commission Line In The PNR    FS02    FM10.00    TKOK10JAN    RFCWTPTEST    ER
    Sleep    4
    Create 2 Test Dates
    Create Multiple TKT Exchange PNR In The GDS
    Set Test Variable    ${cfa}    RH6
    Set Test Variable    ${num_air_segments}     0
       
Move Single Passenger With Single Segment For International With Non Exchange Ticket
    Move Single Passenger For Fees
    Add CFA Remark    RM*CF/-XXP0000000C
    Add International Segment And Store Single Fare
    Sleep    4
    Set Test Variable    ${cfa}    XXP
    Set Test Variable    ${num_air_segments}     0
    
Move Single Passenger With Single Segment With Special Fee Required Inputs
    Move Single Passenger For Fees
    Add CFA Remark    RM*CF/-YXU0000000C
    Add International Segment And Store Single Fare
    Sleep    4
    Set Test Variable    ${cfa}    YXU
    Set Test Variable    ${num_air_segments}     0
    
Move Single Passenger With Transborder Segments And Single Ticket For OBT
    Move Single Passenger For Fees
    Add International Segment And Store Single Fare
    Add OBT Remark In The PNR    RM*EB/-EBA    RM*CF/-RH60000000C    RFCWTPTEST    ER
    Set Test Variable    ${cfa}    RH6
    Set Test Variable    ${num_air_segments}     0
    
Move Single Passenger With Transborder Segments And Single Ticket
    Create And Ticket PNR With Airline Code AC
    
Add Passive Rail Segment For CFA With Special Fee
    Move Single Passenger For Fees
    Add CFA Remark    RM*CF/-XXP0000000C
    Add 1 Rail Segments
    Set Test Variable    ${cfa}    XXP
    Set Test Variable    ${num_air_segments}     0
    
Verify OBT PNR defaults Fee For Tkt And Write No Fee Code In The PNR
    Navigate To Page Fees
    Verify Default Fee Code in Ticket Segments    NFR
    Finish PNR
    Verify Specific Remark Is Written In The PNR    RMF SUPFEE1-NFR
    Switch To Command Page   
    
Verify Non OBT PNR defaults Fee For Tkt And Write No Fee Code In The PNR
    Navigate To Page Fees
    Verify Default Fee Code in Ticket Segments    NFM
    Finish PNR
    Verify Specific Remark Is Written In The PNR    RMF SUPFEE1-NFM
    Switch To Command Page

Verify Default Values For Schedule Change Fees 
    Navigate To Page Fees
    Click Add Fee Button
    Tick Schedule Change Checkbox   1   2
    Verify Default Fee Code in Ticket Segments    ATD    ATD
    Verify Default Fee In Ticket Segments    30.00    30.00

Verify Selected Schedule Change Fees Are written In The PNR
    Finish PNR
    Verify Specific Remark Is Written In The PNR    RMF SUPFEE1-ATD30.00
    Verify Specific Remark Is Written In The PNR    RMF SUPFEE2-ATD30.00
    Switch To Command Page        
    
Verify Default Values Of Exchange Flat Fee With Supplemental Fee
    Navigate To Page Fees
    Click Add Fee Button
    Verify Default Fee Code in Ticket Segments    ATB   ATB
    Verify Default Fee In Ticket Segments    27.00   27.00
    Select Supplemental Fee For First Ticket
    
Verify That Exchange Flat Fees Are Written In The PNR
    Finish PNR
    Verify Specific Remark Is Written In The PNR    RMF SUPFEE1-ATB27.00/ESD
    Verify Specific Remark Is Written In The PNR    RMF SUPFEE2-ATB27.00
    Switch To Command Page 
    
Verify Default Values Of Special Fee For ${segment_type} Ticket
    Navigate To Page Fees
    Run Keyword If    "${segment_type}" == "air"    Verify Default Fee Code in Ticket Segments    ATI    ELSE IF   "${segment_type}" == "rail"    Verify Default Fee Code in Ticket Segments    RTD
    Verify Default Fee In Ticket Segments    60.00

Verify Default Values Of Special Fee That Has No Value in DB
    Navigate To Page Fees
    Verify Default Fee Code in Ticket Segments    ATI
    Verify Default Fee In Ticket Segments    ${EMPTY}
    Enter Fee Amount    12.50
    
Verify That Special Fee Is Written In The PNR
    Finish PNR
    Verify Specific Remark Is Written In The PNR    RMF SUPFEE1-ATI60.00
    Switch To Command Page 
    
Verify That Special Fee Is Written In The PNR For Rail
    Finish PNR
    Verify Specific Remark Is Written In The PNR    RMF SUPFEE1-RTD60.00
    Switch To Command Page 
    
Verify That Entered Special Fee Is Written In The PNR
    Finish PNR
    Verify Specific Remark Is Written In The PNR    RMF SUPFEE1-ATI12.50
    Switch To Command Page

Verify Selected No Fee Code Is Written
    Finish PNR
    Verify Specific Remark Is Written In The PNR    RMF SUPFEE1-NFB
    Switch To Command Page
    
Verify That Multiple Supplemental Fees Are Written In The PNR
    Finish PNR
    Verify Specific Remark Is Written In The PNR    RMF SUPFEE1-ATB27.00/ESD/ESI
    Verify Specific Remark Is Written In The PNR    RMF SUPFEE2-ATB27.00/ESD/ESI
    Switch To Command Page
    
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

    