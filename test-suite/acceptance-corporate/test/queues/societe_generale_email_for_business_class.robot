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
${test_file_name}    societe

*** Test Cases ***
Verify That Email Is Added For Client Societe Generale When Business Class Is Booked
    [Tags]    us15070
    Create PNR With Active Air Segments For Societe Generale, Business Class Is Booked
    Select Yes In Is Business Class Booked
    Verify Remarks Are Added Correctly In The PNR
    
Verify That Email Is Retained For Client Societe Generale When Business Class Is Booked And Email Is Already Present
    [Tags]    us15070
    Create PNR With Active Air Segments For Societe Generale, Business Class Is Booked And Email Is Already Present
    Select Yes In Is Business Class Booked
    Verify Remarks Are Added Correctly In The PNR
    
Verify That Email Is Not Added For Client Societe Generale When Business Class Is Not Booked
    [Tags]    us15070
    Create PNR With Active Air Segments For Societe Generale, Business Class Is Not Booked
    Select No In Is Business Class Booked
    Verify Remarks Are Not Found In The PNR
    
Verify That Email Is Not Added For Client Societe Generale When No Air Segments Are Booked
    [Tags]    us15070
    Create PNR With Active Air Segments For Societe Generale, No Air Segments Are Booked
    Verify Client Queue Tab Is Not Displayed
    Complete The PNR In Full Wrap
    Verify Remarks Are Not Found In The PNR
    