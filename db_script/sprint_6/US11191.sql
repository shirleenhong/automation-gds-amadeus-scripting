USE Desktop_Test
GO

BEGIN TRAN
BEGIN TRY
	
	DECLARE @CreationUserIdentifier	VARCHAR(150)
    DECLARE @CreationTimeStamp		DATETIME = GETUTCDATE()

	DECLARE @PNROutputItemID AS INT 
	DECLARE @PNROutputGroupID AS INT
	DECLARE @GeneralPNROutputGroupID INT

	SET @CreationUserIdentifier	='Amadeus CA Migration - US11191'
	
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
    ( '%InvoiceNumber%', '(.*)', @CreationTimestamp, @CreationUserIdentifier, 1 ),
	( '%TicketNumber%', '(.*)', @CreationTimestamp, @CreationUserIdentifier, 1 ),
	( '%CouponNumber%', '(.*)', @CreationTimestamp, @CreationUserIdentifier, 1 ),
	( '%RefundAmount%', '(.*)', @CreationTimestamp, @CreationUserIdentifier, 1 )



	INSERT INTO [dbo].[PNROutputItem]
    ([PNROutputItemId],[PNROutputRemarkTypeCode],[PNROutputBindingTypeCode], [PNROutputUpdateTypeCode],[GDSRemarkQualifier],[RemarkFormat],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber],[PNROutputItemDefaultLanguageCode],[PNROutputItemXMLFormat])
VALUES
    (@PNROutputItemID + 1, 0, null, 1, 'X', 'ATTN ACCTNG - NONBSP %PartialFull% REFUND  - %CurrentDate%', @CreationTimestamp, @CreationUserIdentifier, 1, 'en-GB', NULL),   
    (@PNROutputItemID + 2, 0, null, 1, 'X', '.  REFUND BASE AMOUNT %BaseAmt% GST %Gst% TAX %Tax%', @CreationTimestamp, @CreationUserIdentifier, 1, 'en-GB', NULL),
    (@PNROutputItemID + 3, 0, null, 1, 'X', '.  REFUND %RefundAmount% - COMMISSION %Commission% %InvoiceNumber%', @CreationTimestamp, @CreationUserIdentifier, 1, 'en-GB', NULL),    
	(@PNROutputItemID + 4, 0, null, 1, 'X', '.  REFUND COMMISSION %Commission% %InvoiceNumber%', @CreationTimestamp, @CreationUserIdentifier, 1, 'en-GB', NULL),    
	(@PNROutputItemID + 5, 0, null, 1, 'X', 'REFUND PROCESSED %TicketNumber%', @CreationTimestamp, @CreationUserIdentifier, 1, 'en-GB', NULL),
	(@PNROutputItemID + 6, 0, null, 1, 'X', 'TKT NBR - %TicketNumber% CPNS %CouponNumber%', @CreationTimestamp, @CreationUserIdentifier, 1, 'en-GB', NULL)
    


	INSERT INTO PNROutputGroupPNROutputItem
    (PNROutputGroupId, PNROutputItemId, SequenceNumber, CreationTimestamp, CreationUserIdentifier, VersionNumber, DataStandardizationVersion, LayoutVersion)
VALUES
    (@PNROutputGroupID, @PNROutputItemID + 1, 0, @CreationTimeStamp, @CreationUserIdentifier, 1, 1, 1),
    (@PNROutputGroupID, @PNROutputItemID + 2, 0, @CreationTimeStamp, @CreationUserIdentifier, 1, 1, 1),
    (@PNROutputGroupID, @PNROutputItemID + 3, 0, @CreationTimeStamp, @CreationUserIdentifier, 1, 1, 1),
    (@PNROutputGroupID, @PNROutputItemID + 4, 0, @CreationTimeStamp, @CreationUserIdentifier, 1, 1, 1),
    (@PNROutputGroupID, @PNROutputItemID + 5, 0, @CreationTimeStamp, @CreationUserIdentifier, 1, 1, 1),
    (@PNROutputGroupID, @PNROutputItemID + 6, 0, @CreationTimeStamp, @CreationUserIdentifier, 1, 1, 1)

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

