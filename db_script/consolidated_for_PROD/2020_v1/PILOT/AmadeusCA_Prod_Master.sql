

--MASTER1

--123456789101234567891012345678910123456789101234567891012345678910123456789101234567891012345678910
--								    Amadeus Prod Deployment
--123456789101234567891012345678910123456789101234567891012345678910123456789101234567891012345678910

USE [Desktop_Sandbox_Pilot]
GO

BEGIN TRAN
BEGIN TRY

		DECLARE @CreationUserIdentifier		NVARCHAR(150)
		DECLARE @CreationTimestamp			DATETIME = GETUTCDATE()
		DECLARE @TeamId 					INT	
		DECLARE @PNROutputItemId			INT
		DECLARE @PNROutputGroupId2			INT
		DECLARE @PNROutputGroupID			INT
		DECLARE @PNROutputGroupIDInvoice	INT
		DECLARE @PNROutputGroupIDIti        INT
		DECLARE @PNROutputRemarkGroupId	    INT				
		DECLARE @ServicingOptionId			INT 
		DECLARE @ServicingOptionName		VARCHAR(255)
		DECLARE @ServicingOptionItemValue	VARCHAR(255)
		DECLARE @MaxItemId					INT
		DECLARE @PlaceHolderName			VARCHAR(255)
		DECLARE @regex						VARCHAR(255)
		DECLARE @CanadaGroupid				INT
		DECLARE @ReasonCodeTypeId				INT
		DECLARE @ReasonCodeGroupId				INT
		DECLARE @ReasonCodeItemId INT

		
		PRINT 'Start Update Amadeus CA Migration - US11130'

              SET @CreationUserIdentifier = 'Amadeus CA Migration - US11130' 
              -- Configs
			  INSERT INTO Context (ContextId, ContextName, CreationTimestamp,CreationUserIdentifier, VersionNumber)
			Values(11, 'Amadeus Corp Scripting', @CreationTimestamp , 'Amadeus CA Migration - US9402', 1)
              INSERT INTO ConfigurationParameter(ConfigurationParameterName, ConfigurationParameterValue, ContextId, CreationTimestamp, CreationUserIdentifier, VersionNumber)
                     VALUES ('LeisureOnDemand', 'YQBWL2100,YTOWL2101,YVRWL2103,YOWWL2105,YXEWL2102,YTOWL210A,YVRWL2102,YTOWL2105,YTOWL2103,YTOWL210J,YTOWL2119, YXEWL2101,YTOWL2109,YOWWL2102', 11, @CreationTimestamp , @CreationUserIdentifier, 1)

       PRINT 'END Update Amadeus CA Migration - US11130'

		PRINT 'Start Update Amadeus CA Migration - US11859'
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
		
		PRINT 'END Update Amadeus CA Migration - US11859'

		PRINT 'Start Update Amadeus CA Migration - US10040'
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

		PRINT 'END Update Amadeus CA Migration - US10040'

		
		PRINT 'Start Update Amadeus CA Migration - US11386'
		SET @CreationUserIdentifier			= 'Amadeus CA Migration - US11386'	
		SET @PNROutputItemId =	(SELECT MAX(PNROutputItemId)  FROM [PNROutputItem])
		SET @PNROutputGroupID =	(SELECT PNROutputGroupId  FROM PNROutputGroup Where PNROutputGroupName = 'Canada Migration General Group')						  
		 		
		INSERT INTO [dbo].[PNROutputItem]	([PNROutputItemId],[PNROutputRemarkTypeCode],[PNROutputBindingTypeCode], [PNROutputUpdateTypeCode],[GDSRemarkQualifier],[RemarkFormat],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber],[PNROutputItemDefaultLanguageCode],[PNROutputItemXMLFormat])
									VALUES	(@PNROutputItemId + 1,1,'0',1,'M','ONHOLD:AWAITING APPROVAL', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL)
		
		INSERT INTO [dbo].[PNROutputGroupPNROutputItem]	([PNROutputGroupId],[PNROutputItemId],[SequenceNumber],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber],[DataStandardizationVersion],[LayoutVersion])     
									VALUES	(@PNROutputGroupID, @PNROutputItemId + 1,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1')
											
		INSERT INTO [dbo].[PnrOutputCondition](PNROutputItemId,PNROutputConditionName,PNROutputConditionValue,CreationTimestamp,CreationUserIdentifier,VersionNumber)
			VALUES(@PNROutputItemId + 1, 'isOnHold', 'true', @CreationTimestamp, @CreationUserIdentifier, 1)

		PRINT 'Start Update Amadeus CA Migration - US11386'

		PRINT 'Start Update Amadeus CA Migration - US9901'
		SET @CreationUserIdentifier			= 'Amadeus CA Migration - US9901'	
		SET @PNROutputItemId =	(SELECT MAX(PNROutputItemId)  FROM [PNROutputItem])
		SET @PNROutputGroupID =	(SELECT PNROutputGroupId  FROM PNROutputGroup Where PNROutputGroupName = 'Canada Migration General Group')
        SET @PNROutputGroupIDIti =	(SELECT PNROutputGroupId  FROM PNROutputGroup Where PNROutputGroupName = 'Canada Migration Itinerary Group')
		SET @PNROutputRemarkGroupId = (SELECT MAX(PNROutputRemarkGroupId)  FROM PNROutputRemarkGroup)

		
		INSERT INTO [dbo].[PNROutputPlaceHolder]([PNROutputPlaceHolderName],[PNROutputPlaceHolderRegularExpresssion],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber])
									VALUES( '%Language%', '[A-Z]{2}-[A-Z]{2}',@CreationTimestamp, @CreationUserIdentifier, 1 ),
									( '%Service%', '(.*)',@CreationTimestamp, @CreationUserIdentifier, 1 ),
									( '%Offer%', '(.*)',@CreationTimestamp, @CreationUserIdentifier, 1 )
	    								  
		 		
		INSERT INTO [dbo].[PNROutputItem]	([PNROutputItemId],[PNROutputRemarkTypeCode],[PNROutputBindingTypeCode], [PNROutputUpdateTypeCode],[GDSRemarkQualifier],[RemarkFormat],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber],[PNROutputItemDefaultLanguageCode],[PNROutputItemXMLFormat])
									VALUES	(@PNROutputItemId + 1,0,'0',1,'Z','LANGUAGE-%Language%', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),
										(@PNROutputItemId + 2,0,'0',1,'Q','EMAIL ADD-NO', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),
										(@PNROutputItemId + 3,1,'0',1,'','*SERVICE**%Service%*', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),  
										(@PNROutputItemId + 4,1,'0',1,'','*OFFER**%Offer%*', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL) 
		
		INSERT INTO [dbo].[PNROutputGroupPNROutputItem]	([PNROutputGroupId],[PNROutputItemId],[SequenceNumber],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber],[DataStandardizationVersion],[LayoutVersion])     
									VALUES	(@PNROutputGroupID, @PNROutputItemId + 1,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
											(@PNROutputGroupID, @PNROutputItemId + 2,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
											(@PNROutputGroupIDIti, @PNROutputItemId + 3,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
											(@PNROutputGroupIDIti, @PNROutputItemId + 4,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1')

		INSERT INTO [dbo].[PnrOutputCondition](PNROutputItemId,PNROutputConditionName,PNROutputConditionValue,CreationTimestamp,CreationUserIdentifier,VersionNumber)
			VALUES(@PNROutputItemId + 2, 'EmailAddNo', 'true', @CreationTimestamp, @CreationUserIdentifier, 1)

	PRINT 'Start Update Amadeus CA Migration - US9901'

		
		PRINT 'Start Update Amadeus CA Migration - US9402'

              SET @CreationUserIdentifier  = 'Amadeus CA Migration - US9402' 
              SET @PNROutputItemId =     (SELECT MAX(PNROutputItemId)  FROM [PNROutputItem])
              SET @PNROutputGroupID =    (SELECT PNROutputGroupId  FROM [PNROutputGroup] where pnroutputgroupname = 'Canada Migration General Group')
              
              -- Configs
              --INSERT INTO Context (ContextId, ContextName, CreationTimestamp,CreationUserIdentifier, VersionNumber)
              --       Values(11, 'Amadeus Corp Scripting',  GETUTCDATE()     , 'Amadeus CA Migration - US9402', 1)
              INSERT INTO ConfigurationParameter(ConfigurationParameterName, ConfigurationParameterValue, ContextId, CreationTimestamp, CreationUserIdentifier, VersionNumber)
                     VALUES ('MigrationOBTFee ', 'RBP, NRD, ABC', 11, GETUTCDATE() , 'Amadeus CA Migration - US9402', 1)
              INSERT INTO ConfigurationParameter(ConfigurationParameterName, ConfigurationParameterValue, ContextId, CreationTimestamp, CreationUserIdentifier, VersionNumber)
                     VALUES ('MigrationOBTFeeDate ', '01/30/2019,11/01/2019', 11, GETUTCDATE()  , 'Amadeus CA Migration - US9402', 1)

              INSERT INTO [dbo].[PNROutputPlaceHolder]([PNROutputPlaceHolderName],[PNROutputPlaceHolderRegularExpresssion],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber])
                                                              VALUES( '%SupfeeSegment%', '(ATE|RTE|HBE|CBE)',@CreationTimestamp, @CreationUserIdentifier, 1 )

              INSERT INTO [dbo].[PNROutputItem]([PNROutputItemId],[PNROutputRemarkTypeCode],[PNROutputBindingTypeCode],[PNROutputUpdateTypeCode],[GDSRemarkQualifier],[RemarkFormat],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber],[PNROutputItemDefaultLanguageCode],[PNROutputItemXMLFormat])
                     VALUES        (@PNROutputItemId + 1,0,'0',1,'F','SUPFEE1-%SupfeeSegment%', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL)
              

              INSERT INTO PNROutputGroupPNROutputItem (PNROutputGroupId, PNROutputItemId, SequenceNumber, CreationTimestamp, CreationUserIdentifier, VersionNumber, DataStandardizationVersion, LayoutVersion)
                     VALUES (@PNROutputGroupID,  @PNROutputItemID + 1, 0, @CreationTimeStamp, @CreationUserIdentifier, 1, 1, 1)

		PRINT 'Start Update Amadeus CA Migration - US9402'
		
		PRINT 'Start Update Amadeus CA Migration - US11821'
              SET @CreationUserIdentifier              = 'Amadeus CA Migration - US11821' 
              SET @PNROutputItemId =     (SELECT MAX(PNROutputItemId)  FROM [PNROutputItem])
              SET @PNROutputRemarkGroupId = (SELECT MAX(PNROutputRemarkGroupId)  FROM PNROutputRemarkGroup)
              SET @PNROutputGroupId       =     (SELECT PNROutputGroupId  FROM [PNROutputGroup] Where PNROutputGroupName = 'Canada Migration General Group')
              

              INSERT INTO [dbo].[PNROutputPlaceHolder]([PNROutputPlaceHolderName],[PNROutputPlaceHolderRegularExpresssion],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber])
                                                              VALUES( '%NbrNo%', '[0-9]{1,}[A-Z]{1,}[0-9]{1,}[A-Z]{1,}',@CreationTimestamp, @CreationUserIdentifier, 1 ),
                                                                       ( '%IrdStatus%', '(^$|.*)',@CreationTimestamp, @CreationUserIdentifier, 1 ),
                                                                    ( '%IrdSavings%', '\d+(\.\d{1,2})',@CreationTimestamp, @CreationUserIdentifier, 1 ),
                                                                       ( '%LowFareSavings%', '\d+(\.\d{1,2})',@CreationTimestamp, @CreationUserIdentifier, 1 ),
                                                                       ( '%IrdCurrency%', '([A-Z]{3})',@CreationTimestamp, @CreationUserIdentifier, 1 ),
																	   ( '%IrdHeader%', '(.*)',@CreationTimestamp, @CreationUserIdentifier, 1 )                                                      
              
                           
              INSERT INTO [dbo].[PNROutputItem]([PNROutputItemId],[PNROutputRemarkTypeCode],[PNROutputBindingTypeCode], [PNROutputUpdateTypeCode],[GDSRemarkQualifier],[RemarkFormat],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber],[PNROutputItemDefaultLanguageCode],[PNROutputItemXMLFormat])
																VALUES (@PNROutputItemId + 1,0,'S',1,'F','** IRD WORKING ** %IrdHeader%', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),
																	   (@PNROutputItemId + 2,0,'S',1,'F','----------CWT IRD RATE NBR %NbrNo%-------%IrdStatus%', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),
                                                                       (@PNROutputItemId + 3,0,'S',1,'F','--------IRD SAVINGS ACHIEVED %IrdCurrency% %IrdSavings% --------', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),
                                                                       (@PNROutputItemId + 4,0,'S',1,'F','-----LOW FARE OPTION SAVINGS ACHIEVED %LowFareSavings%---', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL)

              INSERT INTO [dbo].[PNROutputGroupPNROutputItem]       ([PNROutputGroupId],[PNROutputItemId],[SequenceNumber],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber],[DataStandardizationVersion],[LayoutVersion])     
                                                              VALUES (@PNROutputGroupId, @PNROutputItemId + 1,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
                                                                           (@PNROutputGroupId, @PNROutputItemId + 2,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
                                                                           (@PNROutputGroupId, @PNROutputItemId + 3,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
																		   (@PNROutputGroupId, @PNROutputItemId + 4,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1')

              INSERT INTO dbo.PNROutputRemarkGroup(PNROutputRemarkGroupId, PNROutputRemarkGroupName, CreationTimestamp, CreationUserIdentifier, LastUpdateTimestamp, LastUpdateUserIdentifier, VersionNumber,       PNROutputRemarkGroupKey) 
              VALUES                                                 (@PNROutputRemarkGroupId + 1, 'CanadaAmadeusIrdRemarks', @CreationTimestamp,  @CreationUserIdentifier, NULL, NULL, 1,NULL)

                                                                           
              INSERT INTO [dbo].[PNROutputRemarkGroupPNROutputItem]([PNROutputRemarkGroupId],PNROutputItemId,[CreationTimestamp],[CreationUserIdentifier],[VersionNumber])
                                  VALUES(@PNROutputRemarkGroupId + 1 ,@PNROutputItemId + 1,@CreationTimestamp,@CreationUserIdentifier,1),
                                           (@PNROutputRemarkGroupId + 1 ,@PNROutputItemId + 2,@CreationTimestamp,@CreationUserIdentifier,1),
                                           (@PNROutputRemarkGroupId + 1 ,@PNROutputItemId + 3,@CreationTimestamp,@CreationUserIdentifier,1)


       PRINT 'Start Update Amadeus CA Migration - US11821'

	   PRINT 'START Update Amadeus CA Migration - US10869' 
			SET @CreationUserIdentifier			= 'Amadeus CA Migration - US10869'	
			SET @PNROutputItemId =	(SELECT MAX(PNROutputItemId)  FROM [PNROutputItem])
			SET @PNROutputGroupID =	(SELECT MAX(PNROutputGroupId)  FROM [PNROutputGroup])
			SET @PNROutputRemarkGroupId = (SELECT MAX(PNROutputRemarkGroupId)  FROM PNROutputRemarkGroup)
			SET @PNROutputGroupIDIti = (SELECT PNROutputGroupID from PNROutputGroup where PNROutputGroupName ='Canada Migration Itinerary Group')
			SET @PNROutputGroupID = (SELECT PNROutputGroupID from PNROutputGroup where PNROutputGroupName ='Canada Migration General Group')
			SET @PNROutputGroupIDInvoice = (SELECT PNROutputGroupID from PNROutputGroup where PNROutputGroupName ='Canada Migration BackOffice Group')
		

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

			
			INSERT INTO	[dbo].[PNROutputItemLanguage] ( PNROutputItemId, LanguageCode, RemarkFormatTranslation, CreationTimestamp, CreationUserIdentifier, VersionNumber)
										VALUES (@PNROutputItemId + 8, 'fr-CA', 'TOUS LES DETAILS ONT ETE PRESENTES AU CLIENT ET', @CreationTimestamp,@CreationUserIdentifier,1),
												(@PNROutputItemId + 9, 'fr-CA', 'APPROUVES PAR CE DERNIER.', @CreationTimestamp,@CreationUserIdentifier,1),
											   (@PNROutputItemId + 10, 'fr-CA', 'LES FRAIS APPLIQUES A LA CARTE DE CREDIT DES', @CreationTimestamp,@CreationUserIdentifier,1),
											   (@PNROutputItemId + 11, 'fr-CA', 'CLIENTS ONT ETE APPROUVES PAR LE CLIENT.', @CreationTimestamp,@CreationUserIdentifier,1)

		
			INSERT INTO [dbo].[PNROutputGroupPNROutputItem]	([PNROutputGroupId],[PNROutputItemId],[SequenceNumber],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber],[DataStandardizationVersion],[LayoutVersion])     
										VALUES	(@PNROutputGroupIDIti, @PNROutputItemId + 1,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
												(@PNROutputGroupIDIti, @PNROutputItemId + 2,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
												(@PNROutputGroupID, @PNROutputItemId + 3,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
												(@PNROutputGroupID, @PNROutputItemId + 4,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
												(@PNROutputGroupID, @PNROutputItemId + 5,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
												(@PNROutputGroupID, @PNROutputItemId + 6,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
												(@PNROutputGroupIDInvoice, @PNROutputItemId + 7,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
												(@PNROutputGroupID, @PNROutputItemId + 8,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
												(@PNROutputGroupID, @PNROutputItemId + 9,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
												(@PNROutputGroupID, @PNROutputItemId + 10,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
												(@PNROutputGroupID, @PNROutputItemId + 11,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1')

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

		PRINT 'END Update Amadeus CA Migration - US10869' 


		PRINT 'Start Update Amadeus CA Migration - US11134'
			SET @CreationUserIdentifier			= 'Amadeus CA Migration - US11134'	
			SET @PNROutputItemId =	(SELECT MAX(PNROutputItemId) FROM [PNROutputItem])
			SET @PNROutputGroupID =	(SELECT PNROutputGroupID FROM [PNROutputGroup] Where PNROutputGroupName = 'Canada Migration General Group')
			SET @PNROutputGroupIDInvoice =	(SELECT PNROutputGroupID FROM [PNROutputGroup] Where PNROutputGroupName = 'Canada Migration BackOffice Group')
			SET @PNROutputRemarkGroupId = (SELECT PNROutputRemarkGroupId FROM PNROutputRemarkGroup where PNROutputRemarkGroupName = 'CanadaAmadeusTktRemarks')
		

			INSERT INTO [dbo].[PNROutputPlaceHolder] ([PNROutputPlaceHolderName],[PNROutputPlaceHolderRegularExpresssion],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber])
			VALUES( '%PenaltyAmt%', '([0-9]*\.{0,1}[0-9]{0,2})', @CreationTimestamp, @CreationUserIdentifier, 1 ),
					( '%PenaltyGst%', '([0-9]*\.{0,1}[0-9]{0,2})', @CreationTimestamp, @CreationUserIdentifier, 1 ),
					( '%PenaltyHst%', '([0-9]*\.{0,1}[0-9]{0,2})', @CreationTimestamp, @CreationUserIdentifier, 1 ),
					( '%PenaltyQst%', '([0-9]*\.{0,1}[0-9]{0,2})', @CreationTimestamp, @CreationUserIdentifier, 1 ),
					( '%OtherTax%', '([0-9]*\.{0,1}[0-9]{0,2})', @CreationTimestamp, @CreationUserIdentifier, 1 ),
					( '%CnNumber%', '([A-Z0-9]{3})', @CreationTimestamp, @CreationUserIdentifier, 1 ),
					( '%PassNumber%', '([0-9]+)', @CreationTimestamp, @CreationUserIdentifier, 1 ),
					( '%GdsFare%', '([0-9]*\.{0,1}[0-9]{0,2})', @CreationTimestamp, @CreationUserIdentifier, 1 ),
					( '%VnCode%', '([A-Z0-9]{3})', @CreationTimestamp, @CreationUserIdentifier, 1 ),
					( '%OriginalTicketNumber%', '([0-9]+)', @CreationTimestamp, @CreationUserIdentifier, 1 ),
					( '%ExchangeAirlineCode%', '([A-Z0-9]{2})', @CreationTimestamp, @CreationUserIdentifier, 1 )
								  	
		 		
			INSERT INTO [dbo].[PNROutputItem]([PNROutputItemId],[PNROutputRemarkTypeCode],[PNROutputBindingTypeCode], [PNROutputUpdateTypeCode],[GDSRemarkQualifier],[RemarkFormat],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber],[PNROutputItemDefaultLanguageCode],[PNROutputItemXMLFormat])
			VALUES (@PNROutputItemId + 1, 0, 'S', 1, 'T', 'TKT%TktRemarkNbr%-VN-%VnCode%/BA-%PenaltyAmt%/TX1-%PenaltyGst%XG/TX2-%PenaltyHst%RC/TX3-%PenaltyQst%XQ/TX4-%OtherTax%XT', @CreationTimestamp, @CreationUserIdentifier, 1, 'en-GB', NULL),
				(@PNROutputItemId + 2, 3, '0', 1, '', 'NUC', @CreationTimestamp, @CreationUserIdentifier, 1, 'en-GB', NULL),
				(@PNROutputItemId + 3, 0, '0', 1, 'G', '%ExchangeAirlineCode%PASSCHG', @CreationTimestamp, @CreationUserIdentifier, 1, 'en-GB', NULL),
				(@PNROutputItemId + 4, 3, '0', 1, '', 'U14/-%AirlineCode%PASS-%PassNumber%.%FareType%/%GdsFare%', @CreationTimestamp, @CreationUserIdentifier, 1, 'en-GB', NULL),
				(@PNROutputItemId + 5, 1, '0', 2, '', 'THE AIRLINE TICKET CHARGE ON THIS ITINERARY/INVOICE', @CreationTimestamp, @CreationUserIdentifier, 1, 'en-GB', NULL),
				(@PNROutputItemId + 6, 1, '0', 2, '', 'IS FOR INTERNAL COST RE-ALLOCATION PURPOSES ONLY.', @CreationTimestamp, @CreationUserIdentifier, 1, 'en-GB', NULL),
				(@PNROutputItemId + 7, 1, '0', 2, '', '**PLEASE DO NOT EXPENSE** THIS CHARGE AS IT WILL NOT APPEAR', @CreationTimestamp, @CreationUserIdentifier, 1, 'en-GB', NULL),
				(@PNROutputItemId + 8, 1, '0', 2, '', 'ON YOUR CREDIT CARD STATEMENT.', @CreationTimestamp, @CreationUserIdentifier, 1, 'en-GB', NULL),
				(@PNROutputItemId + 9, 3, '0', 1, '', 'NE/-EX-Y/-OTK-%OriginalTicketNumber%', @CreationTimestamp, @CreationUserIdentifier, 1, 'en-GB', NULL),
				(@PNROutputItemId + 10, 3, '0', 1, '', 'NE/-EX-Y', @CreationTimestamp, @CreationUserIdentifier, 1, 'en-GB', NULL)
		
			INSERT INTO	[dbo].[PNROutputItemLanguage]( PNROutputItemId, LanguageCode, RemarkFormatTranslation, CreationTimestamp, CreationUserIdentifier, VersionNumber)
			VALUES(@PNROutputItemId + 5, 'fr-CA', 'LES FRAIS DE BILLET D AVION DE CET ITINERAIRE/FACTURE', @CreationTimestamp, @CreationUserIdentifier, 1),
					(@PNROutputItemId + 6, 'fr-CA', 'NE SONT QU AUX FINS DE REATTRIBUTION DES COUTS A L INTERNE.', @CreationTimestamp, @CreationUserIdentifier, 1),
					(@PNROutputItemId + 7, 'fr-CA', '**VEILLEZ NE PAS INSCRIRE** CES COUTS PUISQU ILS NE', @CreationTimestamp, @CreationUserIdentifier, 1),
					(@PNROutputItemId + 8, 'fr-CA', 'PARAITRONT PAS SUR VOTRE RELEVE DE CARTE DE CREDIT.', @CreationTimestamp, @CreationUserIdentifier, 1)
											
										          
			INSERT INTO [dbo].[PNROutputGroupPNROutputItem]([PNROutputGroupId],[PNROutputItemId],[SequenceNumber],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber],[DataStandardizationVersion],[LayoutVersion])
			VALUES(@PNROutputGroupID, @PNROutputItemId + 1, 0, @CreationTimestamp, @CreationUserIdentifier, 1, '1', '1'),
					(@PNROutputGroupIDInvoice, @PNROutputItemId + 2, 0, @CreationTimestamp, @CreationUserIdentifier, 1, '1', '1'),
					(@PNROutputGroupID, @PNROutputItemId + 3, 0, @CreationTimestamp, @CreationUserIdentifier, 1, '1', '1'),
					(@PNROutputGroupIDInvoice, @PNROutputItemId + 4, 0, @CreationTimestamp, @CreationUserIdentifier, 1, '1', '1'),
					(@PNROutputGroupID, @PNROutputItemId + 5, 1, @CreationTimestamp, @CreationUserIdentifier, 1, '1', '1'),
					(@PNROutputGroupID, @PNROutputItemId + 6, 2, @CreationTimestamp, @CreationUserIdentifier, 1, '1', '1'),
					(@PNROutputGroupID, @PNROutputItemId + 7, 3, @CreationTimestamp, @CreationUserIdentifier, 1, '1', '1'),
					(@PNROutputGroupID, @PNROutputItemId + 8, 4, @CreationTimestamp, @CreationUserIdentifier, 1, '1', '1'),
					(@PNROutputGroupIDInvoice, @PNROutputItemId + 9, 0, @CreationTimestamp, @CreationUserIdentifier, 1, '1', '1'),
					(@PNROutputGroupIDInvoice, @PNROutputItemId + 10, 0, @CreationTimestamp, @CreationUserIdentifier, 1, '1', '1')

			INSERT INTO [dbo].[PnrOutputCondition](PNROutputItemId,PNROutputConditionName,PNROutputConditionValue,CreationTimestamp,CreationUserIdentifier,VersionNumber)
			VALUES(@PNROutputItemId + 2, 'IsNuc', 'true', @CreationTimestamp, @CreationUserIdentifier, 1),
				(@PNROutputItemId + 10, 'NoOriginalTicket', 'true', @CreationTimestamp, @CreationUserIdentifier, 1)

			INSERT INTO [dbo].[PNROutputRemarkGroupPNROutputItem]([PNROutputRemarkGroupId],PNROutputItemId,[CreationTimestamp],[CreationUserIdentifier],[VersionNumber])
			VALUES(@PNROutputRemarkGroupId , @PNROutputItemId + 1, @CreationTimestamp, @CreationUserIdentifier, 1)
		PRINT 'END Update Amadeus CA Migration - US111341' 

		PRINT 'START Update Amadeus CA Migration - US9619' 
			SET @CreationUserIdentifier			= 'Amadeus CA Migration - US9619'	
			SET @PNROutputItemId  =	(SELECT MAX(PNROutputItemId) FROM [PNROutputItem])
			SET @PNROutputGroupID =	(SELECT MAX(PNROutputGroupId) FROM [PNROutputGroup])
			SET @PNROutputGroupID =	(SELECT PNROutputGroupID FROM [PNROutputGroup] Where PNROutputGroupName = 'Canada Migration General Group')

			INSERT INTO [dbo].[PNROutputPlaceHolder] ([PNROutputPlaceHolderName],[PNROutputPlaceHolderRegularExpresssion],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber])
			VALUES( '%SupFeeInfo%', '(([A-Z]{3})(\d+\.?\d+)?(\/?))+$', @CreationTimestamp, @CreationUserIdentifier, 1 ),
				  ( '%SupFeeTicketId%', '[0-9]{1,2}', @CreationTimestamp, @CreationUserIdentifier, 1 )
													
			INSERT INTO [dbo].[PNROutputItem]([PNROutputItemId],[PNROutputRemarkTypeCode],[PNROutputBindingTypeCode], [PNROutputUpdateTypeCode],[GDSRemarkQualifier],[RemarkFormat],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber],[PNROutputItemDefaultLanguageCode],[PNROutputItemXMLFormat])
			VALUES (@PNROutputItemId + 1, 0, 'S', 1, 'F', 'SUPFEE%SupFeeTicketId%-%SupFeeInfo%', @CreationTimestamp, @CreationUserIdentifier, 1, 'en-GB', NULL)
										          
			INSERT INTO [dbo].[PNROutputGroupPNROutputItem]([PNROutputGroupId],[PNROutputItemId],[SequenceNumber],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber],[DataStandardizationVersion],[LayoutVersion])
			VALUES(@PNROutputGroupID, @PNROutputItemId + 1, 0, @CreationTimestamp, @CreationUserIdentifier, 1, '1', '1')
		
		PRINT 'END Update Amadeus CA Migration - US9619' 

		PRINT 'START Update Amadeus CA Migration - US9964' 
			SET @CreationUserIdentifier	='Amadeus CA Migration - US9964'
			SET @PNROutputItemId = (SELECT MAX(PNROutputItemID) FROM PNROutputItem)
			SET @PNROutputGroupID =(SELECT PNROutputGroupID from PNROutputGroup where PNROutputGroupName ='Canada Migration BackOffice Group')
		
			INSERT INTO PNROutputPlaceHolder(PNROutputPlaceHolderName,   PNROutputPlaceHolderRegularExpresssion, PNROutputPlaceHolderExampleData, CreationTimestamp,  CreationUserIdentifier,  VersionNumber)
				VALUES ('%CAOverrideValue%', '([A-Z]{3})',NULL,@CreationTimestamp, @CreationUserIdentifier, 1)
	
			INSERT INTO PNROutputItem (PNROutputItemId, PNROutputRemarkTypeCode, PNROutputUpdateTypeCode, GDSRemarkQualifier, RemarkFormat, PNROutputBindingTypeCode, CreationTimestamp, CreationUserIdentifier, VersionNumber, PNROutputItemDefaultLanguageCode) 
				VALUES (@PNROutputItemID + 1, 3, 1, '', 'U86/-OVERRIDE %CAOverrideValue%', 0, @CreationTimeStamp, @CreationUserIdentifier, 1,'en-GB')		   

			INSERT INTO PNROutputGroupPNROutputItem (PNROutputGroupId, PNROutputItemId, SequenceNumber, CreationTimestamp, CreationUserIdentifier, VersionNumber, DataStandardizationVersion, LayoutVersion)
				VALUES (@PNROutputGroupID,  @PNROutputItemID + 1, 0, @CreationTimeStamp, @CreationUserIdentifier, 1, 1, 1)
		PRINT 'END Update Amadeus CA Migration - US9964' 

		PRINT 'START Update Amadeus CA Migration - US10551' 
			SET @CreationUserIdentifier = 'Amadeus CA Migration - US10551'
			SET @PNROutputRemarkGroupId = (SELECT MAX(PNROutputRemarkGroupId) + 1 FROM [PNROutputRemarkGroup])
		
			INSERT INTO [dbo].[PNROutputRemarkGroup]([PNROutputRemarkGroupId],[PNROutputRemarkGroupName],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber],[PNROutputRemarkGroupKey])
				VALUES(@PNROutputRemarkGroupId,'CAFareRemarks',@CreationTimestamp,@CreationUserIdentifier,1,null)

			DECLARE @PNROutputItemIDHighFare AS INT	 = (SELECT TOP 1 PNROutputItemID FROM PNROutputItem WHERE RemarkFormat='FF/-%CAAirHighFare%')
			DECLARE @PNROutputItemIDLowFare	AS INT	 = (SELECT TOP 1 PNROutputItemID FROM PNROutputItem	WHERE RemarkFormat='LP/-%CAAirLowFare%')
			DECLARE @PNROutputItemIDReasonCode AS INT	 = (SELECT TOP 1 PNROutputItemID FROM PNROutputItem WHERE RemarkFormat='FS/-%CAAirRealisedSavingCode%')

	
			INSERT INTO [dbo].[PNROutputRemarkGroupPNROutputItem]
			   ([PNROutputRemarkGroupId],[PNROutputItemId],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber])
			VALUES(@PNROutputRemarkGroupId,@PNROutputItemIDHighFare,@CreationTimestamp,@CreationUserIdentifier,1),
			   (@PNROutputRemarkGroupId,@PNROutputItemIDLowFare,@CreationTimestamp,@CreationUserIdentifier,1),
			   (@PNROutputRemarkGroupId,@PNROutputItemIDReasonCode,@CreationTimestamp,@CreationUserIdentifier,1)

		PRINT 'END Update Amadeus CA Migration - US10551' 

		PRINT 'START Update Amadeus CA Migration - US10552' 
			SET @CreationUserIdentifier			= 'Amadeus CA Migration - US10552'	
			SET @PNROutputItemId  =	(SELECT MAX(PNROutputItemId)   FROM [PNROutputItem])
			SET @PNROutputGroupIDInvoice     =	(SELECT PNROutputGroupId  FROM [PNROutputGroup] Where PNROutputGroupName = 'Canada Migration BackOffice Group')

			INSERT INTO [dbo].[PNROutputPlaceHolder]([PNROutputPlaceHolderName],[PNROutputPlaceHolderRegularExpresssion],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber])
										VALUES( '%confNbr%', '(.*)',@CreationTimestamp, @CreationUserIdentifier, 1 )
													
			INSERT INTO [dbo].[PNROutputItem]	([PNROutputItemId],[PNROutputRemarkTypeCode],[PNROutputBindingTypeCode], [PNROutputUpdateTypeCode],[GDSRemarkQualifier],[RemarkFormat],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber],[PNROutputItemDefaultLanguageCode],[PNROutputItemXMLFormat])
										VALUES	(@PNROutputItemId + 1,1,'S',1,'','AIRLINE LOCATOR NUMBER - %confNbr%', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL)
										          
			INSERT INTO [dbo].[PNROutputGroupPNROutputItem]	([PNROutputGroupId],[PNROutputItemId],[SequenceNumber],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber],[DataStandardizationVersion],[LayoutVersion])     
										VALUES	(@PNROutputGroupIDInvoice, @PNROutputItemId + 1,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1')
		PRINT 'END Update Amadeus CA Migration - US10552' 

		

		PRINT 'START Update Amadeus CA Migration - US9700' 
			SET @CreationUserIdentifier			= 'Amadeus CA Migration - US9700'	
			SET @PNROutputItemId =	(SELECT MAX(PNROutputItemId)  FROM [PNROutputItem])
			SET @PNROutputGroupID =	(SELECT PNROutputGroupId  FROM PNROutputGroup Where PNROutputGroupName = 'Canada Migration BackOffice Group')
			SET @PNROutputRemarkGroupId = (SELECT MAX(PNROutputRemarkGroupId)  FROM PNROutputRemarkGroup)

		
			INSERT INTO [dbo].[PNROutputPlaceHolder]([PNROutputPlaceHolderName],[PNROutputPlaceHolderRegularExpresssion],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber])
										VALUES( '%RecordLocator%', '(.*)',@CreationTimestamp, @CreationUserIdentifier, 1 )
										  
										
		 		
			INSERT INTO [dbo].[PNROutputItem]	([PNROutputItemId],[PNROutputRemarkTypeCode],[PNROutputBindingTypeCode], [PNROutputUpdateTypeCode],[GDSRemarkQualifier],[RemarkFormat],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber],[PNROutputItemDefaultLanguageCode],[PNROutputItemXMLFormat])
										VALUES	(@PNROutputItemId + 1,3,'0',1,'','U70/-%RecordLocator%', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL)
											
		
			INSERT INTO [dbo].[PNROutputGroupPNROutputItem]	([PNROutputGroupId],[PNROutputItemId],[SequenceNumber],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber],[DataStandardizationVersion],[LayoutVersion])     
										VALUES	(@PNROutputGroupID, @PNROutputItemId + 1,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1')
		PRINT 'END Update Amadeus CA Migration - US9700' 

		PRINT 'START Update Amadeus CA Migration - US100128' 
			SET @CreationUserIdentifier	   =    'Amadeus CA Migration - US100128'	
			SET @PNROutputItemId           =    (SELECT MAX(PNROutputItemId)  FROM [PNROutputItem])
			--SET @EBLine = (Select PNROutputItemId from PNROutputItem where remarkformat = 'EB/-%TouchLevelCA%' and PNROutputUpdateTypeCode = 1)
			SET @PNROutputGroupIDIti      =	(SELECT PNROutputGroupId  FROM [PNROutputGroup] Where PNROutputGroupName = 'Canada Migration Itinerary Group')
			SET @PNROutputGroupIDInvoice          =	(SELECT PNROutputGroupId  FROM [PNROutputGroup] Where PNROutputGroupName = 'Canada Migration BackOffice Group')
		

			INSERT INTO [dbo].[PNROutputPlaceHolder]([PNROutputPlaceHolderName],[PNROutputPlaceHolderRegularExpresssion],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber])
										VALUES( '%RemarkDescription%', '(.*)',@CreationTimestamp, @CreationUserIdentifier, 1 ),
											  ( '%TotalTax%', '(.*)',@CreationTimestamp, @CreationUserIdentifier, 1 ),
											  ( '%TouchLevelCA%', '(.*)',@CreationTimestamp, @CreationUserIdentifier, 1 )
												
		 		
			INSERT INTO [dbo].[PNROutputItem]	([PNROutputItemId],[PNROutputRemarkTypeCode],[PNROutputBindingTypeCode], [PNROutputUpdateTypeCode],[GDSRemarkQualifier],[RemarkFormat],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber],[PNROutputItemDefaultLanguageCode],[PNROutputItemXMLFormat])
										VALUES  (@PNROutputItemId + 1,1,'S',1,'','PAID %RemarkDescription% CF-%ConfNbr% CAD%BaseAmt% PLUS %TotalTax% TAX ON %CCVendor%', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),
												(@PNROutputItemId + 2,3,'0',1,'','EB/-%TouchLevelCA%', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL)

										          
			INSERT INTO [dbo].[PNROutputGroupPNROutputItem]	([PNROutputGroupId],[PNROutputItemId],[SequenceNumber],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber],[DataStandardizationVersion],[LayoutVersion])     
										VALUES	(@PNROutputGroupIDIti,        @PNROutputItemId + 1,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
												(@PNROutputGroupIDInvoice ,    @PNROutputItemId + 2,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1')
		PRINT 'END Update Amadeus CA Migration - US100128' 

		PRINT 'START Update Amadeus CA Migration - US11000' 
			SET @CreationUserIdentifier			= 'Amadeus CA Migration - US11000'	
			SET @PNROutputItemID    =	(SELECT MAX(PNROutputItemId)   FROM [PNROutputItem])
			SET @PNROutputGroupID   =	(SELECT PNROutputGroupId  FROM [PNROutputGroup] Where PNROutputGroupName = 'Canada Migration General Group')


			INSERT INTO [dbo].[PNROutputPlaceHolder]([PNROutputPlaceHolderName],[PNROutputPlaceHolderRegularExpresssion],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber])
										VALUES ( '%IataCode%', '(.*)',@CreationTimestamp, @CreationUserIdentifier, 1 )
													
			INSERT INTO [dbo].[PNROutputItem]	([PNROutputItemId],[PNROutputRemarkTypeCode],[PNROutputBindingTypeCode], [PNROutputUpdateTypeCode],[GDSRemarkQualifier],[RemarkFormat],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber],[PNROutputItemDefaultLanguageCode],[PNROutputItemXMLFormat])
										VALUES  (@PNROutputItemID + 1,0,'S',1,'','*DE/-%IataCode%', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL)

			INSERT INTO [dbo].[PNROutputGroupPNROutputItem]	([PNROutputGroupId],[PNROutputItemId],[SequenceNumber],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber],[DataStandardizationVersion],[LayoutVersion])     
										VALUES	(@PNROutputGroupID, @PNROutputItemID + 1,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1')
		PRINT 'END Update Amadeus CA Migration - US11000' 

		PRINT 'START Update Amadeus CA Migration - US11820' 
		SET @CreationUserIdentifier			= 'Amadeus CA Migration - US11820'	
		SET @PNROutputItemID    =	(SELECT MAX(PNROutputItemId)FROM [PNROutputItem])
		SET @PNROutputGroupID   =	(SELECT PNROutputGroupId FROM [PNROutputGroup] Where PNROutputGroupName = 'Canada Itinerary Remarks Group')


	    INSERT INTO [dbo].[PNROutputPlaceHolder] ([PNROutputPlaceHolderName],[PNROutputPlaceHolderRegularExpresssion],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber])
		VALUES ( '%CaSeatType%', '(([A-Z]{6}))', @CreationTimestamp, @CreationUserIdentifier, 1 ),
			   ( '%CaUPFIB%'   , '([0-9][a-zA-Z])', @CreationTimestamp, @CreationUserIdentifier, 1 )

													
		INSERT INTO [dbo].[PNROutputItem]([PNROutputItemId],[PNROutputRemarkTypeCode],[PNROutputBindingTypeCode], [PNROutputUpdateTypeCode],[GDSRemarkQualifier],[RemarkFormat],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber],[PNROutputItemDefaultLanguageCode],[PNROutputItemXMLFormat])
		VALUES(@PNROutputItemID + 1, 1, 'S', 1, '', 'SEATING SUBJECT TO', @CreationTimestamp, @CreationUserIdentifier, 1, 'en-GB', NULL),
		(@PNROutputItemID + 2, 1, 'S', 1, '', 'AIRPORT OR ONLINE CHECK IN', @CreationTimestamp, @CreationUserIdentifier, 1, 'en-GB', NULL),
		(@PNROutputItemID + 3, 1, 'S', 1, '', 'PREFERRED SEAT UNAVAILABLE', @CreationTimestamp, @CreationUserIdentifier, 1, 'en-GB', NULL),
		(@PNROutputItemID + 4, 1, 'S', 1, '', 'PLEASE CHECK AGAIN AT THE GATE', @CreationTimestamp, @CreationUserIdentifier, 1, 'en-GB', NULL),
		(@PNROutputItemID + 5, 1, 'S', 1, '', 'PREFERRED SEAT UNAVAILABLE-%CaSeatType% SEAT CONFIRMED', @CreationTimestamp, @CreationUserIdentifier, 1, 'en-GB', NULL),
		(@PNROutputItemID + 6, 1, 'S', 1, '', 'THIS SEGMENT HAS BEEN WAITLISTED', @CreationTimestamp, @CreationUserIdentifier, 1, 'en-GB', NULL),
		(@PNROutputItemID + 7, 1, 'S', 1, '', 'SEAT ASSIGNMENTS ARE ON REQUEST', @CreationTimestamp, @CreationUserIdentifier, 1, 'en-GB', NULL),
		(@PNROutputItemID + 8, 1, 'S', 1, '', 'UPGRADE CONFIRMED - SEAT %CaUPFIB% CONFIRMED', @CreationTimestamp, @CreationUserIdentifier, 1, 'en-GB', NULL),
		(@PNROutputItemID + 9, 1, 'S', 1, '', 'UPGRADE CONFIRMED', @CreationTimestamp, @CreationUserIdentifier, 1, 'en-GB', NULL),
		(@PNROutputItemID + 10, 1, 'S', 1, '', 'UPGRADE REQUESTED', @CreationTimestamp, @CreationUserIdentifier, 1, 'en-GB', NULL),
		(@PNROutputItemID + 11, 1, 'S', 1, '', 'CHK CLEARANCE WITH AIRLINE OR AIRLINE WEBSITE', @CreationTimestamp, @CreationUserIdentifier, 1, 'en-GB', NULL)		

		INSERT INTO [dbo].[PNROutputItemLanguage]([PNROutputItemId],[LanguageCode],[RemarkFormatTranslation],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber])
		VALUES(@PNROutputItemID + 1, 'fr-CA', 'LE CHOIX DES SIEGES NE SE FAIT QU A L ENREGISTREMENT', @CreationTimestamp, @CreationUserIdentifier, 1),
		(@PNROutputItemID + 2, 'fr-CA', 'A L AEROPORT OU EN LIGNE', @CreationTimestamp, @CreationUserIdentifier, 1),
		(@PNROutputItemID + 3, 'fr-CA', 'CHOIX DE SIEGE NON DISPONIBLE', @CreationTimestamp, @CreationUserIdentifier, 1),
		(@PNROutputItemID + 4, 'fr-CA','VERIFEZ DE NOUVEAU A LA BARRIERE',@CreationTimestamp,@CreationUserIdentifier,1), --/SX
		(@PNROutputItemID + 5, 'fr-CA','CHOIX DE SIEGE NON DISPONIBLE-%CaSeatType% SIEGE CONFIRME',@CreationTimestamp,@CreationUserIdentifier,1), --/SX
		(@PNROutputItemID + 6,'fr-CA','CE SEGMENT A ETE MIS EN LISTE D ATTENTE',@CreationTimestamp,@CreationUserIdentifier,1), --/SX												   
		(@PNROutputItemID + 7,'fr-CA','ATTRIBUTION DES SIEGES SUR DEMANDE',@CreationTimestamp,@CreationUserIdentifier,1), --/SX												   
		(@PNROutputItemID + 8,'fr-CA','SURCLASSEMENT CONFIRME - SIEGE %CaUPFIB% CONFIRME',@CreationTimestamp,@CreationUserIdentifier,1), --/SX
		(@PNROutputItemID + 9,'fr-CA','SURCLASSEMENT CONFIRME',@CreationTimestamp,@CreationUserIdentifier,1), --/SX																			 
		(@PNROutputItemID + 10,'fr-CA','SURCLASSEMENT DEMANDE-VERIFIER LA DISPONIBILITE AUPRES',@CreationTimestamp,@CreationUserIdentifier,1), --/SX																			 
		(@PNROutputItemID + 11,'fr-CA','DU TRANSPORTEUR OU SUR LE SITE DE CE DERNIER',@CreationTimestamp,@CreationUserIdentifier,1) --/SX																			 

		INSERT INTO [dbo].[PNROutputGroupPNROutputItem]([PNROutputGroupId],[PNROutputItemId],[SequenceNumber],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber],[DataStandardizationVersion],[LayoutVersion])
		VALUES(@PNROutputGroupID, @PNROutputItemID + 1, 0, @CreationTimestamp, @CreationUserIdentifier, 1, '1', '1'),
		(@PNROutputGroupID, @PNROutputItemID + 2, 0, @CreationTimestamp, @CreationUserIdentifier, 1, '1', '1'),
		(@PNROutputGroupID, @PNROutputItemID + 3, 0, @CreationTimestamp, @CreationUserIdentifier, 1, '1', '1'),
		(@PNROutputGroupID, @PNROutputItemID + 4, 0, @CreationTimestamp, @CreationUserIdentifier, 1, '1', '1'),
		(@PNROutputGroupID, @PNROutputItemID + 5, 0, @CreationTimestamp, @CreationUserIdentifier, 1, '1', '1'),
		(@PNROutputGroupID, @PNROutputItemID + 6, 0, @CreationTimestamp, @CreationUserIdentifier, 1, '1', '1'),
		(@PNROutputGroupID, @PNROutputItemID + 7, 0, @CreationTimestamp, @CreationUserIdentifier, 1, '1', '1'),
		(@PNROutputGroupID, @PNROutputItemID + 8, 0, @CreationTimestamp, @CreationUserIdentifier, 1, '1', '1'),
		(@PNROutputGroupID, @PNROutputItemID + 9, 0, @CreationTimestamp, @CreationUserIdentifier, 1, '1', '1'),
		(@PNROutputGroupID, @PNROutputItemID + 10, 0, @CreationTimestamp, @CreationUserIdentifier, 1, '1', '1'),
		(@PNROutputGroupID, @PNROutputItemID + 11, 0, @CreationTimestamp, @CreationUserIdentifier, 1, '1', '1')

		INSERT INTO [dbo].[PNROutputCondition]([PNROutputItemId],[PNROutputConditionName],[PNROutputConditionValue],[CreationTimestamp],[CreationUserIdentifier],[LastUpdateTimestamp],[LastUpdateUserIdentifier],[VersionNumber])
		VALUES(@PNROutputItemId+1, 'CASeatRule', 'ONLINECHECKIN', @CreationTimeStamp, @CreationUserIdentifier, null, null, 1),
		(@PNROutputItemId+2, 'CASeatRule', 'ONLINECHECKIN', @CreationTimeStamp, @CreationUserIdentifier, null, null, 1),
		(@PNROutputItemId+3, 'CASeatRule', 'PREFERRED', @CreationTimeStamp, @CreationUserIdentifier, null, null, 1),
		(@PNROutputItemId+4, 'CASeatRule', 'PREFERRED', @CreationTimeStamp, @CreationUserIdentifier, null, null, 1),
		(@PNROutputItemId+6, 'CASeatRule', 'WAITLISTED', @CreationTimeStamp, @CreationUserIdentifier, null, null, 1),
		(@PNROutputItemId+7, 'CASeatRule', 'REQUEST', @CreationTimeStamp, @CreationUserIdentifier, null, null, 1),
		(@PNROutputItemId+9, 'CASeatRule', 'CONFIRMED', @CreationTimeStamp, @CreationUserIdentifier, null, null, 1),
		(@PNROutputItemId+10, 'CASeatRule', 'CLEARANCE', @CreationTimeStamp, @CreationUserIdentifier, null, null, 1),
		(@PNROutputItemId+11, 'CASeatRule', 'CLEARANCE', @CreationTimeStamp, @CreationUserIdentifier, null, null, 1)

		SET @PNROutputRemarkGroupId = (SELECT MAX(PNROutputRemarkGroupId)FROM PNROutputRemarkGroup)
		INSERT INTO dbo.PNROutputRemarkGroup(PNROutputRemarkGroupId, PNROutputRemarkGroupName, CreationTimestamp, CreationUserIdentifier, LastUpdateTimestamp, LastUpdateUserIdentifier, VersionNumber, PNROutputRemarkGroupKey)
		VALUES(@PNROutputRemarkGroupId + 1, 'CASeatRuleRemarks', @CreationTimeStamp, @CreationUserIdentifier, NULL, NULL, 1, NULL)		


		INSERT INTO PNROutputRemarkGroupPNROutputItem
		VALUES(@PNROutputRemarkGroupId +1, @PNROutputItemId + 1, @CreationTimeStamp, @CreationUserIdentifier, NULL, NULL, 1),
			(@PNROutputRemarkGroupId +1, @PNROutputItemId + 2, @CreationTimeStamp, @CreationUserIdentifier, NULL, NULL, 1),
			(@PNROutputRemarkGroupId+1, @PNROutputItemId + 3, @CreationTimeStamp, @CreationUserIdentifier, NULL, NULL, 1),
			(@PNROutputRemarkGroupId+1, @PNROutputItemId + 4, @CreationTimeStamp, @CreationUserIdentifier, NULL, NULL, 1),
			(@PNROutputRemarkGroupId+1, @PNROutputItemId + 5, @CreationTimeStamp, @CreationUserIdentifier, NULL, NULL, 1),
			(@PNROutputRemarkGroupId+1, @PNROutputItemId + 6, @CreationTimeStamp, @CreationUserIdentifier, NULL, NULL, 1),
			(@PNROutputRemarkGroupId+1, @PNROutputItemId + 7, @CreationTimeStamp, @CreationUserIdentifier, NULL, NULL, 1),
			(@PNROutputRemarkGroupId+1, @PNROutputItemId + 8, @CreationTimeStamp, @CreationUserIdentifier, NULL, NULL, 1),
			(@PNROutputRemarkGroupId+1, @PNROutputItemId + 9, @CreationTimeStamp, @CreationUserIdentifier, NULL, NULL, 1),
			(@PNROutputRemarkGroupId+1, @PNROutputItemId + 10, @CreationTimeStamp, @CreationUserIdentifier, NULL, NULL, 1),
			(@PNROutputRemarkGroupId+1, @PNROutputItemId + 11, @CreationTimeStamp, @CreationUserIdentifier, NULL, NULL, 1)
		PRINT 'END Update Amadeus CA Migration - US11820' 

		PRINT 'END Update Amadeus CA Migration - US12284' 
			SET @CreationUserIdentifier			= 'Amadeus CA Migration - US12284'	
			SET @PNROutputItemID    =	(SELECT MAX(PNROutputItemId)   FROM [PNROutputItem])
			SET @PNROutputGroupID   =	(SELECT PNROutputGroupId  FROM [PNROutputGroup] Where PNROutputGroupName = 'Canada Migration General Group')


			INSERT INTO [dbo].[PNROutputPlaceHolder]([PNROutputPlaceHolderName],[PNROutputPlaceHolderRegularExpresssion],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber])
										VALUES ( '%WaiverLine%', '(.*)',@CreationTimestamp, @CreationUserIdentifier, 1 )
													
			INSERT INTO [dbo].[PNROutputItem]	([PNROutputItemId],[PNROutputRemarkTypeCode],[PNROutputBindingTypeCode], [PNROutputUpdateTypeCode],[GDSRemarkQualifier],[RemarkFormat],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber],[PNROutputItemDefaultLanguageCode],[PNROutputItemXMLFormat])
										VALUES  (@PNROutputItemID + 1,0,'S',1,'','*U63/-%WaiverLine%', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL)

			INSERT INTO [dbo].[PNROutputGroupPNROutputItem]	([PNROutputGroupId],[PNROutputItemId],[SequenceNumber],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber],[DataStandardizationVersion],[LayoutVersion])     
										VALUES	(@PNROutputGroupID, @PNROutputItemID + 1,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1')

		PRINT 'END Update Amadeus CA Migration - US12284' 

		PRINT 'START Update Amadeus CA Migration - US9762' 
			SET @CreationUserIdentifier			= 'Amadeus CA Migration - US9762'	
			SET @PNROutputItemId =	(SELECT MAX(PNROutputItemId)  FROM [PNROutputItem])
			SET @PNROutputGroupID =	(SELECT PNROutputGroupId  FROM PNROutputGroup Where PNROutputGroupName = 'Canada Migration BackOffice Group')
			SET @PNROutputRemarkGroupId = (SELECT MAX(PNROutputRemarkGroupId)  FROM PNROutputRemarkGroup)

		
			INSERT INTO [dbo].[PNROutputPlaceHolder]([PNROutputPlaceHolderName],[PNROutputPlaceHolderRegularExpresssion],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber])
										VALUES( '%CurrentDateY%', '(.*)',@CreationTimestamp, @CreationUserIdentifier, 1 ),											
											  ( '%CurrentTimeY%', '(.*)',@CreationTimestamp, @CreationUserIdentifier, 1 ),
											  ( '%CurrentDateN%', '(.*)',@CreationTimestamp, @CreationUserIdentifier, 1 ),	    
											  ( '%CurrentTimeN%', '(.*)',@CreationTimestamp, @CreationUserIdentifier, 1 )
										  
										
		 		
			INSERT INTO [dbo].[PNROutputItem]	([PNROutputItemId],[PNROutputRemarkTypeCode],[PNROutputBindingTypeCode], [PNROutputUpdateTypeCode],[GDSRemarkQualifier],[RemarkFormat],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber],[PNROutputItemDefaultLanguageCode],[PNROutputItemXMLFormat])
										VALUES	(@PNROutputItemId + 1,0,'0',1,'E','ESC AGENT READ ESC REMARKS/%CurrentTimeY%/%CurrentDateY%', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),
												(@PNROutputItemId + 2,0,'0',1,'E','ESC AGENT DID NOT HAVE TIME TO READ ESC REMARKS/%CurrentTimeN%/%CurrentDateN%', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL)
											
		
			INSERT INTO [dbo].[PNROutputGroupPNROutputItem]	([PNROutputGroupId],[PNROutputItemId],[SequenceNumber],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber],[DataStandardizationVersion],[LayoutVersion])     
										VALUES	(@PNROutputGroupID, @PNROutputItemId + 1,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
												(@PNROutputGroupID, @PNROutputItemId + 2,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1')
											
		PRINT 'END Update Amadeus CA Migration - US9762'
		
		PRINT 'START Update Amadeus CA Migration - US10580'
			SET @CreationUserIdentifier			= 'Amadeus CA Migration - US10580'	
			SET @PNROutputItemId =	(SELECT MAX(PNROutputItemId) FROM [PNROutputItem])
			SET @PNROutputGroupID =	(SELECT PNROutputGroupId FROM PNROutputGroup Where PNROutputGroupName = 'Canada Migration BackOffice Group')
			SET @PNROutputRemarkGroupId = (SELECT MAX(PNROutputRemarkGroupId) FROM PNROutputRemarkGroup)

		
		INSERT INTO [dbo].[PNROutputPlaceHolder] ([PNROutputPlaceHolderName],[PNROutputPlaceHolderRegularExpresssion],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber])
		VALUES( '%OfcQueue%', '(.*)', @CreationTimestamp, @CreationUserIdentifier, 1 ),
				( '%OscQueue%', '(.*)', @CreationTimestamp, @CreationUserIdentifier, 1 )
										  
										
		 		
		INSERT INTO [dbo].[PNROutputItem]([PNROutputItemId],[PNROutputRemarkTypeCode],[PNROutputBindingTypeCode], [PNROutputUpdateTypeCode],[GDSRemarkQualifier],[RemarkFormat],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber],[PNROutputItemDefaultLanguageCode],[PNROutputItemXMLFormat])
		VALUES (@PNROutputItemId + 1, 3, '0', 1, 'G', 'OFC-ISSUED NONBSP TKT FOR FLT OR FARE/QUEUED TO %OfcQueue%', @CreationTimestamp, @CreationUserIdentifier, 1, 'en-GB', NULL),
				(@PNROutputItemId + 2, 3, '0', 1, 'G', 'OSC-QUEUED TO Q %OscQueue% FOR NR/CANCELLED PNR', @CreationTimestamp, @CreationUserIdentifier, 1, 'en-GB', NULL)
											
		
		INSERT INTO [dbo].[PNROutputGroupPNROutputItem]([PNROutputGroupId],[PNROutputItemId],[SequenceNumber],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber],[DataStandardizationVersion],[LayoutVersion])
		VALUES(@PNROutputGroupID, @PNROutputItemId + 1, 0, @CreationTimestamp, @CreationUserIdentifier, 1, '1', '1'),
			(@PNROutputGroupID, @PNROutputItemId + 2, 0, @CreationTimestamp, @CreationUserIdentifier, 1, '1', '1')
		PRINT 'END Update Amadeus CA Migration - US10580' 

		PRINT 'START Update Amadeus CA Migration - US11920' 
			SET @CreationUserIdentifier	='Amadeus CA Migration - US11920'
			SET @PNROutputItemId = (SELECT MAX(PNROutputItemID) FROM PNROutputItem)
			--SET @PNROutputGroupID =(SELECT PNROutputGroupID from PNROutputGroup where PNROutputGroupName ='Canada Migration BackOffice Group')
			SET @PNROutputGroupID =(SELECT PNROutputGroupID from PNROutputGroup where PNROutputGroupName ='Canada Migration General Group')

			INSERT INTO PNROutputItem (PNROutputItemId, PNROutputRemarkTypeCode, PNROutputUpdateTypeCode, GDSRemarkQualifier, RemarkFormat, PNROutputBindingTypeCode, CreationTimestamp, CreationUserIdentifier, VersionNumber, PNROutputItemDefaultLanguageCode) 
			VALUES (@PNROutputItemID + 1, 3, 1, '', 'AGENT CLAIMED', 0, @CreationTimeStamp, @CreationUserIdentifier, 1,'en-GB')

			INSERT INTO [dbo].[PNROutputCondition] ([PNROutputItemId],[PNROutputConditionName],[PNROutputConditionValue],[CreationTimestamp],[CreationUserIdentifier],[LastUpdateTimestamp],[LastUpdateUserIdentifier],[VersionNumber])
			VALUES (@PNROutputItemId+1,'IsConcurObt','true',@CreationTimeStamp,@CreationUserIdentifier,null,null,1)
			
			INSERT INTO PNROutputGroupPNROutputItem (PNROutputGroupId, PNROutputItemId, SequenceNumber, CreationTimestamp, CreationUserIdentifier, VersionNumber, DataStandardizationVersion, LayoutVersion)
			VALUES (@PNROutputGroupID,  @PNROutputItemID + 1, 0, @CreationTimeStamp, @CreationUserIdentifier, 1, 1, 1)
		PRINT 'END Update Amadeus CA Migration - US11920' 

		PRINT 'START Update Amadeus CA Migration - US9881' 
			SET @CreationUserIdentifier			= 'Amadeus CA Migration - US9881'	
			SET @PNROutputItemId =	(SELECT MAX(PNROutputItemId)  FROM [PNROutputItem])
			SET @PNROutputGroupIDIti =	(SELECT PNROutputGroupId  FROM PNROutputGroup Where PNROutputGroupName = 'Canada Migration Itinerary Group')
			SET @PNROutputGroupID =	(SELECT PNROutputGroupId  FROM PNROutputGroup Where PNROutputGroupName = 'Canada Migration General Group')
		
		
			INSERT INTO [dbo].[PNROutputPlaceHolder]([PNROutputPlaceHolderName],[PNROutputPlaceHolderRegularExpresssion],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber])
										VALUES( '%RoomConfrimedWith%', '(.*)',@CreationTimestamp, @CreationUserIdentifier, 1 ),
										( '%RoomAdditionalInfo%', '(.*)',@CreationTimestamp, @CreationUserIdentifier, 1 ),
										( '%RoomDatePipe%', '([0-9]{2}[a-zA-Z]{3})',@CreationTimestamp, @CreationUserIdentifier, 1 ),
										( '%RoomChainCode%', '(.*)',@CreationTimestamp, @CreationUserIdentifier, 1 )
	    								  
		 		
			INSERT INTO [dbo].[PNROutputItem]	([PNROutputItemId],[PNROutputRemarkTypeCode],[PNROutputBindingTypeCode], [PNROutputUpdateTypeCode],[GDSRemarkQualifier],[RemarkFormat],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber],[PNROutputItemDefaultLanguageCode],[PNROutputItemXMLFormat])
										VALUES	(@PNROutputItemId + 1,1,'0',1,'','ROOM CONFIRMED WITH - %RoomConfrimedWith%', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),  
												(@PNROutputItemId + 2,1,'0',1,'','ADDITONAL INFORMATION - %RoomAdditionalInfo%', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),
												(@PNROutputItemId + 3,0,'0',1,'*','HS%RoomDatePipe%/-CHN-%RoomChainCode%', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL)
										
			INSERT INTO [dbo].[PNROutputGroupPNROutputItem]	([PNROutputGroupId],[PNROutputItemId],[SequenceNumber],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber],[DataStandardizationVersion],[LayoutVersion])     
										VALUES	(@PNROutputGroupIDIti, @PNROutputItemId + 1,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
												(@PNROutputGroupIDIti, @PNROutputItemId + 2,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
												(@PNROutputGroupID, @PNROutputItemId + 3,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1')
		PRINT 'END Update Amadeus CA Migration - US9881' 

		PRINT 'START Update Amadeus CA Migration - US9882' 
			SET @CreationUserIdentifier			= 'Amadeus CA Migration - US9882'	
			SET @PNROutputItemId =	(SELECT MAX(PNROutputItemId) FROM [PNROutputItem])
			--SET @PNROutputGroupIDIti =	(SELECT PNROutputGroupId FROM PNROutputGroup Where PNROutputGroupName = 'Canada Migration Itinerary Group')
			SET @PNROutputGroupID =	(SELECT PNROutputGroupId FROM PNROutputGroup Where PNROutputGroupName = 'Canada Migration General Group')
		
		
			INSERT INTO [dbo].[PNROutputPlaceHolder]([PNROutputPlaceHolderName],[PNROutputPlaceHolderRegularExpresssion],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber])
			VALUES( '%TrainNumber%', '([A-Z0-9]+)', @CreationTimestamp, @CreationUserIdentifier, 1 ),
				( '%TrainClassService%', '([A-Z0-9]+)', @CreationTimestamp, @CreationUserIdentifier, 1 )
										  
		 		
		INSERT INTO [dbo].[PNROutputItem]([PNROutputItemId],[PNROutputRemarkTypeCode],[PNROutputBindingTypeCode], [PNROutputUpdateTypeCode],[GDSRemarkQualifier],[RemarkFormat],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber],[PNROutputItemDefaultLanguageCode],[PNROutputItemXMLFormat])
		VALUES(@PNROutputItemId + 1, 1, '0', 1, '', 'TRAIN NUMBER-%TrainNumber% CLASS-%TrainClassService%', @CreationTimestamp, @CreationUserIdentifier, 1, 'en-GB', NULL),
				(@PNROutputItemId + 2, 1, '0', 1, '', 'FOR VIA RAIL TRAVEL PLEASE CHECK IN AT TRAIN STATION', @CreationTimestamp, @CreationUserIdentifier, 1, 'en-GB', NULL),
				(@PNROutputItemId + 3, 1, '0', 1, '', 'AT LEAST 45 MINUTES PRIOR TO DEPARTURE.', @CreationTimestamp, @CreationUserIdentifier, 1, 'en-GB', NULL),
				(@PNROutputItemId + 4, 1, '0', 1, '', 'VIA RAIL POLICY-NONSMOKING ENVIRONMENT ON ALL TRAINS.', @CreationTimestamp, @CreationUserIdentifier, 1, 'en-GB', NULL),
				(@PNROutputItemId + 5, 1, '0', 1, '', 'VIA COUPONS ARE NOT VALID FOR AIR TRAVEL.', @CreationTimestamp, @CreationUserIdentifier, 1, 'en-GB', NULL),
				(@PNROutputItemId + 6, 1, '0', 1, '', 'IF CHANGES ARE MADE ENROUTE PLEASE ENSURE YOUR', @CreationTimestamp, @CreationUserIdentifier, 1, 'en-GB', NULL),
				(@PNROutputItemId + 7, 1, '0', 1, '', 'TICKET IS ENDORSED BY VIA 1 TICKET LOUNGE.', @CreationTimestamp, @CreationUserIdentifier, 1, 'en-GB', NULL),
				(@PNROutputItemId + 8, 1, '0', 1, '', 'PLEASE CALL VIA RAIL AT 1-888-842-7245', @CreationTimestamp, @CreationUserIdentifier, 1, 'en-GB', NULL),
				(@PNROutputItemId + 9, 1, '0', 1, '', 'TO RECONFIRM YOUR', @CreationTimestamp, @CreationUserIdentifier, 1, 'en-GB', NULL),
				(@PNROutputItemId + 10, 1, '0', 1, '', 'TRAIN DEPARTURE/ARRIVAL TIMES.', @CreationTimestamp, @CreationUserIdentifier, 1, 'en-GB', NULL),
				(@PNROutputItemId + 11, 1, '0', 1, '', 'VALID IDENTIFICATION IS REQUIRED FOR ALL PASSENGERS 18 AND OVER.', @CreationTimestamp, @CreationUserIdentifier, 1, 'en-GB', NULL),
				(@PNROutputItemId + 12, 1, '0', 1, '', 'ALL AMTRAK TRAINS EXCEPT AUTO TRAIN ARE NON-SMOKING.', @CreationTimestamp, @CreationUserIdentifier, 1, 'en-GB', NULL),
				(@PNROutputItemId + 13, 1, '0', 1, '', 'TRAIN CHANGES ARE PERMITTED ANYTIME SUBJECT TO AVAILABILITY', @CreationTimestamp, @CreationUserIdentifier, 1, 'en-GB', NULL),
				(@PNROutputItemId + 14, 1, '0', 1, '', 'IF YOU NEED TO CHANGE OR CANCEL YOUR RESERVATION-', @CreationTimestamp, @CreationUserIdentifier, 1, 'en-GB', NULL),
				(@PNROutputItemId + 15, 1, '0', 1, '', 'REFUND/CHANGE FEES MAY APPLY', @CreationTimestamp, @CreationUserIdentifier, 1, 'en-GB', NULL),
				(@PNROutputItemId + 16, 1, '0', 1, '', 'RECOMMENDED ARRIVAL TIME AT THE STATION AT LEAST 30 MINUTES', @CreationTimestamp, @CreationUserIdentifier, 1, 'en-GB', NULL),
				(@PNROutputItemId + 17, 1, '0', 1, '', 'PRIOR TO YOUR SCHEDULES DEPARTURE.', @CreationTimestamp, @CreationUserIdentifier, 1, 'en-GB', NULL),
				(@PNROutputItemId + 18, 1, '0', 1, '', 'ALLOW ADDITIONAL TIME IF YOU NEED HELP WITH BAGGAGE OR TICKETS.', @CreationTimestamp, @CreationUserIdentifier, 1, 'en-GB', NULL),
				(@PNROutputItemId + 19, 1, '0', 1, '', 'IF YOU ARE TRAVELLING ON THE AUTO TRAIN YOU MUST CHECK IN', @CreationTimestamp, @CreationUserIdentifier, 1, 'en-GB', NULL),
				(@PNROutputItemId + 20, 1, '0', 1, '', 'AT LEAST 2 HOURS BEFORE SCHEDULED DEPARTURE.', @CreationTimestamp, @CreationUserIdentifier, 1, 'en-GB', NULL),
				(@PNROutputItemId + 21, 1, '0', 1, '', 'THIS CONFIRMATION NOTICE IS NOT A TICKET', @CreationTimestamp, @CreationUserIdentifier, 1, 'en-GB', NULL),
				(@PNROutputItemId + 22, 1, '0', 1, '', 'YOU MUST OBTAIN YOUR TICKET BEFORE BOARDING ANY TRAIN.', @CreationTimestamp, @CreationUserIdentifier, 1, 'en-GB', NULL),
				(@PNROutputItemId + 23, 1, '0', 1, '',	'THIS CONFIRMATION WILL NOT BE ACCEPTED ONBOARD.', @CreationTimestamp, @CreationUserIdentifier, 1, 'en-GB', NULL),
				(@PNROutputItemId + 24, 1, '0', 1, '', 'YOUR ENTIRE RESERVATION -ALL SEGMENTS- WILL BE CANCELLED', @CreationTimestamp, @CreationUserIdentifier, 1, 'en-GB', NULL),
				(@PNROutputItemId + 25, 1, '0', 1, '', 'IF YOU DO NOT PICK UP YOUR TICKET BEFORE YOUR FIRST DEPARTURE OR', @CreationTimestamp, @CreationUserIdentifier, 1, 'en-GB', NULL),
				(@PNROutputItemId + 26, 1, '0', 1, '', 'IF YOU NO-SHOW FOR ANY SEGMENT IN YOUR RESERVATION.', @CreationTimestamp, @CreationUserIdentifier, 1, 'en-GB', NULL),
				(@PNROutputItemId + 27, 1, '0', 1, '', 'IF YOUR RESERVATION CANCELS YOU WILL NEED TO MAKE NEW', @CreationTimestamp, @CreationUserIdentifier, 1, 'en-GB', NULL),
				(@PNROutputItemId + 28, 1, '0', 1, '', 'RESERVATIONS WHICH MAY BE AT A HIGHER FARE.', @CreationTimestamp, @CreationUserIdentifier, 1, 'en-GB', NULL)


		
		INSERT INTO [dbo].[PNROutputitemLanguage](PNROutputItemId, LanguageCode, RemarkFormatTranslation, CreationTimestamp, CreationUserIdentifier, VersionNumber)
		VALUES(@PNROutputItemId + 2, 'fr-CA', 'POUR LES DEPLACEMENTS A BORD DE VIA RAIL VEUILLEZ VOUS', @CreationTimestamp, @CreationUserIdentifier, 1),
			(@PNROutputItemId + 3, 'fr-CA', 'PRESENTER A LA GARE AU MOINS 45 MINUTES AVANT L HEURE PREVUE DE', @CreationTimestamp, @CreationUserIdentifier, 1),
			(@PNROutputItemId + 4, 'fr-CA', 'VOTRE DEPART SUIVANT LA POLITIQUE DE VIA RAIL-TOUS LES', @CreationTimestamp, @CreationUserIdentifier, 1),
			(@PNROutputItemId + 5, 'fr-CA', 'TRAINS SONT NON FUMEUR. LES COUPONS VIA RAIL NE PEUVENT ETRE', @CreationTimestamp, @CreationUserIdentifier, 1),
			(@PNROutputItemId + 6, 'fr-CA', 'UTILISES POUR DES DEPLACEMENTS AERIENS. SI VOUS DEVEZ MODIFIER', @CreationTimestamp, @CreationUserIdentifier, 1),
			(@PNROutputItemId + 7, 'fr-CA', 'VOTRE ITINERAIRE EN COURS DE ROUTE ASSUREZ-VOUS QUE VOTRE', @CreationTimestamp, @CreationUserIdentifier, 1),
			(@PNROutputItemId + 8, 'fr-CA', 'BILLET EST ENDOSSE PAR LA BILLETTERIE VIA 1.', @CreationTimestamp, @CreationUserIdentifier, 1),
			(@PNROutputItemId + 9, 'fr-CA', 'VEUILLEZ COMMUNIQUER AVEC VIA RAIL AU 1-888-842-7245 POUR', @CreationTimestamp, @CreationUserIdentifier, 1),
			(@PNROutputItemId + 10, 'fr-CA', 'RECONFIRMER LES HEURES DE DEPART/D ARRIVEE DE VOTRE TRAIN.', @CreationTimestamp, @CreationUserIdentifier, 1)
		
		INSERT INTO [dbo].[PnrOutputCondition](PNROutputItemId, PNROutputConditionName, PNROutputConditionValue, CreationTimestamp, CreationUserIdentifier, VersionNumber)
		VALUES(@PNROutputItemId + 2, 'TrainVendorCode', 'vbk' , @CreationTimestamp, @CreationUserIdentifier, 1),
			(@PNROutputItemId + 3, 'TrainVendorCode', 'vbk' , @CreationTimestamp, @CreationUserIdentifier, 1),
			(@PNROutputItemId + 4, 'TrainVendorCode', 'vbk' , @CreationTimestamp, @CreationUserIdentifier, 1),
			(@PNROutputItemId + 5, 'TrainVendorCode', 'vbk' , @CreationTimestamp, @CreationUserIdentifier, 1),
			(@PNROutputItemId + 6, 'TrainVendorCode', 'vbk' , @CreationTimestamp, @CreationUserIdentifier, 1),
			(@PNROutputItemId + 7, 'TrainVendorCode', 'vbk' , @CreationTimestamp, @CreationUserIdentifier, 1),
			(@PNROutputItemId + 8, 'TrainVendorCode', 'vbk' , @CreationTimestamp, @CreationUserIdentifier, 1),
			(@PNROutputItemId + 9, 'TrainVendorCode', 'vbk' , @CreationTimestamp, @CreationUserIdentifier, 1),
			(@PNROutputItemId + 10, 'TrainVendorCode', 'vbk' , @CreationTimestamp, @CreationUserIdentifier, 1),
			(@PNROutputItemId + 11, 'TrainVendorCode', 'amk' , @CreationTimestamp, @CreationUserIdentifier, 1),
			(@PNROutputItemId + 12, 'TrainVendorCode', 'amk' , @CreationTimestamp, @CreationUserIdentifier, 1),
			(@PNROutputItemId + 13, 'TrainVendorCode', 'amk' , @CreationTimestamp, @CreationUserIdentifier, 1),
			(@PNROutputItemId + 14, 'TrainVendorCode', 'amk' , @CreationTimestamp, @CreationUserIdentifier, 1),
			(@PNROutputItemId + 15, 'TrainVendorCode', 'amk' , @CreationTimestamp, @CreationUserIdentifier, 1),
			(@PNROutputItemId + 16, 'TrainVendorCode', 'amk' , @CreationTimestamp, @CreationUserIdentifier, 1),
			(@PNROutputItemId + 17, 'TrainVendorCode', 'amk' , @CreationTimestamp, @CreationUserIdentifier, 1),
			(@PNROutputItemId + 18, 'TrainVendorCode', 'amk' , @CreationTimestamp, @CreationUserIdentifier, 1),
			(@PNROutputItemId + 19, 'TrainVendorCode', 'amk' , @CreationTimestamp, @CreationUserIdentifier, 1),
			(@PNROutputItemId + 20, 'TrainVendorCode', 'amk' , @CreationTimestamp, @CreationUserIdentifier, 1),
			(@PNROutputItemId + 21, 'TrainVendorCode', 'amk' , @CreationTimestamp, @CreationUserIdentifier, 1),
			(@PNROutputItemId + 22, 'TrainVendorCode', 'amk' , @CreationTimestamp, @CreationUserIdentifier, 1),
			(@PNROutputItemId + 23, 'TrainVendorCode', 'amk' , @CreationTimestamp, @CreationUserIdentifier, 1),
			(@PNROutputItemId + 24, 'TrainVendorCode', 'amk' , @CreationTimestamp, @CreationUserIdentifier, 1),
			(@PNROutputItemId + 25, 'TrainVendorCode', 'amk' , @CreationTimestamp, @CreationUserIdentifier, 1),
			(@PNROutputItemId + 26, 'TrainVendorCode', 'amk' , @CreationTimestamp, @CreationUserIdentifier, 1),
			(@PNROutputItemId + 27, 'TrainVendorCode', 'amk' , @CreationTimestamp, @CreationUserIdentifier, 1),
			(@PNROutputItemId + 28, 'TrainVendorCode', 'amk' , @CreationTimestamp, @CreationUserIdentifier, 1)



		INSERT INTO [dbo].[PNROutputGroupPNROutputItem]([PNROutputGroupId],[PNROutputItemId],[SequenceNumber],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber],[DataStandardizationVersion],[LayoutVersion])
		VALUES(@PNROutputGroupID, @PNROutputItemId + 1, 0, @CreationTimestamp, @CreationUserIdentifier, 1, '1', '1'),
			(@PNROutputGroupID, @PNROutputItemId + 2, 0, @CreationTimestamp, @CreationUserIdentifier, 1, '1', '1'),
			(@PNROutputGroupID, @PNROutputItemId + 3, 0, @CreationTimestamp, @CreationUserIdentifier, 1, '1', '1'),
			(@PNROutputGroupID, @PNROutputItemId + 4, 0, @CreationTimestamp, @CreationUserIdentifier, 1, '1', '1'),
			(@PNROutputGroupID, @PNROutputItemId + 5, 0, @CreationTimestamp, @CreationUserIdentifier, 1, '1', '1'),
			(@PNROutputGroupID, @PNROutputItemId + 6, 0, @CreationTimestamp, @CreationUserIdentifier, 1, '1', '1'),
			(@PNROutputGroupID, @PNROutputItemId + 7, 0, @CreationTimestamp, @CreationUserIdentifier, 1, '1', '1'),
			(@PNROutputGroupID, @PNROutputItemId + 8, 0, @CreationTimestamp, @CreationUserIdentifier, 1, '1', '1'),
			(@PNROutputGroupID, @PNROutputItemId + 9, 0, @CreationTimestamp, @CreationUserIdentifier, 1, '1', '1'),
			(@PNROutputGroupID, @PNROutputItemId + 10, 0, @CreationTimestamp, @CreationUserIdentifier, 1, '1', '1'),
			(@PNROutputGroupID, @PNROutputItemId + 11, 0, @CreationTimestamp, @CreationUserIdentifier, 1, '1', '1'),
			(@PNROutputGroupID, @PNROutputItemId + 12, 0, @CreationTimestamp, @CreationUserIdentifier, 1, '1', '1'),
			(@PNROutputGroupID, @PNROutputItemId + 13, 0, @CreationTimestamp, @CreationUserIdentifier, 1, '1', '1'),
			(@PNROutputGroupID, @PNROutputItemId + 14, 0, @CreationTimestamp, @CreationUserIdentifier, 1, '1', '1'),
			(@PNROutputGroupID, @PNROutputItemId + 15, 0, @CreationTimestamp, @CreationUserIdentifier, 1, '1', '1'),
			(@PNROutputGroupID, @PNROutputItemId + 16, 0, @CreationTimestamp, @CreationUserIdentifier, 1, '1', '1'),
			(@PNROutputGroupID, @PNROutputItemId + 17, 0, @CreationTimestamp, @CreationUserIdentifier, 1, '1', '1'),
			(@PNROutputGroupID, @PNROutputItemId + 18, 0, @CreationTimestamp, @CreationUserIdentifier, 1, '1', '1'),
			(@PNROutputGroupID, @PNROutputItemId + 19, 0, @CreationTimestamp, @CreationUserIdentifier, 1, '1', '1'),
			(@PNROutputGroupID, @PNROutputItemId + 20, 0, @CreationTimestamp, @CreationUserIdentifier, 1, '1', '1'),
			(@PNROutputGroupID, @PNROutputItemId + 21, 0, @CreationTimestamp, @CreationUserIdentifier, 1, '1', '1'),
			(@PNROutputGroupID, @PNROutputItemId + 22, 0, @CreationTimestamp, @CreationUserIdentifier, 1, '1', '1'),
			(@PNROutputGroupID, @PNROutputItemId + 23, 0, @CreationTimestamp, @CreationUserIdentifier, 1, '1', '1'),
			(@PNROutputGroupID, @PNROutputItemId + 24, 0, @CreationTimestamp, @CreationUserIdentifier, 1, '1', '1'),
			(@PNROutputGroupID, @PNROutputItemId + 25, 0, @CreationTimestamp, @CreationUserIdentifier, 1, '1', '1'),
			(@PNROutputGroupID, @PNROutputItemId + 26, 0, @CreationTimestamp, @CreationUserIdentifier, 1, '1', '1'),
			(@PNROutputGroupID, @PNROutputItemId + 27, 0, @CreationTimestamp, @CreationUserIdentifier, 1, '1', '1'),
			(@PNROutputGroupID, @PNROutputItemId + 28, 0, @CreationTimestamp, @CreationUserIdentifier, 1, '1', '1')
		PRINT 'END Update Amadeus CA Migration - US9882' 

		PRINT 'START Update Amadeus CA Migration - US9883' 
			SET @CreationUserIdentifier			= 'Amadeus CA Migration - US9883'	
			SET @PNROutputItemId =	(SELECT MAX(PNROutputItemId)  FROM [PNROutputItem])
			SET @PNROutputGroupID =	(SELECT PNROutputGroupId  FROM PNROutputGroup Where PNROutputGroupName = 'Canada Migration Itinerary Group')
		
		
			INSERT INTO [dbo].[PNROutputPlaceHolder]([PNROutputPlaceHolderName],[PNROutputPlaceHolderRegularExpresssion],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber])
										VALUES( '%ZZZAirlineCode%', '([A-Z0-9]{2})',@CreationTimestamp, @CreationUserIdentifier, 1 ),
										( '%ZZDepartureCity%', '([A-Z]{3})',@CreationTimestamp, @CreationUserIdentifier, 1 ),
										( '%ZZDestinationCity%', '([A-Z]{3})',@CreationTimestamp, @CreationUserIdentifier, 1 )
	    								  
		 		
			INSERT INTO [dbo].[PNROutputItem]	([PNROutputItemId],[PNROutputRemarkTypeCode],[PNROutputBindingTypeCode], [PNROutputUpdateTypeCode],[GDSRemarkQualifier],[RemarkFormat],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber],[PNROutputItemDefaultLanguageCode],[PNROutputItemXMLFormat])
										VALUES	(@PNROutputItemId + 1,1,'0',1,'','Flight is Confirmed with %ZZZAirlineCode%', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),  
											(@PNROutputItemId + 2,1,'0',1,'','Departure City is %ZZDepartureCity%', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),
											(@PNROutputItemId + 3,1,'0',1,'','Arrival City is %ZZDestinationCity%', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL)
										
			INSERT INTO [dbo].[PNROutputGroupPNROutputItem]	([PNROutputGroupId],[PNROutputItemId],[SequenceNumber],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber],[DataStandardizationVersion],[LayoutVersion])     
										VALUES	(@PNROutputGroupID, @PNROutputItemId + 1,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
												(@PNROutputGroupID, @PNROutputItemId + 2,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
												(@PNROutputGroupID, @PNROutputItemId + 3,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1')
		PRINT 'END Update Amadeus CA Migration - US9883' 

		PRINT 'START Update Amadeus CA Migration - US10574' 
			SET @CreationUserIdentifier	='Amadeus CA Migration - US10574'
			SET @PNROutputItemId = (SELECT MAX(PNROutputItemID) FROM PNROutputItem)
			SET @PNROutputGroupID =(SELECT PNROutputGroupID from PNROutputGroup where PNROutputGroupName ='Canada Migration Itinerary Group')
		
			INSERT INTO [dbo].[PNROutputItem]([PNROutputItemId],[PNROutputRemarkTypeCode],[PNROutputBindingTypeCode], [PNROutputUpdateTypeCode],[GDSRemarkQualifier],[RemarkFormat],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber],[PNROutputItemDefaultLanguageCode],[PNROutputItemXMLFormat])
			VALUES(@PNROutputItemID + 1, 3, 'S', 1, '', 'U14/-%AirlineCode%PASS-%PassNumber%-%PassName%.%FareType%', @CreationTimestamp, @CreationUserIdentifier, 1, 'en-GB', NULL),
				(@PNROutputItemID + 2, 1, 'S', 1, '', 'ALL OTHER CHARGES INDICATED WILL APPEAR', @CreationTimestamp, @CreationUserIdentifier, 1, 'en-GB', NULL),
				(@PNROutputItemID + 3, 1, 'S', 1, '', 'ON YOUR CREDIT CARD AND SHOULD BE', @CreationTimestamp, @CreationUserIdentifier, 1, 'en-GB', NULL),
				(@PNROutputItemID + 4, 1, 'S', 1, '', 'EXPENSED ACCORDINGLY.', @CreationTimestamp, @CreationUserIdentifier, 1, 'en-GB', NULL)

			INSERT INTO [dbo].[PNROutputItemLanguage]([PNROutputItemId],[LanguageCode],[RemarkFormatTranslation],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber])
			VALUES(@PNROutputItemID + 2, 'fr-CA', 'TOUS LES AUTRES COUTS INDIQUES PARAITRONT SUR VOTRE', @CreationTimestamp, @CreationUserIdentifier, 1),
				(@PNROutputItemID + 3, 'fr-CA', 'RELEVE DE CARTE DE CREDIT ET DOIVONT', @CreationTimestamp, @CreationUserIdentifier, 1),
				(@PNROutputItemID + 4, 'fr-CA', 'ETRE INSCRITS EN CONSQUENCE.', @CreationTimestamp, @CreationUserIdentifier, 1)
											
			declare @PNROutputItemId1 AS INT=  (select PNROutputItemId from pnroutputitem where remarkformat='THE AIRLINE TICKET CHARGE ON THIS ITINERARY/INVOICE')
			declare @PNROutputItemId2 AS INT=  (select PNROutputItemId from pnroutputitem where remarkformat='IS FOR INTERNAL COST RE-ALLOCATION PURPOSES ONLY.')
			declare @PNROutputItemId3 AS INT=  (select PNROutputItemId from pnroutputitem where remarkformat='**PLEASE DO NOT EXPENSE** THIS CHARGE AS IT WILL NOT APPEAR')
			declare @PNROutputItemId4 AS INT=  (select PNROutputItemId from pnroutputitem where remarkformat='ON YOUR CREDIT CARD STATEMENT.')
	

			INSERT INTO PNROutputGroupPNROutputItem (PNROutputGroupId, PNROutputItemId, SequenceNumber, CreationTimestamp, CreationUserIdentifier, VersionNumber, DataStandardizationVersion, LayoutVersion)
				VALUES(@PNROutputGroupID, @PNROutputItemID + 1, 5, @CreationTimeStamp, @CreationUserIdentifier, 1, 1, 1),
				(@PNROutputGroupID, @PNROutputItemID + 2, 6, @CreationTimeStamp, @CreationUserIdentifier, 1, 1, 1),
				(@PNROutputGroupID, @PNROutputItemID + 3, 7, @CreationTimeStamp, @CreationUserIdentifier, 1, 1, 1),
				(@PNROutputGroupID, @PNROutputItemID + 4, 8, @CreationTimeStamp, @CreationUserIdentifier, 1, 1, 1)
												--(@PNROutputGroupID,  @PNROutputItemId1, 0, @CreationTimeStamp, @CreationUserIdentifier, 1, 1, 1),
												--(@PNROutputGroupID,  @PNROutputItemId2, 0, @CreationTimeStamp, @CreationUserIdentifier, 1, 1, 1),											
												--(@PNROutputGroupID,  @PNROutputItemId3, 0, @CreationTimeStamp, @CreationUserIdentifier, 1, 1, 1),
												--(@PNROutputGroupID,  @PNROutputItemId4, 0, @CreationTimeStamp, @CreationUserIdentifier, 1, 1, 1)


			INSERT INTO [dbo].[PNROutputCondition]([PNROutputItemId],[PNROutputConditionName],[PNROutputConditionValue],[CreationTimestamp],[CreationUserIdentifier],[LastUpdateTimestamp],[LastUpdateUserIdentifier],[VersionNumber])
				VALUES(@PNROutputItemId1, 'AirlineCorporatePass', 'true', @CreationTimeStamp, @CreationUserIdentifier, null, null, 1),
				(@PNROutputItemId2, 'AirlineCorporatePass', 'true', @CreationTimeStamp, @CreationUserIdentifier, null, null, 1),
				(@PNROutputItemId3, 'AirlineCorporatePass', 'true', @CreationTimeStamp, @CreationUserIdentifier, null, null, 1),
				(@PNROutputItemId4, 'AirlineCorporatePass', 'true', @CreationTimeStamp, @CreationUserIdentifier, null, null, 1),
				(@PNROutputItemID + 2, 'AirlineCorporatePass', 'true', @CreationTimeStamp, @CreationUserIdentifier, null, null, 1),
				(@PNROutputItemID + 3, 'AirlineCorporatePass', 'true', @CreationTimeStamp, @CreationUserIdentifier, null, null, 1),
				(@PNROutputItemID + 4, 'AirlineCorporatePass', 'true', @CreationTimeStamp, @CreationUserIdentifier, null, null, 1)
		PRINT 'END Update Amadeus CA Migration - US10574'
		
		PRINT 'START Update Amadeus CA Migration - US10870'
			SET @CreationUserIdentifier	='Amadeus CA Migration - US10870'
			SET @PNROutputItemId = (SELECT MAX(PNROutputItemID)FROM PNROutputItem)
			SET @PNROutputGroupID =(SELECT PNROutputGroupID from PNROutputGroup where PNROutputGroupName ='Canada Migration Itinerary Group')

			INSERT INTO [dbo].[PNROutputPlaceHolder]([PNROutputPlaceHolderName],[PNROutputPlaceHolderRegularExpresssion],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber])
			VALUES( '%PassNameRedemption%', '(.*)', @CreationTimestamp, @CreationUserIdentifier, 1 )

			INSERT INTO [dbo].[PNROutputItem]([PNROutputItemId],[PNROutputRemarkTypeCode],[PNROutputBindingTypeCode], [PNROutputUpdateTypeCode],[GDSRemarkQualifier],[RemarkFormat],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber],[PNROutputItemDefaultLanguageCode],[PNROutputItemXMLFormat])
			VALUES(@PNROutputItemID + 1, 1, 'S', 1, '', '%PassNameRedemption% PASS REDEMPTION-%FareType% FARE', @CreationTimestamp, @CreationUserIdentifier, 1, 'en-GB', NULL),
			(@PNROutputItemID + 2, 1, 'S', 1, '', '%PassName% PASS REDEMPTION', @CreationTimestamp, @CreationUserIdentifier, 1, 'en-GB', NULL),
			(@PNROutputItemID + 3, 1, 'S', 1, '', 'YOUR %AirlineCode% CONFIRMATION NUMBER IS %ConfNbr%', @CreationTimestamp, @CreationUserIdentifier, 1, 'en-GB', NULL)
			
			INSERT INTO [dbo].[PNROutputItemLanguage]([PNROutputItemId],[LanguageCode],[RemarkFormatTranslation],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber])
			VALUES(@PNROutputItemID + 3, 'fr-CA', 'VOTRE NUMERO DE CONFIRMATION %AirlineCode% EST %ConfNbr%', @CreationTimestamp, @CreationUserIdentifier, 1)

			INSERT INTO PNROutputGroupPNROutputItem(PNROutputGroupId, PNROutputItemId, SequenceNumber, CreationTimestamp, CreationUserIdentifier, VersionNumber, DataStandardizationVersion, LayoutVersion)
			VALUES(@PNROutputGroupID, @PNROutputItemID + 1, 0, @CreationTimeStamp, @CreationUserIdentifier, 1, 1, 1),
				(@PNROutputGroupID, @PNROutputItemID + 2, 0, @CreationTimeStamp, @CreationUserIdentifier, 1, 1, 1),
				(@PNROutputGroupID, @PNROutputItemID + 3, 0, @CreationTimeStamp, @CreationUserIdentifier, 1, 1, 1)

		PRINT 'END Update Amadeus CA Migration - US10870' 

		-------------------------------------Sprint 6-9

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
	
		SET @CreationUserIdentifier			= 'Amadeus CA Migration - US10041'	
		PRINT 'START Script ' + @CreationUserIdentifier
		SET @PNROutputItemId =	(SELECT MAX(PNROutputItemId)  FROM [PNROutputItem])
		SET @PNROutputGroupID =	(SELECT PNROutputGroupId  FROM PNROutputGroup Where PNROutputGroupName = 'Canada Migration General Group')
		SET @PNROutputGroupIDIti =	(SELECT PNROutputGroupId  FROM PNROutputGroup Where PNROutputGroupName = 'Canada Migration Itinerary Group')
		
		
		
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
											(@PNROutputGroupIDIti, @PNROutputItemId + 7,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1')
											


		INSERT INTO [dbo].[PnrOutputCondition] (PNROutputItemId, PNROutputConditionName, PNROutputConditionValue, CreationTimestamp, CreationUserIdentifier, VersionNumber)
									VALUES	(@PNROutputItemId + 4 ,'CancelType', 'withIrop' ,@CreationTimestamp,@CreationUserIdentifier,1),
											(@PNROutputItemId + 7, 'CancelType', 'fullCancel' ,@CreationTimestamp,@CreationUserIdentifier,1)
											

		PRINT 'END Script ' + @CreationUserIdentifier
		-----------------------------------------------------------------------------------------

		-----------------------
		-- ROLLBACK Scripts
		-----------------------
		SET @CreationUserIdentifier		   =   'Amadeus CA Migration - US11189'
		DELETE FROM PNROutputGroupPNROutputItem WHERE CreationUserIdentifier = @CreationUserIdentifier
		DELETE FROM PNROutputCondition WHERE CreationUserIdentifier = @CreationUserIdentifier
		DELETE FROM PNROutputItem WHERE CreationUserIdentifier = @CreationUserIdentifier
		DELETE FROM PNROutputPlaceHolder WHERE	CreationUserIdentifier = @CreationUserIdentifier

		
		----------------------------------
		-- Insert Scripts
		----------------------------------
		
		SET @CreationUserIdentifier	   =    'Amadeus CA Migration - US11189'
		PRINT 'START Script ' + @CreationUserIdentifier
		SET @PNROutputItemId           =    (SELECT MAX(PNROutputItemId)  FROM [PNROutputItem])
		SET @PNROutputGroupID      =	(SELECT PNROutputGroupId  FROM [PNROutputGroup] Where PNROutputGroupName = 'Canada Migration General Group')
	

		INSERT INTO [dbo].[PNROutputPlaceHolder]([PNROutputPlaceHolderName],[PNROutputPlaceHolderRegularExpresssion],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber])
									VALUES ( '%VRsn%', '(.*)',@CreationTimestamp, @CreationUserIdentifier, 1 ),
										   ( '%VTkt%', '(.*)',@CreationTimestamp, @CreationUserIdentifier, 1 ),
										   ( '%Auth%', '(.*)',@CreationTimestamp, @CreationUserIdentifier, 1 ),
										   ( '%RevType%', '(.*)',@CreationTimestamp, @CreationUserIdentifier, 1 ),
										   ( '%VoidDate%' ,'[0-9]{1,2}[A-Z]{3}', @CreationTimestamp, @CreationUserIdentifier, 1 )
												
		 		
		INSERT INTO [dbo].[PNROutputItem]	([PNROutputItemId],[PNROutputRemarkTypeCode],[PNROutputBindingTypeCode], [PNROutputUpdateTypeCode],[GDSRemarkQualifier],[RemarkFormat],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber],[PNROutputItemDefaultLanguageCode],[PNROutputItemXMLFormat])
									VALUES  (@PNROutputItemId + 1,0,'0',1,'X','REISS VOID TKT/%VoidDate%-USE ORIG AUTH %Auth%', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),
									        (@PNROutputItemId + 2,0,'0',1,'X','ATTN BRANCH ADMIN - VOID TKT NBR %VTkt%', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),
								        	(@PNROutputItemId + 3,0,'0',1,'X','VOID REASON - %VRsn%', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),
											(@PNROutputItemId + 4,0,'0',1,'X','%VoidDate%/%CounselorLastName% %CounselorFirstName%', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),
											(@PNROutputItemId + 5,0,'0',1,'X','ATTN NONBSP - %RevType%', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL)

										          
		INSERT INTO [dbo].[PNROutputGroupPNROutputItem]	([PNROutputGroupId],[PNROutputItemId],[SequenceNumber],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber],[DataStandardizationVersion],[LayoutVersion])     
									VALUES	(@PNROutputGroupID , @PNROutputItemId + 1, 0, @CreationTimestamp, @CreationUserIdentifier,1,'1','1'),
										    (@PNROutputGroupID , @PNROutputItemId + 2, 0, @CreationTimestamp, @CreationUserIdentifier,1,'1','1'),
									        (@PNROutputGroupID , @PNROutputItemId + 3, 0, @CreationTimestamp, @CreationUserIdentifier,1,'1','1'),
									        (@PNROutputGroupID , @PNROutputItemId + 4, 0, @CreationTimestamp, @CreationUserIdentifier,1,'1','1'),
									        (@PNROutputGroupID , @PNROutputItemId + 5, 0, @CreationTimestamp, @CreationUserIdentifier,1,'1','1')


		PRINT 'END Script ' + @CreationUserIdentifier
		-----------------------------------------------------------------------------------------

		SET @CreationUserIdentifier	='Amadeus CA Migration - US11191'
		PRINT 'START Script ' + @CreationUserIdentifier
		SET @PNROutputItemId = (SELECT MAX(PNROutputItemID) FROM PNROutputItem)
		SET @PNROutputGroupID =(SELECT PNROutputGroupID from PNROutputGroup where PNROutputGroupName ='Canada Migration General Group')
	

		DELETE FROM PNROutputGroupPNROutputItem WHERE CreationUserIdentifier =@CreationUserIdentifier	
		DELETE FROM PNROutputItemLanguage WHERE CreationUserIdentifier =@CreationUserIdentifier	
		DELETE FROM PNROutputItem WHERE CreationUserIdentifier =@CreationUserIdentifier	
		DELETE FROM PNROutputPlaceHolder WHERE	CreationUserIdentifier = @CreationUserIdentifier

		INSERT INTO [dbo].[PNROutputPlaceHolder]
		([PNROutputPlaceHolderName],[PNROutputPlaceHolderRegularExpresssion],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber])
		VALUES
				( '%InvoiceNumber%', '(.*)', @CreationTimestamp, @CreationUserIdentifier, 1 ),
				( '%TicketNumber%', '(.*)', @CreationTimestamp, @CreationUserIdentifier, 1 ),
				( '%CouponNumber%', '(.*)', @CreationTimestamp, @CreationUserIdentifier, 1 ),
				( '%RefundAmount%', '(.*)', @CreationTimestamp, @CreationUserIdentifier, 1 )



		INSERT INTO [dbo].[PNROutputItem]
		([PNROutputItemId],[PNROutputRemarkTypeCode],[PNROutputBindingTypeCode], [PNROutputUpdateTypeCode],[GDSRemarkQualifier],[RemarkFormat],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber],[PNROutputItemDefaultLanguageCode],[PNROutputItemXMLFormat])
		VALUES
				(@PNROutputItemID + 1, 0, null, 1, 'X', 'ATTN ACCTNG - NONBSP %PartialFull% REFUND  - %CurrentDate%', @CreationTimestamp, @CreationUserIdentifier, 1, 'en-GB', NULL),   
				(@PNROutputItemID + 2, 0, null, 1, 'X', '.  REFUND BASE AMOUNT %BaseAmt% GST %Gst% TAX %Tax%', @CreationTimestamp, @CreationUserIdentifier, 1, 'en-GB', NULL),
				(@PNROutputItemID + 3, 0, null, 1, 'X', '.  REFUND %RefundAmount% - COMMISSION %Commission% %InvoiceNumber%', @CreationTimestamp, @CreationUserIdentifier, 1, 'en-GB', NULL),    
				(@PNROutputItemID + 4, 0, null, 1, 'X', '.  REFUND COMMISSION %Commission% %InvoiceNumber%', @CreationTimestamp, @CreationUserIdentifier, 1, 'en-GB', NULL),    
				(@PNROutputItemID + 5, 0, null, 1, 'X', 'REFUND PROCESSED %TicketNumber%', @CreationTimestamp, @CreationUserIdentifier, 1, 'en-GB', NULL),
				(@PNROutputItemID + 6, 0, null, 1, 'X', 'TKT NBR - %TicketNumber% CPNS %CouponNumber%', @CreationTimestamp, @CreationUserIdentifier, 1, 'en-GB', NULL)
				


		INSERT INTO PNROutputGroupPNROutputItem
		(PNROutputGroupId, PNROutputItemId, SequenceNumber, CreationTimestamp, CreationUserIdentifier, VersionNumber, DataStandardizationVersion, LayoutVersion)
		VALUES
				(@PNROutputGroupID, @PNROutputItemID + 1, 0, @CreationTimeStamp, @CreationUserIdentifier, 1, 1, 1),
				(@PNROutputGroupID, @PNROutputItemID + 2, 0, @CreationTimeStamp, @CreationUserIdentifier, 1, 1, 1),
				(@PNROutputGroupID, @PNROutputItemID + 3, 0, @CreationTimeStamp, @CreationUserIdentifier, 1, 1, 1),
				(@PNROutputGroupID, @PNROutputItemID + 4, 0, @CreationTimeStamp, @CreationUserIdentifier, 1, 1, 1),
				(@PNROutputGroupID, @PNROutputItemID + 5, 0, @CreationTimeStamp, @CreationUserIdentifier, 1, 1, 1),
				(@PNROutputGroupID, @PNROutputItemID + 6, 0, @CreationTimeStamp, @CreationUserIdentifier, 1, 1, 1)

		PRINT 'END Script ' + @CreationUserIdentifier
		-----------------------------------------------------------------------------------------

		SET @CreationUserIdentifier	='Amadeus CA Migration - US11193'
		PRINT 'START Script ' + @CreationUserIdentifier
		SET @PNROutputItemId = (SELECT MAX(PNROutputItemID) FROM PNROutputItem)
		SET @PNROutputGroupID =(SELECT PNROutputGroupID from PNROutputGroup where PNROutputGroupName ='Canada Migration General Group')
	

		DELETE FROM PNROutputGroupPNROutputItem WHERE CreationUserIdentifier =@CreationUserIdentifier	
		DELETE FROM PNROutputItemLanguage WHERE CreationUserIdentifier =@CreationUserIdentifier	
		DELETE FROM PNROutputItem WHERE CreationUserIdentifier =@CreationUserIdentifier	
		DELETE FROM PNROutputPlaceHolder WHERE	CreationUserIdentifier = @CreationUserIdentifier

		INSERT INTO [dbo].[PNROutputPlaceHolder]
		([PNROutputPlaceHolderName],[PNROutputPlaceHolderRegularExpresssion],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber])
		VALUES
				( '%CurrentDate%', '[0-9]{1,2}[A-Z]{3}', @CreationTimestamp, @CreationUserIdentifier, 1 ),
				( '%VendorName%', '(.*)', @CreationTimestamp, @CreationUserIdentifier, 1 ),
				( '%Tax%', '([0-9]{1,}\.{0,1}[0-9]{0,2})', @CreationTimestamp, @CreationUserIdentifier, 1 ),
				( '%Commission%', '([0-9]{1,}\.{0,1}[0-9]{0,2})', @CreationTimestamp, @CreationUserIdentifier, 1 ),
				( '%CounselorFirstName%', '(.*)', @CreationTimestamp, @CreationUserIdentifier, 1 ),
				( '%CounselorLastName%', '(.*)', @CreationTimestamp, @CreationUserIdentifier, 1 ),
				( '%DocTicketNum%', '(.*)', @CreationTimestamp, @CreationUserIdentifier, 1 ),
				( '%PartialFull%', '(PART|FULL)', @CreationTimestamp, @CreationUserIdentifier, 1 ),
				( '%TouchCode%', '([A-Z0-9]{2})', @CreationTimestamp, @CreationUserIdentifier, 1 ),
				( '%BookingToolCode%', '([A-Z0-9]{1})', @CreationTimestamp, @CreationUserIdentifier, 1 ),
				( '%ReasonType%', '([A-Z0-9]{2})', @CreationTimestamp, @CreationUserIdentifier, 1 ),
				( '%ReasonCode%', '([A-Z0-9]{1})', @CreationTimestamp, @CreationUserIdentifier, 1 )


	    INSERT INTO [dbo].[PNROutputItem]
       ([PNROutputItemId],[PNROutputRemarkTypeCode],[PNROutputBindingTypeCode], [PNROutputUpdateTypeCode],[GDSRemarkQualifier],[RemarkFormat],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber],[PNROutputItemDefaultLanguageCode],[PNROutputItemXMLFormat])
		VALUES
				(@PNROutputItemID + 1, 0, null, 1, 'X', 'ATTN ACCTNG - NONBSP %PartialFull% RECREDIT - %CurrentDate%', @CreationTimestamp, @CreationUserIdentifier, 1, 'en-GB', NULL),
				(@PNROutputItemID + 2, 0, null, 1, 'X', '.  NONBSP..%VendorName% - ISSUE OID %BackOfficeAgentIdentifier%', @CreationTimestamp, @CreationUserIdentifier, 1, 'en-GB', NULL),
				(@PNROutputItemID + 3, 0, null, 1, 'X', '.  RECREDIT BASE AMOUNT %BaseAmt% GST %Gst% TAX %Tax%', @CreationTimestamp, @CreationUserIdentifier, 1, 'en-GB', NULL),
				(@PNROutputItemID + 4, 0, null, 1, 'X', '.  RECREDIT COMMISSION %Commission%', @CreationTimestamp, @CreationUserIdentifier, 1, 'en-GB', NULL),
				(@PNROutputItemID + 5, 0, null, 1, 'X', '.  %CurrentDate%/ %CounselorLastName% %CounselorFirstName%.', @CreationTimestamp, @CreationUserIdentifier, 1, 'en-GB', NULL),
				(@PNROutputItemID + 6, 0, null, 1, 'X', 'DOCUBANK/TKT %DocTicketNum%/%CurrentDate%', @CreationTimestamp, @CreationUserIdentifier, 1, 'en-GB', NULL),
				(@PNROutputItemID + 7, 3, null, 1, 'X', 'EB/%TouchCode%%BookingToolCode%/%ReasonType%%ReasonCode%', @CreationTimestamp, @CreationUserIdentifier, 1, 'en-GB', NULL)


		INSERT INTO PNROutputGroupPNROutputItem
		(PNROutputGroupId, PNROutputItemId, SequenceNumber, CreationTimestamp, CreationUserIdentifier, VersionNumber, DataStandardizationVersion, LayoutVersion)
		VALUES
				(@PNROutputGroupID, @PNROutputItemID + 1, 0, @CreationTimeStamp, @CreationUserIdentifier, 1, 1, 1),
				(@PNROutputGroupID, @PNROutputItemID + 2, 0, @CreationTimeStamp, @CreationUserIdentifier, 1, 1, 1),
				(@PNROutputGroupID, @PNROutputItemID + 3, 0, @CreationTimeStamp, @CreationUserIdentifier, 1, 1, 1),
				(@PNROutputGroupID, @PNROutputItemID + 4, 0, @CreationTimeStamp, @CreationUserIdentifier, 1, 1, 1),
				(@PNROutputGroupID, @PNROutputItemID + 5, 0, @CreationTimeStamp, @CreationUserIdentifier, 1, 1, 1),
				(@PNROutputGroupID, @PNROutputItemID + 6, 0, @CreationTimeStamp, @CreationUserIdentifier, 1, 1, 1),
				(@PNROutputGroupID, @PNROutputItemID + 7, 0, @CreationTimeStamp, @CreationUserIdentifier, 1, 1, 1)

	
		PRINT 'END Script ' + @CreationUserIdentifier
		-----------------------------------------------------------------------------------------

		SET @CreationUserIdentifier			= 'Amadeus CA Migration - US12476'
		PRINT 'START Script ' + @CreationUserIdentifier
		DELETE FROM PNROutputGroupPNROutputItem WHERE CreationUserIdentifier = @CreationUserIdentifier
		DELETE FROM PNROutputItem WHERE CreationUserIdentifier = @CreationUserIdentifier
		DELETE FROM PNROutputPlaceHolder WHERE	CreationUserIdentifier = @CreationUserIdentifier

		----------------------------------
		-- Insert Scripts
		----------------------------------
	
		SET @CreationUserIdentifier			= 'Amadeus CA Migration - US12476'	
		SET @PNROutputItemId =	(SELECT MAX(PNROutputItemId)  FROM [PNROutputItem])
		SET @PNROutputGroupID =	(SELECT PNROutputGroupId  FROM PNROutputGroup Where PNROutputGroupName = 'Canada Migration General Group')
		
		
		INSERT INTO [dbo].[PNROutputPlaceHolder]([PNROutputPlaceHolderName],[PNROutputPlaceHolderRegularExpresssion],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber])
									VALUES( '%TicketNum%', '[0-9]{1,13}',@CreationTimestamp, @CreationUserIdentifier, 1 ),
									( '%FeesPlaceholder%', '(.*)',@CreationTimestamp, @CreationUserIdentifier, 1 ),
									( '%SfcPlaceholder%', '(.*)',@CreationTimestamp, @CreationUserIdentifier, 1 ),
									( '%MacLinePlaceholder%', '(.*)',@CreationTimestamp, @CreationUserIdentifier, 1 )
	    								  
		 		
		INSERT INTO [dbo].[PNROutputItem]	([PNROutputItemId],[PNROutputRemarkTypeCode],[PNROutputBindingTypeCode], [PNROutputUpdateTypeCode],[GDSRemarkQualifier],[RemarkFormat],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber],[PNROutputItemDefaultLanguageCode],[PNROutputItemXMLFormat])
									VALUES	(@PNROutputItemId + 1,0,'0',1,'Z','SPCL-TKT-%TicketNum%', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),  
											(@PNROutputItemId + 2,3,'0',1,'','FEE/-%FeesPlaceholder%', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),
											(@PNROutputItemId + 3,3,'0',1,'','SFC/-%SfcPlaceholder%', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),
                                            (@PNROutputItemId + 4,3,'0',1,'','MAC/-%MacLinePlaceholder%', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),
											(@PNROutputItemId + 5,0,'0',1,'Z','SPCL-TKT%TicketNum%', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL)
										
		INSERT INTO [dbo].[PNROutputGroupPNROutputItem]	([PNROutputGroupId],[PNROutputItemId],[SequenceNumber],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber],[DataStandardizationVersion],[LayoutVersion])     
									VALUES	(@PNROutputGroupID, @PNROutputItemId + 1,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
											(@PNROutputGroupID, @PNROutputItemId + 2,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
											(@PNROutputGroupID, @PNROutputItemId + 3,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
                                            (@PNROutputGroupID, @PNROutputItemId + 4,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
											(@PNROutputGroupID, @PNROutputItemId + 5,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1')
											

		PRINT 'END Script ' + @CreationUserIdentifier
		-----------------------------------------------------------------------------------------

		SET @CreationUserIdentifier	='Amadeus CA Migration - US10986'
		PRINT 'START Script ' + @CreationUserIdentifier
		SET @PNROutputItemId = (SELECT MAX(PNROutputItemID) FROM PNROutputItem)
		SET @PNROutputGroupIDIti =(SELECT PNROutputGroupID from PNROutputGroup where PNROutputGroupName ='Canada Migration Itinerary Group')
		SET @PNROutputGroupID =(SELECT PNROutputGroupID from PNROutputGroup where PNROutputGroupName ='Canada Migration General Group')
		
		DELETE FROM PNROutputCondition WHERE CreationUserIdentifier =@CreationUserIdentifier
		DELETE FROM PNROutputGroupPNROutputItem WHERE CreationUserIdentifier =@CreationUserIdentifier		
		DELETE FROM PNROutputItem WHERE CreationUserIdentifier =@CreationUserIdentifier	
		DELETE FROM PNROutputPlaceHolder WHERE CreationUserIdentifier =@CreationUserIdentifier	

		INSERT INTO [dbo].[PNROutputPlaceHolder]	([PNROutputPlaceHolderName],[PNROutputPlaceHolderRegularExpresssion],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber])
					VALUES    ('%WebLocator%', '(.*)', @CreationTimestamp, @CreationUserIdentifier, 1 ),
							  ('%CancelFee%', '([0-9]*\.{0,1}[0-9]{0,2})', @CreationTimestamp, @CreationUserIdentifier, 1 ),
							  ('%CancelGst%', '([0-9]*\.{0,1}[0-9]{0,2})', @CreationTimestamp, @CreationUserIdentifier, 1 ),
							  ('%CancelHst%', '([0-9]*\.{0,1}[0-9]{0,2})', @CreationTimestamp, @CreationUserIdentifier, 1 ),
							  ('%CancelQst%', '([0-9]*\.{0,1}[0-9]{0,2})', @CreationTimestamp, @CreationUserIdentifier, 1 ),
							  ('%CancelOthTax%', '([0-9]*\.{0,1}[0-9]{0,2})', @CreationTimestamp, @CreationUserIdentifier, 1 ),
							  ('%CATotalPrice%', '([0-9]*\.{0,1}[0-9]{0,2})', @CreationTimestamp, @CreationUserIdentifier, 1 ),
							  ('%OrgOid%', '(.*)', @CreationTimestamp, @CreationUserIdentifier, 1 ),
							  ('%CaRefundCommision%', '([0-9]*\.{0,1}[0-9]{0,2})', @CreationTimestamp, @CreationUserIdentifier, 1 ),
							  ('%CaAmadeusNotes1%', '(.*)', @CreationTimestamp, @CreationUserIdentifier, 1 ),
							  ('%CaAmadeusNotes2%', '(.*)', @CreationTimestamp, @CreationUserIdentifier, 1 ),
							  ('%CancelAirlineCode%', '([A-Z0-9]{2})', @CreationTimestamp, @CreationUserIdentifier, 1 ),
							  ('%CancelAirlineCodePassChg%', '([A-Z0-9]{2})', @CreationTimestamp, @CreationUserIdentifier, 1 )

		INSERT INTO [dbo].[PNROutputItem]	([PNROutputItemId],[PNROutputRemarkTypeCode],[PNROutputBindingTypeCode], [PNROutputUpdateTypeCode],[GDSRemarkQualifier],[RemarkFormat],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber],[PNROutputItemDefaultLanguageCode],[PNROutputItemXMLFormat])
					VALUES (@PNROutputItemID + 1,1,'S',1,'' ,'%AirlineCode% PASS CANCELLATION/CF-%WebLocator%', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL), --RIR 
							  (@PNROutputItemID + 2,0,'S',1,'T','TKT%TktRemarkNbr%-BA-%CancelFee%/TX1-%CancelGst%XG/TX2-%CancelHst%RC/TX3-%CancelQst%XQ/TX4-%CancelOthTax%XT/COMM-0.00', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),--RMT
							  (@PNROutputItemID + 3,0,'0',1,'X' ,'**********************************************', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),	 --RMX
							  (@PNROutputItemID + 4,0,'0',1,'X' ,'ATTN ACCTNG-NONBSP %WebLocator% REFUND-%CurrentDateY%', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),	 --RMX
							  (@PNROutputItemID + 5,0,'0',1,'X' ,'NONBSP-%SupplierCode%-ISSUE OID-%OrgOid%', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),  --RMX
							  (@PNROutputItemID + 6,0,'0',1,'X' ,'REFUND BASE-%CancelFee% GST-%CancelGst% HST-%CancelHst% QST-%CancelQst% OTH TAX-%CancelOthTax%', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),  --RMX
							  (@PNROutputItemID + 7,0,'0',1,'X' ,'REFUND COMMISSION %CaRefundCommision%', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),  --RMX										   
							  (@PNROutputItemID + 8,0,'0',1,'X' ,'%CaAmadeusNotes1%', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),  --RMX
							  (@PNROutputItemID + 9,0,'0',1,'X' ,'%CaAmadeusNotes2% ', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),  --RMX
							  (@PNROutputItemID + 10,0,'0',1,'X' ,'**********************************************', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),	 --RMX
							  (@PNROutputItemID + 11,1,'0',1,'' ,'THE PRICE FOR THIS ITINERARY IS %CATotalPrice% INCLUDING TAXES.', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL), --RIR 
							  (@PNROutputItemID + 12,1,'0',1,'' ,'%CancelAirlineCode% PASS PNR CANCELLED PER PASSENGER REQUEST.', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL), --RIR 
							  (@PNROutputItemID + 13,1,'0',1,'' ,'CANCELLATION FEE OF CAD%CancelFee% PLUS TAX HAS BEEN CHARGED TO', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL), --RIR 
							  (@PNROutputItemID + 14,1,'0',1,'' ,'THE TRAVELLERS CREDIT CARD.', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL), --RIR 
							  (@PNROutputItemID + 15,0,'0',1,'G' ,'%CancelAirlineCodePassChg%PASSCHG', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL) --RMG
										  										
		INSERT INTO PNROutputGroupPNROutputItem (PNROutputGroupId, PNROutputItemId, SequenceNumber, CreationTimestamp, CreationUserIdentifier, VersionNumber, DataStandardizationVersion, LayoutVersion)
					VALUES	 (@PNROutputGroupIDIti,  @PNROutputItemID + 1, 1, @CreationTimeStamp, @CreationUserIdentifier, 1, 1, 1),
							 (@PNROutputGroupID,  @PNROutputItemID + 2, 2, @CreationTimeStamp, @CreationUserIdentifier, 1, 1, 1),
							 (@PNROutputGroupID,  @PNROutputItemID + 3, 3, @CreationTimeStamp, @CreationUserIdentifier, 1, 1, 1),
							 (@PNROutputGroupID,  @PNROutputItemId + 4, 4, @CreationTimeStamp, @CreationUserIdentifier, 1, 1, 1),
							 (@PNROutputGroupID,  @PNROutputItemID + 5, 5, @CreationTimeStamp, @CreationUserIdentifier, 1, 1, 1),
							 (@PNROutputGroupID,  @PNROutputItemID + 6, 6, @CreationTimeStamp, @CreationUserIdentifier, 1, 1, 1),
							 (@PNROutputGroupID,  @PNROutputItemID + 7, 6, @CreationTimeStamp, @CreationUserIdentifier, 1, 1, 1),
							 (@PNROutputGroupID,  @PNROutputItemId + 8, 7, @CreationTimeStamp, @CreationUserIdentifier, 1, 1, 1),
							 (@PNROutputGroupID,  @PNROutputItemID + 9, 8, @CreationTimeStamp, @CreationUserIdentifier, 1, 1, 1),		
							 (@PNROutputGroupID,  @PNROutputItemID + 10, 9, @CreationTimeStamp, @CreationUserIdentifier, 1, 1, 1),		
							 (@PNROutputGroupIDIti       ,  @PNROutputItemID + 11, 10, @CreationTimeStamp, @CreationUserIdentifier, 1, 1, 1),		
							 (@PNROutputGroupIDIti       ,  @PNROutputItemID + 12, 11, @CreationTimeStamp, @CreationUserIdentifier, 1, 1, 1),		
							 (@PNROutputGroupIDIti       ,  @PNROutputItemID + 13, 12, @CreationTimeStamp, @CreationUserIdentifier, 1, 1, 1),		
							 (@PNROutputGroupIDIti       ,  @PNROutputItemID + 14, 13, @CreationTimeStamp, @CreationUserIdentifier, 1, 1, 1),		
							 (@PNROutputGroupID,  @PNROutputItemID + 15, 14, @CreationTimeStamp, @CreationUserIdentifier, 1, 1, 1)
																						
		INSERT INTO [dbo].[PNROutputCondition] ([PNROutputItemId],[PNROutputConditionName],[PNROutputConditionValue],[CreationTimestamp],[CreationUserIdentifier],[LastUpdateTimestamp],[LastUpdateUserIdentifier],[VersionNumber])
					VALUES   (@PNROutputItemID + 3,'CARefundStart','true',@CreationTimeStamp,@CreationUserIdentifier,null,null,1),
							 (@PNROutputItemID + 10,'CARefundEnd','true',@CreationTimeStamp,@CreationUserIdentifier,null,null,1),
							 (@PNROutputItemID + 14,'CACancelRemark','true',@CreationTimeStamp,@CreationUserIdentifier,null,null,1)

		PRINT 'END Script ' + @CreationUserIdentifier
		-----------------------------------------------------------------------------------------

		SET @CreationUserIdentifier      = 'Amadeus CA Migration - US11196'
		PRINT 'START Script ' + @CreationUserIdentifier
		--select * from ReasonCodeGroup WHERE CreationUserIdentifier=@CreationUserIdentifier


        DELETE FROM [ReasonCodeGroupClientSubUnit]                      WHERE CreationUserIdentifier=@CreationUserIdentifier
        DELETE FROM ReasonCodeGroupCountry                      WHERE CreationUserIdentifier=@CreationUserIdentifier
        DELETE FROM ReasonCodeProductTypeTravelerDescription    WHERE CreationUserIdentifier=@CreationUserIdentifier
        DELETE FROM ReasonCodeProductTypeDescription            WHERE CreationUserIdentifier=@CreationUserIdentifier
        DELETE FROM ReasonCodeAlternativeDescription            WHERE CreationUserIdentifier=@CreationUserIdentifier
        DELETE FROM ReasonCodeItem                              WHERE CreationUserIdentifier=@CreationUserIdentifier
        DELETE FROM ReasonCodeGroup                             WHERE CreationUserIdentifier=@CreationUserIdentifier
        DELETE FROM ReasonCodeProductType                       WHERE CreationUserIdentifier=@CreationUserIdentifier
	
		DELETE FROM ReasonCodeType                   WHERE CreationUserIdentifier=@CreationUserIdentifier

		SET  @ReasonCodeTypeId = (select max(ReasonCodeTypeId) from ReasonCodeType) + 1

		INSERT INTO dbo.ReasonCodeType (ReasonCodeTypeId,ReasonCodeTypeDescription,CreationTimestamp,CreationUserIdentifier,LastUpdateTimestamp,LastUpdateUserIdentifier,VersionNumber)
		VALUES	(@ReasonCodeTypeId, 'EB Matrix Touch Reason', @CreationTimestamp, @CreationUserIdentifier, null, null, 1)


        
        INSERT INTO  ReasonCodeGroup(ReasonCodeGroupName,EnabledFlag,EnabledDate,DeletedFlag,CreationUserIdentifier,CreationTimestamp,VersionNumber)
		VALUES ('Canada_Touch_Reason_Code', 1, null, 0, @CreationUserIdentifier, @CreationTimestamp, 1)
        SET @ReasonCodeGroupId =  SCOPE_IDENTITY()

		INSERT INTO ReasonCodeProductType (ReasonCode,ProductId,ReasonCodeTypeId,CreationUserIdentifier,CreationTimestamp,VersionNumber,AwaitingApprovalFlag)
		VALUES
						('A', 8, @ReasonCodeTypeId, @CreationUserIdentifier, @CreationTimestamp, 1, 0),
						('C', 8, @ReasonCodeTypeId, @CreationUserIdentifier, @CreationTimestamp, 1, 0),
						('D', 8, @ReasonCodeTypeId, @CreationUserIdentifier, @CreationTimestamp, 1, 0),
						('E', 8, @ReasonCodeTypeId, @CreationUserIdentifier, @CreationTimestamp, 1, 0),
						('F', 8, @ReasonCodeTypeId, @CreationUserIdentifier, @CreationTimestamp, 1, 0),
						('H', 8, @ReasonCodeTypeId, @CreationUserIdentifier, @CreationTimestamp, 1, 0),
						('I', 8, @ReasonCodeTypeId, @CreationUserIdentifier, @CreationTimestamp, 1, 0),
						('L', 8, @ReasonCodeTypeId, @CreationUserIdentifier, @CreationTimestamp, 1, 0),
						('M', 8, @ReasonCodeTypeId, @CreationUserIdentifier, @CreationTimestamp, 1, 0),
						('N', 8, @ReasonCodeTypeId, @CreationUserIdentifier, @CreationTimestamp, 1, 0),
						('R', 8, @ReasonCodeTypeId, @CreationUserIdentifier, @CreationTimestamp, 1, 0),
						('S', 8, @ReasonCodeTypeId, @CreationUserIdentifier, @CreationTimestamp, 1, 0),
						('T', 8, @ReasonCodeTypeId, @CreationUserIdentifier, @CreationTimestamp, 1, 0),
						('U', 8, @ReasonCodeTypeId, @CreationUserIdentifier, @CreationTimestamp, 1, 0)

		INSERT INTO ReasonCodeProductTypeDescription (ReasonCodeProductTypeDescription,ReasonCode,LanguageCode,PRoductId,ReasonCodeTypeId, CreationUserIdentifier,CreationTimestamp,VersionNumber)
		VALUES
						('Air'										, 'A', 'en-GB', 8, @ReasonCodeTypeId, @CreationUserIdentifier, @CreationTimestamp, 1),
						('Car '										, 'C', 'en-GB', 8, @ReasonCodeTypeId, @CreationUserIdentifier, @CreationTimestamp, 1),
						('Customized Data'							, 'D', 'en-GB', 8, @ReasonCodeTypeId, @CreationUserIdentifier, @CreationTimestamp, 1),
						('Exchange ticket'							, 'E', 'en-GB', 8, @ReasonCodeTypeId, @CreationUserIdentifier, @CreationTimestamp, 1),
						('Fare'										, 'F', 'en-GB', 8, @ReasonCodeTypeId, @CreationUserIdentifier, @CreationTimestamp, 1),
						('Hotel'									, 'H', 'en-GB', 8, @ReasonCodeTypeId, @CreationUserIdentifier, @CreationTimestamp, 1),
						('Instant purchase carrier'  				, 'I', 'en-GB', 8, @ReasonCodeTypeId, @CreationUserIdentifier, @CreationTimestamp, 1),
						('Limo'										, 'L', 'en-GB', 8, @ReasonCodeTypeId, @CreationUserIdentifier, @CreationTimestamp, 1),
						('Credit card'								, 'M', 'en-GB', 8, @ReasonCodeTypeId, @CreationUserIdentifier, @CreationTimestamp, 1),
						('Lack of automation by SBT or mid office'  , 'N', 'en-GB', 8, @ReasonCodeTypeId, @CreationUserIdentifier, @CreationTimestamp, 1),
						('Rail'										, 'R', 'en-GB', 8, @ReasonCodeTypeId, @CreationUserIdentifier, @CreationTimestamp, 1),
						('Special requests'							, 'S', 'en-GB', 8, @ReasonCodeTypeId, @CreationUserIdentifier, @CreationTimestamp, 1),
						('International assistance'					, 'T', 'en-GB', 8, @ReasonCodeTypeId, @CreationUserIdentifier, @CreationTimestamp, 1),
						('Upgrades'									, 'U', 'en-GB', 8, @ReasonCodeTypeId, @CreationUserIdentifier, @CreationTimestamp, 1)
						   

        --- HK Insert Hotel Realised and Hotel Missed
        INSERT INTO  ReasonCodeItem (DisplayOrder,ReasonCodeGroupId,ReasonCode,ReasonCodeTypeId,ProductId,TravelerFacingFlag,CreationUserIdentifier,CreationTimestamp,VersionNumber)
		VALUES
						( 1, @ReasonCodeGroupId, 'A', @ReasonCodeTypeId, 8, 1, @CreationUserIdentifier, @CreationTimestamp, 1),
						( 2, @ReasonCodeGroupId, 'C', @ReasonCodeTypeId, 8, 1, @CreationUserIdentifier, @CreationTimestamp, 1),
						( 3, @ReasonCodeGroupId, 'D', @ReasonCodeTypeId, 8, 1, @CreationUserIdentifier, @CreationTimestamp, 1),
						( 4, @ReasonCodeGroupId, 'E', @ReasonCodeTypeId, 8, 1, @CreationUserIdentifier, @CreationTimestamp, 1),
						( 5, @ReasonCodeGroupId, 'F', @ReasonCodeTypeId, 8, 1, @CreationUserIdentifier, @CreationTimestamp, 1),
						( 6, @ReasonCodeGroupId, 'H', @ReasonCodeTypeId, 8, 1, @CreationUserIdentifier, @CreationTimestamp, 1),
						( 7, @ReasonCodeGroupId, 'I', @ReasonCodeTypeId, 8, 1, @CreationUserIdentifier, @CreationTimestamp, 1),
						( 8, @ReasonCodeGroupId, 'L', @ReasonCodeTypeId, 8, 1, @CreationUserIdentifier, @CreationTimestamp, 1),
						( 9, @ReasonCodeGroupId, 'M', @ReasonCodeTypeId, 8, 1, @CreationUserIdentifier, @CreationTimestamp, 1),
						(10, @ReasonCodeGroupId, 'N', @ReasonCodeTypeId, 8, 1, @CreationUserIdentifier, @CreationTimestamp, 1),
						(11, @ReasonCodeGroupId, 'R', @ReasonCodeTypeId, 8, 1, @CreationUserIdentifier, @CreationTimestamp, 1),
						(12, @ReasonCodeGroupId, 'S', @ReasonCodeTypeId, 8, 1, @CreationUserIdentifier, @CreationTimestamp, 1),
						(13, @ReasonCodeGroupId, 'T', @ReasonCodeTypeId, 8, 1, @CreationUserIdentifier, @CreationTimestamp, 1),
						(14, @ReasonCodeGroupId, 'U', @ReasonCodeTypeId, 8, 1, @CreationUserIdentifier, @CreationTimestamp, 1)


				
		--     Insert into [ReasonCodeGroupClientSubUnit] (ReasonCodeGroupId,ClientSubUnitGuid,CreationTimestamp,CreationUserIdentifier)
			--values(@ReasonCodeGroupId,'A:FA177',GETUTCDATE(),@CreationUserIdentifier)    
                          
        INSERT INTO ReasonCodeGroupCountry(CountryCode,ReasonCodeGroupId,CreationUserIdentifier,CreationTimestamp,VersionNumber)
		VALUES
						('CA', @ReasonCodeGroupId, @CreationUserIdentifier, @CreationTimestamp, 1)
      

        SET @ReasonCodeItemId  =  (SELECT min(ReasonCodeItemId) FROM ReasonCodeItem where ReasonCodeGroupId=@ReasonCodeGroupId) -1
        INSERT INTO ReasonCodeAlternativeDescription (ReasonCodeAlternativeDescription,LanguageCode,ReasonCodeItemId, CreationUserIdentifier,CreationTimestamp,VersionNumber)
		VALUES
						 ('Air'											, 'en-GB', @ReasonCodeItemId+1 , @CreationUserIdentifier, @CreationTimestamp, 1),
						 ('Car '										, 'en-GB', @ReasonCodeItemId+2 , @CreationUserIdentifier, @CreationTimestamp, 1),
						 ('Customized Data'								, 'en-GB', @ReasonCodeItemId+3 , @CreationUserIdentifier, @CreationTimestamp, 1),
						 ('Exchange ticket'								, 'en-GB', @ReasonCodeItemId+4 , @CreationUserIdentifier, @CreationTimestamp, 1),
						 ('Fare'										, 'en-GB', @ReasonCodeItemId+5 , @CreationUserIdentifier, @CreationTimestamp, 1),
						 ('Hotel'										, 'en-GB', @ReasonCodeItemId+6 , @CreationUserIdentifier, @CreationTimestamp, 1),
						 ('Instant purchase carrier'  					, 'en-GB', @ReasonCodeItemId+7 , @CreationUserIdentifier, @CreationTimestamp, 1),
						 ('Limo'										, 'en-GB', @ReasonCodeItemId+8 , @CreationUserIdentifier, @CreationTimestamp, 1),
						 ('Credit card'									, 'en-GB', @ReasonCodeItemId+9 , @CreationUserIdentifier, @CreationTimestamp, 1),
						 ('Lack of automation by SBT or mid office'		, 'en-GB', @ReasonCodeItemId+10, @CreationUserIdentifier, @CreationTimestamp, 1),
						 ('Rail'										, 'en-GB', @ReasonCodeItemId+11, @CreationUserIdentifier, @CreationTimestamp, 1),
						 ('Special requests'							, 'en-GB', @ReasonCodeItemId+12, @CreationUserIdentifier, @CreationTimestamp, 1),
						 ('International assistance'					, 'en-GB', @ReasonCodeItemId+13, @CreationUserIdentifier, @CreationTimestamp, 1),
						 ('Upgrades'									, 'en-GB', @ReasonCodeItemId+14, @CreationUserIdentifier, @CreationTimestamp, 1)

		PRINT 'END Script ' + @CreationUserIdentifier
		-----------------------------------------------------------------------------------------
		PRINT 'START Script ' + @CreationUserIdentifier

		SET @CreationUserIdentifier			= 'Amadeus CA Migration - US14343'
		DELETE FROM PNROutputGroupPNROutputItem WHERE CreationUserIdentifier = @CreationUserIdentifier
		DELETE FROM PNROutputItem WHERE CreationUserIdentifier = @CreationUserIdentifier
		DELETE FROM PNROutputPlaceHolder WHERE	CreationUserIdentifier = @CreationUserIdentifier

		----------------------------------
		-- Insert Scripts
		----------------------------------
	
		SET @CreationUserIdentifier			= 'Amadeus CA Migration - US14343'	
		SET @PNROutputItemId =	(SELECT MAX(PNROutputItemId)  FROM [PNROutputItem])
		SET @PNROutputGroupID =	(SELECT PNROutputGroupId  FROM PNROutputGroup Where PNROutputGroupName = 'Canada Migration BackOffice Group')
		SET @PNROutputRemarkGroupId = (SELECT MAX(PNROutputRemarkGroupId)  FROM PNROutputRemarkGroup)

		
		INSERT INTO [dbo].[PNROutputPlaceHolder]([PNROutputPlaceHolderName],[PNROutputPlaceHolderRegularExpresssion],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber])
									VALUES( '%HotelDate%', '([0-9]{2}[A-Z]{3})',@CreationTimestamp, @CreationUserIdentifier, 1 ),
										  ( '%HotelSavings%', '([A-Z]{1,2})',@CreationTimestamp, @CreationUserIdentifier, 1 ),	    
									      ( '%ChainCode%', '((\/\-CHN-[A-Z]{2})|(^$))',@CreationTimestamp, @CreationUserIdentifier, 1 )
										  
												 		
		INSERT INTO [dbo].[PNROutputItem]	([PNROutputItemId],[PNROutputRemarkTypeCode],[PNROutputBindingTypeCode], [PNROutputUpdateTypeCode],[GDSRemarkQualifier],[RemarkFormat],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber],[PNROutputItemDefaultLanguageCode],[PNROutputItemXMLFormat])
									VALUES	(@PNROutputItemId + 1,3,null,1,'','HS%HotelDate%/-SV-%HotelSavings%%ChainCode%', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),
											(@PNROutputItemId + 2,3,null,1,'','HS%HotelDate%%ChainCode%', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL)
											
		
		INSERT INTO [dbo].[PNROutputGroupPNROutputItem]	([PNROutputGroupId],[PNROutputItemId],[SequenceNumber],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber],[DataStandardizationVersion],[LayoutVersion])     
									VALUES	(@PNROutputGroupID, @PNROutputItemId + 1,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
											(@PNROutputGroupID, @PNROutputItemId + 2,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1')

		PRINT 'END Script ' + @CreationUserIdentifier
		-----------------------------------------------------------------------------------------
		PRINT 'START Script ' + @CreationUserIdentifier

		SET @CreationUserIdentifier			= 'Amadeus CA Migration - US15703'
		DELETE FROM PNROutputGroupPNROutputItem WHERE CreationUserIdentifier = @CreationUserIdentifier
		DELETE FROM PNROutputItem WHERE CreationUserIdentifier = @CreationUserIdentifier
		DELETE FROM PNROutputPlaceHolder WHERE	CreationUserIdentifier = @CreationUserIdentifier

		----------------------------------
		-- Insert Scripts
		----------------------------------
		PRINT 'START Script'
		SET @CreationUserIdentifier			= 'Amadeus CA Migration - US15703'	
		SET @PNROutputItemId =	(SELECT MAX(PNROutputItemId)  FROM [PNROutputItem])
		SET @PNROutputGroupID =	(SELECT PNROutputGroupId  FROM PNROutputGroup Where PNROutputGroupName = 'Canada Migration Itinerary Group')
		
		
		INSERT INTO [dbo].[PNROutputPlaceHolder]([PNROutputPlaceHolderName],[PNROutputPlaceHolderRegularExpresssion],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber])
		VALUES						( '%PickupOffAddress%', '(.*)',@CreationTimestamp, @CreationUserIdentifier, 1 ),
									( '%DropOffAddress%', '(.*)',@CreationTimestamp, @CreationUserIdentifier, 1 ),
									( '%DropOffFee%', '([0-9]*\.{0,1}[0-9]{0,2})',@CreationTimestamp, @CreationUserIdentifier, 1 ),
									( '%FrequentFlierNumber%', '(.*)',@CreationTimestamp, @CreationUserIdentifier, 1 ),
									( '%FrequentflightNumber%', '(.*)',@CreationTimestamp, @CreationUserIdentifier, 1 )
	    								  
	
		INSERT INTO [dbo].[PNROutputItem]	([PNROutputItemId],[PNROutputRemarkTypeCode],[PNROutputBindingTypeCode], [PNROutputUpdateTypeCode],[GDSRemarkQualifier],[RemarkFormat],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber],[PNROutputItemDefaultLanguageCode],[PNROutputItemXMLFormat])
		VALUES						(@PNROutputItemId + 1,1,'0',1,'','Pick Up-%PickupOffAddress%', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),  
									(@PNROutputItemId + 2,1,'0',1,'','Drop off-%DropOffAddress%', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),
									(@PNROutputItemId + 3,1,'0',1,'','Drop Fee-%DropOffFee%', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),
									(@PNROutputItemId + 4,1,'0',1,'','Airline FF-%FrequentFlierNumber%%FrequentflightNumber%', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL)
										
		INSERT INTO [dbo].[PNROutputGroupPNROutputItem]	([PNROutputGroupId],[PNROutputItemId],[SequenceNumber],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber],[DataStandardizationVersion],[LayoutVersion])     
		VALUES						(@PNROutputGroupID, @PNROutputItemId + 1,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
									(@PNROutputGroupID, @PNROutputItemId + 2,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
									(@PNROutputGroupID, @PNROutputItemId + 3,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
									(@PNROutputGroupID, @PNROutputItemId + 4,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1')

		PRINT 'END Script ' + @CreationUserIdentifier
		-----------------------------------------------------------------------------------------
		PRINT 'START Script ' + @CreationUserIdentifier

		SET @CreationUserIdentifier	='Amadeus CA Migration - US15949'
	
		DELETE FROM [ClientDefinedRuleWorkflowTriggerApplicationMode]   WHERE CreationUserIdentifier =@CreationUserIdentifier
		DELETE FROM [ClientDefinedRuleWorkflowTriggerState]				WHERE CreationUserIdentifier =@CreationUserIdentifier

		INSERT INTO [dbo].[ClientDefinedRuleWorkflowTriggerApplicationMode] ([ClientDefinedRuleWorkflowTriggerApplicationModeName],[CreationTimeStamp],[CreationUserIdentifier],[VersionNumber])
		VALUES
									('CORPAddSegment', @CreationTimeStamp, @CreationUserIdentifier, 1),
									('CORPFullWrap', @CreationTimeStamp, @CreationUserIdentifier, 1),
									('CORPItineraryQueue', @CreationTimeStamp, @CreationUserIdentifier, 1),
									('CORPInvoiceItinerary', @CreationTimeStamp, @CreationUserIdentifier, 1),
									('CORPCancelSegment', @CreationTimeStamp, @CreationUserIdentifier, 1)


		INSERT INTO [dbo].[ClientDefinedRuleWorkflowTriggerState] ([ClientDefinedRuleWorkflowTriggerStateName],[CreationTimeStamp],[CreationUserIdentifier],[VersionNumber])
		VALUES
									('CORPLoadPnr', @CreationTimeStamp, @CreationUserIdentifier, 1)	 -- resuse Read Booking	  	
																						
		declare @CORPAddSegmentID AS INT = (SELECT [ClientDefinedRuleWorkflowTriggerApplicationModeID] FROM [ClientDefinedRuleWorkflowTriggerApplicationMode] WHERE [ClientDefinedRuleWorkflowTriggerApplicationModeName]='CORPAddSegment')
		declare @CORPFullWrapID	AS INT		 = (SELECT [ClientDefinedRuleWorkflowTriggerApplicationModeID] FROM [ClientDefinedRuleWorkflowTriggerApplicationMode] WHERE [ClientDefinedRuleWorkflowTriggerApplicationModeName]='CORPFullWrap')
		declare @CORPItineraryQueueID AS INT	 = (SELECT [ClientDefinedRuleWorkflowTriggerApplicationModeID] FROM [ClientDefinedRuleWorkflowTriggerApplicationMode] WHERE [ClientDefinedRuleWorkflowTriggerApplicationModeName]='CORPItineraryQueue')
		declare @CORPInvoiceItineraryID AS INT = (SELECT [ClientDefinedRuleWorkflowTriggerApplicationModeID] FROM [ClientDefinedRuleWorkflowTriggerApplicationMode] WHERE [ClientDefinedRuleWorkflowTriggerApplicationModeName]='CORPInvoiceItinerary')
		declare @CORPCancelSegmentID AS INT	 = (SELECT [ClientDefinedRuleWorkflowTriggerApplicationModeID] FROM [ClientDefinedRuleWorkflowTriggerApplicationMode] WHERE [ClientDefinedRuleWorkflowTriggerApplicationModeName]='CORPCancelSegment')
		declare @CORPLoadPnrID  AS INT			 = (SELECT [ClientDefinedRuleWorkflowTriggerStateID] FROM [ClientDefinedRuleWorkflowTriggerState] WHERE [ClientDefinedRuleWorkflowTriggerStateName]='CORPLoadPnr')
		declare @DynamicID		AS INT		 = (SELECT [ClientDefinedRuleWorkflowTriggerStateID] FROM [ClientDefinedRuleWorkflowTriggerState] WHERE [ClientDefinedRuleWorkflowTriggerStateName]='Dynamic')


		INSERT INTO [dbo].[ClientDefinedRuleWorkflowTrigger] ([CreationTimestamp],[CreationUserIdentifier],[VersionNumber],[ClientDefinedRuleWorkflowTriggerStateId],[ClientDefinedRuleWorkflowTriggerApplicationModeId])
		VALUES
									(@CreationTimeStamp, @CreationUserIdentifier, 1, @CORPLoadPnrID, @CORPAddSegmentID),
									(@CreationTimeStamp, @CreationUserIdentifier, 1, @CORPLoadPnrID, @CORPFullWrapID),
									(@CreationTimeStamp, @CreationUserIdentifier, 1, @CORPLoadPnrID, @CORPItineraryQueueID),
									(@CreationTimeStamp, @CreationUserIdentifier, 1, @CORPLoadPnrID, @CORPInvoiceItineraryID),
									(@CreationTimeStamp, @CreationUserIdentifier, 1, @CORPLoadPnrID, @CORPCancelSegmentID),
									(@CreationTimeStamp, @CreationUserIdentifier, 1, @DynamicID, @CORPAddSegmentID),
									(@CreationTimeStamp, @CreationUserIdentifier, 1, @DynamicID, @CORPFullWrapID),
									(@CreationTimeStamp, @CreationUserIdentifier, 1, @DynamicID, @CORPItineraryQueueID),
									(@CreationTimeStamp, @CreationUserIdentifier, 1, @DynamicID, @CORPInvoiceItineraryID),
									(@CreationTimeStamp, @CreationUserIdentifier, 1, @DynamicID, @CORPCancelSegmentID)

		PRINT 'END Script ' + @CreationUserIdentifier
		-----------------------------------------------------------------------------------------	
		SET @CreationUserIdentifier              = 'Amadeus CA Migration - US15243'
		PRINT 'START Script ' + @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleRelationalOperator WHERE  CreationUserIdentifier = @CreationUserIdentifier
		                        

		INSERT INTO ClientDefinedRuleRelationalOperator(RelationalOperatorName, CreationTimeStamp, CreationUserIdentifier, VersionNumber)
		VALUES
										('>=', @CreationTimestamp, @CreationUserIdentifier, 1),
										('<=', @CreationTimestamp, @CreationUserIdentifier, 1),
										('>', @CreationTimestamp, @CreationUserIdentifier, 1),
										('<', @CreationTimestamp, @CreationUserIdentifier, 1),
										('BETWEEN', @CreationTimestamp, @CreationUserIdentifier, 1),
										('NOT BETWEEN', @CreationTimestamp, @CreationUserIdentifier, 1)
		                       
		PRINT 'END Script ' + @CreationUserIdentifier
		-----------------------------------------------------------------------------------------		
		SET @CreationUserIdentifier ='Amadeus CA Migration - US15949'
		PRINT 'START Script ' + @CreationUserIdentifier

		DELETE FROM [ClientDefinedRuleBusinessEntity]   WHERE CreationUserIdentifier =@CreationUserIdentifier

		INSERT INTO [dbo].[ClientDefinedRuleBusinessEntity]
		([BusinessEntityName],[BusinessEntityDescription],[CreationTimeStamp],[CreationUserIdentifier],[VersionNumber],[IsLogic],[IsResult])
		VALUES
									('UI_DISPLAY_CONTAINER', 'Display the Container in Specific Menu', @CreationTimeStamp, @CreationUserIdentifier, 1, 0, 1),
									('UI_ADD_CONTROL', 'Add dynamic control in container form', @CreationTimeStamp, @CreationUserIdentifier, 1, 0, 1),
									('PNR_AIR_SEGMENT_AIRPORT_CODE', 'Reads the Air Segment Airport Code field from the PNR', @CreationTimeStamp, @CreationUserIdentifier, 1, 1, 0),
									('PNR_AIR_SEGMENT_DEPT_TIME', 'Reads the Air Segment Departure Time field from the PNR', @CreationTimeStamp, @CreationUserIdentifier, 1, 1, 0),
									('PNR_AIR_SEGMENT_ARR_TIME', 'Reads the Air Segment Arrival Time field from the PNR', @CreationTimeStamp, @CreationUserIdentifier, 1, 1, 0),
									('PNR_AIR_SEGMENT_ROUTE_CODE', 'Reads the Air Segment Route Code field from the PNR', @CreationTimeStamp, @CreationUserIdentifier, 1, 1, 0),
									('UI_SEND_ITIN_ALLOWED_EMAIL_ENTRY', 'Send Itinerary - Allowed number of Email Address', @CreationTimeStamp, @CreationUserIdentifier, 1, 0, 1),
									('UI_DISPLAY_MESSAGE', 'Display Specific Message', @CreationTimeStamp, @CreationUserIdentifier, 1, 0, 1),
									('PNR_WRITE_REMARK_WITH_CONDTION', 'CA - Write remarks with condition', @CreationTimeStamp, @CreationUserIdentifier, 1, 0, 1),
									('PNR_AIR_SEGMENT_AIRLINE_CODE', 'Reads the Air Segment Airline Code from the PNR', @CreationTimeStamp, @CreationUserIdentifier, 1, 1, 0),
									('PNR_CAR_SEGMENT_VENDOR_CODE', 'Reads the Car Segment Vendor Code from the PNR', @CreationTimeStamp, @CreationUserIdentifier, 1, 1, 0),
									('PNR_CAR_SEGMENT_TYPE', 'Reads the Car Segment Type from the PNR', @CreationTimeStamp, @CreationUserIdentifier, 1, 1, 0),
									('PNR_COUNT_DEPARTURE_DATE_FROM_TODAY', 'Reads the and count the days of Departure Date from todays date', @CreationTimeStamp, @CreationUserIdentifier, 1, 0, 1),
									('PNR_SEGMENT_TYPES_IN_PNR', 'Reads all the segment types in the PNR', @CreationTimeStamp, @CreationUserIdentifier, 1, 0, 1),
									('PNR_EB', 'Reads the PNR EB remark', @CreationTimeStamp, @CreationUserIdentifier, 1, 0, 1),
									('PNR_WRITE_REMARK_WITH_SEGMENT_RELATE', 'CA - Write remarks with segment relate', @CreationTimeStamp, @CreationUserIdentifier, 1, 0, 1),
									('PNR_DELETE_REMARK_THAT_CONTAINS', 'CA - Delete remarks that contains', @CreationTimeStamp, @CreationUserIdentifier, 1, 0, 1)

		PRINT 'END Script ' + @CreationUserIdentifier
		-----------------------------------------------------------------------------------------
		

		 SET @CreationUserIdentifier                                      = 'Amadeus CA Migration - US16315'     
		 PRINT 'START Script ' + @CreationUserIdentifier
         SET @PNROutputItemId =            (SELECT MAX(PNROutputItemId)  FROM [PNROutputItem])
         SET @PNROutputGroupID =        (SELECT PNROutputGroupId  FROM PNROutputGroup Where PNROutputGroupName = 'Canada Migration BackOffice Group')
         SET @PNROutputRemarkGroupId = (SELECT MAX(PNROutputRemarkGroupId)  FROM PNROutputRemarkGroup)

         
         INSERT INTO [dbo].[PNROutputPlaceHolder]([PNROutputPlaceHolderName],[PNROutputPlaceHolderRegularExpresssion],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber])
		 VALUES					 ( '%ConsultantName%', '(.*)',@CreationTimestamp, @CreationUserIdentifier, 1 ),                                                                                                                                                        
                                 --( '%CNNumber%', '(.*)',@CreationTimestamp, @CreationUserIdentifier, 1 ),
                                 ( '%ConsultantOid%', '(.*)',@CreationTimestamp, @CreationUserIdentifier, 1),                  
                                 ( '%IrdRateQueue%', '(.*)',@CreationTimestamp, @CreationUserIdentifier, 1 ),
                                 ( '%IrdDate%', '(.*)',@CreationTimestamp, @CreationUserIdentifier, 1 ),
                                 ( '%CFANumber%', '(.*)',@CreationTimestamp, @CreationUserIdentifier, 1 ),
                                 ( '%FareRequest%', '(.*)',@CreationTimestamp, @CreationUserIdentifier, 1 ),
                                 ( '%AirFlexibility%', '(.*)',@CreationTimestamp, @CreationUserIdentifier, 1 ),
                                 ( '%DateFlexibilty%', '(.*)',@CreationTimestamp, @CreationUserIdentifier, 1 ),
                                 ( '%ScheduleFlexibility%', '(.*)',@CreationTimestamp, @CreationUserIdentifier, 1 ),
                                 ( '%Stops%', '(.*)',@CreationTimestamp, @CreationUserIdentifier, 1 ),
							     ( '%TravelQueue%', '(.*)',@CreationTimestamp, @CreationUserIdentifier, 1 )
													  
								--select * from [PNROutputPlaceHolder] where PNROutputPlaceHolderName like '%IrdQueue%'	
                                                            
          INSERT INTO [dbo].[PNROutputItem]    ([PNROutputItemId],[PNROutputRemarkTypeCode],[PNROutputBindingTypeCode], [PNROutputUpdateTypeCode],[GDSRemarkQualifier],[RemarkFormat],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber],[PNROutputItemDefaultLanguageCode],[PNROutputItemXMLFormat])
          VALUES  
								 (@PNROutputItemId + 1,0,'0',1,'F','FROM-%ConsultantName% CN-%CNNumber%', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),
							     (@PNROutputItemId + 2,0,'0',1,'F','Date-%IrdDate% OID-%ConsultantOid%  Agent Queue/Category - %IrdRateQueue% CFA-%CFANumber%', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),
							     (@PNROutputItemId + 3,0,'0',1,'F','Type of Fare - %FareRequest%', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),
							     (@PNROutputItemId + 4,0,'0',1,'F','Pax Airline Flex - %AirFlexibility%', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),
							     (@PNROutputItemId + 5,0,'0',1,'F','Pax Date Flex - %DateFlexibilty%', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),
							     (@PNROutputItemId + 6,0,'0',1,'F','Pax Schedule Flex - %ScheduleFlexibility%', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),
							     (@PNROutputItemId + 7,0,'0',1,'F','Stopovers - %Stops%', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),
								 (@PNROutputItemId + 8,0,'0',1,'F','Queue Completed Rate to IRD YTOWL210N - %TravelQueue%', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL)
							                                                                                                                                                    
                                                                                          
                              
          INSERT INTO [dbo].[PNROutputGroupPNROutputItem] ([PNROutputGroupId],[PNROutputItemId],[SequenceNumber],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber],[DataStandardizationVersion],[LayoutVersion])     
          VALUES							
								(@PNROutputGroupID, @PNROutputItemId + 1,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
                                (@PNROutputGroupID, @PNROutputItemId + 2,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
                                (@PNROutputGroupID, @PNROutputItemId + 3,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
                                (@PNROutputGroupID, @PNROutputItemId + 4,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
                                (@PNROutputGroupID, @PNROutputItemId + 5,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
                                (@PNROutputGroupID, @PNROutputItemId + 6,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
                                (@PNROutputGroupID, @PNROutputItemId + 7,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
								(@PNROutputGroupID, @PNROutputItemId + 8,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1')
                                
                                                                                                                              

		PRINT 'END Script ' + @CreationUserIdentifier
		-----------------------------------------------------------------------------------------
		

		SET @CreationUserIdentifier              = 'Amadeus CA Migration - US11219'
		PRINT 'START Script ' + @CreationUserIdentifier
        DELETE FROM PnrOutputCondition WHERE CreationUserIdentifier = @CreationUserIdentifier
        DELETE FROM PNROutputGroupPNROutputItem WHERE CreationUserIdentifier = @CreationUserIdentifier
        DELETE FROM PNROutputGroup WHERE CreationUserIdentifier = @CreationUserIdentifier
        DELETE FROM PNROutputGroupCountry WHERE CreationUserIdentifier = @CreationUserIdentifier
        DELETE FROM PNROutputItemLanguage WHERE CreationUserIdentifier = @CreationUserIdentifier
        DELETE FROM PNROutputItem WHERE CreationUserIdentifier = @CreationUserIdentifier
        DELETE FROM PNROutputPlaceHolder WHERE   CreationUserIdentifier = @CreationUserIdentifier

       
       ----------------------------------
       -- Insert Scripts
       ----------------------------------

       SET @CreationUserIdentifier              = 'Amadeus CA Migration - US11219'      
       SET @PNROutputItemId    =  (SELECT MAX(PNROutputItemId)   FROM [PNROutputItem])
       --SET @PNROutputGroupID   =  (SELECT MAX(PNROutputGroupId)  FROM [PNROutputGroup])
       SET @PNROutputGroupID       =  (SELECT PNROutputGroupId  FROM [PNROutputGroup] Where PNROutputGroupName = 'Canada Migration General Group')


        INSERT INTO [dbo].[PNROutputPlaceHolder]([PNROutputPlaceHolderName],[PNROutputPlaceHolderRegularExpresssion],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber])
        VALUES 
								( '%TicketSequence%', '(.*)',@CreationTimestamp, @CreationUserIdentifier, 1 ),
                                ( '%NumberOfTickets%', '(.*)',@CreationTimestamp, @CreationUserIdentifier, 1 )
                                                                                      
        INSERT INTO [dbo].[PNROutputItem]       ([PNROutputItemId],[PNROutputRemarkTypeCode],[PNROutputBindingTypeCode], [PNROutputUpdateTypeCode],[GDSRemarkQualifier],[RemarkFormat],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber],[PNROutputItemDefaultLanguageCode],[PNROutputItemXMLFormat])
        VALUES       
								(@PNROutputItemId + 1,0,'S',1,'T','TKT%TicketSequence%-ETK', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),
                                (@PNROutputItemId + 2,0,'S',1,'T','TKT%TicketSequence%-INV-LIMO', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),
                                (@PNROutputItemId + 3,0,'S',1,'T','TKT%TicketSequence%-INV-HTL', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),
                                (@PNROutputItemId + 4,0,'S',1,'T','TKT%TicketSequence%-INV-CAR', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),
                                (@PNROutputItemId + 5,0,'S',1,'T','TKT%TicketSequence%-DOM', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),
                                (@PNROutputItemId + 6,0,'S',1,'T','TKT%TicketSequence%-TRANS', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),
                                (@PNROutputItemId + 7,0,'S',1,'T','TKT%TicketSequence%-INTL', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),
                                (@PNROutputItemId + 8,0,'0',1,'Q','ADVISED USTRAVEL A PASSPORT AND VISA ARE REQUIRED', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),
                                (@PNROutputItemId + 9,0,'0',1,'Q','ADVISED USTRAVEL 6 MONTH FROM DEPARTURE', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),
                                (@PNROutputItemId + 10,0,'0',1,'T','SPLIT%NumberOfTickets%', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL)
                                                                             
        INSERT INTO [dbo].[PNROutputGroupPNROutputItem] ([PNROutputGroupId],[PNROutputItemId],[SequenceNumber],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber],[DataStandardizationVersion],[LayoutVersion])     
        VALUES       
								(@PNROutputGroupID, @PNROutputItemId + 1,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
                                (@PNROutputGroupID, @PNROutputItemId + 2,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
                                (@PNROutputGroupID, @PNROutputItemId + 3,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
                                (@PNROutputGroupID, @PNROutputItemId + 4,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
                                (@PNROutputGroupID, @PNROutputItemId + 5,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
                                (@PNROutputGroupID, @PNROutputItemId + 6,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
                                (@PNROutputGroupID, @PNROutputItemId + 7,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
                                (@PNROutputGroupID, @PNROutputItemId + 8,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
                                (@PNROutputGroupID, @PNROutputItemId + 9,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
                                (@PNROutputGroupID, @PNROutputItemId + 10,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1')

        INSERT INTO [dbo].[PnrOutputCondition] (PNROutputItemId,PNROutputConditionName,PNROutputConditionValue,CreationTimestamp,CreationUserIdentifier,VersionNumber)
		VALUES 
								(@PNROutputItemId + 8, 'AquaTicketingCondition', 'true', @CreationTimestamp, @CreationUserIdentifier, 1),
                                (@PNROutputItemId + 9, 'AquaTicketingCondition', 'true', @CreationTimestamp, @CreationUserIdentifier, 1)



		PRINT 'END Script ' + @CreationUserIdentifier
		-----------------------------------------------------------------------------------------
		PRINT 'START Script ' + @CreationUserIdentifier

		PRINT 'END Script ' + @CreationUserIdentifier
		-----------------------------------------------------------------------------------------
		PRINT 'START Script ' + @CreationUserIdentifier

		PRINT 'END Script ' + @CreationUserIdentifier
		-----------------------------------------------------------------------------------------
		PRINT 'START Script ' + @CreationUserIdentifier

		PRINT 'END Script ' + @CreationUserIdentifier
		-----------------------------------------------------------------------------------------
		





	COMMIT TRAN
END TRY
	
BEGIN CATCH

	ROLLBACK TRAN

	PRINT 'ERROR OCCURRED! Rolled back transactions if there are any:' 
    PRINT ERROR_NUMBER() 
       PRINT 'Error Severity: ' 
    PRINT ERROR_SEVERITY() 
       PRINT 'Error State: ' 
    PRINT ERROR_STATE() 
       PRINT 'Error Procedure: ' 
    PRINT ERROR_PROCEDURE() 
       PRINT 'Error Line: ' 
    PRINT ERROR_LINE() 
       PRINT 'Error Message: ' 
    PRINT ERROR_MESSAGE(); 

END CATCH