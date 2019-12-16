USE [Desktop_Test]
GO

USE Desktop_Test
GO

BEGIN TRAN
BEGIN TRY
	
	DECLARE @CreationUserIdentifier	VARCHAR(150)
    DECLARE @CreationTimeStamp		DATETIME = GETUTCDATE()

	DECLARE @PNROutputItemID AS INT 
	DECLARE @PNROutputGroupID AS INT
	DECLARE @GeneralPNROutputGroupID INT

	DECLARE @CORPAddSegmentID AS INT
	DECLARE @CORPFullWrapID AS INT
	DECLARE @CORPItineraryQueueID AS INT
	DECLARE @CORPInvoiceItineraryID AS INT
	DECLARE @CORPCancelSegmentID AS INT

	DECLARE @CORPLoadPnrID AS INT
	DECLARE @DynamicID AS INT

	PRINT 'START Script Amadeus CA Migration - US15949'
	SET @CreationUserIdentifier	='Amadeus CA Migration - US15949'
	
	DELETE FROM [ClientDefinedRuleWorkflowTriggerApplicationMode]   WHERE CreationUserIdentifier =@CreationUserIdentifier
	DELETE FROM [ClientDefinedRuleWorkflowTriggerState]				WHERE CreationUserIdentifier =@CreationUserIdentifier

	INSERT INTO [dbo].[ClientDefinedRuleWorkflowTriggerApplicationMode]
	([ClientDefinedRuleWorkflowTriggerApplicationModeName],[CreationTimeStamp],[CreationUserIdentifier],[VersionNumber])
VALUES
	('CORPAddSegment', @CreationTimeStamp, @CreationUserIdentifier, 1),
	('CORPFullWrap', @CreationTimeStamp, @CreationUserIdentifier, 1),
	('CORPItineraryQueue', @CreationTimeStamp, @CreationUserIdentifier, 1),
	('CORPInvoiceItinerary', @CreationTimeStamp, @CreationUserIdentifier, 1),
	('CORPCancelSegment', @CreationTimeStamp, @CreationUserIdentifier, 1)


	INSERT INTO [dbo].[ClientDefinedRuleWorkflowTriggerState]
	([ClientDefinedRuleWorkflowTriggerStateName],[CreationTimeStamp],[CreationUserIdentifier],[VersionNumber])
VALUES
	('CORPLoadPnr', @CreationTimeStamp, @CreationUserIdentifier, 1)	 -- resuse Read Booking	  	
																						
	SET @CORPAddSegmentID		 = (SELECT [ClientDefinedRuleWorkflowTriggerApplicationModeID]
FROM [ClientDefinedRuleWorkflowTriggerApplicationMode]
WHERE [ClientDefinedRuleWorkflowTriggerApplicationModeName]='CORPAddSegment')
	SET @CORPFullWrapID			 = (SELECT [ClientDefinedRuleWorkflowTriggerApplicationModeID]
FROM [ClientDefinedRuleWorkflowTriggerApplicationMode]
WHERE [ClientDefinedRuleWorkflowTriggerApplicationModeName]='CORPFullWrap')
	SET @CORPItineraryQueueID	 = (SELECT [ClientDefinedRuleWorkflowTriggerApplicationModeID]
FROM [ClientDefinedRuleWorkflowTriggerApplicationMode]
WHERE [ClientDefinedRuleWorkflowTriggerApplicationModeName]='CORPItineraryQueue')
	SET @CORPInvoiceItineraryID  = (SELECT [ClientDefinedRuleWorkflowTriggerApplicationModeID]
FROM [ClientDefinedRuleWorkflowTriggerApplicationMode]
WHERE [ClientDefinedRuleWorkflowTriggerApplicationModeName]='CORPInvoiceItinerary')
	SET @CORPCancelSegmentID	 = (SELECT [ClientDefinedRuleWorkflowTriggerApplicationModeID]
FROM [ClientDefinedRuleWorkflowTriggerApplicationMode]
WHERE [ClientDefinedRuleWorkflowTriggerApplicationModeName]='CORPCancelSegment')
	
	SET @CORPLoadPnrID 			 = (SELECT [ClientDefinedRuleWorkflowTriggerStateID]
FROM [ClientDefinedRuleWorkflowTriggerState]
WHERE [ClientDefinedRuleWorkflowTriggerStateName]='CORPLoadPnr')
	SET @DynamicID				 = (SELECT [ClientDefinedRuleWorkflowTriggerStateID]
FROM [ClientDefinedRuleWorkflowTriggerState]
WHERE [ClientDefinedRuleWorkflowTriggerStateName]='Dynamic')


	INSERT INTO [dbo].[ClientDefinedRuleWorkflowTrigger]
	([CreationTimestamp],[CreationUserIdentifier],[VersionNumber],[ClientDefinedRuleWorkflowTriggerStateId],[ClientDefinedRuleWorkflowTriggerApplicationModeId])
VALUES
	(@CreationTimeStamp, @CreationUserIdentifier, 1, @CORPLoadPnrID, @CORPAddSegmentID),
	(@CreationTimeStamp, @CreationUserIdentifier, 1, @CORPLoadPnrID, @CORPFullWrapID),
	(@CreationTimeStamp, @CreationUserIdentifier, 1, @CORPLoadPnrID, @CORPItineraryQueueID),
	(@CreationTimeStamp, @CreationUserIdentifier, 1, @CORPLoadPnrID, @CORPInvoiceItineraryID),
	(@CreationTimeStamp, @CreationUserIdentifier, 1, @CORPLoadPnrID, @CORPCancelSegmentID),
	(@CreationTimeStamp, @CreationUserIdentifier, 1, @DynamicID, @CORPAddSegmentID),
	(@CreationTimeStamp, @CreationUserIdentifier, 1, @DynamicID, @CORPFullWrapID),
	(@CreationTimeStamp, @CreationUserIdentifier, 1, @DynamicID, @CORPItineraryQueueID),
	(@CreationTimeStamp, @CreationUserIdentifier, 1, @DynamicID, @CORPInvoiceItineraryID),
	(@CreationTimeStamp, @CreationUserIdentifier, 1, @DynamicID, @CORPCancelSegmentID)

	PRINT 'END Script Amadeus CA Migration - US15949'
	---------------------------
	PRINT 'START Script Amadeus CA Migration - US15243'
	SET @CreationUserIdentifier              = 'Amadeus CA Migration - US15243'
    DELETE FROM ClientDefinedRuleRelationalOperator WHERE  CreationUserIdentifier = @CreationUserIdentifier
	                        

	INSERT INTO ClientDefinedRuleRelationalOperator
	(RelationalOperatorName, CreationTimeStamp, CreationUserIdentifier, VersionNumber)
VALUES
	('>=', @CreationTimestamp, @CreationUserIdentifier, 1),
	('<=', @CreationTimestamp, @CreationUserIdentifier, 1),
	('>', @CreationTimestamp, @CreationUserIdentifier, 1),
	('<', @CreationTimestamp, @CreationUserIdentifier, 1),
	('BETWEEN', @CreationTimestamp, @CreationUserIdentifier, 1),
	('NOT BETWEEN', @CreationTimestamp, @CreationUserIdentifier, 1)
                           
    PRINT 'END Script Amadeus CA Migration - US15243'
	---------------------------
	PRINT 'START Script Amadeus CA Migration - US15949'
	SET @CreationUserIdentifier ='Amadeus CA Migration - US15949'

	DELETE FROM [ClientDefinedRuleBusinessEntity]   WHERE CreationUserIdentifier =@CreationUserIdentifier

    INSERT INTO [dbo].[ClientDefinedRuleBusinessEntity]
	([BusinessEntityName],[BusinessEntityDescription],[CreationTimeStamp],[CreationUserIdentifier],[VersionNumber],[IsLogic],[IsResult])
VALUES
	('UI_DISPLAY_CONTAINER', 'Display the Container in Specific Menu', @CreationTimeStamp, @CreationUserIdentifier, 1, 0, 1),
	('UI_ADD_CONTROL', 'Add dynamic control in container form', @CreationTimeStamp, @CreationUserIdentifier, 1, 0, 1),
	('PNR_AIR_SEGMENT_AIRPORT_CODE', 'Reads the Air Segment Airport Code field from the PNR', @CreationTimeStamp, @CreationUserIdentifier, 1, 1, 0),
	('PNR_AIR_SEGMENT_DEPT_TIME', 'Reads the Air Segment Departure Time field from the PNR', @CreationTimeStamp, @CreationUserIdentifier, 1, 1, 0),
	('PNR_AIR_SEGMENT_ARR_TIME', 'Reads the Air Segment Arrival Time field from the PNR', @CreationTimeStamp, @CreationUserIdentifier, 1, 1, 0),
	('PNR_AIR_SEGMENT_ROUTE_CODE', 'Reads the Air Segment Route Code field from the PNR', @CreationTimeStamp, @CreationUserIdentifier, 1, 1, 0),
	('UI_SEND_ITIN_ALLOWED_EMAIL_ENTRY', 'Send Itinerary - Allowed number of Email Address', @CreationTimeStamp, @CreationUserIdentifier, 1, 0, 1),
	('UI_DISPLAY_MESSAGE', 'Display Specific Message', @CreationTimeStamp, @CreationUserIdentifier, 1, 0, 1),
	('PNR_WRITE_REMARK_WITH_CONDTION', 'CA - Write remarks with condition', @CreationTimeStamp, @CreationUserIdentifier, 1, 0, 1),
	('PNR_AIR_SEGMENT_AIRLINE_CODE', 'Reads the Air Segment Airline Code from the PNR', @CreationTimeStamp, @CreationUserIdentifier, 1, 1, 0),
	('PNR_CAR_SEGMENT_VENDOR_CODE', 'Reads the Car Segment Vendor Code from the PNR', @CreationTimeStamp, @CreationUserIdentifier, 1, 1, 0),
	('PNR_CAR_SEGMENT_TYPE', 'Reads the Car Segment Type from the PNR', @CreationTimeStamp, @CreationUserIdentifier, 1, 1, 0)


	PRINT 'END Script Amadeus CA Migration - US15949'
	---------------------------
	
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






