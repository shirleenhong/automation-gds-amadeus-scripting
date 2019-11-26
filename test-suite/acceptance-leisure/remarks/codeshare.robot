*** Settings ***
Force Tags        leisure
Resource          ../../resources/common/global_resources.robot

*** Test Cases ***
Verify Codeshare Remark Is Written In The PNR
    [Tags]    us8269
    Login To Amadeus Sell Connect
    Enter GDS Command    NM1Lastname/Firstname Mr    SS U21074 Y 28OCT YYZORD GK1 / 11551440 / ABCDEFG    RM*CF/-RBM000000N    APE-12345    RU1AHK1SIN2OCT-CWT RETENTION SEGMENT
    Open CA Migration Window
    Click Wrap PNR
    Populate Reporting Required Fields
    Click Panel    Remarks
    Click Remarks Tab    Codeshare
    Select Segment From The List    1    3
    Enter Check-in At Details    1    Codeshare Testing
    Click Submit To PNR
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    RIR CHECK-IN AT ${checkin_at.upper()} TICKET COUNTER/S2
    Close Cryptic Display Window
    Open CA Migration Window
    Click Wrap PNR
    Click Panel    Remarks
    Click Remarks Tab    Codeshare
    Enter Check-in At Details    1    Codeshare update
    Click Submit To PNR
    Close CA Migration Window
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    RIR CHECK-IN AT ${checkin_at.upper()} TICKET COUNTER/S2
    Close Cryptic Display Window
    Logout To Amadeus Sell Connect
    [Teardown]    Close Browser

Verify Multiple Codeshare Remarks Are Written In The PNR
    [Tags]    us8269    sanity
    Login To Amadeus Sell Connect
    Enter GDS Command    NM1Lastname/Firstname Mr    SS AF1074 Y 10OCT YYZORD GK1 / 11551440 / ABCDEFG    SS U21075 Y 15OCT ORDYUL GK1 / 11551440 / 1234567    SS AC1074 Y 18OCT YULYYZ GK1 / 11551440 / ABCD123    SS AC1074 Y 22OCT YYZYYT GK1 / 11551440 / ABCD464    RM*CF/-RBM000000N
    ...    APE-12345    RU1AHK1SIN3OCT-CWT RETENTION SEGMENT
    Open CA Migration Window
    Click Wrap PNR
    Populate Reporting Required Fields
    Click Panel    Remarks
    Click Remarks Tab    Codeshare
    Select Segment From The List    1    3    4
    Enter Check-in At Details    1    Codeshare Testing
    Click Add Codeshare Button
    Select Segment From The List    2    5
    Enter Check-in At Details    2    2nd codeshare remark
    Click Submit To PNR
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    RIR CHECK-IN AT CODESHARE TESTING TICKET COUNTER/S2-3
    Verify Specific Remark Is Written In The PNR    RIR CHECK-IN AT 2ND CODESHARE REMARK TICKET COUNTER/S4
    Close Cryptic Display Window
    Logout To Amadeus Sell Connect
    [Teardown]    Close Browser
