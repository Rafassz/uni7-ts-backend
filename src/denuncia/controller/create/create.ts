import type { Request, Response } from "express";
import { CreateDenunciaUseCase } from "./useCase";

export class CreateDenunciaController {
    
    constructor(private readonly useCase: CreateDenunciaUseCase) {}

    handle = async (req: Request, res: Response) => {
        try {
            const { IdUsuario, Nome, Descricao } = req.body;
            const denuncia = await this.useCase.execute({ IdUsuario, Nome, Descricao });
            res.status(201).json({
                mensagem: "Denúncia criada com sucesso",
                denuncia
            });
        } catch (error) {
            console.error(error);
            const errorMessage = error instanceof Error ? error.message : "Erro ao criar denúncia";
            res.status(400).json({ erro: errorMessage });
        }
    };
}
