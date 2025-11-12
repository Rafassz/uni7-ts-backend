import type { Response } from "express";
import { CreateDenunciaUseCase } from "./useCase";
import type { AuthRequest } from "../../../middlewares/authMiddleware";

export class CreateDenunciaController {
    
    constructor(private readonly useCase: CreateDenunciaUseCase) {}

    handle = async (req: AuthRequest, res: Response) => {
        try {
            const { Nome, Descricao, IdCategoria, Prioridade } = req.body;
            const IdUsuario = req.userId; // Pega do token JWT

            if (!IdUsuario) {
                return res.status(401).json({ erro: 'Usuário não autenticado' });
            }

            const denuncia = await this.useCase.execute({ 
                IdUsuario, 
                Nome, 
                Descricao,
                IdCategoria,
                Prioridade 
            });
            
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
