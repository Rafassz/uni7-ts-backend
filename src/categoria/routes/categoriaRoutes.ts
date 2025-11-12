import { Router } from "express";
import { CreateCategoriaController } from "../controller/create";
import { GetAllCategoriasController } from "../controller/getAll";

const categoriaRoutes = Router();

const createCategoriaController = new CreateCategoriaController();
const getAllCategoriasController = new GetAllCategoriasController();

/**
 * @swagger
 * /uni7/categorias:
 *   post:
 *     summary: Criar nova categoria
 *     tags: [Categorias]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - Nome
 *             properties:
 *               Nome:
 *                 type: string
 *               Descricao:
 *                 type: string
 *               Cor:
 *                 type: string
 *               Icone:
 *                 type: string
 *     responses:
 *       201:
 *         description: Categoria criada com sucesso
 */
categoriaRoutes.post("/", createCategoriaController.handle);

/**
 * @swagger
 * /uni7/categorias:
 *   get:
 *     summary: Listar todas as categorias ativas
 *     tags: [Categorias]
 *     responses:
 *       200:
 *         description: Lista de categorias
 */
categoriaRoutes.get("/", getAllCategoriasController.handle);

export default categoriaRoutes;
