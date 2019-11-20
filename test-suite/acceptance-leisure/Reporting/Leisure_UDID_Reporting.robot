*** Settings ***
Force Tags        leisure
Resource          ../../resources/common/global_resources.robot

*** Test Cases ***
Verify That The Leisure UDID Remarks Are Written and Updated Correctly If CF Remark is RBM or RBP
    [Tags]    us7751    us9429
    Login To Amadeus Sell Connect
    Enter GDS Command    NM1Leisure/Amadeus Mr    RU1AHK1YYZ12DEC-/TYP-TOR/SUC-ZZ/SC-YYZ/SD-12dec/ST-0900/EC-YQB/ED-25dec/ET-1800/PS-X    RM*CF/-RBM0000000N    RU1AHK1SIN21NOV-CWT RETENTION SEGMENT    APE-12345
    Open CA Migration Window
    Click Wrap PNR
    Click Panel    Reporting
    Select Routing Code    Asia incl. India
    Enter Destination Code    YYZ
    Click Panel    Payment
    Click Payment Tab    Leisure Fee
    Populate RBC Conceirge Required Fields
    Click Submit To PNR
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Specific Remark Is Not Written In The PNR    RM *U10/
    Verify Specific Remark Is Not Written In The PNR    RM *U12/
    Verify Specific Remark Is Not Written In The PNR    RM *U11/
    Verify Specific Remark Is Not Written In The PNR    RM *U30/-NEWLEI
    Verify Specific Remark Is Written In The PNR    RM *U86/-OVERRIDE LEI
    Close Cryptic Display Window
    Open CA Migration Window
    Click Wrap PNR
    Click Panel    Reporting
    Select Routing Code    Asia incl. India
    Enter Destination Code    MNL
    Click Submit To PNR
    Close CA Migration Window
    Open Cryptic Display Window
    Verify Specific Remark Is Not Written In The PNR    RM *U10/-
    Verify Specific Remark Is Not Written In The PNR    RM *U12/-
    Verify Specific Remark Is Not Written In The PNR    RM *U11/-
    Verify Specific Remark Is Not Written In The PNR    RM *U30/-NEWLEI
    Verify Specific Remark Is Written In The PNR    RM *U86/-OVERRIDE LEI
    Close Cryptic Display Window
    Logout To Amadeus Sell Connect
    [Teardown]    Close Browser

Verify That The Leisure UDID Remarks Are Written and Updated Correctly If CF Remark is CVC
    [Tags]    us7751    us9429
    Login To Amadeus Sell Connect
    Enter GDS Command    NM1Leisure/Amadeus Mr    SS AC1074 Y 20DEC YYZYUL GK1 / 11551440 / ABCDEFG    RM*CF/-CVC0000000N    RU1AHK1SIN21NOV-CWT RETENTION SEGMENT    APE-test@email.com
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
    Verify Specific Remark Is Written In The PNR    RM *U10/-UMBRELLA CORP
    Verify Specific Remark Is Written In The PNR    RM *U11/-NOT APPLICABLE
    Verify Specific Remark Is Written In The PNR    RM *U30/-NEWLEI
    Verify Specific Remark Is Written In The PNR    RM *U86/-OVERRIDE LEI
    Verify Specific Remark Is Not Written In The PNR    RM *U12/-
    Close Cryptic Display Window
    Switch To Command Page
    Open CA Migration Window
    Click Wrap PNR
    Click Panel    Reporting
    Select Routing Code    Asia incl. India
    Enter Destination Code    YUL
    Enter Company Name    Stark Industries
    Click Panel    Payment
    Click Payment Tab    Leisure Fee
    Enter Reason for No Association Fees    No segment applicable
    Click Submit To PNR
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    RM *U10/-STARK INDUSTRIES
    Verify Specific Remark Is Written In The PNR    RM *U11/-NO SEGMENT APPLICABLE
    Verify Specific Remark Is Written In The PNR    RM *U30/-NEWLEI
    Verify Specific Remark Is Written In The PNR    RM *U86/-OVERRIDE LEI
    Verify Specific Remark Is Not Written In The PNR    RM *U12/-
    Close Cryptic Display Window
    Logout To Amadeus Sell Connect
    [Teardown]    Close Browser

Verify That The Leisure UDID Remarks Are Written and Updated Correctly If CF Remark is not RMB/ RBP/ CVC
    [Tags]    us7751    us9429
    Login To Amadeus Sell Connect
    Enter GDS Command    NM1Leisure/Amadeus Mr    SS AC1074 Y 24DEC YYZYYT GK1 / 11551440 / ABCDEFG    RM*CF/-S1A0000000N    APE-12345
    Open CA Migration Window
    Click Wrap PNR
    Click Panel    Reporting
    Select Routing Code    Canada and St. Pierre et Miquelon
    Enter Destination Code    YYT
    Select Insurance Liability Waiver    All Inclusive or Premium Protection Insurance
    Click Panel    Payment
    Click Payment Tab    Leisure Fee
    Click Add Leisure Fee Collection Button
    Select Segment Association    Ticket Segment
    Enter Amount    100.00
    Select Leisure Fee Form of Payment    Cheque
    Select Traveler Province    Address outside of Canada
    Click Save Button
    Click Submit To PNR
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Specific Remark Is Not Written In The PNR    RM *U10/-
    Verify Specific Remark Is Not Written In The PNR    RM *U11/-
    Verify Specific Remark Is Not Written In The PNR    RM *U12/-
    Verify Specific Remark Is Written In The PNR    RM *U30/-NEWLEI
    Verify Specific Remark Is Written In The PNR    RM *U86/-OVERRIDE LEI
    Close Cryptic Display Window
    Open CA Migration Window
    Click Wrap PNR
    Click Panel    Reporting
    Select Routing Code    Asia incl. India
    Enter Destination Code    YYT
    Click Panel    Payment
    Click Payment Tab    Leisure Fee
    Click Payment Delete Button    1
    Confirm Delete
    Enter Reason for No Association Fees    Not applicable
    Click Submit To PNR
    Close CA Migration Window
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    RM *U11/-NOT APPLICABLE
    Verify Specific Remark Is Written In The PNR    RM *U30/-NEWLEI
    Verify Specific Remark Is Written In The PNR    RM *U86/-OVERRIDE LEI
    Close Cryptic Display Window
    Logout To Amadeus Sell Connect
    [Teardown]    Close Browser
