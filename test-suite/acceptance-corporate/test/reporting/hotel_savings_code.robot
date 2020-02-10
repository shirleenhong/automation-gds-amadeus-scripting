*** Settings ***
Force Tags        corp
Library           String
Resource          ../../pages/base.robot
Test Setup       Login To Amadeus Sell Connect Acceptance
Test Teardown    Close All Browsers

*** Variables ***
${test_file_name}    hotel_savings_code

*** Test Cases ***
Verify That RM*HS Remark Are Written For Single Passive Hotel Segment
    [tags]    us14343
    Create PNR For Single Hotel Segment
    Fill Up Hotel Savings Code With Value C
    Verify Hotel Savings Remark Is Written In The PNR

Verify That RM*HS Remark Are Written For Single Active Hotel Segment
    [tags]    us14343
    Create PNR With Active Hotel Segments In YYZ For Single Hotel Segment
    Fill Up Hotel Savings Code With Value B
    Verify Hotel Savings Remark Is Written In The PNR
    
Verify That RM*HS Remark Are Written For Multiple Passive Hotel Segment
    [tags]    us14343
    Create PNR For Multiple Hotel Segment
    Fill Up Hotel Savings Code With Value E,C
    Verify Hotel Savings Remark Is Written In The PNR

Verify That RM*HS Remark Are Written For Multiple Active Hotel Segment
    [tags]    us14343
    Create PNR With Active Hotel Segments In YUL For Multiple Hotel Segment
    Fill Up Hotel Savings Code With Value C,B
    Verify Hotel Savings Remark Is Written In The PNR    

Verify That RM*HS Remark Are Written With No Savings Code For Single Passive Hotel Segment
    [tags]    us14343
    Create PNR For Single Hotel Segment, No HS Code Values
    Fill Up Hotel Savings Code Without Value
    Verify HS Remark Is Written Without Savings Code
    
Verify That RM*HS Remark Are Written With No Savings Code For Single Active Hotel Segment
    [tags]    us14343
    Create PNR With Active Hotel Segments In PHX For Single Hotel Segment, No HS Code Values
    Fill Up Hotel Savings Code Without Value
    Verify HS Remark Is Written Without Savings Code

Verify That Existing RM*HS Remark Is Deleted If No Associated Date Are In The Hotel Segments
    [tags]    us14343
    Create PNR For Single Hotel Segment
    Fill Up Hotel Savings Code With Value E
    Verify Hotel Savings Remark Is Written In The PNR
    
Verify That Hotel Savings Code Tab Is Displayed When SO Is Set To Show
    [tags]    us17593
    Create PNR For Single Hotel Segment, SO Is Set To Yes
    Verify Hotel Savings Tab Is Displayed
    
Verify That Hotel Savings Code Tab Is Displayed When SO Is Set To Not Show
    [tags]    us17593
    Create PNR For Single Hotel Segment, SO Is Set To No
    Verify Hotel Savings Tab Is Not Displayed
