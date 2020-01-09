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
	SET @CreationUserIdentifier			= 'Amadeus CA Migration - US9901'
	DELETE FROM PNROutputGroupPNROutputItem WHERE CreationUserIdentifier = @CreationUserIdentifier
	DELETE FROM PNROutputItem WHERE CreationUserIdentifier = @CreationUserIdentifier
	DELETE FROM PNROutputPlaceHolder WHERE	CreationUserIdentifier = @CreationUserIdentifier

	----------------------------------
	-- Insert Scripts
	----------------------------------
	PRINT 'START Script'
		SET @CreationUserIdentifier			= 'Amadeus CA Migration - US9901'	
		SET @PNROutputItemId =	(SELECT MAX(PNROutputItemId)  FROM [PNROutputItem])
		SET @PNROutputGroupID =	(SELECT PNROutputGroupId  FROM PNROutputGroup Where PNROutputGroupName = 'Canada Migration General Group')
        SET @ItineraryGroupID =	(SELECT PNROutputGroupId  FROM PNROutputGroup Where PNROutputGroupName = 'Canada Migration Itinerary Group')
		SET @PNROutputRemarkGroupId = (SELECT MAX(PNROutputRemarkGroupId)  FROM PNROutputRemarkGroup)

		
		INSERT INTO [dbo].[PNROutputPlaceHolder]([PNROutputPlaceHolderName],[PNROutputPlaceHolderRegularExpresssion],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber])
									VALUES( '%EmailAddress%', '([a-zA-Z\*_-][/\w\.-]*[a-zA-Z0-9\*_-](?:#|@|//|Ø|Ö|¤)[a-zA-Z0-9][\w\.-]*[a-zA-Z0-9]\.[a-zA-Z][a-zA-Z\.]*[a-zA-Z][/A-Z]*)',@CreationTimestamp, @CreationUserIdentifier, 1 ),
									( '%Language%', '[A-Z]{2}-[A-Z]{2}',@CreationTimestamp, @CreationUserIdentifier, 1 ),
									( '%AdditionalLang%', '(.*)',@CreationTimestamp, @CreationUserIdentifier, 1 ),
									( '%DepartureCheck%', '(.*)',@CreationTimestamp, @CreationUserIdentifier, 1 ),
									( '%Service%', '(.*)',@CreationTimestamp, @CreationUserIdentifier, 1 ),
									( '%Ticket%', '(.*)',@CreationTimestamp, @CreationUserIdentifier, 1 ),
									( '%Offer%', '(.*)',@CreationTimestamp, @CreationUserIdentifier, 1 )
	    								  
		 		
		INSERT INTO [dbo].[PNROutputItem]	([PNROutputItemId],[PNROutputRemarkTypeCode],[PNROutputBindingTypeCode], [PNROutputUpdateTypeCode],[GDSRemarkQualifier],[RemarkFormat],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber],[PNROutputItemDefaultLanguageCode],[PNROutputItemXMLFormat])
									VALUES	(@PNROutputItemId + 1,0,'0',1,'Z','CONF*SEND TO MAIL %EmailAddress%', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),
										(@PNROutputItemId + 2,0,'0',1,'Z','LANGUAGE-%Language%', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),
										(@PNROutputItemId + 3,0,'0',1,'Z','CONF*LANG:%AdditionalLang%', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),
										(@PNROutputItemId + 4,0,'0',1,'Q','EMAIL ADD-NO', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),
										(@PNROutputItemId + 5,0,'0',1,'T','TKT1-%DepartureCheck%', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),
										(@PNROutputItemId + 6,1,'0',1,'','*SERVICE**%Service%*', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),  
										(@PNROutputItemId + 7,1,'0',1,'','*TICKET**%Ticket%*', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),
										(@PNROutputItemId + 8,1,'0',1,'','*OFFER**%Offer%*', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL) 
		
		INSERT INTO [dbo].[PNROutputGroupPNROutputItem]	([PNROutputGroupId],[PNROutputItemId],[SequenceNumber],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber],[DataStandardizationVersion],[LayoutVersion])     
									VALUES	(@PNROutputGroupID, @PNROutputItemId + 1,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
											(@PNROutputGroupID, @PNROutputItemId + 2,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
											(@PNROutputGroupID, @PNROutputItemId + 3,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
											(@PNROutputGroupID, @PNROutputItemId + 4,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
											(@PNROutputGroupID, @PNROutputItemId + 5,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
											(@ItineraryGroupID, @PNROutputItemId + 6,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
											(@ItineraryGroupID, @PNROutputItemId + 7,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
											(@ItineraryGroupID, @PNROutputItemId + 8,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1')


	PRINT 'END Script'


	COMMIT TRAN
END TRY
	
BEGIN CATCH
ROLLBACK TRAN

	DECLARE @ErrorMessage NVARCHAR(4000);
	SELECT @ErrorMessage=ERROR_MESSAGE()
	RAISERROR(@ErrorMessage, 10, 1);

END CATCH

