"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetByIdUsuarioController = void 0;
class GetByIdUsuarioController {
    constructor(useCase) {
        this.useCase = useCase;
        this.handle = async (req, res) => {
            try {
                const { id } = req.params;
                const usuario = await this.useCase.execute(Number(id));
                res.json(usuario);
            }
            catch (error) {
                console.error(error);
                const errorMessage = error instanceof Error ? error.message : "Erro ao buscar usuário";
                res.status(404).json({ erro: errorMessage });
            }
        };
    }
}
exports.GetByIdUsuarioController = GetByIdUsuarioController;
//# sourceMappingURL=getById.js.map