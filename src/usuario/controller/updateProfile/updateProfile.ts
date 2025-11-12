import { Request, Response } from "express";
import type { UpdateProfileUseCase } from "./useCase";
import type { AuthRequest } from "../../../middlewares/authMiddleware";

export class UpdateProfileController {
  constructor(private updateProfileUseCase: UpdateProfileUseCase) {}

  async handle(req: AuthRequest, res: Response): Promise<Response> {
    try {
      const userId = req.userId;

      if (!userId) {
        return res.status(401).json({ erro: "Usuário não autenticado" });
      }

      const { NomeUsuario, Senha, NovaSenha } = req.body;

      const resultado = await this.updateProfileUseCase.execute(userId, {
        NomeUsuario,
        Senha,
        NovaSenha,
      });

      return res.status(200).json(resultado);
    } catch (error: any) {
      console.error("Erro ao atualizar perfil:", error);
      return res.status(400).json({ 
        erro: error.message || "Erro ao atualizar perfil" 
      });
    }
  }
}
