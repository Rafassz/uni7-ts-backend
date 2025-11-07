import { Router } from "express";
import {
  criarAviso,
  listarAvisos,
  buscarAviso,
  atualizarAviso,
  desativarAviso
} from "../controller/avisoController";

const router = Router();

// Create - Criar novo aviso
router.post("/", criarAviso);

// GetAll - Listar todos os avisos ativos
router.get("/", listarAvisos);

// GetById - Buscar aviso específico
router.get("/:id", buscarAviso);

// Update - Atualizar dados do aviso
router.put("/:id", atualizarAviso);

// UpdateAtiva - Desativar aviso (soft delete)
router.patch("/:id/desativar", desativarAviso);

export default router;
