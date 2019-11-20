*** Settings ***
Resource          common_library.robot
Resource          core.robot
Resource          leisure_window.robot
Resource          payment.robot
Resource          remarks.robot
Resource          reporting.robot
Resource          cancel.robot
Resource          passive.robot
Resource          visa_and_passport.robot
Resource          cwt_itinerary.robot
Resource          resend_invoice.robot
Resource          ../../acceptance-leisure/amadeus_ca_resource.robot

*** Variables ***
${env}            Test
${username}       UXXXXX
${password}       Password
