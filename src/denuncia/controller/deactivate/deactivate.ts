import type { Request, Response } from "express";
import { DeactivateDenunciaUseCase } from "./useCase";

export class DeactivateDenunciaController {
    
    constructor(private readonly useCase: DeactivateDenunciaUseCase) {}

    handle = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const denuncia = await this.useCase.execute(Number(id));
            res.json({
                mensagem: "Denúncia desativada com sucesso",
                denuncia
            });
        } catch (error) {
            console.error(error);
            const errorMessage = error instanceof Error ? error.message : "Erro ao desativar denúncia";
            res.status(400).json({ erro: errorMessage });
        }
    };
}
