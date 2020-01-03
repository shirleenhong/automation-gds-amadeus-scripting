USE Desktop_Test
GO

BEGIN TRAN
BEGIN TRY

	DECLARE @CreationTimestamp		DATETIME = GETUTCDATE()	
	DECLARE @CreationUserIdentifier NVARCHAR(170)
	DECLARE @PNROutputGroupID		INT
	DECLARE @PNROutputItemId		INT
	DECLARE @PNROutputRemarkGroupId		INT
	DECLARE @ItineraryGroupID		INT
	

	
	-----------------------
	-- ROLLBACK Scripts
	-----------------------
	SET @CreationUserIdentifier			= 'Amadeus CA Migration - US11386'
	DELETE FROM [PnrOutputCondition] WHERE CreationUserIdentifier = @CreationUserIdentifier
	DELETE FROM PNROutputGroupPNROutputItem WHERE CreationUserIdentifier = @CreationUserIdentifier
	DELETE FROM PNROutputItem WHERE CreationUserIdentifier = @CreationUserIdentifier
	
	----------------------------------
	-- Insert Scripts
	----------------------------------
	PRINT 'START Script'
		SET @CreationUserIdentifier			= 'Amadeus CA Migration - US11386'	
		SET @PNROutputItemId =	(SELECT MAX(PNROutputItemId)  FROM [PNROutputItem])
		SET @PNROutputGroupID =	(SELECT PNROutputGroupId  FROM PNROutputGroup Where PNROutputGroupName = 'Canada Migration General Group')						  
		 		
		INSERT INTO [dbo].[PNROutputItem]	([PNROutputItemId],[PNROutputRemarkTypeCode],[PNROutputBindingTypeCode], [PNROutputUpdateTypeCode],[GDSRemarkQualifier],[RemarkFormat],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber],[PNROutputItemDefaultLanguageCode],[PNROutputItemXMLFormat])
									VALUES	(@PNROutputItemId + 1,1,'0',1,'M','ONHOLD:AWAITING APPROVAL', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL)
		
		INSERT INTO [dbo].[PNROutputGroupPNROutputItem]	([PNROutputGroupId],[PNROutputItemId],[SequenceNumber],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber],[DataStandardizationVersion],[LayoutVersion])     
									VALUES	(@PNROutputGroupID, @PNROutputItemId + 1,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1')
											
		INSERT INTO [dbo].[PnrOutputCondition](PNROutputItemId,PNROutputConditionName,PNROutputConditionValue,CreationTimestamp,CreationUserIdentifier,VersionNumber)
			VALUES(@PNROutputItemId + 1, 'isOnHold', 'true', @CreationTimestamp, @CreationUserIdentifier, 1)

	PRINT 'END Script'


	COMMIT TRAN
END TRY
	
BEGIN CATCH
ROLLBACK TRAN

	DECLARE @ErrorMessage NVARCHAR(4000);
	SELECT @ErrorMessage=ERROR_MESSAGE()
	RAISERROR(@ErrorMessage, 10, 1);

END CATCH

