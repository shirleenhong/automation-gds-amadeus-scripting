*** Settings ***
Force Tags        corp
Library           String
Library           SeleniumLibrary
Library           Collections
Library           Screenshot
Resource          ../../pages/amadeus.robot
Resource          ../../pages/base.robot
Resource          ../../pages/reporting.robot
Resource          ../../pages/payment.robot
# Test Teardown    Close All Browsers

*** Variables ***
${test_file_name}    corporate_pass_redemption

*** Test Cases ***
Verify Remarks Are Written And Cryptic Command Is Sent For Single Corporate Passes
    [Tags]    us10574     not_ready
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Corporate Pass Redemption With AC segments And Single Corporate Pass
    # Add Airline Corporate Pass Redemption And Verify Default Amount Values      
    # Verify Airline Corporate Pass Remarks Are Written In The PNR
	
Verify Remarks Are Written And Cryptic Command Is Sent For Multiple Corporate Passes For EN And CF Is ZZB
    [Tags]    us10574    not_ready
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Corporate Pass Redemption With Multiple Corporate Pass For EN
    Add Airline Corporate Pass Redemption And Verify Default Amount Values For ZZB
    Verify Airline Corporate Pass Remarks Are Written In The PNR
    
Verify Remarks Are Written And Cryptic Command Is Sent For Multiple Corporate Passes For FR And CF Is 92Z
    [Tags]    us10574    not_ready
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Corporate Pass Redemption With Multiple Corporate Pass For FR
    Add Airline Corporate Pass Redemption And Verify Default Amount Values For 92Z
    Verify Airline Corporate Pass Remarks Are Written In The PNR
	
Verify Remarks Are Written For Multiple Airline Corporate Pass Redemption With Ticket Number And CF Is YVQ
    [Tags]    us10574    not_ready
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Corporate Pass Redemption With Multiple Airline Corporate Pass Redemption
    Add Airline Corporate Pass Redemption And Verify Default Amount Values For YVQ
    # Verify Airline Corporate Pass Remarks Are Written In The PNR
    
Verify Remarks Are Written For Multiple Airline Corporate Pass Redemption Without Ticket Number And CF Is YVF
    [Tags]    us10574    not_ready
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Corporate Pass Redemption With Multiple Airline Corporate Pass Redemption Without Ticket Number
    Add Airline Corporate Pass Redemption And Verify Default Amount Values For YVF
    # Verify Airline Corporate Pass Remarks Are Written In The PNR
    
Verify Remarks Are Written When Airline Corporate Pass Redemption Is Added With APAY
    [Tags]    us10574    not_ready
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Corporate Pass Redemption Wit Single Corporate Pass And With APAY
    # Add Airline Corporate Pass Redemption And Verify Default Amount Values
    # Add APAY Ticketing Details For Single Segment
    # Verify Airline Corporate Pass Remarks Are Written In The PNR

    