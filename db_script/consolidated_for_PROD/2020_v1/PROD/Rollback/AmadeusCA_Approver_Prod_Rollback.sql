
USE Desktop_Prod	
--Use Desktop_Test
GO

BEGIN TRAN
	BEGIN TRY
	
		---------------------------------------
        -- BEGIN US13271
        ---------------------------------------
		DECLARE @CreationUserIdentifier AS varchar(255)
        DECLARE @CreationTimestamp	AS DATETIME =GETUTCDATE()	
		
        
		SET @CreationUserIdentifier     ='Amadeus CA Migration - US13271'
        DELETE FROM ApprovalGroupClientAccount WHERE CreationUserIdentifier =  @CreationUserIdentifier  
		DELETE FROM ApprovalGroupApprovalTypeItem WHERE CreationUserIdentifier =  @CreationUserIdentifier  
		DELETE FROM ApprovalGroupApprovalType WHERE CreationUserIdentifier =  @CreationUserIdentifier  
		DELETE FROM ApprovalGroup WHERE CreationUserIdentifier =  @CreationUserIdentifier   
		
		---------------------------------------
        -- END US13271
        ---------------------------------------
		COMMIT TRAN

	END TRY
	
BEGIN CATCH

	ROLLBACK TRAN

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







--		---------------------------------------
--        -- END US13271
--        ---------------------------------------
--		COMMIT TRAN

--	END TRY
	
--BEGIN CATCH

--	ROLLBACK TRAN

--	DECLARE @ErrorMessage NVARCHAR(4000);
--	SELECT @ErrorMessage=ERROR_MESSAGE()
--	RAISERROR(@ErrorMessage, 10, 1);

--END CATCH




