import type { Request, Response } from "express";
import { DeactivateAvisoUseCase } from "./useCase";

export class DeactivateAvisoController {
    
    constructor(private readonly useCase: DeactivateAvisoUseCase) {}

    handle = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const aviso = await this.useCase.execute(Number(id));
            res.json({
                mensagem: "Aviso desativado com sucesso",
                aviso
            });
        } catch (error) {
            console.error(error);
            const errorMessage = error instanceof Error ? error.message : "Erro ao desativar aviso";
            res.status(400).json({ erro: errorMessage });
        }
    };
}
