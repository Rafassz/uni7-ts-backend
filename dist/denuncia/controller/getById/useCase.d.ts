import type { IDenunciaRepository } from "../../interfaces/IDenunciaRepository";
import type { IResponse } from "./DTO/IResponse";
export declare class GetByIdDenunciaUseCase {
    private readonly repository;
    constructor(repository: IDenunciaRepository);
    execute(id: number): Promise<IResponse>;
}
//# sourceMappingURL=useCase.d.ts.map