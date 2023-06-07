'use strict';

import fastifyPlugin from 'fastify-plugin';
import fastifyStatic from '@fastify/static';
import { fileURLToPath } from 'url';
import { join, dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const staticSupport = async (server) => {
    await server.register(fastifyStatic, {
        root: join(__dirname, '../public'),
        prefix: '/public/'
    });
};

export default fastifyPlugin(staticSupport);
