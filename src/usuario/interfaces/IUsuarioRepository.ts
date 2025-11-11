import type { IRequest as CreateRequest } from "../controller/create/DTO/IRequest";
import type { IRequest as UpdateRequest } from "../controller/update/DTO/IRequest";
import type { IResponse } from "../controller/create/DTO/IResponse";
import type { Usuario } from "../model/usuario";

export interface IUsuarioRepository {
    create(data: CreateRequest): Promise<IResponse>;
    findById(id: number): Promise<IResponse | null>;
    findAll(): Promise<IResponse[]>;
    findByUsername(nomeUsuario: string): Promise<Usuario | null>;
    update(id: number, data: UpdateRequest): Promise<IResponse>;
    deactivate(id: number): Promise<IResponse>;
}
