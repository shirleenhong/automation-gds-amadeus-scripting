*** Settings ***
Force Tags        leisure
Resource          ../../resources/common/global_resources.robot

*** Test Cases ***
Verify Visa And Passport Remarks Are Written In The PNR
    [Tags]    us8912    sanity
    Login To Amadeus Sell Connect
    Enter GDS Command    NM1Lastname/Firstname Mr    SS AF1074 Y 10DEC YYZCDG GK1 / 11551440 / ABCDEFG    SS U21075 Y 15DEC CDGMAD GK1 / 11551440 / 1234567    SS AC1074 Y 18DEC MADORD GK1 / 11551440 / ABCD123    SS AC1074 Y 22DEC ORDCDG GK1 / 11551440 / ABCD464    SS AC1074 Y 26DEC CDGFRA GK1 / 11551440 / DEFG123
    ...    SS AC1074 Y 30DEC FRAYYZ GK1 / 11551440 / YYYD123    RU1AHK1SIN21NOV-CWT RETENTION SEGMENT
    Enter GDS Command    RMP/CITIZENSHIP-CA    RM*CF/-RBM000000N    APE-12345
    Open CA Migration Window
    Click Wrap PNR
    Populate Reporting Required Fields
    Click Panel    Remarks
    Click Remarks Tab    Visa and Passport
    Click E-Traveladvisories Button
    Enter Passport Name    Passport Name
    Select Visa Checkbox    2    4
    Click Submit To PNR
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    RM INTERNATIONAL TRAVEL ADVISORY SENT
    Verify Specific Remark Is Written In The PNR    RM ADVISED PASSPORT NAME VALID PASSPORT IS REQUIRED
    Verify Specific Remark Is Written In The PNR    RIR FRANCE - A VALID PASSPORT IS REQUIRED/S2-3,5-6
    Verify Specific Remark Is Written In The PNR    RIR SPAIN - A VALID PASSPORT AND VISA ARE REQUIRED/S3-4
    Verify Specific Remark Is Written In The PNR    RIR UNITED STATES - A VALID PASSPORT IS REQUIRED/S4-5
    Verify Specific Remark Is Written In The PNR    RIR GERMANY - A VALID PASSPORT AND VISA ARE REQUIRED/S6-7
    Close Cryptic Display Window

Verify Visa And Passport Remarks Are Updated In The PNR
    [Tags]    us8912    sanity
    Open CA Migration Window
    Click Wrap PNR
    Click Panel    Remarks
    Click Remarks Tab    Visa and Passport
    Enter Passport Name    Leisure Lastname
    Select Visa Checkbox    1    2    3    4
    Click Submit To PNR
    Close CA Migration Window
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    RM INTERNATIONAL TRAVEL ADVISORY SENT
    Verify Specific Remark Is Written In The PNR    RM ADVISED LEISURE LASTNAME VALID PASSPORT IS REQUIRED
    Verify Specific Remark Is Written In The PNR    RIR FRANCE - A VALID PASSPORT AND VISA ARE REQUIRED/S2-3,5-6
    Verify Specific Remark Is Written In The PNR    RIR SPAIN - A VALID PASSPORT AND VISA ARE REQUIRED/S3
    Verify Specific Remark Is Written In The PNR    RIR UNITED STATES - A VALID PASSPORT AND VISA ARE REQUIRED/S4    True
    Verify Specific Remark Is Written In The PNR    RIR GERMANY - A VALID PASSPORT AND VISA ARE REQUIRED/S6
    Verify Specific Remark Is Not Written In The PNR    RM ADVISED PASSPORT NAME VALID PASSPORT IS REQUIRED
    Verify Specific Remark Is Not Written In The PNR    RIR FRANCE - A VALID PASSPORT IS REQUIRED/S2,5
    Verify Specific Remark Is Not Written In The PNR    RIR UNITED STATES - A VALID PASSPORT IS REQUIRED/S4
    Close Cryptic Display Window
    Logout To Amadeus Sell Connect
    [Teardown]    Close Browser
