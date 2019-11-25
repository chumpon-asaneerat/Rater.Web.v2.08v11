SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author: Chumpon Asaneerat
-- Name: FilterMembers.
-- Description:	Filter Members from vote table that match date range.
-- [== History ==]
-- <2011-11-07> :
--	- Stored Procedure Created.
--
-- [== Example ==]
--
--exec FilterMembers N'TH', N'EDL-C2019100003', N'QS00001', 1, N'2019-10-01', N'2019-11-01'
--exec FilterMembers N'TH', N'EDL-C2019100003', N'QS00001', 1, N'2019-10-01', N'2019-11-01', N'O0001'
-- =============================================
CREATE PROCEDURE [dbo].[FilterMembers] 
(
  @langId as nvarchar(3)
, @customerId as nvarchar(30)
, @qsetId as nvarchar(30)
, @qseq as int
, @beginDate As DateTime = null
, @endDate As DateTime = null
, @orgId as nvarchar(30) = null
, @errNum as int = 0 out
, @errMsg as nvarchar(100) = N'' out
)
AS
BEGIN
	BEGIN TRY
		SELECT DISTINCT L.LangId
		              , A.customerId
					  , A.orgId
					  , O.OrgName
					  , A.BranchId
					  , B.BranchName
					  , A.UserId
					  , M.FullName
		  FROM VOTE A
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
			   LEFT OUTER JOIN MemberInfoMLView M ON (
						  M.MemberId = A.UserId 
					  AND M.CustomerId = A.CustomerId
					  AND M.LangId = L.LangId
			   )
		 WHERE A.ObjectStatus = 1
		   AND LOWER(A.CustomerId) = LOWER(RTRIM(LTRIM(@customerId)))
		   AND LOWER(A.QSetId) = LOWER(RTRIM(LTRIM(@qsetId)))
		   AND A.QSeq = @qseq
		   AND UPPER(LTRIM(RTRIM(A.OrgId))) = UPPER(LTRIM(RTRIM(COALESCE(@orgId, A.OrgId))))
		   AND A.VoteDate >= @beginDate
		   AND A.VoteDate <= @endDate

		-- success
		EXEC GetErrorMsg 0, @errNum out, @errMsg out
	END TRY
	BEGIN CATCH
		SET @errNum = ERROR_NUMBER();
		SET @errMsg = ERROR_MESSAGE();
	END CATCH
END

GO
