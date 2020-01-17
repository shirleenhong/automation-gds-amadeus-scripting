USE [Desktop_Test]
GO

BEGIN TRAN
BEGIN TRY

	DECLARE @CreationUserIdentifier		NVARCHAR(150)
	DECLARE @CreationTimestamp			DATETIME = GETUTCDATE()
	DECLARE @PNROutputGroupID			INT
		

	SET @CreationUserIdentifier		= 'Amadeus CA Migration - OutputGroup'
	SET @PNROutputGroupID =	(SELECT MAX(PNROutputGroupId)  FROM [PNROutputGroup])
		
	INSERT INTO [dbo].[PNROutputGroup] (PNROutputGroupId,InheritFromParentFlag,PNROutputTypeID,GDSCode,PNROutputGroupName,EnabledFlag, DeletedFlag,CreationTimestamp,CreationUserIdentifier,VersionNumber)
									VALUES	(@PNROutputGroupID + 1, 1, 1,'1A','Canada Migration Application Group',1,0, @CreationTimestamp,@CreationUserIdentifier,1),				
											(@PNROutputGroupID + 2, 1, 2,'1A','Canada Migration BackOffice Group',1,0, @CreationTimestamp,@CreationUserIdentifier,1),		
											(@PNROutputGroupID + 3, 1, 3,'1A','Canada Migration General Group',1,0, @CreationTimestamp,@CreationUserIdentifier,1),		
											(@PNROutputGroupID + 4, 1, 4,'1A','Canada Migration Itinerary Group',1,0, @CreationTimestamp,@CreationUserIdentifier,1)		

			INSERT INTO [dbo].[PNROutputGroupCountry] (CountryCode, PNROutputGroupId,CreationTimestamp,CreationUserIdentifier, VersionNumber,TargetLayoutVersion)
									VALUES	('CA', @PNROutputGroupID + 1 , @CreationTimestamp,@CreationUserIdentifier,1, 1),
											('CA', @PNROutputGroupID + 2 , @CreationTimestamp,@CreationUserIdentifier,1, 1),
											('CA', @PNROutputGroupID + 3 , @CreationTimestamp,@CreationUserIdentifier,1, 1),
											('CA', @PNROutputGroupID + 4 , @CreationTimestamp,@CreationUserIdentifier,1, 1)

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