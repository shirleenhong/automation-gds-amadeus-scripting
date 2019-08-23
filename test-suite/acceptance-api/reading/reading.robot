*** Setting ***
Resource    resources/reading.txt


*** Test Cases ***
Scenario: Placeholder Values matches in PNR
    [Tags]    api
    Get Data: Sample
    Create Post Request    request_url=remarks-manager-rest/api/matched-placeholder-values    content_type=application/json    api_flag=profiles
    Verify PNR is read with correct remark placeholders
    
Scenario: Error on Invalid URL
    [Tags]    api
    Get Data: Sample
    Create Post Request    request_url=remarks-manager-rest/ap/matched-placeholder-values    content_type=application/json    api_flag=profiles
    Verify Response Status Code 404 is Returned
    