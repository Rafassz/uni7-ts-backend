import { Request, Response } from 'express';
import { GetAllCategoriasUseCase } from './useCase';

export class GetAllCategoriasController {
    async handle(req: Request, res: Response): Promise<Response> {
        try {
            const getAllCategoriasUseCase = new GetAllCategoriasUseCase();
            const categorias = await getAllCategoriasUseCase.execute();

            return res.status(200).json(categorias);
        } catch (error: any) {
            return res.status(400).json({
                message: error.message || 'Erro ao buscar categorias'
            });
        }
    }
}
