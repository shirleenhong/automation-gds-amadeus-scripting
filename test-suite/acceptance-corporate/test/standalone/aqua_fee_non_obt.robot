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
${test_file_name}    aqua_fee_non_obt

*** Test Cases ***
Verify Aqua Fee Is Written For Non-OBT With Air Segment Within Canada And Air Fee Is Selected
    [Tags]    us138410
    Create PNR With Active Air Segments For Non-OBT With Domestic Route For Air Fee
    Complete The PNR With Default Values 
    Select AIR FEES Type Of Fee
    Verify Aqua Fee Remarks Are Written In The PNR
    
Verify Aqua Fee Is Written For Non-OBT With Air Segment Within Canada And US And Air Fee Is Selected
    [Tags]    us13841
    Create PNR With Active Air Segments For Non-OBT With Transborder Route For Air Fee
    Complete The PNR With Default Values 
    Select AIR FEES Type Of Fee
    Verify Aqua Fee Remarks Are Written In The PNR
    
Verify Aqua Fee Is Written For Non-OBT With Air Segment Outside Canada And US And Air Fee Is Selected
    [Tags]    us13841
    Create PNR With Active Air Segments For Non-OBT With International Route For Air Fee
    Complete The PNR With Default Values 
    Select AIR FEES Type Of Fee
    Verify Aqua Fee Remarks Are Written In The PNR
    
Verify Aqua Fee Is Written For Non-OBT With Multiple Car Segment And Car Fee Is Selected
    [Tags]    us13841
    Create PNR With Active Air Segments For Non-OBT For Car Fee
    Complete The PNR With Default Values
    Select Segment And Select CAR ONLY FEES
    Verify Aqua Fee Remarks Are Written In The PNR
    
Verify Aqua Fee Is Written For Non-OBT With Hotel Segment And Hotel Fee Is Selected
    [Tags]    us13841
    Create PNR With Active Air Segments For Non-OBT For Hotel Fee
    Complete The PNR With Default Values 
    Select Segment And Select HOTEL ONLY FEES 
    Verify Aqua Fee Remarks Are Written In The PNR
    
Verify Aqua Fee Is Written For Non-OBT With Limo Segment And Limo Fee Is Selected
    [Tags]    us13841
    Create PNR For Non-OBT For Limo Fee
    Add 2 Limo Segments
    Complete The PNR With Default Values 
    Select Segment And Select LIMO ONLY FEES 
    Verify Aqua Fee Remarks Are Written In The PNR
    
Verify Aqua Fee Is Written For Non-OBT With Rail Segment Within Canada And Rail Fee Is Selected
    [Tags]    us13841
    Create PNR With Active Air Segments For Non-OBT For Rail Fee
    Add 1 Rail Segments With Domestic City Codes
    Complete The PNR With Default Values 
    Select RAIL FEES Type Of Fee
    Verify Aqua Fee Remarks Are Written In The PNR
    
Verify Aqua Fee Is Written For Non-OBT With Rail Segment Within Canada And US And Rail Fee Is Selected
    [Tags]    us13841
    Create PNR With Active Air Segments For Non-OBT For Rail Fee For Transborder
    Add 1 Rail Segments With Transborder City Codes
    Complete The PNR With Default Values 
    Select RAIL FEES Type Of Fee
    Verify Aqua Fee Remarks Are Written In The PNR
    
Verify Aqua Fee Is Written For Non-OBT With Rail Segment Outside Canada And US And Rail Fee Is Selected
    [Tags]    us13841
    Create PNR With Active Air Segments For Non-OBT For Rail Fee For International
    Add 1 Rail Segments With International City Codes
    Complete The PNR With Default Values 
    Select RAIL FEES Type Of Fee
    Verify Aqua Fee Remarks Are Written In The PNR
    
Verify Aqua Fee For Exchange Ticket In Non-OBT Is Written In The PNR
    [Tags]    us13841
    Create PNR With Active Air Segments For Non-OBT With Exchange PNR For Air Fee
    Create PNR And Exchange Ticket
    Select AIR FEES Type Of Fee And Supplemental Fee
    Verify Aqua Fee Remarks Are Written In The PNR
    
Verify Aqua Fee For Schedule Change In Non-OBT Is Written In The PNR
    [Tags]    us13841
    Create PNR With Active Air Segments For Non-OBT For Air Fee With Schedule Change Fee
    Create PNR And Exchange Ticket 
    Select AIR FEES Type Of Fee And Schedule Change
    Verify Aqua Fee Remarks Are Written In The PNR
    
Verify Aqua Fee For Flat Exchange Fee In Non-OBT Is Written In The PNR
    [Tags]    us13841
    Create PNR With Active Air Segments For Non-OBT With Exchange PNR For Flat Fee
    Create PNR And Exchange Ticket
    Select AIR FEES Type Of Fee And Supplemental Fee
    Verify Aqua Fee Remarks Are Written In The PNR
    
Verify Aqua Fee For Special Fee Air In Non-OBT Is Written In The PNR
    [Tags]    us13841
    Create PNR With Active Air Segments For Non-OBT With Air For Special Fee
    Create PNR And Exchange Ticket
    Select AIR FEES Type Of Fee And Supplemental Fee
    Verify Aqua Fee Remarks Are Written In The PNR
    
Verify Aqua Fee For Special Fee Rail In Non-OBT Is Written In The PNR
    [Tags]    us13841
    Create PNR With Active Air Segments For Non-OBT With Rail For Special Fee
    Add 1 Rail Segments With Transborder City Codes
    Select RAIL FEES Type Of Fee And Supplemental Fee
    Verify Aqua Fee Remarks Are Written In The PNR
    
Verify Aqua Fee For Entered Special Fee In Non-OBT Is Written In The PNR
    [Tags]    us13841
    Create PNR With Active Air Segments For Non-OBT With Air For Special Fee Input
    Complete The PNR With Default Values 
    Select AIR FEES Type Of Fee And Input Special Fee
    Verify Aqua Fee Remarks Are Written In The PNR
    
Verify Aqua Fee OLB Code In Non-OBT Is Written In The PNR
    [Tags]    us13841
    Create PNR With Active Air Segments For Non-OBT With Air For OLB Fee
    Complete The PNR With Default Values 
    Select AIR FEES Type Of Fee And Supplemental Fee
    Verify Aqua Fee Remarks Are Written In The PNR
    
Verify Aqua Fee OBF Fee In Non-OBT Is Written In The PNR
    [Tags]    us13841
    Create PNR With Active Air Segments For Non-OBT With Air For OLB Fee
    Add 1 Rail Segments With Transborder City Codes
    Complete The PNR With Default Values 
    Select RAIL FEES Type Of Fee And Supplemental Fee
    Verify Aqua Fee Remarks Are Written In The PNR
   