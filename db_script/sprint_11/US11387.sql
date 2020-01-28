USE Desktop_Test
GO

BEGIN TRAN
BEGIN TRY

       DECLARE @CreationTimestamp        DATETIME = GETUTCDATE()    
       DECLARE @CreationUserIdentifier NVARCHAR(170)
       DECLARE @PNROutputGroupID         INT
       DECLARE @PNROutputItemId          INT
       DECLARE @PNROutputRemarkGroupId   INT
       DECLARE @ItineraryGroup          INT
       DECLARE @InvoiceGroup            INT
       DECLARE @ApplicationGroup        INT
       DECLARE @GeneralGroup            INT
       
       -----------------------
       -- ROLLBACK Scripts
       -----------------------
       SET @CreationUserIdentifier              = 'Amadeus CA Migration - US11387'
       DELETE FROM PnrOutputCondition WHERE CreationUserIdentifier = @CreationUserIdentifier
       DELETE FROM PNROutputGroupPNROutputItem WHERE CreationUserIdentifier = @CreationUserIdentifier
       DELETE FROM PNROutputGroup WHERE CreationUserIdentifier = @CreationUserIdentifier
       DELETE FROM PNROutputGroupCountry WHERE CreationUserIdentifier = @CreationUserIdentifier
       DELETE FROM PNROutputItemLanguage WHERE CreationUserIdentifier = @CreationUserIdentifier
       DELETE FROM PNROutputItem WHERE CreationUserIdentifier = @CreationUserIdentifier
       DELETE FROM PNROutputPlaceHolder WHERE   CreationUserIdentifier = @CreationUserIdentifier
	   delete from ConfigurationParameter WHERE   CreationUserIdentifier = @CreationUserIdentifier

       
       ----------------------------------
       -- Insert Scripts
       ----------------------------------

       PRINT 'START Script'
             SET @CreationUserIdentifier              = 'Amadeus CA Migration - US11387'      
             SET @PNROutputItemId    =  (SELECT MAX(PNROutputItemId)   FROM [PNROutputItem])
             SET @PNROutputGroupID   =  (SELECT MAX(PNROutputGroupId)  FROM [PNROutputGroup])
             SET @GeneralGroup       =  (SELECT PNROutputGroupId  FROM [PNROutputGroup] Where PNROutputGroupName = 'Canada Migration General Group')
			 SET @ItineraryGroup       =  (SELECT PNROutputGroupId  FROM [PNROutputGroup] Where PNROutputGroupName = 'Canada Migration Itinerary Group')


           INSERT INTO [dbo].[PNROutputPlaceHolder]([PNROutputPlaceHolderName],[PNROutputPlaceHolderRegularExpresssion],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber])
                                       VALUES ( '%PassFeeAmount%', '([0-9]*\.{0,1}[0-9]{0,2})',@CreationTimestamp, @CreationUserIdentifier, 1 ),
                                              ( '%PassSegmentCost%', '([0-9]*\.{0,1}[0-9]{0,2})',@CreationTimestamp, @CreationUserIdentifier, 1 ),
											  ('%PassExpDate%', '(.*)',@CreationTimestamp, @CreationUserIdentifier, 1 ),
											  ( '%CCExpDate%', '(.*)',@CreationTimestamp, @CreationUserIdentifier, 1 ),
											  ( '%AirlineName%', '(.*)',@CreationTimestamp, @CreationUserIdentifier, 1 )
			
			
           INSERT INTO [dbo].[PNROutputItem]([PNROutputItemId],[PNROutputRemarkTypeCode],[PNROutputBindingTypeCode], [PNROutputUpdateTypeCode],[GDSRemarkQualifier],[RemarkFormat],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber],[PNROutputItemDefaultLanguageCode],[PNROutputItemXMLFormat])
                                         VALUES(@PNROutputItemId + 1,1,'0',1,'','ONE TIME CWT FEE FOR PASS TRANSACTIONS', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),
                                               (@PNROutputItemId + 2,1,'0',1,'','ADMINISTRATION FEE OF [FEE] PLUS TAX', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),
                                               (@PNROutputItemId + 3,1,'0',1,'','TOTAL FEE IS NONREFUNDABLE', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),
											   (@PNROutputItemId + 4,0,'0',1,'','ADMIN FEE OF %PassFeeAmount% TO BE BILLED THRU CWT FINANCE', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),
											   (@PNROutputItemId + 5,0,'0',1,'A','BULK99-%AirlineCode%/%PassName%.%FareType%/%TktNbr%/%PassSegmentCost%/%PassExpDate%', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),
											   (@PNROutputItemId + 6,0,'0',1,'A','CC%CCVendor%%CCNo%EXP%CCExpDate%/30C*BULK99', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),
											   (@PNROutputItemId + 7,1,'S',1,'','VALID UNTIL %PassExpDate%', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),
											   (@PNROutputItemId + 8,1,'S',1,'','YOUR %AirlineName% CONFIRMATION NUMBER IS %TktNbr%', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL)
											


			INSERT INTO PNROutputItemLanguage([PNROutputItemId], LanguageCode, RemarkFormatTranslation, [CreationTimestamp],[CreationUserIdentifier],[VersionNumber])
										VALUES(@PNROutputItemId + 1, 'fr-CA', 'FRAIS UNIQUE DE CWT POUR LES TRANSACTIONS AVEC LAISSEZ-PASSER', @CreationTimestamp,@CreationUserIdentifier,1),
											  (@PNROutputItemId + 2, 'fr-CA', 'FRAIS ADMINISTRATIFS DE [FEE] PLUS TAX', @CreationTimestamp,@CreationUserIdentifier,1),
											  (@PNROutputItemId + 3, 'fr-CA', 'POUR UN TOTAL NON REMBOURSABLE', @CreationTimestamp,@CreationUserIdentifier,1),
											  --(@PNROutputItemId + 7, 'fr-CA', 'PASSE %StandAlonePassPurchase%', @CreationTimestamp,@CreationUserIdentifier,1),
											  (@PNROutputItemId + 7, 'fr-CA', 'DATE D ESCHANCE DU VOTRE PASSE EST %PassExpDate%', @CreationTimestamp,@CreationUserIdentifier,1),
											  (@PNROutputItemId + 8, 'fr-CA', 'VOTRE NUMERO DE CONFIRMATION %AirlineName% EST %TktNbr%', @CreationTimestamp,@CreationUserIdentifier,1)

            INSERT INTO [dbo].[PNROutputGroupPNROutputItem] ([PNROutputGroupId],[PNROutputItemId],[SequenceNumber],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber],[DataStandardizationVersion],[LayoutVersion])     
                                        VALUES(@ItineraryGroup, @PNROutputItemId + 1,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
                                              (@ItineraryGroup, @PNROutputItemId + 2,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
                                              (@ItineraryGroup, @PNROutputItemId + 3,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
											  (@GeneralGroup, @PNROutputItemId + 4,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
											  (@GeneralGroup, @PNROutputItemId + 5,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
											  (@GeneralGroup, @PNROutputItemId + 6,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
											  (@ItineraryGroup, @PNROutputItemId + 7,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
											  (@ItineraryGroup, @PNROutputItemId + 8,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1')


             INSERT INTO [dbo].[PnrOutputCondition] (PNROutputItemId,PNROutputConditionName,PNROutputConditionValue,CreationTimestamp,CreationUserIdentifier,VersionNumber)
                                        VALUES (@PNROutputItemId + 1, 'IsPos', 'true', @CreationTimestamp, @CreationUserIdentifier, 1),
                                               (@PNROutputItemId + 2, 'IsPos', 'true', @CreationTimestamp, @CreationUserIdentifier, 1),
										       (@PNROutputItemId + 3, 'IsPos', 'true', @CreationTimestamp, @CreationUserIdentifier, 1)
											   
			 
			 INSERT INTO ConfigurationParameter(ConfigurationParameterName, ConfigurationParameterValue, ContextId,	CreationTimestamp,	CreationUserIdentifier,	VersionNumber)
							VALUES('UsersToStandAlonePassPurchase', 'U001RCM, U001RXJ', 11 , @CreationTimestamp, @CreationUserIdentifier, 1)


       PRINT 'END Script'

       COMMIT TRAN
END TRY
       
BEGIN CATCH
ROLLBACK TRAN

       DECLARE @ErrorMessage NVARCHAR(4000);
       SELECT @ErrorMessage=ERROR_MESSAGE()
       RAISERROR(@ErrorMessage, 10, 1);

END CATCH




 



