*** Settings ***
Force Tags        leisure
Resource          ../../resources/common/global_resources.robot

*** Test Cases ***
Verify That Accounting Remarks Are Written For Non-BSP Air Exchange When Supplier IS ACY With Penalty
    [Tags]    us7850    sanity    US15568
    Login To Amadeus Sell Connect
    Enter GDS Command    NM1Lastname/Firstname Mr    SS AC1074 Y 20DEC YYZYUL GK1 / 11551440 / ABCDEFG    SS AC1075 Y 25DEC YULYVR GK1 / 11551440 / 1234567    RM*CF/-RBM000000N    APE-TEST@EMAIL.COM
    Open CA Migration Window
    Click Wrap PNR
    Populate Reporting Required Fields
    Click Panel    Payment
    Click Payment Tab    Matrix Accounting Remark
    Click Add Accounting Line Button
    Select Segment    2
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
    Click Wrap PNR
    Click Panel    Payment
    Click Payment Tab    Matrix Accounting Remark
    Click Payment Delete Button    1
    Confirm Delete
    Click Add Accounting Line Button
    Select Accounting Remark Type    NonBSP Air Exchange
    Select Segment    2
    Enter Supplier Confirmation Number    112233
    Select Matrix Form Of Payment    Credit Card
    Select Credit Card Vendor Code    Visa
    Enter Credit Card Number    4444333322221111
    Enter Credit Card Expiration Date    0921
    Enter Base Amount    123.00
    Enter GST Tax Amount    5.00
    Enter HST Tax Amount    4.00
    Enter QST Tax Amount    3.00
    Enter Other Tax Amount    7.00
    Enter Commission Without Tax Amount    9.50
    Enter Penalty Amount    2.00
    Enter Penalty GST Amount    2.00
    Enter Penalty HST Amount    2.00
    Enter Ticket Number    1241414
    Enter Original Ticket Number    535255
    Click Save Button
    Click Submit To PNR
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    RM *MAC/-SUP-ACY/-LK-MAC1/-AMT-${base_amount}/-PT-${hst_tax}RC/-PT-${gst_tax}XG/-PT-${qst_tax}XQ/-PT-${other_tax}XT/-CD-${commission_with_tax}    True
    Verify Specific Remark Is Written In The PNR    RM *MAC/-LK-MAC1/-FOP-CCVI4444333322221111/-EXP-0921/-TK-${ticket_number}/-MP-ALL/-BKN-${supplier_confirmation_number}/S2    True
    Verify Specific Remark Is Written In The PNR    RM *MAC/-SUP-A22/-LK-MAC2/-AMT-2.00/-PT-2.00RC/-PT-2.00XG/-PT-0.00XQ/-CD-0.00    True
    Verify Specific Remark Is Written In The PNR    RM *MAC/-LK-MAC2/-FOP-CCVI4444333322221111/-EXP-0921/-TK-${ticket_number}/-MP-ALL/-BKN-${supplier_confirmation_number}/S2    True
    Verify Specific Remark Is Written In The PNR    RM *NE/-EX-Y/-OTK-535255
    Verify Specific Remark Is Not Written In The PNR    RM *NUC
    Close Cryptic Display Window
    Logout To Amadeus Sell Connect
    [Teardown]    Close Browser

Verify That Accounting Remarks Are Written For Non-BSP Air Exchange When Supplier IS ACY Without Penalty
    [Tags]    us7850    US15568
    Login To Amadeus Sell Connect
    Enter GDS Command    NM1Lastname/Firstname Mr    NM1Leisure/Amadeus Mr    SS AC1074 Y 20DEC YYZYUL GK2 / 11551440 / ABCDEFG    SS AC1075 Y 25DEC YULYVR GK2 / 11551440 / 1234567    RM*CF/-RBM000000N    APE-TEST@EMAIL.COM
    Open CA Migration Window
    Click Wrap PNR
    Populate Reporting Required Fields
    Click Panel    Payment
    Click Payment Tab    Matrix Accounting Remark
    Click Add Accounting Line Button
    Select Segment    3
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
    Click Wrap PNR
    Click Panel    Payment
    Click Payment Tab    Matrix Accounting Remark
    Click Payment Delete Button    1
    Confirm Delete
    Click Add Accounting Line Button
    Select Accounting Remark Type    NonBSP Air Exchange
    Select Segment    3
    Enter Supplier Confirmation Number    112233
    Select Matrix Form Of Payment    Cash
    Enter Base Amount    123.00
    Enter GST Tax Amount    5.00
    Enter HST Tax Amount    4.00
    Enter QST Tax Amount    3.00
    Enter Other Tax Amount    7.00
    Enter Commission Without Tax Amount    9.50
    Enter Ticket Number    1241414
    Enter Original Ticket Number    535255
    Select Passenger    LEISURE-AMADEUS MR
    Click Save Button
    Click Submit To PNR
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    RM *MAC/-SUP-ACY/-LK-MAC1/-AMT-${base_amount}/-PT-${hst_tax}RC/-PT-${gst_tax}XG/-PT-${qst_tax}XQ/-PT-${other_tax}XT/-CD-${commission_with_tax}/P2    True
    Verify Specific Remark Is Written In The PNR    RM *MAC/-LK-MAC1/-FOP-CA/-TK-${ticket_number}/-MP-ALL/-BKN-${supplier_confirmation_number}/S3/P2    True
    Verify Specific Remark Is Written In The PNR    RM *NE/-EX-Y/-OTK-535255
    Verify Specific Remark Is Not Written In The PNR    RM *NUC
    Verify Specific Remark Is Not Written In The PNR    RM *MAC/-SUP-A22/-LK-MAC2/-AMT-0.00/-PT-0.00RC/-PT-0.00XG/-PT-0.00XQ/-PT-0.00XT/-CD-0.00/P2    True
    Verify Specific Remark Is Not Written In The PNR    RM *MAC/-LK-MAC2/-FOP-CA/-TK-${ticket_number}/-MP-ALL/-BKN-${supplier_confirmation_number}/S3/P2    True
    Close Cryptic Display Window
    Logout To Amadeus Sell Connect
    [Teardown]    Close Browser

Verify That Accounting Remark Is Written For Non-BSP Air Exchange When Supplier Code Is Not ACY
    [Tags]    us7850    US15568
    Login To Amadeus Sell Connect
    Enter GDS Command    NM1Lastname/Firstname Mr    NM1Leisure/Amadeus Mr    SS AC1074 Y 20DEC YYZYUL GK2 / 11551440 / ABCDEFG    SS AC1075 Y 25DEC YULYVR GK2 / 11551440 / 1234567    RM*CF/-RBM000000N    APE-TEST@EMAIL.COM
    Open CA Migration Window
    Click Wrap PNR
    Populate Reporting Required Fields
    Click Panel    Payment
    Click Payment Tab    Matrix Accounting Remark
    Click Add Accounting Line Button
    Select Segment    3
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
    Click Wrap PNR
    Click Panel    Payment
    Click Payment Tab    Matrix Accounting Remark
    Click Payment Delete Button    1
    Confirm Delete
    Click Add Accounting Line Button
    Select Accounting Remark Type    NonBSP Air Exchange
    Select Segment    3
    Enter Supplier Code    2AA
    Enter Supplier Confirmation Number    112233
    Select Matrix Form Of Payment    Cheque
    Enter Base Amount    123.00
    Enter GST Tax Amount    5.00
    Enter HST Tax Amount    4.00
    Enter QST Tax Amount    3.00
    Enter Other Tax Amount    7.00
    Enter Commission Without Tax Amount    9.50
    Enter Penalty Amount    2.00
    Enter Penalty GST Amount    2.00
    Enter Penalty HST Amount    2.00
    Enter Penalty QST Amount    2.00
    Select Passenger    LEISURE-AMADEUS MR
    Click Save Button
    Click Submit To PNR
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    RM *MAC/-SUP-2AA/-LK-MAC1/-AMT-125.00/-PT-6.00RC/-PT-7.00XG/-PT-5.00XQ/-PT-${other_tax}XT/-CD-${commission_with_tax}/P2    True
    Verify Specific Remark Is Written In The PNR    RM *MAC/-LK-MAC1/-FOP-CK/-MP-ALL/-BKN-${supplier_confirmation_number}/S3/P2    True
    Verify Specific Remark Is Written In The PNR    RM *NE/-EX-Y
    Verify Specific Remark Is Not Written In The PNR    RM *NUC
    Verify Specific Remark Is Not Written In The PNR    RM *NE/-EX-Y/-OTK
    Verify Specific Remark Is Not Written In The PNR    RM *MAC/-SUP-A22/-LK-MAC2/-AMT-0.00/-PT-0.00RC/-PT-0.00XG/-PT-0.00XQ/-PT-0.00XT/-CD-0.00/P2    True
    Verify Specific Remark Is Not Written In The PNR    RM *MAC/-LK-MAC2/-FOP-CK/-TK-${ticket_number}/-MP-ALL/-BKN-${supplier_confirmation_number}/S3/P2    True
    Close Cryptic Display Window
    Logout To Amadeus Sell Connect
    [Teardown]    Close Browser
