USE [Desktop_Test]
GO

BEGIN TRAN
BEGIN TRY

		DECLARE @CreationUserIdentifier		NVARCHAR(150)
		DECLARE @CreationTimestamp			DATETIME = GETUTCDATE()
		DECLARE @ContextID					INT

		SET @ContextID = (SELECT CONTEXTID
FROM CONTEXT
WHERE CONTEXTNAME ='Amadeus Corp Scripting')

		 SET @CreationUserIdentifier = 'Amadeus CA Migration - US12959' 

		INSERT INTO ConfigurationParameter
    (ConfigurationParameterName, ConfigurationParameterValue, ContextId, CreationTimestamp, CreationUserIdentifier, VersionNumber)
VALUES
    ('UsersToStandAloneAmadeusQueues', 'U012MXP', @ContextID, @CreationTimestamp , @CreationUserIdentifier, 1)


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