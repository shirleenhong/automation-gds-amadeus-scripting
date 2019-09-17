USE Desktop_Test
GO

BEGIN TRAN
BEGIN TRY

	DECLARE @CreationTimestamp		DATETIME = GETUTCDATE()	
	DECLARE @CreationUserIdentifier NVARCHAR(170)
	
	DECLARE @PNROutputItemId AS INT
	DECLARE @PNROutputGroupID AS INT

	-----------------------
	-- ROLLBACK Scripts
	-----------------------
	SET @CreationUserIdentifier			= 'Amadeus CA Migration - US9402'
	DELETE FROM PNROutputGroupPNROutputItem WHERE CreationUserIdentifier = @CreationUserIdentifier
	DELETE FROM PNROutputItem WHERE CreationUserIdentifier = @CreationUserIdentifier
	DELETE FROM PNROutputPlaceHolder WHERE	CreationUserIdentifier = @CreationUserIdentifier
	DELETE FROM ConfigurationParameter WHERE CreationUserIdentifier = @CreationUserIdentifier

	----------------------------------
	-- Insert Scripts
	----------------------------------
	PRINT 'START Script'

		SET @CreationUserIdentifier			= 'Amadeus CA Migration - US9402'	
		SET @PNROutputItemId =	(SELECT MAX(PNROutputItemId)  FROM [PNROutputItem])
		SET @PNROutputGroupID =	(SELECT MAX(PNROutputGroupId)  FROM [PNROutputGroup])
		SET @PNROutputRemarkGroupId = (SELECT MAX(PNROutputRemarkGroupId)  FROM PNROutputRemarkGroup)

		-- Configs
		INSERT INTO Context (ContextId, ContextName, CreationTimestamp,CreationUserIdentifier, VersionNumber)
			Values(11, 'Amadeus Corp Scripting',  GETUTCDATE()	, 'Amadeus CA Migration - US9402', 1)
		INSERT INTO ConfigurationParameter(ConfigurationParameterName, ConfigurationParameterValue, ContextId, CreationTimestamp, CreationUserIdentifier, VersionNumber)
			VALUES ('MigrationOBTFee ', 'RBP, NRD, ABC', 11, GETUTCDATE()	, 'Amadeus CA Migration - US9402', 1)
		INSERT INTO ConfigurationParameter(ConfigurationParameterName, ConfigurationParameterValue, ContextId, CreationTimestamp, CreationUserIdentifier, VersionNumber)
			VALUES ('MigrationOBTFeeDate ', '01/30/2019,11/01/2019', 11, GETUTCDATE()	, 'Amadeus CA Migration - US9402', 1),
		INSERT INTO PNROutputGroupPNROutputItem (PNROutputGroupId, PNROutputItemId, SequenceNumber, CreationTimestamp, CreationUserIdentifier, VersionNumber, DataStandardizationVersion, LayoutVersion)
			VALUES (@PNROutputGroupID,  @PNROutputItemID + 1, 0, @CreationTimeStamp, @CreationUserIdentifier, 1, 1, 1)

		-- Remarks
		-- to do...

	PRINT 'END Script'


	COMMIT TRAN
END TRY
	
BEGIN CATCH
ROLLBACK TRAN

	DECLARE @ErrorMessage NVARCHAR(4000);
	SELECT @ErrorMessage=ERROR_MESSAGE()
	RAISERROR(@ErrorMessage, 10, 1);

END CATCH
