import type { IUsuarioRepository } from "../../interfaces/IUsuarioRepository";
import type { IRequest } from "./DTO/IRequest";
import type { IResponse } from "./DTO/IResponse";

export class UpdateUsuarioUseCase {
    
    constructor(private readonly repository: IUsuarioRepository) {}

    async execute(id: number, data: IRequest): Promise<IResponse> {
        if (!id || id <= 0) {
            throw new Error('ID inválido');
        }

        const usuarioExistente = await this.repository.findById(id);
        if (!usuarioExistente) {
            throw new Error('Usuário não encontrado');
        }

        if (data.NomeUsuario && data.NomeUsuario.trim() === '') {
            throw new Error('NomeUsuario não pode ser vazio');
        }
        if (data.Senha && data.Senha.length < 6) {
            throw new Error('Senha deve ter no mínimo 6 caracteres');
        }

        return await this.repository.update(id, data);
    }
}
