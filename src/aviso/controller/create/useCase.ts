import type { IAvisoRepository } from "../../interfaces/IAvisoRepository";
import type { IUsuarioRepository } from "../../../usuario/interfaces/IUsuarioRepository";
import type { IRequest } from "./DTO/IRequest";
import type { IResponse } from "./DTO/IResponse";

export class CreateAvisoUseCase {
    
    constructor(
        private readonly repository: IAvisoRepository,
        private readonly usuarioRepository: IUsuarioRepository
    ) {}

    async execute(data: IRequest): Promise<IResponse> {
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
