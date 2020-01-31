*** Settings ***
Force Tags        leisure
Resource          ../../resources/common/global_resources.robot

*** Test Cases ***
Verify That Passive Segments, Accounting remarks, UDIDs, And ITC Remarks Are Written In The PNR
    [Documentation]    Multiple Air, Tour, Hotel
    ...    Matrix Accounting
    ...    Leisure Fee
    ...    Reporting BSP
    ...    Conceirge
    ...    ITC
    ...    Visa and Passport
    ...    Codeshare
    [Tags]    sanity
    Login To Amadeus Sell Connect
    Enter GDS Command    NM1Leisure/Amadeus Mr    RM*CF/-RBM000000N    APE-Test@email.com    RU1AHK1SIN21SEP-CWT RETENTION SEGMENT    RMP/CITIZENSHIP-CA
    Open CA Migration Window
    Click Add Segment Main Menu
    Add Passive Air Segment
    Add Passive Tour Segment
    Add Passive Hotel Segment
    Click Add Segments To PNR
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Air, Tour, And Hotel Passive Segments Are Added In the PNR
    Verify That Hotel RIR Remarks Are Written
    Close Cryptic Display Window
    Open CA Migration Window
    Click Wrap PNR
    Click Panel    Payment
    Click Payment Tab    Matrix Accounting Remark
    Add Matrix Accounting
    Click Payment Tab    Leisure Fee
    Add Leisure Fee Collection
    Sleep    3
    Click Panel    Remarks
    Click Remarks Tab    Visa and Passport
    Select International Travel
    Enter Passport Name    Passport Name
    Click Panel    Reporting
    Select Routing Code    Europe-incl. Morocco/Tunisia/Algeria/Greenland
    Enter Destination Code    CDG
    Click Reporting Tab    Royal Bank - Concierge
    Select Redemption Added    WITHIN 48 Hours of Original Booking
    Select Reservation Request    Reservation was generated via EMAIL
    Select Booking Type    Cruise/Tour/FIT
    Enter Caller Name    Leisure Callername
    Enter Delegate Caller Name    Leisure Delegatename
    Enter Hotel Name    HOLIDAY INN AMSTERDAM
    Select Reservation For Business Travel    YES
    Select Hotel Reservation Booked    YES
    Click Remarks Tab    Codeshare
    Select Segment From The List    1    3
    Enter Check-in At Details    1    Codeshare Testing
    Click Remarks Tab    Packages
    Add ITC Package Costs
    Click Submit To PNR
    Comment    Sleep    5
    Close CA Migration Window
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    RM *MAC/-SUP-${supplier_code}/-LK-MAC1/-AMT-${base_amount}/-PT-${hst_tax}RC/-PT-${gst_tax}XG/-PT-${qst_tax}XQ/-PT-${other_tax}XT/-CD-${commission_with_tax}    True
    Verify Specific Remark Is Written In The PNR    RM *MAC/-LK-MAC1/-FOP-CCVI4444333322221111/-EXP-0323/-MP-ALL/-BKN-${supplier_confirmation_number}/S3    True
    Verify Leisure Fee Remarks Are Written
    Verify ITC Package Costs Remarks Are Written
    Verify Specific Remark Is Written In The PNR    RIR CHECK-IN AT ${checkin_at.upper()} TICKET COUNTER/S2
    Verify Specific Remark Is Written In The PNR    RM *DE/-CDG
    Verify Specific Remark Is Written In The PNR    FS 42
    Verify Specific Remark Is Written In The PNR    RM INTERNATIONAL TRAVEL ADVISORY SENT
    Verify Specific Remark Is Written In The PNR    RM ADVISED PASSPORT NAME VALID PASSPORT IS REQUIRED
    Verify Specific Remark Is Written In The PNR    RIR FRANCE - A VALID PASSPORT IS REQUIRED/S2
    Verify Royal Bank Concierge UDID Remarks Are Written    Within    Email    Cruise    \    True
    Close Cryptic Display Window

Verify That Accounting Remarks, UDIDs, And ITC Remarks Can Be Updated In the PNR
    [Documentation]    Insurance
    ...    Update Leisure Fee
    ...    Codeshare
    ...    Fare Rule
    ...    RBC Points Redemption
    ...    RBC Conceirge
    ...    CWT Itinerary
    [Tags]    sanity
    Open CA Migration Window
    Click Wrap PNR
    Click Panel    Payment
    Click Add Matrix Receipt Button
    Create Matrix Receipt    Cash    CAD Funds    LEISURE-AMADEUS    THIS IS A MAX OF 30 CHARACTERS    500.50
    Sleep    3
    Click Payment Tab    Matrix Accounting Remark
    Click Add Accounting Line Button
    Select Accounting Remark Type    Insurance Remark
    Select Segment    3
    Enter Supplier Confirmation Number    112233
    Select Matrix Form Of Payment    Credit Card
    Select Credit Card Vendor Code    Visa
    Enter Credit Card Number    4444333322221111
    Enter Credit Card Expiration Date    0921
    Enter Base Amount    123.00
    Enter GST Tax Amount    5.00
    Enter HST Tax Amount    4.00
    Enter QST Tax Amount    3.00
    Enter Commission Percentage    10.00
    Click Save Button
    Sleep    3
    Click Submit To PNR
    Sleep    5
    Click Itinerary And Queue
    Enter Email Address    1    testingemail@cwt.com
    Select Itinerary Language    English
    Select Itinerary Type Of Transaction    Invoice
    Enter Service Remark    1    Testing Service Remark
    Enter Tickets Remark    1    Testing Tickets Remark
    Click Send Itinerary And Queue
    Close CA Migration Window
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    RM *REC/-RLN-1/-RF-${passenger_name}/-AMT-${amount}
    Verify Specific Remark Is Written In The PNR    RM *REC/-RLN-1/-FOP-CA/-LK-T/-BA-101000/-GL-124000
    Verify Specific Remark Is Written In The PNR    RM *REC/-RLN-1/-RM-${description}
    Verify Specific Remark Is Written In The PNR    RM *MAC/-SUP-AN7/-LK-MAC1/-AMT-100.75/-PT-1.00RC/-PT-2.00XG/-PT-3.00XQ/-PT-4.00XT/-CD-12.00    True
    Verify Specific Remark Is Written In The PNR    RM *MAC/-LK-MAC1/-FOP-CCVI4444333322221111/-EXP-0323/-MP-ALL/-BKN-ABC4567891EFG4567890/S3    True
    Verify Specific Remark Is Written In The PNR    RM *MAC/-SUP-MLF/-LK-MAC2/-AMT-123.00/-PT-4.00RC/-PT-5.00XG/-PT-3.00XQ/-CP-10.00    True
    Verify Specific Remark Is Written In The PNR    RM *MAC/-LK-MAC2/-FOP-CCVI4444333322221111/-EXP-0921/-MP-ALL/-BKN-CWT112233/S3    True
    Verify Leisure Fee Remarks Are Written
    Verify ITC Package Costs Remarks Are Written
    Verify Specific Remark Is Written In The PNR    RIR CHECK-IN AT CODESHARE TESTING TICKET COUNTER/S2
    Verify Specific Remark Is Written In The PNR    RM *DE/-CDG
    Verify Specific Remark Is Written In The PNR    FS 42
    Close Cryptic Display Window

Verify That Passive Segments Can Be Cancelled
    [Documentation]    Cancel All segments
    [Tags]    sanity
    Open CA Migration Window
    Click Cancel Segment
    Enter Requestor Name    FirstName LastName
    Enter Cancel Notes    1    Cancel Segment
    Select Cancel All Segments
    Select Reason For Cancel    IRROP: WILL REFUND PROCESS DUE IRROP
    Enter AC Flight Number    12345
    Enter Ticket Number For Refund    1    532523
    Enter Coupon Number For Refund    1    7654321
    Click Cancel Segments Button
    Close CA Migration Window
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    /CANCEL REQUESTED BY FIRSTNAME LASTNAME
    Verify Specific Remark Is Written In The PNR    /CANCEL SEGMENT
    Verify Specific Remark Is Written In The PNR    /HTL SEGMENT INCLUDED IN CANCEL
    Verify Specific Remark Is Written In The PNR    /CANCELLED/CXLD SEG-ALL
    Verify Specific Remark Is Written In The PNR    /TKT NBR-532523 CPNS-7654321
    Verify Specific Remark Is Written In The PNR    RMX AC REFUND WAIVER CODE - ACFLTIRROP12345
    Verify Specific Remark Is Written In The PNR    RIR *FULLCXL**
    Close Cryptic Display Window
    Logout To Amadeus Sell Connect
    [Teardown]    Close Browser

Verify That Passive Segments, Insurance Accounting remarks, Air Canada Passs, And RIR Remarks Are Written In The PNR
    [Documentation]    Multiple Air, Insurance, Car
    ...    Matrix Accounting: Insurance, Air Canada Pass Redemption
    ...    Leisure Fee
    ...    Reporting BSP
    ...    Insurance reporting remark
    ...    Tour Package
    ...    Visa and Passport
    ...    CWT Itinerary
    [Tags]    sanity    prod    not_ready
    Login to Amadeus Production
    Enter GDS Command    NM1Leisure/Amadeus Mr    RM*CF/-CVC000000N    APE-Test@email.com    RU1AHK1SIN1OCT-CWT RETENTION SEGMENT    RMZ/LANGUAGE-EN-US    RMP/CITIZENSHIP-CA
    Open CA Migration Prod
    Click Add Segment Main Menu
    Sleep    5
    Add Passive Air Segment
    Add Passive Insurance Segment
    Add Passive Car Segment
    Click Add Segments To PNR
    Close CA Migration Prod
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Air, Insurance, And Car Passive Segments Are Added In the PNR
    Close Cryptic Display Window
    Open CA Migration Prod
    Click Wrap PNR
    Click Panel    Payment
    Click Payment Tab    Matrix Accounting Remark
    Add Insurance Accounting Remark
    Add Air Canada Pass Redemption Remarks
    Add Insurance Reporting Remarks
    Click Panel    Remarks
    Click Remarks Tab    Visa and Passport
    Select International Travel
    Enter Passport Name    Passport Name
    Click Remarks Tab    Packages
    Add Tour Package Costs
    Click Submit To PNR
    Sleep    10
    Click Itinerary And Queue
    Enter Email Address    1    testingemail@cwt.com
    Select Itinerary Language    French
    Select Itinerary Type Of Transaction    Invoice
    Enter Service Remark    1    Testing Service Remark
    Enter Tickets Remark    1    Testing Tickets Remark
    Click Send Itinerary And Queue
    Sleep    3
    Close CA Migration Prod
    Open Cryptic Display Window
    Verify Insurance Reporting Remarks Are Added In The PNR
    Verify Tour Package Remarks Are Added In The PNR
    Verify Specific Remark Is Written In The PNR    RM *MAC/-SUP-MLF/-LK-MAC1/-AMT-123.00/-PT-4.00RC/-PT-5.00XG/-PT-3.00XQ/-CP-10.00    True
    Verify Specific Remark Is Written In The PNR    RM *MAC/-LK-MAC1/-FOP-CCVI4444333322221111/-EXP-0921/-MP-ALL/-BKN-CWT112233/S3    True
    Verify Specific Remark Is Written In The PNR    RM *U11/-NOT APPLICABLE
    Verify Specific Remark Is Written In The PNR    RM *MAC/-SUP-ACJ/-LK-MAC2/-AMT-${base_amount}/-PT-${hst_tax}RC/-PT-${gst_tax}XG/-PT-${qst_tax}XQ/-CD-0.00    True
    Verify Specific Remark Is Written In The PNR    RM *MAC/-LK-MAC2/-FOP-CCVI4444333322221111/-EXP-0921/-TK-${ticket_number}/-MP-ALL/-BKN-${supplier_confirmation_number}/S2    True
    Verify Specific Remark Is Written In The PNR    RIR WESTERN COMMUTER PASS REDEMPTION-LATITUDE FARE/S2
    Verify Specific Remark Is Written In The PNR    RM *U14/-ACPASS-INDIVIDUAL
    Verify Specific Remark Is Only Written Once    RMQ EMAIL ADD-NO
    Verify Specific Remark Is Only Written Once    RMZ CONF*LANG:FR
    Verify Specific Remark Is Written In The PNR    RMZ CONF*SEND TO MAIL TESTINGEMAIL@CWT.COM
    Verify Specific Remark Is Written In The PNR    RIR *SERVICE**TESTING SERVICE REMARK*
    Verify Specific Remark Is Written In The PNR    RIR *TICKET**TESTING TICKETS REMARK*
    Verify Specific Remark Is Written In The PNR    RMT TKT-INTL
    Close Cryptic Display Window

Verify RMX Cancel Remarks Are Written In The PNR
    [Documentation]    Cancel All segments
    [Tags]    sanity    prod    not_ready
    Open CA Migration Prod
    Click Cancel Segment
    Enter Requestor Name    FirstName LastName
    Enter Cancel Notes    1    Cancel Segment
    Select Cancel All Segments
    Select Reason For Cancel    NAME CORRECTION NCC WITH OAL
    Enter AC Ticket Number    1234512
    Select Passenger Name For Cancel    LEISURE-AMADEUS MR
    Enter Coupon Number For Refund    1    9825252
    Click Cancel Segments Button
    Close CA Migration Prod
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    /CANCEL REQUESTED BY FIRSTNAME LASTNAME
    Verify Specific Remark Is Written In The PNR    /CANCEL SEGMENT
    Verify Specific Remark Is Written In The PNR    /NO HTL SEGMENT INCLUDED IN CANCEL
    Verify Specific Remark Is Written In The PNR    /CANCELLED/CXLD SEG-ALL
    Verify Specific Remark Is Written In The PNR    /TKT NBR-1234512 CPNS-9825252
    Verify Specific Remark Is Written In The PNR    RIR *FULLCXL**
    Verify Specific Remark Is Not Written In The PNR    AC1234 Y 02OCT 5 YULCDG GK1 \ 1530 1715 \ 03OCT \ \ \ \ ARL1234
    Verify Specific Remark Is Not Written In The PNR    MIS 1A HK1 YYZ 03OCT-/TYP-INS/SUN-MANULIFE INSURANCE/SUC-MLF/SC-YYZ/SD-03OCT/ST-0900/EC-YYZ/ED-13OCT/ET-0900/CF-CWT123456789    True
    Verify Specific Remark Is Not Written In The PNR    CAR 1A HK1 YYZ 13OCT-13OCT CFAR/BS-67843263/SUC-AL/SUN-ALAMO/SD-13OCT/ST-0100/ED-13OCT/ET-1400/TTL-123.50CAD/DUR-DAILY/MI-200FKM FREE/URA-210.75CAD/CF-CONF1234    True
    Verify Specific Remark Is Not Written In The PNR    RIR SPECIAL REQUEST TESTING/S5
    Verify Specific Remark Is Not Written In The PNR    RIR HCL-HAND CONTROLS ON LEFT/S5
    Verify Specific Remark Is Not Written In The PNR    RIR CD-CD123456 ID-ID789123/S5
    Verify Specific Remark Is Not Written In The PNR    RIR AIRLINE FF-AC987654321/S5
    Verify Specific Remark Is Not Written In The PNR    RIR DROP OFF-161 BAY ST UNITE C80 M5J2S1 TORONTO/S5
    Verify Specific Remark Is Not Written In The PNR    RIR DROP FEE-212.00/S5
    Close Cryptic Display Window
    Logout To Amadeus Sell Connect
    [Teardown]    Close Browser

*** Keywords ***
Add Passive Air Segment
    Click Add Segment Button
    Select Segment Type    Air
    Enter Airline Code    AC
    Enter Flight Number    1234
    Enter Class Of Service    Y
    Enter Departure Date    10022020
    Enter Arrival Date    10032020
    Enter Departure City    YUL
    Enter Destination City    CDG
    Enter Departure Time    0330PM
    Enter Arrival Time    0515PM
    Enter Airline Record Locator    ARL1234
    Click Add Passive Save Button
    Sleep    2

Add Passive Tour Segment
    Click Add Segment Button
    Select Segment Type    Tour
    Enter Vendor Name    TEST VENDOR
    Enter Vendor Code    ABC
    Enter Confirmation Number    CN12345678
    Enter Departure Date    10142020
    Enter Arrival Date    10202020
    Enter Departure City    CDG
    Enter Destination City    AMS
    Enter Departure Time    0100PM
    Enter Arrival Time    1200PM
    Enter Segment Name    TOUR NAME TEST
    Enter Number Of Nights    8
    Select Room Type    TRPL
    Select Meal Plan    All Inclusive
    Click Add Passive Save Button
    Sleep    2

Add Passive Hotel Segment
    Click Add Segment Button
    Select Segment Type    Hotel
    Enter Hotel Chain Code    HI
    Enter Hotel City Code    AMS
    Enter Departure Date    10202020
    Enter Arrival Date    10222020
    Enter Policy Number    12hrs
    Enter Hotel Nightly Rate    100.55
    Enter Hotel Rate Type    Test Rate type
    Select Room Type    Twin Room
    Enter Confirmation Number    cf12312414
    Enter Additional Info    hotel additional info
    Enter Room Confirmed With    Hotel Testing
    Select Hotel    1
    Press Key    css=#hotelCityName    \\09
    Get Hotel Details Values
    Click Add Passive Save Button
    Sleep    2

Add Passive Insurance Segment
    Click Add Segment Main Menu
    Select Segment Type    Insurance
    Enter Departure Date    10032020
    Enter Arrival Date    10132020
    Enter Departure City    YYZ
    Enter Policy Number    123456789
    Enter Type Of Insurance Purchased    Testing Insurance Purchased
    Click Add Passive Save Button
    Sleep    2

Add Passive Car Segment
    Click Add Segment Button
    Select Segment Type    Car
    Enter Departure City    yyz
    Enter Destination City    ytz
    Enter Vendor Code    AL
    Enter Confirmation Number    conf1234
    Select Car Type    CFAR - CHEVROLET TRAX OR SIMILAR
    Select Pickup Location    AIRPORT
    Select Drop Off Location    OFF AIRPORT
    Select Drop Off Address    YTOC74 - 161 BAY ST UNITE C80 M5J2S1 TORONTO
    Enter Departure Date    10132020
    Enter Departure Time    0100AM
    Enter Arrival Time    0200PM
    Enter Rental Cost    123.50
    Enter Rate Booked    210.75
    Enter Mileage    200F
    Enter Drop off Fee    212
    Enter Car CD Number    CD123456
    Enter Car ID Number    ID789123
    Enter Frequent Flyer Airline Code    AC
    Enter Frequent Flyer Number    987654321
    Select Special Equipment    HCL-Hand Controls on left
    Enter Special Request    Special Request Testing
    Click Add Passive Save Button

Add Insurance Accounting Remark
    Click Add Accounting Line Button
    Select Accounting Remark Type    Insurance Remark
    Sleep    20
    Select Segment    4
    Enter Supplier Confirmation Number    112233
    Select Matrix Form Of Payment    Credit Card
    Select Credit Card Vendor Code    Visa
    Enter Credit Card Number    4444333322221111
    Enter Credit Card Expiration Date    0921
    Enter Base Amount    123.00
    Enter GST Tax Amount    5.00
    Enter HST Tax Amount    4.00
    Enter QST Tax Amount    3.00
    Enter Commission Percentage    10.00
    Click Save Button

Add Insurance Reporting Remarks
    Click Payment Tab    Leisure Fee
    Enter Reason for No Association Fees    Not applicable
    Click Panel    Reporting
    Select Routing Code    Asia incl. India
    Enter Destination Code    YUL
    Enter Company Name    Umbrella Corp
    Select Insurance Liability Waiver    Traveller Declined to Purchase
    Select Insurance Declined Reason    All Inclusive or Premium
    Enter Insurance Declined Reason    Testing Insurance Decline reason

Add Air Canada Pass Redemption Remarks
    Click Add Accounting Line Button
    Select Accounting Remark Type    Air Canada Pass Redemption
    Select Segment    3
    Enter Supplier Confirmation Number    112233
    Select Credit Card Vendor Code    Visa
    Enter Credit Card Number    4444333322221111
    Enter Credit Card Expiration Date    0921
    Enter Base Amount    100.75
    Enter GST Tax Amount    2.00
    Enter HST Tax Amount    1.00
    Enter QST Tax Amount    3.00
    Enter Ticket Number    12343212
    Select Type Of Pass Purchase    WESTERN COMMUTER
    Select Fare Type    LATITUDE
    Click Save Button
    Sleep    3

Verify Air, Tour, And Hotel Passive Segments Are Added In the PNR
    Verify Specific Remark Is Written In The PNR    ${airline_code}${flight_number} ${class_service} 02OCT 5 YULCDG GK1 \ 1530 1715 \ 03OCT \ \ \ \ ${airline_recloc}
    Verify Specific Remark Is Written In The PNR    MIS 1A HK1 CDG 14OCT-/TYP-TOR/SUN-TEST VENDOR TOUR NAME TEST/SUC-ABC/SC-CDG/SD-14OCT/ST-1300/EC-AMS/ED-20OCT/ET-1200/CF-CN12345678    True
    Verify Specific Remark Is Written In The PNR    HTL 1A HK1 AMS 20OCT-22OCT/${hotel_city},${hotel_name} ,TEL-${hotel_phone} ,FAX-${hotel_fax},CF:CF12312414,TWIN ROOM,RATE:TEST RATE TYPE CAD100.55/NIGHT,SI-HOTEL ADDITIONAL INFO    True
    Verify Specific Remark Is Written In The PNR    RIR TRPL ALL INCLUSIVE 8 NTS/S4

Verify That Hotel RIR Remarks Are Written
    Verify Specific Remark Is Written In The PNR    RIR ADDRESS-${hotel_address}/S5
    Verify Specific Remark Is Written In The PNR    RIR ${hotel_city}/S5
    Verify Specific Remark Is Written In The PNR    RIR ${hotel_country} ${hotel_zip_code}/S5
    Verify Specific Remark Is Written In The PNR    RIR GUARANTEED FOR LATE ARRIVAL - NO/S5
    Verify Specific Remark Is Written In The PNR    RIR CANCELLATION POLICY - 12HRS/S5
    Verify Specific Remark Is Written In The PNR    RIR ROOM CONFIRMED WITH - HOTEL TESTING/S5
    Verify Specific Remark Is Written In The PNR    RIR ADDITONAL INFORMATION - HOTEL ADDITIONAL INFO/S5

Add Matrix Accounting
    Click Add Accounting Line Button
    Select Segment    4
    Create Matrix Accounting Remark    NO    Tour Accounting Remark    AN7    ABC4567891EFG4567890    Credit Card    Visa
    ...    4444333322221111    0323
    Enter Base Amount    100.75
    Enter GST Tax Amount    2.00
    Enter HST Tax Amount    1.00
    Enter QST Tax Amount    3.00
    Enter Other Tax Amount    4.00
    Enter Commission Without Tax Amount    12.00
    Click Save Button

Add Leisure Fee Collection
    Click Add Leisure Fee Collection Button
    Select Segment Association    Tour/Cruise Segment
    Enter Amount    100.00
    Select Leisure Fee Form of Payment    Cheque
    Select Traveler Province    Quebec
    Select Tax Exemption    GST Exempt
    Click Save Button

Verify Leisure Fee Remarks Are Written
    Verify Specific Remark Is Written In The PNR    RM *SFC/-FA-T1/-FLN-F1/-FP-TRF/-AMT-CAD100.00/-PT-0.00XG/-PT-9.98XQ/-FOP-CK    True
    Verify Specific Remark Is Written In The PNR    RMY TAX-QC
    Verify Specific Remark Is Written In The PNR    RM *TEX/-XG

Add ITC Package Costs
    Select Package    Itemize Package Cost Remarks
    Enter Currency for ITC    CAD
    Enter Number of Pax for Adult    1
    Enter Base Price for Adult    1222.00
    Enter Base Price Tax for Adult    212.00
    Enter Base Cruise for Adult    552.00
    Enter Base Cruise Tax for Adult    34.54
    Enter Rail Cost for Adult    124.00
    Enter Insurance for Adult    111.00
    Enter ITC Hotel Cost    235.67
    Enter ITC Car Cost    123.00
    Enter ITC Deposit    400.00
    Enter ITC Balance Due Date    09292019
    Enter ITC Commission Amount    533.00

Add Tour Package Costs
    Select Package    Tour Package
    Select Tour Package Currency Type    CAD
    Enter Tour Package Number Of Adults    1
    Enter Tour Package Base Cost Per Adult    100.00
    Enter Tour Package Taxes Per Adult    15.75
    Enter Tour Package Insurance Per Adult    80.00
    Enter Tour Package Deposit Paid    55.00
    Enter Tour Package Balance Due Date    12122025
    Enter Tour Package Commission Amount    25.00

Verify ITC Package Costs Remarks Are Written
    Verify Specific Remark Is Written In The PNR    RM *U43/-SEP19
    Verify Specific Remark Is Written In The PNR    RM *U41/-2214.21
    Verify Specific Remark Is Written In The PNR    RM *U42/-533.00
    Verify Specific Remark Is Only Written Once    RIR THE FOLLOWING COSTS ARE SHOWN IN CAD
    Verify Specific Remark Is Only Written Once    RIR ADULT PRICE------------1222.00X1------1,222.00
    Verify Specific Remark Is Only Written Once    RIR ADULT TAXES-------------212.00X1--------212.00
    Verify Specific Remark Is Only Written Once    RIR ADULT CRUISE------------552.00X1--------552.00
    Verify Specific Remark Is Only Written Once    RIR ADULT TAX/PORT CHARGES---34.54X1---------34.54
    Verify Specific Remark Is Only Written Once    RIR ADULT RAIL--------------124.00X1--------124.00
    Verify Specific Remark Is Only Written Once    RIR ADULT INSURANCE---------111.00X1--------111.00
    Verify Specific Remark Is Only Written Once    RIR HOTEL/ACCOMMODATION-----235.67
    Verify Specific Remark Is Only Written Once    RIR CAR RENTAL--------------123.00
    Verify Specific Remark Is Only Written Once    RIR LESS DEPOSIT PAID-------400.00
    Verify Specific Remark Is Only Written Once    RIR TOTAL HOLIDAY COST-----2614.21
    Verify Specific Remark Is Only Written Once    RIR BALANCE DUE------------2214.21
    Verify Specific Remark Is Only Written Once    RIR ---- BALANCE OF 2214.21 IS DUE 29SEP19 ----
    Verify Specific Remark Is Not Written In The PNR    CHILD
    Verify Specific Remark Is Not Written In The PNR    INFANT

Verify Air, Insurance, And Car Passive Segments Are Added In the PNR
    Verify Specific Remark Is Written In The PNR    ${airline_code}${flight_number} ${class_service} 02OCT 5 YULCDG GK1 \ 1530 1715 \ 03OCT \ \ \ \ ${airline_recloc}
    Verify Specific Remark Is Written In The PNR    MIS 1A HK1 YYZ 03OCT-/TYP-INS/SUN-MANULIFE INSURANCE/SUC-MLF/SC-YYZ/SD-03OCT/ST-0900/EC-YYZ/ED-13OCT/ET-0900/CF-CWT${policy_number}    True
    Verify Specific Remark Is Written In The PNR    CAR 1A HK1 YYZ 13OCT-13OCT CFAR/BS-67843263/SUC-AL/SUN-ALAMO/SD-13OCT/ST-0100/ED-13OCT/ET-1400/TTL-123.50CAD/DUR-DAILY/MI-200FKM FREE/URA-210.75CAD/CF-CONF1234    True
    Verify Specific Remark Is Written In The PNR    RIR SPECIAL REQUEST TESTING/S5
    Verify Specific Remark Is Written In The PNR    RIR HCL-HAND CONTROLS ON LEFT/S5
    Verify Specific Remark Is Written In The PNR    RIR CD-CD123456 ID-ID789123/S5
    Verify Specific Remark Is Written In The PNR    RIR AIRLINE FF-AC987654321/S5
    Verify Specific Remark Is Written In The PNR    RIR DROP OFF-161 BAY ST UNITE C80 M5J2S1 TORONTO/S5
    Verify Specific Remark Is Written In The PNR    RIR DROP FEE-212.00/S5
    Verify Specific Remark Is Written In The PNR    RIR TESTING INSURANCE PURCHASED/S4

Verify Insurance Reporting Remarks Are Added In The PNR
    Verify Specific Remark Is Written In The PNR    RM *U11/-NOT APPLICABLE
    Verify Specific Remark Is Written In The PNR    RM *U12/-TESTING INSURANCE DECLINE REASON
    Verify Specific Remark Is Written In The PNR    RIR I DECLINED TO PURCHASE THE FOLLOWING TRAVEL INSURANCE
    Verify Specific Remark Is Written In The PNR    RIR OPTIONS THAT MY TRAVEL AGENT HAS OFFERED AND EXPLAINED TO ME    True
    Verify Specific Remark Is Written In The PNR    RIR ...DELUXE PACKAGE INSURANCE
    Verify Specific Remark Is Written In The PNR    RIR ...NONE OF CARLSON WAGONLIT CANADA OR YOUR CWT TRAVEL
    Verify Specific Remark Is Written In The PNR    RIR ...AGENT ADVISOR OR YOUR CWT TRAVEL AGENCY WILL BE
    Verify Specific Remark Is Written In The PNR    RIR ...RESPONSIBLE FOR ANY EXPENSES LOSSES CLAIMS
    Verify Specific Remark Is Written In The PNR    RIR ...LIABILITIES COSTS ACCOUNTS CHARGES TAXES ACTIONS
    Verify Specific Remark Is Written In The PNR    RIR ...DEMANDS OR DAMAGES OF ANY NATURE WHATSOEVER ARISING
    Verify Specific Remark Is Written In The PNR    RIR ...AS A RESULT OF YOU DECLINING TO PURCHASE TRAVEL
    Verify Specific Remark Is Written In The PNR    RIR ...INSURANCE FOR THE FULL VALUE AND DURATION OF THE
    Verify Specific Remark Is Written In The PNR    RIR ...TRIP INCLUDING WITHOUT LIMITATION
    Verify Specific Remark Is Written In The PNR    RIR ...A. EXPENSES INCURRED DUE TO THE DELAY OR
    Verify Specific Remark Is Written In The PNR    RIR ...CANCELLATION OF YOUR TRIP
    Verify Specific Remark Is Written In The PNR    RIR ...B. ANY ACCIDENT SICKNESS OR DEATH THAT OCCURS ON
    Verify Specific Remark Is Written In The PNR    RIR ...YOUR TRIP
    Verify Specific Remark Is Written In The PNR    RIR ...C. ANY BAGGAGE OR PROPERTY STOLEN OR DAMAGED ON
    Verify Specific Remark Is Written In The PNR    RIR ...YOUR TRIP
    Verify Specific Remark Is Written In The PNR    RIR ...D. YOUR BENEFITS UNDER THE FOLLOWING BEING
    Verify Specific Remark Is Written In The PNR    RIR ...RESTRICTED AND/OR EXCLUDED
    Verify Specific Remark Is Written In The PNR    RIR ...1. CREDIT CARD ISURANCE--INSUFFICIENT PROTECTION
    Verify Specific Remark Is Written In The PNR    RIR ...OFFERED BY OR NON-EXISTING COVERAGE OF YOUR
    Verify Specific Remark Is Written In The PNR    RIR ...CREDIT CARD
    Verify Specific Remark Is Written In The PNR    RIR ...2. INSURANCE PRIVATE OR PUBLIC HEALTH CARE COVERAGE
    Verify Specific Remark Is Written In The PNR    RIR ...3. ADDITIONAL SINGLE SUPPLEMENT COST IF YOUR
    Verify Specific Remark Is Written In The PNR    RIR ...TRAVELLING COMPANION IS UNABLE TO TRAVEL AND YOU
    Verify Specific Remark Is Written In The PNR    RIR ...STILL CHOOSE TO TRAVEL.
    Verify Specific Remark Is Written In The PNR    RIR ...4. THE UNFORSEEN FINANCIAL DEFAULT OR BANKRUPTCY OF
    Verify Specific Remark Is Written In The PNR    RIR ...THE TOUR OPERATOR CRUISE LINE OR AIRLINE CARRIER
    Verify Specific Remark Is Written In The PNR    RIR ...FROM WHICH YOU HAVE PURCHASED YOUR TRAVEL
    Verify Specific Remark Is Written In The PNR    RIR ...ARRANGEMENTS.
    Verify Specific Remark Is Written In The PNR    RIR ...5. OTHER ADDITIONAL COSTS IF INSURANCE IS NOT
    Verify Specific Remark Is Written In The PNR    RIR ...PURCHASED AT THE TIME OF INITIAL DEPOSIT. SUCH AS A
    Verify Specific Remark Is Written In The PNR    RIR ...CHANGE IN MEDICAL CONDITION OR INCREASED
    Verify Specific Remark Is Written In The PNR    RIR ...SUPPLIER PENALTIES.

Verify Tour Package Remarks Are Added In The PNR
    Verify Package Costs UDID Remarks Are Written In the PNR    DEC25    140.75
    Verify Specific Remark Is Written In The PNR    RIR THE FOLLOWING COSTS ARE SHOWN IN ${tour_currency_type}
    Verify Specific Remark Is Written In The PNR    RIR ADULT PACKAGE-----------100.00X1--------100.00
    Verify Specific Remark Is Written In The PNR    RIR ADULT TAXES--------------15.75X1---------15.75
    Verify Specific Remark Is Written In The PNR    RIR ADULT INSURANCE----------80.00X1---------80.00
    Verify Specific Remark Is Written In The PNR    RIR TOTAL PACKAGE PRICE 195.75
    Verify Specific Remark Is Written In The PNR    RIR LESS DEPOSIT PAID 55.00 -
    Verify Specific Remark Is Written In The PNR    RIR BALANCE DUE 140.75
    Verify Specific Remark Is Written In The PNR    RIR ---- BALANCE OF 140.75 IS DUE 12DEC25 ----
    Verify Specific Remark Is Written In The PNR    RIR SOME TAXES ARE PAYABLE LOCALLY AND NOT INCLUDED ABOVE
