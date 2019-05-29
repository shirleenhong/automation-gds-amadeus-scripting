*** Settings ***
Resource          ../../resources/common/global_resources.robot

*** Test Cases ***
Verify that RBC redemption RMK remarks are written in the PNR for AIR
   [Tags]    us9199
    Login To Amadeus Sell Connect
    Enter GDS Command    NM1Lastname/Firstname Mr    SS AC1074 Y 20DEC YYZYUL GK1 / 11551440 / ABCDEFG    RU1AHK3SIN23DEC-/TYP-TOR/SUC-ZZ/SC-sin/SD-12dec/ST-0900/EC-sin/ED-12dec/ET-1800/PS-X    SS AC1075 Y 25DEC YULYVR GK3 / 11551440 / 1234567
    ...    RM*CF/-RBM000000N    RU1AHK1SIN21NOV-CWT RETENTION SEGMENT    ape1234    tkok
    Open CA Migration Window
    Click Load PNR
    Click Panel    Reporting
    Select Routing Code    Asia incl. India
    Enter Destination Code    BSL
    Select If PNR Travel to Any Countries Listed    NONE OF THE ABOVE
    Click Panel    Remarks
    Click Remarks Tab   Rbc Points Redemption
    Click Add RBC Redemption Points Button
    Select RBC Product Type     AIR
    Enter Cardholder First Name And Last Name  First Name    Last Name    
    Enter First And Last Visa Number  111222    4444
    Enter RBC Points Redeemed  12345
    Enter Value Of Points    100223
    Enter Supplier Name  AAA
    Enter GST Per Adult  1
    Enter HST Per Adult  2
    Enter QST Per Adult  3
    Enter All Other Taxes  4
    Enter Number of Adults  1
    Enter Total Base Cost Per Adult  6.5
    Enter GST Per Child  1.3
    Enter HST Per Child  2.51
    Enter QST Per Child  6
    Enter All Other Taxes For Child  8.99
    Click Save Button