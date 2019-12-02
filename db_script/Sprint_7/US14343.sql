USE Desktop_Test
GO

BEGIN TRAN
BEGIN TRY

	DECLARE @CreationTimestamp		DATETIME = GETUTCDATE()	
	DECLARE @CreationUserIdentifier NVARCHAR(170)
	DECLARE @PNROutputGroupID		INT
	DECLARE @PNROutputItemId		INT
	DECLARE @PNROutputRemarkGroupId		INT

	
	-----------------------
	-- ROLLBACK Scripts
	-----------------------
	SET @CreationUserIdentifier			= 'Amadeus CA Migration - US14343'
	DELETE FROM PNROutputGroupPNROutputItem WHERE CreationUserIdentifier = @CreationUserIdentifier
	DELETE FROM PNROutputItem WHERE CreationUserIdentifier = @CreationUserIdentifier
	DELETE FROM PNROutputPlaceHolder WHERE	CreationUserIdentifier = @CreationUserIdentifier

	----------------------------------
	-- Insert Scripts
	----------------------------------
	PRINT 'START Script'
		SET @CreationUserIdentifier			= 'Amadeus CA Migration - US14343'	
		SET @PNROutputItemId =	(SELECT MAX(PNROutputItemId)  FROM [PNROutputItem])
		SET @PNROutputGroupID =	(SELECT PNROutputGroupId  FROM PNROutputGroup Where PNROutputGroupName = 'Canada Migration BackOffice Group')
		SET @PNROutputRemarkGroupId = (SELECT MAX(PNROutputRemarkGroupId)  FROM PNROutputRemarkGroup)

		
		INSERT INTO [dbo].[PNROutputPlaceHolder]([PNROutputPlaceHolderName],[PNROutputPlaceHolderRegularExpresssion],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber])
									VALUES( '%HotelDate%', '([0-9]{2}[A-Z]{3})',@CreationTimestamp, @CreationUserIdentifier, 1 ),
										  ( '%HotelSavings%', '([A-Z]{1,2})',@CreationTimestamp, @CreationUserIdentifier, 1 ),	    
									      ( '%ChainCode%', '((\/\-CHN-[A-Z]{2})|(^$))',@CreationTimestamp, @CreationUserIdentifier, 1 )
										  
										
		 		
		INSERT INTO [dbo].[PNROutputItem]	([PNROutputItemId],[PNROutputRemarkTypeCode],[PNROutputBindingTypeCode], [PNROutputUpdateTypeCode],[GDSRemarkQualifier],[RemarkFormat],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber],[PNROutputItemDefaultLanguageCode],[PNROutputItemXMLFormat])
									VALUES	(@PNROutputItemId + 1,3,null,1,'','HS%HotelDate%/-SV-%HotelSavings%%ChainCode%', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),
											(@PNROutputItemId + 2,3,null,1,'','HS%HotelDate%%ChainCode%', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL)
											
		
		INSERT INTO [dbo].[PNROutputGroupPNROutputItem]	([PNROutputGroupId],[PNROutputItemId],[SequenceNumber],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber],[DataStandardizationVersion],[LayoutVersion])     
									VALUES	(@PNROutputGroupID, @PNROutputItemId + 1,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
											(@PNROutputGroupID, @PNROutputItemId + 2,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1')
											
						


	PRINT 'END Script'


	COMMIT TRAN
END TRY
	
BEGIN CATCH
ROLLBACK TRAN

	DECLARE @ErrorMessage NVARCHAR(4000);
	SELECT @ErrorMessage=ERROR_MESSAGE()
	RAISERROR(@ErrorMessage, 10, 1);

END CATCH

