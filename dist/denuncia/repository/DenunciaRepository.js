"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DenunciaRepository = void 0;
const prismaClient_1 = __importDefault(require("../../database/prismaClient"));
class DenunciaRepository {
    async create(data) {
        const denuncia = await prismaClient_1.default.denuncia.create({
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
    async findAll() {
        const denuncias = await prismaClient_1.default.denuncia.findMany({
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
    async findById(id) {
        const denuncia = await prismaClient_1.default.denuncia.findUnique({
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
    async update(id, data) {
        const denuncia = await prismaClient_1.default.denuncia.update({
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
    async deactivate(id) {
        const denuncia = await prismaClient_1.default.denuncia.update({
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
exports.DenunciaRepository = DenunciaRepository;
//# sourceMappingURL=DenunciaRepository.js.map