*** Settings ***
Resource          common_library.robot

*** Keywords ***
Select Routing Code
    [Arguments]    ${routecode}
    #Select BSP Routing Code    Select BSP Routing Code
    Wait Until Element Is Visible    css=#bspRouteCode
    Select From List    css=#bspRouteCode    ${routecode}
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
    Select From List    css=#redemptionAdded    ${redemption_added}
    Set Suite Variable    ${redemption_added}

Select Reservation Request
    [Arguments]    ${reservation_request}
    Select From List    css=#reservationReq    ${reservation_request}
    Set Suite Variable    ${reservation_request}

Select Booking Type
    [Arguments]    ${booking_type}
    Select From List    css=#bookingType    ${booking_type}
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
    Set Suite Variable    ${hotel_name}

Select Reservation For Business Travel
    [Arguments]    ${is_business_reserved}
    Select From List    css=#businessTravel    ${is_business_reserved}
    Set Suite Variable    ${is_business_reserved}

Select Hotel Reservation Booked
    [Arguments]    ${is_hotel_booked}
    Select From List    css=#hotelRes    ${is_hotel_booked}
    Set Suite Variable    ${is_hotel_booked}

Select Reason Hotel Booked
    [Arguments]    ${reason_hotel_booked}
    Select From List    css=#reasonHotelBooked    ${reason_hotel_booked}
    Set Suite Variable    ${reason_hotel_booked}
