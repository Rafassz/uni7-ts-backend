-- Script para adicionar campos Status e Prioridade à tabela Denuncias

-- Verificar se a coluna Status já existe antes de adicionar
IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[dbo].[Denuncias]') AND name = 'Status')
BEGIN
    ALTER TABLE [dbo].[Denuncias]
    ADD [Status] NVARCHAR(50) NOT NULL CONSTRAINT [DF_Denuncias_Status] DEFAULT 'Aberta';
END

-- Verificar se a coluna Prioridade já existe antes de adicionar
IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[dbo].[Denuncias]') AND name = 'Prioridade')
BEGIN
    ALTER TABLE [dbo].[Denuncias]
    ADD [Prioridade] NVARCHAR(50) NOT NULL CONSTRAINT [DF_Denuncias_Prioridade] DEFAULT 'Média';
END
