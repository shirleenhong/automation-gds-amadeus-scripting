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
${input_chain_code}    css=#chainCode
${input_policyNo}    css=#policyNo
${input_nightly_rate}    css=#nightlyRate
${input_rate_type}    css=#rateType
${select_room_type}    css=#roomType
${input_additional_info}    css=#additionalInfo
${input_room_confirmed}    css=#confirmedWith
${select_hotel_code}    css=#hotelCode
${input_hotel_city}    css=#hotelCityName
${input_hotel_name}    css=#hotelName
${input_phone}    css=#phone
${input_fax}    css=#fax
${input_address}    css=#address
${input_country}    css=#country
${input_zipCode}    css=#zipCode
${select_provice}    css=#province
${input_train_number}    css=#trainNumber
${input_from_station}    css=#fromStation
${input_arrival_station}    css=#arrivalStation
${input_car_number}    css=#carNumber
${input_seat_number}    css=#seatNumber
${input_vendor_name}    css=#vendorName
${input_vendor_code}    css=#vendorCode
${input_confirmation_number}    css=#confirmationNo

*** Keywords ***
Add Passive Hotel Segment ${with_optional} Values On Optional Fields
    Navigate To Page Add Passive Segment
    Wait Until Element Is Visible    ${select_segment_type}
    Select From List By Label    ${select_segment_type}    Hotel
    Enter Value    ${input_chain_code}    HI
    Enter Value    ${input_departure_city}    YYZ
    Input Text    ${input_departure_date}    02102020
    Input Text     ${input_arrival_date}    02132020
    Enter Value    ${input_policyNo}    24HRS
    Enter Value    ${input_nightly_rate}     100.00   
    Enter Value    ${input_rate_type}     hotel
    Enter Value    ${input_confirmation_number}     cf12345678
    Run Keyword If   "${with_optional}" == "With"   Select From List By Label    ${select_room_type}    Double Room 
    Run Keyword If   "${with_optional}" == "With"   Enter Value    ${input_additional_info}    Hotel Additional Info
    Run Keyword If   "${with_optional}" == "With"   Enter Value    ${input_room_confirmed}    Hotel Testing
    Select From List By Index    ${select_hotel_code}     1
    Set Test Variable    ${is_manual_entered}    no
    Set Test Variable    ${with_optional}
    Take Screenshot
    Get Hotel Details
    Click Add Passive Save Button
    Click Add Segment to PNR    yes
    
Get Hotel Details
    Sleep   3
    ${hotel_city}    Get Element Attribute     ${input_hotel_city}    ng-reflect-model
    ${hotel_name}    Get Element Attribute   ${input_hotel_name}    ng-reflect-model
    ${hotel_phone}    Get Element Attribute    ${input_phone}    ng-reflect-model
    ${hotel_fax}    Get Element Attribute    ${input_fax}    ng-reflect-model
    ${hotel_address}    Get Element Attribute    ${input_address}   ng-reflect-model
    ${hotel_country}    Get Element Attribute    ${input_country}    ng-reflect-model
    ${hotel_zip_code}    Get Element Attribute    ${input_zipCode}    ng-reflect-model
    Press Key    css=#zipCode    \\09
    Set Test Variable    ${hotel_city}
    Set Test Variable    ${hotel_name}
    Set Test Variable    ${hotel_phone}
    Set Test Variable    ${hotel_fax}
    Set Test Variable    ${hotel_address}
    Set Test Variable    ${hotel_country}
    Set Test Variable    ${hotel_zip_code}
    Take Screenshot
    
Add Passive Hotel Segment ${with_optional} Hotel Details Input
    Navigate To Page Add Passive Segment
    Wait Until Element Is Visible    ${select_segment_type}
    Select From List By Label    ${select_segment_type}    Hotel
    Enter Value    ${input_chain_code}    AC
    Enter Value    ${input_departure_city}    YYZ
    Input Text    ${input_departure_date}    02102020
    Input Text     ${input_arrival_date}    02132020
    Enter Value    ${input_policyNo}    24HRS
    Enter Value    ${input_nightly_rate}     100.00   
    Enter Value    ${input_rate_type}     hotel
    Select From List By Label    ${select_room_type}    Double Room 
    Enter Value    ${input_confirmation_number}     cf12345678
    Enter Value    ${input_additional_info}    Hotel Additional Info
    Enter Value    ${input_room_confirmed}    Hotel Testing
    Set Test Variable    ${with_optional}
    Populate Hotel Details Manually
    Click Add Passive Save Button
    Click Add Segment to PNR    yes
    
Populate Hotel Details Manually
    Enter Value    ${input_hotel_city}    TEST HOTEL CITY NAME
    Enter Value    ${input_hotel_name}    HOLIDAY INN CANADA
    Enter Value    ${input_phone}    +1 903 1234567
    Enter Value    ${input_fax}    +1 905 7890123
    Enter Value    ${input_address}    123 HOTEL STREET
    Enter Value    ${input_country}    CANADA
    Select From List By Label    ${select_provice}      CA - ON - Ontario
    Enter Value    ${input_zipCode}    ABC 123
    Get Hotel Details
    Set Test Variable    ${is_manual_entered}    yes
    Take Screenshot
    
Verify Hotel Segment And RIR Remarks Are Written In The PNR
    Switch To Graphic Mode
    Get PNR Details
    Verify Hotel Passive Segment Is Written    
    Verify Hotel Passive RIR Remarks Are Written
    Verify Hotel Mandatory Matrix Remark Is Written In The PNR

Verify Hotel Passive Segment Is Written
    Run Keyword If    "${with_optional}" == "With"     Verify Specific Remark Is Written In The PNR    HTL 1A HK1 YYZ 10FEB-13FEB/${hotel_city},${hotel_name} ,TEL-${hotel_phone} ,FAX-${hotel_fax},CF:CF12345678,DOUBLE ROOM,RATE:HOTEL CAD100.00/NIGHT,SI-HOTEL ADDITIONAL INFO    True
    ...  ELSE    Verify Specific Remark Is Written In The PNR    HTL 1A HK1 YYZ 10FEB-13FEB/${hotel_city},${hotel_name} ,TEL-${hotel_phone} ,FAX-${hotel_fax},CF:CF12345678,RATE:HOTEL CAD100.00/NIGHT    True

Verify Hotel Passive RIR Remarks Are Written
    Verify Specific Remark Is Written In The PNR    RIR ADDRESS-${hotel_address}/S2   
    Verify Specific Remark Is Written In The PNR    RIR ${hotel_city} ON/S2
    Verify Specific Remark Is Written In The PNR    RIR ${hotel_country} ${hotel_zip_code}/S2
    Verify Specific Remark Is Written In The PNR    RIR GUARANTEED FOR LATE ARRIVAL - NO/S2
    Verify Specific Remark Is Written In The PNR    RIR CANCELLATION POLICY - 24HRS/S2
    Run Keyword If    "${with_optional}" == "With"    Verify Specific Remark Is Written In The PNR    RIR ROOM CONFIRMED WITH - HOTEL TESTING/S2
    Run Keyword If    "${with_optional}" == "With"     Verify Specific Remark Is Written In The PNR    RIR ADDITONAL INFORMATION - HOTEL ADDITIONAL INFO/S2

Verify Hotel Mandatory Matrix Remark Is Written In The PNR   
    Run Keyword If    "${is_manual_entered}" == "no"    Verify Specific Remark Is Written In The PNR    RM *HS10FEB/-CHN-HI    ELSE    Verify Specific Remark Is Written In The PNR    RM *HS10FEB/-CHN-AC
	
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
    