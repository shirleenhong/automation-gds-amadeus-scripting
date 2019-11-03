*** Settings ***
Force Tags        corp
Library           String
Library           SeleniumLibrary
Library           Collections
Library           Screenshot
Resource          ../../pages/amadeus.robot
Resource          ../../pages/remarks.robot
Resource          ../../pages/base.robot
Resource          ../../../resources/common/api-utilities.txt
#Test Teardown    Close All Browsers

*** Variables ***
${test_file_name}    cancel_pnr_workflow
${input_requestor}    css=#requestor
${input_notes1}     css=#desc1
${input_notes2}     css=#desc2
${list_followUup}    css=#followUpOption
${checkbox_cancelAll}    css=#cancelAll
${list_acCancelCheck}    css=#cancelProcess

*** Test Cases ***
Verify That PNR Will Be Cancelled When There Are No Segments And Is Not Booked Via Concur
    [TAGS]    us10041
    Login To Amadeus Sell Connect Acceptance
    Create PNR For Cancellation, No Segments
    Complete The PNR With Default Values
    Fill Up Cancel Segment With Default Values
    Verify Expected Cancellation Remarks Are Written
    
Verify That PNR Will Be Cancelled When There Are No Segments And Is Booked Via Concur
    [TAGS]    us10041
    Login To Amadeus Sell Connect Acceptance
    Create PNR For Cancellation, No Segments, Booked Via Concur
    Complete The PNR With Default Values
    Verify Cancel Segment Fields Are Defaulted For PNRs Booked Via Concur
    Verify Expected Cancellation Remarks Are Written

Verify That FullCxl Will Be Written When All Segments Are Cancelled
    [TAGS]    us10041
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Passive Air Segments For Cancellation, Mix Segments
    Complete The PNR With Default Values
    Cancel All Segments
    Verify Expected Cancellation Remarks Are Written

*** Keywords ***
Fill Up Cancel Segment With Default Values
    Navigate To Page Cancel Segments
    Set Test Variable    ${requestor}    Chuck Velasquez
    Set Test Variable    ${note1}    THIS IS A FREE FLOW TEXT 1
    Set Test Variable    ${note2}    THIS IS A FREE FLOW TEXT 2
    Set Test Variable   ${cancel_all}    no
    Enter Value    ${input_requestor}    ${requestor}
    Enter Value    ${input_notes1}    ${note1}
    Enter Value    ${input_notes2}    ${note2}
    [Teardown]    Take Screenshot

Cancel All Segments
    Navigate To Page Cancel Segments
    Set Test Variable    ${requestor}    Chuck Velasquez
    Set Test Variable    ${note1}    THIS IS A FREE FLOW TEXT 1
    Set Test Variable    ${note2}    THIS IS A FREE FLOW TEXT 2
    Enter Value    ${input_requestor}    ${requestor}
    Enter Value    ${input_notes1}    ${note1}
    Enter Value    ${input_notes2}    ${note2}
    Click Element     ${checkbox_cancelAll}
    Set Test Variable   ${cancel_all}    yes
    [Teardown]    Take Screenshot

Verify Cancel Segment Fields Are Defaulted For PNRs Booked Via Concur
    Navigate To Page Cancel Segments
    Run Keyword And Continue On Failure     Page Should Contain     PAX CXLD PNR VIA OBT
    Set Test Variable    ${requestor}    PAX
    Set Test Variable    ${note1}    PAX CXLD PNR VIA OBT
    Set Test Variable    ${note2}    ${EMPTY}
    [Teardown]    Take Screenshot
    
Verify Expected Cancellation Remarks Are Written
    Assign Current Date
    Finish PNR
    Verify Specific Remark Is Written In The PNR    RMX ${current_date}/CANCEL REQUESTED BY ${requestor}
    Verify Specific Remark Is Written In The PNR    RMX ${current_date}/${note1}
    Run Keyword If    "${note2}" != "${EMPTY}"     Verify Specific Remark Is Written In The PNR    RMX ${current_date}/${note2}
    Run Keyword If   "${cancel_all}" == "yes"     Verify Specific Remark Is Written In The PNR    RIR *FULLCXL**${current_date}
    
    
        
    