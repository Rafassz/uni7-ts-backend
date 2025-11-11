import type { Request, Response } from "express";
import { GetAllAvisoUseCase } from "./useCase";

export class GetAllAvisoController {
    
    constructor(private readonly useCase: GetAllAvisoUseCase) {}

    handle = async (req: Request, res: Response) => {
        try {
            const avisos = await this.useCase.execute();
            res.json(avisos);
        } catch (error) {
            console.error('❌ Erro ao listar avisos:', error);
            const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
            
            // Se for erro de conexão do Prisma
            if (errorMessage.includes('connect') || errorMessage.includes('database')) {
                res.status(503).json({ 
                    erro: "Erro de conexão com o banco de dados",
                    detalhes: "Verifique se o banco de dados está rodando e acessível"
                });
            } else {
                res.status(500).json({ 
                    erro: "Erro ao listar avisos",
                    detalhes: errorMessage
                });
            }
        }
    };
}
