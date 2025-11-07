import express, { Request, Response } from 'express';
import userRoutes from "./routes/userRoutes";
import denunciaRoutes from "./routes/denunciaRoutes";
import avisoRoutes from "./routes/avisoRoutes";
import cors from 'cors';

const app = express();

app.use(cors());

app.use(express.json());

// Rotas da API
app.use("/usuarios", userRoutes);
app.use("/denuncias", denunciaRoutes);
app.use("/avisos", avisoRoutes);

app.get("/", (req: Request, res: Response) => {
    res.send("API rodando - Sistema de Denúncias e Avisos");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server funcionando na porta ${PORT}`);
});
