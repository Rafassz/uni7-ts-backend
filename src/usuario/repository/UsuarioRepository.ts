import prisma from "../../database/prismaClient";
import type { IUsuarioRepository } from "../interfaces/IUsuarioRepository";
import type { IRequest as CreateUsuarioDTO } from "../controller/create/DTO/IRequest";
import type { IRequest as UpdateUsuarioDTO } from "../controller/update/DTO/IRequest";
import type { IResponse as UsuarioResponseDTO } from "../controller/create/DTO/IResponse";
import type { Usuario } from "../model/usuario";

export class UsuarioRepository implements IUsuarioRepository {
    
    async create(data: CreateUsuarioDTO): Promise<UsuarioResponseDTO> {
        console.log('🔵 Repository.create - Dados recebidos:', data);
        try {
            const usuario = await prisma.usuario.create({
                data: {
                    NomeUsuario: data.NomeUsuario,
                    Senha: data.Senha
                },
                select: {
                    IdUsuario: true,
                    NomeUsuario: true,
                    Role: true,
                    Email: true,
                    Apartamento: true,
                    Bloco: true,
                    Ativa: true,
                    Inclusao: true,
                    Atualizacao: true
                }
            });
            console.log('✅ Repository.create - Usuário criado:', usuario);
            return usuario;
        } catch (error) {
            console.error('❌ Repository.create - Erro Prisma:', error);
            throw error;
        }
    }

    async findAll(): Promise<UsuarioResponseDTO[]> {
        const usuarios = await prisma.usuario.findMany({
            where: { Ativa: true },
            select: {
                IdUsuario: true,
                NomeUsuario: true,
                Role: true,
                Email: true,
                Apartamento: true,
                Bloco: true,
                Ativa: true,
                Inclusao: true,
                Atualizacao: true
            },
            orderBy: { IdUsuario: 'desc' }
        });
        return usuarios;
    }

    async findById(id: number): Promise<UsuarioResponseDTO | null> {
        const usuario = await prisma.usuario.findUnique({
            where: { IdUsuario: id },
            select: {
                IdUsuario: true,
                NomeUsuario: true,
                Role: true,
                Email: true,
                Apartamento: true,
                Bloco: true,
                Ativa: true,
                Inclusao: true,
                Atualizacao: true
            }
        });
        return usuario;
    }

    async findByUsername(nomeUsuario: string): Promise<Usuario | null> {
        const usuario = await prisma.usuario.findFirst({
            where: { 
                NomeUsuario: nomeUsuario,
                Ativa: true 
            }
        });
        return usuario;
    }

    async update(id: number, data: UpdateUsuarioDTO): Promise<UsuarioResponseDTO> {
        const usuario = await prisma.usuario.update({
            where: { IdUsuario: id },
            data: {
                ...(data.NomeUsuario && { NomeUsuario: data.NomeUsuario }),
                ...(data.Senha && { Senha: data.Senha })
            },
            select: {
                IdUsuario: true,
                NomeUsuario: true,
                Role: true,
                Email: true,
                Apartamento: true,
                Bloco: true,
                Ativa: true,
                Inclusao: true,
                Atualizacao: true
            }
        });
        return usuario;
    }

    async deactivate(id: number): Promise<UsuarioResponseDTO> {
        const usuario = await prisma.usuario.update({
            where: { IdUsuario: id },
            data: { Ativa: false },
            select: {
                IdUsuario: true,
                NomeUsuario: true,
                Role: true,
                Email: true,
                Apartamento: true,
                Bloco: true,
                Ativa: true,
                Inclusao: true,
                Atualizacao: true
            }
        });
        return usuario;
    }
}
