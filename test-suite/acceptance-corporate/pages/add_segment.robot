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
Resource          ../../resources/common/api-utilities.txt

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
#-----Rail Variables-----
${input_train_number}    css=#trainNumber
${input_from_station}    css=#fromStation
${input_arrival_station}    css=#arrivalStation
${input_car_number}    css=#carNumber
${input_seat_number}    css=#seatNumber
${input_vendor_name}    css=#vendorName
${input_vendor_code}    css=#vendorCode
${input_confirmation_number}    css=#confirmationNo

*** Keywords ***
Add And Verify Air Segment for Non ZZ Details In The PNR
    Navigate To Page Add Passive Segment
    Wait Until Element Is Visible    ${select_segment_type}
    Select From List By Label    ${select_segment_type}    Air
    Enter Value    ${input_airline_code}    AC
    Enter Value    ${input_flight_number}    8901
    Enter Value    ${input_class_service}    Y
    Enter Value    ${input_departure_city}    YUL
    Enter Value    ${input_destination_city}    CDG  
    Input Text    ${input_departure_date}    01022020
    Input Text    ${input_arrival_date}    01032020
    Enter Value    ${input_departure_time}    0330PM
    Enter Value    ${input_arrival_time}    0515PM
    Enter Value    ${input_airline_recloc}    ARL1234
    Take Screenshot    
    Click Add Passive Save Button
    Sleep    3
    Click Add Segment to PNR    
    Close CA Corporate Test
    Switch To Graphic Mode
    Get PNR Details
    Verify Specific Remark Is Written In The PNR    AC8901 Y 02JAN
    Verify Specific Remark Is Written In The PNR    YULCDG GK1${SPACE}${SPACE}1530 1715${SPACE}${SPACE}03JAN${SPACE}${SPACE}${SPACE}${SPACE}${SPACE}ARL1234
    
    
Add And Verify Air Segment for ZZ In The PNR
    Navigate To Page Add Passive Segment
    Wait Until Element Is Visible    ${select_segment_type}
    Select From List By Label    ${select_segment_type}    Air
    Enter Value    ${input_airline_code}    ZZ
    Input Text    ${input_zz_airline}    AC
    Enter Value    ${input_flight_number}    8888
    Enter Value    ${input_class_service}    Y
    Enter Value    ${input_departure_city}    ZZZ
    Input Text    ${input_zzz_departure}    ZZZ
    Enter Value    ${input_destination_city}    ZZZ
    Input Text    ${input_zzz_arrival}    ZZZ
    Input Text    ${input_departure_date}    01022020
    Input Text    ${input_arrival_date}    01032020
    Enter Value    ${input_departure_time}    0330PM
    Enter Value    ${input_arrival_time}    0515PM
    Enter Value    ${input_airline_recloc}    ARL76
    Take Screenshot    
    Click Add Passive Save Button
    Sleep    3
    Click Add Segment to PNR    
    Close CA Corporate Test
    Switch To Graphic Mode
    Get PNR Details
    Verify Specific Remark Is Written In The PNR    ZZ8888 Y 02JAN
    Verify Specific Remark Is Written In The PNR    ZZZZZZ GK1${SPACE}${SPACE}1530 1715${SPACE}${SPACE}03JAN${SPACE}${SPACE}${SPACE}${SPACE}${SPACE}ARL76
    Verify Specific Remark Is Written In The PNR    RIR FLIGHT IS CONFIRMED WITH ZZ/S2    
    Verify Specific Remark Is Written In The PNR    RIR DEPARTURE CITY IS ZZZ/S2
    Verify Specific Remark Is Written In The PNR    RIR ARRIVAL CITY IS ZZZ/S2        
    
    
Click Add Passive Save Button
    Wait Until Element Is Visible    ${button_save_passive}    60
    Click Element    ${button_save_passive}
    
Click Add Segment to PNR
    Wait Until Element Is Visible    ${button_add_segment_toPNR}    60
    Click Element    ${button_add_segment_toPNR}
    
#-----Keyword For Rail-----
