import type { IAvisoRepository } from "../../interfaces/IAvisoRepository";
import type { IUsuarioRepository } from "../../../usuario/interfaces/IUsuarioRepository";
import type { IRequest } from "./DTO/IRequest";
import type { IResponse } from "./DTO/IResponse";
export declare class CreateAvisoUseCase {
    private readonly repository;
    private readonly usuarioRepository;
    constructor(repository: IAvisoRepository, usuarioRepository: IUsuarioRepository);
    execute(data: IRequest): Promise<IResponse>;
}
//# sourceMappingURL=useCase.d.ts.map