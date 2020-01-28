*** Settings ***
Force Tags        corp
Library           String
Library           SeleniumLibrary
Library           Collections
Library           Screenshot
Resource          ../../pages/base.robot
Test Setup       Login To Amadeus Sell Connect Acceptance 
Test Teardown    Close All Browsers

*** Variables ***
${test_file_name}    aqua_fee_obt

*** Test Cases ***
Verify Aqua fee Is Written For OBT Agent Unassisted With MAC line And Air Fee Is Selected
    [Tags]    us13840
    Create PNR With Active Air Segments For OBT PNR With APAY
    Complete The PNR With Default Values 
    Select AIR FEES Type Of Fee
    Verify Aqua Fee Remarks Are Written In The PNR
    
Verify Aqua fee Is Written For OBT Agent Unassisted With MAC line Not Equal To PFS And Car Fee Is Selected
    [Tags]    us13840    full_regression
    Create PNR With Active Air Segments For OBT PNR With non-PFS Supplier For APAY
    Complete The PNR With Default Values 
    Select Segment And Select CAR ONLY FEES
    Verify Aqua Fee Remarks Are Written In The PNR
    
Verify Aqua fee Is Written For OBT Agent Unassisted With Multiple MAC Line Not Equal To PFS And Hotel Fee Is Selected
    [Tags]    us13840    full_regression
    Create PNR For OBT PNR With Multiple non-PFS Supplier For APAY
    Complete The PNR With Default Values
    Select Segment And Select HOTEL ONLY FEES 
    Verify Aqua Fee Remarks Are Written In The PNR
    
Verify Aqua Fee Is Written For OBT Agent Unassisted Without MAC Line And Limo Fee Is Selected
    [Tags]    us13840
    Create PNR With Active Air Segments For OBT PNR Without APAY
    Add 2 Limo Segments
    Complete The PNR With Default Values 
    Select Segment And Select LIMO ONLY FEES
    Verify Aqua Fee Remarks Are Written In The PNR
    
Verify Aqua fee Is Written For OBT Agent Unassisted Without MAC Line And Rail Fee Is Selected
    [Tags]    us13840    full_regression
    Create PNR With Active Air Segments For OBT PNR Without APAY With Rail
    Add 1 Rail Segments
    Complete The PNR With Default Values 
    Select RAIL FEES Type Of Fee
    Verify Aqua Fee Remarks Are Written In The PNR
    
Verify Aqua Fee Is Written For OBT Agent Assisted With MAC Line And Air Fee Is Selected
    [Tags]    us13840    full_regression
    Create PNR With Active Air Segments For OBT PNR With APAY For Agent Assisted
    Complete The PNR With Default Values
    Select AIR FEES And Update Touch Reason
    Verify Aqua Fee Remarks Are Written In The PNR
    
Verify Aqua Fee Is Written For OBT Agent Assisted With MAC Line And Car Fee Is Selected
    [Tags]    us13840
    Create PNR With Active Air Segments For OBT PNR With APAY For Agent Assisted With Car
    Complete The PNR With Default Values
    Select Update Touch Reason CAR ONLY FEES, And Segment
    Verify Aqua Fee Remarks Are Written In The PNR
    
Verify Aqua Fee Is Written For OBT Agent Assisted With Multiple MAC Line And Hotel Fee Is Selected
    [Tags]    us13840
    Create PNR With Active Air Segments For OBT PNR With APAY For Agent Assisted With Hotel
    Complete The PNR With Default Values
    Select Update Touch Reason HOTEL ONLY FEES, And Segment
    Verify Aqua Fee Remarks Are Written In The PNR
    
Verify Aqua Fee Is Written For OBT Agent Assisted Without MAC Line And Limo Fee Is Selected
    [Tags]    us13840
    Create PNR With Active Air Segments For OBT PNR Without APAY For Agent Assisted With Limo
    Complete The PNR With Default Values
    Add 2 Limo Segments
    Select Update Touch Reason LIMO ONLY FEES, And Segment
    Verify Aqua Fee Remarks Are Written In The PNR
    
Verify Aqua Fee Is Written For OBT Agent Assisted Without MAC Line And Rail Fee Is Selected
    [Tags]    us13840    full_regression
    Create PNR With Active Air Segments For OBT PNR Without APAY For Agent Assisted With Rail
    Complete The PNR With Default Values
    Select RAIL FEES And Update Touch Reason
    Verify Aqua Fee Remarks Are Written In The PNR
