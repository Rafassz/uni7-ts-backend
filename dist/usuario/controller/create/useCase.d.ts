import type { IUsuarioRepository } from "../../interfaces/IUsuarioRepository";
import type { IRequest } from "./DTO/IRequest";
import type { IResponse } from "./DTO/IResponse";
export declare class CreateUsuarioUseCase {
    private readonly repository;
    constructor(repository: IUsuarioRepository);
    execute(data: IRequest): Promise<IResponse>;
}
//# sourceMappingURL=useCase.d.ts.map