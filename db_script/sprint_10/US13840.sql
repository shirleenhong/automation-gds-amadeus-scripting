USE [Desktop_Test]
GO

BEGIN TRAN
BEGIN TRY

DECLARE @CreationUserIdentifier		NVARCHAR(150) = 'Amadeus CA Migration - US13840'


DELETE FROM ConfigurationParameter where CreationUserIdentifier = @CreationUserIdentifier

INSERT INTO ConfigurationParameter
    (ConfigurationParameterName, ConfigurationParameterValue, ContextId, CreationTimestamp, CreationUserIdentifier, VersionNumber)
VALUES
    ('CA_Script_Aqua_Fee_Excluded_CFA ', 'S2K,95K,AFV,CKP,CTC,CVC,CWT,F1C,FJS,FNF,GYD,HA1,HF4,HG2,HNC,HV3,I8M,JJ1,KO3,L1A,L5K,MQ4,NKC,OL1,PH3,RBM,RBP,RBC,RCL,REM,RSB,RSG,RVP,TZL,VCP,WEI,YEX,YFV,YSN,YTX,ZXM,ZZB,V9P,D2M,T1E,W1L,H8A,R3M,Q9Q,Q3I,X1L', 11, GETUTCDATE()  , @CreationUserIdentifier, 1)

	
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