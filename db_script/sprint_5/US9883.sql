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
	SET @CreationUserIdentifier			= 'Amadeus CA Migration - US9883'
	DELETE FROM PNROutputGroupPNROutputItem WHERE CreationUserIdentifier = @CreationUserIdentifier
	DELETE FROM PNROutputItem WHERE CreationUserIdentifier = @CreationUserIdentifier
	DELETE FROM PNROutputPlaceHolder WHERE	CreationUserIdentifier = @CreationUserIdentifier

	----------------------------------
	-- Insert Scripts
	----------------------------------
	PRINT 'START Script'
		SET @CreationUserIdentifier			= 'Amadeus CA Migration - US9883'	
		SET @PNROutputItemId =	(SELECT MAX(PNROutputItemId)  FROM [PNROutputItem])
		SET @PNROutputGroupID =	(SELECT PNROutputGroupId  FROM PNROutputGroup Where PNROutputGroupName = 'Canada Migration Itinerary Group')
		
		
		INSERT INTO [dbo].[PNROutputPlaceHolder]([PNROutputPlaceHolderName],[PNROutputPlaceHolderRegularExpresssion],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber])
									VALUES( '%ZZZAirlineCode%', '([A-Z0-9]{2})',@CreationTimestamp, @CreationUserIdentifier, 1 ),
									( '%ZZDepartureCity%', '([A-Z]{3})',@CreationTimestamp, @CreationUserIdentifier, 1 ),
									( '%ZZDestinationCity%', '([A-Z]{3})',@CreationTimestamp, @CreationUserIdentifier, 1 )
	    								  
		 		
		INSERT INTO [dbo].[PNROutputItem]	([PNROutputItemId],[PNROutputRemarkTypeCode],[PNROutputBindingTypeCode], [PNROutputUpdateTypeCode],[GDSRemarkQualifier],[RemarkFormat],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber],[PNROutputItemDefaultLanguageCode],[PNROutputItemXMLFormat])
									VALUES	(@PNROutputItemId + 1,1,'0',1,'','Flight is Confirmed with %ZZZAirlineCode%', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),  
										(@PNROutputItemId + 2,1,'0',1,'','Departure City is %ZZDepartureCity%', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),
										(@PNROutputItemId + 3,1,'0',1,'','Arrival City is %ZZDestinationCity%', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL)
										
		INSERT INTO [dbo].[PNROutputGroupPNROutputItem]	([PNROutputGroupId],[PNROutputItemId],[SequenceNumber],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber],[DataStandardizationVersion],[LayoutVersion])     
									VALUES	(@PNROutputGroupID, @PNROutputItemId + 1,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
											(@PNROutputGroupID, @PNROutputItemId + 2,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
											(@PNROutputGroupID, @PNROutputItemId + 3,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1')
											

	PRINT 'END Script'


	COMMIT TRAN
END TRY
	
BEGIN CATCH
ROLLBACK TRAN

	DECLARE @ErrorMessage NVARCHAR(4000);
	SELECT @ErrorMessage=ERROR_MESSAGE()
	RAISERROR(@ErrorMessage, 10, 1);

END CATCH

