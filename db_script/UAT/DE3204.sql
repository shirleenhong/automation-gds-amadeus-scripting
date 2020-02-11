USE Desktop_Test
GO

BEGIN TRAN
BEGIN TRY
      declare @PnroutputID as int = (select pnroutputitemid from pnroutputitem where remarkformat = '%PassName% PASS-%FareType%')
--rollback
      update pnroutputitem set remarkformat = '%PassName% PASS-%FareType%' where remarkformat = '%PassName% PASS-%FareType% FARE'
       
--update
	  update pnroutputitem set remarkformat = '%PassName% PASS-%FareType% FARE' where remarkformat = '%PassName% PASS-%FareType%'
      COMMIT TRAN
END TRY
       
BEGIN CATCH
ROLLBACK TRAN

       DECLARE @ErrorMessage NVARCHAR(4000);
       SELECT @ErrorMessage=ERROR_MESSAGE()
       RAISERROR(@ErrorMessage, 10, 1);

END CATCH




 



