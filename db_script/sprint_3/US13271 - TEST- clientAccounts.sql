
USE Desktop_TEST
GO

BEGIN TRAN
	BEGIN TRY
	
		---------------------------------------
        -- BEGIN US13271
        ---------------------------------------
		DECLARE @CreationUserIdentifier AS varchar(255)
        DECLARE @CreationTimestamp	AS DATETIME = GETUTCDATE()	
        
		SET @CreationUserIdentifier     = 'Amadeus CA Migration - US13271'
              
		-- Rollback
		
		DELETE FROM ClientSubUnitClientAccount WHERE CreationUserIdentifier =   @CreationUserIdentifier   
		DELETE FROM ClientAccount WHERE CreationUserIdentifier =   @CreationUserIdentifier   
        ---- End Rollback

        -- Client Accounts
        
		INSERT INTO ClientAccount(ClientAccountNumber, ClientAccountName, SourceSystemCode, GloryAccountName, ClientMasterCode,EffectiveDate, CountryCode, CreationTimestamp, CreationUserIdentifier, VersionNumber)
		VALUES (	'1S3I'	,	'Amcor Tobacco'	,	'CA1'	,	'Amcor Tobacco'	,	'CA-S3I'	,	'20000101  12:00:00 AM'	,	'CA'	, @CreationTimestamp, @CreationUserIdentifier,1),
				(	'1PH3'	,	'Lanxess'	,	'CA1'	,	'Lanxess'	,	'CA-PH3'	,	'20000101  12:00:00 AM'	,	'CA'	, @CreationTimestamp, @CreationUserIdentifier,1),
				(	'1X2E'	,	'Sobey'	,	'CA1'	,	'Sobey'	,	'CA-X2E'	,	'20000101  12:00:00 AM'	,	'CA'	, @CreationTimestamp, @CreationUserIdentifier,1),
				(	'1T3H'	,	'Fujitsu-T3H'	,	'CA1'	,	'Fujitsu-T3H'	,	'CA-T3H'	,	'20000101  12:00:00 AM'	,	'CA'	, @CreationTimestamp, @CreationUserIdentifier,1),
				(	'1VB7'	,	'Imperial Tobacco'	,	'CA1'	,	'Imperial Tobacco'	,	'CA-VB7'	,	'20000101  12:00:00 AM'	,	'CA'	, @CreationTimestamp, @CreationUserIdentifier,1),
				(	'1D1Z'	,	'ClearResult'	,	'CA1'	,	'ClearResult'	,	'CA-D1Z'	,	'20000101  12:00:00 AM'	,	'CA'	, @CreationTimestamp, @CreationUserIdentifier,1),
				(	'1D7V'	,	'Gemalto '	,	'CA1'	,	'Gemalto '	,	'CA-D7V'	,	'20000101  12:00:00 AM'	,	'CA'	, @CreationTimestamp, @CreationUserIdentifier,1),
				(	'1G8B'	,	'Glaukos'	,	'CA1'	,	'Glaukos'	,	'CA-G8B'	,	'20000101  12:00:00 AM'	,	'CA'	, @CreationTimestamp, @CreationUserIdentifier,1),
				(	'1I4A'	,	'IQVIA (IMS Health)'	,	'CA1'	,	'IQVIA (IMS Health)'	,	'CA-I4A'	,	'20000101  12:00:00 AM'	,	'CA'	, @CreationTimestamp, @CreationUserIdentifier,1),
				(	'1M2J'	,	'Kelly Services'	,	'CA1'	,	'Kelly Services'	,	'CA-M2J'	,	'20000101  12:00:00 AM'	,	'CA'	, @CreationTimestamp, @CreationUserIdentifier,1),
				(	'1U1D'	,	'Mettler Toledo'	,	'CA1'	,	'Mettler Toledo'	,	'CA-U1D'	,	'20000101  12:00:00 AM'	,	'CA'	, @CreationTimestamp, @CreationUserIdentifier,1),
				(	'1P2W'	,	'Purdue Pharma'	,	'CA1'	,	'Purdue Pharma'	,	'CA-P2W'	,	'20000101  12:00:00 AM'	,	'CA'	, @CreationTimestamp, @CreationUserIdentifier,1),
				(	'1J8S'	,	'Securitas Electronic Security'	,	'CA1'	,	'Securitas Electronic Security'	,	'CA-J8S'	,	'20000101  12:00:00 AM'	,	'CA'	, @CreationTimestamp, @CreationUserIdentifier,1),
				(	'1SY3'	,	'Senvion'	,	'CA1'	,	'Senvion'	,	'CA-SY3'	,	'20000101  12:00:00 AM'	,	'CA'	, @CreationTimestamp, @CreationUserIdentifier,1),
				(	'1W9C'	,	'Sleeman Breweries'	,	'CA1'	,	'Sleeman Breweries'	,	'CA-W9C'	,	'20000101  12:00:00 AM'	,	'CA'	, @CreationTimestamp, @CreationUserIdentifier,1),
				(	'1R4L'	,	'Taylor Made'	,	'CA1'	,	'Taylor Made'	,	'CA-R4L'	,	'20000101  12:00:00 AM'	,	'CA'	, @CreationTimestamp, @CreationUserIdentifier,1),
				(	'1T1A'	,	'Trend Mico'	,	'CA1'	,	'Trend Mico'	,	'CA-T1A'	,	'20000101  12:00:00 AM'	,	'CA'	, @CreationTimestamp, @CreationUserIdentifier,1),
				(	'1XJ6'	,	'Under Armour'	,	'CA1'	,	'Under Armour'	,	'CA-XJ6'	,	'20000101  12:00:00 AM'	,	'CA'	, @CreationTimestamp, @CreationUserIdentifier,1),
				(	'1T2G'	,	'VIAVI Solutions'	,	'CA1'	,	'VIAVI Solutions'	,	'CA-T2G'	,	'20000101  12:00:00 AM'	,	'CA'	, @CreationTimestamp, @CreationUserIdentifier,1),
				(	'1F3X'	,	'Wolverine'	,	'CA1'	,	'Wolverine'	,	'CA-F3X'	,	'20000101  12:00:00 AM'	,	'CA'	, @CreationTimestamp, @CreationUserIdentifier,1),
				(	'1R3M'	,	'Yardi Systems'	,	'CA1'	,	'Yardi Systems'	,	'CA-R3M'	,	'20000101  12:00:00 AM'	,	'CA'	, @CreationTimestamp, @CreationUserIdentifier,1),
				(	'1F8Y'	,	'Agilent'	,	'CA1'	,	'Agilent'	,	'CA-F8Y'	,	'20000101  12:00:00 AM'	,	'CA'	, @CreationTimestamp, @CreationUserIdentifier,1),
				(	'1K4O'	,	'Linedata'	,	'CA1'	,	'Linedata'	,	'CA-K4O'	,	'20000101  12:00:00 AM'	,	'CA'	, @CreationTimestamp, @CreationUserIdentifier,1),
				(	'1K6L'	,	'Top Aces'	,	'CA1'	,	'Top Aces'	,	'CA-K6L'	,	'20000101  12:00:00 AM'	,	'CA'	, @CreationTimestamp, @CreationUserIdentifier,1),
				(	'1U9U'	,	'Jaguar Land Rover'	,	'CA1'	,	'Jaguar Land Rover'	,	'CA-U9U'	,	'20000101  12:00:00 AM'	,	'CA'	, @CreationTimestamp, @CreationUserIdentifier,1),
				(	'1I3F'	,	'Jaguar Land Rover'	,	'CA1'	,	'Jaguar Land Rover'	,	'CA-I3F'	,	'20000101  12:00:00 AM'	,	'CA'	, @CreationTimestamp, @CreationUserIdentifier,1)

		INSERT INTO ClientSubUnitClientAccount(ClientSubUnitGuid, CreationTimestamp, CreationUserIdentifier, VersionNumber, SourceSystemCode, ClientAccountNumber, DefaultFlag)
		VALUES('A:FA177',	@CreationTimestamp, @CreationUserIdentifier,1,'CA1',	'195U'	, 0),
				('A:FA177',	@CreationTimestamp, @CreationUserIdentifier,1,'CA1',	'1BGD'	, 0),
				('A:FA177',	@CreationTimestamp, @CreationUserIdentifier,1,'CA1',	'1CHB'	, 0),
				('A:FA177',	@CreationTimestamp, @CreationUserIdentifier,1,'CA1',	'1CKP'	, 0),
				('A:FA177',	@CreationTimestamp, @CreationUserIdentifier,1,'CA1',	'1D1Z'	, 0),
				('A:FA177',	@CreationTimestamp, @CreationUserIdentifier,1,'CA1',	'1D7V'	, 0),
				('A:FA177',	@CreationTimestamp, @CreationUserIdentifier,1,'CA1',	'1EQF'	, 0),
				('A:FA177',	@CreationTimestamp, @CreationUserIdentifier,1,'CA1',	'1F3X'	, 0),
				('A:FA177',	@CreationTimestamp, @CreationUserIdentifier,1,'CA1',	'1F8Y'	, 0),
				('A:FA177',	@CreationTimestamp, @CreationUserIdentifier,1,'CA1',	'1G8B'	, 0),
				('A:FA177',	@CreationTimestamp, @CreationUserIdentifier,1,'CA1',	'1I3F'	, 0),
				('A:FA177',	@CreationTimestamp, @CreationUserIdentifier,1,'CA1',	'1I4A'	, 0),
				('A:FA177',	@CreationTimestamp, @CreationUserIdentifier,1,'CA1',	'1J8S'	, 0),
				('A:FA177',	@CreationTimestamp, @CreationUserIdentifier,1,'CA1',	'1K4O'	, 0),
				('A:FA177',	@CreationTimestamp, @CreationUserIdentifier,1,'CA1',	'1K6L'	, 0),
				('A:FA177',	@CreationTimestamp, @CreationUserIdentifier,1,'CA1',	'1M2J'	, 0),
				('A:FA177',	@CreationTimestamp, @CreationUserIdentifier,1,'CA1',	'1P2W'	, 0),
				('A:FA177',	@CreationTimestamp, @CreationUserIdentifier,1,'CA1',	'1PH3'	, 0),
				('A:FA177',	@CreationTimestamp, @CreationUserIdentifier,1,'CA1',	'1R3M'	, 0),
				('A:FA177',	@CreationTimestamp, @CreationUserIdentifier,1,'CA1',	'1R4L'	, 0),
				('A:FA177',	@CreationTimestamp, @CreationUserIdentifier,1,'CA1',	'1S3I'	, 0),
				('A:FA177',	@CreationTimestamp, @CreationUserIdentifier,1,'CA1',	'1SGE'	, 0),
				('A:FA177',	@CreationTimestamp, @CreationUserIdentifier,1,'CA1',	'1SY3'	, 0),
				('A:FA177',	@CreationTimestamp, @CreationUserIdentifier,1,'CA1',	'1T1A'	, 0),
				('A:FA177',	@CreationTimestamp, @CreationUserIdentifier,1,'CA1',	'1T2G'	, 0),
				('A:FA177',	@CreationTimestamp, @CreationUserIdentifier,1,'CA1',	'1T3H'	, 0),
				('A:FA177',	@CreationTimestamp, @CreationUserIdentifier,1,'CA1',	'1U1D'	, 0),
				('A:FA177',	@CreationTimestamp, @CreationUserIdentifier,1,'CA1',	'1U9U'	, 0),
				('A:FA177',	@CreationTimestamp, @CreationUserIdentifier,1,'CA1',	'1UD2'	, 0),
				('A:FA177',	@CreationTimestamp, @CreationUserIdentifier,1,'CA1',	'1VB7'	, 0),
				('A:FA177',	@CreationTimestamp, @CreationUserIdentifier,1,'CA1',	'1W9C'	, 0),
				('A:FA177',	@CreationTimestamp, @CreationUserIdentifier,1,'CA1',	'1X2E'	, 0),
				('A:FA177',	@CreationTimestamp, @CreationUserIdentifier,1,'CA1',	'1XJ6'	, 0),
				('A:FA177',	@CreationTimestamp, @CreationUserIdentifier,1,'CA1',	'1YRE'	, 0),
				('A:FA177',	@CreationTimestamp, @CreationUserIdentifier,1,'CA1',	'1ZWK'	, 0),
				('A:FA177',	@CreationTimestamp, @CreationUserIdentifier,1,'CA1',	'1ZX4'	, 0)

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





