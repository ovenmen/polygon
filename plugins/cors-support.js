'use strict';

import fastifyPlugin from 'fastify-plugin';
import fastifyCors from '@fastify/cors';

const corsSupport = async (server) => {
    server.register(fastifyCors, () => (req, callback) => {
        const corsOptions = {
            // origin: ['http://localhost'],
            optionsSuccessStatus: 200
        };
  
        // callback expects two parameters: error and options
        callback(null, corsOptions);
    });
};

export default fastifyPlugin(corsSupport);
