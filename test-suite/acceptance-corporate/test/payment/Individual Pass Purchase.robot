*** Settings ***
Library           String
Library           SeleniumLibrary
Library           Collections
Library           Screenshot
Resource          ../../pages/amadeus.robot
Resource          ../../pages/base.robot
Resource          ../../pages/payment.robot

*** Test Cases ***
Verify That Matrix Accounting Remark Is Written For Air Canada Individual Pass Purchase PNR
    Login To Amadeus Sell Connect Acceptance
    Move Single Passenger
    Open CA Corporate Test
    Click Full Wrap
    Click Payment Panel
    Add Matrix Accounting Remark For Air Canada Pass Purchase
    Verify Supplier Code Default Value Is Correct    Air Canada Individual Pass Purchase

Verify That Accounting Remark Is Written Correctly For Non BSP Airline Pass Purchase with Ticket Number
    [Tags]    us13615
    Login To Amadeus Sell Connect Acceptance
    Move Single Passenger
    Open CA Corporate Test
    Click Full Wrap
    Add Matrix Accounting Remark For Air Canada Pass Purchase
    # Click Submit To PNR
    # Verify That Accounting Remark Is Written Correctly For Non BSP Airline Pass Purchase
    # Close CA Corporate Test
    # Logout To Amadeus Sell Connect
    # [Teardown]    Close Browser

*** Keywords ***
