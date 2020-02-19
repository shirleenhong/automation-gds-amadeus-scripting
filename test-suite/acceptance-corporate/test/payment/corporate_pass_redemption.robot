*** Settings ***
Force Tags        corp
Resource          ../../pages/base.robot
Test Setup       Login To Amadeus Sell Connect Acceptance
Test Teardown    Close All Browsers

*** Variables ***
${test_file_name}    corporate_pass_redemption

*** Test Cases ***
Verify Remarks Are Written And Cryptic Command Is Sent For Single Corporate Passes
    [Tags]    us10574    de3197
    Create PNR With Active Air Segments For Corporate Pass Redemption With AC segments And Single Corporate Pass
    Add Airline Corporate Pass Redemption And Verify Default Amount Values      
    Verify Airline Corporate Pass Remarks Are Written In The PNR
	
Verify Remarks Are Written And Cryptic Command Is Sent For Multiple Corporate Passes For EN And CF Is ZZB
    [Tags]    us10574    de3197
    Create PNR With Active Air Segments For Corporate Pass Redemption With Multiple Corporate Pass For EN
    Add Airline Corporate Pass Redemption And Verify Default Amount Values For ZZB
    Verify Airline Corporate Pass Remarks Are Written In The PNR
    
Verify Remarks Are Written And Cryptic Command Is Sent For Multiple Corporate Passes For FR And CF Is 92Z
    [Tags]    us10574    de3197
    Create PNR With Passive Air Segments For Corporate Pass Redemption With Multiple Corporate Pass For FR
    Add Airline Corporate Pass Redemption And Verify Default Amount Values For 92Z
    Verify Airline Corporate Pass Remarks Are Written In The PNR
	
Verify Remarks Are Written For Multiple Airline Corporate Pass Redemption With Ticket Number And CF Is YVQ
    [Tags]    us10574    de3197
    Create PNR With Passive Air Segments For Corporate Pass Redemption With Multiple Airline Corporate Pass Redemption
    Add Airline Corporate Pass Redemption And Verify Default Amount Values For YVQ
    Verify Airline Corporate Pass Remarks Are Written In The PNR
    
Verify Remarks Are Written For Multiple Airline Corporate Pass Redemption Without Ticket Number And CF Is YFV
    [Tags]    us10574    de3197
    Create PNR With Passive Air Segments For Corporate Pass Redemption With Multiple Airline Corporate Pass Redemption Without Ticket Number
    Add Airline Corporate Pass Redemption And Verify Default Amount Values For YFV
    Verify Airline Corporate Pass Remarks Are Written In The PNR
    
Verify Remarks Are Written When Airline Corporate Pass Redemption Is Added With APAY
    [Tags]    us10574    de3197
    Create PNR With Active Air Segments For Corporate Pass Redemption With Single Corporate Pass And With APAY
    Add Airline Corporate Pass Redemption And Verify Default Amount Values
    Add APAY Ticketing Details For Multiple Segments
    Verify Airline Corporate Pass Remarks Are Written In The PNR
    
