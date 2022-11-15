'use strict';

import fastifyPlugin from 'fastify-plugin';
import fastifySession from '@fastify/session';

const sessionSupport = async (server) => {
    server.register(fastifySession, {
        cookieName: 'sessionId',
        secret: process.env.COOKIE_SECRET,
        cookie: { secure: false },
        expires: 1800000
    });
    server.addHook('preHandler', (request, reply, next) => {
        if (request.user) {
            request.session.user = request.user.login;
        }
        
        next();
    });
};

export default fastifyPlugin(sessionSupport);
