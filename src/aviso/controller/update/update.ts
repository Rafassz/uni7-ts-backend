import type { Request, Response } from "express";
import { UpdateAvisoUseCase } from "./useCase";

export class UpdateAvisoController {
    
    constructor(private readonly useCase: UpdateAvisoUseCase) {}

    handle = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const { Nome, Descricao } = req.body;
            const aviso = await this.useCase.execute(Number(id), { Nome, Descricao });
            res.json({
                mensagem: "Aviso atualizado com sucesso",
                aviso
            });
        } catch (error) {
            console.error(error);
            const errorMessage = error instanceof Error ? error.message : "Erro ao atualizar aviso";
            res.status(400).json({ erro: errorMessage });
        }
    };
}
