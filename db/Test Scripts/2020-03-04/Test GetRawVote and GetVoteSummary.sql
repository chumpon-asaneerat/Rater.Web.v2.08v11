declare @customerId nvarchar(30)
declare @qsetId nvarchar(30)
declare @qseq int
declare @orgId nvarchar(30)
declare @begin date;
declare @end date;
declare @beginDT date;
declare @endDT date;

SET @customerId = N'EDL-C2019100004'
SET @qsetId = N'QS00004'
SET @qseq = 1

SET @begin = N'2020-01-15'
SET @end = N'2020-01-15'
SET @beginDT = N'2020-01-15 00:00:00.000'
SET @endDT = N'2020-01-15 23:59:59.999'

SET @orgId = N'O0010'

--SELECT * FROM Vote WHERE CustomerId = @customerId AND QSetId = @qsetId

DECLARE @cntTotal int;
DECLARE @cnt12 int;
DECLARE @cnt13 int;
DECLARE @cnt14 int;
DECLARE @cnt15 int;
DECLARE @cnt16 int;

SELECT @cntTotal = COUNT(*) 
  FROM Vote 
 WHERE CustomerId = @customerId AND QSetId = @qsetId
   AND QSeq = @qseq
SELECT @cnt12 = COUNT(*) 
  FROM Vote 
 WHERE VoteDate BETWEEN N'2020-01-12 00:00:00.000' AND N'2020-01-12 23:59:59.999' 
   AND CustomerId = @customerId AND QSetId = @qsetId
   AND QSeq = @qseq
SELECT @cnt13 = COUNT(*) 
  FROM Vote 
 WHERE VoteDate BETWEEN N'2020-01-13 00:00:00.000' AND N'2020-01-13 23:59:59.999' 
   AND CustomerId = @customerId AND QSetId = @qsetId
   AND QSeq = @qseq
SELECT @cnt14 = COUNT(*) 
  FROM Vote 
 WHERE VoteDate BETWEEN N'2020-01-14 00:00:00.000' AND N'2020-01-14 23:59:59.999' 
   AND CustomerId = @customerId AND QSetId = @qsetId
   AND QSeq = @qseq
SELECT @cnt15 = COUNT(*) 
  FROM Vote 
 WHERE VoteDate BETWEEN N'2020-01-15 00:00:00.000' AND N'2020-01-15 23:59:59.999' 
   AND CustomerId = @customerId AND QSetId = @qsetId
   AND QSeq = @qseq
SELECT @cnt16 = COUNT(*) 
  FROM Vote 
 WHERE VoteDate BETWEEN N'2020-01-16 00:00:00.000' AND N'2020-01-16 23:59:59.999' 
   AND CustomerId = @customerId AND QSetId = @qsetId 
   AND QSeq = @qseq

SELECT @cntTotal AS CntTotal
     , @cnt12 AS Cnt12
     , @cnt13 AS Cnt13
     , @cnt14 AS Cnt14
     , @cnt15 AS Cnt15
     , @cnt16 AS Cnt16




/*
SELECT DISTINCT A.CustomerId
     , A.QSetId
     , CTot.Cnt AS CntTotal
	 , C12.Cnt AS Cnt12
	 , C13.Cnt AS Cnt13
	 , C14.Cnt AS Cnt14
	 , C15.Cnt AS Cnt15
	 , C16.Cnt AS Cnt16
  FROM Vote A
  LEFT OUTER JOIN (
			 SELECT COUNT(*) AS Cnt, CustomerId, QSetId 
               FROM Vote 
			 GROUP BY CustomerId, QSetId
			) CTot ON A.CustomerId = CTot.CustomerId
			      AND A.QSetId = CTot.QSetId
  LEFT OUTER JOIN (
			 SELECT COUNT(*) AS Cnt, CustomerId, QSetId 
               FROM Vote 
			  WHERE VoteDate >= N'2020-01-12 00:00:00.000' 
			    AND VoteDate <= N'2020-01-12 23:59:59.999'
			 GROUP BY CustomerId, QSetId
			) C12 ON A.CustomerId = C12.CustomerId
			     AND A.QSetId = C12.QSetId
  LEFT OUTER JOIN (
			 SELECT COUNT(*) AS Cnt, CustomerId, QSetId 
               FROM Vote 
			  WHERE VoteDate >= N'2020-01-13 00:00:00.000' 
			    AND VoteDate <= N'2020-01-13 23:59:59.999'
			 GROUP BY CustomerId, QSetId
			) C13 ON A.CustomerId = C13.CustomerId
			     AND A.QSetId = C13.QSetId
  LEFT OUTER JOIN (
			 SELECT COUNT(*) AS Cnt, CustomerId, QSetId 
               FROM Vote 
			  WHERE VoteDate >= N'2020-01-14 00:00:00.000' 
			    AND VoteDate <= N'2020-01-14 23:59:59.999'
			 GROUP BY CustomerId, QSetId
			) C14 ON A.CustomerId = C14.CustomerId
			     AND A.QSetId = C14.QSetId
  LEFT OUTER JOIN (
			 SELECT COUNT(*) AS Cnt, CustomerId, QSetId 
               FROM Vote 
			  WHERE VoteDate >= N'2020-01-15 00:00:00.000' 
			    AND VoteDate <= N'2020-01-15 23:59:59.999'
			 GROUP BY CustomerId, QSetId
			) C15 ON A.CustomerId = C15.CustomerId
			     AND A.QSetId = C15.QSetId
  LEFT OUTER JOIN (
			 SELECT COUNT(*) AS Cnt, CustomerId, QSetId 
               FROM Vote 
			  WHERE VoteDate >= N'2020-01-16 00:00:00.000' 
			    AND VoteDate <= N'2020-01-16 23:59:59.999'
			 GROUP BY CustomerId, QSetId
			) C16 ON A.CustomerId = C16.CustomerId
			     AND A.QSetId = C16.QSetId
*/


/*
SELECT COUNT(*) AS Cnt14 FROM Vote 
 WHERE CustomerId = @customerId 
   AND QSetId = @qsetId
   AND VoteDate >= N'2020-01-14 00:00:00.000'
   AND VoteDate <= N'2020-01-14 23:59:59.999'
SELECT
 COUNT(*) AS Cnt15 FROM Vote 
 WHERE CustomerId = @customerId 
   AND QSetId = @qsetId
   AND VoteDate >= N'2020-01-15 00:00:00.000'
   AND VoteDate <= N'2020-01-15 23:59:59.999'
*/

/*
SELECT * FROM Vote 
 WHERE CustomerId = @customerId 
   AND QSetId = @qsetId
   AND QSeq = @qseq
   AND OrgId = @orgId
   AND VoteDate >= @beginDT
   AND VoteDate <= @endDT

EXEC GetRawVotes N'EN', @customerId, @qsetId, @qseq, @begin, @end, @orgId, NULL, 1, 1000, 0
EXEC GetVoteSummaries N'EN', @customerId, @qsetId, @qseq, @begin, @end, @orgId
*/


/*
SELECT * 
  FROM Customer 
 WHERE CustomerId = N'EDL-C2019100004'

SELECT * 
  FROM MemberInfo 
 WHERE CustomerId = N'EDL-C2019100004'

SELECT * 
  FROM QSet 
 WHERE CustomerId = N'EDL-C2019100004'

SELECT * 
  FROM Vote 
 WHERE CustomerId = N'EDL-C2019100004'

SELECT * 
  FROM Vote 
 WHERE CustomerId = N'EDL-C2019100004' 
   AND VoteDate Between N'2020-01-14' AND N'2020-01-15'
*/

/*
EXEC GetRawVotes N'EN', N'EDL-C2019100004', N'QS00004', 1, N'2020-01-14', N'2020-01-14', NULL, NULL, 1, 1000, 0

SELECT * FROM Vote WHERE CustomerId = N'EDL-C2019100004' AND QSetId = N'QS00004' AND QSeq = 1 AND OrgId = N'O0006'
EXEC GetRawVotes N'EN', N'EDL-C2019100004', N'QS00004', 1, N'2020-01-14', N'2020-01-14', N'O0006', NULL, 1, 1000, 0
EXEC GetVoteSummaries N'EN', N'EDL-C2019100004', N'QS00004', 1, N'2020-01-14', N'2020-01-14', N'O0006'

SELECT * FROM Vote WHERE CustomerId = N'EDL-C2019100004' AND QSetId = N'QS00004' AND QSeq = 1 AND OrgId = N'O0007'
EXEC GetRawVotes N'EN', N'EDL-C2019100004', N'QS00004', 1, N'2020-01-14', N'2020-01-14', N'O0007', NULL, 1, 1000, 0
EXEC GetVoteSummaries N'EN', N'EDL-C2019100004', N'QS00004', 1, N'2020-01-14', N'2020-01-14', N'O0007'

SELECT * FROM Vote WHERE CustomerId = N'EDL-C2019100004' AND QSetId = N'QS00004' AND QSeq = 1 AND OrgId = N'O0010'
EXEC GetRawVotes N'EN', N'EDL-C2019100004', N'QS00004', 1, N'2020-01-14', N'2020-01-14', N'O0010', NULL, 1, 1000, 0
EXEC GetVoteSummaries N'EN', N'EDL-C2019100004', N'QS00004', 1, N'2020-01-14', N'2020-01-14', N'O0010'

--DELETE FROM Vote WHERE CustomerId = N'EDL-C2019100004'

SELECT * FROM Vote WHERE CustomerId = N'EDL-C2019100004' AND QSetId = N'QS00004'

SELECT * FROM Vote 
 WHERE CustomerId = N'EDL-C2019100004' 
   AND QSetId = N'QS00004'
   AND QSeq = 1
   AND OrgId = N'O0010'
   AND VoteDate >= N'2020-01-14 00:00:00'
   AND VoteDate <= N'2020-01-14 23:59:59'

SELECT * FROM Vote 
 WHERE CustomerId = N'EDL-C2019100004' 
   AND QSetId = N'QS00004'
   AND QSeq = 1
   AND OrgId = N'O0010'
*/