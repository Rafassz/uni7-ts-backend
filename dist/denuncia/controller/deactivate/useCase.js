"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeactivateDenunciaUseCase = void 0;
class DeactivateDenunciaUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(id) {
        if (!id || id <= 0) {
            throw new Error('ID inválido');
        }
        const denunciaExistente = await this.repository.findById(id);
        if (!denunciaExistente) {
            throw new Error('Denúncia não encontrada');
        }
        return await this.repository.deactivate(id);
    }
}
exports.DeactivateDenunciaUseCase = DeactivateDenunciaUseCase;
//# sourceMappingURL=useCase.js.map