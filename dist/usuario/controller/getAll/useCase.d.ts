import type { IUsuarioRepository } from "../../interfaces/IUsuarioRepository";
import type { IResponse } from "./DTO/IResponse";
export declare class GetAllUsuarioUseCase {
    private readonly repository;
    constructor(repository: IUsuarioRepository);
    execute(): Promise<IResponse[]>;
}
//# sourceMappingURL=useCase.d.ts.map