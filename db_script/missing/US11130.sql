USE Desktop_Test
GO

BEGIN TRAN
BEGIN TRY

       DECLARE @CreationTimestamp        DATETIME = GETUTCDATE()    
       DECLARE @CreationUserIdentifier NVARCHAR(170)


       -----------------------
       -- ROLLBACK Scripts
       -----------------------
       SET @CreationUserIdentifier              = 'Amadeus CA Migration - US11130'
       DELETE FROM ConfigurationParameter WHERE CreationUserIdentifier = @CreationUserIdentifier

       ----------------------------------
       -- Insert Scripts
       ----------------------------------
       PRINT 'START Script'

              SET @CreationUserIdentifier = 'Amadeus CA Migration - US11130' 
              -- Configs
              INSERT INTO ConfigurationParameter(ConfigurationParameterName, ConfigurationParameterValue, ContextId, CreationTimestamp, CreationUserIdentifier, VersionNumber)
                     VALUES ('LeisureOnDemand', 'YQBWL2100,YTOWL2101,YVRWL2103,YOWWL2105,YXEWL2102,YTOWL210A,YVRWL2102,YTOWL2105,YTOWL2103,YTOWL210J,YTOWL2119, YXEWL2101,YTOWL2109,YOWWL2102', 11, @CreationTimestamp , @CreationUserIdentifier, 1)

       PRINT 'END Script'

       COMMIT TRAN
END TRY
       
BEGIN CATCH
ROLLBACK TRAN

       DECLARE @ErrorMessage NVARCHAR(4000);
       SELECT @ErrorMessage=ERROR_MESSAGE()
       RAISERROR(@ErrorMessage, 10, 1);

END CATCH 





