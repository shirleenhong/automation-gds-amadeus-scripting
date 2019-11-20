*** Settings ***
Force Tags        leisure
Resource          ../../resources/common/global_resources.robot

*** Test Cases ***
Verify That Insurance Accounting Remark Is Correct
    [Tags]    us8870    US9253
    Login To Amadeus Sell Connect
    Enter GDS Command    NM1Leisure/Amadeus Mr    RU1AHK1YYZ12OCT-/TYP-TOR/SUC-ZZ/SC-YYZ/SD-12OCT/ST-0900/EC-YQB/ED-13OCT/ET-1800/PS-X    HU1AHK1YXE23OCT-24OCT/PARK INN SASKATOON,TEL-+49 711320940,FAX-+49 7113209410,CF:12345,SINGLE ROOM,RATE:CWT EUR60.00/NIGHT,SI-*H01*/P1    RU1AHK1SIN27OCT-/TYP-INS/SUN-ABC INSURANCE/SUC-ZZ/SC-YVR/SD-27OCT/ST-1800/EC-YVR/ED-28OCT/ET-0800/CF-12345    RM*CF/-SIA0000000N    APE-test@email.com
    Open CA Migration Window
    Click Wrap PNR
    Populate Routing And Destination Fields
    Select Insurance Liability Waiver    All Inclusive or Premium Protection Insurance
    Click Panel    Payment
    Click Payment Tab    Leisure Fee
    Enter Reason for No Association Fees    Not applicable
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
    Click Add Accounting Line Button
    Select Segment    2    3
    Create Matrix Accounting Remark    NO    NonBSP Air Accounting Remark    ABC    1234561    Cash
    Enter Base Amount    1240.00
    Enter GST Tax Amount    0.00
    Enter HST Tax Amount    3.00
    Enter QST Tax Amount    1.10
    Enter Ticket Number    123456789
    Enter Other Tax Amount    4.50
    Enter Commission Without Tax Amount    10.50
    Click Save Button
    Click Submit To PNR
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    RM *MAC/-SUP-MLF/-LK-MAC1/-AMT-123.00/-PT-4.00RC/-PT-5.00XG/-PT-3.00XQ/-CP-10.00    True
    Verify Specific Remark Is Written In The PNR    RM *MAC/-LK-MAC1/-FOP-CCVI4444333322221111/-EXP-0921/-MP-ALL/-BKN-CWT112233/S4    True
    Close Cryptic Display Window
    Open CA Migration Window
    Click Wrap PNR
    Click Panel    Payment
    Click Payment Tab    Matrix Accounting Remark
    Click Update Button    1
    Select Accounting Remark Type    Apay Accounting Remark
    Enter Matrix Accounting Description    SEAT COSTS
    Enter Supplier Confirmation Number    14433
    Add CC As Form Of Payment    AX    371449635398431    1222
    Enter Base Amount    150.23
    Enter GST Tax Amount    2.05
    Enter HST Tax Amount    3.98
    Enter QST Tax Amount    4.54
    Click Save Button
    Click Submit To PNR
    Close CA Migration Window
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    RM *MAC/-SUP-PFS/-LK-MAC1/-AMT-150.23/-PT-3.98RC/-PT-2.05XG/-PT-4.54XQ    True
    Verify Specific Remark Is Written In The PNR    RM *MAC/-LK-MAC1/-FOP-CCAX371449635398431/-EXP-1222/-MP-ALL/-BKN-14433/S4    True
    Verify Specific Remark Is Written In The PNR    RIR PAID SEAT COSTS CF-14433 CAD150.23 PLUS 10.57 TAX ON AX/S4    True
    Close Cryptic Display Window
    Logout To Amadeus Sell Connect
    [Teardown]    Close Browser

Verify That Insurance Accounting Remark Is Correct For Multiple Passengers
    [Tags]    us8870    US9253    us9850    sanity
    Login To Amadeus Sell Connect
    Enter GDS Command    NM1Leisure/Amadeus Mr    NM1Lastname/Firstname Mr    NM1Leisure/Dhel    RU1AHK3YYZ12OCT-/TYP-TOR/SUC-ZZ/SC-YYZ/SD-12OCT/ST-0900/EC-YQB/ED-13OCT/ET-1800/PS-X    HU1AHK3YXE23OCT-24OCT/PARK INN SASKATOON,TEL-+49 711320940,FAX-+49 7113209410,CF:12345,SINGLE ROOM,RATE:CWT EUR60.00/NIGHT,SI-*H01*    RU1AHK3SIN27OCT-/TYP-INS/SUN-ABC INSURANCE/SUC-ZZ/SC-YVR/SD-27OCT/ST-1800/EC-YVR/ED-28OCT/ET-0800/CF-12345
    ...    RM*CF/-RBM0000000N    APE-test@emai.com
    Open CA Migration Window
    Click Wrap PNR
    Populate Reporting Required Fields
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
    Select Passenger    LEISURE-AMADEUS MR
    Click Save Button
    Click Add Accounting Line Button
    Select Accounting Remark Type    Insurance Remark
    Select Segment    6
    Enter Supplier Confirmation Number    ABC123
    Select Matrix Form Of Payment    Cash
    Enter Base Amount    250.00
    Enter GST Tax Amount    1.00
    Enter HST Tax Amount    3.00
    Enter QST Tax Amount    4.00
    Enter Commission Percentage    12.00
    Select Passenger    LEISURE-DHEL
    Click Save Button
    Click Submit To PNR
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    RM *MAC/-SUP-MLF/-LK-MAC1/-AMT-123.00/-PT-4.00RC/-PT-5.00XG/-PT-3.00XQ/-CP-10.00/P1    True
    Verify Specific Remark Is Written In The PNR    RM *MAC/-LK-MAC1/-FOP-CCVI4444333322221111/-EXP-0921/-MP-ALL/-BKN-CWT112233/S4/P1    True
    Verify Specific Remark Is Written In The PNR    RM *MAC/-SUP-MLF/-LK-MAC2/-AMT-250.00/-PT-3.00RC/-PT-1.00XG/-PT-4.00XQ/-CP-12.00/P3    True
    Verify Specific Remark Is Written In The PNR    RM *MAC/-LK-MAC2/-FOP-CA/-MP-ALL/-BKN-CWTABC123/S6/P3    True
    Close Cryptic Display Window
    Logout To Amadeus Sell Connect
    [Teardown]    Close Browser
