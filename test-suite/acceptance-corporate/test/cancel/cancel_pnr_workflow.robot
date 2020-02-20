*** Settings ***
Force Tags        corp
Resource          ../../pages/base.robot
Test Setup       Login To Amadeus Sell Connect Acceptance
Test Teardown    Close All Browsers

*** Variables ***
${test_file_name}    cancel_pnr_workflow

*** Test Cases ***
Verify That PNR Will Be Cancelled When There Are No Segments And Is Not Booked Via Concur
    [TAGS]    us10041
    Create PNR With Active Air Segments For Cancellation, No Segments
    Complete The PNR With Default Values
    Cancel Segment 2 Using Cryptic Command
    Fill Up Cancel Segment With Default Values
    Verify Expected Cancellation Remarks Are Written
    
Verify That PNR Will Be Cancelled When There Are No Segments And Is Booked Via Concur
    [TAGS]    us10041
    Create PNR With Active Air Segments For Cancellation, No Segments, Booked Via Concur
    Complete The PNR With Default Values
    Cancel Segment 2 Using Cryptic Command                                                                                                                                                        
    Verify Cancel Segment Fields Are Defaulted For PNRs Booked Via Concur
    Verify Expected Cancellation Remarks Are Written

Verify That FullCxl Will Be Written When All Segments Are Cancelled
    [TAGS]    us10041
    Create PNR With Active Air Segments For Cancellation, Mix Segments
    Complete The PNR With Default Values
    Cancel All Segments
    Verify Expected Cancellation Remarks Are Written
    
Verify That FullCxl Will Not Be Written When Only Selected Segments Are Cancelled
    [TAGS]    us10041
    Create PNR With Active Air Segments For Cancellation, Multiple Air Segments
    Complete The PNR With Default Values
    Cancel Segments 2,3 Via UI
    Verify Expected Cancellation Remarks Are Written
    
Verify That PNRs With Passive UA Segments Are Cancelled When Reason Is Voluntary Cancel
    [TAGS]    us10041
    Create PNR With Passive Air Segments For Cancellation, UA Air Segments
    Complete The PNR With Default Values
    Cancel UA Segment With Reason Voluntary Cancel
    Verify Expected Cancellation Remarks Are Written
    
Verify That PNRs With Passive UA Segments Are Cancelled When Reason Is UA Flight Not Ticketed
    [TAGS]    us10041
    Create PNR With Passive Air Segments For Cancellation, UA Air Segments
    Complete The PNR With Default Values
    Cancel UA Segment With Reason UA Flight Not Ticketed Yet
    Verify Expected Cancellation Remarks Are Written
    
Verify That PNRs With Active UA Segments Are Cancelled When Reason Is 24 Hours Refund
    [TAGS]    us10041
    Create PNR With Active Air Segments For Cancellation, UA Air Segments, 24 Hours Refund
    Complete The PNR With Default Values
    Cancel UA Segment With Reason 24 Hours Refund
    Verify Expected Cancellation Remarks Are Written
    
Verify That PNRs With Active UA Segments Are Cancelled When Reason Is Non Refundable Ticket Cancelled Due To IROP
    [TAGS]    us10041
    Create PNR With Active Air Segments For Cancellation, UA Air Segments, Non Refundable Ticket Cancelled Due To IROP
    Complete The PNR With Default Values
    Cancel UA Segment With Reason Non Refundable Ticket Cancelled Due To IROP
    Verify Expected Cancellation Remarks Are Written
    
Verify That PNRs With Active UA Segments Are Cancelled When Reason Is Non Refundable Ticket Cancelled Due To Schedule Change
    [TAGS]    us10041
    Create PNR With Passive Air Segments For Cancellation, UA Air Segments, Non Refundable Ticket Cancelled Due To Schedule Change
    Complete The PNR With Default Values
    Cancel UA Segment With Reason Non Refundable Ticket Cancelled Due To Schedule Change
    Verify Expected Cancellation Remarks Are Written
    
Verify That PNRs With Passive AC Segments Are Cancelled When Reason Is Name Correction NCC With OAL
    [TAGS]    us10041
    Create PNR With Passive Air Segments For Cancellation, AC Air Segments, Name Correction NCC With OAL
    Complete The PNR With Default Values
    Cancel AC Segment With Reason Name Correction NCC With OAL
    Verify Expected Cancellation Remarks Are Written

Verify That PNRs With Passive AC Segments Are Cancelled When Reason Is Name Correction NCC Legal Name with OAL
    [TAGS]    us10041
    Create PNR With Passive Air Segments For Cancellation, AC Air Segments, Name Correction NCC Legal Name with OAL
    Complete The PNR With Default Values
    Cancel AC Segment With Reason Name Correction NCC Legal Name with OAL
    Verify Expected Cancellation Remarks Are Written
    
Verify That PNRs With Passive AC Segments Are Cancelled When Reason Is Duplicate Tickets
    [TAGS]    us10041
    Create PNR With Passive Air Segments For Cancellation, AC Air Segments, Duplicate Tickets
    Complete The PNR With Default Values
    Cancel AC Segment With Reason Duplicate Tickets
    Verify Expected Cancellation Remarks Are Written
    
Verify That PNRs With Passive AC Segments Are Cancelled When Reason Is Voluntary Cancel
    [TAGS]    us10041
    Create PNR With Passive Air Segments For Cancellation, AC Air Segments, Voluntary / Not Ticketed
    Complete The PNR With Default Values
    Cancel AC Segment With Reason Voluntary Cancel
    Verify Expected Cancellation Remarks Are Written
    
Verify That PNRs With Passive AC Segments Are Cancelled When Reason Is AC Flight Not Ticketed Yet
    [TAGS]    us10041
    Create PNR With Passive Air Segments For Cancellation, AC Air Segments, Voluntary / Not Ticketed
    Complete The PNR With Default Values
    Cancel AC Segment With Reason AC Flight Not Ticketed Yet
    Verify Expected Cancellation Remarks Are Written

Verify That PNRs With Passive AC Segments Are Cancelled When Reason Is 24 Hours Refund
    [TAGS]    us10041
    Create PNR With Passive Air Segments For Cancellation, AC Air Segments, 24 Hour Refund
    Complete The PNR With Default Values
    Cancel AC Segment With Reason 24 Hours Refund
    Verify Expected Cancellation Remarks Are Written
    
Verify That PNRs With Active AC Segments Are Cancelled When Reason Is Death of Pax or Travelling Companion
    [TAGS]    us10041
    Create PNR With Active Air Segments For Cancellation, AC Air Segments, Death of Pax or Travelling Companion
    Complete The PNR With Default Values
    Cancel AC Segment With Reason Death of Pax or Travelling Companion
    Verify Expected Cancellation Remarks Are Written
    
Verify That PNRs With Active AC Segments Are Cancelled When Reason Is IRROP: Will Refund Process due IRROP
    [TAGS]    us10041
    Create PNR With Active Air Segments For Cancellation, AC Air Segments, IRROP: Will Refund Process due IRROP
    Complete The PNR With Default Values
    Cancel AC Segment With Reason IRROP: Will Refund Process due IRROP
    Verify Expected Cancellation Remarks Are Written
    
Verify That PNRs With Active AC Segments Are Cancelled When Reason Is Unacceptable Schedule Change
    [TAGS]    us10041
    Create PNR With Active Air Segments For Cancellation, AC Air Segments, Unacceptable Schedule Change
    Complete The PNR With Default Values
    Cancel AC Segment With Reason Unacceptable Schedule Change
    Verify Expected Cancellation Remarks Are Written
    
Verify That PNRs With Active AC Segments Are Cancelled When Reason Is Unacceptable Delay Greater than 2 Hrs
    [TAGS]    us10041
    Create PNR With Active Air Segments For Cancellation, AC Air Segments, Unacceptable Delay Greater than 2Hrs
    Complete The PNR With Default Values
    Cancel AC Segment With Reason Unacceptable Delay Greater than 2 Hrs
    Verify Expected Cancellation Remarks Are Written
    
Verify That PNRs With Active AC Segments Are Cancelled When Reason Is Jury/Military Duty
    [TAGS]    us10041
    Create PNR With Active Air Segments For Cancellation, AC Air Segments, Jury/Military Duty
    Complete The PNR With Default Values
    Cancel AC Segment With Reason Jury/Military Duty
    Verify Expected Cancellation Remarks Are Written

Verify That PNRs With Power Hotel Segments Are Not Cancelled When These Segments Have Not Been Cancelled In Power Hotel
    [TAGS]    us10041    expect_to_fail
    Create PNR For Cancellation, Power Hotel Segment
    Complete The PNR With Default Values
    Verify Agent Is Unable To Cancel Segments Due To Existing Power Hotel Segment 
    
Verify That PNRs With Power Hotel Segments Are Cancelled When These Segments Have Been Cancelled In Power Hotel
    [TAGS]    us10041
    Create PNR For Cancellation, Hotel Segment
    Complete The PNR With Default Values
    Cancel All Segments   
    Verify Expected Cancellation Remarks Are Written

Verify That PNR With Voided Ticket And Is Booked Via Concur Will Be Cancelled    
    [TAGS]    us10041
    Create PNR With Passive Air Segments For Cancellation, Booked Via Concur With Void REMARK
    Complete The PNR With Default Values
    Cancel Segment 2 Using Cryptic Command
    Verify Cancel Segment Fields Are Defaulted For PNRs Voided And Booked Via Concur
    Verify Expected Cancellation Remarks Are Written
    
Verify That PNRs With Active Hotel Segments Are Cancelled When Reason Is Car/Hotel/Limo
    [tags]    us11192
    Create PNR For Cancellation, Active Hotel Segment
    Complete The PNR With Default Values
    Cancel Hotel, Car Or Limo Segments
    Verify Expected Cancellation Remarks Are Written
    Verify PNR Is Queued Correctly At The End Of PNR
    
Verify That PNRs With Passive Car Segments Are Cancelled When Reason Is Car/Hotel/Limo
    [tags]    us11192
    Create PNR For Cancellation, Car Segment
    Complete The PNR With Default Values
    Cancel Hotel, Car Or Limo Segments
    Verify Expected Cancellation Remarks Are Written
    Verify PNR Is Queued Correctly At The End Of PNR
    
Verify That PNRs With Passive Limo Segments Are Cancelled When Reason Is Car/Hotel/Limo
    [tags]    us11192
    Create PNR For Cancellation, Limo Segment
    Complete The PNR With Default Values
    Cancel Hotel, Car Or Limo Segments
    Verify Expected Cancellation Remarks Are Written
    Verify PNR Is Queued Correctly At The End Of PNR
    