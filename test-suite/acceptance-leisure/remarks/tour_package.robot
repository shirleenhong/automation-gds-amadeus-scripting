*** Settings ***
Force Tags        leisure
Resource          ../../resources/common/global_resources.robot

*** Test Cases ***
Verify That Tour Package And UDID Remarks Are Written For Single Passenger
    [Tags]    us7994    us7762
    Login To Amadeus Sell Connect
    Enter GDS Command    NM1Lastname/Firstname Mr    SS AC1074 Y 20DEC YYZYUL GK1 / 11551440 / ABCDEFG    RU1AHK1SIN23DEC-/TYP-TOR/SUC-ZZ/SC-sin/SD-12dec/ST-0900/EC-sin/ED-12dec/ET-1800/PS-X    SS AC1075 Y 25DEC YULYVR GK1 / 11551440 / 1234567    RM*CF/-RBM000000N    APE-Test@email.com
    ...    RU1AHK1SIN2NOV-CWT RETENTION SEGMENT
    Open CA Migration Window
    Click Wrap PNR
    Populate Reporting Required Fields
    Click Panel    Remarks
    Select Package    Tour Package
    Select Tour Package Currency Type    CAD
    Enter Tour Package Number Of Adults    1
    Enter Tour Package Base Cost Per Adult    100.00
    Enter Tour Package Taxes Per Adult    15.75
    Enter Tour Package Insurance Per Adult    80.00
    Enter Tour Package Deposit Paid    55.00
    Enter Tour Package Balance Due Date    12122025
    Enter Tour Package Commission Amount    25.00
    Click Submit To PNR
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Package Costs UDID Remarks Are Written In the PNR    DEC25    140.75
    Verify Specific Remark Is Written In The PNR    RIR THE FOLLOWING COSTS ARE SHOWN IN ${tour_currency_type}
    Verify Specific Remark Is Written In The PNR    RIR ADULT PACKAGE-----------100.00X1--------100.00
    Verify Specific Remark Is Written In The PNR    RIR ADULT TAXES--------------15.75X1---------15.75
    Verify Specific Remark Is Written In The PNR    RIR ADULT INSURANCE----------80.00X1---------80.00
    Verify Specific Remark Is Written In The PNR    RIR TOTAL PACKAGE PRICE 195.75
    Verify Specific Remark Is Written In The PNR    RIR LESS DEPOSIT PAID 55.00 -
    Verify Specific Remark Is Written In The PNR    RIR BALANCE DUE 140.75
    Verify Specific Remark Is Written In The PNR    RIR ---- BALANCE OF 140.75 IS DUE 12DEC25 ----
    Verify Specific Remark Is Written In The PNR    RIR SOME TAXES ARE PAYABLE LOCALLY AND NOT INCLUDED ABOVE
    Close Cryptic Display Window
    Logout To Amadeus Sell Connect
    [Teardown]    Close Browser

Verify That Tour Package And UDID Remarks Are Written For Multiple Passengers
    [Tags]    us7994    us7762    sanity
    Login To Amadeus Sell Connect
    Enter GDS Command    NM1Lastname/Firstname Mr    NM1Leisure/Amadeus Mr    NM1Leisure/Maridel    SS AC1074 Y 20DEC YYZYUL GK3 / 11551440 / ABCDEFG    RU1AHK3SIN23DEC-/TYP-TOR/SUC-ZZ/SC-sin/SD-12dec/ST-0900/EC-sin/ED-12dec/ET-1800/PS-X    SS AC1075 Y 25DEC YULYVR GK3 / 11551440 / 1234567
    ...    RM*CF/-RBM000000N    APE-12455
    Open CA Migration Window
    Click Wrap PNR
    Populate Reporting Required Fields
    Click Panel    Remarks
    Select Package    Tour Package
    Select Tour Package Currency Type    USD
    Enter Tour Package Number Of Adults    3
    Enter Tour Package Base Cost Per Adult    450.00
    Enter Tour Package Taxes Per Adult    26.75
    Enter Tour Package Insurance Per Adult    175.00
    Enter Tour Package Deposit Paid    120.99
    Enter Tour Package Balance Due Date    12122025
    Enter Tour Package Commission Amount    160.50
    Click Submit To PNR
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Package Costs UDID Remarks Are Written In the PNR    DEC25    1835.25
    Verify Specific Remark Is Written In The PNR    RIR THE FOLLOWING COSTS ARE SHOWN IN ${tour_currency_type}
    Verify Specific Remark Is Written In The PNR    RIR ADULT PACKAGE-----------450.00X3------1,350.00
    Verify Specific Remark Is Written In The PNR    RIR ADULT TAXES--------------26.75X3---------80.25
    Verify Specific Remark Is Written In The PNR    RIR ADULT INSURANCE---------175.00X3--------525.00
    Verify Specific Remark Is Written In The PNR    RIR TOTAL PACKAGE PRICE 1955.25
    Verify Specific Remark Is Written In The PNR    RIR LESS DEPOSIT PAID 120.99 -
    Verify Specific Remark Is Written In The PNR    RIR BALANCE DUE 1835.25
    Verify Specific Remark Is Written In The PNR    RIR ---- BALANCE OF 1835.25 IS DUE 12DEC25 ----
    Verify Specific Remark Is Written In The PNR    RIR SOME TAXES ARE PAYABLE LOCALLY AND NOT INCLUDED ABOVE
    Close Cryptic Display Window
    Switch To Command Page
    Open CA Migration Window
    Click Wrap PNR
    Click Panel    Remarks
    Select Package    Tour Package
    Select Tour Package Currency Type    CAD
    Enter Tour Package Number Of Adults    2
    Enter Tour Package Insurance Per Adult    ${EMPTY}
    Enter Tour Package Number Of Children    1
    Enter Tour Package Base Cost Per Child    100.75
    Enter Tour Package Taxes Per Child    55.60
    Enter Tour Package Balance Due Date    11122025
    Click Submit To PNR
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Package Costs UDID Remarks Are Written In the PNR    NOV25    989.85
    Verify Specific Remark Is Written In The PNR    RIR THE FOLLOWING COSTS ARE SHOWN IN ${tour_currency_type}
    Verify Specific Remark Is Written In The PNR    RIR ADULT PACKAGE-----------450.00X2--------900.00
    Verify Specific Remark Is Written In The PNR    RIR ADULT TAXES--------------26.75X2---------53.50
    Verify Specific Remark Is Written In The PNR    RIR CHILD PACKAGE-----------100.75X1--------100.75
    Verify Specific Remark Is Written In The PNR    RIR CHILD TAXES--------------55.60X1---------55.60
    Verify Specific Remark Is Written In The PNR    RIR TOTAL PACKAGE PRICE 1109.85
    Verify Specific Remark Is Written In The PNR    RIR LESS DEPOSIT PAID 120.99 -
    Verify Specific Remark Is Written In The PNR    RIR BALANCE DUE 989.85
    Verify Specific Remark Is Written In The PNR    RIR ---- BALANCE OF 989.85 IS DUE 12NOV25 ----
    Verify Specific Remark Is Written In The PNR    RIR SOME TAXES ARE PAYABLE LOCALLY AND NOT INCLUDED ABOVE
    Close Cryptic Display Window
    Logout To Amadeus Sell Connect
    [Teardown]    Close Browser

Verify That Tour Package And UDID Remarks Are Written For Multiple Passengers With Child
    [Tags]    us7994    us7762
    Login To Amadeus Sell Connect
    Enter GDS Command    NM1Lastname/Firstname Mr    NM1Leisure/Amadeus Mr    NM1Leisure/Dhel (CHD)    SS AC1074 Y 20DEC YYZYUL GK3 / 11551440 / ABCDEFG    RU1AHK3SIN23DEC-/TYP-TOR/SUC-ZZ/SC-sin/SD-12dec/ST-0900/EC-sin/ED-12dec/ET-1800/PS-X    SS AC1075 Y 25DEC YULYVR GK3 / 11551440 / 1234567
    ...    RM*CF/-RBM000000N    RU1AHK1SIN21NOV-CWT RETENTION SEGMENT    APE-TEst@emai.com
    Open CA Migration Window
    Click Wrap PNR
    Populate Reporting Required Fields
    Click Panel    Remarks
    Select Package    Tour Package
    Select Tour Package Currency Type    PHP
    Enter Tour Package Number Of Adults    2
    Enter Tour Package Base Cost Per Adult    350.00
    Enter Tour Package Taxes Per Adult    31.00
    Enter Tour Package Number Of Children    1
    Enter Tour Package Base Cost Per Child    100.75
    Enter Tour Package Taxes Per Child    55.60
    Enter Tour Package Deposit Paid    200.00
    Enter Tour Package Balance Due Date    10092026
    Enter Tour Package Commission Amount    210.50
    Click Submit To PNR
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Package Costs UDID Remarks Are Written In the PNR    OCT26    718.35
    Verify Specific Remark Is Written In The PNR    RIR THE FOLLOWING COSTS ARE SHOWN IN ${tour_currency_type}
    Verify Specific Remark Is Written In The PNR    RIR ADULT PACKAGE-----------350.00X2--------700.00
    Verify Specific Remark Is Written In The PNR    RIR ADULT TAXES--------------31.00X2---------62.00
    Verify Specific Remark Is Written In The PNR    RIR CHILD PACKAGE-----------100.75X1--------100.75
    Verify Specific Remark Is Written In The PNR    RIR CHILD TAXES--------------55.60X1---------55.60
    Verify Specific Remark Is Written In The PNR    RIR TOTAL PACKAGE PRICE 918.35
    Verify Specific Remark Is Written In The PNR    RIR LESS DEPOSIT PAID 200.00 -
    Verify Specific Remark Is Written In The PNR    RIR BALANCE DUE 718.35
    Verify Specific Remark Is Written In The PNR    RIR ---- BALANCE OF 718.35 IS DUE 9OCT26 ----
    Verify Specific Remark Is Written In The PNR    RIR SOME TAXES ARE PAYABLE LOCALLY AND NOT INCLUDED ABOVE
    Close Cryptic Display Window
    Switch To Command Page
    Open CA Migration Window
    Click Wrap PNR
    Click Panel    Remarks
    Select Package    Tour Package
    Select Tour Package Currency Type    CAD
    Enter Tour Package Number Of Infant    1
    Enter Tour Package Total Cost Per Infant    129.42
    Enter Tour Package Deposit Paid    300.00
    Enter Tour Package Balance Due Date    12092025
    Click Submit To PNR
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Package Costs UDID Remarks Are Written In the PNR    DEC25    747.77
    Verify Specific Remark Is Written In The PNR    RIR THE FOLLOWING COSTS ARE SHOWN IN ${tour_currency_type}
    Verify Specific Remark Is Written In The PNR    RIR ADULT PACKAGE-----------350.00X2--------700.00
    Verify Specific Remark Is Written In The PNR    RIR ADULT TAXES--------------31.00X2---------62.00
    Verify Specific Remark Is Written In The PNR    RIR CHILD PACKAGE-----------100.75X1--------100.75
    Verify Specific Remark Is Written In The PNR    RIR CHILD TAXES--------------55.60X1---------55.60
    Verify Specific Remark Is Written In The PNR    RIR INFANT PACKAGE----------129.42X1--------129.42
    Verify Specific Remark Is Written In The PNR    RIR TOTAL PACKAGE PRICE 1047.77
    Verify Specific Remark Is Written In The PNR    RIR LESS DEPOSIT PAID 300.00 -
    Verify Specific Remark Is Written In The PNR    RIR BALANCE DUE 747.77
    Verify Specific Remark Is Written In The PNR    RIR ---- BALANCE OF 747.77 IS DUE 9DEC25 ----
    Verify Specific Remark Is Written In The PNR    RIR SOME TAXES ARE PAYABLE LOCALLY AND NOT INCLUDED ABOVE
    Close Cryptic Display Window
    Logout To Amadeus Sell Connect
    [Teardown]    Close Browser

Verify That Tour Package And UDID Remarks Are Written For Multiple Passengers With Child And Infant
    [Tags]    us7994    us7762
    Login To Amadeus Sell Connect
    Enter GDS Command    NM1Lastname/Firstname Mr    NM1Leisure/Dhel (CHD)    NM1Leisure/Infant (INF/ANN/10DEC18)    SS AC1074 Y 20DEC YYZYUL GK3 / 11551440 / ABCDEFG    RU1AHK3SIN23DEC-/TYP-TOR/SUC-ZZ/SC-sin/SD-12dec/ST-0900/EC-sin/ED-12dec/ET-1800/PS-X    SS AC1075 Y 25DEC YULYVR GK3 / 11551440 / 1234567
    ...    RM*CF/-RBM000000N    RU1AHK1SIN21NOV-CWT RETENTION SEGMENT    APE-12414
    Open CA Migration Window
    Click Wrap PNR
    Populate Reporting Required Fields
    Click Panel    Remarks
    Select Package    Tour Package
    Select Tour Package Currency Type    CAD
    Enter Tour Package Number Of Adults    1
    Enter Tour Package Base Cost Per Adult    500.00
    Enter Tour Package Taxes Per Adult    52.00
    Enter Tour Package Number Of Children    1
    Enter Tour Package Insurance Per Adult    100.75
    Enter Tour Package Base Cost Per Child    100.75
    Enter Tour Package Taxes Per Child    55.60
    Enter Tour Package Insurance Per Child    65.75
    Enter Tour Package Number Of Infant    1
    Enter Tour Package Total Cost Per Infant    129.00
    Enter Tour Package Deposit Paid    333.00
    Enter Tour Package Balance Due Date    10222024
    Enter Tour Package Commission Amount    251.00
    Click Submit To PNR
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Package Costs UDID Remarks Are Written In the PNR    OCT24    670.85
    Verify Specific Remark Is Written In The PNR    RIR THE FOLLOWING COSTS ARE SHOWN IN ${tour_currency_type}
    Verify Specific Remark Is Written In The PNR    RIR ADULT PACKAGE-----------500.00X1--------500.00
    Verify Specific Remark Is Written In The PNR    RIR ADULT TAXES--------------52.00X1---------52.00
    Verify Specific Remark Is Written In The PNR    RIR ADULT INSURANCE---------100.75X1--------100.75
    Verify Specific Remark Is Written In The PNR    RIR CHILD PACKAGE-----------100.75X1--------100.75
    Verify Specific Remark Is Written In The PNR    RIR CHILD TAXES--------------55.60X1---------55.60
    Verify Specific Remark Is Written In The PNR    RIR CHILD INSURANCE----------65.75X1---------65.75
    Verify Specific Remark Is Written In The PNR    RIR INFANT PACKAGE----------129.00X1--------129.00
    Verify Specific Remark Is Written In The PNR    RIR TOTAL PACKAGE PRICE 1003.85
    Verify Specific Remark Is Written In The PNR    RIR LESS DEPOSIT PAID 333.00 -
    Verify Specific Remark Is Written In The PNR    RIR BALANCE DUE 670.85
    Verify Specific Remark Is Written In The PNR    RIR ---- BALANCE OF 670.85 IS DUE 22OCT24 ----
    Verify Specific Remark Is Written In The PNR    RIR SOME TAXES ARE PAYABLE LOCALLY AND NOT INCLUDED ABOVE
    Close Cryptic Display Window
    Switch To Command Page
    Open CA Migration Window
    Click Wrap PNR
    Click Panel    Remarks
    Select Package    Tour Package
    Select Tour Package Currency Type    CAD
    Enter Tour Package Number Of Adults    3
    Enter Tour Package Number Of Children    ${EMPTY}
    Enter Tour Package Base Cost Per Child    ${EMPTY}
    Enter Tour Package Taxes Per Child    ${EMPTY}
    Enter Tour Package Insurance Per Child    ${EMPTY}
    Enter Tour Package Number Of Infant    ${EMPTY}
    Enter Tour Package Total Cost Per Infant    ${EMPTY}
    Enter Tour Package Deposit Paid    50.00
    Enter Tour Package Balance Due Date    11222023
    Enter Tour Package Commission Amount    ${EMPTY}
    Click Submit To PNR
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    RM *U43/-NOV23
    Verify Specific Remark Is Written In The PNR    RM *U41/-1908.25
    Verify Specific Remark Is Written In The PNR    RM *U42/-0.00
    Verify Specific Remark Is Written In The PNR    RIR THE FOLLOWING COSTS ARE SHOWN IN ${tour_currency_type}
    Verify Specific Remark Is Written In The PNR    RIR ADULT PACKAGE-----------500.00X3------1,500.00
    Verify Specific Remark Is Written In The PNR    RIR ADULT TAXES--------------52.00X3--------156.00
    Verify Specific Remark Is Written In The PNR    RIR ADULT INSURANCE---------100.75X3--------302.25
    Verify Specific Remark Is Written In The PNR    RIR TOTAL PACKAGE PRICE 1958.25
    Verify Specific Remark Is Written In The PNR    RIR LESS DEPOSIT PAID 50.00 -
    Verify Specific Remark Is Written In The PNR    RIR BALANCE DUE 1908.25
    Verify Specific Remark Is Written In The PNR    RIR ---- BALANCE OF 1908.25 IS DUE 22NOV23 ----
    Verify Specific Remark Is Written In The PNR    RIR SOME TAXES ARE PAYABLE LOCALLY AND NOT INCLUDED ABOVE
    Close Cryptic Display Window

Verify That Tour Package And UDID Remarks Are Deleted
    [Tags]    us7998
    Open CA Migration Window
    Click Wrap PNR
    Click Panel    Remarks
    Select Package    Delete Package Remarks
    Click Submit To PNR
    Close CA Migration Window
    Open Cryptic Display Window
    Verify Specific Remark Is Not Written In The PNR    RM *U43/-NOV23
    Verify Specific Remark Is Not Written In The PNR    RM *U41/-1908.25
    Verify Specific Remark Is Not Written In The PNR    RM *U42/-0.00
    Verify Specific Remark Is Not Written In The PNR    RIR THE FOLLOWING COSTS ARE SHOWN IN
    Verify Specific Remark Is Not Written In The PNR    RIR ADULT PACKAGE-----------500.00X3------1,500.00
    Verify Specific Remark Is Not Written In The PNR    RIR ADULT TAXES--------------52.00X3--------156.00
    Verify Specific Remark Is Not Written In The PNR    RIR ADULT INSURANCE---------100.75X3--------302.25
    Verify Specific Remark Is Not Written In The PNR    RIR TOTAL PACKAGE PRICE 1958.25
    Verify Specific Remark Is Not Written In The PNR    RIR LESS DEPOSIT PAID 50.00 -
    Verify Specific Remark Is Not Written In The PNR    RIR BALANCE DUE 1908.25
    Verify Specific Remark Is Not Written In The PNR    RIR ---- BALANCE OF 1908.25 IS DUE 22NOV23 ----
    Verify Specific Remark Is Not Written In The PNR    RIR SOME TAXES ARE PAYABLE LOCALLY AND NOT INCLUDED ABOVE
    Close Cryptic Display Window
    Logout To Amadeus Sell Connect
    [Teardown]    Close Browser

*** Keywords ***
Verify Package Costs UDID Remarks Are Written In the PNR
    [Arguments]    ${balance_due_date}    ${balance_due_amt}
    Verify Specific Remark Is Written In The PNR    RM *U43/-${balance_due_date}
    Verify Specific Remark Is Written In The PNR    RM *U42/-${tour_commission_amount}
    Verify Specific Remark Is Written In The PNR    RM *U41/-${balance_due_amt}
