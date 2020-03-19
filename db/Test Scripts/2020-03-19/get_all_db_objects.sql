SELECT name, Type = 'SP'
  FROM sys.objects 
 WHERE type = 'P' 
UNION
SELECT O.name, Type = 'FN'
  FROM sys.sql_modules M
 INNER JOIN sys.objects O 
	ON M.object_id = O.object_id
 WHERE O.type IN ('IF','TF','FN')
UNION
SELECT TABLE_NAME as name, Type = 'TABLE'
  FROM INFORMATION_SCHEMA.TABLES
 WHERE TABLE_TYPE = N'BASE TABLE'
UNION
SELECT name, Type = 'SP'
  FROM sys.views
ORDER BY name
