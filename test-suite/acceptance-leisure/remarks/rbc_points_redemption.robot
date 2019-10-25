*** Settings ***
Force Tags        leisure
Resource          ../../resources/common/global_resources.robot

*** Test Cases ***
Verify that RBC redemption RMK remarks are written in the PNR for AIR
    [Tags]    us9199    sanity
    Login To Amadeus Sell Connect
    Enter GDS Command    NM1Lastname/Firstname Mr    SS AC1074 Y 20DEC YYZYUL GK1 / 11551440 / ABCDEFG    SS AC1075 Y 25DEC YULYVR GK1 / 11551440 / 1234567    RM*CF/-RBP000000N    RU1AHK1SIN21NOV-CWT RETENTION SEGMENT    APE-testt@email.com
    Open CA Migration Window
    Click Wrap PNR
    Populate Reporting Required Fields
    Click Panel    Remarks
    Click Remarks Tab    RBC Points Redemption
    Click Add RBC Redemption Points Button
    Select RBC Product Type    AIR
    Enter Cardholder First Name And Last Name    First Name    Last Name
    Enter First And Last Visa Number    111222    4444
    Enter RBC Points Redeemed    12345
    Enter Value Of Points    100223
    Enter Supplier Name    AAA
    Enter Number of Adults    1
    Enter Total Base Cost Per Adult    16.5
    Enter GST Per Adult    1
    Enter HST Per Adult    2
    Enter QST Per Adult    3
    Enter All Other Taxes    4
    Enter Number Of Children    1
    Enter Total Base Cost Per Child    8.99
    Enter GST Per Child    1.3
    Enter HST Per Child    2.51
    Enter QST Per Child    6
    Enter All Other Taxes For Child    2.75
    Click Save Button
    Click Submit To PNR
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    RMK 1 CARDHOLDER NAME - LAST NAME/FIRST NAME
    Verify Specific Remark Is Written In The PNR    RMK 1 CARDHOLDER VISA VI111222XXXXXX4444 USED TO REDEEM POINTS    True
    Verify Specific Remark Is Written In The PNR    RMK 1 1.5 PERCENT POINTS REDEMPTION
    Verify Specific Remark Is Written In The PNR    RMK 1 POINTS REDEEMED 12345 VALUE 100223.00
    Verify Specific Remark Is Written In The PNR    RMK 1 PRODUCT TYPE - AIR
    Verify Specific Remark Is Written In The PNR    RMK 1 SUPPLIER NAME - AAA
    Verify Specific Remark Is Written In The PNR    RMK 1 NUMBER OF ADULTS - 1
    Verify Specific Remark Is Written In The PNR    RMK 1 TOTAL BASE COST PER ADULT - 16.50
    Verify Specific Remark Is Written In The PNR    RMK 1 GST COST PER ADULT - 1.00
    Verify Specific Remark Is Written In The PNR    RMK 1 HST COST PER ADULT - 2.00
    Verify Specific Remark Is Written In The PNR    RMK 1 QST COST PER ADULT - 3.00
    Verify Specific Remark Is Written In The PNR    RMK 1 ALL OTHER TAXES PER ADULT - 4.00
    Verify Specific Remark Is Written In The PNR    RMK 1 NUMBER OF CHILDREN - 1
    Verify Specific Remark Is Written In The PNR    RMK 1 TOTAL BASE COST PER CHILD - 8.99
    Verify Specific Remark Is Written In The PNR    RMK 1 GST COST PER CHILD - 1.30
    Verify Specific Remark Is Written In The PNR    RMK 1 HST COST PER CHILD - 2.51
    Verify Specific Remark Is Written In The PNR    RMK 1 QST COST PER CHILD - 6.00
    Verify Specific Remark Is Written In The PNR    RMK 1 ALL OTHER TAXES PER CHILD - 2.75
    Close Cryptic Display Window
    Logout To Amadeus Sell Connect
    [Teardown]    Close Browser

Verify that RBC redemption RMK remarks are written in the PNR for CAR
    [Tags]    us9199
    Login To Amadeus Sell Connect
    Enter GDS Command    NM1Lastname/Firstname Mr    NM1Leisure/Amadeus Mr    SS AC1074 Y 20DEC YYZYUL GK2 / 11551440 / ABCDEFG    SS AC1075 Y 25DEC YULYVR GK2 / 11551440 / 1234567    RM*CF/-RBM000000N    RU1AHK1SIN21NOV-CWT RETENTION SEGMENT
    ...    APE-12345
    Open CA Migration Window
    Click Wrap PNR
    Populate Reporting Required Fields
    Click Panel    Remarks
    Click Remarks Tab    RBC Points Redemption
    Click Add RBC Redemption Points Button
    Select RBC Product Type    CAR
    Enter Cardholder First Name And Last Name    Amadeus Test    Leisure Test
    Enter First And Last Visa Number    123456    1234
    Enter RBC Points Redeemed    1000
    Enter Value Of Points    250750
    Enter Supplier Name    BBB
    Enter Number of Bookings    2
    Enter Total Base Cost Per Booking    123.00
    Enter GST Per Adult    3
    Enter HST Per Adult    4
    Enter QST Per Adult    5
    Enter All Other Taxes    1.99
    Click Save Button
    Click Submit To PNR
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    RMK 1 CARDHOLDER NAME - LEISURE TEST/AMADEUS TEST
    Verify Specific Remark Is Written In The PNR    RMK 1 CARDHOLDER VISA VI123456XXXXXX1234 USED TO REDEEM POINTS    True
    Verify Specific Remark Is Written In The PNR    RMK 1 1 PERCENT POINTS REDEMPTION
    Verify Specific Remark Is Written In The PNR    RMK 1 POINTS REDEEMED 1000 VALUE 250750.00
    Verify Specific Remark Is Written In The PNR    RMK 1 PRODUCT TYPE - CAR
    Verify Specific Remark Is Written In The PNR    RMK 1 SUPPLIER NAME - BBB
    Verify Specific Remark Is Written In The PNR    RMK 1 NUMBER OF BOOKINGS    - 2
    Verify Specific Remark Is Written In The PNR    RMK 1 TOTAL BASE COST PER BOOKING - 123.00
    Verify Specific Remark Is Written In The PNR    RMK 1 GST COST PER BOOKING - 3.00
    Verify Specific Remark Is Written In The PNR    RMK 1 HST COST PER BOOKING - 4.00
    Verify Specific Remark Is Written In The PNR    RMK 1 QST COST PER BOOKING - 5.00
    Verify Specific Remark Is Written In The PNR    RMK 1 ALL OTHER TAXES PER BOOKING - 1.99
    Close Cryptic Display Window
    Logout To Amadeus Sell Connect
    [Teardown]    Close Browser

Verify that RBC redemption RMK remarks are written in the PNR for HOTEL
    [Tags]    us9199
    Login To Amadeus Sell Connect
    Enter GDS Command    NM1Lastname/Firstname Mr    NM1Leisure/Amadeus Mr    SS AC1074 Y 20DEC YYZYUL GK2 / 11551440 / ABCDEFG    SS AC1075 Y 25DEC YULYVR GK2 / 11551440 / 1234567    RM*CF/-RBM000000N    RU1AHK1SIN21NOV-CWT RETENTION SEGMENT
    ...    APE-test@email.com
    Open CA Migration Window
    Click Wrap PNR
    Populate Reporting Required Fields
    Click Panel    Remarks
    Click Remarks Tab    RBC Points Redemption
    Click Add RBC Redemption Points Button
    Select RBC Product Type    HOTEL
    Enter Cardholder First Name And Last Name    Amadeus Test    Leisure Test
    Enter First And Last Visa Number    123456    5555
    Enter RBC Points Redeemed    1000
    Enter Value Of Points    250750
    Enter Supplier Name    CCC
    Enter Number of Bookings    1
    Enter Total Base Cost Per Booking    1121.00
    Enter GST Per Adult    3.75
    Enter HST Per Adult    1
    Enter QST Per Adult    5
    Enter All Other Taxes    8.99
    Enter PCT    2
    Click Save Button
    Click Submit To PNR
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    RMK 1 CARDHOLDER NAME - LEISURE TEST/AMADEUS TEST
    Verify Specific Remark Is Written In The PNR    RMK 1 CARDHOLDER VISA VI123456XXXXXX5555 USED TO REDEEM POINTS    True
    Verify Specific Remark Is Written In The PNR    RMK 1 2 PERCENT POINTS REDEMPTION
    Verify Specific Remark Is Written In The PNR    RMK 1 POINTS REDEEMED 1000 VALUE 250750.00
    Verify Specific Remark Is Written In The PNR    RMK 1 PRODUCT TYPE - HOTEL
    Verify Specific Remark Is Written In The PNR    RMK 1 SUPPLIER NAME - CCC
    Verify Specific Remark Is Written In The PNR    RMK 1 NUMBER OF BOOKINGS - 1
    Verify Specific Remark Is Written In The PNR    RMK 1 TOTAL BASE COST PER BOOKING - 1121.00
    Verify Specific Remark Is Written In The PNR    RMK 1 GST COST PER BOOKING - 3.75
    Verify Specific Remark Is Written In The PNR    RMK 1 HST COST PER BOOKING - 1.00
    Verify Specific Remark Is Written In The PNR    RMK 1 QST COST PER BOOKING - 5.00
    Verify Specific Remark Is Written In The PNR    RMK 1 ALL OTHER TAXES PER BOOKING - 8.99
    Close Cryptic Display Window
    Logout To Amadeus Sell Connect
    [Teardown]    Close Browser

Verify that RBC redemption RMK remarks are written in the PNR for CRUISE
    [Tags]    us9199
    Login To Amadeus Sell Connect
    Enter GDS Command    NM1Lastname/Firstname Mr    NM1Leisure/Amadeus Mr    SS AC1074 Y 20DEC YYZYUL GK2 / 11551440 / ABCDEFG    RM*CF/-RBM000000N    RU1AHK1SIN21NOV-CWT RETENTION SEGMENT    APE-112345
    Open CA Migration Window
    Click Wrap PNR
    Populate Reporting Required Fields
    Click Panel    Remarks
    Click Remarks Tab    RBC Points Redemption
    Click Add RBC Redemption Points Button
    Select RBC Product Type    CRUISE
    Enter Cardholder First Name And Last Name    Long leisure firstname    Long leisure last name
    Enter First And Last Visa Number    321234    4321
    Enter RBC Points Redeemed    1234567
    Enter Value Of Points    123456
    Enter Supplier Name    Testing RBC points for cruise1
    Enter Number of Adults    2
    Enter Total Base Cost Per Adult    10000.50
    Enter GST Per Adult    121
    Enter HST Per Adult    23
    Enter QST Per Adult    41
    Enter All Other Taxes    14
    Enter Number Of Children    1
    Enter Total Base Cost Per Child    8.99
    Enter GST Per Child    1.3
    Enter HST Per Child    2.51
    Enter QST Per Child    6
    Enter All Other Taxes For Child    2.75
    Click Save Button
    Click Submit To PNR
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    RMK 1 CARDHOLDER NAME - LONG LEISURE LAST NAME/LONG LEISURE FIRSTNAME    True
    Verify Specific Remark Is Written In The PNR    RMK 1 CARDHOLDER VISA VI321234XXXXXX4321 USED TO REDEEM POINTS    True
    Verify Specific Remark Is Written In The PNR    RMK 1 1 PERCENT POINTS REDEMPTION
    Verify Specific Remark Is Written In The PNR    RMK 1 POINTS REDEEMED 1234567 VALUE 123456.00
    Verify Specific Remark Is Written In The PNR    RMK 1 PRODUCT TYPE - CRUISE
    Verify Specific Remark Is Written In The PNR    RMK 1 SUPPLIER NAME - TESTING RBC POINTS FOR CRUISE1
    Verify Specific Remark Is Written In The PNR    RMK 1 NUMBER OF ADULTS - 2
    Verify Specific Remark Is Written In The PNR    RMK 1 TOTAL BASE COST PER ADULT - 10000.50
    Verify Specific Remark Is Written In The PNR    RMK 1 GST COST PER ADULT - 121.00
    Verify Specific Remark Is Written In The PNR    RMK 1 HST COST PER ADULT - 23.00
    Verify Specific Remark Is Written In The PNR    RMK 1 QST COST PER ADULT - 41.00
    Verify Specific Remark Is Written In The PNR    RMK 1 ALL OTHER TAXES PER ADULT - 14.00
    Verify Specific Remark Is Written In The PNR    RMK 1 NUMBER OF CHILDREN - 1
    Verify Specific Remark Is Written In The PNR    RMK 1 TOTAL BASE COST PER CHILD - 8.99
    Verify Specific Remark Is Written In The PNR    RMK 1 GST COST PER CHILD - 1.30
    Verify Specific Remark Is Written In The PNR    RMK 1 HST COST PER CHILD - 2.51
    Verify Specific Remark Is Written In The PNR    RMK 1 QST COST PER CHILD - 6.00
    Verify Specific Remark Is Written In The PNR    RMK 1 ALL OTHER TAXES PER CHILD - 2.75
    Close Cryptic Display Window
    Logout To Amadeus Sell Connect
    [Teardown]    Close Browser

Verify that RBC redemption RMK remarks are written in the PNR for VACATION And OTHER
    [Tags]    us9199    us10913
    Login To Amadeus Sell Connect
    Enter GDS Command    NM1Lastname/Firstname Mr    NM1Leisure/Amadeus Mr    SS AC1074 Y 20DEC YYZYUL GK2 / 11551440 / ABCDEFG    RU1AHK2SIN23DEC-/TYP-TOR/SUC-ZZ/SC-sin/SD-12dec/ST-0900/EC-sin/ED-12dec/ET-1800/PS-X    SS AC1075 Y 25DEC YULYVR GK2 / 11551440 / 1234567    RM*CF/-RBM000000N
    ...    RU1AHK2SIN21NOV-CWT RETENTION SEGMENT    APE-1214
    Open CA Migration Window
    Click Wrap PNR
    Populate Reporting Required Fields
    Click Panel    Remarks
    Click Remarks Tab    RBC Points Redemption
    Click Add RBC Redemption Points Button
    Select RBC Product Type    VACATION PACKAGE
    Enter Cardholder First Name And Last Name    Leisure firstname    Leisure lastname
    Enter First And Last Visa Number    321234    4321
    Enter RBC Points Redeemed    1234567
    Enter Value Of Points    123456
    Enter Supplier Name    Testing PROPERTY supplier
    Enter Number of Adults    2
    Enter Total Base Cost Per Adult    10000.50
    Enter GST Per Adult    121
    Enter HST Per Adult    23
    Enter QST Per Adult    41
    Enter All Other Taxes    14
    Enter Number Of Children    1
    Enter Total Base Cost Per Child    8.99
    Enter All Other Taxes For Child    2.75
    Click Save Button
    Click Add RBC Redemption Points Button
    Select RBC Product Type    OTHER
    Enter Other Product Type Description    Other Product description
    Enter Cardholder First Name And Last Name    firstname    lastname
    Enter First And Last Visa Number    654321    2222
    Enter RBC Points Redeemed    1111
    Enter Value Of Points    10000
    Enter Supplier Name    Testing other supplier
    Enter Number of Adults    2
    Enter Total Base Cost Per Adult    123.50
    Enter GST Per Adult    21
    Enter HST Per Adult    2
    Enter QST Per Adult    1
    Enter All Other Taxes    4
    Enter Number Of Children    1
    Enter Total Base Cost Per Child    1.25
    Enter GST Per Child    1.3
    Enter HST Per Child    2.51
    Enter QST Per Child    6
    Enter All Other Taxes For Child    3.00
    Click Save Button
    Click Submit To PNR
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    RMK 1 CARDHOLDER NAME - LEISURE LASTNAME/LEISURE FIRSTNAME
    Verify Specific Remark Is Written In The PNR    RMK 1 CARDHOLDER VISA VI321234XXXXXX4321 USED TO REDEEM POINTS    True
    Verify Specific Remark Is Written In The PNR    RMK 1 1 PERCENT POINTS REDEMPTION
    Verify Specific Remark Is Written In The PNR    RMK 1 POINTS REDEEMED 1234567 VALUE 123456.00
    Verify Specific Remark Is Written In The PNR    RMK 1 PRODUCT TYPE - VACATION PACKAGE
    Verify Specific Remark Is Written In The PNR    RMK 1 SUPPLIER NAME - TESTING PROPERTY SUPPLIER
    Verify Specific Remark Is Written In The PNR    RMK 1 NUMBER OF ADULTS - 2
    Verify Specific Remark Is Written In The PNR    RMK 1 TOTAL BASE COST PER ADULT - 10000.50
    Verify Specific Remark Is Written In The PNR    RMK 1 GST COST PER ADULT - 121.00
    Verify Specific Remark Is Written In The PNR    RMK 1 HST COST PER ADULT - 23.00
    Verify Specific Remark Is Written In The PNR    RMK 1 QST COST PER ADULT - 41.00
    Verify Specific Remark Is Written In The PNR    RMK 1 ALL OTHER TAXES PER ADULT - 14.00
    Verify Specific Remark Is Written In The PNR    RMK 1 NUMBER OF CHILDREN - 1
    Verify Specific Remark Is Written In The PNR    RMK 1 TOTAL BASE COST PER CHILD - 8.99
    Verify Specific Remark Is Written In The PNR    RMK 1 ALL OTHER TAXES PER CHILD - 2.75
    Verify Specific Remark Is Not Written In The PNR    RMK 1 GST COST PER CHILD
    Verify Specific Remark Is Not Written In The PNR    RMK 1 HST COST PER CHILD
    Verify Specific Remark Is Not Written In The PNR    RMK 1 QST COST PER CHILD
    Verify Specific Remark Is Written In The PNR    RMK 2 CARDHOLDER NAME - LASTNAME/FIRSTNAME
    Verify Specific Remark Is Written In The PNR    RMK 2 CARDHOLDER VISA VI654321XXXXXX2222 USED TO REDEEM POINTS    True
    Verify Specific Remark Is Written In The PNR    RMK 2 1 PERCENT POINTS REDEMPTION
    Verify Specific Remark Is Written In The PNR    RMK 2 POINTS REDEEMED 1111 VALUE 10000.00
    Verify Specific Remark Is Written In The PNR    RMK 2 PRODUCT TYPE - OTHER-OTHER PRODUCT DESCRIPTION
    Verify Specific Remark Is Written In The PNR    RMK 2 SUPPLIER NAME - TESTING OTHER SUPPLIER
    Verify Specific Remark Is Written In The PNR    RMK 2 NUMBER OF ADULTS - 2
    Verify Specific Remark Is Written In The PNR    RMK 2 TOTAL BASE COST PER ADULT - 123.50
    Verify Specific Remark Is Written In The PNR    RMK 2 GST COST PER ADULT - 21.00
    Verify Specific Remark Is Written In The PNR    RMK 2 HST COST PER ADULT - 2.00
    Verify Specific Remark Is Written In The PNR    RMK 2 QST COST PER ADULT - 1.00
    Verify Specific Remark Is Written In The PNR    RMK 2 ALL OTHER TAXES PER ADULT - 4.00
    Verify Specific Remark Is Written In The PNR    RMK 2 NUMBER OF CHILDREN - 1
    Verify Specific Remark Is Written In The PNR    RMK 2 TOTAL BASE COST PER CHILD - 1.25
    Verify Specific Remark Is Written In The PNR    RMK 2 GST COST PER CHILD - 1.30
    Verify Specific Remark Is Written In The PNR    RMK 2 HST COST PER CHILD - 2.51
    Verify Specific Remark Is Written In The PNR    RMK 2 QST COST PER CHILD - 6.00
    Verify Specific Remark Is Written In The PNR    RMK 2 ALL OTHER TAXES PER CHILD - 3.00
    Close Cryptic Display Window
    Logout To Amadeus Sell Connect
    [Teardown]    Close Browser
