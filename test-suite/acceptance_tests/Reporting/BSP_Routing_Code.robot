*** Settings ***
Force Tags        US7540
Resource          ../../resources/common/common_library.robot
Resource          ../../resources/common/core.robot
Resource          ../../resources/common/leisure_window.robot
Resource          ../amadeus_ca_resource.robot

*** Test Cases ***
Verify That "Reason for Travel" In FS Remark Is "2" If the CF Line Is RBM, and Trip Type is Leisure
    Login To Amadeus Sell Connect
    Enter GDS Command    NM1Leisure/Amadeus Mr    RM*CF/-RBM0000000N
    Open CA Migration Window
    Click Panel    Reporting
    Select Routing Code    Asia incl. India
    Click Submit To PNR
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Comment    Verify Specific Remark Is Written In The PNR    FS 92
    Close Cryptic Display Window
    Logout To Amadeus Sell Connect

Verify That "Reason for Travel" In FS Remark Is "2" If the CF Line Is RBP, and Trip Type is Corporate
    Login To Amadeus Sell Connect
    Enter GDS Command    NM1Leisure/Amadeus Mr    RM*CF/-RBP0000000C
    Open CA Migration Window
    Click Panel    Reporting
    Select Routing Code    Canada and St. Pierre et Miquelon
    Click Submit To PNR
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    FS 92
    Close Cryptic Display Window
    Logout To Amadeus Sell Connect

Verify That "Reason for Travel" In FS Remark Is "2" If the CF Line Is Not RBM and RBP, and Trip Type is Leisure
    Login To Amadeus Sell Connect
    Enter GDS Command    NM1Leisure/Amadeus Mr    RM*CF/-AAA0000000N
    Open CA Migration Window
    Click Panel    Reporting
    Select Routing Code    Asia incl. India
    Click Submit To PNR
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Comment    Verify Specific Remark Is Written In The PNR    FS 92
    Close Cryptic Display Window
    Logout To Amadeus Sell Connect

Verify That "Reason for Travel" In FS Remark Is "1" If the CF Line Is Not RBM and RBP, and Trip Type is Corporate
    Login To Amadeus Sell Connect
    Enter GDS Command    NM1Leisure/Amadeus Mr    RM*CF/-AAA0000000C
    Open CA Migration Window
    Click Panel    Reporting
    Select Routing Code    Asia incl. India
    Click Submit To PNR
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Comment    Verify Specific Remark Is Written In The PNR    FS 92
    Close Cryptic Display Window
    Logout To Amadeus Sell Connect
