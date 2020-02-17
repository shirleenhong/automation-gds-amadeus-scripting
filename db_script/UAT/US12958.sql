USE Desktop_Test
GO

BEGIN TRAN
BEGIN TRY

       DECLARE @CreationTimestamp        DATETIME = GETUTCDATE()    
       DECLARE @CreationUserIdentifier NVARCHAR(170)


       -----------------------
       -- ROLLBACK Scripts
       -----------------------
       SET @CreationUserIdentifier              = 'Amadeus CA Migration - US12958'
       DELETE FROM ConfigurationParameter WHERE CreationUserIdentifier = @CreationUserIdentifier


       
       ----------------------------------
       -- Insert Scripts
       ----------------------------------

       PRINT 'START Script'

	   insert into ConfigurationParameter
values
    ( 'CA_AssignInvoiceToNewOidUsers', 'UCAG098,U28CM02,UCKR000,U013PXM,U001CM,U002MCC,U068SXH', 11,
        @CreationTimestamp, @CreationUserIdentifier, null, null, 1)
	                                              

       PRINT 'END Script'

       COMMIT TRAN
END TRY
       
BEGIN CATCH
ROLLBACK TRAN

       DECLARE @ErrorMessage NVARCHAR(4000);
       SELECT @ErrorMessage=ERROR_MESSAGE()
       RAISERROR(@ErrorMessage, 10, 1);

END CATCH




 



