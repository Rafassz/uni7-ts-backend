-- Script para adicionar campos Status e Prioridade à tabela Denuncias
USE [UniDB];
GO

-- Verificar se as colunas já existem antes de adicionar
IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[dbo].[Denuncias]') AND name = 'Status')
BEGIN
    ALTER TABLE [dbo].[Denuncias]
    ADD [Status] NVARCHAR(50) NOT NULL CONSTRAINT [DF_Denuncias_Status] DEFAULT 'Aberta';
END

IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[dbo].[Denuncias]') AND name = 'Prioridade')
BEGIN
    ALTER TABLE [dbo].[Denuncias]
    ADD [Prioridade] NVARCHAR(50) NOT NULL CONSTRAINT [DF_Denuncias_Prioridade] DEFAULT 'Média';
END

GO

-- Verificar as colunas adicionadas
SELECT COLUMN_NAME, DATA_TYPE, CHARACTER_MAXIMUM_LENGTH, COLUMN_DEFAULT
FROM INFORMATION_SCHEMA.COLUMNS
WHERE TABLE_NAME = 'Denuncias'
ORDER BY ORDINAL_POSITION;

GO
