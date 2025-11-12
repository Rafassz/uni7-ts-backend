import { Router } from 'express';
import { GetStatsController } from '../controller/getStats';

const dashboardRoutes = Router();
const getStatsController = new GetStatsController();

dashboardRoutes.get('/stats', (req, res) => getStatsController.handle(req, res));

export { dashboardRoutes };
