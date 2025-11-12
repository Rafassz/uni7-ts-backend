import { DenunciaStatus, DenunciaPrioridade } from "../../../model/denuncia";

export interface IRequest {
    IdUsuario: number;
    Nome: string;
    Descricao: string;
    IdCategoria?: number;
    Status?: DenunciaStatus;
    Prioridade?: DenunciaPrioridade;
}
