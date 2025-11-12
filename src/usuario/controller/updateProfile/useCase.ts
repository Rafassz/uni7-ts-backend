import type { IUsuarioRepository } from "../../interfaces/IUsuarioRepository";
import type { IUpdateProfileRequestDTO, IUpdateProfileResponseDTO } from "./DTO";
import bcrypt from "bcrypt";

export class UpdateProfileUseCase {
  constructor(private usuarioRepository: IUsuarioRepository) {}

  async execute(
    userId: number,
    data: IUpdateProfileRequestDTO
  ): Promise<IUpdateProfileResponseDTO> {
    // Buscar usuário atual
    const usuario = await this.usuarioRepository.findById(userId);
    if (!usuario) {
      throw new Error("Usuário não encontrado");
    }

    // Se estiver alterando senha, validar a senha atual
    if (data.NovaSenha) {
      if (!data.Senha) {
        throw new Error("Senha atual é obrigatória para alterar a senha");
      }

      // Buscar usuário completo com senha para validação
      const usuarioCompleto = await this.usuarioRepository.findByUsername(usuario.NomeUsuario);
      if (!usuarioCompleto) {
        throw new Error("Erro ao validar usuário");
      }

      // Verificar se a senha atual está correta
      const senhaValida = await bcrypt.compare(data.Senha, usuarioCompleto.Senha);
      if (!senhaValida) {
        throw new Error("Senha atual incorreta");
      }

      // Hash da nova senha
      const novaSenhaHash = await bcrypt.hash(data.NovaSenha, 10);
      
      // Atualizar com nova senha
      const usuarioAtualizado = await this.usuarioRepository.update(userId, {
        NomeUsuario: data.NomeUsuario || usuario.NomeUsuario,
        Senha: novaSenhaHash,
      });

      return {
        IdUsuario: usuarioAtualizado.IdUsuario,
        NomeUsuario: usuarioAtualizado.NomeUsuario,
        Role: usuarioCompleto.Role || 'Morador',
        mensagem: "Perfil atualizado com sucesso",
      };
    }

    // Se for apenas atualizar o nome
    if (data.NomeUsuario && data.NomeUsuario !== usuario.NomeUsuario) {
      // Verificar se o novo nome já existe
      const usuarioExistente = await this.usuarioRepository.findByUsername(data.NomeUsuario);
      if (usuarioExistente && usuarioExistente.IdUsuario !== userId) {
        throw new Error("Nome de usuário já está em uso");
      }

      const usuarioAtualizado = await this.usuarioRepository.update(userId, {
        NomeUsuario: data.NomeUsuario,
      });

      const usuarioCompleto = await this.usuarioRepository.findByUsername(usuarioAtualizado.NomeUsuario);

      return {
        IdUsuario: usuarioAtualizado.IdUsuario,
        NomeUsuario: usuarioAtualizado.NomeUsuario,
        Role: usuarioCompleto?.Role || 'Morador',
        mensagem: "Nome de usuário atualizado com sucesso",
      };
    }

    // Se não houver alterações
    const usuarioCompleto = await this.usuarioRepository.findByUsername(usuario.NomeUsuario);
    return {
      IdUsuario: usuario.IdUsuario,
      NomeUsuario: usuario.NomeUsuario,
      Role: usuarioCompleto?.Role || 'Morador',
      mensagem: "Nenhuma alteração realizada",
    };
  }
}
