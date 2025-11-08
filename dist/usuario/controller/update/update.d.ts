import type { Request, Response } from "express";
import { UpdateUsuarioUseCase } from "./useCase";
export declare class UpdateUsuarioController {
    private readonly useCase;
    constructor(useCase: UpdateUsuarioUseCase);
    handle: (req: Request, res: Response) => Promise<void>;
}
//# sourceMappingURL=update.d.ts.map