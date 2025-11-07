import type { Request, Response } from "express";
import prisma from "../database/prismaClient";

// Create - Criar nova denúncia
export const criarDenuncia = async (req: Request, res: Response) => {
    try {
        const { IdUsuario, Nome, Descricao } = req.body;

        if (!Nome || !Descricao) {
            return res.status(400).json({ erro: "Nome e Descricao são obrigatórios" });
        }

        if (!IdUsuario) {
            return res.status(400).json({ erro: "IdUsuario é obrigatório" });
        }

        // Verificar se o usuário existe e está ativo
        const usuario = await prisma.usuario.findFirst({
            where: {
                IdUsuario: Number(IdUsuario),
                Ativa: true
            }
        });

        if (!usuario) {
            return res.status(404).json({ erro: "Usuário não encontrado ou inativo" });
        }

        const denuncia = await prisma.denuncia.create({
            data: {
                IdUsuario: Number(IdUsuario),
                Nome,
                Descricao
                // IdDenuncia, Ativa, Inclusao e Atualizacao são preenchidos automaticamente
            },
            include: {
                usuario: {
                    select: {
                        IdUsuario: true,
                        NomeUsuario: true
                    }
                }
            }
        });

        res.status(201).json({
            mensagem: "Denúncia criada com sucesso",
            denuncia
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: "Erro ao criar denúncia" });
    }
};

// GetAll - Listar todas as denúncias ativas
export const listarDenuncias = async (req: Request, res: Response) => {
    try {
        const denuncias = await prisma.denuncia.findMany({
            where: {
                Ativa: true
            },
            include: {
                usuario: {
                    select: {
                        IdUsuario: true,
                        NomeUsuario: true
                    }
                }
            },
            orderBy: {
                Inclusao: 'desc'
            }
        });

        res.json(denuncias);
    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: "Erro ao listar denúncias" });
    }
};

// GetById - Buscar denúncia específica por ID
export const buscarDenuncia = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const denuncia = await prisma.denuncia.findUnique({
            where: { IdDenuncia: Number(id) },
            include: {
                usuario: {
                    select: {
                        IdUsuario: true,
                        NomeUsuario: true
                    }
                }
            }
        });

        if (!denuncia) {
            return res.status(404).json({ erro: "Denúncia não encontrada" });
        }

        res.json(denuncia);
    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: "Erro ao buscar denúncia" });
    }
};

// Update - Atualizar dados da denúncia
export const atualizarDenuncia = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { Nome, Descricao } = req.body;

        const dadosAtualizacao: any = {};
        if (Nome) dadosAtualizacao.Nome = Nome;
        if (Descricao) dadosAtualizacao.Descricao = Descricao;

        const denuncia = await prisma.denuncia.update({
            where: { IdDenuncia: Number(id) },
            data: dadosAtualizacao,
            include: {
                usuario: {
                    select: {
                        IdUsuario: true,
                        NomeUsuario: true
                    }
                }
            }
        });

        res.json({
            mensagem: "Denúncia atualizada com sucesso",
            denuncia
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: "Erro ao atualizar denúncia" });
    }
};

// UpdateAtiva - Desativar denúncia (soft delete)
export const desativarDenuncia = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const denuncia = await prisma.denuncia.update({
            where: { IdDenuncia: Number(id) },
            data: { Ativa: false },
            include: {
                usuario: {
                    select: {
                        IdUsuario: true,
                        NomeUsuario: true
                    }
                }
            }
        });

        res.json({
            mensagem: "Denúncia desativada com sucesso",
            denuncia
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: "Erro ao desativar denúncia" });
    }
};
