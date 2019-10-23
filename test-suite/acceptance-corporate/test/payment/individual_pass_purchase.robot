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
Test Teardown    Close All Browsers

*** Test Cases ***
Verify That Non BSP Processing Remark Is Written For Air Canada Individual Pass Purchase PNR
    [Tags]    us10869    us14121
    Login To Amadeus Sell Connect Acceptance
    Move Single Passenger For EN
    Add Matrix Accounting Remark For Air Canada Pass Purchase
    Finish PNR
    Verify Passive Segment Are Written For Air Canada Pass Purchase PNR
    Verify Itinerary Remarks Are Written For Air Canada Pass Purchase PNR
    Verify Ticketing Remarks Are Written For Air Canada Pass Purchase PNR
    Verify PE Remark Are Written For Air Canada Pass Purchase PNR
    Verify UDID Remark Are Written For Air Canada Pass Purchase PNR
    
Verify That Non BSP Processing Remark Is Written For Air Canada Individual Pass Purchase Premium
    [Tags]    us10869    us14121
    Login To Amadeus Sell Connect Acceptance
    Move Single Passenger For EN
    Add Matrix Accounting Remark For Air Canada Pass Purchase For Premium
    Finish PNR
    Verify Passive Segment Are Written For Air Canada Pass Purchase PNR
    Verify Itinerary Remarks Are Written For Air Canada Pass Purchase PNR For Premium
    Verify Ticketing Remarks Are Written For Air Canada Pass Purchase PNR
    Verify PE Remark Are Written For Air Canada Pass Purchase PNR
    Verify UDID Remark Are Written For Air Canada Pass Purchase PNR
    
Verify That Non BSP Processing Remark Is Written For Westjet Individual Pass Purchase PNR
    [Tags]    us10869    us14121
    Login To Amadeus Sell Connect Acceptance
    Move Single Passenger For FR
    Add Matrix Accounting Remark For WestJet Pass Purchase
    Finish PNR
    Verify Passive Segment Are Written For Westjet Pass Purchase PNR
    Verify Itinerary Remarks Are Written For Westjet Pass Purchase PNR
    Verify Ticketing Remarks Are Written For Westjet Pass Purchase PNR
    Verify PE Remark Are Written For Westjet Pass Purchase PNR
    Verify UDID Remark Are Written For Westjet Pass Purchase PNR
    
    
Verify That Non BSP Processing Remark Is Written For Porter Individual Pass Purchase PNR
    [Tags]    us10869    us14121
    Login To Amadeus Sell Connect Acceptance
    Move Single Passenger For EN
    Add Matrix Accounting Remark For Porter Pass Purchase
    Finish PNR
    Verify Passive Segment Are Written For Porter Pass Purchase PNR
    Verify Itinerary Remarks Are Written For Porter Pass Purchase PNR
    Verify Ticketing Remarks Are Written For Porter Pass Purchase PNR
    Verify PE Remark Are Written For Porter Pass Purchase PNR
    Verify UDID Remark Are Written For Porter Pass Purchase PNR
    
    
Verify That Non BSP Processing Remark Is Written And Updated In The PNR
    [Tags]    us10869    us14121
    Login To Amadeus Sell Connect Acceptance
    Move Single Passenger And Add Multiple Passive Air With Different Airline Codes
    Add Matrix Accounting Remark For Air Canada Pass Purchase
    Finish PNR
    Verify Passive Segment Are Written For Air Canada Pass Purchase PNR
    Verify Itinerary Remarks Are Written For Air Canada Pass Purchase PNR
    Verify Ticketing Remarks Are Written For Air Canada Pass Purchase PNR
    Verify PE Remark Are Written For Air Canada Pass Purchase PNR
    Verify UDID Remark Are Written For Air Canada Pass Purchase PNR
    Switch To Command Page
    Modify Matrix Accounting Remark For Air Canada Pass Purchase
    Finish PNR
    Verify Updated Passive Segment Are Written For Air Canada Pass Purhase PNR
    Verify Updated Itinerary Remarks Are Written For Air Canada Pass Purchase PNR
    Verify Updated Ticketing Remarks Are Written For Air Canada Pass Purchase PNR
    Verify Updated PE Remark Are Written For Air Canada Pass Purchase PNR
    Verify Updated UDID Remark Are Written For Air Canada Pass Purchase PNR
    

Verify That Accounting Remark Is Written Correctly For Non BSP Airline Pass Purchase with Ticket Number
    [Tags]    us13615
    Login To Amadeus Sell Connect Acceptance
    Move Single Passenger And Add Multiple Passive Air With Different Airline Codes
    Add Matrix Accounting Remark For Air Canada Pass Purchase
    Verify That Accounting Remark Is Written Correctly For Non BSP Airline Pass Purchase
    Logout To Amadeus Sell Connect
    
