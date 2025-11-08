import type { Usuario } from "../../../model/usuario";

export type IResponse = Omit<Usuario, "Senha">;
