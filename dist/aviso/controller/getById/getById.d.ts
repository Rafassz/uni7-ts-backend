import type { Request, Response } from "express";
import { GetByIdAvisoUseCase } from "./useCase";
export declare class GetByIdAvisoController {
    private readonly useCase;
    constructor(useCase: GetByIdAvisoUseCase);
    handle: (req: Request, res: Response) => Promise<void>;
}
//# sourceMappingURL=getById.d.ts.map