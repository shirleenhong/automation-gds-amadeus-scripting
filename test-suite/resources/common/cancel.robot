*** Settings ***
Resource          common_library.robot

*** Keywords ***
Enter Requestor Name
    [Arguments]    ${requestor_name}
    Input Text    css=#requestor    ${requestor_name}

Enter Cancel Notes
    [Arguments]    ${notes_field}    ${cancel_notes}
    Run keyword if    "${notes_field}" == "1"    Input Text    css=#desc1    ${cancel_notes}
    Run keyword if    "${notes_field}" == "2"    Input Text    css=#desc2    ${cancel_notes}
    Set Suite Variable    ${cancel_notes_${notes_field}}    ${cancel_notes}

Select Passive Segment
    [Arguments]    @{passive_segment_order}
    : FOR    ${passive_segment_order}    IN    @{passive_segment_order}
    \    Select Checkbox    xpath=//div[@class='cancelContainer']//input[@ng-reflect-name='${passive_segment_order}']
    [Teardown]    Take Screenshot

Enter Affected Airline Number
    [Arguments]    ${airline_number}
    Input Text    css=#airlineNo    ${airline_number}
    Set Suite Variable    ${airline_number}
    [Teardown]    Take Screenshot

Enter Ticket Number For Refund
    [Arguments]    ${ticket_field_order}    ${ticket_refund}
    Input Text    xpath=//div[@ng-reflect-name='tickets'][${ticket_field_order}]//input[@formcontrolname='ticket']    ${ticket_refund}

Enter Coupon Number For Refund
    [Arguments]    ${coupon_field_order}    ${coupon_refund}
    Input Text    xpath=//div[@ng-reflect-name='tickets'][${coupon_field_order}]//input[@formcontrolname='coupon']    ${coupon_refund}
    [Teardown]    Take Screenshot

Click Cancel Segments Button
    Click Element    xpath=//button[contains(text(), 'Cancel Segments')]
    Sleep    15
    [Teardown]    Take Screenshot

Select UA Reason For Cancel
    [Arguments]    ${ua_reason}
    Select From List By Value    css=#reasonUACancel    ${ua_reason}

Enter UA Segment Number
    [Arguments]    ${ua_segment_no}
    Input Text    css=#uasegNo    ${ua_segment_no}

Enter UA Passenger Number
    [Arguments]    ${ua_passenger_no}
    Input Text    css=#uaPassengerNo    ${ua_passenger_no}
    [Teardown]    Take Screenshot

Select AC Reason For Cancel
    [Arguments]    ${ac_reason}
    Select From List By Value    css=#reasonACCancel    ${ac_reason}

Enter AC Ticket Number
    [Arguments]    ${ac_ticket_number}
    Input Text    css=#acTicketNo    ${ac_ticket_number}

Unselect Passive Segment
    [Arguments]    ${passive_segment_order}
    Unselect Checkbox    //div[@class='cancelContainer']//input[@ng-reflect-name='${passive_segment_order}']
    [Teardown]    Take Screenshot

Select NonRefundable AC Flight Checkbox
    Select Checkbox    css=#cancelNonRefAC
    Wait Until Page Contains Element    css=#reasonACCancel    30

Enter Relationship
    [Arguments]    ${relationship}
    Input Text    css=#relationship    ${relationship}
    [Teardown]    Take Screenshot
