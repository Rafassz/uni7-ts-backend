import type { IDenunciaRepository } from "../../interfaces/IDenunciaRepository";
import type { IResponse } from "./DTO/IResponse";

export class GetAllDenunciaUseCase {
    
    constructor(private readonly repository: IDenunciaRepository) {}

    async execute(): Promise<IResponse[]> {
        return await this.repository.findAll();
    }
}
