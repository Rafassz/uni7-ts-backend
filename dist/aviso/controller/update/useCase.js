"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAvisoUseCase = void 0;
class UpdateAvisoUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(id, data) {
        if (!id || id <= 0) {
            throw new Error('ID inválido');
        }
        const avisoExistente = await this.repository.findById(id);
        if (!avisoExistente) {
            throw new Error('Aviso não encontrado');
        }
        if (data.Nome && data.Nome.trim() === '') {
            throw new Error('Nome não pode ser vazio');
        }
        if (data.Descricao && data.Descricao.trim() === '') {
            throw new Error('Descricao não pode ser vazia');
        }
        return await this.repository.update(id, data);
    }
}
exports.UpdateAvisoUseCase = UpdateAvisoUseCase;
//# sourceMappingURL=useCase.js.map