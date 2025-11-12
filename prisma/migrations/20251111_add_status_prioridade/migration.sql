-- AlterTable
ALTER TABLE [dbo].[Denuncias] ADD 
    [Status] NVARCHAR(50) NOT NULL CONSTRAINT [DF_Denuncias_Status] DEFAULT 'Aberta',
    [Prioridade] NVARCHAR(50) NOT NULL CONSTRAINT [DF_Denuncias_Prioridade] DEFAULT 'Média';
