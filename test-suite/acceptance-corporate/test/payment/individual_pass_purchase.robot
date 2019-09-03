*** Settings ***
Force Tags        corp
Library           String
Library           SeleniumLibrary
Library           Collections
Library           Screenshot
Resource          ../../pages/amadeus.robot
Resource          ../../pages/base.robot
Resource          ../../pages/payment.robot

*** Test Cases ***
Verify That Non BSP Processing Remark Is Written For Air Canada Individual Pass Purchase PNR
    [Tags]    us10869    us14121    ca
    Login To Amadeus Sell Connect Acceptance
    Move Single Passenger For EN
    Open CA Corporate Test
    Click Full Wrap
    Click Payment Panel
    Add Matrix Accounting Remark For Air Canada Pass Purchase
    Click Submit To PNR
    Verify Passive Segment Are Written For Air Canada Pass Purchase PNR
    Verify Itinerary Remarks Are Written For Air Canada Pass Purchase PNR
    Verify Ticketing Remarks Are Written For Air Canada Pass Purchase PNR
    Verify PE Remark Are Written For Air Canada Pass Purchase PNR
    Verify UDID Remark Are Written For Air Canada Pass Purchase PNR
    [Teardown]    Close Browser
    
Verify That Non BSP Processing Remark Is Written For Westjet Individual Pass Purchase PNR
    [Tags]    us10869    us14121    ca
    Login To Amadeus Sell Connect Acceptance
    Move Single Passenger For FR
    Open CA Corporate Test
    Click Full Wrap
    Click Payment Panel
    Add Matrix Accounting Remark For WestJet Pass Purchase
    Click Submit To PNR
    Verify Passive Segment Are Written For Westjet Pass Purchase PNR
    Verify Itinerary Remarks Are Written For Westjet Pass Purchase PNR
    Verify Ticketing Remarks Are Written For Westjet Pass Purchase PNR
    Verify PE Remark Are Written For Westjet Pass Purchase PNR
    Verify UDID Remark Are Written For Westjet Pass Purchase PNR
    [Teardown]    Close Browser
    
Verify ThatNon BSP Processing Remark Is Written For Porter Individual Pass Purchase PNR
    [Tags]    us10869    us14121    ca
    Login To Amadeus Sell Connect Acceptance
    Move Single Passenger For EN
    Open CA Corporate Test
    Click Full Wrap
    Click Payment Panel
    Add Matrix Accounting Remark For Porter Pass Purchase
    Click Submit To PNR
    Verify Passive Segment Are Written For Porter Pass Purchase PNR
    Verify Itinerary Remarks Are Written For Porter Pass Purchase PNR
    Verify Ticketing Remarks Are Written For Porter Pass Purchase PNR
    Verify PE Remark Are Written For Porter Pass Purchase PNR
    Verify UDID Remark Are Written For Porter Pass Purchase PNR
    [Teardown]    Close Browser
    
Verify That Non BSP Processing Remark Is Written And Updated In The PNR
    [Tags]    us10869    us14121    ca
    Login To Amadeus Sell Connect Acceptance
    Move Single Passenger For EN
    Open CA Corporate Test
    Click Full Wrap
    Click Payment Panel
    Add Matrix Accounting Remark For Air Canada Pass Purchase
    Click Submit To PNR
    Verify Passive Segment Are Written For Air Canada Pass Purchase PNR
    Verify Itinerary Remarks Are Written For Air Canada Pass Purchase PNR
    Verify Ticketing Remarks Are Written For Air Canada Pass Purchase PNR
    Verify PE Remark Are Written For Air Canada Pass Purchase PNR
    Verify UDID Remark Are Written For Air Canada Pass Purchase PNR
    Switch To Command Page
    Open CA Corporate Test
    Click Full Wrap
    Click Payment Panel
    Click Back To Main Menu
    Click Full Wrap
    Modify Matrix Accounting Remark For Air Canada Pass Purchase
    Click Submit To PNR
    Verify Updated Passive Segment Are Written For Air Canada Pass Purhase PNR
    Verify Itinerary Remarks Are Written For Air Canada Pass Purchase PNR
    Verify Updated Ticketing Remarks Are Written For Air Canada Pass Purchase PNR
    Verify Updated PE Remark Are Written For Air Canada Pass Purchase PNR
    Verify Updated UDID Remark Are Written For Air Canada Pass Purchase PNR
    Verify Supplier Code Default Value Is Correct For Air Canada Individual Pass Purchase
    [Teardown]    Close Browser

