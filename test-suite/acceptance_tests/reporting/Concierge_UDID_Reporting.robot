*** Settings ***
Resource          ../../resources/common/global_resources.robot

*** Test Cases ***
[NEW] Verify That Royal Bank Of Canada Concierge UDIDs Are Written In The PNR When CFA Code is RBM
    [Tags]    us7999
    Login To Amadeus Sell Connect
    Enter GDS Command    NM1Leisure/Amadeus Mr    RM*CF/-RBM0000000N    RU1AHK1MNL12DEC-/TYP-TOR/SUC-ZZ/SC-MNL/SD-12dec/ST-0900/EC-sin/ED-24dec/ET-1800/PS-X    RU1AHK1SIN21NOV-CWT RETENTION SEGMENT    APE12345    TKOK
    Open CA Migration Window
    Click Load PNR
    Click Panel    Reporting
    Select Routing Code    Asia incl. India
    Enter Destination Code    MNL
    Select If PNR Travel to Any Countries Listed    NONE OF THE ABOVE
    Click Reporting Tab    Royal Bank - Concierge
    Select Redemption Added    WITHIN 48 Hours of Original Booking
    Select Reservation Request    Reservation was generated via EMAIL
    Select Booking Type    Cruise/Tour/FIT
    Enter Caller Name    Leisure Callername
    Enter Delegate Caller Name    Leisure Delegatename
    Enter Hotel Name    Hotel Name for Leisure
    Select Reservation For Business Travel    YES
    Select Hotel Reservation Booked    YES
    Click Submit To PNR
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Royal Bank Concierge UDID Remarks Are Written    Within    Email    Cruise    \    True
    Close Cryptic Display Window
    Switch To Command Page

[UPDATE] Verify That Fields For The UDID Written Are Disabled In The Leisure Window When CFA code Is RBM
    [Tags]    us7999
    [Setup]
    Open CA Migration Window
    Click Load PNR
    Click Panel    Reporting
    Select Routing Code    Asia incl. India
    Enter Destination Code    MNL
    Select If PNR Travel to Any Countries Listed    NONE OF THE ABOVE
    Click Reporting Tab    Royal Bank - Concierge
    Verify That Concierge Fields Are Disabled    True    True
    Click Submit To PNR
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Royal Bank Concierge UDID Remarks Are Written    Within    Email    Cruise
    Close Cryptic Display Window
    Logout To Amadeus Sell Connect
    [Teardown]    Close Browser

[NEW] Verify That Royal Bank Of Canada Concierge UDIDs Are Written In The PNR When CFA Code is RBP
    [Tags]    us7999
    Login To Amadeus Sell Connect
    Enter GDS Command    NM1Leisure/Amadeus Mr    RM*CF/-RBP0000000N    SS AC1074 Y 10DEC YYZCDG GK1 / 11551440 / ABCDEFG    APE12345    TKOK
    Open CA Migration Window
    Click Load PNR
    Click Panel    Reporting
    Select Routing Code    Asia incl. India
    Enter Destination Code    CDG
    Select If PNR Travel to Any Countries Listed    NONE OF THE ABOVE
    Click Reporting Tab    Royal Bank - Concierge
    Select Redemption Added    OUTSIDE 48 Hours of Original Booking
    Select Reservation Request    Reservation was generated via Phone Request
    Select Booking Type    Air Only Booking
    Enter Delegate Caller Name    LEISURE DELAGATENAME
    Select Reservation For Business Travel    NO
    Select Hotel Reservation Booked    NO
    Select Reason Hotel Booked    Personal Accommodations
    Click Submit To PNR
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Royal Bank Concierge UDID Remarks Are Written    \    \    \    True
    Close Cryptic Display Window
    Switch To Command Page

[UPDATE] Verify That Fields For The UDID Written Are Disabled In The Leisure Window When CFA code Is RBP
    [Tags]    us7999
    Open CA Migration Window
    Click Load PNR
    Click Panel    Reporting
    Select Routing Code    Asia incl. India
    Enter Destination Code    CDG
    Select If PNR Travel to Any Countries Listed    NONE OF THE ABOVE
    Click Reporting Tab    Royal Bank - Concierge
    Verify That Concierge Fields Are Disabled    \    \    True
    Enter Caller Name    Leisure Callername
    Enter Hotel Name    Hotel Name for Leisure
    Click Submit To PNR
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Royal Bank Concierge UDID Remarks Are Written
    Close Cryptic Display Window
    Logout To Amadeus Sell Connect
    [Teardown]    Close Browser

*** Keywords ***
Verify That Concierge Fields Are Disabled
    [Arguments]    ${is_hotel_name_blank}=False    ${is_caller_name_blank}=False    ${hotel_booked_reason}=False
    Element Should Be Disabled    css=#redemptionAdded
    Element should be Disabled    css=#reservationReq
    Element should be Disabled    css=#bookingType
    Run Keyword If    "${is_caller_name_blank}" == "True"    Element should be Disabled    css=#chCallerName
    Element should be Disabled    css=#delegateName
    Run Keyword If    "${is_caller_name_blank}" == "True"    Element should be Disabled    css=#hotelName
    Element should be Disabled    css=#businessTravel
    Element should be Disabled    css=#hotelRes
    Run Keyword If    "${hotel_booked_reason}" == "True"    Element should be Disabled    css=#reasonHotelBooked
