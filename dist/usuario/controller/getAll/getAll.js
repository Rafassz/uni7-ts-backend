"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllUsuarioController = void 0;
class GetAllUsuarioController {
    constructor(useCase) {
        this.useCase = useCase;
        this.handle = async (req, res) => {
            try {
                const usuarios = await this.useCase.execute();
                res.json(usuarios);
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ erro: "Erro ao listar usuários" });
            }
        };
    }
}
exports.GetAllUsuarioController = GetAllUsuarioController;
//# sourceMappingURL=getAll.js.map