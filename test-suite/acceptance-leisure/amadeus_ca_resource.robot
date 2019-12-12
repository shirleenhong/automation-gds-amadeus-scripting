*** Settings ***
Resource          ../resources/common/global_resources.robot

*** Keywords ***
Verify Specific Remark Is Written In The PNR
    [Arguments]    ${expected_remark}    ${multi_line_remark}=False
    Wait Until Page Contains Element    xpath=//div[@class='crypticPanel'][contains(@id,'epnrRetrieves')]    30
    ${pnr_details}    Get Text    xpath=//div[@class='crypticPanel'][contains(@id,'epnrRetrieves')]
    Log    ${pnr_details}
    Run Keyword And Continue On Failure    Run Keyword If    "${multi_line_remark}" == "True"    Remove Line Break And Spaces    ${pnr_details}    ${expected_remark}
    Run Keyword And Continue On Failure    Should Contain    ${pnr_details}    ${expected_remark}
    Log    Expected: ${expected_remark}
    Log    Actual: ${pnr_details}

Remove Line Break And Spaces
    [Arguments]    ${pnr_details}    ${expected_remark}
    ${pnr_details}    Replace String    ${pnr_details}    ${SPACE}    ${EMPTY}
    ${pnr_details_flattened}    Replace String    ${pnr_details}    \n    ${EMPTY}
    Set Test Variable    ${pnr_details}    ${pnr_details_flattened}
    ${expected_remark}    Replace String    ${expected_remark}    ${SPACE}    ${EMPTY}
    ${expected_remark_flattened}    Replace String    ${expected_remark}    \n    ${EMPTY}
    Set Test Variable    ${expected_remark}    ${expected_remark_flattened}

Verify Specific Remark Is Not Written In The PNR
    [Arguments]    ${expected_remark}    ${multi_line_remark}=False
    ${pnr_details}    Get Text    xpath=//div[@class='crypticPanel'][contains(@id,'epnrRetrieves')]
    Log    ${pnr_details}
    Run Keyword And Continue On Failure    Run Keyword If    "${multi_line_remark}" == "True"    Remove Line Break And Spaces    ${pnr_details}    ${expected_remark}
    Run Keyword And Continue On Failure    Should Not Contain    ${pnr_details}    ${expected_remark}
    Log    Expected: ${expected_remark}
    Log    Expected: ${pnr_details}

Verify Specific Remark Is Only Written Once
    [Arguments]    ${expected_remark}
    ${pnr_details}    Get Text    xpath=//div[@class='crypticPanel'][contains(@id,'epnrRetrieves')]
    Log    ${pnr_details}
    Run Keyword And Continue On Failure    Should Contain X Times    ${pnr_details}    ${expected_remark}    1    ${expected_remark} is found multiple times

Create Matrix Receipt
    [Arguments]    ${mode_of_payment}    ${bank_account}    ${passenger_name}    ${description}    ${amount}    ${gc_number}=${EMPTY}
    ...    ${credit_card_number}=${EMPTY}    ${exp_date}=${EMPTY}
    Select Bank Account    ${bank_account}
    Select Passenger Name    ${passenger_name}
    Enter Description    ${description}
    Enter Amount    ${amount}
    Enter GC Number    ${gc_number}
    Run Keyword And Continue On Failure    Run Keyword If    "${mode_of_payment}" == "Cash" or "${mode_of_payment}" == "Cheque"    Select Mode Of Payment    ${mode_of_payment}
    Run Keyword And Continue On Failure    Run Keyword If    "${mode_of_payment}" == "Credit Card"    Enter Credit Card Number    ${credit_card_number}
    Run Keyword And Continue On Failure    Run Keyword If    "${mode_of_payment}" == "Credit Card"    Enter Credit Card Expiration Date    ${exp_date}
    Click Element    css=#amount
    Click Save Button

Create Matrix Receipt For RBC Redemption
    [Arguments]    ${bank_account}    ${passenger_name}    ${amount}    ${rbc_points}    ${cwt_reference}    ${last_four_vi}
    Select Bank Account    ${bank_account}
    Select Passenger Name    ${passenger_name}
    Enter Amount    ${amount}
    Enter RBC Points    ${rbc_points}
    Enter CWT Reference    ${cwt_reference}
    Enter Last Four Digit VI    ${last_four_vi}
    Click Element    css=#amount
    Click Save Button

Create Matrix Accounting Remark
    [Arguments]    ${is_apay_true}    ${accounting_remark_type}    ${supplier_code}    ${supplier_confirmation_number}    ${form_of_payment}    ${cc_vendor_code}=${EMPTY}
    ...    ${credit_card_number}=${EMPTY}    ${exp_date}=${EMPTY}    ${remark_description}=${EMPTY}
    Select Accounting Remark Type    ${accounting_remark_type}
    Run Keyword If    "${is_apay_true}" == "YES"    Enter Matrix Accounting Description    ${remark_description}
    Run Keyword If    "${is_apay_true}" == "NO"    Enter Supplier Code    ${supplier_code}
    Run Keyword If    "${is_apay_true}" == "YES" and "${supplier_code}" == "AD1"    Enter Supplier Code    ${supplier_code}
    Set Suite Variable    ${supplier_code}
    Enter Supplier Confirmation Number    ${supplier_confirmation_number}
    Select Matrix Form Of Payment    ${form_of_payment}
    Run Keyword If    "${form_of_payment}" == "Credit Card" or "${form_of_payment}" == "Agency Plastic"    Select Credit Card Vendor Code    ${cc_vendor_code}
    Run Keyword If    "${form_of_payment}" == "Credit Card" or "${form_of_payment}" == "Agency Plastic"    Enter Credit Card Number    ${credit_card_number}
    Run Keyword If    "${form_of_payment}" == "Credit Card" or "${form_of_payment}" == "Agency Plastic"    Enter Credit Card Expiration Date    ${exp_date}
    [Teardown]    Take Screenshot

Verify Royal Bank Concierge UDID Remarks Are Written
    [Arguments]    ${redemption}=${EMPTY}    ${reservation}=${EMPTY}    ${booking_type}=${EMPTY}    ${is_hotel_name_blank}=False    ${is_caller_name_blank}=False
    Run Keyword If    "${redemption}" == "Within"    Verify Specific Remark Is Written In The PNR    RM *U3/-WITHIN 48HRS OF BKNG
    ...    ELSE    Verify Specific Remark Is Written In The PNR    RM *U4/-OUTSIDE 48HRS OF BKNG
    Run Keyword If    "${reservation}" == "Email"    Verify Specific Remark Is Written In The PNR    RM *U6/-EMAIL REQUEST
    ...    ELSE    Verify Specific Remark Is Written In The PNR    RM *U5/-PHONE REQUEST
    Run Keyword If    "${booking_type}" == "Cruise"    Verify Specific Remark Is Written In The PNR    RM *U10/-CRUISE/TOUR/FIT
    ...    ELSE    Verify Specific Remark Is Written In The PNR    RM *U8/-AIR ONLY BOOKING
    Run Keyword If    "${is_caller_name_blank}" == "True"    Verify Specific Remark Is Written In The PNR    RM *U11/-${caller_name.upper()}
    Verify Specific Remark Is Written In The PNR    RM *U12/-${delegate_caller_name.upper()}
    Run Keyword If    "${is_hotel_name_blank}" == "True"    Verify Specific Remark Is Written In The PNR    RM *U13/-NO HTL BKD
    ...    ELSE    Verify Specific Remark Is Written In The PNR    RM *U13/-HOLIDAY INN AMSTERDAM
    Verify Specific Remark Is Written In The PNR    RM *U15/-${is_business_reserved}
    Verify Specific Remark Is Written In The PNR    RM *U17/-${is_hotel_booked}
    Run Keyword If    "${is_hotel_booked}" == "NO"    Verify Specific Remark Is Written In The PNR    RM *U18/-${reason_hotel_booked.upper()}
    Verify Specific Remark Is Written In The PNR    RM *U30/-TGIF

Verify Package Costs UDID Remarks Are Written In the PNR
    [Arguments]    ${balance_due_date}    ${balance_due_amt}
    Verify Specific Remark Is Written In The PNR    RM *U43/-${balance_due_date}
    Verify Specific Remark Is Written In The PNR    RM *U42/-${tour_commission_amount}
    Verify Specific Remark Is Written In The PNR    RM *U41/-${balance_due_amt}

Verify Rail RIR Remarks For VIR Supplier Are Written In the PNR
    [Arguments]    ${segment_number}    ${language}
    Run Keyword If    "${language}" == "EN"    Verify Specific Remark Is Written In The PNR    RIR FOR VIA RAIL TRAVEL PLEASE CHECK IN AT TRAIN STATION/S${segment_number}
    Run Keyword If    "${language}" == "EN"    Verify Specific Remark Is Written In The PNR    RIR AT LEAST 45 MINUTES PRIOR TO DEPARTURE./S${segment_number}
    Run Keyword If    "${language}" == "EN"    Verify Specific Remark Is Written In The PNR    RIR VIA RAIL POLICY-NONSMOKING ENVIRONMENT ON ALL TRAINS./S${segment_number}
    Run Keyword If    "${language}" == "EN"    Verify Specific Remark Is Written In The PNR    RIR VIA COUPONS ARE NOT VALID FOR AIR TRAVEL./S${segment_number}
    Run Keyword If    "${language}" == "EN"    Verify Specific Remark Is Written In The PNR    RIR IF CHANGES ARE MADE ENROUTE PLEASE ENSURE YOUR/S${segment_number}
    Run Keyword If    "${language}" == "EN"    Verify Specific Remark Is Written In The PNR    RIR TICKET IS ENDORSED BY VIA 1 TICKET LOUNGE./S${segment_number}
    Run Keyword If    "${language}" == "EN"    Verify Specific Remark Is Written In The PNR    RIR PLEASE CALL VIA RAIL AT 1-888-842-7245/S${segment_number}    True
    Run Keyword If    "${language}" == "EN"    Verify Specific Remark Is Written In The PNR    RIR TO RECONFIRM YOUR/S${segment_number}
    Run Keyword If    "${language}" == "EN"    Verify Specific Remark Is Written In The PNR    RIR TRAIN DEPARTURE/ARRIVAL TIMES./S${segment_number}
    #french
    Run Keyword If    "${language}" == "FR"    Verify Specific Remark Is Written In The PNR    RIR POUR LES DEPLACEMENTS A BORD DE VIA RAIL VEUILLEZ VOUS/S${segment_number}    True
    Run Keyword If    "${language}" == "FR"    Verify Specific Remark Is Written In The PNR    RIR PRESENTER A LA GARE AU MOINS 45 MINUTES AVANT L HEURE PREVUE DE/S${segment_number}    True
    Run Keyword If    "${language}" == "FR"    Verify Specific Remark Is Written In The PNR    RIR VOTRE DEPART SUIVANT LA POLITIQUE DE VIA RAIL-TOUS LES/S${segment_number}    True
    Run Keyword If    "${language}" == "FR"    Verify Specific Remark Is Written In The PNR    RIR TRAINS SONT NON FUMEUR. LES COUPONS VIA RAIL NE PEUVENT ETRE/S${segment_number}    True
    Run Keyword If    "${language}" == "FR"    Verify Specific Remark Is Written In The PNR    RIR UTILISES POUR DES DEPLACEMENTS AERIENS. SI VOUS DEVEZ MODIFIER/S${segment_number}    True
    Run Keyword If    "${language}" == "FR"    Verify Specific Remark Is Written In The PNR    RIR VOTRE ITINERAIRE EN COURS DE ROUTE ASSUREZ-VOUS QUE VOTRE/S${segment_number}    True
    Run Keyword If    "${language}" == "FR"    Verify Specific Remark Is Written In The PNR    RIR BILLET EST ENDOSSE PAR LA BILLETTERIE VIA 1./S${segment_number}
    Run Keyword If    "${language}" == "FR"    Verify Specific Remark Is Written In The PNR    RIR VEUILLEZ COMMUNIQUER AVEC VIA RAIL AU 1-888-842-7245 POUR/S${segment_number}    True
    Run Keyword If    "${language}" == "FR"    Verify Specific Remark Is Written In The PNR    RIR RECONFIRMER LES HEURES DE DEPART/D ARRIVEE DE VOTRE TRAIN./S${segment_number}    True

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

Populate Visa And Passport Required Fields
    Click Panel    Remarks
    Click Remarks Tab    Visa and Passport
    Select International Travel
    Enter Passport Name    Passport Name

Populate Reporting Required Fields
    Populate Routing And Destination Fields
    Populate RBC Conceirge Required Fields

Populate Routing And Destination Fields
    Click Panel    Reporting
    Select Routing Code    Europe-incl. Morocco/Tunisia/Algeria/Greenland
    Enter Destination Code    CDG

Populate RBC Conceirge Required Fields
    Click Reporting Tab    Royal Bank - Concierge
    Select Reservation Request    Reservation was generated via Phone Request
    Select Booking Type    Air Only Booking
    Enter Hotel Name    Hotel Name for Leisure
    Select Reservation For Business Travel    YES
    Select Hotel Reservation Booked    YES
    Click Panel    Reporting

Get Hotel Details Values
    ${hotel_city}    Get Element Attribute    xpath=//input[@id='hotelCityName']    ng-reflect-model
    ${hotel_name}    Get Element Attribute    xpath=//input[@id='hotelName']    ng-reflect-model
    ${hotel_phone}    Get Element Attribute    xpath=//input[@id='phone']    ng-reflect-model
    ${hotel_fax}    Get Element Attribute    xpath=//input[@id='fax']    ng-reflect-model
    ${hotel_address}    Get Element Attribute    xpath=//input[@id='address']    ng-reflect-model
    ${hotel_country}    Get Element Attribute    xpath=//input[@id='country']    ng-reflect-model
    ${hotel_zip_code}    Get Element Attribute    xpath=//input[@id='zipCode']    ng-reflect-model
    Press Key    css=#zipCode    \\09
    Set Test Variable    ${hotel_city}
    Set Test Variable    ${hotel_name}
    Set Test Variable    ${hotel_phone}
    Set Test Variable    ${hotel_fax}
    Set Test Variable    ${hotel_address}
    Set Test Variable    ${hotel_country}
    Set Test Variable    ${hotel_zip_code}
    [Teardown]    Take Screenshot

Verify Pop-Up Warning Is Displayed
    Page Should Contain Element    xpath=//div[contains(text(),'Warning')]
    Take Screenshot
    Set Focus To Element    xpath=//div[@class='modal-footer']//button[contains(text(),'Close')]
    Click Button    xpath=//div[@class='modal-footer']//button[contains(text(),'Close')]
    Wait Until Element Is Visible    xpath=//button[contains(text(), 'SUBMIT TO PNR')]    30
    Set Focus To Element    xpath=//button[contains(text(), 'SUBMIT TO PNR')]
    Sleep    2

Add CC As Form Of Payment
    [Arguments]   ${cc_vendor_code}    ${credit_card_number}   ${exp_date}
    Select Matrix Form Of Payment    Credit Card
    Select Credit Card Vendor Code    ${cc_vendor_code}
    Enter Credit Card Number    ${credit_card_number}
    Enter Credit Card Expiration Date    ${exp_date}