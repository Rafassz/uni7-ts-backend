import { Router } from "express";
import { CreateDenunciaController, CreateDenunciaUseCase } from "../controller/create";
import { GetAllDenunciaController, GetAllDenunciaUseCase } from "../controller/getAll";
import { GetByIdDenunciaController, GetByIdDenunciaUseCase } from "../controller/getById";
import { UpdateDenunciaController, UpdateDenunciaUseCase } from "../controller/update";
import { DeactivateDenunciaController, DeactivateDenunciaUseCase } from "../controller/deactivate";
import { DenunciaRepository } from "../repository/DenunciaRepository";
import { UsuarioRepository } from "../../usuario/repository/UsuarioRepository";
import { authMiddleware } from "../../middlewares/authMiddleware";
import { canModifyDenunciaStatus } from "../../middlewares/roleMiddleware";

const router = Router();

const usuarioRepository = new UsuarioRepository();
const denunciaRepository = new DenunciaRepository();

const createDenunciaUseCase = new CreateDenunciaUseCase(denunciaRepository, usuarioRepository);
const createDenunciaController = new CreateDenunciaController(createDenunciaUseCase);

const getAllDenunciaUseCase = new GetAllDenunciaUseCase(denunciaRepository);
const getAllDenunciaController = new GetAllDenunciaController(getAllDenunciaUseCase);

const getByIdDenunciaUseCase = new GetByIdDenunciaUseCase(denunciaRepository);
const getByIdDenunciaController = new GetByIdDenunciaController(getByIdDenunciaUseCase);

const updateDenunciaUseCase = new UpdateDenunciaUseCase(denunciaRepository);
const updateDenunciaController = new UpdateDenunciaController(updateDenunciaUseCase);

const deactivateDenunciaUseCase = new DeactivateDenunciaUseCase(denunciaRepository);
const deactivateDenunciaController = new DeactivateDenunciaController(deactivateDenunciaUseCase);

/**
 * @swagger
 * /uni7/denuncias:
 *   post:
 *     tags: [Denuncias]
 *     summary: Criar nova denúncia
 *     description: Cria uma nova denúncia no sistema
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DenunciaInput'
 *     responses:
 *       201:
 *         description: Denúncia criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                 denuncia:
 *                   $ref: '#/components/schemas/Denuncia'
 *       400:
 *         description: Erro de validação
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post("/", authMiddleware, createDenunciaController.handle.bind(createDenunciaController));

/**
 * @swagger
 * /uni7/denuncias:
 *   get:
 *     tags: [Denuncias]
 *     summary: Listar todas as denúncias ativas
 *     description: Retorna uma lista de todas as denúncias com status ativo
 *     responses:
 *       200:
 *         description: Lista de denúncias
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Denuncia'
 *       400:
 *         description: Erro ao buscar denúncias
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/", getAllDenunciaController.handle.bind(getAllDenunciaController));

/**
 * @swagger
 * /uni7/denuncias/{id}:
 *   get:
 *     tags: [Denuncias]
 *     summary: Buscar denúncia por ID
 *     description: Retorna uma denúncia específica pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da denúncia
 *     responses:
 *       200:
 *         description: Denúncia encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Denuncia'
 *       404:
 *         description: Denúncia não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/:id", getByIdDenunciaController.handle.bind(getByIdDenunciaController));

/**
 * @swagger
 * /uni7/denuncias/{id}:
 *   put:
 *     tags: [Denuncias]
 *     summary: Atualizar denúncia
 *     description: Atualiza os dados de uma denúncia existente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da denúncia
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DenunciaUpdate'
 *     responses:
 *       200:
 *         description: Denúncia atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                 denuncia:
 *                   $ref: '#/components/schemas/Denuncia'
 *       400:
 *         description: Erro de validação
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Denúncia não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put("/:id", authMiddleware, canModifyDenunciaStatus, updateDenunciaController.handle.bind(updateDenunciaController));

/**
 * @swagger
 * /uni7/denuncias/{id}/desativar:
 *   patch:
 *     tags: [Denuncias]
 *     summary: Desativar denúncia (soft delete)
 *     description: Desativa uma denúncia sem removê-la do banco de dados
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da denúncia
 *     responses:
 *       200:
 *         description: Denúncia desativada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                 denuncia:
 *                   $ref: '#/components/schemas/Denuncia'
 *       404:
 *         description: Denúncia não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.patch("/:id/desativar", authMiddleware, canModifyDenunciaStatus, deactivateDenunciaController.handle.bind(deactivateDenunciaController));

export default router;

