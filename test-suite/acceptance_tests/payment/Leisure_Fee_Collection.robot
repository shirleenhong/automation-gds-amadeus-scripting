*** Settings ***
Force Tags        US7648    US8622
Resource          ../../resources/common/global_resources.robot

*** Test Cases ***
Verify that the Leisure Fee Remark is Correct if Selected Fee Type is Tour/Cruise Segment, FOP is Check, and Province is Quebec
    Login To Amadeus Sell Connect
    Enter GDS Command    NM1Leisure/Amadeus Mr    RU1AHK1YYZ12NOV-/TYP-TOR/SUC-ZZ/SC-YYZ/SD-12NOV/ST-0900/EC-YQB/ED-13NOV/ET-1800/PS-X    HU1AHK1YXE23NOV-24NOV/PARK INN SASKATOON,TEL-+49 711320940,FAX-+49 7113209410,CF:12345,SINGLE ROOM,RATE:CWT EUR60.00/NIGHT,SI-*H01*/P1    RM*CF/-RBM0000000N    APE12345    TKOK
    Open CA Migration Window
    Click Load PNR
    Click Panel    Reporting
    Select Routing Code    Asia incl. India
    Enter Destination Code    YYZ
    Select If PNR Travel to Any Countries Listed    NONE OF THE ABOVE
    Click Panel    Payment
    Click Payment Tab    Leisure Fee
    Select Segment Association    Tour/Cruise Segment
    Enter Amount    100.00
    Select Leisure Fee Form of Payment    Cheque
    Select Traveler Province    Quebec
    Click Submit To PNR
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    RM *SFC/-FLN-F1/-FP-TRF/-AMT-CAD100.00/-PT-5.00XG/-PT-9.98XQ/-FOP-CK    True
    Verify Specific Remark Is Written In The PNR    RMY TAX-QC
    Close Cryptic Display Window
    Switch To Command Page
    Open CA Migration Window
    Click Load PNR
    Click Panel    Reporting
    Select Routing Code    Asia incl. India
    Enter Destination Code    YYZ
    Select If PNR Travel to Any Countries Listed    NONE OF THE ABOVE
    Click Panel    Payment
    Click Payment Tab    Leisure Fee
    Tick Update Leisure Fee
    Select Segment Association    Hotel Segment
    Select Segment Number    3 HTL 1A HK1 YXE 23NOV
    Enter Amount    1000.00
    Select Leisure Fee Form of Payment    Credit Card
    Select Credit Card Vendor Code    VI- Visa
    Enter Credit Card Number    4444333322221111
    Enter Credit Card Expiration Date    0921
    Select Traveler Province    Ontario
    Click Submit To PNR
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    RM *SFC/-FA-H3/-FLN-F1/-FP-TRF/-AMT-CAD1000.00/-PT-130.00RC/-PT-0.00XQ/-FOP-CCVI4444333322221111/-EXP-0921    True
    Verify Specific Remark Is Written In The PNR    RMY TAX-ON
    Close Cryptic Display Window
    Logout To Amadeus Sell Connect
    [Teardown]    Close Browser

Verify that the Leisure Fee Remark is Correct if Selected Fee Type is Ticket Segment, FOP is Credit Card, and Province is Outside of Canada
    Login To Amadeus Sell Connect
    Enter GDS Command    NM1Leisure/Amadeus Mr    SS AC1074 Y 20NOV YYZYUL GK1 / 11551440 / ABCDEFG    CU1AHK1YQM23NOV-24NOVCCMR/SUC-EP/SUN-EUROPCAR/SD-23NOV/ST-1700/ED-24NOV/ET-1700/TTL-100.00USD/DUR-DAILY/MI-50KM FREE/CF-123456    RM*CF/-RBM000000N    RU1AHK1SIN21NOV-CWT RETENTION SEGMENT    APE12345
    ...    TKOK
    Open CA Migration Window
    Click Load PNR
    Click Panel    Reporting
    Select Routing Code    Asia incl. India
    Enter Destination Code    YUL
    Select If PNR Travel to Any Countries Listed    NONE OF THE ABOVE
    Click Panel    Payment
    Click Payment Tab    Leisure Fee
    Select Segment Association    Ticket Segment
    Enter Amount    100.00
    Select Leisure Fee Form of Payment    Credit Card
    Select Credit Card Vendor Code    VI- Visa
    Enter Credit Card Number    4444333322221111
    Enter Credit Card Expiration Date    0921
    Select Traveler Province    Address outside of Canada
    Click Submit To PNR
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    RM *SFC/-FA-T1/-FLN-F1/-FP-TRF/-AMT-CAD100.00/-PT-0.00XG/-PT-0.00XQ/-FOP-CCVIXXXXXXXXXXXX1111/-EXP-0921    True
    Verify Specific Remark Is Written In The PNR    RMY TAX-ZZ
    Close Cryptic Display Window
    Switch To Command Page
    Open CA Migration Window
    Click Load PNR
    Click Panel    Reporting
    Select Routing Code    Asia incl. India
    Enter Destination Code    YUL
    Select If PNR Travel to Any Countries Listed    NONE OF THE ABOVE
    Click Panel    Payment
    Click Payment Tab    Leisure Fee
    Tick Update Leisure Fee
    Select Segment Association    Car Segment
    Select Segment Number    3 CAR 1A HK1 YQM 23NOV
    Enter Amount    1000.00
    Select Leisure Fee Form of Payment    Cheque
    Select Traveler Province    Prince Edward Island
    Click Submit To PNR
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    RM *SFC/-FA-C3/-FLN-F1/-FP-TRF/-AMT-CAD1000.00/-PT-150.00RC/-PT-0.00XQ/-FOP-CK    True
    Verify Specific Remark Is Written In The PNR    RMY TAX-PE
    Close Cryptic Display Window
    Logout To Amadeus Sell Connect
    [Teardown]    Close Browser

Verify that the Leisure Fee Remark is Correct if Selected Fee Type is Car Segment, FOP is Check, and Province is New Brunswick
    Login To Amadeus Sell Connect
    Enter GDS Command    NM1Leisure/Amadeus Mr    CU1AHK1YQM23NOV-24NOVCCMR/SUC-EP/SUN-EUROPCAR/SD-23NOV/ST-1700/ED-24nov/ET-1700/TTL-100.00USD/DUR-DAILY/MI-50KM FREE/CF-123456    CU1AHK1YQM23DEC-24DECCCMR/SUC-EP/SUN-EUROPCAR/SD-23NOV/ST-1700/ED-24nov/ET-1700/TTL-100.00USD/DUR-DAILY/MI-50KM FREE/CF-123456    SS AC1074 Y 20NOV YYZYUL GK1 / 11551440 / ABCDEFG    RM*CF/-RBM0000000N    APE12345
    ...    TKOK
    Open CA Migration Window
    Click Load PNR
    Click Panel    Reporting
    Select Routing Code    Asia incl. India
    Enter Destination Code    YUL
    Select If PNR Travel to Any Countries Listed    NONE OF THE ABOVE
    Click Panel    Payment
    Click Payment Tab    Leisure Fee
    Select Segment Association    Car Segment
    Select Segment Number    3 CAR 1A HK1 YQM 23NOV
    Enter Amount    100.00
    Select Leisure Fee Form of Payment    Cheque
    Select Traveler Province    New Brunswick
    Click Submit To PNR
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    RM *SFC/-FA-C3/-FLN-F1/-FP-TRF/-AMT-CAD100.00/-PT-15.00RC/-PT-0.00XQ/-FOP-CK    True
    Verify Specific Remark Is Written In The PNR    RMY TAX-NB
    Close Cryptic Display Window
    Switch To Command Page
    Open CA Migration Window
    Click Load PNR
    Click Panel    Reporting
    Select Routing Code    Asia incl. India
    Enter Destination Code    YUL
    Select If PNR Travel to Any Countries Listed    NONE OF THE ABOVE
    Click Panel    Payment
    Click Payment Tab    Leisure Fee
    Tick Update Leisure Fee
    Select Segment Association    Ticket Segment
    Enter Amount    1000.00
    Select Leisure Fee Form of Payment    Credit Card
    Select Credit Card Vendor Code    VI- Visa
    Enter Credit Card Number    4444333322221111
    Enter Credit Card Expiration Date    0921
    Select Traveler Province    Quebec
    Click Submit To PNR
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    RM *SFC/-FA-T1/-FLN-F1/-FP-TRF/-AMT-CAD1000.00/-PT-50.00XG/-PT-99.75XQ/-FOP-CCVIXXXXXXXXXXXX1111/-EXP-0921    True
    Verify Specific Remark Is Written In The PNR    RMY TAX-QC
    Close Cryptic Display Window
    Logout To Amadeus Sell Connect
    [Teardown]    Close Browser

Verify that the Leisure Fee Remark is Correct if Selected Fee Type is Hotel Segment, FOP is Credit Card, and Province is Saskatchewan
    Login To Amadeus Sell Connect
    Enter GDS Command    NM1Leisure/Amadeus Mr    HU1AHK1YXE23NOV-24NOV/PARK INN SASKATOON,TEL-+49 711320940,FAX-+49 7113209410,CF:12345,SINGLE ROOM,RATE:CWT EUR60.00/NIGHT,SI-*H01*/P1    RU1AHK1YYZ25NOV-/TYP-TOR/SUC-ZZ/SC-YYZ/SD-25NOV/ST-0900/EC-YQB/ED-26NOV/ET-1800/PS-X    RM*CF/-RBM0000000N    APE12345    TKOK
    Open CA Migration Window
    Click Load PNR
    Click Panel    Reporting
    Select Routing Code    Asia incl. India
    Enter Destination Code    YXE
    Select If PNR Travel to Any Countries Listed    NONE OF THE ABOVE
    Click Panel    Payment
    Click Payment Tab    Leisure Fee
    Select Segment Association    Hotel Segment
    Select Segment Number    2 HTL 1A HK1 YXE 23NOV
    Enter Amount    100.00
    Select Leisure Fee Form of Payment    Credit Card
    Select Credit Card Vendor Code    VI- Visa
    Enter Credit Card Number    4444333322221111
    Enter Credit Card Expiration Date    0921
    Select Traveler Province    Saskatchewan
    Click Submit To PNR
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    RM *SFC/-FA-H2/-FLN-F1/-FP-TRF/-AMT-CAD100.00/-PT-5.00XG/-PT-0.00XQ/-FOP- CCVIXXXXXXXXXXXX1111/-EXP-0921    True
    Verify Specific Remark Is Written In The PNR    RMY TAX-SK
    Close Cryptic Display Window
    Switch To Command Page
    Open CA Migration Window
    Click Load PNR
    Click Panel    Reporting
    Select If PNR Travel to Any Countries Listed    NONE OF THE ABOVE
    Click Panel    Payment
    Click Payment Tab    Leisure Fee
    Tick Update Leisure Fee
    Select Segment Association    Tour/Cruise Segment
    Enter Amount    1000.00
    Select Leisure Fee Form of Payment    Cheque
    Select Traveler Province    Address outside of Canada
    Click Submit To PNR
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    RM *SFC/-FLN-F1/-FP-TRF/-AMT-CAD1000.00/-PT-0.00XG/-PT-0.00XQ/-FOP-CK    True
    Verify Specific Remark Is Written In The PNR    RMY TAX-ZZ
    Close Cryptic Display Window
    Logout To Amadeus Sell Connect
    [Teardown]    Close Browser
