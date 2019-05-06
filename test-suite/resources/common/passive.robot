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
    Click Element    xpath=//tab[@heading='Passive Segments']//button[contains(text(), 'Add Segment')]
    wait until Page Contains Element    //button[contains(text(),'Save')]    30

Select Segment Type
    [Arguments]    ${segment_type}
    Select From List    xpath=//select[@name='segmentType']    ${segment_type}
    Wait Until Page Contains Element    css=#departureDate    30

Enter Vendor Name
    [Arguments]    ${vendor_name}
    Input Text    css=#vendorName    ${vendor_name}
    Set Test Variable    ${vendor_name}

Enter Vendor Code
    [Arguments]    ${vendor_code}
    Input Text    css=#vendorCode    ${vendor_code}
    Set Test Variable    ${vendor_code}

Enter Confirmation Number
    [Arguments]    ${confirmation_number}
    Input Text    css=#confirmationNo    ${confirmation_number}
    Set Test Variable    ${confirmation_number}

Enter Departure Date
    [Arguments]    ${departure_date}
    Input Text    css=#departureDate    ${departure_date}

Enter Arrival Date
    [Arguments]    ${arrival_date}
    Input Text    css=#arrivalDate    ${arrival_date}

Enter Departure City
    [Arguments]    ${departure_city}
    Input Text    css=#departureCity    ${departure_city}
    Set Test Variable    ${departure_city}

Enter Destination City
    [Arguments]    ${destination_city}
    Input Text    css=#destinationCity    ${destination_city}
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
    Select From List    css=#roomType    ${room_type}
    Set Test Variable    ${room_type}

Select Meal Plan
    [Arguments]    ${meal_plan}
    Select From List    css=#mealPlan    ${meal_plan}
    Set Test Variable    ${meal_plan.upper()}
    [Teardown]    Take Screenshot

Click Add Segments To PNR
    Click Element    xpath=//button[contains(text(),'Add Segments To PNR')]
    Sleep    10

Select State Room
    [Arguments]    ${state_room}
    Select From List    css=#stateRoom    ${state_room}
    Set Test Variable    ${state_room}

Enter State Room Others Description
    [Arguments]    ${other_desc}
    Input Text    css=#othersText    ${other_desc}
    Set Test Variable    ${state_room}

Enter Cabin Number
    [Arguments]    ${cabin_number}
    Input Text    css=#cabinNo    ${cabin_number}
    Set Test Variable    ${cabin_number}

Select Dining
    [Arguments]    ${dining}
    Select From List    css=#dining    ${dining}
    Set Test Variable    ${dining.upper()}
    [Teardown]    Take Screenshot

Enter Policy Number
    [Arguments]    ${policy_number}
    Input Text    css=#policyNo    ${policy_number}
    Set Test Variable    ${policy_number}
    [Teardown]    Take Screenshot

Enter Airline Code
    [Arguments]    ${airline_code}
    Input Text    css=#airlineCode    ${airline_code}
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
    Set Test Variable    ${airline_recloc}
    [Teardown]    Take Screenshot

Click Add Passive Save Button
    Click Element    xpath=//button[contains(text(), 'Save')]
    Wait Until Page Contains Element    xpath=//tr[1]//i[@class='fas fa-edit']    30
    Focus    xpath=//button[contains(text(),'Add Segments To PNR')]
    [Teardown]    Take Screenshot

Enter Airline Name For ZZ
    [Arguments]    ${zz_airline}
    Input Text    css=#zzairlineCode    ${zz_airline}

Enter Departure Name For ZZZ
    [Arguments]    ${zzz_departure}
    Input Text    css=#zzdepartureCity    ${zzz_departure}

Enter Arrival Name For ZZZ
    [Arguments]    ${zzz_arrival}
    Click Element    css=#zzdepartureCity
    Input Text    css=#zzdestinationCity    ${zzz_arrival}
