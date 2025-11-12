import type { IResponse } from "./DTO/IResponse";
import { CategoriaRepository } from "../../repository/CategoriaRepository";

export class GetAllCategoriasUseCase {
    private categoriaRepository: CategoriaRepository;

    constructor() {
        this.categoriaRepository = new CategoriaRepository();
    }

    async execute(): Promise<IResponse> {
        const categorias = await this.categoriaRepository.findAll();
        return categorias;
    }
}
