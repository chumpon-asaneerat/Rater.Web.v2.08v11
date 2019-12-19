SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author: Chumpon Asaneerat
-- Name: Change Customer.
-- Description:	Change Customer.
-- [== History ==]
-- <2019-12-19> :
--	- Stored Procedure Created.
--
-- [== Example ==]
--
--EXEC ChangeUser N'YSP1UVPHWJ'; -- Reset
--EXEC ChangeUser N'YSP1UVPHWJ' N'EDL-C2019100002'; -- Change
-- =============================================
CREATE PROCEDURE [dbo].[ChangeCustomer]
(
  @accessId nvarchar(30)
, @customerId nvarchar(30) = NULL
, @errNum as int = 0 out
, @errMsg as nvarchar(MAX) = N'' out
)
AS
BEGIN
DECLARE @iCnt int = 0;
    -- Error Code:
    --    0 : Success
	-- 4501 : Access Id cannot be null or empty string.
	-- 4502 : Access Id not found.
	-- 4503 : Customer Id not found.
    -- OTHER : SQL Error Number & Error Message.
	BEGIN TRY
		IF (dbo.IsNullOrEmpty(@accessId) = 1)
		BEGIN
            -- Access Id cannot be null or empty string.
            EXEC GetErrorMsg 4501, @errNum out, @errMsg out
			RETURN
		END

		SELECT @iCnt = COUNT(*)
		  FROM ClientAccess
		 WHERE UPPER(LTRIM(RTRIM(AccessId))) = UPPER(LTRIM(RTRIM(@accessId)))

		IF (@iCnt = 0)
		BEGIN
            -- Access Id not found.
            EXEC GetErrorMsg 4502, @errNum out, @errMsg out
			RETURN
		END

		IF (@customerId IS NULL)
		BEGIN
			UPDATE ClientAccess
			   SET EDLCustomerId = NULL
			 WHERE UPPER(LTRIM(RTRIM(AccessId))) = UPPER(LTRIM(RTRIM(@accessId)));
		END
		ELSE
		BEGIN
			SELECT @iCnt = COUNT(*)
			  FROM Customer
			 WHERE UPPER(LTRIM(RTRIM(CustomerId))) = UPPER(LTRIM(RTRIM(@customerId)))

			IF (@iCnt = 0)
			BEGIN
				-- Customer Id not found.
				EXEC GetErrorMsg 4503, @errNum out, @errMsg out
				RETURN
			END
			UPDATE ClientAccess
			   SET EDLCustomerId = UPPER(LTRIM(RTRIM(@customerId)))
			 WHERE UPPER(LTRIM(RTRIM(AccessId))) = UPPER(LTRIM(RTRIM(@accessId)));
		END

		-- SUCCESS
		EXEC GetErrorMsg 0, @errNum out, @errMsg out
	END TRY
	BEGIN CATCH
		SET @errNum = ERROR_NUMBER();
		SET @errMsg = ERROR_MESSAGE();
	END CATCH
END

GO
