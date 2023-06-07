'use strict';

import fastifyPlugin from 'fastify-plugin';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';

const swagger = async (server) => {
    await server.register(fastifySwagger, {
        mode: 'dynamic',
        swagger: {
            info: {
                title: 'Polygon-api',
                description: 'Fastify swagger API Polygon CMS',
                version: process.env.NPM_PACKAGE_VERSION
            },
            tags: [
                { name: 'user', description: 'Операции с пользователями' },
                { name: 'article', description: 'Операции со статьями' },
                { name: 'upload', description: 'Операции загрузки и передачи данных' },
            ],
            host: 'localhost:5000',
            schemes: ['http', 'https'],
            consumes: ['application/json'],
            produces: ['application/json']
        }
    });

    await server.register(fastifySwaggerUi, {
        routePrefix: '/docs',
        uiConfig: {
            docExpansion: 'full',
            deepLinking: false
        },
        staticCSP: true,
        transformStaticCSP: (header) => header
    });
};

export default fastifyPlugin(swagger);
