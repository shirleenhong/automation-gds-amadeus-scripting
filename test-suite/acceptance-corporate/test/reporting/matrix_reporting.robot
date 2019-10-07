*** Settings ***
Force Tags        corp
Library           String
Library           SeleniumLibrary
Library           Collections
Library           Screenshot
Resource          ../../pages/amadeus.robot
Resource          ../../pages/reporting.robot
Resource          ../../pages/base.robot

*** Test Cases ***
Verify That CN and NUC Remarks Should Be Written and/or Updated In The PNR For OFC Agents With Exchanged PNR
    [Tags]    us10550
    Login To Amadeus Sell Connect Acceptance
    Move Single Passenger And Add Single BSP Segment With TST
    Create Exchange and NE Remark For Single Passenger With Single BSP Segment
    Select Counselor Identity: OFC
    Select File Finisher to NO
    Verify CN And NUC Remark Are Written Correctly For Exchanged PNR
    Verify If The Default CIC Number Value Displayed Is ADT
    Enter CIC Number Value: IFC
    Verify CN And NUC Remark Are Updated Correctly For Exchanged PNR
    [Teardown]    Logout To Amadeus Sell Connect

Verify That CN and NUC Remark Should Be Written and/or Updated In The PNR For OFC Agents With IFC CN Number Remark
    [Tags]    us10550
    Login To Amadeus Sell Connect Acceptance
    Move Single Passenger And Add Single BSP Segment With IFC CN Number And TST
    Select Counselor Identity: OFC
    Verify If The Default CIC Number Value Displayed Is IFC
    Enter CIC Number Value: QWE
    Verify CN And NUC Remark Are Written Correctly For PNR With IFC CN Number Remark
    [Teardown]    Logout To Amadeus Sell Connect

Verify That CN and NUC Remark Should Be Written and/or Updated In The PNR For OFC Agents With Hotel Changed PNR
    [Tags]    us10550
    Login To Amadeus Sell Connect Acceptance
    Create PNR With 1 Hotel Segment/s With Invoice
    Select Counselor Identity: OFC
    Select File Finisher to YES
    Enter CIC Number Value: IFC
    Verify CN And NUC Remark Are Written Correctly For PNR With Hotel and Invoice Remark
    Verify If The Default CIC Number Value Displayed Is IFC
    Enter CIC Number Value: ASD
    Verify CN And NUC Remark Are Updated Correctly For PNR With Hotel and Invoice Remark
    [Teardown]    Logout To Amadeus Sell Connect
