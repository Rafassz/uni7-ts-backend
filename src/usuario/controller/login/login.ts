import { Request, Response } from "express";
import { LoginUsuarioUseCase } from "./useCase";

export class LoginUsuarioController {
    constructor(private loginUsuarioUseCase: LoginUsuarioUseCase) {}

    async handle(req: Request, res: Response): Promise<Response> {
        try {
            const { NomeUsuario, Senha } = req.body;

            if (!NomeUsuario || !Senha) {
                return res.status(400).json({
                    erro: "NomeUsuario e Senha são obrigatórios",
                });
            }

            const result = await this.loginUsuarioUseCase.execute({
                NomeUsuario,
                Senha,
            });

            return res.status(200).json(result);
        } catch (error: any) {
            if (
                error.message === "Usuário não encontrado ou inativo" ||
                error.message === "Credenciais inválidas"
            ) {
                return res.status(401).json({
                    erro: error.message,
                });
            }

            return res.status(400).json({
                erro: error.message || "Erro ao realizar login",
            });
        }
    }
}
