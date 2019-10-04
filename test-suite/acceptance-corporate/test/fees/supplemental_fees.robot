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
Resource          ../../pages/fees.robot

*** Test Cases ***
Verify OBT PNR Added Remarks For Supplemental Fees
    [Tags]    us9619
    Login To Amadeus Sell Connect Acceptance
    Move Single Passenger With Transborder Segments And Single Ticket For OBT
    Add APAY Ticketing Details For Single Segment
    Verify OBT PNR defaults Fee For Tkt And Write No Fee Code In The PNR
    Delete Fare and Itinerary
    [Teardown]    Close Browser
   
Verify Non OBT PNR Added Remarks For Supplemental Fees    
    [Tags]    us9619
    Login To Amadeus Sell Connect Acceptance
    Move Single Passenger With Transborder Segments And Single Ticket
    Add APAY Ticketing Details For Single Segment
    Verify Non OBT PNR defaults Fee For Tkt And Write No Fee Code In The PNR
    Delete Fare and Itinerary
    [Teardown]    Close Browser

Verify That Selected No Fee Code Is Written For Non-OBT With APAY
    [Tags]    us9619
    Login To Amadeus Sell Connect Acceptance
    Move Single Passenger With Transborder Segments And Single Ticket
    Add APAY Ticketing Details For Single Segment
    Navigate To Page Fees
    Select No Fee Code Associate Business
    Verify Selected No Fee Code Is Written
    Delete Fare and Itinerary
    [Teardown]    Close Browser
    
Verify That Canada Domestic PNR Added Remarks For Schedule Change Fee
    [Tags]    us9619
    Login To Amadeus Sell Connect Acceptance
    Move Single Passenger With Multiple Segment For Dom Canada With TSTs
    Verify Default Values For Schedule Change Fees 
    Verify Selected Schedule Change Fees Are written In The PNR
    Delete Fare and Itinerary
    [Teardown]    Close Browser
    
Verify That Transborder PNR Added Remarks For Flat Fee
    [Tags]    us9619
    Login To Amadeus Sell Connect Acceptance
    Move Single Passenger With Multiple Segment For Transborder With TSTs
    Verify Default Values Of Exchange Flat Fee With Supplemental Fee
    Verify That Exchange Flat Fees Are Written In The PNR
    Delete Fare and Itinerary
    [Teardown]    Close Browser
    
Verify That International PNR Added Remarks For Special Fee
    [Tags]    us9619
    Login To Amadeus Sell Connect Acceptance
    Move Single Passenger With Single Segment For International With Non Exchange Ticket
    Verify Default Values Of Special Fee For Air Ticket
    Verify That Special Fee Is Written In The PNR
    Delete Fare and Itinerary
    [Teardown]    Close Browser
    
Verify That Special Fee Is Written In the PNR For Rail
    [Tags]    us9619
    Login To Amadeus Sell Connect Acceptance
    Add Passive Rail Segment For CFA With Special Fee
    Verify Default Values Of Special Fee For Rail Ticket
    Verify That Special Fee Is Written In The PNR For Rail
    Delete Fare and Itinerary
    [Teardown]    Close Browser
    
Verify That Special Fee Amount Entered Is Written In The PNR
    [Tags]    us9619
    Login To Amadeus Sell Connect Acceptance
    Move Single Passenger With Single Segment With Special Fee Required Inputs
    Verify Default Values Of Special Fee That Has No Value in DB
    Verify That Entered Special Fee Is Written In The PNR
    Delete Fare and Itinerary
    [Teardown]    Close Browser
    
Verify That Flat Fee With Multiple Supplemental Fee Are Written In The PNR
    [Tags]    us9619
    Login To Amadeus Sell Connect Acceptance
    Move Single Passenger With Multiple Segment For Transborder With TSTs
    Select Supplemental Fees For All TSTs
    Verify That Multiple Supplemental Fees Are Written In The PNR
    Delete Fare and Itinerary
    [Teardown]    Close Browser