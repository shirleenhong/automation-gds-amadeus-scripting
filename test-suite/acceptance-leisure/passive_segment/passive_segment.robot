*** Settings ***
Force Tags        leisure
Resource          ../../resources/common/global_resources.robot

*** Test Cases ***
Verify Tour Passive Segment Is Added In the PNR
    [Tags]    us8892    sanity
    Login To Amadeus Sell Connect
    Enter GDS Command    NM1Leisure/Amadeus Mr    RM*CF/-RBP000000N    APE-Test@email.com    RU1AHK1SIN1OCT-CWT RETENTION SEGMENT
    Open CA Migration Window
    Click Add Segment Main Menu
    Click Add Segment Button
    Select Segment Type    Tour
    Enter Vendor Name    TEST VENDOR
    Enter Vendor Code    ABC
    Enter Confirmation Number    CN12345678
    Enter Departure Date    10122020
    Enter Arrival Date    10202020
    Enter Departure City    CDG
    Enter Destination City    AMS
    Enter Departure Time    0100PM
    Enter Arrival Time    1200PM
    Enter Segment Name    TOUR NAME TEST
    Enter Number Of Nights    8
    Enter Number Of People    1
    Select Room Type    TRPL
    Select Meal Plan    All Inclusive
    Click Add Passive Save Button
    Click Add Segments To PNR
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    MIS 1A HK1 ${departure_city} 12OCT-/TYP-TOR/SUN-${vendor_name} ${segment_name}/SUC-${vendor_code}/SC-${departure_city}/SD-12OCT/ST-1300/EC-${destination_city}/ED-20OCT/ET-1200/CF-${confirmation_number}    True
    Verify Specific Remark Is Written In The PNR    RIR ${room_type} ${meal_plan.upper()} ${number_of_nights} NTS/S3
    Close Cryptic Display Window
    Logout To Amadeus Sell Connect
    [Teardown]    Close Browser

Verify Cruise Passive Segment Is Added In the PNR
    [Tags]    us8892
    Login To Amadeus Sell Connect
    Enter GDS Command    NM1Leisure/Amadeus Mr    NM1Lastname/Firstname Mr    RM*CF/-RBP000000N    APE-Test@email.com    RU1AHK2SIN1OCT-CWT RETENTION SEGMENT
    Open CA Migration Window
    Click Add Segment Main Menu
    Click Add Segment Button
    Select Segment Type    Cruise
    Enter Vendor Name    TEST CRUISE VENDOR
    Enter Vendor Code    DEF
    Enter Confirmation Number    CN987654321
    Enter Departure Date    10122020
    Enter Arrival Date    10202020
    Enter Departure City    YUL
    Enter Destination City    LHR
    Enter Departure Time    0300AM
    Enter Arrival Time    1000AM
    Enter Segment Name    CRUISE NAME TEST
    Enter Number Of People    2
    Select State Room    Interior
    Enter Cabin Number    11122333
    Enter Dining    Early Dining
    Select Passengers For Passive Segments    1    2
    Click Add Passive Save Button
    Click Add Segments To PNR
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    MIS 1A HK2 ${departure_city} 12OCT-/TYP-SEA/SUN-${vendor_name} ${segment_name}/SUC-${vendor_code}/SC-${departure_city}/SD-12OCT/ST-0300/ED-20OCT/ET-1000/EC-${destination_city}/CF-${confirmation_number}/P1-2    True
    Verify Specific Remark Is Written In The PNR    RIR INTERIOR 1112233 ${dining.upper()} 8 NTS/S4
    Close Cryptic Display Window
    Logout To Amadeus Sell Connect
    [Teardown]    Close Browser

Verify Insurance Passive Segment Is Added In the PNR
    [Tags]    us8892
    Login To Amadeus Sell Connect
    Enter GDS Command    NM1Leisure/Amadeus Mr    NM1Lastname/Firstname Mr    RM*CF/-RBM000000N    APE-Test@email.com    RU1AHK2SIN1OCT-CWT RETENTION SEGMENT
    Open CA Migration Window
    Click Add Segment Main Menu
    Click Add Segment Button
    Select Segment Type    Insurance
    Enter Departure Date    10022020
    Enter Arrival Date    10132020
    Enter Departure City    YYZ
    Enter Policy Number    123456789
    Enter Type Of Insurance Purchased    Testing Insurance Purchased
    Click Add Passive Save Button
    Click Add Segments To PNR
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    MIS 1A HK2 ${departure_city} 02OCT-/TYP-INS/SUN-MANULIFE INSURANCE/SUC-MLF/SC-${departure_city}/SD-02OCT/ST-0900/EC-${departure_city}/ED-13OCT/ET-0900/CF-CWT${policy_number}    True
    Verify Specific Remark Is Written In The PNR    RIR TESTING INSURANCE PURCHASED/S4
    Close Cryptic Display Window
    Logout To Amadeus Sell Connect
    [Teardown]    Close Browser

Verify Passive Air Segment Is Added In the PNR For Non-ZZ Details
    [Tags]    us8720    sanity
    Login To Amadeus Sell Connect
    Enter GDS Command    NM1Leisure/Amadeus Mr    NM1Lastname/Firstname Mr    RM*CF/-CVC000000N    APE-Test@email.com    RU1AHK2SIN1OCT-CWT RETENTION SEGMENT
    Open CA Migration Window
    Click Add Segment Main Menu
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
    Click Add Segments To PNR
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    ${airline_code}${flight_number} ${class_service} 02OCT 5 ${departure_city}${destination_city} GK2 \ 1530 1715 \ 03OCT \ \ \ \ ${airline_recloc}
    Close Cryptic Display Window
    Logout To Amadeus Sell Connect
    [Teardown]    Close Browser

Verify Passive Air Segment Is Added In the PNR For ZZ Details
    [Tags]    us8720    sanity
    Login To Amadeus Sell Connect
    Enter GDS Command    NM1Leisure/Amadeus Mr    RM*CF/-AAA000000N    APE-Test@email.com    RU1AHK1SIN21JAN-CWT RETENTION SEGMENT
    Open CA Migration Window
    Click Add Segment Main Menu
    Click Add Segment Button
    Select Segment Type    Air
    Enter Airline Code    ZZ
    Enter Airline Name For ZZ    Air Canada
    Enter Flight Number    1234
    Enter Class Of Service    Y
    Enter Departure Date    10022020
    Enter Arrival Date    10042020
    Enter Departure City    ZZZ
    Enter Departure Name For ZZZ    Departure ZZZ
    Enter Destination City    ZZZ
    Enter Arrival Name For ZZZ    Arrival ZZZ
    Enter Departure Time    0330PM
    Enter Arrival Time    0515PM
    Enter Airline Record Locator    ARL7656
    Click Add Passive Save Button
    Click Add Segments To PNR
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    ${airline_code}${flight_number} ${class_service} 02OCT 5 ${departure_city}${destination_city} GK1 \ 1530 1715 \ 04OCT \ \ \ \ ${airline_recloc}
    Verify Specific Remark Is Written In The PNR    RIR FLIGHT IS CONFIRMED WITH AIR CANADA/S2
    Verify Specific Remark Is Written In The PNR    RIR DEPARTURE CITY IS DEPARTURE ZZZ/S2
    Verify Specific Remark Is Written In The PNR    RIR ARRIVAL CITY IS ARRIVAL ZZZ/S2
    Close Cryptic Display Window
    Logout To Amadeus Sell Connect
    [Teardown]    Close Browser

Verify Passive Limo Segment Is Added In the PNR For EN Language
    [Tags]    us8720
    Login To Amadeus Sell Connect
    Enter GDS Command    NM1Leisure/Amadeus Mr    NM1Lastname/Firstname Mr    RM*CF/-RBM000000N    APE-Test@email.com    RU1AHK2SIN21DEC-CWT RETENTION SEGMENT    RMZ/LANGUAGE-EN-CA
    Open CA Migration Window
    Click Add Segment Main Menu
    Click Add Segment Button
    Select Segment Type    Limo
    Enter Limo Company    Limousine Corp
    Enter Limo Supplier Code    S1A
    Enter Limo Confirmation Number    123nbr456
    Enter Limo Phone Number    11223344
    Enter Limo Co Agent    Lucifer
    Enter Limo Pickup Location    Home address
    Enter Limo Transfer To Location    Los Angeles Intl Airport
    Enter Limo Pickup City    LAX
    Enter Limo Pickup Date    12122020
    Enter Limo Pickup Time    0900AM
    Enter Limo Rate    12.34
    Select Limo Rate Type    Hourly Rate
    Tick Limo Include Tax On Rate
    Enter Limo Toll    5.00
    Tick Limo Include Gradtuities On Rate
    Enter Limo Parking    2.50
    Enter Limo Meet Drive At    Home Location
    Enter Additional Info    Additional Info
    Enter Cancellation Info    Cancellation Info
    Click Add Passive Save Button
    Click Add Segment Button
    Select Segment Type    Limo
    Enter Limo Company    Limos R Us
    Enter Limo Supplier Code    ABC
    Enter Limo Confirmation Number    1122asd
    Enter Limo Phone Number    32343234
    Enter Limo Pickup Location    Home Location
    Enter Limo Pickup City    MIA
    Enter Limo Pickup Date    12202020
    Enter Limo Pickup Time    0745PM
    Enter Limo Rate    20.92
    Select Limo Rate Type    Flat Rate
    Enter Limo Tax On Rate    3.45
    Enter Limo Gradtuities    1.00
    Tick Limo Include Parking On Rate
    Click Add Passive Save Button
    Click Add Segments To PNR
    Comment    Click Back To Main Menu
    Comment    Click Wrap PNR
    Comment    Populate Reporting Required Fields
    Comment    Click Submit To PNR
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    MIS 1A HK2 LAX 12DEC-/TYP-LIM/SUN-LIMOUSINE CORP/SUC-S1A/STP-LOS ANGELES INTL AIRPORT/SD-12DEC/ST-0900/EC-LAX/ED-12DEC/ET-0900/CF-123NBR456    True
    Verify Specific Remark Is Written In The PNR    MIS 1A HK2 MIA 20DEC-/TYP-LIM/SUN-LIMOS R US/SUC-ABC/STP-AIRPORT/SD-20DEC/ST-1945/EC-MIA/ED-20DEC/ET-1945/CF-1122ASD    True
    Verify Specific Remark Is Written In The PNR    RIR PHONE NUMBER 11223344/S3
    Verify Specific Remark Is Written In The PNR    RIR PICK UP-HOME ADDRESS TIME-09:00/S3
    Verify Specific Remark Is Written In The PNR    RIR TRANSFER TO-LOS ANGELES INTL AIRPORT/S3
    Verify Specific Remark Is Written In The PNR    RIR RATE -12.34 HOURLY RATE/S3
    Verify Specific Remark Is Written In The PNR    RIR CONFIRMED WITH LUCIFER/S3
    Verify Specific Remark Is Written In The PNR    RIR MEET DRIVER AT HOME LOCATION/S3
    Verify Specific Remark Is Written In The PNR    RIR ADDITIONAL INFO/S3
    Verify Specific Remark Is Written In The PNR    RIR CANCEL INFO-CANCELLATION INFO/S3
    Verify Specific Remark Is Written In The PNR    RIR RATE DOES NOT INCLUDE TOLLS 5.00-PARKING 2.50/S3
    Verify Specific Remark Is Written In The PNR    RIR RATE INCLUDES TAXES-GRATUITIES/S3
    Verify Specific Remark Is Written In The PNR    RIR PHONE NUMBER 32343234/S4
    Verify Specific Remark Is Written In The PNR    RIR PICK UP-HOME LOCATION TIME-19:45/S4
    Verify Specific Remark Is Written In The PNR    RIR TRANSFER TO-AIRPORT/S4
    Verify Specific Remark Is Written In The PNR    RIR RATE -20.92 FLAT RATE/S4
    Verify Specific Remark Is Written In The PNR    RIR RATE INCLUDES PARKING/S4
    Verify Specific Remark Is Written In The PNR    RIR RATE DOES NOT INCLUDE TAXES 3.45-TOLLS-GRATUITIES 1.00/S4    True
    Close Cryptic Display Window
    Logout To Amadeus Sell Connect
    [Teardown]    Close Browser

Verify Passive Limo Segment Is Added In the PNR For FR Language
    [Tags]    us8720
    Login To Amadeus Sell Connect
    Enter GDS Command    NM1Leisure/Amadeus Mr    NM1Lastname/Firstname Mr    RM*CF/-RBM000000N    APE-Test@email.com    RU1AHK2SIN1DEC-CWT RETENTION SEGMENT    RMZ/LANGUAGE-FR-CA
    Open CA Migration Window
    Click Add Segment Main Menu
    Click Add Segment Button
    Select Segment Type    Limo
    Enter Limo Company    Limousine Inc
    Enter Limo Supplier Code    SWG
    Enter Limo Confirmation Number    890asd
    Enter Limo Phone Number    6543210
    Enter Limo Co Agent    Mazikeen
    Enter Limo Pickup Location    Address Home
    Enter Limo Transfer To Location    Pearson Airport
    Enter Limo Pickup City    YYZ
    Enter Limo Pickup Date    10292020
    Enter Limo Pickup Time    1215AM
    Enter Limo Rate    26.98
    Select Limo Rate Type    Flat Rate
    Tick Limo Include Toll On Rate
    Enter Limo Gradtuities    13.00
    Enter Additional Info    Add additional info
    Enter Cancellation Info    Cancel upon request
    Click Add Passive Save Button
    Click Add Segment Button
    Select Segment Type    Limo
    Enter Limo Company    Limo 2 Go
    Enter Limo Supplier Code    ASD
    Enter Limo Confirmation Number    1234QWE
    Enter Limo Phone Number    4445343
    Enter Limo Transfer To Location    Hotel Location
    Enter Limo Pickup City    YCO
    Enter Limo Pickup Date    10302020
    Enter Limo Pickup Time    1032PM
    Enter Limo Rate    24.34
    Select Limo Rate Type    Flat Rate
    Tick Limo Include Tax On Rate
    Enter Limo Toll    0.24
    Enter Limo Parking    2.13
    Enter Limo Meet Drive At    Lux Nightclub
    Click Add Passive Save Button
    Click Add Segments To PNR
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    MIS 1A HK2 YYZ 29OCT-/TYP-LIM/SUN-LIMOUSINE INC/SUC-SWG/STP-PEARSON AIRPORT/SD-29OCT/ST-0015/EC-YYZ/ED-29OCT/ET-0015/CF-890ASD    True
    Verify Specific Remark Is Written In The PNR    MIS 1A HK2 YCO 30OCT-/TYP-LIM/SUN-LIMO 2 GO/SUC-ASD/STP-HOTEL LOCATION/SD-30OCT/ST-2232/EC-YCO/ED-30OCT/ET-2232/CF-1234QWE    True
    Verify Specific Remark Is Written In The PNR    RIR PHONE 6543210/S3
    Verify Specific Remark Is Written In The PNR    RIR DE ADDRESS HOME CUEILLETTE A-00:15/S3
    Verify Specific Remark Is Written In The PNR    RIR A PEARSON AIRPORT/S3
    Verify Specific Remark Is Written In The PNR    RIR TARIF -26.98 FLAT RATE/S3
    Verify Specific Remark Is Written In The PNR    RIR CONFIRME PAR MAZIKEEN/S3
    Verify Specific Remark Is Written In The PNR    RIR ADD ADDITIONAL INFO/S3
    Verify Specific Remark Is Written In The PNR    RIR CANCEL INFO-CANCEL UPON REQUEST/S3
    Verify Specific Remark Is Written In The PNR    RIR RATE DOES NOT INCLUDE TAXES-GRATUITIES 13.00-PARKING/S3
    Verify Specific Remark Is Written In The PNR    RIR RATE INCLUDES TOLLS/S3
    Verify Specific Remark Is Written In The PNR    RIR PHONE 4445343/S4
    Verify Specific Remark Is Written In The PNR    RIR DE HOME CUEILLETTE A-22:32/S4
    Verify Specific Remark Is Written In The PNR    RIR A HOTEL LOCATION/S4
    Verify Specific Remark Is Written In The PNR    RIR TARIF -24.34 FLAT RATE/S4
    Verify Specific Remark Is Written In The PNR    RIR LE CHAUFFEUR SERA A LUX NIGHTCLUB/S4
    Verify Specific Remark Is Written In The PNR    RIR RATE INCLUDES TAXES/S4
    Verify Specific Remark Is Written In The PNR    RIR RATE DOES NOT INCLUDE TOLLS 0.24-GRATUITIES-PARKING 2.13/S4    True
    Close Cryptic Display Window
    Logout To Amadeus Sell Connect
    [Teardown]    Close Browser

Verify Passive Rail Segments Are Added In The PNR
    [Tags]    us8723
    Login To Amadeus Sell Connect
    Enter GDS Command    NM1Leisure/Amadeus Mr    RM*CF/-RBM000000N    APE-Test@email.com    RU1AHK1SIN1OCT-CWT RETENTION SEGMENT    RMZ/LANGUAGE-EN-CA
    Open CA Migration Window
    Click Add Segment Main Menu
    Click Add Segment Button
    Select Segment Type    Rail
    Enter Train Number    TR123
    Enter Class Of Service    CL12345
    Enter From Station    From station Test
    Enter Arrival Station    Arrival Station Test
    Enter Car Number    C123
    Enter Seat Number    S123
    Enter Departure City    YUL
    Enter Departure Date    10102020
    Enter Arrival Date    10112020
    Enter Departure Time    0200AM
    Enter Arrival Time    0500AM
    Enter Vendor Name    Supplier Name Test
    Enter Vendor Code    AAA
    Enter Confirmation Number    CN12345678
    Click Add Passive Save Button
    Click Add Segment Button
    Select Segment Type    Rail
    Select Segment Type    Rail
    Enter Train Number    TR254
    Enter Class Of Service    CL22222
    Enter From Station    2nd From Station
    Enter Arrival Station    2nd Arrival Station
    Enter Seat Number    S123
    Enter Departure City    YYZ
    Enter Departure Date    10152020
    Enter Arrival Date    10162020
    Enter Departure Time    1200PM
    Enter Arrival Time    0500PM
    Enter Vendor Code    VIR
    Enter Confirmation Number    Conf12345
    Click Add Passive Save Button
    Click Add Segments To PNR
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    MIS 1A HK1 YUL 10OCT-/TYP-TRN/SUN-SUPPLIER NAME TEST/SUC-AAA/SC-FROM STATION TEST/SD-10OCT/ST-0200/EC-ARRIVAL STATION TEST/ED-11OCT/ET-0500/CF-CN12345678    True
    Verify Specific Remark Is Written In The PNR    RIR TRAIN NUMBER-TR123 CLASS-CL12345/S3
    Verify Specific Remark Is Written In The PNR    RIR CAR-C123 SEAT NUMBER-S123/S3
    Verify Specific Remark Is Written In The PNR    MIS 1A HK1 YYZ 15OCT-/TYP-TRN/SUN-VIA RAIL WEB/SUC-VIR/SC-2ND FROM STATION/SD-15OCT/ST-1200/EC-2ND ARRIVAL STATION/ED-16OCT/ET-1700/CF-CONF12345    True
    Verify Specific Remark Is Written In The PNR    RIR TRAIN NUMBER-TR254 CLASS-CL22222/S4
    Verify Specific Remark Is Written In The PNR    RIR SEAT NUMBER-S123/S4
    Verify Rail RIR Remarks For VIR Supplier Are Written In the PNR    4    EN
    Close Cryptic Display Window
    Logout To Amadeus Sell Connect
    [Teardown]    Close Browser

Verify Passive Rail Segments Are Added In The PNR For FR
    [Tags]    us8723
    Login To Amadeus Sell Connect
    Enter GDS Command    NM1Leisure/Amadeus Mr    NM1Lastname/Firstname Mr    RM*CF/-RBM000000N    APE-Test@email.com    RU1AHK2SIN1OCT-CWT RETENTION SEGMENT    RMZ/LANGUAGE-FR-CA
    Open CA Migration Window
    Click Add Segment Main Menu
    Click Add Segment Button
    Select Segment Type    Rail
    Enter Train Number    TR123
    Enter Class Of Service    CL12345
    Enter From Station    From station Test
    Enter Arrival Station    Arrival Station Test
    Enter Car Number    C456
    Enter Seat Number    S654
    Enter Departure City    YUL
    Enter Departure Date    10102020
    Enter Arrival Date    10112020
    Enter Departure Time    0200AM
    Enter Arrival Time    0500AM
    Enter Vendor Code    amk
    Enter Confirmation Number    CN12345678
    Click Add Passive Save Button
    Click Add Segment Button
    Select Segment Type    Rail
    Enter Train Number    TR254
    Enter Class Of Service    CL22222
    Enter From Station    2nd From Station
    Enter Arrival Station    2nd Arrival Station
    Enter Car Number    C123
    Enter Departure City    YYZ
    Enter Departure Date    10152020
    Enter Arrival Date    10162020
    Enter Departure Time    1200PM
    Enter Arrival Time    0500PM
    Enter Vendor Code    VIR
    Enter Confirmation Number    Conf12345
    Click Add Passive Save Button
    Click Add Segments To PNR
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    MIS 1A HK2 YUL 10OCT-/TYP-TRN/SUN-AMTRAK/SUC-AMK/SC-FROM STATION TEST/SD-10OCT/ST-0200/EC-ARRIVAL STATION TEST/ED-11OCT/ET-0500/CF-CN12345678    True
    Verify Specific Remark Is Written In The PNR    RIR TRAIN NUMBER-TR123 CLASS-CL12345/S4
    Verify Specific Remark Is Written In The PNR    RIR CAR-C456 SEAT NUMBER-S654/S4
    Verify Specific Remark Is Written In The PNR    MIS 1A HK2 YYZ 15OCT-/TYP-TRN/SUN-VIA RAIL WEB/SUC-VIR/SC-2ND FROM STATION/SD-15OCT/ST-1200/EC-2ND ARRIVAL STATION/ED-16OCT/ET-1700/CF-CONF12345    True
    Verify Specific Remark Is Written In The PNR    RIR TRAIN NUMBER-TR254 CLASS-CL22222/S5
    Verify Specific Remark Is Written In The PNR    RIR CAR-C123/S5
    Verify Rail RIR Remarks For AMK Supplier Are Written In the PNR    4
    Verify Rail RIR Remarks For VIR Supplier Are Written In the PNR    5    FR
    Close Cryptic Display Window
    Logout To Amadeus Sell Connect
    [Teardown]    Close Browser

Verify Car Passive Segment With Optional Values Are Written In The PNR
    [Tags]    us8718
    Login To Amadeus Sell Connect
    Enter GDS Command    NM1Leisure/Amadeus Mr    NM1Lastname/Firstname Mr    RM*CF/-RBM000000N    APE-Test@email.com    RU1AHK2SIN1OCT-CWT RETENTION SEGMENT    RMZ/LANGUAGE-EN-CA
    Open CA Migration Window
    Click Add Segment Main Menu
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
    Enter Departure Date    10102020
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
    Click Add Segments To PNR
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    CAR 1A HK1 YYZ 10OCT-10OCT CFAR/BS-67843263/SUC-AL/SUN-ALAMO/SD-10OCT/ST-0100/ED-10OCT/ET-1400/TTL-123.50CAD/DUR-DAILY/MI-200FKM FREE/URA-210.75CAD/CF-CONF1234/P1    True
    Verify Specific Remark Is Written In The PNR    RIR SPECIAL REQUEST TESTING/S4
    Verify Specific Remark Is Written In The PNR    RIR HCL-HAND CONTROLS ON LEFT/S4
    Verify Specific Remark Is Written In The PNR    RIR CD-CD123456 ID-ID789123/S4
    Verify Specific Remark Is Written In The PNR    RIR AIRLINE FF-AC987654321/S4
    Verify Specific Remark Is Written In The PNR    RIR DROP OFF-161 BAY ST UNITE C80 M5J2S1 TORONTO/S4
    Verify Specific Remark Is Written In The PNR    RIR DROP FEE-212.00/S4
    Verify Specific Remark Is Not Written In The PNR    RIR PICK UP-
    Close Cryptic Display Window
    Logout To Amadeus Sell Connect
    [Teardown]    Close Browser

Verify Car Passive Segment Without Optional Values Are Written In The PNR
    [Tags]    us8718    us11172
    Login To Amadeus Sell Connect
    Enter GDS Command    NM1Lastname/Firstname Mr    NM1Leisure/Amadeus Mr    NM1Leisure/Test    RM*CF/-RBM000000N    APE-Test@email.com    RU1AHK3YYJ1OCT-CWT RETENTION SEGMENT
    ...    RMZ/LANGUAGE-EN-CA
    Enter GDS Command    SS AF1074 Y 10OCT YYZORD GK3 / 11551440 / ABCDEFG    SS U21075 Y 15OCT ORDYYT GK3 / 11551440 / 1234567    SS AC1074 Y 30OCT YYTMSP GK3 / 11551440 / YYYD123
    Open CA Migration Window
    Click Add Segment Main Menu
    Click Add Segment Button
    Select Segment Type    Car
    Enter Departure City    yyt
    Enter Destination City    yeg
    Enter Vendor Code    ET
    Enter Confirmation Number    conf555555
    Select Car Type    PCAR - NISSAN MAXIMA OR SIMILAR
    Select Pickup Location    OFF AIRPORT
    Select Pickup Address    YYTC54 - 79 KENMOUNT ROAD A1B3P8 ST
    Select Drop Off Location    AIRPORT
    Enter Departure Date    10222020
    Enter Arrival Date    10232020
    Enter Departure Time    1100AM
    Enter Arrival Time    0200AM
    Enter Rental Cost    210.55
    Enter Rate Booked    100.00
    Enter Currency Type    USD
    Select Duration    WEEKLY
    Enter Mileage    UNL
    Click Add Passive Save Button
    Click Add Segments To PNR
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    CAR 1A HK1 YYT 22OCT-23OCT PCAR/BS-67843263/SUC-ET/SUN-ENTERPRISE/SD-22OCT/ST-1100/ED-23OCT/ET-0200/TTL-210.55USD/DUR-WEEKLY/MI-UNLKM/URA-100.00USD/CF-CONF555555/P1    True
    Verify Specific Remark Is Only Written Once    RIR PICK UP-79 KENMOUNT ROAD A1B3P8 ST/S8
    Verify Specific Remark Is Not Written In The PNR    RIR CD-
    Verify Specific Remark Is Not Written In The PNR    RIR AIRLINE FF
    Verify Specific Remark Is Not Written In The PNR    RIR DROP OFF-
    Verify Specific Remark Is Not Written In The PNR    RIR DROP FEE-
    Close Cryptic Display Window
    Logout To Amadeus Sell Connect
    [Teardown]    Close Browser

Verify Hotel Passive Segment Is Written In The PNR
    [Tags]    us8881
    Login To Amadeus Sell Connect
    Enter GDS Command    NM1Leisure/Amadeus Mr    NM1Lastname/Firstname Mr    RM*CF/-RBM000000N    APE-Test@email.com    RU1AHK2SIN1OCT-CWT RETENTION SEGMENT    RMZ/LANGUAGE-EN-CA
    Open CA Migration Window
    Click Add Segment Main Menu
    Click Add Segment Button
    Select Segment Type    Hotel
    Enter Hotel Chain Code    HI
    Enter Hotel City Code    YYZ
    Enter Departure Date    10102020
    Enter Arrival Date    10152020
    Enter Policy Number    12hrs
    Enter Hotel Nightly Rate    100.55
    Enter Hotel Rate Type    Test Rate type
    Enter Number Of Rooms    2
    Select Room Type    Twin Room
    Enter Confirmation Number    cf12312414
    Enter Additional Info    hotel additional info
    Enter Room Confirmed With    Hotel Testing
    Select Hotel    1
    Get Hotel Details Values
    Click Add Passive Save Button
    Click Add Segments To PNR
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    HTL 1A HK2 YYZ 10OCT-15OCT/${hotel_city},${hotel_name} ,TEL-${hotel_phone} ,FAX-${hotel_fax},CF:CF12312414,TWIN ROOM,RATE:TEST RATE TYPE CAD100.55/NIGHT,SI-HOTEL ADDITIONAL INFO/P1-2    True
    Verify Specific Remark Is Written In The PNR    RIR ADDRESS-${hotel_address}/S4
    Verify Specific Remark Is Written In The PNR    RIR ${hotel_city} ON/S4
    Verify Specific Remark Is Written In The PNR    RIR ${hotel_country} ${hotel_zip_code}/S4
    Verify Specific Remark Is Written In The PNR    RIR GUARANTEED FOR LATE ARRIVAL - NO/S4
    Verify Specific Remark Is Written In The PNR    RIR CANCELLATION POLICY - 12HRS/S4
    Verify Specific Remark Is Written In The PNR    RIR ROOM CONFIRMED WITH - HOTEL TESTING/S4
    Verify Specific Remark Is Written In The PNR    RIR ADDITONAL INFORMATION - HOTEL ADDITIONAL INFO/S4
    Verify Specific Remark Is Written In The PNR    RM *HS10OCT/-CHN-HI
    Close Cryptic Display Window
    Logout To Amadeus Sell Connect
    [Teardown]    Close Browser

Verify Hotel Passive Segment Without Optional Values Written In The PNR
    [Tags]    us8881
    Login To Amadeus Sell Connect
    Enter GDS Command    NM1Leisure/Amadeus Mr    NM1Lastname/Firstname Mr    RM*CF/-RBM000000N    APE-Test@email.com    RU1AHK2SIN1OCT-CWT RETENTION SEGMENT    RMZ/LANGUAGE-EN-CA
    Open CA Migration Window
    Click Add Segment Main Menu
    Click Add Segment Button
    Select Segment Type    Hotel
    Enter Hotel Chain Code    HI
    Enter Hotel City Code    YYT
    Enter Departure Date    10122020
    Enter Arrival Date    10182020
    Enter Policy Number    6P
    Enter Hotel Nightly Rate    555.75
    Enter Hotel Rate Type    Test Rate type
    Enter Number Of Rooms    1
    Select Gauranteed For Late Arrival    YES
    Enter Confirmation Number    cf222222
    Select Hotel    0
    Get Hotel Details Values
    Click Add Passive Save Button
    Click Add Segments To PNR
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    HTL 1A HK1 YYT 12OCT-18OCT/${hotel_city},${hotel_name} ,TEL-${hotel_phone} ,FAX-${hotel_fax},CF:CF222222,RATE:TEST RATE TYPE CAD555.75/NIGHT/P1    True
    Verify Specific Remark Is Written In The PNR    RIR ADDRESS-${hotel_address}/S4
    Verify Specific Remark Is Written In The PNR    RIR ${hotel_city} NL/S4
    Verify Specific Remark Is Written In The PNR    RIR ${hotel_country} ${hotel_zip_code}/S4
    Verify Specific Remark Is Written In The PNR    RIR GUARANTEED FOR LATE ARRIVAL - YES/S4
    Verify Specific Remark Is Written In The PNR    RIR CANCELLATION POLICY - 6P/S4
    Verify Specific Remark Is Written In The PNR    RM *HS12OCT/-CHN-HI
    Verify Specific Remark Is Not Written In The PNR    RIR ROOM CONFIRMED WITH
    Verify Specific Remark Is Not Written In The PNR    RIR ADDITONAL INFORMATION
    Close Cryptic Display Window
    Logout To Amadeus Sell Connect
    [Teardown]    Close Browser
