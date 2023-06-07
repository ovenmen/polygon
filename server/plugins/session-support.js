'use strict';

import fastifyPlugin from 'fastify-plugin';
import fastifySession from '@fastify/session';

const sessionSupport = async (server) => {
    await server.register(fastifySession, {
        secret: process.env.SECRET,
        cookie: { secure: false },
        expires: 1800000
    });

    await server.addHook('preHandler', (request, reply, next) => {
        if (request.user) {
            request.session.authenticate = true;
            request.session.user = request.user;
        }
        
        next();
    });
};

export default fastifyPlugin(sessionSupport);
