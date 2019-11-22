USE Desktop_Test
GO

BEGIN TRAN
BEGIN TRY
	
	DECLARE @CreationUserIdentifier	VARCHAR(150)
    DECLARE @CreationTimeStamp		DATETIME = GETUTCDATE()

	DECLARE @PNROutputItemID AS INT 
	DECLARE @PNROutputGroupID AS INT
	DECLARE @GeneralPNROutputGroupID INT

	SET @CreationUserIdentifier	='Amadeus CA Migration - US10986'
	SET @PNROutputItemId = (SELECT MAX(PNROutputItemID) FROM PNROutputItem)
	SET @PNROutputGroupID =(SELECT PNROutputGroupID from PNROutputGroup where PNROutputGroupName ='Canada Migration Itinerary Group')
	SET @GeneralPNROutputGroupID =(SELECT PNROutputGroupID from PNROutputGroup where PNROutputGroupName ='Canada Migration General Group')
	
	DELETE FROM PNROutputCondition WHERE CreationUserIdentifier =@CreationUserIdentifier
	DELETE FROM PNROutputGroupPNROutputItem WHERE CreationUserIdentifier =@CreationUserIdentifier		
	DELETE FROM PNROutputItem WHERE CreationUserIdentifier =@CreationUserIdentifier	
	DELETE FROM PNROutputPlaceHolder WHERE CreationUserIdentifier =@CreationUserIdentifier	

	INSERT INTO [dbo].[PNROutputPlaceHolder]	([PNROutputPlaceHolderName],[PNROutputPlaceHolderRegularExpresssion],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber])
					VALUES    ('%WebLocator%', '(.*)', @CreationTimestamp, @CreationUserIdentifier, 1 ),
							  ('%CancelFee%', '([0-9]*\.{0,1}[0-9]{0,2})', @CreationTimestamp, @CreationUserIdentifier, 1 ),
							  ('%CancelGst%', '([0-9]*\.{0,1}[0-9]{0,2})', @CreationTimestamp, @CreationUserIdentifier, 1 ),
							  ('%CancelHst%', '([0-9]*\.{0,1}[0-9]{0,2})', @CreationTimestamp, @CreationUserIdentifier, 1 ),
							  ('%CancelQst%', '([0-9]*\.{0,1}[0-9]{0,2})', @CreationTimestamp, @CreationUserIdentifier, 1 ),
							  ('%CancelOthTax%', '([0-9]*\.{0,1}[0-9]{0,2})', @CreationTimestamp, @CreationUserIdentifier, 1 ),
							  ('%CATotalPrice%', '([0-9]*\.{0,1}[0-9]{0,2})', @CreationTimestamp, @CreationUserIdentifier, 1 ),
							  ('%OrgOid%', '(.*)', @CreationTimestamp, @CreationUserIdentifier, 1 ),
							  ('%CaRefundCommision%', '([0-9]*\.{0,1}[0-9]{0,2})', @CreationTimestamp, @CreationUserIdentifier, 1 ),
							  ('%CaAmadeusNotes1%', '(.*)', @CreationTimestamp, @CreationUserIdentifier, 1 ),
							  ('%CaAmadeusNotes2%', '(.*)', @CreationTimestamp, @CreationUserIdentifier, 1 ),
							  ('%CancelAirlineCode%', '([A-Z0-9]{2})', @CreationTimestamp, @CreationUserIdentifier, 1 ),
							  ('%CancelAirlineCodePassChg%', '([A-Z0-9]{2})', @CreationTimestamp, @CreationUserIdentifier, 1 )

	INSERT INTO [dbo].[PNROutputItem]	([PNROutputItemId],[PNROutputRemarkTypeCode],[PNROutputBindingTypeCode], [PNROutputUpdateTypeCode],[GDSRemarkQualifier],[RemarkFormat],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber],[PNROutputItemDefaultLanguageCode],[PNROutputItemXMLFormat])
									VALUES (@PNROutputItemID + 1,1,'S',1,'' ,'%AirlineCode% PASS CANCELLATION/CF-%WebLocator%', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL), --RIR 
										   (@PNROutputItemID + 2,0,'S',1,'T','TKT%TktRemarkNbr%-BA-%CancelFee%/TX1-%CancelGst%XG/TX2-%CancelHst%RC/TX3-%CancelQst%XQ/TX4-%CancelOthTax%XT/COMM-0.00', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),--RMT
										   (@PNROutputItemID + 3,0,'0',1,'X' ,'**********************************************', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),	 --RMX
										   (@PNROutputItemID + 4,0,'0',1,'X' ,'ATTN ACCTNG-NONBSP %WebLocator% REFUND-%CurrentDateY%', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),	 --RMX
										   (@PNROutputItemID + 5,0,'0',1,'X' ,'NONBSP-%SupplierCode%-ISSUE OID-%OrgOid%', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),  --RMX
										   (@PNROutputItemID + 6,0,'0',1,'X' ,'REFUND BASE-%CancelFee% GST-%CancelGst% HST-%CancelHst% QST-%CancelQst% OTH TAX-%CancelOthTax%', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),  --RMX
										   (@PNROutputItemID + 7,0,'0',1,'X' ,'REFUND COMMISSION %CaRefundCommision%', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),  --RMX										   
										   (@PNROutputItemID + 8,0,'0',1,'X' ,'%CaAmadeusNotes1%', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),  --RMX
										   (@PNROutputItemID + 9,0,'0',1,'X' ,'%CaAmadeusNotes2% ', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),  --RMX
										   (@PNROutputItemID + 10,0,'0',1,'X' ,'**********************************************', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),	 --RMX
										   (@PNROutputItemID + 11,1,'0',1,'' ,'THE PRICE FOR THIS ITINERARY IS %CATotalPrice% INCLUDING TAXES.', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL), --RIR 
										   (@PNROutputItemID + 12,1,'0',1,'' ,'%CancelAirlineCode% PASS PNR CANCELLED PER PASSENGER REQUEST.', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL), --RIR 
										   (@PNROutputItemID + 13,1,'0',1,'' ,'CANCELLATION FEE OF CAD%CancelFee% PLUS TAX HAS BEEN CHARGED TO', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL), --RIR 
										   (@PNROutputItemID + 14,1,'0',1,'' ,'THE TRAVELLERS CREDIT CARD.', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL), --RIR 
										   (@PNROutputItemID + 15,0,'0',1,'G' ,'%CancelAirlineCodePassChg%PASSCHG', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL) --RMG
										  										
	INSERT INTO PNROutputGroupPNROutputItem (PNROutputGroupId, PNROutputItemId, SequenceNumber, CreationTimestamp, CreationUserIdentifier, VersionNumber, DataStandardizationVersion, LayoutVersion)
	VALUES									(@PNROutputGroupID		 ,  @PNROutputItemID + 1, 1, @CreationTimeStamp, @CreationUserIdentifier, 1, 1, 1),
											(@GeneralPNROutputGroupID,  @PNROutputItemID + 2, 2, @CreationTimeStamp, @CreationUserIdentifier, 1, 1, 1),
											(@GeneralPNROutputGroupID,  @PNROutputItemID + 3, 3, @CreationTimeStamp, @CreationUserIdentifier, 1, 1, 1),
											(@GeneralPNROutputGroupID,  @PNROutputItemId + 4, 4, @CreationTimeStamp, @CreationUserIdentifier, 1, 1, 1),
											(@GeneralPNROutputGroupID,  @PNROutputItemID + 5, 5, @CreationTimeStamp, @CreationUserIdentifier, 1, 1, 1),
											(@GeneralPNROutputGroupID,  @PNROutputItemID + 6, 6, @CreationTimeStamp, @CreationUserIdentifier, 1, 1, 1),
											(@GeneralPNROutputGroupID,  @PNROutputItemID + 7, 6, @CreationTimeStamp, @CreationUserIdentifier, 1, 1, 1),
											(@GeneralPNROutputGroupID,  @PNROutputItemId + 8, 7, @CreationTimeStamp, @CreationUserIdentifier, 1, 1, 1),
											(@GeneralPNROutputGroupID,  @PNROutputItemID + 9, 8, @CreationTimeStamp, @CreationUserIdentifier, 1, 1, 1),		
											(@GeneralPNROutputGroupID,  @PNROutputItemID + 10, 9, @CreationTimeStamp, @CreationUserIdentifier, 1, 1, 1),		
											(@PNROutputGroupID       ,  @PNROutputItemID + 11, 10, @CreationTimeStamp, @CreationUserIdentifier, 1, 1, 1),		
											(@PNROutputGroupID       ,  @PNROutputItemID + 12, 11, @CreationTimeStamp, @CreationUserIdentifier, 1, 1, 1),		
											(@PNROutputGroupID       ,  @PNROutputItemID + 13, 12, @CreationTimeStamp, @CreationUserIdentifier, 1, 1, 1),		
											(@PNROutputGroupID       ,  @PNROutputItemID + 14, 13, @CreationTimeStamp, @CreationUserIdentifier, 1, 1, 1),		
											(@GeneralPNROutputGroupID,  @PNROutputItemID + 15, 14, @CreationTimeStamp, @CreationUserIdentifier, 1, 1, 1)
																						
	INSERT INTO [dbo].[PNROutputCondition] ([PNROutputItemId],[PNROutputConditionName],[PNROutputConditionValue],[CreationTimestamp],[CreationUserIdentifier],[LastUpdateTimestamp],[LastUpdateUserIdentifier],[VersionNumber])
									VALUES   (@PNROutputItemID + 3,'CARefundStart','true',@CreationTimeStamp,@CreationUserIdentifier,null,null,1),
										     (@PNROutputItemID + 10,'CARefundEnd','true',@CreationTimeStamp,@CreationUserIdentifier,null,null,1),
									         (@PNROutputItemID + 14,'CACancelRemark','true',@CreationTimeStamp,@CreationUserIdentifier,null,null,1)
																						
	--rollback tran
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

