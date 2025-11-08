"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeactivateAvisoUseCase = void 0;
class DeactivateAvisoUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(id) {
        if (!id || id <= 0) {
            throw new Error('ID inválido');
        }
        const avisoExistente = await this.repository.findById(id);
        if (!avisoExistente) {
            throw new Error('Aviso não encontrado');
        }
        return await this.repository.deactivate(id);
    }
}
exports.DeactivateAvisoUseCase = DeactivateAvisoUseCase;
//# sourceMappingURL=useCase.js.map