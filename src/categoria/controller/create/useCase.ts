import type { IRequest } from "./DTO/IRequest";
import type { IResponse } from "./DTO/IResponse";
import { CategoriaRepository } from "../../repository/CategoriaRepository";

export class CreateCategoriaUseCase {
    private categoriaRepository: CategoriaRepository;

    constructor() {
        this.categoriaRepository = new CategoriaRepository();
    }

    async execute(data: IRequest): Promise<IResponse> {
        const categoria = await this.categoriaRepository.create({
            Nome: data.Nome,
            Descricao: data.Descricao || null,
            Cor: data.Cor || null,
            Icone: data.Icone || null
        });

        return categoria;
    }
}
