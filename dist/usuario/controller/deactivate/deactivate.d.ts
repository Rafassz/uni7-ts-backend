import type { Request, Response } from "express";
import { DeactivateUsuarioUseCase } from "./useCase";
export declare class DeactivateUsuarioController {
    private readonly useCase;
    constructor(useCase: DeactivateUsuarioUseCase);
    handle: (req: Request, res: Response) => Promise<void>;
}
//# sourceMappingURL=deactivate.d.ts.map