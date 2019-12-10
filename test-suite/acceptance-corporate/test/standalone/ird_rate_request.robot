*** Settings ***
Force Tags        corp
Resource          ../../pages/base.robot
Test Setup        Login To Amadeus Sell Connect Acceptance
Test Teardown     Close All Browsers

*** Variables ***
${test_file_name}    ird_rate_request

*** Test Cases ***
Verify IRD Rate Request Remarks Are Written In the PNR When All Mandatory And Optional Fields Are Populated
    [Tags]    us16315
    Create PNR With Active Air Segments For IRD Rate Request Standalone
    Complete The PNR With Default Values
    Populate IRD Rate Request Mandatory And Optional Fields
    Verify IRD Rate Request Remarks Are Written
    Verify That PNR Is Queued When Travel Is Within 24 Hrs
    
Verify IRD Rate Request Remarks Are Written In the PNR When Optional Fields Are Blank
    [Tags]    us16315
    Create PNR With Active Air Segments For IRD Rate Request Standalone With Blank Optional Fields
    Complete The PNR With Default Values
    Populate IRD Rate Request Mandatory Fields Only
    Verify IRD Rate Request Remarks Are Written
    Verify That PNR Is Queued When Travel Is Within 24 Hrs
    
Verify IRD Rate Request Remarks Are Written In the PNR When Multiple Stopovers Are Entered
    [Tags]    us16315
    Create PNR With Active Air Segments For IRD Rate Request Standalone With Multiple Stopovers
    Complete The PNR With Default Values
    Populate IRD Rate Request With Multiple Stopovers
    Verify IRD Rate Request Remarks Are Written
    Verify That PNR Is Queued When Travel Is Within 24 Hrs
    
Verify IRD Rate Request Remarks Are Written In the PNR When Multiple Comments Are Entered
    [Tags]    us16315
    Create PNR With Active Air Segments For IRD Rate Request Standalone With Multiple Comments
    Complete The PNR With Default Values
    Populate IRD Rate Request With Multiple Comments
    Verify IRD Rate Request Remarks Are Written
    Verify That PNR Is Queued When Travel Is Within 24 Hrs
    
Verify That IRD Rate Request Is Not In the Main Menu When PNR Don't Have Stored Fares
    [Tags]    us16315
    Create PNR With Active Air Segments For IRD Rate Request Without Stored Fares
    Complete The PNR With Default Values
    Verify That IRD Rate Request Is Not Displayed On the Main Menu

Verify That IRD Rate Request Is Not In the Main Menu When Remarks In the GDS Have No Record Locator
    [Tags]    us16315
    Create PNR With Active Air Segments For IRD Rate Request Standalone
    Verify That IRD Rate Request Is Not Displayed On the Main Menu