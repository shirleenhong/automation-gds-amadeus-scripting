*** Settings ***
Force Tags        leisure
Resource          ../../resources/common/global_resources.robot

*** Test Cases ***
Verify That "Reason for Travel" In FS Remark Is "2" If the CF Line Is RBM, and Trip Type is Leisure
    [Tags]    us7540
    Login To Amadeus Sell Connect
    Enter GDS Command    NM1Leisure/Amadeus Mr    RM*CF/-RBM0000000N    RU1AHK1YYZ12DEC-/TYP-TOR/SUC-ZZ/SC-YYZ/SD-12dec/ST-0900/EC-YQB/ED-25dec/ET-1800/PS-X    APE-12345
    Open CA Migration Window
    Click Wrap PNR
    Click Panel    Reporting
    Select Routing Code    Europe-incl. Morocco/Tunisia/Algeria/Greenland
    Enter Destination Code    YYZ
    Populate RBC Conceirge Required Fields
    Click Submit To PNR
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    FS 42
    Close Cryptic Display Window
    Logout To Amadeus Sell Connect
    [Teardown]    Close Browser

Verify That "Reason for Travel" In FS Remark Is "2" If the CF Line Is RBP, and Trip Type is Corporate
    [Tags]    us7540
    Login To Amadeus Sell Connect
    Enter GDS Command    NM1Leisure/Amadeus Mr    RM*CF/-RBP0000000C    RU1AHK1YYZ12DEC-/TYP-TOR/SUC-ZZ/SC-YYZ/SD-12dec/ST-0900/EC-YQB/ED-25dec/ET-1800/PS-X    RU1AHK1SIN21NOV-CWT RETENTION SEGMENT    APE-12345
    Open CA Migration Window
    Click Wrap PNR
    Click Panel    Reporting
    Select Routing Code    Africa
    Enter Destination Code    YYZ
    Populate RBC Conceirge Required Fields
    Click Submit To PNR
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    FS 52
    Close Cryptic Display Window
    Logout To Amadeus Sell Connect
    [Teardown]    Close Browser

Verify That "Reason for Travel" In FS Remark Is "2" If the CF Line Is Not RBM and RBP, and Trip Type is Leisure
    [Tags]    us7540    sanity
    Login To Amadeus Sell Connect
    Enter GDS Command    NM1Leisure/Amadeus Mr    RM*CF/-HIJ0000000N    RU1AHK1YYZ12DEC-/TYP-TOR/SUC-ZZ/SC-YYZ/SD-12dec/ST-0900/EC-YQB/ED-25dec/ET-1800/PS-X    APE-12345
    Open CA Migration Window
    Click Wrap PNR
    Click Panel    Reporting
    Select Routing Code    Caribbean and Bermuda
    Enter Destination Code    YYZ
    Select Insurance Liability Waiver    All Inclusive or Premium Protection Insurance
    Click Panel    Payment
    Click Payment Tab    Leisure Fee
    Enter Reason for No Association Fees    Not applicable
    Click Submit To PNR
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    FS 22
    Close Cryptic Display Window
    Logout To Amadeus Sell Connect
    [Teardown]    Close Browser

Verify That "Reason for Travel" In FS Remark Is "1" If the CF Line Is Not RBM and RBP, and Trip Type is Corporate
    [Tags]    us7540
    Login To Amadeus Sell Connect
    Enter GDS Command    NM1Leisure/Amadeus Mr    RM*CF/-AAA0000000C    RU1AHK1YYZ12DEC-/TYP-TOR/SUC-ZZ/SC-YYZ/SD-12dec/ST-0900/EC-YQB/ED-25dec/ET-1800/PS-X    RU1AHK1SIN21NOV-CWT RETENTION SEGMENT    APE-12345
    Open CA Migration Window
    Click Wrap PNR
    Click Panel    Reporting
    Select Routing Code    Australia/New Zealand/Islands of the Pacific incl. Hawaii excl. Guam
    Enter Destination Code    YYZ
    Select Insurance Liability Waiver    All Inclusive or Premium Protection Insurance
    Click Panel    Payment
    Click Payment Tab    Leisure Fee
    Enter Reason for No Association Fees    Not applicable
    Click Submit To PNR
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    FS 81
    Close Cryptic Display Window
    Logout To Amadeus Sell Connect
    [Teardown]    Close Browser
