*** Settings ***
Library           String
Library           SeleniumLibrary
Library           Collections
Library           Screenshot
Resource          base.robot

*** Variables ***
${fare_row_number}    //div[@formarrayname='fares']
${input_full_fare}    //input[@formcontrolname='highFareText']
${input_low_fare}    //input[@formcontrolname='lowFareText']
${input_charge_fare}    //input[@formcontrolname='chargeFare']
${list_reason_code}    //select[@formcontrolname='reasonCodeText']
${tab_clientReporting}    //div[@formarrayname='fares']
${checkbox_clientReporting}    //input[@id='chkIncluded']
${tab_nonBsp}     //span[contains(text(), 'NON BSP')]
${tab_bsp}        css=#bspReportingTab-link
${tab_matrixReporting}    //span[contains(text(), 'Matrix Reporting')]
${input_nonBsp_fullFare}    //div[@formarrayname='nonbsp']//input[@formcontrolname='highFareText']
${input_nonBsp_lowFare}    //div[@formarrayname='nonbsp']//input[@formcontrolname='lowFareText']
${input_cic_number}    //input[@formcontrolname='cicNumber']
${input_file_finisher_yes}    //input[@id="rbFileFinisher"][@ng-reflect-value='YES']
${input_file_finisher_no}    //input[@id="rbFileFinisher"][@ng-reflect-value='NO']
${tab_waivers}   //span[contains(text(), 'Waivers')]
${tab_reportingRemarks}       //span[contains(text(), 'Reporting Remarks')]
${list_routing_code}    //select[@formcontrolname='bspRouteCode']
${button_addWaiver}    //i[@id='add']
${list_waivers}    //select[@id='waiver']
${button_removeWaiver}    css=#remove
${input_waiver}    css=#waiver
${input_waiverAmount}    css=#waiverText
${form_segments}    //tbody[@formarrayname='segments']
${input_destination}    //input[@id='destinationList']
${list_destination}     //datalist[@id='dynamicDestinationCode']
${input_car_savings_code_start}    //div[@ng-reflect-name='
${input_carSavings_checkBox_end}    ']//input[@name='chkIncluded']
${select_carSavings_reasonCode_end}    ']//select[@name='carReasonCode']
${tab_car_savings_code}    //span[contains(text(), 'Car Savings Code')]
${list_agent_assisted}     css=#ebR
${input_tool_identifier}    //input[@formcontrolname='ebT']
${input_online_format}     //input[@formcontrolname='ebN']
${list_touch_reason}     css=#ebC
${tab_hotelSavingsCode}    css=#hotelSegmentsTab-link
${list_hotelSavings}    ]//select[@formcontrolname='hotelSavingsCode']
${row_hotels}    //div[@formarrayname='hotels'][
${checkbox_hotelSegment}    ]//input[@id='chkIncluded']
${input_hotelSegNum}    ]//input[@formcontrolname='segment']
${input_checkInDate}    ]//input[@formcontrolname='checkInDate']
${input_chainCode}    ]//input[@formcontrolname='chainCode']
${tab_udid}    //span[contains(text(), 'UDID')]
${list_ul_whyFirstBooked}    //select[@id='whyBooked']
${input_ul_whoFirstBooked}    //input[@name='whoApproved']
${list_ul_fareType}    //select[@id='fareType']
${input_segment_number}    //input[@formcontrolname='segment']
${div_nonBsp}    //div[@formarrayname='nonbsp']
${div_fares}    //div[@formarrayname='fares']
${select_lowFareOption}    //select[@formcontrolname='lowFareOption']
${input_sge_airlineCode_start}    //input[@name='airlineCode_
${input_ej5_coachFare_start}    //input[@name='coachFare_
${input_nz7_yupFare_start}    //input[@name='yupFare_
${input_w7b_lowestCoach_start}    //input[@name='lowestCoach_
${input_w7b_approverName_start}    //input[@name='approver_
${input_cdrPerTkt_ui_end}    ']
${list_bookLessThan14Days}    //select[@name='bookLessThan14Days']
${list_reasonBookedLessThan14Days}    //select[@name='reasonBookedLessThan14Days']
${input_noHotelCodes}    //input[@name='noHotelCodes']
${input_whyNotOnline}    //input[@name='whyNotOnline']
${list_guestType}    //select[@name='guestType']
${list_reasonNotBook14Days}    //select[@name='reasonNotBook14Days']
${list_notBooked14dayAdvance}    //select[@name='notBooked14dayAdvance']
${list_notBooked14dayInAdvance}    //select[@name='bookedLess14Days']
${input_udid_approverName}    //input[@name='approverName']
${list_outOfPolicy}    //select[@name='outOfPolicy']
${list_notBooked14Days}     //select[@name='notBooked14Days']
${input_businessClassApprover}    //input[@name='businessClassApprover']
${list_offlineReasonCode}    //select[@name='offlineReasonCode']
${list_noHotelBooked}    //select[@name='noHotelBooked']
${list_airCanadaPassTracker}    //select[@name='airCanadaPassTracker']
${input_uniqueTravelerId}    //input[@name='uniqueTravelerId']
${list_notBooked7Days}     //select[@name='notBooked7Days']
${list_whyHotelNotBooked}    //select[@name='whyHotelNotBooked']
${input_guestSponsorName}    //input[@name='guestSponsorName']
${list_approverName}    //select[@name='approverName']
${list_bookAdvanceReason}    //select[@name='bookAdvanceReason']
${input_noHotel}    //input[@name='noHotelBookedReason']
${list_reasonAirBooked14Days}    //select[@name='reasonAirBooked14Days']
${list_hotelNotBooked}    //select[@name='hotelNotBooked']
${list_reasonNotOnline}    //select[@name='reasonNotOnline']
${input_travelerType}    //input[@name='travellerType']
${list_noHotel}    //select[@name='noHotelBookedReason']
${input_btaApproval}    //input[@name='btaApproval']
${input_udid_lowestGdsFare}    //input[@name='lowestGdsFare']
${list_passTracker}    //select[@name='passTracker']
${list_bookingAdvance}    //select[@name='bookAdvance']
${input_approverInfo}    //input[@name='approverInfo']
${list_advanceBooking}    css=#advanceBooking
${list_booking_within_14d}    css=#bookReason
${input_amei}    css=#amei
${list_whyLessThanDays}    //select[@name='whyLessThanDays']
${list_authorizer}    //select[@name='authorizer']
${list_noHotelReason}    //select[@name='noHotelReason']
${input_exceptionApprover}     //input[@name='exceptionApprover']
${input_businessClassApproval}    //input[@name='businessClassApproval']
${input_authorizationNo}    //input[@name='authorizationNo']
${list_businessClassApprover}    //select[@name='businessClassApprover']
${list_bookedLessFourteen}     //select[@name='bookedLessFourteen']
${input_moxieId}    //input[@name='moxieId']
${input_destinationUdid}    //input[@name='destinationUdid']
${input_approvelEmail}    //input[@name='approvelEmail']
${list_advanceDaysReason}     //select[@name='advanceDaysReason']
${input_authorizer}    //input[@name='authorizer']
${input_btaReasonUsage}    //input[@name='btaReasonUsage']
${input_employeeId}    //input[@name='employeeId']
${list_reasonNotBooking}    //select[@name='reasonNotBooking']
${input_lowGdsFare}    //input[@name='lowGdsFare']
${list_companyCode}    //select[@name='companyCode']
${list_splitCharge}     //select[@name='splitCharge']
${list_guestBook}    //select[@name='guestBook']
${input_whyBookedOnline}    //input[@name='whyBookedOnline']
${input_feeReason}     //input[@name='feeReason']
${list_reasonForNotBookingOL}    //select[@name='reasonForNotBookingOL']
${list_reasonWhyWestjet}    //select[@id='reasonWhyWestjet']
${list_exchangeReason}    //select[@id='exchangeReason']
${list_waiverApproved}    //select[@id='waiverApproved']
${input_declinedAirline}    //input[@name='declinedAirline']
${input_preTripNumber}    //input[@name='preTripNumber']
${tab_noHotelBooked}    //span[contains(text(), 'No Hotel Booked')]
${select_hotelReasonCode}    //select[@id='reasonCode']
${input_segmentDate}    //input[@name='date']
${input_segmentCityCode}    //input[@name='cityCode']
${input_NumberOfDays}    //input[@name='numDays']
${tab_waivers_favors}     //tab[@id='waiverFavorsTab']

*** Keywords ***
Click BSP Reporting Tab
    Wait Until Element Is Visible    ${tab_bsp}    30
    Click Element    ${tab_bsp}
    Set Test Variable    ${current_page}    BSP Reporting
    Wait Until Element Is Visible    ${fare_row_number}${open_bracket}1${close_bracket}${list_reason_code}    30

Click Non BSP Reporting Tab
    Wait Until Element Is Visible    ${tab_nonBsp}    30
    Click Element    ${tab_nonBsp}
    Wait Until Page Contains Element    ${input_full_fare}    30
    Set Test Variable    ${current_page}    Non BSP Reporting

Click Matrix Reporting Tab
    Wait Until Element Is Visible    ${tab_matrixReporting}    30
    Click Element    ${tab_matrixReporting}
    Wait Until Element Is Visible    ${input_cic_number}    30
    Set Test Variable    ${current_page}    Matrix Reporting
    
Click Waivers Reporting Tab
    Wait Until Element Is Visible    ${tab_waivers}    30
    Click Element    ${tab_waivers}
    Wait Until Element Is Visible    ${button_addWaiver}    30
    Set Test Variable    ${current_page}    Waivers

Click Reporting Remarks Tab
    Scroll Element Into View     ${panel_reporting}
    Wait Until Element Is Visible    ${tab_reportingRemarks}    30
    Click Element    ${tab_reportingRemarks}
    Wait Until Page Contains Element    ${list_routing_code}    30
    Set Test Variable    ${current_page}    Reporting Remarks

Click Car Savings Code Tab
    Wait Until Element Is Visible    ${tab_car_savings_code}    30
    Click Element    ${tab_car_savings_code}
    Wait Until Element Is Visible    ${input_car_savings_code_start}0${input_carSavings_checkBox_end}    30
    Set Test Variable    ${current_page}    Car Savings Code
    
Click Hotel Savings Code Tab
    Wait Until Element Is Visible    ${tab_hotelSavingsCode}    30
    Click Element    ${tab_hotelSavingsCode}
    Set Test Variable    ${current_page}    Hotel Savings Code    
    
Click UDID Tab
    Wait Until Element Is Visible    ${tab_udid}    30
    Click Element    ${tab_udid}
    Set Test Variable    ${current_page}    UDID    
    
Click No Hotel Booked Tab
    Wait Until Element Is Visible    ${tab_noHotelBooked}    30
    Click Element    ${tab_noHotelBooked}
    Wait Until Element Is Visible    ${select_hotelReasonCode}    30
    Set Test Variable    ${current_page}    No Hotel Booked
    
Enter Full Fare
    [Arguments]    ${full_fare_value}    ${tst_number}=1
    Enter Value    ${fare_row_number}${open_bracket}${tst_number}${close_bracket}${input_full_fare}    ${full_fare_value}

Enter Low Fare
    [Arguments]    ${low_fare_value}    ${tst_number}=1
    Enter Value    ${fare_row_number}${open_bracket}${tst_number}${close_bracket}${input_low_fare}    ${low_fare_value}

Select Reason Code
    [Arguments]    ${reason_code_value}    ${tst_number}=1
    Select From List By Label    ${fare_row_number}${open_bracket}${tst_number}${close_bracket}${list_reason_code}    ${reason_code_value}

Add Client Reporting Values For Single BSP Segment
    Select Single Destination Code And Routing Code For Reporting
    Navigate To Page BSP Reporting
    Wait Until Page Contains Element    ${checkbox_clientReporting}    30
    Select Client Reporting Fields To Be Written    1
    ${actual_charge_fare}    Get Value   ${input_charge_fare}
    ${actual_full_fare}    Get Value    ${input_full_fare}
    Get Low Fare Value
    Run Keyword If    "${actual_low_fare}" == "${EMPTY}"    Enter Value    ${input_low_fare}    550.50
    Run Keyword If    "${actual_low_fare}" == "${EMPTY}"    Get Low Fare Value
    Select Reason Code    A : Lowest Fare Accepted
    Set Test Variable    ${actual_charge_fare}
    Set Test Variable    ${actual_full_fare}
    Set Test Variable    ${actual_low_fare}
    Take Screenshot

Select Reason Code Value ${reason_code} For TST ${tst_no}
    Navigate To Page BSP Reporting
    Select Client Reporting Fields To Be Written    ${tst_no}
    Select From List By Value    ${fare_row_number}${open_bracket}${tst_no}${close_bracket}${list_reason_code}    ${reason_code}
    Take Screenshot

Add Client Reporting Values For Multiple BSP Segment
    Navigate To Page BSP Reporting
    Wait Until Page Contains Element    ${tab_clientReporting}${open_bracket}3${close_bracket}${checkbox_clientReporting}    60
    Select Client Reporting Fields To Be Written    1    2    3
    Enter Full Fare    4000.50
    Enter Low Fare    300.00
    Select Reason Code    C : Low Cost Supplier Fare Declined
    Enter Full Fare    5123.50    2
    Enter Low Fare    123.00    2
    Select Reason Code    K : Client Negotiated Fare Declined    2
    Enter Full Fare    790.00    3
    Enter Low Fare    678.00    3
    Select Reason Code    5 : Fare not in compliance    3
    Get Value Of Charge Fare For 3 TST
    Take Screenshot

Add Client Reporting Values For Multiple BSP Segment And Multiple TSTs
    Navigate To Page BSP Reporting
    Wait Until Page Contains Element    ${tab_clientReporting}${open_bracket}2${close_bracket}${checkbox_clientReporting}    60
    Select Client Reporting Fields To Be Written    1    2
    Enter Full Fare    12000.50
    Enter Low Fare    1300.00
    Select Reason Code    C : Low Cost Supplier Fare Declined
    Enter Full Fare    15123.50    2
    Enter Low Fare    123.00    2
    Select Reason Code    K : Client Negotiated Fare Declined    2
    Take Screenshot

Verify That Client Reporting Remarks Are Written In The PNR For Single TST
    Finish PNR
    Verify Specific Remark Is Written In The PNR    RM *FF/-${actual_full_fare}/S2
    Verify Specific Remark Is Written In The PNR    RM *LP/-${actual_low_fare}/S2
    Verify Specific Remark Is Written In The PNR    RM *FS/-A/S2
    Verify Specific Remark Is Written In The PNR    RMT TKT1-FQ${actual_charge_fare}/LP-${actual_low_fare}/FS-A/FF-${actual_full_fare}/FS01/DE-${final_destination}
    Verify Specific Remark Is Written In The PNR    RMT TKT1-BF${actual_tst_currency_1}${actual_tst_fare_1}/S2
    Switch To Command Page

Verify Aqua Compliance Tracker Is Written In The PNR
    Get Record Locator Value
    Verify Specific Remark Is Written In The PNR    RM *U70/-${actual_record_locator}

Verify That Client Reporting Remarks Are Written In The PNR For Multiple TSTs
    Finish PNR
    Verify Specific Remark Is Written In The PNR    RM *FF/-4000.50/S2-3
    Verify Specific Remark Is Written In The PNR    RM *LP/-300.00/S2-3
    Verify Specific Remark Is Written In The PNR    RM *FS/-C/S2-3
    Verify Specific Remark Is Written In The PNR    RM *FF/-5123.50/S4
    Verify Specific Remark Is Written In The PNR    RM *LP/-123.00/S4
    Verify Specific Remark Is Written In The PNR    RM *FS/-K/S4
    Verify Specific Remark Is Written In The PNR    RM *FF/-790.00/S5
    Verify Specific Remark Is Written In The PNR    RM *LP/-678.00/S5
    Verify Specific Remark Is Written In The PNR    RM *FS/-5/S5
    Verify Specific Remark Is Written In The PNR    RMT TKT1-FQ${actual_charge_fare_1}/LP-300.00/FS-C/FF-4000.50/FS91/DE-${final_destination}
    Verify Specific Remark Is Written In The PNR    RMT TKT1-BF${actual_tst_currency_1}${actual_tst_fare_1}/S2-3
    Verify Specific Remark Is Written In The PNR    RMT TKT2-FQ${actual_charge_fare_2}/LP-123.00/FS-K/FF-5123.50/FS91/DE-${final_destination}
    Verify Specific Remark Is Written In The PNR    RMT TKT2-BF${actual_tst_currency_2}${actual_tst_fare_2}/S4
    Verify Specific Remark Is Written In The PNR    RMT TKT3-FQ${actual_charge_fare_3}/LP-678.00/FS-5/FF-790.00/FS91/DE-${final_destination}
    Verify Specific Remark Is Written In The PNR    RMT TKT3-BF${actual_tst_currency_3}${actual_tst_fare_3}/S5
    Switch To Command Page

Verify That Client Reporting Remarks Are Written In The PNR For Multiple Segments And Multiple TSTs
    Finish PNR
    Verify Specific Remark Is Written In The PNR    RM *FF/-12000.50/S3,5-6
    Verify Specific Remark Is Written In The PNR    RM *LP/-1300.00/S3,5-6
    Verify Specific Remark Is Written In The PNR    RM *FS/-C/S3,5-6
    Verify Specific Remark Is Written In The PNR    RM *FF/-15123.50/S2,4
    Verify Specific Remark Is Written In The PNR    RM *LP/-123.00/S2,4
    Verify Specific Remark Is Written In The PNR    RM *FS/-K/S2,4
    Switch To Command Page

Verify Client Reporting Fields For Exchange PNR
    Navigate To Page BSP Reporting
    ${actual_full_fare}    Get Value    ${input_full_fare}
    ${actual_low_fare}    Get Value    ${input_low_fare}
    ${actual_reason_code}    Get Value    ${list_reason_code}
    Run Keyword And Continue On Failure    Should Be Equal    ${actual_full_fare}    120.00
    Run Keyword And Continue On Failure    Should Be Equal    ${actual_low_fare}    120.00
    Run Keyword And Continue On Failure    Should Be Equal    ${actual_reason_code}    E
    Select Client Reporting Fields To Be Written    1
    Take Screenshot

Verify Client Reporting Fields For Non-BSP For ${segment_number} Segment
    Click Save Button
    Navigate To Page Non BSP Reporting
    ${actual_segment_number}    Get Value    ${div_nonBsp}${input_segment_number} 
    Get Full Fare Value
    Get Low Fare Value
    Run Keyword If    "${actual_full_fare}" == "${EMPTY}"    Enter Value    ${input_full_fare}    1123.50
    Run Keyword If    "${actual_full_fare}" == "${EMPTY}"    Get Full Fare Value
    ${actual_low_fare}    Convert To Number    ${actual_low_fare}    2
    Set Test Variable    ${actual_low_fare}    ${actual_low_fare}0
    # Set Test Variable    ${actual_full_fare}
    Run Keyword If    '${segment_number}' == 'Single'     Run Keyword And Continue On Failure    Should Be Equal    ${actual_segment_number}    2    ELSE   Run Keyword And Continue On Failure    Should Be Equal    ${actual_segment_number}    2,3 
    Run Keyword And Continue On Failure    Should Not Be Equal    ${actual_full_fare}    760.00    
    Run Keyword And Continue On Failure    Should Be Equal    ${actual_low_fare}    ${expected_low_fare} 
    Take Screenshot
    
Get Full Fare Value
    ${actual_full_fare}    Get Value    ${input_full_fare}
    Set Test Variable    ${actual_full_fare}
    
Get Low Fare Value
    ${actual_low_fare}    Get Value    ${input_low_fare}
    Set Test Variable    ${actual_low_fare}

Update Client Reporting Values For Non-BSP
    Click Save Button
    Navigate To Page Non BSP Reporting
    Enter Value    ${input_nonBsp_fullFare}    1123.50
    Enter Value    ${input_nonBsp_lowFare}    300.00
    Take Screenshot

Select Client Reporting Fields To Be Written
    [Arguments]    @{reporting_checkbox}
    Wait Until Page Contains Element    ${checkbox_clientReporting}
    : FOR    ${reporting_checkbox}    IN    @{reporting_checkbox}
    \    Select Checkbox    ${tab_clientReporting}${open_bracket}${reporting_checkbox}${close_bracket}${checkbox_clientReporting}
    [Teardown]    Take Screenshot

Verify That Non-BSP Client Reporting Remarks Are Written In The PNR For Single Segment
    Finish PNR
    Verify Specific Remark Is Written In The PNR    RM *FF/-${actual_full_fare}/S2
    Verify Specific Remark Is Written In The PNR    RM *LP/-${actual_low_fare}/S2
    Verify Specific Remark Is Written In The PNR    RM *FS/-L/S2
    Verify Specific Remark Is Written In The PNR    RMT TKT1-FQ760.00/LP-${actual_low_fare}/FS-L/FF-${actual_full_fare}/FS91/DE
    Verify Specific Remark Is Written In The PNR    RMT TKT1-BFCAD750.00/S2

Verify That Non-BSP Client Reporting Remarks Are Written In The PNR For Multiple Segments
    Finish PNR
    Verify Specific Remark Is Written In The PNR    RM *FF/-${actual_full_fare}/S2-3
    Verify Specific Remark Is Written In The PNR    RM *LP/-${actual_low_fare}/S2-3
    Verify Specific Remark Is Written In The PNR    RM *FS/-L/S2-3
    Verify Specific Remark Is Written In The PNR    RMT TKT1-FQ760.00/LP-${actual_low_fare}/FS-L/FF-${actual_full_fare}/FS91/DE-${final_destination}
    Verify Specific Remark Is Written In The PNR    RMT TKT1-BFCAD750.00/S2-3

Verify That Updated Non-BSP Client Reporting Remarks Are Written In The PNR
    Finish PNR
    Verify Specific Remark Is Written In The PNR    RM *FF/-1123.50/S2
    Verify Specific Remark Is Written In The PNR    RM *LP/-300.00/S2
    Verify Specific Remark Is Written In The PNR    RM *FS/-L/S2

Verify That BSP Client Reporting Remarks Are Written In The PNR For Exchange TST
    Finish PNR
    Verify Specific Remark Is Written In The PNR    RM *FF/-120.00/S2
    Verify Specific Remark Is Written In The PNR    RM *LP/-120.00/S2
    Verify Specific Remark Is Written In The PNR    RM *FS/-E/S2
    Switch To Command Page

Verify That Accounting Remark Is Written Correctly For Non BSP Airline Pass Purchase
    Finish PNR
    Verify Specific Remark Is Written In The PNR    RM *FF/-127.25/S2
    Verify Specific Remark Is Written In The PNR    RM *LP/-127.25/S2
    Verify Specific Remark Is Written In The PNR    RM *FS/-L/S2
    Switch To Command Page

Verify Accounting Remark Is Written Correctly For Non BSP Exchange
    Finish PNR
    Verify Specific Remark Is Written In The PNR    RM *FF/-1111.20/S2
    Verify Specific Remark Is Written In The PNR    RM *LP/-1111.20/S2
    Verify Specific Remark Is Written In The PNR    RM *FS/-E/S2

Select File Finisher to ${file_finisher_value}
    Navigate To Page Matrix Reporting
    Run Keyword If    "${file_finisher_value}" == "YES"    Click Element    ${input_file_finisher_yes}
    Run Keyword If    "${file_finisher_value}" == "NO"    Click Element    ${input_file_finisher_no}
    [Teardown]    Take Screenshot

Verify If The Default CIC Number Value Displayed Is ${expected_cic_number}
    Navigate To Page Matrix Reporting
    ${actual_cic_number}    Get Element Attribute    ${input_cic_number}    ng-reflect-model
    Log    Expected: "${expected_cic_number}"
    Log    Actual: "${actual_cic_number}"
    Run Keyword And Continue On Failure    Should Be Equal    ${actual_cic_number}    ${expected_cic_number}
    [Teardown]    Take Screenshot

Enter CIC Number Value: ${cic_number_value}
    Navigate To Page Matrix Reporting
    Clear Element Text    ${input_cic_number}
    Enter Value    ${input_cic_number}    ${cic_number_value}
    Log    Entered in the CIC Number field: "${cic_number_value}"
    [Teardown]    Take Screenshot

Create Exchange and NE Remark For Single Passenger With Single BSP Segment
    Create Exchange NE Remark
    Create Exchange PNR In The GDS
    
Verify CN And NUC Remark Are Written Correctly For Exchanged PNR
    Finish PNR
    Verify Specific Remark Is Written In The PNR    RM *CN/-ADT
    Verify Specific Remark Is Written In The PNR    RM *NUC
    
Verify CN And NUC Remark Are Updated Correctly For Exchanged PNR
    Submit To PNR
    Get PNR Details
    Verify Specific Remark Is Written In The PNR    RM *CN/-IFC
    Verify Specific Remark Is Written In The PNR    RM *NUC

Verify CN And NUC Remark Are Written Correctly For PNR With IFC CN Number Remark
    Finish PNR
    Verify Specific Remark Is Written In The PNR    RM *CN/-QWE
    Verify Specific Remark Is Written In The PNR    RM *NUC
    
Verify CN And NUC Remark Are Written Correctly For PNR With Hotel and Invoice Remark
    Finish PNR
    Verify Specific Remark Is Written In The PNR    RM *CN/-IFC
    Verify Specific Remark Is Written In The PNR    RM *NUC
    
Verify CN And NUC Remark Are Updated Correctly For PNR With Hotel and Invoice Remark
    Submit To PNR
    Get PNR Details
    Verify Specific Remark Is Written In The PNR    RM *CN/-ASD
    Verify Specific Remark Is Written In The PNR    RM *NUC
    
Click Add Waiver Button ${button_no}
    Wait Until Element Is Visible    ${input_waiver}    20    
    Click Element    ${tab_waivers_favors}${open_bracket}${button_no}${close_bracket}${button_addWaiver}
    Wait Until Page Contains Element    ${list_waivers}     30

Select Waivers Code Option For Single Ticket
    Navigate To Page Waivers
    Select Waiver Code Options   1   ANC/50 - Name Change 

Select Multiple Waiver Code Options
    Navigate To Page Waivers
    Select Waiver Code Options   1    ASC/50 - Seat / Waitlist Change    CSR/50 - Car Certificate Usage    HNS - Waived No Show Charge
    Take Screenshot
    
Select Multiple Waiver Code Options For Multiple Tickets
    Navigate To Page Waivers
    Select Waiver Code Options    1    ASC/50 - Seat / Waitlist Change    
    Select Waiver Code Options    2    HSR/50 - Hotel Certificate Usage     HNS - Waived No Show Charge    
    Select Waiver Code Options    3    ANC/50 - Name Change      CSR/50 - Car Certificate Usage      AMT - Client Missed Ticketing   

Select Multiple Waiver Code Options With Values
    Navigate To Page Waivers
    Select Waiver Code Options    1    AFM - Fair Match    AMT - Client Missed Ticketing     HNS - Waived No Show Charge

Select Waiver Code Options
    [Arguments]   ${tst_no}    @{waiver_codes}
    : FOR      ${waiver_codes}   IN    @{waiver_codes}
    \    Click Add Waiver Button ${tst_no}
    \    Select From List By Label    ${list_waivers}     ${waiver_codes} 
    \    ${status}    Run Keyword And Return Status    Page Should Contain Element    ${input_waiverAmount}
    \    Run Keyword If     '${status}' == 'True'    Enter Value    ${input_waiverAmount}    1234 
    \    Click Button    ${button_save}  
    \    Wait Until Page Contains Element    ${button_removeWaiver}    30  
    \    Click Element At Coordinates    ${input_waiver}    0    0  
    Take Screenshot
  
Verify That Waivers Code Is Written In The PNR
    Finish PNR
    Verify Specific Remark Is Written In The PNR    RM *U63/-ANCCN150   
    Switch To Command Page
    
Verify That Multiple Waiver Codes Are Written In The PNR For Single Ticket
    Finish PNR
    Verify Specific Remark Is Written In The PNR    RM *U63/-ASCCN150/CSRCN150/HNSCN11234
    Switch To Command Page
    
Verify That Multiple Waiver Codes Are Written In The PNR For Multiple Tickets
    Finish PNR
    Verify Specific Remark Is Written In The PNR    RM *U63/-ASCCN150
    Verify Specific Remark Is Written In The PNR    RM *U63/-HSRCN150/HNSCN11234
    Verify Specific Remark Is Written In The PNR    RM *U63/-ANCCN150/CSRCN150/AMTCN11234
    Switch To Command Page
    
Verify That Multiple Waiver Codes With Values Are Written In The PNR For Multiple Tickets
    Finish PNR
    Verify Specific Remark Is Written In The PNR    RM *U63/-AFMCN11234/AMTCN11234/HNSCN11234
    Switch To Command Page

Verify Routing Code Dropdown Is Displayed With Correct Values
    Navigate To Page Reporting Remarks
    #Click Element    ${list_routing_code}
    ${list}     Get Selected List Labels         ${list_routing_code}
    Log     ${list}
    Run Keyword And Continue On Failure    List Selection Should Be    ${list_routing_code}    USA incl. all US Territories and Possessions    Mexico/Central America/Canal Zone/Costa Rica
    ...    Caribbean and Bermuda    South America    Europe-incl. Morocco/Tunisia/Algeria/Greenland    Africa    Middle East/Western Asia
    ...    Asia incl. India    Australia/New Zealand/Islands of the Pacific incl. Hawaii excl. Guam    Canada and St. Pierre et Miquelon
    
Verify Routing Code Dropdown Is A Required Field
    Fill Up Ticketing Panel With Default Values
    Scroll Element Into View    ${list_routing_code}
    Click Submit To PNR
    Element Should Contain    ${text_warning}     Please make sure all the inputs are valid and put required values!
    
Fill Up Routing Code With ${selection}
    Navigate To Page Reporting Remarks
    Select From List By Label    ${list_routing_code}     ${selection}
    Set Test Variable    ${routing_code_selected}    yes
    [Teardown]    Take Screenshot
    
Verify Country Of Destination Is Mapped In The FS Remark
    Finish PNR
    Verify Expected Remarks Are Written In The PNR
    
Select Default Value For Routing Code
    Run Keyword If    "${destination_selected}" == "no"   Navigate To Page Reporting Remarks
    Select From List By Label    ${list_routing_code}     Canada and St. Pierre et Miquelon
    Run Keyword If    "${destination_selected}" == "no"    Select Default Value For Destination Code 
    Set Test Variable    ${routing_code_selected}    yes
    [Teardown]    Take Screenshot
    
Select Default Value For Destination Code
    Navigate To Page Reporting Remarks
    ${is_destination_present}    Run Keyword And Return Status    Page Should Contain Element    ${input_destination} 
    Run Keyword If    "${is_destination_present}" == "True"   Enter Destination Code Default Value
    Set Test Variable    ${destination_selected}    yes 

Enter Destination Code Default Value        
    ${elements_count}    Get Element Count    ${input_destination} 
    Set Test Variable    ${elements_count}
        : FOR    ${destination_index}    IN RANGE    0    ${elements_count}
	    \    ${destination_index}    Evaluate    ${destination_index} + 1
	    \    Input Value    ${form_segments}${open_bracket}${destination_index}${close_bracket}${input_destination}    ${final_destination}
    
Select Destination Code Values
	[Arguments]    @{destination_code}
	Set Test Variable    ${destination_index}    1
	: FOR    ${destination_code}    IN    @{destination_code}
	    \    Input Value    ${form_segments}${open_bracket}${destination_index}${close_bracket}${input_destination}    ${destination_code}
		\    ${destination_index}    Evaluate    ${destination_index} + 1
	
Populate Destination Code Fields For ${tst_no} TST
    Navigate To Page Reporting Remarks
    Run Keyword If  "${tst_no}" == "Single"   Select Destination Code Values    YUL
    ...  ELSE IF   "${tst_no}" == "Multiple"    Select Destination Code Values   YUL   YYZ   ORD
    ...  ELSE IF   "${tst_no}" == "Passive Air, No"    Select Destination Code Values   YUL
    ...  ELSE IF   "${tst_no}" == "Active Car, No"    Select Destination Code Values   CDG
    ...  ELSE IF   "${tst_no}" == "Passive Car, No"    Select Destination Code Values   FRA
    ...  ELSE IF   "${tst_no}" == "Active Hotel, No"    Select Destination Code Values   YVR
    ...  ELSE IF   "${tst_no}" == "Passive Hotel, No"    Select Destination Code Values   STR
    ...  ELSE IF   "${tst_no}" == "Rail, No"    Select Destination Code Values   CUN
    ...  ELSE IF   "${tst_no}" == "Limo, No"    Select Destination Code Values   DXB
    Set Test Variable    ${destination_selected}    yes
    Take Screenshot
    
Verify Destination Code Remarks Are Written In The PNR
    Navigate To Page Reporting Remarks
    Finish PNR
    Verify Expected Remarks Are Written In The PNR
    
Add Car Savings Code For ${number_of} Segments
    Navigate to Page Car Savings Code
    Add ${number_of} Car Savings Code
    Take Screenshot
    
Add ${number} Car Savings Code
    ${limit}    Evaluate    ${number} - 1
    : FOR    ${index}    IN RANGE    0    ${number}
    \    Click Element    ${input_car_savings_code_start}${index}${input_carSavings_checkBox_end}
    \    Run Keyword If    ${index} == 0    Select From List By Label     ${input_car_savings_code_start}${index}${select_carSavings_reasonCode_end}    I : Sold out
    \    Run Keyword If    ${index} == 1    Select From List By Label     ${input_car_savings_code_start}${index}${select_carSavings_reasonCode_end}    C : Preferred size not available
    \    Run Keyword If    ${index} == 2    Select From List By Label     ${input_car_savings_code_start}${index}${select_carSavings_reasonCode_end}    R : Preferred supplier not in city
    \    Run Keyword If    ${index} == 3    Select From List By Label     ${input_car_savings_code_start}${index}${select_carSavings_reasonCode_end}    W : CWT negotiated rate accepted
    \    Run Keyword If    ${index} == 4    Select From List By Label     ${input_car_savings_code_start}${index}${select_carSavings_reasonCode_end}    X : Booked company preferred car
    \    ${index}    Evaluate   ${index} + 1
    Take Screenshot
    
Verify Car Savings Code Remark For Single Passive Car Segments
    Finish PNR
    Assign Current Date
    Verify Specific Remark Is Written In The PNR    RM *CS${test_date_1}FRA/-SV-I
    Verify Specific Remark Is Not Written In The PNR    RM *CS22MAYFRA/-SV-C

Verify Car Savings Code Remark For Multiple Passive Car Segments
    Finish PNR
    Verify Specific Remark Is Written In The PNR    RM *CS${test_date_1}FRA/-SV-I
    Verify Specific Remark Is Written In The PNR    RM *CS${test_date_2}FRA/-SV-C
    Verify Specific Remark Is Not Written In The PNR    RM *CS23DECPEK/-SV-W
    
Verify Car Savings Code Remark For Single Active Car Segments
    Finish PNR
    Assign Current Date
    Verify Specific Remark Is Written In The PNR    RM *CS${test_date_1}CDG/-SV-I
    
Verify Car Savings Code Remark For Multiple Active Car Segments
    Finish PNR
    Verify Specific Remark Is Written In The PNR    RM *CS${test_date_1}LHR/-SV-I
    Verify Specific Remark Is Written In The PNR    RM *CS${test_date_2}CDG/-SV-C
    
Verify Car Savings Code Remark For Active And Passive Car Segments
    Finish PNR
    Assign Current Date
    Verify Specific Remark Is Written In The PNR    RM *CS21FEBPEK/-SV-I
    Verify Specific Remark Is Written In The PNR    RM *CS10JUNYYZ/-SV-C
    Verify Specific Remark Is Written In The PNR    RM *CS${test_date_1}CDG/-SV-R
    Verify Specific Remark Is Not Written In The PNR    RM *CS23NOVPEK/-SV-X
    Verify Specific Remark Is Not Written In The PNR    RM *CS14DECMEL/-SV-Y

Verify Online Fields And Update Agent Assisted And Touch Reason Codes
    Navigate To Page Reporting Remarks
    Verify Online Touch Reason Fields Are Populated With Correct Values    CT     C
    Update Agent Assisted And Touch Reason Code    AM    S
    
Verify Online Touch Reason Fields Are Populated With Correct Values
    [Arguments]    ${expected_agent_assisted}    ${expected_touch_reason}
    ${actual_agent_assisted}     Get Value    ${list_agent_assisted}
    ${actual_touch_reason}     Get Value    ${list_touch_reason}
    Should Be Equal    ${actual_agent_assisted}    ${expected_agent_assisted}  
    Should Be Equal    ${actual_touch_reason}    ${expected_touch_reason}
    Take Screenshot

Update Agent Assisted And Touch Reason Code
    [Arguments]   ${agent_assisted}    ${touch_reason}
    Select From List By Value    ${list_agent_assisted}    ${agent_assisted} 
    Select From List By Value    ${list_touch_reason}    ${touch_reason}
    Sleep    2
    Take Screenshot

Verify That Online Touch Reason Fields Are Not Displayed
    Navigate To Page Reporting Remarks
    Page Should Not Contain Element    ${list_agent_assisted}
    Page Should Not Contain Element    ${input_tool_identifier} 
    Page Should Not Contain Element    ${input_online_format} 
    Page Should Not Contain Element    ${list_touch_reason}
    Take Screenshot
    
Verify EB Remark Written In The PNR
    Finish PNR
    Verify Expected Remarks Are Written In The PNR
    
Fill Up Hotel Savings Code With Value ${hotel_savings_code}
    Navigate To Page Hotel Savings Code
    @{codes}     Split String     ${hotel_savings_code}    ,
    ${i}    Set Variable    1    
    : FOR    ${code}    IN    @{codes}
    \    Click Element    ${row_hotels}${i}${checkbox_hotelSegment}
    \    ${date}    Get Value    ${row_hotels}${i}${input_checkInDate}
    \    Run Keyword And Continue On Failure    Should Be Equal    ${date}    ${test_date_${i}}
    \    ${chain_code}    Get Value    ${row_hotels}${i}${input_chainCode}
    \    Run Keyword If    "${chain_code}" == "${EMPTY}"    Enter Value    ${row_hotels}${i}${input_chainCode}    1A
    \    ${chain_code}    Set Variable If    "${chain_code}" == "${EMPTY}"    1A    ${chain_code}
    \    Set Test Variable    ${chain_code_${i}}    ${chain_code}
    \    Select From List By Value    ${row_hotels}${i}${list_hotelSavings}    ${code}
    \    Set Test Variable    ${hotel_savings_code_${i}}    ${code}
    \    ${i}    Evaluate    ${i} + 1
    Take Screenshot

Fill Up Hotel Savings Code Without Value
     Navigate To Page Hotel Savings Code
    ${i}    Set Variable    1    
    : FOR    ${i}    IN RANGE    1     9
    \    Click Element    ${row_hotels}${i}${checkbox_hotelSegment}
    \    ${date}    Get Value    ${row_hotels}${i}${input_checkInDate}
    \    Run Keyword And Continue On Failure    Should Be Equal    ${date}    ${test_date_${i}}
    \    ${chain_code}    Get Value    ${row_hotels}${i}${input_chainCode}
    \    Run Keyword If    "${chain_code}" == "${EMPTY}"    Enter Value    ${row_hotels}${i}${input_chainCode}    1A
    \    ${chain_code}    Set Variable If    "${chain_code}" == "${EMPTY}"    1A    ${chain_code}
    \    Set Test Variable    ${chain_code_${i}}    ${chain_code}
    \    ${next}    Evaluate    ${i} + 1
    \    ${exists}    Run Keyword And Return Status   Element Should Be Visible     ${row_hotels}${next}${checkbox_hotelSegment}
    \    Exit For Loop If    not ${exists}
    Take Screenshot

Verify Hotel Savings Remark Is Written In The PNR
    Finish PNR
   : FOR    ${i}    IN RANGE    1      10
   \    ${status}    Run Keyword And Return Status    Should Not Be Empty     ${hotel_savings_code_${i}}
   \    Run Keyword If    ${status}    Verify Specific Remark Is Written In The PNR    RM *HS${test_date_${i}}/-SV-${hotel_savings_code_${i}}/-CHN-${chain_code_${i}}
   \    ${i}    Evaluate    ${i} + 1
   \    Exit For Loop If   not ${status} 
   Verify Unexpected Remarks Are Not Written In The PNR
   Switch To Command Page
   Cancel PNR
    
Verify HS Remark Is Written Without Savings Code
    Finish PNR
    : FOR    ${i}    IN RANGE    1      10
    \    ${status}    Run Keyword And Return Status    Should Not Be Empty     ${chain_code_${i}}
    \    Run Keyword If    ${status}    Verify Specific Remark Is Written In The PNR    RM *HS${test_date_${i}}/-CHN-${chain_code_${i}}
    \    ${i}    Evaluate    ${i} + 1
    \    Exit For Loop If   not ${status} 
    Verify Unexpected Remarks Are Not Written In The PNR
    Switch To Command Page
    Cancel PNR
    
Add Values For UL Client When Why First/Bus Booked Is ${why_first_booked}
    Navigate To Page UDID
    Wait Until Element Is Visible    ${list_ul_whyFirstBooked}    10
    Run Keyword If    "${why_first_booked}" == "Core Team Bus Class Approved"    Select From List By Label    ${list_ul_whyFirstBooked}    Core Team Bus Class Approved
    ...    ELSE    Select From List By Label    ${list_ul_whyFirstBooked}    ${why_first_booked}
    Take Screenshot
    Run Keyword If    "${why_first_booked}" == "Core Team Bus Class Approved"    Wait Until Element Is Visible    ${input_ul_whoFirstBooked}    5
    Run Keyword If    "${why_first_booked}" == "Core Team Bus Class Approved"    Enter Value    ${input_ul_whoFirstBooked}    Phryne Fisher
    Run Keyword If    "${why_first_booked}" == "Core Team Bus Class Approved"    Select From List By Label    ${list_ul_fareType}    NON-NonRefundable
    ...    ELSE    Select From List By Label    ${list_ul_fareType}    REF-Refundable
    Set Test Variable    ${why_first_booked}
    Take Screenshot
    
Verify UDID 4, 6, and 19 Are Written In The PNR For Client UL
    Finish PNR
    Run Keyword If    "${why_first_booked}" == "Core Team Bus Class Approved"    Verify UL Client UDID Remarks For Core Team Bus Class Approved
    ...    ELSE    Verify UL Client UDID Remarks For Any First Booked Reason Except Core Team Bus Class Approved
    
Verify UL Client UDID Remarks For Core Team Bus Class Approved
    Verify Specific Remark Is Written In The PNR    RM *U6/-CORE TEAM BUS CLASS APPROVED
    Verify Specific Remark Is Written In The PNR    RM *U4/-PHRYNE FISHER
    Verify Specific Remark Is Written In The PNR    RM *U19/-NON
    Take Screenshot    
    
Verify UL Client UDID Remarks For Any First Booked Reason Except Core Team Bus Class Approved
    Verify Specific Remark Is Written In The PNR    RM *U6/-COMPLIMENTARY UPGRADE
    Verify Specific Remark Is Written In The PNR    RM *U19/-REF
    Verify Specific Remark Is Not Written In The PNR    RM *U4/-
    Take Screenshot

Verify High Fare Calculation For ${number_of_segment} Segment Is Sent
    Switch To Command Page
    Enter Cryptic Command    RT
    Run Keyword If    '${number_of_segment}' == '1'    Run Keyword And Continue On Failure    Element Should Contain    ${text_area_command}    FXA/R,*NR/S2    ELSE    Run Keyword And Continue On Failure    Element Should Contain    ${text_area_command}    FXA/R,*NR/S2,3

Book ${numberOfAir} Passive Air Segments For ${airline_code} With Flight Number ${flight_number} And Route ${route_code}
    Create ${numberOfAir} Test Dates
    : FOR    ${i}    IN RANGE   0   ${numberOfAir}
    \    ${i}    Evaluate    ${i} + 1
    \    Enter Cryptic Command    SS ${airline_code}${flight_number} Y ${test_date_${i}} ${route_code} GK1 / 11551440 / ABCDEFG
 
Book ${numberOfAir} Multiple Passive Air Segments For ${airline_code}
    Set Test Variable    ${numberOfAir}
    Set Test Variable    ${airline_code}
    Create ${numberOfAir} Test Dates
    Enter Cryptic Command    SS ${airline_code}3518 Y ${test_date_1} YYZYUL GK1 / 11551440 / ABCDEFG
    Enter Cryptic Command    SS ${airline_code}3513 Y ${test_date_2} YULYYZ GK1 / 11551440 / ABCDEFG
    Take Screenshot
    
Book 4 Multiple Passive Air Segments For Different Airline Codes
    Create 4 Test Dates
    Enter Cryptic Command    SS WS3518 Y ${test_date_1} YYZYUL GK1 / 11551440 / ABCDEFG
    Enter Cryptic Command    SS WS3513 Y ${test_date_2} YULYYZ GK1 / 11551440 / ABCDEFG
    Enter Cryptic Command    SS AC7562 Y ${test_date_3} YYZYUL GK1 / 11551440 / ABCDEFG
    Enter Cryptic Command    SS AC7561 Y ${test_date_4} YULYYZ GK1 / 11551440 / ABCDEFG
    Take Screenshot
    
Add Multiple Non-BSP Ticketing Details For Multiple Segments
    Add Non-BSP Ticketing Details For Multiple Segments
    Click Save Button
    Navigate To Page Add Accounting Line
    Select From List By Label    ${list_accounting_type}    Non BSP Airline
    Select Itinerary Segments    4    5
    Enter Value    ${input_supplier_confirmationNo}    54321
    Add Ticketing Amount Details With Other Tax And Commission     1000.00    1.00    2.00    3.00    4.00     5.00
    Enter Value    ${input_tktnumber}    0987654321
    Take Screenshot

Verify Client Reporting Fields For Multiple Non-BSP Accounting
    Verify Client Reporting Fields For Non-BSP For Multiple Segment
    Verify Item 2 Of Client Reporting Fields
    
Verify Item 2 Of Client Reporting Fields
    ${actual_segment_number2}    Get Value    ${div_nonBsp}${open_bracket}2${close_bracket}${input_segment_number} 
    ${actual_full_fare2}    Get Value     ${div_nonBsp}${open_bracket}2${close_bracket}${input_full_fare}
    ${actual_low_fare2}   Get Value     ${div_nonBsp}${open_bracket}2${close_bracket}${input_low_fare}
    Run Keyword And Continue On Failure    Should Be Equal    ${actual_segment_number2}    4,5 
    Run Keyword And Continue On Failure    Should Not Be Equal    ${actual_full_fare2}    760.00    
    Run Keyword And Continue On Failure    Should Be Equal    ${actual_low_fare2}    ${EMPTY}
    Take Screenshot
    ${actual_low_fare2}    Evaluate    ${actual_full_fare2} - 10
    ${actual_low_fare2}    Convert to String    ${actual_low_fare2}    
    Enter Value    ${div_nonBsp}${open_bracket}2${close_bracket}${input_low_fare}    ${actual_low_fare2}     
    Set Test Variable    ${actual_full_fare2} 
    Set Test Variable    ${actual_low_fare2}
    Take Screenshot
    
Verify That Multiple Non-BSP Client Reporting Remarks Are Written In The PNR For Multiple Segments
    Finish PNR
    Verify Specific Remark Is Written In The PNR    RM *FF/-${actual_full_fare}/S2-3
    Verify Specific Remark Is Written In The PNR    RM *LP/-${actual_low_fare}/S2-3
    Verify Specific Remark Is Written In The PNR    RM *FS/-L/S2-3
    Verify Specific Remark Is Written In The PNR    RM *FF/-${actual_full_fare2}/S4-5
    Verify Specific Remark Is Written In The PNR    RM *LP/-${actual_low_fare2}/S4-5
    Verify Specific Remark Is Written In The PNR    RM *FS/-L/S4-5
    
Add Client Reporting Values For Single TST BSP Segment For Lily
    Navigate To Page BSP Reporting
    Wait Until Page Contains Element    ${checkbox_clientReporting}    30
    Select Client Reporting Fields To Be Written    1
    Select From List By Label    ${select_lowFareOption}    CLIENT IS BKD ON DIRECT FLIGHTS-DO NOT OFFER CONNECTIONS IN LP
    Wait Until Element Is Visible    ${input_low_fare}    30
    ${actual_full_fare}    Get Value    ${input_full_fare}
    ${actual_low_fare}    Get Value    ${input_low_fare}
    Select Reason Code    A : Lowest Fare Accepted
    Set Test Variable    ${actual_full_fare}
    Set Test Variable    ${actual_low_fare}
    Take Screenshot
    
Add Client Reporting Values For Multi TST BSP Segment For Lily
    Navigate To Page BSP Reporting
    Wait Until Page Contains Element    ${checkbox_clientReporting}    30
    Select Client Reporting Fields To Be Written    1
    Select From List By Label    ${div_fares}${open_bracket}1${close_bracket}${select_lowFareOption}    CLIENT IS BKD ON DIRECT FLIGHTS-DO NOT OFFER CONNECTIONS IN LP
    Wait Until Element Is Visible    ${input_low_fare}    30   
    ${actual_full_fare}    Get Value    ${div_fares}${open_bracket}1${close_bracket}${input_full_fare}
    ${actual_low_fare}    Get Value    ${div_fares}${open_bracket}1${close_bracket}${input_low_fare}
    Select Reason Code    A : Lowest Fare Accepted    1
    Wait Until Page Contains Element    ${checkbox_clientReporting}    30
    Select Client Reporting Fields To Be Written    2
    Select From List By Label    ${div_fares}${open_bracket}1${close_bracket}${select_lowFareOption}    CLIENT IF BKD ON CONNECTING FLIGHTS-OFFER CONNECTIONS IN LP
    Wait Until Element Is Visible    ${input_low_fare}    30
    ${actual_full_fare2}    Get Value    ${div_fares}${open_bracket}2${close_bracket}${input_full_fare}
    ${actual_low_fare2}    Get Value    ${div_fares}${open_bracket}2${close_bracket}${input_low_fare}
    Select Reason Code    A : Lowest Fare Accepted    2
    Set Test Variable    ${actual_full_fare}
    Set Test Variable    ${actual_low_fare}
    Set Test Variable    ${actual_full_fare2}
    Set Test Variable    ${actual_low_fare2}
    Take Screenshot
    
Verify That Single BSP Client Reporting Remarks Are Written In The PNR For Single TST
    Finish PNR
    Verify Specific Remark Is Written In The PNR    RM *FF/-${actual_full_fare}/S2
    Verify Specific Remark Is Written In The PNR    RM *LP/-${actual_low_fare}/S2
    Verify Specific Remark Is Written In The PNR    RM *FS/-A/S2
    
Verify That Single BSP Client Reporting Remarks Are Written In The PNR For Multiple TST
    Finish PNR
    Verify Specific Remark Is Written In The PNR    RM *FF/-${actual_full_fare2}/S3
    Verify Specific Remark Is Written In The PNR    RM *LP/-${actual_low_fare2}/S3
    Verify Specific Remark Is Written In The PNR    RM *FS/-A/S3

Enter ${number} Airline Code/s For CDR per TKT
    Navigate To Page UDID
    ${limit}    Evaluate    ${number} + 1
    : FOR    ${index}    IN RANGE    1    ${limit}
    \    Enter Value    ${input_sge_airlineCode_start}${index}${input_cdrPerTkt_ui_end}    A${index}
    Take Screenshot
    
Enter ${number} Coach Fare For CDR per TKT
    Navigate To Page UDID
    ${limit}    Evaluate    ${number} + 1
    : FOR    ${index}    IN RANGE    1    ${limit}
    \    Enter Value    ${input_ej5_coachFare_start}${index}${input_cdrPerTkt_ui_end}    221.0${index}
    Take Screenshot
    
Enter ${number} YUP Fare For CDR per TKT
    Navigate To Page UDID
    ${limit}    Evaluate    ${number} + 1
    : FOR    ${index}    IN RANGE    1    ${limit}
    \    Enter Value    ${input_nz7_yupFare_start}${index}${input_cdrPerTkt_ui_end}    168.0${index}
    Take Screenshot
    
Enter ${number} Lowest Coach Fare And Approver Name For CDR per TKT
    Navigate To Page UDID
    ${limit}    Evaluate    ${number} + 1
    : FOR    ${index}    IN RANGE    1    ${limit}
    \    Enter Value    ${input_w7b_lowestCoach_start}${index}${input_cdrPerTkt_ui_end}    131.9${index}
    \    Enter Value    ${input_w7b_approverName_start}${index}${input_cdrPerTkt_ui_end}    Approver Name${index}
    Take Screenshot
    
Verify That The UDID ${udid_num} Remark Is Written In The PNR For ${client} With ${single_multiple} Active Air Segments
    Run Keyword If    "${client}" == "SGE"     Select Yes In Is Business Class Booked
    Finish PNR
    Verify Expected Remarks Are Written In The PNR
    
Verify That UI Should Not Appear For Client ${client_code} When There Is No TSTs
    Navigate To Page UDID
    Run Keyword If    "${client_code}" == "SGE"    Wait Until Element Is Not Visible    ${input_sge_airlineCode_start}1${input_cdrPerTkt_ui_end}    5
    Run Keyword If    "${client_code}" == "EJ5"    Wait Until Element Is Not Visible    ${input_ej5_coachFare_start}1${input_cdrPerTkt_ui_end}    5
    Run Keyword If    "${client_code}" == "NZ7"    Wait Until Element Is Not Visible    ${input_nz7_yupFare_start}1${input_cdrPerTkt_ui_end}    5
    Run Keyword If    "${client_code}" == "W7B"    Wait Until Element Is Not Visible    ${input_w7b_lowestCoach_start}1${input_cdrPerTkt_ui_end}    5
    Run Keyword If    "${client_code}" == "W7B"    Wait Until Element Is Not Visible    ${input_w7b_approverName_start}1${input_cdrPerTkt_ui_end}    5
    Close CA Corporate Test
    Logout To Amadeus Sell Connect
    
Verify That The Remarks For Diving Plongeon Canada Are Updated Correctly
    Finish PNR
    Verify Expected Remarks Are Written In The PNR
    
Select Reason Not Booked 14 Days Advance: ${reason}
    Navigate To Page UDID
    Select From List By Label    ${list_notBooked14dayAdvance}    ${reason}
    Take Screenshot

Select Reason For Not Booking 14 Days In Advance: ${reason}
    Navigate To Page UDID
    Select From List By Label    ${list_reasonNotBook14Days}    ${reason}
    Take Screenshot

Select Guest Type: ${guest_type}
    Navigate To Page UDID
    Select From List By Label    ${list_guestType}    ${guest_type}
    Take Screenshot

Select Book Less Than 14 Days Value: ${value}
    Navigate To Page UDID
    Select From List By Label    ${list_bookLessThan14Days}    ${value}
    Take Screenshot
    
Fill Up UDID Fields For Client Sunovion
    Navigate To Page UDID
    Select From List By Label    ${list_reasonBookedLessThan14Days}    Need to travel occurred less then 14 days prior
    Enter Value    ${input_noHotelCodes}    XX
    Enter Value    ${input_whyNotOnline}    AA
    Take Screenshot
    
Select Booked Less Than 14 Days Advance Value: ${reason}
    Navigate To Page UDID
    Select From List By Label    ${list_notBooked14dayInAdvance}    ${reason}
    Take Screenshot
    
Fill Up UDID Fields For Client Nexans
    Navigate To Page UDID
    Enter Value    ${input_udid_approverName}    Chuck Velasquez
    Select From List By Label    ${list_outOfPolicy}    Urgent internal Nexans
    Take Screenshot
    
Select Reason Not Booked 14 Days In Advance: ${reason}
    Navigate To Page UDID
    Select From List By Label    ${list_notBooked14Days}    ${reason}
    Take Screenshot
    
Enter Business Class Approver Name: ${approver_name}
    Navigate To Page UDID
    Enter Value    ${input_businessClassApprover}    ${approver_name}
    Take Screenshot
    
Fill Up Udid Fields For Client Philip Morris International
    Navigate To Page UDID
    Select From List By Label    ${list_offlineReasonCode}     Family travel (spouse, kids) paid by PMI
    Select From List By Label    ${list_noHotelBooked}    HOTEL BOOKED BY CONFERENCE ORGANIZER
    Take Screenshot
    
Fill Up Udid Fields For Client PostMedia
    Navigate To Page UDID
    Select From List By Label    ${list_airCanadaPassTracker}    Approval received from Judy Simpson
    Enter Value     ${input_uniqueTravelerId}    U013KXV
    Take Screenshot
    
Fill Up Udid Fields For Client Invenergy
    Navigate To Page UDID
    Select From List By Label    ${list_notBooked7Days}    Had to Wait for Dates to be Confirmed
    Select From List By Label    ${list_whyHotelNotBooked}    Reside in City or One Way
    Take Screenshot
    
Select Reason No Hotel Booked: ${reason}
    Navigate To Page UDID
    Select From List By Label     ${list_noHotelBooked}    ${reason}
    Take Screenshot
    
Fill Up UDID Fields For Dana
    Navigate To Page UDID
    Enter Value    ${input_guestSponsorName}    Shirleen Hong
    Select From List By Label    ${list_approverName}    DWAYNE MATTHEWS
    Take Screenshot
    
Select Value For Why Not Booked 21 Days In Advance: ${value}
    Navigate To Page UDID
    Select From List By Label    ${list_bookAdvanceReason}    ${value}
    Take Screenshot
    
Enter No Hotel Booked Value: ${value}
    Navigate To Page UDID
    Enter Value    ${input_noHotel}    ${value}
    Take Screenshot
    
Fill Up UDID Fields For Client Bacardi
    Navigate To Page UDID
    Select From List By Label    ${list_reasonAirBooked14Days}    Site Visit
    Select From List By Label    ${list_hotelNotBooked}    Hotel was booked
    Take Screenshot
    
Select Reason Why Not Booked Online: ${reason}
    Navigate To Page UDID
    Select From List By Label    ${list_reasonNotOnline}    ${reason}
    Take Screenshot
    
Fill Up UDID Fields For Ribbon Communications
    Navigate To Page UDID
    Select From List By Label    ${list_noHotel}    TB - Hotel to be advised
    Enter Value    ${input_travelerType}    Chuck Velasquez
    Take Screenshot
    
Fill Up UDID Fields With Default Values For Ontario Teachers
    Navigate To Page UDID
    Enter Value    ${input_btaApproval}    A0123
    Enter Value    ${input_udid_lowestGdsFare}    100.00
    Select From List By Label    ${list_passTracker}    PASS PURCHASE PNR - Approval received from Judy Simpson
    Take Screenshot

Select Advance Booking Reason: ${reason}
    Navigate To Page UDID
    Select From List By Label    ${list_bookingAdvance}     ${reason}
    Take Screenshot
    
Input Value In Approver Info: ${name}
    Navigate To Page UDID
    Enter Value    ${input_approverInfo}    ${name}
    Take Screenshot
    
Select No Hotel Booked Value: ${value}
    Navigate To Page UDID
    Select From List By Label    ${list_noHotel}    ${value}
    Take Screenshot
    
Enter Approver Name For International Travel: ${name}
    Navigate To Page UDID
    Enter Value    ${input_udid_approverName}    ${name}
    Take Screenshot

Select Advance Booking Value: ${value}
    Navigate To Page UDID
    Select From List By Label    ${list_advanceBooking}    ${value}
    Take Screenshot
    
Select Reason For Booking Within 14 Days: ${reason}
    Navigate To Page UDID
    Select From List By Label    ${list_booking_within_14d}    ${reason}
    Take Screenshot
    
Fill Up UDID Values For Client Arcelormittal
    Navigate To Page UDID
    Select From List By Label    ${list_authorizer}    SEAN DONNELLY
    Take Screenshot
    
Select Reason Why Booked Less Than 14 Days: ${reason}
    Navigate To Page UDID
    Select From List By Label   ${list_whyLessThanDays}    ${reason}
    Take Screenshot
    
Fill Up Udid Fields For Client Gilead
    Navigate To Page UDID
    Select From List By Label   ${list_noHotelReason}    Booked Own Hotel
    Enter Value    ${input_uniqueTravelerId}    TVL444
    Enter Value    ${input_exceptionApprover}     CHUCK VELASQUEZ
    Take Screenshot
    
Enter Unique Traveler ID: ${id}
    Navigate To Page UDID
    Enter Value    ${input_uniqueTravelerId}    ${id}
    Take Screenshot
    
Fill Up UDID Fields For Client Juniper
    Navigate To Page UDID
    Enter Value    ${input_businessClassApproval}    CHUCK VELASQUEZ
    Select From List By Label    ${list_noHotel}    One-way trip
    Take Screenshot
    
Enter Spend Authorization Number: ${auth_no}
    Navigate To Page UDID
    Enter Value    ${input_authorizationNo}    ${auth_no}
    Take Screenshot
    
Select Business Class Approver: ${approver}
    Navigate To Page UDID
    Select From List By Label    ${list_businessClassApprover}    ${approver}
    Take Screenshot
    
Fill Up UDID Fields For Client Purdue Pharma
    Navigate To Page UDID
    Select From List By Label    ${list_bookedLessFourteen}    Site Visit
    Enter Value   ${input_moxieId}    98765
    Take Screenshot
    
Fill Up UDID Fields For Client Senvion
    Navigate To Page UDID
    Enter Value    ${input_destinationUdid}    America
    Enter Value    ${input_approvelEmail}    mgr@email.com
    Select From List By Label    ${list_advanceDaysReason}    Initial travel request not apprvd by mgr on time
    Take Screenshot
    
Fill Up UDID Fields For Client Smith & Nephew
    Navigate To Page UDID
    Select From List By Label    ${list_noHotel}    C - Separate PNR with CWT
    Enter Value    ${input_authorizer}    CHUCK VELASQUEZ
    Take Screenshot
    
Fill Up UDID Fields For Client Steelcase
    Navigate To Page UDID
    Enter Value    ${input_btaReasonUsage}    CV
    Enter Value    ${input_employeeId}    123456789
    Take Screenshot
    
Fill Up UDID Fields For Client Sobeys
    Navigate To Page UDID
    Select From List By Label    ${list_reasonNotBooking}    Medical/Health/Physical
    Enter Value    ${input_lowGdsFare}    1000
    Select From List By Label    ${list_companyCode}    E999
    Take Screenshot

Fill Up UDID Fields For Client Thales Canada
    Navigate To Page UDID
    Run Keyword If    "${num_htl_segments}" == "0"    Select From List By Label    ${list_splitCharge}    SPLIT
    Run Keyword If    "${num_htl_segments}" != "0"    Enter Value    ${input_noHotelCodes}    AA
    Enter Value    ${input_whyBookedOnline}    A23
    Take Screenshot
    
Fill Up Udid Fields For Client UL
    Navigate To Page UDID
    Select From List By Label    ${list_ul_fareType}    REF-Refundable
    Enter Value    ${input_noHotel}    15JULSFOHEENN
    Enter Value    ${input_feeReason}    ACCEPTABLE REASON 1
    Take Screenshot
    
Select Approver Name: ${approver_name}
    Navigate To Page UDID
    Select From List By Label    ${list_approverName}    ${approver_name}
    Take Screenshot
    
Fill Up Udid Fields For Client University Travel Business
    Navigate To Page UDID
    Enter Value    ${input_noHotel}    15JULSFOHEENN
    Select From List By Label    ${list_reasonForNotBookingOL}    K INTERNATIONAL/COMPLEX BOOKING
    Take Screenshot
    
Fill Up Udid Fields For Client University Of Manitoba
    Navigate To Page UDID
    Enter Value    ${input_noHotel}    15JULSFOHEENN
    Select From List By Label    ${list_reasonForNotBookingOL}    C GROUP BOOKING
    Take Screenshot
    
Fill Up Udid Fields For Client Winners
    Navigate To Page UDID
    Select From List By Label    ${list_reasonWhyWestjet}    Frequent Traveller Points
    Select From List By Label    ${list_exchangeReason}    Travel Change
    Take Screenshot
    
Fill Up UDID Values For Client Parsons Corporation
    Navigate To Page UDID
    Select From List By Label    ${list_waiverApproved}    XX
    Take Screenshot
    
Fill Up UDID Values For Client Intercontinental Hotel
    Navigate To Page UDID
    Enter Value    ${input_declinedAirline}    UA
    Enter Value    ${input_preTripNumber}   AAA0123
    Take Screenshot
    
Update Agent Assisted And Touch Reason Codes
    Navigate To Page Reporting Remarks
    Update Agent Assisted And Touch Reason Code    AM    A
    Take Screenshot

Select ${number_of_destination} Destination Code And Routing Code For Reporting
    Navigate To Page Reporting Remarks
    Run Keyword If  "${number_of_destination}" == "Single"   Select Destination Code Values    ORD
    ...  ELSE IF   "${number_of_destination}" == "Multiple"    Select Destination Code Values   YUL   YYZ   ORD
    Set Test Variable    ${destination_selected}    yes
    Select From List By Label    ${list_routing_code}     USA incl. all US Territories and Possessions
    Set Test Variable    ${routing_code_selected}    yes
    Take Screenshot
    
Get Value Of Charge Fare For ${no_of_tst} TST
    Set Test Variable    ${i}    0
    :FOR    ${i}    IN RANGE    0    ${no_of_tst} 
    \    ${i}    Evaluate    ${i} + 1
    \    ${actual_charge_fare}    Get Value    ${div_fares}${open_bracket}${i}${close_bracket}${input_charge_fare}
    \    Set Test Variable    ${actual_charge_fare_${i}}    ${actual_charge_fare}
    
Verify That Car Savings Code Should Not Be Displayed In The UI
    Navigate to Page Reporting
    Wait Until Element Is Not Visible    ${tab_car_savings_code}    20
    Take Screenshot
    Close CA Corporate Test

Verify Hotel Savings Tab Is Displayed
    Navigate To Page Reporting Remarks
    Page Should Contain Element    ${tab_hotelSavingsCode}
    Take Screenshot
    
Verify Hotel Savings Tab Is Not Displayed
    Navigate To Page Reporting Remarks
    Page Should Not Contain Element    ${tab_hotelSavingsCode}
    Take Screenshot
    
Select No Hotel Booked Reason Code 
    [Arguments]    @{no_hotel_reason_codes}
    Set Test Variable    ${i}    0
    :FOR    ${no_hotel_reason_codes}    IN    @{no_hotel_reason_codes}
    \    ${i}    Evaluate    ${i} + 1
    \    Select From List By Label    ${form_segments}${open_bracket}${i}${close_bracket}${select_hotelReasonCode}    ${no_hotel_reason_codes} 

Enter Number Of Days
    [Arguments]    @{number_of_days}
    Set Test Variable    ${i}    0
    :FOR    ${number_of_days}    IN    @{number_of_days}
    \    ${i}    Evaluate    ${i} + 1
    \    Enter Value    ${form_segments}${open_bracket}${i}${close_bracket}${input_NumberOfDays}    ${number_of_days}

Verify No Hotel Booked Displayed Is ${number_of_no_hotel_reason}
    ${number_of_no_hotel_reason}    Convert To Integer    ${number_of_no_hotel_reason}    
    ${no_hotel_reason_count}    Get Element Count    ${select_hotelReasonCode}
    Should Be Equal    ${no_hotel_reason_count}    ${number_of_no_hotel_reason}    

Verify ${number_of_no_hotel_reason} No Hotel Booked Fields And Populate With Valid Values
    Set Test Variable    ${number_of_no_hotel_reason}
    Navigate To Page No Hotel Booked 
    Verify No Hotel Booked Displayed Is ${number_of_no_hotel_reason}  
    Run Keyword If    "${number_of_no_hotel_reason}" == "1"    Select No Hotel Booked Reason Code    CH : Booked by Client      
    ...    ELSE IF    "${number_of_no_hotel_reason}" == "2"    Select No Hotel Booked Reason Code    H7 : Resides in city or one way    TB : Hotel to be advised 
    Run Keyword If    "${number_of_no_hotel_reason}" == "1"    Enter Number Of Days    03
    ...    ELSE IF    "${number_of_no_hotel_reason}" == "2"    Enter Number Of Days    03    04
    Take Screenshot
 
Verify No Hotel Booked UDIDs Are Written In the PNR
    Finish PNR
    Run Keyword If    "${number_of_no_hotel_reason}" == "2"     Verify Specific Remark Is Written In The PNR    RM *U21/-${test_date_1}ORDHH703/${test_date_2}YULHTB04    ELSE    Verify Specific Remark Is Written In The PNR    RM *U21/-${test_date_1}ORDHCH03
    
Verify No Hotel Booked UDIDs Are Written In the PNR With Car
    Finish PNR
    Verify Specific Remark Is Written In The PNR    RM *U21/-${car_drop_day_1}ORDHCH03
    

