*** Settings ***
Force Tags        corp
Library           String
Library           SeleniumLibrary
Library           Collections
Library           Screenshot
Resource          ../../pages/amadeus.robot
Resource          ../../pages/remarks.robot
Resource          ../../pages/base.robot

*** Test Cases ***
Verify Document Remark Can Be Written In The PNR
    [Tags]    us10039
    Login To Amadeus Sell Connect Acceptance
    Move Single Passenger And Add Single BSP Segment With TST
    Verify That Single Document PNR Can Be Added

Verify Multiple Document Remark Can Be Written In The PNR
    [Tags]    us10039
    Login To Amadeus Sell Connect Acceptance
    Move Single Passenger And Add Single BSP Segment With TST
    Verify That Multiple Document PNR Can Be Added