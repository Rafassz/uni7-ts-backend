import type { IAvisoRepository } from "../../interfaces/IAvisoRepository";
import type { IRequest } from "./DTO/IRequest";
import type { IResponse } from "./DTO/IResponse";
export declare class UpdateAvisoUseCase {
    private readonly repository;
    constructor(repository: IAvisoRepository);
    execute(id: number, data: IRequest): Promise<IResponse>;
}
//# sourceMappingURL=useCase.d.ts.map