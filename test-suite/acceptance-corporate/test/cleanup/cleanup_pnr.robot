*** Settings ***
Force Tags        corp
Library           String
Library           SeleniumLibrary
Library           Collections
Library           Screenshot
Resource          ../../pages/amadeus.robot
Resource          ../../pages/remarks.robot
Resource          ../../pages/base.robot
Resource          ../../pages/cleanup.robot
Resource          ../../../resources/common/api-utilities.txt
Test Teardown    Close All Browsers

*** Variables ***
${test_file_name}    cleanup_pnr

*** Test Cases ***
Verify That The PNR Remarks For Cleanup Are Correctly Written And Deleted In The PNR When Concur OBT Was Booked And Completed
    [Tags]    us11920
    Login To Amadeus Sell Connect Acceptance
    Create MIS Segment With FEE ONLY 5 Months From Now
    Create PNR With Active Air Segments For Cleanup PNR Remark, BB Remark Is 011427, OBT Booked and Concur With Single BSP Segment
    Verify That Cleanup PNR Remarks Are Written In The PNR For When Concur OBT Was Booked And Completed
    
Verify That The PNR Remarks For Cleanup Are Correctly Written And Deleted In The PNR When Concur OBT Was Not Yet Booked And Completed
    [Tags]    us11920
    Login To Amadeus Sell Connect Acceptance
    Create MIS Segment With PNR CANCELLED 5 Months From Now
    Create PNR With Active Air Segments For Cleanup PNR Remark, BB Remark Is Not 011427, OBT Booked and Concur With Single BSP Segment
    Verify That Cleanup PNR Remarks Are Written In The PNR For When Concur OBT Was Not Yet Booked And Completed
    