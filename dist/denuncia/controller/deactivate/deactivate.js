"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeactivateDenunciaController = void 0;
class DeactivateDenunciaController {
    constructor(useCase) {
        this.useCase = useCase;
        this.handle = async (req, res) => {
            try {
                const { id } = req.params;
                const denuncia = await this.useCase.execute(Number(id));
                res.json({
                    mensagem: "Denúncia desativada com sucesso",
                    denuncia
                });
            }
            catch (error) {
                console.error(error);
                const errorMessage = error instanceof Error ? error.message : "Erro ao desativar denúncia";
                res.status(400).json({ erro: errorMessage });
            }
        };
    }
}
exports.DeactivateDenunciaController = DeactivateDenunciaController;
//# sourceMappingURL=deactivate.js.map