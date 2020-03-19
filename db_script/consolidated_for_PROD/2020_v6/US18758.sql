USE Desktop_Test
GO

BEGIN TRAN
BEGIN TRY

	DECLARE @CreationTimestamp		DATETIME = GETUTCDATE()	
	DECLARE @ApprovalGroupId		INT
	-----------------------
	-- ROLLBACK Scripts
	-----------------------
	SET @CreationUserIdentifier			= 'Amadeus CA Migration - US18758'
	--			(@ApprovalGroupApprovalTypeItemId +	11	,	@ApprovalGroupApprovalTypeId + 1	,	@ApprovalGroupId+32	,	'EXCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
	--			(@ApprovalGroupApprovalTypeItemId +	17	,	@ApprovalGroupApprovalTypeId + 2	,	@ApprovalGroupId+32	,	'EXCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
	--			(@ApprovalGroupApprovalTypeItemId +	28	,	@ApprovalGroupApprovalTypeId + 18 ,	@ApprovalGroupId+32	,	'EXCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
	--			(@ApprovalGroupApprovalTypeItemId +	29	,	@ApprovalGroupApprovalTypeId + 19 ,	@ApprovalGroupId+32	,	'EXCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
	--			(@ApprovalGroupApprovalTypeItemId +	36	,	@ApprovalGroupApprovalTypeId + 4	,	@ApprovalGroupId+32	,	'EXCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
	--			(@ApprovalGroupApprovalTypeItemId +	41	,	@ApprovalGroupApprovalTypeId + 5	,	@ApprovalGroupId+32	,	'EXCLUDE', @CreationTimestamp, @CreationUserIdentifier,1),
	--			(@ApprovalGroupApprovalTypeItemId +	144	,	@ApprovalGroupApprovalTypeId +	54	,	@ApprovalGroupId+	32	,	'UI', @CreationTimestamp, @CreationUserIdentifier,1),
	--			(@ApprovalGroupApprovalTypeItemId +	145	,	@ApprovalGroupApprovalTypeId +	55	,	@ApprovalGroupId+	32	,	'UI', @CreationTimestamp, @CreationUserIdentifier,1),
	--			(@ApprovalGroupApprovalTypeItemId +	146	,	@ApprovalGroupApprovalTypeId +	56	,	@ApprovalGroupId+	32	,	'UI', @CreationTimestamp, @CreationUserIdentifier,1),
	--			(@ApprovalGroupApprovalTypeItemId +	147	,	@ApprovalGroupApprovalTypeId +	57	,	@ApprovalGroupId+	32	,	'UI', @CreationTimestamp, @CreationUserIdentifier,1),
	--			(@ApprovalGroupApprovalTypeItemId +	148	,	@ApprovalGroupApprovalTypeId +	58	,	@ApprovalGroupId+	32	,	'UI', @CreationTimestamp, @CreationUserIdentifier,1),
	--			(@ApprovalGroupApprovalTypeItemId +	149	,	@ApprovalGroupApprovalTypeId +	59	,	@ApprovalGroupId+	32	,	'UI', @CreationTimestamp, @CreationUserIdentifier,1),
	--			(@ApprovalGroupApprovalTypeItemId +	150	,	@ApprovalGroupApprovalTypeId +	60	,	@ApprovalGroupId+	32	,	'UI', @CreationTimestamp, @CreationUserIdentifier,1),
	--			(@ApprovalGroupApprovalTypeItemId +	151	,	@ApprovalGroupApprovalTypeId +	61	,	@ApprovalGroupId+	32	,	'UI', @CreationTimestamp, @CreationUserIdentifier,1),
	--			(@ApprovalGroupApprovalTypeItemId +	152	,	@ApprovalGroupApprovalTypeId +	62	,	@ApprovalGroupId+	32	,	'UI', @CreationTimestamp, @CreationUserIdentifier,1),
	--			(@ApprovalGroupApprovalTypeItemId +	153	,	@ApprovalGroupApprovalTypeId +	63	,	@ApprovalGroupId+	32	,	'UI', @CreationTimestamp, @CreationUserIdentifier,1),
	--			(@ApprovalGroupApprovalTypeItemId +	154	,	@ApprovalGroupApprovalTypeId +	64	,	@ApprovalGroupId+	32	,	'UI', @CreationTimestamp, @CreationUserIdentifier,1),
	--			(@ApprovalGroupApprovalTypeItemId +	155	,	@ApprovalGroupApprovalTypeId +	65	,	@ApprovalGroupId+	32	,	'UI', @CreationTimestamp, @CreationUserIdentifier,1),
	--			(@ApprovalGroupApprovalTypeItemId +	156	,	@ApprovalGroupApprovalTypeId +	66	,	@ApprovalGroupId+	32	,	'UI', @CreationTimestamp, @CreationUserIdentifier,1),
	--			(@ApprovalGroupApprovalTypeItemId +	157	,	@ApprovalGroupApprovalTypeId +	67	,	@ApprovalGroupId+	32	,	'UI', @CreationTimestamp, @CreationUserIdentifier,1),
	--			(@ApprovalGroupApprovalTypeItemId +	158	,	@ApprovalGroupApprovalTypeId +	68	,	@ApprovalGroupId+	32	,	'UI', @CreationTimestamp, @CreationUserIdentifier,1),
	--			(@ApprovalGroupApprovalTypeItemId +	159	,	@ApprovalGroupApprovalTypeId +	69	,	@ApprovalGroupId+	32	,	'UI', @CreationTimestamp, @CreationUserIdentifier,1),
	--			(@ApprovalGroupApprovalTypeItemId +	160	,	@ApprovalGroupApprovalTypeId +	70	,	@ApprovalGroupId+	32	,	'UI', @CreationTimestamp, @CreationUserIdentifier,1),
	--			(@ApprovalGroupApprovalTypeItemId +	161	,	@ApprovalGroupApprovalTypeId +	71	,	@ApprovalGroupId+	32	,	'UI', @CreationTimestamp, @CreationUserIdentifier,1),
	--			(@ApprovalGroupApprovalTypeItemId +	162	,	@ApprovalGroupApprovalTypeId +	72	,	@ApprovalGroupId+	32	,	'UI', @CreationTimestamp, @CreationUserIdentifier,1),
	--			(@ApprovalGroupApprovalTypeItemId +	163	,	@ApprovalGroupApprovalTypeId +	73	,	@ApprovalGroupId+	32	,	'UI', @CreationTimestamp, @CreationUserIdentifier,1),
	--			(@ApprovalGroupApprovalTypeItemId +	164	,	@ApprovalGroupApprovalTypeId +	74	,	@ApprovalGroupId+	32	,	'UI', @CreationTimestamp, @CreationUserIdentifier,1),
	--			(@ApprovalGroupApprovalTypeItemId +	165	,	@ApprovalGroupApprovalTypeId +	75	,	@ApprovalGroupId+	32	,	'UI', @CreationTimestamp, @CreationUserIdentifier,1),
	--			(@ApprovalGroupApprovalTypeItemId +	166	,	@ApprovalGroupApprovalTypeId +	76	,	@ApprovalGroupId+	32	,	'UI', @CreationTimestamp, @CreationUserIdentifier,1),
	--			(@ApprovalGroupApprovalTypeItemId +	167	,	@ApprovalGroupApprovalTypeId +	77	,	@ApprovalGroupId+	32	,	'UI', @CreationTimestamp, @CreationUserIdentifier,1),
	--			(@ApprovalGroupApprovalTypeItemId +	168	,	@ApprovalGroupApprovalTypeId +	78	,	@ApprovalGroupId+	32	,	'UI', @CreationTimestamp, @CreationUserIdentifier,1),
	--			(@ApprovalGroupApprovalTypeItemId +	169	,	@ApprovalGroupApprovalTypeId +	79	,	@ApprovalGroupId+	32	,	'UI', @CreationTimestamp, @CreationUserIdentifier,1),
	--			(@ApprovalGroupApprovalTypeItemId +	170	,	@ApprovalGroupApprovalTypeId +	80	,	@ApprovalGroupId+	32	,	'UI', @CreationTimestamp, @CreationUserIdentifier,1),
	--			(@ApprovalGroupApprovalTypeItemId +	171	,	@ApprovalGroupApprovalTypeId +	81	,	@ApprovalGroupId+	32	,	'UI', @CreationTimestamp, @CreationUserIdentifier,1),
	--			(@ApprovalGroupApprovalTypeItemId +	172	,	@ApprovalGroupApprovalTypeId +	82	,	@ApprovalGroupId+	32	,	'UI', @CreationTimestamp, @CreationUserIdentifier,1),
	--			(@ApprovalGroupApprovalTypeItemId +	173	,	@ApprovalGroupApprovalTypeId +	83	,	@ApprovalGroupId+	32	,	'UI', @CreationTimestamp, @CreationUserIdentifier,1),
	--			(@ApprovalGroupApprovalTypeItemId +	174	,	@ApprovalGroupApprovalTypeId +	84	,	@ApprovalGroupId+	32	,	'UI', @CreationTimestamp, @CreationUserIdentifier,1),
	--			(@ApprovalGroupApprovalTypeItemId +	175	,	@ApprovalGroupApprovalTypeId +	85	,	@ApprovalGroupId+	32	,	'UI', @CreationTimestamp, @CreationUserIdentifier,1),
	--			(@ApprovalGroupApprovalTypeItemId +	176	,	@ApprovalGroupApprovalTypeId +	86	,	@ApprovalGroupId+	32	,	'UI', @CreationTimestamp, @CreationUserIdentifier,1),
	--			(@ApprovalGroupApprovalTypeItemId +	177	,	@ApprovalGroupApprovalTypeId +	87	,	@ApprovalGroupId+	32	,	'UI', @CreationTimestamp, @CreationUserIdentifier,1),
	--			(@ApprovalGroupApprovalTypeItemId +	178	,	@ApprovalGroupApprovalTypeId +	88	,	@ApprovalGroupId+	32	,	'UI', @CreationTimestamp, @CreationUserIdentifier,1),
	--			(@ApprovalGroupApprovalTypeItemId +	179	,	@ApprovalGroupApprovalTypeId +	89	,	@ApprovalGroupId+	32	,	'UI', @CreationTimestamp, @CreationUserIdentifier,1),
	--			(@ApprovalGroupApprovalTypeItemId +	180	,	@ApprovalGroupApprovalTypeId +	90	,	@ApprovalGroupId+	32	,	'UI', @CreationTimestamp, @CreationUserIdentifier,1),
	--			(@ApprovalGroupApprovalTypeItemId +	181	,	@ApprovalGroupApprovalTypeId +	91	,	@ApprovalGroupId+	32	,	'UI', @CreationTimestamp, @CreationUserIdentifier,1),
	--			(@ApprovalGroupApprovalTypeItemId +	182	,	@ApprovalGroupApprovalTypeId +	92	,	@ApprovalGroupId+	32	,	'UI', @CreationTimestamp, @CreationUserIdentifier,1),
	--			(@ApprovalGroupApprovalTypeItemId +	183	,	@ApprovalGroupApprovalTypeId +	93	,	@ApprovalGroupId+	32	,	'UI', @CreationTimestamp, @CreationUserIdentifier,1),
	--			(@ApprovalGroupApprovalTypeItemId +	184	,	@ApprovalGroupApprovalTypeId +	94	,	@ApprovalGroupId+	32	,	'UI', @CreationTimestamp, @CreationUserIdentifier,1),
	--			(@ApprovalGroupApprovalTypeItemId +	185	,	@ApprovalGroupApprovalTypeId +	95	,	@ApprovalGroupId+	32	,	'UI', @CreationTimestamp, @CreationUserIdentifier,1),
	--			(@ApprovalGroupApprovalTypeItemId +	186	,	@ApprovalGroupApprovalTypeId +	96	,	@ApprovalGroupId+	32	,	'UI', @CreationTimestamp, @CreationUserIdentifier,1),
	--			(@ApprovalGroupApprovalTypeItemId +	187	,	@ApprovalGroupApprovalTypeId +	97	,	@ApprovalGroupId+	32	,	'UI', @CreationTimestamp, @CreationUserIdentifier,1),
	--			(@ApprovalGroupApprovalTypeItemId +	188	,	@ApprovalGroupApprovalTypeId +	98	,	@ApprovalGroupId+	32	,	'UI', @CreationTimestamp, @CreationUserIdentifier,1),
	--			(@ApprovalGroupApprovalTypeItemId +	189	,	@ApprovalGroupApprovalTypeId +	99	,	@ApprovalGroupId+	32	,	'UI', @CreationTimestamp, @CreationUserIdentifier,1),
	--			(@ApprovalGroupApprovalTypeItemId +	190	,	@ApprovalGroupApprovalTypeId +	100	,	@ApprovalGroupId+	32	,	'UI', @CreationTimestamp, @CreationUserIdentifier,1),
	--			(@ApprovalGroupApprovalTypeItemId +	191	,	@ApprovalGroupApprovalTypeId +	101	,	@ApprovalGroupId+	32	,	'UI', @CreationTimestamp, @CreationUserIdentifier,1),
	--			(@ApprovalGroupApprovalTypeItemId +	192	,	@ApprovalGroupApprovalTypeId +	102	,	@ApprovalGroupId+	32	,	'UI', @CreationTimestamp, @CreationUserIdentifier,1),
	--			(@ApprovalGroupApprovalTypeItemId +	193	,	@ApprovalGroupApprovalTypeId +	103	,	@ApprovalGroupId+	32	,	'UI', @CreationTimestamp, @CreationUserIdentifier,1),
	--			(@ApprovalGroupApprovalTypeItemId +	194	,	@ApprovalGroupApprovalTypeId +	104	,	@ApprovalGroupId+	32	,	'UI', @CreationTimestamp, @CreationUserIdentifier,1),
	--			(@ApprovalGroupApprovalTypeItemId +	195	,	@ApprovalGroupApprovalTypeId +	105	,	@ApprovalGroupId+	32	,	'UI', @CreationTimestamp, @CreationUserIdentifier,1),
	--			(@ApprovalGroupApprovalTypeItemId +	196	,	@ApprovalGroupApprovalTypeId +	106	,	@ApprovalGroupId+	32	,	'UI', @CreationTimestamp, @CreationUserIdentifier,1),
	--			(@ApprovalGroupApprovalTypeItemId +	197	,	@ApprovalGroupApprovalTypeId +	107	,	@ApprovalGroupId+	32	,	'UI', @CreationTimestamp, @CreationUserIdentifier,1),
	--			(@ApprovalGroupApprovalTypeItemId +	198	,	@ApprovalGroupApprovalTypeId +	108	,	@ApprovalGroupId+	32	,	'UI', @CreationTimestamp, @CreationUserIdentifier,1),
	--			(@ApprovalGroupApprovalTypeItemId +	199	,	@ApprovalGroupApprovalTypeId +	109	,	@ApprovalGroupId+	32	,	'UI', @CreationTimestamp, @CreationUserIdentifier,1),
	--			(@ApprovalGroupApprovalTypeItemId +	200	,	@ApprovalGroupApprovalTypeId +	110	,	@ApprovalGroupId+	32	,	'UI', @CreationTimestamp, @CreationUserIdentifier,1),
	--			(@ApprovalGroupApprovalTypeItemId +	201	,	@ApprovalGroupApprovalTypeId +	111	,	@ApprovalGroupId+	32	,	'UI', @CreationTimestamp, @CreationUserIdentifier,1),
	--			(@ApprovalGroupApprovalTypeItemId +	202	,	@ApprovalGroupApprovalTypeId +	112	,	@ApprovalGroupId+	32	,	'UI', @CreationTimestamp, @CreationUserIdentifier,1),
	--			(@ApprovalGroupApprovalTypeItemId +	203	,	@ApprovalGroupApprovalTypeId +	113	,	@ApprovalGroupId+	32	,	'UI', @CreationTimestamp, @CreationUserIdentifier,1),
	--			(@ApprovalGroupApprovalTypeItemId +	204	,	@ApprovalGroupApprovalTypeId +	114	,	@ApprovalGroupId+	32	,	'UI', @CreationTimestamp, @CreationUserIdentifier,1),
	--			(@ApprovalGroupApprovalTypeItemId +	205	,	@ApprovalGroupApprovalTypeId +	115	,	@ApprovalGroupId+	32	,	'UI', @CreationTimestamp, @CreationUserIdentifier,1),
	--			(@ApprovalGroupApprovalTypeItemId +	206	,	@ApprovalGroupApprovalTypeId +	116	,	@ApprovalGroupId+	32	,	'UI', @CreationTimestamp, @CreationUserIdentifier,1),
	--			(@ApprovalGroupApprovalTypeItemId +	207	,	@ApprovalGroupApprovalTypeId +	117	,	@ApprovalGroupId+	32	,	'UI', @CreationTimestamp, @CreationUserIdentifier,1),
	--			(@ApprovalGroupApprovalTypeItemId +	208	,	@ApprovalGroupApprovalTypeId +	118	,	@ApprovalGroupId+	32	,	'UI', @CreationTimestamp, @CreationUserIdentifier,1),
	--			(@ApprovalGroupApprovalTypeItemId +	209	,	@ApprovalGroupApprovalTypeId +	119	,	@ApprovalGroupId+	32	,	'UI', @CreationTimestamp, @CreationUserIdentifier,1),
	--			(@ApprovalGroupApprovalTypeItemId +	210	,	@ApprovalGroupApprovalTypeId +	120	,	@ApprovalGroupId+	32	,	'UI', @CreationTimestamp, @CreationUserIdentifier,1),
	--			(@ApprovalGroupApprovalTypeItemId +	211	,	@ApprovalGroupApprovalTypeId +	121	,	@ApprovalGroupId+	32	,	'UI', @CreationTimestamp, @CreationUserIdentifier,1),
	--			(@ApprovalGroupApprovalTypeItemId +	212	,	@ApprovalGroupApprovalTypeId +	122	,	@ApprovalGroupId+	32	,	'UI', @CreationTimestamp, @CreationUserIdentifier,1),
	--			(@ApprovalGroupApprovalTypeItemId +	213	,	@ApprovalGroupApprovalTypeId +	123	,	@ApprovalGroupId+	32	,	'UI', @CreationTimestamp, @CreationUserIdentifier,1),
	--			(@ApprovalGroupApprovalTypeItemId +	214	,	@ApprovalGroupApprovalTypeId +	124	,	@ApprovalGroupId+	32	,	'UI', @CreationTimestamp, @CreationUserIdentifier,1),
	--			(@ApprovalGroupApprovalTypeItemId +	215	,	@ApprovalGroupApprovalTypeId +	125	,	@ApprovalGroupId+	32	,	'UI', @CreationTimestamp, @CreationUserIdentifier,1),
	--			(@ApprovalGroupApprovalTypeItemId +	216	,	@ApprovalGroupApprovalTypeId +	126	,	@ApprovalGroupId+	32	,	'UI', @CreationTimestamp, @CreationUserIdentifier,1),
	--			(@ApprovalGroupApprovalTypeItemId +	217	,	@ApprovalGroupApprovalTypeId +	127	,	@ApprovalGroupId+	32	,	'UI', @CreationTimestamp, @CreationUserIdentifier,1),
	--			(@ApprovalGroupApprovalTypeItemId +	218	,	@ApprovalGroupApprovalTypeId +	128	,	@ApprovalGroupId+	32	,	'UI', @CreationTimestamp, @CreationUserIdentifier,1),
	--			(@ApprovalGroupApprovalTypeItemId +	219	,	@ApprovalGroupApprovalTypeId +	129	,	@ApprovalGroupId+	32	,	'UI', @CreationTimestamp, @CreationUserIdentifier,1),
	--			(@ApprovalGroupApprovalTypeItemId +	220	,	@ApprovalGroupApprovalTypeId +	130	,	@ApprovalGroupId+	32	,	'UI', @CreationTimestamp, @CreationUserIdentifier,1),
	--			(@ApprovalGroupApprovalTypeItemId +	221	,	@ApprovalGroupApprovalTypeId +	131	,	@ApprovalGroupId+	32	,	'UI', @CreationTimestamp, @CreationUserIdentifier,1),
	--			(@ApprovalGroupApprovalTypeItemId +	222	,	@ApprovalGroupApprovalTypeId +	132	,	@ApprovalGroupId+	32	,	'UI', @CreationTimestamp, @CreationUserIdentifier,1),
	--			(@ApprovalGroupApprovalTypeItemId +	223	,	@ApprovalGroupApprovalTypeId +	133	,	@ApprovalGroupId+	32	,	'UI', @CreationTimestamp, @CreationUserIdentifier,1),
	--			(@ApprovalGroupApprovalTypeItemId +	224	,	@ApprovalGroupApprovalTypeId +	134	,	@ApprovalGroupId+	32	,	'UI', @CreationTimestamp, @CreationUserIdentifier,1),
	--			(@ApprovalGroupApprovalTypeItemId +	225	,	@ApprovalGroupApprovalTypeId +	135	,	@ApprovalGroupId+	32	,	'UI', @CreationTimestamp, @CreationUserIdentifier,1),
	--			(@ApprovalGroupApprovalTypeItemId +	226	,	@ApprovalGroupApprovalTypeId +	136	,	@ApprovalGroupId+	32	,	'UI', @CreationTimestamp, @CreationUserIdentifier,1),
	--			(@ApprovalGroupApprovalTypeItemId +	227	,	@ApprovalGroupApprovalTypeId +	137	,	@ApprovalGroupId+	32	,	'UI', @CreationTimestamp, @CreationUserIdentifier,1),
	--			(@ApprovalGroupApprovalTypeItemId +	228	,	@ApprovalGroupApprovalTypeId +	138	,	@ApprovalGroupId+	32	,	'WRITE_REMARKS', @CreationTimestamp, @CreationUserIdentifier,1),
	--			(@ApprovalGroupApprovalTypeItemId +	229	,	@ApprovalGroupApprovalTypeId +	139	,	@ApprovalGroupId+	32	,	'WRITE_REMARKS', @CreationTimestamp, @CreationUserIdentifier,1),
	--			(@ApprovalGroupApprovalTypeItemId +	230	,	@ApprovalGroupApprovalTypeId +	140	,	@ApprovalGroupId+	32	,	'DELETE_REMARKS', @CreationTimestamp, @CreationUserIdentifier,1),
	--			(@ApprovalGroupApprovalTypeItemId +	231	,	@ApprovalGroupApprovalTypeId +	141	,	@ApprovalGroupId+	32	,	'QUEUE', @CreationTimestamp, @CreationUserIdentifier,1),
	--			(@ApprovalGroupApprovalTypeItemId +	232	,	@ApprovalGroupApprovalTypeId +	142	,	@ApprovalGroupId+	32	,	'TICKET', @CreationTimestamp, @CreationUserIdentifier,1),
	----------------------------------
	-- Insert Scripts
	----------------------------------
	PRINT 'START Script'
	SET @CreationUserIdentifier			= 'Amadeus CA Migration - US18758'
	
	SET @ApprovalGroupId = (Select ApprovalGroupId From  ApprovalGroup where ApprovalGroupName = 'Agilent') 
	DELETE ApprovalGroupApprovalTypeItem
	WHERE ApprovalGroupId = @ApprovalGroupId

	SET @CreationUserIdentifier			= 'Link - US18150'
	INSERT INTO COnfigurationParameter(ConfigurationParameterName,ConfigurationParameterValue,ContextId,CreationTimestamp,CreationUserIdentifier,VersionNumber)
	VALUES('CanadaTax', 'AB-.05-GST,BC-.05-GST,MB-.05-GST,NB-.13-HST,NL-.13-HST,NS-.15-HST,NT-.05-GST,NU-.05-GST,ON-.13-HST,PE-.14-HST,QC-.05-GST,SK-.05-GST,YT-.05-GST,QC-.09975-QST,', 11, @CreationTimestamp, @CreationUserIdentifier,1)

		
	PRINT 'END Script'


	COMMIT TRAN
END TRY
	
BEGIN CATCH
ROLLBACK TRAN

	DECLARE @ErrorMessage NVARCHAR(4000);
	SELECT @ErrorMessage=ERROR_MESSAGE()
	RAISERROR(@ErrorMessage, 10, 1);

END CATCH

