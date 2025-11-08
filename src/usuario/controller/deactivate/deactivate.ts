import type { Request, Response } from "express";
import { DeactivateUsuarioUseCase } from "./useCase";

export class DeactivateUsuarioController {
    
    constructor(private readonly useCase: DeactivateUsuarioUseCase) {}

    handle = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const usuario = await this.useCase.execute(Number(id));
            res.json({
                mensagem: "Usuário desativado com sucesso",
                usuario
            });
        } catch (error) {
            console.error(error);
            const errorMessage = error instanceof Error ? error.message : "Erro ao desativar usuário";
            res.status(400).json({ erro: errorMessage });
        }
    };
}
