*** Settings ***
Resource          ../../resources/common/global_resources.robot

*** Test Cases ***
Verify That Matrix Receipt, Matrix Accounting, Leisure, And ITC Remarks Are Written In The PNR
    [Documentation]    Includes the following:
    ...    - BSP Routing code
    ...    - Destination
    ...    - Royal Bank Conceirge
    ...    - Matrix Receipt
    ...    - Leisure fee
    ...    - ITC package Cost
    Login To Amadeus Sell Connect
    Enter GDS Command    NM1Leisure/Amadeus Mr    RM*CF/-RBM0000000N    RU1AHK1SIN12DEC-/TYP-TOR/SUC-ZZ/SC-mla/SD-12dec/ST-0900/EC-sin/ED-24dec/ET-1800/PS-X    SS AC1074 Y 20DEC YYZYUL GK1 / 11551440 / ABCDEFG
    Open CA Migration Window
    Click Load PNR
    Click Panel    Reporting
    Select Routing Code    Europe-incl. Morocco/Tunisia/Algeria/Greenland
    Enter Destination Code    SIN
    Select If PNR Travel to Any Countries Listed    NIGERIA
    Click Reporting Tab    Royal Bank - Concierge
    Select Redemption Added    OUTSIDE 48 Hours of Original Booking
    Select Reservation Request    Reservation was generated via Phone Request
    Select Booking Type    Air Only Booking
    Enter Delegate Caller Name    LEISURE DELAGATENAME
    Select Reservation For Business Travel    NO
    Select Hotel Reservation Booked    NO
    Select Reason Hotel Booked    Personal Accommodations
    Click Panel    Payment
    Click Add Matrix Receipt Button
    Create Matrix Receipt    Cash    CAD Funds    LEISURE-AMADEUS    THIS IS A MAX OF 30 CHARACTERS    500.50
    Click Payment Tab    Matrix Accounting Remark
    Click Add Accounting Line Button
    Create Matrix Accounting Remark    YES    OTHER COSTS    2    CGO    76543    Credit Card
    ...    MC    5555555555554444    0122
    Enter Base Amount    1250.05
    Enter GST Tax Amount    12.00
    Enter HST Tax Amount    10.00
    Enter QST Tax Amount    5.40
    Enter Remark Description    COSTS REMARK
    Click Element    css=#qst
    Click Save Button
    Sleep    5
    Click Payment Tab    Leisure Fee
    Select Segment Association    Tour/Cruise Segment
    Enter Amount    100.00
    Select Leisure Fee Form of Payment    Cheque
    Select Traveler Province    Quebec
    Sleep    5
    Click Panel    Remarks
    Select Package    Itemize Package Cost Remarks
    Enter Currency for ITC    CAD
    Enter Number of Pax for Adult    1
    Enter Base Price for Adult    1222.00
    Enter Base Price Tax for Adult    212.00
    Enter Base Cruise for Adult    552.00
    Enter Base Cruise Tax for Adult    34.54
    Enter Rail Cost for Adult    124.00
    Enter Insurance for Adult    111.00
    Enter ITC Hotel Cost    235.67
    Enter ITC Car Cost    123.00
    Enter ITC Deposit    400.00
    Enter ITC Balance Due Date    09292019
    Enter ITC Commission Amount    533.00
    Click Submit To PNR
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    RM *DE/-SIN
    Verify Specific Remark Is Written In The PNR    FS 42
    Verify Royal Bank Concierge UDID Remarks Are Written    True
    Verify Specific Remark Is Written In The PNR    RM *REC/-RLN-1/-RF-${passenger_name}/-AMT-${amount}
    Verify Specific Remark Is Written In The PNR    RM *REC/-RLN-1/-FOP-CA/-LK-T/-BA-101000/-GL-124000
    Verify Specific Remark Is Written In The PNR    RM *REC/-RLN-1/-RM-${description}
    Verify Specific Remark Is Written In The PNR    RM *MAC/-SUP-${supplier_code}/-LK-MAC1/-AMT-${base_amount}/-PT-${hst_tax}RC/-PT-${gst_tax}XG/-PT-${qst_tax}XQ    True
    Verify Specific Remark Is Written In The PNR    RM *MAC/-SUP-${supplier_code}/-LK-MAC1/-FOP-CCMCXXXXXXXXXXXX4444/-EXP-0122/-MP-PER/-BKN-${supplier_confirmation_number}/S2    True
    Verify Specific Remark Is Written In The PNR    RIR PAID ${remark_description} CF-${supplier_confirmation_number} CAD${base_amount} PLUS 27.40 TAX ON MC/S2    True
    Verify Specific Remark Is Written In The PNR    RM *SFC/-FLN-F1/-FP-TRF/-AMT-CAD100.00/-PT-5.00XG/-PT-9.98XQ/-FOP-CK    True
    Verify Specific Remark Is Written In The PNR    RMY TAX-QC
    Verify Specific Remark Is Written In The PNR    RM *U43/-SEP19
    Verify Specific Remark Is Written In The PNR    RM *U41/-2214.21
    Verify Specific Remark Is Written In The PNR    RM *U42/-533.00
    Verify Specific Remark Is Only Written Once    RIR THE FOLLOWING COSTS ARE SHOWN IN CAD
    Verify Specific Remark Is Only Written Once    RIR ADULT PRICE------------1222.00X1------1,222.00
    Verify Specific Remark Is Only Written Once    RIR ADULT TAXES-------------212.00X1--------212.00
    Verify Specific Remark Is Only Written Once    RIR ADULT CRUISE------------552.00X1--------552.00
    Verify Specific Remark Is Only Written Once    RIR ADULT TAX/PORT CHARGES---34.54X1---------34.54
    Verify Specific Remark Is Only Written Once    RIR ADULT RAIL--------------124.00X1--------124.00
    Verify Specific Remark Is Only Written Once    RIR ADULT INSURANCE---------111.00X1--------111.00
    Verify Specific Remark Is Only Written Once    RIR HOTEL/ACCOMMODATION-----235.67
    Verify Specific Remark Is Only Written Once    RIR CAR RENTAL--------------123.00
    Verify Specific Remark Is Only Written Once    RIR LESS DEPOSIT PAID-------400.00
    Verify Specific Remark Is Only Written Once    RIR TOTAL HOLIDAY COST-----2614.21
    Verify Specific Remark Is Only Written Once    RIR BALANCE DUE------------2214.21
    Verify Specific Remark Is Only Written Once    RIR ---- BALANCE OF 2214.21 IS DUE 29SEP19 ----
    Close Cryptic Display Window
    Switch To Command Page
    [Teardown]    Close Browser

Verify That Matrix Receipt, Matrix Accounting, Leisure, Package Cost, And Reporting Remarks Are Written In The PNR
    [Documentation]    Includes the following:
    ...    - BSP Routing code
    ...    - Destination
    ...    - Leisure UDID
    ...    - Matrix Accounting
    ...    - Leisure fee
    ...    - Package Cost
    Login To Amadeus Sell Connect
    Enter GDS Command    NM1Leisure/Amadeus Mr    RM*CF/-RBM0000000N    RU1AHK1SIN12DEC-/TYP-TOR/SUC-ZZ/SC-mla/SD-12dec/ST-0900/EC-sin/ED-24dec/ET-1800/PS-X    SS AC1074 Y 20DEC YYZYUL GK1 / 11551440 / ABCDEFG
    Open CA Migration Window
    Click Load PNR
    Click Panel    Payment
    Click Payment Tab    Leisure Fee
    Select Segment Association    Ticket Segment
    Enter Amount    100.00
    Select Leisure Fee Form of Payment    Credit Card
    Select Credit Card Vendor Code    VI- Visa
    Enter Credit Card Number    4444333322221111
    Enter Credit Card Expiration Date    0921
    Select Traveler Province    Address outside of Canada
    Click Payment Tab    Matrix Accounting Remark
    Click Add Accounting Line Button
    Create Matrix Accounting Remark    NO    Tour Accounting Remark    4    PER Passenger    AD1    ABC4567891EFG4567890
    ...    Credit Card    VI    4444333322221111    0323
    Enter Base Amount    100.75
    Enter GST Tax Amount    2.00
    Enter HST Tax Amount    1.00
    Enter QST Tax Amount    3.00
    Enter Other Tax Amount    4.00
    Enter Commission With Tax Amount    12.00
    Click Element    css=#qst
    Click Save Button
    Select Is This Air Only?    NO
    Select Exclusive Property    YES
    Enter Hotel/ Property Name    Cozy Arms Hotel
    Select Flights    BETTER FLIGHT TIME
    Enter Price Vs Other Supplier    300pp
    Enter Group    FAMILY GROUP
    Select Preferred Vendor    PREFERRED OPTION NOT AVAILABLE
    Click Panel    Remarks
    Select Package    Tour Package
    Select Tour Package Currency Type    CAD
    Enter Tour Package Number Of Adults    1
    Enter Tour Package Base Cost Per Adult    500.00
    Enter Tour Package Taxes Per Adult    52.00
    Enter Tour Package Number Of Children    1
    Enter Tour Package Insurance Per Adult    100.75
    Enter Tour Package Base Cost Per Child    100.75
    Enter Tour Package Taxes Per Child    55.60
    Enter Tour Package Insurance Per Child    65.75
    Enter Tour Package Number Of Infant    1
    Enter Tour Package Total Cost Per Infant    129.00
    Enter Tour Package Deposit Paid    333.00
    Enter Tour Package Balance Due Date    10222024
    Enter Tour Package Commission Amount    251.00
    Click Submit To PNR
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    RM *SFC/-FA-T1/-FLN-F1/-FP-TRF/-AMT-CAD100.00/-PT-0.00XG/-PT-0.00XQ/-FOP-CCVIXXXXXXXXXXXX1111/-EXP-0921    True
    Verify Specific Remark Is Written In The PNR    RMY TAX-ZZ
    Verify Specific Remark Is Written In The PNR    RM *MAC/-SUP-${supplier_code}/-LK-MAC1/-AMT-${base_amount}/-PT-${hst_tax}RC/-PT-${gst_tax}XG/-PT-${qst_tax}XQ/-PT-${other_tax}XT/-CD-${commission_with_tax}    True
    Verify Specific Remark Is Written In The PNR    RM *MAC/-SUP-${supplier_code}/-LK-MAC1/-FOP-CC${cc_vendor_code}XXXXXXXXXXXX1111/-EXP-0323/-MP-PER/-BKN-${supplier_confirmation_number}/S4    True
    Verify Specific Remark Is Written In The PNR    RM *U76/-NO
    Verify Specific Remark Is Written In The PNR    RM *U71/-YES
    Verify Specific Remark Is Written In The PNR    RM *U75/-COZY ARMS HOTEL
    Verify Specific Remark Is Written In The PNR    RM *U72/-BETTER FLIGHT TIME
    Verify Specific Remark Is Written In The PNR    RM *U73/-300PP
    Verify Specific Remark Is Written In The PNR    RM *U74/-FAMILY GROUP
    Verify Specific Remark Is Written In The PNR    RM *U77/-PREFERRED OPTION NOT AVAILABLE
    Verify Package Costs UDID Remarks Are Written In the PNR    OCT24    670.85
    Verify Specific Remark Is Written In The PNR    RIR THE FOLLOWING COSTS ARE SHOWN IN ${tour_currency_type}
    Verify Specific Remark Is Written In The PNR    RIR ADULT PACKAGE-----------500.00X1--------500.00
    Verify Specific Remark Is Written In The PNR    RIR ADULT TAXES--------------52.00X1---------52.00
    Verify Specific Remark Is Written In The PNR    RIR ADULT INSURANCE---------100.75X1--------100.75
    Verify Specific Remark Is Written In The PNR    RIR CHILD PACKAGE-----------100.75X1--------100.75
    Verify Specific Remark Is Written In The PNR    RIR CHILD TAXES--------------55.60X1---------55.60
    Verify Specific Remark Is Written In The PNR    RIR CHILD INSURANCE----------65.75X1---------65.75
    Verify Specific Remark Is Written In The PNR    RIR INFANT PACKAGE----------129.00X1--------129.00
    Verify Specific Remark Is Written In The PNR    RIR TOTAL PACKAGE PRICE 1003.85
    Verify Specific Remark Is Written In The PNR    RIR LESS DEPOSIT PAID 333.00 -
    Verify Specific Remark Is Written In The PNR    RIR BALANCE DUE 670.85
    Verify Specific Remark Is Written In The PNR    RIR ---- BALANCE OF 670.85 IS DUE 22OCT24 ----
    Verify Specific Remark Is Written In The PNR    RIR SOME TAXES ARE PAYABLE LOCALLY AND NOT INCLUDED ABOVE

Verify That Passive Segments, Accounting remarks, UDIDs, And ITC Remarks Are Written In The PNR
    [Documentation]    Multiple Air, Tour, Hotel
    ...    Matrix Receipt
    ...    Matrix Accounting
    ...    Codeshare
    ...    ITC
    ...    Visa and Passport
    ...    Leisure
    ...    Reporting
    ...    	BSP
    ...    	Conceirge
    ...    	Leisure
    ...    	Destination
    Login To Amadeus Sell Connect
    Enter GDS Command    NM1Leisure/Amadeus Mr    NM1Lastname/Firstname Mr    RM*CF/-RBM000000N    APETest@email.com    TKOK    RU1AHK1SIN21NOV-CWT RETENTION SEGMENT
    Open CA Migration Window
    Click Add Segment Main Menu
    Click Add Segment Button
    Select Segment Type    Air
    Enter Airline Code    AC
    Enter Flight Number    1234
    Enter Class Of Service    Y
    Enter Departure Date    01022020
    Enter Arrival Date    01032020
    Enter Departure City    YUL
    Enter Destination City    CDG
    Enter Departure Time    0330PM
    Enter Arrival Time    0515PM
    Enter Airline Record Locator    ARL1234
    Click Add Passive Save Button
    Click Add Segment Button
    Select Segment Type    Air
    Enter Airline Code    ZZ
    Enter Airline Name For ZZ    Air Canada
    Enter Flight Number    1234
    Enter Class Of Service    Y
    Enter Departure Date    01122020
    Enter Arrival Date    01142020
    Enter Departure City    ZZZ
    Enter Departure Name For ZZZ    Departure ZZZ
    Enter Destination City    ZZZ
    Enter Arrival Name For ZZZ    Arrival ZZZ
    Enter Departure Time    0330PM
    Enter Arrival Time    0515PM
    Enter Airline Record Locator    ARL7656
    Click Add Passive Save Button
    Click Add Segment Button
    Select Segment Type    Tour
    Enter Vendor Name    TEST VENDOR
    Enter Vendor Code    ABC
    Enter Confirmation Number    CN12345678
    Enter Departure Date    01142020
    Enter Arrival Date    01202020
    Enter Departure City    CDG
    Enter Destination City    AMS
    Enter Departure Time    0100PM
    Enter Arrival Time    1200PM
    Enter Segment Name    TOUR NAME TEST
    Enter Number Of Nights    8
    Enter Number Of People    1
    Select Room Type    TRPL
    Select Meal Plan    All Inclusive
    Click Add Passive Save Button
    Click Add Segments To PNR

Verify That Accounting Remarks, UDIDs, And ITC Remarks Can Be Update In the PNR

Verify That Passive Segments Can Be Cancelled
