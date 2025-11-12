import { Router } from "express";
import { CreateAvisoController, CreateAvisoUseCase } from "../controller/create";
import { GetAllAvisoController, GetAllAvisoUseCase } from "../controller/getAll";
import { GetByIdAvisoController, GetByIdAvisoUseCase } from "../controller/getById";
import { UpdateAvisoController, UpdateAvisoUseCase } from "../controller/update";
import { DeactivateAvisoController, DeactivateAvisoUseCase } from "../controller/deactivate";
import { AvisoRepository } from "../repository/AvisoRepository";
import { UsuarioRepository } from "../../usuario/repository/UsuarioRepository";
import { authMiddleware } from "../../middlewares/authMiddleware";
import { canCreateAviso } from "../../middlewares/roleMiddleware";

const router = Router();

const usuarioRepository = new UsuarioRepository();
const avisoRepository = new AvisoRepository();

const createAvisoUseCase = new CreateAvisoUseCase(avisoRepository, usuarioRepository);
const createAvisoController = new CreateAvisoController(createAvisoUseCase);

const getAllAvisoUseCase = new GetAllAvisoUseCase(avisoRepository);
const getAllAvisoController = new GetAllAvisoController(getAllAvisoUseCase);

const getByIdAvisoUseCase = new GetByIdAvisoUseCase(avisoRepository);
const getByIdAvisoController = new GetByIdAvisoController(getByIdAvisoUseCase);

const updateAvisoUseCase = new UpdateAvisoUseCase(avisoRepository);
const updateAvisoController = new UpdateAvisoController(updateAvisoUseCase);

const deactivateAvisoUseCase = new DeactivateAvisoUseCase(avisoRepository);
const deactivateAvisoController = new DeactivateAvisoController(deactivateAvisoUseCase);

/**
 * @swagger
 * /uni7/avisos:
 *   post:
 *     tags: [Avisos]
 *     summary: Criar novo aviso
 *     description: Cria um novo aviso no sistema
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AvisoInput'
 *     responses:
 *       201:
 *         description: Aviso criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                 aviso:
 *                   $ref: '#/components/schemas/Aviso'
 *       400:
 *         description: Erro de validação
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post("/", authMiddleware, canCreateAviso, createAvisoController.handle.bind(createAvisoController));

/**
 * @swagger
 * /uni7/avisos:
 *   get:
 *     tags: [Avisos]
 *     summary: Listar todos os avisos ativos
 *     description: Retorna uma lista de todos os avisos com status ativo
 *     responses:
 *       200:
 *         description: Lista de avisos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Aviso'
 *       400:
 *         description: Erro ao buscar avisos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/", getAllAvisoController.handle.bind(getAllAvisoController));

/**
 * @swagger
 * /uni7/avisos/{id}:
 *   get:
 *     tags: [Avisos]
 *     summary: Buscar aviso por ID
 *     description: Retorna um aviso específico pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do aviso
 *     responses:
 *       200:
 *         description: Aviso encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Aviso'
 *       404:
 *         description: Aviso não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/:id", getByIdAvisoController.handle.bind(getByIdAvisoController));

/**
 * @swagger
 * /uni7/avisos/{id}:
 *   put:
 *     tags: [Avisos]
 *     summary: Atualizar aviso
 *     description: Atualiza os dados de um aviso existente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do aviso
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AvisoUpdate'
 *     responses:
 *       200:
 *         description: Aviso atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                 aviso:
 *                   $ref: '#/components/schemas/Aviso'
 *       400:
 *         description: Erro de validação
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Aviso não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put("/:id", authMiddleware, canCreateAviso, updateAvisoController.handle.bind(updateAvisoController));

/**
 * @swagger
 * /uni7/avisos/{id}/desativar:
 *   patch:
 *     tags: [Avisos]
 *     summary: Desativar aviso (soft delete)
 *     description: Desativa um aviso sem removê-lo do banco de dados
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do aviso
 *     responses:
 *       200:
 *         description: Aviso desativado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                 aviso:
 *                   $ref: '#/components/schemas/Aviso'
 *       404:
 *         description: Aviso não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.patch("/:id/desativar", authMiddleware, canCreateAviso, deactivateAvisoController.handle.bind(deactivateAvisoController));

export default router;

