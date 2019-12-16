SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author: Chumpon Asaneerat
-- Name: GetQSlides.
-- Description:	Get Question Slides.
-- [== History ==]
-- <2018-05-15> :
--	- Stored Procedure Created.
-- <2019-08-19> :
--	- Stored Procedure Changes.
--    - Remove QSlideTextNative column.
--    - Rename QSlideTextEN column to QSlideText.
--
-- [== Example ==]
--
--EXEC GetQSlides NULL, NULL, NULL, NULL, 1
--EXEC GetQSlides N'EN', NULL, NULL, NULL, 1
--EXEC GetQSlides NULL, N'EDL-C2018050001', NULL, NULL, 1;
--EXEC GetQSlides N'EN', N'EDL-C2018050001', NULL, NULL, 1;
--EXEC GetQSlides NULL, N'EDL-C2018050001', N'QS00002', NULL, 1;
--EXEC GetQSlides N'EN', N'EDL-C2018050001', N'QS00002', NULL, 1;
-- =============================================
CREATE PROCEDURE [dbo].[GetQSlides]
(
  @langId nvarchar(3) = NULL
, @customerId nvarchar(30) = NULL
, @qSetId nvarchar(30) = NULL
, @qSeq int = NULL
, @enabled bit = NULL
)
AS
BEGIN
	SELECT langId
		 , customerId
		 , qSetId
		 , qSeq
		 , QSlideText
		 , HasRemark
		 , QSlideStatus
		 , QSlideOrder
		 , Enabled 
	  FROM QSlideMLView
	 WHERE [ENABLED] = COALESCE(@enabled, [ENABLED])
	   AND UPPER(LTRIM(RTRIM(LangId))) = UPPER(LTRIM(RTRIM(COALESCE(@langId, LangId))))
	   AND UPPER(LTRIM(RTRIM(CustomerId))) = UPPER(LTRIM(RTRIM(COALESCE(@customerId, CustomerId))))
	   AND UPPER(LTRIM(RTRIM(QSetId))) = UPPER(LTRIM(RTRIM(COALESCE(@qSetId, QSetId))))
	   AND QSeq = COALESCE(@qSeq, QSeq)
	 ORDER BY SortOrder, CustomerId, QSetId, QSeq
END

GO
