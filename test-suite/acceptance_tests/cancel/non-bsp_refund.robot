*** Settings ***
Resource          ../../resources/common/global_resources.robot

*** Test Cases ***
Verify That RMX Remarks Are Written in the PNR
    [Tags]    us8214
    Login To Amadeus Sell Connect
    Enter GDS Command    NM1Lastname/Firstname Mr    SS AF1074 Y 10NOV YYZCDG GK1 / 11551440 / ABCDEFG    SS U21075 Y 15NOV CDGMAD GK1 / 11551440 / 1234567    RM*CF/-RBM000000N    APETEST@EMAIL.COM
    Open CA Migration Window
    Click Wrap PNR
    Populate Reporting Required Fields
    Click Submit To PNR
    Click Cancel Segment