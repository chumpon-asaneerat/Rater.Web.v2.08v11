SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author: Chumpon Asaneerat
-- Name: GetBranchs.
-- Description:	Get Branchs.
-- [== History ==]
-- <2017-05-31> :
--	- Stored Procedure Created.
-- <2018-04-16> :
--	- change language id from nvarchar(10) to nvarchar(3).
-- <2018-05-15> :
--	- change column LangId to langId
--	- change column CustomerId to customerId
--	- change column BranchId to branchId
--
-- [== Example ==]
--
--exec GetBranchs NULL, NULL, NULL, 1;                 -- for only enabled languages.
--exec GetBranchs;                                     -- for get all.
--exec GetBranchs N'EN';                               -- for get Branchs for EN language.
--exec GetBranchs N'TH';                               -- for get Branchs for TH language.
--exec GetBranchs N'TH', N'EDL-C2017060011';           -- for get Branchs by CustomerID.
--exec GetBranchs N'TH', N'EDL-C2017060011', N'B0001'; -- for get Branch by CustomerID and BranchId.
-- =============================================
CREATE PROCEDURE [dbo].[GetBranchs] 
(
  @langId nvarchar(3) = NULL
, @customerId nvarchar(30) = NULL
, @branchId nvarchar(30) = NULL
, @enabled bit = NULL
)
AS
BEGIN
	SELECT langId
		 , customerId
		 , branchId
		 , BranchName
		 , ObjectStatus
		 , SortOrder
		 , Enabled 
	  FROM BranchMLView
	 WHERE [ENABLED] = COALESCE(@enabled, [ENABLED])
	   AND UPPER(LTRIM(RTRIM(LangId))) = UPPER(LTRIM(RTRIM(COALESCE(@langId, LangId))))
	   AND UPPER(LTRIM(RTRIM(CustomerId))) = UPPER(LTRIM(RTRIM(COALESCE(@customerId, CustomerId))))
	   AND UPPER(LTRIM(RTRIM(BranchId))) = UPPER(LTRIM(RTRIM(COALESCE(@branchId, BranchId))))
	 ORDER BY SortOrder, LangId, CustomerId, BranchId;
END

GO
