*** Settings ***
Library           String
Library           SeleniumLibrary
Library           Collections
Library           Screenshot
Resource          base.robot

*** Variables ***
${tab_supplemental_fees}    //div[@formarrayname='segments']
${input_supplementalFee_chckbox}    //div[@formarrayname='fees']
${checkbox_schedule_change}    //input[@id='isExchange']
${list_supplementalFee}    //select[@id='supplementalFee']
${list_no_feeCode}    //select[@id='noFeeCode']
${div_ticket_row_start}    //div[@ng-reflect-name='
${div_ticket_row_end}    ']
${input_ticket_segment}    //input[@id='segment']
${input_fee}    //input[@id='fee']
${input_supfee_checkbox}    //input[@id='selected']
${div_addFee_button}    //div[contains(text(), 'Add Fee')]
${input_feeCode}    //input[@id='code']



*** Keywords ***
Add Specific Fees For Domestic Canada With Multiple Ticket In The PNR
    Move Single Passenger With Multiple Segment For Dom Canada With TSTs
    Navigate To Page Fees
    
Add Canada Domestic Segment And Store Mulitple Fare
    @{gds_commands}    Create List    AN10JANYYCYEG/AAC    SS1Y1    FXP/S2    AN15JANYEGYYC/AAC    SS1Y1    FXP/S3
    Wait Until Element Is Visible    ${label_command_page}    180
    : FOR    ${gds_command}    IN    @{gds_commands}
    \    Input Text    ${input_commandText}    ${gds_command}
    \    Press Key    ${input_commandText}    \\13

Add Transborder Segment And Store Multiple Fare
    @{gds_commands}    Create List    AN10JANORDYYC/AAC    SS1Y1    FXP/S2    AN15JANYYCORD/AAC    SS1Y1    FXP/S3
    Wait Until Element Is Visible    ${label_command_page}    180
    : FOR    ${gds_command}    IN    @{gds_commands}
    \    Input Text    ${input_commandText}    ${gds_command}
    \    Press Key    ${input_commandText}    \\13
    
Add International Segment And Store Single Fare
    @{gds_commands}    Create List    AN10JANORDYYC/AAC    SS1Y1    AN15JANYYCORD/AAC    SS1Y1    FXP
    Wait Until Element Is Visible    ${label_command_page}    180
    : FOR    ${gds_command}    IN    @{gds_commands}
    \    Input Text    ${input_commandText}    ${gds_command}
    \    Press Key    ${input_commandText}    \\13
   
Add SSR Document In The PNR
    [Arguments]    ${ssr_documents}
    @{gds_commands}    Create List    ${ssr_documents}
    Wait Until Element Is Visible    ${label_command_page}    180
    : FOR    ${gds_command}    IN    @{gds_commands}
    \    Input Text    ${input_commandText}    ${gds_command}
    \    Press Key    ${input_commandText}    \\13
   
Add FS And Commission Line In The PNR
    [Arguments]    ${fs_line}    ${commission_value}
    @{gds_commands}    Create List    ${fs_line}    ${commission_value}
    Wait Until Element Is Visible    ${label_command_page}    180
    : FOR    ${gds_command}    IN    @{gds_commands}
    \    Input Text    ${input_commandText}    ${gds_command}
    \    Press Key    ${input_commandText}    \\13    
    
Add OBT Remark In The PNR
    [Arguments]    ${obt_remarks}    ${retrieve_pnr}=${EMPTY}    ${end_pnr}=${EMPTY}
    @{gds_commands}    Create List    ${obt_remarks}
    Wait Until Element Is Visible    ${label_command_page}    180
    : FOR    ${gds_command}    IN    @{gds_commands}
    \    Input Text    ${input_commandText}    ${gds_command}
    \    Press Key    ${input_commandText}    \\13

Add APAY PFS Remark
    [Arguments]    ${apay_remark}    ${retrieve_pnr}=${EMPTY}    ${end_pnr}=${EMPTY}
    @{gds_commands}    Create List    ${apay_remark}
    Wait Until Element Is Visible    ${label_command_page}    180
    : FOR    ${gds_command}    IN    @{gds_commands}
    \    Input Text    ${input_commandText}    ${gds_command}
    \    Press Key    ${input_commandText}    \\13

Add CFA Remark
    [Arguments]    ${cfa_remark}    ${retrieve_pnr}=${EMPTY}    ${end_pnr}=${EMPTY}
    @{gds_commands}    Create List    ${cfa_remark}
    Wait Until Element Is Visible    ${label_command_page}    180
    : FOR    ${gds_command}    IN    @{gds_commands}
    \    Input Text    ${input_commandText}    ${gds_command}
    \    Press Key    ${input_commandText}    \\13

Verify Default Ticket Segments
    [Arguments]    ${expected_tktNo}
    #@{tkt_no}    Create List    ${expected_tktSegment}
    Set Test Variable    ${elements_count}    
    Wait Until Element Is Visible    ${tab_supplemental_fees}    60
    ${elements_count}    Get Element Count    //input[@id='segment']
    Log    ${elements_count}
    #${elements_count}    Evaluate    ${elements_count} - 1
	    : FOR    ${tkt_index}    IN RANGE    0    ${elements_count}
	    \    Set Test Variable    ${div_index}    ${tkt_index}
	    \    #Log    "${tab_supplemental_fees}" "${div_ticket_row_start}" "${div_index}" "${div_ticket_row_end}" "${input_ticket_segment}"
	    \    ${tkt_no}    Get Value    ${tab_supplemental_fees}${div_ticket_row_start}${div_index}${div_ticket_row_end}${input_ticket_segment}
	    \    Log    ${input_segment}
	    \    ${tkt_index}    Evaluate    ${tkt_index} + 1
	    \    Run Keyword And Continue On Failure    Should Be Equal    ${expected_tktNo}    ${tkt_no}    
	    \    Log    Expected: ${expected_tktNo}
	    \    Log    Actual: ${tkt_no}
	Take Screenshot
    
Verify Default Fee In Ticket Segments
    [Arguments]    ${expected_fee_amount}
    Wait Until Element Is Visible    ${tab_supplemental_fees}    60
        : FOR    ${fee_index}    IN RANGE    0    ${elements_count}
	    \    Set Test Variable    ${div_index}    ${fee_index}
	    \    ${fee_value}    Get Value    ${tab_supplemental_fees}${div_ticket_row_start}${div_index}${div_ticket_row_end}${input_fee}
	    \    ${fee_index}    Evaluate    ${fee_index} + 1
	    \    Run Keyword And Continue On Failure    Should Be Equal    ${expected_fee_amount}    ${fee_value}
	    \    Log    Expected: ${expected_fee_amount}
	    \    Log    Actual: ${fee_value}    
    Take Screenshot
    
Verify Default Fee Code in Ticket Segments
    [Arguments]    ${expected_fee_code}
    Wait Until Element Is Visible    ${tab_supplemental_fees}    60
        : FOR    ${fee_index}    IN RANGE    0    ${elements_count}
	    \    Set Test Variable    ${div_index}    ${fee_index}
	    \    ${fee_code}    Get Value    ${tab_supplemental_fees}${div_ticket_row_start}${div_index}${div_ticket_row_end}${input_feeCode}
	    \    ${fee_index}    Evaluate    ${fee_index} + 1
	    \    Run Keyword And Continue On Failure    Should Be Equal    ${expected_fee_code}    ${fee_code}
	    \    Log    Expected: ${expected_fee_code}
	    \    Log    Actual: ${fee_code}    
    Take Screenshot
	    
Tick Schedule Change For First Segment   
    Wait Until Element Is Visible    ${tab_supplemental_fees}    60
	Select Checkbox    ${tab_supplemental_fees}[1]${checkbox_schedule_change}
    Take Screenshot    
    
Tick Schedule Change For Second Segment  
    Wait Until Element Is Visible    ${tab_supplemental_fees}    60
	Select Checkbox    ${tab_supplemental_fees}[2]${checkbox_schedule_change}
    Take Screenshot    

Retrieve PNR
    @{gds_commands}    Create List    RT    RTLFROH8
	    : FOR    ${gds_command}    IN    @{gds_commands}
	    \    Input Text    ${input_commandText}    ${gds_command}
	    \    Press Key    ${input_commandText}    \\13

Select Supplemental Fee For First Tkt
    Wait Until Element Is Visible    ${tab_supplemental_fees}[1]${div_addFee_button}    30
    Click Button    ${tab_supplemental_fees}[1]${div_addFee_button}
    Wait Until Element Is Visible    ${input_supplementalFee_chckbox}[1]${input_feeCode}    30
    Select Checkbox    ${input_supplementalFee_chckbox}[1]${input_feeCode}   
    Take Screenshot    
        
Move Single Passenger With Multiple Segment For Dom Canada With TSTs
    Move Single Passenger
    Add Canada Domestic Segment And Store Mulitple Fare
    Add SSR Document In The PNR    SR DOCS AC HK1-P-GBR-00823451-GB-30JUN73-M-14APR09-JUAREZ-ROSE/S2
    Add SSR Document In The PNR    SR DOCS AC HK1-P-GBR-00823451-GB-30JUN73-M-14APR09-JUAREZ-ROSE/S3
    Add FS And Commission Line In The PNR    FS02    FM10.00
    Finish PNR
    Create Multiple TKT Exchange PNR In The GDS
    
Move Single Passenger With Multiple Segment For Transborder With TSTs
    Move Single Passenger
    Add Transborder Segment And Store Multiple Fare
    Add SSR Document In The PNR    SR DOCS AC HK1-P-GBR-00823451-GB-30JUN73-M-14APR09-JUAREZ-ROSE/S2
    Add SSR Document In The PNR    SR DOCS AC HK1-P-GBR-00823451-GB-30JUN73-M-14APR09-JUAREZ-ROSE/S3
    Add FS And Commission Line In The PNR    FS02    FM10.00
    Finish PNR
    Create Multiple TKT Exchange PNR In The GDS

Move Single Passenger With Single Segment For International With TSTs
    Move Single Passenger
    Add International Segment And Store Single Fare
    Add SSR Document In The PNR    SR DOCS AC HK1-P-GBR-00823451-GB-30JUN73-M-14APR09-JUAREZ-ROSE/S2
    Add FS And Commission Line In The PNR    FS02    FM10.00
    Finish PNR
    Create Exchange PNR In The GDS
    
Move Single Passenger With Single Segment For International With Non Exch Ticket
    Move Single Passenger
    Add International Segment And Store Single Fare
    Add SSR Document In The PNR    SR DOCS AC HK1-P-GBR-00823451-GB-30JUN73-M-14APR09-JUAREZ-ROSE/S2
    Add FS And Commission Line In The PNR    FS02    FM10.00
    Finish PNR
    
Move Single Passenger With Transborder Segments And Single Ticket For OBT
    Create And Ticket PNR With Airline Code AF
    Add OBT Remark In The PNR    RM*EB/-EBA    RFCWTPTEST    ER
    
Move Single Passenger With Transborder Segments And Single Ticket
    Create And Ticket PNR With Airline Code AF
    Add APAY PFS Remark    RMT/TKT1-VN-PFS/BA-750.00/TX1-1.00XG/TX2-2.00RC/TX3-3.00XQ/TX4-4.00XT/S2    RFCWTPTEST    ER
    
Verify OBT PNR defaults Fee For Tkt And Write No Fee Code In The PNR
    Click Fees Panel
    Verify Default Ticket Segments    1
    Verify Default Fee In Ticket Segments    NFR
    Finish PNR
    Verify Specific Remark Is Written In The PNR    RMF SUPFEE1-NFR   
    
Verify Non OBT PNR defaults Fee For Tkt And Write No Fee Code In The PNR
    Click Fees Panel
    Verify Default Ticket Segments    1
    Verify Default Fee In Ticket Segments    NFM
    Finish PNR
    Verify Specific Remark Is Written In The PNR    RMF SUPFEE1-NFM
    
Verify Selected Schedule Change Fees In The PNR
    Add CFA Remark    RM*CF/-NRD0000000N    RFCWTPTEST    ER    
    Click Fees Panel
    Verify Default Ticket Segments    1
    Tick Schedule Change For First Segment
    Verify Default Fee Code in Ticket Segments    ATD
    Verify Default Fee In Ticket Segments    30.00
    Verify Default Ticket Segments    2
    Tick Schedule Change For Second Segment
    Verify Default Fee Code in Ticket Segments    ATD
    Verify Default Fee In Ticket Segments    30.00
    Finish PNR
    Verify Specific Remark Is Written In The PNR    SUPFEE1-ATD30.00/S2
    Verify Specific Remark Is Written In The PNR    SUPFEE2-ATD30.00/S3        
    
Verify Exchange Flat Fee With Supplemental Fee For Exchange Tkt And Write Remarks In The PNR
    Add CFA Remark    RM*CF/-RH60000000N    RFCWTPTEST    ER
    Click Fees Panel
    Verify Default Ticket Segments    1
    Verify Default Fee Code in Ticket Segments    ATB
    Verify Default Fee In Ticket Segments    27.00
    Verify Default Ticket Segments    2
    Select Supplemental Fee For First Tkt
    Verify Default Fee Code in Ticket Segments    ATB
    Verify Default Fee In Ticket Segments    27.00
    Finish PNR
    Verify Specific Remark Is Written In The PNR    SUPFEE1-ATB27.00/ESD/S2
    Verify Specific Remark Is Written In The PNR    SUPFEE2-ATB27.00/S3
    
Verify Special Fee For Air Ticket
    Add CFA Remark    Add CFA Remark    RFCWTPTEST    ER
    Click Fees Panel
    Verify Default Ticket Segments    1
    Verify Default Fee Code in Ticket Segments    ATI
    Verify Default Fee In Ticket Segments    60.00
    Finish PNR
    Verify Specific Remark Is Written In The PNR    SUPFEE1-ATI60.00
    

    