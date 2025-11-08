import type { IAvisoRepository } from "../interfaces/IAvisoRepository";
import type { IRequest as CreateAvisoDTO } from "../controller/create/DTO/IRequest";
import type { IRequest as UpdateAvisoDTO } from "../controller/update/DTO/IRequest";
import type { IResponse as AvisoResponseDTO } from "../controller/create/DTO/IResponse";
export declare class AvisoRepository implements IAvisoRepository {
    create(data: CreateAvisoDTO): Promise<AvisoResponseDTO>;
    findAll(): Promise<AvisoResponseDTO[]>;
    findById(id: number): Promise<AvisoResponseDTO | null>;
    update(id: number, data: UpdateAvisoDTO): Promise<AvisoResponseDTO>;
    deactivate(id: number): Promise<AvisoResponseDTO>;
}
//# sourceMappingURL=AvisoRepository.d.ts.map