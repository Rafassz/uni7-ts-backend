"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUsuarioUseCase = void 0;
class UpdateUsuarioUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(id, data) {
        if (!id || id <= 0) {
            throw new Error('ID inválido');
        }
        const usuarioExistente = await this.repository.findById(id);
        if (!usuarioExistente) {
            throw new Error('Usuário não encontrado');
        }
        if (data.NomeUsuario && data.NomeUsuario.trim() === '') {
            throw new Error('NomeUsuario não pode ser vazio');
        }
        if (data.Senha && data.Senha.length < 6) {
            throw new Error('Senha deve ter no mínimo 6 caracteres');
        }
        return await this.repository.update(id, data);
    }
}
exports.UpdateUsuarioUseCase = UpdateUsuarioUseCase;
//# sourceMappingURL=useCase.js.map