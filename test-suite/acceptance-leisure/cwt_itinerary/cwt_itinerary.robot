*** Settings ***
Force Tags        leisure
Resource          ../../resources/common/global_resources.robot

*** Test Cases ***
Verify That CWT Itinerary Remarks Are Written When There Are No Air Passive Segment
    [Tags]    us8216    us13166
    Login To Amadeus Sell Connect
    Enter GDS Command    NM1Leisure/Amadeus Mr    RU1AHK1YYZ12NOV-/TYP-TOR/SUC-ZZ/SC-YYZ/SD-12NOV/ST-0900/EC-YQB/ED-13NOV/ET-1800/PS-X    RM*CF/-RBM0000000N
    Enter GDS Command    APE-test@email.com    APE-leisure@email.com    APE-Canada@email.com    RMZ/LANGUAGE-EN-US
    Open CA Migration Window
    Click Wrap PNR
    Populate Reporting Required Fields
    Click Submit To PNR
    Click Itinerary And Queue
    Enter Email Address    1    testingemail@cwt.com
    Click Add Email Address Button
    Enter Email Address    2    secondemail@cwt.com
    Select Itinerary Language    French
    Select Itinerary Type Of Transaction    Itinerary
    Enter Service Remark    1    Testing Service Remark
    Enter Tickets Remark    1    Testing Tickets Remark
    Enter Offer Remark    1    Testing Offer Remark 
    Click Send Itinerary And Queue
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Specific Remark Is Only Written Once    RMQ EMAIL ADD-NO
    Verify Specific Remark Is Only Written Once    RMZ CONF*LANG:FR
    Verify Specific Remark Is Written In The PNR    RMZ CONF*SEND TO MAIL TESTINGEMAIL@CWT.COM
    Verify Specific Remark Is Written In The PNR    RMZ CONF*SEND TO MAIL SECONDEMAIL@CWT.COM
    Verify Specific Remark Is Written In The PNR    RIR *SERVICE**TESTING SERVICE REMARK*
    Verify Specific Remark Is Written In The PNR    RIR *TICKET**TESTING TICKETS REMARK*
    Verify Specific Remark Is Written In The PNR    RIR *OFFER**TESTING OFFER REMARK*
    Verify Specific Remark Is Not Written In The PNR    RMT TKT-DOM
    Verify Specific Remark Is Not Written In The PNR    RMT TKT-TRANS
    Verify Specific Remark Is Not Written In The PNR    RMT TKT-INTL
    Close Cryptic Display Window
    Open CA Migration Window
    Click Itinerary And Queue
    Enter Email Address    1    testingemailnew@cwt.com
    Select Itinerary Type Of Transaction    Itinerary
    Add Type Of Transaction Remark Field    services
    Enter Service Remark    2    Testing Service Remark second
    Add Type Of Transaction Remark Field    tickets
    Enter Tickets Remark    2    Testing Tickets Remark second
    Add Type Of Transaction Remark Field    offers
    Enter Offer Remark    2    Testing Offer Remark second
    Click Send Itinerary And Queue
    Close CA Migration Window
    Open Cryptic Display Window
    Verify Specific Remark Is Only Written Once    RMQ EMAIL ADD-NO
    Verify Specific Remark Is Written In The PNR    RMZ CONF*SEND TO MAIL TESTINGEMAILNEW@CWT.COM
    Verify Specific Remark Is Written In The PNR    RIR *SERVICE**TESTING SERVICE REMARK*
    Verify Specific Remark Is Written In The PNR    RIR *SERVICE**TESTING SERVICE REMARK SECOND*
    Verify Specific Remark Is Written In The PNR    RIR *TICKET**TESTING TICKETS REMARK*
    Verify Specific Remark Is Written In The PNR    RIR *TICKET**TESTING TICKETS REMARK SECOND*
    Verify Specific Remark Is Written In The PNR    RIR *OFFER**TESTING OFFER REMARK*
    Verify Specific Remark Is Written In The PNR    RIR *OFFER**TESTING OFFER REMARK SECOND*
    Verify Specific Remark Is Not Written In The PNR    RMT TKT-DOM
    Verify Specific Remark Is Not Written In The PNR    RMT TKT-TRANS
    Verify Specific Remark Is Not Written In The PNR    RMT TKT-INTL
    Verify Specific Remark Is Not Written In The PNR    RMZ CONF*LANG:FR
    Verify Specific Remark Is Not Written In The PNR    RMZ CONF*SEND TO MAIL TESTINGEMAIL@CWT.COM
    Verify Specific Remark Is Not Written In The PNR    RMZ CONF*SEND TO MAIL SECONDEMAIL@CWT.COM
    Close Cryptic Display Window
    Logout To Amadeus Sell Connect
    [Teardown]    Close Browser

Verify That CWT Itinerary Remarks Are Written When Air Passive Segment is Domestic
    [Tags]    us8216    us13166
    Login To Amadeus Sell Connect
    Enter GDS Command    NM1Leisure/Amadeus Mr    RU1AHK1YYZ12NOV-/TYP-TOR/SUC-ZZ/SC-YYZ/SD-12NOV/ST-0900/EC-YQB/ED-13NOV/ET-1800/PS-X    SS AF1074 Y 10DEC YYZYUL GK1 / 11551440 / ABCDEFG    SS WS1074 Y 20DEC YULYYT GK1 / 01401400 / ABCDEFG    RM*CF/-RBM0000000N
    Enter GDS Command    APE-test@email.com    APE-leisure@email.com    APE-Canada@email.com    RMZ/LANGUAGE-FR-CA
    Open CA Migration Window
    Click Wrap PNR
    Populate Reporting Required Fields
    Click Submit To PNR
    Click Itinerary And Queue
    Enter Email Address    1    testingemail@cwt.com
    Select Itinerary Language    English
    Select Itinerary Type Of Transaction    Itinerary
    Enter Service Remark    1    Testing Service Remark
    Enter Tickets Remark    1    Testing Tickets Remark
    Enter Offer Remark    1    Testing Offer Remark
    Click Send Itinerary And Queue
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Specific Remark Is Only Written Once    RMQ EMAIL ADD-NO
    Verify Specific Remark Is Only Written Once    RMZ CONF*LANG:EN
    Verify Specific Remark Is Written In The PNR    RMZ CONF*SEND TO MAIL TESTINGEMAIL@CWT.COM
    Verify Specific Remark Is Written In The PNR    RIR *SERVICE**TESTING SERVICE REMARK*
    Verify Specific Remark Is Written In The PNR    RIR *TICKET**TESTING TICKETS REMARK*
    Verify Specific Remark Is Written In The PNR    RIR *OFFER**TESTING OFFER REMARK*
    Verify Specific Remark Is Written In The PNR    RMT TKT-DOM
    Verify Specific Remark Is Not Written In The PNR    RMT TKT-TRANS
    Verify Specific Remark Is Not Written In The PNR    RMT TKT-INTL
    Close Cryptic Display Window
    Logout To Amadeus Sell Connect
    [Teardown]    Close Browser

Verify That CWT Invoice Remarks Are Written When Air Passive Segment Is Between Canada to US
    [Tags]    us8216    us13166    sanity
    Login To Amadeus Sell Connect
    Enter GDS Command    NM1Leisure/Amadeus Mr    RU1AHK1YYZ12NOV-/TYP-TOR/SUC-ZZ/SC-YYZ/SD-12NOV/ST-0900/EC-YQB/ED-13NOV/ET-1800/PS-X    SS AF1074 Y 10DEC YYZYUL GK1 / 11551440 / ABCDEFG    SS WS1074 Y 20DEC YULMSP GK1 / 01401400 / ABCDEFG    RM*CF/-RBM0000000N
    Enter GDS Command    APE-test@email.com    APE-leisure@email.com    APE-Canada@email.com    RMZ/LANGUAGE-FR-CA
    Open CA Migration Window
    Click Wrap PNR
    Populate Reporting Required Fields
    Click Submit To PNR
    Click Itinerary And Queue
    Enter Email Address    1    testingemail@cwt.com
    Select Itinerary Language    English
    Select Itinerary Type Of Transaction    Invoice
    Enter Service Remark    1    Testing Service Remark
    Enter Tickets Remark    1    Testing Tickets Remark
    Click Send Itinerary And Queue
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Specific Remark Is Only Written Once    RMQ EMAIL ADD-NO
    Verify Specific Remark Is Only Written Once    RMZ CONF*LANG:EN
    Verify Specific Remark Is Written In The PNR    RMZ CONF*SEND TO MAIL TESTINGEMAIL@CWT.COM
    Verify Specific Remark Is Written In The PNR    RIR *SERVICE**TESTING SERVICE REMARK*
    Verify Specific Remark Is Written In The PNR    RIR *TICKET**TESTING TICKETS REMARK*
    Verify Specific Remark Is Written In The PNR    RMT TKT-TRANS
    Verify Specific Remark Is Not Written In The PNR    RMT TKT-DOM
    Verify Specific Remark Is Not Written In The PNR    RMT TKT-INTL
    Close Cryptic Display Window
    Logout To Amadeus Sell Connect
    [Teardown]    Close Browser

Verify That CWT Invoice Remarks Are Written When Air Passive Segment Is International
    [Tags]    us8216     us13166
    Login To Amadeus Sell Connect
    Enter GDS Command    NM1Leisure/Amadeus Mr    RU1AHK1YYZ12NOV-/TYP-TOR/SUC-ZZ/SC-YYZ/SD-12NOV/ST-0900/EC-YQB/ED-13NOV/ET-1800/PS-X    SS WS1074 Y 20DEC SINMNL GK1 / 01401400 / ABCDEFG    RM*CF/-RBM0000000N
    Enter GDS Command    APE-test@email.com    APE-leisure@email.com    APE-Canada@email.com    RMP/CITIZENSHIP-CA
    Open CA Migration Window
    Click Wrap PNR
    Populate Reporting Required Fields
    Populate Visa And Passport Required Fields
    Click Submit To PNR
    Click Itinerary And Queue
    Enter Email Address    1    testing@cwt.com
    Select Itinerary Language    English
    Select Itinerary Type Of Transaction    Invoice
    Enter Service Remark    1    Testing Service Remark invoice
    Enter Tickets Remark    1    Testing Tickets Remark invoice
    Click Send Itinerary And Queue
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Specific Remark Is Only Written Once    RMQ EMAIL ADD-NO
    Verify Specific Remark Is Only Written Once    RMZ LANGUAGE-EN-US
    Verify Specific Remark Is Written In The PNR    RMZ CONF*SEND TO MAIL TESTING@CWT.COM
    Verify Specific Remark Is Written In The PNR    RIR *SERVICE**TESTING SERVICE REMARK INVOICE*
    Verify Specific Remark Is Written In The PNR    RIR *TICKET**TESTING TICKETS REMARK INVOICE*
    Verify Specific Remark Is Written In The PNR    RMT TKT-INTL
    Verify Specific Remark Is Not Written In The PNR    RMT TKT-DOM
    Verify Specific Remark Is Not Written In The PNR    RMT TKT-TRANS
    Close Cryptic Display Window
    Open CA Migration Window
    Click Itinerary And Queue
    Enter Email Address    1    testingemail@cwt.com
    Click Send Itinerary And Queue
    Close CA Migration Window
    Open Cryptic Display Window
    Verify Specific Remark Is Only Written Once    RMQ EMAIL ADD-NO
    Verify Specific Remark Is Only Written Once    RMZ LANGUAGE-EN-US
    Verify Specific Remark Is Written In The PNR    RMZ CONF*SEND TO MAIL TESTINGEMAIL@CWT.COM
    Verify Specific Remark Is Written In The PNR    RIR *SERVICE**TESTING SERVICE REMARK INVOICE*
    Verify Specific Remark Is Written In The PNR    RIR *TICKET**TESTING TICKETS REMARK INVOICE*
    Verify Specific Remark Is Written In The PNR    RMT TKT-INTL
    Verify Specific Remark Is Not Written In The PNR    RMT TKT-DOM
    Verify Specific Remark Is Not Written In The PNR    RMT TKT-TRANS
    Close Cryptic Display Window
    Logout To Amadeus Sell Connect
    [Teardown]    Close Browser
