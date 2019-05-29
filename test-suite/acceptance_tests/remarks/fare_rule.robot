*** Settings ***
Resource          ../../resources/common/global_resources.robot

*** Test Cases ***
Verify That Fare Rule Optional Fare Remarks Are Written For Ticket Min/Max Stay
    [Tags]    us8128
    Login To Amadeus Sell Connect
    Enter GDS Command    NM1Lastname/Firstname Mr    SS AF1074 Y 10DEC YYZORD GK1 / 11551440 / ABCDEFG    SS U21075 Y 15DEC ORDYYT GK1 / 01301240 / 1234567    SS AC1074 Y 18DEC YYTMSP GK1 / 12551140 / ABCD123    RM*CF/-RBM000000N    APE12345
    ...    TKOK    RU1AHK1SIN2NOV-CWT RETENTION SEGMENT
    Open CA Migration Window
    Click Load PNR
    Click Panel    Reporting
    Select Routing Code    Asia incl. India
    Enter Destination Code    CDG
    Select If PNR Travel to Any Countries Listed    NONE OF THE ABOVE
    Click Panel    Remarks
    Click Remarks Tab    Fare Rule
    Click Add Fare Rule Button
    Select Airline    3 AF1074 Y10DEC YYZORD GK1 1155 1440 10DEC ABCDEFG
    Select Fare Rule Remarks    Ticket MIN/MAX Stay
    Add Associated Remarks    Testing Fare Rule
    Click Save Button
    Click Submit To PNR
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    RIR TICKET HAS A MINIMUM AND/OR MAXIMUM STAY REQUIREMENT.
    Verify Specific Remark Is Written In The PNR    RIR TESTING FARE RULE/S2
    Close Cryptic Display Window
    Logout To Amadeus Sell Connect
    [Teardown]    Close Browser

Verify That Fare Rule Optional Fare Remarks Are Written For Ticket Non-Refundable And Non-Ref
    [Tags]    us8128
    Login To Amadeus Sell Connect
    Enter GDS Command    NM1Lastname/Firstname Mr    SS AF1074 Y 10DEC YYZORD GK1 / 11551440 / ABCDEFG    SS U21075 Y 15DEC ORDYYT GK1 / 01301240 / 1234567    SS AC1074 Y 18DEC YYTMSP GK1 / 12551140 / ABCD123    RM*CF/-RBM000000N    APE12345
    ...    TKOK    RU1AHK1SIN2NOV-CWT RETENTION SEGMENT
    Open CA Migration Window
    Click Load PNR
    Click Panel    Reporting
    Select Routing Code    Asia incl. India
    Enter Destination Code    CDG
    Select If PNR Travel to Any Countries Listed    NONE OF THE ABOVE
    Click Panel    Remarks
    Click Remarks Tab    Fare Rule
    Click Add Fare Rule Button
    Select Airline    3 AF1074 Y10DEC YYZORD GK1 1155 1440 10DEC ABCDEFG
    Select Fare Rule Remarks    Ticket Non-Refundable
    Select Fare Rule Remarks    Non-Ref/Tkt Value
    Add Associated Remarks    Testing Fare Rule 2
    Click Save Button
    Click Submit To PNR
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    RIR TICKET IS NONREFUNDABLE - NO CHANGES CAN BE MADE.
    Verify Specific Remark Is Written In The PNR    RIR TICKET IS NON-REFUNDABLE - UNDER CERTAIN CONDITIONS
    Verify Specific Remark Is Written In The PNR    RIR VALUE MAY BE APPLIED FOR FUTURE TRAVEL.
    Verify Specific Remark Is Written In The PNR    RIR TESTING FARE RULE 2/S2
    Close Cryptic Display Window
    Logout To Amadeus Sell Connect
    [Teardown]    Close Browser

Verify That Fare Rule Optional Fare Remarks Are Written For Ticket Amount
    [Tags]    us8128
    Login To Amadeus Sell Connect
    Enter GDS Command    NM1Lastname/Firstname Mr    SS AF1074 Y 10DEC YYZORD GK1 / 11551440 / ABCDEFG    SS U21075 Y 15DEC ORDYYT GK1 / 01301240 / 1234567    SS AC1074 Y 18DEC YYTMSP GK1 / 12551140 / ABCD123    RM*CF/-RBM000000N    APE12345
    ...    TKOK    RU1AHK1SIN2NOV-CWT RETENTION SEGMENT
    Open CA Migration Window
    Click Load PNR
    Click Panel    Reporting
    Select Routing Code    Asia incl. India
    Enter Destination Code    CDG
    Select If PNR Travel to Any Countries Listed    NONE OF THE ABOVE
    Click Panel    Remarks
    Click Remarks Tab    Fare Rule
    Click Add Fare Rule Button
    Select Airline    3 AF1074 Y10DEC YYZORD GK1 1155 1440 10DEC ABCDEFG
    Enter Currency    CAD
    Select Ticket Amount Or Percentage    Ticket Amount
    Enter Ticket Amount    123.50
    Add Associated Remarks    Testing ticket amount
    Click Save Button
    Click Submit To PNR
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    RIR YOUR TICKET IS 123.50 CAD NON-REFUNDABLE IF CANCELLED.
    Verify Specific Remark Is Written In The PNR    RIR SOME CHANGES ARE ALLOWED UNDER RESTRICTIVE CONDITIONS FOR A    True
    Verify Specific Remark Is Written In The PNR    RIR CHANGE FEE AND/OR POSSIBLE INCREASE IN FARE.
    Verify Specific Remark Is Written In The PNR    RIR TESTING TICKET AMOUNT/S2
    Close Cryptic Display Window
    Logout To Amadeus Sell Connect
    [Teardown]    Close Browser

Verify That Fare Rule Optional Fare Remarks Are Written For Non-Refundable %
    [Tags]    us8128
    Login To Amadeus Sell Connect
    Enter GDS Command    NM1Lastname/Firstname Mr    NM1Leisure/Amadeus Mr    SS U21074 Y 10DEC YYZORD GK2 / 11551440 / ABCDEFG    SS AF1075 Y 15DEC ORDYYT GK2 / 01301240 / 1234567    SS AC1074 Y 18DEC YYTMSP GK2 / 12551140 / ABCD123    RM*CF/-RBM000000N
    ...    APE12345    TKOK    RU1AHK1SIN2JAN-CWT RETENTION SEGMENT
    Open CA Migration Window
    Click Load PNR
    Click Panel    Reporting
    Select Routing Code    Asia incl. India
    Enter Destination Code    CDG
    Select If PNR Travel to Any Countries Listed    NONE OF THE ABOVE
    Click Panel    Remarks
    Click Remarks Tab    Fare Rule
    Click Add Fare Rule Button
    Select Airline    4 AF1075 Y15DEC ORDYYT GK2 0130 1240 15DEC 1234567
    Enter Currency    CAD
    Select Ticket Amount Or Percentage    Non-Refundable
    Enter Non-Refundable Percentage    23
    Add Associated Remarks    Testing ticket percentage
    Click Save Button
    Click Submit To PNR
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    RIR YOUR TICKET IS 23 PERCENT NON-REFUNDABLE IF CANCELLED
    Verify Specific Remark Is Written In The PNR    RIR SOME CHANGES ARE ALLOWED UNDER RESTRICTIVE CONDITIONS FOR A    True
    Verify Specific Remark Is Written In The PNR    RIR CHANGE FEE AND/OR POSSIBLE INCREASE IN FARE.
    Verify Specific Remark Is Written In The PNR    RIR TESTING TICKET PERCENTAGE/S4
    Close Cryptic Display Window
    Logout To Amadeus Sell Connect
    [Teardown]    Close Browser

Verify That Multiple Fare Rule Can Be Added In the PNR
    [Tags]    us8128
    Login To Amadeus Sell Connect
    Enter GDS Command    NM1Leisure/Amadeus Mr    NM1Lastname/Firstname Mr    SS U21074 Y 10DEC YYZORD GK2 / 11551440 / ABCDEFG    SS AF1075 Y 15DEC ORDYYT GK2 / 01301240 / 1234567    SS AC1074 Y 18DEC YYTMSP GK2 / 12551140 / ABCD123    RM*CF/-RBM000000N
    ...    APE12345    TKOK    RU1AHK1SIN2JAN-CWT RETENTION SEGMENT
    Open CA Migration Window
    Click Load PNR
    Click Panel    Reporting
    Select Routing Code    Asia incl. India
    Enter Destination Code    CDG
    Select If PNR Travel to Any Countries Listed    NONE OF THE ABOVE
    Click Panel    Remarks
    Click Remarks Tab    Fare Rule
    Click Add Fare Rule Button
    Select Airline     5 AC1074 Y18DEC YYTMSP GK2 1255 1140 18DEC ABCD123
    Enter Departure/Arrival     Canada to United States Of America
    Select Fare Rule
    Add Associated Remarks    Testing Fare Rule
    Click Save Button
    Click Add Fare Rule Button
    Select Airline    4 AF1075 Y15DEC ORDYYT GK2 0130 1240 15DEC 1234567
    Enter Currency    USD
    Enter Minimum Change Fee    300
    Click Save Button   
    Click Submit To PNR
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    RIR CANADA TO UNITED STATES OF AMERICA
    Verify Specific Remark Is Written In The PNR    RIR TESTING FARE RULE/S5
    Verify Specific Remark Is Written In The PNR    RIR THE MINIMUM CHANGE FEE IS 300.00 USD
    Close Cryptic Display Window
    Logout To Amadeus Sell Connect
    [Teardown]    Close Browser    
    