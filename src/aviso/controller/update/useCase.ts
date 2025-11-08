import type { IAvisoRepository } from "../../interfaces/IAvisoRepository";
import type { IRequest } from "./DTO/IRequest";
import type { IResponse } from "./DTO/IResponse";

export class UpdateAvisoUseCase {
    
    constructor(private readonly repository: IAvisoRepository) {}

    async execute(id: number, data: IRequest): Promise<IResponse> {
        if (!id || id <= 0) {
            throw new Error('ID inválido');
        }

        const avisoExistente = await this.repository.findById(id);
        if (!avisoExistente) {
            throw new Error('Aviso não encontrado');
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
