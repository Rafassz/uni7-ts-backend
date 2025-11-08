"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetByIdDenunciaController = void 0;
class GetByIdDenunciaController {
    constructor(useCase) {
        this.useCase = useCase;
        this.handle = async (req, res) => {
            try {
                const { id } = req.params;
                const denuncia = await this.useCase.execute(Number(id));
                res.json(denuncia);
            }
            catch (error) {
                console.error(error);
                const errorMessage = error instanceof Error ? error.message : "Erro ao buscar denúncia";
                res.status(404).json({ erro: errorMessage });
            }
        };
    }
}
exports.GetByIdDenunciaController = GetByIdDenunciaController;
//# sourceMappingURL=getById.js.map