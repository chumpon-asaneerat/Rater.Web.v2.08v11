SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[LocalLog](
	[LogId] [int] NOT NULL,
	[Seq] [int] NOT NULL,
	[SPName] [nvarchar](50) NOT NULL,
	[LogDate] [datetime] NOT NULL,
	[Msg] [nvarchar](max) NOT NULL,
 CONSTRAINT [PK_LocalLog_1] PRIMARY KEY CLUSTERED 
(
	[LogId] ASC,
	[Seq] ASC,
	[SPName] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO

ALTER TABLE [dbo].[LocalLog] ADD  CONSTRAINT [DF_LocalLog_LogDate]  DEFAULT (getdate()) FOR [LogDate]
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'The log table primary key,' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'LocalLog', @level2type=N'COLUMN',@level2name=N'LogId'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'The log table sub primary key,' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'LocalLog', @level2type=N'COLUMN',@level2name=N'Seq'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'The sp name.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'LocalLog', @level2type=N'COLUMN',@level2name=N'SPName'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'The log message.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'LocalLog', @level2type=N'COLUMN',@level2name=N'Msg'
GO
