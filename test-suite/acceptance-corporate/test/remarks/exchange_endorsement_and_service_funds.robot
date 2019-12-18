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
Resource          ../../pages/fees.robot
Resource          ../../pages/ticketing.robot
Resource          ../../pages/remarks.robot
Resource          ../../../resources/common/api-utilities.txt
Test Setup       Login To Amadeus Sell Connect Acceptance
Test Teardown    Close All Browsers


*** Variables ***
${test_file_name}    exchanges_service_funds


*** Test Cases ***
Verify that Correct Remarks Are Written In the PNR For AC Exchange And Service Funds PNR
    Create PNR For Client Air Canada, with Exchange Single Ticket
    Create Single Ticket and Exchange the PNR base on 1
    Verify Expected Remarks Are Written In The PNR
    
Verify that Correct Remarks Are Written In the PNR For OS Exchange And Service Funds PNR
    Create PNR For Client Austrian Airline, with Exchange Single Ticket
    Create Single Ticket and Exchange the PNR base on 1
    Verify Expected Remarks Are Written In The PNR
    
Verify that Correct Remarks Are Written In the PNR For LH Exchange And Service Funds PNR
    Create PNR For Client Lufthansa Airline, with Exchange Single Ticket
    Create Single Ticket and Exchange the PNR base on 1
    Verify Expected Remarks Are Written In The PNR
    
Verify that Correct Remarks Are Written In the PNR For UA Exchange And Service Funds PNR
    Create PNR For Client United Airline, with Exchange Single Ticket
    Create Single Ticket and Exchange the PNR base on 1
    Verify Expected Remarks Are Written In The PNR
    
Verify that Correct Remarks Are Written In the PNR For UA mULTI Exchange And Service Funds PNR
    Create PNR For Client United Airline, with Exchange Multi Ticket
    Create Single Ticket and Exchange the PNR base on 1
    Verify Expected Remarks Are Written In The PNR