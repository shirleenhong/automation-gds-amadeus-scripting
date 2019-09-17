Use desktop_test
go

BEGIN TRAN
		
	BEGIN TRY

	DECLARE @CreationUserIdentifier		NVARCHAR(150)
	DECLARE @CreationTimestamp			DATETIME = GETUTCDATE()
	DECLARE @PNROutputRemarkGroupId		INT
	DECLARE @PNROutputItemIDHighFare	INT
	DECLARE @PNROutputItemIDLowFare		INT
	DECLARE @PNROutputItemIDReasonCode	INT

	--DELETE FROM [PNROutputRemarkGroupPNROutputItem] WHERE CreationUserIdentifier = 'Amadeus CA Migration - US10551'
	--DELETE FROM [PNROutputRemarkGroup] WHERE CreationUserIdentifier = 'Amadeus CA Migration - US10551'

	SET @PNROutputRemarkGroupId = (SELECT MAX(PNROutputRemarkGroupId) + 1 FROM [PNROutputRemarkGroup])

	SET @CreationUserIdentifier = 'Amadeus CA Migration - US10551'

	INSERT INTO [dbo].[PNROutputRemarkGroup]
           ([PNROutputRemarkGroupId],[PNROutputRemarkGroupName],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber],[PNROutputRemarkGroupKey])
    VALUES
           (@PNROutputRemarkGroupId,'CAFareRemarks',@CreationTimestamp,@CreationUserIdentifier,1,null)


	SET @PNROutputItemIDHighFare	 = (SELECT TOP 1 PNROutputItemID FROM PNROutputItem WHERE RemarkFormat='FF/-%CAAirHighFare%')
	SET @PNROutputItemIDLowFare		 = (SELECT TOP 1 PNROutputItemID FROM PNROutputItem	WHERE RemarkFormat='LP/-%CAAirLowFare%')
	SET @PNROutputItemIDReasonCode	 = (SELECT TOP 1 PNROutputItemID FROM PNROutputItem WHERE RemarkFormat='FS/-%CAAirRealisedSavingCode%')

	
	INSERT INTO [dbo].[PNROutputRemarkGroupPNROutputItem]
           ([PNROutputRemarkGroupId],[PNROutputItemId],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber])
     VALUES
           (@PNROutputRemarkGroupId,@PNROutputItemIDHighFare,@CreationTimestamp,@CreationUserIdentifier,1),
		   (@PNROutputRemarkGroupId,@PNROutputItemIDLowFare,@CreationTimestamp,@CreationUserIdentifier,1),
		   (@PNROutputRemarkGroupId,@PNROutputItemIDReasonCode,@CreationTimestamp,@CreationUserIdentifier,1)


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
