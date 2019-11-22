*** Settings ***
Force Tags        corp
Library           String
Library           SeleniumLibrary
Library           Collections
Library           Screenshot
Resource          ../../pages/base.robot
Test Setup        Login To Amadeus Sell Connect Acceptance
Test Teardown    Close All Browsers

*** Variables ***
${test_file_name}    corporate_receipt

*** Test Cases ***
Verify Corporate Receipt Is Displayed And Matrix Remarks Are Written When CC In The FOP Is Not Accepted By The Airline For Single TST
    [Tags]    us11859
    Create PNR With Active Air Segments For FOP That Is Not Accepted By The Airline For Single TST   
    Select 1 TST For Corporate Script For AX
    Verify Matrix Receipt Remark Is Written For Single TST
    
Verify Corporate Receipt Is Displayed And Matrix Remarks Are Written When CC In The FOP Is Not Accepted By The Airline For Multiple TST
    [Tags]    us11859
    Create PNR With Active Air Segments For FOP That Is Not Accepted By The Airline For Multiple TST
    Select 2 TST For Corporate Script For VI
    Verify Matrix Receipt Remark Is Written For Multiple TSTs
    
Verify Corporate Receipt Is Displayed And Matrix Remarks Are Written When 1 Of The FOP Is Not Accepted The Airline For Multiple TST
    [Tags]    us11859
    Create PNR With Active Air Segments For Multiple FOP That Is Not Accepted The Airline
    Add FOP For Each Segment
    Select 1 TST For Corporate Script For CA
    Verify That Only 1 TST Is Displayed
    Verify Matrix Receipt Remark Is Written For Single TST

Verify Corporate Receipt Is Displayed And Matrix Remarks Are Written When CC In The FOP Is Not Accepted By The Airline For Multiple Passengers
    [Tags]    us11859
    Create PNR With Active Air Segments For FOP That Is Not Accepted By The Airline For Multiple Passengers
    Add FOP And Store Fares For Segment
    Select And Re-Enter Values On TST For Different Credit Cards
    Verify Matrix Receipt Remark Is Written For Multiple Passengers And TSTs
   
Verify Matrix Remarks Are Not Written When Corporate Receipt Checkbox Is Not Selected
    [Tags]    us11859
    Create PNR With Active Air Segments For FOP That Is Not Accepted By The Airline
    Navigate to Page Corporate Receipt
    Verify That Only 1 TST Is Displayed
    Verify Matrix Receipt Remark Is Not Written
    
Verify Corporate Receipt Tab Is Not Displayed CC In The FOP Is Accepted By The Airline
    [Tags]    us11859
    Create PNR With Active Air Segments For FOP That Is Accepted By The Airline
    Verify That Corporate Receipt Is Not Displayed
    Verify Matrix Receipt Remark Is Not Written
    
Verify Corporate Receipt Tab Is Not Displayed Airline Is Not Part Of The List
    [Tags]    us11859
    Create PNR With Active Air Segments For Airline That Is Not Included In The List
    Verify That Corporate Receipt Is Not Displayed
    Verify Matrix Receipt Remark Is Not Written
    
Verify Corporate Receipt Tab Is Not Displayed When FOP Written Is Not Credit Card
    [Tags]    us11859
    Create PNR With Active Air Segments For FOP Cash
    Verify That Corporate Receipt Is Not Displayed
    Verify Matrix Receipt Remark Is Not Written
    
Verify Corporate Receipt Tab Is Not Displayed For Ticketed PNR
    [Tags]    us11859
    Create PNR With Active Air Segments For Ticketed TST
    Ticket The TST And Verify That Corporate Receipt Is Not Displayed
    Verify Matrix Receipt Remark Is Not Written
    