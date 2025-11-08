import type { IUsuarioRepository } from "../../interfaces/IUsuarioRepository";
import type { IResponse } from "./DTO/IResponse";
export declare class GetByIdUsuarioUseCase {
    private readonly repository;
    constructor(repository: IUsuarioRepository);
    execute(id: number): Promise<IResponse>;
}
//# sourceMappingURL=useCase.d.ts.map