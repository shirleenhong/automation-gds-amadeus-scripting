*** Settings ***
Force Tags        US7751
Resource          ../../resources/common/global_resources.robot

*** Test Cases ***
Verify That The Leisure UDID Remarks Are Written and Updated Correctly If CF Remark is RBM or RBP
    Login To Amadeus Sell Connect
    Enter GDS Command    NM1Leisure/Amadeus Mr    RU1AHK1YYZ12DEC-/TYP-TOR/SUC-ZZ/SC-YYZ/SD-12dec/ST-0900/EC-YQB/ED-25dec/ET-1800/PS-X    RM*CF/-RBM0000000N    RU1AHK1SIN21NOV-CWT RETENTION SEGMENT    APE12345    TKOK
    Open CA Migration Window
    Click Load PNR
    Click Panel    Reporting
    Select Routing Code    Asia incl. India
    Enter Destination Code    YYZ
    Select If PNR Travel to Any Countries Listed    NIGERIA
    Click Panel    Payment
    Click Payment Tab    Leisure Fee
    Select Segment Association    No Fee Applies to PNR
    Click Submit To PNR
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Specific Remark Is Not Written In The PNR    RM *U10/-UMBRELLA CORP
    Verify Specific Remark Is Not Written In The PNR    RM *U12/-NOT NEEDED
    Verify Specific Remark Is Not Written In The PNR    RM *U11/-NOT APPLICABLE
    Verify Specific Remark Is Not Written In The PNR    RM *U30/-NEWLEI
    Verify Specific Remark Is Written In The PNR    RM *U86/-OVERRIDE LEI
    Close Cryptic Display Window
    #update UDID
    Switch To Command Page
    Open CA Migration Window
    Click Load PNR
    Click Panel    Reporting
    Select Routing Code    Asia incl. India
    Enter Destination Code    MNL
    Select If PNR Travel to Any Countries Listed    GHANA
    Click Panel    Payment
    Click Payment Tab    Leisure Fee
    Tick Update Leisure Fee
    Select Segment Association    No Fee Applies to PNR
    Click Submit To PNR
    Close CA Migration Window
    Switch To Graphic Mode
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
    Login To Amadeus Sell Connect
    Enter GDS Command    NM1Leisure/Amadeus Mr    SS AC1074 Y 20DEC YYZYUL GK1 / 11551440 / ABCDEFG    RM*CF/-CVC0000000N    RU1AHK1SIN21NOV-CWT RETENTION SEGMENT    APE12345    TKOK
    Open CA Migration Window
    Click Load PNR
    Click Panel    Reporting
    Select Routing Code    Asia incl. India
    Enter Destination Code    YUL
    Select If PNR Travel to Any Countries Listed    GHANA
    Enter Company Name    Umbrella Corp
    Select Cancellation Insurance Declined    Not needed
    Click Panel    Payment
    Click Payment Tab    Leisure Fee
    Select Segment Association    No Fee Applies to PNR
    Enter Reason for No Association Fees    Not applicable
    Click Submit To PNR
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    RM *U10/-UMBRELLA CORP
    Verify Specific Remark Is Written In The PNR    RM *U12/-NOT NEEDED
    Verify Specific Remark Is Written In The PNR    RM *U11/-NOT APPLICABLE
    Verify Specific Remark Is Written In The PNR    RM *U30/-NEWLEI
    Verify Specific Remark Is Written In The PNR    RM *U86/-OVERRIDE LEI
    Close Cryptic Display Window
    #update UDID
    Switch To Command Page
    Open CA Migration Window
    Click Load PNR
    Click Panel    Reporting
    Select Routing Code    Asia incl. India
    Enter Destination Code    YUL
    Select If PNR Travel to Any Countries Listed    NONE OF THE ABOVE
    Enter Company Name    Stark Industries
    Select Cancellation Insurance Declined    Unavailable
    Click Panel    Payment
    Click Payment Tab    Leisure Fee
    Tick Update Leisure Fee
    Select Segment Association    No Fee Applies to PNR
    Enter Reason for No Association Fees    No segment applicable
    Click Submit To PNR
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    RM *U10/-STARK INDUSTRIES
    Verify Specific Remark Is Written In The PNR    RM *U12/-UNAVAILABLE
    Verify Specific Remark Is Written In The PNR    RM *U11/-NO SEGMENT APPLICABLE
    Verify Specific Remark Is Written In The PNR    RM *U30/-NEWLEI
    Verify Specific Remark Is Written In The PNR    RM *U86/-OVERRIDE LEI
    Close Cryptic Display Window
    Logout To Amadeus Sell Connect
    [Teardown]    Close Browser

Verify That The Leisure UDID Remarks Are Written and Updated Correctly If CF Remark is not RMB/ RBP/ CVC
    Login To Amadeus Sell Connect
    Enter GDS Command    NM1Leisure/Amadeus Mr    SS AC1074 Y 24DEC YYZYYT GK1 / 11551440 / ABCDEFG    RM*CF/-S1A0000000N    APE12345    TKOK
    Open CA Migration Window
    Click Load PNR
    Click Panel    Reporting
    Select Routing Code    Canada and St. Pierre et Miquelon
    Enter Destination Code    YYT
    Select If PNR Travel to Any Countries Listed    NIGERIA
    Select Cancellation Insurance Declined    Cannot afford
    Click Panel    Payment
    Click Payment Tab    Leisure Fee
    Select Segment Association    Ticket Segment
    Enter Amount    100.00
    Select Leisure Fee Form of Payment    Cheque
    Select Traveler Province    Address outside of Canada
    Click Submit To PNR
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Specific Remark Is Not Written In The PNR    RM *U10/-
    Verify Specific Remark Is Not Written In The PNR    RM *U11/-
    Verify Specific Remark Is Written In The PNR    RM *U12/-CANNOT AFFORD
    Verify Specific Remark Is Written In The PNR    RM *U30/-NEWLEI
    Verify Specific Remark Is Written In The PNR    RM *U86/-OVERRIDE LEI
    Close Cryptic Display Window
    #update UDID
    Switch To Command Page
    Open CA Migration Window
    Click Load PNR
    Click Panel    Reporting
    Select Routing Code    Asia incl. India
    Enter Destination Code    YYT
    Select If PNR Travel to Any Countries Listed    PAKISTAN
    Select Cancellation Insurance Declined    Not available
    Click Panel    Payment
    Click Payment Tab    Leisure Fee
    Tick Update Leisure Fee
    Select Segment Association    No Fee Applies to PNR
    Enter Reason for No Association Fees    Not applicable
    Click Submit To PNR
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    RM *U12/-NOT AVAILABLE
    Verify Specific Remark Is Written In The PNR    RM *U11/-NOT APPLICABLE
    Verify Specific Remark Is Written In The PNR    RM *U30/-NEWLEI
    Verify Specific Remark Is Written In The PNR    RM *U86/-OVERRIDE LEI
    Close Cryptic Display Window
    Logout To Amadeus Sell Connect
    [Teardown]    Close Browser
