
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
DECLARE @bid0 as INT
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
DECLARE @CFA as varchar(30) = 'QR2'

set @CreationUserIdentifier = 'Amadeus CA Migration  ' + @CFA +  ' - US15241'
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

SET @bid0=null; 
SELECT @bid0=ClientDefinedRuleBusinessEntityID
FROM ClientDefinedRuleBusinessEntity
WHERE BusinessEntityName='PNR_UDID50';  SET @logicitemid = null; 

SELECT @logicitemid = ClientDefinedRuleLogicItemid
FROM ClientDefinedRuleLogicItem
WHERE ClientDefinedRuleBusinessEntityId = @bid and ClientDefinedRuleRelationalOperatorId = @IN
    and ClientDefinedRuleLogicItemValue = @CFA;


    INSERT INTO dbo.ClientDefinedRuleLogicItem
    ( ClientDefinedRuleLogicItemDescription,ClientDefinedRuleBusinessEntityId,ClientDefinedRuleRelationalOperatorId,ClientDefinedRuleLogicItemValue,CreationTimestamp,CreationUserIdentifier,LastUpdateTimeStamp,LastUpdateUserIdentifier,VersionNumber)
VALUES
    ( @CDRGRoupName, @bid, @IN, @CFA, @CreationTimestamp, @CreationUserIdentifier, @CreationTimestamp, @CreationUserIdentifier, 1),
    ( @CDRGRoupName, @bid0, @IS, 'GUEST', @CreationTimestamp, @CreationUserIdentifier, @CreationTimestamp, @CreationUserIdentifier, 1);

    SET @logicitemid = SCOPE_IDENTITY() -2



    INSERT INTO dbo.ClientDefinedRuleGroupLogic
    (ClientDefinedRuleLogicItemId, ClientDefinedRuleGroupId, LogicSequenceNumber, CreationTimestamp,CreationUserIdentifier,LastUpdateTimeStamp,LastUpdateUserIdentifier,VersionNumber)
values
    (@logicitemid + 1, @CDRGId, 1 , @CreationTimestamp, @CreationUserIdentifier, @CreationTimestamp, @CreationUserIdentifier, 1),
    (@logicitemid + 2, @CDRGId, 1 , @CreationTimestamp, @CreationUserIdentifier, @CreationTimestamp, @CreationUserIdentifier, 1)

--     INSERT INTO dbo.ClientDefinedRuleGroupLogic
--     (ClientDefinedRuleLogicItemId, ClientDefinedRuleGroupId, LogicSequenceNumber, CreationTimestamp,CreationUserIdentifier,LastUpdateTimeStamp,LastUpdateUserIdentifier,VersionNumber)
-- SELECT @logicitemid, @CDRGId, isnull(MAx(LogicSequenceNumber),0) + 1 , @CreationTimestamp, @CreationUserIdentifier, @CreationTimestamp, @CreationUserIdentifier, 1
-- FROM ClientDefinedRuleGroupLogic
-- where ClientDefinedRuleGroupId = @CDRGId;


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
    ( @CDRGRoupName, @bid3, '{ "type": "text", "label": "Guest Sponsor Name", "name": "guestSponsorName", "maxLength": "35", "required": "false" }', @CreationTimestamp, @CreationUserIdentifier, @CreationTimestamp, @CreationUserIdentifier, 1),
    ( @CDRGRoupName, @bid3, '{ "type": "select", "label": "Approver Name ", "name": "approverName", "required": "false", "options": [ { "name": "PENDING", "value": "PENDING" }, { "name": "ANTONIO VALENCIA", "value": "ANTONIO VALENCIA" }, { "name": "AZIZ AGHILI", "value": "AZIZ AGHILI" }, { "name": "CHRISTOPHE DOMINIAK", "value": "CHRISTOPHE DOMINIAK" }, { "name": "CRAIG PRICE", "value": "CRAIG PRICE" }, { "name": "DOUG LIEDBERG", "value": "DOUG LIEDBERG" }, { "name": "DWAYNE MATTHEWS", "value": "DWAYNE MATTHEWS" }, { "name": "JAMES KASMICKAS", "value": "JAMES KASMICKAS" }, { "name": "JONATHAN COLLINS", "value": "JONATHAN COLLINS" }, { "name": "MARIYA TRICKETT", "value": "MARIYA TRICKETT" }, { "name": "MARK WALLACE", "value": "MARK WALLACE" }, { "name": "MATTHEW FAHNESTOCK", "value": "MATTHEW FAHNESTOCK" }, { "name": "BOB PYLE", "value": "BOB PYLE" }, { "name": "CARL BECKWITH", "value": "CARL BECKWITH" } ] }', @CreationTimestamp, @CreationUserIdentifier, @CreationTimestamp, @CreationUserIdentifier, 1),
    ( @CDRGRoupName, @bid4, 'RM* U6/-[UI_FORM_guestSponsorName]', @CreationTimestamp, @CreationUserIdentifier, @CreationTimestamp, @CreationUserIdentifier, 1),
    ( @CDRGRoupName, @bid4, 'RM* U17/-[UI_FORM_approverName]', @CreationTimestamp, @CreationUserIdentifier, @CreationTimestamp, @CreationUserIdentifier, 1)    


SET @resultitemid = SCOPE_IDENTITY() - 5; -- count of records


    INSERT INTO dbo.ClientDefinedRuleGroupResult
    (ClientDefinedRuleResultItemId, ClientDefinedRuleGroupId, CreationTimestamp,CreationUserIdentifier,LastUpdateTimeStamp,LastUpdateUserIdentifier,VersionNumber)
values
    (@resultitemid + 1, @CDRGId, @CreationTimestamp, @CreationUserIdentifier, @CreationTimestamp, @CreationUserIdentifier, 1),
    (@resultitemid + 2, @CDRGId, @CreationTimestamp, @CreationUserIdentifier, @CreationTimestamp, @CreationUserIdentifier, 1),
    (@resultitemid + 3, @CDRGId, @CreationTimestamp, @CreationUserIdentifier, @CreationTimestamp, @CreationUserIdentifier, 1),
    (@resultitemid + 4, @CDRGId, @CreationTimestamp, @CreationUserIdentifier, @CreationTimestamp, @CreationUserIdentifier, 1),
    (@resultitemid + 5, @CDRGId, @CreationTimestamp, @CreationUserIdentifier, @CreationTimestamp, @CreationUserIdentifier, 1)    
	
IF NOT EXISTS(Select 1
from ClientAccount
where ClientAccountNumber='1' + @CFA)
BEGIN

    INSERT INTO [dbo].[ClientAccount]
        ([ClientAccountNumber],[ClientAccountName],[SourceSystemCode],[GloryAccountName],[ClientMasterCode]
        ,[EffectiveDate],[CountryCode],[LastModifiedTimestamp],[CreationTimestamp],[CreationUserIdentifier],[LastUpdateTimestamp],[LastUpdateUserIdentifier],[VersionNumber],[CFA])
    VALUES
        ('1' + @CFA, 'DANA', 'CA1', 'DANA', 'CA-' + @CFA, '2000-01-01 00:00:00.000', 'CA', @CreationTimeStamp, @CreationTimeStamp, @CreationUserIdentifier, null, null, 1, null)

END

INSERT INTO [ClientDefinedRuleGroupClientAccount]
    (ClientDefinedRuleGroupId, ClientAccountNumber, SourceSystemCode, CreationTimestamp,CreationUserIdentifier,LastUpdateTimeStamp,LastUpdateUserIdentifier,VersionNumber)
VALUES
    (@CDRGId, @CFA, 'CA1', @CreationTimestamp, @CreationUserIdentifier, @CreationTimestamp, @CreationUserIdentifier, 1)



SELECT @CDRGID, @CDRGRoupName , @resultitemid   


COMMIT TRAN
END TRY
BEGIN CATCH
ROLLBACK TRAN
DECLARE @ErrorMessage NVARCHAR(4000);
SELECT @ErrorMessage=ERROR_MESSAGE()
RAISERROR(@ErrorMessage, 10, 1);
END CATCH

GO




