import type { Request, Response } from "express";
import { GetByIdAvisoUseCase } from "./useCase";

export class GetByIdAvisoController {
    
    constructor(private readonly useCase: GetByIdAvisoUseCase) {}

    handle = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const aviso = await this.useCase.execute(Number(id));
            res.json(aviso);
        } catch (error) {
            console.error(error);
            const errorMessage = error instanceof Error ? error.message : "Erro ao buscar aviso";
            res.status(404).json({ erro: errorMessage });
        }
    };
}
