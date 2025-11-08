import type { IDenunciaRepository } from "../../interfaces/IDenunciaRepository";
import type { IResponse } from "./DTO/IResponse";

export class DeactivateDenunciaUseCase {
    
    constructor(private readonly repository: IDenunciaRepository) {}

    async execute(id: number): Promise<IResponse> {
        if (!id || id <= 0) {
            throw new Error('ID inválido');
        }
        
        const denunciaExistente = await this.repository.findById(id);
        if (!denunciaExistente) {
            throw new Error('Denúncia não encontrada');
        }
        
        return await this.repository.deactivate(id);
    }
}
