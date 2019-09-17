USE Desktop_Test
GO

BEGIN TRAN
BEGIN TRY
	
	DECLARE @CreationUserIdentifier	VARCHAR(150)
    DECLARE @CreationTimeStamp		DATETIME = GETUTCDATE()

	DECLARE @PNROutputItemID AS INT 
	DECLARE @PNROutputGroupID AS INT

	SET @CreationUserIdentifier	='Amadeus CA Migration - US9964'
	SET @PNROutputItemId = (SELECT MAX(PNROutputItemID) FROM PNROutputItem)
	SET @PNROutputGroupID =(SELECT PNROutputGroupID from PNROutputGroup where PNROutputGroupName ='Canada Migration BackOffice Group')

	DELETE FROM PNROutputGroupPNROutputItem WHERE CreationUserIdentifier =@CreationUserIdentifier
	DELETE FROM PNROutputItem WHERE CreationUserIdentifier =@CreationUserIdentifier
	DELETE FROM PNROutputPlaceHolder WHERE CreationUserIdentifier =@CreationUserIdentifier

	INSERT INTO PNROutputPlaceHolder
           (PNROutputPlaceHolderName,   PNROutputPlaceHolderRegularExpresssion, PNROutputPlaceHolderExampleData, CreationTimestamp,  CreationUserIdentifier,  VersionNumber)
    VALUES ('%CAOverrideValue%', '([A-Z]{3})',NULL,@CreationTimestamp, @CreationUserIdentifier, 1)
	
	INSERT INTO PNROutputItem (PNROutputItemId, PNROutputRemarkTypeCode, PNROutputUpdateTypeCode, GDSRemarkQualifier, RemarkFormat, PNROutputBindingTypeCode, CreationTimestamp, CreationUserIdentifier, VersionNumber, PNROutputItemDefaultLanguageCode) 
	VALUES (@PNROutputItemID + 1, 3, 1, '', 'U86/-OVERRIDE %CAOverrideValue%', 0, @CreationTimeStamp, @CreationUserIdentifier, 1,'en-GB')		   

	INSERT INTO PNROutputGroupPNROutputItem (PNROutputGroupId, PNROutputItemId, SequenceNumber, CreationTimestamp, CreationUserIdentifier, VersionNumber, DataStandardizationVersion, LayoutVersion)
	VALUES (@PNROutputGroupID,  @PNROutputItemID + 1, 0, @CreationTimeStamp, @CreationUserIdentifier, 1, 1, 1)

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

