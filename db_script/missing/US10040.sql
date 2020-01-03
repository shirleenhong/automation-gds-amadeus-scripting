USE Desktop_Test
GO

BEGIN TRAN
BEGIN TRY

	DECLARE @CreationTimestamp		DATETIME = GETUTCDATE()	
	DECLARE @CreationUserIdentifier NVARCHAR(170)
	DECLARE @PNROutputGroupID		INT
	DECLARE @PNROutputItemId		INT
	DECLARE @PNROutputGroupIDIti		INT
	

	
	-----------------------
	-- ROLLBACK Scripts
	-----------------------
	SET @CreationUserIdentifier			= 'Amadeus CA Migration - US10040'
	DELETE FROM [PnrOutputCondition] WHERE CreationUserIdentifier = @CreationUserIdentifier
	DELETE FROM PNROutputGroupPNROutputItem WHERE CreationUserIdentifier = @CreationUserIdentifier
	DELETE FROM PNROutputItem WHERE CreationUserIdentifier = @CreationUserIdentifier
	DELETE FROM [PNROutputPlaceHolder] WHERE CreationUserIdentifier = @CreationUserIdentifier
	
	----------------------------------
	-- Insert Scripts
	----------------------------------
	PRINT 'START Script'
		SET @CreationUserIdentifier			= 'Amadeus CA Migration - US10040'	
		SET @PNROutputItemId =	(SELECT MAX(PNROutputItemId)  FROM [PNROutputItem])
		SET @PNROutputGroupID =	(SELECT PNROutputGroupId  FROM PNROutputGroup Where PNROutputGroupName = 'Canada Migration General Group')						  
		SET @PNROutputGroupIDIti =	(SELECT PNROutputGroupId  FROM PNROutputGroup Where PNROutputGroupName = 'Canada Migration Itinerary Group')						  
		
		INSERT INTO [dbo].[PNROutputPlaceHolder]([PNROutputPlaceHolderName],[PNROutputPlaceHolderRegularExpresssion],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber])
									VALUES( '%CountryVisaPassportRequires%', '([A-Z]+)',@CreationTimestamp, @CreationUserIdentifier, 1 ),
									( '%CountryVisaRequires%', '([A-Z]+)',@CreationTimestamp, @CreationUserIdentifier, 1 ),
									( '%PassportName%', '([A-Z]+)',@CreationTimestamp, @CreationUserIdentifier, 1 )
	    

		INSERT INTO [dbo].[PNROutputItem]	([PNROutputItemId],[PNROutputRemarkTypeCode],[PNROutputBindingTypeCode], [PNROutputUpdateTypeCode],[GDSRemarkQualifier],[RemarkFormat],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber],[PNROutputItemDefaultLanguageCode],[PNROutputItemXMLFormat])
									VALUES	(@PNROutputItemId + 1,0,'0',1,'','ADVISED %PassportName% VALID PASSPORT IS REQUIRED', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),
									(@PNROutputItemId + 2,0,'0',1,'','INTERNATIONAL TRAVEL ADVISORY SENT', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),
									(@PNROutputItemId + 3,1,'S',1,'','%CountryVisaRequires% - A VALID PASSPORT IS REQUIRED', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),
									(@PNROutputItemId + 4,1,'S',1,'','%CountryVisaPassportRequires% - A VALID PASSPORT AND VISA ARE REQUIRED', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL)
		
		INSERT INTO [dbo].[PNROutputGroupPNROutputItem]	([PNROutputGroupId],[PNROutputItemId],[SequenceNumber],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber],[DataStandardizationVersion],[LayoutVersion])     
									VALUES	(@PNROutputGroupID, @PNROutputItemId + 1,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
									(@PNROutputGroupID, @PNROutputItemId + 2,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
									(@PNROutputGroupIDIti, @PNROutputItemId + 3,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
									(@PNROutputGroupIDIti, @PNROutputItemId + 4,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1')
											
		INSERT INTO [dbo].[PnrOutputCondition](PNROutputItemId,PNROutputConditionName,PNROutputConditionValue,CreationTimestamp,CreationUserIdentifier,VersionNumber)
			VALUES(@PNROutputItemId + 2, 'InternationalTravelSent', 'true', @CreationTimestamp, @CreationUserIdentifier, 1)

	PRINT 'END Script'


	COMMIT TRAN
END TRY
	
BEGIN CATCH
ROLLBACK TRAN

	DECLARE @ErrorMessage NVARCHAR(4000);
	SELECT @ErrorMessage=ERROR_MESSAGE()
	RAISERROR(@ErrorMessage, 10, 1);

END CATCH

