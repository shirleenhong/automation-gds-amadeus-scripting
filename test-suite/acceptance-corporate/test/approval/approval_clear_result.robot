*** Settings ***
Force Tags        corp
Library           String
Library           SeleniumLibrary
Library           Collections
Library           Screenshot
Resource          ../../pages/amadeus.robot
Resource          ../../pages/base.robot
Resource          ../../pages/payment.robot
Resource          ../../pages/reporting.robot
Resource          ../../pages/ticketing.robot
Resource          ../../../resources/common/api-utilities.txt
Test Teardown    Close All Browsers

*** Variables ***
${test_file_name}    clearresult

*** Test Cases ***
Verify That PNRs For Client ClearResult Is Correctly Queued To Approval Queue With Udid General, Total Ticket Cost
    [Tags]    us13271    full_regression
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Client ClearResult With Udid General, Total Ticket Costs
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
    
Verify That PNRs For Client ClearResult Is Correctly Queued To Approval Queue With Udid Road Warrior, Travel Is Booked Within 14 Days
    [Tags]    us13271
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Client ClearResult With Udid Road Warrior, Travel Is Booked Within 14 Days
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
    
Verify That PNRs For Client ClearResult Is Correctly Queued To Approval Queue With Udid General, Lowest Fare Declined 
    [Tags]    us13271
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Client ClearResult With Udid General, Lowest Fare Declined
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
    
Verify That PNRs For Client ClearResult Is Correctly Queued To Approval Queue With Udid Road Warrior, Hotel Rate is over Rate Cap 
    [Tags]    us13271
    Login To Amadeus Sell Connect Acceptance
    Create PNR For Client ClearResult With Udid Road Warrior, Hotel Rate is over Rate Cap
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
    
Verify That PNRs For Client ClearResult Is Correctly Queued To Approval Queue With Udid General, Car Booked Is Larger Than ICAR 
    [Tags]    us13271
    Login To Amadeus Sell Connect Acceptance
    Create PNR For Client ClearResult With Udid General, Car booked is larger than ICAR
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
    
Verify That PNRs For Client ClearResult Is Correctly Queued To Approval Queue With Udid Road Warrior, Car Reservation Is Not Booked 
    [Tags]    us13271    full_regression
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Client ClearResult With Udid Road Warrior, Car reservation is not booked
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
    
Verify That PNRs For Client ClearResult Is Correctly Queued To Approval Queue With Udid Road General, RM*U10/-NO 
    [Tags]    us13271
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Client ClearResult With Udid General, RM*U10/-NO
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
    
Verify That PNRs For Client ClearResult Can Skip Approval Process
    [Tags]    us13271    full_regression
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Client ClearResult With Udid General, Ignore Approval Process
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
    
Verify That PNRs For Client ClearResult Do Not Go Thru Approval For Udid VIP CEO
    [Tags]    us13271
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Client ClearResult With Udid VIP CEO
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    
    
Verify That PNRs For Client ClearResult Do Not Go Thru Approval For Udid VIP EXEC
    [Tags]    us13271    full_regression
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Client ClearResult With Udid VIP EXEC
    Fill Up Approval Fields
    Verify PNR Approval Is Processed Correctly
    