"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetByIdUsuarioUseCase = void 0;
class GetByIdUsuarioUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(id) {
        if (!id || id <= 0) {
            throw new Error('ID inválido');
        }
        const usuario = await this.repository.findById(id);
        if (!usuario) {
            throw new Error('Usuário não encontrado');
        }
        return usuario;
    }
}
exports.GetByIdUsuarioUseCase = GetByIdUsuarioUseCase;
//# sourceMappingURL=useCase.js.map