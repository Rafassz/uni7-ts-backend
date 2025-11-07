import { Router } from "express";
import {
  criarUser,
  listarUsers,
  buscarUser,
  atualizarUser,
  desativarUser
} from "../controller/userController";

const router = Router();

// Create - Criar novo usuário
router.post("/", criarUser);

// GetAll - Listar todos os usuários ativos
router.get("/", listarUsers);

// GetById - Buscar usuário específico
router.get("/:id", buscarUser);

// Update - Atualizar dados do usuário
router.put("/:id", atualizarUser);

// UpdateAtiva - Desativar usuário (soft delete)
router.patch("/:id/desativar", desativarUser);

export default router;
