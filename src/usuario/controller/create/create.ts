import type { Request, Response } from "express";
import { CreateUsuarioUseCase } from "./useCase";

export class CreateUsuarioController {
    
    constructor(private readonly useCase: CreateUsuarioUseCase) {}

    handle = async (req: Request, res: Response) => {
        try {
            const { NomeUsuario, Senha } = req.body;
            const usuario = await this.useCase.execute({ NomeUsuario, Senha });
            res.status(201).json({
                mensagem: "Usuário criado com sucesso",
                usuario
            });
        } catch (error) {
            console.error(error);
            const errorMessage = error instanceof Error ? error.message : "Erro ao criar usuário";
            res.status(400).json({ erro: errorMessage });
        }
    };
}
