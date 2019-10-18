*** Settings ***
Resource          common_library.robot

*** Keywords ***
Add Passive Segment
    [Arguments]    ${supplier_name}    ${departure}    ${arrival}
    Click Element    xpath=//button[contains(text(), 'Add Tour Segment')]
    Input Text    css=#suppliername    ${supplier_name}
    Input Text    css=#from    ${departure}
    Input Text    css=#to    ${arrival}
    Click Element    xpath=//button[contains(text(), 'Save')]
    Wait Until Page Does Not Contain    xpath=//button[contains(text(), 'Save')]    30
    Wait Until Page Contains Element    xpath=//td[contains(text(), '${supplier_name}')]    30

Click Add Segment Button
    Click Element    xpath=//div[@class='panel-body card-block card-body']//button[contains(text(), 'Add Segment')]
    wait until Page Contains Element    //button[contains(text(),'Save')]    30

Select Segment Type
    [Arguments]    ${segment_type}
    Select From List By Label    xpath=//select[@name='segmentType']    ${segment_type}
    Wait Until Page Contains Element    css=#departureDate    30

Enter Vendor Name
    [Arguments]    ${vendor_name}
    Input Text    css=#vendorName    ${vendor_name}
    Set Test Variable    ${vendor_name}

Enter Vendor Code
    [Arguments]    ${vendor_code}
    Click Element    css=#vendorCode
    Input Text    css=#vendorCode    ${vendor_code}
    Sleep  2
    Press Key    css=#vendorCode    \\09
    Set Test Variable    ${vendor_code}

Enter Confirmation Number
    [Arguments]    ${confirmation_number}
    Input Text    css=#confirmationNo    ${confirmation_number}
    Press Key    css=#confirmationNo    \\09
    Set Test Variable    ${confirmation_number}
    [Teardown]    Take Screenshot

Enter Departure Date
    [Arguments]    ${departure_date}
    Input Text    css=#departureDate    ${departure_date}

Enter Arrival Date
    [Arguments]    ${arrival_date}
    Input Text    css=#arrivalDate    ${arrival_date}

Enter Departure City
    [Arguments]    ${departure_city}
    Input Text    css=#departureCity    ${departure_city}
    Press Key    css=#departureCity    \\09
    Set Test Variable    ${departure_city}

Enter Destination City
    [Arguments]    ${destination_city}
    Input Text    css=#destinationCity    ${destination_city}
    Press Key    css=#destinationCity    \\09
    Set Test Variable    ${destination_city}

Enter Departure Time
    [Arguments]    ${departure_time}
    Input Text    css=#departureTime    ${departure_time}

Enter Arrival Time
    [Arguments]    ${arrival_time}
    Input Text    css=#arrivalTime    ${arrival_time}
    [Teardown]    Take Screenshot

Enter Segment Name
    [Arguments]    ${segment_name}
    Input Text    css=#tourName    ${segment_name}
    Set Test Variable    ${segment_name}

Enter Number Of Nights
    [Arguments]    ${number_of_nights}
    Input Text    css=#noNights    ${number_of_nights}
    Set Test Variable    ${number_of_nights}

Enter Number Of People
    [Arguments]    ${number_of_people}
    Input Text    css=#noPeople    ${number_of_people}

Select Room Type
    [Arguments]    ${room_type}
    Select From List By Label    css=#roomType    ${room_type}
    Set Test Variable    ${room_type}

Select Meal Plan
    [Arguments]    ${meal_plan}
    Select From List By Label    css=#mealPlan    ${meal_plan}
    Press Key    css=#mealPlan    \\09
    Set Test Variable    ${meal_plan.upper()}
    [Teardown]    Take Screenshot

Click Add Segments To PNR
    Sleep    5
    Click Element    xpath=//button[contains(text(),'Add Segments To PNR')]
    Sleep    10

Select State Room
    [Arguments]    ${state_room}
    Input Text    css=#stateRoom    ${state_room}
    Press Key    css=#stateRoom    \\09
    Set Test Variable    ${state_room}

Enter State Room Others Description
    [Arguments]    ${other_desc}
    Input Text    css=#othersText    ${other_desc}
    Set Test Variable    ${state_room}

Enter Cabin Number
    [Arguments]    ${cabin_number}
    Input Text    css=#cabinNo    ${cabin_number}
    Set Test Variable    ${cabin_number}

Enter Dining
    [Arguments]    ${dining}
    Input Text    css=#dining    ${dining}
    Press Key    css=#dining    \\09
    Set Test Variable    ${dining.upper()}
    [Teardown]    Take Screenshot

Enter Policy Number
    [Arguments]    ${policy_number}
    Input Text    css=#policyNo    ${policy_number}
    Press Key    css=#policyNo    \\09
    Set Test Variable    ${policy_number}
    [Teardown]    Take Screenshot

Enter Airline Code
    [Arguments]    ${airline_code}
    Input Text    css=#airlineCode    ${airline_code}
    Press Key    css=#airlineCode    \\09
    Set Test Variable    ${airline_code}

Enter Flight Number
    [Arguments]    ${flight_number}
    Input Text    css=#flightNumber    ${flight_number}
    Set Test Variable    ${flight_number}

Enter Class Of Service
    [Arguments]    ${class_service}
    Input Text    css=#classService    ${class_service}
    Set Test Variable    ${class_service}

Enter Airline Record Locator
    [Arguments]    ${airline_recloc}
    Input Text    css=#airlineRecloc    ${airline_recloc}
    Press Key    css=#airlineRecloc    \\09
    Set Test Variable    ${airline_recloc}
    [Teardown]    Take Screenshot

Click Add Passive Save Button
    Click Element    xpath=//button[contains(text(), 'Save')]
    Wait Until Page Contains Element    xpath=//i[@class='fas fa-edit']    30
    Set Focus To Element    xpath=//button[contains(text(),'Add Segments To PNR')]
    [Teardown]    Take Screenshot

Enter Airline Name For ZZ
    [Arguments]    ${zz_airline}
    Input Text    css=#zzairlineCode    ${zz_airline}

Enter Departure Name For ZZZ
    [Arguments]    ${zzz_departure}
    Input Text    css=#zzdepartureCity    ${zzz_departure}

Enter Arrival Name For ZZZ
    [Arguments]    ${zzz_arrival}
    Input Text    css=#zzdestinationCity    ${zzz_arrival}

Enter Train Number
    [Arguments]    ${train_number}
    Input Text    css=#trainNumber    ${train_number}

Enter From Station
    [Arguments]    ${from_station}
    Input Text    css=#fromStation    ${from_station}

Enter Arrival Station
    [Arguments]    ${arrival_station}
    Input Text    css=#arrivalStation    ${arrival_station}

Tick Limo Include Tax On Rate
    Click Element    css=#includeTax

Enter Limo Tax On Rate
    [Arguments]    ${tax_rate}
    Wait Until Element Is Visible    css=#taxOnRate    10
    Input Text    css=#taxOnRate    ${tax_rate}

Enter Limo Company
    [Arguments]    ${limo_company}
    #Enter Limo Company
    Wait Until Element Is Visible    css=#vendorName    10
    Input Text    css=#vendorName    ${limo_company}

Enter Limo Supplier Code
    [Arguments]    ${limo_supplier}
    #Enter Limo Supplier Code
    Wait Until Element Is Visible    css=#vendorCode    10
    Input Text    css=#vendorCode    ${limo_supplier}

Enter Limo Confirmation Number
    [Arguments]    ${limo_confirmationNum}
    #Enter Limo Confirmation Number
    Wait Until Element Is Visible    css=#confirmationNo    10
    Input Text    css=#confirmationNo    ${limo_confirmationNum}

Enter Limo Phone Number
    [Arguments]    ${limo_phone}
    #Enter Limo Phone Number
    Wait Until Element Is Visible    css=#phone    10
    Input Text    css=#phone    ${limo_phone}

Enter Limo Co Agent
    [Arguments]    ${limo_co_agent}
    #Add Limo Co Agent
    Wait Until Element Is Visible    css=#limoCoAgent    10
    Input Text    css=#limoCoAgent    ${limo_co_agent}

Enter Limo Pickup Location
    [Arguments]    ${limo_pickup}
    #Enter Limo Pickup Location
    Double Click Element    css=#pickupLoc
    Press Key    css=#pickupLoc    \\08
    Input Text    css=#pickupLoc    ${limo_pickup}

Enter Limo Transfer To Location
    [Arguments]    ${limo_transfer_to}
    #Enter Limo Transfer To Location
    Double Click Element    css=#transferTo
    Press Key    css=#transferTo    \\08
    Input Text    css=#transferTo    ${limo_transfer_to}

Enter Limo Pickup City
    [Arguments]    ${limo_pickup_city}
    #Enter Limo Pickup Date
    Wait Until Element Is Visible    css=#departureCity    10
    Input Text    css=#departureCity    ${limo_pickup_city}

Enter Limo Pickup Date
    [Arguments]    ${limo_pickup_date}
    #Enter Limo Pickup Date
    Wait Until Element Is Visible    css=#departureDate    10
    Input Text    css=#departureDate    ${limo_pickup_date}

Enter Limo Pickup Time
    [Arguments]    ${limo_pickup_time}
    #Enter Limo Pickup Time
    Wait Until Element Is Visible    css=#departureTime    10
    Input Text    css=#departureTime    ${limo_pickup_time}

Enter Limo Rate
    [Arguments]    ${limo_rate}
    #Enter Limo Rate
    Wait Until Element Is Visible    css=#rate    10
    Input Text    css=#rate    ${limo_rate}

Select Limo Rate Type
    [Arguments]    ${limo_rate_type}
    Wait Until Element Is Visible    css=#rateType    10
    Select From List By Label    css=#rateType    ${limo_rate_type}

Tick Limo Include Toll On Rate
    Click Element    css=#includeToll

Enter Limo Toll
    [Arguments]    ${limo_toll}
    Wait Until Element Is Visible    css=#toll    10
    Input Text    css=#toll    ${limo_toll}

Tick Limo Include Gradtuities On Rate
    Click Element    css=#includeGratuities

Enter Limo Gradtuities
    [Arguments]    ${limo_gradtuities}
    Wait Until Element Is Visible    css=#gratuities    10
    Input Text    css=#gratuities    ${limo_gradtuities}

Tick Limo Include Parking On Rate
    Click Element    css=#includeParking

Enter Limo Parking
    [Arguments]    ${limo_parking}
    Wait Until Element Is Visible    css=#parking    10
    Input Text    css=#parking    ${limo_parking}

Enter Limo Meet Drive At
    [Arguments]    ${meet_driver_at}
    Wait Until Element Is Visible    css=#meetDriveAt    10
    Input Text    css=#meetDriveAt    ${meet_driver_at}

Enter Additional Info
    [Arguments]    ${limo_add_info}
    Wait Until Element Is Visible    css=#additionalInfo    10
    Input Text    css=#additionalInfo    ${limo_add_info}

Enter Cancellation Info
    [Arguments]    ${cancellation_info}
    Wait Until Element Is Visible    css=#cancellationInfo    10
    Input Text    css=#cancellationInfo    ${cancellation_info}

Enter Car Number
    [Arguments]    ${car_number}
    Input Text    css=#carNumber    ${car_number}

Enter Seat Number
    [Arguments]    ${seat_number}
    Input Text    css=#seatNumber    ${seat_number}
    [Teardown]    Take Screenshot

Select Car Type
    [Arguments]    ${car_type}
    Sleep   2
    Click Element    css=#carType
    Select From List By Label    css=#carType    ${car_type}

Select Pickup Location
    [Arguments]    ${pickup_location}
    Select From List By Label    css=#pickupLoc    ${pickup_location}
    Press Key    css=#pickupLoc    \\09

Select Pickup Address
    [Arguments]     ${pickup_address}
    Wait Until Element Is Visible   css=#pickupOffAddress       30
    Sleep  2
    Select From List By Label  css=#pickupOffAddress     ${pickup_address}

Select Drop Off Location
    [Arguments]     ${dropoff_location}
    Select From List By Label  css=#dropOffLoc  ${dropoff_location}
    Press Key    css=#dropOffLoc    \\09   

Select Drop Off Address
    [Arguments]     ${dropoff_address}
    Wait Until Element Is Visible  css=#dropOffAddress   30
    Sleep  2
    Select From List By Label  css=#dropOffAddress     ${dropoff_address}

Enter Rental Cost
    [Arguments]     ${rental_cost}
    Input Text  css=#rentalCost  ${rental_cost}

Enter Mileage
    [Arguments]     ${car_mileage}
    Input Text  css=#mileage    ${car_mileage}
    Press Key    css=#mileage    \\09
    [Teardown]    Take Screenshot

Enter Drop Off Fee
    [Arguments]     ${dropoff_fee}
    Input Text  css=#dropOffFee  ${dropoff_fee}

Enter Car CD Number
    [Arguments]     ${cd_number}
    Input Text      css=#cdNumber    ${cd_number}

Enter Car ID Number
    [Arguments]     ${id_number}
    Input Text  css=#idNumber       ${id_number}

Enter Frequent Flyer Airline Code
    [Arguments]     ${ff_airline_code}
    Input Text  css=#frequentFlierNumber    ${ff_airline_code}

Enter Frequent Flyer Number
    [Arguments]     ${ff_number}
    Input Text  css=#frequentflightNumber    ${ff_number}

Select Special Equipment
    [Arguments]     ${special_equipment}
    Select From List By Label  css=#specialEquipment     ${special_equipment}  
    Sleep   2
    [Teardown]    Take Screenshot     

Enter Special Request
    [Arguments]     ${special_request}
    Input Text  css=#specialRequest     ${special_request}
    [Teardown]    Take Screenshot

Enter Hotel Chain Code
    [Arguments]     ${chain_code}
    Input Text  css=#chainCode      ${chain_code}
    Press Key    css=#chainCode    \\09

Enter Hotel City Code
    [Arguments]     ${hotel_city_code}
    Input Text  css=#departureCity  ${hotel_city_code}

Enter Hotel Nightly Rate
    [Arguments]     ${nightly_rate}
    Input Text  css=#nightlyRate    ${nightly_rate}

Enter Hotel Rate Type
    [Arguments]     ${hotel_rate_type}
    Input Text  css=#rateType   ${hotel_rate_type}

Select Gauranteed For Late Arrival
    [Arguments]     ${hotel_gauarantee}
    Click Element  xpath=//input[@id='guaranteedLate'][@value='${hotel_gauarantee}']
    
Enter Room Confirmed With
    [Arguments]     ${room_confirmed_with}
    Input Text  css=#confirmedWith      ${room_confirmed_with}
    Press Key    css=#confirmedWith    \\09

Select Hotel
    [Arguments]     ${hotel_index}
    Sleep  2
    Click Element   css=#hotelCode
    Select From List By Index  css=#hotelCode  ${hotel_index}
    Press Key    css=#hotelCode    \\09
    Sleep  2

Enter Currency Type
    [Arguments]     ${cost_currency}
    Input Text  css=#tourCurrencyType       ${cost_currency}

Select Duration
    [Arguments]     ${duration}
    Select From List By Label  css=#duration     ${duration}

Enter Number Of Rooms
    [Arguments]     ${number_room}
    Double Click Element    css=#numberOfRooms
    Press Key    css=#numberOfRooms    \\08
    Input text      css=#numberOfRooms      ${number_room}

Enter Rate Booked
    [Arguments]    ${rate_booked}
    Double Click Element    css=#rateBooked
    Press Key    css=#rateBooked    \\08
    Input text      css=#rateBooked      ${rate_booked}

Enter Type Of Insurance Purchased
    [Arguments]    ${rate_booked}
    Input text      css=#insuranceType      ${rate_booked}
    Press Key    css=#insuranceType    \\09

Select Passengers For Passive Segments
    [Arguments]   @{passenger_number}
    Click Element    //input[@formcontrolname='passenger']
    : FOR    ${passenger_number}    IN    @{passenger_number}
    \    Click Element    //div[@class='dropdown-item']//input[@value='${passenger_number}']
    Click Element    //input[@formcontrolname='passenger']
    Press Key    //input[@formcontrolname='passenger']    \\09
    