'use strict';

import fastifyPlugin from 'fastify-plugin';
import fastifyswagger from '@fastify/swagger';

const swagger = async (server) => {
    server.register(fastifyswagger, {
        exposeRoute: true,
        routePrefix: '/docs',
        swagger: {
            info: {
                title: 'Polygon-api',
                description: 'Fastify swagger API Polygon CMS',
                version: process.env.NPM_PACKAGE_VERSION
            },
            tags: [
                { name: 'user', description: 'Операции с пользователями' },
                { name: 'post', description: 'Операции с постами' },
                { name: 'upload', description: 'Операции загрузки и передачи данных' },
            ],
            host: `localhost:${process.env.PORT}`,
            schemes: ['http', 'https'],
            consumes: ['application/json'],
            produces: ['application/json']
        }
    });
};

export default fastifyPlugin(swagger);
