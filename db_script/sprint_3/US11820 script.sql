USE Desktop_Test
GO

BEGIN TRAN
BEGIN TRY

	DECLARE @CreationTimestamp		DATETIME = GETUTCDATE()	
	DECLARE @CreationUserIdentifier NVARCHAR(170)
	DECLARE @PNROutputItemID    		 INT
	DECLARE @PNROutputGroupID	         INT
	DECLARE @OutputRemarkGroupId		 INT
	
	-----------------------
	-- ROLLBACK Scripts
	-----------------------
	SET @CreationUserIdentifier			= 'Amadeus CA Migration - US11820'
	DELETE FROM PNROutputRemarkGroupPNROutputItem WHERE CreationUserIdentifier = @CreationUserIdentifier
	DELETE FROM PNROutputRemarkGroup			  WHERE CreationUserIdentifier = @CreationUserIdentifier
	DELETE FROM PnrOutputCondition WHERE CreationUserIdentifier = @CreationUserIdentifier
	DELETE FROM PNROutputGroupPNROutputItem WHERE CreationUserIdentifier = @CreationUserIdentifier
	DELETE FROM PNROutputItemLanguage WHERE CreationUserIdentifier = @CreationUserIdentifier
	DELETE FROM PNROutputItem WHERE CreationUserIdentifier = @CreationUserIdentifier
	DELETE FROM PNROutputPlaceHolder WHERE	CreationUserIdentifier = @CreationUserIdentifier
	
	
	----------------------------------
	-- Insert Scripts
	----------------------------------

	PRINT 'START Script'
		SET @CreationUserIdentifier			= 'Amadeus CA Migration - US11820'	
		SET @PNROutputItemID    =	(SELECT MAX(PNROutputItemId)   FROM [PNROutputItem])
		SET @PNROutputGroupID   =	(SELECT PNROutputGroupId  FROM [PNROutputGroup] Where PNROutputGroupName = 'Canada Itinerary Remarks Group')


	    INSERT INTO [dbo].[PNROutputPlaceHolder]([PNROutputPlaceHolderName],[PNROutputPlaceHolderRegularExpresssion],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber])
									VALUES ( '%CaSeatType%', '(([A-Z]{6}))',@CreationTimestamp, @CreationUserIdentifier, 1 ),
									       ( '%CaUPFIB%'   , '([0-9][a-zA-Z])',@CreationTimestamp, @CreationUserIdentifier, 1 )

													
		INSERT INTO [dbo].[PNROutputItem]	([PNROutputItemId],[PNROutputRemarkTypeCode],[PNROutputBindingTypeCode], [PNROutputUpdateTypeCode],[GDSRemarkQualifier],[RemarkFormat],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber],[PNROutputItemDefaultLanguageCode],[PNROutputItemXMLFormat])
									VALUES  (@PNROutputItemID + 1,1,'S',1,'','SEATING SUBJECT TO', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL), 
									        (@PNROutputItemID + 2,1,'S',1,'','AIRPORT OR ONLINE CHECK IN', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL), --/SX
											(@PNROutputItemID + 3,1,'S',1,'','PREFERRED SEAT UNAVAILABLE', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL), --/SX
											(@PNROutputItemID + 4,1,'S',1,'','PLEASE CHECK AGAIN AT THE GATE', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL), --/SX
											(@PNROutputItemID + 5,1,'S',1,'','PREFERRED SEAT UNAVAILABLE-%CaSeatType% SEAT CONFIRMED', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL), --/SX
											--(@PNROutputItemID + 5,1,'S',1,'','PLEASE CHECK AGAIN AT THE GATE', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL), --/SX 
											--(@PNROutputItemID + 6,1,'S',1,'','PREFERRED SEAT UNAVAILABLE', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),
											--(@PNROutputItemID + 7,1,'S',1,'','RIR PLEASE CHECK AGAIN AT THE GATE ', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),
											--(@PNROutputItemID + 5,1,'S',1,'','PREFERRED SEAT UNAVAILABLE-[SEATTYPE] SEAT CONFIRMED', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),
											--(@PNROutputItemID + 8,1,'S',1,'','PLEASE CHECK AGAIN AT THE GATE ', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),
											(@PNROutputItemID + 6,1,'S',1,'','THIS SEGMENT HAS BEEN WAITLISTED', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL), --/SX
											(@PNROutputItemID + 7,1,'S',1,'','SEAT ASSIGNMENTS ARE ON REQUEST', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),  --/SX
											(@PNROutputItemID + 8,1,'S',1,'','UPGRADE CONFIRMED - SEAT %CaUPFIB% CONFIRMED', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL), --/SX 
											(@PNROutputItemID + 9,1,'S',1,'','UPGRADE CONFIRMED', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),		
											(@PNROutputItemID + 10,1,'S',1,'','UPGRADE REQUESTED', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),		
											(@PNROutputItemID + 11,1,'S',1,'','CHK CLEARANCE WITH AIRLINE OR AIRLINE WEBSITE', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL)		

		INSERT INTO [dbo].[PNROutputItemLanguage]  ([PNROutputItemId],[LanguageCode],[RemarkFormatTranslation],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber])
											VALUES (@PNROutputItemID + 1,'fr-CA','LE CHOIX DES SIEGES NE SE FAIT QU A L ENREGISTREMENT',@CreationTimestamp,@CreationUserIdentifier,1), --/SX 
												   (@PNROutputItemID + 2,'fr-CA','A L AEROPORT OU EN LIGNE',@CreationTimestamp,@CreationUserIdentifier,1), --/SX
												   (@PNROutputItemID + 3,'fr-CA','CHOIX DE SIEGE NON DISPONIBLE',@CreationTimestamp,@CreationUserIdentifier,1), --/SX
												   (@PNROutputItemID + 4,'fr-CA','VERIFEZ DE NOUVEAU A LA BARRIERE',@CreationTimestamp,@CreationUserIdentifier,1), --/SX
												   (@PNROutputItemID + 5,'fr-CA','CHOIX DE SIEGE NON DISPONIBLE-%CaSeatType% SIEGE CONFIRME',@CreationTimestamp,@CreationUserIdentifier,1), --/SX
												   --(@PNROutputItemID + 5,'fr-FR','RIR VERIFEZ DE NOUVEAU A LA BARRIERE',@CreationTimestamp,@CreationUserIdentifier,1), --/SX
												   --(@PNROutputItemID + 6,'fr-FR','RIR CHOIX DE SIEGE NON DISPONIBLE',@CreationTimestamp,@CreationUserIdentifier,1), --/SX
												   --(@PNROutputItemID + 1,'fr-FR','RIR VERIFEZ DE NOUVEAU A LA BARRIERE',@CreationTimestamp,@CreationUserIdentifier,1), --/SX
												   --(@PNROutputItemID + 1,'fr-FR','RIR CHOIX DE SIEGE NON DISPONIBLE-[SEATTYPE] SIEGE CONFIRME',@CreationTimestamp,@CreationUserIdentifier,1), --/SX
												   --(@PNROutputItemID + 1,'fr-FR','RIR VERIFEZ DE NOUVEAU A LA BARRIERE',@CreationTimestamp,@CreationUserIdentifier,1), --/SX
												   (@PNROutputItemID + 6,'fr-CA','CE SEGMENT A ETE MIS EN LISTE D ATTENTE',@CreationTimestamp,@CreationUserIdentifier,1), --/SX												   
												   (@PNROutputItemID + 7,'fr-CA','ATTRIBUTION DES SIEGES SUR DEMANDE',@CreationTimestamp,@CreationUserIdentifier,1), --/SX												   
												   (@PNROutputItemID + 8,'fr-CA','SURCLASSEMENT CONFIRME - SIEGE %CaUPFIB% CONFIRME',@CreationTimestamp,@CreationUserIdentifier,1), --/SX
												   (@PNROutputItemID + 9,'fr-CA','SURCLASSEMENT CONFIRME',@CreationTimestamp,@CreationUserIdentifier,1), --/SX																			 
												   (@PNROutputItemID + 10,'fr-CA','SURCLASSEMENT DEMANDE-VERIFIER LA DISPONIBILITE AUPRES',@CreationTimestamp,@CreationUserIdentifier,1), --/SX																			 
												   (@PNROutputItemID + 11,'fr-CA','DU TRANSPORTEUR OU SUR LE SITE DE CE DERNIER',@CreationTimestamp,@CreationUserIdentifier,1) --/SX																			 

		INSERT INTO [dbo].[PNROutputGroupPNROutputItem]	([PNROutputGroupId],[PNROutputItemId],[SequenceNumber],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber],[DataStandardizationVersion],[LayoutVersion])     
									VALUES	(@PNROutputGroupID, @PNROutputItemID + 1,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
											(@PNROutputGroupID, @PNROutputItemID + 2,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
											(@PNROutputGroupID, @PNROutputItemID + 3,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
											(@PNROutputGroupID, @PNROutputItemID + 4,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
											(@PNROutputGroupID, @PNROutputItemID + 5,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
											(@PNROutputGroupID, @PNROutputItemID + 6,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
											(@PNROutputGroupID, @PNROutputItemID + 7,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
											(@PNROutputGroupID, @PNROutputItemID + 8,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
											(@PNROutputGroupID, @PNROutputItemID + 9,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
											(@PNROutputGroupID, @PNROutputItemID + 10,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
											(@PNROutputGroupID, @PNROutputItemID + 11,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1')

		INSERT INTO [dbo].[PNROutputCondition] ([PNROutputItemId],[PNROutputConditionName],[PNROutputConditionValue],[CreationTimestamp],[CreationUserIdentifier],[LastUpdateTimestamp],[LastUpdateUserIdentifier],[VersionNumber])
									VALUES   (@PNROutputItemId+1,'CASeatRule','ONLINECHECKIN',@CreationTimeStamp,@CreationUserIdentifier,null,null,1),
											 (@PNROutputItemId+2,'CASeatRule','ONLINECHECKIN',@CreationTimeStamp,@CreationUserIdentifier,null,null,1),
											 (@PNROutputItemId+3,'CASeatRule','PREFERRED',@CreationTimeStamp,@CreationUserIdentifier,null,null,1),
											 (@PNROutputItemId+4,'CASeatRule','PREFERRED',@CreationTimeStamp,@CreationUserIdentifier,null,null,1),
											 (@PNROutputItemId+6,'CASeatRule','WAITLISTED',@CreationTimeStamp,@CreationUserIdentifier,null,null,1),											 
											 (@PNROutputItemId+7,'CASeatRule','REQUEST',@CreationTimeStamp,@CreationUserIdentifier,null,null,1),											 
											 (@PNROutputItemId+9,'CASeatRule','CONFIRMED',@CreationTimeStamp,@CreationUserIdentifier,null,null,1),											 
											 (@PNROutputItemId+10,'CASeatRule','CLEARANCE',@CreationTimeStamp,@CreationUserIdentifier,null,null,1),
											 (@PNROutputItemId+11,'CASeatRule','CLEARANCE',@CreationTimeStamp,@CreationUserIdentifier,null,null,1)

		SET @OutputRemarkGroupId = (SELECT MAX(PNROutputRemarkGroupId) FROM PNROutputRemarkGroup)
		INSERT INTO dbo.PNROutputRemarkGroup(PNROutputRemarkGroupId, PNROutputRemarkGroupName, CreationTimestamp, CreationUserIdentifier, LastUpdateTimestamp, LastUpdateUserIdentifier, VersionNumber,	PNROutputRemarkGroupKey) 
			VALUES								(@OutputRemarkGroupId + 1, 'CASeatRuleRemarks', @CreationTimeStamp,	@CreationUserIdentifier, NULL, NULL, 1,NULL)		


		INSERT INTO PNROutputRemarkGroupPNROutputItem 
			VALUES	
					(@OutputRemarkGroupId+1, @PNROutputItemId + 1,	@CreationTimeStamp,	@CreationUserIdentifier, NULL,	NULL, 1),
					(@OutputRemarkGroupId+1, @PNROutputItemId + 2,	@CreationTimeStamp,	@CreationUserIdentifier, NULL,	NULL, 1),
					(@OutputRemarkGroupId+1, @PNROutputItemId + 3,	@CreationTimeStamp,	@CreationUserIdentifier, NULL,	NULL, 1),
					(@OutputRemarkGroupId+1, @PNROutputItemId + 4,	@CreationTimeStamp,	@CreationUserIdentifier, NULL,	NULL, 1),
					(@OutputRemarkGroupId+1, @PNROutputItemId + 5,	@CreationTimeStamp,	@CreationUserIdentifier, NULL,	NULL, 1),
					(@OutputRemarkGroupId+1, @PNROutputItemId + 6,	@CreationTimeStamp,	@CreationUserIdentifier, NULL,	NULL, 1),
					(@OutputRemarkGroupId+1, @PNROutputItemId + 7,	@CreationTimeStamp,	@CreationUserIdentifier, NULL,	NULL, 1),
					(@OutputRemarkGroupId+1, @PNROutputItemId + 8,	@CreationTimeStamp,	@CreationUserIdentifier, NULL,	NULL, 1),
					(@OutputRemarkGroupId+1, @PNROutputItemId + 9,	@CreationTimeStamp,	@CreationUserIdentifier, NULL,	NULL, 1),
					(@OutputRemarkGroupId+1, @PNROutputItemId + 10,	@CreationTimeStamp,	@CreationUserIdentifier, NULL,	NULL, 1),
					(@OutputRemarkGroupId+1, @PNROutputItemId + 11,	@CreationTimeStamp,	@CreationUserIdentifier, NULL,	NULL, 1)

	PRINT 'END Script'

	COMMIT TRAN
END TRY
	
BEGIN CATCH
ROLLBACK TRAN

	DECLARE @ErrorMessage NVARCHAR(4000);
	SELECT @ErrorMessage=ERROR_MESSAGE()
	RAISERROR(@ErrorMessage, 10, 1);

END CATCH



