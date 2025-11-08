import type { IDenunciaRepository } from "../../interfaces/IDenunciaRepository";
import type { IResponse } from "./DTO/IResponse";

export class GetByIdDenunciaUseCase {
    
    constructor(private readonly repository: IDenunciaRepository) {}

    async execute(id: number): Promise<IResponse> {
        if (!id || id <= 0) {
            throw new Error('ID inválido');
        }
        
        const denuncia = await this.repository.findById(id);
        if (!denuncia) {
            throw new Error('Denúncia não encontrada');
        }
        
        return denuncia;
    }
}
