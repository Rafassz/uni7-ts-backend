"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeactivateAvisoController = void 0;
class DeactivateAvisoController {
    constructor(useCase) {
        this.useCase = useCase;
        this.handle = async (req, res) => {
            try {
                const { id } = req.params;
                const aviso = await this.useCase.execute(Number(id));
                res.json({
                    mensagem: "Aviso desativado com sucesso",
                    aviso
                });
            }
            catch (error) {
                console.error(error);
                const errorMessage = error instanceof Error ? error.message : "Erro ao desativar aviso";
                res.status(400).json({ erro: errorMessage });
            }
        };
    }
}
exports.DeactivateAvisoController = DeactivateAvisoController;
//# sourceMappingURL=deactivate.js.map