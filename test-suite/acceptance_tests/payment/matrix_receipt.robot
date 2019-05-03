*** Settings ***
Resource          ../../resources/common/common_library.robot
Resource          ../../resources/common/core.robot
Resource          ../amadeus_ca_resource.robot

*** Test Cases ***
Verify Acccounting Remarks Are Written For FOP Cash For Single Passenger
    Login To Amadeus Sell Connect
    Comment    Enter GDS Command    NM1Leisure/Amadeus Mr    SS U21074 Y 28NOV BCNBSL GK1 / 11551440 / ABCDEFG    TKOK    APM -PAX*+1 763 2123364    RFCWTPTEST
    ...    ER
    Enter GDS Command    NM1Leisure/Amadeus Mr    RU1AHK1SIN12DEC-/TYP-TOR/SUC-ZZ/SC-sin/SD-12dec/ST-0900/EC-sin/ED-12dec/ET-1800/PS-X    TKOK    APM -PAX*+1 763 2123364    RFCWTPTEST    ER

Verify Acccounting Remarks Are Written For FOP Cash For Multiple Passenger
    Login To Amadeus Sell Connect
    Enter GDS Command    NM3POLO/LISA Mrs/Marco Mr/Riza Ms
