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
${test_file_name}    aqua_fee_southwest

*** Test Cases ***
Verify ABF Fee Code Is Written For EB/EBA With WN flight
    [Tags]    us13842
    Create PNR With Passive Air Segments For OBT PNR EBA With WN Airline
    Complete The PNR With Default Values 
    Select AIR FEES Type Of Fee And Supplemental Fee
    Verify Aqua Fee Remarks Are Written In The PNR
    
Verify ABF Fee Code Is Written For EB/AMA With WN flight
    [Tags]    us13842    full_regression
    Create PNR With Passive Air Segments For OBT PNR AMA With WN Airline
    Complete The PNR With Default Values 
    Select AIR FEES Type Of Fee And Supplemental Fee
    Verify Aqua Fee Remarks Are Written In The PNR
    
Verify Exchange Fee And OLB Fee Without Supplemental Fee Is Written
    [Tags]    us13842    full_regression
    Create PNR With Active Air Segments For Exchange Fee And OLB Fee
    Create PNR And Exchange Ticket
    Select AIR FEES Type Of Fee And Supplemental Fee
    Verify Aqua Fee Remarks Are Written In The PNR
    
Verify Exchange Fee, And OLB Fee With Supplemental Fee Is Written
    [Tags]    us13842
    Create PNR With Active Air Segments For Exchange Fee, OLB Fee, And Supplemental Fee
    Create PNR And Exchange Ticket
    Select AIR FEES Type Of Fee And Supplemental Fee
    Add Supplemental Fee Code
    Verify Aqua Fee Remarks Are Written In The PNR
    
Verify Supplemental Fee With Ticket Number Is Written
    [Tags]    us13842    full_regression
    Create PNR With Active Air Segments For Supplemental Fee With Ticket Number
    Select AIR FEES Type Of Fee And Supplemental Fee
    Add Supplemental Fee Code With Ticket Number
    Verify Aqua Fee Remarks Are Written In The PNR
    
Verify Supplemental Fee With Supplemental Amount Is Written
    [Tags]    us13842
    Create PNR With Active Air Segments For Supplemental Fee With Amount
    Complete The PNR With Default Values
    Select Type Of Fee And Supplemental Fee With Amount
    Verify Aqua Fee Remarks Are Written In The PNR
    
Verify Exchange Fee And OLB Fee With Supplemental Fee And Ticket Number Is Written
    [Tags]    us13842
    Create PNR With Active Air Segments For Exchange Fee, OLB Fee, And Supplemental Fee With Ticket Number
    Create PNR And Exchange Ticket
    Select AIR FEES Type Of Fee And Supplemental Fee
    Add Supplemental Fee Code With Ticket Number
    Verify Aqua Fee Remarks Are Written In The PNR
    
Verify That MIS Line And Applicable Fees Is Written When PNR Has No Itinerary Segments
    [Tags]    us13842
    Create PNR For Supplemental Fee Without Itinerary
    Select AIR FEES Type Of Fee And Supplemental Fee
    Add Supplemental Fee Code
    Verify Aqua Fee Remarks Are Written In The PNR
    Verify MIS Segment For Aqua Fee Is Written In The PNR
    
Verify ABF Fee Code Is Not Written For EB/ABA With flight Is Not WN
    [Tags]    us13842    full_regression
    Create PNR With Passive Air Segments For OBT PNR EBA With non-WN Airline
    Complete The PNR With Default Values 
    Select AIR FEES Type Of Fee And Supplemental Fee
    Verify Aqua Fee Remarks Are Written In The PNR
    
Verify ABF Fee Code Is Not Written For Non-OBT PNR With WN flight
    [Tags]    us13842    full_regression
    Create PNR With Passive Air Segments For Non-OBT PNR With WN Airline
    Complete The PNR With Default Values 
    Select AIR FEES Type Of Fee And Supplemental Fee
    Verify Aqua Fee Remarks Are Written In The PNR
    