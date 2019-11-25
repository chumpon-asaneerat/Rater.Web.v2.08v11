SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author: Chumpon Asaneerat
-- Name: DeleteAll.
-- Description:	Remove all data in all tables.
-- [== History ==]
-- <2017-02-04> :
--	- Stored Procedure Created.
-- <2018-04-16> :
--	- Add code to count deleted row(s) and show output.
--
-- [== Example ==]
--
--exec DeleteAll
-- =============================================
CREATE PROCEDURE DeleteAll
AS
BEGIN
CREATE TABLE #TABLE_NAMES
(
    TableName nvarchar(100)
);
DECLARE @sql nvarchar(MAX);
DECLARE @countSql nvarchar(MAX);
DECLARE @paramDefs nvarchar(MAX);
DECLARE @tableName nvarchar(100);
DECLARE @delTableCursor CURSOR;
DECLARE @oCnt int;
DECLARE @nCnt int;
    /* DELETE DATA IN TABLES */
    INSERT INTO #TABLE_NAMES
        (TableName)
    SELECT TABLE_NAME
    FROM INFORMATION_SCHEMA.TABLES
    WHERE TABLE_TYPE = N'BASE TABLE';

    SET @delTableCursor = CURSOR LOCAL FAST_FORWARD 
	    FOR SELECT TableName
    FROM #TABLE_NAMES;

    OPEN @delTableCursor;
    FETCH NEXT FROM @delTableCursor INTO @tableName;
    WHILE @@FETCH_STATUS = 0
	BEGIN
        -- Prepare count statement.
        SET @countSql = 'SELECT @iCnt = COUNT(*) FROM ' + @tableName;
        SET @paramDefs = N'@iCnt int OUTPUT';

        -- Gets exists rows before delete.
        SET @oCnt = 0;
        EXECUTE SP_EXECUTESQL @countSql, @paramDefs, @iCnt = @oCnt OUTPUT;
        
        -- delete all data in table.
        SET @sql = 'DELETE FROM ' + @tableName;
        EXECUTE SP_EXECUTESQL @sql;
        
        -- Gets exists rows after deleted.
        SET @nCnt = 0;
        EXECUTE SP_EXECUTESQL @countSql, @paramDefs, @iCnt = @nCnt OUTPUT;

        -- Show output
        SELECT @tableName AS TableName, (@oCnt - @nCnt) AS Deleted;
        
        FETCH NEXT FROM @delTableCursor INTO @tableName;
    END
    CLOSE @delTableCursor;
    DEALLOCATE @delTableCursor;

    DROP TABLE #TABLE_NAMES;
END

GO
