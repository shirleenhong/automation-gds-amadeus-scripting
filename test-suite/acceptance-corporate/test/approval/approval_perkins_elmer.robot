*** Settings ***
Force Tags        corp
Library           String
Library           SeleniumLibrary
Library           Collections
Library           Screenshot
Resource          ../../pages/amadeus.robot
Resource          ../../pages/base.robot
Resource          ../../pages/payment.robot
Resource          ../../pages/reporting.robot
Resource          ../../pages/ticketing.robot
Resource          ../../../resources/common/api-utilities.txt

*** Test Cases ***
Verify That PNRs For Client Perkins Elmer With Trip Approved By Remark Do Not Go Thru Approval Process
    [Tags]    us13271
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Client Mettler Toledo With Udid 50 MTMS-NORAM, Air Only
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly