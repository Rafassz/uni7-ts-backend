import type { Request, Response } from "express";
import { GetByIdDenunciaUseCase } from "./useCase";
export declare class GetByIdDenunciaController {
    private readonly useCase;
    constructor(useCase: GetByIdDenunciaUseCase);
    handle: (req: Request, res: Response) => Promise<void>;
}
//# sourceMappingURL=getById.d.ts.map