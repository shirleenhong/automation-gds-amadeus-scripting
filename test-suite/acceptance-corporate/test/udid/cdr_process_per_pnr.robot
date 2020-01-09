*** Settings ***
Force Tags        corp
Library           String
Resource          ../../pages/base.robot
Test Setup       Login To Amadeus Sell Connect Acceptance
Test Teardown    Close All Browsers   

*** Variables ***
${test_file_name}    cdr_per_pnr
${list_bookLessThan14Days}    //select[@name='bookLessThan14Days']
${list_reasonBookedLessThan14Days}    //select[@name='reasonBookedLessThan14Days']
${input_noHotelCodes}    //input[@name='noHotelCodes']
${input_whyNotOnline}    //input[@name='whyNotOnline']
${list_guestType}    //select[@name='guestType']
${list_reasonNotBook14Days}    //select[@name='reasonNotBook14Days']
${list_notBooked14dayAdvance}    //select[@name='notBooked14dayAdvance']
${list_notBooked14dayInAdvance}    //select[@name='bookedLess14Days']
${input_approverName}    //input[@name='approverName']
${list_outOfPolicy}    //select[@name='outOfPolicy']
${list_notBooked14Days}     //select[@name='notBooked14Days']
${input_businessClassApprover}    //input[@name='businessClassApprover']
${list_offlineReasonCode}    //select[@name='offlineReasonCode']
${list_noHotelBooked}    //select[@name='noHotelBooked']
${list_airCanadaPassTracker}    //select[@name='airCanadaPassTracker']
${input_uniqueTravelerId}    //input[@name='uniqueTravelerId']
${list_notBooked7Days}     //select[@name='notBooked7Days']
${list_whyHotelNotBooked}    //select[@name='whyHotelNotBooked']
${input_guestSponsorName}    //input[@name='guestSponsorName']
${list_approverName}    //select[@name='approverName']
${list_bookAdvanceReason}    //select[@name='bookAdvanceReason']
${input_noHotel}    //input[@name='noHotelBookedReason']
${list_reasonAirBooked14Days}    //select[@name='reasonAirBooked14Days']
${list_hotelNotBooked}    //select[@name='hotelNotBooked']
${list_reasonNotOnline}    //select[@name='reasonNotOnline']
${input_travelerType}    //input[@name='travellerType']
${list_noHotel}    //select[@name='noHotelBookedReason']
${input_btaApproval}    //input[@name='btaApproval']
${input_lowestGdsFare}    //input[@name='lowestGdsFare']
${list_passTracker}    //select[@name='passTracker']
${list_bookingAdvance}    //select[@name='bookAdvance']
${input_approverInfo}    //input[@name='approverInfo']
${list_advanceBooking}    css=#advanceBooking
${list_booking_within_14d}    css=#bookReason

*** Test Cases ***
Verify UDID Remarks Are Added For Client Alstom
    [Tags]    us15251
    Create PNR With Active Air Segments For Alstom
    Select Reason Why Not Booked Online: TOOL DOWN
    Verify Remarks Are Added Correctly In The PNR
    
Verify UDID Remarks Are Added For Client American Tire Distributers
    [Tags]    us15251
    Create PNR With Active Air Segments Less Than 14 Days For American Tire Distributers
    Select Reason For Booking Within 14 Days: CLIENT FACING MEETING
    Verify Remarks Are Added Correctly In The PNR
    
Verify UDID Remarks Are Not Added For Client American Tire Distributer When U50 Is VIP
    [Tags]    us15251
    Create PNR With Active Air Segments For American Tire Distributers, U50 Is VIP
    Complete The PNR In Full Wrap
    Verify Remarks Are Not Found In The PNR

Verify UDID Remarks Are Added For Client Bacardi
    [Tags]    us15251
    Create PNR With Active Air Segments For Bacardi With Air Segment
    Fill Up UDID Fields For Client Bacardi
    Verify Remarks Are Added Correctly In The PNR
    
Verify UDID Remarks Are Not Added For Client Bacardi When Segments Are Car & Hotel Only
    [Tags]    us15251
    Create PNR For Bacardi With Car & Hotel Only
    Complete The PNR In Full Wrap
    Verify Remarks Are Not Found In The PNR
    
Verify UDID Remarks Are Added For Client Bimbo With CFA F3O
    [Tags]    us15251
    Create PNR With Active Air Segments For Bimbo With CFA F3O
    Select Advance Booking Value: EO - Employee oversight
    Verify Remarks Are Added Correctly In The PNR
    
Verify UDID Remarks Are Added For Client Bimbo With CFA F1Y
    [Tags]    us15251
    Create PNR With Active Air Segments For Bimbo With CFA F1Y
    Select Advance Booking Value: CT - Conference/Training
    Verify Remarks Are Added Correctly In The PNR
    
Verify UDID Remarks Are Added For Client BWX Technologies When Flight Is International
    [Tags]    us15251
    Create PNR With Active Air Segments For BWX Technologies, International Flight
    Enter Approver Name For International Travel: VelasquezC
    Verify Remarks Are Added Correctly In The PNR
    
Verify UDID Tab Is Not Displayed For CLient BWX Technologies When Flight Is Domestic
    [Tags]    us15251
    Create PNR With Active Air Segments For BWX Technologies, Domestic Flight
    Complete The PNR In Full Wrap
    Verify Remarks Are Not Found In The PNR
    
Verify UDID Tab Is Not Displayed For Client BWX Technologies When PNR Is Hotel & Car Only
    [Tags]    us15251
    Create PNR For BWX Technologies, Car & Hotel Only
    Complete The PNR In Full Wrap
    Verify Remarks Are Not Found In The PNR
    
Verify UDID Remarks Are Added For Client Campbell Soup With Hotel Segment
    [Tags]    us15251
    Create PNR With Active Air Segments For Campbell Soup, With Hotel Segment
    Select No Hotel Booked Value: HO - BOOKED BY LOCAL OFFICE
    Verify Remarks Are Added Correctly In The PNR
    
Verify UDID Remarks Are Not Written For Client Campbell Without Hotel Segment
    [Tags]    us15251
    Create PNR With Active Air Segments For Campbell Soup, Without Hotel Segment
    Complete The PNR In Full Wrap
    Verify Remarks Are Not Found In The PNR

Verify UDID Remarks Are Added For Client Coca Cola
    [Tags]    us15251
    Create PNR With Active Air Segments For Coca Cola
    Select Reason No Hotel Booked: Staying with Family or Friends
    Verify Remarks Are Added Correctly In The PNR

Verify UDID Remarks Are Added For Client Dana
    [Tags]    us15251
    Create PNR With Active Air Segments For Client Dana
    Fill Up UDID Fields For Dana
    Verify Remarks Are Added Correctly In The PNR
    
Verify UDID Fields Are Not Written For Client Dana When U50 Is Not Guest
    [Tags]    us15251
    Create PNR With Active Air Segments For Client Dana With U50 VIP
    Complete The PNR In Full Wrap
    Verify Remarks Are Not Found In The PNR
    
Verify UDID Remarks Are Added For Equifax
    [Tags]    us15251
    Create PNR With Active Air Segments Less Than 14 Days For Equifax
    Select Advance Booking Reason: P14 - Purchased with a 14+ advance
    Verify Remarks Are Added Correctly In The PNR

Verify UDID Remarks Are Added For Client Fujitsu
    [Tags]    us15251
    Create PNR With Active Air Segments For Fujitsu
    Select Reason No Hotel Booked: Hotel Sold Out
    Verify Remarks Are Added Correctly In The PNR
    
Verify UDID Remarks Are Added For Gemalto
    [Tags]    us15251
    Create PNR With Active Air Segments For Gemalto
    Input Value In Approver Info: Chuck Velasquez
    Verify Remarks Are Added Correctly In The PNR
    
Verify UDID Remarks Are Not Added For Client Fujitsu When Hotel Segment Is Present
    [Tags]    us15251
    Create PNR With Active Air Segments For Fujitsu With Hotel Segment
    Complete The PNR In Full Wrap
    Verify Remarks Are Not Found In The PNR
    
Verify UDID Remarks Are Added For Hasbro When There Are Air Segments
    [Tags]    us15251
    Create PNR With Active Air Segments For Hasbro
    Select Advance Booking Reason: EMPLOYEE OVERSIGHT
    Verify Remarks Are Added Correctly In The PNR
    
Verify UDID Remarks Are Not Written For Hasbro When PNR is Car & Hotel Only
    [Tags]    us15251
    Create PNR For Hasbro, Hotel And Car Only Segment
    Complete The PNR In Full Wrap
    Verify Remarks Are Not Found In The PNR

Verify UDID Remarks Are Added For Client Invenergy
    [Tags]    us15251
    Create PNR With Active Air Segments For Invenergy
    Fill Up Udid Fields For Client Invenergy
    Verify Remarks Are Added Correctly In The PNR

Verify UDID Remarks Are Added For Client Johns Manville
    [Tags]    us15251
    Create PNR With Active Air Segments For Johns Manville
    Select Reason Not Booked 14 Days Advance: Senior Leadership Request
    Verify Remarks Are Added Correctly In The PNR
    
Verify UDID Remarks Are Added For Ontario Teachers
    [Tags]    us15251
    Create PNR With Active Air Segments For Ontario Teachers
    Fill Up UDID Fields With Default Values For Ontario Teachers
    Verify Remarks Are Added Correctly In The PNR
    
Verify UDID Remarks Are Added For Client New Avon
    [Tags]    us15251
    Create PNR With Active Air Segments For New Avon
    Select Booked Less Than 14 Days Advance Value: EMERGENCY
    Verify Remarks Are Added Correctly In The PNR
    
Verify UDID Remarks Are Added For Client Nexans
    [Tags]    us15251
    Create PNR With Active Air Segments For Nexans
    Fill Up UDID Fields For Client Nexans
    Verify Remarks Are Added Correctly In The PNR

Verify UDID Remarks Are Added For Client Nikon Optical
    [Tags]    us15251
    Create PNR With Active Air Segments For Nikon Optical
    Select Reason Not Booked 14 Days In Advance: Interview/Applicant
    Verify Remarks Are Added Correctly In The PNR

Verify UDID Remarks Are Added For Client Nvent
    [Tags]    us15251
    Create PNR With Active Air Segments For Nvent
    Enter Business Class Approver Name: Chuck Velasquez
    Verify Remarks Are Added Correctly In The PNR
    
Verify UDID Remarks Are Added For Client Philip Morris International
    [Tags]    us15251
    Create PNR With Active Air Segments For Philip Morris International
    Fill Up Udid Fields For Client Philip Morris International
    Verify Remarks Are Added Correctly In The PNR

Verify UDID Remarks Are Added For Client PostMedia
    [Tags]    us15251
    Create PNR With Active Air Segments For PostMedia
    Fill Up Udid Fields For Client PostMedia
    Verify Remarks Are Added Correctly In The PNR
    
Verify UDID Remarks Are Not Added For Client PostMedia When Airline Code Is Not AC
    [Tags]    us15251
    Create PNR With Active Air Segments For PostMedia, Non-AC
    Complete The PNR In Full Wrap
    Verify Remarks Are Not Found In The PNR
    
Verify UDID Remarks Are Added For Ribbon Communications When No Hotel Is Booked
    [Tags]    us15251
    Create PNR With Active Air Segments For Ribbon Communications, No Hotel Booked
    Fill Up UDID Fields For Ribbon Communications
    Verify Remarks Are Added Correctly In The PNR
    
Verify UDID Remarks Are Not Added For Ribbon Communications When Hotel Is Booked
    [Tags]    us15251
    Create PNR With Active Air Segments For Ribbon Communications, Hotel Booked
    Complete The PNR In Full Wrap
    Verify Remarks Are Not Found In The PNR

Verify UDID Remarks Are Added For Client Rodan & Fields
    [Tags]    us15251
    Create PNR With Active Air Segments For Rodan & Fields
    Select Book Less Than 14 Days Value: Medical/Health/Physical
    Verify Remarks Are Added Correctly In The PNR
    
Verify UDID Remarks Are Added For Client Sunovion
    [Tags]    us15251
    Create PNR With Active Air Segments For Sunovion
    Fill Up UDID Fields For Client Sunovion
    Verify Remarks Are Added Correctly In The PNR
    
Verify UDID Remarks Are Added For Client Toys R Us
    [Tags]    us15251
    Create PNR With Active Air Segments For Toys R Us
    Select Guest Type: TRU-US
    Verify Remarks Are Added Correctly In The PNR

Verify UDID Remarks Are Added For Client Viavi
    [Tags]    us15251
    Create PNR With Active Air Segments For Viavi Solutions
    Select Reason For Not Booking 14 Days In Advance: UV-URGENT VENDOR VISIT
    Verify Remarks Are Added Correctly In The PNR
    
Verify UDID Remarks Are Added For Wolverine
    [Tags]    us15251
    Create PNR With Active Air Segments For Wolverine
    Enter No Hotel Booked Value: Booked by a meeting site
    Verify Remarks Are Added Correctly In The PNR
    
Verify UDID Remarks Are Added For Client Woodbridge When Booking Is Less Than 21 Days
    [Tags]    us15251
    Create PNR With Active Air Segments Less Than 21 Days For Woodbridge
    Select Value For Why Not Booked 21 Days In Advance: Forgot failed to pre-plan and book trip
    Verify Remarks Are Added Correctly In The PNR
    
Verify UDID Remarks Are Not Added For Client Woodbridge When Booking Is More Than 21 Days
    [Tags]    us15251
    Create PNR With Active Air Segments For Woodbridge
    Complete The PNR In Full Wrap
    Verify Remarks Are Not Found In The PNR
    
Verify UDID Remarks Are Not Added For Client Woodbridge When U50 Is VIP
    [Tags]    us15251
    Create PNR With Active Air Segments Less Than 21 Days For Woodbridge With U50 VIP
    Complete The PNR In Full Wrap
    Verify Remarks Are Not Found In The PNR
    
Verify UDID Remarks Are Not Added For Client Woodbridge When Booking Is Car & Hotel Only
    [Tags]    us15251
    Create PNR For Woodbridge, Car & Hotel Only
    Complete The PNR In Full Wrap
    Verify Remarks Are Not Found In The PNR

*** Keywords ***
Select Reason Not Booked 14 Days Advance: ${reason}
    Navigate To Page UDID
    Select From List By Label    ${list_notBooked14dayAdvance}    ${reason}
    Take Screenshot

Select Reason For Not Booking 14 Days In Advance: ${reason} 
    Navigate To Page UDID
    Select From List By Label    ${list_reasonNotBook14Days}    ${reason}
    Take Screenshot

Select Guest Type: ${guest_type}
    Navigate To Page UDID
    Select From List By Label    ${list_guestType}    ${guest_type}
    Take Screenshot

Select Book Less Than 14 Days Value: ${value}
    Navigate To Page UDID
    Select From List By Label    ${list_bookLessThan14Days}    ${value}
    Take Screenshot 
    
Fill Up UDID Fields For Client Sunovion
    Navigate To Page UDID
    Select From List By Label    ${list_reasonBookedLessThan14Days}    Need to travel occurred less then 14 days prior
    Enter Value    ${input_noHotelCodes}    XX
    Enter Value    ${input_whyNotOnline}    AA
    Take Screenshot
    
Select Booked Less Than 14 Days Advance Value: ${reason}
    Navigate To Page UDID
    Select From List By Label    ${list_notBooked14dayInAdvance}    ${reason}
    Take Screenshot 
    
Fill Up UDID Fields For Client Nexans
    Navigate To Page UDID
    Enter Value    ${input_approverName}    Chuck Velasquez
    Select From List By Label    ${list_outOfPolicy}    Urgent internal Nexans
    Take Screenshot
    
Select Reason Not Booked 14 Days In Advance: ${reason}
    Navigate To Page UDID
    Select From List By Label    ${list_notBooked14Days}    ${reason}
    Take Screenshot
    
Enter Business Class Approver Name: ${approver_name}
    Navigate To Page UDID
    Enter Value    ${input_businessClassApprover}    ${approver_name}
    Take Screenshot
    
Fill Up Udid Fields For Client Philip Morris International
    Navigate To Page UDID
    Select From List By Label    ${list_offlineReasonCode}     Family travel (spouse, kids) paid by PMI
    Select From List By Label    ${list_noHotelBooked}    HOTEL BOOKED BY CONFERENCE ORGANIZER
    Take Screenshot
    
Fill Up Udid Fields For Client PostMedia
    Navigate To Page UDID
    Select From List By Label    ${list_airCanadaPassTracker}    Approval received from Judy Simpson
    Enter Value     ${input_uniqueTravelerId}    U013KXV
    Take Screenshot
    
Fill Up Udid Fields For Client Invenergy
    Navigate To Page UDID
    Select From List By Label    ${list_notBooked7Days}    Had to Wait for Dates to be Confirmed
    Select From List By Label    ${list_whyHotelNotBooked}    Reside in City or One Way
    Take Screenshot
    
Select Reason No Hotel Booked: ${reason}
    Navigate To Page UDID
    Select From List By Label     ${list_noHotelBooked}    ${reason}
    Take Screenshot
    
Fill Up UDID Fields For Dana
    Navigate To Page UDID
    Enter Value    ${input_guestSponsorName}    Shirleen Hong
    Select From List By Label    ${list_approverName}    DWAYNE MATTHEWS
    Take Screenshot
    
Select Value For Why Not Booked 21 Days In Advance: ${value}
    Navigate To Page UDID
    Select From List By Label    ${list_bookAdvanceReason}    ${value}
    Take Screenshot
    
Enter No Hotel Booked Value: ${value}
    Navigate To Page UDID
    Enter Value    ${input_noHotel}    ${value}
    Take Screenshot
    
Fill Up UDID Fields For Client Bacardi
    Navigate To Page UDID
    Select From List By Label    ${list_reasonAirBooked14Days}    Site Visit
    Select From List By Label    ${list_hotelNotBooked}    Hotel was booked
    Take Screenshot
    
Select Reason Why Not Booked Online: ${reason}
    Navigate To Page UDID
    Select From List By Label    ${list_reasonNotOnline}    ${reason}
    Take Screenshot
    
Fill Up UDID Fields For Ribbon Communications
    Navigate To Page UDID
    Select From List By Label    ${list_noHotel}    TB - Hotel to be advised
    Enter Value    ${input_travelerType}    Chuck Velasquez
    Take Screenshot
    
Fill Up UDID Fields With Default Values For Ontario Teachers
    Navigate To Page UDID
    Enter Value    ${input_btaApproval}    A0123
    Enter Value    ${input_lowestGdsFare}    100.00
    Select From List By Label    ${list_passTracker}    PASS PURCHASE PNR - Approval received from Judy Simpson
    Take Screenshot    

Select Advance Booking Reason: ${reason}
    Navigate To Page UDID
    Select From List By Label    ${list_bookingAdvance}     ${reason}
    Take Screenshot
    
Input Value In Approver Info: ${name}
    Navigate To Page UDID
    Enter Value    ${input_approverInfo}    ${name}
    Take Screenshot
    
Select No Hotel Booked Value: ${value} 
    Navigate To Page UDID
    Select From List By Label    ${list_noHotel}    ${value}
    Take Screenshot
    
Enter Approver Name For International Travel: ${name} 
    Navigate To Page UDID
    Enter Value    ${input_approverName}    ${name}
    Take Screenshot
    
Select Advance Booking Value: ${value}
    Navigate To Page UDID
    Select From List By Label    ${list_advanceBooking}    ${value}
    Take Screenshot
    
Select Reason For Booking Within 14 Days: ${reason}
    Navigate To Page UDID
    Select From List By Label    ${list_booking_within_14d}    ${reason}
    Take Screenshot
    