import type { IAvisoRepository } from "../../interfaces/IAvisoRepository";
import type { IResponse } from "./DTO/IResponse";
export declare class GetAllAvisoUseCase {
    private readonly repository;
    constructor(repository: IAvisoRepository);
    execute(): Promise<IResponse[]>;
}
//# sourceMappingURL=useCase.d.ts.map