*** Settings ***
Force Tags        corp
Resource          ../../pages/base.robot
Test Setup        Login To Amadeus Sell Connect Acceptance
Test Teardown     Close All Browsers

*** Variables ***
${test_file_name}    bsp_routing_code

*** Test Cases ***
Verify That BSP Routing Code Is Written Correctly When Destination Is In USA
    [Tags]    us14703
    Create PNR With Active Air Segments For Corporate, With Flight Destination To USA
    Fill Up Routing Code With USA incl. all US Territories and Possessions
    Verify Country Of Destination Is Mapped In The FS Remark
    
Verify That BSP Routing Code Is Written Correctly When Destination Is In Mexico/Central America/Canal Zone/Costa Rica
    [Tags]    us14703
    Create PNR With Active Air Segments For Corporate, With Flight Destination To Mexico
    Fill Up Routing Code With Mexico/Central America/Canal Zone/Costa Rica
    Verify Country Of Destination Is Mapped In The FS Remark
    
Verify That BSP Routing Code Is Written Correctly When Destination Is In Carribbean/Bermuda
    [Tags]    us14703
    Create PNR With Active Air Segments For Corporate, With Flight Destination To Carribean/Bermuda
    Fill Up Routing Code With Caribbean and Bermuda
    Verify Country Of Destination Is Mapped In The FS Remark
    
Verify That BSP Routing Code Is Written Correctly When Destination Is In South America
    [Tags]    us14703
    Create PNR With Active Air Segments For Corporate, With Flight Destination To South America
    Fill Up Routing Code With South America
    Verify Country Of Destination Is Mapped In The FS Remark
    
Verify That BSP Routing Code Is Written Correctly When Destination Is In Europe
    [Tags]    us14703
    Create PNR With Active Air Segments For Corporate, With Flight Destination To Europe
    Fill Up Routing Code With Europe-incl. Morocco/Tunisia/Algeria/Greenland
    Verify Country Of Destination Is Mapped In The FS Remark
    
Verify That BSP Routing Code Is Written Correctly When Destination Is In Africa
    [Tags]    us14703
    Create PNR With Active Air Segments For Corporate, With Flight Destination To Africa
    Fill Up Routing Code With Africa
    Verify Country Of Destination Is Mapped In The FS Remark
    
Verify That BSP Routing Code Is Written Correctly When Destination Is In Middle East/Western Asia
    [Tags]    us14703
    Create PNR With Active Air Segments For Corporate, With Flight Destination To Middle East
    Fill Up Routing Code With Middle East/Western Asia
    Verify Country Of Destination Is Mapped In The FS Remark
    
Verify That BSP Routing Code Is Written Correctly When Destination Is In Asia
    [Tags]    us14703
    Create PNR With Active Air Segments For Corporate, With Flight Destination To Asia
    Fill Up Routing Code With Asia incl. India
    Verify Country Of Destination Is Mapped In The FS Remark
    
Verify That BSP Routing Code Is Written Correctly When Destination Is In Australia/New Zealand/Islands Of The Pacific
    [Tags]    us14703
    Create PNR With Active Air Segments For Corporate, With Flight Destination To Australia
    Fill Up Routing Code With Australia/New Zealand/Islands of the Pacific incl. Hawaii excl. Guam
    Verify Country Of Destination Is Mapped In The FS Remark
    
Verify That BSP Routing Code Is Written Correctly When Destination Is In Canada/St. Pierre Et Miquelon
    [Tags]    us14703
    Create PNR With Active Air Segments For Corporate, With Flight Destination To Canada
    Fill Up Routing Code With Canada and St. Pierre et Miquelon
    Verify Country Of Destination Is Mapped In The FS Remark
    