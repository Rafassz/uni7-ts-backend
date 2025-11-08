import type { Request, Response } from "express";
import { UpdateAvisoUseCase } from "./useCase";
export declare class UpdateAvisoController {
    private readonly useCase;
    constructor(useCase: UpdateAvisoUseCase);
    handle: (req: Request, res: Response) => Promise<void>;
}
//# sourceMappingURL=update.d.ts.map