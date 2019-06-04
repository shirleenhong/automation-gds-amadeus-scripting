*** Settings ***
Resource          ../../resources/common/global_resources.robot

*** Test Cases ***
Verify That Insurance Accounting Remark Is Correct
    [Tags]    us8870    US9253
    Login To Amadeus Sell Connect
    Enter GDS Command    NM1Leisure/Amadeus Mr    RU1AHK1YYZ12NOV-/TYP-TOR/SUC-ZZ/SC-YYZ/SD-12NOV/ST-0900/EC-YQB/ED-13NOV/ET-1800/PS-X    HU1AHK1YXE23NOV-24NOV/PARK INN SASKATOON,TEL-+49 711320940,FAX-+49 7113209410,CF:12345,SINGLE ROOM,RATE:CWT EUR60.00/NIGHT,SI-*H01*/P1    RU1AHK1SIN27DEC-/TYP-INS/SUN-ABC INSURANCE/SUC-ZZ/SC-YVR/SD-27DEC/ST-1800/EC-YVR/ED-28DEC/ET-0800/CF-12345    RM*CF/-RBM0000000N    APE12345
    ...    TKOK
    Open CA Migration Window
    Click Load PNR
    Click Panel    Reporting
    Select Routing Code    Asia incl. India
    Enter Destination Code    YYZ
    Select If PNR Travel to Any Countries Listed    NONE OF THE ABOVE
    Click Panel    Payment
    Click Payment Tab    Matrix Accounting Remark
    #add insurance acct remark
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
    Click Element    css=#qst
    Click Save Button
    #add non-apay remark
    Click Add Accounting Line Button
    Select Segment    2    3
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
    #verify insurance acct remark
    Verify Specific Remark Is Written In The PNR    RM *MAC/-SUP-MLF/-LK-MAC1/-AMT-123.00/-PT-4.00RC/-PT-5.00XG/-PT-3.00XQ/-CP-10.00    True
    Verify Specific Remark Is Written In The PNR    RM *MAC/-LK-MAC1/-FOP-CCVIXXXXXXXXXXXX1111/-EXP-0921/-MP-ALL/-BKN-CWT112233/S4    True
    Close Cryptic Display Window
    Open CA Migration Window
    #start update
    Click Load PNR
    Click Panel    Reporting
    Select If PNR Travel to Any Countries Listed    NONE OF THE ABOVE
    Click Panel    Payment
    #update insurance acct remark
    Click Payment Tab    Matrix Accounting Remark
    Click Payment Update Button    1
    Select Accounting Remark Type    Apay Accounting Remark
    Enter Matrix Accounting Description    SEAT COSTS
    Comment    Select Segment    4
    Enter Supplier Confirmation Number    14433
    Select Matrix Form Of Payment    RBC Points
    Enter Base Amount    150.23
    Enter GST Tax Amount    2.05
    Enter HST Tax Amount    3.98
    Enter QST Tax Amount    4.54
    Click Element    css=#qst
    Click Save Button
    Click Submit To PNR
    Close CA Migration Window
    Open Cryptic Display Window
    #verify updated insurance acct remark
    Verify Specific Remark Is Written In The PNR    RM *MAC/-SUP-PFS/-LK-MAC1/-AMT-150.23/-PT-3.98RC/-PT-2.05XG/-PT-4.54XQ    True
    Verify Specific Remark Is Written In The PNR    RM *MAC/-LK-MAC1/-FOP-CK/-MP-ALL/-BKN-14433/S4    True
    Verify Specific Remark Is Written In The PNR    RIR PAID SEAT COSTS CF-14433 CAD150.23 PLUS 10.57 TAX ON CK/S4    True
    Close Cryptic Display Window
    Logout To Amadeus Sell Connect
    [Teardown]    Close Browser

*** Keywords ***
