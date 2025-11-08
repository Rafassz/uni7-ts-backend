import type { IDenunciaRepository } from "../../interfaces/IDenunciaRepository";
import type { IUsuarioRepository } from "../../../usuario/interfaces/IUsuarioRepository";
import type { IRequest } from "./DTO/IRequest";
import type { IResponse } from "./DTO/IResponse";
export declare class CreateDenunciaUseCase {
    private readonly repository;
    private readonly usuarioRepository;
    constructor(repository: IDenunciaRepository, usuarioRepository: IUsuarioRepository);
    execute(data: IRequest): Promise<IResponse>;
}
//# sourceMappingURL=useCase.d.ts.map