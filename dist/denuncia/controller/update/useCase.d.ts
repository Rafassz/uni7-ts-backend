import type { IDenunciaRepository } from "../../interfaces/IDenunciaRepository";
import type { IRequest } from "./DTO/IRequest";
import type { IResponse } from "./DTO/IResponse";
export declare class UpdateDenunciaUseCase {
    private readonly repository;
    constructor(repository: IDenunciaRepository);
    execute(id: number, data: IRequest): Promise<IResponse>;
}
//# sourceMappingURL=useCase.d.ts.map