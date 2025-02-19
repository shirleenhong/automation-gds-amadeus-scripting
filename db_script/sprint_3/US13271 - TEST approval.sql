
USE Desktop_TEST
GO

BEGIN TRAN
	BEGIN TRY
	
		---------------------------------------
        -- BEGIN US13271
        ---------------------------------------
		DECLARE @CreationUserIdentifier AS varchar(255)
        DECLARE @CreationTimestamp	AS DATETIME =GETUTCDATE()	
		DECLARE @ApprovalGroupId AS INT
		DECLARE @ApprovalGroupApprovalTypeId AS INT
		DECLARE @ApprovalGroupApprovalTypeItemId AS INT
        
		SET @CreationUserIdentifier     ='Amadeus CA Migration - US13271'
        SET @ApprovalGroupId	=(SELECT MAX(ApprovalGroupId) FROM ApprovalGroup)
		SET @ApprovalGroupApprovalTypeId =(SELECT MAX(ApprovalGroupApprovalTypeId) FROM ApprovalGroupApprovalType)
		SET @ApprovalGroupApprovalTypeItemId =(SELECT MAX(ApprovalGroupApprovalTypeItemId) FROM ApprovalGroupApprovalTypeItem)
              
		-- Rollback
		-- delete from [ApprovalGroupClientSubUnit] where approvalGroupID = 2145 
		DELETE FROM ApprovalGroupClientAccount WHERE CreationUserIdentifier =  @CreationUserIdentifier  
		DELETE FROM ApprovalGroupApprovalTypeItem WHERE CreationUserIdentifier =  @CreationUserIdentifier  
		DELETE FROM ApprovalGroupApprovalType WHERE CreationUserIdentifier =  @CreationUserIdentifier  
		DELETE FROM ApprovalGroup WHERE CreationUserIdentifier =  @CreationUserIdentifier   
        ---- End Rollback
		SET IDENTITY_INSERT [dbo].ApprovalGroup ON;  
        -- Approval
        INSERT INTO ApprovalGroup(ApprovalGroupId, ApprovalGroupName, EnabledFlag, InheritFromParentFlag, DeletedFlag, CreationTimestamp, CreationUserIdentifier, VersionNumber)
		VALUES	(@ApprovalGroupId	+	1	,'Alstom', 1,1,0, @CreationTimestamp, @CreationUserIdentifier,1 ),
				(@ApprovalGroupId	+	2	,'Amcor Tobacco', 1,1,0, @CreationTimestamp, @CreationUserIdentifier,1 ),
				(@ApprovalGroupId	+	3	,'Campbell Soup', 1,1,0, @CreationTimestamp, @CreationUserIdentifier,1 ),
				(@ApprovalGroupId	+	4	,'Lanxess', 1,1,0, @CreationTimestamp, @CreationUserIdentifier,1 ),
				(@ApprovalGroupId	+	5	,'Ribbon', 1,1,0, @CreationTimestamp, @CreationUserIdentifier,1 ),
				(@ApprovalGroupId	+	6	,'Sobey', 1,1,0, @CreationTimestamp, @CreationUserIdentifier,1 ),
				(@ApprovalGroupId	+	7	,'Fujitsu-T3H', 1,1,0, @CreationTimestamp, @CreationUserIdentifier,1 ),
				(@ApprovalGroupId	+	8	,'Imperial Tobacco', 1,1,0, @CreationTimestamp, @CreationUserIdentifier,1 ),
				(@ApprovalGroupId	+	9	,'Canon Canada', 1,1,0, @CreationTimestamp, @CreationUserIdentifier,1 ),
				(@ApprovalGroupId	+	10	,'ClearResult', 1,1,0, @CreationTimestamp, @CreationUserIdentifier,1 ),
				(@ApprovalGroupId	+	11	,'Equifax', 1,1,0, @CreationTimestamp, @CreationUserIdentifier,1 ),
				(@ApprovalGroupId	+	12	,'Gemalto', 1,1,0, @CreationTimestamp, @CreationUserIdentifier,1 ),
				(@ApprovalGroupId	+	13	,'Gilead', 1,1,0, @CreationTimestamp, @CreationUserIdentifier,1 ),
				(@ApprovalGroupId	+	14	,'Glaukos', 1,1,0, @CreationTimestamp, @CreationUserIdentifier,1 ),
				(@ApprovalGroupId	+	15	,'IQVIA (IMS Health)', 1,1,0, @CreationTimestamp, @CreationUserIdentifier,1 ),
				(@ApprovalGroupId	+	16	,'Jaguar Land Rover', 1,1,0, @CreationTimestamp, @CreationUserIdentifier,1 ),
				(@ApprovalGroupId	+	17	,'Kelly Services', 1,1,0, @CreationTimestamp, @CreationUserIdentifier,1 ),
				(@ApprovalGroupId	+	18	,'Lilly', 1,1,0, @CreationTimestamp, @CreationUserIdentifier,1 ),
				(@ApprovalGroupId	+	19	,'Mettler Toledo', 1,1,0, @CreationTimestamp, @CreationUserIdentifier,1 ),
				(@ApprovalGroupId	+	20	,'Perkins Elmer', 1,1,0, @CreationTimestamp, @CreationUserIdentifier,1 ),
				(@ApprovalGroupId	+	21	,'Purdue Pharma', 1,1,0, @CreationTimestamp, @CreationUserIdentifier,1 ),
				(@ApprovalGroupId	+	22	,'Securitas Electronic Security', 1,1,0, @CreationTimestamp, @CreationUserIdentifier,1 ),
				(@ApprovalGroupId	+	23	,'Senvion', 1,1,0, @CreationTimestamp, @CreationUserIdentifier,1 ),
				(@ApprovalGroupId	+	24	,'Sleeman Breweries', 1,1,0, @CreationTimestamp, @CreationUserIdentifier,1 ),
				(@ApprovalGroupId	+	25	,'Taylor Made', 1,1,0, @CreationTimestamp, @CreationUserIdentifier,1 ),
				(@ApprovalGroupId	+	26	,'Trend Mico', 1,1,0, @CreationTimestamp, @CreationUserIdentifier,1 ),
				(@ApprovalGroupId	+	27	,'Under Armour', 1,1,0, @CreationTimestamp, @CreationUserIdentifier,1 ),
				(@ApprovalGroupId	+	28	,'VIAVI Solutions', 1,1,0, @CreationTimestamp, @CreationUserIdentifier,1 ),
				(@ApprovalGroupId	+	29	,'VirtaMove Corp (AppZero)', 1,1,0, @CreationTimestamp, @CreationUserIdentifier,1 ),
				(@ApprovalGroupId	+	30	,'Wolverine', 1,1,0, @CreationTimestamp, @CreationUserIdentifier,1 ),
				(@ApprovalGroupId	+	31	,'Yardi Systems', 1,1,0, @CreationTimestamp, @CreationUserIdentifier,1 ),
				(@ApprovalGroupId	+	32	,'Agilent', 1,1,0, @CreationTimestamp, @CreationUserIdentifier,1 ),
				(@ApprovalGroupId	+	33	,'Societe Generale', 1,1,0, @CreationTimestamp, @CreationUserIdentifier,1 ),
				(@ApprovalGroupId	+	34	,'Linedata', 1,1,0, @CreationTimestamp, @CreationUserIdentifier,1 ),
				(@ApprovalGroupId	+	35	,'Top Aces', 1,1,0, @CreationTimestamp, @CreationUserIdentifier,1 )

		SET IDENTITY_INSERT [dbo].ApprovalGroup OFF;  

		INSERT INTO ApprovalGroupApprovalType(ApprovalGroupApprovalTypeId, ApprovalGroupApprovalTypeDescription, CreationTimestamp, CreationUserIdentifier,VersionNumber)
		VALUES  (@ApprovalGroupApprovalTypeId +	1	,'[SEGMENT_TYPE]=Hotel[Only]'	 ,@CreationTimestamp, @CreationUserIdentifier,1 ),
				(@ApprovalGroupApprovalTypeId +	2	,'[SEGMENT_TYPE]=Car[Only]'	 ,@CreationTimestamp, @CreationUserIdentifier,1 ),
				(@ApprovalGroupApprovalTypeId +	3	,'[REMARKS_EXISTS]=RMG/APPROVAL RECEIVED'	 ,@CreationTimestamp, @CreationUserIdentifier,1 ),
				(@ApprovalGroupApprovalTypeId +	4	,'[ROUTE]=Domestic'	 ,@CreationTimestamp, @CreationUserIdentifier,1 ),
				(@ApprovalGroupApprovalTypeId +	5	,'[ROUTE]=Transborder'	 ,@CreationTimestamp, @CreationUserIdentifier,1 ),
				(@ApprovalGroupApprovalTypeId +	6	,'[DEPARTURE]=14 days'	 ,@CreationTimestamp, @CreationUserIdentifier,1 ),
				(@ApprovalGroupApprovalTypeId +	7	,'[REMARKS_EXISTS]=RM*FS/-L'	 ,@CreationTimestamp, @CreationUserIdentifier,1 ),
				(@ApprovalGroupApprovalTypeId +	8	,'[REMARKS_EXISTS]=RM*FS/-7'	 ,@CreationTimestamp, @CreationUserIdentifier,1 ),
				(@ApprovalGroupApprovalTypeId +	9	,'[ROUTE]=International'	 ,@CreationTimestamp, @CreationUserIdentifier,1 ),
				(@ApprovalGroupApprovalTypeId +	10	,'[DEPARTURE]=21 days'	 ,@CreationTimestamp, @CreationUserIdentifier,1 ),
				(@ApprovalGroupApprovalTypeId +	11	,'[REMARKS_EXISTS]=RM*U13/-'	 ,@CreationTimestamp, @CreationUserIdentifier,1 ),
				(@ApprovalGroupApprovalTypeId +	12	,'[REMARKS_EXISTS]=RMG/ECM APPROVAL-RECEIVED'	 ,@CreationTimestamp, @CreationUserIdentifier,1 ),
				(@ApprovalGroupApprovalTypeId +	13	,'[REMARKS_EXISTS]=RMG/ECM-APPROVAL NOT REQUIRED'	 ,@CreationTimestamp, @CreationUserIdentifier,1 ),
				(@ApprovalGroupApprovalTypeId +	14	,'[REMARKS_EXISTS]=RM*U20/-'	 ,@CreationTimestamp, @CreationUserIdentifier,1 ),
				(@ApprovalGroupApprovalTypeId +	15	,'[SEGMENT_TYPE]=[NO]Hotel'	 ,@CreationTimestamp, @CreationUserIdentifier,1 ),
				(@ApprovalGroupApprovalTypeId +	16	,'[REMARKS_EXISTS]=RMG/TRIP APPROVED BY'	 ,@CreationTimestamp, @CreationUserIdentifier,1 ),
				(@ApprovalGroupApprovalTypeId +	17	,'[REMARKS_EXISTS]=RMG/TRAVEL AUTH BY'	 ,@CreationTimestamp, @CreationUserIdentifier,1 ),
				(@ApprovalGroupApprovalTypeId +	18	,'[REMARKS_EXISTS]=RMG/MOXIE HIGH RISK APPROVAL EMAIL RCVD'	 ,@CreationTimestamp, @CreationUserIdentifier,1 ),
				(@ApprovalGroupApprovalTypeId +	19	,'[REMARKS_EXISTS]=RMG/NO APPROVAL REQUIRED'	 ,@CreationTimestamp, @CreationUserIdentifier,1 ),
				(@ApprovalGroupApprovalTypeId +	20	,'[FOP]=[NOT]AX'	 ,@CreationTimestamp, @CreationUserIdentifier,1 ),
				(@ApprovalGroupApprovalTypeId +	21	,'[FOP]=[LAST_DIGIT]1010'	 ,@CreationTimestamp, @CreationUserIdentifier,1 ),
				(@ApprovalGroupApprovalTypeId +	22	,'[REMARKS_EXISTS]=RMG/BTA APPR RECEIVED exists'	 ,@CreationTimestamp, @CreationUserIdentifier,1 ),
				(@ApprovalGroupApprovalTypeId +	23	,'[REMARKS_EXISTS]=RM*FS/-7[OR]RM*FS/-L'	 ,@CreationTimestamp, @CreationUserIdentifier,1 ),
				(@ApprovalGroupApprovalTypeId +	24	,'[U]=50/BOARD OF DIRECTORS'	 ,@CreationTimestamp, @CreationUserIdentifier,1 ),
				(@ApprovalGroupApprovalTypeId +	25	,'[U]=50/CEO-NORAM'	 ,@CreationTimestamp, @CreationUserIdentifier,1 ),
				(@ApprovalGroupApprovalTypeId +	26	,'[U]=50/CONCIERGE-NORAM-S'	 ,@CreationTimestamp, @CreationUserIdentifier,1 ),
				(@ApprovalGroupApprovalTypeId +	27	,'[U]=50/EXECUTIVE'	 ,@CreationTimestamp, @CreationUserIdentifier,1 ),
				(@ApprovalGroupApprovalTypeId +	28	,'[U]=50/EXECUTIVE ASC-CA'	 ,@CreationTimestamp, @CreationUserIdentifier,1 ),
				(@ApprovalGroupApprovalTypeId +	29	,'[U]=50/EXECUTIVE-CA'	 ,@CreationTimestamp, @CreationUserIdentifier,1 ),
				(@ApprovalGroupApprovalTypeId +	30	,'[U]=50/FAI CEO'	 ,@CreationTimestamp, @CreationUserIdentifier,1 ),
				(@ApprovalGroupApprovalTypeId +	31	,'[U]=50/GENERAL'	 ,@CreationTimestamp, @CreationUserIdentifier,1 ),
				(@ApprovalGroupApprovalTypeId +	32	,'[U]=50/GENERAL-CA'	 ,@CreationTimestamp, @CreationUserIdentifier,1 ),
				(@ApprovalGroupApprovalTypeId +	33	,'[U]=50/GENERAL-CA-S'	 ,@CreationTimestamp, @CreationUserIdentifier,1 ),
				(@ApprovalGroupApprovalTypeId +	34	,'[U]=50/GUEST'	 ,@CreationTimestamp, @CreationUserIdentifier,1 ),
				(@ApprovalGroupApprovalTypeId +	35	,'[U]=50/GUEST-CA'	 ,@CreationTimestamp, @CreationUserIdentifier,1 ),
				(@ApprovalGroupApprovalTypeId +	36	,'[U]=50/GUEST-CA-S'	 ,@CreationTimestamp, @CreationUserIdentifier,1 ),
				(@ApprovalGroupApprovalTypeId +	37	,'[U]=50/GUEST-NORAM'	 ,@CreationTimestamp, @CreationUserIdentifier,1 ),
				(@ApprovalGroupApprovalTypeId +	38	,'[U]=50/MTMS-NORAM'	 ,@CreationTimestamp, @CreationUserIdentifier,1 ),
				(@ApprovalGroupApprovalTypeId +	39	,'[U]=50/NORAM-ASSOCIATE-S'	 ,@CreationTimestamp, @CreationUserIdentifier,1 ),
				(@ApprovalGroupApprovalTypeId +	40	,'[U]=50/PRESIDENT'	 ,@CreationTimestamp, @CreationUserIdentifier,1 ),
				(@ApprovalGroupApprovalTypeId +	41	,'[U]=50/ROAD WARRIOR'	 ,@CreationTimestamp, @CreationUserIdentifier,1 ),
				(@ApprovalGroupApprovalTypeId +	42	,'[U]=50/SRVP-NORAM'	 ,@CreationTimestamp, @CreationUserIdentifier,1 ),
				(@ApprovalGroupApprovalTypeId +	43	,'[U]=50/VIP CEO'	 ,@CreationTimestamp, @CreationUserIdentifier,1 ),
				(@ApprovalGroupApprovalTypeId +	44	,'[U]=50/VIP EXEC'	 ,@CreationTimestamp, @CreationUserIdentifier,1 ),
				(@ApprovalGroupApprovalTypeId +	45	,'[U]=50/VIP EXEMPT-CA'	 ,@CreationTimestamp, @CreationUserIdentifier,1 ),
				(@ApprovalGroupApprovalTypeId +	46	,'[U]=50/VIP-CA'	 ,@CreationTimestamp, @CreationUserIdentifier,1 ),
				(@ApprovalGroupApprovalTypeId +	47	,'[U]=50/VIP-CA-S'	 ,@CreationTimestamp, @CreationUserIdentifier,1 ),
				(@ApprovalGroupApprovalTypeId +	48	,'[U]=50/VP-NORAM'	 ,@CreationTimestamp, @CreationUserIdentifier,1 ),
				(@ApprovalGroupApprovalTypeId +	49	,'[U]=50/EMPLOYEE'	 ,@CreationTimestamp, @CreationUserIdentifier,1 ),
				(@ApprovalGroupApprovalTypeId +	50	,'[U]=50/OPERATION-CA'	 ,@CreationTimestamp, @CreationUserIdentifier,1 ),
				(@ApprovalGroupApprovalTypeId +	51	,'[SEGMENT_TYPE]=AIR'	 ,@CreationTimestamp, @CreationUserIdentifier,1 ),
				(@ApprovalGroupApprovalTypeId +	52	,'[SEGMENT_TYPE]=HOTEL'	 ,@CreationTimestamp, @CreationUserIdentifier,1 ),
				(@ApprovalGroupApprovalTypeId +	53	,'[SEGMENT_TYPE]=CAR'	 ,@CreationTimestamp, @CreationUserIdentifier,1 ),
				(@ApprovalGroupApprovalTypeId +	54	,'[UI_PRIMARY]=Total Cost of PNR Costs exceeds $5000.00'	 ,@CreationTimestamp, @CreationUserIdentifier,1 ),
				(@ApprovalGroupApprovalTypeId +	55	,'[UI_SECONDARY_1]=Traveller has received Approval for this Trip'	 ,@CreationTimestamp, @CreationUserIdentifier,1 ),
				(@ApprovalGroupApprovalTypeId +	56	,'[UI_SECONDARY_1]=Obtain Approval Prior to Ticket Issuance'	 ,@CreationTimestamp, @CreationUserIdentifier,1 ),
				(@ApprovalGroupApprovalTypeId +	57	,'[UI_ADDITIONAL_1]=[TEXT_BOX]Approver Name'	 ,@CreationTimestamp, @CreationUserIdentifier,1 ),
				(@ApprovalGroupApprovalTypeId +	58	,'[UI_ADDITIONAL_2]=[LABEL]THE TICKET WILL BE PUT ON "HOLD" AND SENT TO AQUA QC ONLY'	 ,@CreationTimestamp, @CreationUserIdentifier,1 )

	  SET IDENTITY_INSERT [dbo].ApprovalGroupApprovalTypeItem ON;  

		INSERT INTO ApprovalGroupApprovalTypeItem(ApprovalGroupApprovalTypeItemId, ApprovalGroupApprovalTypeId, ApprovalGroupId, ApprovalGroupApprovalTypeItemValue, CreationTimestamp, CreationUserIdentifier, VersionNumber)
		VALUES	(@ApprovalGroupApprovalTypeItemId + 1,		@ApprovalGroupApprovalTypeId +	22, @ApprovalGroupId+33, 'EXCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId + 2,		@ApprovalGroupApprovalTypeId +	20, @ApprovalGroupId+33, 'EXCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId + 3,		@ApprovalGroupApprovalTypeId +	20, @ApprovalGroupId+33, 'EXCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId + 4,		@ApprovalGroupApprovalTypeId +	21, @ApprovalGroupId+33, 'EXCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId + 5,		@ApprovalGroupApprovalTypeId +	1, @ApprovalGroupId+33, 'EXCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId +	7	,	@ApprovalGroupApprovalTypeId + 1	,	@ApprovalGroupId+8	,	'EXCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId +	8	,	@ApprovalGroupApprovalTypeId + 1	,	@ApprovalGroupId+18	,	'EXCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId +	9	,	@ApprovalGroupApprovalTypeId + 1	,	@ApprovalGroupId+21	,	'EXCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId +	10	,	@ApprovalGroupApprovalTypeId + 1	,	@ApprovalGroupId+28	,	'EXCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId +	11	,	@ApprovalGroupApprovalTypeId + 1	,	@ApprovalGroupId+32	,	'EXCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId +	12	,	@ApprovalGroupApprovalTypeId + 1	,	@ApprovalGroupId+35	,	'EXCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId +	13	,	@ApprovalGroupApprovalTypeId + 2	,	@ApprovalGroupId+8	,	'EXCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId +	14	,	@ApprovalGroupApprovalTypeId + 2	,	@ApprovalGroupId+18	,	'EXCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId +	15	,	@ApprovalGroupApprovalTypeId + 2	,	@ApprovalGroupId+21	,	'EXCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId +	16	,	@ApprovalGroupApprovalTypeId + 2	,	@ApprovalGroupId+28	,	'EXCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId +	17	,	@ApprovalGroupApprovalTypeId + 2	,	@ApprovalGroupId+32	,	'EXCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId +	18	,	@ApprovalGroupApprovalTypeId + 2	,	@ApprovalGroupId+35	,	'EXCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId +	19	,	@ApprovalGroupApprovalTypeId + 7	,	@ApprovalGroupId+28	,	'EXCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId +	20	,	@ApprovalGroupApprovalTypeId + 8	,	@ApprovalGroupId+28	,	'EXCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId +	21	,	@ApprovalGroupApprovalTypeId + 7	,	@ApprovalGroupId+17	,	'EXCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId +	22	,	@ApprovalGroupApprovalTypeId + 15 ,	@ApprovalGroupId+17	,	'EXCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId +	23	,	@ApprovalGroupApprovalTypeId + 11 ,	@ApprovalGroupId+12	,	'EXCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId +	24	,	@ApprovalGroupApprovalTypeId + 14 ,	@ApprovalGroupId+17	,	'EXCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId +	25	,	@ApprovalGroupApprovalTypeId + 3 ,	@ApprovalGroupId+6	,	'EXCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId +	26	,	@ApprovalGroupApprovalTypeId + 12 ,	@ApprovalGroupId+6	,	'EXCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId +	27	,	@ApprovalGroupApprovalTypeId + 13 ,	@ApprovalGroupId+6	,	'EXCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId +	28	,	@ApprovalGroupApprovalTypeId + 18 ,	@ApprovalGroupId+32	,	'EXCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId +	29	,	@ApprovalGroupApprovalTypeId + 19 ,	@ApprovalGroupId+32	,	'EXCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId +	30	,	@ApprovalGroupApprovalTypeId + 17 ,	@ApprovalGroupId+26	,	'EXCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId +	31	,	@ApprovalGroupApprovalTypeId + 17 ,	@ApprovalGroupId+29	,	'EXCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId +	32	,	@ApprovalGroupApprovalTypeId + 16 ,	@ApprovalGroupId+20	,	'EXCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId +	33	,	@ApprovalGroupApprovalTypeId + 4	,	@ApprovalGroupId+16	,	'EXCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId +	34	,	@ApprovalGroupApprovalTypeId + 4	,	@ApprovalGroupId+18	,	'EXCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId +	35	,	@ApprovalGroupApprovalTypeId + 4	,	@ApprovalGroupId+21	,	'EXCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId +	36	,	@ApprovalGroupApprovalTypeId + 4	,	@ApprovalGroupId+32	,	'EXCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId +	37	,	@ApprovalGroupApprovalTypeId + 4	,	@ApprovalGroupId+35	,	'EXCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId +	38	,	@ApprovalGroupApprovalTypeId + 5	,	@ApprovalGroupId+16	,	'EXCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId +	39	,	@ApprovalGroupApprovalTypeId + 5	,	@ApprovalGroupId+18	,	'EXCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId +	40	,	@ApprovalGroupApprovalTypeId + 5	,	@ApprovalGroupId+21	,	'EXCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId +	41	,	@ApprovalGroupApprovalTypeId + 5	,	@ApprovalGroupId+32	,	'EXCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId +	42	,	@ApprovalGroupApprovalTypeId + 5	,	@ApprovalGroupId+35	,	'EXCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId +	43	,	@ApprovalGroupApprovalTypeId + 4	,	@ApprovalGroupId+8	,	'EXCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId +	44	,	@ApprovalGroupApprovalTypeId + 5	,	@ApprovalGroupId+8	,	'EXCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId +	45	,	@ApprovalGroupApprovalTypeId + 6	,	@ApprovalGroupId+8	,	'EXCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId +	46	,	@ApprovalGroupApprovalTypeId + 23,	@ApprovalGroupId+8	,	'EXCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId +	47	,	@ApprovalGroupApprovalTypeId + 9,	@ApprovalGroupId+8	,	'EXCLUDE2', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId +	48	,	@ApprovalGroupApprovalTypeId + 10,	@ApprovalGroupId+8	,	'EXCLUDE2', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId +	49	,	@ApprovalGroupApprovalTypeId + 23,	@ApprovalGroupId+8	,	'EXCLUDE2', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId +	50	,	@ApprovalGroupApprovalTypeId + 24,	@ApprovalGroupId+17	,	'EXCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId +	51	,	@ApprovalGroupApprovalTypeId + 29,	@ApprovalGroupId+17	,	'EXCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId +	52	,	@ApprovalGroupApprovalTypeId + 25,	@ApprovalGroupId+25	,	'EXCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId +	53	,	@ApprovalGroupApprovalTypeId + 42,	@ApprovalGroupId+25	,	'EXCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId +	54	,	@ApprovalGroupApprovalTypeId + 48,	@ApprovalGroupId+25	,	'EXCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId +	55	,	@ApprovalGroupApprovalTypeId + 26,	@ApprovalGroupId+11	,	'EXCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId +	56	,	@ApprovalGroupApprovalTypeId + 28,	@ApprovalGroupId+2	,	'EXCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId +	57	,	@ApprovalGroupApprovalTypeId + 30,	@ApprovalGroupId+7	,	'EXCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId +	58	,	@ApprovalGroupApprovalTypeId + 34,	@ApprovalGroupId+6	,	'EXCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId +	59	,	@ApprovalGroupApprovalTypeId + 34,	@ApprovalGroupId+12	,	'EXCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId +	60	,	@ApprovalGroupApprovalTypeId + 34,	@ApprovalGroupId+24	,	'EXCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId +	61	,	@ApprovalGroupApprovalTypeId + 27,	@ApprovalGroupId+24	,	'EXCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId +	62	,	@ApprovalGroupApprovalTypeId + 34,	@ApprovalGroupId+9	,	'EXCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId +	63	,	@ApprovalGroupApprovalTypeId + 40,	@ApprovalGroupId+9	,	'EXCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId +	64	,	@ApprovalGroupApprovalTypeId + 33,	@ApprovalGroupId+23	,	'EXCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId +	65	,	@ApprovalGroupApprovalTypeId + 33,	@ApprovalGroupId+31	,	'EXCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId +	66	,	@ApprovalGroupApprovalTypeId + 37,	@ApprovalGroupId+5	,	'EXCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId +	67	,	@ApprovalGroupApprovalTypeId + 46,	@ApprovalGroupId+5	,	'EXCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId +	68	,	@ApprovalGroupApprovalTypeId + 47,	@ApprovalGroupId+5	,	'EXCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId +	69	,	@ApprovalGroupApprovalTypeId + 40,	@ApprovalGroupId+8	,	'EXCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId +	70	,	@ApprovalGroupApprovalTypeId + 43,	@ApprovalGroupId+10	,	'EXCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId +	71	,	@ApprovalGroupApprovalTypeId + 44,	@ApprovalGroupId+10	,	'EXCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId +	72	,	@ApprovalGroupApprovalTypeId + 49,	@ApprovalGroupId+28	,	'INCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId +	73	,	@ApprovalGroupApprovalTypeId + 32,	@ApprovalGroupId+22	,	'INCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId +	74	,	@ApprovalGroupApprovalTypeId + 32,	@ApprovalGroupId+14	,	'INCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId +	75	,	@ApprovalGroupApprovalTypeId + 35,	@ApprovalGroupId+1	,	'INCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId +	76	,	@ApprovalGroupApprovalTypeId + 36,	@ApprovalGroupId+31	,	'INCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId +	77	,	@ApprovalGroupApprovalTypeId + 47,	@ApprovalGroupId+31	,	'INCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId +	78	,	@ApprovalGroupApprovalTypeId + 38,	@ApprovalGroupId+19	,	'INCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId +	79	,	@ApprovalGroupApprovalTypeId + 39,	@ApprovalGroupId+18	,	'INCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId +	80	,	@ApprovalGroupApprovalTypeId + 50,	@ApprovalGroupId+22	,	'INCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId +	81	,	@ApprovalGroupApprovalTypeId + 45,	@ApprovalGroupId+22	,	'INCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId +	82	,	@ApprovalGroupApprovalTypeId + 46,	@ApprovalGroupId+22	,	'INCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId +	83	,	@ApprovalGroupApprovalTypeId + 35,	@ApprovalGroupId+22	,	'INCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId +	84	,	@ApprovalGroupApprovalTypeId + 51	,	@ApprovalGroupId+1	,	'INCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId +	85	,	@ApprovalGroupApprovalTypeId + 51	,	@ApprovalGroupId+2	,	'INCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId +	86	,	@ApprovalGroupApprovalTypeId + 51	,	@ApprovalGroupId+4	,	'INCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId +	87	,	@ApprovalGroupApprovalTypeId + 51	,	@ApprovalGroupId+5	,	'INCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId +	88	,	@ApprovalGroupApprovalTypeId + 51	,	@ApprovalGroupId+8	,	'INCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId +	89	,	@ApprovalGroupApprovalTypeId + 51	,	@ApprovalGroupId+11	,	'INCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId +	90	,	@ApprovalGroupApprovalTypeId + 51	,	@ApprovalGroupId+13	,	'INCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId +	91	,	@ApprovalGroupApprovalTypeId + 51	,	@ApprovalGroupId+14	,	'INCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId +	92	,	@ApprovalGroupApprovalTypeId + 51	,	@ApprovalGroupId+15	,	'INCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId +	93	,	@ApprovalGroupApprovalTypeId + 51	,	@ApprovalGroupId+16	,	'INCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId +	94	,	@ApprovalGroupApprovalTypeId + 51	,	@ApprovalGroupId+18	,	'INCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId +	95	,	@ApprovalGroupApprovalTypeId + 51	,	@ApprovalGroupId+20	,	'INCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId +	96	,	@ApprovalGroupApprovalTypeId + 51	,	@ApprovalGroupId+21	,	'INCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId +	97	,	@ApprovalGroupApprovalTypeId + 51	,	@ApprovalGroupId+22	,	'INCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId +	98	,	@ApprovalGroupApprovalTypeId + 51	,	@ApprovalGroupId+24	,	'INCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId +	99	,	@ApprovalGroupApprovalTypeId + 51	,	@ApprovalGroupId+25	,	'INCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId +	100	,	@ApprovalGroupApprovalTypeId + 51	,	@ApprovalGroupId+26	,	'INCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId +	101	,	@ApprovalGroupApprovalTypeId + 51	,	@ApprovalGroupId+27	,	'INCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId +	102	,	@ApprovalGroupApprovalTypeId + 51	,	@ApprovalGroupId+28	,	'INCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId +	103	,	@ApprovalGroupApprovalTypeId + 51	,	@ApprovalGroupId+30	,	'INCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId +	104	,	@ApprovalGroupApprovalTypeId + 51	,	@ApprovalGroupId+32	,	'INCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId +	105	,	@ApprovalGroupApprovalTypeId + 51	,	@ApprovalGroupId+35	,	'INCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId +	106	,	@ApprovalGroupApprovalTypeId + 51	,	@ApprovalGroupId+17	,	'INCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId +	107	,	@ApprovalGroupApprovalTypeId + 52	,	@ApprovalGroupId+17	,	'INCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId +	108	,	@ApprovalGroupApprovalTypeId + 51	,	@ApprovalGroupId+3	,	'INCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId +	109	,	@ApprovalGroupApprovalTypeId + 51	,	@ApprovalGroupId+6	,	'INCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId +	110	,	@ApprovalGroupApprovalTypeId + 51	,	@ApprovalGroupId+7	,	'INCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId +	111	,	@ApprovalGroupApprovalTypeId + 51	,	@ApprovalGroupId+9	,	'INCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId +	112	,	@ApprovalGroupApprovalTypeId + 51	,	@ApprovalGroupId+10	,	'INCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId +	113	,	@ApprovalGroupApprovalTypeId + 51	,	@ApprovalGroupId+12	,	'INCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId +	114	,	@ApprovalGroupApprovalTypeId + 51	,	@ApprovalGroupId+19	,	'INCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId +	115	,	@ApprovalGroupApprovalTypeId + 51	,	@ApprovalGroupId+23	,	'INCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId +	116	,	@ApprovalGroupApprovalTypeId + 51	,	@ApprovalGroupId+29	,	'INCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId +	117	,	@ApprovalGroupApprovalTypeId + 51	,	@ApprovalGroupId+31	,	'INCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId +	118	,	@ApprovalGroupApprovalTypeId + 51	,	@ApprovalGroupId+33	,	'INCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId +	119	,	@ApprovalGroupApprovalTypeId + 51	,	@ApprovalGroupId+34	,	'INCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId +	120	,	@ApprovalGroupApprovalTypeId + 52	,	@ApprovalGroupId+3	,	'INCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId +	121	,	@ApprovalGroupApprovalTypeId + 52	,	@ApprovalGroupId+6	,	'INCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId +	122	,	@ApprovalGroupApprovalTypeId + 52	,	@ApprovalGroupId+7	,	'INCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId +	123	,	@ApprovalGroupApprovalTypeId + 52	,	@ApprovalGroupId+9	,	'INCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId +	124	,	@ApprovalGroupApprovalTypeId + 52	,	@ApprovalGroupId+10	,	'INCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId +	125	,	@ApprovalGroupApprovalTypeId + 52	,	@ApprovalGroupId+12	,	'INCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId +	126	,	@ApprovalGroupApprovalTypeId + 52	,	@ApprovalGroupId+19	,	'INCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId +	127	,	@ApprovalGroupApprovalTypeId + 52	,	@ApprovalGroupId+23	,	'INCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId +	128	,	@ApprovalGroupApprovalTypeId + 52	,	@ApprovalGroupId+29	,	'INCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId +	129	,	@ApprovalGroupApprovalTypeId + 52	,	@ApprovalGroupId+31	,	'INCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId +	130	,	@ApprovalGroupApprovalTypeId + 52	,	@ApprovalGroupId+33	,	'INCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId +	131	,	@ApprovalGroupApprovalTypeId + 52	,	@ApprovalGroupId+34	,	'INCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId +	132	,	@ApprovalGroupApprovalTypeId + 53	,	@ApprovalGroupId+3	,	'INCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId +	133	,	@ApprovalGroupApprovalTypeId + 53	,	@ApprovalGroupId+6	,	'INCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId +	134	,	@ApprovalGroupApprovalTypeId + 53	,	@ApprovalGroupId+7	,	'INCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId +	135	,	@ApprovalGroupApprovalTypeId + 53	,	@ApprovalGroupId+9	,	'INCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId +	136	,	@ApprovalGroupApprovalTypeId + 53	,	@ApprovalGroupId+10	,	'INCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId +	137	,	@ApprovalGroupApprovalTypeId + 53	,	@ApprovalGroupId+12	,	'INCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId +	138	,	@ApprovalGroupApprovalTypeId + 53	,	@ApprovalGroupId+19	,	'INCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId +	139	,	@ApprovalGroupApprovalTypeId + 53	,	@ApprovalGroupId+23	,	'INCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId +	140	,	@ApprovalGroupApprovalTypeId + 53	,	@ApprovalGroupId+29	,	'INCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId +	141	,	@ApprovalGroupApprovalTypeId + 53	,	@ApprovalGroupId+31	,	'INCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId +	142	,	@ApprovalGroupApprovalTypeId + 53	,	@ApprovalGroupId+33	,	'INCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId +	143	,	@ApprovalGroupApprovalTypeId + 53	,	@ApprovalGroupId+34	,	'INCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId +	144	,	@ApprovalGroupApprovalTypeId + 54	,	@ApprovalGroupId+6	,	'[UI_SECONDARY_1]', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId +	145	,	@ApprovalGroupApprovalTypeId + 55	,	@ApprovalGroupId+6	,	'[UI_SECONDARY_1', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId +	146	,	@ApprovalGroupApprovalTypeId + 56	,	@ApprovalGroupId+6	,	'[UI_ADDITIONAL_2]', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId +	147	,	@ApprovalGroupApprovalTypeId + 57	,	@ApprovalGroupId+6	,	'INCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
				(@ApprovalGroupApprovalTypeItemId +	148	,	@ApprovalGroupApprovalTypeId + 58	,	@ApprovalGroupId+6	,	'INCLUDE', @CreationTimestamp, @CreationUserIdentifier,1)


	  SET IDENTITY_INSERT [dbo].ApprovalGroupApprovalTypeItem OFF;  
		
		INSERT INTO ApprovalGroupClientAccount(ApprovalGroupId, SourceSystemCode, ClientAccountNumber, CreationTimestamp, CreationUserIdentifier, VersionNumber)
		VALUES (	@ApprovalGroupId+1	,	'CA1',	'1BGD',	@CreationTimestamp, @CreationUserIdentifier,1),
				(	@ApprovalGroupId+2	,	'CA1',	'1S3I',	@CreationTimestamp, @CreationUserIdentifier,1),
				(	@ApprovalGroupId+3	,	'CA1',	'1CKP',	@CreationTimestamp, @CreationUserIdentifier,1),
				(	@ApprovalGroupId+4	,	'CA1',	'1PH3',	@CreationTimestamp, @CreationUserIdentifier,1),
				(	@ApprovalGroupId+5	,	'CA1',	'195U',	@CreationTimestamp, @CreationUserIdentifier,1),
				(	@ApprovalGroupId+6	,	'CA1',	'1X2E',	@CreationTimestamp, @CreationUserIdentifier,1),
				(	@ApprovalGroupId+7	,	'CA1',	'1T3H',	@CreationTimestamp, @CreationUserIdentifier,1),
				(	@ApprovalGroupId+8	,	'CA1',	'1VB7',	@CreationTimestamp, @CreationUserIdentifier,1),
				(	@ApprovalGroupId+9	,	'CA1',	'1CHB',	@CreationTimestamp, @CreationUserIdentifier,1),
				(	@ApprovalGroupId+10	,	'CA1',	'1D1Z',	@CreationTimestamp, @CreationUserIdentifier,1),
				(	@ApprovalGroupId+11	,	'CA1',	'1EQF',	@CreationTimestamp, @CreationUserIdentifier,1),
				(	@ApprovalGroupId+12	,	'CA1',	'1D7V',	@CreationTimestamp, @CreationUserIdentifier,1),
				(	@ApprovalGroupId+13	,	'CA1',	'1YRE',	@CreationTimestamp, @CreationUserIdentifier,1),
				(	@ApprovalGroupId+14	,	'CA1',	'1G8B',	@CreationTimestamp, @CreationUserIdentifier,1),
				(	@ApprovalGroupId+15	,	'CA1',	'1I4A',	@CreationTimestamp, @CreationUserIdentifier,1),
				(	@ApprovalGroupId+16	,	'CA1',	'1U9U',	@CreationTimestamp, @CreationUserIdentifier,1),
				(	@ApprovalGroupId+17	,	'CA1',	'1M2J',	@CreationTimestamp, @CreationUserIdentifier,1),
				(	@ApprovalGroupId+18	,	'CA1',	'1ZX4',	@CreationTimestamp, @CreationUserIdentifier,1),
				(	@ApprovalGroupId+19	,	'CA1',	'1U1D',	@CreationTimestamp, @CreationUserIdentifier,1),
				(	@ApprovalGroupId+20	,	'CA1',	'1UD2',	@CreationTimestamp, @CreationUserIdentifier,1),
				(	@ApprovalGroupId+21	,	'CA1',	'1P2W',	@CreationTimestamp, @CreationUserIdentifier,1),
				(	@ApprovalGroupId+22	,	'CA1',	'1J8S',	@CreationTimestamp, @CreationUserIdentifier,1),
				(	@ApprovalGroupId+23	,	'CA1',	'1SY3',	@CreationTimestamp, @CreationUserIdentifier,1),
				(	@ApprovalGroupId+24	,	'CA1',	'1W9C',	@CreationTimestamp, @CreationUserIdentifier,1),
				(	@ApprovalGroupId+25	,	'CA1',	'1R4L',	@CreationTimestamp, @CreationUserIdentifier,1),
				(	@ApprovalGroupId+26	,	'CA1',	'1T1A',	@CreationTimestamp, @CreationUserIdentifier,1),
				(	@ApprovalGroupId+27	,	'CA1',	'1XJ6',	@CreationTimestamp, @CreationUserIdentifier,1),
				(	@ApprovalGroupId+28	,	'CA1',	'1T2G',	@CreationTimestamp, @CreationUserIdentifier,1),
				(	@ApprovalGroupId+29	,	'CA1',	'1ZWK',	@CreationTimestamp, @CreationUserIdentifier,1),
				(	@ApprovalGroupId+30	,	'CA1',	'1F3X',	@CreationTimestamp, @CreationUserIdentifier,1),
				(	@ApprovalGroupId+31	,	'CA1',	'1R3M',	@CreationTimestamp, @CreationUserIdentifier,1),
				(	@ApprovalGroupId+32	,	'CA1',	'1F8Y',	@CreationTimestamp, @CreationUserIdentifier,1),
				(	@ApprovalGroupId+33	,	'CA1',	'1SGE',	@CreationTimestamp, @CreationUserIdentifier,1),
				(	@ApprovalGroupId+34	,	'CA1',	'1K4O',	@CreationTimestamp, @CreationUserIdentifier,1),
				(	@ApprovalGroupId+35	,	'CA1',	'1K6L',	@CreationTimestamp, @CreationUserIdentifier,1),
				(	@ApprovalGroupId+16	,	'CA1',	'1I3F',	@CreationTimestamp, @CreationUserIdentifier,1)



		---------------------------------------
        -- END US13271
        ---------------------------------------
		COMMIT TRAN

	END TRY
	
BEGIN CATCH

	ROLLBACK TRAN

	DECLARE @ErrorMessage NVARCHAR(4000);
	SELECT @ErrorMessage=ERROR_MESSAGE()
	RAISERROR(@ErrorMessage, 10, 1);

END CATCH




