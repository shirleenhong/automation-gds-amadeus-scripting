*** Settings ***
Force Tags        corp
Library           String
Resource          ../../pages/base.robot
Test Setup       Login To Amadeus Sell Connect Acceptance
Test Teardown    Close All Browsers

*** Variables ***
${test_file_name}    lilly_car_insurance

*** Test Cases ***
[PX1] Verify That Car Insurance Remarks Are Written For PNR With Active Car
    [Tags]    us15246    not_ready
    Create PNR For Client Lilly With CF PX1
    Book 1 Active Car Segments With ZE
    Complete PNR And Verify Car Insurance Remarks Are Written In The PNR
    Delete Fare and Itinerary
    
[PX1] Verify That Car Insurance Remarks Are Written For PNR With Multiple Passive Cars
    [Tags]    us15246    not_ready
    Create PNR With Passive Air Segments For Client Lilly With CF PX1 And With Passive Air
    Add 2 Passive Car Segments With ZE
    Complete PNR And Verify Car Insurance Remarks Are Written In The PNR
    Delete Fare and Itinerary

[ZX4] Verify That Car Insurance Remarks Are Written For PNR With Multiple Active Cars
    [Tags]    us15246    not_ready
    Create PNR With Active Air Segments For Client Lilly With CF ZX4
    Book 2 Active Car Segments With EZ
    Complete PNR And Verify Car Insurance Remarks Are Written In The PNR
    Delete Fare and Itinerary
    
[ZX4] Verify That Car Insurance Remarks Are Written For PNR With Passive Cars
    [Tags]    us15246    not_ready
    Create PNR With Passive Air Segments For Client Lilly With CF ZX4 And With Passive Air
    Add 1 Passive Car Segments With EZ
    Complete PNR And Verify Car Insurance Remarks Are Written In The PNR
    Delete Fare and Itinerary
    
[PX1] Verify That Car Insurance Remarks Are Written For PNR With Active And Passive Cars
    [Tags]    us15246    not_ready
    Create PNR For Client Lilly With CF PX1 With Active And Passive Cars
    Book 1 Active Car Segments With ZE
    Add 1 Passive Car Segments With EZ
    Complete PNR And Verify Car Insurance Remarks Are Written In The PNR
    Delete Fare and Itinerary
    
[PX1] Verify That Car Insurance Remarks Are Not Written For PNR With Active Car With ZL Vendor Code
    [Tags]    us15246    not_ready
    Create PNR With Passive Air Segments For Client Lilly With CF PX1 With Unexpected Remark
    Book 1 Active Car Segments With ZL
    Complete PNR and Verify Car Insurance Remarks Are Not Written In the PNR
    Delete Fare and Itinerary

[PX1] Verify That Car Insurance Remarks Are Not Written For PNR With Passive Car With ET Vendor Code
    [Tags]    us15246    not_ready
    Create PNR With Passive Air Segments For Client Lilly With Air And Car With CF PX1 With Unexpected Remark
    Add 1 Passive Car Segments With ET
    Complete PNR and Verify Car Insurance Remarks Are Not Written In the PNR
    Delete Fare and Itinerary
    
[ZX4] Verify That Car Insurance Remarks Are Not Written For PNR With Passive Car With SX Vendor Code
    [Tags]    us15246    not_ready
    Create PNR With Passive Air Segments For Client Lilly With CF ZX4 With Unexpected Remark
    Add 1 Passive Car Segments With SX
    Complete PNR and Verify Car Insurance Remarks Are Not Written In the PNR
    Delete Fare and Itinerary
    
[ZX4] Verify That Car Insurance Remarks Are Not Written For PNR With Active Car With EP Vendor Code
    [Tags]    us15246    not_ready
    Create PNR For Client Lilly With CF ZX4 With Unexpected Remark
    Book 1 Active Car Segments With EP
    Complete PNR and Verify Car Insurance Remarks Are Not Written In the PNR
    Delete Fare and Itinerary
    
[PX1] Verify that Car Insurance Remarks Are Not Written For PNR Without Active Or Passive Car
    [Tags]    us15246    not_ready
    Create PNR With Active Air Segments For Client Lilly With CF PX1 With Unexpected Remark
    Complete PNR and Verify Car Insurance Remarks Are Not Written In the PNR
    Delete Fare and Itinerary


*** Keywords ***
Complete PNR And Verify Car Insurance Remarks Are Written In The PNR
    Navigate To Page Reporting Remarks
    Finish PNR
    Verify Expected Remarks Are Written In The PNR   True
    Switch To Command Page
    
Complete PNR and Verify Car Insurance Remarks Are Not Written In the PNR
    Navigate To Page Reporting Remarks
    Finish PNR
    Verify Unexpected Remarks Are Not Written In The PNR
    Switch To Command Page

Book ${num_car_segments} Active Car Segments With ${vendor_code}
    Create ${num_car_segments} Test Dates
    : FOR    ${i}    IN RANGE   1   int(${num_car_segments}+1)
    \    ${nxt}       Evaluate    ${i} + 1
    \    Enter Cryptic Command    CA${vendor_code}YYZ${test_date_${i}}-${test_date_${nxt}}/ARR-0900-1800
    \    Enter Cryptic Command    CA${vendor_code}YYZ${test_date_${i}}-${test_date_${nxt}}/ARR-0900-1800
    \    Enter Cryptic Command    CS1
    \    ${i}    Evaluate    ${i} + 1
    Take Screenshot

Add ${number_of_segments} Passive Car Segments With ${vendor_code}
    Create ${number_of_segments} Test Dates
    :FOR    ${i}    IN RANGE    0   ${number_of_segments}
    \    ${i}    Evaluate    ${i} + 1
    \    Enter Cryptic Command    CU1AHK1FRA${test_date_${i}}-${test_date_${i}}CCMR/SUC-${vendor_code}/SUN-EUROPCAR/SD-${test_date_${i}}/ST-1700/ED-${test_date_${i}}/ET-1700/TTL-100.00USD/DUR-DAILY/MI-50KM FREE/CF-TEST/P1
    Take Screenshot

 