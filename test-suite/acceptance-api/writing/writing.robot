*** Setting ***
Resource    resources/writing.txt

*** Test Cases ***
Verify all updated placeholder values in Post Amadeus Request are reflected correctly Response
    [TAGS]    api
    Get Data: Request with multiple placeholder update
    Create Post Request    request_url=remarks-manager-rest/api/pnr-amadeus-request    content_type=application/json    api_flag=profiles
    Verify Updated Placeholder values are retrived correctly
    
Verify Placeholder values with Condition "Allow Empty Field" can be updated with blank values
    [TAGS]    api
    Get Data: Request with Blank Values
    Create Post Request    request_url=remarks-manager-rest/api/pnr-amadeus-request    content_type=application/json    api_flag=profiles
    Verify Updated Placeholder values are retrived correctly
        
Verify unmatched placeholder value can be added in Post Amadeus Request
    [TAGS]    api
    Get Data: Request with New Placeholder to Add
    Create Post Request    request_url=remarks-manager-rest/api/pnr-amadeus-request    content_type=application/json    api_flag=profiles
    Verify Updated Placeholder values are retrived correctly
    
Verify placeholder values with condition "ExistsFalse" will only be written in PNR if Condition does not exist
    [TAGS]    api
    Get Data: Request with Placeholder Condition ExistsFalse
    Create Post Request    request_url=remarks-manager-rest/api/pnr-amadeus-request    content_type=application/json    api_flag=profiles
    Verify Updated Placeholder values are retrived correctly
    
Verify placeholder values with condition "Not Equal to" will only be written if condition is met
    [TAGS]    api
    Get Data: Request with Placeholder Condition Not Equal To
    Create Post Request    request_url=remarks-manager-rest/api/pnr-amadeus-request    content_type=application/json    api_flag=profiles
    Verify Updated Placeholder values are retrived correctly
    
Verify placeholder values with condition "OR" will only be written if condition is met
    [TAGS]    api
    Get Data: Request with Placeholder Condition OR
    Create Post Request    request_url=remarks-manager-rest/api/pnr-amadeus-request    content_type=application/json    api_flag=profiles
    Verify Updated Placeholder values are retrived correctly
    
Verify Output Items with Grouping Is Written In The Correct Arrangement
    [TAGS]    api
    Get Data: Request with Grouped OutputItems
    Create Post Request    request_url=remarks-manager-rest/api/pnr-amadeus-request    content_type=application/json    api_flag=profiles
    Verify Updated Placeholder values are retrived correctly
    
Verify That Remarks Language Is Changed From EN TO FR WHEN RMZ LANGUAGE IS FR
    [TAGS]    api
    Get Data: Request With Language Change To FR
    Create Post Request    request_url=remarks-manager-rest/api/pnr-amadeus-request    content_type=application/json    api_flag=profiles
    Verify Updated Placeholder values are retrived correctly
    