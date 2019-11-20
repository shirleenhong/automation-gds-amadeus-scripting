*** Settings ***
Force Tags        leisure
Resource          ../../resources/common/global_resources.robot

*** Test Cases ***
Verify That Air Canada Pass Redemption RIR And Accounting Remarks Are Written In The PNR
    [Tags]    us7898
    Login To Amadeus Sell Connect
    Enter GDS Command    NM1Lastname/Firstname Mr    NM1Leisure/Amadeus Mr    NM1POLO/LISA Mrs    SS UA1074 Y 10DEC YYZORD GK3 / 11551440 / ABCDEFG    SS UA1074 Y 20DEC ORDYUL GK3 / 11551440 / ABCDEFG    RM*CF/-RBM000000N
    ...    RU1AHK1SIN21DEC-CWT RETENTION SEGMENT    APE-TEST@EMAIL.COM
    Open CA Migration Window
    Click Wrap PNR
    Populate Reporting Required Fields
    Click Panel    Payment
    Click Payment Tab    Matrix Accounting Remark
    Click Add Accounting Line Button
    Select Accounting Remark Type    Air Canada Pass Redemption
    Select Segment    4
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
    Select Passenger    LEISURE-AMADEUS MR
    Click Save Button
    Click Submit To PNR
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    RM *MAC/-SUP-ACJ/-LK-MAC1/-AMT-${base_amount}/-PT-${hst_tax}RC/-PT-${gst_tax}XG/-PT-${qst_tax}XQ/-CD-0.00/P2    True
    Verify Specific Remark Is Written In The PNR    RM *MAC/-LK-MAC1/-FOP-CCVI4444333322221111/-EXP-0921/-TK-${ticket_number}/-MP-ALL/-BKN-${supplier_confirmation_number}/S4/P2    True
    Verify Specific Remark Is Written In The PNR    RIR WESTERN COMMUTER PASS REDEMPTION-LATITUDE FARE/S4
    Verify Specific Remark Is Written In The PNR    RM *U14/-ACPASS-INDIVIDUAL
    Close Cryptic Display Window

Verify That Air Canada Pass Redemption RIR And Accounting Remarks Are Updated
    [Tags]    us7898
    Open CA Migration Window
    Click Wrap PNR
    Click Panel    Payment
    Click Payment Tab    Matrix Accounting Remark
    Click Update Button    1
    Enter Credit Card Number    4444333322221111
    Enter Base Amount    3210.45
    Enter GST Tax Amount    12.00
    Enter HST Tax Amount    21.00
    Enter QST Tax Amount    33.00
    Select Type Of Pass Purchase    EASTERN CANADA
    Select Fare Type    PREMIUM ECONOMY
    Click Save Button
    Click Submit To PNR
    Close CA Migration Window
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    RM *MAC/-SUP-ACJ/-LK-MAC1/-AMT-${base_amount}/-PT-${hst_tax}RC/-PT-${gst_tax}XG/-PT-${qst_tax}XQ/-CD-0.00/P2    True
    Verify Specific Remark Is Written In The PNR    RM *MAC/-LK-MAC1/-FOP-CCVI4444333322221111/-EXP-0921/-TK-${ticket_number}/-MP-ALL/-BKN-${supplier_confirmation_number}/S4/P2    True
    Verify Specific Remark Is Only Written Once    RIR EASTERN CANADA PASS REDEMPTION-PREMIUM ECONOMY FARE/S4
    Verify Specific Remark Is Only Written Once    RM *U14/-ACPASS-INDIVIDUAL
    Close Cryptic Display Window
    Logout To Amadeus Sell Connect
    [Teardown]    Close Browser

Verify That Multiple Air Canada Pass Redemption RIR And Accounting Remarks Are Written In The PNR
    [Tags]    us7898    sanity
    Login To Amadeus Sell Connect
    Enter GDS Command    NM1Lastname/Firstname Mr    NM1Leisure/Amadeus Mr    NM1POLO/LISA Mrs    SS UA1074 Y 10DEC YYZORD GK3 / 11551440 / ABCDEFG    SS UA1074 Y 20DEC ORDYUL GK3 / 11551440 / ABCDEFG    RM*CF/-RBM000000N
    ...    RU1AHK1SIN21NOV-CWT RETENTION SEGMENT    APE-TEST@EMAIL.COM
    Open CA Migration Window
    Click Wrap PNR
    Populate Reporting Required Fields
    Click Panel    Payment
    Click Payment Tab    Matrix Accounting Remark
    Click Add Accounting Line Button
    Select Accounting Remark Type    Air Canada Pass Redemption
    Select Segment    5
    Enter Supplier Confirmation Number    112233
    Select Credit Card Vendor Code    Visa
    Enter Credit Card Number    4444333322221111
    Enter Credit Card Expiration Date    0921
    Enter Base Amount    100.75
    Enter GST Tax Amount    2.00
    Enter HST Tax Amount    1.00
    Enter QST Tax Amount    3.00
    Enter Ticket Number    12343212
    Select Type Of Pass Purchase    PRAIRIES REGIONAL
    Select Fare Type    EXECUTIVE
    Select Passenger    LEISURE-AMADEUS MR
    Click Save Button
    Click Add Accounting Line Button
    Select Accounting Remark Type    Air Canada Pass Redemption
    Select Segment    6
    Enter Supplier Confirmation Number    542321
    Select Credit Card Vendor Code    Mastercard
    Enter Credit Card Number    5555555555554444
    Enter Credit Card Expiration Date    1022
    Enter Base Amount    765.50
    Enter Ticket Number    2632621
    Select Type Of Pass Purchase    QUEBEC-ONTARIO CONNECTOR
    Select Fare Type    FLEX
    Select Passenger    POLO-LISA MRS
    Click Save Button
    Click Submit To PNR
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    RM *MAC/-SUP-ACJ/-LK-MAC1/-AMT-100.75/-PT-1.00RC/-PT-2.00XG/-PT-3.00XQ/-CD-0.00/P2    True
    Verify Specific Remark Is Written In The PNR    RM *MAC/-LK-MAC1/-FOP-CCVI4444333322221111/-EXP-0921/-TK-12343212/-MP-ALL/-BKN-112233/S4/P2    True
    Verify Specific Remark Is Written In The PNR    RM *MAC/-SUP-ACJ/-LK-MAC2/-AMT-${base_amount}/-PT-0.00RC/-PT-0.00XG/-PT-0.00XQ/-CD-0.00/P3    True
    Verify Specific Remark Is Written In The PNR    RM *MAC/-LK-MAC2/-FOP-CCCA5555555555554444/-EXP-1022/-TK-${ticket_number}/-MP-ALL/-BKN-${supplier_confirmation_number}/S5/P3    True
    Verify Specific Remark Is Only Written Once    RIR PRAIRIES REGIONAL PASS REDEMPTION-EXECUTIVE FARE/S4
    Verify Specific Remark Is Only Written Once    RIR QUEBEC-ONTARIO CONNECTOR PASS REDEMPTION-FLEX FARE/S5
    Verify Specific Remark Is Only Written Once    RM *U14/-ACPASS-INDIVIDUAL
    Close Cryptic Display Window
    Logout To Amadeus Sell Connect
    [Teardown]    Close Browser

Verify That Air Canada Pass Purchase Accounting, RIR Remarks, And Passive Segment Are Written In The PNR
    [Tags]    us7873
    Login To Amadeus Sell Connect
    Enter GDS Command    NM1Lastname/Firstname Mr    NM1Leisure/Amadeus Mr    NM1POLO/LISA Mrs    RM*CF/-RBM000000N    RU1AHK1SIN21OCT-CWT RETENTION SEGMENT    APE-TEST@EMAIL.COM
    Open CA Migration Window
    Click Wrap PNR
    Populate Reporting Required Fields
    Click Panel    Payment
    Click Payment Tab    Matrix Accounting Remark
    Click Add Accounting Line Button
    Select Accounting Remark Type    Air Canada Pass Purchase
    Enter Supplier Confirmation Number    112233
    Select Credit Card Vendor Code    Visa
    Enter Credit Card Number    4444333322221111
    Enter Credit Card Expiration Date    0921
    Enter Base Amount    100.75
    Enter GST Tax Amount    2.00
    Enter HST Tax Amount    1.00
    Enter QST Tax Amount    3.00
    Enter Ticket Number    12343212
    Enter Departure City    YYZ
    Select Type Of Pass Purchase    WESTERN COMMUTER
    Select Fare Type    LATITUDE
    Select Passenger    LEISURE-AMADEUS MR
    Click Save Button
    Click Submit To PNR
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    RM *MAC/-SUP-ACJ/-LK-MAC1/-AMT-${base_amount}/-PT-${hst_tax}RC/-PT-${gst_tax}XG/-PT-${qst_tax}XQ/-CD-0.00/P2    True
    Verify Specific Remark Is Written In The PNR    RM *MAC/-LK-MAC1/-FOP-CCVI4444333322221111/-EXP-0921/-TK-${ticket_number}/-MP-ALL/-BKN-${supplier_confirmation_number}/S4/P2    True
    Verify Specific Remark Is Written In The PNR    RIR WESTERN COMMUTER PASS-LATITUDE FARE/S4
    Verify Specific Remark Is Written In The PNR    RM *U14/-ACPASS-INDIVIDUAL
    Verify Specific Remark Is Written In The PNR    AC123Q    True
    Verify Specific Remark Is Written In The PNR    YYZYYZGK307000800    True
    Close Cryptic Display Window

Verify That Air Canada Pass Purchase Accounting, RIR Remarks, And Passive Segment Are Updated In The PNR
    [Tags]    us7873
    Open CA Migration Window
    Click Wrap PNR
    Click Panel    Payment
    Click Payment Tab    Matrix Accounting Remark
    Click Update Button    1
    Enter Credit Card Number    4444333322221111
    Enter Base Amount    3210.45
    Enter GST Tax Amount    12.00
    Enter HST Tax Amount    21.00
    Enter QST Tax Amount    33.00
    Enter Departure City    YYZ
    Select Type Of Pass Purchase    EASTERN CANADA
    Select Fare Type    PREMIUM ECONOMY
    Click Save Button
    Click Submit To PNR
    Close CA Migration Window
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    RM *MAC/-SUP-ACJ/-LK-MAC1/-AMT-${base_amount}/-PT-${hst_tax}RC/-PT-${gst_tax}XG/-PT-${qst_tax}XQ/-CD-0.00/P2    True
    Verify Specific Remark Is Written In The PNR    RM *MAC/-LK-MAC1/-FOP-CCVI4444333322221111/-EXP-0921/-TK-${ticket_number}/-MP-ALL/-BKN-${supplier_confirmation_number}/S4/P2    True
    Verify Specific Remark Is Only Written Once    RIR EASTERN CANADA PASS-PREMIUM ECONOMY FARE/S4
    Verify Specific Remark Is Only Written Once    RM *U14/-ACPASS-INDIVIDUAL
    Verify Specific Remark Is Only Written Once    AC 123 Q
    Verify Specific Remark Is Only Written Once    YYZYYZ GK3 \ 0700 0800
    Close Cryptic Display Window
    Open CA Migration Window
    Click Wrap PNR
    Click Panel    Payment
    Click Payment Tab    Matrix Accounting Remark
    Click Add Accounting Line Button
    Select Accounting Remark Type    Insurance Remark
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
    Click Submit To PNR
    Close CA Migration Window
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    RM *MAC/-SUP-ACJ/-LK-MAC1/-AMT-3210.45/-PT-21.00RC/-PT-12.00XG/-PT-33.00XQ/-CD-0.00/P2    True
    Verify Specific Remark Is Written In The PNR    RM *MAC/-LK-MAC1/-FOP-CCVI4444333322221111/-EXP-0921/-TK-12343212/-MP-ALL/-BKN-112233/S4/P2    True
    Verify Specific Remark Is Only Written Once    RIR EASTERN CANADA PASS-PREMIUM ECONOMY FARE/S4
    Verify Specific Remark Is Only Written Once    RM *U14/-ACPASS-INDIVIDUAL
    Verify Specific Remark Is Only Written Once    AC 123 Q
    Verify Specific Remark Is Only Written Once    YYZYYZ GK3 \ 0700 0800
    Verify Specific Remark Is Written In The PNR    RM *MAC/-SUP-MLF/-LK-MAC2/-AMT-123.00/-PT-4.00RC/-PT-5.00XG/-PT-3.00XQ/-CP-10.00    True
    Verify Specific Remark Is Written In The PNR    RM *MAC/-LK-MAC2/-FOP-CCVI4444333322221111/-EXP-0921/-MP-ALL/-BKN-CWT112233/S4    True
    Close Cryptic Display Window

Verify That Air Canada Pass Purchase Accounting And RIR Remarks Are Deleted
    [Tags]    us7873
    Open CA Migration Window
    Click Wrap PNR
    Click Panel    Payment
    Click Payment Tab    Matrix Accounting Remark
    Click Payment Delete Button    1
    Confirm Delete
    Click Update Button    1
    Enter Credit Card Number    4444333322221111
    Click Save Button
    Click Submit To PNR
    Close CA Migration Window
    Open Cryptic Display Window
    Verify Specific Remark Is Not Written In The PNR    RM *MAC/-SUP-ACJ/-LK-MAC1/-AMT-${base_amount}/-PT-${hst_tax}RC/-PT-${gst_tax}XG/-PT-${qst_tax}XQ/-CD-0.00/P2    True
    Verify Specific Remark Is Not Written In The PNR    RM *MAC/-LK-MAC1/-FOP-CCVI4444333322221111/-EXP-0921/-TK-${ticket_number}/-MP-ALL/-BKN-${supplier_confirmation_number}/S4/P2    True
    Verify Specific Remark Is Not Written In The PNR    RIR EASTERN CANADA PASS-PREMIUM ECONOMY FARE/S4
    Verify Specific Remark Is Not Written In The PNR    RM *U14/-ACPASS-INDIVIDUAL
    Close Cryptic Display Window
    Logout To Amadeus Sell Connect
    [Teardown]    Close Browser
