import type { Request, Response } from "express";
import { CreateUsuarioUseCase } from "./useCase";
export declare class CreateUsuarioController {
    private readonly useCase;
    constructor(useCase: CreateUsuarioUseCase);
    handle: (req: Request, res: Response) => Promise<void>;
}
//# sourceMappingURL=create.d.ts.map