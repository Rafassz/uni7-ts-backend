"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAvisoController = void 0;
class CreateAvisoController {
    constructor(useCase) {
        this.useCase = useCase;
        this.handle = async (req, res) => {
            try {
                const { IdUsuario, Nome, Descricao } = req.body;
                const aviso = await this.useCase.execute({ IdUsuario, Nome, Descricao });
                res.status(201).json({
                    mensagem: "Aviso criado com sucesso",
                    aviso
                });
            }
            catch (error) {
                console.error(error);
                const errorMessage = error instanceof Error ? error.message : "Erro ao criar aviso";
                res.status(400).json({ erro: errorMessage });
            }
        };
    }
}
exports.CreateAvisoController = CreateAvisoController;
//# sourceMappingURL=create.js.map