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
