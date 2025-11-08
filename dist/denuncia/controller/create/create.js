"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateDenunciaController = void 0;
class CreateDenunciaController {
    constructor(useCase) {
        this.useCase = useCase;
        this.handle = async (req, res) => {
            try {
                const { IdUsuario, Nome, Descricao } = req.body;
                const denuncia = await this.useCase.execute({ IdUsuario, Nome, Descricao });
                res.status(201).json({
                    mensagem: "Denúncia criada com sucesso",
                    denuncia
                });
            }
            catch (error) {
                console.error(error);
                const errorMessage = error instanceof Error ? error.message : "Erro ao criar denúncia";
                res.status(400).json({ erro: errorMessage });
            }
        };
    }
}
exports.CreateDenunciaController = CreateDenunciaController;
//# sourceMappingURL=create.js.map