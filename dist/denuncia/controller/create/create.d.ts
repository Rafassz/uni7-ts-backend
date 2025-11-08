import type { Request, Response } from "express";
import { CreateDenunciaUseCase } from "./useCase";
export declare class CreateDenunciaController {
    private readonly useCase;
    constructor(useCase: CreateDenunciaUseCase);
    handle: (req: Request, res: Response) => Promise<void>;
}
//# sourceMappingURL=create.d.ts.map