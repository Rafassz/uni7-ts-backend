"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetByIdAvisoUseCase = void 0;
class GetByIdAvisoUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(id) {
        if (!id || id <= 0) {
            throw new Error('ID inválido');
        }
        const aviso = await this.repository.findById(id);
        if (!aviso) {
            throw new Error('Aviso não encontrado');
        }
        return aviso;
    }
}
exports.GetByIdAvisoUseCase = GetByIdAvisoUseCase;
//# sourceMappingURL=useCase.js.map