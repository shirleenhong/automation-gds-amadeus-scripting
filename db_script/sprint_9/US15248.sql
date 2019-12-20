
USE Desktop_TEST
GO

BEGIN TRAN
	BEGIN TRY
	
		---------------------------------------
        -- BEGIN US6201
        ---------------------------------------
		DECLARE @CreationUserIdentifier AS varchar(255)
        DECLARE @CreationTimestamp	AS DATETIME = GETUTCDATE()	
		DECLARE @ServicingOptionId AS int 
		DECLARE @ServicingOptionItemId AS int 
		DECLARE @ServicingOptionGroup As int
        
		SET @CreationUserIdentifier     = 'Amadeus Canada - US15248'
        SET @ServicingOptionId      = 529;
		SET @ServicingOptionItemId	= (SELECT MAX(ServicingOptionItemId) FROM ServicingOptionItem);
		SET @ServicingOptionGroup	= 37017;

              
		-- Rollback
		DELETE FROM ServicingOptionItem WHERE CreationUserIdentifier =   @CreationUserIdentifier       
        DELETE FROM ServicingOptionItemValue WHERE CreationUserIdentifier =   @CreationUserIdentifier         
        DELETE FROM ServicingOption WHERE CreationUserIdentifier =   @CreationUserIdentifier      
		---- End Rollback

        -- Service Option
        INSERT INTO ServicingOption (ServicingOptionId, ServicingOptionName, CreationTimestamp, CreationUserIdentifier, VersionNumber)
        VALUES  (@ServicingOptionId + 1, 'Low Fare Domestic Direct Calculation', @CreationTimestamp, @CreationUserIdentifier, 1),
				(@ServicingOptionId + 2, 'Low Fare Domestic Connecting Calculation', @CreationTimestamp, @CreationUserIdentifier, 1),
				(@ServicingOptionId + 3, 'Low Fare Internationl Direct Calculation', @CreationTimestamp, @CreationUserIdentifier, 1),
				(@ServicingOptionId + 4, 'Low Fare International Connecting Calculation', @CreationTimestamp, @CreationUserIdentifier, 1)
		        


		INSERT INTO ServicingOptionContext (ServicingOptionId, ContextId, CreationTimestamp, CreationUserIdentifier, VersionNumber)
        VALUES  (@ServicingOptionId + 1, 1, @CreationTimestamp, @CreationUserIdentifier, 1),
				(@ServicingOptionId + 2, 1, @CreationTimestamp, @CreationUserIdentifier, 1),
				(@ServicingOptionId + 3, 1, @CreationTimestamp, @CreationUserIdentifier, 1),
				(@ServicingOptionId + 4, 1, @CreationTimestamp, @CreationUserIdentifier, 1)
		

        INSERT INTO ServicingOptionItem	(ServicingOptionItemId, ServicingOptionGroupId, ServicingOptionId, ServicingOptionItemValue, ServicingOptionItemInstruction, ServicingOptionItemSequence, CreationTimestamp, CreationUserIdentifier, VersionNumber, DisplayInApplicationFlag)
		VALUES	(@ServicingOptionItemId + 1, @ServicingOptionGroup, @ServicingOptionId + 1, 'FXD//W2/FN,D/R,*BD,U007595,UP/A-9B',  'Low Fare Domestic DirectFlight Calculation', 0, @CreationTimestamp, @CreationUserIdentifier, 1, 1),
				(@ServicingOptionItemId + 2, @ServicingOptionGroup, @ServicingOptionId + 2, 'FXD//W2/R,*BD,U007595,UP/A-9B',  'Low Fare Domestic ConnectingFlight Calculation', 0, @CreationTimestamp, @CreationUserIdentifier, 1, 1),
				(@ServicingOptionItemId + 3, @ServicingOptionGroup, @ServicingOptionId + 3, 'FXD//W5/FN,D/R,*BD,U007595,UP/A-9B',  'Low Fare Internationl DirectFlight Calculation', 0, @CreationTimestamp, @CreationUserIdentifier, 1, 1),
				(@ServicingOptionItemId + 4, @ServicingOptionGroup, @ServicingOptionId + 4, 'FXD//W5/R,*BD,U007595,UP/A-9B ',  'Low Fare International ConnectingFlight Calculation', 0, @CreationTimestamp, @CreationUserIdentifier, 1, 1)

		
		---------------------------------------
        -- END US6201
        ---------------------------------------
		COMMIT TRAN

	END TRY
	
BEGIN CATCH

	ROLLBACK TRAN

	DECLARE @ErrorMessage NVARCHAR(4000);
	SELECT @ErrorMessage=ERROR_MESSAGE()
	RAISERROR(@ErrorMessage, 10, 1);

END CATCH
