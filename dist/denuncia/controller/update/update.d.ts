import type { Request, Response } from "express";
import { UpdateDenunciaUseCase } from "./useCase";
export declare class UpdateDenunciaController {
    private readonly useCase;
    constructor(useCase: UpdateDenunciaUseCase);
    handle: (req: Request, res: Response) => Promise<void>;
}
//# sourceMappingURL=update.d.ts.map