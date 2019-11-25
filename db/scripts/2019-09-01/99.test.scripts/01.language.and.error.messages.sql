DECLARE @errNum as int = 0
DECLARE @errMsg as nvarchar(MAX) = N''

EXEC SaveLanguage N'XX', 'xx', null, null, null, @errNum out, @errMsg out
SELECT @errNum as ErrNum, @errMsg as ErrMsg

--EXEC GetLanguages
EXEC GetErrorMsgs N'TH'
