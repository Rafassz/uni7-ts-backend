import express, { Request, Response } from 'express';
import userRoutes from "./usuario/routes/usuarioRoutes";
import denunciaRoutes from "./denuncia/routes/denunciaRoutes";
import avisoRoutes from "./aviso/routes/avisoRoutes";
import { dashboardRoutes } from "./dashboard/routes/dashboardRoutes";
import categoriaRoutes from "./categoria/routes/categoriaRoutes";
import cors from 'cors';
import { setupSwagger } from './swagger';

const app = express();

app.use(cors());

app.use(express.json());

// Configurar Swagger
setupSwagger(app);

app.use("/uni7/usuarios", userRoutes);
app.use("/uni7/denuncias", denunciaRoutes);
app.use("/uni7/avisos", avisoRoutes);
app.use("/uni7/dashboard", dashboardRoutes);
app.use("/uni7/categorias", categoriaRoutes);

app.get("/", (req: Request, res: Response) => {
    res.send("API rodando - Sistema de Denúncias e Avisos");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server funcionando na porta ${PORT}`);
});
