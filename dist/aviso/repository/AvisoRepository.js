"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvisoRepository = void 0;
const prismaClient_1 = __importDefault(require("../../database/prismaClient"));
class AvisoRepository {
    async create(data) {
        const aviso = await prismaClient_1.default.aviso.create({
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
    async findAll() {
        const avisos = await prismaClient_1.default.aviso.findMany({
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
    async findById(id) {
        const aviso = await prismaClient_1.default.aviso.findUnique({
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
    async update(id, data) {
        const aviso = await prismaClient_1.default.aviso.update({
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
    async deactivate(id) {
        const aviso = await prismaClient_1.default.aviso.update({
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
exports.AvisoRepository = AvisoRepository;
//# sourceMappingURL=AvisoRepository.js.map