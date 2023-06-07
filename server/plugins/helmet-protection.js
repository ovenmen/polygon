'use strict';

import fastifyPlugin from 'fastify-plugin';
import fastifyHelmet from '@fastify/helmet';

const helmetProtection = async (server) => {
    await server.register(fastifyHelmet, {
        global: true
    });
};

export default fastifyPlugin(helmetProtection);
