import { Request, Response } from 'express';
import { CreateCategoriaUseCase } from './useCase';

export class CreateCategoriaController {
    async handle(req: Request, res: Response): Promise<Response> {
        try {
            const { Nome, Descricao, Cor, Icone } = req.body;

            if (!Nome) {
                return res.status(400).json({ message: 'Nome da categoria é obrigatório' });
            }

            const createCategoriaUseCase = new CreateCategoriaUseCase();
            const categoria = await createCategoriaUseCase.execute({ Nome, Descricao, Cor, Icone });

            return res.status(201).json(categoria);
        } catch (error: any) {
            return res.status(400).json({ 
                message: error.message || 'Erro ao criar categoria'
            });
        }
    }
}
