*** Settings ***
Library           String
Library           SeleniumLibrary
Library           Collections
Library           Screenshot
Library           pyautogui
Resource          base.robot
Resource          payment.robot
Resource          ../../resources/common/api-utilities.txt

*** Variables ***
${input_baseAmount_refund}    css=#baseAmountRefund
${input_gst_refund}    css=#gstRefund
${input_hst_refund}    css=#hstRefund
${input_qst_refund}    css=#qstRefund
${input_othTax_refund}    css=#otherTaxRefund
${input_commission_refund}    css=#commisionRefund
${input_oid_origtkt}    css=#oidOrigTicketIssue
${input_cancell_all}    css=#cancelAll
${div_segments_array}    //div[@formarrayname='segments']
${input_segment_checkbox}    //input[@type='checkbox']
${input_note1}    css=#additionalNotes1
${input_note2}    css=#additionalNotes2


*** Keywords ***  
Add Ticketing Amount Details With Fee
    [Arguments]    ${base_amt}=${EMPTY}    ${gst_tax}=${EMPTY}    ${hst_tax}=${EMPTY}    ${qst_tax}=${EMPTY}    ${comm_amt}=${EMPTY}    ${oth_tax}=${EMPTY}
    Enter Value    ${input_baseamount}    ${base_amt}
    Enter Value    ${input_gsttax}    ${gst_tax}
    Enter Value    ${input_hsttax}    ${hst_tax}
    Enter Value    ${input_qsttax}    ${qst_tax}
    Enter Value    ${input_othtax}    ${oth_tax}
    Enter Value    ${input_commission}    ${comm_amt}
    
Add Ticketing Amount Details With Refund
    [Arguments]    ${base_amt}=${EMPTY}    ${gst_tax}=${EMPTY}    ${hst_tax}=${EMPTY}    ${qst_tax}=${EMPTY}    ${oth_tax}=${EMPTY}    ${tkt_number}=${EMPTY}
    Enter Value    ${input_baseAmount_refund}    ${base_amt}
    Enter Value    ${input_gst_refund}    ${gst_tax}
    Enter Value    ${input_hst_refund}    ${hst_tax}
    Enter Value    ${input_qst_refund}    ${qst_tax}
    Enter Value    ${input_othTax_refund}    ${oth_tax}
    Enter Value    ${input_tktnumber}    ${tkt_number}
    
Cancel Existing Airline ${acounting_type} Pass And Select ${type_of_fare} And Add Fee For Single Segment
    Set Test Variable    ${acounting_type}    
    Set Test Variable    ${type_of_fare}
    Select From List By Label    ${list_accounting_type}    ${acounting_type}
    Enter Value    ${input_supplier_confirmationNo}    879111
    Add Ticketing Amount Details With Fee    25.01    18.20    6.00    2.21    2.00    1.00
    Add Ticketing Amount Details With Refund      890.00    101.00    71.00    10.12    2.50
    Enter Value    ${input_departurecity}    YVR        
    Select From List By Label    ${list_purchasetype}     COMMUTER-U.S COMMUTER
    Select From List By Label    ${list_faretype}       ${type_of_fare}
    Verify Supplier Code Default Value Is Correct For Air Canada Individual Pass Purchase
    Enter Value    ${input_commission_refund}    20.00
    Enter Value    ${input_oid_origtkt}    YTOWL220N
    Enter Value    ${input_note1}    Cancel AC With Refund And Fee
    Click Save Button
    Finish PNR
    Take Screenshot
    
Verify Itinerary Remarks For ${airline_code} Cancellation Fee Of ${fee_amount} And Base Amount Of ${base_amount_refund}
    Set Test Variable    ${airline_code}  
    Set Test Variable    ${fee_amount}
    Set Test Variable    ${base_amount_refund}
    Verify Specific Remark Is Written In The PNR    RIR THE PRICE FOR THIS ITINERARY IS ${base_amount_refund} INCLUDING TAXES    
    Verify Specific Remark Is Written In The PNR    RIR ${airline_code} PASS PNR CANCELLED PER PASSENGER REQUEST    
    Verify Specific Remark Is Written In The PNR    RIR CANCELLATION FEE OF CAD${fee_amount} PLUS TAX HAS BEEN CHARGED TO    
    Verify Specific Remark Is Written In The PNR    RIR THE TRAVELLERS CREDIT CARD.
    
Verify Cancellation Ticketing Remarks For ${airline_code} And Segment ${segment_no} Are Written In The PNR
    Verify Specific Remark Is Written In The PNR    RMT/TKT1-VEN/TK-${tkt_number}/VN-${actual_supplier_code}/S${segment_no}
    Verify Specific Remark Is Written In The PNR    RMT/TKT1-BA-${base_amt}/TX1-${gst_tax}XG/TX2-${hst_tax}RC/TX3-${qst_tax}XQ/TX4-${oth_tax}XT/COMM-${comm_amt}/S${segment_no}
    
    
    
    
    
    
