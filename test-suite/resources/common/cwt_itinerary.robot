*** Settings ***
Resource          common_library.robot

*** Keywords ***
Enter Email Address
    [Arguments]    ${email_address_order}    ${email_address}
    Input Text    xpath=//div[@formarrayname='emailAddresses'][${email_address_order}]//input[@id='emailAddress']    ${email_address}

Click Add Email Address Button
    Click Element    xpath=//div[@ng-reflect-name='emailAddresses']//i[@id='add']

Select Itinerary Language
    [Arguments]    ${itinerary_language}
    Select From List By Label    css=#language    ${itinerary_language}

Select Itinerary Type Of Transaction
    [Arguments]    ${transaction_type}
    Select From List By Label    css=#typeTransaction    ${transaction_type}

Enter Service Remark
    [Arguments]    ${service_order}    ${service_remark}
    Input Text    xpath=//div[@class='ng-untouched ng-pristine ng-valid'][${service_order}]//input[@id='service']    ${service_remark}
    [Teardown]    Take Screenshot

Enter Tickets Remark
    [Arguments]    ${tickets_order}    ${tickets_remark}
    Input Text    xpath=//div[@formarrayname='tickets'][${tickets_order}]//input[@id='ticket']    ${tickets_remark}
    [Teardown]    Take Screenshot

Enter Offer Remark
    [Arguments]    ${offer_order}    ${offer_remark}
    Input Text    xpath=//div[@formarrayname='offers'][${offer_order}]//input[@id='offer']    ${offer_remark}
    [Teardown]    Take Screenshot

Add Type Of Transaction Remark Field
    [Arguments]    ${type}
    Click Element    xpath=//div[@ng-reflect-name='${type}']//i[@id='add']
