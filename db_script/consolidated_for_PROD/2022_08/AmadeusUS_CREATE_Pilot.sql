
USE [Desktop_SyEx_Pilot]
GO

BEGIN TRAN
BEGIN TRY

		DECLARE @CreationUserIdentifier		NVARCHAR(150)
		DECLARE @CreationTimestamp			DATETIME = GETUTCDATE()
		DECLARE @PNROutputId			    INT
		DECLARE @PNROutputItemId			INT
        DECLARE @GroupName                  NVARCHAR(150)
        DECLARE @GroupId                    INT
		
		SET @CreationUserIdentifier = 'AGSC - PEAGSCPAEL-819'
        SET @GroupName = 'Canada Migration BackOffice Group'

        SET @PNROutputItemId = (SELECT TOP 1 PNROutputItemId FROM PNROutputItem WHERE RemarkFormat = 'Queue Completed Rate to IRD %TravelQueue%')

		UPDATE PNROutputItem
		SET RemarkFormat = 'Queue Completed Rate to IRD YTOWL210N/%TravelQueue%'
		WHERE PNROutputitemId = @PNROutputItemId

        SET @PNROutputItemId = (SELECT TOP 1 PNROutputItemId FROM PNROutputItem WHERE RemarkFormat = 'Queue Completed Rate to IRD %IRDOfficeID%/%TravelQueue%')

		UPDATE PNROutputItem
		SET RemarkFormat = 'Queue Completed Rate to IRD YTOWL210N/%TravelQueue%'
		WHERE PNROutputitemId = @PNROutputItemId

        DELETE FROM PNROutputGroupPNROutputItem WHERE CreationUserIdentifier = @CreationUserIdentifier
        DELETE FROM PNROutputItem WHERE CreationUserIdentifier = @CreationUserIdentifier
        DELETE FROM PNROutputPlaceHolder WHERE CreationUserIdentifier = @CreationUserIdentifier

        -- ================= END ROLLBACK ==============

        SET @PNROutputItemId = (SELECT TOP 1 PNROutputItemId FROM PNROutputItem WHERE RemarkFormat = 'Queue Completed Rate to IRD YTOWL210N/%TravelQueue%')

		UPDATE PNROutputItem
		SET RemarkFormat = 'Queue Completed Rate to IRD %TravelQueue%'
		WHERE PNROutputitemId = @PNROutputItemId

        INSERT INTO PNROutputPlaceHolder (PNROutputPlaceHolderName, PNROutputPlaceHolderRegularExpresssion, CreationTimestamp, CreationUserIdentifier, VersionNumber)
        VALUES ('%IRDTotalFare%', '([0-9].*)', @CreationTimestamp, @CreationUserIdentifier, 1)

      --   INSERT INTO PNROutputPlaceHolder (PNROutputPlaceHolderName, PNROutputPlaceHolderRegularExpresssion, CreationTimestamp, CreationUserIdentifier, VersionNumber)
      --   VALUES ('%IRDOfficeID%', '(.*)', @CreationTimestamp, @CreationUserIdentifier, 1)

        SET @PNROutputId = (SELECT MAX(PNROutputItemId) FROM PNROutputItem)

        INSERT INTO PNROutputItem (PNROutputItemId, PNROutputRemarkTypeCode, PNROutputUpdateTypeCode, GDSRemarkQualifier, RemarkFormat, PNROutputBindingTypeCode, CreationTimestamp, CreationUserIdentifier, VersionNumber, PNROutputItemDefaultLanguageCode, ContextID)
        VALUES (@PNROutputId + 1, 0, 1, 'F', 'AGENT PNR TOTAL FARE-%IRDTotalFare%', '0', @CreationTimestamp, @CreationUserIdentifier, 1, 'en-GB', 1)

        SET @GroupId = (SELECT TOP 1 PNROutputGroupId FROM PNROutputGroup WHERE PNROutputGroupName = @GroupName)

        INSERT INTO PNROutputGroupPNROutputItem ([PNROutputGroupId], [PNROutputItemId], [SequenceNumber], [CreationTimestamp], [CreationUserIdentifier], [VersionNumber], [DataStandardizationVersion], [LayoutVersion])
        VALUES (@GroupId, @PNROutputId + 1, 0, @CreationTimestamp, @CreationUserIdentifier, 1, 1, 1)

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