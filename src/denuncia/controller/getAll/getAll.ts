import type { Request, Response } from "express";
import { GetAllDenunciaUseCase } from "./useCase";

export class GetAllDenunciaController {
    
    constructor(private readonly useCase: GetAllDenunciaUseCase) {}

    handle = async (req: Request, res: Response) => {
        try {
            const denuncias = await this.useCase.execute();
            res.json(denuncias);
        } catch (error) {
            console.error(error);
            res.status(500).json({ erro: "Erro ao listar denúncias" });
        }
    };
}
