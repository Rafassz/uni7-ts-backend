"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateDenunciaController = void 0;
class UpdateDenunciaController {
    constructor(useCase) {
        this.useCase = useCase;
        this.handle = async (req, res) => {
            try {
                const { id } = req.params;
                const { Nome, Descricao } = req.body;
                const denuncia = await this.useCase.execute(Number(id), { Nome, Descricao });
                res.json({
                    mensagem: "Denúncia atualizada com sucesso",
                    denuncia
                });
            }
            catch (error) {
                console.error(error);
                const errorMessage = error instanceof Error ? error.message : "Erro ao atualizar denúncia";
                res.status(400).json({ erro: errorMessage });
            }
        };
    }
}
exports.UpdateDenunciaController = UpdateDenunciaController;
//# sourceMappingURL=update.js.map