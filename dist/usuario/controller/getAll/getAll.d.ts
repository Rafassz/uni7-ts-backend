import type { Request, Response } from "express";
import { GetAllUsuarioUseCase } from "./useCase";
export declare class GetAllUsuarioController {
    private readonly useCase;
    constructor(useCase: GetAllUsuarioUseCase);
    handle: (req: Request, res: Response) => Promise<void>;
}
//# sourceMappingURL=getAll.d.ts.map