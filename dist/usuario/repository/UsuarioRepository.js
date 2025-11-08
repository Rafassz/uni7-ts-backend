"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioRepository = void 0;
const prismaClient_1 = __importDefault(require("../../database/prismaClient"));
class UsuarioRepository {
    async create(data) {
        const usuario = await prismaClient_1.default.usuario.create({
            data: {
                NomeUsuario: data.NomeUsuario,
                Senha: data.Senha
            },
            select: {
                IdUsuario: true,
                NomeUsuario: true,
                Ativa: true
            }
        });
        return usuario;
    }
    async findAll() {
        const usuarios = await prismaClient_1.default.usuario.findMany({
            where: { Ativa: true },
            select: {
                IdUsuario: true,
                NomeUsuario: true,
                Ativa: true
            },
            orderBy: { IdUsuario: 'desc' }
        });
        return usuarios;
    }
    async findById(id) {
        const usuario = await prismaClient_1.default.usuario.findUnique({
            where: { IdUsuario: id },
            select: {
                IdUsuario: true,
                NomeUsuario: true,
                Ativa: true
            }
        });
        return usuario;
    }
    async update(id, data) {
        const usuario = await prismaClient_1.default.usuario.update({
            where: { IdUsuario: id },
            data: {
                ...(data.NomeUsuario && { NomeUsuario: data.NomeUsuario }),
                ...(data.Senha && { Senha: data.Senha })
            },
            select: {
                IdUsuario: true,
                NomeUsuario: true,
                Ativa: true
            }
        });
        return usuario;
    }
    async deactivate(id) {
        const usuario = await prismaClient_1.default.usuario.update({
            where: { IdUsuario: id },
            data: { Ativa: false },
            select: {
                IdUsuario: true,
                NomeUsuario: true,
                Ativa: true
            }
        });
        return usuario;
    }
}
exports.UsuarioRepository = UsuarioRepository;
//# sourceMappingURL=UsuarioRepository.js.map