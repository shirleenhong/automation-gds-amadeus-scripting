*** Settings ***
Library           String
Library           SeleniumLibrary
Library           Collections
Library           Screenshot
Resource          ../../pages/amadeus/amadeus.robot

*** Test Cases ***
Verify That Reporting Remark Is Written
    Login To Amadeus Sell Connect Acceptance
    Move Profile to GDS    NM1CORPORATE/AMADEUS MR    PBRC/V9F5RD    RM*U25/-A:FA177
