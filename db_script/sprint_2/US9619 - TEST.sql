USE Desktop_Test
GO

BEGIN TRAN
BEGIN TRY

	DECLARE @CreationTimestamp		DATETIME = GETUTCDATE()	
	DECLARE @CreationUserIdentifier NVARCHAR(170)
	DECLARE @PNROutputGroupID		INT
	DECLARE @PNROutputItemId		INT
	DECLARE @PNROutputRemarkGroupId	INT
	DECLARE @InvoiceGroup           INT
	
	-----------------------
	-- ROLLBACK Scripts
	-----------------------
	SET @CreationUserIdentifier			= 'Amadeus CA Migration - US9619'
	DELETE FROM PnrOutputCondition WHERE CreationUserIdentifier = @CreationUserIdentifier
	DELETE FROM PNROutputGroupPNROutputItem WHERE CreationUserIdentifier = @CreationUserIdentifier
	DELETE FROM PNROutputGroup WHERE CreationUserIdentifier = @CreationUserIdentifier
	DELETE FROM PNROutputGroupCountry WHERE CreationUserIdentifier = @CreationUserIdentifier
	DELETE FROM PNROutputItemLanguage WHERE CreationUserIdentifier = @CreationUserIdentifier
	DELETE FROM PNROutputItem WHERE CreationUserIdentifier = @CreationUserIdentifier
	DELETE FROM PNROutputPlaceHolder WHERE	CreationUserIdentifier = @CreationUserIdentifier

	
	----------------------------------
	-- Insert Scripts
	----------------------------------
	PRINT 'START Script'
		SET @CreationUserIdentifier			= 'Amadeus CA Migration - US9619'	
		SET @PNROutputItemId  =	(SELECT MAX(PNROutputItemId)
FROM [PNROutputItem])
		SET @PNROutputGroupID =	(SELECT MAX(PNROutputGroupId)
FROM [PNROutputGroup])
		SET @PNROutputGroupID =	(SELECT PNROutputGroupID
FROM [PNROutputGroup]
Where PNROutputGroupName = 'Canada Migration General Group')

		INSERT INTO [dbo].[PNROutputPlaceHolder]
	([PNROutputPlaceHolderName],[PNROutputPlaceHolderRegularExpresssion],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber])
VALUES( '%SupFeeInfo%', '(([A-Z]{3})(\d+\.?\d+)?(\/?))+$', @CreationTimestamp, @CreationUserIdentifier, 1 ),
	( '%SupFeeTicketId%', '[0-9]{1,2}', @CreationTimestamp, @CreationUserIdentifier, 1 )
													
		INSERT INTO [dbo].[PNROutputItem]
	([PNROutputItemId],[PNROutputRemarkTypeCode],[PNROutputBindingTypeCode], [PNROutputUpdateTypeCode],[GDSRemarkQualifier],[RemarkFormat],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber],[PNROutputItemDefaultLanguageCode],[PNROutputItemXMLFormat])
VALUES
	(@PNROutputItemId + 1, 0, 'S', 1, 'F', 'SUPFEE%SupFeeTicketId%-%SupFeeInfo%', @CreationTimestamp, @CreationUserIdentifier, 1, 'en-GB', NULL)
										          
		INSERT INTO [dbo].[PNROutputGroupPNROutputItem]
	([PNROutputGroupId],[PNROutputItemId],[SequenceNumber],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber],[DataStandardizationVersion],[LayoutVersion])
VALUES
	(@PNROutputGroupID, @PNROutputItemId + 1, 0, @CreationTimestamp, @CreationUserIdentifier, 1, '1', '1')

	PRINT 'END Script'


	COMMIT TRAN
END TRY
	
BEGIN CATCH
ROLLBACK TRAN

	DECLARE @ErrorMessage NVARCHAR(4000);
	SELECT @ErrorMessage=ERROR_MESSAGE()
	RAISERROR(@ErrorMessage, 10, 1);

END CATCH

