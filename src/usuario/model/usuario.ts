export interface Usuario {
    IdUsuario: number;
    NomeUsuario: string;
    Senha: string;
    Role: string;
    Email?: string | null;
    Apartamento?: string | null;
    Bloco?: string | null;
    Ativa: boolean;
    Inclusao: Date;
    Atualizacao: Date;
}
