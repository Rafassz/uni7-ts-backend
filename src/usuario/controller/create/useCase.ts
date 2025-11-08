import type { IUsuarioRepository } from "../../interfaces/IUsuarioRepository";
import type { IRequest } from "./DTO/IRequest";
import type { IResponse } from "./DTO/IResponse";

export class CreateUsuarioUseCase {
    
    constructor(private readonly repository: IUsuarioRepository) {}

    async execute(data: IRequest): Promise<IResponse> {
        if (!data.NomeUsuario || data.NomeUsuario.trim() === '') {
            throw new Error('NomeUsuario é obrigatório');
        }
        if (!data.Senha || data.Senha.trim() === '') {
            throw new Error('Senha é obrigatória');
        }
        if (data.Senha.length < 6) {
            throw new Error('Senha deve ter no mínimo 6 caracteres');
        }
        
        return await this.repository.create(data);
    }
}
