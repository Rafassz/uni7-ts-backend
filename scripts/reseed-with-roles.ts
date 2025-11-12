// scripts/reseed-with-roles.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function reseedDatabase() {
  try {
    console.log('🗑️  Limpando banco de dados...');

    // Deletar dados em ordem (relacionamentos)
    await prisma.comentario.deleteMany({});
    await prisma.anexo.deleteMany({});
    await prisma.denuncia.deleteMany({});
    await prisma.aviso.deleteMany({});
    await prisma.notificacao.deleteMany({});
    await prisma.mensagem.deleteMany({});
    await prisma.reserva.deleteMany({});
    await prisma.evento.deleteMany({});
    await prisma.categoria.deleteMany({});
    await prisma.usuario.deleteMany({});

    console.log('✅ Banco limpo!\n');

    console.log('👥 Criando usuários com roles...');

    // 1. Síndico
    const sindico = await prisma.usuario.create({
      data: {
        NomeUsuario: 'admin',
        Senha: 'admin123',
        Ativa: true,
        Role: 'Síndico',
        Email: 'sindico@condominio.com',
        Apartamento: '101',
        Bloco: 'A',
      },
    });
    console.log('👑 Síndico criado: admin');

    // 2. Administrador
    const admin = await prisma.usuario.create({
      data: {
        NomeUsuario: 'maria.santos',
        Senha: 'senha123',
        Ativa: true,
        Role: 'Administrador',
        Email: 'maria.santos@email.com',
        Apartamento: '102',
        Bloco: 'A',
      },
    });
    console.log('🔧 Administrador criado: maria.santos');

    // 3. Porteiro
    const porteiro = await prisma.usuario.create({
      data: {
        NomeUsuario: 'joao.silva',
        Senha: 'senha123',
        Ativa: true,
        Role: 'Porteiro',
        Email: 'joao.silva@email.com',
        Apartamento: null,
        Bloco: null,
      },
    });
    console.log('🚪 Porteiro criado: joao.silva');

    // 4-8. Moradores
    const moradores = [];
    const moradoresData = [
      { nome: 'carlos.pereira', email: 'carlos.pereira@email.com', apto: '201', bloco: 'B' },
      { nome: 'ana.costa', email: 'ana.costa@email.com', apto: '202', bloco: 'B' },
      { nome: 'pedro.alves', email: 'pedro.alves@email.com', apto: '301', bloco: 'A' },
      { nome: 'juliana.lima', email: 'juliana.lima@email.com', apto: '302', bloco: 'A' },
      { nome: 'roberto.souza', email: 'roberto.souza@email.com', apto: '401', bloco: 'B' },
    ];

    for (const m of moradoresData) {
      const morador = await prisma.usuario.create({
        data: {
          NomeUsuario: m.nome,
          Senha: 'senha123',
          Ativa: true,
          Role: 'Morador',
          Email: m.email,
          Apartamento: m.apto,
          Bloco: m.bloco,
        },
      });
      moradores.push(morador);
      console.log(`🏠 Morador criado: ${m.nome}`);
    }

    console.log('\n📁 Criando categorias...');

    const categorias = await Promise.all([
      prisma.categoria.create({ data: { Nome: 'Barulho/Ruído', Cor: '#FF6B6B', Icone: '🔊' } }),
      prisma.categoria.create({ data: { Nome: 'Elétrica', Cor: '#FFD93D', Icone: '⚡' } }),
      prisma.categoria.create({ data: { Nome: 'Hidráulica', Cor: '#6BCB77', Icone: '💧' } }),
      prisma.categoria.create({ data: { Nome: 'Limpeza', Cor: '#4D96FF', Icone: '🧹' } }),
      prisma.categoria.create({ data: { Nome: 'Segurança', Cor: '#C70039', Icone: '🔒' } }),
      prisma.categoria.create({ data: { Nome: 'Estrutura', Cor: '#95A5A6', Icone: '🏗️' } }),
      prisma.categoria.create({ data: { Nome: 'Área Comum', Cor: '#9B59B6', Icone: '🏊' } }),
      prisma.categoria.create({ data: { Nome: 'Outros', Cor: '#34495E', Icone: '📝' } }),
    ]);
    console.log(`✅ ${categorias.length} categorias criadas`);

    console.log('\n📢 Criando avisos...');

    const avisos = [];
    const avisosData = [
      { 
        nome: 'Manutenção Programada - Elevadores', 
        desc: 'Informamos que no próximo sábado (16/11) os elevadores do Bloco A passarão por manutenção preventiva das 8h às 12h. Pedimos a compreensão de todos.',
        usuario: sindico,
        dataEvento: new Date('2025-11-16T08:00:00'),
      },
      { 
        nome: 'Reunião de Condomínio - Novembro', 
        desc: 'Fica convocada reunião ordinária de condomínio para o dia 20/11 às 19h no salão de festas. Pauta: aprovação do orçamento 2026.',
        usuario: sindico,
        dataEvento: new Date('2025-11-20T19:00:00'),
      },
      { 
        nome: 'Limpeza da Piscina', 
        desc: 'A piscina estará fechada para limpeza profunda nos dias 18 e 19/11. Reabertura prevista para dia 20/11.',
        usuario: porteiro,
        dataEvento: new Date('2025-11-18T07:00:00'),
      },
      { 
        nome: 'Coleta de Lixo Reciclável', 
        desc: 'Lembramos que a coleta seletiva ocorre todas as quartas-feiras. Separe seu lixo reciclável!',
        usuario: admin,
      },
      { 
        nome: 'Proibido Barulho após 22h', 
        desc: 'Reforçamos que conforme regimento interno, após as 22h devemos manter o silêncio para respeito aos demais moradores.',
        usuario: sindico,
      },
    ];

    for (const a of avisosData) {
      const aviso = await prisma.aviso.create({
        data: {
          Nome: a.nome,
          Descricao: a.desc,
          IdUsuario: a.usuario.IdUsuario,
          Ativa: true,
          ...(a.dataEvento && { DataEvento: a.dataEvento }),
        },
      });
      avisos.push(aviso);
    }
    console.log(`✅ ${avisos.length} avisos criados`);

    console.log('\n🚨 Criando denúncias...');

    const denunciasData = [
      {
        nome: 'Barulho excessivo - Apto 301-A',
        desc: 'Vizinhos do 301-A fazendo muito barulho após 23h com música alta. Já são 3 noites seguidas.',
        usuario: moradores[0]!,
        categoria: categorias[0]!,
        status: 'Aberta' as const,
        prioridade: 'Alta' as const,
      },
      {
        nome: 'Vazamento na garagem - Vaga 15',
        desc: 'Há um vazamento de água na garagem próximo à vaga 15. Água acumulando no chão.',
        usuario: moradores[1]!,
        categoria: categorias[2]!,
        status: 'Em análise' as const,
        prioridade: 'Urgente' as const,
      },
      {
        nome: 'Lâmpada queimada - Escada Bloco B',
        desc: 'A lâmpada do 3º andar da escada do Bloco B está queimada, ficando muito escuro à noite.',
        usuario: moradores[2]!,
        categoria: categorias[1]!,
        status: 'Resolvida' as const,
        prioridade: 'Média' as const,
        dataResolucao: new Date('2025-11-09'),
      },
      {
        nome: 'Lixo acumulado - Área externa',
        desc: 'Lixeiras da área externa estão transbordando. Precisa de coleta urgente.',
        usuario: moradores[3]!,
        categoria: categorias[3]!,
        status: 'Em análise' as const,
        prioridade: 'Alta' as const,
      },
      {
        nome: 'Portão da piscina quebrado',
        desc: 'O portão de acesso à piscina está com a fechadura quebrada, qualquer um pode entrar.',
        usuario: moradores[4]!,
        categoria: categorias[4]!,
        status: 'Aberta' as const,
        prioridade: 'Urgente' as const,
      },
      {
        nome: 'Infiltração na parede - Apto 202-B',
        desc: 'Parede da sala está com infiltração vindo do apartamento de cima. Formando mofo.',
        usuario: moradores[1]!,
        categoria: categorias[5]!,
        status: 'Em análise' as const,
        prioridade: 'Alta' as const,
      },
      {
        nome: 'Academia sem manutenção',
        desc: 'Equipamentos da academia precisam de manutenção. Esteira não funciona.',
        usuario: moradores[0]!,
        categoria: categorias[6]!,
        status: 'Aberta' as const,
        prioridade: 'Média' as const,
      },
      {
        nome: 'Cachorro solto nas áreas comuns',
        desc: 'Morador do 102 deixa cachorro de grande porte solto no playground. Crianças estão com medo.',
        usuario: moradores[2]!,
        categoria: categorias[7]!,
        status: 'Aberta' as const,
        prioridade: 'Alta' as const,
      },
    ];

    for (const d of denunciasData) {
      await prisma.denuncia.create({
        data: {
          Nome: d.nome,
          Descricao: d.desc,
          IdUsuario: d.usuario.IdUsuario,
          IdCategoria: d.categoria.IdCategoria,
          Ativa: true,
          Status: d.status,
          Prioridade: d.prioridade,
          ...(d.dataResolucao && { DataResolucao: d.dataResolucao }),
        },
      });
    }
    console.log(`✅ ${denunciasData.length} denúncias criadas`);

    console.log('\n🎉 Banco de dados populado com sucesso!\n');
    console.log('📊 Resumo:');
    console.log(`   👥 Usuários: 8 (1 Síndico, 1 Admin, 1 Porteiro, 5 Moradores)`);
    console.log(`   📁 Categorias: ${categorias.length}`);
    console.log(`   📢 Avisos: ${avisos.length}`);
    console.log(`   🚨 Denúncias: ${denunciasData.length}`);
    console.log('\n🔑 Credenciais de teste:');
    console.log('   👑 Síndico: admin / admin123');
    console.log('   🔧 Admin: maria.santos / senha123');
    console.log('   🚪 Porteiro: joao.silva / senha123');
    console.log('   🏠 Morador: carlos.pereira / senha123');

  } catch (error) {
    console.error('❌ Erro ao popular banco:', error);
  } finally {
    await prisma.$disconnect();
  }
}

reseedDatabase();
