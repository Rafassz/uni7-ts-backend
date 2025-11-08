"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllAvisoController = void 0;
class GetAllAvisoController {
    constructor(useCase) {
        this.useCase = useCase;
        this.handle = async (req, res) => {
            try {
                const avisos = await this.useCase.execute();
                res.json(avisos);
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ erro: "Erro ao listar avisos" });
            }
        };
    }
}
exports.GetAllAvisoController = GetAllAvisoController;
//# sourceMappingURL=getAll.js.map