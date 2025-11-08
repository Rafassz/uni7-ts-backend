import type { IRequest as CreateRequest } from "../controller/create/DTO/IRequest";
import type { IRequest as UpdateRequest } from "../controller/update/DTO/IRequest";
import type { IResponse } from "../controller/create/DTO/IResponse";

export interface IDenunciaRepository {
    create(data: CreateRequest): Promise<IResponse>;
    findById(id: number): Promise<IResponse | null>;
    findAll(): Promise<IResponse[]>;
    update(id: number, data: UpdateRequest): Promise<IResponse>;
    deactivate(id: number): Promise<IResponse>;
}
