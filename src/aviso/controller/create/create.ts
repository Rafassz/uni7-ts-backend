import type { Request, Response } from "express";
import { CreateAvisoUseCase } from "./useCase";

export class CreateAvisoController {
    
    constructor(private readonly useCase: CreateAvisoUseCase) {}

    handle = async (req: Request, res: Response) => {
        try {
            const { IdUsuario, Nome, Descricao } = req.body;
            const aviso = await this.useCase.execute({ IdUsuario, Nome, Descricao });
            res.status(201).json({
                mensagem: "Aviso criado com sucesso",
                aviso
            });
        } catch (error) {
            console.error(error);
            const errorMessage = error instanceof Error ? error.message : "Erro ao criar aviso";
            res.status(400).json({ erro: errorMessage });
        }
    };
}
