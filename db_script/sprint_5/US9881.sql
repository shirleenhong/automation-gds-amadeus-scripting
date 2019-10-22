USE Desktop_Test
GO

BEGIN TRAN
BEGIN TRY

	DECLARE @CreationTimestamp		DATETIME = GETUTCDATE()	
	DECLARE @CreationUserIdentifier NVARCHAR(170)
	DECLARE @PNROutputGroupID		INT
	DECLARE @PNROutputGroupID2		INT
	DECLARE @PNROutputItemId		INT
	DECLARE @PNROutputRemarkGroupId		INT
	
	
	-----------------------
	-- ROLLBACK Scripts
	-----------------------
	SET @CreationUserIdentifier			= 'Amadeus CA Migration - US9881'
	DELETE FROM PNROutputGroupPNROutputItem WHERE CreationUserIdentifier = @CreationUserIdentifier
	DELETE FROM PNROutputItem WHERE CreationUserIdentifier = @CreationUserIdentifier
	DELETE FROM PNROutputPlaceHolder WHERE	CreationUserIdentifier = @CreationUserIdentifier

	----------------------------------
	-- Insert Scripts
	----------------------------------
	PRINT 'START Script'
		SET @CreationUserIdentifier			= 'Amadeus CA Migration - US9881'	
		SET @PNROutputItemId =	(SELECT MAX(PNROutputItemId)  FROM [PNROutputItem])
		SET @PNROutputGroupID =	(SELECT PNROutputGroupId  FROM PNROutputGroup Where PNROutputGroupName = 'Canada Migration Itinerary Group')
		SET @PNROutputGroupID2 =	(SELECT PNROutputGroupId  FROM PNROutputGroup Where PNROutputGroupName = 'Canada Migration General Group')
		
		
		INSERT INTO [dbo].[PNROutputPlaceHolder]([PNROutputPlaceHolderName],[PNROutputPlaceHolderRegularExpresssion],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber])
									VALUES( '%RoomConfrimedWith%', '(.*)',@CreationTimestamp, @CreationUserIdentifier, 1 ),
									( '%RoomAdditionalInfo%', '(.*)',@CreationTimestamp, @CreationUserIdentifier, 1 ),
									( '%RoomDatePipe%', '([0-9]{2}[a-zA-Z]{3})',@CreationTimestamp, @CreationUserIdentifier, 1 ),
									( '%RoomChainCode%', '(.*)',@CreationTimestamp, @CreationUserIdentifier, 1 )
	    								  
		 		
		INSERT INTO [dbo].[PNROutputItem]	([PNROutputItemId],[PNROutputRemarkTypeCode],[PNROutputBindingTypeCode], [PNROutputUpdateTypeCode],[GDSRemarkQualifier],[RemarkFormat],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber],[PNROutputItemDefaultLanguageCode],[PNROutputItemXMLFormat])
									VALUES	(@PNROutputItemId + 1,1,'0',1,'','ROOM CONFIRMED WITH - %RoomConfrimedWith%', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),  
											(@PNROutputItemId + 2,1,'0',1,'','ADDITONAL INFORMATION - %RoomAdditionalInfo%', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),
											(@PNROutputItemId + 3,0,'0',1,'*','HS%RoomDatePipe%/-CHN-%RoomChainCode%', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL)
										
		INSERT INTO [dbo].[PNROutputGroupPNROutputItem]	([PNROutputGroupId],[PNROutputItemId],[SequenceNumber],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber],[DataStandardizationVersion],[LayoutVersion])     
									VALUES	(@PNROutputGroupID, @PNROutputItemId + 1,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
											(@PNROutputGroupID, @PNROutputItemId + 2,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
											(@PNROutputGroupID2, @PNROutputItemId + 3,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1')
											

	PRINT 'END Script'


	COMMIT TRAN
END TRY
	
BEGIN CATCH
ROLLBACK TRAN

	DECLARE @ErrorMessage NVARCHAR(4000);
	SELECT @ErrorMessage=ERROR_MESSAGE()
	RAISERROR(@ErrorMessage, 10, 1);

END CATCH

