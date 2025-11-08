import type { IAvisoRepository } from "../../interfaces/IAvisoRepository";
import type { IResponse } from "./DTO/IResponse";

export class GetByIdAvisoUseCase {
    
    constructor(private readonly repository: IAvisoRepository) {}

    async execute(id: number): Promise<IResponse> {
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
