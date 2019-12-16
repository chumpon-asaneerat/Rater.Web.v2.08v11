SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author: Chumpon Asaneerat
-- Name: BeginLog.
-- Description:	Begin Log.
-- [== History ==]
-- <2018-05-09> :
--	- Stored Procedure Created.
--
-- [== Example ==]
--
--exec BeginLog N'test';
-- =============================================
CREATE PROCEDURE [dbo].[BeginLog]
(
 @spName nvarchar(50)
,@logId int output
)
AS
BEGIN
DECLARE @seq int;
DECLARE @tSPName nvarchar(50);
DECLARE @msg nvarchar(MAX);
	-- SET VARIABLES.
	SET @tSPName = LTRIM(RTRIM(@spName));
	SET @msg = N'Begin Log for : ' + LTRIM(RTRIM(@spName));

	SELECT @logId = MAX(LogId)
	  FROM LocalLog
	 WHERE LOWER(LTRIM(RTRIM(SPName))) = LOWER(@tSPName);
	IF (@logId IS NULL OR @logId = 0)
	BEGIN
		SET @logId = 1; -- set logid to 1
		SET @seq = 1; -- set seq to 1
	END
	ELSE
	BEGIN
		SET @logId = @logId + 1; -- Increase log id.
		SELECT @seq = MAX(Seq)
		  FROM LocalLog
		 WHERE LOWER(LTRIM(RTRIM(SPName))) = LOWER(@tSPName)
		   AND LogId = @logId;
		IF (@seq IS NULL OR @seq = 0)
		BEGIN
			SET @seq = 1;
		END
		ELSE
		BEGIN
			SET @seq = @seq + 1; -- Increase sequence.
		END
	END

	-- INSERT DATA TO LOCAL LOG.
	INSERT INTO LocalLog
	(
		 LogId
		,Seq
		,SPName
		,Msg
	)
	VALUES
	(
		 @logId
		,@seq 
		,@tSPName
		,@msg
	)
END

GO
