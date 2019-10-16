*** Settings ***
Resource          common_library.robot

*** Keywords ***
Select Routing Code
    [Arguments]    ${routecode}
    Wait Until Element Is Visible    css=#bspRouteCode
    Select From List By Label    css=#bspRouteCode    ${routecode}
    Take Screenshot

Enter Destination Code
    [Arguments]    ${destinationcode}
    #Select BSP Routing Code    Select BSP Routing Code
    Wait Until Element Is Visible    css=#destinationList
    Input Text    css=#destinationList    ${destinationcode}
    Take Screenshot

Click Reporting Tab
    [Arguments]    ${reporting_tab}
    Click Element    xpath=//span[contains(text(), '${reporting_tab}')]

Select Redemption Added
    [Arguments]    ${redemption_added}
    Select From List By Label    css=#redemptionAdded    ${redemption_added}
    Set Suite Variable    ${redemption_added}

Select Reservation Request
    [Arguments]    ${reservation_request}
    Select From List By Label    css=#reservationReq    ${reservation_request}
    Set Suite Variable    ${reservation_request}

Select Booking Type
    [Arguments]    ${booking_type}
    Select From List By Label    css=#bookingType    ${booking_type}
    Set Suite Variable    ${booking_type}

Enter Caller Name
    [Arguments]    ${caller_name}
    Input Text    css=#chCallerName    ${caller_name}
    Set Suite Variable    ${caller_name}

Enter Delegate Caller Name
    [Arguments]    ${delegate_caller_name}
    Input Text    css=#delegateName    ${delegate_caller_name}
    Set Suite Variable    ${delegate_caller_name}

Enter Hotel Name
    [Arguments]    ${hotel_name}
    Input Text    css=#hotelName    ${hotel_name}
    Set Test Variable    ${hotel_name}

Select Reservation For Business Travel
    [Arguments]    ${is_business_reserved}
    Select From List By Value    css=#businessTravel    ${is_business_reserved}
    Set Suite Variable    ${is_business_reserved}

Select Hotel Reservation Booked
    [Arguments]    ${is_hotel_booked}
    Select From List By Value    css=#hotelRes    ${is_hotel_booked}
    Set Suite Variable    ${is_hotel_booked}
    [Teardown]    Take Screenshot

Select Reason Hotel Booked
    [Arguments]    ${reason_hotel_booked}
    Select From List By Label    css=#reasonHotelBooked    ${reason_hotel_booked}
    Set Suite Variable    ${reason_hotel_booked}
    [Teardown]    Take Screenshot

Select Insurance Liability Waiver
    [Arguments]    ${insurance_waiver}
     Run Keyword if    '${insurance_waiver}' == 'All Inclusive or Premium Protection Insurance'    Select From List By Label    css=#showInsurance    All Inclusive or Premium Protection Insurance Purchased for the Full Value of the Trip
    ...    ELSE    Select From List By Label   css=#showInsurance    Traveller Declined to Purchase the following Travel Insurance 


Select Insurance Declined Reason
    [Arguments]    @{declined_insurance}
    : FOR    ${declined_insurance}    IN    @{declined_insurance}
    \    Run Keyword If    '${declined_insurance}' == 'All Inclusive or Premium'    Select Checkbox    xpath=//input[@value='1']
    \    Run Keyword If    '${declined_insurance}' == 'Cancellation/Interruption'    Select Checkbox    xpath=//input[@value='2']
    \    Run Keyword If    '${declined_insurance}' == 'Emergency Medical/Transportation'    Select Checkbox    xpath=//input[@value='3']
    \    Run Keyword If    '${declined_insurance}' == 'Flight and Travel Accident'    Select Checkbox    xpath=//input[@value='4']
    \    Run Keyword If    '${declined_insurance}' == 'Rental Car Physical Damage'    Select Checkbox    xpath=//input[@value='5']
    \    Run Keyword If    '${declined_insurance}' == 'Coverage for the Full Dollar Value'    Select Checkbox    xpath=//input[@value='6']

Enter Insurance Declined Reason
    [Arguments]    ${declined_reason}
    Input Text    css=#insuranceDeclinedReason    ${declined_reason}
    [Teardown]    Take Screenshot