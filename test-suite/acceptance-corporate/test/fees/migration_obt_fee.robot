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
Resource          ../../pages/ticketing.robot


*** Test Cases ***
Verify OBT SupFee Remark Is Written In The PNR with Air, Rail, Hotel, and Car Segments
    [Tags]    us9402
    Login To Amadeus Sell Connect Acceptance
    Move Single Passenger For OBT
    Book Multiple Segments With Air Car Rail And Hotel
    Open CA Corporate Test
    Click Full Wrap
    Verify Correct OBT Fee Remark Are Written In The PNR For Multiple Segment
    [Teardown]    Close Browser
    
Verify OBT SupFee Remark is written In The PNR For Air Only Segment
    Login To Amadeus Sell Connect Acceptance
    Move Single Passenger For OBT
    Add International Segment And Store Single Fare
    Open CA Corporate Test
    Click Full Wrap
    Verify Correct OBT Fee Remark Are Written In The PNR For Air Only
    [Teardown]    Close Browser
    
Verify OBT SupFee Remark is written In The PNR For Rail Only Segment
    Login To Amadeus Sell Connect Acceptance
    Move Single Passenger For OBT
    Add 1 Rail Segments
    Open CA Corporate Test
    Click Full Wrap
    Verify Correct OBT Fee Remark Are Written In The PNR For Rail Only
    [Teardown]    Close Browser
    
Verify OBT SupFee Remark is written In The PNR For Hotel Only Segment
    Login To Amadeus Sell Connect Acceptance
    Move Single Passenger For OBT
    Add 2 Hotel Segments
    Open CA Corporate Test
    Click Full Wrap
    Verify Correct OBT Fee Remark Are Written In The PNR For Hotel Only
    [Teardown]    Close Browser
    
Verify OBT SupFee Remark is written In The PNR For Car Only Segment
    Login To Amadeus Sell Connect Acceptance
    Move Single Passenger For OBT
    Add 2 Car Segments
    Open CA Corporate Test
    Click Full Wrap
    Verify Correct OBT Fee Remark Are Written In The PNR For Car Only
    [Teardown]    Close Browser
    
Verify That Non OBT PNR Has No Supfee Remark In The PNR
    Login To Amadeus Sell Connect Acceptance
    Move Single Passenger
    Book Multiple Segments With Air Car Rail And Hotel
    Open CA Corporate Test
    Click Full Wrap
    Verify The No Supfee Remark Are Written In The PNR
    [Teardown]    Close Browser
