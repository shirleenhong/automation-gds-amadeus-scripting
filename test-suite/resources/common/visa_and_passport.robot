*** Settings ***
Resource          common_library.robot

*** Keywords ***
Click E-Traveladvisories Button
    Click Button    xpath=//input[@name='btnAdvisory']
    Sleep    5
    Select Window    title=YTOWL2107 - Amadeus Selling Platform Connect
    Comment    Select Frame    xpath=//iframe[contains(@src,'bpg-aws-cwt.com/portal/gds-scripting-amadeus')]
    #for test ELB
    Select Frame    xpath=//iframe[contains(@src,'amazonaws.com/bpg-gds-scripting-amadeus')]

Enter Passport Name
    [Arguments]    ${passport_name}
    Input Text    css=#passportName    ${passport_name}

Select Visa Checkbox
    [Arguments]    @{visa_checkbox}
    : FOR    ${visa_checkbox}    IN    @{visa_checkbox}
    \    Select Checkbox    xpath=//div[@ng-reflect-name='segments'][${visa_checkbox}]//input[@ng-reflect-name='visa']
    [Teardown]    Take Screenshot
