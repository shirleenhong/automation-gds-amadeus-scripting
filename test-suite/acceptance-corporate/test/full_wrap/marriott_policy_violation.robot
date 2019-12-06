*** Settings ***
Force Tags        corp
Resource          ../../pages/base.robot
Test Setup        Login To Amadeus Sell Connect Acceptance
Test Teardown    Close All Browsers

*** Variables ***
${test_file_name}    marriott_policy

*** Test Cases ***
Verify That The Booking Of PNR Should Not Continue When Client Is Marriott, Airport Code is CSS and Departure And Arrival Time Is 6:00PM To 6:00AM
    [Tags]    us15243
    Create PNR With Passive Air Segments That Departs And Arrives From 6:00PM-6:00AM For Client Marriott, Depart And Arrive Is 6:00pm to 6:00am
    Verify If Marriott Policy Violation Message Is Present In The UI
    Logout To Amadeus Sell Connect
    
Verify That The Booking Of PNR Should Not Continue When Client Is Marriott, Airport Code is CSS and Departure Time Is 6:00PM To 6:00AM
    [Tags]    us15243
    Create PNR With Passive Air Segments That Departs From 6:00PM-6:00AM For Client Marriott, Depart Time Around 6:00pm to 6:00am
    Verify If Marriott Policy Violation Message Is Present In The UI
    Logout To Amadeus Sell Connect

Verify That The Booking Of PNR Should Not Continue When Client Is Marriott, Airport Code is CSS and Arrival Time Is Between 6:00PM and 6:00AM
    [Tags]    us15243
    Create PNR With Active Air Segments For Client Marriott, Arrive Time Around 6:00pm to 6:00am
    Verify If Marriott Policy Violation Message Is Present In The UI
    Logout To Amadeus Sell Connect
    
Verify That The Booking Of PNR Should Continue When Client Is Marriott, Airport Code is CSS and Departure And Arrival Time Is Not Between 6:00PM and 6:00AM
    [Tags]    us15243
    Create PNR With Active Air Segments For Client Marriott, Depart and Arrive Not 6:00pm to 6:00am
    Verify If Marriott Policy Violation Message Is Not Present In The UI
    Logout To Amadeus Sell Connect
    
Verify That The Booking Of PNR Should Continue When Client Is Marriott, Airport Code is Not CSS and Departure And Arrival Time Is Between 6:00PM and 6:00AM
    [Tags]    us15243
    Create PNR With Active Air Segments For Client Marriott, No CCS Route, Depart And Arrive Is 6:00pm to 6:00am
    Verify If Marriott Policy Violation Message Is Not Present In The UI
    Logout To Amadeus Sell Connect
    
Verify That The Booking Of PNR Should Continue When Client Is Marriott, Airport Code is Not CSS and Departure And Arrival Time Is Not Between 6:00PM and 6:00AM
    [Tags]    us15243
    Create PNR With Active Air Segments For Client Marriott, No CCS Route, Depart and Arrive Not 6:00pm to 6:00am
    Verify If Marriott Policy Violation Message Is Not Present In The UI
    Logout To Amadeus Sell Connect
    
Verify That The Booking Of PNR Should Continue When Client Is NOT Marriott, Airport Code is CSS and Departure And Arrival Time Is Between 6:00PM and 6:00AM
    [Tags]    us15243
    Create PNR With Active Air Segments For Any Client Except Marriott, Depart Or Arrive In CCS Around 6:00pm to 6:00am
    Verify If Marriott Policy Violation Message Is Not Present In The UI
    Logout To Amadeus Sell Connect