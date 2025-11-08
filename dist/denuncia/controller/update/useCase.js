"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateDenunciaUseCase = void 0;
class UpdateDenunciaUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(id, data) {
        if (!id || id <= 0) {
            throw new Error('ID inválido');
        }
        const denunciaExistente = await this.repository.findById(id);
        if (!denunciaExistente) {
            throw new Error('Denúncia não encontrada');
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
exports.UpdateDenunciaUseCase = UpdateDenunciaUseCase;
//# sourceMappingURL=useCase.js.map