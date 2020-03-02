*** Settings ***
*** Settings ***
Force Tags        corp
Resource          ../../pages/base.robot
Test Setup       Login To Amadeus Sell Connect Acceptance
Test Teardown    Close All Browsers

*** Variables ***
${test_file_name}    wolverine

*** Test Cases ***
Verify That PNRs For Client Wolverine Are Queued For Approval
    [Tags]    us13271
    Create PNR With Active Air Segments For Client Wolverine Air Only, Select First Primary Reason
    Fill Up Approval Fields
    Enter No Hotel Booked Value: Booked by a meeting site
    Verify PNR Approval Is Processed Correctly   
    
Verify That PNRs For Client Wolverine Can Skip Approval
    [Tags]    us13271    full_regression
    Create PNR With Active Air Segments For Client Wolverine Mix Segments, Skip Approval
    Fill Up Approval Fields
    Enter No Hotel Booked Value: Booked by a meeting site
    Verify PNR Approval Is Processed Correctly
 
Verify That Car Only PNRs For Client Wolverine Do Not Go Thru Approval Process
    [Tags]    us13271    full_regression
    Create PNR With Active Air Segments For Client Wolverine Car Only
    Fill Up Approval Fields
    Enter No Hotel Booked Value: Booked by a meeting site
    Verify PNR Approval Is Processed Correctly
    
Verify That Hotel Only PNRs For Client Wolverine Do Not Go Thru Approval Process
    [Tags]    us13271    full_regression
    Create PNR With Active Air Segments For Client Wolverine Hotel Only
    Fill Up Approval Fields
    Enter No Hotel Booked Value: Booked by a meeting site
    Verify PNR Approval Is Processed Correctly
    
Verify That Car And Hotel Only PNRs For Client Wolverine Do Not Go Thru Approval Process
    [Tags]    us13271
    Create PNR With Active Air Segments For Client Wolverine Car And Hotel Only
    Fill Up Approval Fields
    Enter No Hotel Booked Value: Booked by a meeting site
    Verify PNR Approval Is Processed Correctly
    