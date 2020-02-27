*** Settings ***
Force Tags        corp
Resource          ../../pages/base.robot
Test Setup       Login To Amadeus Sell Connect Acceptance 
Test Teardown    Close All Browsers

*** Variables ***
${test_file_name}    corp_air_pass_purchase

*** Test Cases ***
Verify That For Air Canada Pass Purchase Correct Fee And Remarks Are Written In The PNR
    [Tags]    US11387
    Create PNR For Corporate, Air Canada For Pass Purchase
    Add Accounting Remark For Standalone Air Canada Pass Purchase
    Verify Accounting Remarks Per Airline Are Written Correctly
    
Verify That For Westjet Pass Purchase Correct Fee And Remarks Are Written In The PNR
    [Tags]    US11387
    Create PNR For Corporate, Westjet Pass Purchase
    Add Accounting Remark For Standalone Westjet Pass Purchase
    Verify Accounting Remarks Per Airline Are Written Correctly
    
Verify That For Porter Pass Purchase Correct Fee And Remarks Are Written In The PNR
    [Tags]    US11387
    Create PNR For Corporate, Porter Pass Purchase
    Add Accounting Remark For Standalone Porter Pass Purchase
    Verify Accounting Remarks Per Airline Are Written Correctly
    
Verify That For Air North Pass Purchase Correct Fee And Remarks Are Written In The PNR
    [Tags]    US11387
    Create PNR For Corporate, Air North Pass Purchase
    Add Accounting Remark For Standalone Air North Pass Purchase
    Verify Accounting Remarks Per Airline Are Written Correctly
    
Verify That For Pacific Coastal Pass Purchase Correct Fee And Remarks Are Written In The PNR
    [Tags]    US11387
    Create PNR For Corporate, Pacific Coastal Pass Purchase
    Add Accounting Remark For Standalone Pacific Coastal Pass Purchase
    Verify Accounting Remarks Per Airline Are Written Correctly
    
