import type { Request, Response } from "express";
import { GetAllAvisoUseCase } from "./useCase";

export class GetAllAvisoController {
    
    constructor(private readonly useCase: GetAllAvisoUseCase) {}

    handle = async (req: Request, res: Response) => {
        try {
            const avisos = await this.useCase.execute();
            res.json(avisos);
        } catch (error) {
            console.error(error);
            res.status(500).json({ erro: "Erro ao listar avisos" });
        }
    };
}
