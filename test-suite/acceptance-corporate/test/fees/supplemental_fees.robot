*** Settings ***
Force Tags        corp
Resource          ../../pages/base.robot
Test Setup       Login To Amadeus Sell Connect Acceptance
Test Teardown    Close All Browsers   

*** Variables ***
${test_file_name}    supplemental_fees

*** Test Cases ***
Verify OBT PNR Added Remarks For Supplemental Fees
    [Tags]    us9619    us17664
    Create PNR With Active Air Segments For Supplemental Fee, Transborder Segment, Online
    Add APAY Ticketing Details For Single Segment
    Verify Air/Rail Fees Are Not Displayed
    Verify Remarks Are Added Correctly In The PNR
      
Verify Non OBT PNR Added Remarks For Supplemental Fees    
    [Tags]    us9619    us17664
    Create PNR With Active Air Segments For Supplemental Fee, Transborder Segment, Offline
    Add APAY Ticketing Details For Single Segment
    Verify Air/Rail Fees Are Not Displayed
    Verify Remarks Are Added Correctly In The PNR
    
Verify That Selected No Fee Code Is Written For Non-OBT With APAY
    [Tags]    us9619    us17664
    Create PNR With Active Air Segments For Supplemental Fee, Transborder Segment, Select No Fee Code
    Add APAY Ticketing Details For Single Segment
    Select No Fee Code Associate Business
    Verify Air/Rail Fees Are Not Displayed
    Verify Remarks Are Added Correctly In The PNR
    
Verify That Canada Domestic PNR Added Remarks For Schedule Change Fee
    [Tags]    us9619
    Create PNR With Active Air Segments For Supplemental Fee, Domestic Segment
    Ticket TST1
    Ticket TST2
    Create Multiple TKT Exchange PNR In The GDS
    Select All Schedule Change Checkbox 
    Verify Remarks Are Added Correctly In The PNR
      
Verify That Transborder PNR Added Remarks For Flat Fee
    [Tags]    us9619
    Create PNR With Active Air Segments For Supplemental Fee, Multi Transborder Segment
    Create Multiple TKT Exchange PNR In The GDS
    Verify Default Values Of Exchange Flat Fee With Supplemental Fee
    Verify Remarks Are Added Correctly In The PNR
    
Verify That International PNR Added Remarks For Special Fee
    [Tags]    us9619
    Create PNR With Active Air Segments For Supplemental Fee, International Segment
    Complete The PNR In Full Wrap
    Verify Remarks Are Added Correctly In The PNR
    
Verify That Special Fee Is Written In the PNR For Rail
    [Tags]    us9619
    Create PNR For Supplemental Fee, Rail Segment
    Add 1 Rail Segments
    Verify Default Values Of Special Fee For Rail Ticket
    Verify Remarks Are Added Correctly In The PNR
       
Verify That Special Fee Amount Entered Is Written In The PNR
    [Tags]    us9619
    Create PNR With Active Air Segments For Supplemental Fee, Single Fare With Special Fee
    Verify Default Values Of Special Fee That Has No Value in DB
    Verify Remarks Are Added Correctly In The PNR
      
Verify That Flatkill Fee With Multiple Supplemental Fee Are Written In The PNR
    [Tags]    us9619
    Create PNR With Active Air Segments For Supplemental Fee, Multi Fare With Special Fee
    Create Multiple TKT Exchange PNR In The GDS
    Select Supplemental Fees For All TSTs
    Verify Remarks Are Added Correctly In The PNR
