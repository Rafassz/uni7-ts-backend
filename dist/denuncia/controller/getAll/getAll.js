"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllDenunciaController = void 0;
class GetAllDenunciaController {
    constructor(useCase) {
        this.useCase = useCase;
        this.handle = async (req, res) => {
            try {
                const denuncias = await this.useCase.execute();
                res.json(denuncias);
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ erro: "Erro ao listar denúncias" });
            }
        };
    }
}
exports.GetAllDenunciaController = GetAllDenunciaController;
//# sourceMappingURL=getAll.js.map