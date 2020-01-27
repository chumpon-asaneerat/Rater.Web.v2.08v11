/*********** Script Update Date: 2020-01-09  ***********/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[ImageTable](
	[ImageId] [int] NOT NULL,
	[data] [varbinary](max) NULL,
 CONSTRAINT [PK_ImageTable] PRIMARY KEY CLUSTERED 
(
	[ImageId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO

/*********** Script Update Date: 2020-01-09  ***********/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author: Chumpon Asaneerat
-- Name: GetQSets.
-- Description:	Get Question Sets.
-- [== History ==]
-- <2018-05-15> :
--	- Stored Procedure Created.
-- <2019-08-19> :
--	- Stored Procedure Changes.
--    - Remove QSetDescriptionNative column.
--    - Rename QSetDescriptionEN column to QSetDescription.
-- <2020-01-07> :
--    - Add MinVoteDate, MaxVoteDate
--
-- [== Example ==]
--
--EXEC GetQSets NULL, NULL, NULL, 1
--EXEC GetQSets N'EN', NULL, NULL, 1
--EXEC GetQSets NULL, N'EDL-C2018050001', NULL, 1;
--EXEC GetQSets N'EN', N'EDL-C2018050001', NULL, 1;
--EXEC GetQSets NULL, N'EDL-C2018050001', N'QS00001', 1;
--EXEC GetQSets N'EN', N'EDL-C2018050001', N'QS00001', 1;
-- =============================================
ALTER PROCEDURE [dbo].[GetQSets]
(
  @langId nvarchar(3) = NULL
, @customerId nvarchar(30) = NULL
, @qSetId nvarchar(30) = NULL
, @enabled bit = NULL
)
AS
BEGIN
	SELECT A.langId
		 , A.customerId
		 , A.qSetId
		 , A.BeginDate
		 , A.EndDate
		 , (
			SELECT MIN(VoteDate) 
			  FROM Vote 
			 WHERE UPPER(LTRIM(RTRIM(CustomerId))) = UPPER(LTRIM(RTRIM(COALESCE(@customerId, CustomerId))))
			   AND UPPER(LTRIM(RTRIM(QSetId))) = UPPER(LTRIM(RTRIM(COALESCE(@qSetId, QSetId))))
		   ) AS MinVoteDate
		 , (
			SELECT MAX(VoteDate) 
			  FROM Vote 
			 WHERE UPPER(LTRIM(RTRIM(CustomerId))) = UPPER(LTRIM(RTRIM(COALESCE(@customerId, CustomerId))))
			   AND UPPER(LTRIM(RTRIM(QSetId))) = UPPER(LTRIM(RTRIM(COALESCE(@qSetId, QSetId))))
		   ) AS MaxVoteDate
		 , A.QSetDescription
		 , A.DisplayMode
		 , A.HasRemark
		 , A.IsDefault
		 , A.QSetStatus
		 , A.SortOrder
		 , A.Enabled 
	  FROM QSetMLView A
	 WHERE A.[ENABLED] = COALESCE(@enabled, A.[ENABLED])
	   AND UPPER(LTRIM(RTRIM(A.LangId))) = UPPER(LTRIM(RTRIM(COALESCE(@langId, A.LangId))))
	   AND UPPER(LTRIM(RTRIM(A.CustomerId))) = UPPER(LTRIM(RTRIM(COALESCE(@customerId, A.CustomerId))))
	   AND UPPER(LTRIM(RTRIM(A.QSetId))) = UPPER(LTRIM(RTRIM(COALESCE(@qSetId, A.QSetId))))
	 ORDER BY A.SortOrder, A.CustomerId, A.QSetId
END

GO


/*********** Script Update Date: 2020-01-09  ***********/
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
-- <2020-01-07> :
--    - Add MinVoteDate, MaxVoteDate
--
-- [== Example ==]
--
--EXEC GetQSetByDate NULL, N'EDL-C2018050001', N'2019-12-01'
--EXEC GetQSetByDate N'EN', N'EDL-C2018050001', N'2019-12-01'
--EXEC GetQSetByDate NULL, N'EDL-C2018050001', N'2019-01-15', N'2019-02-15'
-- =============================================
ALTER PROCEDURE [dbo].[GetQSetByDate]
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
					, (
						SELECT MIN(VoteDate) 
						  FROM Vote 
						 WHERE UPPER(LTRIM(RTRIM(CustomerId))) = UPPER(LTRIM(RTRIM(COALESCE(@customerId, CustomerId))))
						   AND UPPER(LTRIM(RTRIM(QSetId))) = UPPER(LTRIM(RTRIM(COALESCE(@qSetId, QSetId))))
					  ) AS MinVoteDate
					, (
						SELECT MAX(VoteDate) 
						  FROM Vote 
						 WHERE UPPER(LTRIM(RTRIM(CustomerId))) = UPPER(LTRIM(RTRIM(COALESCE(@customerId, CustomerId))))
						   AND UPPER(LTRIM(RTRIM(QSetId))) = UPPER(LTRIM(RTRIM(COALESCE(@qSetId, QSetId))))
					  ) AS MaxVoteDate
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


/*********** Script Update Date: 2020-01-09  ***********/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author: Chumpon Asaneerat
-- Name: __BuildTotalVoteCountQuery.
-- Description:	Build Query for select votevalue and total vote count for that votevalue.
-- [== History ==]
-- <2018-05-09> :
--	- Stored Procedure Created.
-- <2020-01-14> :
--	- Update time ckecking code.
--
-- [== Example ==]
--
--DECLARE @customerId nvarchar(30) = N'EDL-C2018040002'
--DECLARE @orgId nvarchar(30) = N'O0001';
--DECLARE @deviceId nvarchar(50) = N'233356614';
--DECLARE @qsetId nvarchar(30) = N'QS2018040001';
--DECLARE @qSeq int = 1; -- has single question.
--DECLARE @userId nvarchar(30) = NULL;
--DECLARE @beginDate datetime = N'2018-01-01';
--DECLARE @endDate datetime = N'2018-12-31';
--DECLARE @sql nvarchar(MAx);
--SET @orgId = NULL;
--SET @deviceId = NULL;
--
--EXEC __BuildTotalVoteCountQuery @customerId
--							    , @qsetId, @qSeq
--							    , @beginDate, @endDate
--							    , @orgId, @deviceId, @userId
--							    , @sql output;
-- =============================================
ALTER PROCEDURE [dbo].[__BuildTotalVoteCountQuery]
(
  @customerId as nvarchar(30)
, @qSetId as nvarchar(30)
, @qSeq as int
, @beginDate As DateTime = null
, @endDate As DateTime = null
, @orgId as nvarchar(30) = null
, @deviceId as nvarchar(30) = null
, @userId as nvarchar(30) = null
, @sql as nvarchar(MAX) output
)
AS
BEGIN
DECLARE @showOutput as int = 0;
DECLARE @objectStatus as int = 1;
DECLARE @includeSubOrg bit = 1;
DECLARE @inClause as nvarchar(MAX);
DECLARE @vBeginDateStr nvarchar(40);
DECLARE @vEndDateStr nvarchar(40); 
--DECLARE @vBeginDate as DateTime;
--DECLARE @vEndDate as DateTime;

	IF (dbo.IsNullOrEmpty(@orgId) = 0) -- OrgId Exist.
	BEGIN
		EXEC GenerateSubOrgInClause @customerId, @orgId, @includeSubOrg, @showOutput, @inClause output
	END

	-- CONVERT DATE
	SET @vBeginDateStr = (CONVERT(nvarchar(4), DatePart(yyyy, @beginDate)) + '-' +
						  CONVERT(nvarchar(2), DatePart(mm, @beginDate)) + '-' +
						  CONVERT(nvarchar(2), DatePart(dd, @beginDate)) + ' ' +
						  N'00:00:00');
	--SET @vBeginDate = CONVERT(datetime, @vBeginDateStr, 121);
	--SET @vBeginDate = CAST(@vBeginDateStr AS datetime)

	SET @vEndDateStr = (CONVERT(nvarchar(4), DatePart(yyyy, @endDate)) + '-' +
						CONVERT(nvarchar(2), DatePart(mm, @endDate)) + '-' +
						CONVERT(nvarchar(2), DatePart(dd, @endDate)) + ' ' +
						N'23:59:59');
	--SET @vEndDate = CONVERT(datetime, @vEndDateStr, 121);
	--SET @vEndDate = CAST(@vEndDateStr AS datetime)

	SET @sql = N'';
	SET @sql = @sql + 'SELECT VoteValue' + CHAR(13);
	SET @sql = @sql + '     , Count(VoteValue) AS TotalVote' + CHAR(13);
	SET @sql = @sql + '     , VoteValue * Count(VoteValue) AS TotalXCount' + CHAR(13);
	SET @sql = @sql + '     , Count(Remark) AS TotalRemark' + CHAR(13);
	SET @sql = @sql + '  FROM VOTE ' + CHAR(13);
	SET @sql = @sql + ' WHERE ' + CHAR(13);
	SET @sql = @sql + '		ObjectStatus = ' + convert(nvarchar, @objectStatus) + ' AND ' + CHAR(13);
	SET @sql = @sql + '		CustomerID = N''' + @customerId + ''' AND ' + CHAR(13);

	IF (dbo.IsNullOrEmpty(@userId) = 0)
	BEGIN
		SET @sql = @sql + '		UserID = N''' + @userId + ''' AND ' + CHAR(13);
	END

	IF (dbo.IsNullOrEmpty(@deviceId) = 0)
	BEGIN
		SET @sql = @sql + '		DeviceID = N''' + @deviceId + ''' AND ' + CHAR(13);
	END

	IF (dbo.IsNullOrEmpty(@orgId) = 0)
	BEGIN
		SET @sql = @sql + '		OrgID in (' + @inClause + ') AND ' + CHAR(13);
	END

	SET @sql = @sql + '		QSetID = N''' + @qSetId + ''' AND ' + CHAR(13);
	SET @sql = @sql + '		QSeq = ' + convert(nvarchar, @qSeq) + ' AND ' + CHAR(13);

	SET @sql = @sql + '		(VoteDate >= ''' + @vBeginDateStr + ''' AND ' + CHAR(13);
	SET @sql = @sql + '		 VoteDate <= ''' + @vEndDateStr + ''') ' + CHAR(13);

	SET @sql = @sql + ' GROUP BY VoteValue ' + CHAR(13);
	SET @sql = @sql + ' ORDER BY VoteValue ' + CHAR(13);

END

GO


/*********** Script Update Date: 2020-01-09  ***********/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author: Chumpon Asaneerat
-- Description:	Get Raw Votes.
-- [== History ==]
-- <2016-10-30> :
--	- Stored Procedure Created.
-- <2016-12-14> :
--	- Add supports pagination.
-- <2018-05-14> :
--	- Add lang Id.
-- <2019-11-07> :
--	- Add Org Id and Member Id.
-- <2020-01-14> :
--	- Update time ckecking code.
--
-- [== Example ==]
--
--EXEC GetRawVotes N'TH'
--				 , N'EDL-C2018040002'
--				 , N'QS2018040001', 1
--				 , NULL -- OrgId
--				 , NULL -- UserId (MemberId)
--				 , N'2018-05-09 00:00:00', N'2018-05-11 23:59:59';
-- =============================================
ALTER PROCEDURE [dbo].[GetRawVotes] 
(
  @langId as nvarchar(3)
, @customerId as nvarchar(30)
, @qsetId as nvarchar(30)
, @qseq as int
, @beginDate As DateTime = null
, @endDate As DateTime = null
, @orgId as nvarchar(30) = null
, @memberId as nvarchar(30) = null
, @pageNum as int = 1 out
, @rowsPerPage as int = 10 out
, @totalRecords as int = 0 out
, @maxPage as int = 0 out
, @errNum as int = 0 out
, @errMsg as nvarchar(100) = N'' out
)
AS
BEGIN
DECLARE @vBeginDateStr nvarchar(40);
DECLARE @vEndDateStr nvarchar(40); 
DECLARE @vBeginDate as DateTime;
DECLARE @vEndDate as DateTime;
	-- Error Code:
	--   0 : Success
	-- 2101 : CustomerId cannot be null or empty string.
	-- 2102 : QSetId cannot be null or empty string.
	-- 2103 : QSeq cannot be null or less than 1.
	-- 2104 : Begin Date and End Date cannot be null.
	-- 2105 : LangId Is Null Or Empty String.
	-- OTHER : SQL Error Number & Error Message.
	BEGIN TRY
		SET @pageNum = isnull(@pageNum, 1);
		SET @rowsPerPage = isnull(@rowsPerPage, 10);

		IF (@rowsPerPage <= 0) SET @rowsPerPage = 10;
		IF (@pageNum <= 0) SET @pageNum = 1;

		SET @totalRecords = 0;

		IF (dbo.IsNullOrEmpty(@customerId) = 1)
		BEGIN
			-- CustomerId cannot be null or empty string.
			EXEC GetErrorMsg 2101, @errNum out, @errMsg out
			RETURN
		END

		IF (dbo.IsNullOrEmpty(@qsetId) = 1)
		BEGIN
			-- QSetId cannot be null or empty string.
			EXEC GetErrorMsg 2102, @errNum out, @errMsg out
			RETURN
		END

		IF (@qseq IS NULL OR @qseq < 1)
		BEGIN
			-- QSeq cannot be null or less than 1.
			EXEC GetErrorMsg 2103, @errNum out, @errMsg out
			RETURN
		END
		
		IF (@beginDate IS NULL OR @endDate IS NULL)
		BEGIN
			-- Begin Date and End Date cannot be null.
			EXEC GetErrorMsg 2104, @errNum out, @errMsg out
			RETURN
		END
		
		IF (dbo.IsNullOrEmpty(@langId) = 1)
		BEGIN
			-- LangId Is Null Or Empty String.
			EXEC GetErrorMsg 2105, @errNum out, @errMsg out
			RETURN
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

		-- calculate total record and maxpages
		SELECT @totalRecords = COUNT(*) 
		  FROM Vote
		 WHERE LOWER(CustomerId) = LOWER(RTRIM(LTRIM(@customerId)))
		   AND LOWER(QSetId) = LOWER(RTRIM(LTRIM(@qsetId)))
		   AND QSeq = @qseq
		   AND VoteDate >= @vBeginDate
		   AND VoteDate <= @vEndDate
		   AND UPPER(LTRIM(RTRIM(OrgId))) = UPPER(LTRIM(RTRIM(COALESCE(@orgId, OrgId))))
		   AND UPPER(LTRIM(RTRIM(UserId))) = UPPER(LTRIM(RTRIM(COALESCE(@memberId, UserId))))
		   AND ObjectStatus = 1;

		SELECT @maxPage = 
			CASE WHEN (@totalRecords % @rowsPerPage > 0) THEN 
				(@totalRecords / @rowsPerPage) + 1
			ELSE 
				(@totalRecords / @rowsPerPage)
			END;

		WITH SQLPaging AS
		( 
			SELECT TOP(@rowsPerPage * @pageNum) ROW_NUMBER() OVER (ORDER BY A.VoteDate) AS RowNo
				, @pageNum PageNo
				, L.LangId
				, A.VoteDate
				, A.VoteSeq
				, A.CustomerId
				, A.QSetId
				, A.QSeq
				, A.VoteValue
				, A.Remark
				, A.OrgId
				, O.OrgName
				, A.BranchId
				, B.BranchName
				, A.DeviceId
				--, D.[Description]
				, A.UserId
				, M.FullName
			FROM Vote A 
					INNER JOIN LanguageView L ON (
							L.LangId = @langId
					)
					INNER JOIN OrgMLView O ON (
							O.OrgId = A.OrgId 
						AND O.CustomerId = A.CustomerId
						AND O.LangId = L.LangId
					)
					INNER JOIN BranchMLView B ON (
							B.BranchId = A.BranchId 
						AND B.CustomerId = A.CustomerId
						AND B.LangId = L.LangId
					)
					--INNER JOIN Device D ON (
					--		D.DeviceId = A.DeviceId 
					--	AND D.CustomerId = A.CustomerId
					--)
					LEFT OUTER JOIN MemberInfoMLView M ON (
							M.MemberId = A.UserId 
						AND M.CustomerId = A.CustomerId
						AND M.LangId = L.LangId
					)
			WHERE LOWER(A.CustomerId) = LOWER(RTRIM(LTRIM(@customerId)))
				AND LOWER(A.QSetId) = LOWER(RTRIM(LTRIM(@qsetId)))
				AND A.QSeq = @qseq
				AND A.ObjectStatus = 1
			    AND VoteDate >= @vBeginDate
			    AND VoteDate <= @vEndDate
			    AND UPPER(LTRIM(RTRIM(A.OrgId))) = UPPER(LTRIM(RTRIM(COALESCE(@orgId, A.OrgId))))
			    AND UPPER(LTRIM(RTRIM(A.UserId))) = UPPER(LTRIM(RTRIM(COALESCE(@memberId, A.UserId))))
			ORDER BY A.VoteDate, A.VoteSeq
		)
		SELECT * FROM SQLPaging WITH (NOLOCK) 
			WHERE RowNo > ((@pageNum - 1) * @rowsPerPage);

		-- success
		EXEC GetErrorMsg 0, @errNum out, @errMsg out
	END TRY
	BEGIN CATCH
		SET @errNum = ERROR_NUMBER();
		SET @errMsg = ERROR_MESSAGE();
	END CATCH
END

GO


/*********** Script Update Date: 2020-01-09  ***********/
DROP PROCEDURE FilterOrgs;
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author: Chumpon Asaneerat
-- Name: FilterOrgs.
-- Description:	Filter Vote Orgs from vote table that match date range.
-- [== History ==]
-- <2019-11-07> :
--	- Stored Procedure Created.
-- <2020-01-07> :
--	- Rename from FilterOrgs to FilterVoteOrgs.
--
-- [== Example ==]
--
--exec FilterVoteOrgs N'TH', N'EDL-C2019100003', N'QS00001', N'2019-10-01', N'2019-11-01'
--exec FilterVoteOrgs N'EN', N'EDL-C2019100003', N'QS00001', N'2019-10-01', N'2019-11-01'
-- =============================================
CREATE PROCEDURE [dbo].[FilterVoteOrgs] 
(
  @langId as nvarchar(3)
, @customerId as nvarchar(30)
, @qsetId as nvarchar(30)
, @beginDate As DateTime = null
, @endDate As DateTime = null
, @errNum as int = 0 out
, @errMsg as nvarchar(100) = N'' out
)
AS
BEGIN
DECLARE @vBeginDateStr nvarchar(40);
DECLARE @vEndDateStr nvarchar(40); 
DECLARE @vBeginDate as DateTime;
DECLARE @vEndDate as DateTime;
	BEGIN TRY
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

		SELECT DISTINCT L.langId
		              , A.customerId
					  , A.orgId
					  , O.OrgName
					  , A.BranchId
					  , B.BranchName
		  FROM VOTE A
			   INNER JOIN LanguageView L ON (
						  UPPER(LTRIM(RTRIM(L.LangId))) = UPPER(LTRIM(RTRIM(COALESCE(@langId, L.LangId))))
			   )
			   INNER JOIN OrgMLView O ON (
						  O.OrgId = A.OrgId 
					  AND O.CustomerId = A.CustomerId
					  AND O.LangId = L.LangId
			   )
			   INNER JOIN BranchMLView B ON (
						  B.BranchId = A.BranchId 
				      AND B.CustomerId = A.CustomerId
					  AND B.LangId = L.LangId
			   )
		 WHERE A.ObjectStatus = 1
		   AND LOWER(A.CustomerId) = LOWER(RTRIM(LTRIM(@customerId)))
		   AND LOWER(A.QSetId) = LOWER(RTRIM(LTRIM(@qsetId)))
		   AND A.VoteDate >= @vBeginDate
		   AND A.VoteDate <= @vEndDate

		-- success
		EXEC GetErrorMsg 0, @errNum out, @errMsg out
	END TRY
	BEGIN CATCH
		SET @errNum = ERROR_NUMBER();
		SET @errMsg = ERROR_MESSAGE();
	END CATCH
END

GO


/*********** Script Update Date: 2020-01-09  ***********/
DROP PROCEDURE FilterMembers;
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author: Chumpon Asaneerat
-- Name: FilterVoteMembers.
-- Description:	Filter Vote Members from vote table that match date range.
-- [== History ==]
-- <2019-11-07> :
--	- Stored Procedure Created.
-- <2020-01-07> :
--	- Rename SP name from FilterMembers to FilterVoteMembers.
--
-- [== Example ==]
--
--exec FilterVoteMembers N'TH', N'EDL-C2019100003', N'QS00001', NULL, N'2019-10-01', N'2019-11-01'
--exec FilterVoteMembers N'EN', N'EDL-C2019100003', N'QS00001', N'O0010', N'2019-10-01', N'2019-11-01'
-- =============================================
CREATE PROCEDURE [dbo].[FilterVoteMembers] 
(
  @langId as nvarchar(3)
, @customerId as nvarchar(30)
, @qsetId as nvarchar(30)
, @orgId as nvarchar(30) = null
, @beginDate As DateTime = null
, @endDate As DateTime = null
, @errNum as int = 0 out
, @errMsg as nvarchar(100) = N'' out
)
AS
BEGIN
DECLARE @vBeginDateStr nvarchar(40);
DECLARE @vEndDateStr nvarchar(40); 
DECLARE @vBeginDate as DateTime;
DECLARE @vEndDate as DateTime;
	BEGIN TRY
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

		SELECT DISTINCT L.langId
		              --, A.customerId
					  --, A.orgId
					  --, O.OrgName
					  --, A.BranchId
					  --, B.BranchName
					  , A.UserId
					  , M.FullName
		  FROM VOTE A
			   INNER JOIN LanguageView L ON (
						  UPPER(LTRIM(RTRIM(L.LangId))) = UPPER(LTRIM(RTRIM(COALESCE(@langId, L.LangId))))
			   )
               /*
			   INNER JOIN OrgMLView O ON (
						  O.OrgId = A.OrgId 
					  AND O.CustomerId = A.CustomerId
					  AND O.LangId = L.LangId
			   )
			   INNER JOIN BranchMLView B ON (
						  B.BranchId = A.BranchId 
				      AND B.CustomerId = A.CustomerId
					  AND B.LangId = L.LangId
			   )
               */
			   LEFT OUTER JOIN MemberInfoMLView M ON (
						  M.MemberId = A.UserId 
					  AND M.CustomerId = A.CustomerId
					  AND M.LangId = L.LangId
			   )
		 WHERE A.ObjectStatus = 1
		   AND LOWER(A.CustomerId) = LOWER(RTRIM(LTRIM(@customerId)))
		   AND LOWER(A.QSetId) = LOWER(RTRIM(LTRIM(@qsetId)))
		   AND UPPER(LTRIM(RTRIM(A.OrgId))) = UPPER(LTRIM(RTRIM(COALESCE(@orgId, A.OrgId))))
		   AND A.VoteDate >= @vBeginDate
		   AND A.VoteDate <= @vEndDate

		-- success
		EXEC GetErrorMsg 0, @errNum out, @errMsg out
	END TRY
	BEGIN CATCH
		SET @errNum = ERROR_NUMBER();
		SET @errMsg = ERROR_MESSAGE();
	END CATCH
END

GO


/*********** Script Update Date: 2020-01-09  ***********/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author: Chumpon Asaneerat
-- Name: FilterVoteDevices.
-- Description:	Filter Devices from vote table that match date range.
-- [== History ==]
-- <2020-01-13> :
--	- Stored Procedure Created.
--
-- [== Example ==]
--
--exec FilterVoteDevices N'TH', N'EDL-C2019100004', N'QS00004', NULL, N'2019-10-01', N'2021-11-01'
--exec FilterVoteDevices N'TH', N'EDL-C2019100004', N'QS00004', N'O0010', N'2019-10-01', N'2021-11-01'
-- =============================================
CREATE PROCEDURE [dbo].[FilterVoteDevices] 
(
  @langId as nvarchar(3)
, @customerId as nvarchar(30)
, @qsetId as nvarchar(30)
, @orgId as nvarchar(30) = null
, @beginDate As DateTime = null
, @endDate As DateTime = null
, @errNum as int = 0 out
, @errMsg as nvarchar(100) = N'' out
)
AS
BEGIN
DECLARE @vBeginDateStr nvarchar(40);
DECLARE @vEndDateStr nvarchar(40); 
DECLARE @vBeginDate as DateTime;
DECLARE @vEndDate as DateTime;
	BEGIN TRY
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

		SELECT DISTINCT L.langId
		              , A.customerId
					  , A.orgId
					  , O.OrgName
					  , A.BranchId
					  , B.BranchName
					  , A.DeviceId
					  , M.DeviceName
					  , M.Location
					  , M.DeviceTypeId
		  FROM VOTE A
			   INNER JOIN LanguageView L ON (
						  UPPER(LTRIM(RTRIM(L.LangId))) = UPPER(LTRIM(RTRIM(COALESCE(@langId, L.LangId))))
			   )
			   INNER JOIN OrgMLView O ON (
						  O.OrgId = A.OrgId 
					  AND O.CustomerId = A.CustomerId
					  AND O.LangId = L.LangId
			   )
			   INNER JOIN BranchMLView B ON (
						  B.BranchId = A.BranchId 
				      AND B.CustomerId = A.CustomerId
					  AND B.LangId = L.LangId
			   )
			   LEFT OUTER JOIN DeviceMLView M ON (
						  M.DeviceId = A.DeviceId 
					  AND M.CustomerId = A.CustomerId
					  AND M.LangId = L.LangId
			   )
		 WHERE A.ObjectStatus = 1
		   AND LOWER(A.CustomerId) = LOWER(RTRIM(LTRIM(@customerId)))
		   AND LOWER(A.QSetId) = LOWER(RTRIM(LTRIM(@qsetId)))
		   AND UPPER(LTRIM(RTRIM(A.OrgId))) = UPPER(LTRIM(RTRIM(COALESCE(@orgId, A.OrgId))))
		   AND A.VoteDate >= @vBeginDate
		   AND A.VoteDate <= @vEndDate

		-- success
		EXEC GetErrorMsg 0, @errNum out, @errMsg out
	END TRY
	BEGIN CATCH
		SET @errNum = ERROR_NUMBER();
		SET @errMsg = ERROR_MESSAGE();
	END CATCH
END

GO


/*********** Script Update Date: 2020-01-09  ***********/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author: Chumpon Asaneerat
-- Name: FilterVoteDeviceMembers.
-- Description:	Filter Members from vote table that match date range, orgId and deviceId.
-- [== History ==]
-- <2020-01-13> :
--	- Stored Procedure Created.
--
-- [== Example ==]
--
--exec FilterVoteDeviceMembers N'TH', N'EDL-C2019100004', N'QS00004', N'O0002', N'D0004', N'2019-10-01', N'2021-11-01'
-- =============================================
CREATE PROCEDURE [dbo].[FilterVoteDeviceMembers] 
(
  @langId as nvarchar(3)
, @customerId as nvarchar(30)
, @qsetId as nvarchar(30)
, @orgId as nvarchar(30)
, @deviceId as nvarchar(30)
, @beginDate As DateTime = null
, @endDate As DateTime = null
, @errNum as int = 0 out
, @errMsg as nvarchar(100) = N'' out
)
AS
BEGIN
DECLARE @vBeginDateStr nvarchar(40);
DECLARE @vEndDateStr nvarchar(40); 
DECLARE @vBeginDate as DateTime;
DECLARE @vEndDate as DateTime;
	BEGIN TRY
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

		SELECT DISTINCT L.langId
		              , A.customerId
					  , A.orgId
					  , O.OrgName
					  , A.BranchId
					  , B.BranchName
					  , A.DeviceId
					  , M.DeviceName
					  , M.Location
					  , M.DeviceTypeId
					  , A.UserId AS MemberId
					  , N.FullName
		  FROM VOTE A
			   INNER JOIN LanguageView L ON (
						  UPPER(LTRIM(RTRIM(L.LangId))) = UPPER(LTRIM(RTRIM(COALESCE(@langId, L.LangId))))
			   )
			   INNER JOIN OrgMLView O ON (
						  O.OrgId = A.OrgId 
					  AND O.CustomerId = A.CustomerId
					  AND O.LangId = L.LangId
			   )
			   INNER JOIN BranchMLView B ON (
						  B.BranchId = A.BranchId 
				      AND B.CustomerId = A.CustomerId
					  AND B.LangId = L.LangId
			   )
			   LEFT OUTER JOIN DeviceMLView M ON (
						  M.DeviceId = A.DeviceId 
					  AND M.CustomerId = A.CustomerId
					  AND M.LangId = L.LangId
			   )
			   LEFT OUTER JOIN MemberInfoMLView N ON (
						  N.MemberId = A.UserId 
					  AND N.CustomerId = A.CustomerId
					  AND N.LangId = L.LangId
			   )
		 WHERE A.ObjectStatus = 1
		   AND LOWER(A.CustomerId) = LOWER(RTRIM(LTRIM(@customerId)))
		   AND LOWER(A.QSetId) = LOWER(RTRIM(LTRIM(@qsetId)))
		   AND UPPER(LTRIM(RTRIM(A.OrgId))) = UPPER(LTRIM(RTRIM(COALESCE(@orgId, A.OrgId))))
		   AND UPPER(LTRIM(RTRIM(A.DeviceId))) = UPPER(LTRIM(RTRIM(COALESCE(@deviceId, A.DeviceId))))
		   AND A.VoteDate >= @vBeginDate
		   AND A.VoteDate <= @vEndDate

		-- success
		EXEC GetErrorMsg 0, @errNum out, @errMsg out
	END TRY
	BEGIN CATCH
		SET @errNum = ERROR_NUMBER();
		SET @errMsg = ERROR_MESSAGE();
	END CATCH
END

GO


/*********** Script Update Date: 2020-01-09  ***********/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author: Chumpon Asaneerat
-- Name: Save Image.
-- Description:	Save Image.
-- [== History ==]
-- <2020-01-14> :
--	- Stored Procedure Created.
--
-- [== Example ==]
--
-- =============================================
CREATE PROCEDURE [dbo].[SaveImage]
(
  @imageId int
, @data varbinary(MAX)
, @errNum as int = 0 out
, @errMsg as nvarchar(MAX) = N'' out
)
AS
BEGIN
DECLARE @iCnt int;
	BEGIN TRY
		SELECT @iCnt = COUNT(*) 
		  FROM ImageTable 
		 WHERE ImageId = @imageId

		IF (@iCnt = 0)
		BEGIN
			INSERT INTO 
			 ImageTable (
						   ImageId
			             , data
						)
			     VALUES (
						   @imageId
				         , @data
						)
		END
		ELSE
		BEGIN
			UPDATE ImageTable
			   SET data = @data
			 WHERE ImageId = @imageId
		END
		SET @errNum = 0;
		SET @errMsg = 'Success';
	END TRY
	BEGIN CATCH
		SET @errNum = ERROR_NUMBER();
		SET @errMsg = ERROR_MESSAGE();
	END CATCH
END

GO


/*********** Script Update Date: 2020-01-09  ***********/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author: Chumpon Asaneerat
-- Name: Get Image.
-- Description:	Save Image.
-- [== History ==]
-- <2020-01-14> :
--	- Stored Procedure Created.
--
-- [== Example ==]
--
-- =============================================
CREATE PROCEDURE [dbo].[GetImage]
(
  @imageId int
, @errNum as int = 0 out
, @errMsg as nvarchar(MAX) = N'' out
)
AS
BEGIN
	BEGIN TRY
		SELECT data 
		  FROM ImageTable 
		 WHERE ImageId = @imageId

		SET @errNum = 0;
		SET @errMsg = 'Success';
	END TRY
	BEGIN CATCH
		SET @errNum = ERROR_NUMBER();
		SET @errMsg = ERROR_MESSAGE();
	END CATCH
END

GO

