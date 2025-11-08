import type { Request, Response } from "express";
import { GetAllDenunciaUseCase } from "./useCase";
export declare class GetAllDenunciaController {
    private readonly useCase;
    constructor(useCase: GetAllDenunciaUseCase);
    handle: (req: Request, res: Response) => Promise<void>;
}
//# sourceMappingURL=getAll.d.ts.map