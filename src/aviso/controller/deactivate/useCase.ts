import type { IAvisoRepository } from "../../interfaces/IAvisoRepository";
import type { IResponse } from "./DTO/IResponse";

export class DeactivateAvisoUseCase {
    
    constructor(private readonly repository: IAvisoRepository) {}

    async execute(id: number): Promise<IResponse> {
        if (!id || id <= 0) {
            throw new Error('ID inválido');
        }
        
        const avisoExistente = await this.repository.findById(id);
        if (!avisoExistente) {
            throw new Error('Aviso não encontrado');
        }
        
        return await this.repository.deactivate(id);
    }
}
