import { Request, Response } from 'express';
import { GetStatsUseCase } from './useCase';

export class GetStatsController {
    async handle(req: Request, res: Response): Promise<Response> {
        try {
            const getStatsUseCase = new GetStatsUseCase();
            const stats = await getStatsUseCase.execute();
            
            return res.status(200).json(stats);
        } catch (error: any) {
            return res.status(400).json({
                message: error.message || 'Erro ao buscar estatísticas'
            });
        }
    }
}
