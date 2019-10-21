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
	SET @CreationUserIdentifier			= 'Amadeus CA Migration - US9882'
	DELETE FROM PNROutputGroupPNROutputItem WHERE CreationUserIdentifier = @CreationUserIdentifier
	DELETE FROM PnrOutputCondition WHERE CreationUserIdentifier = @CreationUserIdentifier
	DELETE FROM PNROutputitemLanguage WHERE CreationUserIdentifier = @CreationUserIdentifier
	DELETE FROM PNROutputItem WHERE CreationUserIdentifier = @CreationUserIdentifier
	DELETE FROM PNROutputPlaceHolder WHERE	CreationUserIdentifier = @CreationUserIdentifier

	----------------------------------
	-- Insert Scripts
	----------------------------------
	PRINT 'START Script'
		SET @CreationUserIdentifier			= 'Amadeus CA Migration - US9882'	
		SET @PNROutputItemId =	(SELECT MAX(PNROutputItemId)  FROM [PNROutputItem])
		SET @PNROutputGroupID =	(SELECT PNROutputGroupId  FROM PNROutputGroup Where PNROutputGroupName = 'Canada Migration Itinerary Group')
		SET @PNROutputGroupID2 =	(SELECT PNROutputGroupId  FROM PNROutputGroup Where PNROutputGroupName = 'Canada Migration General Group')
		
		
		INSERT INTO [dbo].[PNROutputPlaceHolder]([PNROutputPlaceHolderName],[PNROutputPlaceHolderRegularExpresssion],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber])
									VALUES( '%TrainNumber%', '([A-Z0-9]+)',@CreationTimestamp, @CreationUserIdentifier, 1 ),
									( '%TrainClassService%', '([A-Z0-9]+)',@CreationTimestamp, @CreationUserIdentifier, 1 )
										  
		 		
		INSERT INTO [dbo].[PNROutputItem]	([PNROutputItemId],[PNROutputRemarkTypeCode],[PNROutputBindingTypeCode], [PNROutputUpdateTypeCode],[GDSRemarkQualifier],[RemarkFormat],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber],[PNROutputItemDefaultLanguageCode],[PNROutputItemXMLFormat])
									VALUES	(@PNROutputItemId + 1,1,'0',1,'','TRAIN NUMBER-%TrainNumber% CLASS- %TrainClassService%', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),
											(@PNROutputItemId + 2,1,'0',1,'','FOR VIA RAIL TRAVEL PLEASE CHECK IN AT TRAIN STATION', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),
											(@PNROutputItemId + 3,1,'0',1,'','AT LEAST 45 MINUTES PRIOR TO DEPARTURE.', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),
											(@PNROutputItemId + 4,1,'0',1,'','VIA RAIL POLICY-NONSMOKING ENVIRONMENT ON ALL TRAINS.', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),
											(@PNROutputItemId + 5,1,'0',1,'','VIA COUPONS ARE NOT VALID FOR AIR TRAVEL.', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),
											(@PNROutputItemId + 6,1,'0',1,'','IF CHANGES ARE MADE ENROUTE PLEASE ENSURE YOUR', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),
											(@PNROutputItemId + 7,1,'0',1,'','TICKET IS ENDORSED BY VIA 1 TICKET LOUNGE.', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),
											(@PNROutputItemId + 8,1,'0',1,'','PLEASE CALL VIA RAIL AT 1-888-842-7245', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),
											(@PNROutputItemId + 9,1,'0',1,'','TO RECONFIRM YOUR', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),
											(@PNROutputItemId + 10,1,'0',1,'','TRAIN DEPARTURE/ARRIVAL TIMES.', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),
											(@PNROutputItemId + 11,1,'0',1,'','VALID IDENTIFICATION IS REQUIRED FOR ALL PASSENGERS 18 AND OVER.', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),
											(@PNROutputItemId + 12,1,'0',1,'','ALL AMTRAK TRAINS EXCEPT AUTO TRAIN ARE NON-SMOKING.', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),
											(@PNROutputItemId + 13,1,'0',1,'','TRAIN CHANGES ARE PERMITTED ANYTIME SUBJECT TO AVAILABILITY', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),
											(@PNROutputItemId + 14,1,'0',1,'','IF YOU NEED TO CHANGE OR CANCEL YOUR RESERVATION-', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),
											(@PNROutputItemId + 15,1,'0',1,'','REFUND/CHANGE FEES MAY APPLY', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),
											(@PNROutputItemId + 16,1,'0',1,'','RECOMMENDED ARRIVAL TIME AT THE STATION AT LEAST 30 MINUTES', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),
											(@PNROutputItemId + 17,1,'0',1,'','PRIOR TO YOUR SCHEDULES DEPARTURE.', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),
											(@PNROutputItemId + 18,1,'0',1,'','ALLOW ADDITIONAL TIME IF YOU NEED HELP WITH BAGGAGE OR TICKETS.', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),
											(@PNROutputItemId + 19,1,'0',1,'','IF YOU ARE TRAVELLING ON THE AUTO TRAIN YOU MUST CHECK IN', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),
											(@PNROutputItemId + 20,1,'0',1,'','AT LEAST 2 HOURS BEFORE SCHEDULED DEPARTURE.', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),
											(@PNROutputItemId + 21,1,'0',1,'','THIS CONFIRMATION NOTICE IS NOT A TICKET', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),
											(@PNROutputItemId + 22,1,'0',1,'','YOU MUST OBTAIN YOUR TICKET BEFORE BOARDING ANY TRAIN.', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),
											(@PNROutputItemId + 23,1,'0',1,'','THIS CONFIRMATION WILL NOT BE ACCEPTED ONBOARD.', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),
											(@PNROutputItemId + 24,1,'0',1,'','YOUR ENTIRE RESERVATION -ALL SEGMENTS- WILL BE CANCELLED', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),
											(@PNROutputItemId + 25,1,'0',1,'','IF YOU DO NOT PICK UP YOUR TICKET BEFORE YOUR FIRST DEPARTURE OR', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),
											(@PNROutputItemId + 26,1,'0',1,'','IF YOU NO-SHOW FOR ANY SEGMENT IN YOUR RESERVATION.', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),
											(@PNROutputItemId + 27,1,'0',1,'','IF YOUR RESERVATION CANCELS YOU WILL NEED TO MAKE NEW', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),
											(@PNROutputItemId + 28,1,'0',1,'','RESERVATIONS WHICH MAY BE AT A HIGHER FARE.', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL)


		
		INSERT INTO [dbo].[PNROutputitemLanguage] (PNROutputItemId, LanguageCode, RemarkFormatTranslation, CreationTimestamp, CreationUserIdentifier, VersionNumber)
									VALUES(@PNROutputItemId + 2, 'fr-CA', 'POUR LES DEPLACEMENTS A BORD DE VIA RAIL VEUILLEZ VOUS', @CreationTimestamp,@CreationUserIdentifier,1),
										  (@PNROutputItemId + 3, 'fr-CA', 'PRESENTER A LA GARE AU MOINS 45 MINUTES AVANT L HEURE PREVUE DE', @CreationTimestamp,@CreationUserIdentifier,1),
										  (@PNROutputItemId + 4, 'fr-CA', 'VOTRE DEPART SUIVANT LA POLITIQUE DE VIA RAIL-TOUS LES', @CreationTimestamp,@CreationUserIdentifier,1),
										  (@PNROutputItemId + 5, 'fr-CA', 'TRAINS SONT NON FUMEUR. LES COUPONS VIA RAIL NE PEUVENT ETRE', @CreationTimestamp,@CreationUserIdentifier,1),
										  (@PNROutputItemId + 6, 'fr-CA', 'UTILISES POUR DES DEPLACEMENTS AERIENS. SI VOUS DEVEZ MODIFIER', @CreationTimestamp,@CreationUserIdentifier,1),
										  (@PNROutputItemId + 7, 'fr-CA', 'VOTRE ITINERAIRE EN COURS DE ROUTE ASSUREZ-VOUS QUE VOTRE', @CreationTimestamp,@CreationUserIdentifier,1),
										  (@PNROutputItemId + 8, 'fr-CA', 'BILLET EST ENDOSSE PAR LA BILLETTERIE VIA 1.', @CreationTimestamp,@CreationUserIdentifier,1),
										  (@PNROutputItemId + 9, 'fr-CA', 'VEUILLEZ COMMUNIQUER AVEC VIA RAIL AU 1-888-842-7245 POUR', @CreationTimestamp,@CreationUserIdentifier,1),
										  (@PNROutputItemId + 10, 'fr-CA', 'RECONFIRMER LES HEURES DE DEPART/D ARRIVEE DE VOTRE TRAIN.', @CreationTimestamp,@CreationUserIdentifier,1)
		
		INSERT INTO [dbo].[PnrOutputCondition] (PNROutputItemId, PNROutputConditionName, PNROutputConditionValue, CreationTimestamp, CreationUserIdentifier, VersionNumber)
									VALUES	(@PNROutputItemId + 2, 'TrainVendorCode', 'vbk' ,@CreationTimestamp,@CreationUserIdentifier,1),
											(@PNROutputItemId + 3, 'TrainVendorCode', 'vbk' ,@CreationTimestamp,@CreationUserIdentifier,1),
											(@PNROutputItemId + 4, 'TrainVendorCode', 'vbk' ,@CreationTimestamp,@CreationUserIdentifier,1),
											(@PNROutputItemId + 5, 'TrainVendorCode', 'vbk' ,@CreationTimestamp,@CreationUserIdentifier,1),
											(@PNROutputItemId + 6, 'TrainVendorCode', 'vbk' ,@CreationTimestamp,@CreationUserIdentifier,1),
											(@PNROutputItemId + 7, 'TrainVendorCode', 'vbk' ,@CreationTimestamp,@CreationUserIdentifier,1),
											(@PNROutputItemId + 8, 'TrainVendorCode', 'vbk' ,@CreationTimestamp,@CreationUserIdentifier,1),
											(@PNROutputItemId + 9, 'TrainVendorCode', 'vbk' ,@CreationTimestamp,@CreationUserIdentifier,1),
											(@PNROutputItemId + 10, 'TrainVendorCode', 'vbk' ,@CreationTimestamp,@CreationUserIdentifier,1),
											(@PNROutputItemId + 11, 'TrainVendorCode', 'amk' ,@CreationTimestamp,@CreationUserIdentifier,1),
											(@PNROutputItemId + 12, 'TrainVendorCode', 'amk' ,@CreationTimestamp,@CreationUserIdentifier,1),
											(@PNROutputItemId + 13, 'TrainVendorCode', 'amk' ,@CreationTimestamp,@CreationUserIdentifier,1),
											(@PNROutputItemId + 14, 'TrainVendorCode', 'amk' ,@CreationTimestamp,@CreationUserIdentifier,1),
											(@PNROutputItemId + 15, 'TrainVendorCode', 'amk' ,@CreationTimestamp,@CreationUserIdentifier,1),
											(@PNROutputItemId + 16, 'TrainVendorCode', 'amk' ,@CreationTimestamp,@CreationUserIdentifier,1),
											(@PNROutputItemId + 17, 'TrainVendorCode', 'amk' ,@CreationTimestamp,@CreationUserIdentifier,1),
											(@PNROutputItemId + 18, 'TrainVendorCode', 'amk' ,@CreationTimestamp,@CreationUserIdentifier,1),
											(@PNROutputItemId + 19, 'TrainVendorCode', 'amk' ,@CreationTimestamp,@CreationUserIdentifier,1),
											(@PNROutputItemId + 20, 'TrainVendorCode', 'amk' ,@CreationTimestamp,@CreationUserIdentifier,1),
											(@PNROutputItemId + 21, 'TrainVendorCode', 'amk' ,@CreationTimestamp,@CreationUserIdentifier,1),
											(@PNROutputItemId + 22, 'TrainVendorCode', 'amk' ,@CreationTimestamp,@CreationUserIdentifier,1),
											(@PNROutputItemId + 23, 'TrainVendorCode', 'amk' ,@CreationTimestamp,@CreationUserIdentifier,1),
											(@PNROutputItemId + 24, 'TrainVendorCode', 'amk' ,@CreationTimestamp,@CreationUserIdentifier,1),
											(@PNROutputItemId + 25, 'TrainVendorCode', 'amk' ,@CreationTimestamp,@CreationUserIdentifier,1),
											(@PNROutputItemId + 26, 'TrainVendorCode', 'amk' ,@CreationTimestamp,@CreationUserIdentifier,1),
											(@PNROutputItemId + 27, 'TrainVendorCode', 'amk' ,@CreationTimestamp,@CreationUserIdentifier,1),
											(@PNROutputItemId + 28, 'TrainVendorCode', 'amk' ,@CreationTimestamp,@CreationUserIdentifier,1)



		INSERT INTO [dbo].[PNROutputGroupPNROutputItem]	([PNROutputGroupId],[PNROutputItemId],[SequenceNumber],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber],[DataStandardizationVersion],[LayoutVersion])     
									VALUES	(@PNROutputGroupID2, @PNROutputItemId + 1,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
											(@PNROutputGroupID2, @PNROutputItemId + 2,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
											(@PNROutputGroupID2, @PNROutputItemId + 3,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
											(@PNROutputGroupID2, @PNROutputItemId + 4,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
											(@PNROutputGroupID2, @PNROutputItemId + 5,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
											(@PNROutputGroupID2, @PNROutputItemId + 6,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
											(@PNROutputGroupID2, @PNROutputItemId + 7,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
											(@PNROutputGroupID2, @PNROutputItemId + 8,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
											(@PNROutputGroupID2, @PNROutputItemId + 9,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
											(@PNROutputGroupID2, @PNROutputItemId + 10,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
											(@PNROutputGroupID2, @PNROutputItemId + 11,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
											(@PNROutputGroupID2, @PNROutputItemId + 12,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
											(@PNROutputGroupID2, @PNROutputItemId + 13,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
											(@PNROutputGroupID2, @PNROutputItemId + 14,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
											(@PNROutputGroupID2, @PNROutputItemId + 15,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
											(@PNROutputGroupID2, @PNROutputItemId + 16,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
											(@PNROutputGroupID2, @PNROutputItemId + 17,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
											(@PNROutputGroupID2, @PNROutputItemId + 18,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
											(@PNROutputGroupID2, @PNROutputItemId + 19,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
											(@PNROutputGroupID2, @PNROutputItemId + 20,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
											(@PNROutputGroupID2, @PNROutputItemId + 21,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
											(@PNROutputGroupID2, @PNROutputItemId + 22,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
											(@PNROutputGroupID2, @PNROutputItemId + 23,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
											(@PNROutputGroupID2, @PNROutputItemId + 24,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
											(@PNROutputGroupID2, @PNROutputItemId + 25,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
											(@PNROutputGroupID2, @PNROutputItemId + 26,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
											(@PNROutputGroupID2, @PNROutputItemId + 27,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
											(@PNROutputGroupID2, @PNROutputItemId + 28,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1')


	PRINT 'END Script'


	COMMIT TRAN
END TRY
	
BEGIN CATCH
ROLLBACK TRAN

	DECLARE @ErrorMessage NVARCHAR(4000);
	SELECT @ErrorMessage=ERROR_MESSAGE()
	RAISERROR(@ErrorMessage, 10, 1);

END CATCH

