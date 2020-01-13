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
--exec FilterVoteDevices N'TH', N'EDL-C2019100004', N'QS00004', 1, N'2019-10-01', N'2021-11-01'
--exec FilterVoteDevices N'TH', N'EDL-C2019100004', N'QS00004', 1, N'2019-10-01', N'2021-11-01', N'O0010'
-- =============================================
CREATE PROCEDURE [dbo].[FilterVoteDevices] 
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
