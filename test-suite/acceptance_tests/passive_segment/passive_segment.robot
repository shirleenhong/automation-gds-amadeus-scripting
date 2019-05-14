*** Settings ***
Resource          ../../resources/common/global_resources.robot

*** Test Cases ***
Verify Tour Passive Segment Is Added In the PNR
    [Tags]    us8892
    Login To Amadeus Sell Connect
    Enter GDS Command    NM1Leisure/Amadeus Mr    RM*CF/-RBM000000N    APETest@email.com    TKOK    RU1AHK1SIN21NOV-CWT RETENTION SEGMENT
    Open CA Migration Window
    Sleep    2
    Click Add Segment Main Menu
    Click Add Segment Button
    Select Segment Type    Tour
    Enter Vendor Name    TEST VENDOR
    Enter Vendor Code    ABC
    Enter Confirmation Number    CN12345678
    Enter Departure Date    12122019
    Enter Arrival Date    12202019
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
    Click Back To Main Menu
    Click Load PNR
    Click Panel    Reporting
    Select Routing Code    Europe-incl. Morocco/Tunisia/Algeria/Greenland
    Enter Destination Code    CDG
    Select If PNR Travel to Any Countries Listed    GHANA
    Click Submit To PNR
    Close CA Migration Window
    Switch To Graphic Mode
    Sleep    3
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    MIS 1A HK1 ${departure_city} 12DEC-/TYP-TOR/SUN-${vendor_name} ${segment_name} ${room_type} ${meal_plan.upper()} ${number_of_nights}NTS/SUC-${vendor_code}/SC-${departure_city}/SD-12DEC/ST-1300/EC-${destination_city}/ED-20DEC/ET-1200/CF-${confirmation_number}    True
    Close Cryptic Display Window
    Logout To Amadeus Sell Connect
    [Teardown]    Close Browser

Verify Cruise Passive Segment Is Added In the PNR
    [Tags]    us8892
    Login To Amadeus Sell Connect
    Enter GDS Command    NM1Leisure/Amadeus Mr    NM1Lastname/Firstname Mr    RM*CF/-RBP000000N    APETest@email.com    TKOK    RU1AHK1SIN21NOV-CWT RETENTION SEGMENT
    Open CA Migration Window
    Click Add Segment Main Menu
    Click Add Segment Button
    Select Segment Type    Cruise
    Enter Vendor Name    TEST CRUISE VENDOR
    Enter Vendor Code    DEF
    Enter Confirmation Number    CN987654321
    Enter Departure Date    01122020
    Enter Arrival Date    01202020
    Enter Departure City    YUL
    Enter Destination City    LHR
    Enter Departure Time    0300AM
    Enter Arrival Time    1000AM
    Enter Segment Name    CRUISE NAME TEST
    Enter Number Of Nights    8
    Enter Number Of People    2
    Select State Room    Interior
    Enter Cabin Number    11122333
    Select Dining    Early Dining
    Click Add Passive Save Button
    Click Add Segments To PNR
    Click Back To Main Menu
    Click Load PNR
    Click Panel    Reporting
    Select Routing Code    Europe-incl. Morocco/Tunisia/Algeria/Greenland
    Enter Destination Code    CDG
    Select If PNR Travel to Any Countries Listed    GHANA
    Click Submit To PNR
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    MIS 1A HK2 ${departure_city} 12JAN-/TYP-SEA/SUN-${vendor_name} ${segment_name} ${dining.upper()} ${number_of_nights}NTS/SUC-${vendor_code}/SC-${departure_city}/SD-12JAN/ST-0300${destination_city}/ED-20JAN/ET-1000/CF-${confirmation_number}    True
    Close Cryptic Display Window
    Logout To Amadeus Sell Connect
    [Teardown]    Close Browser

Verify Insurance Passive Segment Is Added In the PNR
    [Tags]    us8892
    Login To Amadeus Sell Connect
    Enter GDS Command    NM1Leisure/Amadeus Mr    NM1Lastname/Firstname Mr    RM*CF/-RBM000000N    APETest@email.com    TKOK    RU1AHK1SIN21NOV-CWT RETENTION SEGMENT
    Open CA Migration Window
    Click Add Segment Main Menu
    Click Add Segment Button
    Select Segment Type    Insurance
    Enter Departure Date    01022020
    Enter Arrival Date    01132020
    Enter Departure City    YYZ
    Enter Policy Number    123456789
    Click Add Passive Save Button
    Click Add Segments To PNR
    Click Back To Main Menu
    Click Load PNR
    Click Panel    Reporting
    Select Routing Code    Europe-incl. Morocco/Tunisia/Algeria/Greenland
    Enter Destination Code    CDG
    Select If PNR Travel to Any Countries Listed    GHANA
    Click Submit To PNR
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    MIS 1A HK2 ${departure_city} 02JAN-/TYP-INS/SUN-MANULIFE INSURANCE/SUC-MLF/SC-${departure_city}/SD-02JAN/ST-0900/EC-${departure_city}/ED-13JAN/ET-0900/CF-CWT${policy_number}    True
    Close Cryptic Display Window
    Logout To Amadeus Sell Connect
    [Teardown]    Close Browser

Verify Passive Air Segment Is Added In the PNR For Non-ZZ Details
    [Tags]    us8720
    Login To Amadeus Sell Connect
    Enter GDS Command    NM1Leisure/Amadeus Mr    NM1Lastname/Firstname Mr    RM*CF/-RBM000000N    APETest@email.com    TKOK    RU1AHK1SIN21NOV-CWT RETENTION SEGMENT
    Open CA Migration Window
    Click Add Segment Main Menu
    Click Add Segment Button
    Select Segment Type    Air
    Enter Airline Code    AC
    Enter Flight Number    1234
    Enter Class Of Service    Y
    Enter Departure Date    01022020
    Enter Arrival Date    01032020
    Enter Departure City    YUL
    Enter Destination City    CDG
    Enter Departure Time    0330PM
    Enter Arrival Time    0515PM
    Enter Airline Record Locator    ARL1234
    Click Add Passive Save Button
    Click Add Segments To PNR
    Click Back To Main Menu
    Click Load PNR
    Click Panel    Reporting
    Select Routing Code    Europe-incl. Morocco/Tunisia/Algeria/Greenland
    Enter Destination Code    CDG
    Select If PNR Travel to Any Countries Listed    GHANA
    Click Submit To PNR
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    ${airline_code}${flight_number} ${class_service} 02JAN 4 ${departure_city}${destination_city} GK2 \ 1530 1715 \ 03JAN \ \ ${airline_recloc}
    [Teardown]    Close Browser

Verify Passive Air Segment Is Added In the PNR For ZZ Details
    [Tags]    us8720
    Login To Amadeus Sell Connect
    Enter GDS Command    NM1Leisure/Amadeus Mr    RM*CF/-RBM000000N    APETest@email.com    TKOK    RU1AHK1SIN21NOV-CWT RETENTION SEGMENT
    Open CA Migration Window
    Click Add Segment Main Menu
    Click Add Segment Button
    Select Segment Type    Air
    Enter Airline Code    ZZ
    Enter Airline Name For ZZ    Air Canada
    Enter Flight Number    1234
    Enter Class Of Service    Y
    Enter Departure Date    01022020
    Enter Arrival Date    01042020
    Enter Departure City    ZZZ
    Enter Departure Name For ZZZ    Departure ZZZ
    Enter Destination City    ZZZ
    Enter Arrival Name For ZZZ    Arrival ZZZ
    Enter Departure Time    0330PM
    Enter Arrival Time    0515PM
    Enter Airline Record Locator    ARL7656
    Click Add Passive Save Button
    Click Add Segments To PNR
    Click Back To Main Menu
    Click Load PNR
    Click Panel    Reporting
    Select Routing Code    Europe-incl. Morocco/Tunisia/Algeria/Greenland
    Enter Destination Code    CDG
    Select If PNR Travel to Any Countries Listed    GHANA
    Click Submit To PNR
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    ${airline_code}${flight_number} ${class_service} 02JAN 4 ${departure_city}${destination_city} GK1 \ 1530 1715 \ 04JAN \ \ ${airline_recloc}
    Verify Specific Remark Is Written In The PNR    RIR FLIGHT IS CONFIRMED WITH AIR CANADA/S2
    Verify Specific Remark Is Written In The PNR    RIR DEPARTURE CITY IS DEPARTURE ZZZ/S2
    Verify Specific Remark Is Written In The PNR    RIR ARRIVAL CITY IS ARRIVAL ZZZ/S2
    [Teardown]    Close Browser