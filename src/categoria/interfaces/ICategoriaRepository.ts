import type { Categoria } from "../model/categoria";

export interface ICategoriaRepository {
    create(data: Omit<Categoria, 'IdCategoria' | 'Ativa' | 'Inclusao' | 'Atualizacao'>): Promise<Categoria>;
    findAll(): Promise<Categoria[]>;
    findById(id: number): Promise<Categoria | null>;
    update(id: number, data: Partial<Omit<Categoria, 'IdCategoria' | 'Inclusao' | 'Atualizacao'>>): Promise<Categoria>;
    deactivate(id: number): Promise<Categoria>;
}
