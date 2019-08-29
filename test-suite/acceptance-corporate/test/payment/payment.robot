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
    Move Profile to GDS    NM1Juarez/Rose Ms    APE-test@email.com    RM*CF/-RBP0000000N    RMP/CITIZENSHIP-CA    RM SYEXGVS: A:FA177
    Open CA Corporate Test
    Click Full Wrap
    Click Payment Panel
    Add Matrix Accounting Remark For Air Canada Pass Purchase    remark_type    supplier_confirmation_number    base_amount    gst_tax    hst_tax    qst_tax    commission_with_tax    pass_purchase_type    fare_type    
    
*** Keywords ***
