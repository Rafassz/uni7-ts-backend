import type { IUsuarioRepository } from "../../interfaces/IUsuarioRepository";
import type { IResponse } from "./DTO/IResponse";

export class GetAllUsuarioUseCase {
    
    constructor(private readonly repository: IUsuarioRepository) {}

    async execute(): Promise<IResponse[]> {
        return await this.repository.findAll();
    }
}
