import type { Request, Response } from "express";
import { GetByIdDenunciaUseCase } from "./useCase";

export class GetByIdDenunciaController {
    
    constructor(private readonly useCase: GetByIdDenunciaUseCase) {}

    handle = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const denuncia = await this.useCase.execute(Number(id));
            res.json(denuncia);
        } catch (error) {
            console.error(error);
            const errorMessage = error instanceof Error ? error.message : "Erro ao buscar denúncia";
            res.status(404).json({ erro: errorMessage });
        }
    };
}
