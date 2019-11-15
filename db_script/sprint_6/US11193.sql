USE Desktop_Test
GO

BEGIN TRAN
BEGIN TRY
	
	DECLARE @CreationUserIdentifier	VARCHAR(150)
    DECLARE @CreationTimeStamp		DATETIME = GETUTCDATE()

	DECLARE @PNROutputItemID AS INT 
	DECLARE @PNROutputGroupID AS INT
	DECLARE @GeneralPNROutputGroupID INT

	SET @CreationUserIdentifier	='Amadeus CA Migration - US11193'
	
	SET @PNROutputItemId = (SELECT MAX(PNROutputItemID)
FROM PNROutputItem)
	SET @PNROutputGroupID =(SELECT PNROutputGroupID
from PNROutputGroup
where PNROutputGroupName ='Canada Migration General Group')
	

	DELETE FROM PNROutputGroupPNROutputItem WHERE CreationUserIdentifier =@CreationUserIdentifier	
	DELETE FROM PNROutputItemLanguage WHERE CreationUserIdentifier =@CreationUserIdentifier	
	DELETE FROM PNROutputItem WHERE CreationUserIdentifier =@CreationUserIdentifier	
	DELETE FROM PNROutputPlaceHolder WHERE	CreationUserIdentifier = @CreationUserIdentifier

	INSERT INTO [dbo].[PNROutputPlaceHolder]
    ([PNROutputPlaceHolderName],[PNROutputPlaceHolderRegularExpresssion],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber])
VALUES
    ( '%CurrentDate%', '[0-9]{1,2}[A-Z]{3}', @CreationTimestamp, @CreationUserIdentifier, 1 ),
    ( '%VendorName%', '(.*)', @CreationTimestamp, @CreationUserIdentifier, 1 ),
    ( '%Tax%', '([0-9]{1,}\.{0,1}[0-9]{0,2})', @CreationTimestamp, @CreationUserIdentifier, 1 ),
    ( '%Commission%', '([0-9]{1,}\.{0,1}[0-9]{0,2})', @CreationTimestamp, @CreationUserIdentifier, 1 ),
    ( '%CounselorFirstName%', '(.*)', @CreationTimestamp, @CreationUserIdentifier, 1 ),
    ( '%CounselorLastName%', '(.*)', @CreationTimestamp, @CreationUserIdentifier, 1 ),
    ( '%DocTicketNum%', '(.*)', @CreationTimestamp, @CreationUserIdentifier, 1 ),
	( '%PartialFull%', '(PART|FULL)', @CreationTimestamp, @CreationUserIdentifier, 1 ),
	( '%TouchCode%', '([A-Z0-9]{2})', @CreationTimestamp, @CreationUserIdentifier, 1 ),
	( '%BookingToolCode%', '([A-Z0-9]{1})', @CreationTimestamp, @CreationUserIdentifier, 1 ),
	( '%ReasonType%', '([A-Z0-9]{2})', @CreationTimestamp, @CreationUserIdentifier, 1 ),
	( '%ReasonCode%', '([A-Z0-9]{1})', @CreationTimestamp, @CreationUserIdentifier, 1 )


	INSERT INTO [dbo].[PNROutputItem]
    ([PNROutputItemId],[PNROutputRemarkTypeCode],[PNROutputBindingTypeCode], [PNROutputUpdateTypeCode],[GDSRemarkQualifier],[RemarkFormat],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber],[PNROutputItemDefaultLanguageCode],[PNROutputItemXMLFormat])
VALUES
    (@PNROutputItemID + 1, 0, null, 1, 'X', 'ATTN ACCTNG - NONBSP %PartialFull% RECREDIT - %CurrentDate%', @CreationTimestamp, @CreationUserIdentifier, 1, 'en-GB', NULL),
    (@PNROutputItemID + 2, 0, null, 1, 'X', '.  NONBSP..%VendorName% - ISSUE OID %BackOfficeAgentIdentifier%', @CreationTimestamp, @CreationUserIdentifier, 1, 'en-GB', NULL),
    (@PNROutputItemID + 3, 0, null, 1, 'X', '.  RECREDIT BASE AMOUNT %BaseAmt% GST %Gst% TAX %Tax%', @CreationTimestamp, @CreationUserIdentifier, 1, 'en-GB', NULL),
    (@PNROutputItemID + 4, 0, null, 1, 'X', '.  RECREDIT COMMISSION %Commission%', @CreationTimestamp, @CreationUserIdentifier, 1, 'en-GB', NULL),
    (@PNROutputItemID + 5, 0, null, 1, 'X', '.  %CurrentDate%/ %CounselorLastName% %CounselorFirstName%.', @CreationTimestamp, @CreationUserIdentifier, 1, 'en-GB', NULL),
    (@PNROutputItemID + 6, 0, null, 1, 'X', 'DOCUBANK/TKT %DocTicketNum%/%CurrentDate%', @CreationTimestamp, @CreationUserIdentifier, 1, 'en-GB', NULL),
	 (@PNROutputItemID + 7, 3, null, 1, 'X', 'EB/%TouchCode%%BookingToolCode%/%ReasonType%%ReasonCode%', @CreationTimestamp, @CreationUserIdentifier, 1, 'en-GB', NULL)


	INSERT INTO PNROutputGroupPNROutputItem
    (PNROutputGroupId, PNROutputItemId, SequenceNumber, CreationTimestamp, CreationUserIdentifier, VersionNumber, DataStandardizationVersion, LayoutVersion)
VALUES
    (@PNROutputGroupID, @PNROutputItemID + 1, 0, @CreationTimeStamp, @CreationUserIdentifier, 1, 1, 1),
    (@PNROutputGroupID, @PNROutputItemID + 2, 0, @CreationTimeStamp, @CreationUserIdentifier, 1, 1, 1),
    (@PNROutputGroupID, @PNROutputItemID + 3, 0, @CreationTimeStamp, @CreationUserIdentifier, 1, 1, 1),
    (@PNROutputGroupID, @PNROutputItemID + 4, 0, @CreationTimeStamp, @CreationUserIdentifier, 1, 1, 1),
    (@PNROutputGroupID, @PNROutputItemID + 5, 0, @CreationTimeStamp, @CreationUserIdentifier, 1, 1, 1),
    (@PNROutputGroupID, @PNROutputItemID + 6, 0, @CreationTimeStamp, @CreationUserIdentifier, 1, 1, 1),
	(@PNROutputGroupID, @PNROutputItemID + 7, 0, @CreationTimeStamp, @CreationUserIdentifier, 1, 1, 1)

	--rollback tran
	COMMIT TRAN

END TRY


BEGIN CATCH


    ROLLBACK TRAN

    PRINT 'ERROR OCCURRED! Rolled back transactions if there are any:' 
    PRINT ERROR_NUMBER() 
    PRINT 'Error Severity: ' 
    PRINT ERROR_SEVERITY() 
    PRINT 'Error State: ' 
    PRINT ERROR_STATE() 
    PRINT 'Error Procedure: ' 
    PRINT ERROR_PROCEDURE() 
    PRINT 'Error Line: ' 
    PRINT ERROR_LINE() 
    PRINT 'Error Message: ' 
    PRINT ERROR_MESSAGE(); 
END CATCH
GO

