import prisma from "../../database/prismaClient";
import type { IDenunciaRepository } from "../interfaces/IDenunciaRepository";
import type { IRequest as CreateDenunciaDTO } from "../controller/create/DTO/IRequest";
import type { IRequest as UpdateDenunciaDTO } from "../controller/update/DTO/IRequest";
import type { IResponse as DenunciaResponseDTO } from "../controller/create/DTO/IResponse";

export class DenunciaRepository implements IDenunciaRepository {
    
    async create(data: CreateDenunciaDTO): Promise<DenunciaResponseDTO> {
        const denuncia = await prisma.denuncia.create({
            data: {
                IdUsuario: data.IdUsuario,
                Nome: data.Nome,
                Descricao: data.Descricao
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
        return denuncia;
    }

    async findAll(): Promise<DenunciaResponseDTO[]> {
        const denuncias = await prisma.denuncia.findMany({
            where: { Ativa: true },
            include: {
                usuario: {
                    select: {
                        IdUsuario: true,
                        NomeUsuario: true
                    }
                }
            },
            orderBy: { Inclusao: 'desc' }
        });
        return denuncias;
    }

    async findById(id: number): Promise<DenunciaResponseDTO | null> {
        const denuncia = await prisma.denuncia.findUnique({
            where: { IdDenuncia: id },
            include: {
                usuario: {
                    select: {
                        IdUsuario: true,
                        NomeUsuario: true
                    }
                }
            }
        });
        return denuncia;
    }

    async update(id: number, data: UpdateDenunciaDTO): Promise<DenunciaResponseDTO> {
        const denuncia = await prisma.denuncia.update({
            where: { IdDenuncia: id },
            data: {
                ...(data.Nome && { Nome: data.Nome }),
                ...(data.Descricao && { Descricao: data.Descricao })
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
        return denuncia;
    }

    async deactivate(id: number): Promise<DenunciaResponseDTO> {
        const denuncia = await prisma.denuncia.update({
            where: { IdDenuncia: id },
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
        return denuncia;
    }
}
