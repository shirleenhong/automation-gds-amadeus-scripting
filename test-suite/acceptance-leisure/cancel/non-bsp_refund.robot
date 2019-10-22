*** Settings ***
Force Tags        leisure
Resource          ../../resources/common/global_resources.robot

*** Test Cases ***
Verify That RMX Remarks Are Written in the PNR
    [Tags]    us8492   sanity
    Login To Amadeus Sell Connect
    Enter GDS Command    NM1Lastname/Firstname Mr    SS AF1074 Y 10NOV YYZCDG GK1 / 11551440 / ABCDEFG    SS U21075 Y 15NOV CDGMAD GK1 / 11551440 / 1234567    RM*CF/-RBM000000N    APE-TEST@EMAIL.COM    RMP/CITIZENSHIP-CA
    Open CA Migration Window
    Click Wrap PNR
    Populate Reporting Required Fields
    Populate Visa And Passport Required Fields
    Click Submit To PNR
    Click Cancel Segment
    Enter Requestor Name    Amadeus Leisure
    Enter Cancel Notes    1    Test cancel notes1
    Select Cancel Follow-Up Option     Non BSP Refund Recall Commission Request 
    Click Tab    Non BSP Refund Commission Recall
    Enter Branch Number      123456
    Enter Person Requesting    Refund Request
    Enter Passenger Name    Leisure Name   
    Enter CFA    RBP
    Select Cancellation   YES
    Select Commission Recall Only    YES
    Enter Supplier    A2A
    Enter Base Refund Before Penalty    1200.90
    Enter Taxes Being Refunded    34.00XQ 12.99RC 91.00XG
    Enter Penalty    121.50
    Enter Commission Recall Cost    212.00
    Enter Tax on Commission Recall    50.00XQ 101.00RC 291.00XG
    Enter Comments   NON-BSP Refund comment
    Click Cancel Segments Button
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    RMX BRANCH 123456    
    Verify Specific Remark Is Written In The PNR    RMX PERSON REQUESTING REFUND REQUEST
    Verify Specific Remark Is Written In The PNR    RMX PASSENGER LEISURE NAME  
    Verify Specific Remark Is Written In The PNR    RMX CFA RBP CANCELLATION YES
    Verify Specific Remark Is Written In The PNR    RMX COMM RECALL ONLY YES SUPPLIER A2A
    Verify Specific Remark Is Written In The PNR    RMX BASE REFUND BEFORE PENALTY 1200.90 
    Verify Specific Remark Is Written In The PNR    RMX TAXES REFUNDED 34.00XQ 12.99RC 91.00XG
    Verify Specific Remark Is Written In The PNR    RMX PENALTY 121.50
    Verify Specific Remark Is Written In The PNR    RMX COMM RECALL 212.00 TAX ON COMM RECALL 50.00XQ 101.00RC 291.00XG    True
    Verify Specific Remark Is Written In The PNR    RMX COMMENTS NON-BSP REFUND COMMENT
    Close Cryptic Display Window
    Logout To Amadeus Sell Connect
    [Teardown]    Close Browser

Verify That RMX Remarks Are Written in the PNR When Optional Fields Are Blank
    [Tags]    us8492
    Login To Amadeus Sell Connect
    Enter GDS Command    NM1Lastname/Firstname Mr    SS AF1074 Y 10NOV YYZCDG GK1 / 11551440 / ABCDEFG    SS U21075 Y 15NOV CDGMAD GK1 / 11551440 / 1234567    RM*CF/-RBM000000N    APE-TEST@EMAIL.COM    RMP/CITIZENSHIP-CA
    Open CA Migration Window
    Click Wrap PNR
    Populate Reporting Required Fields
    Populate Visa And Passport Required Fields
    Click Submit To PNR
    Click Cancel Segment
    Enter Requestor Name    Amadeus Leisure
    Enter Cancel Notes    1    Test cancel notes1
    Select Cancel Follow-Up Option     Non BSP Refund Recall Commission Request 
    Click Tab    Non BSP Refund Commission Recall
    Enter Branch Number      212311
    Enter Person Requesting    Refund Request
    Enter Passenger Name    Leisure Name   
    Enter CFA    RBP
    Select Cancellation   YES
    Select Commission Recall Only    YES
    Enter Supplier    A2A
    Click Cancel Segments Button
    Close CA Migration Window
    Switch To Graphic Mode
    Open Cryptic Display Window
    Verify Specific Remark Is Written In The PNR    RMX BRANCH 212311    
    Verify Specific Remark Is Written In The PNR    RMX PERSON REQUESTING REFUND REQUEST
    Verify Specific Remark Is Written In The PNR    RMX PASSENGER LEISURE NAME  
    Verify Specific Remark Is Written In The PNR    RMX CFA RBP CANCELLATION YES
    Verify Specific Remark Is Written In The PNR    RMX COMM RECALL ONLY YES SUPPLIER A2A
    Verify Specific Remark Is Not Written In The PNR    RMX BASE REFUND BEFORE PENALTY 1200.90 
    Verify Specific Remark Is Not Written In The PNR    RMX TAXES REFUNDED 34.00
    Verify Specific Remark Is Not Written In The PNR    RMX PENALTY 121.50
    Verify Specific Remark Is Not Written In The PNR    RMX COMM RECALL 212.00 TAX ON COMM RECALL 50.00
    Verify Specific Remark Is Not Written In The PNR    RMX COMMENTS NON-BSP REFUND COMMENT
    Close Cryptic Display Window
    Logout To Amadeus Sell Connect
    [Teardown]    Close Browser