*** Settings ***
Force Tags        corp
Library           String
Resource          ../../pages/base.robot
Test Setup       Login To Amadeus Sell Connect Acceptance
Test Teardown    Close All Browsers

*** Variables ***
${test_file_name}    bsp_non_bsp_ticket_void

*** Test Cases ***
Verify PNR With Voided BSP Segment Can Be Cancelled Without Reuising Credit Card Autohrization
    [Tags]    us11189
    Create PNR With Active Air Segments For Ticket Void Cancellation
    Complete PNR And Ticket TST1
    Void The Ticket
    Cancel Segment For BSP Void, Don't Reuse Credit Card Authorization And Select Passenger VRsn Option
    Verify Cancellation For Voided BSP Ticket Remarks Are Written In The PNR
    
Verify PNR With Voided BSP Segment Can Be Cancelled While Reuising Credit Card Autohrization
    [Tags]    us11189
    Create PNR With Active Air Segments For Ticket Void Cancellation
    Complete PNR And Ticket TST1
    Void The Ticket
    Cancel Segment For BSP Void, Reuse Credit Card Authorization And Select Agency VRsn Option
    Verify Cancellation For Voided BSP Ticket Remarks Are Written In The PNR

Verify PNR With Voided Non BSP Segment Can Be Cancelled With Reason Reverse All Items
    [Tags]    us11189
    Create PNR With Active Air Segments For Ticket Void Cancellation
    Complete PNR And Ticket TST1
    Void The Ticket
    Cancel Segment For Non BSP Void, Reverse All Items
    Verify Cancellation For Voided Non BSP Ticket Remarks Are Written In The PNR
    
Verify PNR With Voided Non BSP Segment Can Be Cancelled With Reason Reverse Fee only
    [Tags]    us11189
    Create PNR With Active Air Segments For Ticket Void Cancellation
    Complete PNR And Ticket TST1
    Void The Ticket
    Cancel Segment For Non BSP Void, Reverse Fee only
    Verify Cancellation For Voided Non BSP Ticket Remarks Are Written In The PNR
    
Verify PNR With Voided Non BSP Segment Can Be Cancelled With Reason Reverse Document
    [Tags]    us11189
    Create PNR With Active Air Segments For Ticket Void Cancellation
    Complete PNR And Ticket TST1
    Void The Ticket
    Cancel Segment For Non BSP Void, Reverse Document
    Verify Cancellation For Voided Non BSP Ticket Remarks Are Written In The PNR
    
Verify PNR Non Voided Ticket Cannot Be Cancelled
    [Tags]    us11189
    Create PNR With Active Air Segments For Ticket Void Cancellation
    Complete PNR And Ticket TST1
    Verify Agent Is Not Able To Cancel Segments With Unvoided Ticket
    
*** Keywords ***
Void The Ticket
    Switch To Graphic Mode
    Get PNR Details
    ${ticket_line}    Get Lines Containing String     ${pnr_details}    FA PAX
    ${line_no}    Split String    ${ticket_line}    FA PAX
    ${line_num}    Strip String    ${line_no[0]}
    ${ticket_num}    Fetch From Left    ${line_no[1]}    /
    ${ticket_num}    Strip String    ${ticket_num}
    Set Test Variable   ${ticket_num}
    Switch To Command Page
    Enter Cryptic Command   TRDC/L${line_num}
    
Cancel Segment For BSP Void, ${reuse_value} Credit Card Authorization And Select ${v_reason} VRsn Option
    Navigate To Page Cancel Segments
    Cancel All Segments
    Select From List By Value    ${list_followUp}    Void BSP
    Wait Until Element Is Visible    ${input_cFirstInitial}     10
    Enter Value    ${input_cFirstInitial}    C
    Enter Value    ${input_cLastName}    Amadeus
    Click Element     ${checkbox_ticketVoidList}
    Run Keyword If     "${reuse_value}" == "Reuse"     Select From List By Value     ${list_reuseCC}    yes 
    ...    ELSE IF     "${reuse_value}" == "Don't Reuse"     Select From List By Value     ${list_reuseCC}    no
    Run Keyword If     "${reuse_value}" == "Reuse"     Enter Value    ${input_authorization}    CAmadeus
    Select From List By Label    ${list_vRsnOption}    ${v_reason}
    Set Test Variable    ${v_reason}
    Set Test Variable    ${c_name}    AMADEUS C
    Set Test Variable    ${authorization}     CAmadeus
    ${reuse}    Set Variable If    "${reuse_value}" == "Reuse"    yes    no
    Set Test Variable    ${reuse}
    
Cancel Segment For Non BSP Void, ${reverse_item}
    Navigate To Page Cancel Segments
    Cancel All Segments
    Select From List By Value    ${list_followUp}    Void Non BSP
    Wait Until Element Is Visible    ${input_cFirstInitial}     10
    Enter Value    ${input_cFirstInitial}    C
    Enter Value    ${input_cLastName}    Amadeus
    Select From List By Label    ${list_reverseItem}    ${reverse_item}
    Enter Value    ${input_otherDetails1}    OTHER DETAILS 1
    Enter Value    ${input_otherDetails2}    OTHER DETAILS 2
    Set Test Variable    ${reverse_item}
    Set Test Variable    ${other_details_1}    OTHER DETAILS 1
    Set Test Variable    ${other_details_2}    OTHER DETAILS 2
    Set Test Variable    ${c_name}    AMADEUS C
    
Verify Cancellation For Voided BSP Ticket Remarks Are Written In The PNR
    Finish PNR    queueing=yes
    Assign Current Date
    Verify Specific Remark Is Written In The PNR    RMX ${current_date}/${c_name}
    Verify Specific Remark Is Written In The PNR    RMX ATTN BRANCH ADMIN - VOID TKT NBR ${ticket_num}
    Verify Specific Remark Is Written In The PNR    RMX VOID REASON - ${v_reason.upper()}
    Run Keyword If    "${reuse}" == "yes"     Verify Specific Remark Is Written In The PNR    RMX REISS VOID TKT/${current_date}-USE ORIG AUTH ${authorization.upper()}
    ...   ELSE    Verify Specific Remark Is Not Written In The PNR    RMX REISS VOID TKT
    Verify Cancelled And Voided PNR IS Queued Correctly

Verify Cancelled And Voided PNR IS Queued Correctly
    Switch To Command Page
    Enter Cryptic Command    RTQ
    Run Keyword And Continue On Failure    Element Should Contain    ${text_area_command}    YTOWL2106${SPACE}${SPACE}${SPACE}${SPACE}060${SPACE}${SPACE}${SPACE}${SPACE}001
    
Verify Cancellation For Voided Non BSP Ticket Remarks Are Written In The PNR
    Finish PNR    queueing=yes
    Assign Current Date
    Verify Specific Remark Is Written In The PNR    RMX ${current_date}/${c_name}
    ${reverse_value}    Set Variable If    "${reverse_item}" == "Reverse All Items"     REVERSE MATRIX ALL ITEMS
    ...    "${reverse_item}" == "Reverse Fee only"    FEE ONLY
    ...    "${reverse_item}" == "Reverse Document"    DOCUMENT ONLY
    Verify Specific Remark Is Written In The PNR    RMX ATTN NONBSP - ${reverse_value}
    Verify Specific Remark Is Written In The PNR    RMX ${other_details_1}
    Verify Specific Remark Is Written In The PNR    RMX ${other_details_2}
    Verify Cancelled And Voided PNR IS Queued Correctly
    
Verify Agent Is Not Able To Cancel Segments WIth Unvoided Ticket
    Navigate To Page Cancel Segments
    Cancel All Segments
    Select From List By Value    ${list_followUp}    Void BSP
    Wait Until Element Is Visible    ${input_cFirstInitial}     10
    Enter Value    ${input_cFirstInitial}    C
    Enter Value    ${input_cLastName}    Amadeus
    Click Element     ${checkbox_ticketVoidList}
    Select From List By Value     ${list_reuseCC}    no 
    Select From List By Label    ${list_vRsnOption}    Agency
    Run Keyword And Continue On Failure    Element Should Contain    ${text_voidWarningMessage}    Please void selected ticket(s) in graphical first
    Finish PNR
    Assign Current Date
    Verify Specific Remark Is Not Written In The PNR    RMX 
     