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
	SET @CreationUserIdentifier			= 'Amadeus CA Migration - US16315'
	--Select * FROM PNROutputPlaceHolder WHERE	PNROutputPlaceHolderName like '%queue%' CreationUserIdentifier = @CreationUserIdentifier


	DELETE FROM PNROutputGroupPNROutputItem WHERE CreationUserIdentifier = @CreationUserIdentifier
	DELETE FROM PNROutputItem WHERE CreationUserIdentifier = @CreationUserIdentifier
	DELETE FROM PNROutputPlaceHolder WHERE	CreationUserIdentifier = @CreationUserIdentifier

	----------------------------------
	-- Insert Scripts
	----------------------------------
	PRINT 'START Script'
		SET @CreationUserIdentifier			= 'Amadeus CA Migration - US16315'	
		SET @PNROutputItemId =	(SELECT MAX(PNROutputItemId)  FROM [PNROutputItem])
		SET @PNROutputGroupID =	(SELECT PNROutputGroupId  FROM PNROutputGroup Where PNROutputGroupName = 'Canada Migration BackOffice Group')
		SET @PNROutputRemarkGroupId = (SELECT MAX(PNROutputRemarkGroupId)  FROM PNROutputRemarkGroup)

		
		INSERT INTO [dbo].[PNROutputPlaceHolder]([PNROutputPlaceHolderName],[PNROutputPlaceHolderRegularExpresssion],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber])
									VALUES( '%ConsultantName%', '(.*)',@CreationTimestamp, @CreationUserIdentifier, 1 ),											
									      ( '%CNNumber%', '(.*)',@CreationTimestamp, @CreationUserIdentifier, 1 ),
										  ( '%ConsultantOid%', '(.*)',@CreationTimestamp, @CreationUserIdentifier, 1 ),	    
									     -- ( '%Queue%', '(.*)',@CreationTimestamp, @CreationUserIdentifier, 1 ),
										   ( '%IrdDate%', '(.*)',@CreationTimestamp, @CreationUserIdentifier, 1 ),
										  ( '%%CFANumber%%', '(.*)',@CreationTimestamp, @CreationUserIdentifier, 1 ),
									( '%FareRequest%', '(.*)',@CreationTimestamp, @CreationUserIdentifier, 1 ),
											  ( '%AirFlexibility%', '(.*)',@CreationTimestamp, @CreationUserIdentifier, 1 ),
											   ( '%DateFlexibilty%', '(.*)',@CreationTimestamp, @CreationUserIdentifier, 1 ),
											    ( '%ScheduleFlexibility%', '(.*)',@CreationTimestamp, @CreationUserIdentifier, 1 ),
												 ( '%Stop1%', '(.*)',@CreationTimestamp, @CreationUserIdentifier, 1 ),
										 ( '%Stop2%', '(.*)',@CreationTimestamp, @CreationUserIdentifier, 1 ),
										 ( '%Stop3%', '(.*)',@CreationTimestamp, @CreationUserIdentifier, 1 ),
										  ( '%Stop4%', '(.*)',@CreationTimestamp, @CreationUserIdentifier, 1 )
									
												
										  
										
		 		
		INSERT INTO [dbo].[PNROutputItem]	([PNROutputItemId],[PNROutputRemarkTypeCode],[PNROutputBindingTypeCode], [PNROutputUpdateTypeCode],[GDSRemarkQualifier],[RemarkFormat],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber],[PNROutputItemDefaultLanguageCode],[PNROutputItemXMLFormat])
									VALUES	(@PNROutputItemId + 1,0,'0',1,'E','FROM-%ConsultantName% CN-%CNNumber%', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),
											(@PNROutputItemId + 2,0,'0',1,'E','Date-%IrdDate% OID-%ConsultantOid%  Agent Queue/Category – %IRDQueue% CFA-%CFANumber%', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),
											(@PNROutputItemId + 3,0,'0',1,'E','Type of Fare - %FareRequest%', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),
											(@PNROutputItemId + 4,0,'0',1,'E','Pax Airline Flex - %AirFlexibility%', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),
											(@PNROutputItemId + 5,0,'0',1,'E','Pax Date Flex - %DateFlexibilty%', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),
											(@PNROutputItemId + 6,0,'0',1,'E','Pax Schedule Flex - %ScheduleFlexibility%', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),
											(@PNROutputItemId + 7,0,'0',1,'E','Stopovers - %Stop1%*%Stop2%*%Stop3%*%Stop4%', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL)
								
											
		
		INSERT INTO [dbo].[PNROutputGroupPNROutputItem]	([PNROutputGroupId],[PNROutputItemId],[SequenceNumber],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber],[DataStandardizationVersion],[LayoutVersion])     
									VALUES	(@PNROutputGroupID, @PNROutputItemId + 1,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
											(@PNROutputGroupID, @PNROutputItemId + 2,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
											(@PNROutputGroupID, @PNROutputItemId + 3,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
											(@PNROutputGroupID, @PNROutputItemId + 4,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
											(@PNROutputGroupID, @PNROutputItemId + 5,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
											(@PNROutputGroupID, @PNROutputItemId + 6,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
											(@PNROutputGroupID, @PNROutputItemId + 7,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1')
											
						


	PRINT 'END Script'


	ROLLBACK TRAN
END TRY
	
BEGIN CATCH
ROLLBACK TRAN

	DECLARE @ErrorMessage NVARCHAR(4000);
	SELECT @ErrorMessage=ERROR_MESSAGE()
	RAISERROR(@ErrorMessage, 10, 1);

END CATCH

