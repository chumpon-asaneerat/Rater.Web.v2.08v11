SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author: Chumpon Asaneerat
-- Name: GetDevices.
-- Description:	Get Devices.
-- [== History ==]
-- <2018-05-22> :
--	- Stored Procedure Created.
--
-- [== Example ==]
--
--exec GetDevices N'EN';                               -- for get devices for EN language.
--exec GetDevices N'TH';                               -- for get devices for TH language.
--exec GetDevices N'TH', N'EDL-C2017060011';           -- for get devices by CustomerID.
--exec GetDevices N'TH', N'EDL-C2017060011', N'D0001'; -- for get devices by CustomerID and DeviceId.
-- =============================================
CREATE PROCEDURE [dbo].[GetDevices] 
(
  @langId nvarchar(3) = NULL
, @customerId nvarchar(30) = NULL
, @deviceId nvarchar(30) = NULL
, @enabled bit = NULL
)
AS
BEGIN
	SELECT DMLV.langId
		 , DMLV.customerId
		 , DMLV.deviceId
		 , DMLV.deviceTypeId
		 , DTMV.Description as Type
		 , DMLV.DeviceName
		 , DMLV.Location
		 , DMLV.orgId
		 , DMLV.memberId
		 , DMLV.SortOrder
		 , DMLV.Enabled 
	  FROM DeviceMLView DMLV
	     , DeviceTypeMLView DTMV
		 --, OrgMLView OMLV
		 --, MemberInfoMLView MIMLV
	 WHERE DMLV.[ENABLED] = COALESCE(@enabled, DMLV.[ENABLED])
	   AND UPPER(LTRIM(RTRIM(DMLV.LangId))) = UPPER(LTRIM(RTRIM(COALESCE(@langId, DMLV.LangId))))
       AND UPPER(LTRIM(RTRIM(DTMV.LangId))) = UPPER(LTRIM(RTRIM(DMLV.LangId)))
	   AND UPPER(LTRIM(RTRIM(DMLV.CustomerId))) = UPPER(LTRIM(RTRIM(COALESCE(@customerId, DMLV.CustomerId))))
	   AND UPPER(LTRIM(RTRIM(DMLV.DeviceId))) = UPPER(LTRIM(RTRIM(COALESCE(@deviceId, DMLV.DeviceId))))
	   AND DMLV.DeviceTypeId = DTMV.DeviceTypeId
	   --AND OMLV.CustomerId = DMLV.CustomerId
	   --AND OMLV.OrgID = DMLV.OrgId
	   --AND MIMLV.CustomerId = DMLV.CustomerId
	   --AND MIMLV.MemberID = DMLV.MemberID
	 ORDER BY DMLV.SortOrder, DMLV.LangId, DMLV.CustomerId, DMLV.DeviceId;
END

GO
