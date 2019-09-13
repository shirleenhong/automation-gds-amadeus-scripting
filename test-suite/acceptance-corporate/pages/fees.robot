*** Settings ***
Library           String
Library           SeleniumLibrary
Library           Collections
Library           Screenshot
Resource          base.robot

*** Variables ***
${tab_supplemental_fees}    //div[@formarrayname='segments']
${checkbox_schedule_change}    //input[@id='isExchange']
${list_supplementalFee}    //select[@id='supplementalFee']
${list_no_feeCode}    //select[@id='noFeeCode']
${div_ticket_row_start}    //div[@ng-reflect-name='
${div_ticket_row_end}    ']
${input_ticket_segment}    //input[@id='segment']
${input_fee}    //input[@id='fee']


*** Keywords ***
Add Specific Fees For Single the Ticketed PNR
    Move Single Passenger With Multiple Segment With TSTs
    Navigate To Page Fees
    
Add Single Segment And Store Mulitple Fare
    @{gds_commands}    Create List    AN10JANYYCYEG/AAC    SS1Y1    FXP/S2    AN15JANYEGYYC/AAC    SS1Y1    FXP/S3
    Wait Until Element Is Visible    ${label_command_page}    180
    : FOR    ${gds_command}    IN    @{gds_commands}
    \    Input Text    ${input_commandText}    ${gds_command}
    \    Press Key    ${input_commandText}    \\13

Move Single Passenger With Multiple Segment With TSTs
    Move Single Passenger
    Add Single Segment And Store Mulitple Fare
    Finish PNR
    Create Multiple TKT Exchange PNR In The GDS
    
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
	    \    Log    "${tab_supplemental_fees}" "${div_ticket_row_start}" "${div_index}" "${div_ticket_row_end}" "${input_ticket_segment}"
	    \    ${tkt_no}    Get Value    ${tab_supplemental_fees}${div_ticket_row_start}${div_index}${div_ticket_row_end}${input_ticket_segment}
	    \    Log    ${input_segment}
	    \    ${tkt_index}    Evaluate    ${tkt_index} + 1
	    \    Run Keyword And Continue On Failure    Should Be Equal    ${expected_tktNo}    ${tkt_no}    
	    \    Log    Expected: ${expected_tktNo}
	    \    Log    Actual: ${tkt_no}
	    
Verify Default Fee In Ticket Segments
    [Arguments]    ${expected_fee_amount}
    Wait Until Element Is Visible    ${tab_supplemental_fees}    60
        : FOR    ${fee_index}    IN RANGE    0    ${elements_count}
	    \    Set Test Variable    ${div_index}    ${fee_index}
	    \    ${fee_value}    Get Value    {tab_supplemental_fees}${div_ticket_row_start}${div_index}${div_ticket_row_end}${input_fee}
	    \    ${fee_index}    Evaluate    ${fee_index} + 1
	    \    Run Keyword And Continue On Failure    Should Be Equal    ${expected_fee_amount}    ${fee_value}
	    \    Log    Expected: ${expected_fee_amount}
	    \    Log    Actual: ${fee_value}    
	    
Tick Schedule Change For First Segment   
    Wait Until Element Is Visible    ${tab_supplemental_fees}    60
	Select Checkbox    ${tab_supplemental_fees}[1]${checkbox_schedule_change}
    Take Screenshot    
    
Tick Schedule Change For Second Segment  
    Wait Until Element Is Visible    ${tab_supplemental_fees}    60
	Select Checkbox    ${tab_supplemental_fees}[2]${checkbox_schedule_change}
    Take Screenshot
    
Select No fee Code For First Segment
    
    

Retrieve PNR
    @{gds_commands}    Create List    RT    RTLFROH8
	    : FOR    ${gds_command}    IN    @{gds_commands}
	    \    Input Text    ${input_commandText}    ${gds_command}
	    \    Press Key    ${input_commandText}    \\13
	        
	    


    