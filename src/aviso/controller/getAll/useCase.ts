import type { IAvisoRepository } from "../../interfaces/IAvisoRepository";
import type { IResponse } from "./DTO/IResponse";

export class GetAllAvisoUseCase {
    
    constructor(private readonly repository: IAvisoRepository) {}

    async execute(): Promise<IResponse[]> {
        return await this.repository.findAll();
    }
}
