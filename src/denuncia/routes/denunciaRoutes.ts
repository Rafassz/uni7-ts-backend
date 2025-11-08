import { Router } from "express";
import { CreateDenunciaController, CreateDenunciaUseCase } from "../controller/create";
import { GetAllDenunciaController, GetAllDenunciaUseCase } from "../controller/getAll";
import { GetByIdDenunciaController, GetByIdDenunciaUseCase } from "../controller/getById";
import { UpdateDenunciaController, UpdateDenunciaUseCase } from "../controller/update";
import { DeactivateDenunciaController, DeactivateDenunciaUseCase } from "../controller/deactivate";
import { DenunciaRepository } from "../repository/DenunciaRepository";
import { UsuarioRepository } from "../../usuario/repository/UsuarioRepository";

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

router.post("/", createDenunciaController.handle.bind(createDenunciaController));

router.get("/", getAllDenunciaController.handle.bind(getAllDenunciaController));

router.get("/:id", getByIdDenunciaController.handle.bind(getByIdDenunciaController));

router.put("/:id", updateDenunciaController.handle.bind(updateDenunciaController));

router.patch("/:id/desativar", deactivateDenunciaController.handle.bind(deactivateDenunciaController));

export default router;

