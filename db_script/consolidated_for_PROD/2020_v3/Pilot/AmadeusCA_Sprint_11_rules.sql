USE Desktop_Syex_Pilot
GO

BEGIN TRAN
BEGIN TRY
DECLARE @CreationUserIdentifier nvarchar(200)
DECLARE @CreationTimestamp DATETIME = GETUTCDATE()
DECLARE @ClientSubUnitGuid as varchar(50)
DECLARE @ClientAccountGuid as varchar(50)
DECLARE @ClientTopUnitGuid as  varchar(50)
DECLARE @TravellerTypeGuid as varchar(50)
DECLARE @SourceSystemCode as varchar(50)
DECLARE @NextGroupSequenceNumber as int
DECLARE @CDRGroupName  as varchar(300)
DECLARE @CDRGId as int
DECLARE @WFId_WS_NB as int
DECLARE @WFId_WS_AB as int
DECLARE @WFId_RB_NB as int
DECLARE @WFId_RB_AB as int
DECLARE @WFId_DY_NB as int
DECLARE @WFId_DY_AB as int
DECLARE @WFId_WFPR_NB as int
DECLARE @WFId_WFP_NB as int
declare @WFId_WFUPR_NB as int
declare @WFId_WFUP_NB as int 
DECLARE @AnyTripType as int
DECLARE @bid AS int
DECLARE @logicitemid AS int
DECLARE @resultitemid AS int
declare @shouldmaplogic as bit
declare @shouldmapresult as bit
Declare @WFId_RBPR_NB as int
Declare @WFId_RBP_NB as int
Declare @WFId_RBPR_AB as int
Declare @WFId_RBP_AB as int
DECLARE @WFId_WFPR_AB as int
DECLARE @WFId_WFP_AB as int
DECLARE @CORP_LOAD_FULLWRAP as int

DECLARE @IS AS int
declare @ISNOT as int
declare @CONTAINS as int
declare @NOTCONTAINS as int
declare @IN as int
DECLARE @CFA as varchar(30) = 'OY3|OV1|LH1'

set @CreationUserIdentifier = 'Amadeus CA Migration  ' + @CFA +  ' - US15251'
set @CDRGRoupName = 'Amadeus CA Migration - ' + @CFA +  ' Rule 1'

-- set @ClientSubUnitGuid = 'A:FA177'
set @TravellerTypeGuid = ''
set @ClientAccountGuid=''
set @SourceSystemCode = 'CA1'
set @ClientTopUnitGuid = ''
SELECT @NextGroupSequenceNumber =1 --- isnull(max(GroupSequenceNumber)+1,1) FROM ClientDefinedRuleGroup WHERE CreationUserIdentifier = @CreationUserIdentifier



---- ROLLBACK
DELETE FROM ClientDefinedRuleGroupResult where CreationUserIdentifier= @CreationUserIdentifier
DELETE FROM ClientDefinedRuleResultItem where CreationUserIdentifier= @CreationUserIdentifier
DELETE FROM ClientDefinedRuleGroupLogic where CreationUserIdentifier= @CreationUserIdentifier
DELETE FROM ClientDefinedRuleLogicItem where CreationUserIdentifier= @CreationUserIdentifier
DELETE FROM ClientDefinedRuleGroupTrigger where CreationUserIdentifier= @CreationUserIdentifier
DELETE FROM ClientDefinedRuleGroupClientSubUnit where CreationUserIdentifier= @CreationUserIdentifier
DELETE FROM ClientDefinedRuleGroup where CreationUserIdentifier= @CreationUserIdentifier




--dbo.ClientDefinedRuleGroup
INSERT INTO ClientDefinedRuleGroup
    ( TripTypeId,ClientDefinedRuleGroupName,CreationTimeStamp,CreationUserIdentifier,LastUpdateTimeStamp,LastUpdateUserIdentifier,VersionNumber,ClientDefinedRuleGroupDescription,EnabledFlag,EnabledDate,ExpiryDate,DeletedFlag,DeletedDateTime,Category)
VALUES
    ( null, @CDRGRoupName, @CreationTimestamp, @CreationUserIdentifier, @CreationTimestamp, @CreationUserIdentifier, 1, @CDRGRoupName, 1, '01/01/2016', null, 0, null, null)


SELECT @CDRGId=ClientDefinedRuleGroupID
FROM dbo.ClientDefinedRuleGroup
WHERE ClientDefinedRuleGroupName = @CDRGRoupName
SELECT @CORP_LOAD_FULLWRAP= ClientDefinedRuleWorkflowTriggerID
FROM ClientDefinedRuleWorkflowTrigger
 wt INNER JOIN
    (SELECT ClientDefinedRuleWorkflowTriggerStateID, ClientDefinedRuleWorkflowTriggerStateName, ClientDefinedRuleWorkflowTriggerApplicationModeID, ClientDefinedRuleWorkflowTriggerApplicationModeName
    from ClientDefinedRuleWorkflowTriggerState
  CROSS JOIN  ClientDefinedRuleWorkflowTriggerApplicationMode) wt2
    ON wt.ClientDefinedRuleWorkflowTriggerStateID = wt2.ClientDefinedRuleWorkflowTriggerStateID
        AND wt.ClientDefinedRuleWorkflowTriggerApplicationModeID = wt2.ClientDefinedRuleWorkflowTriggerApplicationModeID
WHERE wt2.ClientDefinedRuleWorkflowTriggerStateName='CORPLoadPnr' AND
    wt2.ClientDefinedRuleWorkflowTriggerApplicationModeName='CORPFullWrap'

SELECT @IS = ClientDefinedRuleRelationalOperatorid
FROM ClientDefinedRuleRelationalOperator
where RelationalOperatorName = 'IS'
SELECT @ISNOT = ClientDefinedRuleRelationalOperatorid
FROM ClientDefinedRuleRelationalOperator
where RelationalOperatorName = 'IS NOT'
SELECT @CONTAINS = ClientDefinedRuleRelationalOperatorid
FROM ClientDefinedRuleRelationalOperator
where RelationalOperatorName = 'CONTAINS'
SELECT @NOTCONTAINS = ClientDefinedRuleRelationalOperatorid
FROM ClientDefinedRuleRelationalOperator
where RelationalOperatorName = 'NOT CONTAINS'

SELECT @IN = ClientDefinedRuleRelationalOperatorid
FROM ClientDefinedRuleRelationalOperator
where RelationalOperatorName = 'IN'


--ClientDefinedRuleGroupTrigger
INSERT INTO dbo.ClientDefinedRuleGroupTrigger
    ( ClientDefinedRuleGroupId,ClientDefinedRuleWorkflowTriggerId,CreationTimestamp,CreationUserIdentifier,LastUpdateTimeStamp,LastUpdateUserIdentifier,VersionNumber)
VALUES
    ( @CDRGId, @CORP_LOAD_FULLWRAP, @CreationTimestamp, @CreationUserIdentifier, @CreationTimestamp, @CreationUserIdentifier, 1)

--ClientDefinedRuleLogicItem
SET @bid=null; 
SELECT @bid=ClientDefinedRuleBusinessEntityID
FROM ClientDefinedRuleBusinessEntity
WHERE BusinessEntityName='PNR_CF';  SET @logicitemid = null; 

SELECT @logicitemid = ClientDefinedRuleLogicItemid
FROM ClientDefinedRuleLogicItem
WHERE ClientDefinedRuleBusinessEntityId = @bid and ClientDefinedRuleRelationalOperatorId = @IN
    and ClientDefinedRuleLogicItemValue = @CFA;

IF (isnull(@logicitemid,0) = 0 )  
BEGIN
    INSERT INTO dbo.ClientDefinedRuleLogicItem
        ( ClientDefinedRuleLogicItemDescription,ClientDefinedRuleBusinessEntityId,ClientDefinedRuleRelationalOperatorId,ClientDefinedRuleLogicItemValue,CreationTimestamp,CreationUserIdentifier,LastUpdateTimeStamp,LastUpdateUserIdentifier,VersionNumber)
    VALUES
        ( @CDRGRoupName, @bid, @IN, @CFA, @CreationTimestamp, @CreationUserIdentifier, @CreationTimestamp, @CreationUserIdentifier, 1);
    SET @logicitemid = SCOPE_IDENTITY()
END

    INSERT INTO dbo.ClientDefinedRuleGroupLogic
    (ClientDefinedRuleLogicItemId, ClientDefinedRuleGroupId, LogicSequenceNumber, CreationTimestamp,CreationUserIdentifier,LastUpdateTimeStamp,LastUpdateUserIdentifier,VersionNumber)
SELECT @logicitemid, @CDRGId, isnull(MAx(LogicSequenceNumber),0) + 1 , @CreationTimestamp, @CreationUserIdentifier, @CreationTimestamp, @CreationUserIdentifier, 1
FROM ClientDefinedRuleGroupLogic
where ClientDefinedRuleGroupId = @CDRGId;


--ClientDefinedRuleResultItem
--SET @bid=null; 
--SELECT @bid=ClientDefinedRuleBusinessEntityID
--FROM ClientDefinedRuleBusinessEntity
--WHERE BusinessEntityName='UI_SEND_ITIN_ALLOWED_EMAIL_ENTRY'; 

DECLARE  @bid2 int 
SELECT @bid2= ClientDefinedRuleBusinessEntityID
FROM ClientDefinedRuleBusinessEntity
WHERE BusinessEntityName='UI_DISPLAY_CONTAINER'; 

DECLARE  @bid3 int 
SELECT @bid3= ClientDefinedRuleBusinessEntityID
FROM ClientDefinedRuleBusinessEntity
WHERE BusinessEntityName='UI_ADD_CONTROL'; 


DECLARE  @bid4 as int = (select ClientDefinedRuleBusinessEntityID
FROM ClientDefinedRuleBusinessEntity
WHERE BusinessEntityName='PNR_ADD_Remark'); 


DECLARE  @bid5 as int = (select ClientDefinedRuleBusinessEntityID
FROM ClientDefinedRuleBusinessEntity
WHERE BusinessEntityName='PNR_DELETE_Remark'); 
 
    INSERT INTO dbo.ClientDefinedRuleResultItem
    ( ClientDefinedRuleResultItemDescription,ClientDefinedRuleBusinessEntityId,ClientDefinedRuleResultItemValue,CreationTimestamp,CreationUserIdentifier,LastUpdateTimeStamp,LastUpdateUserIdentifier,VersionNumber)
VALUES

    ( @CDRGRoupName, @bid2, 'REPORTING', @CreationTimestamp, @CreationUserIdentifier, @CreationTimestamp, @CreationUserIdentifier, 1),
    ( @CDRGRoupName, @bid3, '{"type":"select","label":"Why First/Bus Booked","name":"whyBooked","required":"false","options":[{"name":"Core Team Bus Class Approved","value":"Core Team Bus Class Approved","defaultValue":"VIP on Approved List","defaultControl":"whoApproved","dependentControlRequired":"true"},{"name":"Only class available lowest fare accepted","value":"Only class available lowest fare accepted"},{"name":"Approved to travel Bus class","value":"Approved to travel Bus class"},{"name":"Complimentary upgrade","value":"Complimentary upgrade"},{"name":"Upgrade certificate used","value":"Upgrade certificate used"},{"name":"Traveling with approved VIP","value":"Traveling with approved VIP"},{"name":"Business class lower than premium economy","value":"Business class lower than premium economy"}]}', @CreationTimestamp, @CreationUserIdentifier, @CreationTimestamp, @CreationUserIdentifier, 1),
	( @CDRGRoupName, @bid3, '{"type":"text","label":"Who approved First/Bus booked?","name":"whoApproved","required":"false","maxlength":"50","minlength":"1","valuetype":"AlphaNumericMask","conditions":[{"controlName":"[UI_FORM_whyBooked]","logic":"IS_NOT","value":""}]}', @CreationTimestamp, @CreationUserIdentifier, @CreationTimestamp, @CreationUserIdentifier, 1),
	( @CDRGRoupName, @bid3, '{"type":"select","label":"NonRef/Ref Fare Type","name":"fareType","required":"true","options":[{"name":"REF-Refundable","value":"REF"},{"name":"NON-NonRefundable","value":"NON"},{"name":"OT-Car/Hotel Bookings Only","value":"OT"}]}', @CreationTimestamp, @CreationUserIdentifier, @CreationTimestamp, @CreationUserIdentifier, 1),
	( @CDRGRoupName, @bid4, 'RM* U6/-[UI_FORM_whyBooked]', @CreationTimestamp, @CreationUserIdentifier, @CreationTimestamp, @CreationUserIdentifier, 1),
    ( @CDRGRoupName, @bid4, 'RM* U4/-[UI_FORM_whoApproved]', @CreationTimestamp, @CreationUserIdentifier, @CreationTimestamp, @CreationUserIdentifier, 1),
	( @CDRGRoupName, @bid4, 'RM* U19/-[UI_FORM_fareType]', @CreationTimestamp, @CreationUserIdentifier, @CreationTimestamp, @CreationUserIdentifier, 1),
	( @CDRGRoupName, @bid5, 'U6/-', @CreationTimestamp, @CreationUserIdentifier, @CreationTimestamp, @CreationUserIdentifier, 1),
	( @CDRGRoupName, @bid5, 'U4/-', @CreationTimestamp, @CreationUserIdentifier, @CreationTimestamp, @CreationUserIdentifier, 1),
	( @CDRGRoupName, @bid5, 'U19/-', @CreationTimestamp, @CreationUserIdentifier, @CreationTimestamp, @CreationUserIdentifier, 1)


SET @resultitemid = SCOPE_IDENTITY() - 10; -- count of records


    INSERT INTO dbo.ClientDefinedRuleGroupResult
    (ClientDefinedRuleResultItemId, ClientDefinedRuleGroupId, CreationTimestamp,CreationUserIdentifier,LastUpdateTimeStamp,LastUpdateUserIdentifier,VersionNumber)
values
    (@resultitemid + 1, @CDRGId, @CreationTimestamp, @CreationUserIdentifier, @CreationTimestamp, @CreationUserIdentifier, 1),
    (@resultitemid + 2, @CDRGId, @CreationTimestamp, @CreationUserIdentifier, @CreationTimestamp, @CreationUserIdentifier, 1),
    (@resultitemid + 3, @CDRGId, @CreationTimestamp, @CreationUserIdentifier, @CreationTimestamp, @CreationUserIdentifier, 1),
	(@resultitemid + 4, @CDRGId, @CreationTimestamp, @CreationUserIdentifier, @CreationTimestamp, @CreationUserIdentifier, 1),
	(@resultitemid + 5, @CDRGId, @CreationTimestamp, @CreationUserIdentifier, @CreationTimestamp, @CreationUserIdentifier, 1),
	(@resultitemid + 6, @CDRGId, @CreationTimestamp, @CreationUserIdentifier, @CreationTimestamp, @CreationUserIdentifier, 1),
	(@resultitemid + 7, @CDRGId, @CreationTimestamp, @CreationUserIdentifier, @CreationTimestamp, @CreationUserIdentifier, 1),
	(@resultitemid + 8, @CDRGId, @CreationTimestamp, @CreationUserIdentifier, @CreationTimestamp, @CreationUserIdentifier, 1),
	(@resultitemid + 9, @CDRGId, @CreationTimestamp, @CreationUserIdentifier, @CreationTimestamp, @CreationUserIdentifier, 1),
	(@resultitemid + 10, @CDRGId, @CreationTimestamp, @CreationUserIdentifier, @CreationTimestamp, @CreationUserIdentifier, 1)
	

INSERT INTO ClientDefinedRuleGroupClientSubUnit
    (ClientDefinedRuleGroupId, ClientSubUnitGuid, CreationTimestamp,CreationUserIdentifier,LastUpdateTimeStamp,LastUpdateUserIdentifier,VersionNumber)
VALUES( @CDRGId, '14:36E50F', @CreationTimestamp, @CreationUserIdentifier, @CreationTimestamp, @CreationUserIdentifier, 1),
      ( @CDRGId, '14:3A7532', @CreationTimestamp, @CreationUserIdentifier, @CreationTimestamp, @CreationUserIdentifier, 1)

-- Select * from ClientDefinedRuleResultItem where CreationUserIdentifier = @CreationUserIdentifier 
-- Select * from ClientDefinedRuleGroupResult where CreationUserIdentifier = @CreationUserIdentifier 

SELECT @CDRGID, @CDRGRoupName , @resultitemid

COMMIT TRAN
END TRY
BEGIN CATCH
ROLLBACK TRAN
DECLARE @ErrorMessage NVARCHAR(4000);
SELECT @ErrorMessage=ERROR_MESSAGE()
RAISERROR(@ErrorMessage, 10, 1);
END CATCH







BEGIN TRAN
BEGIN TRY
DECLARE @CreationUserIdentifier nvarchar(200)
DECLARE @CreationTimestamp DATETIME = GETUTCDATE()
DECLARE @ClientSubUnitGuid as varchar(50)
DECLARE @ClientAccountGuid as varchar(50)
DECLARE @ClientTopUnitGuid as  varchar(50)
DECLARE @TravellerTypeGuid as varchar(50)
DECLARE @SourceSystemCode as varchar(50)
DECLARE @NextGroupSequenceNumber as int
DECLARE @CDRGroupName  as varchar(300)
DECLARE @CDRGId as int
DECLARE @WFId_WS_NB as int
DECLARE @WFId_WS_AB as int
DECLARE @WFId_RB_NB as int
DECLARE @WFId_RB_AB as int
DECLARE @WFId_DY_NB as int
DECLARE @WFId_DY_AB as int
DECLARE @WFId_WFPR_NB as int
DECLARE @WFId_WFP_NB as int
declare @WFId_WFUPR_NB as int
declare @WFId_WFUP_NB as int 
DECLARE @AnyTripType as int
DECLARE @bid AS int
DECLARE @logicitemid AS int
DECLARE @resultitemid AS int
declare @shouldmaplogic as bit
declare @shouldmapresult as bit
Declare @WFId_RBPR_NB as int
Declare @WFId_RBP_NB as int
Declare @WFId_RBPR_AB as int
Declare @WFId_RBP_AB as int
DECLARE @WFId_WFPR_AB as int
DECLARE @WFId_WFP_AB as int
DECLARE @CORP_LOAD_FULLWRAP as int

DECLARE @IS AS int
declare @ISNOT as int
declare @CONTAINS as int
declare @NOTCONTAINS as int
declare @IN as int
DECLARE @CFA as varchar(30) = 'W7B'

set @CreationUserIdentifier = 'Amadeus CA Migration  ' + @CFA +  ' - US15251'
set @CDRGRoupName = 'Amadeus CA Migration - ' + @CFA +  ' Rule 1'

set @ClientSubUnitGuid = 'A:FA177'
set @TravellerTypeGuid = ''
set @ClientAccountGuid=''
set @SourceSystemCode = 'CA1'
set @ClientTopUnitGuid = ''
SELECT @NextGroupSequenceNumber =1 --- isnull(max(GroupSequenceNumber)+1,1) FROM ClientDefinedRuleGroup WHERE CreationUserIdentifier = @CreationUserIdentifier



---- ROLLBACK
DELETE FROM ClientDefinedRuleGroupResult where CreationUserIdentifier= @CreationUserIdentifier
DELETE FROM ClientDefinedRuleResultItem where CreationUserIdentifier= @CreationUserIdentifier
DELETE FROM ClientDefinedRuleGroupLogic where CreationUserIdentifier= @CreationUserIdentifier
DELETE FROM ClientDefinedRuleLogicItem where CreationUserIdentifier= @CreationUserIdentifier
DELETE FROM ClientDefinedRuleGroupTrigger where CreationUserIdentifier= @CreationUserIdentifier
DELETE FROM ClientDefinedRuleGroupClientSubUnit where CreationUserIdentifier= @CreationUserIdentifier
DELETE FROM ClientDefinedRuleGroup where CreationUserIdentifier= @CreationUserIdentifier




--dbo.ClientDefinedRuleGroup
INSERT INTO ClientDefinedRuleGroup
    ( TripTypeId,ClientDefinedRuleGroupName,CreationTimeStamp,CreationUserIdentifier,LastUpdateTimeStamp,LastUpdateUserIdentifier,VersionNumber,ClientDefinedRuleGroupDescription,EnabledFlag,EnabledDate,ExpiryDate,DeletedFlag,DeletedDateTime,Category)
VALUES
    ( null, @CDRGRoupName, @CreationTimestamp, @CreationUserIdentifier, @CreationTimestamp, @CreationUserIdentifier, 1, @CDRGRoupName, 1, '01/01/2016', null, 0, null, null)


SELECT @CDRGId=ClientDefinedRuleGroupID
FROM dbo.ClientDefinedRuleGroup
WHERE ClientDefinedRuleGroupName = @CDRGRoupName
SELECT @CORP_LOAD_FULLWRAP= ClientDefinedRuleWorkflowTriggerID
FROM ClientDefinedRuleWorkflowTrigger
 wt INNER JOIN
    (SELECT ClientDefinedRuleWorkflowTriggerStateID, ClientDefinedRuleWorkflowTriggerStateName, ClientDefinedRuleWorkflowTriggerApplicationModeID, ClientDefinedRuleWorkflowTriggerApplicationModeName
    from ClientDefinedRuleWorkflowTriggerState
  CROSS JOIN  ClientDefinedRuleWorkflowTriggerApplicationMode) wt2
    ON wt.ClientDefinedRuleWorkflowTriggerStateID = wt2.ClientDefinedRuleWorkflowTriggerStateID
        AND wt.ClientDefinedRuleWorkflowTriggerApplicationModeID = wt2.ClientDefinedRuleWorkflowTriggerApplicationModeID
WHERE wt2.ClientDefinedRuleWorkflowTriggerStateName='CORPLoadPnr' AND
    wt2.ClientDefinedRuleWorkflowTriggerApplicationModeName='CORPFullWrap'

SELECT @IS = ClientDefinedRuleRelationalOperatorid
FROM ClientDefinedRuleRelationalOperator
where RelationalOperatorName = 'IS'
SELECT @ISNOT = ClientDefinedRuleRelationalOperatorid
FROM ClientDefinedRuleRelationalOperator
where RelationalOperatorName = 'IS NOT'
SELECT @CONTAINS = ClientDefinedRuleRelationalOperatorid
FROM ClientDefinedRuleRelationalOperator
where RelationalOperatorName = 'CONTAINS'
SELECT @NOTCONTAINS = ClientDefinedRuleRelationalOperatorid
FROM ClientDefinedRuleRelationalOperator
where RelationalOperatorName = 'NOT CONTAINS'

SELECT @IN = ClientDefinedRuleRelationalOperatorid
FROM ClientDefinedRuleRelationalOperator
where RelationalOperatorName = 'IN'


INSERT INTO [dbo].[ClientDefinedRuleBusinessEntity]([BusinessEntityName],[BusinessEntityDescription],[CreationTimeStamp],[CreationUserIdentifier],[VersionNumber],[IsLogic],[IsResult])
		VALUES ('PNR_ADD_REMARKS_FIRST_TST', 'Add Remarks 1st TST Only', @CreationTimeStamp, @CreationUserIdentifier, 1, 1, 1),
				('PNR_ADD_REMARKS_PER_TST_FIRST_NOT_INCLUDED', 'Add Remarks Per TST - 1st TST Not Included', @CreationTimeStamp, @CreationUserIdentifier, 1, 1, 1)
--ClientDefinedRuleGroupTrigger

INSERT INTO dbo.ClientDefinedRuleGroupTrigger
    ( ClientDefinedRuleGroupId,ClientDefinedRuleWorkflowTriggerId,CreationTimestamp,CreationUserIdentifier,LastUpdateTimeStamp,LastUpdateUserIdentifier,VersionNumber)
VALUES
    ( @CDRGId, @CORP_LOAD_FULLWRAP, @CreationTimestamp, @CreationUserIdentifier, @CreationTimestamp, @CreationUserIdentifier, 1)

--ClientDefinedRuleLogicItem
SET @bid=null; 
SELECT @bid=ClientDefinedRuleBusinessEntityID
FROM ClientDefinedRuleBusinessEntity
WHERE BusinessEntityName='PNR_CF';  SET @logicitemid = null; 

SELECT @logicitemid = ClientDefinedRuleLogicItemid
FROM ClientDefinedRuleLogicItem
WHERE ClientDefinedRuleBusinessEntityId = @bid and ClientDefinedRuleRelationalOperatorId = @IN
    and ClientDefinedRuleLogicItemValue = @CFA;

IF (isnull(@logicitemid,0) = 0 )  
BEGIN
    INSERT INTO dbo.ClientDefinedRuleLogicItem
        ( ClientDefinedRuleLogicItemDescription,ClientDefinedRuleBusinessEntityId,ClientDefinedRuleRelationalOperatorId,ClientDefinedRuleLogicItemValue,CreationTimestamp,CreationUserIdentifier,LastUpdateTimeStamp,LastUpdateUserIdentifier,VersionNumber)
    VALUES
        ( @CDRGRoupName, @bid, @IN, @CFA, @CreationTimestamp, @CreationUserIdentifier, @CreationTimestamp, @CreationUserIdentifier, 1);
    SET @logicitemid = SCOPE_IDENTITY()
END

    INSERT INTO dbo.ClientDefinedRuleGroupLogic
    (ClientDefinedRuleLogicItemId, ClientDefinedRuleGroupId, LogicSequenceNumber, CreationTimestamp,CreationUserIdentifier,LastUpdateTimeStamp,LastUpdateUserIdentifier,VersionNumber)
SELECT @logicitemid, @CDRGId, isnull(MAx(LogicSequenceNumber),0) + 1 , @CreationTimestamp, @CreationUserIdentifier, @CreationTimestamp, @CreationUserIdentifier, 1
FROM ClientDefinedRuleGroupLogic
where ClientDefinedRuleGroupId = @CDRGId;


--ClientDefinedRuleResultItem
--SET @bid=null; 
--SELECT @bid=ClientDefinedRuleBusinessEntityID
--FROM ClientDefinedRuleBusinessEntity
--WHERE BusinessEntityName='UI_SEND_ITIN_ALLOWED_EMAIL_ENTRY'; 

DECLARE  @bid2 int 
SELECT @bid2= ClientDefinedRuleBusinessEntityID
FROM ClientDefinedRuleBusinessEntity
WHERE BusinessEntityName='UI_DISPLAY_CONTAINER'; 

DECLARE  @bid3 int 
SELECT @bid3= ClientDefinedRuleBusinessEntityID
FROM ClientDefinedRuleBusinessEntity
WHERE BusinessEntityName='UI_ADD_CONTROL'; 


DECLARE  @bid4 as int = (select ClientDefinedRuleBusinessEntityID
FROM ClientDefinedRuleBusinessEntity
WHERE BusinessEntityName='PNR_ADD_REMARKS_FIRST_TST'); 


DECLARE  @bid5 as int = (select ClientDefinedRuleBusinessEntityID
FROM ClientDefinedRuleBusinessEntity
WHERE BusinessEntityName='PNR_DELETE_Remark'); 
 
DECLARE  @bid6 as int = (select ClientDefinedRuleBusinessEntityID
FROM ClientDefinedRuleBusinessEntity
WHERE BusinessEntityName='PNR_ADD_REMARKS_PER_TST_FIRST_NOT_INCLUDED'); 

DECLARE  @bid7 as int = (select ClientDefinedRuleBusinessEntityID
FROM ClientDefinedRuleBusinessEntity
WHERE BusinessEntityName='PNR_ADD_Remark'); 


    INSERT INTO dbo.ClientDefinedRuleResultItem
    ( ClientDefinedRuleResultItemDescription,ClientDefinedRuleBusinessEntityId,ClientDefinedRuleResultItemValue,CreationTimestamp,CreationUserIdentifier,LastUpdateTimeStamp,LastUpdateUserIdentifier,VersionNumber)
VALUES

    ( @CDRGRoupName, @bid2, 'REPORTING', @CreationTimestamp, @CreationUserIdentifier, @CreationTimestamp, @CreationUserIdentifier, 1),
	( @CDRGRoupName, @bid3, '{"type":"text","label":"Lowest Coach Fare for Flts Booked","name":"lowestCoach_[TSTSEGMENT]","required":"false","valuetype":"AmountMask"}', @CreationTimestamp, @CreationUserIdentifier, @CreationTimestamp, @CreationUserIdentifier, 1),
	( @CDRGRoupName, @bid3, '{"type":"text","label":"Approver Last Name","name":"approver_[TSTSEGMENT]","required":"false","valuetype":"AmountMask"}', @CreationTimestamp, @CreationUserIdentifier, @CreationTimestamp, @CreationUserIdentifier, 1),
	( @CDRGRoupName, @bid3, '{"type":"select","label":"Waiver Approved","name":"waiverApproved","required":"false","options":[{"name":"XX","value":"XX"},{"name":"WA","value":"WA"}]}', @CreationTimestamp, @CreationUserIdentifier, @CreationTimestamp, @CreationUserIdentifier, 1),
	( @CDRGRoupName, @bid4, 'RM* U17/-[UI_FORM_lowestCoach_TSTSEGMENT]', @CreationTimestamp, @CreationUserIdentifier, @CreationTimestamp, @CreationUserIdentifier, 1),
	( @CDRGRoupName, @bid4, 'RM* U18/-[UI_FORM_approver_TSTSEGMENT]', @CreationTimestamp, @CreationUserIdentifier, @CreationTimestamp, @CreationUserIdentifier, 1),
	( @CDRGRoupName, @bid6, 'RMT TKT[TSTNumber]-U17/-[UI_FORM_lowestCoach_TSTSEGMENT]', @CreationTimestamp, @CreationUserIdentifier, @CreationTimestamp, @CreationUserIdentifier, 1),
	( @CDRGRoupName, @bid6, 'RMT TKT[TSTNumber]-U18/-[UI_FORM_approver_TSTSEGMENT]', @CreationTimestamp, @CreationUserIdentifier, @CreationTimestamp, @CreationUserIdentifier, 1),
	( @CDRGRoupName, @bid7, 'RM* U10/-[UI_FORM_waiverApproved]', @CreationTimestamp, @CreationUserIdentifier, @CreationTimestamp, @CreationUserIdentifier, 1),
	( @CDRGRoupName, @bid5, 'U17/-', @CreationTimestamp, @CreationUserIdentifier, @CreationTimestamp, @CreationUserIdentifier, 1),
	( @CDRGRoupName, @bid5, 'U18/-', @CreationTimestamp, @CreationUserIdentifier, @CreationTimestamp, @CreationUserIdentifier, 1),
	( @CDRGRoupName, @bid5, 'U10/-', @CreationTimestamp, @CreationUserIdentifier, @CreationTimestamp, @CreationUserIdentifier, 1)
    
SET @resultitemid = SCOPE_IDENTITY() - 12; -- count of records


    INSERT INTO dbo.ClientDefinedRuleGroupResult
    (ClientDefinedRuleResultItemId, ClientDefinedRuleGroupId, CreationTimestamp,CreationUserIdentifier,LastUpdateTimeStamp,LastUpdateUserIdentifier,VersionNumber)
values
    (@resultitemid + 1, @CDRGId, @CreationTimestamp, @CreationUserIdentifier, @CreationTimestamp, @CreationUserIdentifier, 1),
    (@resultitemid + 2, @CDRGId, @CreationTimestamp, @CreationUserIdentifier, @CreationTimestamp, @CreationUserIdentifier, 1),
    (@resultitemid + 3, @CDRGId, @CreationTimestamp, @CreationUserIdentifier, @CreationTimestamp, @CreationUserIdentifier, 1),
	(@resultitemid + 4, @CDRGId, @CreationTimestamp, @CreationUserIdentifier, @CreationTimestamp, @CreationUserIdentifier, 1),
	(@resultitemid + 5, @CDRGId, @CreationTimestamp, @CreationUserIdentifier, @CreationTimestamp, @CreationUserIdentifier, 1),
	(@resultitemid + 6, @CDRGId, @CreationTimestamp, @CreationUserIdentifier, @CreationTimestamp, @CreationUserIdentifier, 1),
	(@resultitemid + 7, @CDRGId, @CreationTimestamp, @CreationUserIdentifier, @CreationTimestamp, @CreationUserIdentifier, 1),
	(@resultitemid + 8, @CDRGId, @CreationTimestamp, @CreationUserIdentifier, @CreationTimestamp, @CreationUserIdentifier, 1),
	(@resultitemid + 9, @CDRGId, @CreationTimestamp, @CreationUserIdentifier, @CreationTimestamp, @CreationUserIdentifier, 1),
	(@resultitemid + 10, @CDRGId, @CreationTimestamp, @CreationUserIdentifier, @CreationTimestamp, @CreationUserIdentifier, 1),
	(@resultitemid + 11, @CDRGId, @CreationTimestamp, @CreationUserIdentifier, @CreationTimestamp, @CreationUserIdentifier, 1),
	(@resultitemid + 12, @CDRGId, @CreationTimestamp, @CreationUserIdentifier, @CreationTimestamp, @CreationUserIdentifier, 1)
	

INSERT INTO ClientDefinedRuleGroupClientSubUnit
    (ClientDefinedRuleGroupId, ClientSubUnitGuid, CreationTimestamp,CreationUserIdentifier,LastUpdateTimeStamp,LastUpdateUserIdentifier,VersionNumber)
VALUES( @CDRGId, '14:36E50F', @CreationTimestamp, @CreationUserIdentifier, @CreationTimestamp, @CreationUserIdentifier, 1),
      ( @CDRGId, '14:3A7532', @CreationTimestamp, @CreationUserIdentifier, @CreationTimestamp, @CreationUserIdentifier, 1)

-- Select * from ClientDefinedRuleResultItem where CreationUserIdentifier = @CreationUserIdentifier 
-- Select * from ClientDefinedRuleGroupResult where CreationUserIdentifier = @CreationUserIdentifier 

SELECT @CDRGID, @CDRGRoupName , @resultitemid

COMMIT TRAN
END TRY
BEGIN CATCH
ROLLBACK TRAN
DECLARE @ErrorMessage NVARCHAR(4000);
SELECT @ErrorMessage=ERROR_MESSAGE()
RAISERROR(@ErrorMessage, 10, 1);
END CATCH




BEGIN TRAN
BEGIN TRY
DECLARE @CreationUserIdentifier nvarchar(200)
DECLARE @CreationTimestamp DATETIME = GETUTCDATE()
DECLARE @ClientSubUnitGuid as varchar(50)
DECLARE @ClientAccountGuid as varchar(50)
DECLARE @ClientTopUnitGuid as  varchar(50)
DECLARE @TravellerTypeGuid as varchar(50)
DECLARE @SourceSystemCode as varchar(50)
DECLARE @NextGroupSequenceNumber as int
DECLARE @CDRGroupName  as varchar(300)
DECLARE @CDRGId as int
DECLARE @WFId_WS_NB as int
DECLARE @WFId_WS_AB as int
DECLARE @WFId_RB_NB as int
DECLARE @WFId_RB_AB as int
DECLARE @WFId_DY_NB as int
DECLARE @WFId_DY_AB as int
DECLARE @WFId_WFPR_NB as int
DECLARE @WFId_WFP_NB as int
declare @WFId_WFUPR_NB as int
declare @WFId_WFUP_NB as int 
DECLARE @AnyTripType as int
DECLARE @bid AS int
DECLARE @logicitemid AS int
DECLARE @resultitemid AS int
declare @shouldmaplogic as bit
declare @shouldmapresult as bit
Declare @WFId_RBPR_NB as int
Declare @WFId_RBP_NB as int
Declare @WFId_RBPR_AB as int
Declare @WFId_RBP_AB as int
DECLARE @WFId_WFPR_AB as int
DECLARE @WFId_WFP_AB as int
DECLARE @CORP_LOAD_FULLWRAP as int

DECLARE @IS AS int
declare @ISNOT as int
declare @CONTAINS as int
declare @NOTCONTAINS as int
DECLARE @CFA as varchar(5) = 'SGE'

set @CreationUserIdentifier = 'Amadeus CA Migration  ' + @CFA +  ' - US15251'
set @CDRGRoupName = 'Amadeus CA Migration - ' + @CFA +  ' Rule 1'

set @ClientSubUnitGuid = 'A:FA177'
set @TravellerTypeGuid = ''
set @ClientAccountGuid=''
set @SourceSystemCode = 'CA1'
set @ClientTopUnitGuid = ''
SELECT @NextGroupSequenceNumber =1 --- isnull(max(GroupSequenceNumber)+1,1) FROM ClientDefinedRuleGroup WHERE CreationUserIdentifier = @CreationUserIdentifier



---- ROLLBACK
DELETE FROM ClientDefinedRuleGroupResult where CreationUserIdentifier= @CreationUserIdentifier
DELETE FROM ClientDefinedRuleResultItem where CreationUserIdentifier= @CreationUserIdentifier
DELETE FROM ClientDefinedRuleGroupLogic where CreationUserIdentifier= @CreationUserIdentifier
DELETE FROM ClientDefinedRuleLogicItem where CreationUserIdentifier= @CreationUserIdentifier
DELETE FROM ClientDefinedRuleGroupTrigger where CreationUserIdentifier= @CreationUserIdentifier
DELETE FROM ClientDefinedRuleGroupClientSubUnit where CreationUserIdentifier= @CreationUserIdentifier
DELETE FROM ClientDefinedRuleGroup where CreationUserIdentifier= @CreationUserIdentifier




--dbo.ClientDefinedRuleGroup
INSERT INTO ClientDefinedRuleGroup
    ( TripTypeId,ClientDefinedRuleGroupName,CreationTimeStamp,CreationUserIdentifier,LastUpdateTimeStamp,LastUpdateUserIdentifier,VersionNumber,ClientDefinedRuleGroupDescription,EnabledFlag,EnabledDate,ExpiryDate,DeletedFlag,DeletedDateTime,Category)
VALUES
    ( null, @CDRGRoupName, @CreationTimestamp, @CreationUserIdentifier, @CreationTimestamp, @CreationUserIdentifier, 1, @CDRGRoupName, 1, '01/01/2016', null, 0, null, null)


SELECT @CDRGId=ClientDefinedRuleGroupID
FROM dbo.ClientDefinedRuleGroup
WHERE ClientDefinedRuleGroupName = @CDRGRoupName
SELECT @CORP_LOAD_FULLWRAP= ClientDefinedRuleWorkflowTriggerID
FROM ClientDefinedRuleWorkflowTrigger
 wt INNER JOIN
    (SELECT ClientDefinedRuleWorkflowTriggerStateID, ClientDefinedRuleWorkflowTriggerStateName, ClientDefinedRuleWorkflowTriggerApplicationModeID, ClientDefinedRuleWorkflowTriggerApplicationModeName
    from ClientDefinedRuleWorkflowTriggerState
  CROSS JOIN  ClientDefinedRuleWorkflowTriggerApplicationMode) wt2
    ON wt.ClientDefinedRuleWorkflowTriggerStateID = wt2.ClientDefinedRuleWorkflowTriggerStateID
        AND wt.ClientDefinedRuleWorkflowTriggerApplicationModeID = wt2.ClientDefinedRuleWorkflowTriggerApplicationModeID
WHERE wt2.ClientDefinedRuleWorkflowTriggerStateName='CORPLoadPnr' AND
    wt2.ClientDefinedRuleWorkflowTriggerApplicationModeName='CORPFullWrap'

SELECT @IS = ClientDefinedRuleRelationalOperatorid
FROM ClientDefinedRuleRelationalOperator
where RelationalOperatorName = 'IS'
SELECT @ISNOT = ClientDefinedRuleRelationalOperatorid
FROM ClientDefinedRuleRelationalOperator
where RelationalOperatorName = 'IS NOT'
SELECT @CONTAINS = ClientDefinedRuleRelationalOperatorid
FROM ClientDefinedRuleRelationalOperator
where RelationalOperatorName = 'CONTAINS'
SELECT @NOTCONTAINS = ClientDefinedRuleRelationalOperatorid
FROM ClientDefinedRuleRelationalOperator
where RelationalOperatorName = 'NOT CONTAINS'


--ClientDefinedRuleGroupTrigger
INSERT INTO dbo.ClientDefinedRuleGroupTrigger
    ( ClientDefinedRuleGroupId,ClientDefinedRuleWorkflowTriggerId,CreationTimestamp,CreationUserIdentifier,LastUpdateTimeStamp,LastUpdateUserIdentifier,VersionNumber)
VALUES
    ( @CDRGId, @CORP_LOAD_FULLWRAP, @CreationTimestamp, @CreationUserIdentifier, @CreationTimestamp, @CreationUserIdentifier, 1)

--ClientDefinedRuleLogicItem
SET @bid=null; 
SELECT @bid=ClientDefinedRuleBusinessEntityID
FROM ClientDefinedRuleBusinessEntity
WHERE BusinessEntityName='PNR_CF';  SET @logicitemid = null; 

SELECT @logicitemid = ClientDefinedRuleLogicItemid
FROM ClientDefinedRuleLogicItem
WHERE ClientDefinedRuleBusinessEntityId = @bid and ClientDefinedRuleRelationalOperatorId = @IS
    and ClientDefinedRuleLogicItemValue = @CFA;

IF (isnull(@logicitemid,0) = 0 )  
BEGIN
    INSERT INTO dbo.ClientDefinedRuleLogicItem
        ( ClientDefinedRuleLogicItemDescription,ClientDefinedRuleBusinessEntityId,ClientDefinedRuleRelationalOperatorId,ClientDefinedRuleLogicItemValue,CreationTimestamp,CreationUserIdentifier,LastUpdateTimeStamp,LastUpdateUserIdentifier,VersionNumber)
    VALUES
        ( @CDRGRoupName, @bid, @IS, @CFA, @CreationTimestamp, @CreationUserIdentifier, @CreationTimestamp, @CreationUserIdentifier, 1);
    SET @logicitemid = SCOPE_IDENTITY()
END

    INSERT INTO dbo.ClientDefinedRuleGroupLogic
    (ClientDefinedRuleLogicItemId, ClientDefinedRuleGroupId, LogicSequenceNumber, CreationTimestamp,CreationUserIdentifier,LastUpdateTimeStamp,LastUpdateUserIdentifier,VersionNumber)
SELECT @logicitemid, @CDRGId, isnull(MAx(LogicSequenceNumber),0) + 1 , @CreationTimestamp, @CreationUserIdentifier, @CreationTimestamp, @CreationUserIdentifier, 1
FROM ClientDefinedRuleGroupLogic
where ClientDefinedRuleGroupId = @CDRGId;


--ClientDefinedRuleResultItem
--SET @bid=null; 
--SELECT @bid=ClientDefinedRuleBusinessEntityID
--FROM ClientDefinedRuleBusinessEntity
--WHERE BusinessEntityName='UI_SEND_ITIN_ALLOWED_EMAIL_ENTRY'; 

DECLARE  @bid2 int 
SELECT @bid2= ClientDefinedRuleBusinessEntityID
FROM ClientDefinedRuleBusinessEntity
WHERE BusinessEntityName='UI_DISPLAY_CONTAINER'; 

DECLARE  @bid3 int 
SELECT @bid3= ClientDefinedRuleBusinessEntityID
FROM ClientDefinedRuleBusinessEntity
WHERE BusinessEntityName='UI_ADD_CONTROL'; 


DECLARE  @bid4 as int = (select ClientDefinedRuleBusinessEntityID
FROM ClientDefinedRuleBusinessEntity
WHERE BusinessEntityName='PNR_ADD_Remark'); 

DECLARE  @bid5 as int = (select ClientDefinedRuleBusinessEntityID
FROM ClientDefinedRuleBusinessEntity
WHERE BusinessEntityName='PNR_DELETE_Remark'); 

DECLARE  @bid6 as int = (select ClientDefinedRuleBusinessEntityID
FROM ClientDefinedRuleBusinessEntity
WHERE BusinessEntityName='PNR_ADD_REMARKS_FIRST_TST'); 

DECLARE  @bid7 as int = (select ClientDefinedRuleBusinessEntityID
FROM ClientDefinedRuleBusinessEntity
WHERE BusinessEntityName='PNR_ADD_REMARKS_PER_TST_FIRST_NOT_INCLUDED'); 
 
    INSERT INTO dbo.ClientDefinedRuleResultItem
    ( ClientDefinedRuleResultItemDescription,ClientDefinedRuleBusinessEntityId,ClientDefinedRuleResultItemValue,CreationTimestamp,CreationUserIdentifier,LastUpdateTimeStamp,LastUpdateUserIdentifier,VersionNumber)
VALUES

    ( @CDRGRoupName, @bid2, 'REPORTING', @CreationTimestamp, @CreationUserIdentifier, @CreationTimestamp, @CreationUserIdentifier, 1),
    ( @CDRGRoupName, @bid3, '{"type":"text","label":"Airline Code","name":"airlineCode_[TSTSEGMENT]","required":"true","maxlength":"2","minlength":"2","valuetype":"AlphaMask","conditions":[{"controlName":"[UI_DEFAULT_TSTSEGMENTTYPE]","logic":"NOT_IN","value":"AIR","result":"XX"}]}', @CreationTimestamp, @CreationUserIdentifier, @CreationTimestamp, @CreationUserIdentifier, 1),
	( @CDRGRoupName, @bid6, 'RM* U3/-[UI_FORM_airlineCode_TSTSEGMENT]', @CreationTimestamp, @CreationUserIdentifier, @CreationTimestamp, @CreationUserIdentifier, 1),
	( @CDRGRoupName, @bid7, 'RMT TKT[TSTNumber]-U3/-[UI_FORM_airlineCode_TSTSEGMENT]', @CreationTimestamp, @CreationUserIdentifier, @CreationTimestamp, @CreationUserIdentifier, 1),
	( @CDRGRoupName, @bid5, 'U3/-', @CreationTimestamp, @CreationUserIdentifier, @CreationTimestamp, @CreationUserIdentifier, 1)
    

SET @resultitemid = SCOPE_IDENTITY() - 5; -- count of records


    INSERT INTO dbo.ClientDefinedRuleGroupResult
    (ClientDefinedRuleResultItemId, ClientDefinedRuleGroupId, CreationTimestamp,CreationUserIdentifier,LastUpdateTimeStamp,LastUpdateUserIdentifier,VersionNumber)
values
    (@resultitemid + 1, @CDRGId, @CreationTimestamp, @CreationUserIdentifier, @CreationTimestamp, @CreationUserIdentifier, 1),
    (@resultitemid + 2, @CDRGId, @CreationTimestamp, @CreationUserIdentifier, @CreationTimestamp, @CreationUserIdentifier, 1),
    (@resultitemid + 3, @CDRGId, @CreationTimestamp, @CreationUserIdentifier, @CreationTimestamp, @CreationUserIdentifier, 1),
	(@resultitemid + 4, @CDRGId, @CreationTimestamp, @CreationUserIdentifier, @CreationTimestamp, @CreationUserIdentifier, 1),
	(@resultitemid + 5, @CDRGId, @CreationTimestamp, @CreationUserIdentifier, @CreationTimestamp, @CreationUserIdentifier, 1)
	

INSERT INTO ClientDefinedRuleGroupClientSubUnit
    (ClientDefinedRuleGroupId, ClientSubUnitGuid, CreationTimestamp,CreationUserIdentifier,LastUpdateTimeStamp,LastUpdateUserIdentifier,VersionNumber)
VALUES( @CDRGId, '14:36E50F', @CreationTimestamp, @CreationUserIdentifier, @CreationTimestamp, @CreationUserIdentifier, 1),
      ( @CDRGId, '14:3A7532', @CreationTimestamp, @CreationUserIdentifier, @CreationTimestamp, @CreationUserIdentifier, 1)

-- Select * from ClientDefinedRuleResultItem where CreationUserIdentifier = @CreationUserIdentifier 
-- Select * from ClientDefinedRuleGroupResult where CreationUserIdentifier = @CreationUserIdentifier 
SELECT @CDRGID, @CDRGRoupName , @resultitemid

COMMIT TRAN
END TRY
BEGIN CATCH
ROLLBACK TRAN
DECLARE @ErrorMessage NVARCHAR(4000);
SELECT @ErrorMessage=ERROR_MESSAGE()
RAISERROR(@ErrorMessage, 10, 1);
END CATCH




BEGIN TRAN
BEGIN TRY
DECLARE @CreationUserIdentifier nvarchar(200)
DECLARE @CreationTimestamp DATETIME = GETUTCDATE()
DECLARE @ClientSubUnitGuid as varchar(50)
DECLARE @ClientAccountGuid as varchar(50)
DECLARE @ClientTopUnitGuid as  varchar(50)
DECLARE @TravellerTypeGuid as varchar(50)
DECLARE @SourceSystemCode as varchar(50)
DECLARE @NextGroupSequenceNumber as int
DECLARE @CDRGroupName  as varchar(300)
DECLARE @CDRGId as int
DECLARE @WFId_WS_NB as int
DECLARE @WFId_WS_AB as int
DECLARE @WFId_RB_NB as int
DECLARE @WFId_RB_AB as int
DECLARE @WFId_DY_NB as int
DECLARE @WFId_DY_AB as int
DECLARE @WFId_WFPR_NB as int
DECLARE @WFId_WFP_NB as int
declare @WFId_WFUPR_NB as int
declare @WFId_WFUP_NB as int 
DECLARE @AnyTripType as int
DECLARE @bid AS int
DECLARE @logicitemid AS int
DECLARE @resultitemid AS int
declare @shouldmaplogic as bit
declare @shouldmapresult as bit
Declare @WFId_RBPR_NB as int
Declare @WFId_RBP_NB as int
Declare @WFId_RBPR_AB as int
Declare @WFId_RBP_AB as int
DECLARE @WFId_WFPR_AB as int
DECLARE @WFId_WFP_AB as int
DECLARE @CORP_LOAD_FULLWRAP as int

DECLARE @IS AS int
declare @ISNOT as int
declare @CONTAINS as int
declare @NOTCONTAINS as int
DECLARE @CFA as varchar(5) = 'NZ7'

set @CreationUserIdentifier = 'Amadeus CA Migration  ' + @CFA +  ' - US15251'
set @CDRGRoupName = 'Amadeus CA Migration - ' + @CFA +  ' Rule 1'

set @ClientSubUnitGuid = 'A:FA177'
set @TravellerTypeGuid = ''
set @ClientAccountGuid=''
set @SourceSystemCode = 'CA1'
set @ClientTopUnitGuid = ''
SELECT @NextGroupSequenceNumber =1 --- isnull(max(GroupSequenceNumber)+1,1) FROM ClientDefinedRuleGroup WHERE CreationUserIdentifier = @CreationUserIdentifier



---- ROLLBACK
DELETE FROM ClientDefinedRuleGroupResult where CreationUserIdentifier= @CreationUserIdentifier
DELETE FROM ClientDefinedRuleResultItem where CreationUserIdentifier= @CreationUserIdentifier
DELETE FROM ClientDefinedRuleGroupLogic where CreationUserIdentifier= @CreationUserIdentifier
DELETE FROM ClientDefinedRuleLogicItem where CreationUserIdentifier= @CreationUserIdentifier
DELETE FROM ClientDefinedRuleGroupTrigger where CreationUserIdentifier= @CreationUserIdentifier
DELETE FROM ClientDefinedRuleGroupClientSubUnit where CreationUserIdentifier= @CreationUserIdentifier
DELETE FROM ClientDefinedRuleGroup where CreationUserIdentifier= @CreationUserIdentifier




--dbo.ClientDefinedRuleGroup
INSERT INTO ClientDefinedRuleGroup
    ( TripTypeId,ClientDefinedRuleGroupName,CreationTimeStamp,CreationUserIdentifier,LastUpdateTimeStamp,LastUpdateUserIdentifier,VersionNumber,ClientDefinedRuleGroupDescription,EnabledFlag,EnabledDate,ExpiryDate,DeletedFlag,DeletedDateTime,Category)
VALUES
    ( null, @CDRGRoupName, @CreationTimestamp, @CreationUserIdentifier, @CreationTimestamp, @CreationUserIdentifier, 1, @CDRGRoupName, 1, '01/01/2016', null, 0, null, null)


SELECT @CDRGId=ClientDefinedRuleGroupID
FROM dbo.ClientDefinedRuleGroup
WHERE ClientDefinedRuleGroupName = @CDRGRoupName
SELECT @CORP_LOAD_FULLWRAP= ClientDefinedRuleWorkflowTriggerID
FROM ClientDefinedRuleWorkflowTrigger
 wt INNER JOIN
    (SELECT ClientDefinedRuleWorkflowTriggerStateID, ClientDefinedRuleWorkflowTriggerStateName, ClientDefinedRuleWorkflowTriggerApplicationModeID, ClientDefinedRuleWorkflowTriggerApplicationModeName
    from ClientDefinedRuleWorkflowTriggerState
  CROSS JOIN  ClientDefinedRuleWorkflowTriggerApplicationMode) wt2
    ON wt.ClientDefinedRuleWorkflowTriggerStateID = wt2.ClientDefinedRuleWorkflowTriggerStateID
        AND wt.ClientDefinedRuleWorkflowTriggerApplicationModeID = wt2.ClientDefinedRuleWorkflowTriggerApplicationModeID
WHERE wt2.ClientDefinedRuleWorkflowTriggerStateName='CORPLoadPnr' AND
    wt2.ClientDefinedRuleWorkflowTriggerApplicationModeName='CORPFullWrap'

SELECT @IS = ClientDefinedRuleRelationalOperatorid
FROM ClientDefinedRuleRelationalOperator
where RelationalOperatorName = 'IS'
SELECT @ISNOT = ClientDefinedRuleRelationalOperatorid
FROM ClientDefinedRuleRelationalOperator
where RelationalOperatorName = 'IS NOT'
SELECT @CONTAINS = ClientDefinedRuleRelationalOperatorid
FROM ClientDefinedRuleRelationalOperator
where RelationalOperatorName = 'CONTAINS'
SELECT @NOTCONTAINS = ClientDefinedRuleRelationalOperatorid
FROM ClientDefinedRuleRelationalOperator
where RelationalOperatorName = 'NOT CONTAINS'


--ClientDefinedRuleGroupTrigger
INSERT INTO dbo.ClientDefinedRuleGroupTrigger
    ( ClientDefinedRuleGroupId,ClientDefinedRuleWorkflowTriggerId,CreationTimestamp,CreationUserIdentifier,LastUpdateTimeStamp,LastUpdateUserIdentifier,VersionNumber)
VALUES
    ( @CDRGId, @CORP_LOAD_FULLWRAP, @CreationTimestamp, @CreationUserIdentifier, @CreationTimestamp, @CreationUserIdentifier, 1)

--ClientDefinedRuleLogicItem
SET @bid=null; 
SELECT @bid=ClientDefinedRuleBusinessEntityID
FROM ClientDefinedRuleBusinessEntity
WHERE BusinessEntityName='PNR_CF';  SET @logicitemid = null; 

SELECT @logicitemid = ClientDefinedRuleLogicItemid
FROM ClientDefinedRuleLogicItem
WHERE ClientDefinedRuleBusinessEntityId = @bid and ClientDefinedRuleRelationalOperatorId = @IS
    and ClientDefinedRuleLogicItemValue = @CFA;

IF (isnull(@logicitemid,0) = 0 )  
BEGIN
    INSERT INTO dbo.ClientDefinedRuleLogicItem
        ( ClientDefinedRuleLogicItemDescription,ClientDefinedRuleBusinessEntityId,ClientDefinedRuleRelationalOperatorId,ClientDefinedRuleLogicItemValue,CreationTimestamp,CreationUserIdentifier,LastUpdateTimeStamp,LastUpdateUserIdentifier,VersionNumber)
    VALUES
        ( @CDRGRoupName, @bid, @IS, @CFA, @CreationTimestamp, @CreationUserIdentifier, @CreationTimestamp, @CreationUserIdentifier, 1);
    SET @logicitemid = SCOPE_IDENTITY()
END

    INSERT INTO dbo.ClientDefinedRuleGroupLogic
    (ClientDefinedRuleLogicItemId, ClientDefinedRuleGroupId, LogicSequenceNumber, CreationTimestamp,CreationUserIdentifier,LastUpdateTimeStamp,LastUpdateUserIdentifier,VersionNumber)
SELECT @logicitemid, @CDRGId, isnull(MAx(LogicSequenceNumber),0) + 1 , @CreationTimestamp, @CreationUserIdentifier, @CreationTimestamp, @CreationUserIdentifier, 1
FROM ClientDefinedRuleGroupLogic
where ClientDefinedRuleGroupId = @CDRGId;


--ClientDefinedRuleResultItem
--SET @bid=null; 
--SELECT @bid=ClientDefinedRuleBusinessEntityID
--FROM ClientDefinedRuleBusinessEntity
--WHERE BusinessEntityName='UI_SEND_ITIN_ALLOWED_EMAIL_ENTRY'; 

DECLARE  @bid2 int 
SELECT @bid2= ClientDefinedRuleBusinessEntityID
FROM ClientDefinedRuleBusinessEntity
WHERE BusinessEntityName='UI_DISPLAY_CONTAINER'; 

DECLARE  @bid3 int 
SELECT @bid3= ClientDefinedRuleBusinessEntityID
FROM ClientDefinedRuleBusinessEntity
WHERE BusinessEntityName='UI_ADD_CONTROL'; 


DECLARE  @bid4 as int = (select ClientDefinedRuleBusinessEntityID
FROM ClientDefinedRuleBusinessEntity
WHERE BusinessEntityName='PNR_ADD_Remark'); 

DECLARE  @bid5 as int = (select ClientDefinedRuleBusinessEntityID
FROM ClientDefinedRuleBusinessEntity
WHERE BusinessEntityName='PNR_DELETE_Remark'); 

DECLARE  @bid6 as int = (select ClientDefinedRuleBusinessEntityID
FROM ClientDefinedRuleBusinessEntity
WHERE BusinessEntityName='PNR_ADD_REMARKS_FIRST_TST'); 

DECLARE  @bid7 as int = (select ClientDefinedRuleBusinessEntityID
FROM ClientDefinedRuleBusinessEntity
WHERE BusinessEntityName='PNR_ADD_REMARKS_PER_TST_FIRST_NOT_INCLUDED'); 
 
 
    INSERT INTO dbo.ClientDefinedRuleResultItem
    ( ClientDefinedRuleResultItemDescription,ClientDefinedRuleBusinessEntityId,ClientDefinedRuleResultItemValue,CreationTimestamp,CreationUserIdentifier,LastUpdateTimeStamp,LastUpdateUserIdentifier,VersionNumber)
VALUES

    ( @CDRGRoupName, @bid2, 'REPORTING', @CreationTimestamp, @CreationUserIdentifier, @CreationTimestamp, @CreationUserIdentifier, 1),
    ( @CDRGRoupName, @bid3, '{"type":"text","label":"YUP Fare","name":"yupFare_[TSTSEGMENT]","required":"false","valuetype":"AmountMask"}', @CreationTimestamp, @CreationUserIdentifier, @CreationTimestamp, @CreationUserIdentifier, 1),
	( @CDRGRoupName, @bid6, 'RM* U3/-[UI_FORM_yupFare_TSTSEGMENT]', @CreationTimestamp, @CreationUserIdentifier, @CreationTimestamp, @CreationUserIdentifier, 1),
	( @CDRGRoupName, @bid7, 'RMT TKT[TSTNumber]-U3/-[UI_FORM_yupFare_TSTSEGMENT]', @CreationTimestamp, @CreationUserIdentifier, @CreationTimestamp, @CreationUserIdentifier, 1),
	( @CDRGRoupName, @bid5, 'U3/-', @CreationTimestamp, @CreationUserIdentifier, @CreationTimestamp, @CreationUserIdentifier, 1)
    

SET @resultitemid = SCOPE_IDENTITY() - 5; -- count of records


    INSERT INTO dbo.ClientDefinedRuleGroupResult
    (ClientDefinedRuleResultItemId, ClientDefinedRuleGroupId, CreationTimestamp,CreationUserIdentifier,LastUpdateTimeStamp,LastUpdateUserIdentifier,VersionNumber)
values
    (@resultitemid + 1, @CDRGId, @CreationTimestamp, @CreationUserIdentifier, @CreationTimestamp, @CreationUserIdentifier, 1),
    (@resultitemid + 2, @CDRGId, @CreationTimestamp, @CreationUserIdentifier, @CreationTimestamp, @CreationUserIdentifier, 1),
    (@resultitemid + 3, @CDRGId, @CreationTimestamp, @CreationUserIdentifier, @CreationTimestamp, @CreationUserIdentifier, 1),
	(@resultitemid + 4, @CDRGId, @CreationTimestamp, @CreationUserIdentifier, @CreationTimestamp, @CreationUserIdentifier, 1),
	(@resultitemid + 5, @CDRGId, @CreationTimestamp, @CreationUserIdentifier, @CreationTimestamp, @CreationUserIdentifier, 1)
	

INSERT INTO ClientDefinedRuleGroupClientSubUnit
    (ClientDefinedRuleGroupId, ClientSubUnitGuid, CreationTimestamp,CreationUserIdentifier,LastUpdateTimeStamp,LastUpdateUserIdentifier,VersionNumber)
VALUES( @CDRGId, '14:36E50F', @CreationTimestamp, @CreationUserIdentifier, @CreationTimestamp, @CreationUserIdentifier, 1),
      ( @CDRGId, '14:3A7532', @CreationTimestamp, @CreationUserIdentifier, @CreationTimestamp, @CreationUserIdentifier, 1)

-- Select * from ClientDefinedRuleResultItem where CreationUserIdentifier = @CreationUserIdentifier 
-- Select * from ClientDefinedRuleGroupResult where CreationUserIdentifier = @CreationUserIdentifier 
SELECT @CDRGID, @CDRGRoupName , @resultitemid

COMMIT TRAN
END TRY
BEGIN CATCH
ROLLBACK TRAN
DECLARE @ErrorMessage NVARCHAR(4000);
SELECT @ErrorMessage=ERROR_MESSAGE()
RAISERROR(@ErrorMessage, 10, 1);
END CATCH



BEGIN TRAN
BEGIN TRY
DECLARE @CreationUserIdentifier nvarchar(200)
DECLARE @CreationTimestamp DATETIME = GETUTCDATE()
DECLARE @ClientSubUnitGuid as varchar(50)
DECLARE @ClientAccountGuid as varchar(50)
DECLARE @ClientTopUnitGuid as  varchar(50)
DECLARE @TravellerTypeGuid as varchar(50)
DECLARE @SourceSystemCode as varchar(50)
DECLARE @NextGroupSequenceNumber as int
DECLARE @CDRGroupName  as varchar(300)
DECLARE @CDRGId as int
DECLARE @WFId_WS_NB as int
DECLARE @WFId_WS_AB as int
DECLARE @WFId_RB_NB as int
DECLARE @WFId_RB_AB as int
DECLARE @WFId_DY_NB as int
DECLARE @WFId_DY_AB as int
DECLARE @WFId_WFPR_NB as int
DECLARE @WFId_WFP_NB as int
declare @WFId_WFUPR_NB as int
declare @WFId_WFUP_NB as int 
DECLARE @AnyTripType as int
DECLARE @bid AS int
DECLARE @logicitemid AS int
DECLARE @resultitemid AS int
declare @shouldmaplogic as bit
declare @shouldmapresult as bit
Declare @WFId_RBPR_NB as int
Declare @WFId_RBP_NB as int
Declare @WFId_RBPR_AB as int
Declare @WFId_RBP_AB as int
DECLARE @WFId_WFPR_AB as int
DECLARE @WFId_WFP_AB as int
DECLARE @CORP_LOAD_FULLWRAP as int

DECLARE @IS AS int
declare @ISNOT as int
declare @CONTAINS as int
declare @NOTCONTAINS as int
DECLARE @CFA as varchar(5) = 'EJ5'

set @CreationUserIdentifier = 'Amadeus CA Migration  ' + @CFA +  ' - US15251'
set @CDRGRoupName = 'Amadeus CA Migration - ' + @CFA +  ' Rule 1'

set @ClientSubUnitGuid = 'A:FA177'
set @TravellerTypeGuid = ''
set @ClientAccountGuid=''
set @SourceSystemCode = 'CA1'
set @ClientTopUnitGuid = ''
SELECT @NextGroupSequenceNumber =1 --- isnull(max(GroupSequenceNumber)+1,1) FROM ClientDefinedRuleGroup WHERE CreationUserIdentifier = @CreationUserIdentifier



---- ROLLBACK
DELETE FROM ClientDefinedRuleGroupResult where CreationUserIdentifier= @CreationUserIdentifier
DELETE FROM ClientDefinedRuleResultItem where CreationUserIdentifier= @CreationUserIdentifier
DELETE FROM ClientDefinedRuleGroupLogic where CreationUserIdentifier= @CreationUserIdentifier
DELETE FROM ClientDefinedRuleLogicItem where CreationUserIdentifier= @CreationUserIdentifier
DELETE FROM ClientDefinedRuleGroupTrigger where CreationUserIdentifier= @CreationUserIdentifier
DELETE FROM ClientDefinedRuleGroupClientSubUnit where CreationUserIdentifier= @CreationUserIdentifier
DELETE FROM ClientDefinedRuleGroup where CreationUserIdentifier= @CreationUserIdentifier




--dbo.ClientDefinedRuleGroup
INSERT INTO ClientDefinedRuleGroup
    ( TripTypeId,ClientDefinedRuleGroupName,CreationTimeStamp,CreationUserIdentifier,LastUpdateTimeStamp,LastUpdateUserIdentifier,VersionNumber,ClientDefinedRuleGroupDescription,EnabledFlag,EnabledDate,ExpiryDate,DeletedFlag,DeletedDateTime,Category)
VALUES
    ( null, @CDRGRoupName, @CreationTimestamp, @CreationUserIdentifier, @CreationTimestamp, @CreationUserIdentifier, 1, @CDRGRoupName, 1, '01/01/2016', null, 0, null, null)


SELECT @CDRGId=ClientDefinedRuleGroupID
FROM dbo.ClientDefinedRuleGroup
WHERE ClientDefinedRuleGroupName = @CDRGRoupName
SELECT @CORP_LOAD_FULLWRAP= ClientDefinedRuleWorkflowTriggerID
FROM ClientDefinedRuleWorkflowTrigger
 wt INNER JOIN
    (SELECT ClientDefinedRuleWorkflowTriggerStateID, ClientDefinedRuleWorkflowTriggerStateName, ClientDefinedRuleWorkflowTriggerApplicationModeID, ClientDefinedRuleWorkflowTriggerApplicationModeName
    from ClientDefinedRuleWorkflowTriggerState
  CROSS JOIN  ClientDefinedRuleWorkflowTriggerApplicationMode) wt2
    ON wt.ClientDefinedRuleWorkflowTriggerStateID = wt2.ClientDefinedRuleWorkflowTriggerStateID
        AND wt.ClientDefinedRuleWorkflowTriggerApplicationModeID = wt2.ClientDefinedRuleWorkflowTriggerApplicationModeID
WHERE wt2.ClientDefinedRuleWorkflowTriggerStateName='CORPLoadPnr' AND
    wt2.ClientDefinedRuleWorkflowTriggerApplicationModeName='CORPFullWrap'

SELECT @IS = ClientDefinedRuleRelationalOperatorid
FROM ClientDefinedRuleRelationalOperator
where RelationalOperatorName = 'IS'
SELECT @ISNOT = ClientDefinedRuleRelationalOperatorid
FROM ClientDefinedRuleRelationalOperator
where RelationalOperatorName = 'IS NOT'
SELECT @CONTAINS = ClientDefinedRuleRelationalOperatorid
FROM ClientDefinedRuleRelationalOperator
where RelationalOperatorName = 'CONTAINS'
SELECT @NOTCONTAINS = ClientDefinedRuleRelationalOperatorid
FROM ClientDefinedRuleRelationalOperator
where RelationalOperatorName = 'NOT CONTAINS'


--ClientDefinedRuleGroupTrigger
INSERT INTO dbo.ClientDefinedRuleGroupTrigger
    ( ClientDefinedRuleGroupId,ClientDefinedRuleWorkflowTriggerId,CreationTimestamp,CreationUserIdentifier,LastUpdateTimeStamp,LastUpdateUserIdentifier,VersionNumber)
VALUES
    ( @CDRGId, @CORP_LOAD_FULLWRAP, @CreationTimestamp, @CreationUserIdentifier, @CreationTimestamp, @CreationUserIdentifier, 1)

--ClientDefinedRuleLogicItem
SET @bid=null; 
SELECT @bid=ClientDefinedRuleBusinessEntityID
FROM ClientDefinedRuleBusinessEntity
WHERE BusinessEntityName='PNR_CF';  SET @logicitemid = null; 

SELECT @logicitemid = ClientDefinedRuleLogicItemid
FROM ClientDefinedRuleLogicItem
WHERE ClientDefinedRuleBusinessEntityId = @bid and ClientDefinedRuleRelationalOperatorId = @IS
    and ClientDefinedRuleLogicItemValue = @CFA;

IF (isnull(@logicitemid,0) = 0 )  
BEGIN
    INSERT INTO dbo.ClientDefinedRuleLogicItem
        ( ClientDefinedRuleLogicItemDescription,ClientDefinedRuleBusinessEntityId,ClientDefinedRuleRelationalOperatorId,ClientDefinedRuleLogicItemValue,CreationTimestamp,CreationUserIdentifier,LastUpdateTimeStamp,LastUpdateUserIdentifier,VersionNumber)
    VALUES
        ( @CDRGRoupName, @bid, @IS, @CFA, @CreationTimestamp, @CreationUserIdentifier, @CreationTimestamp, @CreationUserIdentifier, 1);
    SET @logicitemid = SCOPE_IDENTITY()
END

    INSERT INTO dbo.ClientDefinedRuleGroupLogic
    (ClientDefinedRuleLogicItemId, ClientDefinedRuleGroupId, LogicSequenceNumber, CreationTimestamp,CreationUserIdentifier,LastUpdateTimeStamp,LastUpdateUserIdentifier,VersionNumber)
SELECT @logicitemid, @CDRGId, isnull(MAx(LogicSequenceNumber),0) + 1 , @CreationTimestamp, @CreationUserIdentifier, @CreationTimestamp, @CreationUserIdentifier, 1
FROM ClientDefinedRuleGroupLogic
where ClientDefinedRuleGroupId = @CDRGId;


--ClientDefinedRuleResultItem
--SET @bid=null; 
--SELECT @bid=ClientDefinedRuleBusinessEntityID
--FROM ClientDefinedRuleBusinessEntity
--WHERE BusinessEntityName='UI_SEND_ITIN_ALLOWED_EMAIL_ENTRY'; 

DECLARE  @bid2 int 
SELECT @bid2= ClientDefinedRuleBusinessEntityID
FROM ClientDefinedRuleBusinessEntity
WHERE BusinessEntityName='UI_DISPLAY_CONTAINER'; 

DECLARE  @bid3 int 
SELECT @bid3= ClientDefinedRuleBusinessEntityID
FROM ClientDefinedRuleBusinessEntity
WHERE BusinessEntityName='UI_ADD_CONTROL'; 


DECLARE  @bid4 as int = (select ClientDefinedRuleBusinessEntityID
FROM ClientDefinedRuleBusinessEntity
WHERE BusinessEntityName='PNR_ADD_Remark'); 

DECLARE  @bid5 as int = (select ClientDefinedRuleBusinessEntityID
FROM ClientDefinedRuleBusinessEntity
WHERE BusinessEntityName='PNR_DELETE_Remark'); 

DECLARE  @bid6 as int = (select ClientDefinedRuleBusinessEntityID
FROM ClientDefinedRuleBusinessEntity
WHERE BusinessEntityName='PNR_ADD_REMARKS_FIRST_TST'); 

DECLARE  @bid7 as int = (select ClientDefinedRuleBusinessEntityID
FROM ClientDefinedRuleBusinessEntity
WHERE BusinessEntityName='PNR_ADD_REMARKS_PER_TST_FIRST_NOT_INCLUDED'); 
 
    INSERT INTO dbo.ClientDefinedRuleResultItem
    ( ClientDefinedRuleResultItemDescription,ClientDefinedRuleBusinessEntityId,ClientDefinedRuleResultItemValue,CreationTimestamp,CreationUserIdentifier,LastUpdateTimeStamp,LastUpdateUserIdentifier,VersionNumber)
VALUES

    ( @CDRGRoupName, @bid2, 'REPORTING', @CreationTimestamp, @CreationUserIdentifier, @CreationTimestamp, @CreationUserIdentifier, 1),
    ( @CDRGRoupName, @bid3, '{"type":"text","label":"Coach Fare if Premium Fare Booked","name":"coachFare_[TSTSEGMENT]","required":"false","valuetype":"AmountMask"}', @CreationTimestamp, @CreationUserIdentifier, @CreationTimestamp, @CreationUserIdentifier, 1),
	( @CDRGRoupName, @bid6, 'RM* U17/-[UI_FORM_coachFare_TSTSEGMENT]', @CreationTimestamp, @CreationUserIdentifier, @CreationTimestamp, @CreationUserIdentifier, 1),
	( @CDRGRoupName, @bid7, 'RMT TKT[TSTNumber]-U17/-[UI_FORM_coachFare_TSTSEGMENT]', @CreationTimestamp, @CreationUserIdentifier, @CreationTimestamp, @CreationUserIdentifier, 1),
	( @CDRGRoupName, @bid5, 'U17/-', @CreationTimestamp, @CreationUserIdentifier, @CreationTimestamp, @CreationUserIdentifier, 1)
    

SET @resultitemid = SCOPE_IDENTITY() - 5; -- count of records


    INSERT INTO dbo.ClientDefinedRuleGroupResult
    (ClientDefinedRuleResultItemId, ClientDefinedRuleGroupId, CreationTimestamp,CreationUserIdentifier,LastUpdateTimeStamp,LastUpdateUserIdentifier,VersionNumber)
values
    (@resultitemid + 1, @CDRGId, @CreationTimestamp, @CreationUserIdentifier, @CreationTimestamp, @CreationUserIdentifier, 1),
    (@resultitemid + 2, @CDRGId, @CreationTimestamp, @CreationUserIdentifier, @CreationTimestamp, @CreationUserIdentifier, 1),
    (@resultitemid + 3, @CDRGId, @CreationTimestamp, @CreationUserIdentifier, @CreationTimestamp, @CreationUserIdentifier, 1),
	(@resultitemid + 4, @CDRGId, @CreationTimestamp, @CreationUserIdentifier, @CreationTimestamp, @CreationUserIdentifier, 1),
	(@resultitemid + 5, @CDRGId, @CreationTimestamp, @CreationUserIdentifier, @CreationTimestamp, @CreationUserIdentifier, 1)
	

INSERT INTO ClientDefinedRuleGroupClientSubUnit
    (ClientDefinedRuleGroupId, ClientSubUnitGuid, CreationTimestamp,CreationUserIdentifier,LastUpdateTimeStamp,LastUpdateUserIdentifier,VersionNumber)
VALUES( @CDRGId, '14:36E50F', @CreationTimestamp, @CreationUserIdentifier, @CreationTimestamp, @CreationUserIdentifier, 1),
      ( @CDRGId, '14:3A7532', @CreationTimestamp, @CreationUserIdentifier, @CreationTimestamp, @CreationUserIdentifier, 1)

-- Select * from ClientDefinedRuleResultItem where CreationUserIdentifier = @CreationUserIdentifier 
-- Select * from ClientDefinedRuleGroupResult where CreationUserIdentifier = @CreationUserIdentifier 
SELECT @CDRGID, @CDRGRoupName , @resultitemid

COMMIT TRAN
END TRY
BEGIN CATCH
ROLLBACK TRAN
DECLARE @ErrorMessage NVARCHAR(4000);
SELECT @ErrorMessage=ERROR_MESSAGE()
RAISERROR(@ErrorMessage, 10, 1);
END CATCH
















