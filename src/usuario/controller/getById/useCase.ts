import type { IUsuarioRepository } from "../../interfaces/IUsuarioRepository";
import type { IResponse } from "./DTO/IResponse";

export class GetByIdUsuarioUseCase {
    
    constructor(private readonly repository: IUsuarioRepository) {}

    async execute(id: number): Promise<IResponse> {
        if (!id || id <= 0) {
            throw new Error('ID inválido');
        }
        
        const usuario = await this.repository.findById(id);
        if (!usuario) {
            throw new Error('Usuário não encontrado');
        }
        
        return usuario;
    }
}
