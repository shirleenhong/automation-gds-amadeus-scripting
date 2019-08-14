*** Settings ***
Resource          common_library.robot

*** Keywords ***
Enter Requestor Name
    [Arguments]    ${requestor_name}
    Input Text    css=#requestor    ${requestor_name}
    [Teardown]    Take Screenshot

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
    Input Text    xpath=//div[@formarrayname='tickets'][${coupon_field_order}]//input[@formcontrolname='coupon']    ${coupon_refund}
    [Teardown]    Take Screenshot

Click Cancel Segments Button
    Click Element    xpath=//button[contains(text(), 'Cancel Segments')]
    Sleep    15
    [Teardown]    Take Screenshot

Select UA Reason For Cancel
    [Arguments]    ${ua_reason}
    Select From List By Label    css=#reasonUACancel    ${ua_reason}

Enter UA Segment Number
    [Arguments]    ${ua_segment_no}
    Input Text    css=#uasegNo    ${ua_segment_no}

Enter UA Passenger Number
    [Arguments]    ${ua_passenger_no}
    Input Text    css=#uaPassengerNo    ${ua_passenger_no}
    [Teardown]    Take Screenshot

Select Reason For Cancel
    [Arguments]    ${ac_reason}
    Select From List By Label    css=#reasonACCancel    ${ac_reason}
    [Teardown]    Take Screenshot

Enter AC Ticket Number
    [Arguments]    ${ac_ticket_number}
    Input Text    //input[@formcontrolname='acTicketNo']    ${ac_ticket_number}

Unselect Passive Segment
    [Arguments]    ${passive_segment_order}
    Unselect Checkbox    //div[@class='cancelContainer']//input[@ng-reflect-name='${passive_segment_order}']
    [Teardown]    Take Screenshot

Select Relationship
    [Arguments]    ${relationship}
    Select From List By Label    css=#relationship    ${relationship}
    [Teardown]    Take Screenshot

Select Cancel All Segments
    Select Checkbox    css=#cancelAll
    [Teardown]    Take Screenshot

Click Tab
    [Arguments]    ${cancel_tab}
    Click Element    xpath=//span[contains(text(), '${cancel_tab}')]

Select Cancel Follow-Up Option
    [Arguments]    ${followup_option}
    Select From List By Label    css=#followUpOption    ${followup_option}

Select Passenger Name For Cancel
    [Arguments]    ${passenger_name}
    Click Element    css=#acpassengerNo
    Click Element    xpath=//option[contains(text(), '${passenger_name}')]
    Press Key    css=#acpassengerNo    \\09

Enter Branch Number
    [Arguments]    ${branch_number}
    Input Text    css=#branch    ${branch_number}

Enter Person Requesting
    [Arguments]    ${person_requesting}
    Input Text    css=#personRequesting    ${person_requesting}
    [Teardown]    Take Screenshot

Enter Passenger Name
    [Arguments]    ${passenger_name}
    Input Text    css=#passengerName    ${passenger_name}

Enter CFA
    [Arguments]    ${cfa}
    Input Text    css=#cfa    ${cfa}

Select Cancellation
    [Arguments]    ${is_cancellation}
    Select From List By Label    css=#cancellation    ${is_cancellation}

Select Commission Recall Only
    [Arguments]    ${commisson_recall}
    Select From List By Label    css=#commission    ${commisson_recall}
    [Teardown]    Take Screenshot

Enter Supplier
    [Arguments]    ${supplier}
    Input Text    css=#supplier    ${supplier}
    [Teardown]    Take Screenshot

Enter Base Refund Before Penalty
    [Arguments]    ${base_refund}
    Input Text    css=#baseRefund    ${base_refund}
    [Teardown]    Take Screenshot

Enter Taxes Being Refunded
    [Arguments]    ${taxes_refund}
    Input Text    css=#taxesRef    ${taxes_refund}

Enter Penalty
    [Arguments]    ${penalty}
    Input Text    css=#penaltyPoint    ${penalty}
    [Teardown]    Take Screenshot

Enter Commission Recall Cost
    [Arguments]    ${commission_cost}
    Input Text    css=#commissionPoint    ${commission_cost}

Enter Tax on Commission Recall
    [Arguments]    ${commission_tax}
    Input Text    css=#taxRecall    ${commission_tax}

Enter Comments
    [Arguments]    ${refund_comment}
    Input Text    css=#comments    ${refund_comment}
    [Teardown]    Take Screenshot

Select AC Cancel Check
    [Arguments]    ${ac_cancel_check}
    Select From List By Label    css=#cancelProcess    ${ac_cancel_check}
    [Teardown]    Take Screenshot

Enter AC Flight Number
    [Arguments]    ${ac_flight}
    Input Text    css=#acFlightNo    ${ac_flight}
    Click Element    xpath=//div[@ng-reflect-name='tickets'][1]//input[@formcontrolname='ticket']
    [Teardown]    Take Screenshot

Select Other Reason For Cancel
    [Arguments]    ${other_reason_cancel}
    Select From List By Label    css=#reasonNonACCancel    ${other_reason_cancel}
    [Teardown]    Take Screenshot

Enter Jury Date Month
    [Arguments]    ${jury_month}
    Input Text    css=#acCancelMonth    ${jury_month}

Enter Jury Date Year
    [Arguments]    ${jury_year}
    Input Text    css=#acCancelYear    ${jury_year}
