*** Settings ***
Force Tags        leisure
Resource          ../../resources/common/global_resources.robot

*** Test Cases ***
Verify That Matrix Accounting Remark Is Written For Tour Accounting Remark Type
    [Tags]    us7747    us8001    us10877
    Login To Amadeus Sell Connect
    Enter GDS Command    NM1Lastname/Firstname Mr    NM1Leisure/Amadeus Mr    NM1POLO/LISA Mrs    RU1AHK3SIN12OCT-/TYP-TOR/SUC-ZZ/SC-sin/SD-12OCT/ST-0900/EC-sin/ED-12OCT/ET-1800/PS-X    SS UA1074 Y 20 YYZYUL GK3 / 11551440 / ABCDEFG    RM*CF/-RBM000000N
    ...    RU1AHK1SIN21-CWT RETENTION SEGMENT    APE-TEST@EMAIL.COM
    Open CA Migration Window
    Click Wrap PNR
    Click Panel    Payment
    Click Payment Tab    Matrix Accounting Remark
    Click Add Accounting Line Button
    Select Segment    4
    Create Matrix Accounting Remark    NO    Tour Accounting Remark    AD1    ABC4567891EFG4567890    Credit Card    Visa
    ...    4444333322221111    0323
    Enter Base Amount    100.75
    Enter GST Tax Amount    2.00
    Enter HST Tax Amount    1.00
    Enter QST Tax Amount    3.00
    Enter Other Tax Amount    4.00
    Enter Commission Without Tax Amount    12.00
    Click Save Button
    Select Is This Air Only?    NO
    Select Exclusive Property    YES
    Enter Hotel/ Property Name    Cozy Arms Hotel
    Select Flights    BETTER FLIGHT TIME
    Enter Price Vs Other Supplier    300pp
    Enter Group    FAMILY GROUP
    Select Preferred Vendor    PREFERRED OPTION NOT AVAILABLE
    Populate Reporting Required Fields
    Click Submit To PNR
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    RM *MAC/-SUP-${supplier_code}/-LK-MAC1/-AMT-${base_amount}/-PT-${hst_tax}RC/-PT-${gst_tax}XG/-PT-${qst_tax}XQ/-PT-${other_tax}XT/-CD-${commission_with_tax}/P1    True
    Verify Specific Remark Is Written In The PNR    RM *MAC/-LK-MAC1/-FOP-CCVI4444333322221111/-EXP-0323/-MP-ALL/-BKN-${supplier_confirmation_number}/S4/P1    True
    Verify Specific Remark Is Written In The PNR    RM *U76/-NO
    Verify Specific Remark Is Written In The PNR    RM *U71/-YES
    Verify Specific Remark Is Written In The PNR    RM *U75/-COZY ARMS HOTEL
    Verify Specific Remark Is Written In The PNR    RM *U72/-BETTER FLIGHT TIME
    Verify Specific Remark Is Written In The PNR    RM *U73/-300PP
    Verify Specific Remark Is Written In The PNR    RM *U74/-FAMILY GROUP
    Verify Specific Remark Is Written In The PNR    RM *U77/-PREFERRED OPTION NOT AVAILABLE
    Close Cryptic Display Window

Verify That Matrix Accounting Remark Is Updated For Tour Accounting Remark Type
    [Tags]    us8583    us10877
    Open CA Migration Window
    Click Wrap PNR
    Click Panel    Payment
    Click Payment Tab    Matrix Accounting Remark
    Click Update Button    1
    Verify Matrix Accounting Default Values Are Correct    Non-APAY
    Select Accounting Remark Type    Tour Accounting Remark
    Enter Supplier Code    AAA
    Select Matrix Form Of Payment    Cash
    Enter Base Amount    111.00
    Enter GST Tax Amount    3.44
    Enter HST Tax Amount    5.11
    Enter QST Tax Amount    6.00
    Enter Other Tax Amount    12.00
    Enter Commission Without Tax Amount    51.00
    Click Save Button
    Click Submit To PNR
    Close CA Migration Window
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    RM *MAC/-SUP-${supplier_code}/-LK-MAC1/-AMT-${base_amount}/-PT-${hst_tax}RC/-PT-${gst_tax}XG/-PT-${qst_tax}XQ/-PT-${other_tax}XT/-CD-${commission_with_tax}/P1    True
    Verify Specific Remark Is Written In The PNR    RM *MAC/-LK-MAC1/-FOP-CA/-MP-ALL/-BKN-${supplier_confirmation_number}/S4/P1    True
    Close Cryptic Display Window
    Logout To Amadeus Sell Connect
    [Teardown]    Close Browser

Verify That Matrix Accounting Remark Is Written For Cruise Accounting Remark Type
    [Tags]    us7747    us8001    us9850    us10877
    Login To Amadeus Sell Connect
    Enter GDS Command    NM1Lastname/Firstname Mr    NM1Leisure/Amadeus Mr    NM1POLO/LISA Mrs    SS UA1074 Y 10OCT YYZORD GK3 / 11551440 / ABCDEFG    RU1AHK3KEL21OCT-/TYP-SEA/SUN-STENA LINE/SUC-ZZ/SC-KEL/SD-12OCT/ST-1800OSL/ED-13OCT/ET-0800/CF-12345    RM*CF/-RBM0000000N
    ...    RU1AHK1SIN23OCT-CWT RETENTION SEGMENT    APE-Test@email.com
    Open CA Migration Window
    Click Wrap PNR
    Click Panel    Payment
    Click Payment Tab    Matrix Accounting Remark
    Click Add Accounting Line Button
    Select Segment    5
    Create Matrix Accounting Remark    NO    Cruise Accounting Remark    SWG    ABC4567891    Cash
    Enter Base Amount    230.50
    Enter GST Tax Amount    0.00
    Enter HST Tax Amount    3.00
    Enter QST Tax Amount    1.10
    Enter Ticket Number    123456789
    Enter Other Tax Amount    4.50
    Enter Commission Without Tax Amount    10.50
    Select Passenger    LEISURE-AMADEUS MR
    Click Save Button
    Select Is This Air Only?    YES
    Select Flights    DIRECT FLIGHTS
    Enter Price Vs Other Supplier    ATH
    Select Preferred Vendor    PREFERRED OPTION DECLINED
    Populate Reporting Required Fields
    Click Submit To PNR
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    RM *MAC/-SUP-${supplier_code}/-LK-MAC1/-AMT-${base_amount}/-PT-${hst_tax}RC/-PT-${gst_tax}XG/-PT-${qst_tax}XQ/-PT-${other_tax}XT/-CD-${commission_with_tax}/P2    True
    Verify Specific Remark Is Written In The PNR    RM *MAC/-LK-MAC1/-FOP-CA/-TK-${ticket_number}/-MP-ALL/-BKN-${supplier_confirmation_number}/S5/P2    True
    Verify Specific Remark Is Written In The PNR    RM *U76/-YES
    Verify Specific Remark Is Not Written In The PNR    RM *U75/-
    Verify Specific Remark Is Not Written In The PNR    RM *U71/-
    Verify Specific Remark Is Written In The PNR    RM *U72/-DIRECT FLIGHTS
    Verify Specific Remark Is Written In The PNR    RM *U73/-ATH
    Verify Specific Remark Is Not Written In The PNR    RM *U74/-
    Verify Specific Remark Is Written In The PNR    RM *U77/-PREFERRED OPTION DECLINED
    Close Cryptic Display Window
    Switch To Command Page

Verify That Matrix Accounting Remarks UDIDs are Deleted in The PNR for Non-APAY
    [Tags]    us8916
    Open CA Migration Window
    Click Wrap PNR
    Click Panel    Payment
    Click Payment Tab    Matrix Accounting Remark
    Click Update Button    1
    Select Accounting Remark Type    Cruise Accounting Remark
    Enter Supplier Code    AD1
    Click Save Button
    Click Submit To PNR
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    RM *MAC/-SUP-${supplier_code}/-LK-MAC1/-AMT-${base_amount}/-PT-${hst_tax}RC/-PT-${gst_tax}XG/-PT-${qst_tax}XQ/-PT-${other_tax}XT/-CD-${commission_with_tax}/P2    True
    Verify Specific Remark Is Written In The PNR    RM *MAC/-LK-MAC1/-FOP-CA/-TK-${ticket_number}/-MP-ALL/-BKN-${supplier_confirmation_number}/S5/P2    True
    Verify Specific Remark Is Written In The PNR    RM *U76/-YES
    Verify Specific Remark Is Not Written In The PNR    RM *U75/-
    Verify Specific Remark Is Not Written In The PNR    RM *U71/-
    Verify Specific Remark Is Written In The PNR    RM *U72/-DIRECT FLIGHTS
    Verify Specific Remark Is Written In The PNR    RM *U73/-ATH
    Verify Specific Remark Is Not Written In The PNR    RM *U74/-
    Verify Specific Remark Is Written In The PNR    RM *U77/-PREFERRED OPTION DECLINED
    Close Cryptic Display Window
    Open CA Migration Window
    Click Wrap PNR
    Click Panel    Payment
    Click Payment Tab    Matrix Accounting Remark
    Click Add Accounting Line Button
    Select Segment    5
    Create Matrix Accounting Remark    NO    Rail Accounting Remark    ASC    ABC4567891    Cash
    Enter Base Amount    1200.00
    Enter GST Tax Amount    1.00
    Enter HST Tax Amount    2.00
    Enter QST Tax Amount    3.10
    Enter Other Tax Amount    4.50
    Enter Commission Without Tax Amount    10.50
    Enter Ticket Number    52352525
    Click Save Button
    Enter Group    FAMILY GROUP
    Click Submit To PNR
    Close CA Migration Window
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    RM *U76/-YES
    Verify Specific Remark Is Not Written In The PNR    RM *U75/-
    Verify Specific Remark Is Not Written In The PNR    RM *U71/-
    Verify Specific Remark Is Written In The PNR    RM *U72/-DIRECT FLIGHTS
    Verify Specific Remark Is Written In The PNR    RM *U73/-ATH
    Verify Specific Remark Is Written In The PNR    RM *U74/-FAMILY GROUP
    Verify Specific Remark Is Written In The PNR    RM *U77/-PREFERRED OPTION DECLINED
    Close Cryptic Display Window
    Open CA Migration Window
    Click Wrap PNR
    Click Panel    Payment
    Click Payment Tab    Matrix Accounting Remark
    Click Payment Delete Button    1
    Confirm Delete
    Click Submit To PNR
    Close CA Migration Window
    Open Cryptic Display Window
    Verify Specific Remark Is Not Written In The PNR    RM *MAC/-SUP-AD1/-LK-MAC1/-AMT-230.50/-PT-3.00RC/-PT-0.00XG/-PT-1.10XQ/-PT-4.50XT/-CD-10.50/P2    True
    Verify Specific Remark Is Not Written In The PNR    RM *MAC/-LK-MAC1/-FOP-CA/-TK-123456789/-MP-ALL/-BKN-ABC4567891/S5/P2    True
    Verify Specific Remark Is Not Written In The PNR    RM *U76/-YES
    Verify Specific Remark Is Not Written In The PNR    RM *U75/-
    Verify Specific Remark Is Not Written In The PNR    RM *U71/-
    Verify Specific Remark Is Not Written In The PNR    RM *U72/-DIRECT FLIGHTS
    Verify Specific Remark Is Not Written In The PNR    RM *U73/-ATH
    Verify Specific Remark Is Not Written In The PNR    RM *U74/-FAMILY GROUP
    Verify Specific Remark Is Not Written In The PNR    RM *U77/-PREFERRED OPTION DECLINED
    Close Cryptic Display Window
    Logout To Amadeus Sell Connect
    [Teardown]    Close Browser

Verify That Matrix Accounting Remark Is Written For Rail Accounting Remark Type
    [Tags]    us7747    us9850    us10877
    Login To Amadeus Sell Connect
    Enter GDS Command    NM1Lastname/Firstname Mr    NM1Leisure/Amadeus Mr    NM1POLO/LISA Mrs    RU1AHK3SIN12OCT-/TYP-TOR/SUC-ZZ/SC-sin/SD-12OCT/ST-0900/EC-sin/ED-12OCT/ET-1800/PS-X    RU1AHK3BRU12OCT-/TYP-TRN/SUN-NS/SUC-YY/SC-BEBMI/SD-12OCT/ST-1010/EC-DEFRH/ED-12OCT/ET-1320/CF-12345    RM*CF/-RBM000000N
    ...    APE-12345
    Open CA Migration Window
    Click Wrap PNR
    Populate Reporting Required Fields
    Click Panel    Payment
    Click Payment Tab    Matrix Accounting Remark
    Click Add Accounting Line Button
    Select Segment    5
    Create Matrix Accounting Remark    NO    Rail Accounting Remark    ASC    ABC4567891    Agency Plastic    Visa
    ...    4444333322221111    0323
    Enter Base Amount    230.50
    Enter GST Tax Amount    4.00
    Enter HST Tax Amount    3.00
    Enter QST Tax Amount    0.00
    Enter Ticket Number    123456789
    Enter Other Tax Amount    0.00
    Enter Commission Without Tax Amount    20.50
    Select Passenger    LASTNAME-FIRSTNAME MR
    Click Save Button
    Click Submit To PNR
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    RM *MAC/-SUP-${supplier_code}/-LK-MAC1/-AMT-${base_amount}/-PT-${hst_tax}RC/-PT-${gst_tax}XG/-PT-${qst_tax}XQ/-PT-${other_tax}XT/-CD-${commission_with_tax}/P1    True
    Verify Specific Remark Is Written In The PNR    RM *MAC/-LK-MAC1/-FOP-APVI4444333322221111/-EXP-0323/-TK-${ticket_number}/-MP-ALL/-BKN-${supplier_confirmation_number}/S5/P1    True
    Close Cryptic Display Window
    Logout To Amadeus Sell Connect
    [Teardown]    Close Browser

Verify That Matrix Accounting Remark Is Written For NonBSP Air Accounting Remark Type
    [Tags]    us7747    us10877
    Login To Amadeus Sell Connect
    Enter GDS Command    NM1Lastname/Firstname Mr    NM1Leisure/Amadeus Mr    NM1POLO/LISA Mrs    RU1AHK3SIN12OCT-/TYP-TOR/SUC-ZZ/SC-sin/SD-12OCT/ST-0900/EC-sin/ED-12OCT/ET-1800/PS-X    SS UA1074 Y 20OCT YYZYUL GK3 / 11551440 / ABCDEFG    SS UA1075 Y 25OCT YULYVR GK3 / 11551440 / 1234567
    ...    RM*CF/-RBM000000N    APE-test@email.com
    Open CA Migration Window
    Click Wrap PNR
    Populate Reporting Required Fields
    Click Panel    Payment
    Click Payment Tab    Matrix Accounting Remark
    Click Add Accounting Line Button
    Select Segment    5    6
    Create Matrix Accounting Remark    NO    NonBSP Air Accounting Remark    QWE    1234561    Cheque
    Enter GST Tax Amount    2.50
    Enter Base Amount    1230.50
    Enter HST Tax Amount    0.00
    Enter QST Tax Amount    4.20
    Enter Other Tax Amount    6.50
    Enter Ticket Number    67812345
    Enter Commission Without Tax Amount    11.25
    Click Save Button
    Click Submit To PNR
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    RM *MAC/-SUP-${supplier_code}/-LK-MAC1/-AMT-${base_amount}/-PT-${hst_tax}RC/-PT-${gst_tax}XG/-PT-${qst_tax}XQ/-PT-${other_tax}XT/-CD-${commission_with_tax}/P1    True
    Verify Specific Remark Is Written In The PNR    RM *MAC/-LK-MAC1/-FOP-CK/-TK-${ticket_number}/-MP-ALL/-BKN-${supplier_confirmation_number}/S5-6/P1    True
    Close Cryptic Display Window
    Logout To Amadeus Sell Connect
    [Teardown]    Close Browser

Verify That Matrix Accounting Remark Is Written For NonBSP Air Accounting Remark Type With Other Supplier Code
    [Tags]    us7747    us9850    us10877
    Login To Amadeus Sell Connect
    Enter GDS Command    NM1Lastname/Firstname Mr    NM1Leisure/Amadeus Mr    SS UA1074 Y 20OCT YYZYUL GK2 / 11551440 / ABCDEFG    RU1AHK2SIN23OCT-/TYP-TOR/SUC-ZZ/SC-sin/SD-12OCT/ST-0900/EC-sin/ED-12OCT/ET-1800/PS-X    SS UA1075 Y 25OCT YULYVR GK2 / 11551440 / 1234567    RM*CF/-RBM000000N
    ...    RU1AHK2SIN27OCT-CWT RETENTION SEGMENT    APE-test@email.com
    Open CA Migration Window
    Click Wrap PNR
    Populate Reporting Required Fields
    Click Panel    Payment
    Click Payment Tab    Matrix Accounting Remark
    Click Add Accounting Line Button
    Select Segment    3    5
    Create Matrix Accounting Remark    NO    NonBSP Air Accounting Remark    ABC    1234561    Cash
    Enter Base Amount    1240.00
    Enter GST Tax Amount    0.00
    Enter HST Tax Amount    3.00
    Enter QST Tax Amount    1.10
    Enter Ticket Number    123456789
    Enter Other Tax Amount    4.50
    Enter Commission Without Tax Amount    10.50
    Select Passenger    LASTNAME-FIRSTNAME MR
    Click Save Button
    Click Submit To PNR
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    RM *MAC/-SUP-${supplier_code}/-LK-MAC1/-AMT-${base_amount}/-PT-${hst_tax}RC/-PT-${gst_tax}XG/-PT-${qst_tax}XQ/-PT-${other_tax}XT/-CD-${commission_with_tax}/P1    True
    Verify Specific Remark Is Written In The PNR    RM *MAC/-LK-MAC1/-FOP-CA/-TK-${ticket_number}/-MP-ALL/-BKN-${supplier_confirmation_number}/S3,5/P1    True
    Close Cryptic Display Window
    Logout To Amadeus Sell Connect
    [Teardown]    Close Browser

Verify That APAY Matrix Accounting Remark Is Written For Seat Costs Accounting Remark Type
    [Tags]    us7761    us9850    us10877
    Login To Amadeus Sell Connect
    Enter GDS Command    NM1Lastname/Firstname Mr    NM1Leisure/Amadeus Mr    NM1POLO/LISA Mrs    SS UA1074 Y 20OCT YYZYUL GK3 / 11551440 / ABCDEFG    SS UA1075 Y 25OCT YULYVR GK3 / 11551440 / 1234567    RM*CF/-RBM000000N
    ...    APE-TEST@EMAIL.COM
    Open CA Migration Window
    Click Wrap PNR
    Populate Reporting Required Fields
    Click Panel    Payment
    Click Payment Tab    Matrix Accounting Remark
    Click Add Accounting Line Button
    Select Segment    4
    Create Matrix Accounting Remark    YES    Apay Accounting Remark    PFS    123555    Credit Card    VI
    ...    4444333322221111    0323    SEAT COSTS
    Enter Base Amount    100.75
    Enter GST Tax Amount    2.00
    Enter HST Tax Amount    1.00
    Enter QST Tax Amount    0.00
    Select Passenger    POLO-LISA MR
    Click Save Button
    Click Submit To PNR
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    RM *MAC/-SUP-${supplier_code}/-LK-MAC1/-AMT-${base_amount}/-PT-${hst_tax}RC/-PT-${gst_tax}XG/-PT-${qst_tax}XQ/P3    True
    Verify Specific Remark Is Written In The PNR    RM *MAC/-LK-MAC1/-FOP-CCVI4444333322221111/-EXP-0323/-MP-ALL/-BKN-${supplier_confirmation_number}/S4/P3    True
    Verify Specific Remark Is Written In The PNR    RIR PAID ${remark_description} CF-${supplier_confirmation_number} CAD${base_amount} PLUS 3.00 TAX ON VI/S4    True
    Close Cryptic Display Window

Verify That APAY Matrix Accounting Remark Is Updated For Seat Costs Accounting Remark Type
    [Tags]    us8583    us9850
    Open CA Migration Window
    Click Wrap PNR
    Click Panel    Payment
    Click Payment Tab    Matrix Accounting Remark
    Click Update Button    1
    Verify Matrix Accounting Default Values Are Correct    APAY
    Add CC As Form Of Payment    AX    371449635398431    1222
    Enter Base Amount    111.00
    Enter GST Tax Amount    3.44
    Enter HST Tax Amount    5.11
    Enter QST Tax Amount    6.00
    Click Save Button
    Click Submit To PNR
    Close CA Migration Window
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    RM *MAC/-SUP-${supplier_code}/-LK-MAC1/-AMT-${base_amount}/-PT-${hst_tax}RC/-PT-${gst_tax}XG/-PT-${qst_tax}XQ/P3    True
    Verify Specific Remark Is Written In The PNR    RM *MAC/-LK-MAC1/-FOP-CCAX371449635398431/-EXP-1222/-MP-ALL/-BKN-${supplier_confirmation_number}/S4/P3    True
    Verify Specific Remark Is Written In The PNR    RIR PAID ${remark_description} CF-${supplier_confirmation_number} CAD${base_amount} PLUS 14.55 TAX ON AX/S4    True
    Close Cryptic Display Window
    Logout To Amadeus Sell Connect
    [Teardown]    Close Browser

Verify That APAY Matrix Accounting Remark Is Written For Maple Leaf Accounting Remark Type
    [Tags]    us7761    us10877
    Login To Amadeus Sell Connect
    Enter GDS Command    NM1Lastname/Firstname Mr    NM1Leisure/Amadeus Mr    SS UA1074 Y 20OCT YYZYUL GK2 / 11551440 / ABCDEFG    SS UA1075 Y 25OCT YULYVR GK2 / 11551440 / 1234567    RM*CF/-RBM000000N    RU1AHK1SIN26OCT-CWT RETENTION SEGMENT
    ...    APE-test@email.com
    Open CA Migration Window
    Click Wrap PNR
    Populate Reporting Required Fields
    Click Panel    Payment
    Click Payment Tab    Matrix Accounting Remark
    Click Add Accounting Line Button
    Select Segment    3    4
    Create Matrix Accounting Remark    YES    Apay Accounting Remark    AD1    123555    Agency Plastic    Visa
    ...    4444333322221111    0323    MAPLE LEAF
    Enter Base Amount    100.75
    Enter GST Tax Amount    3.00
    Enter HST Tax Amount    2.50
    Enter QST Tax Amount    0.00
    Click Save Button
    Select Is This Air Only?    YES
    Select Flights    BETTER FLIGHT TIME
    Enter Price Vs Other Supplier    ATH
    Enter Group    WEDDING GROUP
    Select Preferred Vendor    PREFERRED OPTION NOT AVAILABLE
    Click Submit To PNR
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    RM *MAC/-SUP-${supplier_code}/-LK-MAC1/-AMT-${base_amount}/-PT-${hst_tax}RC/-PT-${gst_tax}XG/-PT-${qst_tax}XQ/P1    True
    Verify Specific Remark Is Written In The PNR    RM *MAC/-LK-MAC1/-FOP-APVI4444333322221111/-EXP-0323/-MP-ALL/-BKN-${supplier_confirmation_number}/S3-4/P1    True
    Verify Specific Remark Is Written In The PNR    RIR PAID MAPLE LEAF CF-${supplier_confirmation_number} CAD${base_amount} PLUS 5.50 TAX ON VI/S3-4    True
    Verify Specific Remark Is Written In The PNR    RM *U76/-YES
    Verify Specific Remark Is Not Written In The PNR    RM *U75/-
    Verify Specific Remark Is Not Written In The PNR    RM *U71/-
    Verify Specific Remark Is Written In The PNR    RM *U72/-BETTER FLIGHT TIME
    Verify Specific Remark Is Written In The PNR    RM *U73/-ATH
    Verify Specific Remark Is Written In The PNR    RM *U74/-WEDDING GROUP
    Verify Specific Remark Is Written In The PNR    RM *U77/-PREFERRED OPTION NOT AVAILABLE
    Close Cryptic Display Window

Verify That Matrix Accounting Remarks UDIDs are Deleted in The PNR for APAY
    [Tags]    us8916    us10877
    Open CA Migration Window
    Click Wrap PNR
    Click Panel    Payment
    Click Payment Tab    Matrix Accounting Remark
    Click Add Accounting Line Button
    Select Segment    4
    Create Matrix Accounting Remark    YES    Apay Accounting Remark    CGO    123555    Agency Plastic    Visa
    ...    4444333322221111    0323    COSTS REMARK
    Enter Base Amount    1234.50
    Enter GST Tax Amount    4.00
    Enter HST Tax Amount    3.50
    Enter QST Tax Amount    1.00
    Click Save Button
    Click Payment Delete Button    1
    Confirm Delete
    Click Submit To PNR
    Close CA Migration Window
    Open Cryptic Display Window
    Verify Specific Remark Is Not Written In The PNR    RM *U76/-YES
    Verify Specific Remark Is Not Written In The PNR    RM *U75/-
    Verify Specific Remark Is Not Written In The PNR    RM *U71/-
    Verify Specific Remark Is Not Written In The PNR    RM *U72/-BETTER FLIGHT TIME
    Verify Specific Remark Is Not Written In The PNR    RM *U73/-ATH
    Verify Specific Remark Is Not Written In The PNR    RM *U74/-WEDDING GROUP
    Verify Specific Remark Is Not Written In The PNR    RM *U77/-PREFERRED OPTION NOT AVAILABLE
    Verify Specific Remark Is Written In The PNR    RM *MAC/-SUP-${supplier_code}/-LK-MAC1/-AMT-${base_amount}/-PT-${hst_tax}RC/-PT-${gst_tax}XG/-PT-${qst_tax}XQ/P1    True
    Verify Specific Remark Is Written In The PNR    RM *MAC/-LK-MAC1/-FOP-APVI4444333322221111/-EXP-0323/-MP-ALL/-BKN-${supplier_confirmation_number}/S4/P1    True
    Verify Specific Remark Is Written In The PNR    RIR PAID ${remark_description} CF-${supplier_confirmation_number} CAD${base_amount} PLUS 8.50 TAX ON VI/S4    True
    Close Cryptic Display Window
    Open CA Migration Window
    Click Wrap PNR
    Click Panel    Payment
    Click Payment Tab    Matrix Accounting Remark
    Click Add Accounting Line Button
    Select Segment    3    4
    Create Matrix Accounting Remark    YES    Apay Accounting Remark    AD1    123555    Agency Plastic    Visa
    ...    4444333322221111    0323    MAPLE LEAF
    Enter Base Amount    100.75
    Enter GST Tax Amount    3.00
    Enter HST Tax Amount    2.50
    Enter QST Tax Amount    0.00
    Click Save Button
    Select Is This Air Only?    YES
    Select Flights    BETTER FLIGHT TIME
    Enter Price Vs Other Supplier    ATH
    Enter Group    WEDDING GROUP
    Select Preferred Vendor    PREFERRED OPTION NOT AVAILABLE
    Click Submit To PNR
    Close CA Migration Window
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    RM *U76/-YES
    Verify Specific Remark Is Not Written In The PNR    RM *U75/-
    Verify Specific Remark Is Not Written In The PNR    RM *U71/-
    Verify Specific Remark Is Written In The PNR    RM *U72/-BETTER FLIGHT TIME
    Verify Specific Remark Is Written In The PNR    RM *U73/-ATH
    Verify Specific Remark Is Written In The PNR    RM *U74/-WEDDING GROUP
    Verify Specific Remark Is Written In The PNR    RM *U77/-PREFERRED OPTION NOT AVAILABLE
    Verify Specific Remark Is Written In The PNR    RM *MAC/-SUP-${supplier_code}/-LK-MAC2/-AMT-${base_amount}/-PT-${hst_tax}RC/-PT-${gst_tax}XG/-PT-${qst_tax}XQ/P1    True
    Verify Specific Remark Is Written In The PNR    RM *MAC/-LK-MAC2/-FOP-APVI4444333322221111/-EXP-0323/-MP-ALL/-BKN-${supplier_confirmation_number}/S3-4/P1    True
    Verify Specific Remark Is Written In The PNR    RIR PAID MAPLE LEAF CF-${supplier_confirmation_number} CAD${base_amount} PLUS 5.50 TAX ON VI/S3-4    True
    Close Cryptic Display Window
    Logout To Amadeus Sell Connect
    [Teardown]    Close Browser

Verify That APAY Matrix Accounting Remark Is Written For Other Costs Accounting Remark Type
    [Tags]    us7761    us9850    us10877
    Login To Amadeus Sell Connect
    Enter GDS Command    NM1Lastname/Firstname Mr    NM1Leisure/Amadeus Mr    SS UA1074 Y 20OCT YYZYUL GK2 / 11551440 / ABCDEFG    SS UA1075 Y 25OCT YULYVR GK2 / 11551440 / 1234567    RM*CF/-RBM000000N    APE-TEST@EMAIL.COM
    Open CA Migration Window
    Click Wrap PNR
    Populate Reporting Required Fields
    Click Panel    Payment
    Click Payment Tab    Matrix Accounting Remark
    Click Add Accounting Line Button
    Select Segment    3
    Create Matrix Accounting Remark    YES    Apay Accounting Remark    CGO    76543    Credit Card    CA
    ...    5555555555554444    0122    COSTS REMARK
    Enter Base Amount    1250.05
    Enter GST Tax Amount    12.00
    Enter HST Tax Amount    10.00
    Enter QST Tax Amount    5.40
    Select Passenger    LEISURE-AMADEUS MR
    Click Save Button
    Click Submit To PNR
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    RM *MAC/-SUP-${supplier_code}/-LK-MAC1/-AMT-${base_amount}/-PT-${hst_tax}RC/-PT-${gst_tax}XG/-PT-${qst_tax}XQ/P2    True
    Verify Specific Remark Is Written In The PNR    RM *MAC/-LK-MAC1/-FOP-CCCA5555555555554444/-EXP-0122/-MP-ALL/-BKN-${supplier_confirmation_number}/S3/P2    True
    Verify Specific Remark Is Written In The PNR    RIR PAID ${remark_description} CF-${supplier_confirmation_number} CAD${base_amount} PLUS 27.40 TAX ON CA/S3    True
    Close Cryptic Display Window
    Logout To Amadeus Sell Connect
    [Teardown]    Close Browser

Verify That APAY Matrix Accounting Remark Is Written For Food Costs Accounting Remark Type
    [Tags]    us7761
    Login To Amadeus Sell Connect
    Enter GDS Command    NM1Lastname/Firstname Mr    NM1Leisure/Amadeus Mr    SS UA1074 Y 20OCT YYZYUL GK1 / 11551440 / ABCDEFG    RU1AHK1SIN23OCT-/TYP-TOR/SUC-ZZ/SC-sin/SD-12OCT/ST-0900/EC-sin/ED-12OCT/ET-1800/PS-X    SS AC1075 Y 25OCT YULYVR GK1 / 11551440 / 1234567    RM*CF/-RBM000000N
    ...    RU1AHK1SIN19OCT-CWT RETENTION SEGMENT    APE-123123
    Open CA Migration Window
    Click Wrap PNR
    Populate Reporting Required Fields
    Click Panel    Payment
    Click Payment Tab    Matrix Accounting Remark
    Click Add Accounting Line Button
    Select Segment    5
    Create Matrix Accounting Remark    YES    Apay Accounting Remark    CGO    123555    Credit Card    VI
    ...    4444333322221111    0323    FOOD COSTS
    Enter Base Amount    2125.75
    Enter GST Tax Amount    5.00
    Enter HST Tax Amount    1.00
    Enter QST Tax Amount    2.00
    Click Save Button
    Click Submit To PNR
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    RM *MAC/-SUP-${supplier_code}/-LK-MAC1/-AMT-${base_amount}/-PT-${hst_tax}RC/-PT-${gst_tax}XG/-PT-${qst_tax}XQ    True
    Verify Specific Remark Is Written In The PNR    RM *MAC/-LK-MAC1/-FOP-CCVI4444333322221111/-EXP-0323/-MP-ALL/-BKN-${supplier_confirmation_number}/S4    True
    Verify Specific Remark Is Written In The PNR    RIR PAID ${remark_description} CF-${supplier_confirmation_number} CAD${base_amount} PLUS 8.00 TAX ON VI/S4    True
    Close Cryptic Display Window
    Logout To Amadeus Sell Connect
    [Teardown]    Close Browser

Verify That APAY Matrix Accounting Remark Is Written For Pet Transportation Accounting Remark Type
    [Tags]    us7761
    Login To Amadeus Sell Connect
    Enter GDS Command    NM1Lastname/Firstname Mr    SS UA1074 Y 20OCT YYZYUL GK1 / 11551440 / ABCDEFG    RU1AHK1SIN23OCT-/TYP-TOR/SUC-ZZ/SC-sin/SD-12OCT/ST-0900/EC-sin/ED-12OCT/ET-1800/PS-X    SS AC1075 Y 25OCT YULYVR GK1 / 11551440 / 1234567    RM*CF/-RBM000000N    APE-123123
    Open CA Migration Window
    Click Wrap PNR
    Populate Reporting Required Fields
    Click Panel    Payment
    Click Payment Tab    Matrix Accounting Remark
    Click Add Accounting Line Button
    Select Segment    3
    Create Matrix Accounting Remark    YES    Apay Accounting Remark    CGO    345612    Credit Card    VI
    ...    4444333322221111    0323    PET TRANSPORTATION
    Enter Base Amount    100.50
    Enter GST Tax Amount    15.00
    Enter HST Tax Amount    21.00
    Enter QST Tax Amount    12.00
    Click Save Button
    Click Submit To PNR
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    RM *MAC/-SUP-${supplier_code}/-LK-MAC1/-AMT-${base_amount}/-PT-${hst_tax}RC/-PT-${gst_tax}XG/-PT-${qst_tax}XQ    True
    Verify Specific Remark Is Written In The PNR    RM *MAC/-LK-MAC1/-FOP-CCVI4444333322221111/-EXP-0323/-MP-ALL/-BKN-${supplier_confirmation_number}/S3    True
    Verify Specific Remark Is Written In The PNR    RIR PAID ${remark_description} CF-${supplier_confirmation_number} CAD${base_amount} PLUS 48.00 TAX ON VI/S3    True
    Close Cryptic Display Window
    Logout To Amadeus Sell Connect
    [Teardown]    Close Browser

Verify That Matrix Accounting Remark And UDID Is Written For Limo Accounting Remark When Supplier Is ACJ
    [Tags]    us7991    us8001
    Login To Amadeus Sell Connect
    Enter GDS Command    NM1Lastname/Firstname Mr    NM1Leisure/Amadeus Mr    NM1POLO/LISA Mrs    RU1AHK3SIN12OCT-/TYP-TOR/SUC-ZZ/SC-sin/SD-12OCT/ST-0900/EC-sin/ED-12OCT/ET-1800/PS-X    SS AF1074 Y 20OCT YYZYUL GK3 / 11551440 / ABCDEFG    RM*CF/-RBM000000N
    ...    RU1AHK1SIN21OCT-CWT RETENTION SEGMENT    APE-TEST@EMAIL.COM
    Open CA Migration Window
    Click Wrap PNR
    Click Panel    Payment
    Click Payment Tab    Matrix Accounting Remark
    Click Add Accounting Line Button
    Select Segment    4
    Create Matrix Accounting Remark    NO    Limo Accounting Remark    ACJ    ABC456    Credit Card    VI
    ...    4444333322221111    0323
    Enter Base Amount    100.75
    Enter GST Tax Amount    2.00
    Enter HST Tax Amount    1.00
    Enter QST Tax Amount    3.00
    Enter Other Tax Amount    4.00
    Enter Commission Without Tax Amount    12.00
    Click Save Button
    Populate Reporting Required Fields
    Click Submit To PNR
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    RM *MAC/-SUP-${supplier_code}/-LK-MAC1/-AMT-${base_amount}/-PT-${hst_tax}RC/-PT-${gst_tax}XG/-PT-${qst_tax}XQ/-PT-${other_tax}XT/-CD-${commission_with_tax}/P1    True
    Verify Specific Remark Is Written In The PNR    RM *MAC/-LK-MAC1/-FOP-CCVI4444333322221111/-EXP-0323/-MP-ALL/-BKN-${supplier_confirmation_number}/S4/P1    True
    Verify Specific Remark Is Written In The PNR    RM *U14/-ACPASS-INDIVIDUAL
    Close Cryptic Display Window

Verify That Matrix Accounting Remark And UDID 14 Are Not Duplicated On Update
    [Tags]    us7991    us9850
    Open CA Migration Window
    Click Wrap PNR
    Click Panel    Payment
    Click Payment Tab    Matrix Accounting Remark
    Click Update Button    1
    Verify Matrix Accounting Default Values Are Correct    Non-APAY
    Select Accounting Remark Type    Limo Accounting Remark
    Select Matrix Form Of Payment    Cash
    Enter Base Amount    111.00
    Enter GST Tax Amount    3.44
    Enter HST Tax Amount    5.11
    Enter QST Tax Amount    6.00
    Enter Other Tax Amount    12.00
    Enter Commission Without Tax Amount    51.00
    Select Passenger    LEISURE-AMADEUS MR
    Click Save Button
    Click Submit To PNR
    Close CA Migration Window
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    RM *MAC/-SUP-${supplier_code}/-LK-MAC1/-AMT-${base_amount}/-PT-${hst_tax}RC/-PT-${gst_tax}XG/-PT-${qst_tax}XQ/-PT-${other_tax}XT/-CD-${commission_with_tax}/P2    True
    Verify Specific Remark Is Written In The PNR    RM *MAC/-LK-MAC1/-FOP-CA/-MP-ALL/-BKN-${supplier_confirmation_number}/S4/P2    True
    Verify Specific Remark Is Only Written Once    RM *U14/-ACPASS-INDIVIDUAL
    Close Cryptic Display Window
    Logout To Amadeus Sell Connect
    [Teardown]    Close Browser

Verify That Warning Is Displayed When Updating Matrix Accounting Remark
    [Tags]    de2086
    Login To Amadeus Sell Connect
    Enter GDS Command    NM1Lastname/Firstname Mr    NM1Leisure/Amadeus Mr    NM1POLO/LISA Mrs    SS UA1074 Y 20OCT YYZYUL GK3 / 11551440 / ABCDEFG    SS UA1075 Y 25OCT YULYVR GK3 / 11551440 / 1234567    RM*CF/-RBM000000N
    ...    APE-TEST@EMAIL.COM
    Open CA Migration Window
    Click Wrap PNR
    Populate Reporting Required Fields
    Click Panel    Payment
    Click Payment Tab    Matrix Accounting Remark
    Click Add Accounting Line Button
    Select Segment    4
    Create Matrix Accounting Remark    YES    Apay Accounting Remark    PFS    123555    Credit Card    VI
    ...    4444333322221111    0323    SEAT COSTS
    Enter Base Amount    100.75
    Enter GST Tax Amount    2.00
    Enter HST Tax Amount    1.00
    Enter QST Tax Amount    0.00
    Select Passenger    POLO-LISA MR
    Click Save Button
    Click Add Accounting Line Button
    Select Segment    4
    Create Matrix Accounting Remark    NO    Tour Accounting Remark    AD1    ABC4567891EFG4567890    Credit Card    Visa
    ...    4444333322221111    0323
    Enter Base Amount    100.75
    Enter GST Tax Amount    2.00
    Enter HST Tax Amount    1.00
    Enter QST Tax Amount    3.00
    Enter Other Tax Amount    4.00
    Enter Commission Without Tax Amount    12.00
    Click Save Button
    Select Is This Air Only?    NO
    Select Exclusive Property    YES
    Enter Hotel/ Property Name    Cozy Arms Hotel
    Select Flights    BETTER FLIGHT TIME
    Enter Price Vs Other Supplier    300pp
    Enter Group    FAMILY GROUP
    Select Preferred Vendor    PREFERRED OPTION NOT AVAILABLE
    Click Submit To PNR
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    RM *MAC/-SUP-PFS/-LK-MAC1/-AMT-100.75/-PT-1.00RC/-PT-2.00XG/-PT-0.00XQ/P3    True
    Verify Specific Remark Is Written In The PNR    RM *MAC/-LK-MAC1/-FOP-CCVI4444333322221111/-EXP-0323/-MP-ALL/-BKN-123555/S4/P3    True
    Verify Specific Remark Is Written In The PNR    RIR PAID SEAT COSTS CF-123555 CAD100.75 PLUS 3.00 TAX ON VI/S4    True
    Verify Specific Remark Is Written In The PNR    RM *MAC/-SUP-AD1/-LK-MAC2/-AMT-100.75/-PT-1.00RC/-PT-2.00XG/-PT-3.00XQ/-PT-4.00XT/-CD-12.00/P1    True
    Verify Specific Remark Is Written In The PNR    RM *MAC/-LK-MAC2/-FOP-CCVI4444333322221111/-EXP-0323/-MP-ALL/-BKN-ABC4567891EFG4567890/S4/P1    True
    Verify Specific Remark Is Written In The PNR    RM *U76/-NO
    Verify Specific Remark Is Written In The PNR    RM *U71/-YES
    Verify Specific Remark Is Written In The PNR    RM *U75/-COZY ARMS HOTEL
    Verify Specific Remark Is Written In The PNR    RM *U72/-BETTER FLIGHT TIME
    Verify Specific Remark Is Written In The PNR    RM *U73/-300PP
    Verify Specific Remark Is Written In The PNR    RM *U74/-FAMILY GROUP
    Verify Specific Remark Is Written In The PNR    RM *U77/-PREFERRED OPTION NOT AVAILABLE
    Close Cryptic Display Window
    Open CA Migration Window
    Click Wrap PNR
    Click Panel    Payment
    Click Payment Tab    Matrix Accounting Remark
    Click Update Button    1
    Select Accounting Remark Type    Apay Accounting Remark
    Enter Credit Card Number    4444333322221111
    Click Save Button
    Click Submit To PNR
    Verify Pop-Up Warning Is Displayed
    Click Update Button    2
    Select Accounting Remark Type    Tour Accounting Remark
    Enter Supplier Code    AD1
    Enter Credit Card Number    4444333322221111
    Click Save Button
    Click Submit To PNR
    Close CA Migration Window
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    RM *MAC/-SUP-PFS/-LK-MAC1/-AMT-100.75/-PT-1.00RC/-PT-2.00XG/-PT-0.00XQ/P3    True
    Verify Specific Remark Is Written In The PNR    RM *MAC/-LK-MAC1/-FOP-CCVI4444333322221111/-EXP-0323/-MP-ALL/-BKN-123555/S4/P3    True
    Verify Specific Remark Is Written In The PNR    RIR PAID SEAT COSTS CF-123555 CAD100.75 PLUS 3.00 TAX ON VI/S4    True
    Verify Specific Remark Is Written In The PNR    RM *MAC/-SUP-AD1/-LK-MAC2/-AMT-100.75/-PT-1.00RC/-PT-2.00XG/-PT-3.00XQ/-PT-4.00XT/-CD-12.00/P1    True
    Verify Specific Remark Is Written In The PNR    RM *MAC/-LK-MAC2/-FOP-CCVI4444333322221111/-EXP-0323/-MP-ALL/-BKN-ABC4567891EFG4567890/S4/P1    True
    Verify Specific Remark Is Written In The PNR    RM *U76/-NO
    Verify Specific Remark Is Written In The PNR    RM *U71/-YES
    Verify Specific Remark Is Written In The PNR    RM *U75/-COZY ARMS HOTEL
    Verify Specific Remark Is Written In The PNR    RM *U72/-BETTER FLIGHT TIME
    Verify Specific Remark Is Written In The PNR    RM *U73/-300PP
    Verify Specific Remark Is Written In The PNR    RM *U74/-FAMILY GROUP
    Verify Specific Remark Is Written In The PNR    RM *U77/-PREFERRED OPTION NOT AVAILABLE
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
    Verify Specific Remark Is Written In The PNR    RM *MAC/-SUP-PFS/-LK-MAC1/-AMT-100.75/-PT-1.00RC/-PT-2.00XG/-PT-0.00XQ/P3    True
    Verify Specific Remark Is Written In The PNR    RM *MAC/-LK-MAC1/-FOP-CCVI4444333322221111/-EXP-0323/-MP-ALL/-BKN-123555/S4/P3    True
    Verify Specific Remark Is Written In The PNR    RIR PAID SEAT COSTS CF-123555 CAD100.75 PLUS 3.00 TAX ON VI/S4    True
    Verify Specific Remark Is Written In The PNR    RM *MAC/-SUP-AD1/-LK-MAC2/-AMT-100.75/-PT-1.00RC/-PT-2.00XG/-PT-3.00XQ/-PT-4.00XT/-CD-12.00/P1    True
    Verify Specific Remark Is Written In The PNR    RM *MAC/-LK-MAC2/-FOP-CCVI4444333322221111/-EXP-0323/-MP-ALL/-BKN-ABC4567891EFG4567890/S4/P1    True
    Verify Specific Remark Is Written In The PNR    RM *MAC/-SUP-MLF/-LK-MAC3/-AMT-123.00/-PT-4.00RC/-PT-5.00XG/-PT-3.00XQ/-CP-10.00    True
    Verify Specific Remark Is Written In The PNR    RM *MAC/-LK-MAC3/-FOP-CCVI4444333322221111/-EXP-0921/-MP-ALL/-BKN-CWT112233/S4    True
    Verify Specific Remark Is Written In The PNR    RM *U76/-NO
    Verify Specific Remark Is Written In The PNR    RM *U71/-YES
    Verify Specific Remark Is Written In The PNR    RM *U75/-COZY ARMS HOTEL
    Verify Specific Remark Is Written In The PNR    RM *U72/-BETTER FLIGHT TIME
    Verify Specific Remark Is Written In The PNR    RM *U73/-300PP
    Verify Specific Remark Is Written In The PNR    RM *U74/-FAMILY GROUP
    Verify Specific Remark Is Written In The PNR    RM *U77/-PREFERRED OPTION NOT AVAILABLE
    Close Cryptic Display Window
    Logout To Amadeus Sell Connect
    [Teardown]    Close Browser

Verify That Warning Is Displayed When Deleting Matrix Accounting Remark
    [Tags]    de2086
    Login To Amadeus Sell Connect
    Enter GDS Command    NM1Lastname/Firstname Mr    NM1Leisure/Amadeus Mr    NM1POLO/LISA Mrs    SS UA1074 Y 20OCT YYZYUL GK3 / 11551440 / ABCDEFG    SS UA1075 Y 25 YULYVR GK3 / 11551440 / 1234567    RM*CF/-RBM000000N
    ...    APE-TEST@EMAIL.COM
    Open CA Migration Window
    Click Wrap PNR
    Populate Reporting Required Fields
    Click Panel    Payment
    Click Payment Tab    Matrix Accounting Remark
    Click Add Accounting Line Button
    Select Segment    4
    Create Matrix Accounting Remark    YES    Apay Accounting Remark    PFS    123555    Credit Card    VI
    ...    4444333322221111    0323    SEAT COSTS
    Enter Base Amount    100.75
    Enter GST Tax Amount    2.00
    Enter HST Tax Amount    1.00
    Enter QST Tax Amount    0.00
    Select Passenger    POLO-LISA MR
    Click Save Button
    Click Add Accounting Line Button
    Select Segment    4
    Create Matrix Accounting Remark    NO    Tour Accounting Remark    AD1    ABC4567891EFG4567890    Credit Card    Visa
    ...    4444333322221111    0323
    Enter Base Amount    100.75
    Enter GST Tax Amount    2.00
    Enter HST Tax Amount    1.00
    Enter QST Tax Amount    3.00
    Enter Other Tax Amount    4.00
    Enter Commission Without Tax Amount    12.00
    Click Save Button
    Select Is This Air Only?    NO
    Select Exclusive Property    YES
    Enter Hotel/ Property Name    Cozy Arms Hotel
    Select Flights    BETTER FLIGHT TIME
    Enter Price Vs Other Supplier    300pp
    Enter Group    FAMILY GROUP
    Select Preferred Vendor    PREFERRED OPTION NOT AVAILABLE
    Click Submit To PNR
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    RM *MAC/-SUP-PFS/-LK-MAC1/-AMT-100.75/-PT-1.00RC/-PT-2.00XG/-PT-0.00XQ/P3    True
    Verify Specific Remark Is Written In The PNR    RM *MAC/-LK-MAC1/-FOP-CCVI4444333322221111/-EXP-0323/-MP-ALL/-BKN-123555/S4/P3    True
    Verify Specific Remark Is Written In The PNR    RIR PAID SEAT COSTS CF-123555 CAD100.75 PLUS 3.00 TAX ON VI/S4    True
    Verify Specific Remark Is Written In The PNR    RM *MAC/-SUP-AD1/-LK-MAC2/-AMT-100.75/-PT-1.00RC/-PT-2.00XG/-PT-3.00XQ/-PT-4.00XT/-CD-12.00/P1    True
    Verify Specific Remark Is Written In The PNR    RM *MAC/-LK-MAC2/-FOP-CCVI4444333322221111/-EXP-0323/-MP-ALL/-BKN-ABC4567891EFG4567890/S4/P1    True
    Verify Specific Remark Is Written In The PNR    RM *U76/-NO
    Verify Specific Remark Is Written In The PNR    RM *U71/-YES
    Verify Specific Remark Is Written In The PNR    RM *U75/-COZY ARMS HOTEL
    Verify Specific Remark Is Written In The PNR    RM *U72/-BETTER FLIGHT TIME
    Verify Specific Remark Is Written In The PNR    RM *U73/-300PP
    Verify Specific Remark Is Written In The PNR    RM *U74/-FAMILY GROUP
    Verify Specific Remark Is Written In The PNR    RM *U77/-PREFERRED OPTION NOT AVAILABLE
    Close Cryptic Display Window
    Open CA Migration Window
    Click Wrap PNR
    Click Panel    Payment
    Click Payment Tab    Matrix Accounting Remark
    Click Payment Delete Button    1
    Confirm Delete
    Click Submit To PNR
    Verify Pop-Up Warning Is Displayed
    Click Update Button    1
    Select Accounting Remark Type    Tour Accounting Remark
    Enter Supplier Code    AD1
    Enter Credit Card Number    4444333322221111
    Click Save Button
    Click Submit To PNR
    Close CA Migration Window
    Open Cryptic Display Window
    Verify Specific Remark Is Not Written In The PNR    RM *MAC/-SUP-PFS/-LK-MAC1/-AMT-100.75/-PT-1.00RC/-PT-2.00XG/-PT-0.00XQ/P3    True
    Verify Specific Remark Is Not Written In The PNR    RM *MAC/-LK-MAC1/-FOP-CCVI4444333322221111/-EXP-0323/-MP-ALL/-BKN-123555/S4/P3    True
    Verify Specific Remark Is Not Written In The PNR    RIR PAID SEAT COSTS CF-123555 CAD100.75 PLUS 3.00 TAX ON VI/S4    True
    Verify Specific Remark Is Written In The PNR    RM *MAC/-SUP-AD1/-LK-MAC1/-AMT-100.75/-PT-1.00RC/-PT-2.00XG/-PT-3.00XQ/-PT-4.00XT/-CD-12.00/P1    True
    Verify Specific Remark Is Written In The PNR    RM *MAC/-LK-MAC1/-FOP-CCVI4444333322221111/-EXP-0323/-MP-ALL/-BKN-ABC4567891EFG4567890/S4/P1    True
    Verify Specific Remark Is Written In The PNR    RM *U76/-NO
    Verify Specific Remark Is Written In The PNR    RM *U71/-YES
    Verify Specific Remark Is Written In The PNR    RM *U75/-COZY ARMS HOTEL
    Verify Specific Remark Is Written In The PNR    RM *U72/-BETTER FLIGHT TIME
    Verify Specific Remark Is Written In The PNR    RM *U73/-300PP
    Verify Specific Remark Is Written In The PNR    RM *U74/-FAMILY GROUP
    Verify Specific Remark Is Written In The PNR    RM *U77/-PREFERRED OPTION NOT AVAILABLE
    Close Cryptic Display Window
    Logout To Amadeus Sell Connect
    [Teardown]    Close Browser

*** Keywords ***
Verify Matrix Accounting Default Values Are Correct
    [Arguments]    ${matrix_accounting}    ${is_ticket_blank}=True
    ${default_supplier_code}    Get Element Attribute    xpath=//input[@id='supplierCodeName']    ng-reflect-model
    Should Be Equal    ${default_supplier_code}    ${supplier_code}
    ${default_confirmation_no}    Get Element Attribute    xpath=//input[@id='supplierConfirmatioNo']    ng-reflect-model
    Should Be Equal    ${default_confirmation_no}    ${supplier_confirmation_number}
    ${default_base_amount}    Get Element Attribute    xpath=//input[@id='baseAmount']    ng-reflect-model
    Should Be Equal    ${default_base_amount}    ${base_amount}
    ${default_gst_tax}    Get Element Attribute    xpath=//input[@id='gst']    ng-reflect-model
    Should Be Equal    ${default_gst_tax}    ${gst_tax}
    ${default_hst_tax}    Get Element Attribute    xpath=//input[@id='hst']    ng-reflect-model
    Should Be Equal    ${default_hst_tax}    ${hst_tax}
    ${default_qst_tax}    Get Element Attribute    xpath=//input[@id='qst']    ng-reflect-model
    Should Be Equal    ${default_qst_tax}    ${qst_tax}
    ${default_ticket_number}    Run Keyword If    "${is_ticket_blank}" == "False"    Get Element Attribute    css=#tktLine
    Run Keyword If    "${is_ticket_blank}" == "False"    Should Be Equal    ${default_ticket_number}    ${ticket_number}
