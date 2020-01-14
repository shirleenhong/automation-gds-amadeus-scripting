

--ROLLBACK

--123456789101234567891012345678910123456789101234567891012345678910123456789101234567891012345678910
--								    Amadeus Prod Deployment
--123456789101234567891012345678910123456789101234567891012345678910123456789101234567891012345678910

USE Desktop_Prod	
--USE Desktop_Test
GO

BEGIN TRAN
BEGIN TRY

		DECLARE @CreationUserIdentifier		NVARCHAR(150)
		DECLARE @CreationTimestamp			DATETIME = GETUTCDATE()
		
		PRINT 'Start Rollback Update Amadeus CA Migration - US11219'
		SET @CreationUserIdentifier              = 'Amadeus CA Migration - US11219'
		DELETE FROM PnrOutputCondition WHERE CreationUserIdentifier = @CreationUserIdentifier
        DELETE FROM PNROutputGroupPNROutputItem WHERE CreationUserIdentifier = @CreationUserIdentifier
        DELETE FROM PNROutputGroup WHERE CreationUserIdentifier = @CreationUserIdentifier
        DELETE FROM PNROutputGroupCountry WHERE CreationUserIdentifier = @CreationUserIdentifier
        DELETE FROM PNROutputItemLanguage WHERE CreationUserIdentifier = @CreationUserIdentifier
        DELETE FROM PNROutputItem WHERE CreationUserIdentifier = @CreationUserIdentifier
        DELETE FROM PNROutputPlaceHolder WHERE   CreationUserIdentifier = @CreationUserIdentifier
		PRINT 'End  Rollback Update Amadeus CA Migration - US11219'
		
		PRINT 'Start  Rollback Update Amadeus CA Migration - US16315'
		SET @CreationUserIdentifier              = 'Amadeus CA Migration - US16315'
		DELETE FROM [PNROutputGroupPNROutputItem] WHERE   CreationUserIdentifier = @CreationUserIdentifier
		DELETE FROM [PNROutputItem] WHERE   CreationUserIdentifier = @CreationUserIdentifier
		DELETE FROM [PNROutputPlaceHolder] WHERE   CreationUserIdentifier = @CreationUserIdentifier
		PRINT 'End  Rollback Update Amadeus CA Migration - US16315'

		PRINT 'Start  Rollback Update Amadeus CA Migration - US15949'
		SET @CreationUserIdentifier              = 'Amadeus CA Migration - US15949'
		DELETE FROM [ClientDefinedRuleBusinessEntity]   WHERE CreationUserIdentifier =@CreationUserIdentifier
		PRINT 'End  Rollback Update Amadeus CA Migration - US15949'

		PRINT 'Start  Rollback Update Amadeus CA Migration - US15949'
		SET @CreationUserIdentifier              = 'Amadeus CA Migration - US15949'
		DELETE FROM [ClientDefinedRuleWorkflowTriggerApplicationMode]   WHERE CreationUserIdentifier =@CreationUserIdentifier
		DELETE FROM [ClientDefinedRuleWorkflowTriggerState]				WHERE CreationUserIdentifier =@CreationUserIdentifier
		PRINT 'End  Rollback Update Amadeus CA Migration - US15949'

		PRINT 'Start  Rollback Update Amadeus CA Migration - US15703'
		SET @CreationUserIdentifier			= 'Amadeus CA Migration - US15703'
		DELETE FROM PNROutputGroupPNROutputItem WHERE CreationUserIdentifier = @CreationUserIdentifier
		DELETE FROM PNROutputItem WHERE CreationUserIdentifier = @CreationUserIdentifier
		DELETE FROM PNROutputPlaceHolder WHERE	CreationUserIdentifier = @CreationUserIdentifier
		PRINT 'End  Rollback Update Amadeus CA Migration - US15703'

		PRINT 'Start  Rollback Update Amadeus CA Migration - US14343'
		SET @CreationUserIdentifier			= 'Amadeus CA Migration - US14343'
		DELETE FROM PNROutputGroupPNROutputItem WHERE CreationUserIdentifier = @CreationUserIdentifier
		DELETE FROM PNROutputItem WHERE CreationUserIdentifier = @CreationUserIdentifier
		DELETE FROM PNROutputPlaceHolder WHERE	CreationUserIdentifier = @CreationUserIdentifier
		PRINT 'End  Rollback Update Amadeus CA Migration - US14343'

		PRINT 'Start  Rollback Update Amadeus CA Migration - US11196'
		SET @CreationUserIdentifier      = 'Amadeus CA Migration - US11196'
		DELETE FROM [ReasonCodeGroupClientSubUnit]                      WHERE CreationUserIdentifier=@CreationUserIdentifier
        DELETE FROM ReasonCodeGroupCountry                      WHERE CreationUserIdentifier=@CreationUserIdentifier
        DELETE FROM ReasonCodeProductTypeTravelerDescription    WHERE CreationUserIdentifier=@CreationUserIdentifier
        DELETE FROM ReasonCodeProductTypeDescription            WHERE CreationUserIdentifier=@CreationUserIdentifier
        DELETE FROM ReasonCodeAlternativeDescription            WHERE CreationUserIdentifier=@CreationUserIdentifier
        DELETE FROM ReasonCodeItem                              WHERE CreationUserIdentifier=@CreationUserIdentifier
        DELETE FROM ReasonCodeGroup                             WHERE CreationUserIdentifier=@CreationUserIdentifier
        DELETE FROM ReasonCodeProductType                       WHERE CreationUserIdentifier=@CreationUserIdentifier
		DELETE FROM ReasonCodeType                   WHERE CreationUserIdentifier=@CreationUserIdentifier
		PRINT 'End  Rollback Update Amadeus CA Migration - US11196'
		
		PRINT 'Start  Rollback Update Amadeus CA Migration - US10986'
		SET @CreationUserIdentifier	='Amadeus CA Migration - US10986'
		DELETE FROM PNROutputCondition WHERE CreationUserIdentifier =@CreationUserIdentifier
		DELETE FROM PNROutputGroupPNROutputItem WHERE CreationUserIdentifier =@CreationUserIdentifier		
		DELETE FROM PNROutputItem WHERE CreationUserIdentifier =@CreationUserIdentifier	
		DELETE FROM PNROutputPlaceHolder WHERE CreationUserIdentifier =@CreationUserIdentifier	
		PRINT 'End  Rollback Update Amadeus CA Migration - US10986'

		PRINT 'Start  Rollback Update Amadeus CA Migration - US12476'
		SET @CreationUserIdentifier			= 'Amadeus CA Migration - US12476'
		DELETE FROM PNROutputGroupPNROutputItem WHERE CreationUserIdentifier = @CreationUserIdentifier
		DELETE FROM PNROutputItem WHERE CreationUserIdentifier = @CreationUserIdentifier
		DELETE FROM PNROutputPlaceHolder WHERE	CreationUserIdentifier = @CreationUserIdentifier
		PRINT 'End  Rollback Update Amadeus CA Migration - US12476'

		PRINT 'Strart  Rollback Update Amadeus CA Migration - US11193'
		SET @CreationUserIdentifier	='Amadeus CA Migration - US11193'
		DELETE FROM PNROutputGroupPNROutputItem WHERE CreationUserIdentifier =@CreationUserIdentifier	
		DELETE FROM PNROutputItemLanguage WHERE CreationUserIdentifier =@CreationUserIdentifier	
		DELETE FROM PNROutputItem WHERE CreationUserIdentifier =@CreationUserIdentifier	
		DELETE FROM PNROutputPlaceHolder WHERE	CreationUserIdentifier = @CreationUserIdentifier
		PRINT 'End  Rollback Update Amadeus CA Migration - US11193'

		PRINT 'Start  Rollback Update Amadeus CA Migration - US11191'
		SET @CreationUserIdentifier	='Amadeus CA Migration - US11191'
		DELETE FROM PNROutputGroupPNROutputItem WHERE CreationUserIdentifier =@CreationUserIdentifier	
		DELETE FROM PNROutputItemLanguage WHERE CreationUserIdentifier =@CreationUserIdentifier	
		DELETE FROM PNROutputItem WHERE CreationUserIdentifier =@CreationUserIdentifier	
		DELETE FROM PNROutputPlaceHolder WHERE	CreationUserIdentifier = @CreationUserIdentifier
		PRINT 'End  Rollback Update Amadeus CA Migration - US11193'

		PRINT 'End  Rollback Update Amadeus CA Migration - US11189'
		SET @CreationUserIdentifier		   =   'Amadeus CA Migration - US11189'
		DELETE FROM PNROutputGroupPNROutputItem WHERE CreationUserIdentifier = @CreationUserIdentifier
		DELETE FROM PNROutputCondition WHERE CreationUserIdentifier = @CreationUserIdentifier
		DELETE FROM PNROutputItem WHERE CreationUserIdentifier = @CreationUserIdentifier
		DELETE FROM PNROutputPlaceHolder WHERE	CreationUserIdentifier = @CreationUserIdentifier
		PRINT 'End  Rollback Update Amadeus CA Migration - US11189'

		PRINT 'End  Rollback Update Amadeus CA Migration - US10041'
		SET @CreationUserIdentifier			= 'Amadeus CA Migration - US10041'
		DELETE FROM PNROutputGroupPNROutputItem WHERE CreationUserIdentifier = @CreationUserIdentifier
		DELETE FROM PnrOutputCondition WHERE CreationUserIdentifier = @CreationUserIdentifier
		DELETE FROM PNROutputItem WHERE CreationUserIdentifier = @CreationUserIdentifier
		DELETE FROM PNROutputPlaceHolder WHERE	CreationUserIdentifier = @CreationUserIdentifier
		PRINT 'End  Rollback Update Amadeus CA Migration - US10041'


		PRINT 'End  Rollback Update Amadeus CA Migration - US10870'
		SET @CreationUserIdentifier			= 'Amadeus CA Migration - US10870'
		DELETE FROM PNROutputGroupPNROutputItem WHERE CreationUserIdentifier = @CreationUserIdentifier
		DELETE FROM [PNROutputItemLanguage] WHERE CreationUserIdentifier = @CreationUserIdentifier
		DELETE FROM [PNROutputItem] WHERE CreationUserIdentifier = @CreationUserIdentifier
		DELETE FROM [PNROutputPlaceHolder] WHERE	CreationUserIdentifier = @CreationUserIdentifier
		PRINT 'End  Rollback Update Amadeus CA Migration - US10870'


		PRINT 'End  Rollback Update Amadeus CA Migration - US10574'
		SET @CreationUserIdentifier			= 'Amadeus CA Migration - US10574'
		DELETE FROM [PNROutputCondition] WHERE CreationUserIdentifier = @CreationUserIdentifier
		DELETE FROM PNROutputGroupPNROutputItem WHERE CreationUserIdentifier = @CreationUserIdentifier
		DELETE FROM [PNROutputItemLanguage] WHERE CreationUserIdentifier = @CreationUserIdentifier
		DELETE FROM [PNROutputItem] WHERE	CreationUserIdentifier = @CreationUserIdentifier
		PRINT 'End  Rollback Update Amadeus CA Migration - US10574'

		PRINT 'End  Rollback Update Amadeus CA Migration - US9883'
		SET @CreationUserIdentifier			= 'Amadeus CA Migration - US9883'
		DELETE FROM [PNROutputGroupPNROutputItem] WHERE CreationUserIdentifier = @CreationUserIdentifier
		DELETE FROM [PNROutputItem] WHERE CreationUserIdentifier = @CreationUserIdentifier
		DELETE FROM [PNROutputPlaceHolder] WHERE CreationUserIdentifier = @CreationUserIdentifier
		PRINT 'End  Rollback Update Amadeus CA Migration - US9883'


		PRINT 'End  Rollback Update Amadeus CA Migration - US9882'
		SET @CreationUserIdentifier			= 'Amadeus CA Migration - US9882'
		DELETE FROM [PNROutputGroupPNROutputItem] WHERE CreationUserIdentifier = @CreationUserIdentifier
		DELETE FROM [PnrOutputCondition] WHERE CreationUserIdentifier = @CreationUserIdentifier
		DELETE FROM [PNROutputitemLanguage] WHERE CreationUserIdentifier = @CreationUserIdentifier
		DELETE FROM [PNROutputItem] WHERE CreationUserIdentifier = @CreationUserIdentifier
		DELETE FROM [PNROutputPlaceHolder] WHERE CreationUserIdentifier = @CreationUserIdentifier
		PRINT 'End  Rollback Update Amadeus CA Migration - US9882'

		PRINT 'End  Rollback Update Amadeus CA Migration - US9881'
		SET @CreationUserIdentifier			= 'Amadeus CA Migration - US9881'
		DELETE FROM [PNROutputGroupPNROutputItem] WHERE CreationUserIdentifier = @CreationUserIdentifier
		DELETE FROM [PNROutputItem] WHERE CreationUserIdentifier = @CreationUserIdentifier
		DELETE FROM [PNROutputPlaceHolder] WHERE CreationUserIdentifier = @CreationUserIdentifier
		PRINT 'End  Rollback Update Amadeus CA Migration - US9881'

		PRINT 'End  Rollback Update Amadeus CA Migration - US11920'
		SET @CreationUserIdentifier			= 'Amadeus CA Migration - US11920'
		DELETE FROM [PNROutputGroupPNROutputItem] WHERE CreationUserIdentifier = @CreationUserIdentifier
		DELETE FROM [PNROutputCondition] WHERE CreationUserIdentifier = @CreationUserIdentifier
		DELETE FROM PNROutputItem WHERE CreationUserIdentifier = @CreationUserIdentifier
		PRINT 'End  Rollback Update Amadeus CA Migration - US11920'

		PRINT 'End  Rollback Update Amadeus CA Migration - US10580'
		SET @CreationUserIdentifier			= 'Amadeus CA Migration - US10580'
		DELETE FROM [PNROutputGroupPNROutputItem] WHERE CreationUserIdentifier = @CreationUserIdentifier
		DELETE FROM [PNROutputItem] WHERE CreationUserIdentifier = @CreationUserIdentifier
		DELETE FROM [PNROutputPlaceHolder] WHERE CreationUserIdentifier = @CreationUserIdentifier
		PRINT 'End  Rollback Update Amadeus CA Migration - US10580'


		PRINT 'End  Rollback Update Amadeus CA Migration - US9762'
		SET @CreationUserIdentifier			= 'Amadeus CA Migration - US9762'
		DELETE FROM [PNROutputGroupPNROutputItem] WHERE CreationUserIdentifier = @CreationUserIdentifier
		DELETE FROM [PNROutputItem] WHERE CreationUserIdentifier = @CreationUserIdentifier
		DELETE FROM [PNROutputPlaceHolder] WHERE CreationUserIdentifier = @CreationUserIdentifier
		PRINT 'End  Rollback Update Amadeus CA Migration - US9762'


		PRINT 'End  Rollback Update Amadeus CA Migration - US12284'
		SET @CreationUserIdentifier			= 'Amadeus CA Migration - US12284'
		DELETE FROM [PNROutputGroupPNROutputItem] WHERE CreationUserIdentifier = @CreationUserIdentifier
		DELETE FROM [PNROutputItem] WHERE CreationUserIdentifier = @CreationUserIdentifier
		DELETE FROM [PNROutputPlaceHolder] WHERE CreationUserIdentifier = @CreationUserIdentifier
		PRINT 'End  Rollback Update Amadeus CA Migration - US12284'

		PRINT 'End  Rollback Update Amadeus CA Migration - US11820'
		SET @CreationUserIdentifier			= 'Amadeus CA Migration - US11820'
		DELETE FROM PNROutputRemarkGroupPNROutputItem WHERE CreationUserIdentifier = @CreationUserIdentifier
		DELETE FROM PNROutputRemarkGroup WHERE CreationUserIdentifier = @CreationUserIdentifier
		DELETE FROM [PNROutputCondition] WHERE CreationUserIdentifier = @CreationUserIdentifier
		DELETE FROM [PNROutputGroupPNROutputItem] WHERE CreationUserIdentifier = @CreationUserIdentifier
		DELETE FROM [PNROutputItemLanguage] WHERE CreationUserIdentifier = @CreationUserIdentifier
		DELETE FROM [PNROutputItem] WHERE CreationUserIdentifier = @CreationUserIdentifier
		DELETE FROM [PNROutputPlaceHolder] WHERE CreationUserIdentifier = @CreationUserIdentifier
		PRINT 'End  Rollback Update Amadeus CA Migration - US11820'


		PRINT 'End  Rollback Update Amadeus CA Migration - US11000'
		SET @CreationUserIdentifier			= 'Amadeus CA Migration - US11000'
		DELETE FROM [PNROutputGroupPNROutputItem] WHERE CreationUserIdentifier = @CreationUserIdentifier
		DELETE FROM [PNROutputItem] WHERE CreationUserIdentifier = @CreationUserIdentifier
		DELETE FROM [PNROutputPlaceHolder] WHERE CreationUserIdentifier = @CreationUserIdentifier
		PRINT 'End  Rollback Update Amadeus CA Migration - US11000'

		PRINT 'End  Rollback Update Amadeus CA Migration - US100128'
		SET @CreationUserIdentifier			= 'Amadeus CA Migration - US100128'
		DELETE FROM [PNROutputGroupPNROutputItem] WHERE CreationUserIdentifier = @CreationUserIdentifier
		DELETE FROM [PNROutputItem] WHERE CreationUserIdentifier = @CreationUserIdentifier
		DELETE FROM [PNROutputPlaceHolder] WHERE CreationUserIdentifier = @CreationUserIdentifier
		PRINT 'End  Rollback Update Amadeus CA Migration - US100128'

		PRINT 'End  Rollback Update Amadeus CA Migration - US9700'
		SET @CreationUserIdentifier			= 'Amadeus CA Migration - US9700'
		DELETE FROM [PNROutputGroupPNROutputItem] WHERE CreationUserIdentifier = @CreationUserIdentifier
		DELETE FROM [PNROutputItem] WHERE CreationUserIdentifier = @CreationUserIdentifier
		DELETE FROM [PNROutputPlaceHolder] WHERE CreationUserIdentifier = @CreationUserIdentifier
		PRINT 'End  Rollback Update Amadeus CA Migration - US9700'

		PRINT 'End  Rollback Update Amadeus CA Migration - US10552'
		SET @CreationUserIdentifier			= 'Amadeus CA Migration - US10552'
		DELETE FROM [PNROutputGroupPNROutputItem] WHERE CreationUserIdentifier = @CreationUserIdentifier
		DELETE FROM [PNROutputItem] WHERE CreationUserIdentifier = @CreationUserIdentifier
		DELETE FROM [PNROutputPlaceHolder] WHERE CreationUserIdentifier = @CreationUserIdentifier
		PRINT 'End  Rollback Update Amadeus CA Migration - US10552'

		PRINT 'End  Rollback Update Amadeus CA Migration - US10551'
		SET @CreationUserIdentifier			= 'Amadeus CA Migration - US10551'
		DELETE FROM [PNROutputRemarkGroupPNROutputItem] WHERE CreationUserIdentifier = @CreationUserIdentifier
		DELETE FROM [PNROutputRemarkGroup] WHERE CreationUserIdentifier = @CreationUserIdentifier
		PRINT 'End  Rollback Update Amadeus CA Migration - US10551'


		PRINT 'End  Rollback Update Amadeus CA Migration - US9964'
		SET @CreationUserIdentifier			= 'Amadeus CA Migration - US9964'
		DELETE FROM [PNROutputGroupPNROutputItem] WHERE CreationUserIdentifier = @CreationUserIdentifier
		DELETE FROM [PNROutputItem] WHERE CreationUserIdentifier = @CreationUserIdentifier
		DELETE FROM [PNROutputPlaceHolder] WHERE CreationUserIdentifier = @CreationUserIdentifier
		PRINT 'End  Rollback Update Amadeus CA Migration - US9964'

		PRINT 'End  Rollback Update Amadeus CA Migration - US9619'
		SET @CreationUserIdentifier			= 'Amadeus CA Migration - US9619'
		DELETE FROM [PNROutputGroupPNROutputItem] WHERE CreationUserIdentifier = @CreationUserIdentifier
		DELETE FROM [PNROutputItem] WHERE CreationUserIdentifier = @CreationUserIdentifier
		DELETE FROM [PNROutputPlaceHolder] WHERE CreationUserIdentifier = @CreationUserIdentifier
		PRINT 'End  Rollback Update Amadeus CA Migration - US9619'


		PRINT 'End  Rollback Update Amadeus CA Migration - US111341'
		SET @CreationUserIdentifier			= 'Amadeus CA Migration - US111341'
		DELETE FROM [PNROutputRemarkGroupPNROutputItem] WHERE CreationUserIdentifier = @CreationUserIdentifier
		DELETE FROM [PnrOutputCondition] WHERE CreationUserIdentifier = @CreationUserIdentifier
		DELETE FROM [PNROutputGroupPNROutputItem] WHERE CreationUserIdentifier = @CreationUserIdentifier
		DELETE FROM [PNROutputItemLanguage] WHERE CreationUserIdentifier = @CreationUserIdentifier
		DELETE FROM [PNROutputItem] WHERE CreationUserIdentifier = @CreationUserIdentifier
		DELETE FROM [PNROutputPlaceHolder] WHERE CreationUserIdentifier = @CreationUserIdentifier
		PRINT 'End  Rollback Update Amadeus CA Migration - US111341'


		PRINT 'End  Rollback Update Amadeus CA Migration - US10869'
		SET @CreationUserIdentifier			= 'Amadeus CA Migration - US10869'
		DELETE FROM [PNROutputRemarkGroupPNROutputItem] WHERE CreationUserIdentifier = @CreationUserIdentifier
		DELETE FROM PNROutputRemarkGroup WHERE CreationUserIdentifier = @CreationUserIdentifier
		DELETE FROM [PnrOutputCondition] WHERE CreationUserIdentifier = @CreationUserIdentifier
		DELETE FROM [PNROutputGroupPNROutputItem] WHERE CreationUserIdentifier = @CreationUserIdentifier
		DELETE FROM [PNROutputItemLanguage] WHERE CreationUserIdentifier = @CreationUserIdentifier
		DELETE FROM [PNROutputItem] WHERE CreationUserIdentifier = @CreationUserIdentifier
		DELETE FROM [PNROutputPlaceHolder] WHERE CreationUserIdentifier = @CreationUserIdentifier
		PRINT 'End  Rollback Update Amadeus CA Migration - US10869'

		PRINT 'End  Rollback Update Amadeus CA Migration - US11821'
		SET @CreationUserIdentifier			= 'Amadeus CA Migration - US11821'
		DELETE FROM [PNROutputRemarkGroupPNROutputItem] WHERE CreationUserIdentifier = @CreationUserIdentifier
		DELETE FROM PNROutputRemarkGroup WHERE CreationUserIdentifier = @CreationUserIdentifier
		DELETE FROM [PNROutputGroupPNROutputItem] WHERE CreationUserIdentifier = @CreationUserIdentifier
		DELETE FROM [PNROutputItem] WHERE CreationUserIdentifier = @CreationUserIdentifier
		DELETE FROM [PNROutputPlaceHolder] WHERE CreationUserIdentifier = @CreationUserIdentifier
		PRINT 'End  Rollback Update Amadeus CA Migration - US11821'


		PRINT 'End  Rollback Update Amadeus CA Migration - US9402'
		SET @CreationUserIdentifier			= 'Amadeus CA Migration - US9402'
		DELETE FROM [PNROutputGroupPNROutputItem] WHERE CreationUserIdentifier = @CreationUserIdentifier
		DELETE FROM [PNROutputItem] WHERE CreationUserIdentifier = @CreationUserIdentifier
		DELETE FROM [PNROutputPlaceHolder] WHERE CreationUserIdentifier = @CreationUserIdentifier
		DELETE FROM ConfigurationParameter WHERE CreationUserIdentifier = @CreationUserIdentifier
		PRINT 'End  Rollback Update Amadeus CA Migration - US9402'

		PRINT 'End  Rollback Update Amadeus CA Migration - US9901'
		SET @CreationUserIdentifier			= 'Amadeus CA Migration - US9901'
		DELETE FROM [PnrOutputCondition] WHERE CreationUserIdentifier = @CreationUserIdentifier
		DELETE FROM [PNROutputGroupPNROutputItem] WHERE CreationUserIdentifier = @CreationUserIdentifier
		DELETE FROM [PNROutputItem] WHERE CreationUserIdentifier = @CreationUserIdentifier
		DELETE FROM [PNROutputPlaceHolder] WHERE CreationUserIdentifier = @CreationUserIdentifier
		PRINT 'End  Rollback Update Amadeus CA Migration - US9901'


		PRINT 'End  Rollback Update Amadeus CA Migration - US11386'
		SET @CreationUserIdentifier			= 'Amadeus CA Migration - US11386'
		DELETE FROM [PnrOutputCondition] WHERE CreationUserIdentifier = @CreationUserIdentifier
		DELETE FROM [PNROutputGroupPNROutputItem] WHERE CreationUserIdentifier = @CreationUserIdentifier
		DELETE FROM [PNROutputItem] WHERE CreationUserIdentifier = @CreationUserIdentifier
		PRINT 'End  Rollback Update Amadeus CA Migration - US11386'

		PRINT 'End  Rollback Update Amadeus CA Migration - US10040'
		SET @CreationUserIdentifier			= 'Amadeus CA Migration - US10040'
		DELETE FROM [PnrOutputCondition] WHERE CreationUserIdentifier = @CreationUserIdentifier
		DELETE FROM [PNROutputGroupPNROutputItem] WHERE CreationUserIdentifier = @CreationUserIdentifier
		DELETE FROM [PNROutputItem] WHERE CreationUserIdentifier = @CreationUserIdentifier
		DELETE FROM [PNROutputPlaceHolder] WHERE CreationUserIdentifier = @CreationUserIdentifier
		PRINT 'End  Rollback Update Amadeus CA Migration - US10040'

		PRINT 'End  Rollback Update Amadeus CA Migration - US11859'
		SET @CreationUserIdentifier			= 'Amadeus CA Migration - US11859'
		DELETE FROM [PNROutputRemarkGroupPNROutputItem] WHERE CreationUserIdentifier = @CreationUserIdentifier
		DELETE FROM PNROutputRemarkGroup WHERE CreationUserIdentifier = @CreationUserIdentifier
		DELETE FROM [PNROutputGroupPNROutputItem] WHERE CreationUserIdentifier = @CreationUserIdentifier
		DELETE FROM [PNROutputItem] WHERE CreationUserIdentifier = @CreationUserIdentifier
		DELETE FROM [PNROutputPlaceHolder] WHERE CreationUserIdentifier = @CreationUserIdentifier
		PRINT 'End  Rollback Update Amadeus CA Migration - US11859'

		PRINT 'End  Rollback Update Amadeus CA Migration - US11130'
		SET @CreationUserIdentifier			= 'Amadeus CA Migration - US11130'
		DELETE FROM Context WHERE CreationUserIdentifier = @CreationUserIdentifier
		PRINT 'End  Rollback Update Amadeus CA Migration - US11130'

		PRINT 'End  Rollback Update Amadeus CA Migration - OutputGroup'
		SET @CreationUserIdentifier			= 'Amadeus CA Migration - OutputGroup'
		DELETE FROM [PNROutputGroup] WHERE CreationUserIdentifier = @CreationUserIdentifier
		DELETE FROM [PNROutputGroupCountry] WHERE CreationUserIdentifier = @CreationUserIdentifier
		PRINT 'End  Rollback Update Amadeus CA Migration - OutputGroup'

		PRINT 'Start  Rollback Update Amadeus CA Migration - US15248'
		SET @CreationUserIdentifier     = 'Amadeus Canada - US15248'
		DELETE FROM ServicingOptionItem WHERE CreationUserIdentifier =   @CreationUserIdentifier       
        DELETE FROM ServicingOptionItemValue WHERE CreationUserIdentifier =   @CreationUserIdentifier         
        DELETE FROM ServicingOption WHERE CreationUserIdentifier =   @CreationUserIdentifier      
		PRINT 'end  Rollback Update Amadeus CA Migration - US15248'


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