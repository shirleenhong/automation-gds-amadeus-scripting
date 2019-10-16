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


*** Keywords ***
Add And Verify Air Segment for Non ZZ Details In The PNR
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
    Click Save Button
    Verify Expected Remarks Are Written In The PNR
    
Add And Verify Air Segment for ZZ In The PNR
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
    Click Save Button
    Verify Expected Remarks Are Written In The PNR
    