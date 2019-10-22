*** Settings ***
Force Tags        leisure
Resource          ../../resources/common/global_resources.robot

*** Test Cases ***
Verify RIR remarks Is Written In The PNR When 'All Inclusive or Premium Protection insurance…' Is Selected For EN
    [Tags]    us9029
    Login To Amadeus Sell Connect
    Enter GDS Command    NM1Leisure/Amadeus Mr    SS AC1074 Y 20DEC YYZYUL GK1 / 11551440 / ABCDEFG    RM*CF/-CVC0000000N    RU1AHK1SIN21NOV-CWT RETENTION SEGMENT    APE-12345
    ...    RMZ/LANGUAGE-EN-CA
    Open CA Migration Window
    Click Wrap PNR
    Click Panel    Reporting
    Select Routing Code    Asia incl. India
    Enter Destination Code    YUL
    Enter Company Name    Umbrella Corp
    Select Insurance Liability Waiver    All Inclusive or Premium Protection Insurance
    Click Panel    Payment
    Click Payment Tab    Leisure Fee
    Enter Reason for No Association Fees    Not applicable
    Click Submit To PNR
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    RIR ALL INCLUSIVE OR PREMIUM PROTECTION INSURANCE HAS BEEN
    Verify Specific Remark Is Written In The PNR    RIR PURCHASED FOR THE FULL VALUE OF THE TRIP.
    Verify Specific Remark Is Written In The PNR    RM *U10/-UMBRELLA CORP
    Verify Specific Remark Is Written In The PNR    RM *U11/-NOT APPLICABLE
    Verify Specific Remark Is Written In The PNR    RM *U30/-NEWLEI
    Verify Specific Remark Is Written In The PNR    RM *U86/-OVERRIDE LEI
    Verify Specific Remark Is Not Written In The PNR    RM *U12/-
    Close Cryptic Display Window
    Logout To Amadeus Sell Connect
    [Teardown]    Close Browser

Verify RIR Remarks Is Written In The PNR When 'All Inclusive or Premium Protection insurance…' Is Selected For FR
    [Tags]    us9029
    Login To Amadeus Sell Connect
    Enter GDS Command    NM1Leisure/Amadeus Mr    SS AC1074 Y 20DEC YYZYUL GK1 / 11551440 / ABCDEFG    RM*CF/-CVC0000000N    RU1AHK1SIN21NOV-CWT RETENTION SEGMENT    APE-12345
    ...    RMZ/LANGUAGE-FR-CA
    Open CA Migration Window
    Click Wrap PNR
    Click Panel    Reporting
    Select Routing Code    Asia incl. India
    Enter Destination Code    YUL
    Enter Company Name    Umbrella Corp
    Select Insurance Liability Waiver    All Inclusive or Premium Protection Insurance
    Click Panel    Payment
    Click Payment Tab    Leisure Fee
    Enter Reason for No Association Fees    Test Fees
    Click Submit To PNR
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    RIR LE FORFAIT D ASSURANCE SUPERIEUR A ETE ACHETE.
    Verify Specific Remark Is Written In The PNR    RIR POUR LE MONTANT TOTAL DU VOYAGE.
    Verify Specific Remark Is Written In The PNR    RM *U10/-UMBRELLA CORP
    Verify Specific Remark Is Written In The PNR    RM *U11/-TEST FEES
    Verify Specific Remark Is Not Written In The PNR    RM *U12/-
    Close Cryptic Display Window
    Logout To Amadeus Sell Connect
    [Teardown]    Close Browser

Verify RIR Remarks Is Written In The PNR When Insurance Is Declined With All Inclusive Type for EN
    [Tags]    us9029
    Login To Amadeus Sell Connect
    Enter GDS Command    NM1Leisure/Amadeus Mr    SS AC1074 Y 20DEC YYZYUL GK1 / 11551440 / ABCDEFG    RM*CF/-CVC0000000N    RU1AHK1SIN21NOV-CWT RETENTION SEGMENT    APE-test@email.com
    ...    RMZ/LANGUAGE-EN-CA
    Open CA Migration Window
    Click Wrap PNR
    Click Panel    Reporting
    Select Routing Code    Asia incl. India
    Enter Destination Code    YUL
    Enter Company Name    Umbrella Corp
    Select Insurance Liability Waiver    Traveller Declined to Purchase
    Select Insurance Declined Reason    All Inclusive or Premium
    Enter Insurance Declined Reason    Testing Insurance Decline reason
    Click Panel    Payment
    Click Payment Tab    Leisure Fee
    Enter Reason for No Association Fees    Not applicable
    Click Submit To PNR
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    RM *U11/-NOT APPLICABLE
    Verify Specific Remark Is Written In The PNR    RM *U12/-TESTING INSURANCE DECLINE REASON
    Verify Specific Remark Is Written In The PNR    RIR I DECLINED TO PURCHASE THE FOLLOWING TRAVEL INSURANCE
    Verify Specific Remark Is Written In The PNR    RIR OPTIONS THAT MY TRAVEL AGENT HAS OFFERED AND EXPLAINED TO ME    True
    Verify Specific Remark Is Written In The PNR    RIR ...DELUXE PACKAGE INSURANCE
    Verify Insurance Decline Information Is Written For EN
    Close Cryptic Display Window
    Logout To Amadeus Sell Connect
    [Teardown]    Close Browser

Verify RIR Remarks Is Written In The PNR When Insurance Is Declined With All Inclusive Type for FR
    [Tags]    us9029
    Login To Amadeus Sell Connect
    Enter GDS Command    NM1Leisure/Amadeus Mr    SS AC1074 Y 20DEC YYZYUL GK1 / 11551440 / ABCDEFG    RM*CF/-CVC0000000N    RU1AHK1SIN21NOV-CWT RETENTION SEGMENT    APE-12345
    ...    RMZ/LANGUAGE-FR-CA
    Open CA Migration Window
    Click Wrap PNR
    Click Panel    Reporting
    Select Routing Code    Asia incl. India
    Enter Destination Code    YUL
    Enter Company Name    Umbrella Corp
    Select Insurance Liability Waiver    Traveller Declined to Purchase
    Select Insurance Declined Reason    All Inclusive or Premium
    Enter Insurance Declined Reason    Testing Insurance Decline reason
    Click Panel    Payment
    Click Payment Tab    Leisure Fee
    Enter Reason for No Association Fees    Not applicable
    Click Submit To PNR
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    RIR J AI REFUSE D ACHETER LES OPTIONS D ASSURANCES VOYAGES
    Verify Specific Remark Is Written In The PNR    RIR CI-DESSOUS M AYANT ETE OFFERTES ET EXPLIQUEES PAR MON
    Verify Specific Remark Is Written In The PNR    RIR CONSEILLER EN VOYAGES
    Verify Specific Remark Is Written In The PNR    RIR ...
    Verify Specific Remark Is Written In The PNR    RIR ...FORFAIT SUPERIEUR D ASSURANCE
    Verify Specific Remark Is Written In The PNR    RM *U11/-NOT APPLICABLE
    Verify Specific Remark Is Written In The PNR    RM *U12/-TESTING INSURANCE DECLINE REASON
    Verify Insurance Decline Information Is Written For FR
    Close Cryptic Display Window
    Logout To Amadeus Sell Connect
    [Teardown]    Close Browser

Verify RIR Remarks Is Written In The PNR When Insurance Is Declined With Cancellation Type for EN
    [Tags]    us9029
    Login To Amadeus Sell Connect
    Enter GDS Command    NM1Leisure/Amadeus Mr    SS AC1074 Y 20DEC YYZYUL GK1 / 11551440 / ABCDEFG    RM*CF/-CVC0000000N    RU1AHK1SIN21NOV-CWT RETENTION SEGMENT    APE-12345
    ...    RMZ/LANGUAGE-EN-CA
    Open CA Migration Window
    Click Wrap PNR
    Click Panel    Reporting
    Select Routing Code    Asia incl. India
    Enter Destination Code    YUL
    Enter Company Name    Umbrella Corp
    Select Insurance Liability Waiver    Traveller Declined to Purchase
    Select Insurance Declined Reason    Cancellation/Interruption
    Enter Insurance Declined Reason    Testing Insurance Decline reason
    Click Panel    Payment
    Click Payment Tab    Leisure Fee
    Enter Reason for No Association Fees    Not applicable
    Click Submit To PNR
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    RM *U11/-NOT APPLICABLE
    Verify Specific Remark Is Written In The PNR    RM *U12/-TESTING INSURANCE DECLINE REASON
    Verify Specific Remark Is Written In The PNR    RIR I DECLINED TO PURCHASE THE FOLLOWING TRAVEL INSURANCE
    Verify Specific Remark Is Written In The PNR    RIR OPTIONS THAT MY TRAVEL AGENT HAS OFFERED AND EXPLAINED TO ME    True
    Verify Specific Remark Is Written In The PNR    RIR ...CANCELLATION/INTERUPTION
    Verify Insurance Decline Information Is Written For EN
    Close Cryptic Display Window
    Logout To Amadeus Sell Connect
    [Teardown]    Close Browser

Verify RIR Remarks Is Written In The PNR When Insurance Is Declined With Cancellation Type for FR
    [Tags]    us9029
    Login To Amadeus Sell Connect
    Enter GDS Command    NM1Leisure/Amadeus Mr    SS AC1074 Y 20DEC YYZYUL GK1 / 11551440 / ABCDEFG    RM*CF/-CVC0000000N    RU1AHK1SIN21NOV-CWT RETENTION SEGMENT    APE-12345
    ...    RMZ/LANGUAGE-FR-CA
    Open CA Migration Window
    Click Wrap PNR
    Click Panel    Reporting
    Select Routing Code    Asia incl. India
    Enter Destination Code    YUL
    Enter Company Name    Umbrella Corp
    Select Insurance Liability Waiver    Traveller Declined to Purchase
    Select Insurance Declined Reason    Cancellation/Interruption
    Enter Insurance Declined Reason    Testing Insurance Decline reason
    Click Panel    Payment
    Click Payment Tab    Leisure Fee
    Enter Reason for No Association Fees    Not applicable
    Click Submit To PNR
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    RIR J AI REFUSE D ACHETER LES OPTIONS D ASSURANCES VOYAGES
    Verify Specific Remark Is Written In The PNR    RIR CI-DESSOUS M AYANT ETE OFFERTES ET EXPLIQUEES PAR MON
    Verify Specific Remark Is Written In The PNR    RIR CONSEILLER EN VOYAGES
    Verify Specific Remark Is Written In The PNR    RIR ...ANNULATION/INTERRUPTION
    Verify Specific Remark Is Written In The PNR    RM *U10/-UMBRELLA CORP
    Verify Specific Remark Is Written In The PNR    RM *U11/-NOT APPLICABLE
    Verify Specific Remark Is Written In The PNR    RM *U12/-TESTING INSURANCE DECLINE REASON
    Verify Specific Remark Is Written In The PNR    RM *U30/-NEWLEI
    Verify Specific Remark Is Written In The PNR    RM *U86/-OVERRIDE LEI
    Verify Insurance Decline Information Is Written For FR
    Close Cryptic Display Window
    Logout To Amadeus Sell Connect
    [Teardown]    Close Browser

Verify RIR Remarks Is Written In The PNR When Insurance Is Declined With Emergency Medical Type for EN
    [Tags]    us9029
    Login To Amadeus Sell Connect
    Enter GDS Command    NM1Leisure/Amadeus Mr    SS AC1074 Y 20DEC YYZYUL GK1 / 11551440 / ABCDEFG    RM*CF/-CVC0000000N    RU1AHK1SIN21NOV-CWT RETENTION SEGMENT    APE-12345
    ...    RMZ/LANGUAGE-EN-CA
    Open CA Migration Window
    Click Wrap PNR
    Click Panel    Reporting
    Select Routing Code    Asia incl. India
    Enter Destination Code    YUL
    Enter Company Name    Umbrella Corp
    Select Insurance Liability Waiver    Traveller Declined to Purchase
    Select Insurance Declined Reason    Emergency Medical/Transportation
    Enter Insurance Declined Reason    Testing Insurance Decline reason
    Click Panel    Payment
    Click Payment Tab    Leisure Fee
    Enter Reason for No Association Fees    Not applicable
    Click Submit To PNR
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    RM *U11/-NOT APPLICABLE
    Verify Specific Remark Is Written In The PNR    RM *U12/-TESTING INSURANCE DECLINE REASON
    Verify Specific Remark Is Written In The PNR    RIR I DECLINED TO PURCHASE THE FOLLOWING TRAVEL INSURANCE
    Verify Specific Remark Is Written In The PNR    RIR OPTIONS THAT MY TRAVEL AGENT HAS OFFERED AND EXPLAINED TO ME    True
    Verify Specific Remark Is Written In The PNR    RIR ...EMERGENCY MEDICAL/TRANSPORTATION
    Verify Insurance Decline Information Is Written For EN
    Close Cryptic Display Window
    Logout To Amadeus Sell Connect
    [Teardown]    Close Browser

Verify RIR Remarks Is Written In The PNR When Insurance Is Declined With Emergency Medical Type for FR
    [Tags]    us9029
    Login To Amadeus Sell Connect
    Enter GDS Command    NM1Leisure/Amadeus Mr    SS AC1074 Y 20DEC YYZYUL GK1 / 11551440 / ABCDEFG    RM*CF/-CVC0000000N    RU1AHK1SIN21NOV-CWT RETENTION SEGMENT    APE-test@email.com
    ...    RMZ/LANGUAGE-FR-CA
    Open CA Migration Window
    Click Wrap PNR
    Click Panel    Reporting
    Select Routing Code    Asia incl. India
    Enter Destination Code    YUL
    Enter Company Name    Umbrella Corp
    Select Insurance Liability Waiver    Traveller Declined to Purchase
    Select Insurance Declined Reason    Emergency Medical/Transportation
    Enter Insurance Declined Reason    Emergency Medical Decline reason
    Click Panel    Payment
    Click Payment Tab    Leisure Fee
    Enter Reason for No Association Fees    Not applicable
    Click Submit To PNR
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    RIR J AI REFUSE D ACHETER LES OPTIONS D ASSURANCES VOYAGES
    Verify Specific Remark Is Written In The PNR    RIR CI-DESSOUS M AYANT ETE OFFERTES ET EXPLIQUEES PAR MON
    Verify Specific Remark Is Written In The PNR    RIR CONSEILLER EN VOYAGES
    Verify Specific Remark Is Written In The PNR    RIR ...FRAIS MEDICAUX D URGENCES/DE TRANSPORT
    Verify Specific Remark Is Written In The PNR    RM *U10/-UMBRELLA CORP
    Verify Specific Remark Is Written In The PNR    RM *U11/-NOT APPLICABLE
    Verify Specific Remark Is Written In The PNR    RM *U12/-EMERGENCY MEDICAL DECLINE REASON
    Verify Specific Remark Is Written In The PNR    RM *U30/-NEWLEI
    Verify Specific Remark Is Written In The PNR    RM *U86/-OVERRIDE LEI
    Verify Insurance Decline Information Is Written For FR
    Close Cryptic Display Window
    Logout To Amadeus Sell Connect
    [Teardown]    Close Browser

Verify RIR Remarks Is Written In The PNR When Insurance Is Declined With Flight and Travel Accident Type for EN
    [Tags]    us9029
    Login To Amadeus Sell Connect
    Enter GDS Command    NM1Leisure/Amadeus Mr    SS AC1074 Y 20DEC YYZYUL GK1 / 11551440 / ABCDEFG    RM*CF/-CVC0000000N    RU1AHK1SIN21NOV-CWT RETENTION SEGMENT    APE-12345
    ...    RMZ/LANGUAGE-EN-CA
    Open CA Migration Window
    Click Wrap PNR
    Click Panel    Reporting
    Select Routing Code    Asia incl. India
    Enter Destination Code    YUL
    Enter Company Name    Umbrella Corp
    Select Insurance Liability Waiver    Traveller Declined to Purchase
    Select Insurance Declined Reason    Flight and Travel Accident
    Enter Insurance Declined Reason    Testing Insurance Decline reason
    Click Panel    Payment
    Click Payment Tab    Leisure Fee
    Enter Reason for No Association Fees    Not applicable
    Click Submit To PNR
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    RM *U11/-NOT APPLICABLE
    Verify Specific Remark Is Written In The PNR    RM *U12/-TESTING INSURANCE DECLINE REASON
    Verify Specific Remark Is Written In The PNR    RIR I DECLINED TO PURCHASE THE FOLLOWING TRAVEL INSURANCE
    Verify Specific Remark Is Written In The PNR    RIR OPTIONS THAT MY TRAVEL AGENT HAS OFFERED AND EXPLAINED TO ME    True
    Verify Specific Remark Is Written In The PNR    RIR ...FLIGHT AND TRAVEL ACCIDENT
    Verify Insurance Decline Information Is Written For EN
    Close Cryptic Display Window
    Logout To Amadeus Sell Connect
    [Teardown]    Close Browser

Verify RIR Remarks Is Written In The PNR When Insurance Is Declined With Flight and Travel Accident Type for FR
    [Tags]    us9029
    Login To Amadeus Sell Connect
    Enter GDS Command    NM1Leisure/Amadeus Mr    SS AC1074 Y 20DEC YYZYUL GK1 / 11551440 / ABCDEFG    RM*CF/-CVC0000000N    RU1AHK1SIN21NOV-CWT RETENTION SEGMENT    APE-test@email.com
    ...    RMZ/LANGUAGE-FR-CA
    Open CA Migration Window
    Click Wrap PNR
    Click Panel    Reporting
    Select Routing Code    Asia incl. India
    Enter Destination Code    YUL
    Enter Company Name    Umbrella Corp
    Select Insurance Liability Waiver    Traveller Declined to Purchase
    Select Insurance Declined Reason    Flight and Travel Accident
    Enter Insurance Declined Reason    Flight and Travel Decline reason
    Click Panel    Payment
    Click Payment Tab    Leisure Fee
    Enter Reason for No Association Fees    Not applicable
    Click Submit To PNR
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    RIR J AI REFUSE D ACHETER LES OPTIONS D ASSURANCES VOYAGES
    Verify Specific Remark Is Written In The PNR    RIR CI-DESSOUS M AYANT ETE OFFERTES ET EXPLIQUEES PAR MON
    Verify Specific Remark Is Written In The PNR    RIR CONSEILLER EN VOYAGES
    Verify Specific Remark Is Written In The PNR    RIR ...ACCIDENTS DE VOL ET DE VOYAGES
    Verify Specific Remark Is Written In The PNR    RM *U11/-NOT APPLICABLE
    Verify Specific Remark Is Written In The PNR    RM *U12/-FLIGHT AND TRAVEL DECLINE REASON
    Verify Insurance Decline Information Is Written For FR
    Close Cryptic Display Window
    Logout To Amadeus Sell Connect
    [Teardown]    Close Browser

Verify RIR Remarks Is Written In The PNR When Insurance Is Declined With Rental Car Physical Damage Type
    [Tags]    us9029
    Login To Amadeus Sell Connect
    Enter GDS Command    NM1Leisure/Amadeus Mr    SS AC1074 Y 20DEC YYZYUL GK1 / 11551440 / ABCDEFG    RM*CF/-CVC0000000N    RU1AHK1SIN21NOV-CWT RETENTION SEGMENT    APE-12345
    ...    RMZ/LANGUAGE-FR-CA
    Open CA Migration Window
    Click Wrap PNR
    Click Panel    Reporting
    Select Routing Code    Asia incl. India
    Enter Destination Code    YUL
    Enter Company Name    Umbrella Corp
    Select Insurance Liability Waiver    Traveller Declined to Purchase
    Select Insurance Declined Reason    Rental Car Physical Damage
    Enter Insurance Declined Reason    Testing Insurance Decline reason
    Click Panel    Payment
    Click Payment Tab    Leisure Fee
    Enter Reason for No Association Fees    Not applicable
    Click Submit To PNR
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    RIR J AI REFUSE D ACHETER LES OPTIONS D ASSURANCES VOYAGES
    Verify Specific Remark Is Written In The PNR    RIR CI-DESSOUS M AYANT ETE OFFERTES ET EXPLIQUEES PAR MON
    Verify Specific Remark Is Written In The PNR    RIR CONSEILLER EN VOYAGES
    Verify Specific Remark Is Written In The PNR    RIR ...RENTAL CAR PHYSICAL DAMAGE
    Verify Specific Remark Is Written In The PNR    RM *U11/-NOT APPLICABLE
    Verify Specific Remark Is Written In The PNR    RM *U12/-TESTING INSURANCE DECLINE REASON
    Verify Insurance Decline Information Is Written For FR
    Close Cryptic Display Window
    Logout To Amadeus Sell Connect
    [Teardown]    Close Browser

Verify RIR Remarks Is Written In The PNR When Insurance Is Declined With Coverage for the Full Dollar Type
    [Tags]    us9029
    Login To Amadeus Sell Connect
    Enter GDS Command    NM1Leisure/Amadeus Mr    SS AC1074 Y 20DEC YYZYUL GK1 / 11551440 / ABCDEFG    RM*CF/-CVC0000000N    RU1AHK1SIN21NOV-CWT RETENTION SEGMENT    APE-test@email.com
    ...    RMZ/LANGUAGE-FR-CA
    Open CA Migration Window
    Click Wrap PNR
    Click Panel    Reporting
    Select Routing Code    Asia incl. India
    Enter Destination Code    YUL
    Enter Company Name    Umbrella Corp
    Select Insurance Liability Waiver    Traveller Declined to Purchase
    Select Insurance Declined Reason    Coverage for the Full Dollar Value
    Enter Insurance Declined Reason    Testing Insurance Decline reason
    Click Panel    Payment
    Click Payment Tab    Leisure Fee
    Enter Reason for No Association Fees    Not applicable
    Click Submit To PNR
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    RIR J AI REFUSE D ACHETER LES OPTIONS D ASSURANCES VOYAGES
    Verify Specific Remark Is Written In The PNR    RIR CI-DESSOUS M AYANT ETE OFFERTES ET EXPLIQUEES PAR MON
    Verify Specific Remark Is Written In The PNR    RIR CONSEILLER EN VOYAGES
    Verify Specific Remark Is Written In The PNR    RIR ...COVERAGE FOR THE FULL DOLLAR VALUE OF THE TRIP
    Verify Specific Remark Is Written In The PNR    RM *U11/-NOT APPLICABLE
    Verify Specific Remark Is Written In The PNR    RM *U12/-TESTING INSURANCE DECLINE REASON
    Verify Insurance Decline Information Is Written For FR
    Close Cryptic Display Window
    Logout To Amadeus Sell Connect
    [Teardown]    Close Browser

Verify RIR Remarks Is Written In The PNR When Insurance Is Declined With Multiple Insurance Type
    [Tags]    us9029
    Login To Amadeus Sell Connect
    Enter GDS Command    NM1Leisure/Amadeus Mr    SS AC1074 Y 20DEC YYZYUL GK1 / 11551440 / ABCDEFG    RM*CF/-CVC0000000N    RU1AHK1SIN21NOV-CWT RETENTION SEGMENT    APE-test@email.com
    ...    RMZ/LANGUAGE-FR-CA
    Open CA Migration Window
    Click Wrap PNR
    Click Panel    Reporting
    Select Routing Code    Asia incl. India
    Enter Destination Code    YUL
    Enter Company Name    Umbrella Corp
    Select Insurance Liability Waiver    Traveller Declined to Purchase
    Select Insurance Declined Reason    All Inclusive or Premium    Cancellation/Interruption    Coverage for the Full Dollar Value
    Enter Insurance Declined Reason    Testing Insurance Decline reason
    Click Panel    Payment
    Click Payment Tab    Leisure Fee
    Enter Reason for No Association Fees    Not applicable
    Click Submit To PNR
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    RIR J AI REFUSE D ACHETER LES OPTIONS D ASSURANCES VOYAGES
    Verify Specific Remark Is Written In The PNR    RIR CI-DESSOUS M AYANT ETE OFFERTES ET EXPLIQUEES PAR MON
    Verify Specific Remark Is Written In The PNR    RIR CONSEILLER EN VOYAGES
    Verify Specific Remark Is Written In The PNR    RIR ...
    Verify Specific Remark Is Written In The PNR    RIR ...FORFAIT SUPERIEUR D ASSURANCE
    Verify Specific Remark Is Written In The PNR    RIR ...ANNULATION/INTERRUPTION
    Verify Specific Remark Is Written In The PNR    RIR ...COVERAGE FOR THE FULL DOLLAR VALUE OF THE TRIP
    Verify Specific Remark Is Written In The PNR    RM *U11/-NOT APPLICABLE
    Verify Specific Remark Is Written In The PNR    RM *U12/-TESTING INSURANCE DECLINE REASON
    Verify Insurance Decline Information Is Written For FR
    Close Cryptic Display Window
    Logout To Amadeus Sell Connect
    [Teardown]    Close Browser

*** Keywords ***
Verify Insurance Decline Information Is Written For EN
    Verify Specific Remark Is Written In The PNR    RIR ...NONE OF CARLSON WAGONLIT CANADA OR YOUR CWT TRAVEL
    Verify Specific Remark Is Written In The PNR    RIR ...AGENT ADVISOR OR YOUR CWT TRAVEL AGENCY WILL BE
    Verify Specific Remark Is Written In The PNR    RIR ...RESPONSIBLE FOR ANY EXPENSES LOSSES CLAIMS
    Verify Specific Remark Is Written In The PNR    RIR ...LIABILITIES COSTS ACCOUNTS CHARGES TAXES ACTIONS
    Verify Specific Remark Is Written In The PNR    RIR ...DEMANDS OR DAMAGES OF ANY NATURE WHATSOEVER ARISING
    Verify Specific Remark Is Written In The PNR    RIR ...AS A RESULT OF YOU DECLINING TO PURCHASE TRAVEL
    Verify Specific Remark Is Written In The PNR    RIR ...INSURANCE FOR THE FULL VALUE AND DURATION OF THE
    Verify Specific Remark Is Written In The PNR    RIR ...TRIP INCLUDING WITHOUT LIMITATION
    Verify Specific Remark Is Written In The PNR    RIR ...A. EXPENSES INCURRED DUE TO THE DELAY OR
    Verify Specific Remark Is Written In The PNR    RIR ...CANCELLATION OF YOUR TRIP
    Verify Specific Remark Is Written In The PNR    RIR ...B. ANY ACCIDENT SICKNESS OR DEATH THAT OCCURS ON
    Verify Specific Remark Is Written In The PNR    RIR ...YOUR TRIP
    Verify Specific Remark Is Written In The PNR    RIR ...C. ANY BAGGAGE OR PROPERTY STOLEN OR DAMAGED ON
    Verify Specific Remark Is Written In The PNR    RIR ...YOUR TRIP
    Verify Specific Remark Is Written In The PNR    RIR ...D. YOUR BENEFITS UNDER THE FOLLOWING BEING
    Verify Specific Remark Is Written In The PNR    RIR ...RESTRICTED AND/OR EXCLUDED
    Verify Specific Remark Is Written In The PNR    RIR ...1. CREDIT CARD ISURANCE--INSUFFICIENT PROTECTION
    Verify Specific Remark Is Written In The PNR    RIR ...OFFERED BY OR NON-EXISTING COVERAGE OF YOUR
    Verify Specific Remark Is Written In The PNR    RIR ...CREDIT CARD
    Verify Specific Remark Is Written In The PNR    RIR ...2. INSURANCE PRIVATE OR PUBLIC HEALTH CARE COVERAGE
    Verify Specific Remark Is Written In The PNR    RIR ...3. ADDITIONAL SINGLE SUPPLEMENT COST IF YOUR
    Verify Specific Remark Is Written In The PNR    RIR ...TRAVELLING COMPANION IS UNABLE TO TRAVEL AND YOU
    Verify Specific Remark Is Written In The PNR    RIR ...STILL CHOOSE TO TRAVEL.
    Verify Specific Remark Is Written In The PNR    RIR ...4. THE UNFORSEEN FINANCIAL DEFAULT OR BANKRUPTCY OF
    Verify Specific Remark Is Written In The PNR    RIR ...THE TOUR OPERATOR CRUISE LINE OR AIRLINE CARRIER
    Verify Specific Remark Is Written In The PNR    RIR ...FROM WHICH YOU HAVE PURCHASED YOUR TRAVEL
    Verify Specific Remark Is Written In The PNR    RIR ...ARRANGEMENTS.
    Verify Specific Remark Is Written In The PNR    RIR ...5. OTHER ADDITIONAL COSTS IF INSURANCE IS NOT
    Verify Specific Remark Is Written In The PNR    RIR ...PURCHASED AT THE TIME OF INITIAL DEPOSIT. SUCH AS A
    Verify Specific Remark Is Written In The PNR    RIR ...CHANGE IN MEDICAL CONDITION OR INCREASED
    Verify Specific Remark Is Written In The PNR    RIR ...SUPPLIER PENALTIES.

Verify Insurance Decline Information Is Written For FR
    Verify Specific Remark Is Written In The PNR    RIR ...NI CARLSON WAGONLIT CANADA VOTRE CONSEILLER EN
    Verify Specific Remark Is Written In The PNR    RIR ...VOYAGES CWT OU VOTRE AGENCE DE VOYAGES CWT NE
    Verify Specific Remark Is Written In The PNR    RIR ...SERA TENU RESPONSABLE DE DEPENSES PERTESRECLAMATIONS
    Verify Specific Remark Is Written In The PNR    RIR ...COUTS COMPTES COURANTS FRAIS TAXES ACTIONS REQUETES
    Verify Specific Remark Is Written In The PNR    RIR ...YOU DOMMAGES ENGENDRES D UNE QUELCONQUE NATURE
    Verify Specific Remark Is Written In The PNR    RIR ...DECOULANT DE VOTRE REFUS D ACHETER L ASSURANCE
    Verify Specific Remark Is Written In The PNR    RIR ...VOYAGE COUVRANT LE MONTANT ET LA DUREE TOTALE DE
    Verify Specific Remark Is Written In The PNR    RIR ...VOTRE VOYAGE. INCLUANT MAIS NE SE LIMITANT PAS A-
    Verify Specific Remark Is Written In The PNR    RIR ...A. DEPENSES ENCOURRUES CAUSEES PAR UN DELAI OU L
    Verify Specific Remark Is Written In The PNR    RIR ...ANNULATION DE VOTRE VOYAGE
    Verify Specific Remark Is Written In The PNR    RIR ...B. TOUT ACCIDENT MALADIE OU MORTALITE SE PRODUISANT
    Verify Specific Remark Is Written In The PNR    RIR ...AU COURS DU VOYAGE
    Verify Specific Remark Is Written In The PNR    RIR ...C. TOUT VOL DOMMAGE OU PERTE DE PROPRIETE AU COURS
    Verify Specific Remark Is Written In The PNR    RIR ...DE VOTRE VOYAGE
    Verify Specific Remark Is Written In The PNR    RIR ...D. CONDITIONS OU GARANTIES LIMITEES ET/OU EXCLUSION
    Verify Specific Remark Is Written In The PNR    RIR ...SE RAPPORTANT A
    Verify Specific Remark Is Written In The PNR    RIR ...1. UNE PROTECTION INSUFFISANTE OU COUVERTURE
    Verify Specific Remark Is Written In The PNR    RIR ...INEXISTANTE PAR VOTRE ASSURANCE DE CARTE DE CREDIT.
    Verify Specific Remark Is Written In The PNR    RIR ...2. LA COUVERTURE DE VOTRE ASSURANCE PRIVEE OU DU
    Verify Specific Remark Is Written In The PNR    RIR ...REGIME PUBLIC DE SANTE
    Verify Specific Remark Is Written In The PNR    RIR ...3. COUT DU SUPPLEMENT SIMPLE SI VOTRE COMPAGNON NE
    Verify Specific Remark Is Written In The PNR    RIR ...PEUT PLUSVOYAGER ET QUE VOUS CHOISISSEZ DE VOYAGER
    Verify Specific Remark Is Written In The PNR    RIR ...QUAND MEME
