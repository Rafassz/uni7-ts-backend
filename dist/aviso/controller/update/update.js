"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAvisoController = void 0;
class UpdateAvisoController {
    constructor(useCase) {
        this.useCase = useCase;
        this.handle = async (req, res) => {
            try {
                const { id } = req.params;
                const { Nome, Descricao } = req.body;
                const aviso = await this.useCase.execute(Number(id), { Nome, Descricao });
                res.json({
                    mensagem: "Aviso atualizado com sucesso",
                    aviso
                });
            }
            catch (error) {
                console.error(error);
                const errorMessage = error instanceof Error ? error.message : "Erro ao atualizar aviso";
                res.status(400).json({ erro: errorMessage });
            }
        };
    }
}
exports.UpdateAvisoController = UpdateAvisoController;
//# sourceMappingURL=update.js.map