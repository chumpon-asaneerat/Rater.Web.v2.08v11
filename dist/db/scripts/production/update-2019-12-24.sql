/*********** Script Update Date: 2019-12-24  ***********/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author: Chumpon Asaneerat
-- Name: PeriodUnitMLView.
-- Description:	The Period Unit ML View.
-- [== History ==]
-- <2018-04-16> :
--	- View Created.
-- <2019-08-19> :
--	- View Changes.
--    - Remove PeriodUnitDescriptionNative column.
--    - Rename PeriodUnitDescriptionEN column to PeriodUnitDescription.
--
-- [== Example ==]
--
-- =============================================
ALTER VIEW [dbo].[PeriodUnitMLView]
AS
	SELECT PUV.LangId
		 , PUV.PeriodUnitId
		 , CASE 
			WHEN (PUML.Description IS NULL OR LTRIM(RTRIM(PUML.Description)) = '') THEN 
				PUV.PeriodUnitDescription
			ELSE 
				PUML.Description 
		   END AS PeriodUnitDescription
		 , PUV.SortOrder
		 , PUV.Enabled
		FROM dbo.PeriodUnitML AS PUML RIGHT OUTER JOIN PeriodUnitView AS PUV
		  ON (PUML.LangId = PUV.LangId AND PUML.PeriodUnitId = PUV.PeriodUnitId)
GO


/*********** Script Update Date: 2019-12-24  ***********/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author: Chumpon Asaneerat
-- Name: LimitUnitMLView.
-- Description:	The Limit Unit ML View.
-- [== History ==]
-- <2018-04-16> :
--	- View Created.
-- <2019-08-19> :
--	- View Changes.
--    - Remove LimitUnitDescriptionNative column.
--    - Remove LimitUnitTextNative column.
--    - Rename LimitUnitDescriptionEN column to LimitUnitDescription.
--    - Rename LimitUnitTextEN column to LimitUnitText.
--
-- [== Example ==]
--
-- =============================================
ALTER VIEW [dbo].[LimitUnitMLView]
AS
	SELECT LUV.LangId
		 , LUV.LimitUnitId
		 , CASE 
			WHEN (LMML.Description IS NULL OR LTRIM(RTRIM(LMML.Description)) = '') THEN 
				LUV.LimitUnitDescription
			ELSE 
				LMML.Description 
		   END AS LimitUnitDescription
		 , CASE 
			WHEN (LMML.UnitText IS NULL OR LTRIM(RTRIM(LMML.UnitText)) = '') THEN 
				LUV.LimitUnitText
			ELSE 
				LMML.UnitText 
		   END AS LimitUnitText
		 , LUV.Enabled
		 , LUV.SortOrder
		FROM dbo.LimitUnitML AS LMML RIGHT OUTER JOIN LimitUnitView AS LUV
		  ON (LMML.LangId = LUV.LangId AND LMML.LimitUnitId = LUV.LimitUnitId)

GO


/*********** Script Update Date: 2019-12-24  ***********/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

ALTER VIEW [dbo].[MemberTypeMLView]
AS
    SELECT MTV.LangId
		 , MTV.MemberTypeId
		 , CASE 
			WHEN (MTML.Description IS NULL OR LTRIM(RTRIM(MTML.Description)) = '') THEN 
				MTV.MemberTypeDescription
			ELSE 
				MTML.Description 
		   END AS MemberTypeDescription
		 , MTV.Enabled
		 , MTV.SortOrder
    FROM dbo.MemberTypeML AS MTML RIGHT OUTER JOIN MemberTypeView AS MTV
        ON (MTML.LangId = MTV.LangId AND MTML.MemberTypeId = MTV.MemberTypeId)

GO


/*********** Script Update Date: 2019-12-24  ***********/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

ALTER VIEW [dbo].[LicenseTypeMLView]
AS
	SELECT LTV.LangId
		 , LTV.LicenseTypeId
		 , CASE WHEN (LTML.Description IS NULL OR LTRIM(RTRIM(LTML.Description)) = '') 
		 	THEN
				LTV.LicenseTypeDescription
			ELSE 
				LTML.Description
		  END AS LicenseTypeDescription
		 , CASE 
			WHEN (LTML.AdText IS NULL OR LTRIM(RTRIM(LTML.AdText)) = '') 
			THEN
				LTV.AdText
			ELSE 
				LTML.AdText
		  END AS AdText
		 , LTV.PeriodUnitId
		 , LTV.NumberOfUnit
		 , CASE 
			WHEN LTML.Price IS NULL 
			THEN CONVERT(bit, 1)
			ELSE CONVERT(bit, 0) 
		  END AS UseDefaultPrice
		 , CASE WHEN LTML.Price IS NULL 
			THEN
				LTV.Price
			ELSE
				LTML.Price
		  END AS Price
			, CASE WHEN (LTML.CurrencySymbol IS NULL OR LTRIM(RTRIM(LTML.CurrencySymbol)) = '') 
			 THEN
			 	LTV.CurrencySymbol
			 ELSE
			 	LTML.CurrencySymbol
			 END AS CurrencySymbol
			, CASE WHEN (LTML.CurrencyText IS NULL OR LTRIM(RTRIM(LTML.CurrencyText)) = '')
			 THEN
			 	LTV.CurrencyText
			 ELSE
			 	LTML.CurrencyText
			 END AS CurrencyText
		 , LTV.Enabled
		 , LTV.SortOrder
		FROM dbo.LicenseTypeML AS LTML RIGHT OUTER JOIN LicenseTypeView AS LTV
		  ON (LTML.LangId = LTV.LangId AND LTML.LicenseTypeId = LTV.LicenseTypeId)

GO


/*********** Script Update Date: 2019-12-24  ***********/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

ALTER VIEW [dbo].[UserInfoMLView]
AS
	SELECT UIV.LangId
	     , UIV.UserId
		 , UIV.MemberType
		 , CASE 
			WHEN (UIML.FirstName IS NULL OR LTRIM(RTRIM(UIML.FirstName)) = '') THEN /* Use FirstName to check for used Native data */
				UIV.Prefix
			ELSE 
				UIML.Prefix 
		   END AS Prefix
		 , CASE 
			WHEN (UIML.FirstName IS NULL OR LTRIM(RTRIM(UIML.FirstName)) = '') THEN 
				UIV.FirstName
			ELSE 
				UIML.FirstName 
		   END AS FirstName
		 , CASE 
			WHEN (UIML.FirstName IS NULL OR LTRIM(RTRIM(UIML.FirstName)) = '') THEN /* Use FirstName to check for used Native data */
				UIV.LastName 
			ELSE 
				UIML.LastName
		   END AS LastName
		 , CASE 
			WHEN (UIML.FirstName IS NULL OR LTRIM(RTRIM(UIML.FirstName)) = '') THEN /* Use FirstName to check for used Native data */
				RTRIM(LTRIM(RTRIM(LTRIM(ISNULL(UIV.Prefix, N''))) + N' ' +
				            RTRIM(LTRIM(UIV.FirstName)) + N' ' +
				            RTRIM(LTRIM(ISNULL(UIV.LastName, N'')))))
			ELSE 
				RTRIM(LTRIM(RTRIM(LTRIM(ISNULL(UIML.Prefix, N''))) + N' ' +
				            RTRIM(LTRIM(UIML.FirstName)) + N' ' +
				            RTRIM(LTRIM(ISNULL(UIML.LastName, N'')))))
		   END AS FullName
	     , UIV.UserName
	     , UIV.Password
		 , UIV.ObjectStatus
		 , UIV.Enabled
		 , UIV.SortOrder
		FROM dbo.UserInfoML AS UIML RIGHT OUTER JOIN UserInfoView AS UIV
		  ON (UIML.LangId = UIV.LangId AND UIML.UserId = UIV.UserId)

GO


/*********** Script Update Date: 2019-12-24  ***********/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

ALTER VIEW [dbo].[CustomerMLView]
AS
	SELECT CUV.LangId
	     , CUV.CustomerId
		 , CASE 
			WHEN (CUML.CustomerName IS NULL OR LTRIM(RTRIM(CUML.CustomerName)) = '') THEN 
				CUV.CustomerName
			ELSE 
				CUML.CustomerName 
		   END AS CustomerName
		 , CASE 
			WHEN (CUML.CustomerName IS NULL OR LTRIM(RTRIM(CUML.CustomerName)) = '') THEN 
				CUV.TaxCode
			ELSE 
				CUML.TaxCode 
		   END AS TaxCode
		 , CASE 
			WHEN (CUML.CustomerName IS NULL OR LTRIM(RTRIM(CUML.CustomerName)) = '') THEN 
				CUV.Address1
			ELSE 
				CUML.Address1 
		   END AS Address1
		 , CASE 
			WHEN (CUML.CustomerName IS NULL OR LTRIM(RTRIM(CUML.CustomerName)) = '') THEN 
				CUV.Address2
			ELSE 
				CUML.Address2 
		   END AS Address2
		 , CASE 
			WHEN (CUML.CustomerName IS NULL OR LTRIM(RTRIM(CUML.CustomerName)) = '') THEN 
				CUV.City
			ELSE 
				CUML.City 
		   END AS City
		 , CASE 
			WHEN (CUML.CustomerName IS NULL OR LTRIM(RTRIM(CUML.CustomerName)) = '') THEN 
				CUV.Province
			ELSE 
				CUML.Province 
		   END AS Province
		 , CASE 
			WHEN (CUML.CustomerName IS NULL OR LTRIM(RTRIM(CUML.CustomerName)) = '') THEN 
				CUV.PostalCode
			ELSE 
				CUML.PostalCode 
		   END AS PostalCode
		 , CUV.Phone
		 , CUV.Mobile
		 , CUV.Fax
		 , CUV.Email
		 , CUV.ObjectStatus
		 , CUV.Enabled
		 , CUV.SortOrder
		FROM dbo.CustomerML AS CUML RIGHT OUTER JOIN CustomerView AS CUV
		  ON (CUML.LangId = CUV.LangId AND CUML.CustomerId = CUV.CustomerId)

GO


/*********** Script Update Date: 2019-12-24  ***********/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

ALTER VIEW [dbo].[MemberInfoMLView]
AS
	SELECT MIV.LangId
	     , MIV.CustomerId
	     , MIV.MemberId
	     , MIV.MemberType
		 , CASE 
			WHEN (MIML.FirstName IS NULL OR LTRIM(RTRIM(MIML.FirstName)) = '') THEN 
				MIV.Prefix
			ELSE 
				MIML.Prefix 
		   END AS Prefix
		 , CASE 
			WHEN (MIML.FirstName IS NULL OR LTRIM(RTRIM(MIML.FirstName)) = '') THEN 
				MIV.FirstName
			ELSE 
				MIML.FirstName 
		   END AS FirstName
		 , CASE 
			WHEN (MIML.FirstName IS NULL OR LTRIM(RTRIM(MIML.FirstName)) = '') THEN 
				MIV.LastName
			ELSE 
				MIML.LastName 
		   END AS LastName
		 , CASE 
			WHEN (MIML.FirstName IS NULL OR LTRIM(RTRIM(MIML.FirstName)) = '') THEN /* Use FirstName to check for used Native data */
				RTRIM(LTRIM(RTRIM(LTRIM(ISNULL(MIV.Prefix, N''))) + N' ' +
				            RTRIM(LTRIM(MIV.FirstName)) + N' ' +
				            RTRIM(LTRIM(ISNULL(MIV.LastName, N'')))))
			ELSE 
				RTRIM(LTRIM(RTRIM(LTRIM(ISNULL(MIML.Prefix, N''))) + N' ' +
				            RTRIM(LTRIM(MIML.FirstName)) + N' ' +
				            RTRIM(LTRIM(ISNULL(MIML.LastName, N'')))))
		   END AS FullName
	     , MIV.IDCard
	     , MIV.TagId
	     , MIV.EmployeeCode
	     , MIV.UserName
	     , MIV.Password
	     , MIV.ObjectStatus
	     , MIV.Enabled
	     , MIV.SortOrder
		FROM dbo.MemberInfoML AS MIML RIGHT OUTER JOIN MemberInfoView AS MIV
		  ON (    MIML.LangId = MIV.LangId 
		      AND MIML.CustomerId = MIV.CustomerId
		      AND MIML.MemberId = MIV.MemberId
			 )

GO


/*********** Script Update Date: 2019-12-24  ***********/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

ALTER VIEW [dbo].[BranchMLView]
AS
	SELECT BRV.LangId
	     , BRV.CustomerId
	     , BRV.BranchId
		 , CASE 
			WHEN (BRML.BranchName IS NULL OR LTRIM(RTRIM(BRML.BranchName)) = '') THEN 
				BRV.BranchName
			ELSE 
				BRML.BranchName 
		   END AS BranchName
	     , BRV.ObjectStatus
	     , BRV.Enabled
	     , BRV.SortOrder
		FROM dbo.BranchML AS BRML RIGHT OUTER JOIN BranchView AS BRV
		  ON (    BRML.LangId = BRV.LangId 
		      AND BRML.CustomerId = BRV.CustomerId
		      AND BRML.BranchId = BRV.BranchId
			 )

GO


/*********** Script Update Date: 2019-12-24  ***********/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

ALTER VIEW [dbo].[OrgMLView]
AS
   SELECT ORMLV.LangId
        , ORMLV.CustomerId
        , ORMLV.OrgId
        , ORMLV.BranchId
		, BMLV.BranchName
        , ORMLV.ParentId
        , ORMLV.OrgName
        , ORMLV.ObjectStatus AS OrgStatus
		, BMLV.ObjectStatus AS BranchStatus
        , ORMLV.Enabled
        , ORMLV.SortOrder
     FROM (
			SELECT ORV.LangId
				 , ORV.CustomerId
				 , ORV.OrgId
				 , ORV.BranchId
				 , ORV.ParentId
				 , CASE 
					WHEN (ORML.OrgName IS NULL OR LTRIM(RTRIM(ORML.OrgName)) = '') THEN 
						ORV.OrgName
					ELSE 
						ORML.OrgName 
				   END AS OrgName
				 , ORV.ObjectStatus
				 , ORV.Enabled
				 , ORV.SortOrder
				FROM dbo.OrgML AS ORML RIGHT OUTER JOIN OrgView AS ORV
				  ON (    ORML.LangId = ORV.LangId 
					  AND ORML.CustomerId = ORV.CustomerId
					  AND ORML.OrgId = ORV.OrgId
					 )
	      ) AS ORMLV LEFT JOIN BranchMLView AS BMLV
		          ON (    ORMLV.LangId = BMLV.LangId
				      AND ORMLV.CustomerId = BMLV.CustomerId
				      AND ORMLV.BranchId = BMLV.BranchId)

GO


/*********** Script Update Date: 2019-12-24  ***********/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author: Chumpon Asaneerat
-- Name: QSetMLView.
-- Description:	The QSet ML View.
-- [== History ==]
-- <2018-05-15> :
--	- View Created.
-- <2019-08-19> :
--	- View Changes.
--    - Remove QSetDescriptionNative column.
--    - Rename QSetDescriptionEn column to QSetDescription.
--
-- [== Example ==]
--
-- =============================================
ALTER VIEW [dbo].[QSetMLView]
AS
	SELECT QSetV.LangId
		 , QSetV.QSetId
		 , QSetV.CustomerId
		 , QSetV.BeginDate
		 , QSetV.EndDate
		 , CASE 
			WHEN (QSetML.Description IS NULL OR LTRIM(RTRIM(QSetML.Description)) = '') THEN 
				QSetV.Description
			ELSE 
				QSetML.Description 
		   END AS QSetDescription
		 , QSetV.DisplayMode
		 , QSetV.HasRemark
		 , QSetV.IsDefault
		 , QSetV.QSetStatus
		 , QSetV.Enabled
		 , QSetV.SortOrder
		FROM dbo.QSetML AS QSetML RIGHT OUTER JOIN QSetView AS QSetV
		  ON (QSetML.LangId = QSetV.LangId 
		  AND QSetML.QSetId = QSetV.QSetId
		  AND QSetML.CustomerId = QSetV.CustomerId)

GO


/*********** Script Update Date: 2019-12-24  ***********/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author: Chumpon Asaneerat
-- Name: QSlideMLView.
-- Description:	The QSlide ML View.
-- [== History ==]
-- <2018-05-15> :
--	- View Created.
-- <2019-08-19> :
--	- View Changes.
--    - Remove QSlideTextNative column.
--    - Rename QSlideTextEn column to QSlideText.
--
-- [== Example ==]
--
-- =============================================
ALTER VIEW [dbo].[QSlideMLView]
AS
	SELECT QSlideV.LangId
		 , QSlideV.CustomerId
		 , QSlideV.QSetId
		 , QSlideV.QSeq
		 , CASE 
			WHEN (QSlideML.QText IS NULL OR LTRIM(RTRIM(QSlideML.QText)) = '') THEN 
				QSlideV.QSlideText
			ELSE 
				QSlideML.QText 
		   END AS QSlideText
		 , QSlideV.HasRemark
		 , QSlideV.QSlideStatus
		 , QSlideV.QSlideOrder
		 , QSlideV.Enabled
		 , QSlideV.SortOrder
		FROM dbo.QSlideML AS QSlideML RIGHT OUTER JOIN QSlideView AS QSlideV
		  ON (QSlideML.LangId = QSlideV.LangId 
		  AND QSlideML.CustomerId = QSlideV.CustomerId
		  AND QSlideML.QSetId = QSlideV.QSetId
		  AND QSlideML.QSeq = QSlideV.QSeq)

GO


/*********** Script Update Date: 2019-12-24  ***********/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author: Chumpon Asaneerat
-- Name: QSlideItemMLView.
-- Description:	The QSlide Item ML View.
-- [== History ==]
-- <2018-05-15> :
--	- View Created.
-- <2019-08-19> :
--	- View Changes.
--    - Remove QItemTextNative column.
--    - Rename QItemTextEn column to QItemText.
--
-- [== Example ==]
--
-- =============================================
ALTER VIEW [dbo].[QSlideItemMLView]
AS
	SELECT QItemV.LangId
		 , QItemV.CustomerId
		 , QItemV.QSetId
		 , QItemV.QSeq
		 , QItemV.QSSeq
		 , CASE 
			WHEN (QItemML.QText IS NULL OR LTRIM(RTRIM(QItemML.QText)) = '') THEN 
				QItemV.QItemText
			ELSE 
				QItemML.QText 
		   END AS QItemText
		 , QItemV.IsRemark
		 , QItemV.QItemStatus
		 , QItemV.QItemOrder
		 , QItemV.Enabled
		 , QItemV.SortOrder
		FROM dbo.QSlideItemML AS QItemML RIGHT OUTER JOIN QSlideItemView AS QItemV
		  ON (QItemML.LangId = QItemV.LangId 
		  AND QItemML.CustomerId = QItemV.CustomerId
		  AND QItemML.QSetId = QItemV.QSetId
		  AND QItemML.QSeq = QItemV.QSeq
		  AND QItemML.QSSeq = QItemV.QSSeq)

GO


/*********** Script Update Date: 2019-12-24  ***********/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

ALTER VIEW [dbo].[DeviceTypeMLView]
AS
	SELECT DTV.LangId
	     , DTV.DeviceTypeId
		 , CASE 
			WHEN (DTML.Description IS NULL OR LTRIM(RTRIM(DTML.Description)) = '') THEN 
				DTV.Description
			ELSE 
				DTML.Description 
		   END AS Description
	     , DTV.Enabled
	     , DTV.SortOrder
		FROM dbo.DeviceTypeML AS DTML RIGHT OUTER JOIN DeviceTypeView AS DTV
		  ON (    DTML.LangId = DTV.LangId 
		      AND DTML.DeviceTypeId = DTV.DeviceTypeId
			 )
GO

/*********** Script Update Date: 2019-12-24  ***********/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

ALTER VIEW [dbo].[DeviceMLView]
AS
	SELECT DV.LangId
	     , DV.DeviceId
	     , DV.CustomerId
	     , DV.DeviceTypeId
		 , CASE 
			WHEN (DML.DeviceName IS NULL OR LTRIM(RTRIM(DML.DeviceName)) = '') THEN 
				DV.DeviceName
			ELSE 
				DML.DeviceName 
		   END AS DeviceName
		 , CASE 
			WHEN (DML.Location IS NULL OR LTRIM(RTRIM(DML.Location)) = '') THEN 
				DV.Location
			ELSE 
				DML.Location 
		   END AS Location
	     , DV.OrgId
	     , DV.MemberId
	     , DV.Enabled
	     , DV.SortOrder
		FROM dbo.DeviceML AS DML RIGHT OUTER JOIN DeviceView AS DV
		  ON (    DML.LangId = DV.LangId 
		      AND DML.DeviceId = DV.DeviceId
		      AND DML.CustomerId = DV.CustomerId
			 )
GO

