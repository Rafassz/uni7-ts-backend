import type { IUsuarioRepository } from "../interfaces/IUsuarioRepository";
import type { IRequest as CreateUsuarioDTO } from "../controller/create/DTO/IRequest";
import type { IRequest as UpdateUsuarioDTO } from "../controller/update/DTO/IRequest";
import type { IResponse as UsuarioResponseDTO } from "../controller/create/DTO/IResponse";
export declare class UsuarioRepository implements IUsuarioRepository {
    create(data: CreateUsuarioDTO): Promise<UsuarioResponseDTO>;
    findAll(): Promise<UsuarioResponseDTO[]>;
    findById(id: number): Promise<UsuarioResponseDTO | null>;
    update(id: number, data: UpdateUsuarioDTO): Promise<UsuarioResponseDTO>;
    deactivate(id: number): Promise<UsuarioResponseDTO>;
}
//# sourceMappingURL=UsuarioRepository.d.ts.map