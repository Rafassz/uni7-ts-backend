import { IUsuarioRepository } from "../../interfaces/IUsuarioRepository";
import { LoginUsuarioDTO, LoginResponseDTO } from "./DTO";

export class LoginUsuarioUseCase {
    constructor(private usuarioRepository: IUsuarioRepository) {}

    async execute(data: LoginUsuarioDTO): Promise<LoginResponseDTO> {
        // Buscar usuário pelo nome
        const usuario = await this.usuarioRepository.findByUsername(data.NomeUsuario);

        if (!usuario) {
            throw new Error("Usuário não encontrado ou inativo");
        }

        // Verificar senha (comparação direta - em produção use bcrypt)
        if (usuario.Senha !== data.Senha) {
            throw new Error("Credenciais inválidas");
        }

        // Retornar dados do usuário (sem a senha)
        return {
            IdUsuario: usuario.IdUsuario,
            NomeUsuario: usuario.NomeUsuario,
            Email: (usuario as any).Email || undefined,
            mensagem: "Login realizado com sucesso",
        };
    }
}
