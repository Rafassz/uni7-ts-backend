import { Router } from "express";
import { CreateAvisoController, CreateAvisoUseCase } from "../controller/create";
import { GetAllAvisoController, GetAllAvisoUseCase } from "../controller/getAll";
import { GetByIdAvisoController, GetByIdAvisoUseCase } from "../controller/getById";
import { UpdateAvisoController, UpdateAvisoUseCase } from "../controller/update";
import { DeactivateAvisoController, DeactivateAvisoUseCase } from "../controller/deactivate";
import { AvisoRepository } from "../repository/AvisoRepository";
import { UsuarioRepository } from "../../usuario/repository/UsuarioRepository";

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

router.post("/", createAvisoController.handle.bind(createAvisoController));

router.get("/", getAllAvisoController.handle.bind(getAllAvisoController));

router.get("/:id", getByIdAvisoController.handle.bind(getByIdAvisoController));

router.put("/:id", updateAvisoController.handle.bind(updateAvisoController));

router.patch("/:id/desativar", deactivateAvisoController.handle.bind(deactivateAvisoController));

export default router;

