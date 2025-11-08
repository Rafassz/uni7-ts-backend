"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeactivateUsuarioController = void 0;
class DeactivateUsuarioController {
    constructor(useCase) {
        this.useCase = useCase;
        this.handle = async (req, res) => {
            try {
                const { id } = req.params;
                const usuario = await this.useCase.execute(Number(id));
                res.json({
                    mensagem: "Usuário desativado com sucesso",
                    usuario
                });
            }
            catch (error) {
                console.error(error);
                const errorMessage = error instanceof Error ? error.message : "Erro ao desativar usuário";
                res.status(400).json({ erro: errorMessage });
            }
        };
    }
}
exports.DeactivateUsuarioController = DeactivateUsuarioController;
//# sourceMappingURL=deactivate.js.map