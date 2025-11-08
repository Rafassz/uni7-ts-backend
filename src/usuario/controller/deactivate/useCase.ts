import type { IUsuarioRepository } from "../../interfaces/IUsuarioRepository";
import type { IResponse } from "./DTO/IResponse";

export class DeactivateUsuarioUseCase {
    
    constructor(private readonly repository: IUsuarioRepository) {}

    async execute(id: number): Promise<IResponse> {
        if (!id || id <= 0) {
            throw new Error('ID inválido');
        }
        
        const usuarioExistente = await this.repository.findById(id);
        if (!usuarioExistente) {
            throw new Error('Usuário não encontrado');
        }
        
        return await this.repository.deactivate(id);
    }
}
