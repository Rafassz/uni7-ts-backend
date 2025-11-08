"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUsuarioController = void 0;
class UpdateUsuarioController {
    constructor(useCase) {
        this.useCase = useCase;
        this.handle = async (req, res) => {
            try {
                const { id } = req.params;
                const { NomeUsuario, Senha } = req.body;
                const usuario = await this.useCase.execute(Number(id), { NomeUsuario, Senha });
                res.json({
                    mensagem: "Usuário atualizado com sucesso",
                    usuario
                });
            }
            catch (error) {
                console.error(error);
                const errorMessage = error instanceof Error ? error.message : "Erro ao atualizar usuário";
                res.status(400).json({ erro: errorMessage });
            }
        };
    }
}
exports.UpdateUsuarioController = UpdateUsuarioController;
//# sourceMappingURL=update.js.map