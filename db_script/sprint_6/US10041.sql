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
	SET @CreationUserIdentifier			= 'Amadeus CA Migration - US10041'
	DELETE FROM PNROutputGroupPNROutputItem WHERE CreationUserIdentifier = @CreationUserIdentifier
	DELETE FROM PnrOutputCondition WHERE CreationUserIdentifier = @CreationUserIdentifier
	DELETE FROM PNROutputItem WHERE CreationUserIdentifier = @CreationUserIdentifier
	DELETE FROM PNROutputPlaceHolder WHERE	CreationUserIdentifier = @CreationUserIdentifier

	----------------------------------
	-- Insert Scripts
	----------------------------------
	PRINT 'START Script'
		SET @CreationUserIdentifier			= 'Amadeus CA Migration - US10041'	
		SET @PNROutputItemId =	(SELECT MAX(PNROutputItemId)  FROM [PNROutputItem])
		SET @PNROutputGroupID =	(SELECT PNROutputGroupId  FROM PNROutputGroup Where PNROutputGroupName = 'Canada Migration General Group')
		SET @PNROutputGroupID2 =	(SELECT PNROutputGroupId  FROM PNROutputGroup Where PNROutputGroupName = 'Canada Migration Itinerary Group')
		
		
		
		INSERT INTO [dbo].[PNROutputPlaceHolder]([PNROutputPlaceHolderName],[PNROutputPlaceHolderRegularExpresssion],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber])
									VALUES( '%CancelDate%', '([0-9]{2}[a-zA-Z]{3})',@CreationTimestamp, @CreationUserIdentifier, 1 ),
									( '%CancelRequestor%', '(.*)',@CreationTimestamp, @CreationUserIdentifier, 1 ),
									( '%CancelLineNo%', '([0-9]{1,2}|ALL|PRE)',@CreationTimestamp, @CreationUserIdentifier, 1 ),
									( '%CancelHotel%', '(HTL|NO HTL)',@CreationTimestamp, @CreationUserIdentifier, 1 ),
									( '%CancelTicket%', '([A-Z0-9\s]+)',@CreationTimestamp, @CreationUserIdentifier, 1 ),
									( '%CancelCoupon%', '([A-Z0-9\s]+)',@CreationTimestamp, @CreationUserIdentifier, 1 ),
									( '%CancelReasonAC%', '(.*)',@CreationTimestamp, @CreationUserIdentifier, 1 )
	    								  
		 		
		INSERT INTO [dbo].[PNROutputItem]	([PNROutputItemId],[PNROutputRemarkTypeCode],[PNROutputBindingTypeCode], [PNROutputUpdateTypeCode],[GDSRemarkQualifier],[RemarkFormat],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber],[PNROutputItemDefaultLanguageCode],[PNROutputItemXMLFormat])
									VALUES	(@PNROutputItemId + 1,0,'0',1,'X','%CancelDate%/CANCEL REQUESTED BY %CancelRequestor%', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),  
											(@PNROutputItemId + 2,0,'0',1,'X','%CancelDate%/%CancelHotel% SEGMENT INCLUDED IN CANCEL', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),
											(@PNROutputItemId + 3,0,'0',1,'X','%CancelDate%/CANCELLED/CXLD SEG-%CancelLineNo%', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),
											(@PNROutputItemId + 4,0,'0',1,'X','%CancelDate%/CANCEL NR DUE TO IROP OR SKD CHG', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),
											(@PNROutputItemId + 5,0,'0',1,'X','%CancelDate%/TKT NBR-%CancelTicket% CPNS-%CancelCoupon%', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),
											(@PNROutputItemId + 6,0,'0',1,'X','AC Refund Waiver Code - %CancelReasonAC%', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),
											(@PNROutputItemId + 7,1,'0',1,'X','*FULLCXL**%CancelDate%*', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL)

											
										
		INSERT INTO [dbo].[PNROutputGroupPNROutputItem]	([PNROutputGroupId],[PNROutputItemId],[SequenceNumber],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber],[DataStandardizationVersion],[LayoutVersion])     
									VALUES	(@PNROutputGroupID, @PNROutputItemId + 1,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
											(@PNROutputGroupID, @PNROutputItemId + 2,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
											(@PNROutputGroupID, @PNROutputItemId + 3,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
											(@PNROutputGroupID, @PNROutputItemId + 4,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
											(@PNROutputGroupID, @PNROutputItemId + 5,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
											(@PNROutputGroupID, @PNROutputItemId + 6,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
											(@PNROutputGroupID2, @PNROutputItemId + 7,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1')
											


		INSERT INTO [dbo].[PnrOutputCondition] (PNROutputItemId, PNROutputConditionName, PNROutputConditionValue, CreationTimestamp, CreationUserIdentifier, VersionNumber)
									VALUES	(@PNROutputItemId + 4 ,'CancelType', 'withIrop' ,@CreationTimestamp,@CreationUserIdentifier,1),
											(@PNROutputItemId + 7, 'CancelType', 'fullCancel' ,@CreationTimestamp,@CreationUserIdentifier,1)
											

	PRINT 'END Script'


	COMMIT TRAN
END TRY
	
BEGIN CATCH
ROLLBACK TRAN

	DECLARE @ErrorMessage NVARCHAR(4000);
	SELECT @ErrorMessage=ERROR_MESSAGE()
	RAISERROR(@ErrorMessage, 10, 1);

END CATCH

