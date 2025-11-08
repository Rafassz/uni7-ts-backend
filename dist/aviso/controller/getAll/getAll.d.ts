import type { Request, Response } from "express";
import { GetAllAvisoUseCase } from "./useCase";
export declare class GetAllAvisoController {
    private readonly useCase;
    constructor(useCase: GetAllAvisoUseCase);
    handle: (req: Request, res: Response) => Promise<void>;
}
//# sourceMappingURL=getAll.d.ts.map