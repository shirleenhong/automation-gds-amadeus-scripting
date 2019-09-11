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
${input_segment}    //input[@id='segment']

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
    


    