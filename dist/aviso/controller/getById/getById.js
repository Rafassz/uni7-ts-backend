"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetByIdAvisoController = void 0;
class GetByIdAvisoController {
    constructor(useCase) {
        this.useCase = useCase;
        this.handle = async (req, res) => {
            try {
                const { id } = req.params;
                const aviso = await this.useCase.execute(Number(id));
                res.json(aviso);
            }
            catch (error) {
                console.error(error);
                const errorMessage = error instanceof Error ? error.message : "Erro ao buscar aviso";
                res.status(404).json({ erro: errorMessage });
            }
        };
    }
}
exports.GetByIdAvisoController = GetByIdAvisoController;
//# sourceMappingURL=getById.js.map