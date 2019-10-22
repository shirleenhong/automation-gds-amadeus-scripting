*** Settings ***
Library           String
Library           SeleniumLibrary
Library           Collections
Library           Screenshot
Library           DateTime
Resource          base.robot
Resource          amadeus.robot
Resource          payment.robot
Resource          ticketing.robot
Resource          reporting.robot
Resource          remarks.robot
Resource          queues.robot

*** Variables ***
${select_segment_type}    //select[@id='segmentType']
${input_airline_code}    css=#airlineCode
${input_zz_airline}    css=#zzairlineCode
${input_zzz_departure}    css=#zzdepartureCity
${input_zzz_arrival}    css=#zzdestinationCity
${input_flight_number}    css=#flightNumber
${input_class_service}    css=#classService
${input_departure_city}    css=#departureCity
${input_destination_city}    css=#destinationCity
${input_departure_date}    css=#departureDate
${input_arrival_date}    css=#arrivalDate
${input_departure_time}    css=#departureTime
${input_arrival_time}    css=#arrivalTime
${input_airline_recloc}    css=#airlineRecloc
${button_save_passive}    xpath=//button[contains(text(), 'Save')]
${button_add_segment_toPNR}    xpath=//button[contains(text(),'Add Segments To PNR')]

*** Keywords ***
Add And Verify Air Segment for Non ZZ Details In The PNR
    Navigate To Page Add Segment
    Wait Until Element Is Visible    ${select_segment_type}
    Select From List By Label    ${select_segment_type}    Air
    Enter Value    ${input_airline_code}    AC
    Enter Value    ${input_flight_number}    8901
    Enter Value    ${input_class_service}    Y
    Enter Value    ${input_departure_city}    YUL
    Enter Value    ${input_destination_city}    CDG
    Enter Value    ${input_departure_date}    01022020
    Enter Value    ${input_arrival_date}    01032020
    Enter Value    ${input_departure_time}    0330PM
    Enter Value    ${input_arrival_time}    0515PM
    Enter Value    ${input_airline_recloc}    ARL1234
    Take Screenshot    
    Click Add Passive Save Button
    Click Add Segment to PNR    
    Verify Specific Remark Is Written In The PNR    AC8901 Y 02JAN
    Verify Specific Remark Is Written In The PNR    1 YULCDG GK1 1530 1715 03JAN ARL1234    True
    
    
Add And Verify Air Segment for ZZ In The PNR
    Navigate To Page Add Segment
    Wait Until Element Is Visible    ${select_segment_type}
    Select From List By Label    ${select_segment_type}    Air
    Enter Value    ${input_airline_code}    ZZ
    Enter Value    ${input_zz_airline}    Air Canada
    Enter Value    ${input_flight_number}    8888
    Enter Value    ${input_class_service}    Y
    Enter Value    ${input_departure_city}    ZZZ
    Enter Value    ${input_zzz_departure}    Departure ZZZ
    Enter Value    ${input_destination_city}    ZZZ
    Enter Value    ${input_zzz_arrival}    Arrival ZZZ
    Enter Value    ${input_departure_date}    01022020
    Enter Value    ${input_arrival_date}    01032020
    Enter Value    ${input_departure_time}    0330PM
    Enter Value    ${input_arrival_time}    0515PM
    Enter Value    ${input_airline_recloc}    ARL76
    Take Screenshot    
    Click Add Passive Save Button
    Click Add Segment to PNR
    Verify Specific Remark Is Written In The PNR    AC8901 Y 02JAN
    Verify Specific Remark Is Written In The PNR    1 YULCDG GK1 1530 1715 03JAN ARL76    True
    
Click Add Passive Save Button
    Wait Until Element Is Visible    ${button_save_passive}
    Click Element    ${button_save_passive}
    
Click Add Segment to PNR
    Wait Until Element Is Visible    ${button_add_segment_toPNR}    
    Click Element    ${button_add_segment_toPNR}
    