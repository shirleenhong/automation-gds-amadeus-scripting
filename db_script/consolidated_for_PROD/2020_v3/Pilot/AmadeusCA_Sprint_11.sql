USE Desktop_SyEx_Pilot
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

       DECLARE @PNROutputItemIdPassName INT
       
      

       ----------------------------------
       -- US11196-update
       ----------------------------------

       PRINT 'START Script US11196'
             SET @CreationUserIdentifier              = 'Amadeus CA Migration - US11196-update'      
             SET @PNROutputItemId    =  (SELECT MAX(PNROutputItemId)
FROM [PNROutputItem])
             SET @PNROutputGroupID   =  (SELECT MAX(PNROutputGroupId)
FROM [PNROutputGroup])
             SET @GeneralGroup       =  (SELECT PNROutputGroupId
FROM [PNROutputGroup]
Where PNROutputGroupName = 'Canada Migration General Group')
		
		

           INSERT INTO [dbo].[PNROutputPlaceHolder]
    ([PNROutputPlaceHolderName],[PNROutputPlaceHolderRegularExpresssion],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber])
VALUES
    ( '%ToucheLess%', '([A-Z0-9]{3})$', @CreationTimestamp, @CreationUserIdentifier, 1 )
                                         
			
           INSERT INTO [dbo].[PNROutputItem]
    ([PNROutputItemId],[PNROutputRemarkTypeCode],[PNROutputBindingTypeCode], [PNROutputUpdateTypeCode],[GDSRemarkQualifier],[RemarkFormat],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber],[PNROutputItemDefaultLanguageCode],[PNROutputItemXMLFormat])
VALUES(@PNROutputItemId + 1, 3, '0', 2, '', 'EB/-%ToucheLess%', @CreationTimestamp, @CreationUserIdentifier, 1, 'en-GB', NULL)
                                               
            INSERT INTO [dbo].[PNROutputGroupPNROutputItem]
    ([PNROutputGroupId],[PNROutputItemId],[SequenceNumber],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber],[DataStandardizationVersion],[LayoutVersion])
VALUES(@GeneralGroup, @PNROutputItemId + 1, 0, @CreationTimestamp, @CreationUserIdentifier, 1, '1', '1')
        

    
       ----------------------------------
       -- US11387
       ----------------------------------

       PRINT 'START Script - US11387'
             SET @CreationUserIdentifier              = 'Amadeus CA Migration - US11387'      
             SET @PNROutputItemId    =  (SELECT MAX(PNROutputItemId)
FROM [PNROutputItem])
             SET @PNROutputGroupID   =  (SELECT MAX(PNROutputGroupId)
FROM [PNROutputGroup])
             SET @GeneralGroup       =  (SELECT PNROutputGroupId
FROM [PNROutputGroup]
Where PNROutputGroupName = 'Canada Migration General Group')
			 SET @ItineraryGroup       =  (SELECT PNROutputGroupId
FROM [PNROutputGroup]
Where PNROutputGroupName = 'Canada Migration Itinerary Group')
			 SET @PNROutputRemarkGroupId = (SELECT MAX(PNROutputRemarkGroupId)
FROM [PNROutputRemarkGroup])


           INSERT INTO [dbo].[PNROutputPlaceHolder]
    ([PNROutputPlaceHolderName],[PNROutputPlaceHolderRegularExpresssion],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber])
VALUES
    ( '%PassFeeAmount%', '([0-9]*\.{0,1}[0-9]{0,2})', @CreationTimestamp, @CreationUserIdentifier, 1 ),
    ( '%PassSegmentCost%', '([0-9]*\.{0,1}[0-9]{0,2})', @CreationTimestamp, @CreationUserIdentifier, 1 ),
    ('%PassExpDate%', '(.*)', @CreationTimestamp, @CreationUserIdentifier, 1 ),
    ( '%CCExpDate%', '(.*)', @CreationTimestamp, @CreationUserIdentifier, 1 ),
    ( '%AirlineName%', '(.*)', @CreationTimestamp, @CreationUserIdentifier, 1 )
			
			
           INSERT INTO [dbo].[PNROutputItem]
    ([PNROutputItemId],[PNROutputRemarkTypeCode],[PNROutputBindingTypeCode], [PNROutputUpdateTypeCode],[GDSRemarkQualifier],[RemarkFormat],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber],[PNROutputItemDefaultLanguageCode],[PNROutputItemXMLFormat])
VALUES(@PNROutputItemId + 1, 1, '0', 1, '', 'ONE TIME CWT FEE FOR PASS TRANSACTIONS', @CreationTimestamp, @CreationUserIdentifier, 1, 'en-GB', NULL),
    (@PNROutputItemId + 2, 1, '0', 1, '', 'ADMINISTRATION FEE OF [FEE] PLUS TAX', @CreationTimestamp, @CreationUserIdentifier, 1, 'en-GB', NULL),
    (@PNROutputItemId + 3, 1, '0', 1, '', 'TOTAL FEE IS NONREFUNDABLE', @CreationTimestamp, @CreationUserIdentifier, 1, 'en-GB', NULL),
    (@PNROutputItemId + 4, 0, '0', 1, '', 'ADMIN FEE OF %PassFeeAmount% TO BE BILLED THRU CWT FINANCE', @CreationTimestamp, @CreationUserIdentifier, 1, 'en-GB', NULL),
    (@PNROutputItemId + 5, 0, '0', 1, 'A', 'BULK99-%AirlineCode%/%PassName%.%FareType%/%TktNbr%/%PassSegmentCost%/%PassExpDate%', @CreationTimestamp, @CreationUserIdentifier, 1, 'en-GB', NULL),
    (@PNROutputItemId + 6, 0, '0', 1, 'A', 'CC%CCVendor%%CCNo%EXP%CCExpDate%/30C*BULK99', @CreationTimestamp, @CreationUserIdentifier, 1, 'en-GB', NULL),
    (@PNROutputItemId + 7, 1, 'S', 1, '', 'VALID UNTIL %PassExpDate%', @CreationTimestamp, @CreationUserIdentifier, 1, 'en-GB', NULL),
    (@PNROutputItemId + 8, 1, 'S', 1, '', 'YOUR %AirlineName% CONFIRMATION NUMBER IS %TktNbr%', @CreationTimestamp, @CreationUserIdentifier, 1, 'en-GB', NULL)
											


			INSERT INTO PNROutputItemLanguage
    ([PNROutputItemId], LanguageCode, RemarkFormatTranslation, [CreationTimestamp],[CreationUserIdentifier],[VersionNumber])
VALUES(@PNROutputItemId + 1, 'fr-CA', 'FRAIS UNIQUE DE CWT POUR LES TRANSACTIONS AVEC LAISSEZ-PASSER', @CreationTimestamp, @CreationUserIdentifier, 1),
    (@PNROutputItemId + 2, 'fr-CA', 'FRAIS ADMINISTRATIFS DE [FEE] PLUS TAX', @CreationTimestamp, @CreationUserIdentifier, 1),
    (@PNROutputItemId + 3, 'fr-CA', 'POUR UN TOTAL NON REMBOURSABLE', @CreationTimestamp, @CreationUserIdentifier, 1),
    --(@PNROutputItemId + 7, 'fr-CA', 'PASSE %StandAlonePassPurchase%', @CreationTimestamp,@CreationUserIdentifier,1),
    (@PNROutputItemId + 7, 'fr-CA', 'DATE D ESCHANCE DU VOTRE PASSE EST %PassExpDate%', @CreationTimestamp, @CreationUserIdentifier, 1),
    (@PNROutputItemId + 8, 'fr-CA', 'VOTRE NUMERO DE CONFIRMATION %AirlineName% EST %TktNbr%', @CreationTimestamp, @CreationUserIdentifier, 1)

            INSERT INTO [dbo].[PNROutputGroupPNROutputItem]
    ([PNROutputGroupId],[PNROutputItemId],[SequenceNumber],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber],[DataStandardizationVersion],[LayoutVersion])
VALUES(@ItineraryGroup, @PNROutputItemId + 1, 0, @CreationTimestamp, @CreationUserIdentifier, 1, '1', '1'),
    (@ItineraryGroup, @PNROutputItemId + 2, 0, @CreationTimestamp, @CreationUserIdentifier, 1, '1', '1'),
    (@ItineraryGroup, @PNROutputItemId + 3, 0, @CreationTimestamp, @CreationUserIdentifier, 1, '1', '1'),
    (@GeneralGroup, @PNROutputItemId + 4, 0, @CreationTimestamp, @CreationUserIdentifier, 1, '1', '1'),
    (@GeneralGroup, @PNROutputItemId + 5, 0, @CreationTimestamp, @CreationUserIdentifier, 1, '1', '1'),
    (@GeneralGroup, @PNROutputItemId + 6, 0, @CreationTimestamp, @CreationUserIdentifier, 1, '1', '1'),
    (@ItineraryGroup, @PNROutputItemId + 7, 0, @CreationTimestamp, @CreationUserIdentifier, 1, '1', '1'),
    (@ItineraryGroup, @PNROutputItemId + 8, 0, @CreationTimestamp, @CreationUserIdentifier, 1, '1', '1')


             INSERT INTO [dbo].[PnrOutputCondition]
    (PNROutputItemId,PNROutputConditionName,PNROutputConditionValue,CreationTimestamp,CreationUserIdentifier,VersionNumber)
VALUES
    (@PNROutputItemId + 1, 'IsPos', 'true', @CreationTimestamp, @CreationUserIdentifier, 1),
    (@PNROutputItemId + 2, 'IsPos', 'true', @CreationTimestamp, @CreationUserIdentifier, 1),
    (@PNROutputItemId + 3, 'IsPos', 'true', @CreationTimestamp, @CreationUserIdentifier, 1)
											   
			 
			 INSERT INTO ConfigurationParameter
    (ConfigurationParameterName, ConfigurationParameterValue, ContextId, CreationTimestamp, CreationUserIdentifier, VersionNumber)
VALUES('UsersToStandAlonePassPurchase', 'U001RCM,U001RXJ,UMXS737,UCXW256,U28TO07', 11 , @CreationTimestamp, @CreationUserIdentifier, 1)
				
			 INSERT INTO dbo.PNROutputRemarkGroup
    (PNROutputRemarkGroupId, PNROutputRemarkGroupName, CreationTimestamp, CreationUserIdentifier, LastUpdateTimestamp, LastUpdateUserIdentifier, VersionNumber, PNROutputRemarkGroupKey)
VALUES
    (@PNROutputRemarkGroupId + 1, 'CAPassPurchase', @CreationTimestamp, @CreationUserIdentifier, NULL, NULL, 1, NULL),
    (@PNROutputRemarkGroupId + 2, 'CAPassPurchasePos', @CreationTimestamp, @CreationUserIdentifier, NULL, NULL, 1, NULL)

             SET @PNROutputItemIdPassName = (SELECT PNROutputItemId
FROM [PNROutputItem]
Where remarkformat = '%PassNameNonAc% PASS')

			INSERT INTO [dbo].[PNROutputRemarkGroupPNROutputItem]
    ([PNROutputRemarkGroupId],PNROutputItemId,[CreationTimestamp],[CreationUserIdentifier],[VersionNumber])
VALUES(@PNROutputRemarkGroupId + 1 , @PNROutputItemId + 1, @CreationTimestamp, @CreationUserIdentifier, 1),
    (@PNROutputRemarkGroupId + 1 , @PNROutputItemId + 2, @CreationTimestamp, @CreationUserIdentifier, 1),
    (@PNROutputRemarkGroupId + 1 , @PNROutputItemId + 3, @CreationTimestamp, @CreationUserIdentifier, 1),
    (@PNROutputRemarkGroupId + 2 , @PNROutputItemIdPassName, @CreationTimestamp, @CreationUserIdentifier, 1),
    (@PNROutputRemarkGroupId + 2 , @PNROutputItemId + 7, @CreationTimestamp, @CreationUserIdentifier, 1),
    (@PNROutputRemarkGroupId + 2 , @PNROutputItemId + 8, @CreationTimestamp, @CreationUserIdentifier, 1)

     

  ----------------------------------
       -- US16586
       ----------------------------------

       PRINT 'START Script - US16586'
       DECLARE @CreationUserIdentifierOld NVARCHAR(170)
       DECLARE @CreationUserIdentifierNew NVARCHAR(170)
           SET @CreationUserIdentifierOld              = 'Amadeus CA Migration - US11130'
	   SET @CreationUserIdentifierNew              = 'Amadeus CA Migration - US16586'
       DELETE FROM ConfigurationParameter WHERE CreationUserIdentifier = @CreationUserIdentifierOld
	   DELETE FROM ConfigurationParameter WHERE CreationUserIdentifier = @CreationUserIdentifierNew
        SET @CreationUserIdentifierNew              = 'Amadeus CA Migration - US16586'
	   insert into ConfigurationParameter
values
    ( 'TeamQueuePCCOID', 'YQBWL2100,YTOWL2101,YVRWL2103,YOWWL2105,YXEWL2102,YTOWL210A,YVRWL2102,YTOWL2105,YTOWL2103,YTOWL210J,YTOWL2119, YXEWL2101,YTOWL2109,YOWWL2102', 11,
        @CreationTimestamp, @CreationUserIdentifierNew, null, null, 1)
	                                              


  ----------------------------------
       -- Other Updates
 ----------------------------------

Update PNROUTPUTPlaceholder set PNROutputPlaceHolderRegularExpresssion= '((([A-Z]{3})(\d+\.?\d+)?(\/?)))+(TK-[0-9]+)|((([A-Z]{3})(\d+\.?\d+)?(\/?)))+$' where PNROutputPlaceholderName like '%SupFeeInfo%';



set @CreationUserIdentifier  = 'Amadeus CA Migration - US13842'
	
	DECLARE @feeId as Int = (select max(clientfeeId)
from clientfee);
	Declare @clientFeegroupId as Int = (select max(clientfeeGroupId)
from ClientFeeGroup);
	DECLARE @clientFeeItemId as int = (Select max(clientFeeItemId)
from clientfeeitem);
	DECLARE @clientFeeOutputId as int = (Select max(clientFeeOutputId)
from ClientFeeOutput);


	

	INSERT INTO [dbo].[ClientFee]
    ([ClientFeeId],[ClientFeeDescription],[FeeTypeId],[ContextId],[CreationTimestamp],[CreationUserIdentifier],[LastUpdateTimestamp],[LastUpdateUserIdentifier],[VersionNumber]
    ,[GDSCode])
VALUES
    (@feeId+1, 'Exchange Fee', 2, 1, @creationTimestamp, @CreationUserIdentifier, null, null, 1, '1A'),
    (@feeId+2, 'ABF Fee', 2, 1, @creationTimestamp, @CreationUserIdentifier, null, null, 1, '1A')
					


SET IDENTITY_INSERT [dbo].CLIENTFEEOUTPUT ON;  
	INSERT INTO CLIENTFEEOUTPUT
    (clientFeeOutputId,[ClientFeeId],OutputFormat,OutputDescription, CreationTimeStamp,[CreationUserIdentifier],[VersionNumber])
VALUES
    (@clientFeeOutputId+1, @feeId+1, 'EPF', 'Exchange Fee', @creationTimestamp, @CreationUserIdentifier, 1),
    (@clientFeeOutputId+2, @feeId+1, 'ABF', 'ABF Concur Fee', @creationTimestamp, @CreationUserIdentifier, 1)

		   
SET IDENTITY_INSERT [dbo].CLIENTFEEOUTPUT OFF;  

	INSERT INTO CLIENTFEELanguage
    ([ClientFeeId],LanguageCode,ClientFeeLanguageDescription, CreationTimeStamp,[CreationUserIdentifier],[VersionNumber])
VALUES
    (@feeId+1, 'en-GB', 'EXC Fee', @creationTimestamp, @CreationUserIdentifier, 1),
    (@feeId+2, 'en-GB', 'ABF Fee', @creationTimestamp, @CreationUserIdentifier, 1)


       PRINT 'END Script'

       COMMIT TRAN
END TRY
       
BEGIN CATCH
ROLLBACK TRAN

       DECLARE @ErrorMessage NVARCHAR(4000);
       SELECT @ErrorMessage=ERROR_MESSAGE()
       RAISERROR(@ErrorMessage, 10, 1);

END CATCH




 



