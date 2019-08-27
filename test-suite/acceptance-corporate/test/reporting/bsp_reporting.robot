*** Settings ***
Library           String
Library           SeleniumLibrary
Library           Collections
Library           Screenshot
Resource          ../../pages/amadeus.robot
Resource          ../../pages/reporting.robot
Resource          ../../pages/base.robot

*** Test Cases ***
Verify That Reporting Remark Is Written For Single TST
    Login To Amadeus Sell Connect Acceptance
    Move Profile to GDS    NM1CORPORATE/AMADEUS MR    RM SYEXGVS: A:FA177
    Add Single BSP Segment And Store Fare
    Open CA Corporate Test
    # Add Client Reporting Values For Single BSP Segment
    Close CA Corporate Test
    Switch To Graphic Mode
    Get PNR Details
    Switch To Command Page