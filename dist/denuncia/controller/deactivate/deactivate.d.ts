import type { Request, Response } from "express";
import { DeactivateDenunciaUseCase } from "./useCase";
export declare class DeactivateDenunciaController {
    private readonly useCase;
    constructor(useCase: DeactivateDenunciaUseCase);
    handle: (req: Request, res: Response) => Promise<void>;
}
//# sourceMappingURL=deactivate.d.ts.map