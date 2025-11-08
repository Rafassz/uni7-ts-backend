"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeactivateUsuarioUseCase = void 0;
class DeactivateUsuarioUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(id) {
        if (!id || id <= 0) {
            throw new Error('ID inválido');
        }
        const usuarioExistente = await this.repository.findById(id);
        if (!usuarioExistente) {
            throw new Error('Usuário não encontrado');
        }
        return await this.repository.deactivate(id);
    }
}
exports.DeactivateUsuarioUseCase = DeactivateUsuarioUseCase;
//# sourceMappingURL=useCase.js.map