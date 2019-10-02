*** Settings ***
Force Tags        corp
Library           String
Library           SeleniumLibrary
Library           Collections
Library           Screenshot
Resource          ../../pages/amadeus.robot
Resource          ../../pages/base.robot
Resource          ../../pages/payment.robot
Resource          ../../pages/reporting.robot
Resource          ../../pages/ticketing.robot
Resource          ../../../resources/common/api-utilities.txt

*** Test Cases ***
Verify That PNRs For Client Lilly Is Correctly Queued To Approval Queue
    [Tags]    us13271
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Client Lilly With Udid 50 NORAM-ASSOCIATE-S, Air Only, Intl Route
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
     
Verify That PNRs For Client Lilly With Domestic Route Do Not Go Thru Approval Process
    [Tags]    us13271
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Client Lilly With Udid 50 NORAM-ASSOCIATE-S, Air Only, Dom Route
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
     
Verify That PNRs For Client Lilly With Trans Route Do Not Go Thru Approval Process
    [Tags]    us13271
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Client Lilly With Udid 50 NORAM-ASSOCIATE-S, Air Only, Trans Route
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
Verify That Car Only PNRs For Client Lilly Do Not Go Thru Approval Process
    [Tags]    us13271
    Login To Amadeus Sell Connect Acceptance
    Create PNR For Client Lilly With Udid 50 NORAM-ASSOCIATE-S, Car Only
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
Verify That Car & Hotel Only PNRs For Client Lilly Do Not Go Thru Approval Process
    [Tags]    us13271
    Login To Amadeus Sell Connect Acceptance
    Create PNR For Client Lilly With Udid 50 NORAM-ASSOCIATE-S, Car And Hotel Only
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
Verify That PNRs For Client Lilly Can Skip Approval Process
    [Tags]    us13271
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Client Lilly With Udid 50 NORAM-ASSOCIATE-S, Mix Segments, Intl Route
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
Verify That PNRs For Client Lilly With U*50 As Guest Do Not Go Thru Approval Process
    [Tags]    us13271
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Client Lilly With Udid 50 GUEST, Air Only, Intl Route
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly

*** Keywords ***
Verify PNR Approval Is Processed Correctly
    Finish PNR
    Run Keyword If    "${queue_approval}" == "Yes"    Verify Specific Remark Is Written In The PNR   RMQ YTOWL2107/50C3
    ...    ELSE    Verify Specific Remark Is Not Written In The PNR   RMQ YTOWL2107/50C3
    Run Keyword If    "${remark_added}" != "None"    Verify Specific Remark Is Written In The PNR   ${remark_added}   
    Run Keyword If    "${onhold_rmk}" == "Yes"    Verify Specific Remark Is Written In The PNR   TKTL${tktl_date}/YTOWL2106/Q8C1-ONHOLD
    Run Keyword If    "${queue_tkt}" == "Yes"    Verify Specific Remark Is Written In The PNR   RMQ YTOWL2107/70C1
    ...    ELSE    Verify Specific Remark Is Not Written In The PNR   RMQ YTOWL2107/70C1

Create PNR With Passive Air Segments For ${client_data}
    Get Test Data From Json    ${CURDIR}${/}lilly_test_data    ${client_data}
    Create ${num_air_segments} Test Dates
    Move Profile to GDS    NM1${psngr_1}    RM*U25/-A:${udid25}    APE-${email}    RM*CN/-${consultant_num}    RM*CF/-${cfa}0000000C    RM*BOOK-YTOWL220N/TKT-YTOWL2106/CC-CA    ${tkt_line}    FS02    FM10    FPCASH    RM*U50/-${udid50}
    Run Keyword If    "${num_air_segments}" != "0"    Book ${num_air_segments} Passive Air Segments
    Run Keyword If    "${num_car_segments}" != "0"    Add ${num_car_segments} Car Segments
    Run Keyword If    "${num_htl_segments}" != 0    Add ${num_htl_segments} Hotel Segments
    
Create PNR With Active Air Segments For ${client_data}
    ${client_name}    Get Client Name    ${client_data}
    Get Test Data From Json    ${CURDIR}${/}test_data/${client_name}_test_data    ${client_data}
    Create ${num_air_segments} Test Dates
    Move Profile to GDS    NM1${psngr_1}    RM*U25/-A:${udid25}    APE-${email}    RM*CN/-${consultant_num}    RM*CF/-${cfa}0000000C    RM*BOOK-YTOWL220N/TKT-YTOWL2106/CC-CA    ${tkt_line}    FS02    FM10    FPCASH    RM*U50/-${udid50}
    Run Keyword If    "${num_air_segments}" != "0"    Book ${num_air_segments} Active Air Segments
    Run Keyword If    "${num_car_segments}" != "0"    Add ${num_car_segments} Car Segments
    Run Keyword If    "${num_htl_segments}" != 0    Add ${num_htl_segments} Hotel Segments
    Run Keyword If    "${other_rmk_1}" != "None"    Add Other Remarks
    
Get Client Name
    [Arguments]    ${test_data_string}
    @{split_string}    Split String     ${test_data_string}    ${SPACE}
    ${client_name}    Convert To Lowercase    ${split_string[1]}
    [Return]    ${client_name}
    
Create PNR For ${client_data}
    Get Test Data From Json    ${CURDIR}${/}lilly_test_data    ${client_data}
    Create ${num_air_segments} Test Dates
    Move Profile to GDS    NM1${psngr_1}    RM*U25/-A:${udid25}    APE-${email}    RM*CN/-${consultant_num}    RM*CF/-${cfa}0000000C    RM*BOOK-YTOWL220N/TKT-YTOWL2106/CC-CA    ${tkt_line}    FS02    FM10    FPCASH    RM*U50/-${udid50}
    Run Keyword If    "${num_car_segments}" != "0"    Add ${num_car_segments} Car Segments
    Run Keyword If    "${num_htl_segments}" != 0    Add ${num_htl_segments} Hotel Segments
    Run Keyword If    "${other_rmk_1}" != "None"    Add Other Remarks

Enter GDS Command
    [Arguments]    ${gds_command}
    Input Text    ${input_commandText}     ${gds_command}
    Press Key    ${input_commandText}    \\13
    Wait Until Element Is Not Visible    ${icon_processing}    10

Get Other Remark Values From Json
    [Arguments]    ${json_file_object}     ${client_data}
    : FOR    ${i}    IN RANGE    0     99
    \    ${i}    Evaluate    ${i} + 1
    \    ${exists}     Run Keyword And Return Status      Get Json Value As String    ${json_file_object}    $.['${client_data}'].OtherRemarks${i}
    \    ${other_rmk}     Run Keyword If    "${exists}" == "True"     Get Json Value As String    ${json_file_object}    $.['${client_data}'].OtherRemarks${i}
    \    Set Test Variable    ${other_rmk_${i}}     ${other_rmk}
    \    Exit For Loop If    "${exists}" == "False" or "${other_rmk_${i}}" == "None" 
    
Add Other Remarks
    : FOR    ${i}    IN RANGE   0    99
    \    ${i}    Evaluate    ${i} + 1
    \    ${exists}     Run Keyword And Return Status      Should Not Be Empty    ${other_rmk_${i}}
    \    Run Keyword If    "${exists}" == "True" and "${other_rmk_${i}}" != "None"     Enter GDS Command    ${other_rmk_${i}}
    \    Exit For Loop If    "${exists}" == "False"
    
Book ${numberOfAir} Passive Air Segments
    Create ${numberOfAir} Test Dates
    : FOR    ${i}    IN RANGE   0   ${numberOfAir}
    \    ${i}    Evaluate    ${i} + 1
    \    Enter GDS Command    SS ${airline_code_${i}}1074 Y ${test_date_${i}} ${air_seg_route_${i}} GK1 / 11551440 / ABCDEFG
        
Book ${numberOfAir} Active Air Segments
    Create ${numberOfAir} Test Dates
    : FOR    ${i}    IN RANGE   0   ${numberOfAir}
    \    ${i}    Evaluate    ${i} + 1   
    \    Enter GDS Command    AN${test_date_${i}}${air_seg_route_${i}}/A${airline_code_${i}}
    \    Enter GDS Command    ${input_commandText}    SS1Y1
    \    Run Keyword If    "${price_cmd_${i}}" != "None"    Enter GDS Command    ${price_cmd_${i}}

Get Test Data From Json     
    [Arguments]    ${file_name}     ${client_data}
    ${json_file_object}    Get File    ${file_name}.json     encoding=iso-8859-1    encoding_errors=strict
    Get Passenger Info From Json     ${json_file_object}    ${client_data}
    Get Air Segment Values From Json     ${json_file_object}    ${client_data}
    Get Other Remark Values From Json     ${json_file_object}    ${client_data}
    Get Expected Approval Values From Json    ${json_file_object}    ${client_data}
    ${num_car_segments}    Get Json Value As String    ${json_file_object}    $.['${client_data}'].NumCarSegments
    ${num_htl_segments}    Get Json Value As String    ${json_file_object}    $.['${client_data}'].NumHotelSegments
    Set Test variable    ${num_car_segments}
    Set Test variable    ${num_htl_segments}
    
Get Passenger Info From Json
    [Arguments]    ${json_file_object}     ${client_data}
    ${psngr_1}    Get Json Value As String    ${json_file_object}    $.['${client_data}'].PassengerName1
    ${cfa}    Get Json Value As String    ${json_file_object}    $.['${client_data}'].Client
    ${udid50}    Get Json Value As String    ${json_file_object}    $.['${client_data}'].Udid50
    ${udid25}    Get Json Value As String    ${json_file_object}    $.['${client_data}'].Udid25
    ${email}    Get Json Value As String    ${json_file_object}    $.['${client_data}'].Email
    ${consultant_num}    Get Json Value As String    ${json_file_object}    $.['${client_data}'].ConsultantNo
    ${tkt_line}    Get Json Value As String    ${json_file_object}    $.['${client_data}'].TicketingLine
    ${form_of_payment}    Get Json Value As String    ${json_file_object}    $.['${client_data}'].FormOfPayment
    Set Test Variable    ${psngr_1}
    Set Test Variable    ${cfa}
    Set Test Variable    ${udid50}
    Set Test Variable    ${udid25}
    Set Test Variable    ${email}
    Set Test Variable    ${consultant_num}
    Set Test Variable    ${tkt_line}
    Set Test Variable    ${form_of_payment}

Get Expected Approval Values From Json
    [Arguments]    ${json_file_object}     ${client_data}
    ${with_ui}    Get Json Value As String    ${json_file_object}    $.['${client_data}'].WithUI
    ${ignore_approval}    Get Json Value As String    ${json_file_object}    $.['${client_data}'].IgnoreApproval
    ${primary_approval_reason}    Get Json Value As String    ${json_file_object}    $.['${client_data}'].PrimaryApprovalReason
    ${secondary_approval_reason}    Get Json Value As String    ${json_file_object}    $.['${client_data}'].SecondaryApprovalReason
    ${approver_name}    Get Json Value As String    ${json_file_object}    $.['${client_data}'].ApproverName
    ${addtl_message}    Get Json Value As String    ${json_file_object}    $.['${client_data}'].AdditionalMessage
    ${queue_approval}    Get Json Value As String    ${json_file_object}    $.['${client_data}'].QueueToApproval
    ${remark_added}    Get Json Value As String    ${json_file_object}    $.['${client_data}'].RemarkAdded
    ${onhold_rmk}    Get Json Value As String    ${json_file_object}    $.['${client_data}'].OnHoldRmk
    ${queue_tkt}    Get Json Value As String    ${json_file_object}    $.['${client_data}'].QueueToTkt
    Set Test Variable    ${with_ui}
    Set Test Variable    ${ignore_approval}
    Set Test Variable    ${primary_approval_reason}
    Set Test Variable    ${secondary_approval_reason}
    Set Test Variable    ${approver_name}
    Set Test Variable    ${addtl_message}
    Set Test Variable    ${queue_approval}
    Set Test Variable    ${remark_added}
    Set Test Variable    ${onhold_rmk}
    Set Test Variable    ${queue_tkt}

Get Air Segment Values From Json
    [Arguments]    ${json_file_object}     ${client_data}
    ${num_air_segments}    Get Json Value As String    ${json_file_object}    $.['${client_data}'].NumAirSegments
    Set Test variable    ${num_air_segments}
    : FOR     ${i}    IN RANGE    1    5
    \    ${air_seg_route}    Get Json Value As String    ${json_file_object}    $.['${client_data}'].AirSegmentRoute${i}
    \    ${airline_code}    Get Json Value As String   ${json_file_object}    $.['${client_data}'].AirlineCode${i}
    \    ${price_cmd}    Get Json Value As String    ${json_file_object}    $.['${client_data}'].PriceCommand${i}
    \    Set Test Variable    ${air_seg_route_${i}}    ${air_seg_route}
    \    Set Test Variable    ${airline_code_${i}}    ${airline_code}
    \    Set Test Variable    ${price_cmd_${i}}    ${price_cmd}
    \    ${i}    Evaluate    ${i} + 1