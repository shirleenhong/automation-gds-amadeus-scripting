*** Settings ***
Force Tags        corp
Library           String
Resource          ../../pages/base.robot
Test Setup       Login To Amadeus Sell Connect Acceptance
Test Teardown    Close All Browsers

*** Variables ***
${test_file_name}    dana_international_advisory
${text_advisory}    //app-container[@ng-reflect-container-filter='VISA AND PASSPORT']//div[@class='row']

*** Test Cases ***
Verify Verbiage In Visa And Passport When CFA Is QR2 And Flight Is International
    [tags]    us15241
    Create PNR With Active Air Segments For Client Dana, International Flight 
    Verify Dana International Advisory Is Displayed
    
Verify Verbiage Is Not Displayed In Visa And Passport When CFA Is QR2 And Flight Is Domestic
    [tags]    us15241
    Create PNR With Active Air Segments For Client Dana, Domestic Flight 
    Verify Dana International Advisory Is Not Displayed
    
Verify Verbiage Is Not Displayed In Visa And Passport When CFA Is Not QR2
    [tags]    us15241
    Create PNR With Active Air Segments For Other Client 
    Verify Dana International Advisory Is Not Displayed
    
*** Keywords ***    
Verify Dana International Advisory Is Not Displayed
    Navigate to Page Visa And Passport
    Run Keyword And Continue On Failure    Element Should Not Be Visible    ${text_advisory}
    Take Screenshot
