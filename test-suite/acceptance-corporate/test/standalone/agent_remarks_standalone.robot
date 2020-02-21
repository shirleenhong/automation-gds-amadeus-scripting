*** Settings ***
Force Tags        corp
Resource          ../../pages/base.robot
Test Setup       Login To Amadeus Sell Connect Acceptance
Test Teardown    Close All Browsers  

*** Variables ***
${test_file_name}    document_pnr

*** Test Cases ***
Verify Document Remark Can Be Written In The PNR
    [Tags]    us18001
    Create PNR With Active Air Segments For Document PNR Remark, With Single BSP Segment
    Add Single Agent Remark
    Verify If Remarks Are Written Correctly For Standalone Remarks
    
Verify Multiple Document Remark Can Be Written In The PNR
    [Tags]    us18001
    Create PNR With Active Air Segments For Multiple Document PNR Remark, With Single BSP Segment    
    Add Multiple Agent Remarks
    Verify If Remarks Are Written Correctly For Standalone Remarks
    