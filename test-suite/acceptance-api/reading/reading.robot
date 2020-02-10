*** Setting ***
Resource    resources/reading.txt


*** Test Cases ***
Verify Placeholder matches in PNR are retrieved correctly
    [TAGS]    api
    Get Data: PNR with GUID A:F9F84
    Create Post Request    request_url=remarks-manager-rest/api/matched-placeholder-values    content_type=application/json    api_flag=profiles
    Verify PNR is read with correct remark placeholders
    
Verify Error Message is Retrived When Invalid URL is used to POST
    [TAGS]    api
    Get Data: PNR with GUID A:F9F84
    Create Post Request    request_url=remarks-manager-rest/ap/matched-placeholder-values    content_type=application/json    api_flag=profiles
    Verify Response Status Code 404 is Returned
    