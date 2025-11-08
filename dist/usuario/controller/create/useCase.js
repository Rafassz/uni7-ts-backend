"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUsuarioUseCase = void 0;
class CreateUsuarioUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(data) {
        if (!data.NomeUsuario || data.NomeUsuario.trim() === '') {
            throw new Error('NomeUsuario é obrigatório');
        }
        if (!data.Senha || data.Senha.trim() === '') {
            throw new Error('Senha é obrigatória');
        }
        if (data.Senha.length < 6) {
            throw new Error('Senha deve ter no mínimo 6 caracteres');
        }
        return await this.repository.create(data);
    }
}
exports.CreateUsuarioUseCase = CreateUsuarioUseCase;
//# sourceMappingURL=useCase.js.map