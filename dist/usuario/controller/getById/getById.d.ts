import type { Request, Response } from "express";
import { GetByIdUsuarioUseCase } from "./useCase";
export declare class GetByIdUsuarioController {
    private readonly useCase;
    constructor(useCase: GetByIdUsuarioUseCase);
    handle: (req: Request, res: Response) => Promise<void>;
}
//# sourceMappingURL=getById.d.ts.map