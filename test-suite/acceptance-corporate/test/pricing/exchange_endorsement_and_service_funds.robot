*** Settings ***
Force Tags        corp
Resource          ../../pages/base.robot
Test Setup       Login To Amadeus Sell Connect Acceptance
Test Teardown    Close All Browsers


*** Variables ***
${test_file_name}    exchanges_service_funds

*** Test Cases ***
Verify that Correct Remarks Are Written In the PNR For AC Exchange And Service Funds PNR
    [Tags]    us14227    sanity_test
    Create PNR With Active Air Segments For Client Air Canada, with Exchange Single Ticket
    Create Single Ticket and Exchange the PNR base on 1
    Fill Up Exhange Endorsements For Airline Code AC
    Verify Remarks Are Added Correctly In The PNR
    
Verify that Correct Remarks Are Written In the PNR For OS Exchange And Service Funds PNR
    [Tags]    us14227
    Create PNR With Active Air Segments For Client Austrian Airline, with Exchange Single Ticket
    Create Single Ticket and Exchange the PNR base on 1
    Fill Up Exhange Endorsements For Airline Code OS
    Verify Remarks Are Added Correctly In The PNR
    
Verify that Correct Remarks Are Written In the PNR For SN Exchange And Service Funds PNR
    [Tags]    us14227
    Create PNR With Active Air Segments For Client Brussels Airline, with Exchange Single Ticket
    Create Single Ticket and Exchange the PNR base on 1
    Fill Up Exhange Endorsements For Airline Code SN
    Verify Remarks Are Added Correctly In The PNR
    
Verify that Correct Remarks Are Written In the PNR For LH Exchange And Service Funds PNR
    [Tags]    us14227
    Create PNR With Active Air Segments For Client Lufthansa Airline, with Exchange Single Ticket
    Create Single Ticket and Exchange the PNR base on 1
    Fill Up Exhange Endorsements For Airline Code LH
    Verify Remarks Are Added Correctly In The PNR
    
Verify that Correct Remarks Are Written In the PNR For UA Exchange And Service Funds PNR
    [Tags]    us14227
    Create PNR With Active Air Segments For Client United Airline, with Exchange Single Ticket
    Create Single Ticket and Exchange the PNR base on 1
    Fill Up Exchange Endorsements For UA With UAMKW
    Verify Remarks Are Added Correctly In The PNR
    
Verify that Correct Remarks Are Written In the PNR For UA Multi Exchange And No Service Funds PNR
    [Tags]    us14227
    Create PNR With Active Air Segments For Client United Airline, with Exchange Multi Ticket
    Create Multi Ticket and Exchange the PNR
    Fill Up Multiple Exchange Endorsements For UA
    Verify Remarks Are Added Correctly In The PNR
    