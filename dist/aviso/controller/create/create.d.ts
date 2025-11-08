import type { Request, Response } from "express";
import { CreateAvisoUseCase } from "./useCase";
export declare class CreateAvisoController {
    private readonly useCase;
    constructor(useCase: CreateAvisoUseCase);
    handle: (req: Request, res: Response) => Promise<void>;
}
//# sourceMappingURL=create.d.ts.map