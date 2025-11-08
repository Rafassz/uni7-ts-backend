import type { Request, Response } from "express";
import { UpdateDenunciaUseCase } from "./useCase";

export class UpdateDenunciaController {
    
    constructor(private readonly useCase: UpdateDenunciaUseCase) {}

    handle = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const { Nome, Descricao } = req.body;
            const denuncia = await this.useCase.execute(Number(id), { Nome, Descricao });
            res.json({
                mensagem: "Denúncia atualizada com sucesso",
                denuncia
            });
        } catch (error) {
            console.error(error);
            const errorMessage = error instanceof Error ? error.message : "Erro ao atualizar denúncia";
            res.status(400).json({ erro: errorMessage });
        }
    };
}
