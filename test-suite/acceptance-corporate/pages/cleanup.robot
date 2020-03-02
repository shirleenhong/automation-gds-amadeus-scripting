*** Settings ***
Library           String
Library           SeleniumLibrary
Library           Collections
Library           Screenshot
Resource          base.robot
Resource          amadeus.robot

*** Keywords ***
Verify That Cleanup PNR Remarks Are Written In The PNR For When Concur OBT Was Booked And Completed
    Sleep    5
    Enter Cryptic Command    RT
    Enter Cryptic Command    IR
    Navigate To Page Reporting Remarks
    Finish PNR
    Verify Expected Remarks Are Written In The PNR
    Verify Specific Remark Is Not Written In The PNR    -TYP-CWT/FEE ONLY
    Verify Specific Remark Is Not Written In The PNR    RMT TKT1-VEN/TK-123123/VN-ACY/S3
    Verify Specific Remark Is Not Written In The PNR    RMT TKT1-BA-1.00/TX1-2.00XG/TX2-4.00RC/TX3-3.00XQ/TX4-5.00XT/COMM-6.00/S3    True
    Verify Specific Remark Is Not Written In The PNR    RMT TKT
    Verify Specific Remark Is Not Written In The PNR    RMT SPLIT
    Verify Specific Remark Is Not Written In The PNR    RM *REC/-RLN
    Verify Specific Remark Is Not Written In The PNR    RM *U86/-OVERRIDE ESC
    Verify Specific Remark Is Not Written In The PNR    RMF LCC-AC*GRAND TOTAL CAD 15.00
    Verify Specific Remark Is Not Written In The PNR    RM *FF/-10.00/S3
    Verify Specific Remark Is Not Written In The PNR    RM *LP/-20.00/S3
    Verify Specific Remark Is Not Written In The PNR    RM *FS/-30.00/S3
    Verify Specific Remark Is Not Written In The PNR    RM *NE/-TEST3
    Verify Specific Remark Is Not Written In The PNR    RM *DE/-ORD/S3
    Verify Specific Remark Is Not Written In The PNR    RM *NUC
    Verify Specific Remark Is Not Written In The PNR    RM *AOF
    Verify Specific Remark Is Not Written In The PNR    RM *MAC/-TEST5
    Verify Specific Remark Is Not Written In The PNR    RM *SFC
    Verify Specific Remark Is Not Written In The PNR    RM *FEE
    Verify Specific Remark Is Not Written In The PNR    RMF SUPFEE1-ATI

Verify That Cleanup PNR Remarks Are Written In The PNR For When Concur OBT Was Not Yet Booked And Completed
    Sleep    5
    Enter Cryptic Command    RT
    Enter Cryptic Command    IR
    Navigate To Page Reporting Remarks
    Finish PNR
    Verify Expected Remarks Are Written In The PNR
    Verify Specific Remark Is Not Written In The PNR    -TYP-CWT/FEE ONLY
    Verify Specific Remark Is Not Written In The PNR    RMT TKT1-VEN/TK-123123/VN-ACY/S3
    Verify Specific Remark Is Not Written In The PNR    RMT TKT1-BA-1.00/TX1-2.00XG/TX2-4.00RC/TX3-3.00XQ/TX4-5.00XT/COMM-6.00/S3    True
    Verify Specific Remark Is Not Written In The PNR    RMT TKT
    Verify Specific Remark Is Not Written In The PNR    RMT SPLIT
    Verify Specific Remark Is Not Written In The PNR    RM *REC/-RLN
    Verify Specific Remark Is Not Written In The PNR    RM *U86/-OVERRIDE ESC
    Verify Specific Remark Is Not Written In The PNR    RMF LCC-AC*GRAND TOTAL CAD 15.00
    Verify Specific Remark Is Not Written In The PNR    RM *FF/-10.00/S3
    Verify Specific Remark Is Not Written In The PNR    RM *LP/-20.00/S3
    Verify Specific Remark Is Not Written In The PNR    RM *FS/-30.00/S3
    Verify Specific Remark Is Not Written In The PNR    RM *NE/-TEST3
    Verify Specific Remark Is Not Written In The PNR    RM *DE/-ORD/S3
    Verify Specific Remark Is Not Written In The PNR    RM *NUC
    Verify Specific Remark Is Not Written In The PNR    RM *AOF
    Verify Specific Remark Is Not Written In The PNR    RM *MAC/-TEST5
    Verify Specific Remark Is Not Written In The PNR    RM *SFC
    Verify Specific Remark Is Not Written In The PNR    RM *FEE
    Verify Specific Remark Is Not Written In The PNR    RM *AGENT CLAIMED
    Verify Specific Remark Is Not Written In The PNR    RMF SUPFEE1-ATI
