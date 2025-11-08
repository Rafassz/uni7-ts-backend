"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usuarioRoutes_1 = __importDefault(require("./usuario/routes/usuarioRoutes"));
const denunciaRoutes_1 = __importDefault(require("./denuncia/routes/denunciaRoutes"));
const avisoRoutes_1 = __importDefault(require("./aviso/routes/avisoRoutes"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/uni7/usuarios", usuarioRoutes_1.default);
app.use("/uni7/denuncias", denunciaRoutes_1.default);
app.use("/uni7/avisos", avisoRoutes_1.default);
app.get("/", (req, res) => {
    res.send("API rodando - Sistema de Denúncias e Avisos");
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server funcionando na porta ${PORT}`);
});
//# sourceMappingURL=index.js.map