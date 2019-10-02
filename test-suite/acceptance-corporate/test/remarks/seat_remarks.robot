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
Resource          ../../pages/remarks.robot

*** Test Cases ***
Verify Remarks Are Written In The PNR For Seat Selection 1,2 And 5 From Seats Pop Up Window With Seat No, Segment Relation And Seat Type
    [Tags]    us11820
    Login To Amadeus Sell Connect Acceptance
    Move Single Passenger For EN
    Add Canada Domestic Segment And Store Fare
    Add Seat Remarks For Multiple Seat Remarks Options In Single Segment