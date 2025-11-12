import { IUsuarioRepository } from "../../interfaces/IUsuarioRepository";
import { LoginUsuarioDTO, LoginResponseDTO } from "./DTO";
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'uni7-secret-key-2024';

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

        // Gerar token JWT
        const token = jwt.sign(
            {
                id: usuario.IdUsuario,
                username: usuario.NomeUsuario,
                role: (usuario as any).Role || 'Morador',
            },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        // Retornar dados do usuário com token
        return {
            IdUsuario: usuario.IdUsuario,
            NomeUsuario: usuario.NomeUsuario,
            Email: (usuario as any).Email || undefined,
            token,
            mensagem: "Login realizado com sucesso",
        };
    }
}
