USE Desktop_Test
GO

BEGIN TRAN
BEGIN TRY

	DECLARE @CreationTimestamp		DATETIME = GETUTCDATE()	
	DECLARE @CreationUserIdentifier NVARCHAR(170)
	DECLARE @PNROutputGroupID		INT
	DECLARE @PNROutputItemId		INT
	DECLARE @PNROutputRemarkGroupId		INT
	DECLARE @PNROutputGroupIDInvoice		INT
	

	
	-----------------------
	-- ROLLBACK Scripts
	-----------------------
	SET @CreationUserIdentifier			= 'Amadeus CA Migration - US11134'
	DELETE FROM PNROutputRemarkGroupPNROutputItem WHERE	CreationUserIdentifier = @CreationUserIdentifier
	DELETE FROM PnrOutputCondition WHERE CreationUserIdentifier = @CreationUserIdentifier
	DELETE FROM PNROutputGroupPNROutputItem WHERE CreationUserIdentifier = @CreationUserIdentifier
	DELETE FROM PNROutputItemLanguage WHERE CreationUserIdentifier = @CreationUserIdentifier
	DELETE FROM PNROutputItem WHERE CreationUserIdentifier = @CreationUserIdentifier
	DELETE FROM PNROutputPlaceHolder WHERE	CreationUserIdentifier = @CreationUserIdentifier
	
	----------------------------------
	-- Insert Scripts
	----------------------------------
	PRINT 'START Script'
		SET @CreationUserIdentifier			= 'Amadeus CA Migration - US11134'	
		SET @PNROutputItemId =	(SELECT MAX(PNROutputItemId)  FROM [PNROutputItem])
		SET @PNROutputGroupID =	(SELECT PNROutputGroupID FROM [PNROutputGroup] Where PNROutputGroupName = 'Canada Migration General Group')
		SET @PNROutputGroupIDInvoice =	(SELECT PNROutputGroupID FROM [PNROutputGroup] Where PNROutputGroupName = 'Canada Migration BackOffice Group')
		SET @PNROutputRemarkGroupId = (SELECT PNROutputRemarkGroupId  FROM PNROutputRemarkGroup where PNROutputRemarkGroupName = 'CanadaAmadeusTktRemarks')
		

		INSERT INTO [dbo].[PNROutputPlaceHolder]([PNROutputPlaceHolderName],[PNROutputPlaceHolderRegularExpresssion],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber])
									VALUES( '%PenaltyAmt%', '([0-9]*\.{0,1}[0-9]{0,2})',@CreationTimestamp, @CreationUserIdentifier, 1 ),
										  ( '%PenaltyGst%', '([0-9]*\.{0,1}[0-9]{0,2})',@CreationTimestamp, @CreationUserIdentifier, 1 ),
										  ( '%PenaltyHst%', '([0-9]*\.{0,1}[0-9]{0,2})',@CreationTimestamp, @CreationUserIdentifier, 1 ),
										  ( '%PenaltyQst%', '([0-9]*\.{0,1}[0-9]{0,2})',@CreationTimestamp, @CreationUserIdentifier, 1 ),
										  ( '%OtherTax%', '([0-9]*\.{0,1}[0-9]{0,2})',@CreationTimestamp, @CreationUserIdentifier, 1 ),
										  ( '%CnNumber%', '([A-Z0-9]{3})',@CreationTimestamp, @CreationUserIdentifier, 1 ),
										  ( '%PassNumber%', '([0-9]+)',@CreationTimestamp, @CreationUserIdentifier, 1 ),
										  ( '%GdsFare%', '([0-9]*\.{0,1}[0-9]{0,2})',@CreationTimestamp, @CreationUserIdentifier, 1 ),
										  ( '%VnCode%', '([A-Z0-9]{3})',@CreationTimestamp, @CreationUserIdentifier, 1 ),
										  ( '%OriginalTicketNumber%', '([0-9]+)',@CreationTimestamp, @CreationUserIdentifier, 1 ),
										  ( '%ExchangeAirlineCode%', '([A-Z0-9]{2})',@CreationTimestamp, @CreationUserIdentifier, 1 )
								  	
		 		
		INSERT INTO [dbo].[PNROutputItem]	([PNROutputItemId],[PNROutputRemarkTypeCode],[PNROutputBindingTypeCode], [PNROutputUpdateTypeCode],[GDSRemarkQualifier],[RemarkFormat],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber],[PNROutputItemDefaultLanguageCode],[PNROutputItemXMLFormat])
									VALUES	(@PNROutputItemId + 1,1,'S',1,'T','TKT%TktRemarkNbr%-VN-%VnCode%/BA-%PenaltyAmt%/TX1-%PenaltyGst%XG/TX2-%PenaltyHst%RC/TX3-%PenaltyQst%XQ/TX4-%OtherTax%XT', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),
											(@PNROutputItemId + 2,3,'0',1,'','CN/-%CnNumber%', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),
											(@PNROutputItemId + 3,3,'0',1,'','NUC', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),
											(@PNROutputItemId + 4,0,'0',1,'G','%ExchangeAirlineCode%PASSCHG', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),
											(@PNROutputItemId + 5,3,'0',1,'','U14/-%AirlineCode%PASS-%PassNumber%.%FareType%/%GdsFare%', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),
											(@PNROutputItemId + 6,1,'0',2,'','THE AIRLINE TICKET CHARGE ON THIS ITINERARY/INVOICE', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),
											(@PNROutputItemId + 7,1,'0',2,'','IS FOR INTERNAL COST RE-ALLOCATION PURPOSES ONLY.', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),
											(@PNROutputItemId + 8,1,'0',2,'','**PLEASE DO NOT EXPENSE** THIS CHARGE AS IT WILL NOT APPEAR', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),
											(@PNROutputItemId + 9,1,'0',2,'','ON YOUR CREDIT CARD STATEMENT.', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),
											(@PNROutputItemId + 10,3,'0',1,'','NE/-EX-Y/-OTK-%OriginalTicketNumber%', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),
											(@PNROutputItemId + 11,3,'0',1,'','NE/-EX-Y', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL)
		
		INSERT INTO	[dbo].[PNROutputItemLanguage] ( PNROutputItemId, LanguageCode, RemarkFormatTranslation, CreationTimestamp, CreationUserIdentifier, VersionNumber)
									VALUES (@PNROutputItemId + 6, 'fr-CA', 'LES FRAIS DE BILLET D AVION DE CET ITINERAIRE/FACTURE', @CreationTimestamp,@CreationUserIdentifier,1),
											(@PNROutputItemId + 7, 'fr-CA', 'NE SONT QU AUX FINS DE REATTRIBUTION DES COUTS A L INTERNE.', @CreationTimestamp,@CreationUserIdentifier,1),
									       (@PNROutputItemId + 8, 'fr-CA', '**VEILLEZ NE PAS INSCRIRE** CES COUTS PUISQU ILS NE PARAITRONT PAS ', @CreationTimestamp,@CreationUserIdentifier,1),
									       (@PNROutputItemId + 9, 'fr-CA', 'SUR VOTRE RELEVE DE CARTE DE CREDIT.', @CreationTimestamp,@CreationUserIdentifier,1)
											
										          
		INSERT INTO [dbo].[PNROutputGroupPNROutputItem]	([PNROutputGroupId],[PNROutputItemId],[SequenceNumber],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber],[DataStandardizationVersion],[LayoutVersion])     
									VALUES	(@PNROutputGroupID, @PNROutputItemId + 1,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
									        (@PNROutputGroupIDInvoice, @PNROutputItemId + 2,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
											(@PNROutputGroupIDInvoice, @PNROutputItemId + 3,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
											(@PNROutputGroupID, @PNROutputItemId + 4,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
											(@PNROutputGroupIDInvoice, @PNROutputItemId + 5,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
											(@PNROutputGroupID, @PNROutputItemId + 6,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
											(@PNROutputGroupID, @PNROutputItemId + 7,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
											(@PNROutputGroupID, @PNROutputItemId + 8,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
											(@PNROutputGroupID, @PNROutputItemId + 9,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
											(@PNROutputGroupIDInvoice, @PNROutputItemId + 10,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
											(@PNROutputGroupIDInvoice, @PNROutputItemId + 11,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1')

		INSERT INTO [dbo].[PnrOutputCondition] (PNROutputItemId,PNROutputConditionName,PNROutputConditionValue,CreationTimestamp,CreationUserIdentifier,VersionNumber)
									VALUES (@PNROutputItemId + 3, 'IsNuc', 'true', @CreationTimestamp,@CreationUserIdentifier,1),
										   (@PNROutputItemId + 11, 'NoOriginalTicket', 'true', @CreationTimestamp,@CreationUserIdentifier,1)

		INSERT INTO [dbo].[PNROutputRemarkGroupPNROutputItem]([PNROutputRemarkGroupId],PNROutputItemId,[CreationTimestamp],[CreationUserIdentifier],[VersionNumber])
					VALUES(@PNROutputRemarkGroupId ,@PNROutputItemId + 1,@CreationTimestamp,@CreationUserIdentifier,1)

	PRINT 'END Script'


	commit TRAN
END TRY
	
BEGIN CATCH
ROLLBACK TRAN

	DECLARE @ErrorMessage NVARCHAR(4000);
	SELECT @ErrorMessage=ERROR_MESSAGE()
	RAISERROR(@ErrorMessage, 10, 1);

END CATCH

