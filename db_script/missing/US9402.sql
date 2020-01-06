
USE Desktop_Test
GO

BEGIN TRAN
BEGIN TRY

       DECLARE @CreationTimestamp        DATETIME = GETUTCDATE()    
       DECLARE @CreationUserIdentifier NVARCHAR(170)
       DECLARE @PNROutputGroupID         INT
       DECLARE @PNROutputItemId          INT
       DECLARE @PNROutputRemarkGroupId          INT
       
       
       -----------------------
       -- ROLLBACK Scripts
       -----------------------
       SET @CreationUserIdentifier              = 'Amadeus CA Migration - US11821'
       DELETE FROM PNROutputRemarkGroupPNROutputItem WHERE    CreationUserIdentifier = @CreationUserIdentifier
       DELETE FROM PNROutputRemarkGroup WHERE   CreationUserIdentifier = @CreationUserIdentifier
       DELETE FROM PNROutputGroupPNROutputItem WHERE   CreationUserIdentifier = @CreationUserIdentifier
       DELETE FROM PNROutputItem WHERE CreationUserIdentifier = @CreationUserIdentifier
       DELETE FROM PNROutputPlaceHolder WHERE   CreationUserIdentifier = @CreationUserIdentifier

       ----------------------------------
       -- Insert Scripts
       ----------------------------------
       PRINT 'START Script'
              SET @CreationUserIdentifier              = 'Amadeus CA Migration - US11821' 
              SET @PNROutputItemId =     (SELECT MAX(PNROutputItemId)  FROM [PNROutputItem])
              SET @PNROutputRemarkGroupId = (SELECT MAX(PNROutputRemarkGroupId)  FROM PNROutputRemarkGroup)
              SET @PNROutputGroupId       =     (SELECT PNROutputGroupId  FROM [PNROutputGroup] Where PNROutputGroupName = 'Canada Migration General Group')
              

              INSERT INTO [dbo].[PNROutputPlaceHolder]([PNROutputPlaceHolderName],[PNROutputPlaceHolderRegularExpresssion],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber])
                                                              VALUES( '%NbrNo%', '[0-9]{1,}[A-Z]{1,}[0-9]{1,}[A-Z]{1,}',@CreationTimestamp, @CreationUserIdentifier, 1 ),
                                                                       ( '%IrdStatus%', '(ACCEPTED)|(DECLINED)|(NO LFO)|(ACCEPTEDCP)|(ACCEPTEDLFO)',@CreationTimestamp, @CreationUserIdentifier, 1 ),
                                                                    ( '%IrdSavings%', '\d+(\.\d{1,2})',@CreationTimestamp, @CreationUserIdentifier, 1 ),
                                                                       ( '%LowFareSavings%', '\d+(\.\d{1,2})',@CreationTimestamp, @CreationUserIdentifier, 1 ),
                                                                       ( '%IrdCurrency%', '([A-Z]{3})',@CreationTimestamp, @CreationUserIdentifier, 1 )                                                      
              
                           
              INSERT INTO [dbo].[PNROutputItem]       ([PNROutputItemId],[PNROutputRemarkTypeCode],[PNROutputBindingTypeCode], [PNROutputUpdateTypeCode],[GDSRemarkQualifier],[RemarkFormat],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber],[PNROutputItemDefaultLanguageCode],[PNROutputItemXMLFormat])
                                                              VALUES (@PNROutputItemId + 1,0,'S',1,'F','----------CWT IRD RATE NBR %NbrNo%-------%IrdStatus%', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),
                                                                           (@PNROutputItemId + 2,0,'S',1,'F','--------IRD SAVINGS ACHIEVED %IrdCurrency% %IrdSavings% --------', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),
                                                                           (@PNROutputItemId + 3,0,'S',1,'F','-----LOW FARE OPTION SAVINGS ACHIEVED %LowFareSavings%---', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL)

              INSERT INTO [dbo].[PNROutputGroupPNROutputItem]       ([PNROutputGroupId],[PNROutputItemId],[SequenceNumber],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber],[DataStandardizationVersion],[LayoutVersion])     
                                                              VALUES (@PNROutputGroupId, @PNROutputItemId + 1,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
                                                                           (@PNROutputGroupId, @PNROutputItemId + 2,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
                                                                           (@PNROutputGroupId, @PNROutputItemId + 3,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1')

              INSERT INTO dbo.PNROutputRemarkGroup(PNROutputRemarkGroupId, PNROutputRemarkGroupName, CreationTimestamp, CreationUserIdentifier, LastUpdateTimestamp, LastUpdateUserIdentifier, VersionNumber,       PNROutputRemarkGroupKey) 
              VALUES                                                 (@PNROutputRemarkGroupId + 1, 'CanadaAmadeusIrdRemarks', @CreationTimestamp,  @CreationUserIdentifier, NULL, NULL, 1,NULL)

                                                                           
              INSERT INTO [dbo].[PNROutputRemarkGroupPNROutputItem]([PNROutputRemarkGroupId],PNROutputItemId,[CreationTimestamp],[CreationUserIdentifier],[VersionNumber])
                                  VALUES(@PNROutputRemarkGroupId + 1 ,@PNROutputItemId + 1,@CreationTimestamp,@CreationUserIdentifier,1),
                                           (@PNROutputRemarkGroupId + 1 ,@PNROutputItemId + 2,@CreationTimestamp,@CreationUserIdentifier,1),
                                           (@PNROutputRemarkGroupId + 1 ,@PNROutputItemId + 3,@CreationTimestamp,@CreationUserIdentifier,1)


       PRINT 'END Script'

       COMMIT TRAN
END TRY
       
BEGIN CATCH
ROLLBACK TRAN

       DECLARE @ErrorMessage NVARCHAR(4000);
       SELECT @ErrorMessage=ERROR_MESSAGE()
       RAISERROR(@ErrorMessage, 10, 1);

END CATCH
