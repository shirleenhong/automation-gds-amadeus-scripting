*** Settings ***
Resource          ../../resources/common/global_resources.robot

*** Test Cases ***
Verify That Email And Itinerary Remarks Are Written When There Are existing Emails and Language Remark In The PNR
    [Tags]    us8216
    Login To Amadeus Sell Connect
    Enter GDS Command    NM1Leisure/Amadeus Mr    RU1AHK1YYZ12NOV-/TYP-TOR/SUC-ZZ/SC-YYZ/SD-12NOV/ST-0900/EC-YQB/ED-13NOV/ET-1800/PS-X    RM*CF/-RBM0000000N    TKOK
    Enter GDS Command    APE-test@email.com    
    Open CA Migration Window
    Click Wrap PNR
    Populate Reporting Required Fields
    Click Panel    CWT Itinerary

