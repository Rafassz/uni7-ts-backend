import type { Response } from "express";
import { CreateAvisoUseCase } from "./useCase";
import type { AuthRequest } from "../../../middlewares/authMiddleware";

export class CreateAvisoController {
    
    constructor(private readonly useCase: CreateAvisoUseCase) {}

    handle = async (req: AuthRequest, res: Response) => {
        try {
            const { Nome, Descricao, DataEvento } = req.body;
            const IdUsuario = req.userId; // Pega do token JWT

            if (!IdUsuario) {
                return res.status(401).json({ erro: 'Usuário não autenticado' });
            }

            const aviso = await this.useCase.execute({ 
                IdUsuario, 
                Nome, 
                Descricao,
                DataEvento 
            });
            
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
