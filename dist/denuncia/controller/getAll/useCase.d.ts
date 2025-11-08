import type { IDenunciaRepository } from "../../interfaces/IDenunciaRepository";
import type { IResponse } from "./DTO/IResponse";
export declare class GetAllDenunciaUseCase {
    private readonly repository;
    constructor(repository: IDenunciaRepository);
    execute(): Promise<IResponse[]>;
}
//# sourceMappingURL=useCase.d.ts.map