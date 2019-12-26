/*********** Script Update Date: 2019-12-26  ***********/
ALTER TABLE ClientAccess ADD DeviceId nvarchar(30) NULL
GO


/*********** Script Update Date: 2019-12-26  ***********/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author: Chumpon Asaneerat
-- Name: SaveQSet.
-- Description:	Save Question Set.
-- [== History ==]
-- <2018-05-13> :
--	- Stored Procedure Created.
-- <2018-05-15> :
--	- Add Check code for duplicate description (ERROR_CORE 1416).
-- <2018-12-26> :
--	- Remove date overlap check code (ERROR_CORE 1418).
--	
--
-- [== Example ==]
--DECLARE @customerId nvarchar(30) = NULL;
--DECLARE @qsetId nvarchar(30) = NULL;
--DECLARE @description nvarchar(MAX);
--DECLARE @displayMode tinyint = 0;
--DECLARE @hasRemark bit = 1;
--DECLARE @isDefault bit = 0;
--DECLARE @beginDate datetime = NULL;
--DECLARE @endDate datetime = NULL;
--DECLARE @errNum int;
--DECLARE @errMsg nvarchar(MAX);
--
--SET @customerId = N'EDL-C2018050001';
--SET @description = N'Question Set 1';
--SET @beginDate = '2018-05-10';
--SET @endDate = '2018-05-15';
--
--EXEC SaveQSet @customerId
--			  , @description
--			  , @hasRemark, @displayMode
--			  , @isDefault
--			  , @beginDate, @endDate
--			  , @qsetId out
--			  , @errNum out, @errMsg out
--SELECT @errNum AS ErrNum, @errMsg AS ErrMsg, @qsetId AS QSetId;
-- =============================================
ALTER PROCEDURE [dbo].[SaveQSet] (
  @customerId as nvarchar(30)
, @description as nvarchar(MAX)
, @hasRemark as bit = 0
, @displayMode as tinyint = 0
, @isDefault as bit = 0
, @beginDate as datetime = null
, @endDate as datetime = null
, @qSetId as nvarchar(30) = null out
, @errNum as int = 0 out
, @errMsg as nvarchar(MAX) = N'' out)
AS
BEGIN
DECLARE @iCustCnt int = 0;
DECLARE @iQSetCnt int = 0;
DECLARE @iVoteCnt int = 0;

DECLARE @vBeginDate datetime;
DECLARE @vEndDate datetime; 
DECLARE @vBeginDateStr nvarchar(40);
DECLARE @vEndDateStr nvarchar(40); 
	-- Error Code:
	--   0 : Success
	-- 1401 : Customer Id cannot be null or empty string.
	-- 1402 : Customer Id is not found.
	-- 1403 : QSet Id is not found.
	-- 1404 : QSet is already used in vote table.
	-- 1405 : Begin Date and/or End Date should not be null.
	-- 1406 : Display Mode is null or value is not in 0 to 1.
	-- 1407 : Begin Date should less than End Date.
	-- 1408 : Begin Date or End Date is overlap with another Question Set.
	-- 1416 : Description (default) cannot be null or empty string.
	-- 1417 : Description (default) already exists.
	-- 1418 : Begin Date or End Date is overlap with another Question Set.
	-- OTHER : SQL Error Number & Error Message.
	BEGIN TRY
		IF @isDefault IS NULL
		BEGIN
			SET @isDefault = 0;
		END

		IF (dbo.IsNullOrEmpty(@customerId) = 1)
		BEGIN
			-- Customer Id cannot be null or empty string.
            EXEC GetErrorMsg 1401, @errNum out, @errMsg out
			RETURN
		END

		SELECT @iCustCnt = COUNT(*)
		  FROM Customer
		 WHERE RTRIM(LTRIM(CustomerId)) = RTRIM(LTRIM(@customerId));
		IF (@iCustCnt = 0)
		BEGIN
			-- Customer Id is not found.
            EXEC GetErrorMsg 1504, @errNum out, @errMsg out
			RETURN
		END

		/* Check if QSetId exists */
		IF (@qSetId IS NOT NULL AND LTRIM(RTRIM(@qSetId)) <> N'')
		BEGIN
			SELECT @iQSetCnt = COUNT(*)
			  FROM QSet
			 WHERE LOWER(CustomerId) = LOWER(RTRIM(LTRIM(@customerId)))
			   AND LOWER(QSetId) = LOWER(RTRIM(LTRIM(@qSetId)));
			IF (@iQSetCnt = 0)
			BEGIN
				-- QSet Id is not found.
                EXEC GetErrorMsg 1403, @errNum out, @errMsg out
				RETURN
			END
		END

		IF (@beginDate is null or @endDate is null)
		BEGIN
			-- Begin Date and/or End Date should not be null.
			EXEC GetErrorMsg 1405, @errNum out, @errMsg out
			RETURN
		END

		IF (@displayMode is null or (@displayMode < 0 or @displayMode > 1))
		BEGIN
			-- Display Mode is null or value is not in 0 to 1.
			EXEC GetErrorMsg 1406, @errNum out, @errMsg out
			RETURN
		END

		SET @iQSetCnt = 0; -- Reset Counter.
		-- Check the default is already exist or not.
		SELECT @iQSetCnt = COUNT(*)
		  FROM QSet
		 WHERE LOWER(CustomerId) = LOWER(RTRIM(LTRIM(@customerId)))
		   AND IsDefault = 1;

		-- Checks IsDefault, Begin-End Date.
		IF (@isDefault = 1)
		BEGIN
			IF (@iQSetCnt <> 0)
			BEGIN
				-- It's seem the default QSet is already exists.
				-- Set the exists default default QSet to 0
				UPDATE QSet
				   SET IsDefault = 0
				 WHERE LOWER(CustomerId) = LOWER(RTRIM(LTRIM(@customerId)));
			END

			-- CONVERT DATE
			SET @vBeginDateStr = (CONVERT(nvarchar(4), DatePart(yyyy, @beginDate)) + '-' +
								  CONVERT(nvarchar(2), DatePart(mm, @beginDate)) + '-' +
								  CONVERT(nvarchar(2), DatePart(dd, @beginDate)) + ' ' +
								  N'00:00:00');
			--SET @vBeginDate = CONVERT(datetime, @vBeginDateStr, 121);
			SET @vBeginDate = CAST(@vBeginDateStr AS datetime)

			SET @vEndDateStr = (CONVERT(nvarchar(4), DatePart(yyyy, @endDate)) + '-' +
								CONVERT(nvarchar(2), DatePart(mm, @endDate)) + '-' +
								CONVERT(nvarchar(2), DatePart(dd, @endDate)) + ' ' +
								N'23:59:59');
			--SET @vEndDate = CONVERT(datetime, @vEndDateStr, 121);
			SET @vEndDate = CAST(@vEndDateStr AS datetime)

			IF (@vBeginDate > @vEndDate)
			BEGIN
				-- Begin Date should less than End Date.
				EXEC GetErrorMsg 1407, @errNum out, @errMsg out
				RETURN
			END
		END
		ELSE
		BEGIN
			IF (@iQSetCnt = 0)
			BEGIN
				-- It's seem the default QSet is not exists.
				-- Set current QSet as default.
				SET @isDefault = 1
			END

			SET @vBeginDateStr = (CONVERT(nvarchar(4), DatePart(yyyy, @beginDate)) + '-' +
								  CONVERT(nvarchar(2), DatePart(mm, @beginDate)) + '-' +
								  CONVERT(nvarchar(2), DatePart(dd, @beginDate)) + ' ' +
								  N'00:00:00');
			SET @vBeginDate = CONVERT(datetime, @vBeginDateStr, 121);

			SET @vEndDateStr = (CONVERT(nvarchar(4), DatePart(yyyy, @endDate)) + '-' +
								CONVERT(nvarchar(2), DatePart(mm, @endDate)) + '-' +
								CONVERT(nvarchar(2), DatePart(dd, @endDate)) + ' ' +
								N'23:59:59');
			SET @vEndDate = CONVERT(datetime, @vEndDateStr, 121);

			IF (@vBeginDate > @vEndDate)
			BEGIN
				-- Begin Date should less than End Date.
				EXEC GetErrorMsg 1407, @errNum out, @errMsg out
				RETURN
			END
		END

		IF (dbo.IsNullOrEmpty(@description) = 1)
		BEGIN
			-- Description (default) cannot be null or empty string.
            EXEC GetErrorMsg 1416, @errNum out, @errMsg out
			RETURN
		END

		SET @iQSetCnt = 0; -- Reset Counter.

		-- Checks Duplicated desctiption.
		IF (@qSetId IS NULL)
		BEGIN
			SELECT @iQSetCnt = COUNT(*)
			  FROM QSet
			 WHERE LOWER(CustomerID) = LOWER(RTRIM(LTRIM(@customerId)))
			   AND LOWER(LTRIM(RTRIM(Description))) = LOWER(LTRIM(RTRIM(@description)))
			IF (@iQSetCnt <> 0)
			BEGIN
				-- Description (default) already exists.
                EXEC GetErrorMsg 1417, @errNum out, @errMsg out
				RETURN
			END
		END
		ELSE
		BEGIN
			SELECT @iQSetCnt = COUNT(*)
			  FROM QSet
			 WHERE LOWER(CustomerID) = LOWER(RTRIM(LTRIM(@customerId)))
			   AND LOWER(LTRIM(RTRIM(QSetId))) <> LOWER(LTRIM(RTRIM(@qSetId)))
			   AND LOWER(LTRIM(RTRIM(Description))) = LOWER(LTRIM(RTRIM(@description)))
			IF (@iQSetCnt <> 0)
			BEGIN
				-- Description (default) already exists.
                EXEC GetErrorMsg 1417, @errNum out, @errMsg out
				RETURN
			END
		END

		IF dbo.IsNullOrEmpty(@qSetId) = 1
		BEGIN
			EXEC NextCustomerPK @customerId
			                , N'QSet'
							, @qSetId out
							, @errNum out
							, @errMsg out;
			IF @errNum <> 0
			BEGIN
				RETURN;
			END	
		END
		ELSE
		BEGIN
			SELECT @iQSetCnt = COUNT(*)
			  FROM QSet
			 WHERE LOWER(QSetId) = LOWER(RTRIM(LTRIM(@qSetId)))
			   AND LOWER(CustomerID) = LOWER(RTRIM(LTRIM(@customerId)))
		END

		-- Checks is already in used.
		SELECT @iVoteCnt = COUNT(*)
			FROM Vote
			WHERE LOWER(CustomerId) = LOWER(RTRIM(LTRIM(@customerId)))
			AND LOWER(QSetId) = LOWER(RTRIM(LTRIM(@qSetId)));

		IF (@iVoteCnt <> 0)
		BEGIN
			-- QSet is already used in vote table.
            EXEC GetErrorMsg 1404, @errNum out, @errMsg out
			RETURN
		END

		IF @iQSetCnt = 0
		BEGIN
			INSERT INTO QSet
			(
				  CustomerID
				, QSetID
				, [Description]
				, HasRemark
				, DisplayMode
				, IsDefault
				, BeginDate
				, EndDate
				, ObjectStatus
			)
			VALUES
			(
				  RTRIM(LTRIM(@customerId))
				, RTRIM(LTRIM(@qSetId))
				, RTRIM(LTRIM(@description))
				, @hasRemark
				, @displayMode
				, @isDefault
				, @vBeginDate
				, @vEndDate
				, 1
			);
		END
		ELSE
		BEGIN
			UPDATE QSet
			   SET [Description] = RTRIM(LTRIM(@description))
			     , HasRemark = @hasRemark
				 , DisplayMode = @displayMode
			     , IsDefault = @isDefault
				 , BeginDate = @vBeginDate
				 , EndDate = @vEndDate
			 WHERE LOWER(QSetID) = LOWER(RTRIM(LTRIM(@qSetId))) 
			   AND LOWER(CustomerId) = LOWER(RTRIM(LTRIM(@customerId)));
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


/*********** Script Update Date: 2019-12-26  ***********/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author: Chumpon Asaneerat
-- Name: GetQSetByDate.
-- Description:	Get Question Set By date(s).
-- [== History ==]
-- <2019-12-26> :
--	- Stored Procedure Created.
--
-- [== Example ==]
--
--EXEC GetQSetByDate NULL, N'EDL-C2018050001', N'2019-12-01'
--EXEC GetQSetByDate N'EN', N'EDL-C2018050001', N'2019-12-01'
--EXEC GetQSetByDate NULL, N'EDL-C2018050001', N'2019-01-15', N'2019-02-15'
-- =============================================
CREATE PROCEDURE [dbo].[GetQSetByDate]
(
  @langId nvarchar(3) = NULL
, @customerId nvarchar(30) = NULL
, @beginDate datetime = NULL
, @endDate datetime = NULL
, @errNum as int = 0 out
, @errMsg as nvarchar(MAX) = N'' out
)
AS
BEGIN
DECLARE @vBeginDate datetime;
DECLARE @vEndDate datetime; 
DECLARE @vBeginDateStr nvarchar(40);
DECLARE @vEndDateStr nvarchar(40); 
DECLARE @qsetId nvarchar(30);
DECLARE @iCase int;
	-- Error Code:
	--   0 : Success
	-- 4701 : Customer Id cannot be null or empty string.
	-- 4702 : Begin Date is null.
	-- 4703 : Begin Date should less than End Date.
	-- 4704 : No QSet Found.
	-- OTHER : SQL Error Number & Error Message.
	BEGIN TRY
		IF (dbo.IsNullOrEmpty(@customerId) = 1)
		BEGIN
			-- Customer Id cannot be null or empty string.
            EXEC GetErrorMsg 1401, @errNum out, @errMsg out
			RETURN
		END
		IF (@beginDate IS NULL)
		BEGIN
			-- Begin Date is null.
            EXEC GetErrorMsg 1402, @errNum out, @errMsg out
			RETURN
		END

		IF (@endDate IS NULL)
		BEGIN
			SET @endDate = @beginDate
		END

		-- CONVERT DATE
		SET @vBeginDateStr = (CONVERT(nvarchar(4), DatePart(yyyy, @beginDate)) + '-' +
							  CONVERT(nvarchar(2), DatePart(mm, @beginDate)) + '-' +
							  CONVERT(nvarchar(2), DatePart(dd, @beginDate)) + ' ' +
							  N'00:00:00');
		--SET @vBeginDate = CONVERT(datetime, @vBeginDateStr, 121);
		SET @vBeginDate = CAST(@vBeginDateStr AS datetime)

		SET @vEndDateStr = (CONVERT(nvarchar(4), DatePart(yyyy, @endDate)) + '-' +
							CONVERT(nvarchar(2), DatePart(mm, @endDate)) + '-' +
							CONVERT(nvarchar(2), DatePart(dd, @endDate)) + ' ' +
							N'23:59:59');
		--SET @vEndDate = CONVERT(datetime, @vEndDateStr, 121);
		SET @vEndDate = CAST(@vEndDateStr AS datetime)
		IF (@vBeginDate > @vEndDate)
		BEGIN
			-- Begin Date should less than End Date.
			EXEC GetErrorMsg 4703, @errNum out, @errMsg out
			RETURN
		END

		SET @qsetId = NULL
		IF ((SELECT COUNT(*) 
		       FROM QSet 
			 WHERE LOWER(CustomerId) = LOWER(RTRIM(LTRIM(@customerId)))
			   AND (   @vBeginDate BETWEEN BeginDate AND EndDate
			        OR @vEndDate BETWEEN BeginDate AND EndDate)
			   AND IsDefault = 0) > 0)
		BEGIN
			SET @iCase = 1
			-- HAS QSet between date with that not set as default.
			SELECT TOP 1 @qsetId = QSetId
			  FROM QSet
			 WHERE LOWER(CustomerId) = LOWER(RTRIM(LTRIM(@customerId)))
			   AND (   @vBeginDate BETWEEN BeginDate AND EndDate
			        OR @vEndDate BETWEEN BeginDate AND EndDate
				   )
			   AND IsDefault = 0
			 --ORDER BY EndDate DESC
			 ORDER BY QSetId DESC
		END
		ELSE IF ((SELECT COUNT(*) 
		            FROM QSet 
			       WHERE LOWER(CustomerId) = LOWER(RTRIM(LTRIM(@customerId)))
			         AND IsDefault = 1) > 0)
		BEGIN
			SET @iCase = 2
			-- No QSet between date so used default if exists.
			SELECT TOP 1 @qsetId = QSetId
			  FROM QSet
			 WHERE LOWER(CustomerId) = LOWER(RTRIM(LTRIM(@customerId)))
			   AND IsDefault = 1
			 --ORDER BY EndDate DESC
			 ORDER BY QSetId DESC
		END
		ELSE IF ((SELECT count(*) FROM QSet 
		  WHERE LOWER(CustomerId) = LOWER(RTRIM(LTRIM(@customerId)))
			AND IsDefault = 0) > 0)
		BEGIN
			SET @iCase = 3
			-- No QSet between date and no default is assigned in all qsets.
			-- Used top 1 (the last ones)
			SELECT TOP 1 @qsetId = QSetId
			  FROM QSet
			 WHERE LOWER(CustomerId) = LOWER(RTRIM(LTRIM(@customerId)))
			 --ORDER BY EndDate DESC
			 ORDER BY QSetId DESC
		END

		IF (@qsetId IS NULL)
		BEGIN
			-- No QSet Found.
			EXEC GetErrorMsg 4704, @errNum out, @errMsg out
			RETURN
		END
		ELSE
		BEGIN
			   SELECT langId
				    , customerId
					, qSetId
					, BeginDate
					, EndDate
					, QSetDescription as [Description]
					, DisplayMode
					, HasRemark
					, IsDefault
					--, QSetStatus
					--, SortOrder
					, Enabled 
					--, @iCase as [Case]
				 FROM QSetMLView 
				WHERE LOWER(CustomerId) = LOWER(RTRIM(LTRIM(@customerId)))
				  AND UPPER(LTRIM(RTRIM(LangId))) = UPPER(LTRIM(RTRIM(COALESCE(@langId, LangId))))
				  AND UPPER(LTRIM(RTRIM(QSetId))) = UPPER(LTRIM(RTRIM(@qsetId)))
				  --AND Enabled = 1
			 ORDER BY SortOrder, CustomerId, QSetId
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


/*********** Script Update Date: 2019-12-26  ***********/
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
-- <2019-12-19> :
--	- Add EDLCustomerId column in result.
--
-- [== Example ==]
--
--EXEC CheckAccess N'YSP1UVPHWJ';
-- =============================================
ALTER PROCEDURE [dbo].[CheckAccess]
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
				 , A.EDLCustomerId
                 , A.DeviceId
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
				 , A.EDLCustomerId
                 , A.DeviceId
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


/*********** Script Update Date: 2019-12-26  ***********/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author: Chumpon Asaneerat
-- Name: GetAccessUser.
-- Description:	Get Access User.
-- [== History ==]
-- <2018-05-25> :
--	- Stored Procedure Created.
-- <2019-12-19> :
--	- Add EDLCustomerId in result.
--
-- [== Example ==]
--
--EXEC GetAccessUser N'TH', N'YSP1UVPHWJ';
-- =============================================
ALTER PROCEDURE [dbo].[GetAccessUser]
(
  @langId nvarchar(3)
, @accessId nvarchar(30)
, @errNum as int = 0 out
, @errMsg as nvarchar(MAX) = N'' out
)
AS
BEGIN
DECLARE @customerId nvarchar(30);
DECLARE @iCnt int = 0;
    -- Error Code:
    --    0 : Success
	-- 2303 : Lang Id cannot be null or empty string.
	-- 2304 : Lang Id not found.
	-- 2305 : Access Id cannot be null or empty string.
	-- 2306 : Access Id not found.
    -- OTHER : SQL Error Number & Error Message.
	BEGIN TRY
		IF (dbo.IsNullOrEmpty(@langId) = 1)
		BEGIN
            -- Lang Id cannot be null or empty string.
            EXEC GetErrorMsg 2303, @errNum out, @errMsg out
			RETURN
		END

		SELECT @iCnt = COUNT(*)
		  FROM LanguageView
		 WHERE UPPER(LTRIM(RTRIM(LangId))) = UPPER(LTRIM(RTRIM(@langId)))
		IF (@iCnt IS NULL OR @iCnt = 0)
		BEGIN
            -- Lang Id not found.
            EXEC GetErrorMsg 2304, @errNum out, @errMsg out
			RETURN
		END

		IF (dbo.IsNullOrEmpty(@accessId) = 1)
		BEGIN
            -- Access Id cannot be null or empty string.
            EXEC GetErrorMsg 2305, @errNum out, @errMsg out
			RETURN
		END

		SELECT @customerId = CustomerId, @iCnt = COUNT(*)
		  FROM ClientAccess
		 WHERE UPPER(LTRIM(RTRIM(AccessId))) = UPPER(LTRIM(RTRIM(@accessId)))
		 GROUP BY CustomerId;

		IF (@iCnt = 0)
		BEGIN
            -- Access Id not found.
            EXEC GetErrorMsg 2306, @errNum out, @errMsg out
			RETURN
		END

		IF (@customerId IS NULL)
		BEGIN
			SELECT /*A.AccessId
				 , */A.CustomerId
				 , N'EDL Co., Ltd.' AS CustomerName
				 , A.MemberId
				 , A.EDLCustomerId
                 , A.DeviceId
				 , B.FullName
				 , B.IsEDLUser
				 , B.MemberType
				 , D.MemberTypeDescription
			  FROM ClientAccess A
			     , LogInView B
				 --, CustomerMLView C
				 , MemberTypeMLView D
			 WHERE UPPER(LTRIM(RTRIM(AccessId))) = UPPER(LTRIM(RTRIM(@accessId)))
			   AND UPPER(LTRIM(RTRIM(B.MemberId))) = UPPER(LTRIM(RTRIM(A.MemberId)))
			   And UPPER(LTRIM(RTRIM(B.LangId))) = UPPER(LTRIM(RTRIM(@langId)))
			   --AND UPPER(LTRIM(RTRIM(C.CustomerId))) = UPPER(LTRIM(RTRIM(A.CustomerId)))
			   --AND UPPER(LTRIM(RTRIM(C.LangId))) = UPPER(LTRIM(RTRIM(B.LangId)))
			   AND UPPER(LTRIM(RTRIM(D.LangId))) = UPPER(LTRIM(RTRIM(B.LangId)))
			   AND B.MemberType = D.MemberTypeId
		END
		ELSE
		BEGIN
			SELECT /*A.AccessId
				 , */A.CustomerId
				 , C.CustomerName
				 , A.MemberId
				 , A.EDLCustomerId
                 , A.DeviceId
				 , B.FullName
				 , B.IsEDLUser
				 , B.MemberType
				 , D.MemberTypeDescription
			  FROM ClientAccess A
			     , LogInView B
				 , CustomerMLView C
				 , MemberTypeMLView D
			 WHERE UPPER(LTRIM(RTRIM(AccessId))) = UPPER(LTRIM(RTRIM(@accessId)))
			   AND UPPER(LTRIM(RTRIM(B.CustomerId))) = UPPER(LTRIM(RTRIM(A.CustomerId)))
			   AND UPPER(LTRIM(RTRIM(B.MemberId))) = UPPER(LTRIM(RTRIM(A.MemberId)))
			   And UPPER(LTRIM(RTRIM(B.LangId))) = UPPER(LTRIM(RTRIM(@langId)))
			   AND UPPER(LTRIM(RTRIM(C.CustomerId))) = UPPER(LTRIM(RTRIM(A.CustomerId)))
			   AND UPPER(LTRIM(RTRIM(C.LangId))) = UPPER(LTRIM(RTRIM(B.LangId)))
			   AND UPPER(LTRIM(RTRIM(D.LangId))) = UPPER(LTRIM(RTRIM(B.LangId)))
			   AND B.MemberType = D.MemberTypeId
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


/*********** Script Update Date: 2019-12-26  ***********/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author: Chumpon Asaneerat
-- Name: Set Access Device.
-- Description:	Set Access Device.
-- [== History ==]
-- <2019-12-26> :
--	- Stored Procedure Created.
--
-- [== Example ==]
--
--EXEC SetAccessDevice N'YSP1UVPHWJ', N'EDL-C2019100002' -- Reset
--EXEC SetAccessDevice N'YSP1UVPHWJ', N'EDL-C2019100002', N'D0001' -- Change
-- =============================================
CREATE PROCEDURE [dbo].[SetAccessDevice]
(
  @accessId nvarchar(30)
, @customerId nvarchar(30)
, @deviceId nvarchar(30) = NULL
, @errNum as int = 0 out
, @errMsg as nvarchar(MAX) = N'' out
)
AS
BEGIN
DECLARE @iCnt int = 0;
    -- Error Code:
    --    0 : Success
	-- 4601 : Access Id cannot be null or empty string.
	-- 4602 : Customer Id cannot be null or empty string.
	-- 4603 : Access Id not found.
	-- 4604 : Device Id not found.
    -- OTHER : SQL Error Number & Error Message.
	BEGIN TRY
		IF (dbo.IsNullOrEmpty(@accessId) = 1)
		BEGIN
            -- Access Id cannot be null or empty string.
            EXEC GetErrorMsg 4601, @errNum out, @errMsg out
			RETURN
		END

		IF (dbo.IsNullOrEmpty(@customerId) = 1)
		BEGIN
            -- Customer Id cannot be null or empty string.
            EXEC GetErrorMsg 4602, @errNum out, @errMsg out
			RETURN
		END

		SELECT @iCnt = COUNT(*)
		  FROM ClientAccess
		 WHERE UPPER(LTRIM(RTRIM(AccessId))) = UPPER(LTRIM(RTRIM(@accessId)))
		   AND (
		            UPPER(LTRIM(RTRIM(CustomerId))) = UPPER(LTRIM(RTRIM(@customerId)))
			     OR UPPER(LTRIM(RTRIM(EDLCustomerId))) = UPPER(LTRIM(RTRIM(@customerId)))
			   )

		IF (@iCnt = 0)
		BEGIN
            -- Access Id not found.
            EXEC GetErrorMsg 4603, @errNum out, @errMsg out
			RETURN
		END

		IF (@deviceId IS NULL)
		BEGIN
			UPDATE ClientAccess
			   SET DeviceId = NULL
			 WHERE UPPER(LTRIM(RTRIM(AccessId))) = UPPER(LTRIM(RTRIM(@accessId)))
			   AND (
						UPPER(LTRIM(RTRIM(CustomerId))) = UPPER(LTRIM(RTRIM(@customerId)))
					 OR UPPER(LTRIM(RTRIM(EDLCustomerId))) = UPPER(LTRIM(RTRIM(@customerId)))
				   )
		END
		ELSE
		BEGIN
			SELECT @iCnt = COUNT(*)
			  FROM Device
			 WHERE UPPER(LTRIM(RTRIM(CustomerId))) = UPPER(LTRIM(RTRIM(@customerId)))
			   AND UPPER(LTRIM(RTRIM(DeviceId))) = UPPER(LTRIM(RTRIM(@deviceId)))
			IF (@iCnt = 0)
			BEGIN
				-- Device Id not found.
				EXEC GetErrorMsg 4604, @errNum out, @errMsg out
				RETURN
			END
			UPDATE ClientAccess
			   SET DeviceId = UPPER(LTRIM(RTRIM(@deviceId)))
			 WHERE UPPER(LTRIM(RTRIM(AccessId))) = UPPER(LTRIM(RTRIM(@accessId)))
			   AND (
						UPPER(LTRIM(RTRIM(CustomerId))) = UPPER(LTRIM(RTRIM(@customerId)))
					 OR UPPER(LTRIM(RTRIM(EDLCustomerId))) = UPPER(LTRIM(RTRIM(@customerId)))
				   )
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


/*********** Script Update Date: 2019-12-26  ***********/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author: Chumpon Asaneerat
-- Name: InitErrorMessages.
-- Description:	Init error messages.
-- [== History ==]
-- <2017-08-06> :
--	- Stored Procedure Created.
-- <2018-05-10> :
--	- Update new error messages.
-- <2019-10-01> :
--	- Update new error messages.
--
-- [== Example ==]
--
--exec InitErrorMessages
-- =============================================
ALTER PROCEDURE [dbo].[InitErrorMessages]
AS
BEGIN
    -- SUCCESS.
    EXEC SaveErrorMsg 0000, N'Success.'
    -- LANGUAGES.
    EXEC SaveErrorMsg 0101, N'Language Id cannot be null or empty string.'
    EXEC SaveErrorMsg 0102, N'Description cannot be null or empty string.'
    -- MASTER PK.
    EXEC SaveErrorMsg 0201, N'Table Name is null or empty string.'
    EXEC SaveErrorMsg 0202, N'Seed Reset Mode should be number 1-3.'
    EXEC SaveErrorMsg 0203, N'Seed Digits should be number 1-9.'
    EXEC SaveErrorMsg 0204, N'Table name is not exists in MasterPK table.'
    EXEC SaveErrorMsg 0205, N'Not supports reset mode.'
    EXEC SaveErrorMsg 0206, N'Cannot generate seed code for table:'
    -- PERIOD UNITS.
    EXEC SaveErrorMsg 0301, N'PeriodUnit Id cannot be null.'
    EXEC SaveErrorMsg 0302, N'Description (default) cannot be null or empty string.'
    EXEC SaveErrorMsg 0303, N'Description (default) is duplicated.'
    EXEC SaveErrorMsg 0304, N'Description (ML) cannot be null or empty string.'
    EXEC SaveErrorMsg 0305, N'Cannot add new Description (ML) because the Description (ML) in same Language Id is already exists.'
    EXEC SaveErrorMsg 0306, N'Cannot change Description (ML) because the Description (ML) in same Language Id is already exists.'
    -- LIMIT UNITS.
    EXEC SaveErrorMsg 0401, N'LimitUnit Id cannot be null.'
    EXEC SaveErrorMsg 0402, N'Description (default) cannot be null or empty string.'
    EXEC SaveErrorMsg 0403, N'Description (default) is duplicated.'
    EXEC SaveErrorMsg 0404, N'UnitText (default) cannot be null or empty string.'
    EXEC SaveErrorMsg 0405, N'Language Id cannot be null or empty string.'
    EXEC SaveErrorMsg 0406, N'Language Id not found.'
    EXEC SaveErrorMsg 0407, N'Description (ML) cannot be null or empty string.'
    EXEC SaveErrorMsg 0408, N'Cannot add new Description (ML) because the Description (ML) in same Language Id is already exists.'
    EXEC SaveErrorMsg 0409, N'Cannot change Description (ML) because the Description (ML) in same Language Id is already exists.'
    -- USER INFO(S).
    EXEC SaveErrorMsg 0501, N'FirstName (default) cannot be null or empty string.'
    EXEC SaveErrorMsg 0502, N'UserName cannot be null or empty string.'
    EXEC SaveErrorMsg 0503, N'Password cannot be null or empty string.'
    EXEC SaveErrorMsg 0504, N'User Full Name (default) already exists.'
    EXEC SaveErrorMsg 0505, N'UserName already exists.'
    EXEC SaveErrorMsg 0506, N'Language Id cannot be null or empty string.'
    EXEC SaveErrorMsg 0507, N'The Language Id not exist.'
    EXEC SaveErrorMsg 0508, N'User Id cannot be null or empty string.'
    EXEC SaveErrorMsg 0509, N'FirstName (ML) cannot be null or empty string.'
    EXEC SaveErrorMsg 0510, N'No User match UserId.'
    EXEC SaveErrorMsg 0511, N'User Full Name (ML) already exists.'
    -- LICENSE TYPES.
    EXEC SaveErrorMsg 0601, N'Description (default) cannot be null or empty string.'
    EXEC SaveErrorMsg 0602, N'Advertise Text (default) cannot be null or empty string.'
    EXEC SaveErrorMsg 0603, N'PeriodUnitId cannot be null.'
    EXEC SaveErrorMsg 0604, N'PeriodUnitId not found.'
    EXEC SaveErrorMsg 0605, N'Number of Period cannot be null.'
    EXEC SaveErrorMsg 0606, N'Price cannot be null.'
    EXEC SaveErrorMsg 0607, N'Cannot add new item description because the description (default) is duplicated.'
    EXEC SaveErrorMsg 0608, N'Cannot change item description because the description (default) is duplicated.'
    EXEC SaveErrorMsg 0609, N'Cannot add new item because the period and number of period is duplicated.'
    EXEC SaveErrorMsg 0610, N'Cannot change item because the period and number of period is duplicated.'
    EXEC SaveErrorMsg 0611, N'LicenseTypeId cannot be null.'
    EXEC SaveErrorMsg 0612, N'Language Id cannot be null or empty string.'
    EXEC SaveErrorMsg 0613, N'Language Id not found.'    
    EXEC SaveErrorMsg 0614, N'Description (ML) cannot be null or empty string.'
    EXEC SaveErrorMsg 0615, N'Advertise Text (ML) cannot be null or empty string.'
    EXEC SaveErrorMsg 0616, N'Price (ML) cannot be null.'
    EXEC SaveErrorMsg 0617, N'Description (ML) is duplicated.'    
    -- LICENSE FEATURES.
    EXEC SaveErrorMsg 0701, N'LicenseType Id cannot be null.'
    EXEC SaveErrorMsg 0702, N'LicenseType Id not found.'
    EXEC SaveErrorMsg 0703, N'LimitUnit Id cannot be null.'
    EXEC SaveErrorMsg 0704, N'LimitUnit Id not found.'
    EXEC SaveErrorMsg 0705, N'LimitUnit Id already exists.'
    EXEC SaveErrorMsg 0706, N'No Of Limit cannot be null.'
    EXEC SaveErrorMsg 0707, N'No Of Limit should be zero or more.'
    EXEC SaveErrorMsg 0708, N'Invalid Seq Number.' 
    -- CUSTOMER PK.
    EXEC SaveErrorMsg 0801, N'CustomerId is null or empty string.'
    EXEC SaveErrorMsg 0802, N'Table Name is null or empty string.'
    EXEC SaveErrorMsg 0803, N'Seed Reset Mode should be number 1-4.'
    EXEC SaveErrorMsg 0804, N'Seed Digits should be number 1-9.'
    EXEC SaveErrorMsg 0805, N'Table Name not exists in CustomerPK table.'
    EXEC SaveErrorMsg 0806, N'Not supports reset mode.'
    EXEC SaveErrorMsg 0807, N'Cannot generate seed code for table:'    
    -- CUSTOMERS.
    EXEC SaveErrorMsg 0901, N'Customer Name (default) cannot be null or empty string.'
    EXEC SaveErrorMsg 0902, N'The Customer Id is not exists.'
    EXEC SaveErrorMsg 0903, N'Customer Name (default) is already exists.'
    EXEC SaveErrorMsg 0904, N'Customer Id cannot be null or empty string.'
    EXEC SaveErrorMsg 0905, N'Lang Id cannot be null or empty string.'
    EXEC SaveErrorMsg 0906, N'Lang Id not found.'
    EXEC SaveErrorMsg 0907, N'Customer Name (ML) cannot be null or empty string.'
    EXEC SaveErrorMsg 0908, N'Customer Name (ML) is already exist.'
    -- BRANCH.
    EXEC SaveErrorMsg 1001, N'Customer Id cannot be null or empty string.'
    EXEC SaveErrorMsg 1002, N'Branch Name (default) cannot be null or empty string.'
    EXEC SaveErrorMsg 1003, N'Customer Id is not found.'
    EXEC SaveErrorMsg 1004, N'Branch Id is not found.'
    EXEC SaveErrorMsg 1005, N'Branch Name (default) already exists.'
    EXEC SaveErrorMsg 1006, N'Lang Id cannot be null or empty string.'
    EXEC SaveErrorMsg 1007, N'Language Id not exist.'
    EXEC SaveErrorMsg 1008, N'Branch Id cannot be null or empty string.'
    EXEC SaveErrorMsg 1009, N'Branch Id is not found.'
    EXEC SaveErrorMsg 1010, N'Branch Name (ML) is already exists.'
    -- MEMBER INTO(S).
    EXEC SaveErrorMsg 1101, N'Customer Id cannot be null or empty string.'
    EXEC SaveErrorMsg 1102, N'Customer Id not found.'
    EXEC SaveErrorMsg 1103, N'First Name (default) cannot be null or empty string.'
    EXEC SaveErrorMsg 1104, N'User Name cannot be null or empty string.'
    EXEC SaveErrorMsg 1105, N'Password cannot be null or empty string.'
    EXEC SaveErrorMsg 1106, N'MemberType cannot be null.'
    EXEC SaveErrorMsg 1107, N'MemberType allow only value 200 admin, 210 exclusive, 280 staff, 290 Device.'
    EXEC SaveErrorMsg 1108, N'Member Full Name (default) already exists.'
    EXEC SaveErrorMsg 1109, N'User Name already exists.'
    EXEC SaveErrorMsg 1110, N'Member Id is not found.'
    EXEC SaveErrorMsg 1111, N'IDCard is already exists.'
    EXEC SaveErrorMsg 1112, N'Employee Code is already exists.'
    EXEC SaveErrorMsg 1113, N'TagId is already exists.'
    EXEC SaveErrorMsg 1114, N'Lang Id cannot be null or empty string.'
    EXEC SaveErrorMsg 1115, N'Lang Id not exist.'
    EXEC SaveErrorMsg 1116, N'Member Id cannot be null or empty string.'
    EXEC SaveErrorMsg 1117, N'No Member match MemberId in specificed Customer Id.'
    EXEC SaveErrorMsg 1118, N'Member Full Name (ML) already exists.'
    -- ORGS.
    EXEC SaveErrorMsg 1201, N'Customer Id cannot be null or empty string.'
    EXEC SaveErrorMsg 1202, N'Customer Id not found.'
    EXEC SaveErrorMsg 1203, N'Branch Id cannot be null or empty string.'
    EXEC SaveErrorMsg 1204, N'Branch Id not found.'
    EXEC SaveErrorMsg 1205, N'The Root Org already assigned.'
    EXEC SaveErrorMsg 1206, N'The Parent Org Id is not found.'
    EXEC SaveErrorMsg 1207, N'Org Name (default) cannot be null or empty string.'
    EXEC SaveErrorMsg 1208, N'Org Name (default) already exists.'
    EXEC SaveErrorMsg 1209, N'Lang Id cannot be null or empty string.'
    EXEC SaveErrorMsg 1210, N'Lang Id not found.'
    EXEC SaveErrorMsg 1211, N'Customer Id cannot be null or empty string.'
    EXEC SaveErrorMsg 1212, N'Customer Id not found.'
    EXEC SaveErrorMsg 1213, N'Org Id cannot be null or empty string.'
    EXEC SaveErrorMsg 1214, N'No Org match Org Id in specificed Customer Id.'
    EXEC SaveErrorMsg 1215, N'Org Name (ML) already exists.'
    -- QSETS.
    EXEC SaveErrorMsg 1401, N'Customer Id cannot be null or empty string.'
    EXEC SaveErrorMsg 1402, N'Customer Id is not found.'
    EXEC SaveErrorMsg 1403, N'QSet Id is not found.'
    EXEC SaveErrorMsg 1404, N'QSet is already used in vote table.'
    EXEC SaveErrorMsg 1405, N'Begin Date and/or End Date should not be null.'
    EXEC SaveErrorMsg 1406, N'Display Mode is null or value is not in 0 to 1.'
    EXEC SaveErrorMsg 1407, N'Begin Date should less than End Date.'
    EXEC SaveErrorMsg 1408, N'Begin Date or End Date is overlap with another Question Set.'
    EXEC SaveErrorMsg 1409, N'Lang Id cannot be null or empty string.'
    EXEC SaveErrorMsg 1410, N'Lang Id not found.'
    EXEC SaveErrorMsg 1411, N'Customer Id cannot be null or empty string.'
    EXEC SaveErrorMsg 1412, N'Customer Id not found.'
    EXEC SaveErrorMsg 1413, N'QSetId cannot be null or empty string.'
    EXEC SaveErrorMsg 1414, N'No QSet match QSetId in specificed Customer Id.'
    EXEC SaveErrorMsg 1415, N'Description(ML) already exists.'
    EXEC SaveErrorMsg 1416, N'Description (default) cannot be null or empty string.'
    EXEC SaveErrorMsg 1417, N'Description (default) already exists.'
    EXEC SaveErrorMsg 1418, N'Begin Date or End Date is overlap with another Question Set.'
    -- QSLIDES.
    EXEC SaveErrorMsg 1501, N'Customer Id cannot be null or empty string.'
    EXEC SaveErrorMsg 1502, N'Question Set Id cannot be null or empty string.'
    EXEC SaveErrorMsg 1503, N'Question Text cannot be null or empty string.'
    EXEC SaveErrorMsg 1504, N'Customer Id is not found.'
    EXEC SaveErrorMsg 1505, N'QSetId is not found.'
    EXEC SaveErrorMsg 1506, N'QSeq is not found.'
    EXEC SaveErrorMsg 1507, N'Lang Id cannot be null or empty string.'
    EXEC SaveErrorMsg 1508, N'Lang Id not found.'
    EXEC SaveErrorMsg 1509, N'Customer Id cannot be null or empty string.'
    EXEC SaveErrorMsg 1510, N'Customer Id not found.'
    EXEC SaveErrorMsg 1511, N'QSetId cannot be null or empty string.'
    EXEC SaveErrorMsg 1512, N'No QSet match QSetId in specificed Customer Id.'
    EXEC SaveErrorMsg 1513, N'QSeq is null or less than zero.'
    EXEC SaveErrorMsg 1514, N'No QSlide match QSetId and QSeq.'
    EXEC SaveErrorMsg 1515, N'Question Text (ML) cannot be null or empty string.'
    EXEC SaveErrorMsg 1516, N'Question Text (ML) already exists.'
    -- QSLIDEITEMS.
    EXEC SaveErrorMsg 1601, N'Customer Id cannot be null or empty string.'
    EXEC SaveErrorMsg 1602, N'Question Set Id cannot be null or empty string.'
    EXEC SaveErrorMsg 1603, N'QSeq cannot be null or less than zero.'
    EXEC SaveErrorMsg 1604, N'Question Text cannot be null or empty string.'
    EXEC SaveErrorMsg 1605, N'Customer Id is not found.'
    EXEC SaveErrorMsg 1606, N'QSetId is not found.'
    EXEC SaveErrorMsg 1607, N'QSlide is not found.'
    EXEC SaveErrorMsg 1608, N'QSSeq is not found.'
    EXEC SaveErrorMsg 1609, N'Lang Id cannot be null or empty string.'
    EXEC SaveErrorMsg 1610, N'Lang Id not found.'
    EXEC SaveErrorMsg 1611, N'Customer Id cannot be null or empty string.'
    EXEC SaveErrorMsg 1612, N'Customer Id not found.'
    EXEC SaveErrorMsg 1613, N'QSetId cannot be null or empty string.'
    EXEC SaveErrorMsg 1614, N'No QSet match QSetId in specificed Customer Id.'
    EXEC SaveErrorMsg 1615, N'QSeq is null or less than zero.'
    EXEC SaveErrorMsg 1616, N'No QSlide match QSetId and QSeq.'
    EXEC SaveErrorMsg 1617, N'QSSeq is null or less than zero.'
    EXEC SaveErrorMsg 1618, N'No QSlideItem match QSetId, QSeq and QSSeq.'
    EXEC SaveErrorMsg 1619, N'Question Item Text (ML) cannot be null or empty string.'
    EXEC SaveErrorMsg 1620, N'Question Item Text (ML) already exists.'
    -- VOTES.
    EXEC SaveErrorMsg 1701, N'Customer Id cannot be null or empty string.'
    EXEC SaveErrorMsg 1702, N'Customer Id not found.'
    EXEC SaveErrorMsg 1703, N'Branch Id cannot be null or empty string.'
    EXEC SaveErrorMsg 1704, N'Branch Id not found.'
    EXEC SaveErrorMsg 1705, N'Org Id cannot be null or empty string.'
    EXEC SaveErrorMsg 1706, N'Org Id not found.'
    EXEC SaveErrorMsg 1707, N'QSet Id cannot be null or empty string.'
    EXEC SaveErrorMsg 1708, N'QSet Id not found.'
    -- REGISTER CUSTOMER.
    EXEC SaveErrorMsg 1801, N'CustomerName cannot be null or empty string.'
    EXEC SaveErrorMsg 1802, N'UserName and Password cannot be null or empty string.'
	EXEC SaveErrorMsg 1803, N'LicenseTypeId cannot be null.'
	EXEC SaveErrorMsg 1804, N'LicenseTypeId not exists.'
    -- SIGNIN.
    EXEC SaveErrorMsg 1901, N'User Name cannot be null or empty string.'
    EXEC SaveErrorMsg 1902, N'Password cannot be null or empty string.'
    EXEC SaveErrorMsg 1903, N'Cannot found User that match information.'
    EXEC SaveErrorMsg 1904, N''
    -- GET VOTE SUMMARIES.
    EXEC SaveErrorMsg 2001, N'CustomerId cannot be null or empty string.'
    EXEC SaveErrorMsg 2002, N'QSetId cannot be null or empty string.'
    EXEC SaveErrorMsg 2003, N'QSeq cannot be null.'
    EXEC SaveErrorMsg 2004, N'The default OrgId not found.'
    EXEC SaveErrorMsg 2005, N'The BranchId not found.'
    -- GET RAW VOTES
    EXEC SaveErrorMsg 2101, N'CustomerId cannot be null or empty string.'
    EXEC SaveErrorMsg 2102, N'QSetId cannot be null or empty string.'
    EXEC SaveErrorMsg 2103, N'QSeq cannot be null or less than 1.'
    EXEC SaveErrorMsg 2104, N'Begin Date and End Date cannot be null.'
    EXEC SaveErrorMsg 2105, N'LangId Is Null Or Empty String.'
    -- ERROR MESSAGES
    EXEC SaveErrorMsg 2201, N'Error Code cannot be null or empty string.'
    EXEC SaveErrorMsg 2202, N'Language Id cannot be null or empty string.'
    EXEC SaveErrorMsg 2203, N'Language Id not found.'
    EXEC SaveErrorMsg 2204, N'Error Message (ML) cannot be null or empty string.'
    -- CLIENTS
    EXEC SaveErrorMsg 2301, N'Access Id cannot be null or empty string.'
    EXEC SaveErrorMsg 2302, N'Access Id not found.'
    EXEC SaveErrorMsg 2303, N'Lang Id cannot be null or empty string.'
    EXEC SaveErrorMsg 2304, N'Lang Id not found.'
    EXEC SaveErrorMsg 2305, N'Access Id cannot be null or empty string.'
    EXEC SaveErrorMsg 2306, N'Access Id not found.'
    EXEC SaveErrorMsg 2307, N'Access Id cannot be null or empty string.'
    EXEC SaveErrorMsg 2308, N'Access Id not found.'
    -- DEVICES
    EXEC SaveErrorMsg 2401, N'Customer Id cannot be null or empty string.'
    EXEC SaveErrorMsg 2402, N'Device Type Id not found.'
    EXEC SaveErrorMsg 2403, N'Device Name (default) cannot be null or empty string.'
    EXEC SaveErrorMsg 2404, N'Customer Id is not found.'
    EXEC SaveErrorMsg 2405, N'Device Id is not found.'
    EXEC SaveErrorMsg 2406, N'Device Name (default) already exists.'
    EXEC SaveErrorMsg 2407, N'Customer Id cannot be null or empty string.'
    EXEC SaveErrorMsg 2408, N'Lang Id cannot be null or empty string.'
    EXEC SaveErrorMsg 2409, N'Lang Id not exist.'
    EXEC SaveErrorMsg 2410, N'Device Id cannot be null or empty string.'
    EXEC SaveErrorMsg 2411, N'Device Id is not found.'
    EXEC SaveErrorMsg 2412, N'Device Name (ML) is already exists.'
	-- CHECK LICENSE
	EXEC SaveErrorMsg 2501, N'Customer Id cannot be null or empty string.'
	EXEC SaveErrorMsg 2502, N'Customer Id not exists.'
	EXEC SaveErrorMsg 2503, N'LicenseTypeId cannot be null.'
	EXEC SaveErrorMsg 2504, N'LicenseTypeId not exists.'
	-- SAVE LICENSE HISTORY
	EXEC SaveErrorMsg 2601, N'Customer Id cannot be null or empty string.'
	EXEC SaveErrorMsg 2602, N'Customer Id not exists.'
	EXEC SaveErrorMsg 2603, N'LicenseTypeId cannot be null.'
	EXEC SaveErrorMsg 2604, N'LicenseTypeId not exists.'
	EXEC SaveErrorMsg 2605, N'Request is on processing.'
	EXEC SaveErrorMsg 2606, N'Your Free License is already used.'
	-- REVOKE LICENSE HISTORY
	EXEC SaveErrorMsg 2701, N'History Id cannot be null or empty string.'
	EXEC SaveErrorMsg 2702, N'History Id not exists.'	
	-- EXTEND LICENSE HISTORY
	EXEC SaveErrorMsg 2801, N'History Id cannot be null or empty string.'
	EXEC SaveErrorMsg 2802, N'History Id not exists.'
    EXEC SaveErrorMsg 2803, N'License Still in active state.'
	-- SETUP DEVICE ORG
	EXEC SaveErrorMsg 2901, N'Customer Id cannot be null or empty string.'
	EXEC SaveErrorMsg 2902, N'Device Id cannot be null or empty string.'
    EXEC SaveErrorMsg 2903, N'Customer Id is not found.'
	EXEC SaveErrorMsg 2904, N'Device Id Not Found.'
    EXEC SaveErrorMsg 2905, N'Org Id is not found.'
	-- SETUP DEVICE USER
	EXEC SaveErrorMsg 3001, N'Customer Id cannot be null or empty string.'
	EXEC SaveErrorMsg 3002, N'Device Id cannot be null or empty string.'
    EXEC SaveErrorMsg 3003, N'Customer Id is not found.'
	EXEC SaveErrorMsg 3004, N'Device Id Not Found.'
    EXEC SaveErrorMsg 3005, N'Member Id is not found.'
    -- DELETE MEMBER INFO
    EXEC SaveErrorMsg 4001, N'Customer Id cannot be null or empty string.'
    EXEC SaveErrorMsg 4002, N'Member Id cannot be null or empty string.'
    EXEC SaveErrorMsg 4003, N'Cannot be remove default admin.'
    -- DELETE BRANCH
    EXEC SaveErrorMsg 4051, N'Customer Id cannot be null or empty string.'
    EXEC SaveErrorMsg 4052, N'Branch Id cannot be null or empty string.'
    EXEC SaveErrorMsg 4103, N'Cannot be remove default branch.'
    -- DELETE ORG
    EXEC SaveErrorMsg 4101, N'Customer Id cannot be null or empty string.'
    EXEC SaveErrorMsg 4102, N'Org Id cannot be null or empty string.'
    EXEC SaveErrorMsg 4103, N'Cannot be remove default org.'
    -- DELETE QSET
    EXEC SaveErrorMsg 4151, N'Customer Id cannot be null or empty string.'
    EXEC SaveErrorMsg 4152, N'Qset Id cannot be null or empty string.'
    EXEC SaveErrorMsg 4153, N'Cannot be remove qset that already in used.'
    -- DELETE QSLIDE
    EXEC SaveErrorMsg 4201, N'Customer Id cannot be null or empty string.'
    EXEC SaveErrorMsg 4202, N'Qset Id cannot be null or empty string.'
    EXEC SaveErrorMsg 4203, N'QSeq cannot be null.'
    EXEC SaveErrorMsg 4204, N'Cannot be remove qslide that already in used.'
    -- DELETE QSLIDEITEM
    EXEC SaveErrorMsg 4251, N'Customer Id cannot be null or empty string.'
    EXEC SaveErrorMsg 4252, N'Qset Id cannot be null or empty string.'
    EXEC SaveErrorMsg 4253, N'QSeq cannot be null.'
    EXEC SaveErrorMsg 4254, N'QSSeq cannot be null.'
    EXEC SaveErrorMsg 4255, N'Cannot be remove qslideitem that already in used.'
    -- DELETE DEVICE
    EXEC SaveErrorMsg 4301, N'Customer Id cannot be null or empty string.'
    EXEC SaveErrorMsg 4302, N'Device Id cannot be null or empty string.'
    EXEC SaveErrorMsg 4303, N'Cannot be remove default device.'
    -- DELETE VOTE
    EXEC SaveErrorMsg 4351, N'Customer Id cannot be null or empty string.'
    EXEC SaveErrorMsg 4352, N'Org Id cannot be null or empty string.'
    EXEC SaveErrorMsg 4353, N'QSet Id cannot be null or empty string.'
    EXEC SaveErrorMsg 4354, N'QSeq cannot be null.'
    EXEC SaveErrorMsg 4355, N'VoteSeq cannot be null.'
    EXEC SaveErrorMsg 4356, N'VoteDate cannot be null.'
    -- Change Customer
    EXEC SaveErrorMsg 4501, N'Access Id cannot be null or empty string.'
    EXEC SaveErrorMsg 4502, N'Access Id not found.'
    EXEC SaveErrorMsg 4503, N'Customer Id not found.'
    -- Set Access Device
    EXEC SaveErrorMsg 4601, N'Access Id cannot be null or empty string.'
    EXEC SaveErrorMsg 4602, N'Customer Id cannot be null or empty string.'
    EXEC SaveErrorMsg 4603, N'Access Id not found.'
    EXEC SaveErrorMsg 4604, N'Device Id not found.'
    -- Get QSet By Date
    EXEC SaveErrorMsg 4701, N'Customer Id cannot be null or empty string.'
    EXEC SaveErrorMsg 4702, N'Begin Date is null.'
    EXEC SaveErrorMsg 4703, N'Begin Date should less than End Date.'
    EXEC SaveErrorMsg 4704, N'No QSet Found.'
END

GO

EXEC InitErrorMessages;

GO

