import type { Request, Response } from "express";
import prisma from "../database/prismaClient";

// Create - Criar novo aviso
export const criarAviso = async (req: Request, res: Response) => {
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

        const aviso = await prisma.aviso.create({
            data: {
                IdUsuario: Number(IdUsuario),
                Nome,
                Descricao
                // IdAviso, Ativa, Inclusao e Atualizacao são preenchidos automaticamente
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
            mensagem: "Aviso criado com sucesso",
            aviso
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: "Erro ao criar aviso" });
    }
};

// GetAll - Listar todos os avisos ativos
export const listarAvisos = async (req: Request, res: Response) => {
    try {
        const avisos = await prisma.aviso.findMany({
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

        res.json(avisos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: "Erro ao listar avisos" });
    }
};

// GetById - Buscar aviso específico por ID
export const buscarAviso = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const aviso = await prisma.aviso.findUnique({
            where: { IdAviso: Number(id) },
            include: {
                usuario: {
                    select: {
                        IdUsuario: true,
                        NomeUsuario: true
                    }
                }
            }
        });

        if (!aviso) {
            return res.status(404).json({ erro: "Aviso não encontrado" });
        }

        res.json(aviso);
    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: "Erro ao buscar aviso" });
    }
};

// Update - Atualizar dados do aviso
export const atualizarAviso = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { Nome, Descricao } = req.body;

        const dadosAtualizacao: any = {};
        if (Nome) dadosAtualizacao.Nome = Nome;
        if (Descricao) dadosAtualizacao.Descricao = Descricao;

        const aviso = await prisma.aviso.update({
            where: { IdAviso: Number(id) },
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
            mensagem: "Aviso atualizado com sucesso",
            aviso
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: "Erro ao atualizar aviso" });
    }
};

// UpdateAtiva - Desativar aviso (soft delete)
export const desativarAviso = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const aviso = await prisma.aviso.update({
            where: { IdAviso: Number(id) },
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
            mensagem: "Aviso desativado com sucesso",
            aviso
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: "Erro ao desativar aviso" });
    }
};
