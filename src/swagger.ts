import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import type { Express } from 'express';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Sistema de Denúncias e Avisos - API',
            version: '1.0.0',
            description: 'API REST completa para gerenciamento de usuários, denúncias e avisos com sistema de soft delete (exclusão lógica). Desenvolvida seguindo os princípios SOLID com arquitetura modular baseada em operações.',
            contact: {
                name: 'Suporte API',
                email: 'suporte@uni7.com'
            },
            license: {
                name: 'MIT',
                url: 'https://opensource.org/licenses/MIT'
            }
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Servidor de Desenvolvimento'
            }
        ],
        tags: [
            {
                name: 'Usuarios',
                description: 'Endpoints para gerenciamento de usuários'
            },
            {
                name: 'Denuncias',
                description: 'Endpoints para gerenciamento de denúncias'
            },
            {
                name: 'Avisos',
                description: 'Endpoints para gerenciamento de avisos'
            }
        ],
        components: {
            schemas: {
                Usuario: {
                    type: 'object',
                    properties: {
                        IdUsuario: {
                            type: 'integer',
                            description: 'ID único do usuário'
                        },
                        NomeUsuario: {
                            type: 'string',
                            description: 'Nome do usuário',
                            maxLength: 255
                        },
                        Ativa: {
                            type: 'boolean',
                            description: 'Status do usuário (ativo/inativo)',
                            default: true
                        },
                        Inclusao: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Data de criação do registro'
                        },
                        Atualizacao: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Data da última atualização'
                        }
                    }
                },
                UsuarioInput: {
                    type: 'object',
                    required: ['NomeUsuario', 'Senha'],
                    properties: {
                        NomeUsuario: {
                            type: 'string',
                            description: 'Nome do usuário',
                            maxLength: 255,
                            example: 'João Silva'
                        },
                        Senha: {
                            type: 'string',
                            description: 'Senha do usuário',
                            maxLength: 255,
                            example: 'senha123'
                        }
                    }
                },
                UsuarioUpdate: {
                    type: 'object',
                    properties: {
                        NomeUsuario: {
                            type: 'string',
                            description: 'Nome do usuário',
                            maxLength: 255,
                            example: 'João Silva Atualizado'
                        },
                        Senha: {
                            type: 'string',
                            description: 'Senha do usuário',
                            maxLength: 255,
                            example: 'novaSenha123'
                        }
                    }
                },
                Denuncia: {
                    type: 'object',
                    properties: {
                        IdDenuncia: {
                            type: 'integer',
                            description: 'ID único da denúncia'
                        },
                        IdUsuario: {
                            type: 'integer',
                            description: 'ID do usuário que criou a denúncia'
                        },
                        Nome: {
                            type: 'string',
                            description: 'Título da denúncia',
                            maxLength: 255
                        },
                        Descricao: {
                            type: 'string',
                            description: 'Descrição detalhada da denúncia'
                        },
                        Ativa: {
                            type: 'boolean',
                            description: 'Status da denúncia (ativa/inativa)',
                            default: true
                        },
                        Inclusao: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Data de criação do registro'
                        },
                        Atualizacao: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Data da última atualização'
                        },
                        usuario: {
                            type: 'object',
                            properties: {
                                IdUsuario: {
                                    type: 'integer'
                                },
                                NomeUsuario: {
                                    type: 'string'
                                }
                            }
                        }
                    }
                },
                DenunciaInput: {
                    type: 'object',
                    required: ['IdUsuario', 'Nome', 'Descricao'],
                    properties: {
                        IdUsuario: {
                            type: 'integer',
                            description: 'ID do usuário',
                            example: 1
                        },
                        Nome: {
                            type: 'string',
                            description: 'Título da denúncia',
                            maxLength: 255,
                            example: 'Bug crítico no sistema'
                        },
                        Descricao: {
                            type: 'string',
                            description: 'Descrição detalhada',
                            example: 'O sistema está travando ao tentar salvar dados com caracteres especiais.'
                        }
                    }
                },
                DenunciaUpdate: {
                    type: 'object',
                    properties: {
                        Nome: {
                            type: 'string',
                            description: 'Título da denúncia',
                            maxLength: 255,
                            example: 'Bug crítico - RESOLVIDO'
                        },
                        Descricao: {
                            type: 'string',
                            description: 'Descrição atualizada',
                            example: 'O problema foi corrigido na versão 2.0'
                        }
                    }
                },
                Aviso: {
                    type: 'object',
                    properties: {
                        IdAviso: {
                            type: 'integer',
                            description: 'ID único do aviso'
                        },
                        IdUsuario: {
                            type: 'integer',
                            description: 'ID do usuário que criou o aviso'
                        },
                        Nome: {
                            type: 'string',
                            description: 'Título do aviso',
                            maxLength: 255
                        },
                        Descricao: {
                            type: 'string',
                            description: 'Descrição detalhada do aviso'
                        },
                        Ativa: {
                            type: 'boolean',
                            description: 'Status do aviso (ativo/inativo)',
                            default: true
                        },
                        Inclusao: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Data de criação do registro'
                        },
                        Atualizacao: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Data da última atualização'
                        },
                        usuario: {
                            type: 'object',
                            properties: {
                                IdUsuario: {
                                    type: 'integer'
                                },
                                NomeUsuario: {
                                    type: 'string'
                                }
                            }
                        }
                    }
                },
                AvisoInput: {
                    type: 'object',
                    required: ['IdUsuario', 'Nome', 'Descricao'],
                    properties: {
                        IdUsuario: {
                            type: 'integer',
                            description: 'ID do usuário',
                            example: 1
                        },
                        Nome: {
                            type: 'string',
                            description: 'Título do aviso',
                            maxLength: 255,
                            example: 'Manutenção programada'
                        },
                        Descricao: {
                            type: 'string',
                            description: 'Descrição detalhada',
                            example: 'O sistema ficará em manutenção no dia 15/11 das 22h às 02h.'
                        }
                    }
                },
                AvisoUpdate: {
                    type: 'object',
                    properties: {
                        Nome: {
                            type: 'string',
                            description: 'Título do aviso',
                            maxLength: 255,
                            example: 'Manutenção programada - ADIADA'
                        },
                        Descricao: {
                            type: 'string',
                            description: 'Descrição atualizada',
                            example: 'A manutenção foi adiada para o dia 20/11.'
                        }
                    }
                },
                Error: {
                    type: 'object',
                    properties: {
                        erro: {
                            type: 'string',
                            description: 'Mensagem de erro'
                        }
                    }
                },
                Success: {
                    type: 'object',
                    properties: {
                        mensagem: {
                            type: 'string',
                            description: 'Mensagem de sucesso'
                        }
                    }
                }
            }
        }
    },
    apis: ['./src/routes/*.ts', './src/usuario/routes/*.ts', './src/denuncia/routes/*.ts', './src/aviso/routes/*.ts']
};

const swaggerSpec = swaggerJsdoc(options);

export const setupSwagger = (app: Express) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
        customCss: '.swagger-ui .topbar { display: none }',
        customSiteTitle: 'Uni7 API Docs'
    }));
    
    // JSON endpoint
    app.get('/api-docs.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });
    
    console.log('📚 Swagger documentation available at http://localhost:3000/api-docs');
};
