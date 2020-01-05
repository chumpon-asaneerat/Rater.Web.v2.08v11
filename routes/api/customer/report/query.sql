-- Used for Dashboard.
EXEC GetQSetByDate N'TH', N'EDL-C2019100003', N'2019-01-15', N'2019-02-15'

exec FilterOrgs N'TH', N'EDL-C2019100003', N'QS00001', 1, N'2019-10-01', N'2019-11-01'

-- Used for report selection (Staff).
exec FilterMembers N'TH', N'EDL-C2019100003', N'QS00001', 1, N'2019-10-01', N'2019-11-01'
