*** Settings ***
Force Tags        corp
Resource          ../../pages/base.robot
Test Setup       Login To Amadeus Sell Connect Acceptance
Test Teardown    Close All Browsers  

*** Variables ***
${test_file_name}    diving_plongeon

*** Test Cases ***
Verify That The Remarks Should Be Updated Correctly For Diving Plongeon Canada If RM*DP Remark Is CAMO
    [Tags]    us15245
    Create PNR With Active Air Segments For Client C6R, RM*DP Remark Is CAMO
    Complete The PNR In Full Wrap
    Verify Remarks Are Added Correctly In The PNR
    
Verify That The Remarks Should Not Be Updated For Diving Plongeon Canada If RM*DP Remark Is C6RX
    [Tags]    us15245
    Create PNR With Active Air Segments For Client C6R, RM*DP Remark Is C6RX
    Complete The PNR In Full Wrap
    Verify Remarks Are Added Correctly In The PNR
    
Verify That The Remarks Should Not Be Updated For Diving Plongeon Canada If RM*DP Remark Is Any Except C6RX and CAMO
    [Tags]    us15245
    Create PNR With Passive Air Segments For Client C6R, Any RM*DP Remark Except CAMO and C6RX
    Complete The PNR In Full Wrap
    Verify Remarks Are Added Correctly In The PNR

Verify That Diving Plongeon Canada Rules Should Not Apply If CF Line Is Any Except C6R
    [Tags]    us15245
    Create PNR With Passive Air Segments For Any Client Except C6R, RM*DP Remark Is CAMO
    Complete The PNR In Full Wrap
    Verify Remarks Are Added Correctly In The PNR