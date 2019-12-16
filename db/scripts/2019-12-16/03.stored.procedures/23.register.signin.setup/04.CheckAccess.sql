SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author: Chumpon Asaneerat
-- Name: CheckAccess.
-- Description:	Check Access.
-- [== History ==]
-- <2018-05-25> :
--	- Stored Procedure Created.
--
-- [== Example ==]
--
--EXEC CheckAccess N'YSP1UVPHWJ';
-- =============================================
CREATE PROCEDURE [dbo].[CheckAccess]
(
  @accessId nvarchar(30)
, @errNum as int = 0 out
, @errMsg as nvarchar(MAX) = N'' out
)
AS
BEGIN
DECLARE @langId nvarchar(3) = N'EN';
DECLARE @customerId nvarchar(30);
DECLARE @iCnt int = 0;
    -- Error Code:
    --    0 : Success
	-- 2301 : Access Id cannot be null or empty string.
	-- 2302 : Access Id not found.
    -- OTHER : SQL Error Number & Error Message.
	BEGIN TRY
		IF (dbo.IsNullOrEmpty(@accessId) = 1)
		BEGIN
            -- Access Id cannot be null or empty string.
            EXEC GetErrorMsg 2301, @errNum out, @errMsg out
			RETURN
		END

		SELECT @customerId = CustomerId, @iCnt = COUNT(*)
		  FROM ClientAccess
		 WHERE UPPER(LTRIM(RTRIM(AccessId))) = UPPER(LTRIM(RTRIM(@accessId)))
		 GROUP BY CustomerId;

		IF (@iCnt = 0)
		BEGIN
            -- Access Id not found.
            EXEC GetErrorMsg 2302, @errNum out, @errMsg out
			RETURN
		END

		IF (@customerId IS NULL)
		BEGIN
			SELECT A.AccessId
				 , B.CustomerId
				 , A.MemberId
				 , A.CreateDate
				 , B.MemberType
				 , B.IsEDLUser
			  FROM ClientAccess A, LogInView B
			 WHERE UPPER(LTRIM(RTRIM(AccessId))) = UPPER(LTRIM(RTRIM(@accessId)))
			   AND UPPER(LTRIM(RTRIM(B.MemberId))) = UPPER(LTRIM(RTRIM(A.MemberId)))
			   And UPPER(LTRIM(RTRIM(B.LangId))) = UPPER(LTRIM(RTRIM(@langId)))
		END
		ELSE
		BEGIN
			SELECT A.AccessId
				 , A.CustomerId
				 , A.MemberId
				 , A.CreateDate
				 , B.MemberType
				 , B.IsEDLUser
			  FROM ClientAccess A, LogInView B
			 WHERE UPPER(LTRIM(RTRIM(AccessId))) = UPPER(LTRIM(RTRIM(@accessId)))
			   AND UPPER(LTRIM(RTRIM(B.CustomerId))) = UPPER(LTRIM(RTRIM(A.CustomerId)))
			   AND UPPER(LTRIM(RTRIM(B.MemberId))) = UPPER(LTRIM(RTRIM(A.MemberId)))
			   And UPPER(LTRIM(RTRIM(B.LangId))) = UPPER(LTRIM(RTRIM(@langId)))
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
