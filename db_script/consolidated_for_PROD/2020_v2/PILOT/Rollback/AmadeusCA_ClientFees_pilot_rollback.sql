USE [Desktop_SyEx_Pilot]
	BEGIN TRANSACTION
	BEGIN TRY

	DECLARE @creationIdentifier AS VARCHAR(50) = 'Amadeus CA Migration - Client Fees'
	DECLARE @creationtimestamp AS DATETIME = GETUTCDATE()
	DECLARE @feeId as Int = (select max(clientfeeId) from clientfee);
	Declare @clientFeegroupId as Int = (select max(clientfeeGroupId) from ClientFeeGroup);
	DECLARE @clientFeeItemId as int = (Select max(clientFeeItemId) from clientfeeitem);
	DECLARE @clientFeeOutputId as int = (Select max(clientFeeOutputId) from ClientFeeOutput);

	--- ROLLBACK ----
	delete from ClientFeeLanguage where [CreationUserIdentifier] = @creationIdentifier;
	delete from [ClientFeeGroupClientAccount] where [CreationUserIdentifier] = @creationIdentifier;
	delete from [clientFeeOutput] where [CreationUserIdentifier] = @creationIdentifier;
	delete from [ClientFeeItem] where [CreationUserIdentifier] = @creationIdentifier;
	delete from [ClientFeeGroupClientAccount] where [CreationUserIdentifier] = @creationIdentifier;
	delete from [ClientFeeGroup] where [CreationUserIdentifier] = @creationIdentifier;
	delete from clientFee where [CreationUserIdentifier] = @creationIdentifier;
	

  COMMIT TRAN
 END TRY
 
 BEGIN CATCH
  ROLLBACK TRAN
  DECLARE @ErrorMessage NVARCHAR(4000);
  SELECT @ErrorMessage=ERROR_MESSAGE()
  RAISERROR(@ErrorMessage, 10, 1);
 END CATCH