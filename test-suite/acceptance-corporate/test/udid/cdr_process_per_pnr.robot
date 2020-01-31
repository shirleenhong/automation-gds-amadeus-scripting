*** Settings ***
Force Tags        corp
Resource          ../../pages/base.robot
Test Setup       Login To Amadeus Sell Connect Acceptance
Test Teardown    Close All Browsers   

*** Variables ***
${test_file_name}    cdr_per_pnr

*** Test Cases ***
Verify UDID Remarks Are Added For Client Alstom
    [Tags]    us15250    full_regression
    Create PNR With Active Air Segments For Alstom
    Select Reason Why Not Booked Online: TOOL DOWN
    Verify Remarks Are Added Correctly In The PNR
    
Verify UDID Remarks Are Added For Client American Tire Distributers
    [Tags]    us15250
    Create PNR With Active Air Segments Less Than 14 Days For American Tire Distributers
    Select Reason For Booking Within 14 Days: CLIENT FACING MEETING
    Verify Remarks Are Added Correctly In The PNR
    
Verify UDID Remarks Are Not Added For Client American Tire Distributer When U50 Is VIP
    [Tags]    us15250    full_regression
    Create PNR With Active Air Segments For American Tire Distributers, U50 Is VIP
    Complete The PNR In Full Wrap
    Verify Remarks Are Not Found In The PNR
    
Verify UDID Remarks Are Added For Client Aramark When Reason Is Booked Greater Than 14 Days
    [Tags]    us15250    full_regression
    Create PNR With Active Air Segments For Aramark, Booked Greater Than 14 Days
    Select Reason Why Booked Less Than 14 Days: Booked greater than 14days
    Verify Remarks Are Added Correctly In The PNR
    
Verify UDID Remarks Are Added For Client Arcelormittal
    [Tags]    us15250    full_regression
    Create PNR With Active Air Segments For Arcelormittal
    Fill Up UDID Values For Client Arcelormittal
    Verify Remarks Are Added Correctly In The PNR

Verify UDID Remarks Are Added For Client Bacardi
    [Tags]    us15250    full_regression
    Create PNR With Active Air Segments For Bacardi With Air Segment
    Fill Up UDID Fields For Client Bacardi
    Verify Remarks Are Added Correctly In The PNR
    
Verify UDID Remarks Are Not Added For Client Bacardi When Segments Are Car & Hotel Only
    [Tags]    us15250    full_regression
    Create PNR For Bacardi With Car & Hotel Only
    Complete The PNR In Full Wrap
    Verify Remarks Are Not Found In The PNR
    
Verify UDID Remarks Are Added For Client Bimbo With CFA F3O
    [Tags]    us15250    full_regression
    Create PNR With Active Air Segments For Bimbo With CFA F3O
    Select Advance Booking Value: EO - Employee oversight
    Verify Remarks Are Added Correctly In The PNR
    
Verify UDID Remarks Are Added For Client Bimbo With CFA F1Y
    [Tags]    us15250    sanity_test    full_regression
    Create PNR With Active Air Segments For Bimbo With CFA F1Y
    Select Advance Booking Value: CT - Conference/Training
    Verify Remarks Are Added Correctly In The PNR
    
Verify UDID Remarks Are Added For Client BWX Technologies When Flight Is International
    [Tags]    us15250    full_regression
    Create PNR With Active Air Segments For BWX Technologies, International Flight
    Enter Approver Name For International Travel: VelasquezC
    Verify Remarks Are Added Correctly In The PNR
    
Verify UDID Tab Is Not Displayed For CLient BWX Technologies When Flight Is Domestic
    [Tags]    us15250    full_regression
    Create PNR With Active Air Segments For BWX Technologies, Domestic Flight
    Complete The PNR In Full Wrap
    Verify Remarks Are Not Found In The PNR
    
Verify UDID Tab Is Not Displayed For Client BWX Technologies When PNR Is Hotel & Car Only
    [Tags]    us15250    full_regression
    Create PNR For BWX Technologies, Car & Hotel Only
    Complete The PNR In Full Wrap
    Verify Remarks Are Not Found In The PNR
    
Verify UDID Remarks Are Added For Client Campbell Soup With Hotel Segment
    [Tags]    us15250
    Create PNR With Active Air Segments For Campbell Soup, With Hotel Segment
    Select No Hotel Booked Value: HO - BOOKED BY LOCAL OFFICE
    Verify Remarks Are Added Correctly In The PNR
    
Verify UDID Remarks Are Not Written For Client Campbell Without Hotel Segment
    [Tags]    us15250    full_regression
    Create PNR With Active Air Segments For Campbell Soup, Without Hotel Segment
    Complete The PNR In Full Wrap
    Verify Remarks Are Not Found In The PNR

Verify UDID Remarks Are Added For Client Coca Cola
    [Tags]    us15250    full_regression
    Create PNR With Active Air Segments For Coca Cola
    Select Reason No Hotel Booked: Staying with Family or Friends
    Verify Remarks Are Added Correctly In The PNR

Verify UDID Remarks Are Added For Client Dana
    [Tags]    us15250
    Create PNR With Active Air Segments For Client Dana
    Fill Up UDID Fields For Dana
    Verify Remarks Are Added Correctly In The PNR
    
Verify UDID Fields Are Not Written For Client Dana When U50 Is Not Guest
    [Tags]    us15250    full_regression
    Create PNR With Active Air Segments For Client Dana With U50 VIP
    Complete The PNR In Full Wrap
    Verify Remarks Are Not Found In The PNR
    
Verify UDID Remarks Are Added For Equifax
    [Tags]    us15250    full_regression
    Create PNR With Active Air Segments Less Than 14 Days For Equifax
    Select Advance Booking Reason: P14 - Purchased with a 14+ advance
    Verify Remarks Are Added Correctly In The PNR

Verify UDID Remarks Are Added For Client Fujitsu
    [Tags]    us15250    full_regression
    Create PNR With Active Air Segments For Fujitsu
    Select Reason No Hotel Booked: Hotel Sold Out
    Verify Remarks Are Added Correctly In The PNR
    
Verify UDID Remarks Are Not Added For Client Fujitsu When Hotel Segment Is Present
    [Tags]    us15250    full_regression
    Create PNR With Active Air Segments For Fujitsu With Hotel Segment
    Complete The PNR In Full Wrap
    Verify Remarks Are Not Found In The PNR
    
Verify UDID Remarks Are Added For Gemalto
    [Tags]    us15250    full_regression
    Create PNR With Active Air Segments For Gemalto
    Input Value In Approver Info: Chuck Velasquez
    Verify Remarks Are Added Correctly In The PNR

Verify UDID Remarks Are Added For Client Gilead
    [Tags]    us15250
    Create PNR With Active Air Segments For Gilead
    Fill Up Udid Fielads For Client Gilead
    Verify Remarks Are Added Correctly In The PNR
    
Verify UDID Remarks Are Added For Client Gilead With Hotel Segment
    [Tags]    us15250    full_regression
    Create PNR With Active Air Segments For Gilead With Hotel Segment
    Enter Unique Traveler ID: KWV115
    Verify Remarks Are Added Correctly In The PNR

Verify UDID Remarks Are Added For Hasbro When There Are Air Segments
    [Tags]    us15250
    Create PNR With Active Air Segments For Hasbro
    Select Advance Booking Reason: EMPLOYEE OVERSIGHT
    Verify Remarks Are Added Correctly In The PNR
    
Verify UDID Remarks Are Not Written For Hasbro When PNR is Car & Hotel Only
    [Tags]    us15250    full_regression
    Create PNR For Hasbro, Hotel And Car Only Segment
    Complete The PNR In Full Wrap
    Verify Remarks Are Not Found In The PNR
    
Verify UDID Remarks Are Added For Client Intercontinental Hotel With International Flight
    [Tags]    us15250    
    Create PNR With Active Air Segments For Intercontinental Hotel With International Flight
    Fill Up UDID Values For Client Intercontinental Hotel
    Verify Remarks Are Added Correctly In The PNR
    
Verify UDID Remarks Are Not Added For Client Intercontinental Hotel Without Air Segment
    [Tags]    us15250    full_regression
    Create PNR For Intercontinental Hotel Without Air Segment
    Complete The PNR In Full Wrap
    Verify Remarks Are Not Found In The PNR
    
Verify UDID Remarks Are Not Added For Client Intercontinental Hotel With Domestic Flight
    [Tags]    us15250    full_regression
    Create PNR With Active Air Segments For Intercontinental Hotel With Domestic Flight
    Complete The PNR In Full Wrap
    Verify Remarks Are Not Found In The PNR

Verify UDID Remarks Are Added For Client Invenergy
    [Tags]    us15250    full_regression
    Create PNR With Active Air Segments For Invenergy
    Fill Up Udid Fields For Client Invenergy
    Verify Remarks Are Added Correctly In The PNR

Verify UDID Remarks Are Added For Client Johns Manville
    [Tags]    us15250    full_regression
    Create PNR With Active Air Segments For Johns Manville
    Select Reason Not Booked 14 Days Advance: Senior Leadership Request
    Verify Remarks Are Added Correctly In The PNR
    
Verify UDID Remarks Are Added For Client Juniper
    [Tags]    us15250    full_regression
    Create PNR With Active Air Segments For Juniper
    Fill Up UDID Fields For Client Juniper
    Verify Remarks Are Added Correctly In The PNR
    
Verify UDID Remarks Are Added For Client New Avon
    [Tags]    us15250    full_regression
    Create PNR With Active Air Segments For New Avon
    Select Booked Less Than 14 Days Advance Value: EMERGENCY
    Verify Remarks Are Added Correctly In The PNR
    
Verify UDID Remarks Are Added For Client Nexans
    [Tags]    us15250    full_regression
    Create PNR With Active Air Segments For Nexans
    Fill Up UDID Fields For Client Nexans
    Verify Remarks Are Added Correctly In The PNR

Verify UDID Remarks Are Added For Client Nikon Optical
    [Tags]    us15250
    Create PNR With Active Air Segments For Nikon Optical
    Select Reason Not Booked 14 Days In Advance: Interview/Applicant
    Verify Remarks Are Added Correctly In The PNR
    
Verify UDID Remarks Are Added For Client Northland Power
    [Tags]    us15250    full_regression
    Create PNR With Active Air Segments For Northland Power
    Enter Spend Authorization Number: AAA0123
    Verify Remarks Are Added Correctly In The PNR

Verify UDID Remarks Are Added For Client Nvent
    [Tags]    us15250    full_regression
    Create PNR With Active Air Segments For Nvent
    Enter Business Class Approver Name: Chuck Velasquez
    Verify Remarks Are Added Correctly In The PNR
    
Verify UDID Remarks Are Added For Ontario Teachers
    [Tags]    us15250    full_regression
    Create PNR With Active Air Segments For Ontario Teachers
    Fill Up UDID Fields With Default Values For Ontario Teachers
    Verify Remarks Are Added Correctly In The PNR
    
Verify UDID Remarks Are Added For Client Parsons Corporation
    [Tags]    us15250    full_regression
    Create PNR With Active Air Segments For Parsons Corporation
    Fill Up UDID Values For Client Parsons Corporation
    Verify Remarks Are Added Correctly In The PNR
    
Verify UDID Remarks Are Added For Client PENTAIR
    [Tags]    us15250    full_regression
    Create PNR With Active Air Segments For PENTAIR
    Select Business Class Approver: Pending business class approval e-mail
    Verify Remarks Are Added Correctly In The PNR
    
Verify UDID Remarks Are Added For Client Philip Morris International
    [Tags]    us15250    full_regression
    Create PNR With Active Air Segments For Philip Morris International
    Fill Up Udid Fields For Client Philip Morris International
    Verify Remarks Are Added Correctly In The PNR

Verify UDID Remarks Are Added For Client PostMedia
    [Tags]    us15250    
    Create PNR With Active Air Segments For PostMedia
    Fill Up Udid Fields For Client PostMedia
    Verify Remarks Are Added Correctly In The PNR
    
Verify UDID Remarks Are Not Added For Client PostMedia When Airline Code Is Not AC
    [Tags]    us15250    full_regression
    Create PNR With Active Air Segments For PostMedia, Non-AC
    Complete The PNR In Full Wrap
    Verify Remarks Are Not Found In The PNR
    
Verify UDID Remarks Are Added For Client Purdue Pharma
    [Tags]    us15250    full_regression
    Create PNR With Active Air Segments Less Than 14 Days For Purdue Pharma
    Fill Up UDID Fields For Client Purdue Pharma
    Verify Remarks Are Added Correctly In The PNR
    
Verify UDID Remarks Are Added For Ribbon Communications When No Hotel Is Booked
    [Tags]    us15250    
    Create PNR With Active Air Segments For Ribbon Communications, No Hotel Booked
    Fill Up UDID Fields For Ribbon Communications
    Verify Remarks Are Added Correctly In The PNR
    
Verify UDID Remarks Are Not Added For Ribbon Communications When Hotel Is Booked
    [Tags]    us15250    full_regression
    Create PNR With Active Air Segments For Ribbon Communications, Hotel Booked
    Complete The PNR In Full Wrap
    Verify Remarks Are Not Found In The PNR

Verify UDID Remarks Are Added For Client Rodan & Fields
    [Tags]    us15250    full_regression
    Create PNR With Active Air Segments For Rodan & Fields
    Select Book Less Than 14 Days Value: Medical/Health/Physical
    Verify Remarks Are Added Correctly In The PNR
    
Verify UDID Remarks Are Added For Client Senvion
    [Tags]    us15250    full_regression
    Create PNR With Active Air Segments For Senvion
    Fill Up UDID Fields For Client Senvion
    Verify Remarks Are Added Correctly In The PNR
    
Verify UDID Remarks Are Added For Client Smith & Nephew
    [Tags]    us15250    full_regression
    Create PNR With Active Air Segments For Smith & Nephew
    Fill Up UDID Fields For Client Smith & Nephew
    Verify Remarks Are Added Correctly In The PNR
    
Verify UDID Remarks Are Added For Client Sobeys
    [Tags]    us15250    full_regression
    Create PNR With Active Air Segments For Sobeys
    Fill Up UDID Fields For Client Sobeys
    Verify Remarks Are Added Correctly In The PNR
    
Verify UDID Remarks Are Added For Client Steelcase
    [Tags]    us15250    full_regression
    Create PNR With Active Air Segments For Steelcase
    Fill Up UDID Fields For Client Steelcase
    Verify Remarks Are Added Correctly In The PNR
    
Verify UDID Remarks Are Added For Client Sunovion
    [Tags]    us15250    full_regression
    Create PNR With Active Air Segments For Sunovion
    Fill Up UDID Fields For Client Sunovion
    Verify Remarks Are Added Correctly In The PNR
    
Verify UDID Remarks Are Added For Client Thales Canada With Air Only Segments
    [Tags]    us15250
    Create PNR With Active Air Segments For Thales Canada With Air Only Segments 
    Fill Up UDID Fields For Client Thales Canada
    Verify Remarks Are Added Correctly In The PNR
    
Verify UDID Remarks Are Added For Client Thales Canada With Hotel Segment
    [Tags]    us15250    full_regression
    Create PNR With Active Air Segments For Thales Canada With Hotel Segment
    Fill Up UDID Fields For Client Thales Canada
    Verify Remarks Are Added Correctly In The PNR
    
Verify UDID Remarks Are Added For Client Toys R Us
    [Tags]    us15250    full_regression
    Create PNR With Active Air Segments For Toys R Us
    Select Guest Type: TRU-US
    Verify Remarks Are Added Correctly In The PNR

Verify UDID Remarks Are Added For Client UL
    [Tags]    us15250    full_regression
    Create PNR With Active Air Segments For UL
    Fill Up Udid Fields For Client UL
    Verify Remarks Are Added Correctly In The PNR
    
Verify UDID Remarks Are Added For Client Under Armour
    [Tags]    us15250    full_regression
    Create PNR With Active Air Segments For Under Armour
    Select Approver Name: HENRY B STAFFORD
    Verify Remarks Are Added Correctly In The PNR
    
Verify UDID Remarks Are Added For Client University Travel Business
    [Tags]    us15250    full_regression
    Create PNR With Active Air Segments For University Travel Business
    Fill Up Udid Fields For Client University Travel Business
    Verify Remarks Are Added Correctly In The PNR
    
Verify UDID Remarks Are Added For Client University Of Manitoba
    [Tags]    us15250    full_regression
    Create PNR With Active Air Segments For University Of Manitoba
    Fill Up Udid Fields For Client University Of Manitoba
    Verify Remarks Are Added Correctly In The PNR

Verify UDID Remarks Are Added For Client Viavi
    [Tags]    us15250
    Create PNR With Active Air Segments For Viavi Solutions
    Select Reason For Not Booking 14 Days In Advance: UV-URGENT VENDOR VISIT
    Verify Remarks Are Added Correctly In The PNR
    
Verify UDID Remarks Are Added For Client Winners
    [Tags]    us15250
    Create PNR With Active Air Segments For Winners
    Fill Up Udid Fields For Client Winners
    Verify Remarks Are Added Correctly In The PNR
    
Verify UDID Remarks Are Added For Wolverine
    [Tags]    us15250    sanity_test
    Create PNR With Active Air Segments For Wolverine
    Enter No Hotel Booked Value: Booked by a meeting site
    Verify Remarks Are Added Correctly In The PNR
    
Verify UDID Remarks Are Added For Client Woodbridge When Booking Is Less Than 21 Days
    [Tags]    us15250    sanity_test    prod_sanity_test
    Create PNR With Active Air Segments Less Than 21 Days For Woodbridge
    Select Value For Why Not Booked 21 Days In Advance: Forgot failed to pre-plan and book trip
    Verify Remarks Are Added Correctly In The PNR
    
Verify UDID Remarks Are Not Added For Client Woodbridge When Booking Is More Than 21 Days
    [Tags]    us15250    full_regression
    Create PNR With Active Air Segments For Woodbridge
    Complete The PNR In Full Wrap
    Verify Remarks Are Not Found In The PNR
    
Verify UDID Remarks Are Not Added For Client Woodbridge When U50 Is VIP
    [Tags]    us15250    full_regression
    Create PNR With Active Air Segments Less Than 21 Days For Woodbridge With U50 VIP
    Complete The PNR In Full Wrap
    Verify Remarks Are Not Found In The PNR
    
Verify UDID Remarks Are Not Added For Client Woodbridge When Booking Is Car & Hotel Only
    [Tags]    us15250    full_regression
    Create PNR For Woodbridge, Car & Hotel Only
    Complete The PNR In Full Wrap
    Verify Remarks Are Not Found In The PNR
    