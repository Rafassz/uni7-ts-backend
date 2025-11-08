"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUsuarioController = void 0;
class CreateUsuarioController {
    constructor(useCase) {
        this.useCase = useCase;
        this.handle = async (req, res) => {
            try {
                const { NomeUsuario, Senha } = req.body;
                const usuario = await this.useCase.execute({ NomeUsuario, Senha });
                res.status(201).json({
                    mensagem: "Usuário criado com sucesso",
                    usuario
                });
            }
            catch (error) {
                console.error(error);
                const errorMessage = error instanceof Error ? error.message : "Erro ao criar usuário";
                res.status(400).json({ erro: errorMessage });
            }
        };
    }
}
exports.CreateUsuarioController = CreateUsuarioController;
//# sourceMappingURL=create.js.map