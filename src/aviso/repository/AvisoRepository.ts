import prisma from "../../database/prismaClient";
import type { IAvisoRepository } from "../interfaces/IAvisoRepository";
import type { IRequest as CreateAvisoDTO } from "../controller/create/DTO/IRequest";
import type { IRequest as UpdateAvisoDTO } from "../controller/update/DTO/IRequest";
import type { IResponse as AvisoResponseDTO } from "../controller/create/DTO/IResponse";

export class AvisoRepository implements IAvisoRepository {
    
    async create(data: CreateAvisoDTO): Promise<AvisoResponseDTO> {
        const aviso = await prisma.aviso.create({
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
        return aviso;
    }

    async findAll(): Promise<AvisoResponseDTO[]> {
        const avisos = await prisma.aviso.findMany({
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
        return avisos;
    }

    async findById(id: number): Promise<AvisoResponseDTO | null> {
        const aviso = await prisma.aviso.findUnique({
            where: { IdAviso: id },
            include: {
                usuario: {
                    select: {
                        IdUsuario: true,
                        NomeUsuario: true
                    }
                }
            }
        });
        return aviso;
    }

    async update(id: number, data: UpdateAvisoDTO): Promise<AvisoResponseDTO> {
        const aviso = await prisma.aviso.update({
            where: { IdAviso: id },
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
        return aviso;
    }

    async deactivate(id: number): Promise<AvisoResponseDTO> {
        const aviso = await prisma.aviso.update({
            where: { IdAviso: id },
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
        return aviso;
    }
}
