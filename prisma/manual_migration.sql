-- =====================================================
-- Script de Criação Completa do Banco de Dados
-- Sistema de Denúncias e Avisos
-- =====================================================

USE master;
GO

-- 1. Criar o banco de dados se não existir
IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = 'UniDB')
BEGIN
    CREATE DATABASE UniDB;
    PRINT '✓ Banco de dados UniDB criado com sucesso!';
END
ELSE
BEGIN
    PRINT '✓ Banco de dados UniDB já existe.';
END
GO

USE UniDB;
GO

-- 2. Dropar tabelas existentes (se necessário começar do zero)
-- ATENÇÃO: Descomente as linhas abaixo apenas se quiser APAGAR tudo e começar do zero!
/*
IF OBJECT_ID('dbo.Denuncias', 'U') IS NOT NULL DROP TABLE [dbo].[Denuncias];
IF OBJECT_ID('dbo.Avisos', 'U') IS NOT NULL DROP TABLE [dbo].[Avisos];
IF OBJECT_ID('dbo.Usuarios', 'U') IS NOT NULL DROP TABLE [dbo].[Usuarios];
IF OBJECT_ID('dbo.Usuario', 'U') IS NOT NULL DROP TABLE [dbo].[Usuario];
PRINT '✓ Tabelas antigas removidas.';
*/

-- 3. Criar tabela Usuarios
IF OBJECT_ID('dbo.Usuarios', 'U') IS NULL
BEGIN
    CREATE TABLE [dbo].[Usuarios] (
        [IdUsuario] INT NOT NULL IDENTITY(1,1),
        [NomeUsuario] VARCHAR(255) NOT NULL,
        [Senha] VARCHAR(255) NOT NULL,
        [Ativa] BIT NOT NULL DEFAULT 1,
        [Inclusao] DATETIME2 NOT NULL DEFAULT GETDATE(),
        [Atualizacao] DATETIME2 NOT NULL DEFAULT GETDATE(),
        CONSTRAINT [Usuarios_pkey] PRIMARY KEY CLUSTERED ([IdUsuario])
    );
    PRINT '✓ Tabela Usuarios criada!';
END
ELSE
BEGIN
    PRINT '✓ Tabela Usuarios já existe.';
    
    -- Adicionar colunas se não existirem
    IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID('dbo.Usuarios') AND name = 'Inclusao')
    BEGIN
        ALTER TABLE [dbo].[Usuarios] ADD [Inclusao] DATETIME2 NOT NULL DEFAULT GETDATE();
        PRINT '✓ Coluna Inclusao adicionada à tabela Usuarios!';
    END
    
    IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID('dbo.Usuarios') AND name = 'Atualizacao')
    BEGIN
        ALTER TABLE [dbo].[Usuarios] ADD [Atualizacao] DATETIME2 NOT NULL DEFAULT GETDATE();
        PRINT '✓ Coluna Atualizacao adicionada à tabela Usuarios!';
    END
END
GO

-- 4. Criar tabela Denuncias
IF OBJECT_ID('dbo.Denuncias', 'U') IS NULL
BEGIN
    CREATE TABLE [dbo].[Denuncias] (
        [IdDenuncia] INT NOT NULL IDENTITY(1,1),
        [IdUsuario] INT NOT NULL,
        [Nome] VARCHAR(255) NOT NULL,
        [Descricao] TEXT NOT NULL,
        [Ativa] BIT NOT NULL DEFAULT 1,
        [Inclusao] DATETIME2 NOT NULL DEFAULT GETDATE(),
        [Atualizacao] DATETIME2 NOT NULL DEFAULT GETDATE(),
        CONSTRAINT [Denuncias_pkey] PRIMARY KEY CLUSTERED ([IdDenuncia]),
        CONSTRAINT [Denuncias_IdUsuario_fkey] FOREIGN KEY ([IdUsuario]) 
            REFERENCES [dbo].[Usuarios]([IdUsuario]) 
            ON DELETE NO ACTION 
            ON UPDATE CASCADE
    );
    PRINT '✓ Tabela Denuncias criada!';
END
ELSE
BEGIN
    PRINT '✓ Tabela Denuncias já existe.';
END
GO

-- 5. Criar tabela Avisos
IF OBJECT_ID('dbo.Avisos', 'U') IS NULL
BEGIN
    CREATE TABLE [dbo].[Avisos] (
        [IdAviso] INT NOT NULL IDENTITY(1,1),
        [IdUsuario] INT NOT NULL,
        [Nome] VARCHAR(255) NOT NULL,
        [Descricao] TEXT NOT NULL,
        [Ativa] BIT NOT NULL DEFAULT 1,
        [Inclusao] DATETIME2 NOT NULL DEFAULT GETDATE(),
        [Atualizacao] DATETIME2 NOT NULL DEFAULT GETDATE(),
        CONSTRAINT [Avisos_pkey] PRIMARY KEY CLUSTERED ([IdAviso]),
        CONSTRAINT [Avisos_IdUsuario_fkey] FOREIGN KEY ([IdUsuario]) 
            REFERENCES [dbo].[Usuarios]([IdUsuario]) 
            ON DELETE NO ACTION 
            ON UPDATE CASCADE
    );
    PRINT '✓ Tabela Avisos criada!';
END
ELSE
BEGIN
    PRINT '✓ Tabela Avisos já existe.';
END
GO

-- 6. Criar índices para melhor performance
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'Denuncias_IdUsuario_idx' AND object_id = OBJECT_ID('dbo.Denuncias'))
BEGIN
    CREATE INDEX [Denuncias_IdUsuario_idx] ON [dbo].[Denuncias]([IdUsuario]);
    PRINT '✓ Índice em Denuncias.IdUsuario criado!';
END
GO

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'Avisos_IdUsuario_idx' AND object_id = OBJECT_ID('dbo.Avisos'))
BEGIN
    CREATE INDEX [Avisos_IdUsuario_idx] ON [dbo].[Avisos]([IdUsuario]);
    PRINT '✓ Índice em Avisos.IdUsuario criado!';
END
GO

-- 7. Inserir dados de teste (opcional)
-- ATENÇÃO: Descomente para inserir dados de exemplo

/*
-- Inserir usuários de teste
IF NOT EXISTS (SELECT * FROM [dbo].[Usuarios] WHERE [NomeUsuario] = 'admin')
BEGIN
    INSERT INTO [dbo].[Usuarios] ([NomeUsuario], [Senha], [Ativa])
    VALUES 
        ('admin', 'admin123', 1),
        ('joao.silva', 'senha123', 1),
        ('maria.santos', 'senha456', 1);
    PRINT '✓ Usuários de teste inseridos!';
END

-- Inserir denúncias de teste
IF NOT EXISTS (SELECT * FROM [dbo].[Denuncias])
BEGIN
    INSERT INTO [dbo].[Denuncias] ([IdUsuario], [Nome], [Descricao], [Ativa])
    VALUES 
        (1, 'Bug crítico no login', 'Sistema não está autenticando usuários corretamente após atualização.', 1),
        (2, 'Problema de performance', 'Listagem de dados muito lenta com mais de 1000 registros.', 1);
    PRINT '✓ Denúncias de teste inseridas!';
END

-- Inserir avisos de teste
IF NOT EXISTS (SELECT * FROM [dbo].[Avisos])
BEGIN
    INSERT INTO [dbo].[Avisos] ([IdUsuario], [Nome], [Descricao], [Ativa])
    VALUES 
        (1, 'Manutenção programada', 'Sistema ficará offline dia 15/11 das 22h às 02h.', 1),
        (1, 'Nova funcionalidade', 'Agora é possível exportar relatórios em PDF.', 1);
    PRINT '✓ Avisos de teste inseridos!';
END
*/

-- 8. Verificar estrutura criada
PRINT '';
PRINT '========================================';
PRINT 'Resumo da estrutura do banco de dados:';
PRINT '========================================';

SELECT 
    'Usuarios' as Tabela,
    COUNT(*) as TotalRegistros
FROM [dbo].[Usuarios]
UNION ALL
SELECT 
    'Denuncias',
    COUNT(*)
FROM [dbo].[Denuncias]
UNION ALL
SELECT 
    'Avisos',
    COUNT(*)
FROM [dbo].[Avisos];

PRINT '';
PRINT '✓✓✓ Banco de dados configurado com sucesso! ✓✓✓';
PRINT 'Agora você pode rodar: npx prisma db pull';
PRINT 'E depois: npx prisma generate';
GO
