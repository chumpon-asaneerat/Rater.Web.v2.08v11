SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author: Chumpon Asaneerat
-- Name: SignOut.
-- Description:	Sign Out.
-- [== History ==]
-- <2018-05-25> :
--	- Stored Procedure Created.
--
-- [== Example ==]
--
--EXEC SignOut N'YSP1UVPHWJ';
-- =============================================
CREATE PROCEDURE [dbo].[SignOut]
(
  @accessId nvarchar(30)
, @errNum as int = 0 out
, @errMsg as nvarchar(MAX) = N'' out
)
AS
BEGIN
DECLARE @iCnt int = 0;
    -- Error Code:
    --    0 : Success
	-- 2307 : Access Id cannot be null or empty string.
	-- 2308 : Access Id not found.
    -- OTHER : SQL Error Number & Error Message.
	BEGIN TRY
		IF (dbo.IsNullOrEmpty(@accessId) = 1)
		BEGIN
            -- Access Id cannot be null or empty string.
            EXEC GetErrorMsg 2307, @errNum out, @errMsg out
			RETURN
		END

		SELECT @iCnt = COUNT(*)
		  FROM ClientAccess
		 WHERE UPPER(LTRIM(RTRIM(AccessId))) = UPPER(LTRIM(RTRIM(@accessId)))

		IF (@iCnt = 0)
		BEGIN
            -- Access Id not found.
            EXEC GetErrorMsg 2308, @errNum out, @errMsg out
			RETURN
		END

		DELETE FROM ClientAccess
		 WHERE UPPER(LTRIM(RTRIM(AccessId))) = UPPER(LTRIM(RTRIM(@accessId)));

		-- SUCCESS
		EXEC GetErrorMsg 0, @errNum out, @errMsg out
	END TRY
	BEGIN CATCH
		SET @errNum = ERROR_NUMBER();
		SET @errMsg = ERROR_MESSAGE();
	END CATCH
END

GO
