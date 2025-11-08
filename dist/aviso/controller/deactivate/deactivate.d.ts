import type { Request, Response } from "express";
import { DeactivateAvisoUseCase } from "./useCase";
export declare class DeactivateAvisoController {
    private readonly useCase;
    constructor(useCase: DeactivateAvisoUseCase);
    handle: (req: Request, res: Response) => Promise<void>;
}
//# sourceMappingURL=deactivate.d.ts.map