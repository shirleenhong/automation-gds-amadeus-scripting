*** Settings ***
Force Tags        leisure
Resource          ../../resources/common/global_resources.robot

*** Test Cases ***
Verify That List Of E-Ticket Invoices And Emails Are Displayed And Selected E-Ticket And Email Are Written
    [Tags]    us12476    not_ready
    Login To Amadeus Sell Connect
    Create PNR With Active Air Segments For Resend Selected Eticket Invoices
    Complete PNR And Send Cryptic For Invoice
    Select Invoice And E-Tickets To Resend And Add Email
    Verify That Invoice Remark Is Deleted, Selected Ticket Is Written And Email Is Updated
    Verify That PNR Is Correctly Queued

Verify That List Of E-Ticket Invoice Are Displayed And All E-Tickets When Selected Are Written
    [Tags]    us12476    not_ready
    Login To Amadeus Sell Connect
    Create PNR With Active Air Segments For Resend Selected Eticket Invoices With Multiple Emails
    Complete PNR Without Sending Cryptic For Invoice
    Verify If Corporate Script Send INV Cryptic Automatically
    Select All Invoice And All E-tickets To Resend And Add Multiple Emails
    Verify That All Selected Invoices And Tickets And Email Added Are Written
    Verify That PNR Is Correctly Queued

Verify That List Of E-Ticket Invoice Are Displayed And Correct Remark Is Written When No E-Tickets Are Selected
    [Tags]    us12476    not_ready
    Login To Amadeus Sell Connect
    Create PNR With Active Air Segments For Resend Selected Eticket Invoices
    Complete PNR And Send Cryptic For Invoice
    Select Invoice And No E-tickets And Add Email
    Verify That Invoice Remark Is Deleted, RMZ Ticket Is Written And Email Is Updated
    Verify That PNR Is Correctly Queued

Verify That List Of Fee Accounting Lines Are Displayed And RM Remarks Are Written
    [Tags]    us12476    not_ready
    Login To Amadeus Sell Connect
    Create PNR With Active Air Segments For Resending Of Invoice With Fee Accounting Lines
    Complete PNR In Amadeus Send Cryptic For Invoice
    Select Fee Accounting Lines
    Verify That Accounting Remarks Are Written
    Verify That PNR Is Correctly Queued

Verify That List Of Non-BSP Accounting Lines Are Displayed And RM Remarks Are Written
    [Tags]    us12476    not_ready
    Login To Amadeus Sell Connect
    Create PNR With Active Air Segments For Resending Of Invoice With Non-BSP Accounting Lines
    Complete PNR In Amadeus Send Cryptic For Invoice
    Select Non-BSP Accounting Lines
    Verify That Accounting Remarks Are Written
    Verify New MAC Remarks Are Written
    Verify That PNR Is Correctly Queued

Verify That List Of Fee And Non-BSP Accounting Lines Are Displayed And RM Remarks Are Written
    [Tags]    us12476    not_ready
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Resending Of Invoice With Fee And Non-BSP Accounting Lines
    Complete PNR In Amadeus Send Cryptic For Invoice
    Select All Fees and Non-BSP Accounting Lines
    Verify That Accounting Remarks Are Written
    Verify New MAC Remarks Are Written
    Verify That PNR Is Correctly Queued

Verify That Invoice, E-Tickets, Fee, And Non-BSP Accounting Lines Are Resent And Email Address Is Updated
    [Tags]    us12476    not_ready
    Login To Amadeus Sell Connect Acceptance
    Create PNR With Active Air Segments For Resending Of Invoice With Fee And Non-BSP Accounting Lines
    Complete PNR In Amadeus Send Cryptic For Invoice
    Select Invoices, E-Tickets, Fee, And Non-BSP Accounting Lines
    Verify That All Selected Invoices, Tickets, Fess, Non-BSP And Email Added Are Written
    Verify That PNR Is Correctly Queued
