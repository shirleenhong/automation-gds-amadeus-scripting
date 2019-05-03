*** Settings ***
Resource          ../../resources/common/common_library.robot
Resource          ../../resources/common/core.robot
Resource          ../../resources/common/leisure_window.robot
Resource          ../amadeus_ca_resource.robot

*** Test Cases ***
Verify Passive Segments Is Added In the PNR
    Login To Amadeus Sell Connect
    Enter GDS Command    NM1Leisure/Amadeus Mr    RM*CF/-RBM000000N    RU1AHK1SIN12DEC-/TYP-TOR/SUC-ZZ/SC-sin/SD-12dec/ST-0900/EC-sin/ED-12dec/ET-1800/PS-X
    Open CA Migration Window
    Click Panel    Passive Segment
    Add Passive Segment    ABC    YYZ    YTO
    Click Submit To PNR
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    RM *CF/-RBM000000N
    Verify Specific Remark Is Written In The PNR    MIS 1A HK1 SIN 12DEC-/TYP-TOR/SUC-ZZ/SC-SIN/SD-12DEC/ST-0900/EC-SIN/ED-12DEC/ET-1800/PS-X    True
    Close Cryptic Display Window
