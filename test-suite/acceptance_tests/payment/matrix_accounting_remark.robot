*** Settings ***
Resource          ../../resources/common/global_resources.robot

*** Test Cases ***
Verify That Matrix Accounting Remark Is Written For Tour Accounting Remark Type
    [Tags]    US7747    US8001
    Login To Amadeus Sell Connect
    Enter GDS Command    NM1Lastname/Firstname Mr    NM1Leisure/Amadeus Mr    NM1POLO/LISA Mrs    RU1AHK3SIN12DEC-/TYP-TOR/SUC-ZZ/SC-sin/SD-12dec/ST-0900/EC-sin/ED-12dec/ET-1800/PS-X    SS AC1074 Y 20DEC YYZYUL GK3 / 11551440 / ABCDEFG    RM*CF/-RBM000000N
    ...    APETEST@EMAIL.COM    TKOK
    Open CA Migration Window
    Click Load PNR
    Click Panel    Payment
    Click Payment Tab    Matrix Accounting Remark
    Click Add Accounting Line Button
    Select Segment    4
    Create Matrix Accounting Remark    NO    Tour Accounting Remark    AD1    ABC4567891EFG4567890    Credit Card    VI
    ...    4444333322221111    0323
    Enter Base Amount    100.75
    Enter GST Tax Amount    2.00
    Enter HST Tax Amount    1.00
    Enter QST Tax Amount    3.00
    Enter Other Tax Amount    4.00
    Enter Commission With Tax Amount    12.00
    Click Element    css=#qst
    Click Save Button
    #insert us8001 test case here
    Select Is This Air Only?    NO
    Select Exclusive Property    YES
    Enter Hotel/ Property Name    Cozy Arms Hotel
    Select Flights    BETTER FLIGHT TIME
    Enter Price Vs Other Supplier    300pp
    Enter Group    FAMILY GROUP
    Select Preferred Vendor    PREFERRED OPTION NOT AVAILABLE
    Click Panel    Reporting
    Select Routing Code    Europe-incl. Morocco/Tunisia/Algeria/Greenland
    Enter Destination Code    SIN
    Select If PNR Travel to Any Countries Listed    NIGERIA
    Click Submit To PNR
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    RM *MAC/-SUP-${supplier_code}/-LK-MAC1/-AMT-${base_amount}/-PT-${hst_tax}RC/-PT-${gst_tax}XG/-PT-${qst_tax}XQ/-PT-${other_tax}XT/-CD-${commission_with_tax}    True
    Verify Specific Remark Is Written In The PNR    RM *MAC/-LK-MAC1/-FOP-CC${cc_vendor_code}XXXXXXXXXXXX1111/-EXP-0323/-MP-ALL/-BKN-${supplier_confirmation_number}/S4    True
    Verify Specific Remark Is Written In The PNR    RM *U76/-NO
    Verify Specific Remark Is Written In The PNR    RM *U71/-YES
    Verify Specific Remark Is Written In The PNR    RM *U75/-COZY ARMS HOTEL
    Verify Specific Remark Is Written In The PNR    RM *U72/-BETTER FLIGHT TIME
    Verify Specific Remark Is Written In The PNR    RM *U73/-300PP
    Verify Specific Remark Is Written In The PNR    RM *U74/-FAMILY GROUP
    Verify Specific Remark Is Written In The PNR    RM *U77/-PREFERRED OPTION NOT AVAILABLE
    Close Cryptic Display Window
    Switch To Command Page

Verify That Matrix Accounting Remark Is Updated For Tour Accounting Remark Type
    [Tags]    us8583
    Open CA Migration Window
    Click Load PNR
    Click Panel    Reporting
    Select If PNR Travel to Any Countries Listed    NIGERIA
    Click Panel    Payment
    Click Payment Tab    Matrix Accounting Remark
    Click Payment Update Button    1
    Verify Matrix Accounting Default Values Are Correct    Non-APAY
    Select Accounting Remark Type    Tour Accounting Remark
    Enter Supplier Code    AAA
    Select Matrix Form Of Payment    Cash
    Enter Base Amount    111.00
    Enter GST Tax Amount    3.44
    Enter HST Tax Amount    5.11
    Enter QST Tax Amount    6.00
    Enter Other Tax Amount    12.00
    Enter Commission With Tax Amount    51.00
    Click Element    css=#qst
    Click Save Button
    Click Submit To PNR
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    RM *MAC/-SUP-${supplier_code}/-LK-MAC1/-AMT-${base_amount}/-PT-${hst_tax}RC/-PT-${gst_tax}XG/-PT-${qst_tax}XQ/-PT-${other_tax}XT/-CD-${commission_with_tax}    True
    Verify Specific Remark Is Written In The PNR    RM *MAC/-LK-MAC1/-FOP-CA/-MP-ALL/-BKN-${supplier_confirmation_number}/S4    True
    Close Cryptic Display Window
    Logout To Amadeus Sell Connect
    [Teardown]    Close Browser

Verify That Matrix Accounting Remark Is Written For Cruise Accounting Remark Type
    [Tags]    US7747    US8001
    Login To Amadeus Sell Connect
    Enter GDS Command    NM1Lastname/Firstname Mr    NM1Leisure/Amadeus Mr    NM1POLO/LISA Mrs    SS AC1074 Y 20DEC YYZYUL GK3 / 11551440 / ABCDEFG    RU1AHK3KEL12NOV-/TYP-SEA/SUN-STENA LINE/SUC-ZZ/SC-KEL/SD-12NOV/ST-1800OSL/ED-13NOV/ET-0800/CF-12345    RM*CF/-RBM0000000N
    ...    APETest@email.com    TKOK
    Open CA Migration Window
    Click Load PNR
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
    Enter Commission With Tax Amount    10.50
    Click Element    css=#qst
    Click Save Button
    #insert us8001 test case here
    Select Is This Air Only?    YES
    Select Flights    DIRECT FLIGHTS
    Enter Price Vs Other Supplier    ATH
    Select Preferred Vendor    PREFERRED OPTION DECLINED
    Click Panel    Reporting
    Select Routing Code    Europe-incl. Morocco/Tunisia/Algeria/Greenland
    Enter Destination Code    SIN
    Select If PNR Travel to Any Countries Listed    NIGERIA
    Click Submit To PNR
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    RM *MAC/-SUP-${supplier_code}/-LK-MAC1/-AMT-${base_amount}/-PT-${hst_tax}RC/-PT-${gst_tax}XG/-PT-${qst_tax}XQ/-PT-${other_tax}XT/-CD-${commission_with_tax}    True
    Verify Specific Remark Is Written In The PNR    RM *MAC/-LK-MAC1/-FOP-CA/-TK-${ticket_number}/-MP-ALL/-BKN-${supplier_confirmation_number}/S5    True
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
    Click Load PNR
    Click Panel    Reporting
    Select If PNR Travel to Any Countries Listed    NIGERIA
    Click Panel    Payment
    Click Payment Tab    Matrix Accounting Remark
    Click Payment Update Button    1
    Select Accounting Remark Type    Cruise Accounting Remark
    Enter Supplier Code    AD1
    Click Element    css=#qst
    Click Save Button
    Click Submit To PNR
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    RM *MAC/-SUP-${supplier_code}/-LK-MAC1/-AMT-${base_amount}/-PT-${hst_tax}RC/-PT-${gst_tax}XG/-PT-${qst_tax}XQ/-PT-${other_tax}XT/-CD-${commission_with_tax}    True
    Verify Specific Remark Is Written In The PNR    RM *MAC/-LK-MAC1/-FOP-CA/-TK-${ticket_number}/-MP-ALL/-BKN-${supplier_confirmation_number}/S5    True
    Verify Specific Remark Is Written In The PNR    RM *U76/-YES
    Verify Specific Remark Is Not Written In The PNR    RM *U75/-
    Verify Specific Remark Is Not Written In The PNR    RM *U71/-
    Verify Specific Remark Is Written In The PNR    RM *U72/-DIRECT FLIGHTS
    Verify Specific Remark Is Written In The PNR    RM *U73/-ATH
    Verify Specific Remark Is Not Written In The PNR    RM *U74/-
    Verify Specific Remark Is Written In The PNR    RM *U77/-PREFERRED OPTION DECLINED
    Close Cryptic Display Window
    Open CA Migration Window
    Click Load PNR
    Click Panel    Reporting
    Select If PNR Travel to Any Countries Listed    NIGERIA
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
    Enter Commission With Tax Amount    10.50
    Enter Ticket Number    52352525
    Click Element    css=#qst
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
    Click Load PNR
    Click Panel    Reporting
    Select If PNR Travel to Any Countries Listed    NIGERIA
    Click Panel    Payment
    Click Payment Tab    Matrix Accounting Remark
    Click Payment Delete Button    1
    Confirm Delete
    Click Submit To PNR
    Close CA Migration Window
    Open Cryptic Display Window
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
    [Tags]    us7747
    Login To Amadeus Sell Connect
    Enter GDS Command    NM1Lastname/Firstname Mr    NM1Leisure/Amadeus Mr    NM1POLO/LISA Mrs    RU1AHK1SIN12DEC-/TYP-TOR/SUC-ZZ/SC-sin/SD-12dec/ST-0900/EC-sin/ED-12dec/ET-1800/PS-X    RU1AHK1BRU12NOV-/TYP-TRN/SUN-NS/SUC-YY/SC-BEBMI/SD-12NOV/ST-1010/EC-DEFRH/ED-12NOV/ET-1320/CF-12345    RM*CF/-RBM000000N
    ...    APE1234    TKOK
    Open CA Migration Window
    Click Load PNR
    Click Panel    Reporting
    Select Routing Code    Europe-incl. Morocco/Tunisia/Algeria/Greenland
    Enter Destination Code    SIN
    Select If PNR Travel to Any Countries Listed    NIGERIA
    Click Panel    Payment
    Click Payment Tab    Matrix Accounting Remark
    Click Add Accounting Line Button
    Select Segment    5
    Create Matrix Accounting Remark    NO    Rail Accounting Remark    ASC    ABC4567891    Agency Plastic
    Enter Base Amount    230.50
    Enter GST Tax Amount    4.00
    Enter HST Tax Amount    3.00
    Enter QST Tax Amount    0.00
    Enter Ticket Number    123456789
    Enter Other Tax Amount    0.00
    Enter Commission With Tax Amount    20.50
    Click Element    css=#qst
    Click Save Button
    Click Submit To PNR
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    RM *MAC/-SUP-${supplier_code}/-LK-MAC1/-AMT-${base_amount}/-PT-${hst_tax}RC/-PT-${gst_tax}XG/-PT-${qst_tax}XQ/-PT-${other_tax}XT/-CD-${commission_with_tax}    True
    Verify Specific Remark Is Written In The PNR    RM *MAC/-LK-MAC1/-FOP-APVIXXXXXXXXXXXX1111/-EXP-1229/-TK-${ticket_number}/-MP-ALL/-BKN-${supplier_confirmation_number}/S5    True
    Close Cryptic Display Window
    Logout To Amadeus Sell Connect
    [Teardown]    Close Browser

Verify That Matrix Accounting Remark Is Written For NonBSP Air Accounting Remark Type
    [Tags]    us7747
    Login To Amadeus Sell Connect
    Enter GDS Command    NM1Lastname/Firstname Mr    NM1Leisure/Amadeus Mr    NM1POLO/LISA Mrs    RU1AHK3SIN12DEC-/TYP-TOR/SUC-ZZ/SC-sin/SD-12dec/ST-0900/EC-sin/ED-12dec/ET-1800/PS-X    SS AC1074 Y 20DEC YYZYUL GK3 / 11551440 / ABCDEFG    SS AC1075 Y 25DEC YULYVR GK3 / 11551440 / 1234567
    ...    RM*CF/-RBM000000N    APE1235    TKOK
    Open CA Migration Window
    Click Load PNR
    Click Panel    Reporting
    Select Routing Code    Europe-incl. Morocco/Tunisia/Algeria/Greenland
    Enter Destination Code    SIN
    Select If PNR Travel to Any Countries Listed    NIGERIA
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
    Enter Commission With Tax Amount    11.25
    Click Element    css=#qst
    Click Save Button
    Click Submit To PNR
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    RM *MAC/-SUP-${supplier_code}/-LK-MAC1/-AMT-${base_amount}/-PT-${hst_tax}RC/-PT-${gst_tax}XG/-PT-${qst_tax}XQ/-PT-${other_tax}XT/-CD-${commission_with_tax}    True
    Verify Specific Remark Is Written In The PNR    RM *MAC/-LK-MAC1/-FOP-CK/-TK-${ticket_number}/-MP-ALL/-BKN-${supplier_confirmation_number}/S5-6    True
    Close Cryptic Display Window
    Logout To Amadeus Sell Connect
    [Teardown]    Close Browser

Verify That Matrix Accounting Remark Is Written For NonBSP Air Accounting Remark Type With Other Supplier Code
    [Tags]    us7747
    Login To Amadeus Sell Connect
    Enter GDS Command    NM1Lastname/Firstname Mr    NM1Leisure/Amadeus Mr    SS AC1074 Y 20DEC YYZYUL GK1 / 11551440 / ABCDEFG    RU1AHK1SIN23DEC-/TYP-TOR/SUC-ZZ/SC-sin/SD-12dec/ST-0900/EC-sin/ED-12dec/ET-1800/PS-X    SS AC1075 Y 25DEC YULYVR GK1 / 11551440 / 1234567    RM*CF/-RBM000000N
    ...    APE21345    TKOK
    Open CA Migration Window
    Click Load PNR
    Click Panel    Reporting
    Select Routing Code    Europe-incl. Morocco/Tunisia/Algeria/Greenland
    Enter Destination Code    SIN
    Select If PNR Travel to Any Countries Listed    NIGERIA
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
    Enter Commission With Tax Amount    10.50
    Click Element    css=#qst
    Click Save Button
    Click Submit To PNR
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    RM *MAC/-SUP-${supplier_code}/-LK-MAC1/-AMT-${base_amount}/-PT-${hst_tax}RC/-PT-${gst_tax}XG/-PT-${qst_tax}XQ/-PT-${other_tax}XT/-CD-${commission_with_tax}    True
    Verify Specific Remark Is Written In The PNR    RM *MAC/-LK-MAC1/-FOP-CA/-TK-${ticket_number}/-MP-ALL/-BKN-${supplier_confirmation_number}/S3,5    True
    Close Cryptic Display Window
    Logout To Amadeus Sell Connect
    [Teardown]    Close Browser

Verify That APAY Matrix Accounting Remark Is Written For Seat Costs Accounting Remark Type
    [Tags]    us7761
    Login To Amadeus Sell Connect
    Enter GDS Command    NM1Lastname/Firstname Mr    NM1Leisure/Amadeus Mr    NM1POLO/LISA Mrs    SS AC1074 Y 20DEC YYZYUL GK3 / 11551440 / ABCDEFG    SS AC1075 Y 25DEC YULYVR GK3 / 11551440 / 1234567    RM*CF/-RBM000000N
    ...    APETEST@EMAIL.COM    TKOK
    Open CA Migration Window
    Click Load PNR
    Click Panel    Reporting
    Select Routing Code    Asia incl. India
    Enter Destination Code    CDG
    Select If PNR Travel to Any Countries Listed    NONE OF THE ABOVE
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
    Click Element    css=#qst
    Click Save Button
    Click Submit To PNR
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    RM *MAC/-SUP-${supplier_code}/-LK-MAC1/-AMT-${base_amount}/-PT-${hst_tax}RC/-PT-${gst_tax}XG/-PT-${qst_tax}XQ    True
    Verify Specific Remark Is Written In The PNR    RM *MAC/-LK-MAC1/-FOP-CCVIXXXXXXXXXXXX1111/-EXP-0323/-MP-ALL/-BKN-${supplier_confirmation_number}/S4    True
    Verify Specific Remark Is Written In The PNR    RIR PAID ${remark_description} CF-${supplier_confirmation_number} CAD${base_amount} PLUS 3.00 TAX ON VI/S4    True
    Close Cryptic Display Window

Verify That APAY Matrix Accounting Remark Is Updated For Seat Costs Accounting Remark Type
    [Tags]    us8583
    Open CA Migration Window
    Click Load PNR
    Click Panel    Reporting
    Select If PNR Travel to Any Countries Listed    NONE OF THE ABOVE
    Click Panel    Payment
    Click Payment Tab    Matrix Accounting Remark
    Click Payment Update Button    1
    Verify Matrix Accounting Default Values Are Correct    APAY
    Select Matrix Form Of Payment    RBC Points
    Enter Base Amount    111.00
    Enter GST Tax Amount    3.44
    Enter HST Tax Amount    5.11
    Enter QST Tax Amount    6.00
    Click Element    css=#qst
    Click Save Button
    Click Submit To PNR
    Close CA Migration Window
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    RM *MAC/-SUP-${supplier_code}/-LK-MAC1/-AMT-${base_amount}/-PT-${hst_tax}RC/-PT-${gst_tax}XG/-PT-${qst_tax}XQ    True
    Verify Specific Remark Is Written In The PNR    RM *MAC/-LK-MAC1/-FOP-CK/-MP-ALL/-BKN-${supplier_confirmation_number}/S4    True
    Verify Specific Remark Is Written In The PNR    RIR PAID ${remark_description} CF-${supplier_confirmation_number} CAD${base_amount} PLUS 14.55 TAX ON CK/S4    True
    Close Cryptic Display Window
    Logout To Amadeus Sell Connect
    [Teardown]    Close Browser

Verify That APAY Matrix Accounting Remark Is Written For Maple Leaf Accounting Remark Type
    [Tags]    us7761
    Login To Amadeus Sell Connect
    Enter GDS Command    NM1Lastname/Firstname Mr    NM1Leisure/Amadeus Mr    SS AC1074 Y 20DEC YYZYUL GK1 / 11551440 / ABCDEFG    SS AC1075 Y 25DEC YULYVR GK1 / 11551440 / 1234567    RM*CF/-RBM000000N
    Open CA Migration Window
    Click Load PNR
    Click Panel    Reporting
    Select Routing Code    Asia incl. India
    Enter Destination Code    CDG
    Select If PNR Travel to Any Countries Listed    NONE OF THE ABOVE
    Click Panel    Payment
    Click Payment Tab    Matrix Accounting Remark
    Click Add Accounting Line Button
    Select Segment    3    4
    Create Matrix Accounting Remark    YES    Apay Accounting Remark    AD1    123555    Agency Plastic    ${EMPTY}
    ...    \    \    MAPLE LEAF
    Enter Base Amount    100.75
    Enter GST Tax Amount    3.00
    Enter HST Tax Amount    2.50
    Enter QST Tax Amount    0.00
    Click Element    css=#qst
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
    Verify Specific Remark Is Written In The PNR    RM *MAC/-SUP-${supplier_code}/-LK-MAC1/-AMT-${base_amount}/-PT-${hst_tax}RC/-PT-${gst_tax}XG/-PT-${qst_tax}XQ    True
    Verify Specific Remark Is Written In The PNR    RM *MAC/-LK-MAC1/-FOP-APVIXXXXXXXXXXXX1111/-EXP-1229/-MP-ALL/-BKN-${supplier_confirmation_number}/S3-4    True
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
    [Tags]    us8916
    Open CA Migration Window
    Click Load PNR
    Click Panel    Reporting
    Select If PNR Travel to Any Countries Listed    NONE OF THE ABOVE
    Click Panel    Payment
    Click Payment Tab    Matrix Accounting Remark
    Click Add Accounting Line Button
    Select Segment    4
    Create Matrix Accounting Remark    YES    Apay Accounting Remark    CGO    123555    Agency Plastic    ${EMPTY}
    ...    \    \    COSTS REMARK
    Enter Base Amount    1234.50
    Enter GST Tax Amount    4.00
    Enter HST Tax Amount    3.50
    Enter QST Tax Amount    1.00
    Click Element    css=#qst
    Click Save Button
    Sleep    5
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
    Verify Specific Remark Is Written In The PNR    RM *MAC/-SUP-${supplier_code}/-LK-MAC1/-AMT-${base_amount}/-PT-${hst_tax}RC/-PT-${gst_tax}XG/-PT-${qst_tax}XQ    True
    Verify Specific Remark Is Written In The PNR    RM *MAC/-LK-MAC1/-FOP-APVIXXXXXXXXXXXX1111/-EXP-1229/-MP-ALL/-BKN-${supplier_confirmation_number}/S4    True
    Verify Specific Remark Is Written In The PNR    RIR PAID ${remark_description} CF-${supplier_confirmation_number} CAD${base_amount} PLUS 8.50 TAX ON VI/S4    True
    Close Cryptic Display Window
    Open CA Migration Window
    Click Load PNR
    Click Panel    Reporting
    Select If PNR Travel to Any Countries Listed    NONE OF THE ABOVE
    Click Panel    Payment
    Click Payment Tab    Matrix Accounting Remark
    Click Add Accounting Line Button
    Select Segment    3    4
    Create Matrix Accounting Remark    YES    Apay Accounting Remark    AD1    123555    Agency Plastic    MAPLE LEAF
    Enter Base Amount    100.75
    Enter GST Tax Amount    3.00
    Enter HST Tax Amount    2.50
    Enter QST Tax Amount    0.00
    Click Element    css=#qst
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
    Verify Specific Remark Is Written In The PNR    RM *MAC/-SUP-${supplier_code}/-LK-MAC2/-AMT-${base_amount}/-PT-${hst_tax}RC/-PT-${gst_tax}XG/-PT-${qst_tax}XQ    True
    Verify Specific Remark Is Written In The PNR    RM *MAC/-LK-MAC2/-FOP-APVIXXXXXXXXXXXX1111/-EXP-1229/-MP-ALL/-BKN-${supplier_confirmation_number}/S3-4    True
    Verify Specific Remark Is Written In The PNR    RIR PAID MAPLE LEAF CF-${supplier_confirmation_number} CAD${base_amount} PLUS 5.50 TAX ON VI/S3-4    True
    Close Cryptic Display Window
    Logout To Amadeus Sell Connect
    [Teardown]    Close Browser

Verify That APAY Matrix Accounting Remark Is Written For Other Costs Accounting Remark Type
    [Tags]    us7761
    Login To Amadeus Sell Connect
    Enter GDS Command    NM1Lastname/Firstname Mr    NM1Leisure/Amadeus Mr    SS AC1074 Y 20DEC YYZYUL GK1 / 11551440 / ABCDEFG    SS AC1075 Y 25DEC YULYVR GK1 / 11551440 / 1234567    RM*CF/-RBM000000N    APETEST@EMAIL.COM
    ...    TKOK
    Open CA Migration Window
    Click Load PNR
    Click Panel    Reporting
    Select Routing Code    Asia incl. India
    Enter Destination Code    CDG
    Select If PNR Travel to Any Countries Listed    NONE OF THE ABOVE
    Click Panel    Payment
    Click Payment Tab    Matrix Accounting Remark
    Click Add Accounting Line Button
    Select Segment    3
    Create Matrix Accounting Remark    YES    Apay Accounting Remark    CGO    76543    Credit Card    MC
    ...    5555555555554444    0122    COSTS REMARK
    Enter Base Amount    1250.05
    Enter GST Tax Amount    12.00
    Enter HST Tax Amount    10.00
    Enter QST Tax Amount    5.40
    Click Element    css=#qst
    Click Save Button
    Click Submit To PNR
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    RM *MAC/-SUP-${supplier_code}/-LK-MAC1/-AMT-${base_amount}/-PT-${hst_tax}RC/-PT-${gst_tax}XG/-PT-${qst_tax}XQ    True
    Verify Specific Remark Is Written In The PNR    RM *MAC/-LK-MAC1/-FOP-CCMCXXXXXXXXXXXX4444/-EXP-0122/-MP-ALL/-BKN-${supplier_confirmation_number}/S3    True
    Verify Specific Remark Is Written In The PNR    RIR PAID ${remark_description} CF-${supplier_confirmation_number} CAD${base_amount} PLUS 27.40 TAX ON MC/S3    True
    Close Cryptic Display Window
    Logout To Amadeus Sell Connect
    [Teardown]    Close Browser

Verify That APAY Matrix Accounting Remark Is Written For Food Costs Accounting Remark Type
    [Tags]    us7761
    Login To Amadeus Sell Connect
    Enter GDS Command    NM1Lastname/Firstname Mr    NM1Leisure/Amadeus Mr    SS AC1074 Y 20DEC YYZYUL GK1 / 11551440 / ABCDEFG    RU1AHK1SIN23DEC-/TYP-TOR/SUC-ZZ/SC-sin/SD-12dec/ST-0900/EC-sin/ED-12dec/ET-1800/PS-X    SS AC1075 Y 25DEC YULYVR GK1 / 11551440 / 1234567    RM*CF/-RBM000000N
    Open CA Migration Window
    Click Load PNR
    Click Panel    Reporting
    Select Routing Code    Asia incl. India
    Enter Destination Code    CDG
    Select If PNR Travel to Any Countries Listed    NONE OF THE ABOVE
    Click Panel    Payment
    Click Payment Tab    Matrix Accounting Remark
    Click Add Accounting Line Button
    Select Segment    4
    Create Matrix Accounting Remark    YES    Apay Accounting Remark    CGO    123555    Credit Card    VI
    ...    4444333322221111    0323    FOOD COSTS
    Enter Base Amount    2125.75
    Enter GST Tax Amount    5.00
    Enter HST Tax Amount    1.00
    Enter QST Tax Amount    2.00
    Click Element    css=#qst
    Click Save Button
    Click Submit To PNR
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    RM *MAC/-SUP-${supplier_code}/-LK-MAC1/-AMT-${base_amount}/-PT-${hst_tax}RC/-PT-${gst_tax}XG/-PT-${qst_tax}XQ    True
    Verify Specific Remark Is Written In The PNR    RM *MAC/-LK-MAC1/-FOP-CCVIXXXXXXXXXXXX1111/-EXP-0323/-MP-ALL/-BKN-${supplier_confirmation_number}/S4    True
    Verify Specific Remark Is Written In The PNR    RIR PAID ${remark_description} CF-${supplier_confirmation_number} CAD${base_amount} PLUS 8.00 TAX ON VI/S4    True
    Close Cryptic Display Window
    Logout To Amadeus Sell Connect
    [Teardown]    Close Browser

Verify That APAY Matrix Accounting Remark Is Written For Pet Transportation Accounting Remark Type
    [Tags]    us7761
    Login To Amadeus Sell Connect
    Enter GDS Command    NM1Lastname/Firstname Mr    NM1Leisure/Amadeus Mr    SS AC1074 Y 20DEC YYZYUL GK1 / 11551440 / ABCDEFG    RU1AHK1SIN23DEC-/TYP-TOR/SUC-ZZ/SC-sin/SD-12dec/ST-0900/EC-sin/ED-12dec/ET-1800/PS-X    SS AC1075 Y 25DEC YULYVR GK1 / 11551440 / 1234567    RM*CF/-RBM000000N
    Open CA Migration Window
    Click Load PNR
    Click Panel    Reporting
    Select Routing Code    Asia incl. India
    Enter Destination Code    CDG
    Select If PNR Travel to Any Countries Listed    NONE OF THE ABOVE
    Click Panel    Payment
    Click Payment Tab    Matrix Accounting Remark
    Click Add Accounting Line Button
    Select Segment    3
    Create Matrix Accounting Remark    YES    Apay Accounting Remark    CGO    345612    RBC Points    ${EMPTY}
    ...    \    \    PET TRANSPORTATION
    Enter Base Amount    100.50
    Enter GST Tax Amount    15.00
    Enter HST Tax Amount    21.00
    Enter QST Tax Amount    12.00
    Click Element    css=#qst
    Click Save Button
    Click Submit To PNR
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    RM *MAC/-SUP-${supplier_code}/-LK-MAC1/-AMT-${base_amount}/-PT-${hst_tax}RC/-PT-${gst_tax}XG/-PT-${qst_tax}XQ    True
    Verify Specific Remark Is Written In The PNR    RM *MAC/-LK-MAC1/-FOP-CK/-MP-ALL/-BKN-${supplier_confirmation_number}/S3    True
    Verify Specific Remark Is Written In The PNR    RIR PAID ${remark_description} CF-${supplier_confirmation_number} CAD${base_amount} PLUS 48.00 TAX ON CK/S3    True
    Comment    Close Cryptic Display Window
    Comment    Logout To Amadeus Sell Connect
    [Teardown]    Close Browser

*** Keywords ***
Verify Matrix Accounting Default Values Are Correct
    [Arguments]    ${matrix_accounting}    ${is_ticket_blank}=True
    Comment    ${default_segment_no}    Get Element Attribute    xpath=//input[@id='segmentNo']@ng-reflect-model
    Comment    Should be Equal    ${default_segment_no}    ${segment_number}
    ${default_supplier_code}    Get Element Attribute    xpath=//input[@id='supplierCodeName']@ng-reflect-model
    Should Be Equal    ${default_supplier_code}    ${supplier_code}
    ${default_confirmation_no}    Get Element Attribute    xpath=//input[@id='supplierConfirmatioNo']@ng-reflect-model
    Should Be Equal    ${default_confirmation_no}    ${supplier_confirmation_number}
    ${default_base_amount}    Get Element Attribute    xpath=//input[@id='baseAmount']@ng-reflect-model
    Should Be Equal    ${default_base_amount}    ${base_amount}
    ${default_gst_tax}    Get Element Attribute    xpath=//input[@id='gst']@ng-reflect-model
    Should Be Equal    ${default_gst_tax}    ${gst_tax}
    ${default_hst_tax}    Get Element Attribute    xpath=//input[@id='hst']@ng-reflect-model
    Should Be Equal    ${default_hst_tax}    ${hst_tax}
    ${default_qst_tax}    Get Element Attribute    xpath=//input[@id='qst']@ng-reflect-model
    Should Be Equal    ${default_qst_tax}    ${qst_tax}
    ${default_ticket_number}    Run Keyword If    "${is_ticket_blank}" == "False"    Get Element Attribute    css=#tktLine
    Run Keyword If    "${is_ticket_blank}" == "False"    Should Be Equal    ${default_ticket_number}    ${ticket_number}
