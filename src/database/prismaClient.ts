import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient({
    log: ['error', 'warn'],
});

// Tratamento de conexão do Prisma
prisma.$connect()
    .then(() => console.log('✅ Conectado ao banco de dados'))
    .catch((error) => console.error('❌ Erro ao conectar ao banco de dados:', error.message));

// Graceful shutdown
process.on('beforeExit', async () => {
    await prisma.$disconnect();
});

export default prisma;