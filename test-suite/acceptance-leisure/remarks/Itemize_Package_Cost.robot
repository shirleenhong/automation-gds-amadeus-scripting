*** Settings ***
Force Tags        leisure
Resource          ../../resources/common/global_resources.robot

*** Test Cases ***
Verify that ITC package cost and UDID Remarks Are Written for Single Passenger
    [Tags]    us7746    us7994
    Login To Amadeus Sell Connect
    Enter GDS Command    NM1Lastname/Firstname Mr    NM1Leisure/Amadeus Mr    NM1POLO/LISA Mrs    SS U21074 Y 28NOV YYZORD GK3 / 11551440 / ABCDEFG    RM*CF/-RBM000000N    APE-Test@email.com
    ...    RU1AHK3SIN2NOV-CWT RETENTION SEGMENT
    Open CA Migration Window
    Click Wrap PNR
    Populate Reporting Required Fields
    Click Panel    Remarks
    Select Package    Itemize Package Cost Remarks
    Enter Currency for ITC    CAD
    Enter Number of Pax for Adult    1
    Enter Base Price for Adult    1222.00
    Enter Base Price Tax for Adult    212.00
    Enter Base Cruise for Adult    552.00
    Enter Base Cruise Tax for Adult    34.54
    Enter Rail Cost for Adult    124.00
    Enter Insurance for Adult    111.00
    Enter ITC Hotel Cost    235.67
    Enter ITC Car Cost    123.00
    Enter ITC Deposit    400.00
    Enter ITC Balance Due Date    09292019
    Enter ITC Commission Amount    533.00
    Click Submit To PNR
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    RM *U43/-SEP19
    Verify Specific Remark Is Written In The PNR    RM *U41/-2214.21
    Verify Specific Remark Is Written In The PNR    RM *U42/-533.00
    Verify Specific Remark Is Only Written Once    RIR THE FOLLOWING COSTS ARE SHOWN IN CAD
    Verify Specific Remark Is Only Written Once    RIR ADULT PRICE------------1222.00X1------1,222.00
    Verify Specific Remark Is Only Written Once    RIR ADULT TAXES-------------212.00X1--------212.00
    Verify Specific Remark Is Only Written Once    RIR ADULT CRUISE------------552.00X1--------552.00
    Verify Specific Remark Is Only Written Once    RIR ADULT TAX/PORT CHARGES---34.54X1---------34.54
    Verify Specific Remark Is Only Written Once    RIR ADULT RAIL--------------124.00X1--------124.00
    Verify Specific Remark Is Only Written Once    RIR ADULT INSURANCE---------111.00X1--------111.00
    Verify Specific Remark Is Only Written Once    RIR HOTEL/ACCOMMODATION-----235.67
    Verify Specific Remark Is Only Written Once    RIR CAR RENTAL--------------123.00
    Verify Specific Remark Is Only Written Once    RIR LESS DEPOSIT PAID-------400.00
    Verify Specific Remark Is Only Written Once    RIR TOTAL HOLIDAY COST-----2614.21
    Verify Specific Remark Is Only Written Once    RIR BALANCE DUE------------2214.21
    Verify Specific Remark Is Only Written Once    RIR ---- BALANCE OF 2214.21 IS DUE 29SEP19 ----
    Verify Specific Remark Is Not Written In The PNR    CHILD
    Verify Specific Remark Is Not Written In The PNR    INFANT
    Close Cryptic Display Window
    Switch To Command Page
    Open CA Migration Window
    Click Wrap PNR
    Click Panel    Remarks
    Select Package    Itemize Package Cost Remarks
    Enter Currency for ITC    USD
    Enter Number of Pax for Adult    2
    Enter Insurance for Adult    ${EMPTY}
    Enter Number of Pax for Infant    1
    Enter Base Price for Infant    322.00
    Enter Base Cruise for Infant    230.00
    Enter Base Cruise Tax for Infant    16.54
    Enter Rail Cost for Infant    40.00
    Enter Insurance for Infant    55.00
    Enter ITC Balance Due Date    11292019
    Click Submit To PNR
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Specific Remark Is Not Written In The PNR    CHILD
    Verify Specific Remark Is Only Written Once    RM *U43/-NOV19
    Verify Specific Remark Is Only Written Once    RM *U41/-8112.83
    Verify Specific Remark Is Only Written Once    RM *U42/-533.00
    Verify Specific Remark Is Only Written Once    RIR THE FOLLOWING COSTS ARE SHOWN IN USD
    Verify Specific Remark Is Only Written Once    RIR ADULT PRICE------------1222.00X2------2,444.00
    Verify Specific Remark Is Only Written Once    RIR ADULT TAXES-------------212.00X2--------424.00
    Verify Specific Remark Is Only Written Once    RIR ADULT CRUISE------------552.00X2------1,104.00
    Verify Specific Remark Is Only Written Once    RIR ADULT TAX/PORT CHARGES---34.54X2---------69.08
    Verify Specific Remark Is Only Written Once    RIR ADULT RAIL--------------124.00X2--------248.00
    Verify Specific Remark Is Only Written Once    RIR INFANT PRICE------------322.00X1--------322.00
    Verify Specific Remark Is Only Written Once    RIR INFANT CRUISE-----------230.00X1--------230.00
    Verify Specific Remark Is Only Written Once    RIR INFANT TAX/PORT CHARGES--16.54X1---------16.54
    Verify Specific Remark Is Only Written Once    RIR INFANT RAIL--------------40.00X1---------40.00
    Verify Specific Remark Is Only Written Once    RIR INFANT INSURANCE---------55.00X1---------55.00
    Verify Specific Remark Is Only Written Once    RIR HOTEL/ACCOMMODATION-----235.67
    Verify Specific Remark Is Only Written Once    RIR CAR RENTAL--------------123.00
    Verify Specific Remark Is Only Written Once    RIR LESS DEPOSIT PAID-------400.00
    Verify Specific Remark Is Only Written Once    RIR TOTAL HOLIDAY COST-----8512.83
    Verify Specific Remark Is Only Written Once    RIR BALANCE DUE------------8112.83
    Verify Specific Remark Is Only Written Once    RIR ---- BALANCE OF 8112.83 IS DUE 29NOV19 ----
    Close Cryptic Display Window
    Logout To Amadeus Sell Connect
    [Teardown]    Close Browser

Verify that ITC package cost and UDID Remarks Are Written for Multiple Passenger with Child and Infant
    [Tags]    us7746    us7994
    Login To Amadeus Sell Connect
    Enter GDS Command    NM1Lastname/Firstname Mr    NM1Leisure/Amadeus Mr    NM1POLO/LISA Mrs    SS U21074 Y 28NOV YYZORD GK3 / 11551440 / ABCDEFG    RM*CF/-RBM0000000N    RU1AHK1SIN21NOV-CWT RETENTION SEGMENT
    ...    APE-TEST@email.com
    Open CA Migration Window
    Click Wrap PNR
    Populate Reporting Required Fields
    Click Panel    Remarks
    Select Package    Itemize Package Cost Remarks
    Enter Currency for ITC    CAD
    Enter Number of Pax for Adult    2
    Enter Base Price for Adult    1222.00
    Enter Base Price Tax for Adult    212.00
    Enter Base Cruise for Adult    552.00
    Enter Base Cruise Tax for Adult    34.54
    Enter Rail Cost for Adult    124.00
    Enter Insurance for Adult    111.00
    Enter Number of Pax for Child    1
    Enter Base Price for Child    622.00
    Enter Base Price Tax for Child    123.00
    Enter Base Cruise for Child    520.00
    Enter Base Cruise Tax for Child    16.54
    Enter Rail Cost for Child    60.00
    Enter Insurance for Child    55.00
    Enter Number of Pax for Infant    1
    Enter Base Price for Infant    322.00
    Enter Base Price Tax for Infant    62.00
    Enter Base Cruise for Infant    230.00
    Enter Base Cruise Tax for Infant    16.54
    Enter Rail Cost for Infant    40.00
    Enter Insurance for Infant    55.00
    Enter ITC Hotel Cost    335.67
    Enter ITC Car Cost    123.23
    Enter ITC Deposit    2332.00
    Enter ITC Balance Due Date    09232019
    Enter ITC Commission Amount    221.00
    Click Submit To PNR
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    RM *U43/-SEP19
    Verify Specific Remark Is Written In The PNR    RM *U41/-11660.14
    Verify Specific Remark Is Written In The PNR    RM *U42/-221.00
    Verify Specific Remark Is Only Written Once    RIR THE FOLLOWING COSTS ARE SHOWN IN CAD
    Verify Specific Remark Is Only Written Once    RIR ADULT PRICE------------1222.00X2------2,444.00
    Verify Specific Remark Is Only Written Once    RIR ADULT TAXES-------------212.00X2--------424.00
    Verify Specific Remark Is Only Written Once    RIR ADULT CRUISE------------552.00X2------1,104.00
    Verify Specific Remark Is Only Written Once    RIR ADULT TAX/PORT CHARGES---34.54X2---------69.08
    Verify Specific Remark Is Only Written Once    RIR ADULT RAIL--------------124.00X2--------248.00
    Verify Specific Remark Is Only Written Once    RIR ADULT INSURANCE---------111.00X2--------222.00
    Verify Specific Remark Is Only Written Once    RIR CHILD PRICE-------------622.00X1--------622.00
    Verify Specific Remark Is Only Written Once    RIR CHILD TAXES-------------123.00X1--------123.00
    Verify Specific Remark Is Only Written Once    RIR CHILD CRUISE------------520.00X1--------520.00
    Verify Specific Remark Is Only Written Once    RIR CHILD TAX/PORT CHARGES---16.54X1---------16.54
    Verify Specific Remark Is Only Written Once    RIR CHILD RAIL---------------60.00X1---------60.00
    Verify Specific Remark Is Only Written Once    RIR CHILD INSURANCE----------55.00X1---------55.00
    Verify Specific Remark Is Only Written Once    RIR INFANT PRICE------------322.00X1--------322.00
    Verify Specific Remark Is Only Written Once    RIR INFANT TAXES-------------62.00X1---------62.00
    Verify Specific Remark Is Only Written Once    RIR INFANT CRUISE-----------230.00X1--------230.00
    Verify Specific Remark Is Only Written Once    RIR INFANT TAX/PORT CHARGES--16.54X1---------16.54
    Verify Specific Remark Is Only Written Once    RIR INFANT RAIL--------------40.00X1---------40.00
    Verify Specific Remark Is Only Written Once    RIR INFANT INSURANCE---------55.00X1---------55.00
    Verify Specific Remark Is Only Written Once    RIR HOTEL/ACCOMMODATION-----335.67
    Verify Specific Remark Is Only Written Once    RIR CAR RENTAL--------------123.23
    Verify Specific Remark Is Only Written Once    RIR LESS DEPOSIT PAID------2332.00
    Verify Specific Remark Is Only Written Once    RIR TOTAL HOLIDAY COST----13992.14
    Verify Specific Remark Is Only Written Once    RIR BALANCE DUE-----------11660.14
    Verify Specific Remark Is Only Written Once    RIR ---- BALANCE OF 11660.14 IS DUE 23SEP19 ----
    Close Cryptic Display Window
    Switch To Command Page
    Open CA Migration Window
    Click Wrap PNR
    Click Panel    Remarks
    Select Package    Itemize Package Cost Remarks
    Enter Currency for ITC    USD
    Enter Number of Pax for Adult    1
    Enter Rail Cost for Adult    ${EMPTY}
    Enter Number of Pax for Child    ${EMPTY}
    Enter Base Price for Child    ${EMPTY}
    Enter Base Price Tax for Child    ${EMPTY}
    Enter Base Cruise for Child    ${EMPTY}
    Enter Base Cruise Tax for Child    ${EMPTY}
    Enter Rail Cost for Child    ${EMPTY}
    Enter Insurance for Child    ${EMPTY}
    Enter Number of Pax for Infant    ${EMPTY}
    Enter Base Price for Infant    ${EMPTY}
    Enter Base Price Tax for Infant    ${EMPTY}
    Enter Base Cruise for Infant    ${EMPTY}
    Enter Base Cruise Tax for Infant    ${EMPTY}
    Enter Rail Cost for Infant    ${EMPTY}
    Enter Insurance for Infant    ${EMPTY}
    Enter ITC Deposit    1500
    Enter ITC Balance Due Date    11232019
    Enter ITC Commission Amount    ${EMPTY}
    Click Submit To PNR
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    RM *U43/-NOV19
    Verify Specific Remark Is Written In The PNR    RM *U41/-1090.44
    Verify Specific Remark Is Written In The PNR    RM *U42/-0.00
    Verify Specific Remark Is Only Written Once    RIR THE FOLLOWING COSTS ARE SHOWN IN USD
    Verify Specific Remark Is Only Written Once    RIR ADULT PRICE------------1222.00X1------1,222.00
    Verify Specific Remark Is Only Written Once    RIR ADULT TAXES-------------212.00X1--------212.0
    Verify Specific Remark Is Only Written Once    RIR ADULT CRUISE------------552.00X1--------552.00
    Verify Specific Remark Is Only Written Once    RIR ADULT TAX/PORT CHARGES---34.54X1---------34.54
    Verify Specific Remark Is Only Written Once    RIR ADULT INSURANCE---------111.00X1--------111.00
    Verify Specific Remark Is Only Written Once    RIR HOTEL/ACCOMMODATION-----335.67
    Verify Specific Remark Is Only Written Once    RIR CAR RENTAL--------------123.23
    Verify Specific Remark Is Only Written Once    RIR LESS DEPOSIT PAID------1500.00
    Verify Specific Remark Is Only Written Once    RIR TOTAL HOLIDAY COST-----2590.44
    Verify Specific Remark Is Only Written Once    RIR BALANCE DUE------------1090.44
    Verify Specific Remark Is Only Written Once    RIR ---- BALANCE OF 1090.44 IS DUE 23NOV19 ----
    Verify Specific Remark Is Not Written In The PNR    CHILD
    Verify Specific Remark Is Not Written In The PNR    INFANT
    Close Cryptic Display Window
    Logout To Amadeus Sell Connect
    [Teardown]    Close Browser

Verify that ITC package cost and UDID Remarks Are Written for Multiple Passenger with Infant
    [Tags]    us7746    us7994
    Login To Amadeus Sell Connect
    Enter GDS Command    NM1Lastname/Firstname Mr    NM1Leisure/Amadeus Mr    NM1POLO/LISA Mrs    SS U21074 Y 28NOV YYZORD GK3 / 11551440 / ABCDEFG    RM*CF/-RBM000000N    APE-12345
    ...    RU1AHK1SIN2NOV-CWT RETENTION SEGMENT
    Open CA Migration Window
    Click Wrap PNR
    Populate Reporting Required Fields
    Click Panel    Remarks
    Select Package    Itemize Package Cost Remarks
    Enter Currency for ITC    CAD
    Enter Number of Pax for Adult    2
    Enter Base Price for Adult    1234.00
    Enter Base Price Tax for Adult    567.80
    Enter Rail Cost for Adult    244.00
    Enter Number of Pax for Infant    1
    Enter Base Price for Infant    670.00
    Enter Base Price Tax for Infant    231.00
    Enter Rail Cost for Infant    122.30
    Enter Insurance for Infant    126.50
    Enter ITC Hotel Cost    1222.00
    Enter ITC Deposit    405.20
    Enter ITC Balance Due Date    09142019
    Click Submit To PNR
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    RM *U43/-SEP19
    Verify Specific Remark Is Written In The PNR    RM *U41/-9000.00
    Verify Specific Remark Is Only Written Once    RIR THE FOLLOWING COSTS ARE SHOWN IN CAD
    Verify Specific Remark Is Only Written Once    RIR ADULT PRICE------------1234.00X2------2,468.00
    Verify Specific Remark Is Only Written Once    RIR ADULT TAXES-------------567.80X2------1,135.60
    Verify Specific Remark Is Only Written Once    RIR ADULT RAIL--------------244.00X2--------488.00
    Verify Specific Remark Is Only Written Once    RIR INFANT PRICE------------670.00X1--------670.00
    Verify Specific Remark Is Only Written Once    RIR INFANT TAXES------------231.00X1--------231.00
    Verify Specific Remark Is Only Written Once    RIR INFANT RAIL-------------122.30X1--------122.30
    Verify Specific Remark Is Only Written Once    RIR INFANT INSURANCE--------126.50X1--------126.50
    Verify Specific Remark Is Only Written Once    RIR HOTEL/ACCOMMODATION----1222.00
    Verify Specific Remark Is Only Written Once    RIR LESS DEPOSIT PAID-------405.20
    Verify Specific Remark Is Only Written Once    RIR TOTAL HOLIDAY COST-----9405.20
    Verify Specific Remark Is Only Written Once    RIR BALANCE DUE------------9000.00
    Verify Specific Remark Is Only Written Once    RIR ---- BALANCE OF 9000.00 IS DUE 14SEP19 ----
    Verify Specific Remark Is Not Written In The PNR    CHILD
    Verify Specific Remark Is Not Written In The PNR    RM *U42/-
    Close Cryptic Display Window
    Open CA Migration Window
    Click Wrap PNR
    Click Panel    Remarks
    Select Package    Itemize Package Cost Remarks
    Enter Currency for ITC    PHP
    Enter Number of Pax for Child    1
    Enter Base Price for Child    670.00
    Enter Base Price Tax for Child    244.00
    Enter Rail Cost for Child    129.00
    Enter Insurance for Child    150.00
    Enter ITC Car Cost    50.00
    Enter ITC Deposit    5000.00
    Enter ITC Balance Due Date    12142019
    Click Submit To PNR
    Close CA Migration Window
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    RM *U43/-DEC19
    Verify Specific Remark Is Written In The PNR    RM *U41/-8546.80
    Verify Specific Remark Is Not Written In The PNR    RM *U42/-
    Verify Specific Remark Is Only Written Once    RIR THE FOLLOWING COSTS ARE SHOWN IN PHP
    Verify Specific Remark Is Only Written Once    RIR ADULT PRICE------------1234.00X2------2,468.00
    Verify Specific Remark Is Only Written Once    RIR ADULT TAXES-------------567.80X2------1,135.60
    Verify Specific Remark Is Only Written Once    RIR ADULT RAIL--------------244.00X2--------488.00
    Verify Specific Remark Is Only Written Once    RIR CHILD PRICE-------------670.00X1--------670.00
    Verify Specific Remark Is Only Written Once    RIR CHILD TAXES-------------244.00X1--------244.00
    Verify Specific Remark Is Only Written Once    RIR CHILD RAIL--------------129.00X1--------129.00
    Verify Specific Remark Is Only Written Once    RIR CHILD INSURANCE---------150.00X1--------150.00
    Verify Specific Remark Is Only Written Once    RIR INFANT PRICE------------670.00X1--------670.00
    Verify Specific Remark Is Only Written Once    RIR INFANT TAXES------------231.00X1--------231.00
    Verify Specific Remark Is Only Written Once    RIR INFANT RAIL-------------122.30X1--------122.30
    Verify Specific Remark Is Only Written Once    RIR INFANT INSURANCE--------126.50X1--------126.50
    Verify Specific Remark Is Only Written Once    RIR HOTEL/ACCOMMODATION----1222.00
    Verify Specific Remark Is Only Written Once    RIR CAR RENTAL---------------50.00
    Verify Specific Remark Is Only Written Once    RIR LESS DEPOSIT PAID------5000.00
    Verify Specific Remark Is Only Written Once    RIR TOTAL HOLIDAY COST----13546.80
    Verify Specific Remark Is Only Written Once    RIR BALANCE DUE------------8546.80
    Verify Specific Remark Is Only Written Once    RIR ---- BALANCE OF 8546.80 IS DUE 14DEC19 ----
    Close Cryptic Display Window

Verify that ITC package cost and UDID Remarks Are Deleted
    [Tags]    us7998
    Open CA Migration Window
    Click Wrap PNR
    Click Panel    Remarks
    Select Package    Delete Package Remarks
    Click Submit To PNR
    Close CA Migration Window
    Open Cryptic Display Window
    Verify Specific Remark Is Not Written In The PNR    RM *U43/-DEC19
    Verify Specific Remark Is Not Written In The PNR    RM *U41/-8546.80
    Verify Specific Remark Is Not Written In The PNR    RM *U42/-
    Verify Specific Remark Is Not Written In The PNR    RIR THE FOLLOWING COSTS ARE SHOWN IN PHP
    Verify Specific Remark Is Not Written In The PNR    RIR ADULT PRICE------------1234.00X2------2,468.00
    Verify Specific Remark Is Not Written In The PNR    RIR ADULT TAXES-------------567.80X2------1,135.60
    Verify Specific Remark Is Not Written In The PNR    RIR ADULT RAIL--------------244.00X2--------488.00
    Verify Specific Remark Is Not Written In The PNR    RIR CHILD PRICE-------------670.00X1--------670.00
    Verify Specific Remark Is Not Written In The PNR    RIR CHILD TAXES-------------244.00X1--------244.00
    Verify Specific Remark Is Not Written In The PNR    RIR CHILD RAIL--------------129.00X1--------129.00
    Verify Specific Remark Is Not Written In The PNR    RIR CHILD INSURANCE---------150.00X1--------150.00
    Verify Specific Remark Is Not Written In The PNR    RIR INFANT PRICE------------670.00X1--------670.00
    Verify Specific Remark Is Not Written In The PNR    RIR INFANT TAXES------------231.00X1--------231.00
    Verify Specific Remark Is Not Written In The PNR    RIR INFANT RAIL-------------122.30X1--------122.30
    Verify Specific Remark Is Not Written In The PNR    RIR INFANT INSURANCE--------126.50X1--------126.50
    Verify Specific Remark Is Not Written In The PNR    RIR HOTEL/ACCOMMODATION----1222.00
    Verify Specific Remark Is Not Written In The PNR    RIR CAR RENTAL---------------50.00
    Verify Specific Remark Is Not Written In The PNR    RIR LESS DEPOSIT PAID------5000.00
    Verify Specific Remark Is Not Written In The PNR    RIR TOTAL HOLIDAY COST----13546.80
    Verify Specific Remark Is Not Written In The PNR    RIR BALANCE DUE------------8546.80
    Verify Specific Remark Is Not Written In The PNR    RIR ---- BALANCE OF 8546.80 IS DUE 14DEC19 ----
    Close Cryptic Display Window
    Logout To Amadeus Sell Connect
    [Teardown]    Close Browser
