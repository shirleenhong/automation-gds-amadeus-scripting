

--MASTER1

--123456789101234567891012345678910123456789101234567891012345678910123456789101234567891012345678910
--								    Amadeus Prod Deployment
--123456789101234567891012345678910123456789101234567891012345678910123456789101234567891012345678910

USE [Desktop_SyEx_Pilot]
GO

BEGIN TRAN
BEGIN TRY

		DECLARE @CreationUserIdentifier		NVARCHAR(150)
		DECLARE @CreationTimestamp			DATETIME = GETUTCDATE()
		DECLARE @PNROutputItemId			INT
		DECLARE @PNROutputItemId1			INT
		DECLARE @PNROutputItemId2			INT
		DECLARE @PNROutputItemId3			INT
		DECLARE @PNROutputItemId4			INT
		DECLARE @PNROutputGroupId2			INT
		DECLARE @PNROutputGroupID			INT
		
		UPDATE pnroutputplaceholder 
		SET pnroutputplaceholdername = '%ConfNbr%'
		where pnroutputplaceholdername like '%ConfNbr%'
		and CreationUserIdentifier = 'Amadeus CA Migration - US10552'
		

		SET @PNROutputItemId1 =  (select PNROutputItemId from pnroutputitem where remarkformat='THE AIRLINE TICKET CHARGE ON THIS ITINERARY/INVOICE')
		SET @PNROutputItemId2 =  (select PNROutputItemId from pnroutputitem where remarkformat='IS FOR INTERNAL COST RE-ALLOCATION PURPOSES ONLY.')
		SET @PNROutputItemId3 =  (select PNROutputItemId from pnroutputitem where remarkformat='**PLEASE DO NOT EXPENSE** THIS CHARGE AS IT WILL NOT APPEAR')
		SET @PNROutputItemId4 =  (select PNROutputItemId from pnroutputitem where remarkformat='ON YOUR CREDIT CARD STATEMENT.')

		update pnroutputitem 
		SET PNROutputUpdateTypeCode = 2
		WHERE PNROutputitemId IN (@PNROutputItemId1, @PNROutputItemId2, @PNROutputItemId3, @PNROutputItemId4)


		SET @PNROutputItemId = (select PNROutputItemId from pnroutputitem where remarkformat='AIRLINE LOCATOR NUMBER - %ConfNbr%' AND CreationUserIdentifier = 'Amadeus CA Migration - US10552')
		update pnroutputitem 
		SET RemarkFormat = 'AIRLINE LOCATOR NUMBER - %confNbr%'
		WHERE PNROutputitemId = @PNROutputItemId
		

		SET @PNROutputItemId1 = (select PNROutputItemId from pnroutputitem where remarkformat='OFC-ISSUED NONBSP TKT FOR FLT OR FARE/QUEUED TO %OfcQueue%')
		SET @PNROutputItemId2 = (select PNROutputItemId from pnroutputitem where remarkformat='OSC-QUEUED TO Q %OscQueue% FOR NR/CANCELLED PNR')
		
		UPDATE PNROutputItemId 
		SET PNROutputremarkTypeCode = 3
		WHERE PNROutputitemId IN (@PNROutputItemId1, @PNROutputItemId2)

		SET @PNROutputItemId1 = (select PNROutputItemId from pnroutputitem where remarkformat= 'Queue Completed Rate to IRD YTOWL210N/%TravelQueue%')
		
		UPDATE PNROutputItemId 
		SET RemarkFormat = 'Queue Completed Rate to IRD YTOWL210N - %TravelQueue%'
		WHERE PNROutputitemId = @PNROutputItemId1

		UPDATE pnroutputplaceholder 
		SET pnroutputplaceholdername = '%CnNumber%',
		    PNROutputPlaceHolderRegularExpression = '(.*)'
		where pnroutputplaceholdername like '%%CNNumber%%'
		and CreationUserIdentifier = 'Amadeus CA Migration - US11134'

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