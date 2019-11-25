SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author: Chumpon Asaneerat
-- Name: GetQSlideItems.
-- Description:	Get Question Slide Items.
-- [== History ==]
-- <2018-05-15> :
--	- Stored Procedure Created.
-- <2019-08-19> :
--	- Stored Procedure Changes.
--    - Remove QItemTextNative column.
--    - Rename QItemTextEN column to QItemText.
--
-- [== Example ==]
--
--EXEC GetQSlideItems NULL, NULL, NULL, NULL, NULL, 1
--EXEC GetQSlideItems N'EN', NULL, NULL, NULL, NULL, 1
--EXEC GetQSlideItems NULL, N'EDL-C2018050001', NULL, NULL, NULL, 1;
--EXEC GetQSlideItems N'EN', N'EDL-C2018050001', NULL, NULL, NULL, 1;
--EXEC GetQSlideItems NULL, N'EDL-C2018050001', N'QS00001', NULL, NULL, 1;
--EXEC GetQSlideItems N'JA', N'EDL-C2018050001', N'QS00001', NULL, NULL, 1;
-- =============================================
CREATE PROCEDURE [dbo].[GetQSlideItems]
(
  @langId nvarchar(3) = NULL
, @customerId nvarchar(30) = NULL
, @qSetId nvarchar(30) = NULL
, @qSeq int = NULL
, @qSSeq int = NULL
, @enabled bit = NULL
)
AS
BEGIN
	SELECT langId
		 , customerId
		 , qSetId
		 , qSeq
		 , qSSeq
		 , QItemText
		 , IsRemark
		 , QItemStatus
		 , QItemOrder
		 , Enabled 
	  FROM QSlideItemMLView
	 WHERE [ENABLED] = COALESCE(@enabled, [ENABLED])
	   AND UPPER(LTRIM(RTRIM(LangId))) = UPPER(LTRIM(RTRIM(COALESCE(@langId, LangId))))
	   AND UPPER(LTRIM(RTRIM(CustomerId))) = UPPER(LTRIM(RTRIM(COALESCE(@customerId, CustomerId))))
	   AND UPPER(LTRIM(RTRIM(QSetId))) = UPPER(LTRIM(RTRIM(COALESCE(@qSetId, QSetId))))
	   AND QSeq = COALESCE(@qSeq, QSeq)
	   AND QSSeq = COALESCE(@qSSeq, QSSeq)
	 ORDER BY SortOrder, CustomerId, QSetId, QSeq
END

GO
