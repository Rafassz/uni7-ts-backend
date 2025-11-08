import { Router } from "express";
import { CreateUsuarioController, CreateUsuarioUseCase } from "../controller/create";
import { GetAllUsuarioController, GetAllUsuarioUseCase } from "../controller/getAll";
import { GetByIdUsuarioController, GetByIdUsuarioUseCase } from "../controller/getById";
import { UpdateUsuarioController, UpdateUsuarioUseCase } from "../controller/update";
import { DeactivateUsuarioController, DeactivateUsuarioUseCase } from "../controller/deactivate";
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

router.post("/", createUsuarioController.handle.bind(createUsuarioController));

router.get("/", getAllUsuarioController.handle.bind(getAllUsuarioController));

router.get("/:id", getByIdUsuarioController.handle.bind(getByIdUsuarioController));

router.put("/:id", updateUsuarioController.handle.bind(updateUsuarioController));

router.patch("/:id/desativar", deactivateUsuarioController.handle.bind(deactivateUsuarioController));

export default router;

