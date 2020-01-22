USE [Desktop_SyEx_Pilot]
GO

BEGIN TRAN
BEGIN TRY

	---------------------------------------
    -- BEGIN US11219
    ---------------------------------------


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
       -- ROLLBACK Scripts - need to execute roll back as this is an update
       -----------------------
       SET @CreationUserIdentifier              = 'Amadeus CA Migration - US11219'
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
    (@PNROutputItemId + 5, 0, 'S', 1, 'T', 'TKT%TicketSequence%-%TktRoute%', @CreationTimestamp, @CreationUserIdentifier, 1, 'en-GB', NULL),
    (@PNROutputItemId + 8, 0, '0', 1, 'Q', 'ADVISED USTRAVEL A PASSPORT AND VISA ARE REQUIRED', @CreationTimestamp, @CreationUserIdentifier, 1, 'en-GB', NULL),
    (@PNROutputItemId + 9, 0, '0', 1, 'Q', 'ADVISED USTRAVEL 6 MONTH FROM DEPARTURE', @CreationTimestamp, @CreationUserIdentifier, 1, 'en-GB', NULL),
    (@PNROutputItemId + 10, 0, '0', 1, 'T', 'SPLIT%NumberOfTickets%', @CreationTimestamp, @CreationUserIdentifier, 1, 'en-GB', NULL)
                                                                             
             INSERT INTO [dbo].[PNROutputGroupPNROutputItem]
    ([PNROutputGroupId],[PNROutputItemId],[SequenceNumber],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber],[DataStandardizationVersion],[LayoutVersion])
VALUES
    (@GeneralGroup, @PNROutputItemId + 1, 0, @CreationTimestamp, @CreationUserIdentifier, 1, '1', '1'),
    (@GeneralGroup, @PNROutputItemId + 2, 0, @CreationTimestamp, @CreationUserIdentifier, 1, '1', '1'),
    (@GeneralGroup, @PNROutputItemId + 3, 0, @CreationTimestamp, @CreationUserIdentifier, 1, '1', '1'),
    (@GeneralGroup, @PNROutputItemId + 4, 0, @CreationTimestamp, @CreationUserIdentifier, 1, '1', '1'),
    (@GeneralGroup, @PNROutputItemId + 5, 0, @CreationTimestamp, @CreationUserIdentifier, 1, '1', '1'),
    (@GeneralGroup, @PNROutputItemId + 6, 0, @CreationTimestamp, @CreationUserIdentifier, 1, '1', '1'),
    (@GeneralGroup, @PNROutputItemId + 7, 0, @CreationTimestamp, @CreationUserIdentifier, 1, '1', '1'),
    (@GeneralGroup, @PNROutputItemId + 8, 0, @CreationTimestamp, @CreationUserIdentifier, 1, '1', '1'),
    (@GeneralGroup, @PNROutputItemId + 9, 0, @CreationTimestamp, @CreationUserIdentifier, 1, '1', '1'),
    (@GeneralGroup, @PNROutputItemId + 10, 0, @CreationTimestamp, @CreationUserIdentifier, 1, '1', '1')

             INSERT INTO [dbo].[PnrOutputCondition]
    (PNROutputItemId,PNROutputConditionName,PNROutputConditionValue,CreationTimestamp,CreationUserIdentifier,VersionNumber)
VALUES
    (@PNROutputItemId + 8, 'AquaTicketingCondition', 'true', @CreationTimestamp, @CreationUserIdentifier, 1),
    (@PNROutputItemId + 9, 'AquaTicketingCondition', 'true', @CreationTimestamp, @CreationUserIdentifier, 1)


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


	DELETE FROM PNROutputGroupPNROutputItem WHERE PNROutputItem  in  (select PNROutputItemId
from PNROutputItem
where CreationUserIdentifier in  ('Amadeus CA Migration - US11193', 'Amadeus CA Migration - US100128'))
	DELETE FROM PNROutputItem WHERE CreationUserIdentifier in  (select PNROutputItemId
from PNROutputItem
where CreationUserIdentifier in  ('Amadeus CA Migration - US11193', 'Amadeus CA Migration - US100128'))


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

       DECLARE @ErrorMessage NVARCHAR(4000);
       SELECT @ErrorMessage=ERROR_MESSAGE()
       RAISERROR(@ErrorMessage, 10, 1);

END CATCH




 



