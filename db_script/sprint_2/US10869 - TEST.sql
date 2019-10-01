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
	SET @CreationUserIdentifier			= 'Amadeus CA Migration - US10869'
	DELETE FROM PNROutputRemarkGroupPNROutputItem WHERE	CreationUserIdentifier = @CreationUserIdentifier
	DELETE FROM PNROutputRemarkGroup WHERE	CreationUserIdentifier = @CreationUserIdentifier
	DELETE FROM PnrOutputCondition WHERE CreationUserIdentifier = @CreationUserIdentifier
	DELETE FROM PNROutputGroupPNROutputItem WHERE CreationUserIdentifier = @CreationUserIdentifier
	DELETE FROM PNROutputGroupCountry WHERE CreationUserIdentifier = @CreationUserIdentifier
	DELETE FROM PNROutputItemLanguage WHERE CreationUserIdentifier = @CreationUserIdentifier
	DELETE FROM PNROutputGroup WHERE CreationUserIdentifier = @CreationUserIdentifier
	DELETE FROM PNROutputItem WHERE CreationUserIdentifier = @CreationUserIdentifier
	DELETE FROM PNROutputPlaceHolder WHERE	CreationUserIdentifier = @CreationUserIdentifier

	----------------------------------
	-- Insert Scripts
	----------------------------------
	PRINT 'START Script'
		SET @CreationUserIdentifier			= 'Amadeus CA Migration - US10869'	
		SET @PNROutputItemId =	(SELECT MAX(PNROutputItemId)  FROM [PNROutputItem])
		SET @PNROutputGroupID =	(SELECT MAX(PNROutputGroupId)  FROM [PNROutputGroup])
		SET @PNROutputRemarkGroupId = (SELECT MAX(PNROutputRemarkGroupId)  FROM PNROutputRemarkGroup)
		

		INSERT INTO [dbo].[PNROutputPlaceHolder]([PNROutputPlaceHolderName],[PNROutputPlaceHolderRegularExpresssion],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber])
									VALUES( '%PassName%', '(.*)',@CreationTimestamp, @CreationUserIdentifier, 1 ),
										  ( '%PassNameNonAc%', '(.*)',@CreationTimestamp, @CreationUserIdentifier, 1 ),
									      ( '%FareType%', '(.*)',@CreationTimestamp, @CreationUserIdentifier, 1 ),
										  ( '%TktRemarkNbr%', '([0-9]{1,2})',@CreationTimestamp, @CreationUserIdentifier, 1 ),
										  ( '%TktNbr%', '([0-9]+)',@CreationTimestamp, @CreationUserIdentifier, 1 ),
										  ( '%SupplierCode%', '([A-Z0-9]{3})',@CreationTimestamp, @CreationUserIdentifier, 1 ),
										  ( '%BaseAmt%', '([0-9]*\.{0,1}[0-9]{0,2})',@CreationTimestamp, @CreationUserIdentifier, 1 ),
										  ( '%Gst%', '([0-9]*\.{0,1}[0-9]{0,2})',@CreationTimestamp, @CreationUserIdentifier, 1 ),
										  ( '%Hst%', '([0-9]*\.{0,1}[0-9]{0,2})',@CreationTimestamp, @CreationUserIdentifier, 1 ),
										  ( '%Qst%', '([0-9]*\.{0,1}[0-9]{0,2})',@CreationTimestamp, @CreationUserIdentifier, 1 ),
										  ( '%Comm%', '([0-9]*\.{0,1}[0-9]{0,2})',@CreationTimestamp, @CreationUserIdentifier, 1 ),
										  ( '%AirlineCode%', '([A-Z0-9]{2})',@CreationTimestamp, @CreationUserIdentifier, 1 ),
										  ( '%TotalCost%', '([0-9]*\.{0,1}[0-9]{0,2})',@CreationTimestamp, @CreationUserIdentifier, 1 ),
										  ( '%OthTax%', '(.*)',@CreationTimestamp, @CreationUserIdentifier, 1 )
										
		
		select * from [PNROutputPlaceHolder] where [PNROutputPlaceHolderName] = '%SupplierCode%'
		 		
		INSERT INTO [dbo].[PNROutputItem]	([PNROutputItemId],[PNROutputRemarkTypeCode],[PNROutputBindingTypeCode], [PNROutputUpdateTypeCode],[GDSRemarkQualifier],[RemarkFormat],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber],[PNROutputItemDefaultLanguageCode],[PNROutputItemXMLFormat])
									VALUES	(@PNROutputItemId + 1,1,'S',1,'','%PassName% PASS-%FareType%', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),
											(@PNROutputItemId + 2,1,'S',1,'','%PassNameNonAc% PASS', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),
											(@PNROutputItemId + 3,0,'S',1,'T','TKT%TktRemarkNbr%-VEN/TK-%TktNbr%/VN-%SupplierCode%', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),
											(@PNROutputItemId + 4,0,'S',1,'T','TKT%TktRemarkNbr%-VEN/VN-%SupplierCode%', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),
											(@PNROutputItemId + 5,0,'S',1,'T','TKT%TktRemarkNbr%-BA-%BaseAmt%/TX1-%Gst%XG/TX2-%Hst%RC/TX3-%Qst%XQ/TX4-%OthTax%XT/COMM-%Comm%', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),
											(@PNROutputItemId + 6,0,'0',1,'F','LCC-%AirlineCode%*GRAND TOTAL CAD %TotalCost%', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),
											(@PNROutputItemId + 7,3,'0',1,'','U14/-%AirlineCode%PASS-INDIVIDUAL', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),
											(@PNROutputItemId + 8,1,'0',1,'','ALL DETAILS DISCUSSED AND', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),
											(@PNROutputItemId + 9,1,'0',1,'','APPROVED BY CLIENT.', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),
											(@PNROutputItemId + 10,1,'0',1,'','CHARGE TO CLIENTS CREDIT CARD', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),
											(@PNROutputItemId + 11,1,'0',1,'','AUTHORIZED BY CLIENT.', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL)

		INSERT INTO [dbo].[PNROutputGroup] (PNROutputGroupId,InheritFromParentFlag,PNROutputTypeID,GDSCode,PNROutputGroupName,EnabledFlag, DeletedFlag,CreationTimestamp,CreationUserIdentifier,VersionNumber)
								VALUES	(@PNROutputGroupID + 1, 1, 1,'1A','Canada Migration Application Group',1,0, @CreationTimestamp,@CreationUserIdentifier,1),				
										(@PNROutputGroupID + 2, 1, 2,'1A','Canada Migration BackOffice Group',1,0, @CreationTimestamp,@CreationUserIdentifier,1),		
										(@PNROutputGroupID + 3, 1, 3,'1A','Canada Migration General Group',1,0, @CreationTimestamp,@CreationUserIdentifier,1),		
										(@PNROutputGroupID + 4, 1, 4,'1A','Canada Migration Itinerary Group',1,0, @CreationTimestamp,@CreationUserIdentifier,1)		

		INSERT INTO [dbo].[PNROutputGroupCountry] (CountryCode, PNROutputGroupId,CreationTimestamp,CreationUserIdentifier, VersionNumber,TargetLayoutVersion)
							    VALUES	('CA', @PNROutputGroupID + 1 , @CreationTimestamp,@CreationUserIdentifier,1, 1),
										('CA', @PNROutputGroupID + 2 , @CreationTimestamp,@CreationUserIdentifier,1, 1),
										('CA', @PNROutputGroupID + 3 , @CreationTimestamp,@CreationUserIdentifier,1, 1),
										('CA', @PNROutputGroupID + 4 , @CreationTimestamp,@CreationUserIdentifier,1, 1)


		INSERT INTO	[dbo].[PNROutputItemLanguage] ( PNROutputItemId, LanguageCode, RemarkFormatTranslation, CreationTimestamp, CreationUserIdentifier, VersionNumber)
									VALUES (@PNROutputItemId + 8, 'fr-CA', 'TOUS LES DETAILS ONT ETE PRESENTES AU CLIENT ET', @CreationTimestamp,@CreationUserIdentifier,1),
											(@PNROutputItemId + 9, 'fr-CA', 'APPROUVES PAR CE DERNIER.', @CreationTimestamp,@CreationUserIdentifier,1),
									       (@PNROutputItemId + 10, 'fr-CA', 'LES FRAIS APPLIQUES A LA CARTE DE CREDIT DES', @CreationTimestamp,@CreationUserIdentifier,1),
									       (@PNROutputItemId + 11, 'fr-CA', 'CLIENTS ONT ETE APPROUVES PAR LE CLIENT.', @CreationTimestamp,@CreationUserIdentifier,1)

		
		INSERT INTO [dbo].[PNROutputGroupPNROutputItem]	([PNROutputGroupId],[PNROutputItemId],[SequenceNumber],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber],[DataStandardizationVersion],[LayoutVersion])     
									VALUES	(@PNROutputGroupID + 4, @PNROutputItemId + 1,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
											(@PNROutputGroupID + 4, @PNROutputItemId + 2,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
											(@PNROutputGroupID + 3, @PNROutputItemId + 3,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
											(@PNROutputGroupID + 3, @PNROutputItemId + 4,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
											(@PNROutputGroupID + 3, @PNROutputItemId + 5,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
											(@PNROutputGroupID + 3, @PNROutputItemId + 6,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
											(@PNROutputGroupID + 2, @PNROutputItemId + 7,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
											(@PNROutputGroupID + 3, @PNROutputItemId + 8,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
											(@PNROutputGroupID + 3, @PNROutputItemId + 9,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
											(@PNROutputGroupID + 3, @PNROutputItemId + 10,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
											(@PNROutputGroupID + 3, @PNROutputItemId + 11,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1')

		INSERT INTO [dbo].[PnrOutputCondition] (PNROutputItemId,PNROutputConditionName,PNROutputConditionValue,CreationTimestamp,CreationUserIdentifier,VersionNumber)
									VALUES (@PNROutputItemId + 8, 'PassPurchase', 'true', @CreationTimestamp,@CreationUserIdentifier,1),
										   (@PNROutputItemId + 9, 'PassPurchase', 'true', @CreationTimestamp,@CreationUserIdentifier,1),
										   (@PNROutputItemId + 10, 'PassPurchase', 'true', @CreationTimestamp,@CreationUserIdentifier,1),
										   (@PNROutputItemId + 11, 'PassPurchase', 'true', @CreationTimestamp,@CreationUserIdentifier,1)


		INSERT INTO dbo.PNROutputRemarkGroup(PNROutputRemarkGroupId, PNROutputRemarkGroupName, CreationTimestamp, CreationUserIdentifier, LastUpdateTimestamp, LastUpdateUserIdentifier, VersionNumber,	PNROutputRemarkGroupKey) 
		VALUES								(@PNROutputRemarkGroupId + 1, 'CanadaAmadeusTktRemarks', @CreationTimestamp,	@CreationUserIdentifier, NULL, NULL, 1,NULL)


		INSERT INTO [dbo].[PNROutputRemarkGroupPNROutputItem]([PNROutputRemarkGroupId],PNROutputItemId,[CreationTimestamp],[CreationUserIdentifier],[VersionNumber])
					VALUES(@PNROutputRemarkGroupId + 1 ,@PNROutputItemId + 3,@CreationTimestamp,@CreationUserIdentifier,1),
						  (@PNROutputRemarkGroupId + 1 ,@PNROutputItemId + 4,@CreationTimestamp,@CreationUserIdentifier,1),
						  (@PNROutputRemarkGroupId + 1 ,@PNROutputItemId + 5,@CreationTimestamp,@CreationUserIdentifier,1)

						

	PRINT 'END Script'


	COMMIT TRAN
END TRY
	
BEGIN CATCH
ROLLBACK TRAN

	DECLARE @ErrorMessage NVARCHAR(4000);
	SELECT @ErrorMessage=ERROR_MESSAGE()
	RAISERROR(@ErrorMessage, 10, 1);

END CATCH

