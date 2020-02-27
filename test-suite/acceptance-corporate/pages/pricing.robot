*** Settings ***
Library           String
Library           SeleniumLibrary
Library           Collections
Library           Screenshot
Resource          base.robot

*** Variables ***
${panel_pricing}    //div[@class='panel-title']//div[contains(text(), 'Pricing')]
${div_segment_line}     //div[@formarrayname='airFares'][
${checkbox_segment}    ]//input[@name='chkIncluded']
${input_pricing_segment}    ]//input[@formcontrolname='segments']
${input_pricing_commission}    ]//input[@formcontrolname='commission']
${list_commissionType}    ]//select[@id='commissionType']
${tab_exchangeEndorsements}    //a[@id='exchangeEndorsements-link']
${checkbox_exchangeEndorsement}    //input[@formcontrolname='exchangeEndorsement']
${list_uaEndorsement}    //select[@formcontrolname='uaEndorsement']
${input_scFlight}    //input[@formcontrolname='scFlight']
${input_scDate}    //input[@formcontrolname='scDate']
${checkbox_exchangeServiceFund}    //input[@formcontrolname='exchangeServiceFund']
${input_exchangeServiceValue}    //input[@formcontrolname='exchangeServiceValue']
${tr_endorsement_start}   //tr[@ng-reflect-name='
${tr_endorsement_end}     ']

*** Keywords ***
Update Airfare Commision With ${value} ${type} For Segment ${segment_num}
    Navigate To Page Airline Commission
    : FOR    ${i}     IN RANGE    1    9
    \    ${exists}    Run Keyword And Return Status     Element Should Be Visible     ${div_segment_line}${i}${input_pricing_segment}
    \    Exit For Loop If    not ${exists}
    \    ${current_seg}    Run Keyword If    ${exists}    Get Value     ${div_segment_line}${i}${input_pricing_segment}
    \    ${matches}    Run Keyword And Return Status     Should Match    ${current_seg}     ${segment_num}
    \    Run Keyword If     ${matches}    Click Element    ${div_segment_line}${i}${checkbox_segment}
    \    Run Keyword If     ${matches}    Enter Value    ${div_segment_line}${i}${input_pricing_commission}     ${value}
    \    Run Keyword If     ${matches}    Select From List By Value     ${div_segment_line}${i}${list_commissionType}     ${type}
    Take Screenshot
    
Fill Up Exhange Endorsements For Airline Code ${airline_code}
    Navigate To Page Exchange Endorsements
    Run Keyword If    "${airline_code}" == "AC" or "${airline_code}" == "OS" or "${airline_code}" == "SN" or "${airline_code}" == "LH"    Click Element    ${checkbox_exchangeEndorsement}
    Run Keyword If    "${airline_code}" == "OS" or "${airline_code}" == "SN" or "${airline_code}" == "LH"    Enter Value    ${input_scFlight}        123
    Run Keyword If   "${airline_code}" == "OS" or "${airline_code}" == "SN" or "${airline_code}" == "LH"    Input Text    ${input_scDate}    02122020
    Click Element    ${checkbox_exchangeServiceFund}    
    Take Screenshot
    
Fill Up Exchange Endorsements For UA With ${value}
    Navigate To Page Exchange Endorsements
    Select From List By Value    ${list_uaEndorsement}    ${value}
    Run Keyword If    "${value}" != "UAMKW"    Enter Value    ${input_scFlight}        123
    Run Keyword If    "${value}" != "UAMKW"    Input Text    ${input_scDate}    02122020
    Click Element    ${checkbox_exchangeServiceFund}
    Enter Value    ${input_exchangeServiceValue}    9999999
    Take Screenshot
    
Fill Up Multiple Exchange Endorsements For UA
    Navigate To Page Exchange Endorsements
    ${value_0}    Set Variable    UAIRROPSDELAY
    ${value_1}    Set Variable    UAIRROPSCANCEL
    : FOR    ${i}    IN RANGE    0    2
    \    Select From List By Value    ${tr_endorsement_start}${i}${tr_endorsement_end}${list_uaEndorsement}    ${value_${i}}
    \    Enter Value    ${tr_endorsement_start}${i}${tr_endorsement_end}${input_scFlight}        123
    \    Enter Date Value    ${tr_endorsement_start}${i}${tr_endorsement_end}${input_scDate}    02    12    2020
    \    Click Element    ${tr_endorsement_start}${i}${tr_endorsement_end}${checkbox_exchangeServiceFund}
    \    Enter Value    ${tr_endorsement_start}${i}${tr_endorsement_end}${input_exchangeServiceValue}    9999999
    Take Screenshot
       
Click Exchange Endorsements Tab
    Wait Until Element Is Visible    ${tab_exchangeEndorsements}    30
    Click Element    ${tab_exchangeEndorsements}
    Wait Until Element Is Visible    ${checkbox_exchangeServiceFund}    30    
    Set Test Variable    ${current_page}    Exchange Endorsements
    