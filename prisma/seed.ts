import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Iniciando seed do banco de dados...');

    // Criar usuários
    const usuarios = await Promise.all([
        prisma.usuario.create({
            data: {
                NomeUsuario: 'João Silva',
                Senha: 'senha123',
            }
        }),
        prisma.usuario.create({
            data: {
                NomeUsuario: 'Maria Santos',
                Senha: 'senha123',
            }
        }),
        prisma.usuario.create({
            data: {
                NomeUsuario: 'Pedro Oliveira',
                Senha: 'senha123',
            }
        }),
        prisma.usuario.create({
            data: {
                NomeUsuario: 'Ana Costa',
                Senha: 'senha123',
            }
        }),
        prisma.usuario.create({
            data: {
                NomeUsuario: 'Carlos Souza',
                Senha: 'senha123',
            }
        }),
        prisma.usuario.create({
            data: {
                NomeUsuario: 'Julia Ferreira',
                Senha: 'senha123',
            }
        }),
        prisma.usuario.create({
            data: {
                NomeUsuario: 'Roberto Lima',
                Senha: 'senha123',
            }
        }),
        prisma.usuario.create({
            data: {
                NomeUsuario: 'Fernanda Alves',
                Senha: 'senha123',
            }
        }),
    ]);

    console.log(`✅ Criados ${usuarios.length} usuários`);

    // Criar avisos
    const avisos = [
        {
            IdUsuario: usuarios[0].IdUsuario,
            Nome: 'Manutenção do Elevador - Bloco A',
            Descricao: 'Informamos que o elevador do Bloco A passará por manutenção preventiva nos dias 15 e 16 de novembro. Pedimos a compreensão de todos os moradores.'
        },
        {
            IdUsuario: usuarios[1].IdUsuario,
            Nome: 'Reunião de Condomínio - Novembro',
            Descricao: 'A próxima reunião ordinária do condomínio está marcada para o dia 20/11 às 19h no salão de festas. Pauta: aprovação de obras e revisão do orçamento.'
        },
        {
            IdUsuario: usuarios[0].IdUsuario,
            Nome: 'Limpeza da Caixa D\'água',
            Descricao: 'Será realizada a limpeza semestral da caixa d\'água no dia 18/11. Haverá interrupção no fornecimento de água das 8h às 14h.'
        },
        {
            IdUsuario: usuarios[2].IdUsuario,
            Nome: 'Novo Horário da Portaria',
            Descricao: 'A partir de 01/12, a portaria funcionará em horário estendido: das 6h às 22h. Após este horário, utilize o interfone para acesso.'
        },
        {
            IdUsuario: usuarios[1].IdUsuario,
            Nome: 'Coleta Seletiva',
            Descricao: 'Lembramos que a coleta seletiva acontece todas as terças e quintas-feiras. Separe seu lixo reciclável e contribua com o meio ambiente!'
        },
        {
            IdUsuario: usuarios[3].IdUsuario,
            Nome: 'Obras no Playground',
            Descricao: 'Iniciamos as obras de revitalização do playground. Previsão de conclusão: 30/11. Durante este período, a área ficará interditada.'
        },
        {
            IdUsuario: usuarios[0].IdUsuario,
            Nome: 'Pintura da Fachada',
            Descricao: 'A pintura externa do condomínio será iniciada em dezembro. Os moradores serão informados sobre o cronograma de cada bloco.'
        },
        {
            IdUsuario: usuarios[4].IdUsuario,
            Nome: 'Festa de Fim de Ano',
            Descricao: 'Estão abertas as inscrições para a confraternização de fim de ano! Data: 22/12. Contribuição: R$ 50 por família. Inscrições na portaria.'
        },
        {
            IdUsuario: usuarios[2].IdUsuario,
            Nome: 'Manutenção da Piscina',
            Descricao: 'A piscina ficará fechada para manutenção nos dias 25 e 26/11. Voltaremos com o funcionamento normal no dia 27/11.'
        },
        {
            IdUsuario: usuarios[5].IdUsuario,
            Nome: 'Campanha de Vacinação Antirrábica',
            Descricao: 'A prefeitura realizará campanha de vacinação antirrábica no condomínio dia 14/11, das 9h às 16h, no salão de festas.'
        },
        {
            IdUsuario: usuarios[1].IdUsuario,
            Nome: 'Regularização de Débitos',
            Descricao: 'Moradores com débitos pendentes podem regularizar sua situação até 30/11 sem multa. Procure a administração.'
        },
        {
            IdUsuario: usuarios[6].IdUsuario,
            Nome: 'Segurança - Novos Procedimentos',
            Descricao: 'Foram implementados novos procedimentos de segurança. Todos os visitantes devem apresentar documento com foto na portaria.'
        },
        {
            IdUsuario: usuarios[0].IdUsuario,
            Nome: 'Academia - Novos Equipamentos',
            Descricao: 'Recebemos novos equipamentos para a academia! Venha conferir: esteira, bicicleta ergométrica e aparelhos de musculação.'
        },
        {
            IdUsuario: usuarios[7].IdUsuario,
            Nome: 'Estacionamento de Visitantes',
            Descricao: 'Reforçamos que as vagas de visitantes são exclusivas para uso temporário. Moradores não devem estacionar nestas vagas.'
        },
        {
            IdUsuario: usuarios[3].IdUsuario,
            Nome: 'Horário de Silêncio',
            Descricao: 'Lembramos que o horário de silêncio é das 22h às 8h. Contamos com a colaboração de todos para manter a harmonia do condomínio.'
        },
    ];

    for (const aviso of avisos) {
        await prisma.aviso.create({ data: aviso });
    }

    console.log(`✅ Criados ${avisos.length} avisos`);

    // Criar denúncias com diferentes status e prioridades
    const denuncias = [
        {
            IdUsuario: usuarios[0].IdUsuario,
            Nome: 'Barulho excessivo - Apto 301',
            Descricao: 'Vizinhos do apartamento 301 fazem muito barulho após as 22h com música alta e festa. Já tentei conversar mas não resolveu.',
            Status: 'Em análise',
            Prioridade: 'Alta'
        },
        {
            IdUsuario: usuarios[1].IdUsuario,
            Nome: 'Vazamento no Corredor - 2º Andar',
            Descricao: 'Há um vazamento de água no teto do corredor do 2º andar. A situação está piorando e formando poça no chão.',
            Status: 'Aberta',
            Prioridade: 'Urgente'
        },
        {
            IdUsuario: usuarios[2].IdUsuario,
            Nome: 'Lixo acumulado na garagem',
            Descricao: 'Alguém está deixando sacos de lixo na garagem ao invés de colocar na lixeira. O mau cheiro está insuportável.',
            Status: 'Resolvida',
            Prioridade: 'Média'
        },
        {
            IdUsuario: usuarios[3].IdUsuario,
            Nome: 'Carro estacionado em vaga de deficiente',
            Descricao: 'Um carro sem placa de deficiente está ocupando vaga exclusiva há mais de uma semana.',
            Status: 'Em análise',
            Prioridade: 'Média'
        },
        {
            IdUsuario: usuarios[4].IdUsuario,
            Nome: 'Interfone com defeito - Bloco B',
            Descricao: 'O interfone do Bloco B está com defeito. Não é possível atender chamadas nem abrir o portão remotamente.',
            Status: 'Aberta',
            Prioridade: 'Alta'
        },
        {
            IdUsuario: usuarios[5].IdUsuario,
            Nome: 'Cachorro solto na área comum',
            Descricao: 'Morador do apto 205 deixa cachorro de grande porte solto na área comum, causando medo nas crianças.',
            Status: 'Em análise',
            Prioridade: 'Alta'
        },
        {
            IdUsuario: usuarios[6].IdUsuario,
            Nome: 'Iluminação queimada - Garagem',
            Descricao: 'Várias lâmpadas da garagem estão queimadas, deixando o ambiente escuro e perigoso, especialmente à noite.',
            Status: 'Resolvida',
            Prioridade: 'Média'
        },
        {
            IdUsuario: usuarios[7].IdUsuario,
            Nome: 'Portão automático travando',
            Descricao: 'O portão automático da entrada está travando frequentemente, causando filas e transtornos nos horários de pico.',
            Status: 'Aberta',
            Prioridade: 'Urgente'
        },
        {
            IdUsuario: usuarios[0].IdUsuario,
            Nome: 'Pichação no Muro',
            Descricao: 'O muro externo foi pichado na última semana. Precisamos pintar novamente.',
            Status: 'Aberta',
            Prioridade: 'Baixa'
        },
        {
            IdUsuario: usuarios[1].IdUsuario,
            Nome: 'Churrasqueira quebrada',
            Descricao: 'A churrasqueira 2 da área de lazer está com a grelha quebrada e perigosa de usar.',
            Status: 'Em análise',
            Prioridade: 'Média'
        },
        {
            IdUsuario: usuarios[2].IdUsuario,
            Nome: 'Elevador com mau cheiro',
            Descricao: 'O elevador social está com forte odor de urina. Precisa de limpeza urgente.',
            Status: 'Resolvida',
            Prioridade: 'Alta'
        },
        {
            IdUsuario: usuarios[3].IdUsuario,
            Nome: 'Cigarros jogados na piscina',
            Descricao: 'Pessoas jogam bitucas de cigarro na piscina. Além de sujar, é falta de educação.',
            Status: 'Rejeitada',
            Prioridade: 'Baixa'
        },
        {
            IdUsuario: usuarios[4].IdUsuario,
            Nome: 'Vazamento de gás - Apto 102',
            Descricao: 'Sinto forte cheiro de gás próximo ao apartamento 102. Pode ser vazamento na tubulação.',
            Status: 'Aberta',
            Prioridade: 'Urgente'
        },
        {
            IdUsuario: usuarios[5].IdUsuario,
            Nome: 'Crianças brincando na garagem',
            Descricao: 'Crianças estão usando a garagem como área de brincadeira, correndo risco de atropelamento.',
            Status: 'Em análise',
            Prioridade: 'Alta'
        },
        {
            IdUsuario: usuarios[6].IdUsuario,
            Nome: 'Baratas na lixeira coletiva',
            Descricao: 'A lixeira coletiva está infestada de baratas. Precisamos de dedetização urgente.',
            Status: 'Aberta',
            Prioridade: 'Alta'
        },
        {
            IdUsuario: usuarios[7].IdUsuario,
            Nome: 'Porta de emergência trancada',
            Descricao: 'A porta de emergência do 5º andar está trancada com cadeado, o que viola normas de segurança.',
            Status: 'Resolvida',
            Prioridade: 'Urgente'
        },
        {
            IdUsuario: usuarios[0].IdUsuario,
            Nome: 'Bicicletas no hall de entrada',
            Descricao: 'Moradores deixam bicicletas no hall de entrada, atrapalhando a circulação.',
            Status: 'Aberta',
            Prioridade: 'Baixa'
        },
        {
            IdUsuario: usuarios[1].IdUsuario,
            Nome: 'Goteira no Salão de Festas',
            Descricao: 'Há goteiras no teto do salão de festas. Em dias de chuva, formam-se poças no chão.',
            Status: 'Em análise',
            Prioridade: 'Média'
        },
        {
            IdUsuario: usuarios[2].IdUsuario,
            Nome: 'Falta de papel higiênico nos banheiros',
            Descricao: 'Os banheiros da área comum sempre estão sem papel higiênico.',
            Status: 'Rejeitada',
            Prioridade: 'Baixa'
        },
        {
            IdUsuario: usuarios[3].IdUsuario,
            Nome: 'Câmeras de segurança sem funcionar',
            Descricao: 'Várias câmeras de segurança estão desligadas ou sem funcionar corretamente.',
            Status: 'Aberta',
            Prioridade: 'Alta'
        },
        {
            IdUsuario: usuarios[4].IdUsuario,
            Nome: 'Vidro quebrado no playground',
            Descricao: 'Há cacos de vidro no chão do playground. Risco grave para as crianças.',
            Status: 'Resolvida',
            Prioridade: 'Urgente'
        },
        {
            IdUsuario: usuarios[5].IdUsuario,
            Nome: 'Mau cheiro na caixa de gordura',
            Descricao: 'A caixa de gordura está com mau cheiro insuportável, afetando apartamentos próximos.',
            Status: 'Em análise',
            Prioridade: 'Média'
        },
        {
            IdUsuario: usuarios[6].IdUsuario,
            Nome: 'Trinca na parede da garagem',
            Descricao: 'Apareceu uma grande trinca na parede da garagem. Pode ser problema estrutural.',
            Status: 'Aberta',
            Prioridade: 'Urgente'
        },
        {
            IdUsuario: usuarios[7].IdUsuario,
            Nome: 'Telhado com telhas soltas',
            Descricao: 'Algumas telhas do telhado estão soltas. Com vento forte, podem cair e causar acidentes.',
            Status: 'Em análise',
            Prioridade: 'Alta'
        },
        {
            IdUsuario: usuarios[0].IdUsuario,
            Nome: 'Caixa de correio arrombada',
            Descricao: 'Minha caixa de correio foi arrombada. Preciso que seja consertada.',
            Status: 'Resolvida',
            Prioridade: 'Média'
        },
    ];

    for (const denuncia of denuncias) {
        await prisma.denuncia.create({ data: denuncia });
    }

    console.log(`✅ Criadas ${denuncias.length} denúncias`);

    console.log('✨ Seed concluído com sucesso!');
}

main()
    .catch((e) => {
        console.error('❌ Erro durante o seed:', e);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
