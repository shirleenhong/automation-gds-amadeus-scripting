*** Settings ***
Force Tags        leisure
Resource          ../../resources/common/global_resources.robot

*** Test Cases ***
Verify That Fare Rule Optional Fare Remarks Are Written For Ticket Min/Max Stay
    [Tags]    us8128    us11513
    Login To Amadeus Sell Connect
    Enter GDS Command    NM1Lastname/Firstname Mr    SS AF1074 Y 10OCT YYZORD GK1 / 11551440 / ABCDEFG    SS U21075 Y 15OCT ORDYYT GK1 / 01301240 / 1234567    SS AC1074 Y 18OCT YYTMSP GK1 / 12551140 / ABCD123    RM*CF/-RBM000000N    APE-12345
    ...    RU1AHK1SIN2OCT-CWT RETENTION SEGMENT
    Open CA Migration Window
    Click Wrap PNR
    Populate Reporting Required Fields
    Click Panel    Remarks
    Click Remarks Tab    Fare Rule
    Click Add Fare Rule Button
    Select Airline    3 AF1074 Y10OCT YYZORD GK1 1155 1440 10OCT ABCDEFG
    Select Fare Rule Remarks    Ticket MIN/MAX Stay
    Click Save Button
    Click Remarks Tab    Associated Remarks
    Select Segment For Associated Remark    1    3
    Add Associated Remarks    1    Testing Fare Rule
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
    Enter GDS Command    NM1Lastname/Firstname Mr    SS AF1074 Y 10OCT YYZORD GK1 / 11551440 / ABCDEFG    SS U21075 Y 15OCT ORDYYT GK1 / 01301240 / 1234567    SS AC1074 Y 18OCT YYTMSP GK1 / 12551140 / ABCD123    RM*CF/-RBM000000N    APE-12345
    ...    RU1AHK1SIN2OCT-CWT RETENTION SEGMENT
    Open CA Migration Window
    Click Wrap PNR
    Populate Reporting Required Fields
    Click Panel    Remarks
    Click Remarks Tab    Fare Rule
    Click Add Fare Rule Button
    Select Airline    3 AF1074 Y10OCT YYZORD GK1 1155 1440 10OCT ABCDEFG
    Select Fare Rule Remarks    Ticket Non-Refundable
    Select Fare Rule Remarks    Non-Ref/Tkt Value
    Click Save Button
    Click Remarks Tab    Associated Remarks
    Select Segment For Associated Remark    1    3
    Add Associated Remarks    1    Testing Fare Rule 2
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
    Enter GDS Command    NM1Lastname/Firstname Mr    SS AF1074 Y 10OCT YYZORD GK1 / 11551440 / ABCDEFG    SS U21075 Y 15OCT ORDYYT GK1 / 01301240 / 1234567    SS AC1074 Y 18OCT YYTMSP GK1 / 12551140 / ABCD123    RM*CF/-RBM000000N    APE-12345
    ...    RU1AHK1SIN2OCT-CWT RETENTION SEGMENT
    Open CA Migration Window
    Click Wrap PNR
    Populate Reporting Required Fields
    Click Panel    Remarks
    Click Remarks Tab    Fare Rule
    Click Add Fare Rule Button
    Select Airline    3 AF1074 Y10OCT YYZORD GK1 1155 1440 10OCT ABCDEFG
    Enter Currency    CAD
    Select Ticket Amount Or Percentage    Ticket Amount
    Enter Ticket Amount    123.50
    Click Save Button
    Click Submit To PNR
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    RIR YOUR TICKET IS 123.50 CAD NON-REFUNDABLE IF CANCELLED.
    Verify Specific Remark Is Written In The PNR    RIR SOME CHANGES ARE ALLOWED UNDER RESTRICTIVE CONDITIONS FOR A    True
    Verify Specific Remark Is Written In The PNR    RIR CHANGE FEE AND/OR POSSIBLE INCREASE IN FARE.
    Close Cryptic Display Window
    Logout To Amadeus Sell Connect
    [Teardown]    Close Browser

Verify That Fare Rule Optional Fare Remarks Are Written For Non-Refundable %
    [Tags]    us8128
    Login To Amadeus Sell Connect
    Enter GDS Command    NM1Lastname/Firstname Mr    NM1Leisure/Amadeus Mr    SS U21074 Y 10OCT YYZORD GK2 / 11551440 / ABCDEFG    SS AF1075 Y 15OCT ORDYYT GK2 / 01301240 / 1234567    SS AC1074 Y 18OCT YYTMSP GK2 / 12551140 / ABCD123    RM*CF/-RBM000000N
    ...    APE-12345    RU1AHK1SIN30OCT-CWT RETENTION SEGMENT
    Open CA Migration Window
    Click Wrap PNR
    Populate Reporting Required Fields
    Click Panel    Remarks
    Click Remarks Tab    Fare Rule
    Click Add Fare Rule Button
    Select Airline    4 AF1075 Y15OCT ORDYYT GK2 0130 1240 15OCT 1234567
    Enter Currency    CAD
    Select Ticket Amount Or Percentage    Non-Refundable
    Enter Non-Refundable Percentage    23
    Click Save Button
    Click Submit To PNR
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    RIR YOUR TICKET IS 23 PERCENT NON-REFUNDABLE IF CANCELLED
    Verify Specific Remark Is Written In The PNR    RIR SOME CHANGES ARE ALLOWED UNDER RESTRICTIVE CONDITIONS FOR A    True
    Verify Specific Remark Is Written In The PNR    RIR CHANGE FEE AND/OR POSSIBLE INCREASE IN FARE.
    Close Cryptic Display Window
    Logout To Amadeus Sell Connect
    [Teardown]    Close Browser

Verify That Multiple Fare Rule Can Be Added In the PNR
    [Tags]    us8128
    Login To Amadeus Sell Connect
    Enter GDS Command    NM1Leisure/Amadeus Mr    NM1Lastname/Firstname Mr    SS U21074 Y 10OCT YYZORD GK2 / 11551440 / ABCDEFG    SS AF1075 Y 15OCT ORDYYT GK2 / 01301240 / 1234567    SS AC1074 Y 18OCT YYTMSP GK2 / 12551140 / ABCD123    RM*CF/-RBM000000N
    ...    APE12345    TKOK    RU1AHK1SIN30OCT-CWT RETENTION SEGMENT
    Open CA Migration Window
    Click Wrap PNR
    Populate Reporting Required Fields
    Click Panel    Remarks
    Click Remarks Tab    Fare Rule
    Click Add Fare Rule Button
    Select Airline    4 AF1075 Y15OCT ORDYYT GK2 0130 1240 15OCT 1234567
    Enter Currency    USD
    Enter Minimum Change Fee    300
    Click Save Button
    Sleep    3
    Click Remarks Tab    Associated Remarks
    Select Segment For Associated Remark    1    5
    Add Associated Remarks    1    Testing Fare Rule
    Click Submit To PNR
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    RIR TESTING FARE RULE/S5
    Verify Specific Remark Is Written In The PNR    RIR THE MINIMUM CHANGE FEE IS 300.00 USD
    Close Cryptic Display Window
    Logout To Amadeus Sell Connect
    [Teardown]    Close Browser
