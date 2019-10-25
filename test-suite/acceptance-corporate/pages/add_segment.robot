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
${input_confirmationNo}    css=#confirmationNo
${input_tour_name}    css=#tourName
${select_meal_plan}    css=#mealPlan
${input_passenger}    xpath=//input[@formcontrolname='passenger']
${start_passenger}    //div[@class='dropdown-item']//input[@value='
${end_passenger}     ']


*** Keywords ***
Add And Verify Air Segment for Non ZZ Details In The PNR
    Navigate To Page Add Passive Segment
    Wait Until Element Is Visible    ${select_segment_type}     30
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
    Wait Until Element Is Visible    ${select_segment_type}     30
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
    Click Element At Coordinates  ${button_save_passive}    0    0
    Wait Until Element Is Visible    ${button_add_passive_segment}   30
    
Add Passive Hotel Segment ${with_optional} Values On Optional Fields
    Navigate To Page Add Passive Segment
    Select From List By Label    ${select_segment_type}    Hotel
    Enter Value    ${input_chain_code}    HI
    Enter Value    ${input_departure_city}    YYZ
    Input Text    ${input_departure_date}    02102020
    Input Text     ${input_arrival_date}    02132020
    Enter Value    ${input_policyNo}    24HRS
    Enter Value    ${input_nightly_rate}     100.00   
    Enter Value    ${input_rate_type}     hotel
    Enter Value    ${input_confirmationNo}     cf12345678
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
    Select From List By Label    ${select_segment_type}    Hotel
    Enter Value    ${input_chain_code}    AC
    Enter Value    ${input_departure_city}    YYZ
    Input Text    ${input_departure_date}    02102020
    Input Text     ${input_arrival_date}    02132020
    Enter Value    ${input_policyNo}    24HRS
    Enter Value    ${input_nightly_rate}     100.00   
    Enter Value    ${input_rate_type}     hotel
    Select From List By Label    ${select_room_type}    Double Room 
    Enter Value    ${input_confirmationNo}     cf12345678
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
	
Add Passive Tour Segment ${with_optional} Optional Values
    Navigate To Page Add Passive Segment
    Select From List By Label    ${select_segment_type}    Tour
    Enter Value    ${input_vendor_code}     AB6
    Enter Value    ${input_confirmationNo}     cf12345678
    Enter Value    ${input_departure_city}    YUL
    Enter Value    ${input_destination_city}    CDG  
    Input Text    ${input_departure_date}    04022020
    Input Text    ${input_arrival_date}    04032020
    Enter Value    ${input_departure_time}    0330PM
    Enter Value    ${input_arrival_time}    0515PM
    Enter Value    ${input_tour_name}     Tour Name Test
    Run Keyword If    "${with_optional}" == "With"    Select From List By Label    ${select_room_type}    DBLB
    Run Keyword If    "${with_optional}" == "With"    Select From List By Label    ${select_meal_plan}    All Inclusive 
    Click Add Passive Save Button 
    Click Add Segment to PNR    yes
    Set Test Variable    ${with_optional}
    
Add Multiple Passive Tour Segments
    Navigate To Page Add Passive Segment
    Select From List By Label    ${select_segment_type}    Tour
    Enter Value    ${input_vendor_code}     AB6
    Enter Value    ${input_confirmationNo}     cf12345678
    Enter Value    ${input_departure_city}    YUL
    Enter Value    ${input_destination_city}    CDG  
    Input Text    ${input_departure_date}    04022020
    Input Text    ${input_arrival_date}    04032020
    Enter Value    ${input_departure_time}    0330PM
    Enter Value    ${input_arrival_time}    0515PM
    Enter Value    ${input_tour_name}     Tour Name Test
    Select From List By Label    ${select_room_type}    DBLB
    Select From List By Label    ${select_meal_plan}    All Inclusive 
    Select Passenger    1
    Click Add Passive Save Button 
    Click Add Passive Segment Button
    Select From List By Label    ${select_segment_type}    Tour
    Enter Value    ${input_vendor_code}     AO2
    Enter Value    ${input_confirmationNo}     cf98765432
    Enter Value    ${input_departure_city}    CDG
    Enter Value    ${input_destination_city}    LHR  
    Input Text    ${input_departure_date}    04102020
    Input Text    ${input_arrival_date}    04132020
    Enter Value    ${input_departure_time}    1230PM
    Enter Value    ${input_arrival_time}    1115PM
    Enter Value    ${input_tour_name}     2nd Tour
    Select From List By Label    ${select_room_type}    TRPL
    Select From List By Label    ${select_meal_plan}    American Plan 
    Select Passenger    2
    Click Add Passive Save Button 
    Click Add Segment to PNR    yes

Select Passenger
    [Arguments]   @{passenger_number}
    Click Element    ${input_passenger} 
    : FOR    ${passenger_number}    IN    @{passenger_number}
    \    Click Element    ${start_passenger}${passenger_number}${end_passenger} 
    Click Element    ${input_passenger} 
    Press Key   ${input_passenger}     \\09
    
Verify Passive Tour Segment And RIR Remarks Are Written In The PNR
    Switch To Graphic Mode
    Get PNR Details
    Verify Passive Tour Segment Is Added In The PNR    MIS 1A HK1 YUL 02APR-/TYP-TOR/SUN-ADAMS & BUTLER TOUR NAME TEST/SUC-AB6/SC-YUL/SD-02APR/ST-1530/EC-CDG/ED-03APR/ET-1715/CF-CF12345678    True
    Run Keyword If    "${with_optional}" == "With"   Verify Passive Tour RIR Remarks Is Written In The PNR     RIR DBLB ALL INCLUSIVE 1 NTS/S2   ELSE    Verify Passive Tour RIR Remarks Is Written In The PNR     RIR 1 NTS/S2
    
Verify Passive Tour Segment Is Added In The PNR
     [Arguments]   ${tour_segment remark}    ${multi_line_remark}
     Verify Specific Remark Is Written In The PNR    ${tour_segment remark}    ${multi_line_remark}

Verify Passive Tour RIR Remarks Is Written In The PNR
    [Arguments]    @{tour_rir}
    : FOR    ${tour_rir}    IN    @{tour_rir}
    \    Verify Specific Remark Is Written In The PNR    ${tour_rir}

Verify Multiple Passive Tour Segment And RIR Remarks Are Written In The PNR
    Switch To Graphic Mode
    Get PNR Details  
    Verify Passive Tour Segment Is Added In The PNR    MIS 1A HK1 YUL 02APR-/TYP-TOR/SUN-ADAMS & BUTLER TOUR NAME TEST/SUC-AB6/SC-YUL/SD-02APR/ST-1530/EC-CDG/ED-03APR/ET-1715/CF-CF12345678/P1    True
    Verify Passive Tour Segment Is Added In The PNR    MIS 1A HK1 CDG 10APR-/TYP-TOR/SUN-ABERCROMBIE & KENT 2ND TOUR/SUC-AO2/SC-CDG/SD-10APR/ST-1230/EC-LHR/ED-13APR/ET-2315/CF-CF98765432/P2    True 
    Verify Passive Tour RIR Remarks Is Written In The PNR     RIR DBLB ALL INCLUSIVE 1 NTS/S3     RIR TRPL AMERICAN PLAN 3 NTS/S4

Add Multiple Passive Rail Segment For EN PNR
    Navigate To Page Add Passive Segment
    Wait Until Element Is Visible    ${select_segment_type}
    Select From List By Label    ${select_segment_type}    Rail
    Enter Value    ${input_train_number}    TR123
    Enter Value    ${input_class_service}    CL12345
    Enter Value    ${input_from_station}    From Station Test
    Enter Value    ${input_arrival_station}    Arrival Station Test
    Enter Value    ${input_car_number}    C123
    Enter Value    ${input_seat_number}    S123
    Enter Value    ${input_departure_city}    YUL
    Input Text    ${input_departure_date}    01102020
    Input Text    ${input_arrival_date}    01112020
    Enter Value    ${input_departure_time}    0200AM
    Enter Value    ${input_arrival_time}    0500AM
    Enter Value    ${input_vendor_code}    AAA
    Enter Value    ${input_vendor_name}    Supplier Name Test
    Enter Value    ${input_confirmation_no}    CN12345678
    Click Add Passive Save Button
    Sleep    3
    Wait Until Element Is Visible    ${button_add_passive_segment}    10
    Click Add Passive Segment Button
    Wait Until Element Is Visible    ${select_segment_type}
    Select From List By Label    ${select_segment_type}    Rail
    Enter Value    ${input_train_number}    TR245
    Enter Value    ${input_class_service}    CL22222
    Enter Value    ${input_from_station}    2nd From Station
    Enter Value    ${input_arrival_station}    2nd Arrival Station
    Enter Value    ${input_seat_number}    S123
    Enter Value    ${input_departure_city}    YYZ
    Input Text    ${input_departure_date}    01152020
    Input Text    ${input_arrival_date}    01162020
    Enter Value    ${input_departure_time}    1200PM
    Enter Value    ${input_arrival_time}    0500PM
    Enter Value    ${input_vendor_code}    VIB
    Enter Value    ${input_vendor_name}    VIB remarks
    Enter Value    ${input_confirmation_no}    Conf12345
    Click Add Passive Save Button
    Click Add Segment to PNR    yes
    
Add Multiple Passive Rail Segment For FR PNR
    Navigate To Page Add Passive Segment
    Wait Until Element Is Visible    ${select_segment_type}
    Select From List By Label    ${select_segment_type}    Rail
    Enter Value    ${input_train_number}    TR123
    Enter Value    ${input_class_service}    CL12345
    Enter Value    ${input_from_station}    From Station Test
    Enter Value    ${input_arrival_station}    Arrival Station Test
    Enter Value    ${input_car_number}    C123
    Enter Value    ${input_seat_number}    S123
    Enter Value    ${input_departure_city}    YUL
    Input Text    ${input_departure_date}    01102020
    Input Text    ${input_arrival_date}    01112020
    Enter Value    ${input_departure_time}    0200AM
    Enter Value    ${input_arrival_time}    0500AM
    Enter Value    ${input_vendor_code}    AMK
    Enter Value    ${input_confirmation_no}    CN12345678
    Click Add Passive Save Button
    Sleep    3
    Wait Until Element Is Visible    ${button_add_passive_segment}    10
    Click Add Passive Segment Button
    Wait Until Element Is Visible    ${select_segment_type}
    Select From List By Label    ${select_segment_type}    Rail
    Enter Value    ${input_train_number}    TR245
    Enter Value    ${input_class_service}    CL22222
    Enter Value    ${input_from_station}    2nd From Station
    Enter Value    ${input_arrival_station}    2nd Arrival Station
    Enter Value    ${input_seat_number}    S123
    Enter Value    ${input_departure_city}    YYZ
    Input Text    ${input_departure_date}    01152020
    Input Text    ${input_arrival_date}    01162020
    Enter Value    ${input_departure_time}    1200PM
    Enter Value    ${input_arrival_time}    0500PM
    Enter Value    ${input_vendor_code}    VIB
    Enter Value    ${input_vendor_name}    VIB remarks
    Enter Value    ${input_confirmation_no}    Conf12345
    Click Add Passive Save Button
    Click Add Segment to PNR    yes

Verify Passive Rail Segment And RIR Added In The PNR For EN
    Switch To Graphic Mode
    Get PNR Details
    Verify Specific Remark Is Written In The PNR    MIS 1A HK1 YUL 10JAN-/TYP-TRN/SUN-SUPPLIER NAME TEST/SUC-AAA/SC-FROM STATION TEST/SD-10JAN/ST-0200/EC-ARRIVAL STATION TEST/ED-11JAN/ET-0500/CF-CN12345678    True
    Verify Specific Remark Is Written In The PNR    RIR TRAIN NUMBER-TR123 CLASS-CL12345/S2
    Verify Specific Remark Is Written In The PNR    RIR CAR-C123 SEAT NUMBER-S123/S2
    Verify Specific Remark Is Written In The PNR    MIS 1A HK1 YYZ 15JAN-/TYP-TRN/SUN-VIB REMARKS/SUC-VIB/SC-2ND FROM STATION/SD-15JAN/ST-1200/EC-2ND ARRIVAL STATION/ED-16JAN/ET-1700/CF-CONF12345    True
    Verify Specific Remark Is Written In The PNR    RIR TRAIN NUMBER-TR254 CLASS-CL22222/S3
    Verify Specific Remark Is Written In The PNR    RIR SEAT NUMBER-S123/S3
    Verify Rail RIR Remarks For VIB Supplier Are Written In the PNR    4    EN
    
Verify Passive Rail Segment And RIR Added In The PNR For FR
    Verify Specific Remark Is Written In The PNR    MIS 1A HK2 YUL 10JAN-/TYP-TRN/SUN-AMTRAK/SUC-AMK/SC-FROM STATION TEST/SD-10JAN/ST-0200/EC-ARRIVAL STATION TEST/ED-11JAN/ET-0500/CF-CN12345678    True
    Verify Specific Remark Is Written In The PNR    RIR TRAIN NUMBER-TR123 CLASS-CL12345/S2
    Verify Specific Remark Is Written In The PNR    RIR CAR-C456 SEAT NUMBER-S654/S2
    Verify Specific Remark Is Written In The PNR    MIS 1A HK2 YYZ 15JAN-/TYP-TRN/SUN-VIB REMARKS/SUC-VIB/SC-2ND FROM STATION/SD-15JAN/ST-1200/EC-2ND ARRIVAL STATION/ED-16JAN/ET-1700/CF-CONF12345    True
    Verify Specific Remark Is Written In The PNR    RIR TRAIN NUMBER-TR254 CLASS-CL22222/S3
    Verify Specific Remark Is Written In The PNR    RIR CAR-C123/S3
    Verify Rail RIR Remarks For AMK Supplier Are Written In the PNR    2
    Verify Rail RIR Remarks For VIB Supplier Are Written In the PNR    3    FR

Verify Rail RIR Remarks For AMK Supplier Are Written In the PNR
    [Arguments]    ${segment_number}
    Verify Specific Remark Is Written In The PNR    RIR VALID IDENTIFICATION IS REQUIRED FOR ALL PASSENGERS 18 AND OVER./S${segment_number}    True
    Verify Specific Remark Is Written In The PNR    RIR ALL AMTRAK TRAINS EXCEPT AUTO TRAIN ARE NON-SMOKING./S${segment_number}
    Verify Specific Remark Is Written In The PNR    RIR TRAIN CHANGES ARE PERMITTED ANYTIME SUBJECT TO AVAILABILITY/S${segment_number}    True
    Verify Specific Remark Is Written In The PNR    RIR IF YOU NEED TO CHANGE OR CANCEL YOUR RESERVATION-/S${segment_number}
    Verify Specific Remark Is Written In The PNR    RIR REFUND/CHANGE FEES MAY APPLY/S${segment_number}
    Verify Specific Remark Is Written In The PNR    RIR RECOMMENDED ARRIVAL TIME AT THE STATION AT LEAST 30 MINUTES/S${segment_number}    True
    Verify Specific Remark Is Written In The PNR    RIR PRIOR TO YOUR SCHEDULES DEPARTURE./S${segment_number}
    Verify Specific Remark Is Written In The PNR    RIR ALLOW ADDITIONAL TIME IF YOU NEED HELP WITH BAGGAGE OR TICKETS./S${segment_number}    True
    Verify Specific Remark Is Written In The PNR    RIR IF YOU ARE TRAVELLING ON THE AUTO TRAIN YOU MUST CHECK IN/S${segment_number}    True
    Verify Specific Remark Is Written In The PNR    RIR AT LEAST 2 HOURS BEFORE SCHEDULED DEPARTURE./S${segment_number}
    Verify Specific Remark Is Written In The PNR    RIR THIS CONFIRMATION NOTICE IS NOT A TICKET/S${segment_number}
    Verify Specific Remark Is Written In The PNR    RIR YOU MUST OBTAIN YOUR TICKET BEFORE BOARDING ANY TRAIN./S${segment_number}    True
    Verify Specific Remark Is Written In The PNR    RIR THIS CONFIRMATION WILL NOT BE ACCEPTED ONBOARD./S${segment_number}
    Verify Specific Remark Is Written In The PNR    RIR YOUR ENTIRE RESERVATION -ALL SEGMENTS- WILL BE CANCELLED/S${segment_number}    True
    Verify Specific Remark Is Written In The PNR    RIR IF YOU DO NOT PICK UP YOUR TICKET BEFORE YOUR FIRST DEPARTURE OR/S${segment_number}    True
    Verify Specific Remark Is Written In The PNR    RIR IF YOU NO-SHOW FOR ANY SEGMENT IN YOUR RESERVATION./S${segment_number}
    Verify Specific Remark Is Written In The PNR    RIR IF YOUR RESERVATION CANCELS YOU WILL NEED TO MAKE NEW/S${segment_number}    True
    Verify Specific Remark Is Written In The PNR    RIR RESERVATIONS WHICH MAY BE AT A HIGHER FARE./S${segment_number}

    
Verify Rail RIR Remarks For VIB Supplier Are Written In the PNR
    [Arguments]    ${segment_number}    ${language}
    Run Keyword If    "${language}" == "EN"    Verify Specific Remark Is Written In The PNR    RIR FOR VIA RAIL TRAVEL PLEASE CHECK IN AT TRAIN STATION/S${segment_number}
    Run Keyword If    "${language}" == "EN"    Verify Specific Remark Is Written In The PNR    RIR AT LEAST 45 MINUTES PRIOR TO DEPARTURE./S${segment_number}
    Run Keyword If    "${language}" == "EN"    Verify Specific Remark Is Written In The PNR    RIR VIA RAIL POLICY-NONSMOKING ENVIRONMENT ON ALL TRAINS./S${segment_number}
    Run Keyword If    "${language}" == "EN"    Verify Specific Remark Is Written In The PNR    RIR VIA COUPONS ARE NOT VALID FOR AIR TRAVEL./S${segment_number}
    Run Keyword If    "${language}" == "EN"    Verify Specific Remark Is Written In The PNR    RIR IF CHANGES ARE MADE ENROUTE PLEASE ENSURE YOUR/S${segment_number}
    Run Keyword If    "${language}" == "EN"    Verify Specific Remark Is Written In The PNR    RIR TICKET IS ENDORSED BY VIA 1 TICKET LOUNGE./S${segment_number}
    Run Keyword If    "${language}" == "EN"    Verify Specific Remark Is Written In The PNR    RIR PLEASE CALL VIA RAIL AT 1-888-842-7245 TO RECONFIRM YOUR/S${segment_number}    True
    Run Keyword If    "${language}" == "EN"    Verify Specific Remark Is Written In The PNR    RIR TRAIN DEPARTURE/ARRIVAL TIMES./S${segment_number}
    Run Keyword If    "${language}" == "FR"    Verify Specific Remark Is Written In The PNR    RIR POUR LES DEPLACEMENTS A BORD DE VIA RAIL VEUILLEZ VOUS/S${segment_number}    True
    Run Keyword If    "${language}" == "FR"    Verify Specific Remark Is Written In The PNR    RIR PRESENTER A LA GARE AU MOINS 45 MINUTES AVANT L HEURE PREVUE DE/S${segment_number}    True
    Run Keyword If    "${language}" == "FR"    Verify Specific Remark Is Written In The PNR    RIR VOTRE DEPART SUIVANT LA POLITIQUE DE VIA RAIL-TOUS LES/S${segment_number}    True
    Run Keyword If    "${language}" == "FR"    Verify Specific Remark Is Written In The PNR    RIR TRAINS SONT NON FUMEUR. LES COUPONS VIA RAIL NE PEUVENT ETRE/S${segment_number}    True
    Run Keyword If    "${language}" == "FR"    Verify Specific Remark Is Written In The PNR    RIR UTILISES POUR DES DEPLACEMENTS AERIENS. SI VOUS DEVEZ MODIFIER/S${segment_number}    True
    Run Keyword If    "${language}" == "FR"    Verify Specific Remark Is Written In The PNR    RIR VOTRE ITINERAIRE EN COURS DE ROUTE ASSUREZ-VOUS QUE VOTRE/S${segment_number}    True
    Run Keyword If    "${language}" == "FR"    Verify Specific Remark Is Written In The PNR    RIR BILLET EST ENDOSSE PAR LA BILLETTERIE VIA 1./S${segment_number}
    Run Keyword If    "${language}" == "FR"    Verify Specific Remark Is Written In The PNR    RIR VEUILLEZ COMMUNIQUER AVEC VIA RAIL AU 1-888-842-7245 POUR/S${segment_number}    True
    Run Keyword If    "${language}" == "FR"    Verify Specific Remark Is Written In The PNR    RIR RECONFIRMER LES HEURES DE DEPART/D ARRIVEE DE VOTRE TRAIN./S${segment_number}    True

