*** Settings ***
Force Tags        corp
Library           String
Library           SeleniumLibrary
Library           Collections
Library           Screenshot
Resource          ../../pages/amadeus.robot
Resource          ../../pages/reporting.robot
Resource          ../../pages/base.robot
Test Setup        Login To Amadeus Sell Connect Acceptance
Test Teardown    Close All Browsers

*** Variables ***
${test_file_name}    car_savings_code

*** Test Cases ***
Verify That Car Savings Code Remark Should Be Written When There Is A Single Passive Car Segment In The PNR
    [Tags]    us14342    full_regression
    Create PNR For Car Savings Code, Single Passive Segment
    Add Car Savings Code For 1 Segments
    Verify Car Savings Code Remark For Single Passive Car Segments

Verify That Car Savings Code Remark Should Be Written When There Are Multiple Passive Car Segments In The PNR
    [Tags]    us14342
    Create PNR For Car Savings Code, Multiple Passive Segments
    Add Car Savings Code For 2 Segments
    Verify Car Savings Code Remark For Multiple Passive Car Segments
    
Verify That Car Savings Code Remark Should Be Written When There Is A Single Active Car Segment In The PNR
    [Tags]    us14342
    Create PNR With Active Car Segments For Car Savings Code, Single Segment
    Add Car Savings Code For 1 Segments
    Verify Car Savings Code Remark For Single Active Car Segments

Verify That Car Savings Code Remark Should Be Written When There Are Multiple Active Car Segments In The PNR
    [Tags]    us14342
    Create PNR With Active Car Segments For Car Savings Code, Multiple Segments
    Add Car Savings Code For 2 Segments
    Verify Car Savings Code Remark For Multiple Active Car Segments
    
Verify That Car Savings Code Remark Should Be Written When There Are Active And Passive Car Segments In The PNR
    [Tags]    us14342
    Create PNR With Active Car Segments For Car Savings Code, Multiple Segments With RM*CS Remarks
    Add Passive Car Segment On YYZ From 10JUN To 15JUN
    Add Passive Car Segment On PEK From 21FEB To 26FEB
    Add Car Savings Code For 3 Segments
    Verify Car Savings Code Remark For Active And Passive Car Segments
    
Verify That Car Savings Code Should Not Be Displayed When There Are No Car Segments In The PNR
    [Tags]    us14342    us17592
    Move Single Passenger And Add Single BSP Segment With TST
    Verify That Car Savings Code Should Not Be Displayed In The UI
    Logout To Amadeus Sell Connect
    