import prisma from "../../../database/prismaClient";

export interface IStatsResponse {
    avisosAtivos: number;
    denunciasAbertas: number;
    usuariosAtivos: number;
    taxaResolucao: number;
    denunciasPorStatus: {
        Aberta: number;
        'Em análise': number;
        Resolvida: number;
        Rejeitada: number;
    };
    denunciasPorPrioridade: {
        Baixa: number;
        Média: number;
        Alta: number;
        Urgente: number;
    };
}

export class GetStatsUseCase {
    async execute(): Promise<IStatsResponse> {
        // Contar avisos ativos
        const avisosAtivos = await prisma.aviso.count({
            where: { Ativa: true }
        });

        // Contar denúncias abertas (não resolvidas)
        const denunciasAbertas = await prisma.denuncia.count({
            where: {
                Ativa: true,
                Status: {
                    in: ['Aberta', 'Em análise']
                }
            }
        });

        // Contar usuários ativos
        const usuariosAtivos = await prisma.usuario.count({
            where: { Ativa: true }
        });

        // Calcular taxa de resolução
        const totalDenuncias = await prisma.denuncia.count({
            where: { Ativa: true }
        });
        
        const denunciasResolvidas = await prisma.denuncia.count({
            where: {
                Ativa: true,
                Status: 'Resolvida'
            }
        });

        const taxaResolucao = totalDenuncias > 0 
            ? Math.round((denunciasResolvidas / totalDenuncias) * 100)
            : 0;

        // Denúncias por status
        const denunciasPorStatus = {
            'Aberta': await prisma.denuncia.count({ where: { Ativa: true, Status: 'Aberta' } }),
            'Em análise': await prisma.denuncia.count({ where: { Ativa: true, Status: 'Em análise' } }),
            'Resolvida': await prisma.denuncia.count({ where: { Ativa: true, Status: 'Resolvida' } }),
            'Rejeitada': await prisma.denuncia.count({ where: { Ativa: true, Status: 'Rejeitada' } })
        };

        // Denúncias por prioridade
        const denunciasPorPrioridade = {
            'Baixa': await prisma.denuncia.count({ where: { Ativa: true, Prioridade: 'Baixa' } }),
            'Média': await prisma.denuncia.count({ where: { Ativa: true, Prioridade: 'Média' } }),
            'Alta': await prisma.denuncia.count({ where: { Ativa: true, Prioridade: 'Alta' } }),
            'Urgente': await prisma.denuncia.count({ where: { Ativa: true, Prioridade: 'Urgente' } })
        };

        return {
            avisosAtivos,
            denunciasAbertas,
            usuariosAtivos,
            taxaResolucao,
            denunciasPorStatus,
            denunciasPorPrioridade
        };
    }
}
