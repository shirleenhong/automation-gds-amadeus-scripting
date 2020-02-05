USE Desktop_Test
GO

BEGIN TRAN
BEGIN TRY

       DECLARE @CreationTimestamp        DATETIME = GETUTCDATE()    
       DECLARE @CreationUserIdentifier NVARCHAR(170)
       DECLARE @PNROutputGroupID         INT
       DECLARE @PNROutputItemId          INT
       DECLARE @PNROutputRemarkGroupId   INT
       DECLARE @ItineraryGroup          INT
       DECLARE @InvoiceGroup            INT
       DECLARE @ApplicationGroup        INT
       DECLARE @GeneralGroup            INT

       DECLARE @PNROutputItemIdPassName INT
       -----------------------
       -- ROLLBACK Scripts
       -----------------------
       SET @CreationUserIdentifier              = 'Amadeus CA Migration - US11196-update'	  
	   DELETE FROM PNROutputRemarkGroup WHERE CreationUserIdentifier = @CreationUserIdentifier     
       DELETE FROM PNROutputGroupPNROutputItem WHERE CreationUserIdentifier = @CreationUserIdentifier      
       DELETE FROM PNROutputItem WHERE CreationUserIdentifier = @CreationUserIdentifier

       ----------------------------------
       -- Insert Scripts
       ----------------------------------

       PRINT 'START Script'
             SET @CreationUserIdentifier              = 'Amadeus CA Migration - US11196-update'      
             SET @PNROutputItemId    =  (SELECT MAX(PNROutputItemId)
FROM [PNROutputItem])
             SET @PNROutputGroupID   =  (SELECT MAX(PNROutputGroupId)
FROM [PNROutputGroup])
             SET @GeneralGroup       =  (SELECT PNROutputGroupId
FROM [PNROutputGroup]
Where PNROutputGroupName = 'Canada Migration General Group')
		
		

           INSERT INTO [dbo].[PNROutputPlaceHolder]
    ([PNROutputPlaceHolderName],[PNROutputPlaceHolderRegularExpresssion],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber])
VALUES
    ( '%ToucheLess%', '([A-Z0-9]{3})$', @CreationTimestamp, @CreationUserIdentifier, 1 )
                                         
			
           INSERT INTO [dbo].[PNROutputItem]
    ([PNROutputItemId],[PNROutputRemarkTypeCode],[PNROutputBindingTypeCode], [PNROutputUpdateTypeCode],[GDSRemarkQualifier],[RemarkFormat],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber],[PNROutputItemDefaultLanguageCode],[PNROutputItemXMLFormat])
VALUES(@PNROutputItemId + 1, 3, '0', 2, '', 'EB/-%ToucheLess%', @CreationTimestamp, @CreationUserIdentifier, 1, 'en-GB', NULL)
                                               
            INSERT INTO [dbo].[PNROutputGroupPNROutputItem]
    ([PNROutputGroupId],[PNROutputItemId],[SequenceNumber],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber],[DataStandardizationVersion],[LayoutVersion])
VALUES(@GeneralGroup, @PNROutputItemId + 1, 0, @CreationTimestamp, @CreationUserIdentifier, 1, '1', '1')
        

       PRINT 'END Script'

       COMMIT TRAN
END TRY
       
BEGIN CATCH
ROLLBACK TRAN

       DECLARE @ErrorMessage NVARCHAR(4000);
       SELECT @ErrorMessage=ERROR_MESSAGE()
       RAISERROR(@ErrorMessage, 10, 1);

END CATCH




 



