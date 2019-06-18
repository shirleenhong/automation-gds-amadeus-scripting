*** Settings ***
Resource          ../../resources/common/global_resources.robot

*** Test Cases ***
Verify That Selected Segments Are Cancelled And Cancel Remarks Are Written
    [Tags]    us8214
    Login To Amadeus Sell Connect
    Enter GDS Command    NM1Lastname/Firstname Mr    SS AF1074 Y 10NOV YYZCDG GK1 / 11551440 / ABCDEFG    SS U21075 Y 15NOV CDGMAD GK1 / 11551440 / 1234567    HU1AHK1STR15NOV-17NOV/GERMANY,PARK INN STUTTGART,TEL-+49 711320940,FAX-+49 7113209410,CF:12345,SINGLE ROOM,RATE:CWT EUR60.00/NIGHT,SI-*H01*/P1    RU1AHK1SIN21NOV-/TYP-TOR/SUC-ZZ/SC-sin/SD-12NOV/ST-0900/EC-sin/ED-12NOV/ET-1800/PS-X    RM*CF/-RBM000000N
    ...    RM*NUC    APE12345    TKOK
    Open CA Migration Window
    Click Wrap PNR
    Populate Reporting Required Fields
    Click Submit To PNR
    Click Cancel Segment
    Enter Requestor Name    Amadeus Leisure
    Enter Cancel Notes    1    Test cancel notes1
    Enter Cancel Notes    2    Test cancel notes2
    Select Passive Segment    2
    Select Reason For Cancel    NON REFUNDABLE TICKET CANCELLED DUE TO SCHEDULE CHANGE
    Enter Affected Airline Number    NO12345
    Enter Ticket Number For Refund    1    ABC123
    Enter Coupon Number For Refund    1    123456
    Click Cancel Segments Button
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    /CANCEL REQUESTED BY AMADEUS LEISURE
    Verify Specific Remark Is Written In The PNR    /TEST CANCEL NOTES1
    Verify Specific Remark Is Written In The PNR    /TEST CANCEL NOTES2
    Verify Specific Remark Is Written In The PNR    /HTL SEGMENT INCLUDED IN CANCEL
    Verify Specific Remark Is Written In The PNR    /CANCELLED/CXLD SEG-2
    Verify Specific Remark Is Written In The PNR    /CANCELLED/CXLD SEG-4
    Verify Specific Remark Is Written In The PNR    /TKT NBR-ABC123 CPNS-123456
    Verify Specific Remark Is Written In The PNR    /NO12345
    Verify Specific Remark Is Not Written In The PNR    AF1074 Y 10NOV 7 YYZCDG GK1 \ 1155 1440 \ 10NOV \ \ \ \ ABCDEFG
    Verify Specific Remark Is Not Written In The PNR    HTL 1A HK1 STR 15NOV-17NOV/GERMANY,PARK INN
    Verify Specific Remark Is Not Written In The PNR    RM *NUC
    Verify Specific Remark Is Not Written In The PNR    RIR *FULLCXL**
    Close Cryptic Display Window

Verify That Selected Segments Are Cancelled And Cancel Remarks Are Written When PNR Have Previoulsy Cancelled Segments
    [Tags]    us8214
    Open CA Migration Window
    Click Cancel Segment
    Enter Requestor Name    Test Leisure
    Enter Cancel Notes    1    Test Description Cancel
    Select Passive Segment    1
    Select Reason For Cancel    NONE OF THE ABOVE
    Enter Ticket Number For Refund    1    1234ABC
    Enter Coupon Number For Refund    1    9825252
    Click Cancel Segments Button
    Close CA Migration Window
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    /CANCEL REQUESTED BY TEST LEISURE
    Verify Specific Remark Is Written In The PNR    /TEST DESCRIPTION CANCEL
    Verify Specific Remark Is Written In The PNR    /NO HTL SEGMENT INCLUDED IN CANCEL
    Verify Specific Remark Is Written In The PNR    /CANCELLED/CXLD SEG-ALL
    Verify Specific Remark Is Written In The PNR    /TKT NBR-1234ABC CPNS-9825252
    Verify Specific Remark Is Written In The PNR    RIR *FULLCXL**
    Close Cryptic Display Window
    Logout To Amadeus Sell Connect
    [Teardown]    Close Browser

Verify That UA Segment Is Cancelled And Cancel Remarks Are Written
    [Tags]    us8214    us8882
    Login To Amadeus Sell Connect
    Enter GDS Command    NM1Lastname/Firstname Mr    SS UA1074 Y 13NOV YYZCDG GK1 / 11551440 / ABCDEFG    SS U21075 Y 15NOV CDGMAD GK1 / 11551440 / 1234567    HU1AHK1STR15NOV-17NOV/GERMANY,PARK INN STUTTGART,TEL-+49 711320940,FAX-+49 7113209410,CF:12345,SINGLE ROOM,RATE:CWT EUR60.00/NIGHT,SI-*H01*/P1    RM*CF/-RBM000000N    RM*NUC
    ...    APE12345    TKOK
    Open CA Migration Window
    Click Wrap PNR
    Populate Reporting Required Fields
    Click Submit To PNR
    Click Cancel Segment
    Enter Requestor Name    Amadeus Leisure
    Enter Cancel Notes    1    Test cancel notes1
    Enter Cancel Notes    2    Test cancel notes2
    Select Passive Segment    0    2
    Select UA Reason For Cancel    24 HOURS REFUND
    Enter UA Segment Number    2
    Enter UA Passenger Number    1
    Click Cancel Segments Button
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    /CANCEL REQUESTED BY AMADEUS LEISURE
    Verify Specific Remark Is Written In The PNR    /TEST CANCEL NOTES1
    Verify Specific Remark Is Written In The PNR    /TEST CANCEL NOTES2
    Verify Specific Remark Is Written In The PNR    /HTL SEGMENT INCLUDED IN CANCEL
    Verify Specific Remark Is Written In The PNR    /CANCELLED/CXLD SEG-2
    Verify Specific Remark Is Written In The PNR    /CANCELLED/CXLD SEG-4
    Verify Specific Remark Is Not Written In The PNR    /CANCEL NR DUE TO IROP OR SKD CHG
    Verify Specific Remark Is Not Written In The PNR    /TKT NBR-1234ABC CPNS-9825252
    Verify Specific Remark Is Not Written In The PNR    RIR *FULLCXL**
    Verify Specific Remark Is Not Written In The PNR    RM *NUC
    Close Cryptic Display Window
    Logout To Amadeus Sell Connect
    [Teardown]    Close Browser

Verify That AC Segment Are Cancelled And Cancel Remarks Are Written
    [Tags]    us8214    us8882
    Login To Amadeus Sell Connect
    Enter GDS Command    NM1Lastname/Firstname Mr    SS AC1074 Y 10NOV YYZCDG GK1 / 11551440 / ABCDEFG    SS AC1075 Y 13NOV CDGYYZ GK1 / 11551440 / ABCDEFG    HU1AHK1STR15NOV-17NOV/GERMANY,PARK INN STUTTGART,TEL-+49 711320940,FAX-+49 7113209410,CF:12345,SINGLE ROOM,RATE:CWT EUR60.00/NIGHT,SI-*H01*/P1    SS AC1076 Y 20NOV YYZFRA GK1 / 11551440 / ABCDEFG    RU1AHK1SIN21NOV-/TYP-TOR/SUC-ZZ/SC-sin/SD-21NOV/ST-0900/EC-sin/ED-21NOV/ET-1800/PS-X
    ...    RM*CF/-RBM000000N    RM*NUC    APE12345    TKOK
    Open CA Migration Window
    Click Wrap PNR
    Populate Reporting Required Fields
    Click Submit To PNR
    Click Cancel Segment
    Enter Requestor Name    Amadeus Leisure
    Enter Cancel Notes    1    Test cancel notes1
    Enter Cancel Notes    2    Test cancel notes2
    Unselect Passive Segment    0
    Select Passive Segment    1
    Select Reason For Cancel    NAME CORRECTION NCC WITH OAL
    Enter AC Ticket Number    1234512
    Enter Ticket Number For Refund    1    1234ABC
    Enter Coupon Number For Refund    1    9825252
    # Click Cancel Segments Button
    # Close CA Migration Window
    # Switch To Graphic Mode
    # Open Cryptic Display Window
    # Verify Specific Remark Is Written In The PNR    /CANCEL REQUESTED BY AMADEUS LEISURE
    # Verify Specific Remark Is Written In The PNR    /TEST CANCEL NOTES1
    # Verify Specific Remark Is Written In The PNR    /TEST CANCEL NOTES2
    # Verify Specific Remark Is Written In The PNR    /NO HTL SEGMENT INCLUDED IN CANCEL
    # Verify Specific Remark Is Written In The PNR    /CANCELLED/CXLD SEG-3
    # Verify Specific Remark Is Written In The PNR    /U21075
    # Verify Specific Remark Is Written In The PNR    /CANCEL NR DUE TO IROP OR SKD CHG
    # Verify Specific Remark Is Written In The PNR    /TKT NBR-1234ABC CPNS-9825252
    # Close Cryptic Display Window
    # Switch To Command Page
    # Open CA Migration Window
    # Click Cancel Segment
    # Enter Requestor Name    FirstName LastName
    # Enter Cancel Notes    1    2nd Cancel Segment
    # Select Reason For Cancel    DUPLICATE TICKETS
    # Enter AC Ticket Number    532523
    # Click Cancel Segments Button
    # Close CA Migration Window
    # Switch To Graphic Mode
    # Sleep    5
    # Open Cryptic Display Window
    # Verify Specific Remark Is Written In The PNR    /CANCEL REQUESTED BY FIRSTNAME LASTNAME
    # Verify Specific Remark Is Written In The PNR    /2ND CANCEL SEGMENT
    # Verify Specific Remark Is Written In The PNR    /NO HTL SEGMENT INCLUDED IN CANCEL
    # Verify Specific Remark Is Written In The PNR    /CANCELLED/CXLD SEG-2
    # Verify Specific Remark Is Written In The PNR    /CANCELLED/CXLD SEG-PRE
    # Close Cryptic Display Window
    # Open CA Migration Window
    # Click Cancel Segment
    # Select Passive Segment    1    2
    # Enter Requestor Name    Leisure Canada
    # Enter Cancel Notes    1    3rd Cancel Segment
    # Enter Ticket Number For Refund    1    1234567
    # Enter Coupon Number For Refund    1    7654321
    # Click Cancel Segments Button
    # Close CA Migration Window
    # Sleep    5
    # Open Cryptic Display Window
    # Verify Specific Remark Is Written In The PNR    /CANCEL REQUESTED BY LEISURE CANADA
    # Verify Specific Remark Is Written In The PNR    /3RD CANCEL SEGMENT
    # Verify Specific Remark Is Written In The PNR    /NO HTL SEGMENT INCLUDED IN CANCEL
    # Verify Specific Remark Is Written In The PNR    /CANCELLED/CXLD SEG-ALL
    # Verify Specific Remark Is Written In The PNR    /TKT NBR-1234567 CPNS-7654321
    # Verify Specific Remark Is Written In The PNR    RIR *FULLCXL**
    # Close Cryptic Display Window
    # Logout To Amadeus Sell Connect
    # [Teardown]    Close Browser

Verify That OSI Fields Have Default Values And Cancel Remarks Are Written
    [Tags]    us8214    us8882
    Login To Amadeus Sell Connect
    Enter GDS Command    NM1Lastname/Firstname Mr    SS UA1234 Y 10NOV YYZYTO GK1 / 11551440 / ABCDEFG    SS AC1074 Y 13NOV YTOCDG GK1 / 11551440 / ABCDEFG    SS AC1075 Y 15NOV CDGYYZ GK1 / 11551440 / ABCDEFG    HU1AHK1STR15NOV-17NOV/GERMANY,PARK INN STUTTGART,TEL-+49 711320940,FAX-+49 7113209410,CF:12345,SINGLE ROOM,RATE:CWT EUR60.00/NIGHT,SI-*H01*/P1    SS AC1076 Y 20NOV YYZFRA GK1 / 11551440 / ABCDEFG
    ...    RU1AHK1SIN21NOV-/TYP-TOR/SUC-ZZ/SC-sin/SD-21NOV/ST-0900/EC-sin/ED-21NOV/ET-1800/PS-X    RM*CF/-RBM000000N    RM*NUC    APE12345    TKOK
    Open CA Migration Window
    Click Wrap PNR
    Populate Reporting Required Fields
    Click Submit To PNR
    Click Cancel Segment
    Enter Requestor Name    Amadeus Leisure
    Enter Cancel Notes    1    Test cancel notes1
    Enter Cancel Notes    2    Test cancel notes2
    Select Passive Segment    2
    Select Reason For Cancel    DEATH/IMMINENT DEATH
    Enter Relationship    Test Relationship
    Select UA Reason For Cancel    UA FLIGHT NOT TICKETED YET
    Click Cancel Segments Button
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    /CANCEL REQUESTED BY AMADEUS LEISURE
    Verify Specific Remark Is Written In The PNR    /TEST CANCEL NOTES1
    Verify Specific Remark Is Written In The PNR    /TEST CANCEL NOTES2
    Verify Specific Remark Is Written In The PNR    /NO HTL SEGMENT INCLUDED IN CANCEL
    Verify Specific Remark Is Written In The PNR    /CANCELLED/CXLD SEG-2
    Verify Specific Remark Is Written In The PNR    /CANCELLED/CXLD SEG-4
    Close Cryptic Display Window
    Open CA Migration Window
    Click Cancel Segment
    Select Passive Segment    1    2
    Enter Requestor Name    Leisure Canada
    Enter Cancel Notes    1    Notes Cancellation
    Enter Ticket Number For Refund    1    1234567
    Enter Coupon Number For Refund    1    7654321
    Click Cancel Segments Button
    Close CA Migration Window
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    /CANCEL REQUESTED BY AMADEUS LEISURE
    Verify Specific Remark Is Written In The PNR    /TEST CANCEL NOTES1
    Verify Specific Remark Is Written In The PNR    /TEST CANCEL NOTES2
    Verify Specific Remark Is Written In The PNR    /NO HTL SEGMENT INCLUDED IN CANCEL
    Verify Specific Remark Is Written In The PNR    /CANCELLED/CXLD SEG-2
    Verify Specific Remark Is Written In The PNR    /CANCELLED/CXLD SEG-4
    Verify Specific Remark Is Written In The PNR    /CANCELLED/CXLD SEG-3
    Verify Specific Remark Is Written In The PNR    /CANCELLED/CXLD SEG-PRE
    Verify Specific Remark Is Written In The PNR    /TKT NBR-1234567 CPNS-7654321
    Close Cryptic Display Window
    Logout To Amadeus Sell Connect
    [Teardown]    Close Browser
