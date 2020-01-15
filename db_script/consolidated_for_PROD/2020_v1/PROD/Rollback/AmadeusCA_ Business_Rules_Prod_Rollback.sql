USE Desktop_Prod	
go



BEGIN TRAN
BEGIN TRY
       
		DECLARE @CreationUserIdentifier   VARCHAR(150)
		DECLARE @CreationTimeStamp           DATETIME = GETUTCDATE()
		DECLARE @CFA as varchar(5) = 'CKP'

		set @CreationUserIdentifier = 'Amadeus CA Migration  ' + @CFA +  ' - US15250'
		PRINT 'START ' + @CreationUserIdentifier 
		
		---- ROLLBACK
		DELETE FROM ClientDefinedRuleGroupResult where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleResultItem where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleGroupLogic where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleLogicItem where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleGroupTrigger where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleGroupClientSubUnit where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleGroup where CreationUserIdentifier= @CreationUserIdentifier

		------------------------------------------------------------------------------------------------------
		SET @CFA  = 'EHV'
		SET @CreationUserIdentifier = 'Amadeus CA Migration  ' + @CFA +  ' - US15250'
		
		PRINT 'START ' + @CreationUserIdentifier 
		---- ROLLBACK
		DELETE FROM ClientDefinedRuleGroupResult where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleResultItem where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleGroupLogic where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleLogicItem where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleGroupTrigger where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleGroupClientSubUnit where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleGroup where CreationUserIdentifier= @CreationUserIdentifier
		
		------------------------------------------------------------------------------------------------------
		SET @CFA  = 'EJ5'
		SET @CreationUserIdentifier = 'Amadeus CA Migration  ' + @CFA +  ' - US15250'
		
		PRINT 'START ' + @CreationUserIdentifier 

		DELETE FROM ClientDefinedRuleGroupResult where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleResultItem where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleGroupLogic where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleLogicItem where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleGroupTrigger where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleGroupClientSubUnit where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleGroup where CreationUserIdentifier= @CreationUserIdentifier


		------------------------------------------------------------------------------------------------------
		
		SET @CFA  = 'EJ5'
		set @CreationUserIdentifier = 'Amadeus CA Migration  ' + @CFA +  ' Rule 2' +  ' - US15251'
		
		PRINT 'START ' + @CreationUserIdentifier 

		DELETE FROM ClientDefinedRuleGroupResult where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleResultItem where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleGroupLogic where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleLogicItem where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleGroupTrigger where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleGroupClientSubUnit where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleGroup where CreationUserIdentifier= @CreationUserIdentifier


		------------------------------------------------------------------------------------------------------

		SET @CFA  = 'EQF'
		SET @CreationUserIdentifier = 'Amadeus CA Migration  ' + @CFA +  ' - US15250'
		
		PRINT 'START ' + @CreationUserIdentifier 

		DELETE FROM ClientDefinedRuleGroupResult where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleResultItem where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleGroupLogic where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleLogicItem where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleGroupTrigger where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleGroupClientSubUnit where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleGroup where CreationUserIdentifier= @CreationUserIdentifier


		------------------------------------------------------------------------------------------------------
		SET @CFA  = 'F2X'
		SET @CreationUserIdentifier = 'Amadeus CA Migration  ' + @CFA +  ' - US15250'
		
		PRINT 'START ' + @CreationUserIdentifier 

		DELETE FROM ClientDefinedRuleGroupResult where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleResultItem where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleGroupLogic where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleLogicItem where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleGroupTrigger where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleGroupClientSubUnit where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleGroup where CreationUserIdentifier= @CreationUserIdentifier

		------------------------------------------------------------------------------------------------------
		SET @CFA  = '1UP'
		SET @CreationUserIdentifier = 'Amadeus CA Migration  ' + @CFA +  ' - US15250'
		
		PRINT 'START ' + @CreationUserIdentifier 

		DELETE FROM ClientDefinedRuleGroupResult where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleResultItem where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleGroupLogic where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleLogicItem where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleGroupTrigger where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleGroupClientSubUnit where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleGroup where CreationUserIdentifier= @CreationUserIdentifier
		
		------------------------------------------------------------------------------------------------------
		SET @CFA  = '92Z'
		SET @CreationUserIdentifier = 'Amadeus CA Migration  ' + @CFA +  ' - US15250'
		
		PRINT 'START ' + @CreationUserIdentifier 

		DELETE FROM ClientDefinedRuleGroupResult where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleResultItem where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleGroupLogic where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleLogicItem where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleGroupTrigger where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleGroupClientSubUnit where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleGroup where CreationUserIdentifier= @CreationUserIdentifier

		------------------------------------------------------------------------------------------------------
		SET @CFA  = '95U'
		SET @CreationUserIdentifier = 'Amadeus CA Migration  ' + @CFA +  ' - US15250'
		
		PRINT 'START ' + @CreationUserIdentifier 

		DELETE FROM ClientDefinedRuleGroupResult where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleResultItem where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleGroupLogic where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleLogicItem where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleGroupTrigger where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleGroupClientSubUnit where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleGroup where CreationUserIdentifier= @CreationUserIdentifier

		------------------------------------------------------------------------------------------------------
		SET @CFA  = 'C9L'
		SET @CreationUserIdentifier = 'Amadeus CA Migration  ' + @CFA +  ' - US15250'
		
		PRINT 'START ' + @CreationUserIdentifier 

		DELETE FROM ClientDefinedRuleGroupResult where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleResultItem where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleGroupLogic where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleLogicItem where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleGroupTrigger where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleGroupClientSubUnit where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleGroup where CreationUserIdentifier= @CreationUserIdentifier
		
		------------------------------------------------------------------------------------------------------
		SET @CFA  = 'D7V'
		SET @CreationUserIdentifier = 'Amadeus CA Migration  ' + @CFA +  ' - US15250'
		
		PRINT 'START ' + @CreationUserIdentifier 

		DELETE FROM ClientDefinedRuleGroupResult where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleResultItem where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleGroupLogic where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleLogicItem where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleGroupTrigger where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleGroupClientSubUnit where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleGroup where CreationUserIdentifier= @CreationUserIdentifier

		------------------------------------------------------------------------------------------------------
		SET @CFA  = 'G2F'
		SET @CreationUserIdentifier = 'Amadeus CA Migration  ' + @CFA +  ' - US15250'
		
		PRINT 'START ' + @CreationUserIdentifier 

		DELETE FROM ClientDefinedRuleGroupResult where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleResultItem where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleGroupLogic where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleLogicItem where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleGroupTrigger where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleGroupClientSubUnit where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleGroup where CreationUserIdentifier= @CreationUserIdentifier

		------------------------------------------------------------------------------------------------------
		SET @CFA  = 'L8M'
		SET @CreationUserIdentifier = 'Amadeus CA Migration  ' + @CFA +  ' - US15250'
		
		PRINT 'START ' + @CreationUserIdentifier 

		DELETE FROM ClientDefinedRuleGroupResult where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleResultItem where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleGroupLogic where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleLogicItem where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleGroupTrigger where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleGroupClientSubUnit where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleGroup where CreationUserIdentifier= @CreationUserIdentifier
		
		------------------------------------------------------------------------------------------------------
		SET @CFA  = 'NZ7'
		SET @CreationUserIdentifier = 'Amadeus CA Migration  ' + @CFA +  ' - US15250'
		
		PRINT 'START ' + @CreationUserIdentifier 

		DELETE FROM ClientDefinedRuleGroupResult where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleResultItem where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleGroupLogic where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleLogicItem where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleGroupTrigger where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleGroupClientSubUnit where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleGroup where CreationUserIdentifier= @CreationUserIdentifier

		------------------------------------------------------------------------------------------------------
		SET @CFA  = 'SGE'
		SET @CreationUserIdentifier = 'Amadeus CA Migration  ' + @CFA +  ' - US15250'
		
		PRINT 'START ' + @CreationUserIdentifier 

		DELETE FROM ClientDefinedRuleGroupResult where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleResultItem where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleGroupLogic where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleLogicItem where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleGroupTrigger where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleGroupClientSubUnit where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleGroup where CreationUserIdentifier= @CreationUserIdentifier

		------------------------------------------------------------------------------------------------------
		SET @CFA  = 'BGD'
		SET @CreationUserIdentifier = 'Amadeus CA Migration  ' + @CFA +  ' - US15250'
		
		PRINT 'START ' + @CreationUserIdentifier 

		DELETE FROM ClientDefinedRuleGroupResult where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleResultItem where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleGroupLogic where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleLogicItem where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleGroupTrigger where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleGroupClientSubUnit where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleGroup where CreationUserIdentifier= @CreationUserIdentifier

		------------------------------------------------------------------------------------------------------
		SET @CFA  = 'GYD'
		SET @CreationUserIdentifier = 'Amadeus CA Migration  ' + @CFA +  ' - US15250'
		
		PRINT 'START ' + @CreationUserIdentifier 

		DELETE FROM ClientDefinedRuleGroupResult where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleResultItem where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleGroupLogic where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleLogicItem where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleGroupTrigger where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleGroupClientSubUnit where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleGroup where CreationUserIdentifier= @CreationUserIdentifier

		------------------------------------------------------------------------------------------------------
		SET @CFA  = 'YVN'
		SET @CreationUserIdentifier = 'Amadeus CA Migration  ' + @CFA +  ' - US15250'
		
		PRINT 'START ' + @CreationUserIdentifier 

		DELETE FROM ClientDefinedRuleGroupResult where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleResultItem where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleGroupLogic where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleLogicItem where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleGroupTrigger where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleGroupClientSubUnit where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleGroup where CreationUserIdentifier= @CreationUserIdentifier

		------------------------------------------------------------------------------------------------------
		SET @CFA  = 'W8J'
		SET @CreationUserIdentifier = 'Amadeus CA Migration  ' + @CFA +  ' - US15250'
		
		PRINT 'START ' + @CreationUserIdentifier 

		DELETE FROM ClientDefinedRuleGroupResult where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleResultItem where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleGroupLogic where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleLogicItem where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleGroupTrigger where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleGroupClientSubUnit where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleGroup where CreationUserIdentifier= @CreationUserIdentifier

		------------------------------------------------------------------------------------------------------
		SET @CFA  = 'K1B'
		SET @CreationUserIdentifier = 'Amadeus CA Migration  ' + @CFA +  ' - US15250'
		
		PRINT 'START ' + @CreationUserIdentifier 

		DELETE FROM ClientDefinedRuleGroupResult where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleResultItem where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleGroupLogic where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleLogicItem where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleGroupTrigger where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleGroupClientSubUnit where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleGroup where CreationUserIdentifier= @CreationUserIdentifier

		------------------------------------------------------------------------------------------------------
		SET @CFA  = 'X7B'
		SET @CreationUserIdentifier = 'Amadeus CA Migration  ' + @CFA +  ' - US15250'
		
		PRINT 'START ' + @CreationUserIdentifier 

		DELETE FROM ClientDefinedRuleGroupResult where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleResultItem where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleGroupLogic where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleLogicItem where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleGroupTrigger where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleGroupClientSubUnit where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleGroup where CreationUserIdentifier= @CreationUserIdentifier

		------------------------------------------------------------------------------------------------------
		SET @CFA  = 'G4U'
		SET @CreationUserIdentifier = 'Amadeus CA Migration  ' + @CFA +  ' - US15250'
		
		PRINT 'START ' + @CreationUserIdentifier 

		DELETE FROM ClientDefinedRuleGroupResult where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleResultItem where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleGroupLogic where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleLogicItem where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleGroupTrigger where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleGroupClientSubUnit where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleGroup where CreationUserIdentifier= @CreationUserIdentifier

		------------------------------------------------------------------------------------------------------
		SET @CFA  = 'ZVO'
		SET @CreationUserIdentifier = 'Amadeus CA Migration  ' + @CFA +  ' - US15250'
		
		PRINT 'START ' + @CreationUserIdentifier 

		DELETE FROM ClientDefinedRuleGroupResult where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleResultItem where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleGroupLogic where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleLogicItem where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleGroupTrigger where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleGroupClientSubUnit where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleGroup where CreationUserIdentifier= @CreationUserIdentifier

		------------------------------------------------------------------------------------------------------
		SET @CFA  = 'T2G'
		SET @CreationUserIdentifier = 'Amadeus CA Migration  ' + @CFA +  ' - US15250'
		
		PRINT 'START ' + @CreationUserIdentifier 

		DELETE FROM ClientDefinedRuleGroupResult where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleResultItem where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleGroupLogic where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleLogicItem where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleGroupTrigger where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleGroupClientSubUnit where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleGroup where CreationUserIdentifier= @CreationUserIdentifier

		------------------------------------------------------------------------------------------------------
		SET @CFA  = 'XF2'
		SET @CreationUserIdentifier = 'Amadeus CA Migration  ' + @CFA +  ' - US15250'
		
		PRINT 'START ' + @CreationUserIdentifier 

		DELETE FROM ClientDefinedRuleGroupResult where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleResultItem where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleGroupLogic where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleLogicItem where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleGroupTrigger where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleGroupClientSubUnit where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleGroup where CreationUserIdentifier= @CreationUserIdentifier


		------------------------------------------------------------------------------------------------------
		SET @CFA  = 'RH6'
		SET @CreationUserIdentifier = 'Amadeus CA Migration  ' + @CFA +  ' - US15250'
		
		PRINT 'START ' + @CreationUserIdentifier 

		DELETE FROM ClientDefinedRuleGroupResult where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleResultItem where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleGroupLogic where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleLogicItem where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleGroupTrigger where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleGroupClientSubUnit where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleGroup where CreationUserIdentifier= @CreationUserIdentifier


		------------------------------------------------------------------------------------------------------
		SET @CFA  = 'ZLN'
		SET @CreationUserIdentifier = 'Amadeus CA Migration  ' + @CFA +  ' - US15250'
		
		PRINT 'START ' + @CreationUserIdentifier 

		DELETE FROM ClientDefinedRuleGroupResult where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleResultItem where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleGroupLogic where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleLogicItem where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleGroupTrigger where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleGroupClientSubUnit where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleGroup where CreationUserIdentifier= @CreationUserIdentifier


		------------------------------------------------------------------------------------------------------
		SET @CFA  = 'NXX'
		SET @CreationUserIdentifier = 'Amadeus CA Migration  ' + @CFA +  ' - US15250'
		
		PRINT 'START ' + @CreationUserIdentifier 

		DELETE FROM ClientDefinedRuleGroupResult where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleResultItem where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleGroupLogic where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleLogicItem where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleGroupTrigger where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleGroupClientSubUnit where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleGroup where CreationUserIdentifier= @CreationUserIdentifier


		------------------------------------------------------------------------------------------------------
		SET @CFA  = 'R6S'
		SET @CreationUserIdentifier = 'Amadeus CA Migration  ' + @CFA +  ' - US15250'
		
		PRINT 'START ' + @CreationUserIdentifier 

		DELETE FROM ClientDefinedRuleGroupResult where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleResultItem where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleGroupLogic where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleLogicItem where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleGroupTrigger where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleGroupClientSubUnit where CreationUserIdentifier= @CreationUserIdentifier
		DELETE FROM ClientDefinedRuleGroup where CreationUserIdentifier= @CreationUserIdentifier
		

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