import type { Request, Response } from "express";
import prisma from "../database/prismaClient";

// Create - Criar novo usuário
export const criarUser = async (req: Request, res: Response) => {
    try {
        const { NomeUsuario, Senha } = req.body;
        
        if (!NomeUsuario || !Senha) {
            return res.status(400).json({ erro: "NomeUsuario e Senha são obrigatórios" });
        }

        const usuario = await prisma.usuario.create({
            data: {
                NomeUsuario,
                Senha
            }
        });

        res.status(201).json({
            mensagem: "Usuário criado com sucesso",
            usuario: {
                IdUsuario: usuario.IdUsuario,
                NomeUsuario: usuario.NomeUsuario,
                Ativa: usuario.Ativa
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: "Erro ao criar usuário" });
    }
};

// GetAll - Listar todos os usuários ativos
export const listarUsers = async (req: Request, res: Response) => {
    try {
        const usuarios = await prisma.usuario.findMany({
            where: {
                Ativa: true
            },
            select: {
                IdUsuario: true,
                NomeUsuario: true,
                Ativa: true
            }
        });

        res.json(usuarios);
    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: "Erro ao listar usuários" });
    }
};

// GetById - Buscar usuário específico por ID
export const buscarUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const usuario = await prisma.usuario.findUnique({
            where: { IdUsuario: Number(id) },
            select: {
                IdUsuario: true,
                NomeUsuario: true,
                Ativa: true
            }
        });

        if (!usuario) {
            return res.status(404).json({ erro: "Usuário não encontrado" });
        }

        res.json(usuario);
    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: "Erro ao buscar usuário" });
    }
};

// Update - Atualizar dados do usuário
export const atualizarUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { NomeUsuario, Senha } = req.body;

        const dadosAtualizacao: any = {};
        if (NomeUsuario) dadosAtualizacao.NomeUsuario = NomeUsuario;
        if (Senha) dadosAtualizacao.Senha = Senha;

        const usuario = await prisma.usuario.update({
            where: { IdUsuario: Number(id) },
            data: dadosAtualizacao,
            select: {
                IdUsuario: true,
                NomeUsuario: true,
                Ativa: true
            }
        });

        res.json({
            mensagem: "Usuário atualizado com sucesso",
            usuario
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: "Erro ao atualizar usuário" });
    }
};

// UpdateAtiva - Desativar usuário
export const desativarUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const usuario = await prisma.usuario.update({
            where: { IdUsuario: Number(id) },
            data: { Ativa: false },
            select: {
                IdUsuario: true,
                NomeUsuario: true,
                Ativa: true
            }
        });

        res.json({
            mensagem: "Usuário desativado com sucesso",
            usuario
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: "Erro ao desativar usuário" });
    }
};