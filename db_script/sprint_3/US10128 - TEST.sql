USE Desktop_Test
GO

BEGIN TRAN
BEGIN TRY

	DECLARE @CreationTimestamp		DATETIME = GETUTCDATE()	
	DECLARE @CreationUserIdentifier NVARCHAR(170)
	DECLARE @PNROutputItemId		    INT
	DECLARE @PNROutputGroupBackOfficeID	INT
	DECLARE @PNROutputGroupItinID		INT
	DECLARE @EBLine             		INT
	
	-----------------------
	-- ROLLBACK Scripts
	-----------------------
	SET @CreationUserIdentifier		   =   'Amadeus CA Migration - US100128'
	DELETE FROM PNROutputGroupPNROutputItem WHERE CreationUserIdentifier = @CreationUserIdentifier
	DELETE FROM PNROutputItem WHERE CreationUserIdentifier = @CreationUserIdentifier
	DELETE FROM PNROutputPlaceHolder WHERE	CreationUserIdentifier = @CreationUserIdentifier

	
	----------------------------------
	-- Insert Scripts
	----------------------------------
	PRINT 'START Script'
		SET @CreationUserIdentifier	   =    'Amadeus CA Migration - US100128'	
		SET @PNROutputItemId           =    (SELECT MAX(PNROutputItemId)  FROM [PNROutputItem])
		SET @EBLine = (Select PNROutputItemId from PNROutputItem where remarkformat = 'EB/-%TouchLevelCA%' and PNROutputUpdateTypeCode = 1)
		SET @PNROutputGroupItinID      =	(SELECT PNROutputGroupId  FROM [PNROutputGroup] Where PNROutputGroupName = 'Canada Migration Itinerary Group')
		SET @PNROutputGroupBackOfficeID          =	(SELECT PNROutputGroupId  FROM [PNROutputGroup] Where PNROutputGroupName = 'Canada Migration BackOffice Group')
		

		INSERT INTO [dbo].[PNROutputPlaceHolder]([PNROutputPlaceHolderName],[PNROutputPlaceHolderRegularExpresssion],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber])
									VALUES( '%RemarkDescription%', '(.*)',@CreationTimestamp, @CreationUserIdentifier, 1 ),
									      ( '%TotalTax%', '(.*)',@CreationTimestamp, @CreationUserIdentifier, 1 ),
										  ( '%TouchLevelCA%', '(.*)',@CreationTimestamp, @CreationUserIdentifier, 1 )
												
		 		
		INSERT INTO [dbo].[PNROutputItem]	([PNROutputItemId],[PNROutputRemarkTypeCode],[PNROutputBindingTypeCode], [PNROutputUpdateTypeCode],[GDSRemarkQualifier],[RemarkFormat],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber],[PNROutputItemDefaultLanguageCode],[PNROutputItemXMLFormat])
									VALUES  (@PNROutputItemId + 1,1,'S',1,'','PAID %RemarkDescription% CF-%ConfNbr% CAD%BaseAmt% PLUS %TotalTax% TAX ON %CCVendor%', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),
									        (@PNROutputItemId + 2,3,'0',1,'','EB/-%TouchLevelCA%', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL)

										          
		INSERT INTO [dbo].[PNROutputGroupPNROutputItem]	([PNROutputGroupId],[PNROutputItemId],[SequenceNumber],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber],[DataStandardizationVersion],[LayoutVersion])     
									VALUES	(@PNROutputGroupItinID,        @PNROutputItemId + 1,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
									        (@PNROutputGroupBackOfficeID ,    @PNROutputItemId + 2,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1')
									   


	PRINT 'END Script'


	COMMIT TRAN
END TRY
	
BEGIN CATCH
ROLLBACK TRAN

	DECLARE @ErrorMessage NVARCHAR(4000);
	SELECT @ErrorMessage=ERROR_MESSAGE()
	RAISERROR(@ErrorMessage, 10, 1);

END CATCH

