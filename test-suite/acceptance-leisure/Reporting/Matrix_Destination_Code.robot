*** Settings ***
Force Tags        leisure
Resource          ../../resources/common/global_resources.robot

*** Test Cases ***
Verify Destination City Codes List When There Is 1 Segment Type In The PNR
    [Tags]    us7539
    Login To Amadeus Sell Connect
    Enter GDS Command    NM1Leisure/Amadeus Mr    RM*CF/-RBM0000000N    RU1AHK1MNL12DEC-/TYP-TOR/SUC-ZZ/SC-MNL/SD-12dec/ST-0900/EC-sin/ED-24dec/ET-1800/PS-X    RU1AHK1SIN21NOV-CWT RETENTION SEGMENT    APE-12345
    Open CA Migration Window
    Click Wrap PNR
    Click Panel    Reporting
    Select Routing Code    Asia incl. India
    Enter Destination Code    MNL
    Populate RBC Conceirge Required Fields
    Click Submit To PNR
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    RM *DE/-MNL
    Close Cryptic Display Window
    Logout To Amadeus Sell Connect
    [Teardown]    Close Browser

Verify Destination City Codes List When There Is More Than 1 Segment Type In The PNR    
    [Tags]    us7539
    Login To Amadeus Sell Connect
    Enter GDS Command    NM1Leisure/Amadeus Mr    RM*CF/-RBM0000000N    RU1AHK1MNL12DEC-/TYP-TOR/SUC-ZZ/SC-mla/SD-12dec/ST-0900/EC-sin/ED-20dec/ET-1800/PS-X    RU1AHK1SIN12NOV-/TYP-TRN/SUN-NS/SUC-YY/SC-SIN/SD-21DEC/ST-1010/EC-HKG/ED-23DEC/ET-1320/CF-12345    RU1AHK1HKG23DEC-/TYP-INS/SUN-ABC INSURANCE/SUC-ZZ/SC-HKG/SD-23DEC/ST-1800/EC-MLA/ED-29DEC/ET-0800/CF-12345    RU1AHK1SIN21NOV-CWT RETENTION SEGMENT
    ...    APE-12345
    Open CA Migration Window
    Click Wrap PNR
    Click Panel    Reporting
    Select Routing Code    Asia incl. India
    Enter Destination Code    HKG
    Populate RBC Conceirge Required Fields
    Click Submit To PNR
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    RM *DE/-HKG
    Close Cryptic Display Window
    Logout To Amadeus Sell Connect
    [Teardown]    Close Browser
