"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAvisoUseCase = void 0;
class CreateAvisoUseCase {
    constructor(repository, usuarioRepository) {
        this.repository = repository;
        this.usuarioRepository = usuarioRepository;
    }
    async execute(data) {
        if (!data.Nome || data.Nome.trim() === '') {
            throw new Error('Nome é obrigatório');
        }
        if (!data.Descricao || data.Descricao.trim() === '') {
            throw new Error('Descricao é obrigatória');
        }
        if (!data.IdUsuario || data.IdUsuario <= 0) {
            throw new Error('IdUsuario é obrigatório');
        }
        const usuario = await this.usuarioRepository.findById(data.IdUsuario);
        if (!usuario) {
            throw new Error('Usuário não encontrado');
        }
        if (!usuario.Ativa) {
            throw new Error('Usuário está inativo');
        }
        return await this.repository.create(data);
    }
}
exports.CreateAvisoUseCase = CreateAvisoUseCase;
//# sourceMappingURL=useCase.js.map