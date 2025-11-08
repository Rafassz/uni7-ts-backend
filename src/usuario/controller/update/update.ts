import type { Request, Response } from "express";
import { UpdateUsuarioUseCase } from "./useCase";

export class UpdateUsuarioController {
    
    constructor(private readonly useCase: UpdateUsuarioUseCase) {}

    handle = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const { NomeUsuario, Senha } = req.body;
            const usuario = await this.useCase.execute(Number(id), { NomeUsuario, Senha });
            res.json({
                mensagem: "Usuário atualizado com sucesso",
                usuario
            });
        } catch (error) {
            console.error(error);
            const errorMessage = error instanceof Error ? error.message : "Erro ao atualizar usuário";
            res.status(400).json({ erro: errorMessage });
        }
    };
}
