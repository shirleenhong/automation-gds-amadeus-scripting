USE Desktop_Prod
GO

BEGIN TRAN
BEGIN TRY

       DECLARE @CreationUserIdentifier NVARCHAR(170)
        -----------------------
       -- ROLLBACK Scripts
       -----------------------
       SET @CreationUserIdentifier              = 'Amadeus CA Migration - US11196-update'	  
	   DELETE FROM PNROutputRemarkGroup WHERE CreationUserIdentifier = @CreationUserIdentifier     
       DELETE FROM PNROutputGroupPNROutputItem WHERE CreationUserIdentifier = @CreationUserIdentifier      
       DELETE FROM PNROutputItem WHERE CreationUserIdentifier = @CreationUserIdentifier



       -----------------------
       -- ROLLBACK Scripts
       -----------------------
       SET @CreationUserIdentifier              = 'Amadeus CA Migration - US11387'
	   DELETE FROM [PNROutputRemarkGroupPNROutputItem] WHERE CreationUserIdentifier = @CreationUserIdentifier
	   DELETE FROM PNROutputRemarkGroup WHERE CreationUserIdentifier = @CreationUserIdentifier
       DELETE FROM PnrOutputCondition WHERE CreationUserIdentifier = @CreationUserIdentifier
       DELETE FROM PNROutputGroupPNROutputItem WHERE CreationUserIdentifier = @CreationUserIdentifier
       DELETE FROM PNROutputGroup WHERE CreationUserIdentifier = @CreationUserIdentifier
       DELETE FROM PNROutputGroupCountry WHERE CreationUserIdentifier = @CreationUserIdentifier
       DELETE FROM PNROutputItemLanguage WHERE CreationUserIdentifier = @CreationUserIdentifier
       DELETE FROM PNROutputItem WHERE CreationUserIdentifier = @CreationUserIdentifier
       DELETE FROM PNROutputPlaceHolder WHERE   CreationUserIdentifier = @CreationUserIdentifier
	   delete from ConfigurationParameter WHERE   CreationUserIdentifier = @CreationUserIdentifier


  -----------------------
       -- ROLLBACK Scripts
       -----------------------
   	set @CreationUserIdentifier  = 'Amadeus CA Migration - US13842'
	delete from ClientFeeLanguage where [CreationUserIdentifier] = @CreationUserIdentifier;	
	delete from [clientFeeOutput] where [CreationUserIdentifier] = @CreationUserIdentifier;		
	delete from clientFee where [CreationUserIdentifier] = @CreationUserIdentifier;
	


       
       COMMIT TRAN
END TRY
       
BEGIN CATCH
ROLLBACK TRAN

       DECLARE @ErrorMessage NVARCHAR(4000);
       SELECT @ErrorMessage=ERROR_MESSAGE()
       RAISERROR(@ErrorMessage, 10, 1);

END CATCH




 
