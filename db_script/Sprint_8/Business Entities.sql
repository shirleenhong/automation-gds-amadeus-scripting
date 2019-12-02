USE [Desktop_Test]
GO


BEGIN TRAN
BEGIN TRY
       
		DECLARE @CreationUserIdentifier   VARCHAR(150)
		DECLARE @CreationTimeStamp           DATETIME = GETUTCDATE()

		SET @CreationUserIdentifier ='Amadeus CA Migration - US15949'

		--DELETE FROM [ClientDefinedRuleBusinessEntity]   WHERE CreationUserIdentifier =@CreationUserIdentifier

		INSERT INTO [dbo].[ClientDefinedRuleBusinessEntity]
           ([BusinessEntityName],[BusinessEntityDescription],[CreationTimeStamp],[CreationUserIdentifier],[VersionNumber],[IsLogic],[IsResult])
		VALUES
           --('UI_DISPLAY_CONTAINER','Display the Container in Specific Menu',@CreationTimeStamp,'Amadeus CA Migration - US15949',1,0,1),
		   ('PNR_AIR_SEGMENT_AIRPORT_CODE','Reads the Air Segment Airport Code field from the PNR',@CreationTimeStamp,'Amadeus CA Migration - US15949',1,0,1),
		   ('PNR_AIR_SEGMENT_DEPT_TIME','Reads the Air Segment Departure Time field from the PNR',@CreationTimeStamp,'Amadeus CA Migration - US15949',1,0,1),
		   ('PNR_AIR_SEGMENT_ARR_TIME','Reads the Air Segment Arrival Time field from the PNR',@CreationTimeStamp,'Amadeus CA Migration - US15949',1,0,1),
		   ('PNR_AIR_SEGMENT_ROUTE_CODE','Reads the Air Segment Route Code field from the PNR',@CreationTimeStamp,'Amadeus CA Migration - US15949',1,0,1)

		          
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