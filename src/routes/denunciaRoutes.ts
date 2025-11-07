import { Router } from "express";
import {
  criarDenuncia,
  listarDenuncias,
  buscarDenuncia,
  atualizarDenuncia,
  desativarDenuncia
} from "../controller/denunciaController";

const router = Router();

// Create - Criar nova denúncia
router.post("/", criarDenuncia);

// GetAll - Listar todas as denúncias ativas
router.get("/", listarDenuncias);

// GetById - Buscar denúncia específica
router.get("/:id", buscarDenuncia);

// Update - Atualizar dados da denúncia
router.put("/:id", atualizarDenuncia);

// UpdateAtiva - Desativar denúncia (soft delete)
router.patch("/:id/desativar", desativarDenuncia);

export default router;
