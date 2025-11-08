"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetByIdDenunciaUseCase = void 0;
class GetByIdDenunciaUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(id) {
        if (!id || id <= 0) {
            throw new Error('ID inválido');
        }
        const denuncia = await this.repository.findById(id);
        if (!denuncia) {
            throw new Error('Denúncia não encontrada');
        }
        return denuncia;
    }
}
exports.GetByIdDenunciaUseCase = GetByIdDenunciaUseCase;
//# sourceMappingURL=useCase.js.map