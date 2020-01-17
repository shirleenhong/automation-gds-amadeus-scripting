*** Settings ***
Force Tags        corp
Library           String
Library           SeleniumLibrary
Library           Collections
Library           Screenshot
Resource          ../../pages/base.robot
Test Teardown    Close All Browsers

*** Variables ***
${test_file_name}    document_pnr

*** Test Cases ***
Verify Document Remark Can Be Written In The PNR
    [Tags]    us10039    sanity_test
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Document PNR Remark, With Single BSP Segment
    Verify That Single Document PNR Can Be Added
    Verify That Document PNR Remarks Are Written In The PNR
    
Verify Multiple Document Remark Can Be Written In The PNR
    [Tags]    us10039
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Multiple Document PNR Remark, With Single BSP Segment    
    Verify That Multiple Document PNR Can Be Added
    Verify That Document PNR Remarks Are Written In The PNR
    