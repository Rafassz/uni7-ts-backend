import { Router } from "express";
import { CreateUsuarioController, CreateUsuarioUseCase } from "../controller/create";
import { GetAllUsuarioController, GetAllUsuarioUseCase } from "../controller/getAll";
import { GetByIdUsuarioController, GetByIdUsuarioUseCase } from "../controller/getById";
import { UpdateUsuarioController, UpdateUsuarioUseCase } from "../controller/update";
import { DeactivateUsuarioController, DeactivateUsuarioUseCase } from "../controller/deactivate";
import { LoginUsuarioController, LoginUsuarioUseCase } from "../controller/login";
import { UsuarioRepository } from "../repository/UsuarioRepository";

const router = Router();

const usuarioRepository = new UsuarioRepository();

const createUsuarioUseCase = new CreateUsuarioUseCase(usuarioRepository);
const createUsuarioController = new CreateUsuarioController(createUsuarioUseCase);

const getAllUsuarioUseCase = new GetAllUsuarioUseCase(usuarioRepository);
const getAllUsuarioController = new GetAllUsuarioController(getAllUsuarioUseCase);

const getByIdUsuarioUseCase = new GetByIdUsuarioUseCase(usuarioRepository);
const getByIdUsuarioController = new GetByIdUsuarioController(getByIdUsuarioUseCase);

const updateUsuarioUseCase = new UpdateUsuarioUseCase(usuarioRepository);
const updateUsuarioController = new UpdateUsuarioController(updateUsuarioUseCase);

const deactivateUsuarioUseCase = new DeactivateUsuarioUseCase(usuarioRepository);
const deactivateUsuarioController = new DeactivateUsuarioController(deactivateUsuarioUseCase);

const loginUsuarioUseCase = new LoginUsuarioUseCase(usuarioRepository);
const loginUsuarioController = new LoginUsuarioController(loginUsuarioUseCase);

/**
 * @swagger
 * /uni7/usuarios/login:
 *   post:
 *     tags: [Usuarios]
 *     summary: Login de usuário
 *     description: Autentica um usuário no sistema
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - NomeUsuario
 *               - Senha
 *             properties:
 *               NomeUsuario:
 *                 type: string
 *                 example: "joao"
 *               Senha:
 *                 type: string
 *                 example: "senha123"
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 IdUsuario:
 *                   type: integer
 *                 NomeUsuario:
 *                   type: string
 *                 Email:
 *                   type: string
 *                 mensagem:
 *                   type: string
 *       401:
 *         description: Credenciais inválidas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 erro:
 *                   type: string
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 erro:
 *                   type: string
 */
router.post("/login", loginUsuarioController.handle.bind(loginUsuarioController));

/**
 * @swagger
 * /uni7/usuarios:
 *   post:
 *     tags: [Usuarios]
 *     summary: Criar novo usuário
 *     description: Cria um novo usuário no sistema
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UsuarioInput'
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                 usuario:
 *                   $ref: '#/components/schemas/Usuario'
 *       400:
 *         description: Erro de validação
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post("/", createUsuarioController.handle.bind(createUsuarioController));

/**
 * @swagger
 * /uni7/usuarios:
 *   get:
 *     tags: [Usuarios]
 *     summary: Listar todos os usuários ativos
 *     description: Retorna uma lista de todos os usuários com status ativo
 *     responses:
 *       200:
 *         description: Lista de usuários
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Usuario'
 *       400:
 *         description: Erro ao buscar usuários
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/", getAllUsuarioController.handle.bind(getAllUsuarioController));

/**
 * @swagger
 * /uni7/usuarios/{id}:
 *   get:
 *     tags: [Usuarios]
 *     summary: Buscar usuário por ID
 *     description: Retorna um usuário específico pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Usuário encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       404:
 *         description: Usuário não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/:id", getByIdUsuarioController.handle.bind(getByIdUsuarioController));

/**
 * @swagger
 * /uni7/usuarios/{id}:
 *   put:
 *     tags: [Usuarios]
 *     summary: Atualizar usuário
 *     description: Atualiza os dados de um usuário existente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UsuarioUpdate'
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                 usuario:
 *                   $ref: '#/components/schemas/Usuario'
 *       400:
 *         description: Erro de validação
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Usuário não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put("/:id", updateUsuarioController.handle.bind(updateUsuarioController));

/**
 * @swagger
 * /uni7/usuarios/{id}/desativar:
 *   patch:
 *     tags: [Usuarios]
 *     summary: Desativar usuário (soft delete)
 *     description: Desativa um usuário sem removê-lo do banco de dados
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Usuário desativado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                 usuario:
 *                   $ref: '#/components/schemas/Usuario'
 *       404:
 *         description: Usuário não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.patch("/:id/desativar", deactivateUsuarioController.handle.bind(deactivateUsuarioController));

export default router;

