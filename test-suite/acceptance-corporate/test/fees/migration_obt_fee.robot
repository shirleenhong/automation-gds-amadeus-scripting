*** Settings ***
Force Tags        corp
Resource          ../../pages/base.robot
Test Setup       Login To Amadeus Sell Connect Acceptance
Test Teardown    Close All Browsers

*** Variables ***
${test_file_name}    migration_obt

*** Test Cases ***
Verify Migration OBT Fee Remark Is Written For Non-OBT PNR
    [Tags]    us9402    us17741    us17749
    Create PNR With Active Air Segments For Migration OBT For Non-OBT PNR
    Complete The PNR In Corporate Scripts
    Verify That Migration OBT Remark Is Written
    
Verify Migration OBT Fee Remark Is Written For OBT PNR
    [Tags]    us9402    us17741    us17749
    Create PNR With Active Air Segments For Migration OBT For OBT PNR
    Complete The PNR In Corporate Scripts
    Verify That Migration OBT Remark Is Written
    
Verify Migration OBT Fee Remark Is Written For PNR With Other Non-Air Segments
    [Tags]    us9402    us17741    us17749
    Create PNR With Active Air Segments For Migration OBT With Other Non-Air Segments
    Complete The PNR In Corporate Scripts
    Verify That Migration OBT Remark Is Written
    
Verify Migration OBT Fee Remark Is Not Written For PNR With Non-Air Segments
    [Tags]    us9402    us17741    us17749
    Create PNR With Active Air Segments For Migration OBT For Non-Air Segments
    Complete The PNR In Corporate Scripts
    Verify That Migration OBT Remark Is Not Written

Verify Migration OBT Fee Remark Is Not Written For CFA That Is Not Setup In Config Parameter   
    [Tags]    us9402    us17741    us17749
    Create PNR With Active Air Segments For CFA That Is Not Setup
    Complete The PNR In Corporate Scripts
    Verify That Migration OBT Remark Is Not Written 
