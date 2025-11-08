import type { Request, Response } from "express";
import { GetByIdUsuarioUseCase } from "./useCase";

export class GetByIdUsuarioController {
    
    constructor(private readonly useCase: GetByIdUsuarioUseCase) {}

    handle = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const usuario = await this.useCase.execute(Number(id));
            res.json(usuario);
        } catch (error) {
            console.error(error);
            const errorMessage = error instanceof Error ? error.message : "Erro ao buscar usuário";
            res.status(404).json({ erro: errorMessage });
        }
    };
}
