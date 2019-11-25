SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author: Chumpon Asaneerat
-- Name: FilterOrgs.
-- Description:	Filter Orgs from vote table that match date range.
-- [== History ==]
-- <2011-11-07> :
--	- Stored Procedure Created.
--
-- [== Example ==]
--
--exec FilterOrgs N'TH', N'EDL-C2019100003', N'QS00001', 1, N'2019-10-01', N'2019-11-01'
--exec FilterOrgs N'EN', N'EDL-C2019100003', N'QS00001', 1, N'2019-10-01', N'2019-11-01'
-- =============================================
CREATE PROCEDURE [dbo].[FilterOrgs] 
(
  @langId as nvarchar(3)
, @customerId as nvarchar(30)
, @qsetId as nvarchar(30)
, @qseq as int
, @beginDate As DateTime = null
, @endDate As DateTime = null
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
		 WHERE A.ObjectStatus = 1
		   AND LOWER(A.CustomerId) = LOWER(RTRIM(LTRIM(@customerId)))
		   AND LOWER(A.QSetId) = LOWER(RTRIM(LTRIM(@qsetId)))
		   AND A.QSeq = @qseq
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
