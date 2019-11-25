SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author: Chumpon Asaneerat
-- Name: Log.
-- Description:	Log the message.
-- [== History ==]
-- <2018-05-09> :
--	- Stored Procedure Created.
--
-- [== Example ==]
--
-- DECLARE @logId = 1;
-- DECLARE @spName = N'test'
--exec Log N'message 1', @logId, @spName;
-- =============================================
CREATE PROCEDURE [dbo].[Log]
(
 @msg nvarchar(MAX)
,@logId int
,@spName nvarchar(50)
)
AS
BEGIN
DECLARE @seq int;
DECLARE @tSPName nvarchar(50);
	-- SET VARIABLES.
	SET @tSPName = LTRIM(RTRIM(@spName));

	SELECT @logId = MAX(LogId)
	  FROM LocalLog
	 WHERE LOWER(LTRIM(RTRIM(SPName))) = LOWER(@tSPName);
	IF (@logId IS NOT NULL AND @logId > 0)
	BEGIN
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
END

GO
