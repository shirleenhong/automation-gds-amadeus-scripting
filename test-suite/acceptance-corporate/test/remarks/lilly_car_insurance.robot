*** Settings ***
Force Tags        corp
Resource          ../../pages/base.robot
Test Setup       Login To Amadeus Sell Connect Acceptance
Test Teardown    Close All Browsers

*** Variables ***
${test_file_name}    lilly_car_insurance

*** Test Cases ***
[PX1] Verify That Car Insurance Remarks Are Written For PNR With Active Car
    [Tags]    us15246
    Create PNR For Client Lilly With CF PX1
    Book 1 Active Car Segments With ZE
    Complete PNR And Verify Car Insurance Remarks Are Written In The PNR
    Delete Fare and Itinerary
    
[PX1] Verify That Car Insurance Remarks Are Written For PNR With Multiple Passive Cars
    [Tags]    us15246
    Create PNR With Passive Air Segments For Client Lilly With CF PX1 And With Passive Air
    Add 2 Passive Car Segments With ZE
    Complete PNR And Verify Car Insurance Remarks Are Written In The PNR
    Delete Fare and Itinerary

[ZX4] Verify That Car Insurance Remarks Are Written For PNR With Multiple Active Cars
    [Tags]    us15246
    Create PNR With Active Air Segments For Client Lilly With CF ZX4
    Book 2 Active Car Segments With EZ
    Complete PNR And Verify Car Insurance Remarks Are Written In The PNR
    Delete Fare and Itinerary
    
[ZX4] Verify That Car Insurance Remarks Are Written For PNR With Passive Cars
    [Tags]    us15246
    Create PNR With Passive Air Segments For Client Lilly With CF ZX4 And With Passive Air
    Add 1 Passive Car Segments With EZ
    Complete PNR And Verify Car Insurance Remarks Are Written In The PNR
    Delete Fare and Itinerary
    
[PX1] Verify That Car Insurance Remarks Are Written For PNR With Active And Passive Cars
    [Tags]    us15246
    Create PNR For Client Lilly With CF PX1 With Active And Passive Cars
    Book 1 Active Car Segments With ZE
    Add 1 Passive Car Segments With EZ
    Complete PNR And Verify Car Insurance Remarks Are Written In The PNR
    Delete Fare and Itinerary
    
[PX1] Verify That Car Insurance Remarks Are Not Written For PNR With Active Car With ZL Vendor Code
    [Tags]    us15246
    Create PNR With Passive Air Segments For Client Lilly With CF PX1 With Unexpected Remark
    Book 1 Active Car Segments With ZL
    Complete PNR and Verify Car Insurance Remarks Are Not Written In the PNR
    Delete Fare and Itinerary

[PX1] Verify That Car Insurance Remarks Are Not Written For PNR With Passive Car With ET Vendor Code
    [Tags]    us15246 
    Create PNR With Passive Air Segments For Client Lilly With Air And Car With CF PX1 With Unexpected Remark
    Add 1 Passive Car Segments With ET
    Complete PNR and Verify Car Insurance Remarks Are Not Written In the PNR
    Delete Fare and Itinerary
    
[ZX4] Verify That Car Insurance Remarks Are Not Written For PNR With Passive Car With SX Vendor Code
    [Tags]    us15246    full_regression
    Create PNR With Passive Air Segments For Client Lilly With CF ZX4 With Unexpected Remark
    Add 1 Passive Car Segments With SX
    Complete PNR and Verify Car Insurance Remarks Are Not Written In the PNR
    Delete Fare and Itinerary
    
[ZX4] Verify That Car Insurance Remarks Are Not Written For PNR With Active Car With EP Vendor Code
    [Tags]    us15246    full_regression
    Create PNR For Client Lilly With CF ZX4 With Unexpected Remark
    Book 1 Active Car Segments With EP
    Complete PNR and Verify Car Insurance Remarks Are Not Written In the PNR
    Delete Fare and Itinerary
    
[PX1] Verify that Car Insurance Remarks Are Not Written For PNR Without Active Or Passive Car
    [Tags]    us15246    full_regression
    Create PNR With Active Air Segments For Client Lilly With CF PX1 With Unexpected Remark
    Complete PNR and Verify Car Insurance Remarks Are Not Written In the PNR
    Delete Fare and Itinerary