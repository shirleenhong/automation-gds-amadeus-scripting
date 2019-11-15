*** Settings ***
Force Tags        leisure
Resource          ../../resources/common/global_resources.robot

*** Test Cases ***
Verify Accounting Remarks Are Written For FOP Cash For Single Passenger
    [Tags]    us7538
    Login To Amadeus Sell Connect
    Enter GDS Command    NM1Leisure/Amadeus Mr    SS U21074 Y 28NOV BCNBSL GK1 / 11551440 / ABCDEFG    RM*CF/-RBM000000N    RU1AHK1SIN21NOV-CWT RETENTION SEGMENT    APE-TEST@EMAIL.COM    RMP/CITIZENSHIP-CA
    Open CA Migration Window
    Click Wrap PNR
    Populate Reporting Required Fields
    Click Panel    Payment
    Click Add Matrix Receipt Button
    Create Matrix Receipt    Cash    CAD Funds    LEISURE-AMADEUS    THIS IS A MAX OF 30 CHARACTERS    500.50
    Populate Visa And Passport Required Fields
    Click Submit To PNR
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    RM *REC/-RLN-1/-RF-${passenger_name}/-AMT-${amount}
    Verify Specific Remark Is Written In The PNR    RM *REC/-RLN-1/-FOP-CA/-LK-T/-BA-101000/-GL-124000
    Verify Specific Remark Is Written In The PNR    RM *REC/-RLN-1/-RM-${description}
    Close Cryptic Display Window
    Switch To Command Page

Verify Accounting Remarks Are Updated For Single Passenger
    [Tags]    us8621
    Open CA Migration Window
    Click Wrap PNR
    Click Panel    Payment
    Click Update Button    1
    Select Bank Account    USD Trust
    Enter Amount    1234.55
    Enter GC Number    9878991
    Enter Description    TESTING OF UPDATE MATRIX
    Select Mode Of Payment    Cheque
    Click Element    css=#amount
    Click Save Button
    Click Submit To PNR
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    RM *REC/-RLN-1/-RF-${passenger_name}/-AMT-${amount}
    Verify Specific Remark Is Written In The PNR    RM *REC/-RLN-1/-FOP-CK/-LK-T/-BA-106000/-GL-124000
    Verify Specific Remark Is Written In The PNR    RM *REC/-RLN-1/-RM-${description}/-GC-${gc_number}
    Close Cryptic Display Window
    Logout To Amadeus Sell Connect
    [Teardown]    Close Browser

Verify Accounting Remarks Are Written For FOP Cash For Multiple Passengers
    [Tags]    us7538
    Login To Amadeus Sell Connect
    Enter GDS Command    NM3POLO/LISA Mrs/Marco Mr/Riza Ms    SS U21074 Y 28NOV BCNBSL GK3 / 11551440 / ABCDEFG    RM*CF/-RBM000000N    APE-TEST@EMAIL.COM    RMP/CITIZENSHIP-CA
    Open CA Migration Window
    Click Wrap PNR
    Populate Reporting Required Fields
    Click Panel    Payment
    Click Add Matrix Receipt Button
    Create Matrix Receipt    Cash    USD Funds    POLO-MARCO    SAMPLE DESCRIPTION    1250.00    123456
    Populate Visa And Passport Required Fields
    Click Submit To PNR
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    RM *REC/-RLN-1/-RF-${passenger_name}/-AMT-${amount}
    Verify Specific Remark Is Written In The PNR    RM *REC/-RLN-1/-FOP-CA/-LK-T/-BA-102000/-GL-124000
    Verify Specific Remark Is Written In The PNR    RM *REC/-RLN-1/-RM-${description}/-GC-${gc_number}
    Close Cryptic Display Window
    Switch To Command Page

Verify Accounting Remarks Are Deleted
    [Tags]    us8621
    Open CA Migration Window
    Click Wrap PNR
    Click Panel    Payment
    Click Payment Delete Button    1
    Confirm Delete
    Click Submit To PNR
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Specific Remark Is Not Written In The PNR    RM *REC/-RLN-1/-RF-${passenger_name}/-AMT-${amount}
    Verify Specific Remark Is Not Written In The PNR    RM *REC/-RLN-1/-FOP-CA/-LK-T/-BA-102000/-GL-124000
    Verify Specific Remark Is Not Written In The PNR    RM *REC/-RLN-1/-RM-${description}/-GC-${gc_number}
    Close Cryptic Display Window
    Logout To Amadeus Sell Connect
    [Teardown]    Close Browser

Verify Accounting Remarks Are Written For FOP Cheque For Multiple Passengers
    [Tags]    us7538
    Login To Amadeus Sell Connect
    Enter GDS Command    NM1Lastname/Firstname Mr    NM1Leisure/Amadeus Mr    NM1POLO/LISA Mrs    SS U21074 Y 28NOV BCNBSL GK1 / 11551440 / ABCDEFG    RM*CF/-RBM000000N    APE-TEST@EMAIL.COM
    ...    RMP/CITIZENSHIP-CA
    Open CA Migration Window
    Click Wrap PNR
    Populate Reporting Required Fields
    Click Panel    Payment
    Click Add Matrix Receipt Button
    Create Matrix Receipt    Cheque    CAD Funds    LEISURE-AMADEUS    SAMPLE DESCRIPTION    200.75    1234567890123456789
    Populate Visa And Passport Required Fields
    Click Submit To PNR
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    RM *REC/-RLN-1/-RF-${passenger_name}/-AMT-${amount}
    Verify Specific Remark Is Written In The PNR    RM *REC/-RLN-1/-FOP-CK/-LK-T/-BA-101000/-GL-124000
    Verify Specific Remark Is Written In The PNR    RM *REC/-RLN-1/-RM-${description}/-GC-${gc_number}    True
    Close Cryptic Display Window
    Logout To Amadeus Sell Connect
    [Teardown]    Close Browser

Verify Accounting Remarks Are Written For FOP Credit Card For Multiple Passengers
    [Tags]    us7538    sanity
    Login To Amadeus Sell Connect
    Enter GDS Command    NM1Lastname/Firstname Mr    NM1Leisure/Amadeus Mr    NM1POLO/LISA Mrs    SS U21074 Y 28NOV BCNBSL GK3 / 11551440 / ABCDEFG    RM*CF/-RBM000000N    RU1AHK1SIN21NOV-CWT RETENTION SEGMENT
    ...    APE-123123    RMP/CITIZENSHIP-CA
    Open CA Migration Window
    Click Wrap PNR
    Populate Reporting Required Fields
    Click Panel    Payment
    Click Add Matrix Receipt Button
    Create Matrix Receipt    Credit Card    CWT (Visa)    LEISURE-AMADEUS    SAMPLE DESCRIPTION    200.75    1234567890123456789
    ...    4444333322221111    0323
    Click Add Matrix Receipt Button
    Create Matrix Receipt    Cash    USD Funds    POLO-LISA    SAMPLE DESCRIPTION    1250.00    123456
    Populate Visa And Passport Required Fields
    Click Submit To PNR
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    RM *REC/-RLN-1/-RF-LEISURE-AMADEUS/-AMT-200.75
    Verify Specific Remark Is Written In The PNR    RM *REC/-RLN-1/-FOP-CCVI4444333322221111/-EXP-0323/-LK-T/-BA-115000/-GL-124000    True
    Verify Specific Remark Is Written In The PNR    RM *REC/-RLN-1/-RM-SAMPLE DESCRIPTION/-GC-1234567890123456789    True
    Close Cryptic Display Window
    Open CA Migration Window
    Click Wrap PNR
    Click Panel    Payment
    Click Update Button    2
    Enter Description    DESCRIPTION-UPDATE
    Click Save Button
    Click Submit To PNR
    Verify Pop-Up Warning Is Displayed
    Click Update Button    1
    Enter Credit Card Number    4444333322221111
    Click Save Button
    Click Submit To PNR
    Sleep    5
    Close CA Migration Window
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    RM *REC/-RLN-1/-RF-LEISURE-AMADEUS/-AMT-200.75
    Verify Specific Remark Is Written In The PNR    RM *REC/-RLN-1/-FOP-CCVI4444333322221111/-EXP-0323/-LK-T/-BA-115000/-GL-124000    True
    Verify Specific Remark Is Written In The PNR    RM *REC/-RLN-1/-RM-SAMPLE DESCRIPTION/-GC-1234567890123456789    True
    Verify Specific Remark Is Written In The PNR    RM *REC/-RLN-2/-RF-POLO-LISA/-AMT-1250.00
    Verify Specific Remark Is Written In The PNR    RM *REC/-RLN-2/-FOP-CA/-LK-T/-BA-102000/-GL-124000
    Verify Specific Remark Is Written In The PNR    RM *REC/-RLN-2/-RM-DESCRIPTION-UPDATE/-GC-123456
    Close Cryptic Display Window
    Logout To Amadeus Sell Connect
    [Teardown]    Close Browser

Verify Accounting Remarks Are Written For RBC Redemption For Multiple Passengers
    [Tags]    us7537
    Login To Amadeus Sell Connect
    Enter GDS Command    NM1Lastname/Firstname Mr    NM1Leisure/Amadeus Mr    NM1POLO/LISA Mrs    SS U21074 Y 28NOV BCNBSL GK3/ 11551440 / ABCDEFG    RM*CF/-RBM000000N    APE-Test@email.com
    ...    RMP/CITIZENSHIP-CA
    Open CA Migration Window
    Click Wrap PNR
    Populate Reporting Required Fields
    Click Panel    Payment
    Click Add Matrix Receipt Button
    Create Matrix Receipt For RBC Redemption    RBC Point Redemption    LEISURE-AMADEUS    200.75    12345    123456789    9999
    Populate Visa And Passport Required Fields
    Click Submit To PNR
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    RM *REC/-RLN-1/-RF-${passenger_name}/-AMT-${amount}
    Verify Specific Remark Is Written In The PNR    RM *REC/-RLN-1/-FOP-PR-${last_four_vi}/-BA-224000/-GL-124000
    Verify Specific Remark Is Written In The PNR    RM *REC/-RLN-1/-RM-POINTS ${rbc_points} REF-${cwt_reference}
    Close Cryptic Display Window
    Switch To Command Page

Verify Accounting Remarks Are Updated For RBC Redemption
    [Tags]    us8621
    Open CA Migration Window
    Click Wrap PNR
    Click Panel    Payment
    Click Update Button    1
    Select Passenger Name    POLO-LISA
    Enter Amount    1234.55
    Enter RBC Points    765432
    Enter CWT Reference    999888111
    Enter Last Four Digit VI    3214
    Click Element    css=#amount
    Click Save Button
    Click Submit To PNR
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    RM *REC/-RLN-1/-RF-${passenger_name}/-AMT-${amount}
    Verify Specific Remark Is Written In The PNR    RM *REC/-RLN-1/-FOP-PR-${last_four_vi}/-BA-224000/-GL-124000
    Verify Specific Remark Is Written In The PNR    RM *REC/-RLN-1/-RM-POINTS ${rbc_points} REF-${cwt_reference}
    Close Cryptic Display Window
    Logout To Amadeus Sell Connect
    [Teardown]    Close Browser
