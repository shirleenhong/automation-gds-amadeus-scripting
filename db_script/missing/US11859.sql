USE Desktop_Test
GO

BEGIN TRAN
BEGIN TRY

	DECLARE @CreationTimestamp		DATETIME = GETUTCDATE()	
	DECLARE @CreationUserIdentifier NVARCHAR(170)
	DECLARE @PNROutputGroupID		INT
	DECLARE @PNROutputItemId		INT
	DECLARE @PNROutputGroupIDIti		INT
	DECLARE @PNROutputRemarkGroupId		INT
	

	
	-----------------------
	-- ROLLBACK Scripts
	-----------------------
	SET @CreationUserIdentifier			= 'Amadeus CA Migration - US11859'
	DELETE FROM [PNROutputRemarkGroupPNROutputItem] WHERE CreationUserIdentifier = @CreationUserIdentifier
	DELETE FROM PNROutputRemarkGroup WHERE CreationUserIdentifier = @CreationUserIdentifier
	DELETE FROM PNROutputGroupPNROutputItem WHERE CreationUserIdentifier = @CreationUserIdentifier
	DELETE FROM PNROutputItem WHERE CreationUserIdentifier = @CreationUserIdentifier
	DELETE FROM [PNROutputPlaceHolder] WHERE CreationUserIdentifier = @CreationUserIdentifier
	
	----------------------------------
	-- Insert Scripts
	----------------------------------
	PRINT 'START Script'
		SET @CreationUserIdentifier			= 'Amadeus CA Migration - US11859'	
		SET @PNROutputItemId =	(SELECT MAX(PNROutputItemId)  FROM [PNROutputItem])
		SET @PNROutputGroupID =	(SELECT PNROutputGroupId  FROM PNROutputGroup Where PNROutputGroupName = 'Canada Migration General Group')						  
		SET @PNROutputGroupIDIti =	(SELECT PNROutputGroupId  FROM PNROutputGroup Where PNROutputGroupName = 'Canada Migration Itinerary Group')						  
		SET @PNROutputRemarkGroupId = (SELECT MAX(PNROutputRemarkGroupId)  FROM PNROutputRemarkGroup)

		INSERT INTO [dbo].[PNROutputPlaceHolder]([PNROutputPlaceHolderName],[PNROutputPlaceHolderRegularExpresssion],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber])
									VALUES( '%GlCode%', '([0-9]{6})',@CreationTimestamp, @CreationUserIdentifier, 1 ),
									( '%RlnNo%', '([0-9]{1,2})',@CreationTimestamp, @CreationUserIdentifier, 1 )
	    

		INSERT INTO [dbo].[PNROutputItem]	([PNROutputItemId],[PNROutputRemarkTypeCode],[PNROutputBindingTypeCode], [PNROutputUpdateTypeCode],[GDSRemarkQualifier],[RemarkFormat],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber],[PNROutputItemDefaultLanguageCode],[PNROutputItemXMLFormat])
									VALUES	(@PNROutputItemId + 1,0,'0',1,'','*REC/-RLN-%RlnNo%/-RF-%PAXLastName%-%PAXFirstName%/-AMT-%TotalCost%', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),
									(@PNROutputItemId + 2,0,'0',1,'','*REC/-RLN-%RlnNo%/-FOP-CC%CCVendor%%CCNo%/-EXP-%CCExp%/-LK-T/-BA-%GlCode%', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),
									(@PNROutputItemId + 3,0,'0',1,'','*REC/-RLN-%RlnNo%/-GL-124000/-RM-TICKET PURCHASE BILLED TO CREDIT CARD', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL)
		
		INSERT INTO [dbo].[PNROutputGroupPNROutputItem]	([PNROutputGroupId],[PNROutputItemId],[SequenceNumber],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber],[DataStandardizationVersion],[LayoutVersion])     
									VALUES	(@PNROutputGroupID, @PNROutputItemId + 1,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
									(@PNROutputGroupID, @PNROutputItemId + 2,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
									(@PNROutputGroupID, @PNROutputItemId + 3,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1')
		
		INSERT INTO dbo.PNROutputRemarkGroup(PNROutputRemarkGroupId, PNROutputRemarkGroupName, CreationTimestamp, CreationUserIdentifier, LastUpdateTimestamp, LastUpdateUserIdentifier, VersionNumber,       PNROutputRemarkGroupKey) 
              VALUES (@PNROutputRemarkGroupId + 1, 'CACorpReceipt', @CreationTimestamp,  @CreationUserIdentifier, NULL, NULL, 1,NULL)

                                                                           
        INSERT INTO [dbo].[PNROutputRemarkGroupPNROutputItem]([PNROutputRemarkGroupId],PNROutputItemId,[CreationTimestamp],[CreationUserIdentifier],[VersionNumber])
               VALUES(@PNROutputRemarkGroupId + 1 ,@PNROutputItemId + 1,@CreationTimestamp,@CreationUserIdentifier,1),
                     (@PNROutputRemarkGroupId + 1 ,@PNROutputItemId + 2,@CreationTimestamp,@CreationUserIdentifier,1),
                     (@PNROutputRemarkGroupId + 1 ,@PNROutputItemId + 3,@CreationTimestamp,@CreationUserIdentifier,1)		
		
	PRINT 'END Script'


	COMMIT TRAN
END TRY
	
BEGIN CATCH
ROLLBACK TRAN

	DECLARE @ErrorMessage NVARCHAR(4000);
	SELECT @ErrorMessage=ERROR_MESSAGE()
	RAISERROR(@ErrorMessage, 10, 1);

END CATCH

