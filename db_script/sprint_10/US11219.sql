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
       
       -----------------------
       -- ROLLBACK Scripts
       -----------------------
       SET @CreationUserIdentifier              = 'Amadeus CA Migration - US11219'
       DELETE FROM PnrOutputCondition WHERE CreationUserIdentifier = @CreationUserIdentifier
       DELETE FROM PNROutputGroupPNROutputItem WHERE CreationUserIdentifier = @CreationUserIdentifier
       DELETE FROM PNROutputGroup WHERE CreationUserIdentifier = @CreationUserIdentifier
       DELETE FROM PNROutputGroupCountry WHERE CreationUserIdentifier = @CreationUserIdentifier
       DELETE FROM PNROutputItemLanguage WHERE CreationUserIdentifier = @CreationUserIdentifier
       DELETE FROM PNROutputItem WHERE CreationUserIdentifier = @CreationUserIdentifier
       DELETE FROM PNROutputPlaceHolder WHERE   CreationUserIdentifier = @CreationUserIdentifier

       
       ----------------------------------
       -- Insert Scripts
       ----------------------------------

       PRINT 'START Script'
             SET @CreationUserIdentifier              = 'Amadeus CA Migration - US11219'      
             SET @PNROutputItemId    =  (SELECT MAX(PNROutputItemId)   FROM [PNROutputItem])
             SET @PNROutputGroupID   =  (SELECT MAX(PNROutputGroupId)  FROM [PNROutputGroup])
             SET @GeneralGroup       =  (SELECT PNROutputGroupId  FROM [PNROutputGroup] Where PNROutputGroupName = 'Canada Migration General Group')


           INSERT INTO [dbo].[PNROutputPlaceHolder]([PNROutputPlaceHolderName],[PNROutputPlaceHolderRegularExpresssion],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber])
                                                            VALUES    ( '%TicketSequence%', '(.*)',@CreationTimestamp, @CreationUserIdentifier, 1 ),
                                                                      ( '%NumberOfTickets%', '(.*)',@CreationTimestamp, @CreationUserIdentifier, 1 ),
																	  ( '%TktRoute%', '(.*)',@CreationTimestamp, @CreationUserIdentifier, 1 ),
																	  ( '%InvSegment%', '(.*)',@CreationTimestamp, @CreationUserIdentifier, 1 )

                                                                                      
             INSERT INTO [dbo].[PNROutputItem]       ([PNROutputItemId],[PNROutputRemarkTypeCode],[PNROutputBindingTypeCode], [PNROutputUpdateTypeCode],[GDSRemarkQualifier],[RemarkFormat],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber],[PNROutputItemDefaultLanguageCode],[PNROutputItemXMLFormat])
                                                            VALUES       (@PNROutputItemId + 1,0,'S',1,'T','TKT%TicketSequence%-%InvSegment%', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),
                                                                          (@PNROutputItemId + 5,0,'S',1,'T','TKT%TicketSequence%-%TktRoute%', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),
                                                                          (@PNROutputItemId + 8,0,'0',1,'Q','ADVISED USTRAVEL A PASSPORT AND VISA ARE REQUIRED', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),
                                                                          (@PNROutputItemId + 9,0,'0',1,'Q','ADVISED USTRAVEL 6 MONTH FROM DEPARTURE', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL),
                                                                          (@PNROutputItemId + 10,0,'0',1,'T','SPLIT%NumberOfTickets%', @CreationTimestamp,@CreationUserIdentifier,1,'en-GB',NULL)
                                                                             
             INSERT INTO [dbo].[PNROutputGroupPNROutputItem] ([PNROutputGroupId],[PNROutputItemId],[SequenceNumber],[CreationTimestamp],[CreationUserIdentifier],[VersionNumber],[DataStandardizationVersion],[LayoutVersion])     
                                                            VALUES       (@GeneralGroup, @PNROutputItemId + 1,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
                                                                          (@GeneralGroup, @PNROutputItemId + 2,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
                                                                          (@GeneralGroup, @PNROutputItemId + 3,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
                                                                          (@GeneralGroup, @PNROutputItemId + 4,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
                                                                          (@GeneralGroup, @PNROutputItemId + 5,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
                                                                          (@GeneralGroup, @PNROutputItemId + 6,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
                                                                          (@GeneralGroup, @PNROutputItemId + 7,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
                                                                          (@GeneralGroup, @PNROutputItemId + 8,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
                                                                          (@GeneralGroup, @PNROutputItemId + 9,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1'),
                                                                          (@GeneralGroup, @PNROutputItemId + 10,0,@CreationTimestamp,@CreationUserIdentifier,1,'1','1')

             INSERT INTO [dbo].[PnrOutputCondition] (PNROutputItemId,PNROutputConditionName,PNROutputConditionValue,CreationTimestamp,CreationUserIdentifier,VersionNumber)
                                                            VALUES (@PNROutputItemId + 8, 'AquaTicketingCondition', 'true', @CreationTimestamp, @CreationUserIdentifier, 1),
                                                                      (@PNROutputItemId + 9, 'AquaTicketingCondition', 'true', @CreationTimestamp, @CreationUserIdentifier, 1)


       PRINT 'END Script'

       COMMIT TRAN
END TRY
       
BEGIN CATCH
ROLLBACK TRAN

       DECLARE @ErrorMessage NVARCHAR(4000);
       SELECT @ErrorMessage=ERROR_MESSAGE()
       RAISERROR(@ErrorMessage, 10, 1);

END CATCH




 



