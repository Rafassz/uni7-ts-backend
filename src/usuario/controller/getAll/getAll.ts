import type { Request, Response } from "express";
import { GetAllUsuarioUseCase } from "./useCase";

export class GetAllUsuarioController {
    
    constructor(private readonly useCase: GetAllUsuarioUseCase) {}

    handle = async (req: Request, res: Response) => {
        try {
            const usuarios = await this.useCase.execute();
            res.json(usuarios);
        } catch (error) {
            console.error(error);
            res.status(500).json({ erro: "Erro ao listar usuários" });
        }
    };
}
