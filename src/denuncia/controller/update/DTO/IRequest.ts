import { DenunciaStatus, DenunciaPrioridade } from "../../../model/denuncia";

export interface IRequest {
    Nome?: string;
    Descricao?: string;
    Status?: DenunciaStatus;
    Prioridade?: DenunciaPrioridade;
}
