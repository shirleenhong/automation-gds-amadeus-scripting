USE Desktop_Syex_Pilot

GO

BEGIN TRAN
BEGIN TRY

		DECLARE @CreationUserIdentifier		NVARCHAR(150)
		DECLARE @CreationTimestamp			DATETIME = GETUTCDATE()
		DECLARE @TeamId 					INT	
		DECLARE @PNROutputItemId			INT
		DECLARE @PNROutputItemId1			INT
		DECLARE @PNROutputItemId2			INT
		DECLARE @PNROutputItemId3			INT
		DECLARE @PNROutputItemId4			INT
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
		DECLARE @ServicingOptionItemId AS int 
        DECLARE @ServicingOptionGroup As int
		DECLARE @ItineraryGroup          INT
		DECLARE @InvoiceGroup            INT
		DECLARE @ApplicationGroup        INT
		DECLARE @GeneralGroup            INT


		UPDATE pnroutputplaceholder 
		SET pnroutputplaceholdername = '%ConfNbr%'
		where pnroutputplaceholdername like '%ConfNbr%'
	and CreationUserIdentifier = 'Amadeus CA Migration - US10552'
		

		SET @PNROutputItemId1 =  (select PNROutputItemId
from pnroutputitem
where remarkformat='THE AIRLINE TICKET CHARGE ON THIS ITINERARY/INVOICE')
		SET @PNROutputItemId2 =  (select PNROutputItemId
from pnroutputitem
where remarkformat='IS FOR INTERNAL COST RE-ALLOCATION PURPOSES ONLY.')
		SET @PNROutputItemId3 =  (select PNROutputItemId
from pnroutputitem
where remarkformat='**PLEASE DO NOT EXPENSE** THIS CHARGE AS IT WILL NOT APPEAR')
		SET @PNROutputItemId4 =  (select PNROutputItemId
from pnroutputitem
where remarkformat='ON YOUR CREDIT CARD STATEMENT.')

		update pnroutputitem 
		SET PNROutputUpdateTypeCode = 1
		WHERE PNROutputitemId IN (@PNROutputItemId1, @PNROutputItemId2, @PNROutputItemId3, @PNROutputItemId4)


		SET @PNROutputItemId = (select PNROutputItemId
from pnroutputitem
where remarkformat='AIRLINE LOCATOR NUMBER - %confNbr%' AND CreationUserIdentifier = 'Amadeus CA Migration - US10552')
		update pnroutputitem 
		SET RemarkFormat = 'AIRLINE LOCATOR NUMBER - %ConfNbr%'
		WHERE PNROutputitemId = @PNROutputItemId
		

		SET @PNROutputItemId1 = (select PNROutputItemId
from pnroutputitem
where remarkformat='OFC-ISSUED NONBSP TKT FOR FLT OR FARE/QUEUED TO %OfcQueue%')
		SET @PNROutputItemId2 = (select PNROutputItemId
from pnroutputitem
where remarkformat='OSC-QUEUED TO Q %OscQueue% FOR NR/CANCELLED PNR')
		
		UPDATE PNROutputItem 
		SET PNROutputremarkTypeCode = 0
		WHERE PNROutputitemId IN (@PNROutputItemId1, @PNROutputItemId2)

		SET @PNROutputItemId1 = (select PNROutputItemId
from pnroutputitem
where remarkformat='Queue Completed Rate to IRD YTOWL210N - %TravelQueue%')
		
		UPDATE PNROutputItem
		SET RemarkFormat = 'Queue Completed Rate to IRD YTOWL210N/%TravelQueue%'
		WHERE PNROutputitemId = @PNROutputItemId1

		UPDATE pnroutputplaceholder 
		SET pnroutputplaceholdername = '%CNNumber%',
		    PNROutputPlaceHolderRegularExpresssion = '(.*)'
		where pnroutputplaceholdername like '%%CnNumber%%'
	and CreationUserIdentifier = 'Amadeus CA Migration - US11134'


		SET @PNROutputItemId1 = (select PNROutputItemId
from pnroutputitem
where remarkformat='ONHOLD:AWAITING APPROVAL')
		
		UPDATE PNROutputItem
		SET PNROutputremarkTypeCode = 0
		WHERE PNROutputitemId = @PNROutputItemId1

 
       ----------------------------------
       -- Insert Scripts
       ----------------------------------
	   SET @CreationUserIdentifier              = 'Amadeus CA Migration - US11219'
       DELETE FROM PnrOutputCondition WHERE CreationUserIdentifier = @CreationUserIdentifier
       DELETE FROM PNROutputGroupPNROutputItem WHERE CreationUserIdentifier = @CreationUserIdentifier
       DELETE FROM PNROutputGroup WHERE CreationUserIdentifier = @CreationUserIdentifier
       DELETE FROM PNROutputGroupCountry WHERE CreationUserIdentifier = @CreationUserIdentifier
       DELETE FROM PNROutputItemLanguage WHERE CreationUserIdentifier = @CreationUserIdentifier
       DELETE FROM PNROutputItem WHERE CreationUserIdentifier = @CreationUserIdentifier
       DELETE FROM PNROutputPlaceHolder WHERE   CreationUserIdentifier = @CreationUserIdentifier


       PRINT 'START Script'
             SET @CreationUserIdentifier              = 'Amadeus CA Migration - US11219'      
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
	( '%TicketSequence%', '(.*)', @CreationTimestamp, @CreationUserIdentifier, 1 ),
	( '%NumberOfTickets%', '(.*)', @CreationTimestamp, @CreationUserIdentifier, 1 ),
	( '%TktRoute%', '(.*)', @CreationTimestamp, @CreationUserIdentifier, 1 ),
	( '%InvSegment%', '(.*)', @CreationTimestamp, @CreationUserIdentifier, 1 )

                                                                                      
             INSERT INTO [dbo].[PNROutputItem]
	([PNROutputItemId],[PNROutputRemarkTypeCode],[PNROutputBindingTypeCode], [PNROutputUpdateTypeCode],[GDSRemarkQualifier],[RemarkFormat],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber],[PNROutputItemDefaultLanguageCode],[PNROutputItemXMLFormat])
VALUES
	(@PNROutputItemId + 1, 0, 'S', 1, 'T', 'TKT%TicketSequence%-%InvSegment%', @CreationTimestamp, @CreationUserIdentifier, 1, 'en-GB', NULL),
	(@PNROutputItemId + 2, 0, 'S', 1, 'T', 'TKT%TicketSequence%-%TktRoute%', @CreationTimestamp, @CreationUserIdentifier, 1, 'en-GB', NULL),
	(@PNROutputItemId + 3, 0, '0', 1, 'Q', 'ADVISED USTRAVEL A PASSPORT AND VISA ARE REQUIRED', @CreationTimestamp, @CreationUserIdentifier, 1, 'en-GB', NULL),
	(@PNROutputItemId + 4, 0, '0', 1, 'Q', 'ADVISED USTRAVEL 6 MONTH FROM DEPARTURE', @CreationTimestamp, @CreationUserIdentifier, 1, 'en-GB', NULL),
	(@PNROutputItemId + 5, 0, '0', 1, 'T', 'SPLIT%NumberOfTickets%', @CreationTimestamp, @CreationUserIdentifier, 1, 'en-GB', NULL)
                                                                             
             INSERT INTO [dbo].[PNROutputGroupPNROutputItem]
	([PNROutputGroupId],[PNROutputItemId],[SequenceNumber],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber],[DataStandardizationVersion],[LayoutVersion])
VALUES
	(@GeneralGroup, @PNROutputItemId + 1, 0, @CreationTimestamp, @CreationUserIdentifier, 1, '1', '1'),
	(@GeneralGroup, @PNROutputItemId + 2, 0, @CreationTimestamp, @CreationUserIdentifier, 1, '1', '1'),
	(@GeneralGroup, @PNROutputItemId + 3, 0, @CreationTimestamp, @CreationUserIdentifier, 1, '1', '1'),
	(@GeneralGroup, @PNROutputItemId + 4, 0, @CreationTimestamp, @CreationUserIdentifier, 1, '1', '1'),
	(@GeneralGroup, @PNROutputItemId + 5, 0, @CreationTimestamp, @CreationUserIdentifier, 1, '1', '1')

    INSERT INTO [dbo].[PnrOutputCondition]
	(PNROutputItemId,PNROutputConditionName,PNROutputConditionValue,CreationTimestamp,CreationUserIdentifier,VersionNumber)
VALUES
	(@PNROutputItemId + 3, 'AquaTicketingCondition', 'true', @CreationTimestamp, @CreationUserIdentifier, 1),
	(@PNROutputItemId + 4, 'AquaTicketingCondition', 'true', @CreationTimestamp, @CreationUserIdentifier, 1)


       PRINT 'END Script'

    ---------------------------------------
    -- END US11219
    ---------------------------------------

    ---------------------------------------
    -- START US13840 - and other necessary update
    ---------------------------------------

set @CreationUserIdentifier	= 'Amadeus CA Migration - US13840'


--- DELETE FROM ConfigurationParameter where CreationUserIdentifier = @CreationUserIdentifier

INSERT INTO ConfigurationParameter
	(ConfigurationParameterName, ConfigurationParameterValue, ContextId, CreationTimestamp, CreationUserIdentifier, VersionNumber)
VALUES
	('CA_Script_Aqua_Fee_Excluded_CFA ', 'S2K,95K,AFV,CKP,CTC,CVC,CWT,F1C,FJS,FNF,GYD,HA1,HF4,HG2,HNC,HV3,I8M,JJ1,KO3,L1A,L5K,MQ4,NKC,OL1,PH3,RBM,RBP,RBC,RCL,REM,RSB,RSG,RVP,TZL,VCP,WEI,YEX,YFV,YSN,YTX,ZXM,ZZB,V9P,D2M,T1E,W1L,H8A,R3M,Q9Q,Q3I,X1L', 11, GETUTCDATE()  , @CreationUserIdentifier, 1)


--	DELETE FROM PNROutputGroupPNROutputItem WHERE PNROutputItemId  in  (select PNROutputItemId
--from PNROutputItem
--where CreationUserIdentifier in  ('Amadeus CA Migration - US11193', 'Amadeus CA Migration - US100128'))

--	DELETE FROM PNROutputItem WHERE CreationUserIdentifier in ('Amadeus CA Migration - US11193', 'Amadeus CA Migration - US100128')


   if exists (select *
from tempdb.sys.tables
where name like '#PNROutputItemIds%')
    drop table #PNROutputItemIds

	CREATE TABLE #PNROutputItemIds
(
	PNROutputItemId int
);

	INSERT INTO #PNROutputItemIds
select PNROutputItemId
from PNROutputItem
where CreationUserIdentifier in  
	('Amadeus CA Migration - US11193', 'Amadeus CA Migration - US100128','Amadeus CA Migration - US9402') and
	(RemarkFormat like 'EB/%' or RemarkFormat like '%SupfeeSegment%')

	--select * from #PNROutputItemIds

	DELETE FROM PNROutputGroupPNROutputItem WHERE PNROutputItemID  in ( select PNROutputItemId
from #PNROutputItemIds)
	DELETE FROM PNROutputItem WHERE PNROutputItemID in ( select PNROutputItemId
from #PNROutputItemIds)
	
	drop table #PNROutputItemIds


 DELETE  FROM PNRoutputPlaceholder where PnrOutputPlaceHolderName in  ('%TouchLevelCA%' , '%SupfeeSegment%') and CreationUserIdentifier in ( 'Amadeus CA Migration - US100128', 'Amadeus CA Migration - US9402')


    ---------------------------------------
    -- END US13840 - and other necessary update
    ---------------------------------------


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