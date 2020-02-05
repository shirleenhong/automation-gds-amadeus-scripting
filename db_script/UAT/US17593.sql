Use Desktop_test
GO

BEGIN TRAN
BEGIN TRY

		DECLARE @ServicingOptionId		INT        
		DECLARE @ServicingOptionItemId	INT
		DECLARE @CreationUserIdentifier				NVARCHAR(170)		
		DECLARE @CreationTimestamp					DATETIME = GETUTCDATE()
		
		PRINT 'BEGIN UPDATE Amadeus Canada - US17593'
		SET @ServicingOptionId = 537
		SET @CreationUserIdentifier = 'Amadeus Canada - US17593'			
		SET @ServicingOptionItemID = (SELECT MAX(ServicingOptionItemID) + 1
FROM ServicingOptionItem)

		INSERT INTO ServicingOption
    (ServicingOptionId, ServicingOptionName, CreationTimeStamp, CreationUserIdentifier, VersionNumber, GdsRequiredFlag)
VALUES
    (@ServicingOptionID, 'Hotel - Show Missed Savings', @CreationTimestamp , @CreationUserIdentifier, 1, 0)

		---- Set No To Global
		INSERT INTO dbo.ServicingOptionItem
    (ServicingOptionItemID, ServicingOptionID, ServicingOptionGroupID, ServicingOptionItemValue, ServicingOptionItemInstruction, ServicingOptionItemSequence, CreationTimeStamp, CreationUserIdentifier, VersionNumber, DisplayInApplicationFlag)
VALUES
    (@ServicingOptionItemID, @ServicingOptionID, 1, 'No', 'Hotel - Show Missed Savings', 0, @CreationTimestamp , @CreationUserIdentifier, 1, 1)			

		INSERT INTO ServicingOptionItemValue
    (ServicingOptionId, ServicingOptionItemValue, CreationTimeStamp, CreationUserIdentifier)
VALUES
    (@ServicingOptionID, 'Yes'	, @CreationTimestamp , @CreationUserIdentifier),
    (@ServicingOptionID, 'No'	, @CreationTimestamp , @CreationUserIdentifier)			   

		INSERT INTO ServicingOptionContext
    (ServicingOptionId, ContextId, CreationTimeStamp, CreationUserIdentifier)
VALUES
    (@ServicingOptionID, 1		, @CreationTimestamp , @CreationUserIdentIfier)

		PRINT 'END UPDATE Amadeus Canada - US17593'

		
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

Go