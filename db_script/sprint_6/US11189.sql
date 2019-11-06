USE Desktop_Test
GO

BEGIN TRAN
BEGIN TRY

	DECLARE @CreationTimestamp		DATETIME = GETUTCDATE()	
	DECLARE @CreationUserIdentifier NVARCHAR(170)
	DECLARE @PNROutputItemId		    INT
	DECLARE @PNROutputGroupGeneralID	INT

	
	-----------------------
	-- ROLLBACK Scripts
	-----------------------
	SET @CreationUserIdentifier		   =   'Amadeus CA Migration - US11189'
	DELETE FROM PNROutputGroupPNROutputItem WHERE CreationUserIdentifier = @CreationUserIdentifier
	DELETE FROM PNROutputCondition WHERE CreationUserIdentifier = @CreationUserIdentifier
	DELETE FROM PNROutputItem WHERE CreationUserIdentifier = @CreationUserIdentifier
	DELETE FROM PNROutputPlaceHolder WHERE	CreationUserIdentifier = @CreationUserIdentifier

	
	----------------------------------
	-- Insert Scripts
	----------------------------------
	PRINT 'START Script'
		SET @CreationUserIdentifier	   =    'Amadeus CA Migration - US11189'	
		SET @PNROutputItemId           =    (SELECT MAX(PNROutputItemId)  FROM [PNROutputItem])
		SET @PNROutputGroupGeneralID      =	(SELECT PNROutputGroupId  FROM [PNROutputGroup] Where PNROutputGroupName = 'Canada Migration General Group')
	

		INSERT INTO [dbo].[PNROutputPlaceHolder]([PNROutputPlaceHolderName],[PNROutputPlaceHolderRegularExpresssion],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber])
									VALUES ( '%VRsn%', '(.*)',@CreationTimestamp, @CreationUserIdentifier, 1 ),
										   ( '%VTkt%', '(.*)',@CreationTimestamp, @CreationUserIdentifier, 1 ),
										   ( '%Auth%', '(.*)',@CreationTimestamp, @CreationUserIdentifier, 1 ),
										   ( '%RevType%', '(.*)',@CreationTimestamp, @CreationUserIdentifier, 1 ),
										   ( '%VoidDate%' ,'[0-9]{1,2}[A-Z]{3}', @CreationTimestamp, @CreationUserIdentifier, 1 )
												
		 		
		INSERT INTO [dbo].[PNROutputItem]	([PNROutputItemId],[PNROutputRemarkTypeCode],[PNROutputBindingTypeCode], [PNROutputUpdateTypeCode],[GDSRemarkQualifier],[RemarkFormat],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber],[PNROutputItemDefaultLanguageCode],[PNROutputItemXMLFormat])
									VALUES  (@PNROutputItemId + 1,0,'0',1,'X','REISS VOID TKT/%VoidDate%-USE ORIG AUTH %Auth%', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),
									        (@PNROutputItemId + 2,0,'0',1,'X','ATTN BRANCH ADMIN - VOID TKT NBR %VTkt%', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),
								        	(@PNROutputItemId + 3,0,'0',1,'X','VOID REASON - %VRsn%', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),
											(@PNROutputItemId + 4,0,'0',1,'X','%VoidDate%/%CounselorLastName% %CounselorFirstName%', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),
											(@PNROutputItemId + 5,0,'0',1,'X','ATTN NONBSP - %RevType%', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL)

										          
		INSERT INTO [dbo].[PNROutputGroupPNROutputItem]	([PNROutputGroupId],[PNROutputItemId],[SequenceNumber],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber],[DataStandardizationVersion],[LayoutVersion])     
									VALUES	(@PNROutputGroupGeneralID , @PNROutputItemId + 1, 0, @CreationTimestamp, @CreationUserIdentifier,1,'1','1'),
										    (@PNROutputGroupGeneralID , @PNROutputItemId + 2, 0, @CreationTimestamp, @CreationUserIdentifier,1,'1','1'),
									        (@PNROutputGroupGeneralID , @PNROutputItemId + 3, 0, @CreationTimestamp, @CreationUserIdentifier,1,'1','1'),
									        (@PNROutputGroupGeneralID , @PNROutputItemId + 4, 0, @CreationTimestamp, @CreationUserIdentifier,1,'1','1'),
									        (@PNROutputGroupGeneralID , @PNROutputItemId + 5, 0, @CreationTimestamp, @CreationUserIdentifier,1,'1','1')


	PRINT 'END Script'


	COMMIT TRAN
END TRY
	
BEGIN CATCH
ROLLBACK TRAN

	DECLARE @ErrorMessage NVARCHAR(4000);
	SELECT @ErrorMessage=ERROR_MESSAGE()
	RAISERROR(@ErrorMessage, 10, 1);

END CATCH

