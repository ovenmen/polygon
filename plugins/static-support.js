'use strict';

import fastifyPlugin from "fastify-plugin";
import fastifyStatic from '@fastify/static';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const staticSupport = async (server) => {
    server.register(fastifyStatic, {
        root: path.join(__dirname, '../uploads'),
        prefix: '/public/'
    });
};

export default fastifyPlugin(staticSupport);
