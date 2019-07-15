*** Settings ***
Resource          ../utilities/libraries.txt

*** Variables ***
#Selco URL
${selco_url}      https://acceptance.custom.sellingplatformconnect.amadeus.com/LoginService/login.jsp?SITE=I05WI05W&OV_SITE_UM_USE_PREF_PACKAGE=FALSE&OV_SITE_UM_USE_HMC_HIERARCHY=FALSE&LANGUAGE=US&refreshOnError=true&appUri=/app_sell2.0/apf/init/login    gc
#Utility Locators
&{utility}        new_command_page=css=#etoolbar_toolbarSection_newcommandpagebtn_id    text_area=css=.cmdPromptDiv > textArea
#Login Locators
&{login}          username_css=css=#username > span:first-child input    officeid_css=css=#officeId input    password_css=css=#password input
#Payment Locators
&{payment}        key=value    key2=value2
