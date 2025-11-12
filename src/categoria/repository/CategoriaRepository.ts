import prisma from "../../database/prismaClient";
import type { ICategoriaRepository } from "../interfaces/ICategoriaRepository";
import type { Categoria } from "../model/categoria";

export class CategoriaRepository implements ICategoriaRepository {
    
    async create(data: Omit<Categoria, 'IdCategoria' | 'Ativa' | 'Inclusao' | 'Atualizacao'>): Promise<Categoria> {
        const categoria = await prisma.categoria.create({
            data: {
                Nome: data.Nome,
                Descricao: data.Descricao,
                Cor: data.Cor,
                Icone: data.Icone
            }
        });
        return categoria;
    }

    async findAll(): Promise<Categoria[]> {
        const categorias = await prisma.categoria.findMany({
            where: { Ativa: true },
            orderBy: { Nome: 'asc' }
        });
        return categorias;
    }

    async findById(id: number): Promise<Categoria | null> {
        const categoria = await prisma.categoria.findUnique({
            where: { IdCategoria: id }
        });
        return categoria;
    }

    async update(id: number, data: Partial<Omit<Categoria, 'IdCategoria' | 'Inclusao' | 'Atualizacao'>>): Promise<Categoria> {
        const categoria = await prisma.categoria.update({
            where: { IdCategoria: id },
            data: {
                ...(data.Nome && { Nome: data.Nome }),
                ...(data.Descricao !== undefined && { Descricao: data.Descricao }),
                ...(data.Cor !== undefined && { Cor: data.Cor }),
                ...(data.Icone !== undefined && { Icone: data.Icone })
            }
        });
        return categoria;
    }

    async deactivate(id: number): Promise<Categoria> {
        const categoria = await prisma.categoria.update({
            where: { IdCategoria: id },
            data: { Ativa: false }
        });
        return categoria;
    }
}
