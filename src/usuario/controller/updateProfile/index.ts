import { UsuarioRepository } from "../../repository/UsuarioRepository";
import { UpdateProfileController } from "./updateProfile";
import { UpdateProfileUseCase } from "./useCase";

const usuarioRepository = new UsuarioRepository();
const updateProfileUseCase = new UpdateProfileUseCase(usuarioRepository);
const updateProfileController = new UpdateProfileController(updateProfileUseCase);

export { updateProfileController };
