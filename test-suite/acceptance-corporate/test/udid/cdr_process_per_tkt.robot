*** Settings ***
Force Tags        corp
Library           String
Library           SeleniumLibrary
Library           Collections
Library           Screenshot
Resource          ../../pages/base.robot
Test Setup        Login To Amadeus Sell Connect Acceptance
Test Teardown    Close All Browsers

*** Variables ***
${test_file_name}    cdr_process_per_tkt

*** Test Cases ***
Verify That UDID 6 And UDID 4 Remark Should Be Written In The PNR For OY3/OV1/LH1 Client When UDID 6 Selected Is "Core Team Bus Class Approved"
    [Tags]    us15251    us17189
    Create PNR With Active Air Segments For Client OY3, Select Core Team Bus Class Approved
    Add Values For UL Client When Why First/Bus Booked Is Core Team Bus Class Approved
    Verify UDID 4, 6, and 19 Are Written In The PNR For Client UL
    
Verify That UDID 6 And UDID 19 Remark Should Be Written In The PNR For OY3/OV1/LH1 Client
    [Tags]    us15251    us17189
    Create PNR With Active Air Segments For Client LH1, Select Any Except Core Team Bus Class Approved
    Add Values For UL Client When Why First/Bus Booked Is Complimentary upgrade
    Verify UDID 4, 6, and 19 Are Written In The PNR For Client UL
    
Verify That UDID 3 Remark Should Be Written In The PNR For SGE Client When There's A Single Air Segment Booked And Ticketed In The PNR
    [Tags]    us15251    us17189
    Create PNR With Active Air Segments For Client SGE, Single Active Air Segment
    Enter 1 Airline Code/s For CDR per TKT
    Verify That The UDID 3 Remark Is Written In The PNR For SGE With Single Active Air Segments
    
Verify That UDID 3 Remark Should Be Written In The PNR For SGE Client When There's A Multiple Air Segment Booked And Ticketed In The PNR
    [Tags]    us15251    us17189
    Create PNR With Active Air Segments For Client SGE, Multiple Active Air Segments
    Enter 2 Airline Code/s For CDR per TKT
    Verify That The UDID 3 Remark Is Written In The PNR For SGE With Multiple Active Air Segments
    
Verify That UDID 3 Remark Should Not Be Written In The PNR For SGE Client When There's No Air Segment Booked And Ticketed In The PNR
    [Tags]    us15251    us17189
    Create PNR With Passive Air Segments For Client SGE, No Active Air Segments
    Verify That UI Should Not Appear For Client SGE When There Is No TSTs
    
Verify That UDID 17 Remark Should Be Written In The PNR For EJ5 Client When There's A Single Air Segment Booked And Ticketed In The PNR
    [Tags]    us15251    us17189
    Create PNR With Active Air Segments For Client EJ5, Single Active Air Segment
    Enter 1 Coach Fare For CDR per TKT
    Verify That The UDID 17 Remark Is Written In The PNR For EJ5 With Single Active Air Segments
    
Verify That UDID 17 Remark Should Be Written In The PNR For EJ5 Client When There's A Multiple Air Segment Booked And Ticketed In The PNR
    [Tags]    us15251    us17189
    Create PNR With Active Air Segments For Client EJ5, Multiple Active Air Segments
    Enter 2 Coach Fare For CDR per TKT
    Verify That The UDID 17 Remark Is Written In The PNR For EJ5 With Multiple Active Air Segments
    
Verify That UDID 17 Remark Should Not Be Written In The PNR For EJ5 Client When There's No Air Segment Booked And Ticketed In The PNR
    [Tags]    us15251    us17189
    Create PNR With Passive Air Segments For Client EJ5, No Active Air Segments
    Verify That UI Should Not Appear For Client EJ5 When There Is No TSTs
    
Verify That UDID 3 Remark Should Be Written In The PNR For NZ7 Client When YUP Fare Booked Field Selected Is YES
    [Tags]    us15251    us17189
    Create PNR With Active Air Segments For Client NZ7, Single Active Air Segment
    Enter 1 YUP Fare For CDR per TKT
    Verify That The UDID 3 Remark Is Written In The PNR For NZ7 With Single Active Air Segments
    
Verify That UDID 3 Remark Should Be Written In The PNR For NZ7 Client When YUP Fare Booked Field Selected Is No And Multiple Air Segment Booked And Ticketed In The PNR
    [Tags]    us15251    us17189
    Create PNR With Active Air Segments For Client NZ7, Multiple Active Air Segments
    Enter 2 YUP Fare For CDR per TKT
    Verify That The UDID 3 Remark Is Written In The PNR For NZ7 With Multiple Active Air Segments
    
Verify That UDID 3 Remark Should Not Be Written In The PNR For NZ7 Client When There's No Air Segment Booked And Ticketed In The PNR
    [Tags]    us15251    us17189
    Create PNR With Passive Air Segments For Client NZ7, No Active Air Segments
    Verify That UI Should Not Appear For Client NZ7 When There Is No TSTs
    
Verify That UDID 17 And UDID 18 Remark Should Be Written In The PNR For W7B Client When There's A Single Air Segment Booked And Ticketed In The PNR
    [Tags]    us15251    us17189
    Create PNR With Active Air Segments For Client W7B, Single Active Air Segment
    Enter 1 Lowest Coach Fare And Approver Name For CDR per TKT
    Verify That The UDID 17 And UDID 18 Remark Is Written In The PNR For W7B With Single Active Air Segments

Verify That UDID 17 And UDID 18 Remark Should Be Written In The PNR For W7B Client When There's A Multiple Air Segment Booked And Ticketed In The PNR
    [Tags]    us15251    us17189
    Create PNR With Active Air Segments For Client W7B, Multiple Active Air Segments
    Enter 2 Lowest Coach Fare And Approver Name For CDR per TKT
    Verify That The UDID 17 And UDID 18 Remark Is Written In The PNR For W7B With Multiple Active Air Segments

Verify That UDID 17 And UDID 18 Remark Should Not Be Written In The PNR For W7B Client When There's No Air Segment Booked And Ticketed In The PNR
    [Tags]    us15251    us17189
    Create PNR With Passive Air Segments For Client W7B, No Active Air Segments
    Verify That UI Should Not Appear For Client W7B When There Is No TSTs