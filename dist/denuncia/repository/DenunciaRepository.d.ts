import type { IDenunciaRepository } from "../interfaces/IDenunciaRepository";
import type { IRequest as CreateDenunciaDTO } from "../controller/create/DTO/IRequest";
import type { IRequest as UpdateDenunciaDTO } from "../controller/update/DTO/IRequest";
import type { IResponse as DenunciaResponseDTO } from "../controller/create/DTO/IResponse";
export declare class DenunciaRepository implements IDenunciaRepository {
    create(data: CreateDenunciaDTO): Promise<DenunciaResponseDTO>;
    findAll(): Promise<DenunciaResponseDTO[]>;
    findById(id: number): Promise<DenunciaResponseDTO | null>;
    update(id: number, data: UpdateDenunciaDTO): Promise<DenunciaResponseDTO>;
    deactivate(id: number): Promise<DenunciaResponseDTO>;
}
//# sourceMappingURL=DenunciaRepository.d.ts.map