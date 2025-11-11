export interface LoginUsuarioDTO {
    NomeUsuario: string;
    Senha: string;
}

export interface LoginResponseDTO {
    IdUsuario: number;
    NomeUsuario: string;
    Email?: string;
    mensagem: string;
}
