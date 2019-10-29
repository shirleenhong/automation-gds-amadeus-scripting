USE Desktop_Test
GO

BEGIN TRAN
BEGIN TRY
	
	DECLARE @CreationUserIdentifier	VARCHAR(150)
    DECLARE @CreationTimeStamp		DATETIME = GETUTCDATE()

	DECLARE @PNROutputItemID AS INT 
	DECLARE @PNROutputGroupID AS INT
	DECLARE @GeneralPNROutputGroupID INT

	SET @CreationUserIdentifier	='Amadeus CA Migration - US10574'
	SET @PNROutputItemId = (SELECT MAX(PNROutputItemID)
FROM PNROutputItem)
	SET @PNROutputGroupID =(SELECT PNROutputGroupID
from PNROutputGroup
where PNROutputGroupName ='Canada Migration Itinerary Group')
	
	DELETE FROM PNROutputCondition WHERE CreationUserIdentifier =@CreationUserIdentifier
	DELETE FROM PNROutputGroupPNROutputItem WHERE CreationUserIdentifier =@CreationUserIdentifier	
	DELETE FROM PNROutputItemLanguage WHERE CreationUserIdentifier =@CreationUserIdentifier	
	DELETE FROM PNROutputItem WHERE CreationUserIdentifier =@CreationUserIdentifier	



	INSERT INTO [dbo].[PNROutputItem]
	([PNROutputItemId],[PNROutputRemarkTypeCode],[PNROutputBindingTypeCode], [PNROutputUpdateTypeCode],[GDSRemarkQualifier],[RemarkFormat],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber],[PNROutputItemDefaultLanguageCode],[PNROutputItemXMLFormat])
VALUES
	(@PNROutputItemID + 1, 3, 'S', 1, '', 'U14/-%AirlineCode%PASS-%PassNumber%-%PassName%.%FareType%', @CreationTimestamp, @CreationUserIdentifier, 1, 'en-GB', NULL),
	(@PNROutputItemID + 2, 1, 'S', 1, '', 'ALL OTHER CHARGES INDICATED WILL APPEAR', @CreationTimestamp, @CreationUserIdentifier, 1, 'en-GB', NULL),
	(@PNROutputItemID + 3, 1, 'S', 1, '', 'ON YOUR CREDIT CARD AND SHOULD BE', @CreationTimestamp, @CreationUserIdentifier, 1, 'en-GB', NULL),
	(@PNROutputItemID + 4, 1, 'S', 1, '', 'EXPENSED ACCORDINGLY.', @CreationTimestamp, @CreationUserIdentifier, 1, 'en-GB', NULL)

	INSERT INTO [dbo].[PNROutputItemLanguage]
	([PNROutputItemId],[LanguageCode],[RemarkFormatTranslation],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber])
VALUES
	(@PNROutputItemID + 2, 'fr-CA', 'TOUS LES AUTRES COUTS INDIQUES PARAITRONT SUR VOTRE', @CreationTimestamp, @CreationUserIdentifier, 1),
	(@PNROutputItemID + 3, 'fr-CA', 'RELEVE DE CARTE DE CREDIT ET DOIVONT', @CreationTimestamp, @CreationUserIdentifier, 1),
	(@PNROutputItemID + 4, 'fr-CA', 'ETRE INSCRITS EN CONSQUENCE.', @CreationTimestamp, @CreationUserIdentifier, 1)
											
	declare @PNROutputItemId1 AS INT=  (select PNROutputItemId
from pnroutputitem
where remarkformat='THE AIRLINE TICKET CHARGE ON THIS ITINERARY/INVOICE')
	declare @PNROutputItemId2 AS INT=  (select PNROutputItemId
from pnroutputitem
where remarkformat='IS FOR INTERNAL COST RE-ALLOCATION PURPOSES ONLY.')
	declare @PNROutputItemId3 AS INT=  (select PNROutputItemId
from pnroutputitem
where remarkformat='**PLEASE DO NOT EXPENSE** THIS CHARGE AS IT WILL NOT APPEAR')
	declare @PNROutputItemId4 AS INT=  (select PNROutputItemId
from pnroutputitem
where remarkformat='ON YOUR CREDIT CARD STATEMENT.')
	

	INSERT INTO PNROutputGroupPNROutputItem
	(PNROutputGroupId, PNROutputItemId, SequenceNumber, CreationTimestamp, CreationUserIdentifier, VersionNumber, DataStandardizationVersion, LayoutVersion)
VALUES
	(@PNROutputGroupID, @PNROutputItemID + 1, 5, @CreationTimeStamp, @CreationUserIdentifier, 1, 1, 1),
	(@PNROutputGroupID, @PNROutputItemID + 2, 6, @CreationTimeStamp, @CreationUserIdentifier, 1, 1, 1),
	(@PNROutputGroupID, @PNROutputItemID + 3, 7, @CreationTimeStamp, @CreationUserIdentifier, 1, 1, 1),
	(@PNROutputGroupID, @PNROutputItemID + 4, 8, @CreationTimeStamp, @CreationUserIdentifier, 1, 1, 1)
											--(@PNROutputGroupID,  @PNROutputItemId1, 0, @CreationTimeStamp, @CreationUserIdentifier, 1, 1, 1),
											--(@PNROutputGroupID,  @PNROutputItemId2, 0, @CreationTimeStamp, @CreationUserIdentifier, 1, 1, 1),											
											--(@PNROutputGroupID,  @PNROutputItemId3, 0, @CreationTimeStamp, @CreationUserIdentifier, 1, 1, 1),
											--(@PNROutputGroupID,  @PNROutputItemId4, 0, @CreationTimeStamp, @CreationUserIdentifier, 1, 1, 1)


	INSERT INTO [dbo].[PNROutputCondition]
	([PNROutputItemId],[PNROutputConditionName],[PNROutputConditionValue],[CreationTimestamp],[CreationUserIdentifier],[LastUpdateTimestamp],[LastUpdateUserIdentifier],[VersionNumber])
VALUES
	(@PNROutputItemId1, 'AirlineCorporatePass', 'true', @CreationTimeStamp, @CreationUserIdentifier, null, null, 1),
	(@PNROutputItemId2, 'AirlineCorporatePass', 'true', @CreationTimeStamp, @CreationUserIdentifier, null, null, 1),
	(@PNROutputItemId3, 'AirlineCorporatePass', 'true', @CreationTimeStamp, @CreationUserIdentifier, null, null, 1),
	(@PNROutputItemId4, 'AirlineCorporatePass', 'true', @CreationTimeStamp, @CreationUserIdentifier, null, null, 1),
	(@PNROutputItemID + 2, 'AirlineCorporatePass', 'true', @CreationTimeStamp, @CreationUserIdentifier, null, null, 1),
	(@PNROutputItemID + 3, 'AirlineCorporatePass', 'true', @CreationTimeStamp, @CreationUserIdentifier, null, null, 1),
	(@PNROutputItemID + 4, 'AirlineCorporatePass', 'true', @CreationTimeStamp, @CreationUserIdentifier, null, null, 1)

											

	--rollback tran
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
GO

