*** Settings ***
Force Tags        corp
Library           String
Resource          ../../pages/base.robot
Test Setup       Login To Amadeus Sell Connect Acceptance
Test Teardown    Close All Browsers

*** Variables ***
${test_file_name}    hotel_savings_code
${list_hotelSavings}    css=#hotelSavingsCode

*** Test Cases ***
Verify That RM*HS Remark Are Written For Single Passive Hotel Segment
    [tags]    us14343    not_ready
    Create PNR For Single Hotel Segment
    Fill Up Hotel Savings Code With Value X
    Verify Hotel Savings Remark Is Written In The PNR

Verify That RM*HS Remark Are Written For Single Active Hotel Segment
    [tags]    us14343    not_ready
    Create PNR With Active Hotel Segments For Single Hotel Segment
    Fill Up Hotel Savings Code With Value J
    Verify Hotel Savings Remark Is Written In The PNR
    
Verify That RM*HS Remark Are Written For Multiple Passive Hotel Segment
    [tags]    us14343    not_ready
    Create PNR For Multiple Hotel Segment
    Fill Up Hotel Savings Code With Value X,J
    Verify Hotel Savings Remark Is Written In The PNR

Verify That RM*HS Remark Are Written For Multiple Active Hotel Segment
    [tags]    us14343    not_ready
    Create PNR With Active Hotel Segments For Multiple Hotel Segment
    Fill Up Hotel Savings Code With Value A,X
    Verify Hotel Savings Remark Is Written In The PNR    

Verify That RM*HS Remark Are Written With No Savings Code For Single Passive Hotel Segment
    [tags]    us14343    not_ready
    Create PNR For Single Hotel Segment
    Complete The PNR In Full Wrap
    Verify HS Remark Is Written Without Savings Code
    
Verify That RM*HS Remark Are Written With No Savings Code For Single Active Hotel Segment
    [tags]    us14343    not_ready
    Create PNR With Active Hotel Segments For Single Hotel Segment
    Complete The PNR In Full Wrap
    Verify HS Remark Is Written Without Savings Code

Verify That Existing RM*HS Remark Is Deleted If No Associated Date Are In The Hotel Segments
    [tags]    us14343    not_ready
    Create PNR With Active Hotel Segments For Single Hotel Segment
    Fill Up Hotel Savings Code With Value A
    Verify Hotel Savings Remark Is Written In The PNR

*** Keywords ***
Fill Up Hotel Savings Code With Value ${hotel_savings_code}
    Navigate To Page Hotel Savings Code
    @{codes}     Split String     ${hotel_savings_code}    ,
    ${limit}    Get Line Count    ${codes}
    ${limit}    Evaluate    ${limit} + 1
    : FOR    ${i}    IN RANGE     1     ${limit}
    \    Select From List By Value    ${list_hotelSavings}${open_bracket}${i}${close_bracket}    ${codes[${i}]}
    \    Set Test Variable    ${hotel_savings_code_${i}}    ${codes[${i}]}
    \    ${i}    Evaluate    ${i} + 1
    Take Screenshot
    
Verify Hotel Savings Remark Is Written In The PNR
    Finish PNR
   : FOR    ${i}    IN RANGE    1      10
   \    ${status}    Run Keyword And Return Status    Should Not Be Empty     ${hotel_savings_code_${i}}
   \    Run Keyword If    "${status}" == "True"    Verify Specific Remark Is Written In The PNR    RM *HS$test_date_${i}}/-SV-${hotel_savings_code_${i}}/-CHN-HI
   \    ${i}    Evaluate    ${i} + 1
   Verify Unexpected Remarks Are Not Written In The PNR
    
Verify HS Remark Is Written Without Savings Code
    Finish PNR
    Verify Specific Remark Is Written In The PNR    RM*HS/${test_date_1}/-CHN-HI
    