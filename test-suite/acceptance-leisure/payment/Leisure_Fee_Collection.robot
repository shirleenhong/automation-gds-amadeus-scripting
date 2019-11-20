*** Settings ***
Force Tags        leisure
Resource          ../../resources/common/global_resources.robot

*** Test Cases ***
Verify that the Leisure Fee Remark is Correct if Selected Fee Type is Tour/Cruise Segment, FOP is Check, and Province is Quebec
    [Tags]    us7648    us9429    us10878    us10977
    Login To Amadeus Sell Connect
    Enter GDS Command    NM1Lastname/Firstname Mr    NM1Leisure/Amadeus Mr    NM1Leisure/test    RU1AHK3YYZ12OCT-/TYP-TOR/SUC-ZZ/SC-YYZ/SD-12OCT/ST-0900/EC-YQB/ED-13OCT/ET-1800/PS-X    HU1AHK3YXE23OCT-24OCT/PARK INN SASKATOON,TEL-+49 711320940,FAX-+49 7113209410,CF:12345,SINGLE ROOM,RATE:CWT EUR60.00/NIGHT,SI-*H01*/P1-3    RM*CF/-RBM0000000N
    ...    APE-test@email.com    RU1AHK3SIN21OCT-CWT RETENTION SEGMENT
    Open CA Migration Window
    Click Wrap PNR
    Populate Reporting Required Fields
    Click Panel    Payment
    Click Payment Tab    Leisure Fee
    Click Add Leisure Fee Collection Button
    Select Segment Association    Tour/Cruise Segment
    Enter Amount    100.00
    Select Leisure Fee Form of Payment    Cheque
    Select Traveler Province    Quebec
    Select Tax Exemption    GST Exempt
    Select Passenger    LEISURE-AMADEUS MR
    Click Save Button
    Click Submit To PNR
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    RM *SFC/-FA-T1/-FLN-F1/-FP-TRF/-AMT-CAD100.00/-PT-0.00XG/-PT-9.98XQ/-FOP-CK/P2    True
    Verify Specific Remark Is Written In The PNR    RM *FEE/-FA-T1/-FLN-F1/-AMT-CAD100.00/-FP-FEE/-FOP-CK/P2
    Verify Specific Remark Is Written In The PNR    RMY TAX-QC
    Verify Specific Remark Is Written In The PNR    RM *TEX/-XG
    Close Cryptic Display Window
    Open CA Migration Window
    Click Wrap PNR
    # Populate Reporting Required Fields
    Click Panel    Payment
    Click Payment Tab    Leisure Fee
    Click Update Button    1
    Select Segment Association    Hotel Segment
    Select Segment Number    5 HTL 1A HK3 YXE 23Oct
    Enter Amount    1000.00
    Select Leisure Fee Form of Payment    Credit Card
    Select Credit Card Vendor Code    VI- Visa
    Enter Credit Card Number    4444333322221111
    Enter Credit Card Expiration Date    0921
    Select Traveler Province    Ontario
    Select Tax Exemption    HST Exempt
    Click Save Button
    Click Submit To PNR
    Close CA Migration Window
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    RM *SFC/-FA-H5/-FLN-F1/-FP-TRF/-AMT-CAD1000.00/-PT-0.00RC/-PT-0.00XQ/-FOP-CCVI4444333322221111/-EXP-0921/P2    True
    Verify Specific Remark Is Written In The PNR    RM *FEE/-FA-H5/-FLN-F1/-AMT-CAD1000.00/-FP-FEE/-FOP-CCVI4444333322221111/-EXP-0921/P2    True
    Verify Specific Remark Is Only Written Once    RMY TAX-ON
    Verify Specific Remark Is Only Written Once    RM *TEX/-RC
    Verify Specific Remark Is Not Written In The PNR    RM *FEE/-FA-T1/-FLN-F1/-AMT-CAD100.00/-FP-FEE/-FOP-CK/P2
    Close Cryptic Display Window
    Logout To Amadeus Sell Connect
    [Teardown]    Close Browser

Verify that the Leisure Fee Remark is Correct if Selected Fee Type is Ticket Segment, FOP is Credit Card, and Province is Outside of Canada
    [Tags]    us7648    us9429    us10878    us10977
    Login To Amadeus Sell Connect
    Enter GDS Command    NM1Leisure/Amadeus Mr    NM1Lastname/Firstname Mr    SS UA1074 Y 20OCT YYZYUL GK2 / 11551440 / ABCDEFG    CU1AHK2YQM23OCT-24OCTCCMR/SUC-EP/SUN-EUROPCAR/SD-23OCT/ST-1700/ED-24OCT/ET-1700/TTL-100.00USD/DUR-DAILY/MI-50KM FREE/CF-123456    RM*CF/-RBM000000N    RU1AHK2SIN25OCT-CWT RETENTION SEGMENT
    ...    APE-test@email.com
    Open CA Migration Window
    Click Wrap PNR
    Populate Reporting Required Fields
    Click Panel    Payment
    Click Payment Tab    Leisure Fee
    Click Add Leisure Fee Collection Button
    Select Segment Association    Ticket Segment
    Enter Amount    100.00
    Select Leisure Fee Form of Payment    Credit Card
    Select Credit Card Vendor Code    VI- Visa
    Enter Credit Card Number    4444333322221111
    Enter Credit Card Expiration Date    0921
    Select Traveler Province    Address outside of Canada
    Click Save Button
    Click Submit To PNR
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    RM *SFC/-FA-T1/-FLN-F1/-FP-TRF/-AMT-CAD100.00/-PT-0.00XG/-PT-0.00XQ/-FOP-CCVI4444333322221111/-EXP-0921/P1    True
    Verify Specific Remark Is Written In The PNR    RM *FEE/-FA-T1/-FLN-F1/-AMT-CAD100.00/-FP-FEE/-FOP-CCVI4444333322221111/-EXP-0921/P1    True
    Verify Specific Remark Is Written In The PNR    RMY TAX-ZZ
    Verify Specific Remark Is Not Written In The PNR    RM *TEX/
    Close Cryptic Display Window
    Open CA Migration Window
    Click Wrap PNR
    Click Panel    Payment
    Click Payment Tab    Leisure Fee
    Click Update Button    1
    Select Segment Association    Car Segment
    Select Segment Number    4 CAR 1A HK2 YQM 23Oct
    Enter Amount    1000.00
    Select Leisure Fee Form of Payment    Cheque
    Select Traveler Province    Prince Edward Island
    Select Tax Exemption    QST Exempt
    Select Passenger    LASTNAME-FIRSTNAME MR
    Click Save Button
    Click Submit To PNR
    Close CA Migration Window
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    RM *SFC/-FA-C4/-FLN-F1/-FP-TRF/-AMT-CAD1000.00/-PT-150.00RC/-PT-0.00XQ/-FOP-CK/P2    True
    Verify Specific Remark Is Written In The PNR    RM *FEE/-FA-C4/-FLN-F1/-AMT-CAD1000.00/-FP-FEE/-FOP-CK/P2    True
    Verify Specific Remark Is Written In The PNR    RMY TAX-PE
    Verify Specific Remark Is Written In The PNR    RM *TEX/-XQ
    Verify Specific Remark Is Not Written In The PNR    RM *FEE/-FA-T1/-FLN-F1/-AMT-CAD100.00/-FP-FEE/-FOP-CCVI4444333322221111/-EXP-0921/P1    True
    Close Cryptic Display Window
    Logout To Amadeus Sell Connect
    [Teardown]    Close Browser

Verify that the Leisure Fee Remark is Correct if Selected Fee Type is Car Segment, FOP is Check, and Province is New Brunswick
    [Tags]    us7648    us9429    us10977
    Login To Amadeus Sell Connect
    Enter GDS Command    NM1Leisure/Amadeus Mr    CU1AHK1YQM13OCT-14OCTCCMR/SUC-EP/SUN-EUROPCAR/SD-13OCT/ST-1700/ED-14OCT/ET-1700/TTL-100.00USD/DUR-DAILY/MI-50KM FREE/CF-123456    CU1AHK1YQM23OCT-24OCTCCMR/SUC-EP/SUN-EUROPCAR/SD-23OCT/ST-1700/ED-24OCT/ET-1700/TTL-100.00USD/DUR-DAILY/MI-50KM FREE/CF-123456    SS AC1074 Y 30OCT YYZYUL GK1 / 11551440 / ABCDEFG    RM*CF/-RBM0000000N    APE-12345
    ...    RU1AHK1SIN2OCT-CWT RETENTION SEGMENT
    Open CA Migration Window
    Click Wrap PNR
    Populate Reporting Required Fields
    Click Panel    Payment
    Click Payment Tab    Leisure Fee
    Click Add Leisure Fee Collection Button
    Select Segment Association    Car Segment
    Select Segment Number    4 CAR 1A HK1 YQM 23Oct
    Enter Amount    100.00
    Select Leisure Fee Form of Payment    Cheque
    Select Traveler Province    New Brunswick
    Select Tax Exemption    HST Exempt    GST Exempt    QST Exempt
    Click Save Button
    Click Submit To PNR
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    RM *SFC/-FA-C4/-FLN-F1/-FP-TRF/-AMT-CAD100.00/-PT-0.00RC/-PT-0.00XQ/-FOP-CK    True
    Verify Specific Remark Is Written In The PNR    RM *FEE/-FA-C4/-FLN-F1/-AMT-CAD100.00/-FP-FEE/-FOP-CK    True
    Verify Specific Remark Is Written In The PNR    RMY TAX-NB
    Verify Specific Remark Is Written In The PNR    RM *TEX/-RC/-XG/-XQ
    Close Cryptic Display Window
    Open CA Migration Window
    Click Wrap PNR
    Click Panel    Payment
    Click Payment Tab    Leisure Fee
    Click Update Button    1
    Select Segment Association    Ticket Segment
    Enter Amount    1000.00
    Select Leisure Fee Form of Payment    Credit Card
    Select Credit Card Vendor Code    VI- Visa
    Enter Credit Card Number    4444333322221111
    Enter Credit Card Expiration Date    0921
    Select Traveler Province    Quebec
    Unselect Tax Exemption    HST Exempt    GST Exempt    QST Exempt
    Click Save Button
    Click Submit To PNR
    Close CA Migration Window
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    RM *SFC/-FA-T1/-FLN-F1/-FP-TRF/-AMT-CAD1000.00/-PT-50.00XG/-PT-99.75XQ/-FOP-CCVI4444333322221111/-EXP-0921    True
    Verify Specific Remark Is Written In The PNR    RM *FEE/-FA-T1/-FLN-F1/-AMT-CAD1000.00/-FP-FEE/-FOP-CCVI4444333322221111/-EXP-0921    True
    Verify Specific Remark Is Written In The PNR    RMY TAX-QC
    Verify Specific Remark Is Not Written In The PNR    RM *TEX/-RC/-XG/-XQ
    Verify Specific Remark Is Not Written In The PNR    RM *FEE/-FA-C4/-FLN-F1/-AMT-CAD100.00/-FP-FEE/-FOP-CK    True
    Close Cryptic Display Window
    Logout To Amadeus Sell Connect
    [Teardown]    Close Browser

Verify that the Leisure Fee Remark is Correct if Selected Fee Type is Hotel Segment, FOP is Credit Card, and Province is Saskatchewan
    [Tags]    us7648    us9429    us10977
    Login To Amadeus Sell Connect
    Enter GDS Command    NM1Leisure/Amadeus Mr    HU1AHK1YXE23OCT-24OCT/PARK INN SASKATOON,TEL-+49 711320940,FAX-+49 7113209410,CF:12345,SINGLE ROOM,RATE:CWT EUR60.00/NIGHT,SI-*H01*/P1    RU1AHK1YYZ25OCT-/TYP-TOR/SUC-ZZ/SC-YYZ/SD-25OCT/ST-0900/EC-YQB/ED-26OCT/ET-1800/PS-X    RM*CF/-RBM0000000N    APE-12345    RU1AHK1SIN21OCT-CWT RETENTION SEGMENT
    Open CA Migration Window
    Click Wrap PNR
    Populate Reporting Required Fields
    Click Panel    Payment
    Click Payment Tab    Leisure Fee
    Click Add Leisure Fee Collection Button
    Select Segment Association    Hotel Segment
    Select Segment Number    3 HTL 1A HK1 YXE 23Oct
    Enter Amount    100.00
    Select Leisure Fee Form of Payment    Credit Card
    Select Credit Card Vendor Code    VI- Visa
    Enter Credit Card Number    4444333322221111
    Enter Credit Card Expiration Date    0921
    Select Traveler Province    Saskatchewan
    Select Tax Exemption    GST Exempt    QST Exempt
    Click Save Button
    Click Submit To PNR
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    RM *SFC/-FA-H3/-FLN-F1/-FP-TRF/-AMT-CAD100.00/-PT-0.00XG/-PT-0.00XQ/-FOP-CCVI4444333322221111/-EXP-0921    True
    Verify Specific Remark Is Written In The PNR    RM *FEE/-FA-H3/-FLN-F1/-AMT-CAD100.00/-FP-FEE/-FOP-CCVI4444333322221111/-EXP-0921    True
    Verify Specific Remark Is Written In The PNR    RMY TAX-SK
    Verify Specific Remark Is Written In The PNR    RM *TEX/-XG/-XQ
    Close Cryptic Display Window
    Open CA Migration Window
    Click Wrap PNR
    Click Panel    Payment
    Click Payment Tab    Leisure Fee
    Click Update Button    1
    Select Segment Association    Tour/Cruise Segment
    Enter Amount    1000.00
    Select Leisure Fee Form of Payment    Cheque
    Select Traveler Province    Address outside of Canada
    Unselect Tax Exemption    QST Exempt
    Select Tax Exemption    HST Exempt
    Click Save Button
    Click Submit To PNR
    Close CA Migration Window
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    RM *SFC/-FA-T1/-FLN-F1/-FP-TRF/-AMT-CAD1000.00/-PT-0.00XG/-PT-0.00XQ/-FOP-CK    True
    Verify Specific Remark Is Written In The PNR    RM *FEE/-FA-T1/-FLN-F1/-AMT-CAD1000.00/-FP-FEE/-FOP-CK    True
    Verify Specific Remark Is Written In The PNR    RMY TAX-ZZ
    Verify Specific Remark Is Written In The PNR    RM *TEX/-RC/-XG
    Verify Specific Remark Is Not Written In The PNR    RM *TEX/-XG/-XQ
    Verify Specific Remark Is Not Written In The PNR    RM *FEE/-FA-H3/-FLN-F1/-AMT-CAD100.00/-FP-FEE/-FOP-CCVI4444333322221111/-EXP-0921    True
    Close Cryptic Display Window
    Logout To Amadeus Sell Connect
    [Teardown]    Close Browser

Verify Multiple Leisure Fee Remarks With Tax Exemption Are Written In The PNR
    [Tags]    us7648    us9429    us10878
    Login To Amadeus Sell Connect
    Enter GDS Command    NM1Lastname/Firstname Mr    NM1Leisure/Amadeus Mr    NM1Leisure/test    HU1AHK3YXE23OCT-24OCT/PARK INN SASKATOON,TEL-+49 711320940,FAX-+49 7113209410,CF:12345,SINGLE ROOM,RATE:CWT EUR60.00/NIGHT,SI-*H01*/P1-3    RU1AHK3YYZ25OCT-/TYP-TOR/SUC-ZZ/SC-YYZ/SD-25OCT/ST-0900/EC-YQB/ED-26OCT/ET-1800/PS-X    RM*CF/-RBM0000000N
    ...    APE-12345    RU1AHK1SIN21OCT-CWT RETENTION SEGMENT
    Open CA Migration Window
    Click Wrap PNR
    Populate Reporting Required Fields
    Click Panel    Payment
    Click Payment Tab    Leisure Fee
    Click Add Leisure Fee Collection Button
    Select Segment Association    Tour/Cruise Segment
    Enter Amount    100.00
    Select Leisure Fee Form of Payment    Cheque
    Select Traveler Province    Quebec
    Select Tax Exemption    GST Exempt
    Select Passenger    LEISURE-AMADEUS MR
    Click Save Button
    Click Add Leisure Fee Collection Button
    Select Segment Association    Hotel Segment
    Select Segment Number    5 HTL 1A HK3 YXE 23Oct
    Enter Amount    541.00
    Select Leisure Fee Form of Payment    Credit Card
    Select Credit Card Vendor Code    VI- Visa
    Enter Credit Card Number    4444333322221111
    Enter Credit Card Expiration Date    0921
    Select Passenger    LEISURE-TEST
    Click Save Button
    Click Submit To PNR
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    RM *SFC/-FA-T1/-FLN-F1/-FP-TRF/-AMT-CAD100.00/-PT-0.00XG/-PT-9.98XQ/-FOP-CK/P2    True
    Verify Specific Remark Is Written In The PNR    RM *FEE/-FA-T1/-FLN-F1/-AMT-CAD100.00/-FP-FEE/-FOP-CK/P2
    Verify Specific Remark Is Written In The PNR    RM *SFC/-FA-H5/-FLN-F2/-FP-TRF/-AMT-CAD541.00/-PT-0.00XG/-PT-53.96XQ/-FOP-CCVI4444333322221111/-EXP-0921/P3    True
    Verify Specific Remark Is Written In The PNR    RM *FEE/-FA-H5/-FLN-F2/-AMT-CAD541.00/-FP-FEE/-FOP-CCVI4444333322221111/-EXP-0921/P3    True
    Verify Specific Remark Is Written In The PNR    RMY TAX-QC
    Verify Specific Remark Is Only Written Once    RM *TEX/-XG
    Close Cryptic Display Window
    Logout To Amadeus Sell Connect
    [Teardown]    Close Browser

Verify Multiple Leisure Fee Remarks Without Tax Exemption Are Written In The PNR
    [Tags]    us7648    us9429    us10878
    Login To Amadeus Sell Connect
    Enter GDS Command    NM1Leisure/Amadeus Mr    NM1Leisure/test    CU1AHK1YQM23OCT-24OCTCCMR/SUC-EP/SUN-EUROPCAR/SD-23OCT/ST-1700/ED-24OCT/ET-1700/TTL-100.00USD/DUR-DAILY/MI-50KM FREE/CF-123456    HU1AHK1YXE23OCT-24OCT/PARK INN SASKATOON,TEL-+49 711320940,FAX-+49 7113209410,CF:12345,SINGLE ROOM,RATE:CWT EUR60.00/NIGHT,SI-*H01*/P1    RU1AHK1YYZ25OCT-/TYP-TOR/SUC-ZZ/SC-YYZ/SD-25OCT/ST-0900/EC-YQB/ED-26OCT/ET-1800/PS-X    RM*CF/-RBM0000000N
    ...    APE-12345    RU1AHK2SIN21OCT-CWT RETENTION SEGMENT
    Open CA Migration Window
    Click Wrap PNR
    Populate Reporting Required Fields
    Click Panel    Payment
    Click Payment Tab    Leisure Fee
    Click Add Leisure Fee Collection Button
    Select Segment Association    Ticket Segment
    Enter Amount    5351.00
    Select Leisure Fee Form of Payment    Credit Card
    Select Credit Card Vendor Code    VI- Visa
    Enter Credit Card Number    4444333322221111
    Enter Credit Card Expiration Date    0921
    Select Traveler Province    Address outside of Canada
    Click Save Button
    Click Add Leisure Fee Collection Button
    Select Segment Association    Tour/Cruise Segment
    Enter Amount    1231.00
    Select Leisure Fee Form of Payment    Cheque
    Click Save Button
    Click Submit To PNR
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    RM *SFC/-FA-T1/-FLN-F1/-FP-TRF/-AMT-CAD5351.00/-PT-0.00XG/-PT-0.00XQ/-FOP-CCVI4444333322221111/-EXP-0921/P1    True
    Verify Specific Remark Is Written In The PNR    RM *FEE/-FA-T1/-FLN-F1/-AMT-CAD5351.00/-FP-FEE/-FOP-CCVI4444333322221111/-EXP-0921/P1    True
    Verify Specific Remark Is Written In The PNR    RM *SFC/-FA-T2/-FLN-F2/-FP-TRF/-AMT-CAD1231.00/-PT-0.00XG/-PT-0.00XQ/-FOP-CK/P1    True
    Verify Specific Remark Is Written In The PNR    RM *FEE/-FA-T2/-FLN-F2/-AMT-CAD1231.00/-FP-FEE/-FOP-CK/P1    True
    Verify Specific Remark Is Only Written Once    RMY TAX-ZZ
    Verify Specific Remark Is Not Written In The PNR    RM *TEX/
    Close Cryptic Display Window
    Logout To Amadeus Sell Connect
    [Teardown]    Close Browser
