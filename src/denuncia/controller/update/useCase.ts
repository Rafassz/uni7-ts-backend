import type { IDenunciaRepository } from "../../interfaces/IDenunciaRepository";
import type { IRequest } from "./DTO/IRequest";
import type { IResponse } from "./DTO/IResponse";

export class UpdateDenunciaUseCase {
    
    constructor(private readonly repository: IDenunciaRepository) {}

    async execute(id: number, data: IRequest): Promise<IResponse> {
        if (!id || id <= 0) {
            throw new Error('ID inválido');
        }

        const denunciaExistente = await this.repository.findById(id);
        if (!denunciaExistente) {
            throw new Error('Denúncia não encontrada');
        }

        if (data.Nome && data.Nome.trim() === '') {
            throw new Error('Nome não pode ser vazio');
        }
        if (data.Descricao && data.Descricao.trim() === '') {
            throw new Error('Descricao não pode ser vazia');
        }

        return await this.repository.update(id, data);
    }
}
