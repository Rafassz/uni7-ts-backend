import type { IAvisoRepository } from "../../interfaces/IAvisoRepository";
import type { IResponse } from "./DTO/IResponse";
export declare class DeactivateAvisoUseCase {
    private readonly repository;
    constructor(repository: IAvisoRepository);
    execute(id: number): Promise<IResponse>;
}
//# sourceMappingURL=useCase.d.ts.map