USE [Desktop_Test]
GO

BEGIN TRAN
BEGIN TRY

DECLARE @CreationUserIdentifier		NVARCHAR(150) = 'Amadeus CA Migration - US13840'


DELETE FROM ConfigurationParameter where CreationUserIdentifier = @CreationUserIdentifier

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
	--DELETE FROM PNROutputPlaceHolder WHERE	CreationUserIdentifier = ('Amadeus CA Migration - US11193', 'Amadeus CA Migration - US100128')

	
-- DELETE FROM PNROutputItem 
--  where CreationUserIdentifier in  ('Amadeus CA Migration - US11193', 'Amadeus CA Migration - US100128')
--     and RemarkFormat like 'EB/%'

   --- UPDATE EB Remarks-------------


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

   -------------------------

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