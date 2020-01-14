USE DESKTOP_TEST
	BEGIN TRANSACTION
	BEGIN TRY

	DECLARE @creationIdentifier AS VARCHAR(50) = 'Amadeus CA Migration - OBL Fees'
	DECLARE @creationtimestamp AS DATETIME = GETUTCDATE()
	DECLARE @feeId as Int = (select max(clientfeeId) from clientfee);
	Declare @clientFeegroupId as Int = (select max(clientfeeGroupId) from ClientFeeGroup);
	DECLARE @clientFeeItemId as int = (Select max(clientFeeItemId) from clientfeeitem);
	DECLARE @clientFeeOutputId as int = (Select max(clientFeeOutputId) from ClientFeeOutput);

	--- ROLLBACK ----
	delete from ClientFeeLanguage where [CreationUserIdentifier] = @creationIdentifier;	
	delete from [clientFeeOutput] where [CreationUserIdentifier] = @creationIdentifier;		
	delete from clientFee where [CreationUserIdentifier] = @creationIdentifier;
	
	

	INSERT INTO [dbo].[ClientFee] ([ClientFeeId],[ClientFeeDescription],[FeeTypeId],[ContextId],[CreationTimestamp],[CreationUserIdentifier],[LastUpdateTimestamp],[LastUpdateUserIdentifier],[VersionNumber]
			   ,[GDSCode])
		 VALUES			
			(@feeId+1,'OLB Fee',2,1,@creationTimestamp,@creationIdentifier,null,null,1,'1A')
					


SET IDENTITY_INSERT [dbo].CLIENTFEEOUTPUT ON;  
--Select * from ClientFeeOutput
	INSERT INTO CLIENTFEEOUTPUT (clientFeeOutputId,[ClientFeeId],OutputFormat,OutputDescription, CreationTimeStamp,[CreationUserIdentifier],[VersionNumber])
	VALUES (@clientFeeOutputId+1, @feeId+1,'OLB','description', @creationTimestamp,@creationIdentifier,1)

		   
SET IDENTITY_INSERT [dbo].CLIENTFEEOUTPUT OFF;  

--Select * from ClientFeeLanguage
	INSERT INTO CLIENTFEELanguage ([ClientFeeId],LanguageCode,ClientFeeLanguageDescription, CreationTimeStamp,[CreationUserIdentifier],[VersionNumber])
	VALUES 	(@feeId+1,'en-GB','OLB Fee',@creationTimestamp,@creationIdentifier,1)



  COMMIT TRAN
 END TRY
 
 BEGIN CATCH
  ROLLBACK TRAN
  DECLARE @ErrorMessage NVARCHAR(4000);
  SELECT @ErrorMessage=ERROR_MESSAGE()
  RAISERROR(@ErrorMessage, 10, 1);
 END CATCH